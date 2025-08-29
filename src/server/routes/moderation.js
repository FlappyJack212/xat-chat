const express = require('express');
const { authenticateToken } = require('./auth');
const ModerationService = require('../services/ModerationService');
const ModerationAction = require('../models/ModerationAction');
const User = require('../models/User');
const Chat = require('../models/Chat');
const router = express.Router();

// Apply authentication to all routes
router.use(authenticateToken);

/**
 * @route POST /api/moderation/warn
 * @desc Issue a warning to a user
 * @access Moderator+
 */
router.post('/warn', async (req, res) => {
    try {
        const { targetUserId, chatRoomId, reason, metadata } = req.body;
        
        if (!targetUserId || !chatRoomId || !reason) {
            return res.status(400).json({ 
                message: 'Target user ID, chat room ID, and reason are required' 
            });
        }

        const result = await ModerationService.issueWarning(
            req.user.id,
            targetUserId,
            chatRoomId,
            reason,
            metadata
        );

        res.json({
            message: 'Warning issued successfully',
            ...result
        });

    } catch (error) {
        console.error('🎭 [MODERATION] Warning route error:', error);
        res.status(400).json({ 
            message: error.message || 'Failed to issue warning' 
        });
    }
});

/**
 * @route POST /api/moderation/mute
 * @desc Mute a user
 * @access Moderator+
 */
router.post('/mute', async (req, res) => {
    try {
        const { targetUserId, chatRoomId, reason, duration, metadata } = req.body;
        
        if (!targetUserId || !chatRoomId || !reason) {
            return res.status(400).json({ 
                message: 'Target user ID, chat room ID, and reason are required' 
            });
        }

        const result = await ModerationService.muteUser(
            req.user.id,
            targetUserId,
            chatRoomId,
            reason,
            duration,
            metadata
        );

        res.json({
            message: 'User muted successfully',
            ...result
        });

    } catch (error) {
        console.error('🎭 [MODERATION] Mute route error:', error);
        res.status(400).json({ 
            message: error.message || 'Failed to mute user' 
        });
    }
});

/**
 * @route POST /api/moderation/ban
 * @desc Ban a user
 * @access Owner+
 */
router.post('/ban', async (req, res) => {
    try {
        const { targetUserId, chatRoomId, reason, duration, metadata } = req.body;
        
        if (!targetUserId || !chatRoomId || !reason) {
            return res.status(400).json({ 
                message: 'Target user ID, chat room ID, and reason are required' 
            });
        }

        // Check if user has permission to ban
        if (!['mainowner', 'owner'].includes(req.user.rank)) {
            return res.status(403).json({ 
                message: 'Insufficient permissions to ban users' 
            });
        }

        const result = await ModerationService.banUser(
            req.user.id,
            targetUserId,
            chatRoomId,
            reason,
            duration,
            metadata
        );

        res.json({
            message: 'User banned successfully',
            ...result
        });

    } catch (error) {
        console.error('🎭 [MODERATION] Ban route error:', error);
        res.status(400).json({ 
            message: error.message || 'Failed to ban user' 
        });
    }
});

/**
 * @route POST /api/moderation/kick
 * @desc Kick a user
 * @access Moderator+
 */
router.post('/kick', async (req, res) => {
    try {
        const { targetUserId, chatRoomId, reason, metadata } = req.body;
        
        if (!targetUserId || !chatRoomId || !reason) {
            return res.status(400).json({ 
                message: 'Target user ID, chat room ID, and reason are required' 
            });
        }

        const result = await ModerationService.kickUser(
            req.user.id,
            targetUserId,
            chatRoomId,
            reason,
            metadata
        );

        res.json({
            message: 'User kicked successfully',
            ...result
        });

    } catch (error) {
        console.error('🎭 [MODERATION] Kick route error:', error);
        res.status(400).json({ 
            message: error.message || 'Failed to kick user' 
        });
    }
});

/**
 * @route POST /api/moderation/revoke
 * @desc Revoke a moderation action
 * @access Moderator+
 */
router.post('/revoke', async (req, res) => {
    try {
        const { actionId, reason } = req.body;
        
        if (!actionId || !reason) {
            return res.status(400).json({ 
                message: 'Action ID and reason are required' 
            });
        }

        const result = await ModerationService.revokeAction(
            actionId,
            req.user.id,
            reason
        );

        res.json({
            message: 'Action revoked successfully',
            ...result
        });

    } catch (error) {
        console.error('🎭 [MODERATION] Revoke route error:', error);
        res.status(400).json({ 
            message: error.message || 'Failed to revoke action' 
        });
    }
});

/**
 * @route GET /api/moderation/status/:userId/:chatRoomId
 * @desc Check moderation status of a user in a specific chat room
 * @access Any authenticated user
 */
router.get('/status/:userId/:chatRoomId', async (req, res) => {
    try {
        const { userId, chatRoomId } = req.params;
        
        const [muteStatus, banStatus, warnings] = await Promise.all([
            ModerationService.isUserMuted(userId, chatRoomId),
            ModerationService.isUserBanned(userId, chatRoomId),
            ModerationAction.getUserWarnings(userId, chatRoomId)
        ]);

        res.json({
            userId,
            chatRoomId,
            muteStatus,
            banStatus,
            warningCount: warnings.length,
            warnings: warnings.map(w => ({
                id: w._id,
                reason: w.reason,
                moderator: w.moderator,
                createdAt: w.createdAt
            }))
        });

    } catch (error) {
        console.error('🎭 [MODERATION] Status check error:', error);
        res.status(500).json({ 
            message: 'Failed to check moderation status' 
        });
    }
});

