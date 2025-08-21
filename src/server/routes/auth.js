const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create new user
    const newUser = new User({
      username,
      email,
      passwordHash: hashedPassword,
      displayName: username,
      avatarId: 'default',
      level: 1,
      credits: 1000,
      powers: [],
      friends: [],
      blocked: [],
      status: 'online',
      lastSeen: new Date(),
      settings: {
        sound: true,
        notifications: true,
        privacy: {
          showStatus: true,
          allowFriendRequests: true
        }
      }
    });
    
    // Save user to database
    await newUser.save();
    
    // Generate JWT token
    const token = jwt.sign(
      { id: newUser._id, username: newUser.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.status(201).json({
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        displayName: newUser.displayName,
        avatarId: newUser.avatarId
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }
    
    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }
    
    // Update user status
    user.status = 'online';
    user.lastSeen = new Date();
    await user.save();
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        displayName: user.displayName,
        avatarId: user.avatarId
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Logout user
router.post('/logout', async (req, res) => {
  try {
    // Get user ID from token
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    
    if (user) {
      // Update user status
      user.status = 'offline';
      user.lastSeen = new Date();
      await user.save();
    }
    
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;