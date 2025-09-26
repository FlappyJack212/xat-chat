/**
 * ixchats - Improved Chat Server
 * Modern, secure, and performant implementation
 */

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Import middleware
const { authLimiter, apiLimiter, messageFloodProtection } = require('./middleware/rateLimiter');
const { 
    sanitizeInput, 
    corsOptions, 
    securityHeaders, 
    securityLogger,
    validateJSON,
    requestSizeLimit
} = require('./middleware/security');

// Import models
const User = require('./models/User');
const Power = require('./models/Power');
const Room = require('./models/Room');
const Message = require('./models/Message');

// Import services
const AuthService = require('./services/AuthService');
const ChatService = require('./services/ChatService');
const PowerService = require('./services/PowerService');

class ImprovedXatServer {
    constructor() {
        this.app = express();
        this.server = http.createServer(this.app);
        this.io = socketIo(this.server, {
            cors: corsOptions,
            transports: ['websocket', 'polling'],
            pingTimeout: 60000,
            pingInterval: 25000,
            upgradeTimeout: 30000,
            allowUpgrades: true,
            compression: true,
            perMessageDeflate: true
        });

        this.connectedUsers = new Map();
        this.chatRooms = new Map();
        this.messageQueue = new Map(); // For message rate limiting
        
        this.initializeMiddleware();
        this.initializeRoutes();
        this.initializeSocketHandlers();
        this.setupGracefulShutdown();
    }

