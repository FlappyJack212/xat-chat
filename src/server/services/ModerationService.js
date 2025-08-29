const ModerationAction = require('../models/ModerationAction');
const User = require('../models/User');
const Chat = require('../models/Chat');

class ModerationService {
    constructor() {
        this.warningThresholds = {
            warning: 1,      // 1st warning
            mute: 2,         // 2nd warning = 15 min mute
            kick: 3,         // 3rd warning = kick
            ban: 5           // 5th warning = 24 hour ban
        };
        
        this.defaultDurations = {
            warning: 0,      // Permanent until manually cleared
            mute: 15,        // 15 minutes
            kick: 0,         // Immediate
            ban: 1440        // 24 hours (1440 minutes)
        };
    }

    /**
     * Check if a user can moderate another user
     */
    canModerate(moderator, targetUser, chatRoom) {
        // Main owners can moderate anyone
        if (moderator.rank === 'mainowner') return true;
        
        // Owners can moderate anyone except main owners
        if (moderator.rank === 'owner' && targetUser.rank !== 'mainowner') return true;
        
        // Moderators can only moderate guests and members
        if (moderator.rank === 'moderator' && ['guest', 'member'].includes(targetUser.rank)) return true;
        
        // Check if user is chat owner
        if (chatRoom && chatRoom.createdBy.toString() === moderator._id.toString()) return true;
        
        return false;
    }

    /**
     * Issue a warning to a user
     */
    async issueWarning(moderatorId, targetUserId, chatRoomId, reason, metadata = {}) {
        try {
            // Check permissions
            const [moderator, targetUser, chatRoom] = await Promise.all([
                User.findById(moderatorId),
                User.findById(targetUserId),
                Chat.findById(chatRoomId)
            ]);

            if (!moderator || !targetUser || !chatRoom) {
                throw new Error('User or chat room not found');
            }

            if (!this.canModerate(moderator, targetUser, chatRoom)) {
                throw new Error('Insufficient permissions to moderate this user');
            }

            // Get previous warnings
            const previousWarnings = await ModerationAction.getUserWarnings(targetUserId, chatRoomId);
            const warningCount = previousWarnings.length + 1;

            // Create warning
            const warning = new ModerationAction({
                actionType: 'warning',
                targetUser: targetUserId,
                moderator: moderatorId,
                chatRoom: chatRoomId,
                reason: reason,
                duration: 0, // Warnings are permanent until cleared
                metadata: {
                    ...metadata,
                    previousWarnings: warningCount - 1
                }
            });

            await warning.save();

            // Check if escalation is needed
            await this.checkEscalation(targetUserId, chatRoomId, warningCount);

            return {
                success: true,
                warning,
                warningCount,
                escalation: this.getEscalationAction(warningCount)
            };

        } catch (error) {
            console.error('🎭 [MODERATION] Warning error:', error);
            throw error;
        }
    }

    /**
     * Mute a user
     */
    async muteUser(moderatorId, targetUserId, chatRoomId, reason, duration = null, metadata = {}) {
        try {
            // Check permissions
            const [moderator, targetUser, chatRoom] = await Promise.all([
                User.findById(moderatorId),
                User.findById(targetUserId),
                Chat.findById(chatRoomId)
            ]);

            if (!moderator || !targetUser || !chatRoom) {
                throw new Error('User or chat room not found');
            }

            if (!this.canModerate(moderator, targetUser, chatRoom)) {
                throw new Error('Insufficient permissions to moderate this user');
            }

            // Use default duration if none specified
            const muteDuration = duration || this.defaultDurations.mute;
            const expiresAt = muteDuration > 0 ? new Date(Date.now() + (muteDuration * 60 * 1000)) : null;

            // Create mute action
            const mute = new ModerationAction({
                actionType: 'mute',
                targetUser: targetUserId,
                moderator: moderatorId,
                chatRoom: chatRoomId,
                reason: reason,
                duration: muteDuration,
                expiresAt: expiresAt,
                metadata
            });

            await mute.save();

            return {
                success: true,
                mute,
                duration: muteDuration,
                expiresAt
            };

        } catch (error) {
            console.error('🎭 [MODERATION] Mute error:', error);
            throw error;
        }
    }

    /**
     * Ban a user
     */
    async banUser(moderatorId, targetUserId, chatRoomId, reason, duration = null, metadata = {}) {
        try {
            // Check permissions
            const [moderator, targetUser, chatRoom] = await Promise.all([
                User.findById(moderatorId),
                User.findById(targetUserId),
                Chat.findById(chatRoomId)
            ]);

            if (!moderator || !targetUser || !chatRoom) {
                throw new Error('User or chat room not found');
            }

            if (!this.canModerate(moderator, targetUser, chatRoom)) {
                throw new Error('Insufficient permissions to moderate this user');
            }

            // Use default duration if none specified
            const banDuration = duration || this.defaultDurations.ban;
            const expiresAt = banDuration > 0 ? new Date(Date.now() + (banDuration * 60 * 1000)) : null;

            // Create ban action
            const ban = new ModerationAction({
                actionType: 'ban',
                targetUser: targetUserId,
                chatRoom: chatRoomId,
                moderator: moderatorId,
                reason: reason,
                duration: banDuration,
                expiresAt: expiresAt,
                metadata
            });

            await ban.save();

            return {
                success: true,
                ban,
                duration: banDuration,
                expiresAt
            };

        } catch (error) {
            console.error('🎭 [MODERATION] Ban error:', error);
            throw error;
        }
    }

