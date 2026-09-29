const ModerationService = require('../../services/ModerationService');
const User = require('../../models/User');
const Chat = require('../../models/Chat');
const ModerationAction = require('../../models/ModerationAction');

jest.mock('../../models/User', () => ({
    findById: jest.fn()
}));

jest.mock('../../models/Chat', () => ({
    findById: jest.fn()
}));

const mockSort = jest.fn();
jest.mock('../../models/ModerationAction', () => {
    return {
        findOne: jest.fn(() => ({ sort: mockSort })),
        // Keep the original schema/methods if they are used elsewhere
    };
});

describe('ModerationService.checkEscalation', () => {
    let mockUser, mockChat, mockWarning;

    beforeEach(() => {
        jest.clearAllMocks();

        mockUser = { _id: 'user1', username: 'testuser' };
        mockChat = { _id: 'chat1', name: 'Test Chat' };
        mockWarning = {
            _id: 'warn1',
            targetUser: 'user1',
            chatRoom: 'chat1',
            moderator: 'mod1',
            actionType: 'warning'
        };

        User.findById.mockResolvedValue(mockUser);
        Chat.findById.mockResolvedValue(mockChat);

        mockSort.mockResolvedValue(mockWarning);
        ModerationAction.findOne.mockReturnValue({ sort: mockSort });

        // Spy on service methods and mock implementation
        jest.spyOn(ModerationService, 'muteUser').mockResolvedValue({ success: true, actionType: 'mute' });
        jest.spyOn(ModerationService, 'kickUser').mockResolvedValue({ success: true, actionType: 'kick' });
        jest.spyOn(ModerationService, 'banUser').mockResolvedValue({ success: true, actionType: 'ban' });

        // Mock console to keep test output clean
        jest.spyOn(console, 'log').mockImplementation(() => {});
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('returns null if no escalation is needed (warningCount = 1)', async () => {
        const result = await ModerationService.checkEscalation('user1', 'chat1', 1);
        expect(result).toBeNull();
        expect(ModerationService.muteUser).not.toHaveBeenCalled();
        expect(ModerationService.kickUser).not.toHaveBeenCalled();
        expect(ModerationService.banUser).not.toHaveBeenCalled();
    });

    it('returns null if user is not found', async () => {
        User.findById.mockResolvedValueOnce(null);
        const result = await ModerationService.checkEscalation('user1', 'chat1', 2);

        expect(result).toBeNull();
        expect(User.findById).toHaveBeenCalledWith('user1');
        expect(ModerationService.muteUser).not.toHaveBeenCalled();
    });

    it('returns null if chat room is not found', async () => {
        Chat.findById.mockResolvedValueOnce(null);
        const result = await ModerationService.checkEscalation('user1', 'chat1', 2);

        expect(result).toBeNull();
        expect(Chat.findById).toHaveBeenCalledWith('chat1');
        expect(ModerationService.muteUser).not.toHaveBeenCalled();
    });

    it('returns null if no recent warning is found', async () => {
        mockSort.mockResolvedValueOnce(null);
        const result = await ModerationService.checkEscalation('user1', 'chat1', 2);

        expect(result).toBeNull();
        expect(ModerationAction.findOne).toHaveBeenCalledWith({
            targetUser: 'user1',
            chatRoom: 'chat1',
            actionType: 'warning'
        });
        expect(ModerationService.muteUser).not.toHaveBeenCalled();
    });

    it('escalates to mute on 2nd warning', async () => {
        const result = await ModerationService.checkEscalation('user1', 'chat1', 2);

        expect(result).toEqual({ success: true, actionType: 'mute' });
        expect(ModerationService.muteUser).toHaveBeenCalledWith(
            'mod1',
            'user1',
            'chat1',
            'Automatic mute after 2 warnings',
            ModerationService.defaultDurations.mute
        );
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining('mute for user testuser'));
    });

    it('escalates to kick on 3rd warning', async () => {
        const result = await ModerationService.checkEscalation('user1', 'chat1', 3);

        expect(result).toEqual({ success: true, actionType: 'kick' });
        expect(ModerationService.kickUser).toHaveBeenCalledWith(
            'mod1',
            'user1',
            'chat1',
            'Automatic kick after 3 warnings'
        );
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining('kick for user testuser'));
    });

    it('escalates to kick on 4th warning (since kick is 3 and ban is 5, mute is 2)', async () => {
        const result = await ModerationService.checkEscalation('user1', 'chat1', 4);

        // Thresholds: mute=2, kick=3, ban=5
        // getEscalationAction checks from highest to lowest:
        // >=5 (ban) -> false
        // >=3 (kick) -> true

        expect(result).toEqual({ success: true, actionType: 'kick' });
        expect(ModerationService.kickUser).toHaveBeenCalledWith(
            'mod1',
            'user1',
            'chat1',
            'Automatic kick after 4 warnings'
        );
    });

    it('escalates to ban on 5th warning', async () => {
        const result = await ModerationService.checkEscalation('user1', 'chat1', 5);

        expect(result).toEqual({ success: true, actionType: 'ban' });
        expect(ModerationService.banUser).toHaveBeenCalledWith(
            'mod1',
            'user1',
            'chat1',
            'Automatic ban after 5 warnings',
            ModerationService.defaultDurations.ban
        );
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining('ban for user testuser'));
    });

    it('catches and handles errors, returning null', async () => {
        User.findById.mockRejectedValueOnce(new Error('Database error'));

        const result = await ModerationService.checkEscalation('user1', 'chat1', 2);

        expect(result).toBeNull();
        expect(console.error).toHaveBeenCalledWith('🎭 [MODERATION] Escalation error:', expect.any(Error));
        expect(ModerationService.muteUser).not.toHaveBeenCalled();
    });
});
