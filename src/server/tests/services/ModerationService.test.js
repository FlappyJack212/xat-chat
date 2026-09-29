// Mock mongoose virtually
jest.mock('mongoose', () => {
    return {
        Types: {
            ObjectId: function(id) {
                this.id = id || Math.random().toString(36).substring(7);
                this.toString = () => this.id;
            }
        }
    };
}, { virtual: true });

const mongoose = require('mongoose');

// Mock Models
jest.mock('../../models/ModerationAction', () => {
    return jest.fn().mockImplementation((data) => {
        return {
            ...data,
            save: jest.fn().mockResolvedValue(true)
        };
    });
}, { virtual: true });

jest.mock('../../models/User', () => ({
    findById: jest.fn()
}), { virtual: true });

jest.mock('../../models/Chat', () => ({
    findById: jest.fn()
}), { virtual: true });


const ModerationService = require('../../services/ModerationService');
const ModerationAction = require('../../models/ModerationAction');
const User = require('../../models/User');
const Chat = require('../../models/Chat');


describe('ModerationService.banUser', () => {
    let moderator;
    let targetUser;
    let chatRoom;

    beforeEach(() => {
        jest.clearAllMocks();

        moderator = {
            _id: new mongoose.Types.ObjectId('mod1'),
            rank: 'mainowner'
        };

        targetUser = {
            _id: new mongoose.Types.ObjectId('target1'),
            rank: 'guest'
        };

        chatRoom = {
            _id: new mongoose.Types.ObjectId('chat1'),
            createdBy: new mongoose.Types.ObjectId('mod1')
        };

        User.findById.mockImplementation((id) => {
            if (id === moderator._id || id.toString() === moderator._id.toString()) return Promise.resolve(moderator);
            if (id === targetUser._id || id.toString() === targetUser._id.toString()) return Promise.resolve(targetUser);
            return Promise.resolve(null);
        });

        Chat.findById.mockResolvedValue(chatRoom);
    });

    it('should successfully ban a user with default duration', async () => {
        const result = await ModerationService.banUser(
            moderator._id,
            targetUser._id,
            chatRoom._id,
            'Spamming'
        );

        expect(result.success).toBe(true);
        expect(result.duration).toBe(ModerationService.defaultDurations.ban);
        expect(result.ban.actionType).toBe('ban');
        expect(result.ban.reason).toBe('Spamming');
        expect(result.ban.save).toHaveBeenCalled();
    });

    it('should successfully ban a user with custom duration', async () => {
        const result = await ModerationService.banUser(
            moderator._id,
            targetUser._id,
            chatRoom._id,
            'Spamming',
            60 // 1 hour
        );

        expect(result.success).toBe(true);
        expect(result.duration).toBe(60);
        expect(result.ban.actionType).toBe('ban');
        expect(result.ban.reason).toBe('Spamming');
        expect(result.ban.save).toHaveBeenCalled();
    });

    it('should throw error if user or chat room not found', async () => {
        User.findById.mockResolvedValueOnce(null);

        await expect(ModerationService.banUser(
            moderator._id,
            targetUser._id,
            chatRoom._id,
            'Spamming'
        )).rejects.toThrow('User or chat room not found');
    });

    it('should throw error if insufficient permissions', async () => {
        moderator.rank = 'member';
        targetUser.rank = 'moderator';
        chatRoom.createdBy = new mongoose.Types.ObjectId('otheruser');

        await expect(ModerationService.banUser(
            moderator._id,
            targetUser._id,
            chatRoom._id,
            'Spamming'
        )).rejects.toThrow('Insufficient permissions to moderate this user');
    });
});
