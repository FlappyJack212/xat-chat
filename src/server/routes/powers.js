const express = require('express');
const Power = require('../models/Power');
const UserPower = require('../models/UserPower');
const User = require('../models/User');
const { authenticateToken } = require('./auth');
const router = express.Router();
const mongoose = require('mongoose'); // Added for direct MongoDB access

// Get all available powers
router.get('/', async (req, res) => {
    try {
        const { category, section, status, minCost, maxCost, rank } = req.query;
        
        let query = {};
        
        // Filter by section (this matches our imported data)
        if (section) {
            query.section = section;
        }
        
        // Filter by cost range
        if (minCost || maxCost) {
            query.cost = {};
            if (minCost) query.cost.$gte = parseInt(minCost);
            if (maxCost) query.cost.$lte = parseInt(maxCost);
        }
        
        // Filter by limited status
        if (status === 'limited') {
            query.limited = 1;
        } else if (status === 'unlimited') {
            query.limited = 0;
        }
        
        // Get powers from the native MongoDB collection
        const powersCollection = mongoose.connection.db.collection('powers');
        
        const powers = await powersCollection.find(query)
            .sort({ cost: 1, name: 1 })
            .toArray();
        
        res.json({
            message: 'Powers retrieved successfully',
            count: powers.length,
            powers: powers
        });
        
    } catch (error) {
        console.error('Get powers error:', error);
        res.status(500).json({ message: 'Server error retrieving powers' });
    }
});

// Get power by ID
router.get('/:id', async (req, res) => {
    try {
        const power = await Power.findById(req.params.id);
        
        if (!power) {
            return res.status(404).json({ message: 'Power not found' });
        }
        
        res.json({
            message: 'Power retrieved successfully',
            power: power
        });
        
    } catch (error) {
        console.error('Get power error:', error);
        res.status(500).json({ message: 'Server error retrieving power' });
    }
});

// Get powers by section
router.get('/section/:section', async (req, res) => {
    try {
        const powers = await Power.findBySection(req.params.section);
        
        res.json({
            message: 'Powers retrieved successfully',
            section: req.params.section,
            count: powers.length,
            powers: powers
        });
        
    } catch (error) {
        console.error('Get powers by section error:', error);
        res.status(500).json({ message: 'Server error retrieving powers by section' });
    }
});

// Get powers by category
router.get('/category/:category', async (req, res) => {
    try {
        const powers = await Power.findByCategory(req.params.category);
        
        res.json({
            message: 'Powers retrieved successfully',
            category: req.params.category,
            count: powers.length,
            powers: powers
        });
        
    } catch (error) {
        console.error('Get powers by category error:', error);
        res.status(500).json({ message: 'Server error retrieving powers by category' });
    }
});

// Get power statistics
router.get('/stats/overview', async (req, res) => {
    try {
        const stats = await Power.getPowerStats();
        
        res.json({
            message: 'Power statistics retrieved successfully',
            stats: stats
        });
        
    } catch (error) {
        console.error('Get power stats error:', error);
        res.status(500).json({ message: 'Server error retrieving power statistics' });
    }
});

// Get powers grouped by section
router.get('/stats/by-section', async (req, res) => {
    try {
        const sectionStats = await Power.getPowersBySection();
        
        res.json({
            message: 'Power section statistics retrieved successfully',
            sections: sectionStats
        });
        
    } catch (error) {
        console.error('Get power section stats error:', error);
        res.status(500).json({ message: 'Server error retrieving power section statistics' });
    }
});

