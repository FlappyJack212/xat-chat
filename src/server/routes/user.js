const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { username, email, avatarId, level } = req.body;
    
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update fields
    if (username) user.username = username;
    if (email) user.email = email;
    if (avatarId) user.avatarId = avatarId;
    if (level) user.level = level;

    await user.save();
    
    const userResponse = user.toObject();
    delete userResponse.password;
    
    res.json(userResponse);
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's rooms
router.get('/rooms', auth, async (req, res) => {
  try {
    // This would need to be implemented based on how rooms are associated with users
    // For now, return empty array
    res.json({ rooms: [] });
  } catch (error) {
    console.error('Error fetching user rooms:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's friends
router.get('/friends', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('friends');
    res.json({ friends: user.friends || [] });
  } catch (error) {
    console.error('Error fetching user friends:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add friend
router.post('/friends/:friendId', auth, async (req, res) => {
  try {
    const { friendId } = req.params;
    
    const user = await User.findById(req.user.id);
    const friend = await User.findById(friendId);
    
    if (!friend) {
      return res.status(404).json({ message: 'Friend not found' });
    }
    
    if (user.friends.includes(friendId)) {
      return res.status(400).json({ message: 'Already friends' });
    }
    
    user.friends.push(friendId);
    await user.save();
    
    res.json({ message: 'Friend added successfully' });
  } catch (error) {
    console.error('Error adding friend:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove friend
router.delete('/friends/:friendId', auth, async (req, res) => {
  try {
    const { friendId } = req.params;
    
    const user = await User.findById(req.user.id);
    user.friends = user.friends.filter(id => id.toString() !== friendId);
    await user.save();
    
    res.json({ message: 'Friend removed successfully' });
  } catch (error) {
    console.error('Error removing friend:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's powers
router.get('/powers', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('powers');
    res.json({ powers: user.powers || [] });
  } catch (error) {
    console.error('Error fetching user powers:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add power to user
router.post('/powers/:powerId', auth, async (req, res) => {
  try {
    const { powerId } = req.params;
    
    const user = await User.findById(req.user.id);
    if (user.powers.includes(powerId)) {
      return res.status(400).json({ message: 'Power already owned' });
    }
    
    user.powers.push(powerId);
    await user.save();
    
    res.json({ message: 'Power added successfully' });
  } catch (error) {
    console.error('Error adding power:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get online users
router.get('/online', async (req, res) => {
  try {
    const users = await User.find({ status: 'online' })
      .select('username avatarId level')
      .limit(50);
    
    res.json({ users });
  } catch (error) {
    console.error('Error fetching online users:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/users/:id/powers (new endpoint for xat-engine)
// @desc    Get user's powers
// @access  Public (for demo)
router.get('/:id/powers', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('powers');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Format powers for xat-engine
    const userPowers = [
      { powerId: 1, count: 5 }, // rainbow
      { powerId: 2, count: 3 }, // sparkle
      { powerId: 3, count: 2 }  // fire
    ];
    
    res.json({
      success: true,
      powers: userPowers
    });
  } catch (error) {
    console.error('Error fetching user powers:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user powers'
    });
  }
});

module.exports = router;