    /**
     * Initialize Express middleware
     */
    initializeMiddleware() {
        // Basic middleware
        this.app.use(compression()); // Enable gzip compression
        this.app.use(morgan('combined')); // Request logging
        this.app.use(securityHeaders); // Security headers
        this.app.use(cors(corsOptions)); // CORS
        
        // Security middleware
        this.app.use(securityLogger);
        this.app.use(requestSizeLimit('10mb'));
        this.app.use(validateJSON);
        this.app.use(sanitizeInput);
        
        // Body parsing
        this.app.use(express.json({ limit: '10mb' }));
        this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));
        
        // Serve xat interface as main page
        this.app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, '../client/xat-interface.html'));
        });

        // Static files with caching
        this.app.use(express.static(path.join(__dirname, '../client'), {
            maxAge: process.env.NODE_ENV === 'production' ? '1y' : '0',
            etag: true,
            lastModified: true,
            setHeaders: (res, path) => {
                // Cache assets longer than HTML
                if (path.endsWith('.js') || path.endsWith('.css') || path.endsWith('.png') || path.endsWith('.jpg')) {
                    res.setHeader('Cache-Control', 'public, max-age=31536000'); // 1 year
                } else if (path.endsWith('.html')) {
                    res.setHeader('Cache-Control', 'public, max-age=300'); // 5 minutes
                }
            }
        }));
    }

    /**
     * Initialize API routes
     */
    initializeRoutes() {
        // Health check
        this.app.get('/health', (req, res) => {
            res.json({
                status: 'ok',
                timestamp: new Date().toISOString(),
                uptime: process.uptime(),
                memory: process.memoryUsage(),
                connections: this.connectedUsers.size
            });
        });

        // API routes with rate limiting
        this.app.use('/api/auth', authLimiter, require('./routes/auth'));
        this.app.use('/api/users', apiLimiter, require('./routes/users'));
        this.app.use('/api/chats', apiLimiter, require('./routes/chats'));
        this.app.use('/api/powers', apiLimiter, require('./routes/powers'));
        this.app.use('/api/moderation', apiLimiter, require('./routes/moderation'));

        // Error handling
        this.app.use((err, req, res, next) => {
            console.error('🚨 [ERROR]', err);
            
            // Don't expose internal errors in production
            const message = process.env.NODE_ENV === 'production' 
                ? 'Internal server error' 
                : err.message;
                
            res.status(err.status || 500).json({
                success: false,
                message,
                ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
            });
        });

        // 404 handler
        this.app.use((req, res) => {
            res.status(404).json({
                success: false,
                message: 'Endpoint not found'
            });
        });
    }

    /**
     * Initialize Socket.IO handlers
     */
    initializeSocketHandlers() {
        this.io.on('connection', (socket) => {
            console.log(`🔌 [SOCKET] User connected: ${socket.id}`);
            
            // Connection rate limiting
            if (this.connectedUsers.size > 10000) {
                socket.emit('error', { message: 'Server at capacity' });
                socket.disconnect();
                return;
            }

            this.connectedUsers.set(socket.id, {
                socket,
                user: null,
                joinedAt: Date.now(),
                lastActivity: Date.now(),
                messageCount: 0
            });

            // Authentication
            socket.on('authenticate', async (data) => {
                try {
                    const user = await AuthService.verifySocket(data.token);
                    const connection = this.connectedUsers.get(socket.id);
                    if (connection) {
                        connection.user = user;
                        socket.emit('authenticated', { user: user.toSafeObject() });
                    }
                } catch (error) {
                    socket.emit('auth_error', { message: 'Authentication failed' });
                }
            });

            // Join room
            socket.on('join_room', async (data) => {
                const connection = this.connectedUsers.get(socket.id);
                if (!connection?.user) {
                    socket.emit('error', { message: 'Authentication required' });
                    return;
                }

                try {
                    const room = await ChatService.joinRoom(connection.user.id, data.roomId);
                    socket.join(data.roomId);
                    socket.emit('room_joined', { room });
                    socket.to(data.roomId).emit('user_joined', { user: connection.user.toSafeObject() });
                } catch (error) {
                    socket.emit('error', { message: error.message });
                }
            });

            // Handle messages with rate limiting
            socket.on('message', async (data) => {
                const connection = this.connectedUsers.get(socket.id);
                if (!connection?.user) {
                    socket.emit('error', { message: 'Authentication required' });
                    return;
                }

                // Rate limiting
                const now = Date.now();
                const userKey = connection.user.id;
                const userQueue = this.messageQueue.get(userKey) || [];
                const recentMessages = userQueue.filter(time => now - time < 60000); // Last minute

                if (recentMessages.length >= 20) {
                    socket.emit('rate_limited', { message: 'Message rate limit exceeded' });
                    return;
                }

                try {
                    const message = await ChatService.sendMessage({
                        userId: connection.user.id,
                        roomId: data.roomId,
                        content: data.content,
                        type: data.type || 'text'
                    });

                    // Update rate limiting
                    recentMessages.push(now);
                    this.messageQueue.set(userKey, recentMessages);
                    connection.messageCount++;
                    connection.lastActivity = now;

                    // Broadcast message
                    this.io.to(data.roomId).emit('message', message);
                } catch (error) {
                    socket.emit('error', { message: error.message });
                }
            });

            // Handle disconnection
            socket.on('disconnect', (reason) => {
                console.log(`🔌 [SOCKET] User disconnected: ${socket.id} (${reason})`);
                
                const connection = this.connectedUsers.get(socket.id);
                if (connection?.user) {
                    // Notify rooms about user leaving
                    socket.rooms.forEach(room => {
                        if (room !== socket.id) {
                            socket.to(room).emit('user_left', { 
                                user: connection.user.toSafeObject() 
                            });
                        }
                    });
                }
                
                this.connectedUsers.delete(socket.id);
            });

            // Handle errors
            socket.on('error', (error) => {
                console.error(`🚨 [SOCKET] Error from ${socket.id}:`, error);
            });
        });
    }

    /**
     * Connect to MongoDB
     */
    async connectToDatabase() {
        try {
            const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ixchats';
            
            await mongoose.connect(mongoUri, {
                maxPoolSize: 10,
                serverSelectionTimeoutMS: 5000,
                socketTimeoutMS: 45000,
                bufferCommands: false,
                bufferMaxEntries: 0
            });
            
            console.log('✅ [DB] Connected to MongoDB');
            
            // Optimize database
            await this.optimizeDatabase();
            
        } catch (error) {
            console.error('❌ [DB] MongoDB connection error:', error);
            process.exit(1);
        }
    }

    /**
     * Optimize database with indexes
     */
    async optimizeDatabase() {
        try {
            // Create indexes for better performance
            await User.createIndexes();
            await Message.createIndexes();
            await Room.createIndexes();
            await Power.createIndexes();
            
            console.log('✅ [DB] Database indexes optimized');
        } catch (error) {
            console.warn('⚠️ [DB] Index optimization warning:', error.message);
        }
    }

    /**
     * Setup graceful shutdown
     */
    setupGracefulShutdown() {
        const gracefulShutdown = (signal) => {
            console.log(`\n🛑 [SERVER] Received ${signal}. Graceful shutdown...`);
            
            // Close server
            this.server.close(() => {
                console.log('✅ [SERVER] HTTP server closed');
                
                // Close database connection
                mongoose.connection.close(false, () => {
                    console.log('✅ [DB] MongoDB connection closed');
                    process.exit(0);
                });
            });
            
            // Force close after 10 seconds
            setTimeout(() => {
                console.error('❌ [SERVER] Could not close connections in time, forcefully shutting down');
                process.exit(1);
            }, 10000);
        };

        process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
        process.on('SIGINT', () => gracefulShutdown('SIGINT'));
        
        // Handle uncaught exceptions
        process.on('uncaughtException', (error) => {
            console.error('❌ [SERVER] Uncaught Exception:', error);
            gracefulShutdown('uncaughtException');
        });
        
        process.on('unhandledRejection', (reason, promise) => {
            console.error('❌ [SERVER] Unhandled Rejection at:', promise, 'reason:', reason);
            gracefulShutdown('unhandledRejection');
        });
    }

    /**
     * Start the server
     */
    async start() {
        try {
            await this.connectToDatabase();
            
            const PORT = process.env.PORT || 3000;
            this.server.listen(PORT, () => {
                console.log(`🚀 [SERVER] ixchats server running on port ${PORT}`);
                console.log(`🌐 [SERVER] Environment: ${process.env.NODE_ENV || 'development'}`);
                console.log(`📁 [SERVER] Serving static files from: ${path.join(__dirname, '../client')}`);
            });
            
        } catch (error) {
            console.error('❌ [SERVER] Failed to start server:', error);
            process.exit(1);
        }
    }
}

// Start server if this file is run directly
if (require.main === module) {
    const server = new ImprovedXatServer();
    server.start();
}

module.exports = ImprovedXatServer;