// Purchase a power (requires authentication)
router.post('/:id/purchase', authenticateToken, async (req, res) => {
    try {
        const powerId = req.params.id;
        const userId = req.user._id;
        
        // Get the power
        const power = await Power.findById(powerId);
        if (!power) {
            return res.status(404).json({ message: 'Power not found' });
        }
        
        // Check if power is available
        if (!power.isAvailable()) {
            return res.status(400).json({ message: 'Power is not available for purchase' });
        }
        
        // Check if user can purchase this power
        if (!power.canBePurchasedBy(req.user)) {
            return res.status(400).json({ message: 'You cannot purchase this power' });
        }
        
        // Check if user already has this power
        const existingUserPower = await UserPower.findOne({ user: userId, power: powerId });
        if (existingUserPower) {
            return res.status(400).json({ message: 'You already own this power' });
        }
        
        // Check if user has enough xats
        if (req.user.xats < power.cost) {
            return res.status(400).json({ 
                message: 'Insufficient xats',
                required: power.cost,
                available: req.user.xats
            });
        }
        
        // Check if power is limited and still available
        if (power.amount > 0 && power.totalSold >= power.amount) {
            return res.status(400).json({ message: 'Power is sold out' });
        }
        
        // Deduct xats from user
        await req.user.removeXats(power.cost);
        
        // Create user power record
        const userPower = new UserPower({
            user: userId,
            power: powerId,
            purchasedFor: power.cost,
            purchasedFrom: 'store'
        });
        
        await userPower.save();
        
        // Update power statistics
        power.totalSold++;
        await power.save();
        
        // Add purchase to history
        userPower.history.push({
            action: 'purchased',
            timestamp: new Date(),
            details: { cost: power.cost, source: 'store' }
        });
        
        await userPower.save();
        
        res.json({
            message: 'Power purchased successfully',
            power: power,
            userPower: userPower,
            remainingXats: req.user.xats
        });
        
    } catch (error) {
        console.error('Purchase power error:', error);
        res.status(500).json({ message: 'Server error purchasing power' });
    }
});

// Gift a power to another user (requires authentication)
router.post('/:id/gift', authenticateToken, async (req, res) => {
    try {
        const powerId = req.params.id;
        const { targetUsername } = req.body;
        
        if (!targetUsername) {
            return res.status(400).json({ message: 'Target username is required' });
        }
        
        // Get the power
        const power = await Power.findById(powerId);
        if (!power) {
            return res.status(404).json({ message: 'Power not found' });
        }
        
        // Check if power is available
        if (!power.isAvailable()) {
            return res.status(400).json({ message: 'Power is not available for gifting' });
        }
        
        // Find target user
        const targetUser = await User.findOne({ username: targetUsername.toLowerCase() });
        if (!targetUser) {
            return res.status(404).json({ message: 'Target user not found' });
        }
        
        // Check if target user can receive this power
        if (!power.canBePurchasedBy(targetUser)) {
            return res.status(400).json({ message: 'Target user cannot receive this power' });
        }
        
        // Check if target user already has this power
        const existingUserPower = await UserPower.findOne({ user: targetUser._id, power: powerId });
        if (existingUserPower) {
            return res.status(400).json({ message: 'Target user already owns this power' });
        }
        
        // Check if user has enough xats
        if (req.user.xats < power.cost) {
            return res.status(400).json({ 
                message: 'Insufficient xats',
                required: power.cost,
                available: req.user.xats
            });
        }
        
        // Deduct xats from gifter
        await req.user.removeXats(power.cost);
        
        // Create user power record for target user
        const userPower = new UserPower({
            user: targetUser._id,
            power: powerId,
            purchasedFor: power.cost,
            purchasedFrom: 'gift'
        });
        
        await userPower.save();
        
        // Update power statistics
        power.totalSold++;
        await power.save();
        
        // Add gift to history
        userPower.history.push({
            action: 'purchased',
            timestamp: new Date(),
            details: { 
                cost: power.cost, 
                source: 'gift',
                giftedBy: req.user.username
            }
        });
        
        await userPower.save();
        
        res.json({
            message: 'Power gifted successfully',
            power: power,
            targetUser: targetUser.username,
            remainingXats: req.user.xats
        });
        
    } catch (error) {
        console.error('Gift power error:', error);
        res.status(500).json({ message: 'Server error gifting power' });
    }
});

