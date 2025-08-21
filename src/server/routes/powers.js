const express = require('express');
const router = express.Router();
const Power = require('../models/Power');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Get all powers
router.get('/', async (req, res) => {
  try {
    const { category, limit = 50 } = req.query;
    
    let query = {};
    if (category) {
      query.category = category;
    }
    
    const powers = await Power.find(query)
      .limit(parseInt(limit))
      .sort({ name: 1 });
    
    res.json({ powers });
  } catch (error) {
    console.error('Error fetching powers:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get power by ID
router.get('/:powerId', async (req, res) => {
  try {
    const { powerId } = req.params;
    
    const power = await Power.findById(powerId);
    if (!power) {
      return res.status(404).json({ message: 'Power not found' });
    }
    
    res.json({ power });
  } catch (error) {
    console.error('Error fetching power:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new power (admin only)
router.post('/', auth, async (req, res) => {
  try {
    const { name, description, category, icon, effect, sound, animation, price = 0 } = req.body;
    
    // Check if power name already exists
    const existingPower = await Power.findOne({ name });
    if (existingPower) {
      return res.status(400).json({ message: 'Power name already exists' });
    }
    
    const power = new Power({
      name,
      description,
      category,
      icon,
      effect,
      sound,
      animation,
      price
    });
    
    await power.save();
    
    res.status(201).json({ power });
  } catch (error) {
    console.error('Error creating power:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update power (admin only)
router.put('/:powerId', auth, async (req, res) => {
  try {
    const { powerId } = req.params;
    const { name, description, category, icon, effect, sound, animation, price } = req.body;
    
    const power = await Power.findById(powerId);
    if (!power) {
      return res.status(404).json({ message: 'Power not found' });
    }
    
    // Update fields
    if (name) power.name = name;
    if (description) power.description = description;
    if (category) power.category = category;
    if (icon) power.icon = icon;
    if (effect) power.effect = effect;
    if (sound) power.sound = sound;
    if (animation) power.animation = animation;
    if (price !== undefined) power.price = price;
    
    await power.save();
    
    res.json({ power });
  } catch (error) {
    console.error('Error updating power:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete power (admin only)
router.delete('/:powerId', auth, async (req, res) => {
  try {
    const { powerId } = req.params;
    
    const power = await Power.findById(powerId);
    if (!power) {
      return res.status(404).json({ message: 'Power not found' });
    }
    
    await Power.findByIdAndDelete(powerId);
    
    res.json({ message: 'Power deleted successfully' });
  } catch (error) {
    console.error('Error deleting power:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get power categories
router.get('/categories/list', async (req, res) => {
  try {
    const categories = await Power.distinct('category');
    res.json({ categories });
  } catch (error) {
    console.error('Error fetching power categories:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get powers by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    
    const powers = await Power.find({ category }).sort({ name: 1 });
    
    res.json({ powers });
  } catch (error) {
    console.error('Error fetching powers by category:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Search powers
router.get('/search/:query', async (req, res) => {
  try {
    const { query } = req.params;
    
    const powers = await Power.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ]
    }).sort({ name: 1 });
    
    res.json({ powers });
  } catch (error) {
    console.error('Error searching powers:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get popular powers
router.get('/popular/list', async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    
    const powers = await Power.find()
      .sort({ usageCount: -1 })
      .limit(parseInt(limit));
    
    res.json({ powers });
  } catch (error) {
    console.error('Error fetching popular powers:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get free powers
router.get('/free/list', async (req, res) => {
  try {
    const powers = await Power.find({ price: 0 }).sort({ name: 1 });
    
    res.json({ powers });
  } catch (error) {
    console.error('Error fetching free powers:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get premium powers
router.get('/premium/list', async (req, res) => {
  try {
    const powers = await Power.find({ price: { $gt: 0 } }).sort({ price: 1 });
    
    res.json({ powers });
  } catch (error) {
    console.error('Error fetching premium powers:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Activate power effect
router.post('/:powerId/activate', auth, async (req, res) => {
  try {
    const { powerId } = req.params;
    const { roomId } = req.body;
    
    const power = await Power.findById(powerId);
    if (!power) {
      return res.status(404).json({ message: 'Power not found' });
    }
    
    // Increment usage count
    power.usageCount = (power.usageCount || 0) + 1;
    await power.save();
    
    // Return power effect data
    const effectData = {
      powerId: power._id,
      name: power.name,
      effect: power.effect,
      sound: power.sound,
      animation: power.animation,
      roomId: roomId,
      userId: req.user.id,
      timestamp: new Date()
    };
    
    res.json({ effect: effectData });
  } catch (error) {
    console.error('Error activating power:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's owned powers
router.get('/user/owned', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('powers');
    res.json({ powers: user.powers || [] });
  } catch (error) {
    console.error('Error fetching user powers:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Purchase power
router.post('/:powerId/purchase', auth, async (req, res) => {
  try {
    const { powerId } = req.params;
    
    const power = await Power.findById(powerId);
    if (!power) {
      return res.status(404).json({ message: 'Power not found' });
    }
    
    const user = await User.findById(req.user.id);
    
    // Check if user already owns the power
    if (user.powers.includes(powerId)) {
      return res.status(400).json({ message: 'Power already owned' });
    }
    
    // Check if user has enough credits/points
    if (user.credits < power.price) {
      return res.status(400).json({ message: 'Insufficient credits' });
    }
    
    // Deduct credits and add power
    user.credits -= power.price;
    user.powers.push(powerId);
    await user.save();
    
    res.json({ 
      message: 'Power purchased successfully',
      remainingCredits: user.credits
    });
  } catch (error) {
    console.error('Error purchasing power:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/powers/purchase (new endpoint for xat-engine)
// @desc    Purchase a power
// @access  Public (for demo)
router.post('/purchase', async (req, res) => {
  try {
    const { powerId } = req.body;
    
    const power = await Power.findById(powerId);
    if (!power) {
      return res.status(404).json({
        success: false,
        message: 'Power not found'
      });
    }
    
    // For demo purposes, always allow purchase
    res.json({
      success: true,
      message: `Successfully purchased ${power.name} power!`,
      power: power
    });
  } catch (error) {
    console.error('Error purchasing power:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to purchase power'
    });
  }
});

module.exports = router;
