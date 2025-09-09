const express = require('express');
const router = express.Router();
const Power = require('../models/Power');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Get all pawn powers
router.get('/pawns', async (req, res) => {
    try {
        const pawnPowers = await Power.find({ 
            category: 'pawn', 
            isActive: true 
        }).sort({ cost: 1 });
        
        res.json(pawnPowers);
    } catch (error) {
        console.error('Error fetching pawn powers:', error);
        res.status(500).json({ message: 'Failed to fetch pawn powers' });
    }
});

// Get all powers by category
router.get('/category/:category', async (req, res) => {
    try {
        const { category } = req.params;
        const powers = await Power.find({ 
            category: category, 
            isActive: true 
        }).sort({ cost: 1 });
        
        res.json(powers);
    } catch (error) {
        console.error('Error fetching powers:', error);
        res.status(500).json({ message: 'Failed to fetch powers' });
    }
});

// Buy a power
router.post('/buy', auth, async (req, res) => {
    try {
        const { powerId } = req.body;
        const userId = req.user.id;

        // Find the power
        const power = await Power.findById(powerId);
        if (!power) {
            return res.status(404).json({ message: 'Power not found' });
        }

        // Get user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if user can afford it
        if (user.xats < power.cost) {
            return res.status(400).json({ message: 'Not enough xats' });
        }

        // Check if user already owns this power (for pawns)
        if (power.category === 'pawn') {
            if (user.ownedPowers && user.ownedPowers.includes(powerId)) {
                return res.status(400).json({ message: 'You already own this power' });
            }
        }

        // Deduct cost
        user.xats -= power.cost;

        // Add power to user's owned powers
        if (!user.ownedPowers) {
            user.ownedPowers = [];
        }
        user.ownedPowers.push(powerId);

        // If it's a pawn, equip it automatically
        if (power.category === 'pawn') {
            user.pawn = power.name;
            user.pawnColor = power.color;
        }

        await user.save();

        res.json({
            success: true,
            message: `Successfully purchased ${power.displayName}`,
            user: {
                xats: user.xats,
                pawn: user.pawn,
                pawnColor: user.pawnColor
            },
            power: power
        });

    } catch (error) {
        console.error('Error buying power:', error);
        res.status(500).json({ message: 'Failed to buy power' });
    }
});

// Get user's owned powers
router.get('/owned', auth, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).populate('ownedPowers');
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            ownedPowers: user.ownedPowers || [],
            pawn: user.pawn,
            pawnColor: user.pawnColor
        });

    } catch (error) {
        console.error('Error fetching owned powers:', error);
        res.status(500).json({ message: 'Failed to fetch owned powers' });
    }
});

// Equip a pawn
router.post('/equip-pawn', auth, async (req, res) => {
    try {
        const { pawnName } = req.body;
        const userId = req.user.id;

        // Get user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find the pawn power
        const pawnPower = await Power.findOne({ 
            name: pawnName, 
            category: 'pawn' 
        });

        if (!pawnPower) {
            return res.status(404).json({ message: 'Pawn not found' });
        }

        // Check if user owns this pawn
        if (!user.ownedPowers || !user.ownedPowers.includes(pawnPower._id)) {
            return res.status(400).json({ message: 'You do not own this pawn' });
        }

        // Equip the pawn
        user.pawn = pawnName;
        user.pawnColor = pawnPower.color;
        await user.save();

        res.json({
            success: true,
            message: `Equipped ${pawnPower.displayName}`,
            pawn: user.pawn,
            pawnColor: user.pawnColor
        });

    } catch (error) {
        console.error('Error equipping pawn:', error);
        res.status(500).json({ message: 'Failed to equip pawn' });
    }
});

module.exports = router;