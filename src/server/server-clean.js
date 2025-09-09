/**
 * Clean Xat Chat Server
 * Consolidated implementation with all necessary routes and functionality
 */

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Import models
const User = require('./models/User');
const Power = require('./models/Power');
const Room = require('./models/Room');
const Message = require('./models/Message');

// Import services
const AuthService = require('./services/AuthService');
const ChatService = require('./services/ChatService');
const PowerService = require('./services/PowerService');
const StoreService = require('./services/StoreService');

class XatServer {
    constructor() {
        this.app = express();
        this.server = http.createServer(this.app);
        this.io = socketIo(this.server, {
            cors: {
                origin: process.env.CLIENT_URL || "http://localhost:8000",
                methods: ["GET", "POST"]
            }
        });

        this.connectedUsers = new Map();
        this.chatRooms = new Map();

        this.initializeMiddleware();
        this.initializeRoutes();
        this.initializeSocketHandlers();
    }

    /**
     * Initialize Express middleware
     */
    initializeMiddleware() {
        // Security middleware
        this.app.use(helmet({
            contentSecurityPolicy: {
                directives: {
                    defaultSrc: ["'self'"],
                    styleSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
                    scriptSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
                    imgSrc: ["'self'", "data:", "https:"],
                    connectSrc: ["'self'", "ws:", "wss:"]
                }
            }
        }));

        // CORS configuration
        this.app.use(cors({
            origin: process.env.CLIENT_URL || "http://localhost:8000",
            credentials: true
        }));

        // Body parsing
        this.app.use(express.json({ limit: '10mb' }));
        this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));

        // Logging
        this.app.use(morgan('combined'));

        // Static files
        this.app.use(express.static(path.join(__dirname, '../client')));
        this.app.use('/www', express.static(path.join(__dirname, '../client/www')));
        this.app.use('/assets', express.static(path.join(__dirname, '../client/assets')));

        // Error handling
        this.app.use((err, req, res, next) => {
            console.error('Server error:', err);
            res.status(500).json({ error: 'Internal server error' });
        });
    }

    /**
     * Initialize API routes
     */
    initializeRoutes() {
        // Health check
        this.app.get('/api/health', (req, res) => {
            res.json({ status: 'OK', timestamp: new Date().toISOString() });
        });

        // Test route for debugging
        this.app.get('/api/test', (req, res) => {
            res.json({ 
                message: 'Server is working!', 
                timestamp: new Date().toISOString(),
                method: req.method,
                url: req.url
            });
        });

        // Test POST route
        this.app.post('/api/test', (req, res) => {
            res.json({ 
                message: 'POST request received!', 
                timestamp: new Date().toISOString(),
                body: req.body
            });
        });

        // Test database connection
        this.app.get('/api/test-db', async (req, res) => {
            try {
                const User = require('./models/User');
                const count = await User.countDocuments();
                res.json({ 
                    message: 'Database connected!', 
                    userCount: count,
                    timestamp: new Date().toISOString()
                });
            } catch (error) {
                res.status(500).json({ 
                    message: 'Database error', 
                    error: error.message,
                    timestamp: new Date().toISOString()
                });
            }
        });

        // Auth routes
        this.app.post('/api/auth/login', (req, res) => {
            console.log('🔑 [AUTH] Login request received');
            AuthService.login(req, res);
        });
        this.app.post('/api/auth/register', (req, res) => {
            console.log('🔑 [AUTH] Register request received');
            AuthService.register(req, res);
        });
        this.app.post('/api/auth/logout', (req, res) => {
            console.log('🔑 [AUTH] Logout request received');
            AuthService.logout(req, res);
        });
        this.app.get('/api/auth/me', AuthService.verifyToken, (req, res) => {
            console.log('🔑 [AUTH] Get current user request received');
            AuthService.getCurrentUser(req, res);
        });

        // User routes
        this.app.get('/api/users', this.getUsers.bind(this));
        this.app.get('/api/users/:id', this.getUser.bind(this));
        this.app.put('/api/users/:id', this.authenticateToken, this.updateUser.bind(this));
        this.app.get('/api/users/profile', this.authenticateToken, this.getUserProfile.bind(this));
        this.app.put('/api/users/profile', this.authenticateToken, this.updateUserProfile.bind(this));
        this.app.get('/api/users/online', this.getOnlineUsers.bind(this));

        // Message routes
        this.app.get('/api/messages/:roomId', this.getMessages.bind(this));
        this.app.post('/api/messages', this.authenticateToken, this.sendMessage.bind(this));

        // Power routes
        this.app.get('/api/powers', this.getPowers.bind(this));
        this.app.get('/api/powers/:id', this.getPowerById.bind(this));
        this.app.post('/api/powers/buy', this.authenticateToken, this.purchasePower.bind(this));
        this.app.get('/api/powers/owned', this.authenticateToken, this.getOwnedPowers.bind(this));
        this.app.post('/api/powers/activate', this.authenticateToken, this.activatePower.bind(this));

        // Room routes
        this.app.get('/api/rooms', this.getRooms.bind(this));
        this.app.post('/api/rooms', this.authenticateToken, this.createRoom.bind(this));
        this.app.get('/api/rooms/:id', this.getRoom.bind(this));

        // Store routes
        this.app.get('/api/store/powers', this.getPowers.bind(this));
        this.app.get('/api/store/packages', this.getStorePackages.bind(this));
        this.app.post('/api/store/purchase', this.authenticateToken, this.purchaseItem.bind(this));

        // Stats
        this.app.get('/api/stats', this.getStats.bind(this));

        // Serve main pages
        this.app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, '../client/index.html'));
        });

        this.app.get('/chat-interface.html', (req, res) => {
            res.sendFile(path.join(__dirname, '../client/chat-interface.html'));
        });

        // API route not found handler
        this.app.use('/api/*', (req, res) => {
            console.log(`❌ [API] Route not found: ${req.method} ${req.originalUrl}`);
            res.status(404).json({ error: 'API endpoint not found' });
        });

        // Catch all for SPA routing
        this.app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../client/index.html'));
        });
    }

    /**
     * Initialize Socket.IO handlers
     */
    initializeSocketHandlers() {
        this.io.on('connection', (socket) => {
            console.log('User connected:', socket.id);

            socket.on('join-room', (data) => {
                const { roomId, user } = data;
                socket.join(roomId);
                this.connectedUsers.set(socket.id, { ...user, roomId });
                socket.to(roomId).emit('user-joined', user);
            });

            socket.on('send-message', async (data) => {
                try {
                    const { roomId, message, user } = data;
                    
                    // Save message to database
                    const messageDoc = new Message({
                        sender: user.id,
                        recipient: roomId,
                        content: message,
                        messageType: 'chat'
                    });
                    await messageDoc.save();

                    // Broadcast to room
                    this.io.to(roomId).emit('new-message', {
                        id: messageDoc._id,
                        content: message,
                        user: user,
                        timestamp: messageDoc.createdAt
                    });
                } catch (error) {
                    console.error('Send message error:', error);
                    socket.emit('error', { message: 'Failed to send message' });
                }
            });

            socket.on('typing', (data) => {
                socket.to(data.roomId).emit('user-typing', {
                    user: data.user,
                    isTyping: data.isTyping
                });
            });

            socket.on('disconnect', () => {
                const user = this.connectedUsers.get(socket.id);
                if (user) {
                    socket.to(user.roomId).emit('user-left', user);
                    this.connectedUsers.delete(socket.id);
                }
                console.log('User disconnected:', socket.id);
            });
        });
    }

    /**
     * Authentication middleware
     */
    async authenticateToken(req, res, next) {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ error: 'Access token required' });
        }

        try {
            const user = await AuthService.authenticate(token);
            if (!user) {
                return res.status(401).json({ error: 'Invalid token' });
            }
            req.user = user;
            next();
        } catch (error) {
            return res.status(401).json({ error: 'Invalid token' });
        }
    }

    // ============================================================================
    // API ROUTE HANDLERS
    // ============================================================================

    async getUsers(req, res) {
        try {
            const users = await User.find({ isOnline: true }).select('username nickname avatar rank isOnline');
            res.json({ success: true, users });
        } catch (error) {
            console.error('Get users error:', error);
            res.status(500).json({ error: 'Failed to get users' });
        }
    }

    async getUser(req, res) {
        try {
            const user = await User.findById(req.params.id).select('-password');
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json({ success: true, user });
        } catch (error) {
            console.error('Get user error:', error);
            res.status(500).json({ error: 'Failed to get user' });
        }
    }

    async updateUser(req, res) {
        try {
            const { nickname, avatar, desc } = req.body;
            const user = await User.findByIdAndUpdate(
                req.params.id,
                { nickname, avatar, desc },
                { new: true }
            ).select('-password');
            
            res.json({ success: true, user });
        } catch (error) {
            console.error('Update user error:', error);
            res.status(500).json({ error: 'Failed to update user' });
        }
    }

    async getUserProfile(req, res) {
        try {
            const user = await User.findById(req.user._id).select('-password');
            res.json({ success: true, user: user.getProfileData() });
        } catch (error) {
            console.error('Get user profile error:', error);
            res.status(500).json({ error: 'Failed to get user profile' });
        }
    }

    async updateUserProfile(req, res) {
        try {
            const { nickname, avatar, desc, about, website, country, age, gender } = req.body;
            const user = await User.findByIdAndUpdate(
                req.user._id,
                { nickname, avatar, desc, about, website, country, age, gender },
                { new: true }
            ).select('-password');
            
            res.json({ success: true, user: user.getProfileData() });
        } catch (error) {
            console.error('Update user profile error:', error);
            res.status(500).json({ error: 'Failed to update user profile' });
        }
    }

    async getOnlineUsers(req, res) {
        try {
            const users = await User.find({ isOnline: true })
                .select('username nickname avatar rank isOnline lastSeen')
                .sort({ lastSeen: -1 });
            res.json({ success: true, users });
        } catch (error) {
            console.error('Get online users error:', error);
            res.status(500).json({ error: 'Failed to get online users' });
        }
    }

    async getMessages(req, res) {
        try {
            const { roomId } = req.params;
            const { limit = 50, offset = 0 } = req.query;
            
            const messages = await Message.find({ recipient: roomId })
                .populate('sender', 'username nickname avatar rank')
                .sort({ createdAt: -1 })
                .limit(parseInt(limit))
                .skip(parseInt(offset));
            
            res.json({ success: true, messages: messages.reverse() });
        } catch (error) {
            console.error('Get messages error:', error);
            res.status(500).json({ error: 'Failed to get messages' });
        }
    }

    async sendMessage(req, res) {
        try {
            const { message, roomId } = req.body;
            
            const messageDoc = new Message({
                sender: req.user._id,
                recipient: roomId,
                content: message,
                messageType: 'chat'
            });
            
            await messageDoc.save();
            
            // Emit to socket room
            this.io.to(roomId).emit('new-message', {
                id: messageDoc._id,
                content: message,
                user: req.user.getProfileData(),
                timestamp: messageDoc.createdAt
            });
            
            res.json({ success: true, message: messageDoc });
        } catch (error) {
            console.error('Send message error:', error);
            res.status(500).json({ error: 'Failed to send message' });
        }
    }

    async getPowers(req, res) {
        try {
            const powers = await PowerService.getAvailablePowers();
            res.json({ success: true, powers });
        } catch (error) {
            console.error('Get powers error:', error);
            res.status(500).json({ error: 'Failed to get powers' });
        }
    }

    async getPowerById(req, res) {
        try {
            const power = await Power.findById(req.params.id);
            if (!power) {
                return res.status(404).json({ error: 'Power not found' });
            }
            res.json({ success: true, power });
        } catch (error) {
            console.error('Get power error:', error);
            res.status(500).json({ error: 'Failed to get power' });
        }
    }

    async purchasePower(req, res) {
        try {
            const { powerId } = req.body;
            const result = await PowerService.purchasePower(req.user._id, powerId);
            res.json(result);
        } catch (error) {
            console.error('Purchase power error:', error);
            res.status(500).json({ error: error.message });
        }
    }

    async getOwnedPowers(req, res) {
        try {
            const powers = await PowerService.getUserPowers(req.user._id);
            res.json({ success: true, powers });
        } catch (error) {
            console.error('Get owned powers error:', error);
            res.status(500).json({ error: 'Failed to get owned powers' });
        }
    }

    async activatePower(req, res) {
        try {
            const { powerId } = req.body;
            const result = await PowerService.activatePower(req.user, powerId);
            res.json(result);
        } catch (error) {
            console.error('Activate power error:', error);
            res.status(500).json({ error: error.message });
        }
    }

    async getRooms(req, res) {
        try {
            const rooms = await Room.find({}).sort({ createdAt: -1 });
            res.json({ success: true, rooms });
        } catch (error) {
            console.error('Get rooms error:', error);
            res.status(500).json({ error: 'Failed to get rooms' });
        }
    }

    async createRoom(req, res) {
        try {
            const { name, description, isPrivate } = req.body;
            const room = await ChatService.createRoom(req.user._id, {
                name,
                description,
                isPrivate
            });
            res.json({ success: true, room });
        } catch (error) {
            console.error('Create room error:', error);
            res.status(500).json({ error: error.message });
        }
    }

    async getRoom(req, res) {
        try {
            const room = await Room.findById(req.params.id);
            if (!room) {
                return res.status(404).json({ error: 'Room not found' });
            }
            res.json({ success: true, room });
        } catch (error) {
            console.error('Get room error:', error);
            res.status(500).json({ error: 'Failed to get room' });
        }
    }

    async getStorePackages(req, res) {
        try {
            const packages = [
                {
                    id: 'starter',
                    name: 'Starter Package',
                    price: 1000,
                    xats: 1000,
                    description: 'Perfect for new users'
                },
                {
                    id: 'premium',
                    name: 'Premium Package',
                    price: 5000,
                    xats: 6000,
                    description: 'Great value for active users'
                },
                {
                    id: 'vip',
                    name: 'VIP Package',
                    price: 10000,
                    xats: 15000,
                    description: 'For power users'
                }
            ];
            res.json({ success: true, packages });
        } catch (error) {
            console.error('Get store packages error:', error);
            res.status(500).json({ error: 'Failed to get store packages' });
        }
    }

    async purchaseItem(req, res) {
        try {
            const { itemId, itemType } = req.body;
            
            if (itemType === 'package') {
                // Handle package purchase
                const packages = await this.getStorePackages(req, res);
                // Implementation would deduct xats and add to user
                res.json({ success: true, message: 'Package purchased successfully' });
            } else {
                res.status(400).json({ error: 'Invalid item type' });
            }
        } catch (error) {
            console.error('Purchase item error:', error);
            res.status(500).json({ error: 'Failed to purchase item' });
        }
    }

    async getStats(req, res) {
        try {
            const stats = await User.getStats();
            res.json({ success: true, stats });
        } catch (error) {
            console.error('Get stats error:', error);
            res.status(500).json({ error: 'Failed to get stats' });
        }
    }

    /**
     * Start the server
     */
    async start() {
        try {
            // Connect to MongoDB
            const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/xat-chat';
            await mongoose.connect(mongoUri, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            console.log('✅ Connected to MongoDB');

            // Start HTTP server
            const port = process.env.PORT || 3000;
            this.server.listen(port, () => {
                console.log(`🚀 Server running on port ${port}`);
                console.log(`📱 Client URL: ${process.env.CLIENT_URL || 'http://localhost:8000'}`);
                console.log(`🗄️  Database: ${mongoUri}`);
            });
        } catch (error) {
            console.error('❌ Failed to start server:', error);
            process.exit(1);
        }
    }
}

module.exports = XatServer;

// Start server if called directly
if (require.main === module) {
    const server = new XatServer();
    server.start();
}
