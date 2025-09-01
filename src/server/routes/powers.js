const express = require('express');
const Power = require('../models/Power');
const UserPower = require('../models/UserPower');
const User = require('../models/User');
const { authenticateToken } = require('./auth');
const router = express.Router();
const mongoose = require('mongoose');

// Get all powers with optional filters
router.get('/', async (req, res) => {
    try {
        const { category, section, status, minCost, maxCost, rank, tag } = req.query;
        let query = {};
        if (section) query.section = section;
        if (category) query.category = category;
        if (status === 'limited') query.limited = true;
        else if (status === 'unlimited') query.limited = false;
        if (minCost || maxCost) {
            query.cost = {};
            if (minCost) query.cost.$gte = parseInt(minCost);
            if (maxCost) query.cost.$lte = parseInt(maxCost);
        }
        if (rank) query['requirements.minRank'] = { $lte: rank };
        if (tag) query.tags = { $in: [tag] };
        const powers = await Power.find(query).sort({ cost: 1, name: 1 }).limit(100);
        res.json({ message: 'Powers retrieved successfully', count: powers.length, powers });
    } catch (error) {
        console.error('Get powers error:', error);
        res.status(500).json({ message: 'Server error retrieving powers' });
    }
});

// Get a specific power by ID
router.get('/:id', async (req, res) => {
    try {
        const power = await Power.findById(req.params.id);
        if (!power) return res.status(404).json({ message: 'Power not found' });
        res.json({ message: 'Power retrieved successfully', power });
    } catch (error) {
        console.error('Get power error:', error);
        res.status(500).json({ message: 'Server error retrieving power' });
    }
});

// Get powers by section
router.get('/section/:section', async (req, res) => {
    try {
        const powers = await Power.findBySection(req.params.section);
        res.json({ message: 'Powers retrieved successfully', section: req.params.section, count: powers.length, powers });
    } catch (error) {
        console.error('Get powers by section error:', error);
        res.status(500).json({ message: 'Server error retrieving powers by section' });
    }
});

// Get powers by category
router.get('/category/:category', async (req, res) => {
    try {
        const powers = await Power.findByCategory(req.params.category);
        res.json({ message: 'Powers retrieved successfully', category: req.params.category, count: powers.length, powers });
    } catch (error) {
        console.error('Get powers by category error:', error);
        res.status(500).json({ message: 'Server error retrieving powers by category' });
    }
});

// Get power statistics
router.get('/stats-overview', async (req, res) => {
    try {
        const stats = await Power.getPowerStats();
        res.json({ message: 'Power statistics retrieved successfully', stats });
    } catch (error) {
        console.error('Get power stats error:', error);
        res.status(500).json({ message: 'Server error retrieving power statistics' });
    }
});

// Get power statistics by section
router.get('/stats/by-section', async (req, res) => {
    try {
        const sectionStats = await Power.getPowersBySection();
        res.json({ message: 'Power section statistics retrieved successfully', sections: sectionStats });
    } catch (error) {
        console.error('Get power section stats error:', error);
        res.status(500).json({ message: 'Server error retrieving power section statistics' });
    }
});

// Get user-specific powers
router.get('/user/me', authenticateToken, async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        const powers = await Power.find();
        const userPowers = powers.filter(power => {
            const section = Math.floor(power.subid / 32);
            const bit = 1 << (power.subid % 32);
            return (user.powers[section] & bit) !== 0;
        });
        res.json({ message: 'User powers retrieved successfully', count: userPowers.length, powers: userPowers });
    } catch (error) {
        console.error('Get user powers error:', error);
        res.status(500).json({ message: 'Server error retrieving user powers' });
    }
});

// Purchase a power
router.post('/:id/purchase', authenticateToken, async (req, res) => {
    try {
        const powerId = req.params.id;
        const userId = req.user._id;
        const power = await Power.findById(powerId);
        if (!power) return res.status(404).json({ message: 'Power not found' });
        if (!power.isAvailable()) return res.status(400).json({ message: 'Power is not available for purchase' });
        if (!power.canBePurchasedBy(req.user)) return res.status(400).json({ message: 'You cannot purchase this power' });
        
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        
        const section = Math.floor(power.subid / 32);
        const bit = 1 << (power.subid % 32);
        if ((user.powers[section] & bit) !== 0) return res.status(400).json({ message: 'You already own this power' });
        
        if (user.xats < power.cost) return res.status(400).json({ message: 'Insufficient xats', required: power.cost, available: user.xats });
        
        user.xats -= power.cost;
        user.powers[section] |= bit; // Set the power bit
        await user.save();
        
        if (power.limited && power.amount > 0) {
            power.amount -= 1;
            power.totalSold += 1;
            await power.save();
        }
        
        // Record the purchase
        const userPower = new UserPower({ user: userId, power: powerId, purchasedAt: new Date() });
        await userPower.save();
        
        res.json({ 
            message: 'Power purchased successfully', 
            power: { _id: power._id, name: power.name, icon: power.images?.icon }, 
            user: { xats: user.xats }
        });
    } catch (error) {
        console.error('Purchase power error:', error);
        res.status(500).json({ message: 'Server error purchasing power' });
    }
});

// Activate a power (for use in a room)
router.post('/:id/activate', authenticateToken, async (req, res) => {
    try {
        const powerId = req.params.id;
        const userId = req.user._id;
        const { roomId } = req.body;
        
        const power = await Power.findById(powerId);
        if (!power) return res.status(404).json({ message: 'Power not found' });
        
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        
        const section = Math.floor(power.subid / 32);
        const bit = 1 << (power.subid % 32);
        if ((user.powers[section] & bit) === 0) return res.status(400).json({ message: 'You do not own this power' });
        
        // Check cooldowns
        const userPower = await UserPower.findOne({ user: userId, power: powerId });
        if (userPower && power.cooldown > 0) {
            const lastUsed = userPower.lastUsed || new Date(0);
            const now = new Date();
            if (now - lastUsed < power.cooldown * 1000) {
                return res.status(400).json({ message: 'Power is on cooldown' });
            }
            userPower.lastUsed = now;
            await userPower.save();
        }
        
        // Emit power activation to the room
        require('../xatServer').io.to(roomId).emit('power:activated', { 
            userId, 
            powerId, 
            powerName: power.name 
        });
        
        res.json({ message: 'Power activated successfully', power: { _id: power._id, name: power.name } });
    } catch (error) {
        console.error('Activate power error:', error);
        res.status(500).json({ message: 'Server error activating power' });
    }
});

module.exports = router;
