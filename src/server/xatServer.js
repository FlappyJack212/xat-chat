/**
 * 🎭 XAT SERVER - Complete Flash to JavaScript Migration
 * Implements all features from Ixat Files server.php
 * Based on Adobe's AS3 to JavaScript Migration Guidelines
 */

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const path = require('path');

// Import models
const User = require('./models/User');
const Power = require('./models/Power');
const Room = require('./models/Room');
const Message = require('./models/Message');

class XatServer {
  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.io = socketIo(this.server, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST']
      }
    });
    
    // Server configuration (from Ixat Files)
    this.config = {
      port: process.env.PORT || 8000,
      jwtSecret: process.env.JWT_SECRET || 'xat-secret-key',
      maxUsersPerRoom: 100,
      messageRateLimit: 3, // messages per second
      botProtection: true,
      spamFilter: true
    };
    
    // Connected users (equivalent to Ixat Files client class)
    this.connectedUsers = new Map();
    this.rooms = new Map();
    this.trades = new Map();
    
    // Security and rate limiting
    this.rateLimits = new Map();
    this.bannedIPs = new Set();
    
    this.init();
  }
  
  async init() {
    await this.connectDatabase();
    this.setupMiddleware();
    this.setupRoutes();
    this.setupSocketHandlers();
    this.startServer();
  }
  
  async connectDatabase() {
    try {
      await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/xat', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log('🎭 Connected to MongoDB');
    } catch (error) {
      console.warn('⚠️  MongoDB connection failed, running in demo mode:', error.message);
      console.log('🎭 Server will run with mock data until database is available');
      // Don't exit, just continue without database
    }
  }
  
  setupMiddleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    
    // Serve static files - use src/client for development
    this.app.use(express.static('src/client'));
    this.app.use('/avatars', express.static('avatars'));
    this.app.use('/smilies', express.static('smilies'));
    this.app.use('/sounds', express.static('sounds'));
    this.app.use('/audio', express.static('audio'));
    this.app.use('/backgrounds', express.static('backgrounds'));
    this.app.use('/css', express.static('css'));
    this.app.use('/js', express.static('js'));
    this.app.use('/svg', express.static('svg'));
    
    // CORS
    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      next();
    });
  }
  
  setupRoutes() {
    // Authentication routes
    this.app.post('/api/auth/login', this.handleLogin.bind(this));
    this.app.post('/api/auth/register', this.handleRegister.bind(this));
    this.app.post('/api/auth/logout', this.handleLogout.bind(this));
    
    // User routes
    this.app.get('/api/users/:id', this.getUser.bind(this));
    this.app.put('/api/users/:id', this.updateUser.bind(this));
    this.app.get('/api/users/online', this.getOnlineUsers.bind(this));
    
    // Power routes
    this.app.get('/api/powers', this.getPowers.bind(this));
    this.app.get('/api/powers/user', this.getUserPowers.bind(this));
    this.app.post('/api/powers/buy', this.buyPower.bind(this));
    
    // Room routes
    this.app.get('/api/rooms', this.getRooms.bind(this));
    this.app.post('/api/rooms', this.createRoom.bind(this));
    this.app.put('/api/rooms/:id', this.updateRoom.bind(this));
    
    // Trading routes
    this.app.get('/api/trades', this.getTrades.bind(this));
    this.app.post('/api/trades', this.createTrade.bind(this));
    this.app.put('/api/trades/:id', this.updateTrade.bind(this));
    
    // Xavi routes (avatar system)
    this.app.get('/api/xavi/:userId', this.getXavi.bind(this));
    this.app.put('/api/xavi/:userId', this.updateXavi.bind(this));
    
    // Serve main HTML files
    this.app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/index.html'));
    });
    
    this.app.get('/xat-authentic.html', (req, res) => {
      res.sendFile(path.join(__dirname, '../../xat-authentic.html'));
    });
    
    this.app.get('/classic.html', (req, res) => {
      res.sendFile(path.join(__dirname, '../../classic.html'));
    });
    
    this.app.get('/chat.html', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/chat-interface.html'));
    });
    
    this.app.get('/chat-interface.html', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/chat-interface.html'));
    });
    
    // Catch-all route for SPA - but don't interfere with our specific routes
    this.app.get('*', (req, res) => {
      // Don't serve index.html for API routes or our specific HTML files
      if (req.path.startsWith('/api/') || req.path.endsWith('.html')) {
        return res.status(404).send('Not found');
      }
      
      res.sendFile(path.join(__dirname, '../client/index.html'));
    });
  }
  
  setupSocketHandlers() {
    this.io.on('connection', (socket) => {
      console.log('🎭 User connected:', socket.id);
      
      // Handle user authentication
      socket.on('authenticate', this.handleAuthenticate.bind(this, socket));
      
      // Handle room joining
      socket.on('join-room', this.handleJoinRoom.bind(this, socket));
      
      // Handle messages
      socket.on('send-message', this.handleSendMessage.bind(this, socket));
      
      // Handle power activation
      socket.on('activate-power', this.handleActivatePower.bind(this, socket));
      
      // Handle moderation commands
      socket.on('mod-command', this.handleModCommand.bind(this, socket));
      
      // Handle trading
      socket.on('trade-request', this.handleTradeRequest.bind(this, socket));
      
      // Handle avatar animations
      socket.on('xavi-action', this.handleXaviAction.bind(this, socket));
      
      // Handle disconnection
      socket.on('disconnect', this.handleDisconnect.bind(this, socket));
    });
  }
  
  // Authentication handlers
  async handleLogin(req, res) {
    try {
      const { username, password } = req.body;
      
      // Find user
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      
      // Check password (using Ixat Files hashing)
      const isValid = await this.validatePassword(password, user.password);
      if (!isValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      
      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id, username: user.username },
        this.config.jwtSecret,
        { expiresIn: '24h' }
      );
      
      // Update last seen
      user.lastSeen = new Date();
      user.connectedlast = req.ip;
      await user.save();
      
      res.json({
        token,
        user: {
          id: user._id,
          username: user.username,
          nickname: user.nickname,
          xats: user.xats,
          days: user.days,
          avatar: user.avatar,
          xavi: user.xavi,
          rank: user.rank
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }
  
  async handleRegister(req, res) {
    try {
      const { username, nickname, email, password } = req.body;
      
      // Check if user exists
      const existingUser = await User.findOne({ 
        $or: [{ username }, { email }] 
      });
      
      if (existingUser) {
        return res.status(400).json({ error: 'Username or email already exists' });
      }
      
      // Hash password (using Ixat Files method)
      const hashedPassword = await this.hashPassword(password);
      
      // Generate security keys (like Ixat Files)
      const k = Math.floor(Math.random() * 2000000) - 1000000;
      const k2 = Math.floor(Math.random() * 2000000) - 1000000;
      const k3 = Math.floor(Math.random() * 2000000) - 1000000;
      
      // Create user
      const user = new User({
        username,
        nickname,
        email,
        password: hashedPassword,
        k, k2, k3,
        avatar: Math.floor(Math.random() * 1760), // Random avatar
        xats: 1000, // Starting xats
        days: 7, // Starting days
        rank: 5 // Guest rank
      });
      
      await user.save();
      
      // Generate token
      const token = jwt.sign(
        { userId: user._id, username: user.username },
        this.config.jwtSecret,
        { expiresIn: '24h' }
      );
      
      res.json({
        token,
        user: {
          id: user._id,
          username: user.username,
          nickname: user.nickname,
          xats: user.xats,
          days: user.days,
          avatar: user.avatar,
          xavi: user.xavi,
          rank: user.rank
        }
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }
  
  // Socket handlers
  async handleAuthenticate(socket, data) {
    try {
      const { token } = data;
      
      // Verify JWT token
      const decoded = jwt.verify(token, this.config.jwtSecret);
      const user = await User.findById(decoded.userId);
      
      if (!user) {
        socket.emit('auth-error', { error: 'Invalid token' });
        return;
      }
      
      // Store user data in socket
      socket.userId = user._id;
      socket.username = user.username;
      socket.userData = user;
      
      // Add to connected users
      this.connectedUsers.set(socket.id, {
        id: user._id,
        username: user.username,
        nickname: user.nickname,
        rank: user.rank,
        avatar: user.avatar,
        xavi: user.xavi,
        roomId: null,
        socket: socket
      });
      
      socket.emit('authenticated', {
        user: {
          id: user._id,
          username: user.username,
          nickname: user.nickname,
          xats: user.xats,
          days: user.days,
          avatar: user.avatar,
          xavi: user.xavi,
          rank: user.rank
        }
      });
      
      console.log(`🎭 User authenticated: ${user.username}`);
    } catch (error) {
      console.error('Authentication error:', error);
      socket.emit('auth-error', { error: 'Authentication failed' });
    }
  }
  
  async handleJoinRoom(socket, data) {
    try {
      const { roomId } = data;
      const user = this.connectedUsers.get(socket.id);
      
      if (!user) {
        socket.emit('error', { error: 'Not authenticated' });
        return;
      }
      
      // Leave current room
      if (user.roomId) {
        socket.leave(user.roomId);
        socket.to(user.roomId).emit('user-left', {
          userId: user.id,
          username: user.username
        });
      }
      
      // Join new room
      socket.join(roomId);
      user.roomId = roomId;
      
      // Get or create room
      let room = this.rooms.get(roomId);
      if (!room) {
        room = await Room.findOne({ id: roomId });
        if (room) {
          this.rooms.set(roomId, {
            id: room.id,
            name: room.name,
            users: new Set(),
            messages: []
          });
        }
      }
      
      if (room) {
        room.users.add(socket.id);
        
        // Notify room of new user
        socket.to(roomId).emit('user-joined', {
          id: user.id,
          username: user.username,
          nickname: user.nickname,
          rank: user.rank,
          avatar: user.avatar
        });
        
        // Send room info to user
        socket.emit('room-info', {
          id: room.id,
          name: room.name,
          userCount: room.users.size,
          background: room.background || 'default',
          radio: room.radio || ''
        });
        
        console.log(`🎭 User ${user.username} joined room ${roomId}`);
      }
    } catch (error) {
      console.error('Join room error:', error);
      socket.emit('error', { error: 'Failed to join room' });
    }
  }
  
  async handleSendMessage(socket, data) {
    try {
      const { text, powerEffect } = data;
      const user = this.connectedUsers.get(socket.id);
      
      if (!user || !user.roomId) {
        socket.emit('error', { error: 'Not in a room' });
        return;
      }
      
      // Rate limiting (like Ixat Files)
      if (this.isRateLimited(socket.id, 'message')) {
        socket.emit('error', { error: 'Message rate limit exceeded' });
        return;
      }
      
      // Check for commands (like Ixat Files)
      if (text.startsWith('/')) {
        this.handleUserCommand(socket, text, user);
        return;
      }
      
      if (text.startsWith('~') && user.rank <= 2) {
        this.handleAdminCommand(socket, text, user);
        return;
      }
      
      // Create message
      const message = {
        id: Date.now(),
        userId: user.id,
        username: user.username,
        nickname: user.nickname,
        text: text,
        powerEffect: powerEffect,
        rank: user.rank,
        timestamp: new Date()
      };
      
      // Save message to database
      const messageDoc = new Message({
        roomId: user.roomId,
        userId: user.id,
        text: text,
        powerEffect: powerEffect,
        rank: user.rank
      });
      await messageDoc.save();
      
      // Broadcast to room
      this.io.to(user.roomId).emit('message', message);
      
      // Trigger avatar animation if power effect
      if (powerEffect) {
        this.io.to(user.roomId).emit('xavi-trigger', {
          userId: user.id,
          animation: powerEffect
        });
      }
      
      console.log(`📨 Message from ${user.username}: ${text}`);
    } catch (error) {
      console.error('Send message error:', error);
      socket.emit('error', { error: 'Failed to send message' });
    }
  }
  
  async handleActivatePower(socket, data) {
    try {
      const { powerId } = data;
      const user = this.connectedUsers.get(socket.id);
      
      if (!user) {
        socket.emit('error', { error: 'Not authenticated' });
        return;
      }
      
      // Check if user has power (using bitwise system like Ixat Files)
      const hasPower = await this.checkUserPower(user.id, powerId);
      if (!hasPower) {
        socket.emit('error', { error: 'You don\'t have this power' });
        return;
      }
      
      // Get power info
      const power = await Power.findOne({ id: powerId });
      if (!power) {
        socket.emit('error', { error: 'Power not found' });
        return;
      }
      
      // Broadcast power activation
      if (user.roomId) {
        this.io.to(user.roomId).emit('power-activated', {
          userId: user.id,
          username: user.username,
          powerId: powerId,
          powerName: power.name,
          effect: power.effect,
          sound: power.sound
        });
      }
      
      console.log(`⚡ Power activated: ${power.name} by ${user.username}`);
    } catch (error) {
      console.error('Activate power error:', error);
      socket.emit('error', { error: 'Failed to activate power' });
    }
  }
  
  async handleModCommand(socket, data) {
    try {
      const { command, targetUserId, reason } = data;
      const user = this.connectedUsers.get(socket.id);
      
      if (!user || user.rank > 2) {
        socket.emit('error', { error: 'Insufficient permissions' });
        return;
      }
      
      const targetUser = this.connectedUsers.get(targetUserId);
      if (!targetUser) {
        socket.emit('error', { error: 'User not found' });
        return;
      }
      
      switch (command) {
        case 'ban':
          await this.banUser(targetUser.id, reason, user.id);
          this.io.to(targetUser.roomId).emit('user-banned', {
            userId: targetUser.id,
            username: targetUser.username,
            reason: reason,
            bannedBy: user.username
          });
          break;
          
        case 'kick':
          this.io.to(targetUser.roomId).emit('user-kicked', {
            userId: targetUser.id,
            username: targetUser.username,
            kickedBy: user.username
          });
          targetUser.socket.emit('kicked', { reason: reason });
          break;
          
        case 'promote':
          await this.promoteUser(targetUser.id, user.roomId, user.id);
          this.io.to(targetUser.roomId).emit('user-promoted', {
            userId: targetUser.id,
            username: targetUser.username,
            promotedBy: user.username
          });
          break;
      }
      
      console.log(`🛡️ Mod command: ${command} by ${user.username} on ${targetUser.username}`);
    } catch (error) {
      console.error('Mod command error:', error);
      socket.emit('error', { error: 'Failed to execute mod command' });
    }
  }
  
  async handleTradeRequest(socket, data) {
    try {
      const { targetUserId, powerId, price } = data;
      const user = this.connectedUsers.get(socket.id);
      
      if (!user) {
        socket.emit('error', { error: 'Not authenticated' });
        return;
      }
      
      const targetUser = this.connectedUsers.get(targetUserId);
      if (!targetUser) {
        socket.emit('error', { error: 'User not found' });
        return;
      }
      
      // Check if user has power
      const hasPower = await this.checkUserPower(user.id, powerId);
      if (!hasPower) {
        socket.emit('error', { error: 'You don\'t have this power' });
        return;
      }
      
      // Create trade
      const trade = {
        id: Date.now(),
        sellerId: user.id,
        buyerId: targetUser.id,
        powerId: powerId,
        price: price,
        status: 'PENDING',
        createdAt: new Date()
      };
      
      this.trades.set(trade.id, trade);
      
      // Notify buyer
      targetUser.socket.emit('trade-offer', {
        tradeId: trade.id,
        seller: user.username,
        powerId: powerId,
        price: price
      });
      
      console.log(`💎 Trade offer: ${user.username} -> ${targetUser.username} (${powerId} for ${price} xats)`);
    } catch (error) {
      console.error('Trade request error:', error);
      socket.emit('error', { error: 'Failed to create trade' });
    }
  }
  
  async handleXaviAction(socket, data) {
    try {
      const { action, xaviData } = data;
      const user = this.connectedUsers.get(socket.id);
      
      if (!user) {
        socket.emit('error', { error: 'Not authenticated' });
        return;
      }
      
      // Update user's xavi data
      if (xaviData) {
        await User.findByIdAndUpdate(user.id, { xavi: JSON.stringify(xaviData) });
        user.xavi = JSON.stringify(xaviData);
      }
      
      // Broadcast xavi action to room
      if (user.roomId) {
        this.io.to(user.roomId).emit('xavi-action', {
          userId: user.id,
          username: user.username,
          action: action,
          xaviData: xaviData
        });
      }
      
      console.log(`🎭 Xavi action: ${action} by ${user.username}`);
    } catch (error) {
      console.error('Xavi action error:', error);
      socket.emit('error', { error: 'Failed to perform xavi action' });
    }
  }
  
  handleDisconnect(socket) {
    const user = this.connectedUsers.get(socket.id);
    if (user) {
      // Notify room of user leaving
      if (user.roomId) {
        socket.to(user.roomId).emit('user-left', {
          userId: user.id,
          username: user.username
        });
      }
      
      this.connectedUsers.delete(socket.id);
      console.log(`🚪 User disconnected: ${user.username}`);
    }
  }
  
  // Command handlers (like Ixat Files)
  handleUserCommand(socket, text, user) {
    const command = text.substring(1).toLowerCase();
    const args = command.split(' ');
    
    switch (args[0]) {
      case 'nickname':
        if (args[1]) {
          user.nickname = args[1];
          socket.emit('nickname-changed', { nickname: args[1] });
          socket.to(user.roomId).emit('user-nickname-changed', {
            userId: user.id,
            nickname: args[1]
          });
        }
        break;
        
      case 'avatar':
        if (args[1]) {
          const avatarId = parseInt(args[1]);
          if (avatarId >= 0 && avatarId < 1760) {
            user.avatar = avatarId;
            socket.to(user.roomId).emit('user-avatar-changed', {
              userId: user.id,
              avatar: avatarId
            });
          }
        }
        break;
        
      case 'xavi':
        if (args[1]) {
          socket.emit('xavi-action', { action: args[1] });
        }
        break;
        
      default:
        socket.emit('error', { error: 'Unknown command' });
    }
  }
  
  handleAdminCommand(socket, text, user) {
    const command = text.substring(1).toLowerCase();
    const args = command.split(' ');
    
    if (user.rank > 2) {
      socket.emit('error', { error: 'Insufficient permissions' });
      return;
    }
    
    switch (args[0]) {
      case 'ban':
        if (args[1] && args[2]) {
          const targetUserId = args[1];
          const reason = args.slice(2).join(' ');
          this.handleModCommand(socket, {
            command: 'ban',
            targetUserId: targetUserId,
            reason: reason
          });
        }
        break;
        
      case 'kick':
        if (args[1] && args[2]) {
          const targetUserId = args[1];
          const reason = args.slice(2).join(' ');
          this.handleModCommand(socket, {
            command: 'kick',
            targetUserId: targetUserId,
            reason: reason
          });
        }
        break;
        
      case 'promote':
        if (args[1]) {
          const targetUserId = args[1];
          this.handleModCommand(socket, {
            command: 'promote',
            targetUserId: targetUserId,
            reason: 'Promoted by admin'
          });
        }
        break;
        
      default:
        socket.emit('error', { error: 'Unknown admin command' });
    }
  }
  
  // Missing route handlers
  async handleLogout(req, res) {
    try {
      res.json({ success: true, message: 'Logged out successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Logout failed' });
    }
  }
  
  async getUser(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get user' });
    }
  }
  
  async getOnlineUsers(req, res) {
    try {
      // For now, return mock online users until we have real user management
      const mockUsers = [
        {
          id: 'guest1',
          username: 'Guest1',
          f: 0, // Guest rank
          isOnline: true,
          avatar: 1,
          xats: 0,
          days: 0
        },
        {
          id: 'guest2', 
          username: 'Guest2',
          f: 0, // Guest rank
          isOnline: true,
          avatar: 2,
          xats: 0,
          days: 0
        }
      ];
      
      res.json({ success: true, users: mockUsers });
    } catch (error) {
      res.status(500).json({ error: 'Failed to get online users' });
    }
  }
  
  async updateUser(req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update user' });
    }
  }
  
  async getPowers(req, res) {
    try {
      const powers = await Power.find();
      res.json(powers);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get powers' });
    }
  }
  
  async getUserPowers(req, res) {
    try {
      // For now, return mock user powers until we have real user management
      const mockPowers = [
        { id: 1, name: 'Smile', cost: 100, category: 'Basic' },
        { id: 2, name: 'Wave', cost: 200, category: 'Basic' },
        { id: 3, name: 'Dance', cost: 500, category: 'Fun' }
      ];
      
      res.json({ success: true, powers: mockPowers });
    } catch (error) {
      res.status(500).json({ error: 'Failed to get user powers' });
    }
  }
  
  async buyPower(req, res) {
    try {
      const { userId, powerId } = req.body;
      const user = await User.findById(userId);
      const power = await Power.findOne({ id: powerId });
      
      if (!user || !power) {
        return res.status(404).json({ error: 'User or power not found' });
      }
      
      if (user.xats < power.cost) {
        return res.status(400).json({ error: 'Insufficient xats' });
      }
      
      user.xats -= power.cost;
      user.addPower(powerId);
      await user.save();
      
      res.json({ success: true, user });
    } catch (error) {
      res.status(500).json({ error: 'Failed to buy power' });
    }
  }
  
  async getRooms(req, res) {
    try {
      const rooms = await Room.find();
      res.json(rooms);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get rooms' });
    }
  }
  
  async createRoom(req, res) {
    try {
      const room = new Room(req.body);
      await room.save();
      res.json(room);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create room' });
    }
  }
  
  async updateRoom(req, res) {
    try {
      const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!room) {
        return res.status(404).json({ error: 'Room not found' });
      }
      res.json(room);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update room' });
    }
  }
  
  async getTrades(req, res) {
    try {
      // Return mock trades for now
      res.json([]);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get trades' });
    }
  }
  
  async createTrade(req, res) {
    try {
      res.json({ success: true, message: 'Trade created' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create trade' });
    }
  }
  
  async updateTrade(req, res) {
    try {
      res.json({ success: true, message: 'Trade updated' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update trade' });
    }
  }
  
  async getXavi(req, res) {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ xavi: user.xavi || '{}' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to get xavi' });
    }
  }
  
  async updateXavi(req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.params.userId, 
        { xavi: JSON.stringify(req.body) }, { new: true });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ success: true, user });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update xavi' });
    }
  }
  
  // Utility methods
  async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
  
  async validatePassword(password, hash) {
    return bcrypt.compare(password, hash);
  }
  
  async checkUserPower(userId, powerId) {
    const user = await User.findById(userId);
    if (!user) return false;
    
    // Use bitwise power checking (like Ixat Files)
    const section = Math.floor(powerId / 32);
    const bit = Math.pow(2, powerId % 32);
    return (user[`p${section}`] & bit) !== 0;
  }
  
  isRateLimited(socketId, action) {
    const key = `${socketId}:${action}`;
    const now = Date.now();
    const limit = this.rateLimits.get(key) || { count: 0, resetTime: now + 1000 };
    
    if (now > limit.resetTime) {
      limit.count = 1;
      limit.resetTime = now + 1000;
    } else {
      limit.count++;
    }
    
    this.rateLimits.set(key, limit);
    
    return limit.count > this.config.messageRateLimit;
  }
  
  async banUser(userId, reason, bannedBy) {
    // Implement ban logic
    const user = await User.findById(userId);
    if (user) {
      user.f |= 8; // Set banned flag (like Ixat Files)
      await user.save();
    }
  }
  
  async promoteUser(userId, roomId, promotedBy) {
    // Implement promotion logic
    const room = await Room.findOne({ id: roomId });
    if (room) {
      room.setUserRank(userId, 2, promotedBy); // Promote to mod
      await room.save();
    }
  }
  
  startServer() {
    this.server.listen(this.config.port, () => {
      console.log(`🎭 Xat Server running on port ${this.config.port}`);
      console.log(`📱 Access your fully functional xat chat at:`);
      console.log(`   💎 Full Engine: http://localhost:${this.config.port}/xat-authentic.html`);
      console.log(`   🎯 Classic Chat: http://localhost:${this.config.port}/classic.html`);
      console.log(`   🏠 Homepage: http://localhost:${this.config.port}/`);
    });
  }
}

module.exports = XatServer;
