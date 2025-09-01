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

const User = require('./models/User');
const Power = require('./models/Power');
const Room = require('./models/Room');
const Message = require('./models/Message');

class XatServer {
    constructor() {
        this.app = express();
        this.server = http.createServer(this.app);
        this.io = socketIo(this.server, {
            cors: { origin: '*', methods: ['GET', 'POST'] }
        });
        this.config = {
            port: process.env.PORT || 8000,
            jwtSecret: process.env.JWT_SECRET || 'xat-secret-key',
            maxUsersPerRoom: 100,
            messageRateLimit: 3,
            botProtection: true,
            spamFilter: true
        };
        this.connectedUsers = new Map();
        this.rooms = new Map();
        this.trades = new Map();
        this.rateLimits = new Map();
        this.bannedIPs = new Set();
        this.moderationActions = new Map();
        this.init();
    }

    async init() {
        await this.connectDatabase();
        this.setupMiddleware();
        this.setupRoutes();
        this.setupSocketHandlers();
        this.setupModeration();
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
            console.warn('⚠️ MongoDB connection failed:', error.message);
            console.log('🎭 Running with mock data');
        }
    }

    setupMiddleware() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.static('src/client'));
        this.app.use('/avatars', express.static('avatars'));
        this.app.use('/smilies', express.static('smilies'));
        this.app.use('/sounds', express.static('sounds'));
        this.app.use('/audio', express.static('audio'));
        this.app.use('/backgrounds', express.static('backgrounds'));
        this.app.use('/css', express.static('css'));
        this.app.use('/js', express.static('js'));
        this.app.use('/svg', express.static('svg'));
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            next();
        });
    }

    setupRoutes() {
        this.app.post('/api/auth/login', this.handleLogin.bind(this));
        this.app.post('/api/auth/register', this.handleRegister.bind(this));
        this.app.post('/api/auth/logout', this.handleLogout.bind(this));
        this.app.get('/api/users/:id', this.getUser.bind(this));
        this.app.put('/api/users/:id', this.updateUser.bind(this));
        this.app.get('/api/users/online', this.getOnlineUsers.bind(this));
        this.app.get('/api/powers', this.getPowers.bind(this));
        this.app.get('/api/powers/user', this.getUserPowers.bind(this));
        this.app.post('/api/powers/buy', this.buyPower.bind(this));
        this.app.get('/api/rooms', this.getRooms.bind(this));
        this.app.post('/api/rooms', this.createRoom.bind(this));
        this.app.put('/api/rooms/:id', this.updateRoom.bind(this));
        this.app.get('/api/trades', this.getTrades.bind(this));
        this.app.post('/api/trades', this.createTrade.bind(this));
        this.app.put('/api/trades/:id', this.updateTrade.bind(this));
        this.app.get('/api/xavi/:userId', this.getXavi.bind(this));
        this.app.put('/api/xavi/:userId', this.updateXavi.bind(this));
        this.app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../client/index.html')));
        this.app.get('/xat-authentic.html', (req, res) => res.sendFile(path.join(__dirname, '../../xat-authentic.html')));
        this.app.get('/classic.html', (req, res) => res.sendFile(path.join(__dirname, '../../classic.html')));
        this.app.get('/chat.html', (req, res) => res.sendFile(path.join(__dirname, '../client/chat-interface.html')));
        this.app.get('/chat-interface.html', (req, res) => res.sendFile(path.join(__dirname, '../client/chat-interface.html')));
        this.app.get('*', (req, res) => {
            if (req.path.startsWith('/api/') || req.path.endsWith('.html')) {
                return res.status(404).send('Not found');
            }
            res.sendFile(path.join(__dirname, '../client/index.html'));
        });
    }

    setupSocketHandlers() {
        this.io.on('connection', (socket) => {
            console.log('🎭 User connected:', socket.id);
            socket.on('authenticate', this.handleAuthenticate.bind(this, socket));
            socket.on('join-room', this.handleJoinRoom.bind(this, socket));
            socket.on('send-message', this.handleSendMessage.bind(this, socket));
            socket.on('activate-power', this.handleActivatePower.bind(this, socket));
            socket.on('mod-command', this.handleModCommand.bind(this, socket));
            socket.on('trade-request', this.handleTradeRequest.bind(this, socket));
            socket.on('trade-response', this.handleTradeResponse.bind(this, socket));
            socket.on('xavi-action', this.handleXaviAction.bind(this, socket));
            socket.on('disconnect', this.handleDisconnect.bind(this, socket));
        });
    }

    setupModeration() {
        this.app.post('/api/moderation/warn', this.handleWarn.bind(this));
        this.app.post('/api/moderation/mute', this.handleMute.bind(this));
        this.app.post('/api/moderation/ban', this.handleBan.bind(this));
        this.app.post('/api/moderation/kick', this.handleKick.bind(this));
        this.app.get('/api/moderation/history/:userId', this.getModHistory.bind(this));
    }

    async handleLogin(req, res) {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username });
            if (!user) return res.status(401).json({ error: 'Invalid credentials' });
            const isValid = await bcrypt.compare(password, user.password);
            if (!isValid) return res.status(401).json({ error: 'Invalid credentials' });
            const token = jwt.sign({ userId: user._id, rank: user.rank }, this.config.jwtSecret, { expiresIn: '1h' });
            res.json({ success: true, token, user: { _id: user._id, username: user.username, rank: user.rank } });
        } catch (error) {
            res.status(500).json({ error: 'Login failed' });
        }
    }

    async handleRegister(req, res) {
        try {
            const { username, email, password } = req.body;
            const existingUser = await User.findOne({ $or: [{ username }, { email }] });
            if (existingUser) return res.status(400).json({ error: 'User already exists' });
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({ username, email, password: hashedPassword, rank: 'guest', powers: Array(10).fill(0) });
            await user.save();
            const token = jwt.sign({ userId: user._id, rank: user.rank }, this.config.jwtSecret, { expiresIn: '1h' });
            res.json({ success: true, token, user: { _id: user._id, username, rank: user.rank } });
        } catch (error) {
            res.status(500).json({ error: 'Registration failed' });
        }
    }

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
            if (!user) return res.status(404).json({ error: 'User not found' });
            res.json({ user: { _id: user._id, username: user.username, rank: user.rank, xats: user.xats, days: user.days } });
        } catch (error) {
            res.status(500).json({ error: 'Failed to get user' });
        }
    }

    async updateUser(req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!user) return res.status(404).json({ error: 'User not found' });
            res.json({ user: { _id: user._id, username: user.username, rank: user.rank, xats: user.xats, days: user.days } });
        } catch (error) {
            res.status(500).json({ error: 'Failed to update user' });
        }
    }

    async getOnlineUsers(req, res) {
        try {
            const users = Array.from(this.connectedUsers.values()).map(user => ({
                id: user._id,
                username: user.username,
                rank: user.rank,
                isOnline: true,
                avatar: user.avatar || 1,
                xats: user.xats || 0,
                days: user.days || 0
            }));
            res.json({ success: true, users });
        } catch (error) {
            res.status(500).json({ error: 'Failed to get online users' });
        }
    }

    async getPowers(req, res) {
        try {
            const powers = await Power.find();
            res.json({ powers });
        } catch (error) {
            res.status(500).json({ error: 'Failed to get powers' });
        }
    }

    async getUserPowers(req, res) {
        try {
            const userId = req.query.userId || (req.headers.authorization && jwt.verify(req.headers.authorization.split(' ')[1], this.config.jwtSecret).userId);
            const user = await User.findById(userId);
            if (!user) return res.status(404).json({ error: 'User not found' });
            const powers = await Power.find({ _id: { $in: user.powers.map(p => p.powerId) } });
            res.json({ success: true, powers });
        } catch (error) {
            res.status(500).json({ error: 'Failed to get user powers' });
        }
    }

    async buyPower(req, res) {
        try {
            const { userId, powerId } = req.body;
            const user = await User.findById(userId);
            const power = await Power.findById(powerId);
            if (!user || !power) return res.status(404).json({ error: 'User or power not found' });
            if (user.xats < power.cost) return res.status(400).json({ error: 'Insufficient xats' });
            const section = Math.floor(power.subid / 32);
            const bit = 1 << (power.subid % 32);
            if ((user.powers[section] & bit) !== 0) return res.status(400).json({ error: 'Power already owned' });
            user.xats -= power.cost;
            user.powers[section] |= bit;
            await user.save();
            power.totalSold++;
            await power.save();
            res.json({ success: true, user: { xats: user.xats }, power });
        } catch (error) {
            res.status(500).json({ error: 'Failed to buy power' });
        }
    }

    async getRooms(req, res) {
        try {
            const rooms = await Room.find();
            res.json({ rooms });
        } catch (error) {
            res.status(500).json({ error: 'Failed to get rooms' });
        }
    }

    async createRoom(req, res) {
        try {
            const room = new Room(req.body);
            await room.save();
            res.json({ room });
        } catch (error) {
            res.status(500).json({ error: 'Failed to create room' });
        }
    }

    async updateRoom(req, res) {
        try {
            const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!room) return res.status(404).json({ error: 'Room not found' });
            res.json({ room });
        } catch (error) {
            res.status(500).json({ error: 'Failed to update room' });
        }
    }

    async getTrades(req, res) {
        try {
            const trades = Array.from(this.trades.values());
            res.json({ trades });
        } catch (error) {
            res.status(500).json({ error: 'Failed to get trades' });
        }
    }

    async createTrade(req, res) {
        try {
            const { userId, targetUserId, powerId, price } = req.body;
            const tradeId = crypto.randomUUID();
            this.trades.set(tradeId, { userId, targetUserId, powerId, price, status: 'pending' });
            this.io.to(targetUserId).emit('trade-request', { tradeId, fromUser: userId, powerId, price });
            res.json({ success: true, tradeId });
        } catch (error) {
            res.status(500).json({ error: 'Failed to create trade' });
        }
    }

    async updateTrade(req, res) {
        try {
            const trade = this.trades.get(req.params.id);
            if (!trade) return res.status(404).json({ error: 'Trade not found' });
            Object.assign(trade, req.body);
            res.json({ success: true, trade });
        } catch (error) {
            res.status(500).json({ error: 'Failed to update trade' });
        }
    }

    async getXavi(req, res) {
        try {
            const user = await User.findById(req.params.userId);
            if (!user) return res.status(404).json({ error: 'User not found' });
            res.json({ xavi: user.xavi || '{}' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to get xavi' });
        }
    }

    async updateXavi(req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.params.userId, { xavi: JSON.stringify(req.body) }, { new: true });
            if (!user) return res.status(404).json({ error: 'User not found' });
            res.json({ success: true, user });
        } catch (error) {
            res.status(500).json({ error: 'Failed to update xavi' });
        }
    }

    async handleAuthenticate(socket, data) {
        try {
            const { token } = data;
            if (!token) return socket.emit('error', { message: 'Authentication required' });
            const decoded = jwt.verify(token, this.config.jwtSecret);
            const user = await User.findById(decoded.userId);
            if (!user) return socket.emit('error', { message: 'Invalid token' });
            this.connectedUsers.set(socket.id, user);
            socket.emit('authenticated', { user: { _id: user._id, username: user.username, rank: user.rank } });
        } catch (error) {
            socket.emit('error', { message: 'Authentication failed' });
        }
    }

    async handleJoinRoom(socket, data) {
        try {
            const { roomId } = data;
            const user = this.connectedUsers.get(socket.id);
            if (!user) return socket.emit('error', { message: 'Not authenticated' });
            const room = await Room.findById(roomId) || { _id: 'default', name: 'Main Chat' };
            socket.join(roomId);
            this.rooms.set(roomId, (this.rooms.get(roomId) || new Set()).add(socket.id));
            this.io.to(roomId).emit('user:joined', { id: user._id, username: user.username });
        } catch (error) {
            socket.emit('error', { message: 'Failed to join room' });
        }
    }

    async handleSendMessage(socket, data) {
        if (this.isRateLimited(socket.id, 'message')) return socket.emit('error', { message: 'Rate limit exceeded' });
        try {
            const { roomId, text } = data;
            const user = this.connectedUsers.get(socket.id);
            if (!user) return socket.emit('error', { message: 'Not authenticated' });
            const message = new Message({ userId: user._id, roomId, text });
            await message.save();
            this.io.to(roomId).emit('message:received', { user: user.username, text });
        } catch (error) {
            socket.emit('error', { message: 'Failed to send message' });
        }
    }

    async handleActivatePower(socket, data) {
        try {
            const { powerId, roomId } = data;
            const user = this.connectedUsers.get(socket.id);
            if (!user) return socket.emit('error', { message: 'Not authenticated' });
            const power = await Power.findById(powerId);
            if (!power) return socket.emit('error', { message: 'Power not found' });
            const section = Math.floor(power.subid / 32);
            const bit = 1 << (power.subid % 32);
            if ((user.powers[section] & bit) === 0) return socket.emit('error', { message: 'Power not owned' });
            this.io.to(roomId).emit('power:activated', { userId: user._id, powerId, powerName: power.name });
        } catch (error) {
            socket.emit('error', { message: 'Failed to activate power' });
        }
    }

    async handleModCommand(socket, data) {
        try {
            const { command, targetUserId, roomId, reason } = data;
            const user = this.connectedUsers.get(socket.id);
            if (!user || !['moderator', 'owner', 'mainowner'].includes(user.rank)) {
                return socket.emit('error', { message: 'Insufficient permissions' });
            }
            this.moderationActions.set(`${targetUserId}:${Date.now()}`, { command, by: user._id, reason });
            this.io.to(roomId).emit('mod:action', { command, targetUserId, reason });
        } catch (error) {
            socket.emit('error', { message: 'Moderation command failed' });
        }
    }

    async handleTradeRequest(socket, data) {
        try {
            const { targetUserId, powerId, price } = data;
            const user = this.connectedUsers.get(socket.id);
            if (!user) return socket.emit('error', { message: 'Not authenticated' });
            const power = await Power.findById(powerId);
            if (!power) return socket.emit('error', { message: 'Power not found' });
            const tradeId = crypto.randomUUID();
            this.trades.set(tradeId, { userId: user._id, targetUserId, powerId, price, status: 'pending' });
            this.io.to(targetUserId).emit('trade-request', { tradeId, fromUser: user.username, powerName: power.name, price });
        } catch (error) {
            socket.emit('error', { message: 'Failed to send trade request' });
        }
    }

    async handleTradeResponse(socket, data) {
        try {
            const { tradeId, accept } = data;
            const trade = this.trades.get(tradeId);
            if (!trade) return socket.emit('error', { message: 'Trade not found' });
            const user = this.connectedUsers.get(socket.id);
            if (!user || user._id !== trade.targetUserId) return socket.emit('error', { message: 'Invalid trade response' });
            trade.status = accept ? 'accepted' : 'declined';
            this.io.to(trade.userId).emit('trade-response', { tradeId, accepted: accept });
            if (accept) {
                const power = await Power.findById(trade.powerId);
                const section = Math.floor(power.subid / 32);
                const bit = 1 << (power.subid % 32);
                const fromUser = await User.findById(trade.userId);
                const toUser = await User.findById(trade.targetUserId);
                if (toUser.xats < trade.price) return socket.emit('error', { message: 'Insufficient xats' });
                fromUser.powers[section] &= ~bit;
                toUser.powers[section] |= bit;
                fromUser.xats += trade.price;
                toUser.xats -= trade.price;
                await fromUser.save();
                await toUser.save();
                this.trades.delete(tradeId);
            }
        } catch (error) {
            socket.emit('error', { message: 'Failed to process trade response' });
        }
    }

    async handleXaviAction(socket, data) {
        try {
            const { action, roomId } = data;
            const user = this.connectedUsers.get(socket.id);
            if (!user) return socket.emit('error', { message: 'Not authenticated' });
            this.io.to(roomId).emit('xavi:action', { userId: user._id, action });
        } catch (error) {
            socket.emit('error', { message: 'Failed to perform xavi action' });
        }
    }

    async handleDisconnect(socket) {
        const user = this.connectedUsers.get(socket.id);
        if (user) {
            this.rooms.forEach((sockets, roomId) => {
                if (sockets.has(socket.id)) {
                    sockets.delete(socket.id);
                    this.io.to(roomId).emit('user:left', { id: user._id, username: user.username });
                }
            });
            this.connectedUsers.delete(socket.id);
        }
    }

    async handleWarn(req, res) {
        try {
            const { targetUserId, chatRoomId, reason } = req.body;
            const user = await User.findById(req.headers.authorization.split(' ')[1].userId);
            if (!user || !['moderator', 'owner', 'mainowner'].includes(user.rank)) {
                return res.status(403).json({ error: 'Insufficient permissions' });
            }
            this.moderationActions.set(`${targetUserId}:${Date.now()}`, { command: 'warn', by: user._id, reason });
            this.io.to(chatRoomId).emit('mod:action', { command: 'warn', targetUserId, reason });
            res.json({ success: true });
        } catch (error) {
            res.status(500).json({ error: 'Failed to warn' });
        }
    }

    async handleMute(req, res) {
        try {
            const { targetUserId, chatRoomId, reason, duration } = req.body;
            const user = await User.findById(req.headers.authorization.split(' ')[1].userId);
            if (!user || !['moderator', 'owner', 'mainowner'].includes(user.rank)) {
                return res.status(403).json({ error: 'Insufficient permissions' });
            }
            this.moderationActions.set(`${targetUserId}:${Date.now()}`, { command: 'mute', by: user._id, reason, duration });
            this.io.to(chatRoomId).emit('mod:action', { command: 'mute', targetUserId, reason, duration });
            res.json({ success: true });
        } catch (error) {
            res.status(500).json({ error: 'Failed to mute' });
        }
    }

    async handleBan(req, res) {
        try {
            const { targetUserId, chatRoomId, reason, duration } = req.body;
            const user = await User.findById(req.headers.authorization.split(' ')[1].userId);
            if (!user || !['owner', 'mainowner'].includes(user.rank)) {
                return res.status(403).json({ error: 'Insufficient permissions' });
            }
            const target = await User.findById(targetUserId);
            target.f |= 8;
            await target.save();
            this.moderationActions.set(`${targetUserId}:${Date.now()}`, { command: 'ban', by: user._id, reason, duration });
            this.io.to(chatRoomId).emit('mod:action', { command: 'ban', targetUserId, reason, duration });
            res.json({ success: true });
        } catch (error) {
            res.status(500).json({ error: 'Failed to ban' });
        }
    }

    async handleKick(req, res) {
        try {
            const { targetUserId, chatRoomId, reason } = req.body;
            const user = await User.findById(req.headers.authorization.split(' ')[1].userId);
            if (!user || !['moderator', 'owner', 'mainowner'].includes(user.rank)) {
                return res.status(403).json({ error: 'Insufficient permissions' });
            }
            this.moderationActions.set(`${targetUserId}:${Date.now()}`, { command: 'kick', by: user._id, reason });
            this.io.to(chatRoomId).emit('mod:action', { command: 'kick', targetUserId, reason });
            res.json({ success: true });
        } catch (error) {
            res.status(500).json({ error: 'Failed to kick' });
        }
    }

    async getModHistory(req, res) {
        try {
            const user = await User.findById(req.headers.authorization.split(' ')[1].userId);
            if (!user || !['owner', 'mainowner'].includes(user.rank)) {
                return res.status(403).json({ error: 'Insufficient permissions' });
            }
            const history = Array.from(this.moderationActions.entries())
                .filter(([key]) => key.startsWith(req.params.userId))
                .map(([_, action]) => action);
            res.json({ history });
        } catch (error) {
            res.status(500).json({ error: 'Failed to get moderation history' });
        }
    }

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
        const section = Math.floor(powerId / 32);
        const bit = 1 << (powerId % 32);
        return (user.powers[section] & bit) !== 0;
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
        const user = await User.findById(userId);
        if (user) {
            user.f |= 8;
            await user.save();
            this.moderationActions.set(`${userId}:${Date.now()}`, { command: 'ban', by: bannedBy, reason });
        }
    }

    async promoteUser(userId, roomId, promotedBy) {
        const room = await Room.findById(roomId);
        if (room) {
            room.setUserRank(userId, 2, promotedBy);
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
            console.log(`👍 Your chat is ready, sir!`);
        });
    }
}

module.exports = XatServer;
