// We mock mongoose in a way that doesn't hang jest.
jest.mock('mongoose', () => {
    class MockSchema {
        constructor(definition) {
            this.definition = definition;
            this.methods = {};
            this.statics = {};
        }
        index() {}
        pre() {}
    }
    MockSchema.Types = { ObjectId: 'ObjectId' };
    return {
        Schema: MockSchema,
        model: jest.fn(() => class MockModel {
            constructor(data) {
                Object.assign(this, data);
            }
            save() { return Promise.resolve(this); }
        })
    };
}, { virtual: true });

const ModerationService = require('../ModerationService');
const User = require('../../models/User');
const Chat = require('../../models/Chat');
const ModerationAction = require('../../models/ModerationAction');

jest.mock('../../models/User', () => ({
    findById: jest.fn()
}));
jest.mock('../../models/Chat', () => ({
    findById: jest.fn()
}));
jest.mock('../../models/ModerationAction');

describe('ModerationService - kickUser', () => {
    let mockModerator;
    let mockTargetUser;
    let mockChatRoom;
    let mockSave;

    beforeEach(() => {
        jest.clearAllMocks();

        mockModerator = { _id: 'mod1', rank: 'moderator' };
        mockTargetUser = { _id: 'target1', rank: 'guest' };
        mockChatRoom = { _id: 'chat1', createdBy: { toString: () => 'owner1' } };

        mockSave = jest.fn().mockResolvedValue(true);

        ModerationAction.mockImplementation(function(data) {
            this.save = mockSave;
            Object.assign(this, data);
        });

        User.findById.mockImplementation((id) => {
            if (id === 'mod1') return Promise.resolve(mockModerator);
            if (id === 'target1') return Promise.resolve(mockTargetUser);
            return Promise.resolve(null);
        });

        Chat.findById.mockImplementation((id) => {
            if (id === 'chat1') return Promise.resolve(mockChatRoom);
            return Promise.resolve(null);
        });

        // suppress console.error
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        console.error.mockRestore();
    });

    it('should kick a user successfully', async () => {
        const result = await ModerationService.kickUser('mod1', 'target1', 'chat1', 'Spamming', { ip: '127.0.0.1' });

        expect(User.findById).toHaveBeenCalledWith('mod1');
        expect(User.findById).toHaveBeenCalledWith('target1');
        expect(Chat.findById).toHaveBeenCalledWith('chat1');

        expect(ModerationAction).toHaveBeenCalledWith({
            actionType: 'kick',
            targetUser: 'target1',
            moderator: 'mod1',
            chatRoom: 'chat1',
            reason: 'Spamming',
            duration: 0,
            metadata: { ip: '127.0.0.1' }
        });

        expect(mockSave).toHaveBeenCalled();
        expect(result.success).toBe(true);
        expect(result.kick).toBeDefined();
    });

    it('should throw an error if moderator is not found', async () => {
        User.findById.mockImplementation((id) => {
            if (id === 'target1') return Promise.resolve(mockTargetUser);
            return Promise.resolve(null);
        });

        await expect(ModerationService.kickUser('nonexistent', 'target1', 'chat1', 'Spamming'))
            .rejects.toThrow('User or chat room not found');
    });

    it('should throw an error if target user is not found', async () => {
        User.findById.mockImplementation((id) => {
            if (id === 'mod1') return Promise.resolve(mockModerator);
            return Promise.resolve(null);
        });

        await expect(ModerationService.kickUser('mod1', 'nonexistent', 'chat1', 'Spamming'))
            .rejects.toThrow('User or chat room not found');
    });

    it('should throw an error if chat room is not found', async () => {
        Chat.findById.mockResolvedValue(null);

        await expect(ModerationService.kickUser('mod1', 'target1', 'nonexistent', 'Spamming'))
            .rejects.toThrow('User or chat room not found');
    });

    it('should throw an error if moderator lacks permissions', async () => {
        // Moderator rank but target is owner
        mockTargetUser.rank = 'owner';

        await expect(ModerationService.kickUser('mod1', 'target1', 'chat1', 'Spamming'))
            .rejects.toThrow('Insufficient permissions to moderate this user');

        expect(mockSave).not.toHaveBeenCalled();
    });

    it('should allow chat room owner to kick users regardless of rank', async () => {
        // Mod is guest but is the chat creator
        mockModerator = { _id: 'mod1', rank: 'guest' };
        mockChatRoom = { _id: 'chat1', createdBy: { toString: () => 'mod1' } };
        // Target is owner
        mockTargetUser = { _id: 'target1', rank: 'owner' };

        const result = await ModerationService.kickUser('mod1', 'target1', 'chat1', 'Spamming');

        expect(result.success).toBe(true);
        expect(mockSave).toHaveBeenCalled();
    });

    it('should handle save errors gracefully', async () => {
        mockSave.mockRejectedValue(new Error('Database error'));

        await expect(ModerationService.kickUser('mod1', 'target1', 'chat1', 'Spamming'))
            .rejects.toThrow('Database error');

        expect(console.error).toHaveBeenCalled();
    });
});