// Get user's powers (requires authentication)
router.get('/user/me', authenticateToken, async (req, res) => {
    try {
        const userPowers = await UserPower.findActiveByUser(req.user._id);
        
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

// Get specific user's powers (admin only)
router.get('/user/:userId', authenticateToken, async (req, res) => {
    try {
        // Check if user has permission to view other users' powers
        if (req.user.rank !== 'mainowner' && req.user.rank !== 'owner') {
            return res.status(403).json({ message: 'Insufficient permissions' });
        }
        
        const userPowers = await UserPower.findActiveByUser(req.params.userId);
        
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

// Activate a power (requires authentication)
router.post('/user/:powerId/activate', authenticateToken, async (req, res) => {
    try {
        const powerId = req.params.powerId;
        const userId = req.user._id;
        
        // Find user power
        const userPower = await UserPower.findOne({ user: userId, power: powerId });
        if (!userPower) {
            return res.status(404).json({ message: 'Power not found' });
        }
        
        // Check if power can be used
        if (!userPower.canUse()) {
            return res.status(400).json({ 
                message: 'Power cannot be used at this time',
                reason: userPower.getCooldownRemaining() > 0 ? 'cooldown' : 'expired'
            });
        }
        
        // Activate the power
        await userPower.activate();
        
        res.json({
            message: 'Power activated successfully',
            power: userPower,
            cooldownRemaining: userPower.getCooldownRemaining()
        });
        
    } catch (error) {
        console.error('Activate power error:', error);
        res.status(500).json({ message: 'Server error activating power' });
    }
});

// Deactivate a power (requires authentication)
router.post('/user/:powerId/deactivate', authenticateToken, async (req, res) => {
    try {
        const powerId = req.params.powerId;
        const userId = req.user._id;
        
        // Find user power
        const userPower = await UserPower.findOne({ user: userId, power: powerId });
        if (!userPower) {
            return res.status(404).json({ message: 'Power not found' });
        }
        
        // Deactivate the power
        await userPower.deactivate();
        
        res.json({
            message: 'Power deactivated successfully',
            power: userPower
        });
        
    } catch (error) {
        console.error('Deactivate power error:', error);
        res.status(500).json({ message: 'Server error deactivating power' });
    }
});

// Configure a power (requires authentication)
router.put('/user/:powerId/configure', authenticateToken, async (req, res) => {
    try {
        const powerId = req.params.powerId;
        const userId = req.user._id;
        const { settings } = req.body;
        
        if (!settings) {
            return res.status(400).json({ message: 'Settings are required' });
        }
        
        // Find user power
        const userPower = await UserPower.findOne({ user: userId, power: powerId });
        if (!userPower) {
            return res.status(404).json({ message: 'Power not found' });
        }
        
        // Configure the power
        await userPower.configure(settings);
        
        res.json({
            message: 'Power configured successfully',
            power: userPower
        });
        
    } catch (error) {
        console.error('Configure power error:', error);
        res.status(500).json({ message: 'Server error configuring power' });
    }
});

// Get power usage statistics (admin only)
router.get('/stats/usage', authenticateToken, async (req, res) => {
    try {
        // Check if user has permission
        if (req.user.rank !== 'mainowner' && req.user.rank !== 'owner') {
            return res.status(403).json({ message: 'Insufficient permissions' });
        }
        
        const usageStats = await UserPower.aggregate([
            {
                $group: {
                    _id: '$power',
                    totalUsers: { $sum: 1 },
                    totalUsage: { $sum: '$usageCount' },
                    activeUsers: { $sum: { $cond: ['$active', 1, 0] } }
                }
            },
            {
                $lookup: {
                    from: 'powers',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'powerInfo'
                }
            },
            {
                $unwind: '$powerInfo'
            },
            {
                $project: {
                    powerName: '$powerInfo.name',
                    totalUsers: 1,
                    totalUsage: 1,
                    activeUsers: 1
                }
            },
            {
                $sort: { totalUsage: -1 }
            }
        ]);
        
        res.json({
            message: 'Power usage statistics retrieved successfully',
            stats: usageStats
        });
        
    } catch (error) {
        console.error('Get power usage stats error:', error);
        res.status(500).json({ message: 'Server error retrieving power usage statistics' });
    }
});

module.exports = router;
