const express = require('express');
const Message = require('../models/Message');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/messages
// @desc    Send a message to a room
// @access  Public (for demo)
router.post('/', async (req, res) => {
  try {
    const { text, roomId, userId, powerEffect } = req.body;
    
    const message = new Message({
      text,
      room: roomId,
      user: userId,
      powerEffect,
      timestamp: new Date()
    });
    
    await message.save();
    
    res.json({
      success: true,
      message: message
    });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message'
    });
  }
});

// @route   GET /api/messages/:roomId
// @desc    Get recent messages for a room
// @access  Public (for demo)
router.get('/:roomId', async (req, res) => {
  try {
    const messages = await Message.find({ room: req.params.roomId })
      .populate('user', 'username avatarId')
      .sort({ timestamp: -1 })
      .limit(50);
    
    const formattedMessages = messages.reverse().map(msg => ({
      id: msg._id,
      userId: msg.user?._id || 'unknown',
      username: msg.user?.username || 'Unknown',
      text: msg.text,
      powerEffect: msg.powerEffect,
      timestamp: msg.timestamp
    }));
    
    res.json({
      success: true,
      messages: formattedMessages
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch messages'
    });
  }
});

module.exports = router;
