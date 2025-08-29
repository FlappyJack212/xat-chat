const express = require('express');
const User = require('../models/User');
const UserPower = require('../models/UserPower');
const { authenticateToken } = require('./auth');
const router = express.Router();

// Get all users (admin only)
router.get('/', authenticateToken, async (req, res) => {
    try {
        // Check if user has permission
        if (req.user.rank !== 'mainowner' && req.user.rank !== 'owner') {
            return res.status(403).json({ message: 'Insufficient permissions' });
        }

        const { page = 1, limit = 50, rank, status, search } = req.query;
        
        let query = {};
        
        // Filter by rank
        if (rank) {
            query.rank = rank;
        }
        
        // Filter by status
        if (status === 'online') {
            query.isOnline = true;
        } else if (status === 'offline') {
            query.isOnline = false;
        }
        
        // Search by username
        if (search) {
            query.username = { $regex: search, $options: 'i' };
        }
        
        const users = await User.find(query)
            .select('-password -loginKey -k -k2 -k3 -apiKey')
            .sort({ lastSeen: -1 })
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit));
        
        const total = await User.countDocuments(query);
        
        res.json({
            message: 'Users retrieved successfully',
            users: users,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: total,
                pages: Math.ceil(total / parseInt(limit))
            }
        });
        
    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({ message: 'Server error retrieving users' });
    }
});

// Get user by ID
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const userId = req.params.id;
        
        // Users can only view their own profile unless they're admin
        if (userId !== req.user._id.toString() && 
            req.user.rank !== 'mainowner' && 
            req.user.rank !== 'owner') {
            return res.status(403).json({ message: 'Insufficient permissions' });
        }
        
        const user = await User.findById(userId)
            .select('-password -loginKey -k -k2 -k3 -apiKey');
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.json({
            message: 'User retrieved successfully',
            user: user
        });
        
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({ message: 'Server error retrieving user' });
    }
});

// Get user by username
router.get('/username/:username', async (req, res) => {
    try {
        const username = req.params.username.toLowerCase();
        
        const user = await User.findOne({ username: username })
            .select('-password -loginKey -k -k2 -k3 -apiKey -email');
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.json({
            message: 'User retrieved successfully',
            user: user
        });
        
    } catch (error) {
        console.error('Get user by username error:', error);
        res.status(500).json({ message: 'Server error retrieving user' });
    }
});

// Update user profile (own profile only)
router.put('/profile', authenticateToken, async (req, res) => {
    try {
        const { nickname, avatar, url, bio, preferences } = req.body;
        
        // Update allowed fields
        if (nickname !== undefined) req.user.nickname = nickname;
        if (avatar !== undefined) req.user.avatar = avatar;
        if (url !== undefined) req.user.url = url;
        if (bio !== undefined) req.user.bio = bio;
        if (preferences !== undefined) {
            req.user.preferences = { ...req.user.preferences, ...preferences };
        }
        
        await req.user.save();
        
        res.json({
            message: 'Profile updated successfully',
            user: req.user
        });
        
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ message: 'Server error updating profile' });
    }
});

