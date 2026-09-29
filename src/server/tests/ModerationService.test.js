const mongoose = require('mongoose');

jest.mock('mongoose', () => ({
    Schema: class {},
    model: jest.fn(),
    Types: { ObjectId: jest.fn() }
}), { virtual: true });

jest.mock('../models/User', () => ({
    findById: jest.fn()
}));

jest.mock('../models/Chat', () => ({
    findById: jest.fn()
}));

jest.mock('../models/ModerationAction', () => {
    const mockSave = jest.fn();
    const MockAction = function(data) {
        Object.assign(this, data);
        this.save = mockSave;
    };
    MockAction.mockSave = mockSave;
    return MockAction;
});

const User = require('../models/User');
const Chat = require('../models/Chat');
const ModerationAction = require('../models/ModerationAction');
const ModerationService = require('../services/ModerationService');

describe('ModerationService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        // Supress console.error in tests
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        console.error.mockRestore();
    });

    describe('muteUser', () => {
        it('should successfully mute a user with default duration', async () => {
            const moderator = { _id: 'mod1', rank: 'owner' };
            const targetUser = { _id: 'user1', rank: 'member' };
            const chatRoom = { _id: 'chat1', createdBy: 'other' };

            User.findById
                .mockResolvedValueOnce(moderator)
                .mockResolvedValueOnce(targetUser);
            Chat.findById.mockResolvedValueOnce(chatRoom);

            ModerationAction.mockSave.mockResolvedValueOnce(true);

            const result = await ModerationService.muteUser(
                'mod1', 'user1', 'chat1', 'Spamming'
            );

            expect(result.success).toBe(true);
            expect(result.duration).toBe(15); // default duration
            expect(result.mute.actionType).toBe('mute');
            expect(result.mute.reason).toBe('Spamming');
            expect(ModerationAction.mockSave).toHaveBeenCalled();
            expect(result.expiresAt).toBeInstanceOf(Date);
        });

        it('should successfully mute a user with custom duration', async () => {
            const moderator = { _id: 'mod1', rank: 'owner' };
            const targetUser = { _id: 'user1', rank: 'member' };
            const chatRoom = { _id: 'chat1', createdBy: 'other' };

            User.findById
                .mockResolvedValueOnce(moderator)
                .mockResolvedValueOnce(targetUser);
            Chat.findById.mockResolvedValueOnce(chatRoom);

            ModerationAction.mockSave.mockResolvedValueOnce(true);

            const result = await ModerationService.muteUser(
                'mod1', 'user1', 'chat1', 'Spamming', 60
            );

            expect(result.success).toBe(true);
            expect(result.duration).toBe(60);
            expect(result.mute.actionType).toBe('mute');
            expect(result.mute.reason).toBe('Spamming');
            expect(ModerationAction.mockSave).toHaveBeenCalled();
            expect(result.expiresAt).toBeInstanceOf(Date);
        });

        it('should throw an error if user or chat room is not found', async () => {
            User.findById
                .mockResolvedValueOnce(null)
                .mockResolvedValueOnce({ _id: 'user1' });
            Chat.findById.mockResolvedValueOnce({ _id: 'chat1' });

            await expect(ModerationService.muteUser('mod1', 'user1', 'chat1', 'Spamming'))
                .rejects
                .toThrow('User or chat room not found');

            expect(console.error).toHaveBeenCalled();
        });

        it('should throw an error if moderator has insufficient permissions', async () => {
            const moderator = { _id: 'mod1', rank: 'member' };
            const targetUser = { _id: 'user1', rank: 'member' };
            const chatRoom = { _id: 'chat1', createdBy: 'other' };

            User.findById
                .mockResolvedValueOnce(moderator)
                .mockResolvedValueOnce(targetUser);
            Chat.findById.mockResolvedValueOnce(chatRoom);

            await expect(ModerationService.muteUser('mod1', 'user1', 'chat1', 'Spamming'))
                .rejects
                .toThrow('Insufficient permissions to moderate this user');

            expect(console.error).toHaveBeenCalled();
        });

        it('should throw the original error if save fails', async () => {
            const moderator = { _id: 'mod1', rank: 'owner' };
            const targetUser = { _id: 'user1', rank: 'member' };
            const chatRoom = { _id: 'chat1', createdBy: 'other' };

            User.findById
                .mockResolvedValueOnce(moderator)
                .mockResolvedValueOnce(targetUser);
            Chat.findById.mockResolvedValueOnce(chatRoom);

            ModerationAction.mockSave.mockRejectedValueOnce(new Error('Database error'));

            await expect(ModerationService.muteUser('mod1', 'user1', 'chat1', 'Spamming'))
                .rejects
                .toThrow('Database error');

            expect(console.error).toHaveBeenCalled();
        });
    });
});
