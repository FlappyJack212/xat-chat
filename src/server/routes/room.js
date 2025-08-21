const express = require('express');
const router = express.Router();
const Room = require('../models/Room');
const Message = require('../models/Message');
const auth = require('../middleware/auth');

// Get all rooms
router.get('/', async (req, res) => {
  try {
    const { sort = 'name', limit = 20, search } = req.query;
    
    let query = {};
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    
    let roomsQuery = Room.find(query);
    
    // Apply sorting
    switch (sort) {
      case 'popular':
        roomsQuery = roomsQuery.sort({ usersCount: -1 });
        break;
      case 'recent':
        roomsQuery = roomsQuery.sort({ createdAt: -1 });
        break;
      default:
        roomsQuery = roomsQuery.sort({ name: 1 });
    }
    
    // Apply limit
    if (limit) {
      roomsQuery = roomsQuery.limit(parseInt(limit));
    }
    
    const rooms = await roomsQuery.exec();
    
    res.json({ rooms });
  } catch (error) {
    console.error('Error fetching rooms:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get room by ID
router.get('/:roomId', async (req, res) => {
  try {
    const { roomId } = req.params;
    
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    
    res.json({ room });
  } catch (error) {
    console.error('Error fetching room:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new room
router.post('/', auth, async (req, res) => {
  try {
    const { name, description, isPrivate = false, maxUsers = 100 } = req.body;
    
    // Check if room name already exists
    const existingRoom = await Room.findOne({ name });
    if (existingRoom) {
      return res.status(400).json({ message: 'Room name already exists' });
    }
    
    const room = new Room({
      name,
      description,
      isPrivate,
      maxUsers,
      createdBy: req.user.id,
      users: [req.user.id]
    });
    
    await room.save();
    
    res.status(201).json({ room });
  } catch (error) {
    console.error('Error creating room:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update room
router.put('/:roomId', auth, async (req, res) => {
  try {
    const { roomId } = req.params;
    const { name, description, isPrivate, maxUsers, background, theme } = req.body;
    
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    
    // Check if user is room owner or moderator
    if (room.createdBy.toString() !== req.user.id && !room.moderators.includes(req.user.id)) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    // Update fields
    if (name) room.name = name;
    if (description !== undefined) room.description = description;
    if (isPrivate !== undefined) room.isPrivate = isPrivate;
    if (maxUsers) room.maxUsers = maxUsers;
    if (background) room.background = background;
    if (theme) room.theme = theme;
    
    await room.save();
    
    res.json({ room });
  } catch (error) {
    console.error('Error updating room:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete room
router.delete('/:roomId', auth, async (req, res) => {
  try {
    const { roomId } = req.params;
    
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    
    // Check if user is room owner
    if (room.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    await Room.findByIdAndDelete(roomId);
    
    res.json({ message: 'Room deleted successfully' });
  } catch (error) {
    console.error('Error deleting room:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Join room
router.post('/:roomId/join', auth, async (req, res) => {
  try {
    const { roomId } = req.params;
    
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    
    // Check if room is full
    if (room.users.length >= room.maxUsers) {
      return res.status(400).json({ message: 'Room is full' });
    }
    
    // Check if user is already in room
    if (room.users.includes(req.user.id)) {
      return res.status(400).json({ message: 'Already in room' });
    }
    
    room.users.push(req.user.id);
    room.usersCount = room.users.length;
    await room.save();
    
    res.json({ message: 'Joined room successfully', room });
  } catch (error) {
    console.error('Error joining room:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Leave room
router.post('/:roomId/leave', auth, async (req, res) => {
  try {
    const { roomId } = req.params;
    
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    
    room.users = room.users.filter(id => id.toString() !== req.user.id);
    room.usersCount = room.users.length;
    await room.save();
    
    res.json({ message: 'Left room successfully' });
  } catch (error) {
    console.error('Error leaving room:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get room messages
router.get('/:roomId/messages', async (req, res) => {
  try {
    const { roomId } = req.params;
    const { limit = 50, before } = req.query;
    
    let query = { room: roomId };
    if (before) {
      query.createdAt = { $lt: new Date(before) };
    }
    
    const messages = await Message.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .populate('user', 'username avatarId')
      .exec();
    
    res.json({ messages: messages.reverse() });
  } catch (error) {
    console.error('Error fetching room messages:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add moderator to room
router.post('/:roomId/moderators/:userId', auth, async (req, res) => {
  try {
    const { roomId, userId } = req.params;
    
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    
    // Check if user is room owner
    if (room.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    if (room.moderators.includes(userId)) {
      return res.status(400).json({ message: 'User is already a moderator' });
    }
    
    room.moderators.push(userId);
    await room.save();
    
    res.json({ message: 'Moderator added successfully' });
  } catch (error) {
    console.error('Error adding moderator:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove moderator from room
router.delete('/:roomId/moderators/:userId', auth, async (req, res) => {
  try {
    const { roomId, userId } = req.params;
    
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    
    // Check if user is room owner
    if (room.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    room.moderators = room.moderators.filter(id => id.toString() !== userId);
    await room.save();
    
    res.json({ message: 'Moderator removed successfully' });
  } catch (error) {
    console.error('Error removing moderator:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Ban user from room
router.post('/:roomId/ban/:userId', auth, async (req, res) => {
  try {
    const { roomId, userId } = req.params;
    
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    
    // Check if user is room owner or moderator
    if (room.createdBy.toString() !== req.user.id && !room.moderators.includes(req.user.id)) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    if (room.bannedUsers.includes(userId)) {
      return res.status(400).json({ message: 'User is already banned' });
    }
    
    room.bannedUsers.push(userId);
    room.users = room.users.filter(id => id.toString() !== userId);
    room.usersCount = room.users.length;
    await room.save();
    
    res.json({ message: 'User banned successfully' });
  } catch (error) {
    console.error('Error banning user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Unban user from room
router.delete('/:roomId/ban/:userId', auth, async (req, res) => {
  try {
    const { roomId, userId } = req.params;
    
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    
    // Check if user is room owner or moderator
    if (room.createdBy.toString() !== req.user.id && !room.moderators.includes(req.user.id)) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    room.bannedUsers = room.bannedUsers.filter(id => id.toString() !== userId);
    await room.save();
    
    res.json({ message: 'User unbanned successfully' });
  } catch (error) {
    console.error('Error unbanning user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/rooms/:id/messages (new endpoint for xat-engine)
// @desc    Get room messages
// @access  Public (for demo)
router.get('/:id/messages', async (req, res) => {
  try {
    const messages = await Message.find({ room: req.params.id })
      .populate('user', 'username avatarId')
      .sort({ createdAt: -1 })
      .limit(50);
    
    const formattedMessages = messages.reverse().map(msg => ({
      id: msg._id,
      userId: msg.user?._id || 'unknown',
      username: msg.user?.username || 'Unknown',
      text: msg.text,
      timestamp: msg.createdAt || msg.timestamp
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

// @route   GET /api/rooms/:id/users (new endpoint for xat-engine)
// @desc    Get online users in room
// @access  Public (for demo)
router.get('/:id/users', async (req, res) => {
  try {
    // For demo purposes, return some sample users
    const sampleUsers = [
      { id: 1, username: 'ACE', avatar: '🤖', status: 'online' },
      { id: 2, username: 'IM-Emo', avatar: '😈', status: 'online' },
      { id: 3, username: 'Guest123', avatar: '😊', status: 'online' }
    ];
    
    res.json({
      success: true,
      users: sampleUsers
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users'
    });
  }
});

module.exports = router;