    /**
     * Kick a user
     */
    async kickUser(moderatorId, targetUserId, chatRoomId, reason, metadata = {}) {
        try {
            // Check permissions
            const [moderator, targetUser, chatRoom] = await Promise.all([
                User.findById(moderatorId),
                User.findById(targetUserId),
                Chat.findById(chatRoomId)
            ]);

            if (!moderator || !targetUser || !chatRoom) {
                throw new Error('User or chat room not found');
            }

            if (!this.canModerate(moderator, targetUser, chatRoom)) {
                throw new Error('Insufficient permissions to moderate this user');
            }

            // Create kick action
            const kick = new ModerationAction({
                actionType: 'kick',
                targetUser: targetUserId,
                moderator: moderatorId,
                chatRoom: chatRoomId,
                reason: reason,
                duration: 0, // Kicks are immediate
                metadata
            });

            await kick.save();

            return {
                success: true,
                kick
            };

        } catch (error) {
            console.error('🎭 [MODERATION] Kick error:', error);
            throw error;
        }
    }

    /**
     * Check if escalation is needed based on warning count
     */
    async checkEscalation(userId, chatRoomId, warningCount) {
        try {
            const escalationAction = this.getEscalationAction(warningCount);
            
            if (!escalationAction) return null;

            // Get the user and chat room
            const [user, chatRoom] = await Promise.all([
                User.findById(userId),
                Chat.findById(chatRoomId)
            ]);

            if (!user || !chatRoom) return null;

            // Get the most recent warning to use as moderator
            const recentWarning = await ModerationAction.findOne({
                targetUser: userId,
                chatRoom: chatRoomId,
                actionType: 'warning'
            }).sort({ createdAt: -1 });

            if (!recentWarning) return null;

            let result = null;

            switch (escalationAction) {
                case 'mute':
                    result = await this.muteUser(
                        recentWarning.moderator,
                        userId,
                        chatRoomId,
                        `Automatic mute after ${warningCount} warnings`,
                        this.defaultDurations.mute
                    );
                    break;

                case 'kick':
                    result = await this.kickUser(
                        recentWarning.moderator,
                        userId,
                        chatRoomId,
                        `Automatic kick after ${warningCount} warnings`
                    );
                    break;

                case 'ban':
                    result = await this.banUser(
                        recentWarning.moderator,
                        userId,
                        chatRoomId,
                        `Automatic ban after ${warningCount} warnings`,
                        this.defaultDurations.ban
                    );
                    break;
            }

            if (result) {
                console.log(`🎭 [MODERATION] Auto-escalation: ${escalationAction} for user ${user.username} after ${warningCount} warnings`);
            }

            return result;

        } catch (error) {
            console.error('🎭 [MODERATION] Escalation error:', error);
            return null;
        }
    }

    /**
     * Get escalation action based on warning count
     */
    getEscalationAction(warningCount) {
        if (warningCount >= this.warningThresholds.ban) return 'ban';
        if (warningCount >= this.warningThresholds.kick) return 'kick';
        if (warningCount >= this.warningThresholds.mute) return 'mute';
        return null;
    }

    /**
     * Check if user is currently muted
     */
    async isUserMuted(userId, chatRoomId) {
        try {
            const activeMute = await ModerationAction.findOne({
                targetUser: userId,
                chatRoom: chatRoomId,
                actionType: 'mute',
                status: 'active'
            });

            if (!activeMute) return false;

            // Check if mute has expired
            if (activeMute.isExpired()) {
                activeMute.status = 'expired';
                await activeMute.save();
                return false;
            }

            return {
                muted: true,
                reason: activeMute.reason,
                expiresAt: activeMute.expiresAt,
                remainingTime: activeMute.getRemainingTime()
            };

        } catch (error) {
            console.error('🎭 [MODERATION] Check mute error:', error);
            return false;
        }
    }

    /**
     * Check if user is currently banned
     */
    async isUserBanned(userId, chatRoomId) {
        try {
            const activeBan = await ModerationAction.findOne({
                targetUser: userId,
                chatRoom: chatRoomId,
                actionType: 'ban',
                status: 'active'
            });

            if (!activeBan) return false;

            // Check if ban has expired
            if (activeBan.isExpired()) {
                activeBan.status = 'expired';
                await activeBan.save();
                return false;
            }

            return {
                banned: true,
                reason: activeBan.reason,
                expiresAt: activeBan.expiresAt,
                remainingTime: activeBan.getRemainingTime()
            };

        } catch (error) {
            console.error('🎭 [MODERATION] Check ban error:', error);
            return false;
        }
    }

    /**
     * Revoke a moderation action
     */
    async revokeAction(actionId, moderatorId, reason) {
        try {
            const action = await ModerationAction.findById(actionId);
            if (!action) {
                throw new Error('Moderation action not found');
            }

            // Check if moderator has permission to revoke
            const moderator = await User.findById(moderatorId);
            if (!moderator || moderator.rank === 'guest' || moderator.rank === 'member') {
                throw new Error('Insufficient permissions to revoke action');
            }

            action.status = 'revoked';
            action.metadata.revokedBy = moderatorId;
            action.metadata.revokedReason = reason;
            action.metadata.revokedAt = new Date();

            await action.save();

            return {
                success: true,
                action
            };

        } catch (error) {
            console.error('🎭 [MODERATION] Revoke error:', error);
            throw error;
        }
    }

    /**
     * Get moderation history for a user
     */
    async getUserModerationHistory(userId, limit = 50) {
        try {
            return await ModerationAction.getModerationHistory(userId, limit);
        } catch (error) {
            console.error('🎭 [MODERATION] Get history error:', error);
            throw error;
        }
    }

    /**
     * Get active moderation actions for a user
     */
    async getUserActiveActions(userId) {
        try {
            return await ModerationAction.getActiveActions(userId);
        } catch (error) {
            console.error('🎭 [MODERATION] Get active actions error:', error);
            throw error;
        }
    }
}

module.exports = new ModerationService();