/**
 * @route GET /api/moderation/history/:userId
 * @desc Get moderation history for a user
 * @access Moderator+
 */
router.get('/history/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { limit = 50 } = req.query;

        // Check if user has permission to view history
        if (!['mainowner', 'owner', 'moderator'].includes(req.user.rank)) {
            return res.status(403).json({ 
                message: 'Insufficient permissions to view moderation history' 
            });
        }

        const history = await ModerationService.getUserModerationHistory(
            userId, 
            parseInt(limit)
        );

        res.json({
            userId,
            history: history.map(action => ({
                id: action._id,
                actionType: action.actionType,
                reason: action.reason,
                moderator: action.moderator,
                chatRoom: action.chatRoom,
                duration: action.duration,
                expiresAt: action.expiresAt,
                status: action.status,
                createdAt: action.createdAt,
                metadata: action.metadata
            }))
        });

    } catch (error) {
        console.error('🎭 [MODERATION] History error:', error);
        res.status(500).json({ 
            message: 'Failed to get moderation history' 
        });
    }
});

/**
 * @route GET /api/moderation/active/:userId
 * @desc Get active moderation actions for a user
 * @access Moderator+
 */
router.get('/active/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        // Check if user has permission to view active actions
        if (!['mainowner', 'owner', 'moderator'].includes(req.user.rank)) {
            return res.status(403).json({ 
                message: 'Insufficient permissions to view active actions' 
            });
        }

        const activeActions = await ModerationService.getUserActiveActions(userId);

        res.json({
            userId,
            activeActions: activeActions.map(action => ({
                id: action._id,
                actionType: action.actionType,
                reason: action.reason,
                moderator: action.moderator,
                chatRoom: action.chatRoom,
                duration: action.duration,
                expiresAt: action.expiresAt,
                createdAt: action.createdAt,
                metadata: action.metadata
            }))
        });

    } catch (error) {
        console.error('🎭 [MODERATION] Active actions error:', error);
        res.status(500).json({ 
            message: 'Failed to get active actions' 
        });
    }
});

/**
 * @route GET /api/moderation/chat/:chatRoomId
 * @desc Get all moderation actions for a specific chat room
 * @access Moderator+
 */
router.get('/chat/:chatRoomId', async (req, res) => {
    try {
        const { chatRoomId } = req.params;
        const { limit = 100, actionType, status } = req.query;

        // Check if user has permission to view chat moderation
        if (!['mainowner', 'owner', 'moderator'].includes(req.user.rank)) {
            return res.status(403).json({ 
                message: 'Insufficient permissions to view chat moderation' 
            });
        }

        // Build query
        const query = { chatRoom: chatRoomId };
        if (actionType) query.actionType = actionType;
        if (status) query.status = status;

        const actions = await ModerationAction.find(query)
            .populate('targetUser', 'username rank')
            .populate('moderator', 'username rank')
            .sort({ createdAt: -1 })
            .limit(parseInt(limit));

        res.json({
            chatRoomId,
            actions: actions.map(action => ({
                id: action._id,
                actionType: action.actionType,
                targetUser: action.targetUser,
                moderator: action.moderator,
                reason: action.reason,
                duration: action.duration,
                expiresAt: action.expiresAt,
                status: action.status,
                createdAt: action.createdAt,
                metadata: action.metadata
            }))
        });

    } catch (error) {
        console.error('🎭 [MODERATION] Chat moderation error:', error);
        res.status(500).json({ 
            message: 'Failed to get chat moderation data' 
        });
    }
});

/**
 * @route GET /api/moderation/stats
 * @desc Get moderation statistics
 * @access Moderator+
 */
router.get('/stats', async (req, res) => {
    try {
        const { chatRoomId, timeRange = '24h' } = req.query;

        // Check if user has permission to view stats
        if (!['mainowner', 'owner', 'moderator'].includes(req.user.rank)) {
            return res.status(403).json({ 
                message: 'Insufficient permissions to view moderation stats' 
            });
        }

        // Calculate time range
        const now = new Date();
        let startDate;
        switch (timeRange) {
            case '1h':
                startDate = new Date(now.getTime() - (60 * 60 * 1000));
                break;
            case '24h':
                startDate = new Date(now.getTime() - (24 * 60 * 60 * 1000));
                break;
            case '7d':
                startDate = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000));
                break;
            case '30d':
                startDate = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
                break;
            default:
                startDate = new Date(now.getTime() - (24 * 60 * 60 * 1000));
        }

        // Build query
        const query = { createdAt: { $gte: startDate } };
        if (chatRoomId) query.chatRoom = chatRoomId;

        // Get action counts by type
        const actionStats = await ModerationAction.aggregate([
            { $match: query },
            { $group: { 
                _id: '$actionType', 
                count: { $sum: 1 } 
            }},
            { $sort: { count: -1 } }
        ]);

        // Get moderator activity
        const moderatorStats = await ModerationAction.aggregate([
            { $match: query },
            { $group: { 
                _id: '$moderator', 
                count: { $sum: 1 } 
            }},
            { $sort: { count: -1 } },
            { $limit: 10 }
        ]);

        // Get total actions
        const totalActions = await ModerationAction.countDocuments(query);

        res.json({
            timeRange,
            chatRoomId,
            totalActions,
            actionStats,
            moderatorStats,
            period: {
                start: startDate,
                end: now
            }
        });

    } catch (error) {
        console.error('🎭 [MODERATION] Stats error:', error);
        res.status(500).json({ 
            message: 'Failed to get moderation statistics' 
        });
    }
});

module.exports = router;