// Update user (admin only)
router.put('/:id', authenticateToken, async (req, res) => {
    try {
        // Check if user has permission
        if (req.user.rank !== 'mainowner' && req.user.rank !== 'owner') {
            return res.status(403).json({ message: 'Insufficient permissions' });
        }
        
        const userId = req.params.id;
        const targetUser = await User.findById(userId);
        
        if (!targetUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Check if admin is trying to modify someone with higher or equal rank
        if (req.user.rank !== 'mainowner' && targetUser.hasRank(req.user.rank)) {
            return res.status(403).json({ message: 'Cannot modify user with equal or higher rank' });
        }
        
        const { nickname, avatar, url, bio, rank, xats, days, enabled } = req.body;
        
        // Update allowed fields
        if (nickname !== undefined) targetUser.nickname = nickname;
        if (avatar !== undefined) targetUser.avatar = avatar;
        if (url !== undefined) targetUser.url = url;
        if (bio !== undefined) targetUser.bio = bio;
        if (rank !== undefined) targetUser.rank = rank;
        if (xats !== undefined) targetUser.xats = xats;
        if (days !== undefined) targetUser.days = days;
        if (enabled !== undefined) targetUser.enabled = enabled;
        
        await targetUser.save();
        
        res.json({
            message: 'User updated successfully',
            user: targetUser
        });
        
    } catch (error) {
        console.error('Update user error:', error);
        res.status(500).json({ message: 'Server error updating user' });
    }
});

// Change user rank (admin only)
router.put('/:id/rank', authenticateToken, async (req, res) => {
    try {
        // Check if user has permission
        if (req.user.rank !== 'mainowner' && req.user.rank !== 'owner') {
            return res.status(403).json({ message: 'Insufficient permissions' });
        }
        
        const userId = req.params.id;
        const { newRank } = req.body;
        
        if (!newRank) {
            return res.status(400).json({ message: 'New rank is required' });
        }
        
        const targetUser = await User.findById(userId);
        if (!targetUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Check if admin is trying to modify someone with higher or equal rank
        if (req.user.rank !== 'mainowner' && targetUser.hasRank(req.user.rank)) {
            return res.status(403).json({ message: 'Cannot modify user with equal or higher rank' });
        }
        
        // Change rank
        await targetUser.changeRank(newRank, req.user);
        
        res.json({
            message: `User rank changed to ${newRank} successfully`,
            user: targetUser
        });
        
    } catch (error) {
        console.error('Change user rank error:', error);
        res.status(500).json({ message: 'Server error changing user rank' });
    }
});

// Ban user (admin only)
router.post('/:id/ban', authenticateToken, async (req, res) => {
    try {
        // Check if user has permission
        if (req.user.rank !== 'mainowner' && req.user.rank !== 'owner') {
            return res.status(403).json({ message: 'Insufficient permissions' });
        }
        
        const userId = req.params.id;
        const { duration, reason } = req.body;
        
        if (!duration || !reason) {
            return res.status(400).json({ message: 'Duration and reason are required' });
        }
        
        const targetUser = await User.findById(userId);
        if (!targetUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Check if admin is trying to ban someone with higher or equal rank
        if (req.user.rank !== 'mainowner' && targetUser.hasRank(req.user.rank)) {
            return res.status(403).json({ message: 'Cannot ban user with equal or higher rank' });
        }
        
        // Ban user
        await targetUser.ban(duration, reason, req.user);
        
        res.json({
            message: `User banned for ${duration} hours successfully`,
            user: targetUser
        });
        
    } catch (error) {
        console.error('Ban user error:', error);
        res.status(500).json({ message: 'Server error banning user' });
    }
});

// Unban user (admin only)
router.post('/:id/unban', authenticateToken, async (req, res) => {
    try {
        // Check if user has permission
        if (req.user.rank !== 'mainowner' && req.user.rank !== 'owner') {
            return res.status(403).json({ message: 'Insufficient permissions' });
        }
        
        const userId = req.params.id;
        const targetUser = await User.findById(userId);
        
        if (!targetUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Unban user
        await targetUser.unban();
        
        res.json({
            message: 'User unbanned successfully',
            user: targetUser
        });
        
    } catch (error) {
        console.error('Unban user error:', error);
        res.status(500).json({ message: 'Server error unbanning user' });
    }
});

// Kick user (admin only)
router.post('/:id/kick', authenticateToken, async (req, res) => {
    try {
        // Check if user has permission
        if (req.user.rank !== 'mainowner' && req.user.rank !== 'owner' && req.user.rank !== 'moderator') {
            return res.status(403).json({ message: 'Insufficient permissions' });
        }
        
        const userId = req.params.id;
        const { reason } = req.body;
        
        if (!reason) {
            return res.status(400).json({ message: 'Reason is required' });
        }
        
        const targetUser = await User.findById(userId);
        if (!targetUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Check if moderator is trying to kick someone with higher or equal rank
        if (req.user.rank === 'moderator' && targetUser.hasRank('moderator')) {
            return res.status(403).json({ message: 'Cannot kick user with equal or higher rank' });
        }
        
        // Add warning
        targetUser.warnings.push({
            reason: `Kicked: ${reason}`,
            moderator: req.user._id,
            date: new Date()
        });
        
        await targetUser.save();
        
        res.json({
            message: 'User kicked successfully',
            user: targetUser
        });
        
    } catch (error) {
        console.error('Kick user error:', error);
        res.status(500).json({ message: 'Server error kicking user' });
    }
});

// Get user's powers
router.get('/:id/powers', authenticateToken, async (req, res) => {
    try {
        const userId = req.params.id;
        
        // Users can only view their own powers unless they're admin
        if (userId !== req.user._id.toString() && 
            req.user.rank !== 'mainowner' && 
            req.user.rank !== 'owner') {
            return res.status(403).json({ message: 'Insufficient permissions' });
        }
        
        const userPowers = await UserPower.findActiveByUser(userId);
        
        res.json({
            message: 'User powers retrieved successfully',
            count: userPowers.length,
            powers: userPowers
        });
        
    } catch (error) {
        console.error('Get user powers error:', error);
        res.status(500).json({ message: 'Server error retrieving user powers' });
    }
});

// Get user statistics
router.get('/:id/stats', authenticateToken, async (req, res) => {
    try {
        const userId = req.params.id;
        
        // Users can only view their own stats unless they're admin
        if (userId !== req.user._id.toString() && 
            req.user.rank !== 'mainowner' && 
            req.user.rank !== 'owner') {
            return res.status(403).json({ message: 'Insufficient permissions' });
        }
        
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        const powerStats = await UserPower.getUserPowerStats(userId);
        
        const stats = {
            user: {
                username: user.username,
                rank: user.rank,
                xats: user.xats,
                days: user.days,
                totalMessages: user.totalMessages,
                totalLogins: user.totalLogins,
                registrationDate: user.registrationDate,
                lastSeen: user.lastSeen,
                isOnline: user.isOnline
            },
            powers: powerStats
        };
        
        res.json({
            message: 'User statistics retrieved successfully',
            stats: stats
        });
        
    } catch (error) {
        console.error('Get user stats error:', error);
        res.status(500).json({ message: 'Server error retrieving user statistics' });
    }
});

// Transfer xats to another user
router.post('/:id/transfer', authenticateToken, async (req, res) => {
    try {
        const userId = req.params.id;
        const { amount } = req.body;
        
        if (!amount || amount <= 0) {
            return res.status(400).json({ message: 'Valid amount is required' });
        }
        
        // Users can only transfer to others, not themselves
        if (userId === req.user._id.toString()) {
            return res.status(400).json({ message: 'Cannot transfer xats to yourself' });
        }
        
        const targetUser = await User.findById(userId);
        if (!targetUser) {
            return res.status(404).json({ message: 'Target user not found' });
        }
        
        // Check if user has enough xats
        if (req.user.xats < amount) {
            return res.status(400).json({ 
                message: 'Insufficient xats',
                required: amount,
                available: req.user.xats
            });
        }
        
        // Check if user is blocked from transfers
        if (req.user.transferBlock && req.user.transferBlock > new Date()) {
            return res.status(400).json({ message: 'Transfers are temporarily blocked' });
        }
        
        // Transfer xats
        await req.user.removeXats(amount);
        await targetUser.addXats(amount);
        
        res.json({
            message: `${amount} xats transferred successfully`,
            remainingXats: req.user.xats,
            targetUser: targetUser.username
        });
        
    } catch (error) {
        console.error('Transfer xats error:', error);
        res.status(500).json({ message: 'Server error transferring xats' });
    }
});

// Get online users
router.get('/online/list', async (req, res) => {
    try {
        const { limit = 100 } = req.query;
        
        const onlineUsers = await User.findOnline()
            .select('username rank avatar lastSeen')
            .limit(parseInt(limit))
            .sort({ lastSeen: -1 });
        
        res.json({
            message: 'Online users retrieved successfully',
            count: onlineUsers.length,
            users: onlineUsers
        });
        
    } catch (error) {
        console.error('Get online users error:', error);
        res.status(500).json({ message: 'Server error retrieving online users' });
    }
});

// Get users by rank
router.get('/rank/:rank/list', async (req, res) => {
    try {
        const { rank } = req.params;
        const { limit = 50 } = req.query;
        
        const users = await User.findByRank(rank)
            .select('username rank avatar lastSeen isOnline')
            .limit(parseInt(limit))
            .sort({ lastSeen: -1 });
        
        res.json({
            message: `Users with rank ${rank} retrieved successfully`,
            count: users.length,
            users: users
        });
        
    } catch (error) {
        console.error('Get users by rank error:', error);
        res.status(500).json({ message: 'Server error retrieving users by rank' });
    }
});

// Get system statistics (admin only)
router.get('/stats/system', authenticateToken, async (req, res) => {
    try {
        // Check if user has permission
        if (req.user.rank !== 'mainowner' && req.user.rank !== 'owner') {
            return res.status(403).json({ message: 'Insufficient permissions' });
        }
        
        const userStats = await User.getStats();
        
        res.json({
            message: 'System statistics retrieved successfully',
            stats: userStats
        });
        
    } catch (error) {
        console.error('Get system stats error:', error);
        res.status(500).json({ message: 'Server error retrieving system statistics' });
    }
});

// Search users
router.get('/search/:query', async (req, res) => {
    try {
        const { query } = req.params;
        const { limit = 20 } = req.query;
        
        const users = await User.find({
            $or: [
                { username: { $regex: query, $options: 'i' } },
                { nickname: { $regex: query, $options: 'i' } }
            ]
        })
        .select('username nickname rank avatar lastSeen isOnline')
        .limit(parseInt(limit))
        .sort({ lastSeen: -1 });
        
        res.json({
            message: 'Users found successfully',
            query: query,
            count: users.length,
            users: users
        });
        
    } catch (error) {
        console.error('Search users error:', error);
        res.status(500).json({ message: 'Server error searching users' });
    }
});

module.exports = router;
