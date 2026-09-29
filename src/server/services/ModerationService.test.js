jest.mock('mongoose', () => ({
  Schema: class {
    constructor() {}
    index() {}
    pre() {}
    method() {}
  },
  model: jest.fn(() => ({})),
  Types: { ObjectId: String }
}), { virtual: true });

const ModerationService = require('./ModerationService');
const ModerationAction = require('../models/ModerationAction');

jest.mock('../models/ModerationAction', () => ({
    findOne: jest.fn()
}));
jest.mock('../models/User', () => ({}));
jest.mock('../models/Chat', () => ({}));

describe('ModerationService.isUserMuted', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        // Supress console.error for clean test output
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        console.error.mockRestore();
    });

    it('should return false if no active mute is found', async () => {
        ModerationAction.findOne.mockResolvedValue(null);

        const result = await ModerationService.isUserMuted('user1', 'room1');

        expect(result).toBe(false);
        expect(ModerationAction.findOne).toHaveBeenCalledWith({
            targetUser: 'user1',
            chatRoom: 'room1',
            actionType: 'mute',
            status: 'active'
        });
    });

    it('should return false and update status if mute has expired', async () => {
        const mockMute = {
            isExpired: jest.fn().mockReturnValue(true),
            save: jest.fn().mockResolvedValue(true),
            status: 'active'
        };
        ModerationAction.findOne.mockResolvedValue(mockMute);

        const result = await ModerationService.isUserMuted('user1', 'room1');

        expect(result).toBe(false);
        expect(mockMute.isExpired).toHaveBeenCalled();
        expect(mockMute.status).toBe('expired');
        expect(mockMute.save).toHaveBeenCalled();
    });

    it('should return mute details if an active, unexpired mute is found', async () => {
        const mockExpiresAt = new Date(Date.now() + 10000);
        const mockMute = {
            isExpired: jest.fn().mockReturnValue(false),
            reason: 'Spamming',
            expiresAt: mockExpiresAt,
            getRemainingTime: jest.fn().mockReturnValue(15)
        };
        ModerationAction.findOne.mockResolvedValue(mockMute);

        const result = await ModerationService.isUserMuted('user1', 'room1');

        expect(result).toEqual({
            muted: true,
            reason: 'Spamming',
            expiresAt: mockExpiresAt,
            remainingTime: 15
        });
    });

    it('should return false if an error occurs during query', async () => {
        const testError = new Error('Database connection failed');
        ModerationAction.findOne.mockRejectedValue(testError);

        const result = await ModerationService.isUserMuted('user1', 'room1');

        expect(result).toBe(false);
        expect(console.error).toHaveBeenCalledWith('🎭 [MODERATION] Check mute error:', testError);
    });
});
