/**
 * Unified Xat Chat Server
 * Consolidated implementation based on ixatServer.js with modern architecture
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
        this.app.use(helmet({
            contentSecurityPolicy: {
                directives: {
                    defaultSrc: ["'self'"],
                    scriptSrc: [
                        "'self'",
                        "https://cdn.socket.io"
                    ],
                    styleSrc: [
                        "'self'",
                        "'unsafe-inline'",
                        "https://fonts.googleapis.com"
                    ],
                    connectSrc: [
                        "'self'",
                        "ws://localhost:*",
                        "http://localhost:*",
                        "https://rxat.ro",
                        "http://rxat.ro",
                        "https://www.google-analytics.com"
                    ],
                    imgSrc: ["'self'", "data:", "https:"],
                    fontSrc: [
                        "'self'",
                        "https://fonts.gstatic.com"
                    ],
                    objectSrc: ["'none'"],
                    mediaSrc: ["'self'"],
                    frameSrc: ["'self'"],
                    scriptSrcAttr: ["'unsafe-inline'"]
                }
            }
        }));
        this.app.use(cors({
            origin: process.env.CLIENT_URL || "http://localhost:8000",
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Authorization']
        }));
        this.app.use(morgan('combined'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        // Serve static files
        this.app.use(express.static('src/client'));
        this.app.use('/www', express.static('src/client/www'));
        
        // Direct route to classic chat interface
        this.app.get('/chat', (req, res) => {
            res.sendFile(path.join(__dirname, '../client/www/classic.html'));
        });
        
        // Redirect /chat.html to /chat
        this.app.get('/chat.html', (req, res) => {
            res.redirect('/chat');
        });
        this.app.use('/activityWww', express.static('activityWww'));
        this.app.use('/assets', express.static('src/client/assets'));
        this.app.use('/sounds', express.static('src/client/sounds'));
        this.app.use('/audio', express.static('src/client/sounds'));
        this.app.use('/avatars', express.static('src/client/assets/avatars'));
        this.app.use('/smilies', express.static('src/client/assets/smilies'));
        this.app.use('/css', express.static('src/client/css'));
        this.app.use('/js', express.static('src/client/js'));
        this.app.use('/svg', express.static('src/client/www/svg'));
        
        // Add missing files that are causing 404s
        this.app.get('/firebase-messaging-sw.js', (req, res) => {
            res.setHeader('Content-Type', 'application/javascript');
            res.send('// Firebase messaging service worker placeholder');
        });
        
        this.app.get('/.well-known/appspecific/com.chrome.devtools.json', (req, res) => {
            res.status(404).json({ error: 'Not found' });
        });
        
        this.app.get('/js/bootstrap.bundle.min.js.map', (req, res) => {
            res.status(404).json({ error: 'Source map not found' });
        });
        
        // Serve xatcore files directly
        this.app.get('/xatcore.js', (req, res) => {
            res.setHeader('Content-Type', 'application/javascript');
            res.sendFile(path.join(__dirname, '../../src/client/js/www/xatcore.js'));
        });
        
        this.app.get('/xatcorewasm.js', (req, res) => {
            res.setHeader('Content-Type', 'application/javascript');
            res.sendFile(path.join(__dirname, '../../src/client/js/www/xatcorewasm.js'));
        });
        
        // Serve homepage at root
        this.app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, '../client/index.html'));
        });

        // Favicon route
        this.app.get('/favicon.ico', (req, res) => {
            res.sendFile(path.join(__dirname, '../../favicon.ico'));
        });

        // PHP file routes (served as JavaScript for compatibility)
        this.app.get('/web_gear/chat/pow2.php', (req, res) => {
            res.setHeader('Content-Type', 'application/json');
            res.json({ status: 'success', message: 'pow2.php loaded' });
        });

        // Add missing GetPowers2.php endpoint
        this.app.post('/api/proxy/web_gear/chat/GetPowers2.php', (req, res) => {
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            res.json({ 
                status: 'success', 
                powers: [],
                message: 'GetPowers2.php endpoint active' 
            });
        });

        // Serve xatcore files with correct MIME types
        this.app.get('/xatcore.php', (req, res) => {
            res.setHeader('Content-Type', 'application/javascript');
            res.sendFile(path.join(__dirname, '../../xatcore.php'));
        });

        this.app.get('/xatcorewasm.php', (req, res) => {
            res.setHeader('Content-Type', 'application/javascript');
            res.sendFile(path.join(__dirname, '../../xatcorewasm.php'));
        });

        this.app.get('/xatcorewasm.wasm', (req, res) => {
            res.setHeader('Content-Type', 'application/wasm');
            res.sendFile(path.join(__dirname, '../../xatcorewasm.wasm'));
        });

        // Proxy route for external API calls to avoid CORS
        this.app.get('/api/proxy/*', async (req, res) => {
            try {
                const url = req.url.replace('/api/proxy/', 'https://rxat.ro/');
                console.log('Proxying request to:', url);
                const response = await fetch(url);
                
                if (!response.ok) {
                    console.error('Proxy request failed:', response.status, response.statusText);
                    return res.status(response.status).json({ 
                        error: 'Proxy request failed', 
                        status: response.status,
                        statusText: response.statusText 
                    });
                }
                
                const data = await response.text();
                console.log('Proxy response length:', data.length);
                
                // Set appropriate content type based on the original response
                const contentType = response.headers.get('content-type') || 'application/json';
                res.setHeader('Content-Type', contentType);
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
                res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
                
                res.send(data);
            } catch (error) {
                console.error('Proxy error:', error);
                res.status(500).json({ 
                    error: 'Proxy request failed', 
                    message: error.message 
                });
            }
        });

        // Additional proxy route for direct rxat.ro calls
        this.app.get('/web_gear/chat/roomid.php', async (req, res) => {
            try {
                const url = `https://rxat.ro/web_gear/chat/roomid.php${req.url.includes('?') ? req.url.substring(req.url.indexOf('?')) : ''}`;
                console.log('Proxying roomid request to:', url);
                const response = await fetch(url);
                
                if (!response.ok) {
                    console.error('Roomid proxy request failed:', response.status, response.statusText);
                    return res.status(response.status).json({ 
                        error: 'Roomid proxy request failed', 
                        status: response.status,
                        statusText: response.statusText 
                    });
                }
                
                const data = await response.text();
                console.log('Roomid proxy response length:', data.length);
                
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
                res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
                
                res.send(data);
            } catch (error) {
                console.error('Roomid proxy error:', error);
                res.status(500).json({ error: 'Roomid proxy request failed', details: error.message });
            }
        });
    }

    /**
     * Authentication middleware
     */
    async authenticateToken(req, res, next) {
        try {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

            if (!token) {
                return res.status(401).json({ error: 'Access token required' });
            }

            const user = await AuthService.authenticate(token);
            if (!user) {
                return res.status(403).json({ error: 'Invalid token' });
            }

            req.user = user;
            next();
        } catch (error) {
            console.error('Auth middleware error:', error);
            res.status(403).json({ error: 'Invalid token' });
        }
    }

    /**
     * Initialize API routes
     */
    initializeRoutes() {
        // Auth routes
        this.app.post('/api/auth/login', AuthService.login);
        this.app.post('/api/auth/register', AuthService.register);
        this.app.post('/api/auth/logout', AuthService.logout);

        // User routes
        this.app.get('/api/users', this.getUsers.bind(this));
        this.app.get('/api/users/:id', this.getUser.bind(this));
        this.app.put('/api/users/:id', this.updateUser.bind(this));

        // Room routes
        this.app.get('/api/rooms', this.getRooms.bind(this));
        this.app.post('/api/rooms', this.createRoom.bind(this));
        this.app.get('/api/rooms/:id', this.getRoom.bind(this));
        
        // Store routes
        this.app.get('/api/store/powers', this.getPowers.bind(this));
        this.app.get('/api/store/powers/:id', this.getPowerById.bind(this));
        this.app.get('/api/store/auctions', this.getAuctions.bind(this));
        this.app.get('/api/store/promotions', this.getPromotions.bind(this));
        this.app.post('/api/store/purchase', this.purchaseItem.bind(this));
        this.app.post('/api/store/bid', this.placeBid.bind(this));
        this.app.get('/api/store/balance/:userId', this.getUserBalance.bind(this));

        // Power routes
        this.app.get('/api/powers', this.getPowers.bind(this));
        this.app.post('/api/powers/buy', this.authenticateToken, this.purchasePower.bind(this));
        this.app.get('/api/powers/pawns', this.getPawnPowers.bind(this));
        this.app.get('/api/powers/category/:category', this.getPowersByCategory.bind(this));
        this.app.get('/api/powers/owned', this.authenticateToken, this.getOwnedPowers.bind(this));
        this.app.post('/api/powers/equip-pawn', this.authenticateToken, this.equipPawn.bind(this));

        // Message routes
        this.app.get('/api/messages/:roomId', this.getMessages.bind(this));

        // Background routes
        this.app.use('/api/backgrounds', require('./routes/backgrounds'));

        // Additional API routes for frontend integration
        this.app.get('/api/users/online', this.getOnlineUsers.bind(this));
        this.app.get('/api/users/friends', this.authenticateToken, this.getUserFriends.bind(this));
        this.app.post('/api/users/kick', this.authenticateToken, this.kickUser.bind(this));
        this.app.get('/api/users/profile', this.authenticateToken, this.getUserProfile.bind(this));
        this.app.put('/api/users/profile', this.authenticateToken, this.updateUserProfile.bind(this));
        this.app.post('/api/powers/activate', this.authenticateToken, this.activatePower.bind(this));
        this.app.get('/api/chats', this.authenticateToken, this.getUserChats.bind(this));
        this.app.post('/api/chats', this.authenticateToken, this.createChat.bind(this));
        this.app.get('/api/chats/user', this.authenticateToken, this.getUserChats.bind(this));
        this.app.get('/api/chats/public', this.authenticateToken, this.getPublicChats.bind(this));
        this.app.get('/api/chats/stats', this.authenticateToken, this.getChatStats.bind(this));
        this.app.post('/api/chats/join', this.authenticateToken, this.joinChat.bind(this));
        this.app.post('/api/chats/create', this.authenticateToken, this.createChat.bind(this));
        this.app.post('/api/moderation/warn', this.authenticateToken, this.warnUser.bind(this));
        this.app.post('/api/moderation/mute', this.authenticateToken, this.muteUser.bind(this));
        this.app.post('/api/moderation/ban', this.authenticateToken, this.banUser.bind(this));
        this.app.post('/api/moderation/kick', this.authenticateToken, this.kickUser.bind(this));
        this.app.post('/api/rooms/edit', this.authenticateToken, this.editRoom.bind(this));
        this.app.post('/api/rooms/update', this.authenticateToken, this.updateRoom.bind(this));
        this.app.get('/api/trade', this.authenticateToken, this.getTradeItems.bind(this));
        this.app.get('/api/trade/list', this.authenticateToken, this.getTradeList.bind(this));
        this.app.post('/api/trade/list', this.authenticateToken, this.listTradeItem.bind(this));
        this.app.post('/api/trade/buy', this.authenticateToken, this.buyTradeItem.bind(this));
        this.app.post('/api/trade/remove', this.authenticateToken, this.removeTradeItem.bind(this));
        this.app.get('/api/stats', this.getStats.bind(this));
        
        // Additional authentication endpoints
        this.app.post('/api/auth/forgot-password', this.forgotPassword.bind(this));
        this.app.post('/api/auth/reset-password', this.resetPassword.bind(this));
        this.app.post('/api/auth/social/:provider', this.socialLogin.bind(this));
        
        // Additional store endpoints
        this.app.get('/api/store/packages', this.getStorePackages.bind(this));
        this.app.get('/api/store/subscriptions', this.getStoreSubscriptions.bind(this));
        this.app.post('/api/store/purchase-custom', this.purchaseCustom.bind(this));
        this.app.post('/api/store/subscribe', this.subscribe.bind(this));
        
        // Additional auction endpoints
        this.app.get('/api/auctions/:id', this.getAuction.bind(this));
        this.app.post('/api/auctions/create', this.createAuction.bind(this));
    }

    /**
     * Initialize Socket.IO handlers
     */
    initializeSocketHandlers() {
        this.io.on('connection', (socket) => {
            console.log('🔌 User connected:', socket.id);

            // Authentication
            socket.on('authenticate', (data) => this.handleAuthenticate(socket, data));
            socket.on('guest-login', (data) => this.handleGuestLogin(socket, data));

            // Chat functionality
            socket.on('join-room', (data) => this.handleJoinRoom(socket, data));
            socket.on('leave-room', (data) => this.handleLeaveRoom(socket, data));
            socket.on('send-message', (data) => this.handleSendMessage(socket, data));

            // Power system
            socket.on('activate-power', (data) => this.handleActivatePower(socket, data));
            socket.on('use-power', (data) => this.handleUsePower(socket, data));

            // Moderation
            socket.on('kick-user', (data) => this.handleKickUser(socket, data));
            socket.on('ban-user', (data) => this.handleBanUser(socket, data));
            socket.on('mute-user', (data) => this.handleMuteUser(socket, data));

            // Private messaging
            socket.on('private-message', (data) => this.handlePrivateMessage(socket, data));

            // User actions (click, profile, etc.)
            socket.on('user-action', (data) => this.handleUserAction(socket, data));
            socket.on('get-user-profile', (data) => this.handleGetUserProfile(socket, data));
            socket.on('get-self-profile', (data) => this.handleGetSelfProfile(socket, data));

            // Moderation commands (original iXat style)
            socket.on('moderation-command', (data) => this.handleModerationCommand(socket, data));
            socket.on('kickall', (data) => this.handleKickAll(socket, data));
            socket.on('hush', (data) => this.handleHush(socket, data));
            socket.on('ranklock', (data) => this.handleRankLock(socket, data));

            // Game commands
            socket.on('game-command', (data) => this.handleGameCommand(socket, data));
            socket.on('start-game', (data) => this.handleStartGame(socket, data));

            // Power management
            socket.on('assign-power', (data) => this.handleAssignPower(socket, data));
            socket.on('remove-power', (data) => this.handleRemovePower(socket, data));
            socket.on('get-powers', (data) => this.handleGetPowers(socket, data));

            // Friends management
            socket.on('add-friend', (data) => this.handleAddFriend(socket, data));
            socket.on('remove-friend', (data) => this.handleRemoveFriend(socket, data));
            socket.on('get-friends', (data) => this.handleGetFriends(socket, data));

            // Name management
            socket.on('set-name', (data) => this.handleSetName(socket, data));
            socket.on('change-nickname', (data) => this.handleChangeNickname(socket, data));
            socket.on('update-profile', (data) => this.handleUpdateProfile(socket, data));

            // Chat effects and formatting
            socket.on('chat-effect', (data) => this.handleChatEffect(socket, data));
            socket.on('text-format', (data) => this.handleTextFormat(socket, data));

            // Pawn management
            socket.on('change-pawn', (data) => this.handleChangePawn(socket, data));
            socket.on('upload-pawn', (data) => this.handleUploadPawn(socket, data));

            // Game system
            socket.on('start-game', (data) => this.handleStartGame(socket, data));
            socket.on('leave-game', (data) => this.handleLeaveGame(socket, data));
            socket.on('invite-players', (data) => this.handleInvitePlayers(socket, data));
            socket.on('game-action', (data) => this.handleGameAction(socket, data));

            // Disconnect
            socket.on('disconnect', () => this.handleDisconnect(socket));
        });
    }

    /**
     * Handle user authentication
     */
    async handleAuthenticate(socket, data) {
        try {
            // Handle guest authentication
            if (data.guest) {
                const guestUser = await AuthService.createGuestUser(data.nickname);
                this.connectedUsers.set(socket.id, guestUser);
                socket.emit('authenticated', { user: guestUser, success: true });
                console.log('✅ Guest user authenticated:', guestUser.nickname);
                return;
            }

            // Handle JWT token authentication
            if (data.token) {
            const user = await AuthService.authenticate(data.token);
            if (user) {
                this.connectedUsers.set(socket.id, user);
                socket.emit('authenticated', { user, success: true });
                console.log('✅ User authenticated:', user.username);
            } else {
                socket.emit('auth-error', { message: 'Invalid token' });
                }
            } else {
                // No token provided, create guest user
                const guestUser = await AuthService.createGuestUser(data.nickname);
                this.connectedUsers.set(socket.id, guestUser);
                socket.emit('authenticated', { user: guestUser, success: true });
                console.log('✅ Guest user created (no token):', guestUser.nickname);
            }
        } catch (error) {
            console.error('Authentication error:', error);
            socket.emit('auth-error', { message: 'Authentication failed' });
        }
    }

    /**
     * Handle guest login
     */
    async handleGuestLogin(socket, data) {
        try {
            const guestUser = await AuthService.createGuestUser(data.nickname);
            this.connectedUsers.set(socket.id, guestUser);
            socket.emit('guest-authenticated', { user: guestUser, success: true });
            console.log('👤 Guest user created:', guestUser.nickname);
        } catch (error) {
            console.error('Guest login error:', error);
            socket.emit('auth-error', { message: 'Guest login failed' });
        }
    }

    /**
     * Handle room joining
     */
    async handleJoinRoom(socket, data) {
        try {
            const user = this.connectedUsers.get(socket.id);
            if (!user) return;

            const roomId = data.roomId || data.roomName || 'Main Chat';
            
            // Leave previous room if any
            if (user.currentRoom) {
                socket.leave(user.currentRoom);
                this.notifyUserLeftRoom(socket, user, user.currentRoom);
            }
            
            // Join the socket room
            socket.join(roomId);
            user.currentRoom = roomId;

            // Get or create room
            let room = await Room.findOne({ name: roomId });
            if (!room) {
                room = new Room({
                    name: roomId,
                    description: `Welcome to ${roomId}`,
                    isPrivate: false
                });
                await room.save();
            }

            // Notify others in the room
            socket.to(roomId).emit('userJoined', {
                user: {
                    id: user.userId, // Use xat-style numeric ID
                    _id: user._id, // Keep MongoDB _id for internal use
                    username: user.username,
                    nickname: user.nickname,
                    avatar: user.avatar,
                    pawn: user.pawn || user.custpawn,
                    pawnColor: user.pawnColor,
                    rank: user.rank
                },
                message: `${user.nickname || user.username} joined the room`
            });

            // Send room info to user
            socket.emit('roomJoined', { 
                room: {
                    id: room._id,
                    name: room.name,
                    description: room.description
                },
                success: true 
            });

            // Send current users in room to the joining user
            this.sendUserListToSocket(socket, roomId);

            // Update user list for all users in the room
            this.updateUserListForRoom(roomId);
            
            console.log('👥 [SERVER] User list sent to', user.nickname);

            console.log('🚪 User joined room:', user.nickname, roomId);
        } catch (error) {
            console.error('Join room error:', error);
            socket.emit('error', { message: 'Failed to join room' });
        }
    }

    /**
     * Send user list to a specific socket
     */
    sendUserListToSocket(socket, roomId) {
        const roomUsers = Array.from(this.connectedUsers.values())
            .filter(u => u.currentRoom === roomId);
        
        socket.emit('userList', { 
            users: roomUsers.map(user => ({
                id: user.userId, // Use xat-style numeric ID
                _id: user._id, // Keep MongoDB _id for internal use
                username: user.username,
                nickname: user.nickname,
                avatar: user.avatar,
                pawn: user.pawn || user.custpawn,
                rank: user.rank,
                isOnline: true,
                currentRoom: user.currentRoom
            }))
        });
        
        console.log(`👥 Sent user list to socket: ${roomUsers.length} users in ${roomId}`);
    }

    /**
     * Update user list for all users in a room
     */
    updateUserListForRoom(roomId) {
        const roomUsers = Array.from(this.connectedUsers.values())
            .filter(u => u.currentRoom === roomId);
        
        const userListData = {
            users: roomUsers.map(user => ({
                id: user.userId, // Use xat-style numeric ID
                _id: user._id, // Keep MongoDB _id for internal use
                username: user.username,
                nickname: user.nickname,
                avatar: user.avatar,
                pawn: user.pawn || user.custpawn,
                rank: user.rank,
                isOnline: true,
                currentRoom: user.currentRoom
            }))
        };
        
        // Send updated user list to all users in the room
        this.io.to(roomId).emit('userList', userListData);
        
        console.log(`👥 Updated user list for room ${roomId}: ${roomUsers.length} users`);
    }

    /**
     * Notify room when user leaves
     */
    notifyUserLeftRoom(socket, user, roomId) {
        if (roomId) {
            socket.to(roomId).emit('userLeft', {
                user: {
                    id: user.userId, // Use xat-style numeric ID
                    _id: user._id, // Keep MongoDB _id for internal use
                    username: user.username,
                    nickname: user.nickname,
                    avatar: user.avatar,
                    rank: user.rank
                },
                message: `${user.nickname || user.username} left the room`
            });
            
            // Update user list for remaining users
            this.updateUserListForRoom(roomId);
        }
    }

    /**
     * Handle message sending
     */
    async handleSendMessage(socket, data) {
        try {
            const user = this.connectedUsers.get(socket.id);
            if (!user) return;

            const roomId = data.roomId || 'Main Chat';
            const messageText = data.message;

            if (!messageText || messageText.trim().length === 0) {
                socket.emit('error', { message: 'Message cannot be empty' });
                return;
            }

            // Create message in database
            const message = new Message({
                content: messageText,
                userId: user._id,
                roomId: roomId,
                type: 'message'
            });

            await message.save();

            // Broadcast to room
            this.io.to(roomId).emit('message', {
                user: {
                    id: user.userId, // Use xat-style numeric ID
                    _id: user._id, // Keep MongoDB _id for internal use
                    username: user.username,
                    nickname: user.nickname,
                    avatar: user.avatar,
                    pawn: user.pawn || user.custpawn,
                    pawnColor: user.pawnColor,
                    rank: user.rank
                },
                message: {
                    content: messageText,
                    timestamp: new Date(),
                    id: message._id
                }
            });

            console.log('💬 Message sent:', user.nickname, messageText.substring(0, 50));
        } catch (error) {
            console.error('Send message error:', error);
            socket.emit('error', { message: 'Failed to send message' });
        }
    }

    /**
     * Handle power activation
     */
    async handleActivatePower(socket, data) {
        try {
            const user = this.connectedUsers.get(socket.id);
            if (!user) return;

            const result = await PowerService.activatePower(user, data.powerId);

            if (result.success) {
                socket.emit('power-activated', result);
                socket.to(data.roomId).emit('power-effect', result);
            } else {
                socket.emit('power-error', result);
            }
        } catch (error) {
            console.error('Power activation error:', error);
            socket.emit('power-error', { message: 'Power activation failed' });
        }
    }

    /**
     * Handle user disconnect
     */
    handleDisconnect(socket) {
        const user = this.connectedUsers.get(socket.id);
        if (user) {
            console.log('🔌 User disconnected:', user.nickname);

            // Notify rooms the user was in
            socket.rooms.forEach(roomId => {
                if (roomId !== socket.id) {
                    socket.to(roomId).emit('user-left', {
                        user: user,
                        message: `${user.nickname || user.username} left the room`
                    });
                }
            });

            this.connectedUsers.delete(socket.id);
        }
    }

    // API Route handlers
    async getUsers(req, res) {
        try {
            const users = await User.find({ isOnline: true }).select('-password');
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch users' });
        }
    }

    async getUser(req, res) {
        try {
            const user = await User.findById(req.params.id).select('-password');
            if (!user) return res.status(404).json({ error: 'User not found' });
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch user' });
        }
    }

    async getRooms(req, res) {
        try {
            const rooms = await Room.find();
            res.json(rooms);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch rooms' });
        }
    }

    async getPowers(req, res) {
        try {
            console.log('🔍 [DEBUG] getPowers called');
            
            // Load powers from the JSON file for more realistic data
            const fs = require('fs');
            const path = require('path');
            const powersPath = path.join(__dirname, '../../powers.json');
            
            if (fs.existsSync(powersPath)) {
                console.log('📁 [DEBUG] Loading powers from JSON file');
                const powersData = JSON.parse(fs.readFileSync(powersPath, 'utf8'));
                
                // Filter out system powers and limit to reasonable amount
                const powers = powersData
                    .filter(power => 
                        !['allpowers', 'chrome', 'everypower'].includes(power.name) &&
                        !power.name.includes('(Undefined)') &&
                        power.cost >= 0 &&
                        power.status === 'Available'
                    )
                    .slice(0, 100) // Limit to 100 powers for performance
                    .map(power => ({
                        _id: power.name, // Use name as ID for simplicity
                        name: power.name,
                        description: power.description || power.subdesc || 'Power effect',
                        cost: power.cost || power.xats || 0,
                        xats: power.cost || power.xats || 0,
                        category: power.category || power.type || 'standard',
                        icon: this.getPowerIcon(power.name),
                        status: power.status || 'Available',
                        limited: power.limited || false,
                        amount: power.amount || -1,
                        epic: power.epic || false,
                        group: power.group || false,
                        game: power.game || false,
                        newpower: power.newpower || false
                    }));
                
                console.log('✅ [DEBUG] Loaded', powers.length, 'powers from JSON');
                return res.json({ success: true, powers });
            }
            
            // Fallback to PowerService if JSON doesn't exist
            console.log('📁 [DEBUG] JSON file not found, using PowerService');
            const powers = await PowerService.getAvailablePowers();
            console.log('🔍 [DEBUG] PowerService returned:', powers.length, 'powers');
            
            if (powers.length === 0) {
                console.log('⚠️ [WARNING] No powers found, using fallback data');
                // Fallback powers data
                const fallbackPowers = [
                    {
                        _id: '1',
                        name: 'Rainbow Text',
                        description: 'Make your text appear in rainbow colors',
                        cost: 100,
                        xats: 100,
                        category: 'text',
                        icon: '🌈',
                        status: 'Available',
                        limited: false,
                        amount: -1
                    },
                    {
                        _id: '2',
                        name: 'Bold Text',
                        description: 'Make your text bold and stand out',
                        cost: 50,
                        xats: 50,
                        category: 'text',
                        icon: '💪',
                        status: 'Available',
                        limited: false,
                        amount: -1
                    },
                    {
                        _id: '3',
                        name: 'Italic Text',
                        description: 'Make your text italic and elegant',
                        cost: 50,
                        xats: 50,
                        category: 'text',
                        icon: '📝',
                        status: 'Available',
                        limited: false,
                        amount: -1
                    },
                    {
                        _id: '4',
                        name: 'Underline Text',
                        description: 'Underline your text for emphasis',
                        cost: 50,
                        xats: 50,
                        category: 'text',
                        icon: '📏',
                        status: 'Available',
                        limited: false,
                        amount: -1
                    },
                    {
                        _id: '5',
                        name: 'Strike Text',
                        description: 'Strike through your text',
                        cost: 50,
                        xats: 50,
                        category: 'text',
                        icon: '❌',
                        status: 'Available',
                        limited: false,
                        amount: -1
                    }
                ];
                return res.json({ success: true, powers: fallbackPowers });
            }
            
            res.json({ success: true, powers });
        } catch (error) {
            console.error('Get powers error:', error);
            res.status(500).json({ error: 'Failed to fetch powers' });
        }
    }

    getPowerIcon(powerName) {
        // Map power names to appropriate icons
        const iconMap = {
            'rainbow': '🌈',
            'bold': '💪',
            'italic': '📝',
            'underline': '📏',
            'strike': '❌',
            'glow': '✨',
            'bounce': '⚡',
            'spin': '🌀',
            'heart': '❤️',
            'square': '⬜',
            'diamond': '💎',
            'star': '⭐',
            'fire': '🔥',
            'ice': '❄️',
            'lightning': '⚡',
            'shield': '🛡️',
            'sword': '⚔️',
            'crown': '👑',
            'gem': '💎',
            'coin': '🪙',
            'gift': '🎁',
            'party': '🎉',
            'music': '🎵',
            'camera': '📷',
            'video': '📹',
            'phone': '📞',
            'mail': '📧',
            'chat': '💬',
            'smile': '😊',
            'wink': '😉',
            'laugh': '😂',
            'cry': '😢',
            'angry': '😠',
            'cool': '😎',
            'surprised': '😮',
            'tongue': '😛'
        };
        
        const lowerName = powerName.toLowerCase();
        for (const [key, icon] of Object.entries(iconMap)) {
            if (lowerName.includes(key)) {
                return icon;
            }
        }
        
        // Default icons based on category
        if (lowerName.includes('text') || lowerName.includes('font')) return '📝';
        if (lowerName.includes('color') || lowerName.includes('rainbow')) return '🌈';
        if (lowerName.includes('effect') || lowerName.includes('animation')) return '✨';
        if (lowerName.includes('game') || lowerName.includes('play')) return '🎮';
        if (lowerName.includes('mod') || lowerName.includes('admin')) return '🛡️';
        if (lowerName.includes('group') || lowerName.includes('team')) return '👥';
        
        return '⚡'; // Default power icon
    }

    async purchasePower(req, res) {
        try {
            const { powerName, powerId } = req.body;
            const userId = req.user._id; // Auth middleware sets req.user

            let power;
            if (powerId) {
                power = await Power.findById(powerId);
            } else if (powerName) {
                power = await Power.findOne({ name: powerName });
            } else {
                return res.status(400).json({ error: 'Power ID or name required' });
            }

            if (!power) {
                return res.status(404).json({ error: 'Power not found' });
            }

            const result = await PowerService.purchasePower(userId, power._id);
            res.json(result);
        } catch (error) {
            console.error('Purchase power error:', error);
            res.status(400).json({ error: error.message });
        }
    }

    async getPawnPowers(req, res) {
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
    }

    async getPowersByCategory(req, res) {
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
    }

    async getOwnedPowers(req, res) {
        try {
            const userId = req.user._id;
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
    }

    async equipPawn(req, res) {
        try {
            const { pawnName } = req.body;
            const userId = req.user._id;

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
    }

    async getMessages(req, res) {
        try {
            const messages = await Message.find({ roomId: req.params.roomId })
                .populate('userId', 'nickname username avatar')
                .sort({ timestamp: -1 })
                .limit(50);
            res.json(messages.reverse());
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch messages' });
        }
    }

    /**
     * Handle room leaving
     */
    async handleLeaveRoom(socket, data) {
        try {
            const user = this.connectedUsers.get(socket.id);
            if (!user) return;

            socket.leave(data.roomId);
            
            // Notify others in the room
            socket.to(data.roomId).emit('user-left', {
                user: user,
                message: `${user.nickname || user.username} left the room`
            });

            console.log('🚪 User left room:', user.nickname, data.roomId);
        } catch (error) {
            console.error('Leave room error:', error);
            socket.emit('error', { message: 'Failed to leave room' });
        }
    }

    /**
     * Handle power usage
     */
    async handleUsePower(socket, data) {
        try {
            const user = this.connectedUsers.get(socket.id);
            if (!user) return;

            const result = await PowerService.usePower(user, data.powerId, data.roomId);
            
            if (result.success) {
                socket.emit('power-used', result);
                socket.to(data.roomId).emit('power-effect', result);
            } else {
                socket.emit('power-error', result);
            }
        } catch (error) {
            console.error('Use power error:', error);
            socket.emit('power-error', { message: 'Power usage failed' });
        }
    }

    /**
     * Handle user kicking
     */
    async handleKickUser(socket, data) {
        try {
            const moderator = this.connectedUsers.get(socket.id);
            if (!moderator || moderator.rank < 3) {
                socket.emit('error', { message: 'Insufficient permissions' });
                return;
            }

            // Find target user socket
            const targetSocket = Array.from(this.connectedUsers.entries())
                .find(([_, user]) => user._id.toString() === data.userId)?.[0];
            
            if (targetSocket) {
                this.io.to(targetSocket).emit('kicked', { reason: data.reason });
                this.connectedUsers.delete(targetSocket);
            }

            socket.emit('user-kicked', { success: true });
        } catch (error) {
            console.error('Kick user error:', error);
            socket.emit('error', { message: 'Failed to kick user' });
        }
    }

    /**
     * Handle user banning
     */
    async handleBanUser(socket, data) {
        try {
            const moderator = this.connectedUsers.get(socket.id);
            if (!moderator || moderator.rank < 3) {
                socket.emit('error', { message: 'Insufficient permissions' });
                return;
            }

            const targetUser = await User.findById(data.userId);
            if (targetUser) {
                targetUser.banned = new Date(Date.now() + data.duration * 60 * 60 * 1000);
                targetUser.banReason = data.reason;
                await targetUser.save();
            }

            socket.emit('user-banned', { success: true });
        } catch (error) {
            console.error('Ban user error:', error);
            socket.emit('error', { message: 'Failed to ban user' });
        }
    }

    /**
     * Handle user muting
     */
    async handleMuteUser(socket, data) {
        try {
            const moderator = this.connectedUsers.get(socket.id);
            if (!moderator || moderator.rank < 3) {
                socket.emit('error', { message: 'Insufficient permissions' });
                return;
            }

            // Find target user socket and mute them
            const targetSocket = Array.from(this.connectedUsers.entries())
                .find(([_, user]) => user._id.toString() === data.userId)?.[0];
            
            if (targetSocket) {
                this.io.to(targetSocket).emit('muted', { 
                    duration: data.duration, 
                    reason: data.reason 
                });
            }

            socket.emit('user-muted', { success: true });
        } catch (error) {
            console.error('Mute user error:', error);
            socket.emit('error', { message: 'Failed to mute user' });
        }
    }

    /**
     * Handle private messaging
     */
    async handlePrivateMessage(socket, data) {
        try {
            const sender = this.connectedUsers.get(socket.id);
            if (!sender) return;

            // Find target user socket
            const targetSocket = Array.from(this.connectedUsers.entries())
                .find(([_, user]) => user._id.toString() === data.userId)?.[0];
            
            if (targetSocket) {
                this.io.to(targetSocket).emit('private-message', {
                    from: sender,
                    message: data.message,
                    timestamp: new Date()
                });
                socket.emit('private-message-sent', { success: true });
            } else {
                socket.emit('error', { message: 'User not online' });
            }
        } catch (error) {
            console.error('Private message error:', error);
            socket.emit('error', { message: 'Failed to send private message' });
        }
    }

    /**
     * Handle user disconnect
     */
    handleDisconnect(socket) {
        const user = this.connectedUsers.get(socket.id);
        if (user) {
            console.log('🔌 User disconnected:', user.nickname || user.username);
            
            // Notify room of user leaving
            if (user.currentRoom) {
                this.notifyUserLeftRoom(socket, user, user.currentRoom);
            }
            
            // Remove user from connected users
            this.connectedUsers.delete(socket.id);
        }
    }

    // API Route implementations
    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const updates = req.body;
            
            const user = await User.findByIdAndUpdate(id, updates, { new: true });
            if (!user) return res.status(404).json({ error: 'User not found' });
            
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update user' });
        }
    }

    async createRoom(req, res) {
        try {
            const { name, description, isPrivate } = req.body;
            
            const room = new Room({
                name,
                description,
                isPrivate: isPrivate || false,
                createdBy: req.user?._id
            });
            
            await room.save();
            res.json(room);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create room' });
        }
    }

    async getRoom(req, res) {
        try {
            const room = await Room.findById(req.params.id);
            if (!room) return res.status(404).json({ error: 'Room not found' });
            res.json(room);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch room' });
        }
    }

    /**
     * Connect to database
     */
    async connectDatabase() {
        try {
            await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ixat_chat');
            console.log('🗄️ Connected to MongoDB');
        } catch (error) {
            console.error('Database connection error:', error);
            process.exit(1);
        }
    }

    /**
     * Start the server
     */
    async start(port = process.env.PORT || 8000) {
        try {
            await this.connectDatabase();

            this.server.listen(port, () => {
                console.log('🚀 Xat Chat Server started');
                console.log(`🌐 Server running on port ${port}`);
                console.log(`🔌 Socket.IO ready for connections`);
                console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
            });
        } catch (error) {
            console.error('Failed to start server:', error);
            process.exit(1);
        }
    }

    /**
     * Handle user actions (click, profile, etc.)
     */
    async handleUserAction(socket, data) {
        try {
            const user = this.connectedUsers.get(socket.id);
            if (!user) return;

            const { action, targetUserId, targetUsername } = data;

            switch (action) {
                case 'click':
                    if (targetUserId) {
                        const targetUser = await User.findById(targetUserId);
                        if (targetUser) {
                            socket.emit('user-profile', {
                                user: targetUser.getProfileData(),
                                canModerate: user.canModerateUser(targetUser),
                                availableActions: this.getAvailableActions(user, targetUser)
                            });
                        }
                    }
                    break;
                case 'profile':
                    if (targetUserId) {
                        const targetUser = await User.findById(targetUserId).populate('powers.powerId');
                        if (targetUser) {
                            socket.emit('detailed-profile', {
                                user: targetUser.getProfileData(),
                                powers: targetUser.getActivePowers(),
                                canModerate: user.canModerateUser(targetUser),
                                availableActions: this.getAvailableActions(user, targetUser)
                            });
                        }
                    }
                    break;
                case 'private-chat':
                    if (targetUserId) {
                        const targetUser = await User.findById(targetUserId);
                        if (targetUser) {
                            socket.emit('private-chat-started', {
                                targetUser: targetUser.getProfileData(),
                                success: true
                            });
                        }
                    }
                    break;
            }
        } catch (error) {
            console.error('User action error:', error);
            socket.emit('error', { message: 'Action failed' });
        }
    }

    /**
     * Handle get user profile
     */
    async handleGetUserProfile(socket, data) {
        try {
            const user = this.connectedUsers.get(socket.id);
            if (!user) return;

            // Handle both old MongoDB _id and new xat-style userId
            let targetUser;
            if (data.userId && typeof data.userId === 'string' && data.userId.length === 24) {
                // MongoDB ObjectId format
                targetUser = await User.findById(data.userId).populate('powers.powerId');
            } else {
                // xat-style numeric ID
                targetUser = await User.findByUserId(data.userId).populate('powers.powerId');
            }
            if (targetUser) {
                // Get user's active powers
                const activePowers = targetUser.getActivePowers();
                const powerNames = activePowers.map(p => p.name).join(', ');

                const profileData = {
                    user: {
                        ...targetUser.getProfileData(),
                        status: targetUser.status || 'No status set',
                        statusMessage: targetUser.statusMessage || '',
                        homepage: targetUser.homepage || 'No homepage set',
                        website: targetUser.website || '',
                        about: targetUser.about || '',
                        country: targetUser.country || '',
                        age: targetUser.age || 0,
                        gender: targetUser.gender || '',
                        registered: targetUser.registered || false,
                        subscriber: targetUser.subscriber || false,
                        married: targetUser.married || false,
                        bff: targetUser.bff || false,
                        joinDate: targetUser.joinDate || targetUser.createdAt || new Date(),
                        lastSeen: targetUser.lastSeen || new Date(),
                        powerNames: powerNames,
                        // Format dates for display
                        joinDateFormatted: targetUser.joinDate ? new Date(targetUser.joinDate).toLocaleDateString() : 'Unknown',
                        lastSeenFormatted: targetUser.lastSeen ? new Date(targetUser.lastSeen).toLocaleString() : 'Never',
                        // Activity stats
                        daysSinceJoin: targetUser.joinDate ? Math.floor((Date.now() - new Date(targetUser.joinDate)) / (1000 * 60 * 60 * 24)) : 0,
                        messagesPerDay: targetUser.joinDate ? Math.round(targetUser.totalMessages / Math.max(1, Math.floor((Date.now() - new Date(targetUser.joinDate)) / (1000 * 60 * 60 * 24)))) : 0,
                        // Status indicators
                        isAway: targetUser.status === 'away',
                        isBusy: targetUser.status === 'busy',
                        isInvisible: targetUser.status === 'invisible',
                        // Power information
                        powerCount: activePowers.length,
                        hasModPowers: targetUser.rank >= 3,
                        hasOwnerPowers: targetUser.rank >= 4,
                        // Social stats
                        friendCount: targetUser.friends ? targetUser.friends.length : 0,
                        chatCount: targetUser.totalChats || 0,
                        // Premium status
                        hasVip: targetUser.isVip || false,
                        hasPremium: targetUser.isPremium || false,
                        // Verification status
                        isVerified: targetUser.emailVerified || false
                    },
                    powers: activePowers,
                    canModerate: user.canModerateUser(targetUser),
                    availableActions: this.getAvailableActions(user, targetUser)
                };

                // Add isSelf flag to detect if user is viewing their own profile
                profileData.isSelf = user._id.toString() === targetUser._id.toString();
                
                socket.emit('user-profile', profileData);
            } else {
                socket.emit('error', { message: 'User not found' });
            }
        } catch (error) {
            console.error('Get user profile error:', error);
            socket.emit('error', { message: 'Failed to get user profile' });
        }
    }

    /**
     * Handle add friend
     */
    async handleAddFriend(socket, data) {
        try {
            const user = this.connectedUsers.get(socket.id);
            if (!user) return;

            const targetUser = await User.findOne({ username: data.username });
            if (!targetUser) {
                socket.emit('friend-error', { message: 'User not found' });
                return;
            }

            // Check if already friends
            if (user.friends.includes(targetUser._id.toString()) || targetUser.friends.includes(user._id.toString())) {
                socket.emit('friend-error', { message: 'Already friends' });
                return;
            }

            // Add friend relationship (bidirectional)
            user.friends.push(targetUser._id);
            targetUser.friends.push(user._id);
            
            await user.save();
            await targetUser.save();

            // Notify both users
            socket.emit('friend-added', { 
                friend: targetUser.getProfileData(),
                message: `You are now friends with ${targetUser.nickname || targetUser.username}` 
            });

            // Notify target user if they're online
            const targetSocket = this.getSocketByUserId(targetUser._id.toString());
            if (targetSocket) {
                targetSocket.emit('friend-added', { 
                    friend: user.getProfileData(),
                    message: `${user.nickname || user.username} added you as a friend` 
                });
            }

            console.log(`👥 [SERVER] Friends added: ${user.nickname} and ${targetUser.nickname}`);
        } catch (error) {
            console.error('Add friend error:', error);
            socket.emit('friend-error', { message: 'Failed to add friend' });
        }
    }

    /**
     * Handle remove friend
     */
    async handleRemoveFriend(socket, data) {
        try {
            const user = this.connectedUsers.get(socket.id);
            if (!user) return;

            const targetUser = await User.findOne({ username: data.username });
            if (!targetUser) {
                socket.emit('friend-error', { message: 'User not found' });
                return;
            }

            // Remove friend relationship (bidirectional)
            user.friends = user.friends.filter(id => id.toString() !== targetUser._id.toString());
            targetUser.friends = targetUser.friends.filter(id => id.toString() !== user._id.toString());
            
            await user.save();
            await targetUser.save();

            socket.emit('friend-removed', { 
                friend: targetUser.getProfileData(),
                message: `Removed ${targetUser.nickname || targetUser.username} from friends` 
            });

            // Notify target user if they're online
            const targetSocket = this.getSocketByUserId(targetUser._id.toString());
            if (targetSocket) {
                targetSocket.emit('friend-removed', { 
                    friend: user.getProfileData(),
                    message: `${user.nickname || user.username} removed you from friends` 
                });
            }

            console.log(`👥 [SERVER] Friends removed: ${user.nickname} and ${targetUser.nickname}`);
        } catch (error) {
            console.error('Remove friend error:', error);
            socket.emit('friend-error', { message: 'Failed to remove friend' });
        }
    }

    /**
     * Handle get friends
     */
    async handleGetFriends(socket, data) {
        try {
            const user = this.connectedUsers.get(socket.id);
            if (!user) return;

            const fullUser = await User.findById(user._id).populate('friends');
            const friends = fullUser.friends.map(friend => ({
                ...friend.getProfileData(),
                isOnline: this.isUserOnline(friend._id.toString())
            }));

            socket.emit('friends-list', { friends });
        } catch (error) {
            console.error('Get friends error:', error);
            socket.emit('friend-error', { message: 'Failed to get friends' });
        }
    }

    /**
     * Handle set name (for guest accounts)
     */
    async handleSetName(socket, data) {
        try {
            const user = this.connectedUsers.get(socket.id);
            if (!user) return;

            const { newName } = data;
            
            if (!newName || newName.trim().length === 0) {
                socket.emit('name-error', { message: 'Name cannot be empty' });
                return;
            }

            if (newName.length > 20) {
                socket.emit('name-error', { message: 'Name too long (max 20 characters)' });
                return;
            }

            // Check if name is already taken by another user
            const existingUser = await User.findOne({ 
                nickname: newName.trim(),
                _id: { $ne: user._id }
            });

            if (existingUser) {
                socket.emit('name-error', { message: 'Name already taken' });
                return;
            }

            // Update user's nickname
            user.nickname = newName.trim();
            await user.save();

            // Notify room of name change
            if (user.currentRoom) {
                socket.to(user.currentRoom).emit('name-changed', {
                    userId: user.userId,
                    oldName: user.username,
                    newName: user.nickname,
                    message: `${user.username} is now known as ${user.nickname}`
                });
            }

            // Update user list for the room
            if (user.currentRoom) {
                this.updateUserListForRoom(user.currentRoom);
            }

            socket.emit('name-changed', {
                success: true,
                newName: user.nickname,
                message: `You are now known as ${user.nickname}`
            });

            console.log(`📝 [SERVER] Name changed: ${user.username} -> ${user.nickname}`);
        } catch (error) {
            console.error('Set name error:', error);
            socket.emit('name-error', { message: 'Failed to change name' });
        }
    }

    /**
     * Handle change nickname (for registered accounts)
     */
    async handleChangeNickname(socket, data) {
        try {
            const user = this.connectedUsers.get(socket.id);
            if (!user) return;

            const { newNickname } = data;
            
            if (!newNickname || newNickname.trim().length === 0) {
                socket.emit('nickname-error', { message: 'Nickname cannot be empty' });
                return;
            }

            if (newNickname.length > 20) {
                socket.emit('nickname-error', { message: 'Nickname too long (max 20 characters)' });
                return;
            }

            // Check if nickname is already taken by another user
            const existingUser = await User.findOne({ 
                nickname: newNickname.trim(),
                _id: { $ne: user._id }
            });

            if (existingUser) {
                socket.emit('nickname-error', { message: 'Nickname already taken' });
                return;
            }

            const oldNickname = user.nickname || user.username;
            
            // Update user's nickname
            user.nickname = newNickname.trim();
            await user.save();

            // Notify room of nickname change
            if (user.currentRoom) {
                socket.to(user.currentRoom).emit('nickname-changed', {
                    userId: user.userId,
                    oldNickname: oldNickname,
                    newNickname: user.nickname,
                    message: `${oldNickname} is now known as ${user.nickname}`
                });
            }

            // Update user list for the room
            if (user.currentRoom) {
                this.updateUserListForRoom(user.currentRoom);
            }

            socket.emit('nickname-changed', {
                success: true,
                newNickname: user.nickname,
                message: `Your nickname is now ${user.nickname}`
            });

            console.log(`📝 [SERVER] Nickname changed: ${oldNickname} -> ${user.nickname}`);
        } catch (error) {
            console.error('Change nickname error:', error);
            socket.emit('nickname-error', { message: 'Failed to change nickname' });
        }
    }

    /**
     * Handle update profile
     */
    async handleUpdateProfile(socket, data) {
        try {
            const user = this.connectedUsers.get(socket.id);
            if (!user) return;

            const { nickname, status, avatar, homepage } = data;
            
            // Validate nickname
            if (nickname && nickname.trim().length > 0) {
                if (nickname.length > 20) {
                    socket.emit('profile-error', { message: 'Display name too long (max 20 characters)' });
                    return;
                }

                // Check if nickname is already taken by another user
                const existingUser = await User.findOne({ 
                    nickname: nickname.trim(),
                    _id: { $ne: user._id }
                });

                if (existingUser) {
                    socket.emit('profile-error', { message: 'Display name already taken' });
                    return;
                }

                user.nickname = nickname.trim();
            }

            // Update other profile fields
            if (status !== undefined) {
                user.status = status.trim();
            }
            if (avatar !== undefined) {
                user.avatar = avatar.trim();
            }
            if (homepage !== undefined) {
                user.homepage = homepage.trim();
            }

            await user.save();

            // Notify room of name change if nickname changed
            if (nickname && user.currentRoom) {
                socket.to(user.currentRoom).emit('name-changed', {
                    userId: user.userId,
                    oldName: user.username,
                    newName: user.nickname,
                    message: `${user.username} is now known as ${user.nickname}`
                });
            }

            // Update user list for the room
            if (user.currentRoom) {
                this.updateUserListForRoom(user.currentRoom);
            }

            socket.emit('profile-updated', {
                success: true,
                message: 'Profile updated successfully',
                profile: {
                    nickname: user.nickname,
                    status: user.status,
                    avatar: user.avatar,
                    homepage: user.homepage
                }
            });

            console.log(`📝 [SERVER] Profile updated for ${user.username}`);
        } catch (error) {
            console.error('Update profile error:', error);
            socket.emit('profile-error', { message: 'Failed to update profile' });
        }
    }

    /**
     * Get socket by user ID
     */
    getSocketByUserId(userId) {
        for (const [socketId, user] of this.connectedUsers.entries()) {
            if (user._id.toString() === userId) {
                return this.io.sockets.sockets.get(socketId);
            }
        }
        return null;
    }

    /**
     * Check if user is online
     */
    isUserOnline(userId) {
        for (const user of this.connectedUsers.values()) {
            if (user._id.toString() === userId) {
                return true;
            }
        }
        return false;
    }

    /**
     * Handle get self profile
     */
    async handleGetSelfProfile(socket, data) {
        try {
            const user = this.connectedUsers.get(socket.id);
            if (!user) return;

            const fullUser = await User.findById(user._id).populate('powers.powerId');
            if (fullUser) {
                socket.emit('self-profile', {
                    user: fullUser.getProfileData(),
                    powers: fullUser.getActivePowers(),
                    success: true
                });
            } else {
                socket.emit('error', { message: 'User not found' });
            }
        } catch (error) {
            console.error('Get self profile error:', error);
            socket.emit('error', { message: 'Failed to get profile' });
        }
    }

    /**
     * Handle moderation commands
     */
    async handleModerationCommand(socket, data) {
        try {
            const moderator = this.connectedUsers.get(socket.id);
            if (!moderator || moderator.rank < 2) {
                socket.emit('error', { message: 'Insufficient permissions' });
                return;
            }

            const { command, targetUserId, reason } = data;

            switch (command) {
                case 'kick':
                    await this.handleKickUser(socket, { userId: targetUserId, reason });
                    break;
                case 'ban':
                    await this.handleBanUser(socket, { userId: targetUserId, reason, duration: 24 });
                    break;
                case 'mute':
                    await this.handleMuteUser(socket, { userId: targetUserId, reason, duration: 60 });
                    break;
                default:
                    socket.emit('error', { message: 'Unknown moderation command' });
            }
        } catch (error) {
            console.error('Moderation command error:', error);
            socket.emit('error', { message: 'Moderation command failed' });
        }
    }

    /**
     * Handle kick all users
     */
    async handleKickAll(socket, data) {
        try {
            const moderator = this.connectedUsers.get(socket.id);
            if (!moderator || moderator.rank < 4) {
                socket.emit('error', { message: 'Insufficient permissions' });
                return;
            }

            const roomId = data.roomId || 'Main Chat';
            const reason = data.reason || 'Kick all by moderator';

            // Kick all users in the room
            this.io.to(roomId).emit('kicked', { reason });
            
            // Clear connected users for this room
            for (const [socketId, user] of this.connectedUsers.entries()) {
                if (user.currentRoom === roomId) {
                    this.connectedUsers.delete(socketId);
                }
            }

            socket.emit('kick-all-success', { message: 'All users kicked from room' });
        } catch (error) {
            console.error('Kick all error:', error);
            socket.emit('error', { message: 'Failed to kick all users' });
        }
    }

    /**
     * Handle hush chat
     */
    async handleHush(socket, data) {
        try {
            const moderator = this.connectedUsers.get(socket.id);
            if (!moderator || moderator.rank < 4) {
                socket.emit('error', { message: 'Insufficient permissions' });
                return;
            }

            const roomId = data.roomId || 'Main Chat';
            const hush = data.hush !== false; // Default to true

            this.io.to(roomId).emit('chat-hushed', { hush });
            socket.emit('hush-success', { hush, roomId });
        } catch (error) {
            console.error('Hush error:', error);
            socket.emit('error', { message: 'Failed to hush chat' });
        }
    }

    /**
     * Handle rank lock
     */
    async handleRankLock(socket, data) {
        try {
            const moderator = this.connectedUsers.get(socket.id);
            if (!moderator || moderator.rank < 4) {
                socket.emit('error', { message: 'Insufficient permissions' });
                return;
            }

            const roomId = data.roomId || 'Main Chat';
            const locked = data.locked !== false; // Default to true

            this.io.to(roomId).emit('rank-locked', { locked });
            socket.emit('ranklock-success', { locked, roomId });
        } catch (error) {
            console.error('Rank lock error:', error);
            socket.emit('error', { message: 'Failed to lock ranks' });
        }
    }

    /**
     * Handle game commands
     */
    async handleGameCommand(socket, data) {
        try {
            const user = this.connectedUsers.get(socket.id);
            if (!user) return;

            const { command, gameData } = data;

            switch (command) {
                case 'start':
                    socket.to(data.roomId).emit('game-started', { game: gameData, startedBy: user.nickname });
                    break;
                case 'join':
                    socket.to(data.roomId).emit('game-joined', { player: user.nickname, game: gameData });
                    break;
                case 'leave':
                    socket.to(data.roomId).emit('game-left', { player: user.nickname, game: gameData });
                    break;
                default:
                    socket.emit('error', { message: 'Unknown game command' });
            }
        } catch (error) {
            console.error('Game command error:', error);
            socket.emit('error', { message: 'Game command failed' });
        }
    }

    /**
     * Handle start game
     */
    async handleStartGame(socket, data) {
        try {
            const user = this.connectedUsers.get(socket.id);
            if (!user) return;

            const { gameType, roomId } = data;
            
            socket.to(roomId).emit('game-started', { 
                game: gameType, 
                startedBy: user.nickname,
                roomId: roomId
            });
            
            socket.emit('game-start-success', { game: gameType });
        } catch (error) {
            console.error('Start game error:', error);
            socket.emit('error', { message: 'Failed to start game' });
        }
    }

    /**
     * Handle assign power
     */
    async handleAssignPower(socket, data) {
        try {
            const user = this.connectedUsers.get(socket.id);
            if (!user || user.rank < 3) {
                socket.emit('error', { message: 'Insufficient permissions' });
                return;
            }

            const { targetUserId, powerId, duration } = data;
            const result = await PowerService.assignPower(user._id, targetUserId, powerId, duration);
            
            if (result.success) {
                socket.emit('power-assigned', result);
                socket.to(data.roomId).emit('power-assigned-to-user', {
                    targetUser: result.targetUser,
                    power: result.power,
                    assignedBy: user.nickname
                });
            } else {
                socket.emit('power-error', result);
            }
        } catch (error) {
            console.error('Assign power error:', error);
            socket.emit('error', { message: 'Failed to assign power' });
        }
    }

    /**
     * Handle remove power
     */
    async handleRemovePower(socket, data) {
        try {
            const user = this.connectedUsers.get(socket.id);
            if (!user || user.rank < 3) {
                socket.emit('error', { message: 'Insufficient permissions' });
                return;
            }

            const { targetUserId, powerId } = data;
            const result = await PowerService.removePower(user._id, targetUserId, powerId);
            
            if (result.success) {
                socket.emit('power-removed', result);
                socket.to(data.roomId).emit('power-removed-from-user', {
                    targetUser: result.targetUser,
                    power: result.power,
                    removedBy: user.nickname
                });
            } else {
                socket.emit('power-error', result);
            }
        } catch (error) {
            console.error('Remove power error:', error);
            socket.emit('error', { message: 'Failed to remove power' });
        }
    }

    /**
     * Handle get powers
     */
    async handleGetPowers(socket, data) {
        try {
            const user = this.connectedUsers.get(socket.id);
            if (!user) return;

            const powers = await PowerService.getUserPowers(user._id);
            socket.emit('user-powers', { powers });
        } catch (error) {
            console.error('Get powers error:', error);
            socket.emit('error', { message: 'Failed to get powers' });
        }
    }

    /**
     * Handle chat effects
     */
    async handleChatEffect(socket, data) {
        try {
            const user = this.connectedUsers.get(socket.id);
            if (!user) return;

            const { effect, message, roomId } = data;
            
            // Apply chat effect to message
            const processedMessage = this.applyChatEffect(message, effect);
            
            // Broadcast the effect to the room
            socket.to(roomId).emit('chat-effect', {
                user: user.nickname,
                effect: effect,
                message: processedMessage
            });
            
            socket.emit('chat-effect-applied', { effect, success: true });
        } catch (error) {
            console.error('Chat effect error:', error);
            socket.emit('error', { message: 'Failed to apply chat effect' });
        }
    }

    /**
     * Handle text formatting
     */
    async handleTextFormat(socket, data) {
        try {
            const user = this.connectedUsers.get(socket.id);
            if (!user) return;

            const { format, message, roomId } = data;
            
            // Apply text formatting
            const formattedMessage = this.applyTextFormat(message, format);
            
            // Broadcast the formatted message
            socket.to(roomId).emit('text-format', {
                user: user.nickname,
                format: format,
                message: formattedMessage
            });
            
            socket.emit('text-format-applied', { format, success: true });
        } catch (error) {
            console.error('Text format error:', error);
            socket.emit('error', { message: 'Failed to apply text format' });
        }
    }

    /**
     * Apply chat effect to message
     */
    applyChatEffect(message, effect) {
        switch (effect) {
            case 'rainbow':
                return this.applyRainbowEffect(message);
            case 'reverse':
                return message.split('').reverse().join('');
            case 'jumble':
                return this.jumbleText(message);
            case 'middle':
                return this.centerText(message);
            default:
                return message;
        }
    }

    /**
     * Apply text formatting
     */
    applyTextFormat(message, format) {
        switch (format) {
            case 'bold':
                return `**${message}**`;
            case 'italic':
                return `*${message}*`;
            case 'underline':
                return `__${message}__`;
            case 'strike':
                return `~~${message}~~`;
            default:
                return message;
        }
    }

    /**
     * Apply rainbow effect to text
     */
    applyRainbowEffect(text) {
        const colors = ['#ff0000', '#ff8000', '#ffff00', '#80ff00', '#00ff00', '#00ff80', '#00ffff', '#0080ff', '#0000ff', '#8000ff', '#ff00ff', '#ff0080'];
        let result = '';
        for (let i = 0; i < text.length; i++) {
            const color = colors[i % colors.length];
            result += `<span style="color: ${color}">${text[i]}</span>`;
        }
        return result;
    }

    /**
     * Jumble text
     */
    jumbleText(text) {
        return text.split('').sort(() => Math.random() - 0.5).join('');
    }

    /**
     * Center text
     */
    centerText(text) {
        return `<div style="text-align: center;">${text}</div>`;
    }

    /**
     * Handle pawn color change
     */
    async handleChangePawn(socket, data) {
        try {
            const user = this.connectedUsers.get(socket.id);
            if (!user) return;

            const { color } = data;
            
            // Update user's pawn color
            user.custpawn = color;
            
            // Notify room of pawn change
            socket.to(user.currentRoom).emit('pawn-changed', {
                user: user.nickname,
                color: color
            });
            
            socket.emit('pawn-changed', { color: color });
            console.log('🎭 [SERVER] Pawn changed:', user.nickname, color);
        } catch (error) {
            console.error('Change pawn error:', error);
            socket.emit('error', { message: 'Failed to change pawn' });
        }
    }

    /**
     * Handle pawn upload
     */
    async handleUploadPawn(socket, data) {
        try {
            const user = this.connectedUsers.get(socket.id);
            if (!user) return;

            const { imageData } = data;
            
            // In a real implementation, you'd save the image to a file or database
            // For now, we'll just acknowledge the upload
            user.custpawn = 'custom';
            
            // Notify room of custom pawn
            socket.to(user.currentRoom).emit('pawn-uploaded', {
                user: user.nickname,
                type: 'custom'
            });
            
            socket.emit('pawn-uploaded', { success: true });
            console.log('🎭 [SERVER] Pawn uploaded:', user.nickname);
        } catch (error) {
            console.error('Upload pawn error:', error);
            socket.emit('error', { message: 'Failed to upload pawn' });
        }
    }

    /**
     * Handle game start
     */
    async handleStartGame(socket, data) {
        try {
            const user = this.connectedUsers.get(socket.id);
            if (!user) return;

            const { gameType, room } = data;
            
            // Create game instance
            const gameId = `game_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            const game = {
                id: gameId,
                type: gameType,
                room: room,
                players: [user],
                status: 'waiting',
                createdAt: new Date()
            };
            
            // Store game
            if (!this.activeGames) this.activeGames = new Map();
            this.activeGames.set(gameId, game);
            
            // Notify room about new game
            socket.to(room).emit('game-started', {
                gameId: gameId,
                gameType: gameType,
                starter: user.nickname,
                players: game.players.length
            });
            
            socket.emit('game-joined', {
                gameId: gameId,
                gameType: gameType,
                players: game.players
            });
            
            console.log('🎮 [SERVER] Game started:', gameType, 'by', user.nickname);
        } catch (error) {
            console.error('Start game error:', error);
            socket.emit('error', { message: 'Failed to start game' });
        }
    }

    /**
     * Handle game leave
     */
    async handleLeaveGame(socket, data) {
        try {
            const user = this.connectedUsers.get(socket.id);
            if (!user) return;

            // Find and remove user from games
            if (this.activeGames) {
                for (let [gameId, game] of this.activeGames) {
                    const playerIndex = game.players.findIndex(p => p.id === user.id);
                    if (playerIndex !== -1) {
                        game.players.splice(playerIndex, 1);
                        
                        // Notify other players
                        socket.to(game.room).emit('player-left-game', {
                            gameId: gameId,
                            player: user.nickname
                        });
                        
                        // Remove game if no players left
                        if (game.players.length === 0) {
                            this.activeGames.delete(gameId);
                        }
                        break;
                    }
                }
            }
            
            socket.emit('game-left', { success: true });
            console.log('🎮 [SERVER] User left game:', user.nickname);
        } catch (error) {
            console.error('Leave game error:', error);
            socket.emit('error', { message: 'Failed to leave game' });
        }
    }

    /**
     * Handle invite players
     */
    async handleInvitePlayers(socket, data) {
        try {
            const user = this.connectedUsers.get(socket.id);
            if (!user) return;

            const { gameType } = data;
            
            // Send invitation to all users in room
            socket.to(user.currentRoom).emit('game-invitation', {
                gameType: gameType,
                inviter: user.nickname,
                message: `${user.nickname} invited you to play ${gameType}!`
            });
            
            console.log('🎮 [SERVER] Game invitation sent:', gameType, 'by', user.nickname);
        } catch (error) {
            console.error('Invite players error:', error);
            socket.emit('error', { message: 'Failed to invite players' });
        }
    }

    /**
     * Handle game action
     */
    async handleGameAction(socket, data) {
        try {
            const user = this.connectedUsers.get(socket.id);
            if (!user) return;

            const { gameId, action, data: actionData } = data;
            
            // Find game
            if (this.activeGames && this.activeGames.has(gameId)) {
                const game = this.activeGames.get(gameId);
                
                // Broadcast action to all players in the game
                game.players.forEach(player => {
                    const playerSocket = this.getSocketByUserId(player.id);
                    if (playerSocket) {
                        playerSocket.emit('game-action', {
                            gameId: gameId,
                            action: action,
                            data: actionData,
                            player: user.nickname
                        });
                    }
                });
                
                console.log('🎮 [SERVER] Game action:', action, 'in', gameId, 'by', user.nickname);
            }
        } catch (error) {
            console.error('Game action error:', error);
            socket.emit('error', { message: 'Failed to process game action' });
        }
    }

    // Helper methods
    getAvailableActions(user, targetUser) {
        const actions = [];
        
        if (user._id.toString() !== targetUser._id.toString()) {
            actions.push('private-chat');
            actions.push('add-friend');
        }
        
        if (user.canModerateUser(targetUser)) {
            actions.push('kick');
            actions.push('mute');
            actions.push('ban');
            if (user.rank >= 4) {
                actions.push('promote');
                actions.push('demote');
                actions.push('ranklock');
            }
        }
        
        return actions;
    }
    
    // Store API methods
    async getPowers(req, res) {
        try {
            const { category, search } = req.query;
            let powers = StoreService.getPowers();
            
            if (category) {
                powers = StoreService.getPowersByCategory(category);
            }
            
            if (search) {
                powers = StoreService.searchPowers(search);
            }
            
            res.json({ success: true, powers });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
    
    async getPowerById(req, res) {
        try {
            const { id } = req.params;
            const power = StoreService.getPowerById(id);
            
            if (!power) {
                return res.status(404).json({ success: false, error: 'Power not found' });
            }
            
            res.json({ success: true, power });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
    
    async getAuctions(req, res) {
        try {
            const auctions = StoreService.getAuctions();
            res.json({ success: true, auctions });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
    
    async getPromotions(req, res) {
        try {
            const promotions = StoreService.getPromotions();
            res.json({ success: true, promotions });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
    
    async purchaseItem(req, res) {
        try {
            const { userId, itemId, itemType } = req.body;
            
            if (!userId || !itemId || !itemType) {
                return res.status(400).json({ success: false, error: 'Missing required fields' });
            }
            
            const result = StoreService.purchaseItem(userId, itemId, itemType);
            res.json(result);
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
    
    async placeBid(req, res) {
        try {
            const { auctionId, userId, amount } = req.body;
            
            if (!auctionId || !userId || !amount) {
                return res.status(400).json({ success: false, error: 'Missing required fields' });
            }
            
            const result = StoreService.placeBid(auctionId, userId, amount);
            res.json(result);
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
    
    async getUserBalance(req, res) {
        try {
            const { userId } = req.params;
            const balance = await StoreService.getUserBalance(userId);
            res.json({ success: true, balance });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    // Additional methods for frontend integration
    async getOnlineUsers(req, res) {
        try {
            const onlineUsers = Array.from(this.connectedUsers.values());
            res.json({ success: true, users: onlineUsers });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async getUserFriends(req, res) {
        try {
            const userId = req.user.id;
            const friends = [
                { id: '1', username: 'Friend1', status: 'online' },
                { id: '2', username: 'Friend2', status: 'offline' }
            ];
            res.json({ success: true, friends });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async kickUser(req, res) {
        try {
            const { username } = req.body;
            res.json({ success: true, message: `${username} has been kicked` });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async getUserProfile(req, res) {
        try {
            const userId = req.user.id;
            const profile = {
                id: userId,
                username: req.user.username,
                email: req.user.email,
                xats: 1000,
                powers: []
            };
            res.json({ success: true, profile });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async updateUserProfile(req, res) {
        try {
            const userId = req.user.id;
            const updates = req.body;
            res.json({ success: true, message: 'Profile updated successfully' });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async getUserPowers(req, res) {
        try {
            const userId = req.user.id;
            const powers = [
                { id: '1', name: 'Rainbow Text', cost: 100, owned: true },
                { id: '2', name: 'Bold Text', cost: 50, owned: true }
            ];
            res.json({ success: true, powers });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async activatePower(req, res) {
        try {
            const { powerId, target } = req.body;
            res.json({ success: true, message: 'Power activated successfully' });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async getUserChats(req, res) {
        try {
            const userId = req.user.id;
            const chats = [
                { id: '1', name: 'General Chat', users: 25 },
                { id: '2', name: 'Gaming', users: 15 }
            ];
            res.json({ success: true, chats });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async createChat(req, res) {
        try {
            const { name, description } = req.body;
            res.json({ success: true, chatId: 'new_chat_id', message: 'Chat created successfully' });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async getPublicChats(req, res) {
        try {
            const chats = [
                { id: '1', name: 'Public Chat 1', users: 50, description: 'General discussion' },
                { id: '2', name: 'Public Chat 2', users: 30, description: 'Gaming community' }
            ];
            res.json({ success: true, chats });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async getChatStats(req, res) {
        try {
            const stats = {
                totalChats: 25,
                totalUsers: 150,
                activeUsers: 75
            };
            res.json({ success: true, stats });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async joinChat(req, res) {
        try {
            const { chatId } = req.body;
            res.json({ success: true, message: 'Joined chat successfully' });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async warnUser(req, res) {
        try {
            const { userId, reason } = req.body;
            res.json({ success: true, message: 'User warned successfully' });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async muteUser(req, res) {
        try {
            const { userId, duration } = req.body;
            res.json({ success: true, message: 'User muted successfully' });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async banUser(req, res) {
        try {
            const { userId, reason } = req.body;
            res.json({ success: true, message: 'User banned successfully' });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async editRoom(req, res) {
        try {
            const { roomId, updates } = req.body;
            res.json({ success: true, message: 'Room updated successfully' });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async updateRoom(req, res) {
        try {
            const { roomId, updates } = req.body;
            res.json({ success: true, message: 'Room updated successfully' });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async getTradeItems(req, res) {
        try {
            const items = [
                { id: '1', name: 'Power Trade', price: 100, seller: 'User1' },
                { id: '2', name: 'Item Trade', price: 50, seller: 'User2' }
            ];
            res.json({ success: true, items });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async getTradeList(req, res) {
        try {
            const trades = [
                { id: '1', item: 'Power 1', price: 100, status: 'active' },
                { id: '2', item: 'Power 2', price: 150, status: 'sold' }
            ];
            res.json({ success: true, trades });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async listTradeItem(req, res) {
        try {
            const { itemId, price } = req.body;
            res.json({ success: true, message: 'Item listed successfully' });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async buyTradeItem(req, res) {
        try {
            const { itemId } = req.body;
            res.json({ success: true, message: 'Item purchased successfully' });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async removeTradeItem(req, res) {
        try {
            const { itemId } = req.body;
            res.json({ success: true, message: 'Item removed successfully' });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async getStats(req, res) {
        try {
            const stats = {
                totalUsers: this.connectedUsers.size,
                totalRooms: 5,
                totalMessages: 1000
            };
            res.json({ success: true, stats });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    // ============================================================================
    // AUTHENTICATION ENDPOINTS
    // ============================================================================

    async login(req, res) {
        try {
            const { username, password, rememberMe } = req.body;
            
            // Find user by username or email
            const user = await User.findOne({
                $or: [
                    { username: username },
                    { email: username }
                ]
            });
            
            if (!user) {
                return res.status(401).json({ success: false, message: 'Invalid credentials' });
            }
            
            // Check password
            const isValidPassword = await AuthService.verifyPassword(password, user.password);
            if (!isValidPassword) {
                return res.status(401).json({ success: false, message: 'Invalid credentials' });
            }
            
            // Generate JWT token
            const token = AuthService.generateToken(user._id, rememberMe);
            
            res.json({
                success: true,
                token,
                user: {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    xats: user.xats || 0,
                    days: user.days || 0,
                    rank: user.rank || 'user'
                }
            });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async register(req, res) {
        try {
            const { username, email, password, birthday, agreeTerms } = req.body;
            
            // Validate required fields
            if (!username || !email || !password || !birthday || !agreeTerms) {
                return res.status(400).json({ success: false, message: 'All fields are required' });
            }
            
            // Check if user already exists
            const existingUser = await User.findOne({
                $or: [{ username }, { email }]
            });
            
            if (existingUser) {
                const errors = {};
                if (existingUser.username === username) {
                    errors.username = 'Username already taken';
                }
                if (existingUser.email === email) {
                    errors.email = 'Email already registered';
                }
                return res.status(400).json({ success: false, errors });
            }
            
            // Validate age
            const age = this.calculateAge(birthday);
            if (age < 13) {
                return res.status(400).json({ success: false, message: 'You must be at least 13 years old' });
            }
            
            // Create new user
            const hashedPassword = await AuthService.hashPassword(password);
            const user = new User({
                username,
                email,
                password: hashedPassword,
                birthday: new Date(birthday),
                xats: 1000, // Starting xats
                days: 7, // Starting days
                rank: 'user',
                createdAt: new Date()
            });
            
            await user.save();
            
            // Generate JWT token
            const token = AuthService.generateToken(user._id);
            
            res.json({
                success: true,
                token,
                user: {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    xats: user.xats,
                    days: user.days,
                    rank: user.rank
                }
            });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async forgotPassword(req, res) {
        try {
            const { email } = req.body;
            
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ success: false, message: 'Email not found' });
            }
            
            // Generate reset token (in a real app, you'd send this via email)
            const resetToken = AuthService.generateResetToken();
            user.resetToken = resetToken;
            user.resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour
            await user.save();
            
            // In a real app, send email with reset link
            console.log(`Password reset token for ${email}: ${resetToken}`);
            
            res.json({ success: true, message: 'Password reset email sent' });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async resetPassword(req, res) {
        try {
            const { token, newPassword } = req.body;
            
            const user = await User.findOne({
                resetToken: token,
                resetTokenExpiry: { $gt: new Date() }
            });
            
            if (!user) {
                return res.status(400).json({ success: false, message: 'Invalid or expired reset token' });
            }
            
            user.password = await AuthService.hashPassword(newPassword);
            user.resetToken = undefined;
            user.resetTokenExpiry = undefined;
            await user.save();
            
            res.json({ success: true, message: 'Password reset successfully' });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async socialLogin(req, res) {
        try {
            const { provider } = req.params;
            
            // In a real app, you'd integrate with OAuth providers
            const authUrl = `https://${provider}.com/oauth/authorize?client_id=your_client_id&redirect_uri=your_redirect_uri&scope=profile&response_type=code`;
            
            res.json({ success: true, authUrl });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async logout(req, res) {
        try {
            // In a real app, you'd invalidate the token
            res.json({ success: true, message: 'Logged out successfully' });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    // ============================================================================
    // STORE ENDPOINTS
    // ============================================================================

    async getStorePackages(req, res) {
        try {
            const packages = [
                {
                    _id: '1',
                    name: 'Starter Pack',
                    description: 'Perfect for new users',
                    price: 4.99,
                    xats: 5000,
                    days: 30,
                    icon: '🌟',
                    badge: 'Popular'
                },
                {
                    _id: '2',
                    name: 'Power Pack',
                    description: 'Great value for power users',
                    price: 9.99,
                    xats: 12000,
                    days: 60,
                    icon: '⚡',
                    badge: 'Best Value'
                },
                {
                    _id: '3',
                    name: 'Premium Pack',
                    description: 'Maximum value package',
                    price: 19.99,
                    xats: 25000,
                    days: 120,
                    icon: '💎',
                    badge: 'Limited'
                }
            ];
            
            res.json({ success: true, packages });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async getStoreSubscriptions(req, res) {
        try {
            const subscriptions = [
                {
                    _id: '1',
                    name: 'Daily Xats',
                    description: 'Receive xats every day',
                    price: 2.99,
                    period: 'month',
                    xatsPerDay: 100,
                    daysPerDay: 1,
                    icon: '📅'
                },
                {
                    _id: '2',
                    name: 'Premium Daily',
                    description: 'Premium daily rewards',
                    price: 4.99,
                    period: 'month',
                    xatsPerDay: 250,
                    daysPerDay: 2,
                    icon: '👑'
                }
            ];
            
            res.json({ success: true, subscriptions });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async purchasePackage(req, res) {
        try {
            const { packageId, paymentMethod } = req.body;
            const userId = req.user._id;
            
            // In a real app, you'd process payment here
            // For now, just add xats and days to user account
            
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }
            
            // Add xats and days (in a real app, get these from the package)
            user.xats += 5000;
            user.days += 30;
            await user.save();
            
            res.json({ success: true, message: 'Package purchased successfully' });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async purchaseCustom(req, res) {
        try {
            const { xats, days, paymentMethod } = req.body;
            const userId = req.user._id;
            
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }
            
            user.xats += xats;
            user.days += days;
            await user.save();
            
            res.json({ success: true, message: 'Custom purchase successful' });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async subscribe(req, res) {
        try {
            const { subscriptionId, paymentMethod } = req.body;
            const userId = req.user._id;
            
            // In a real app, you'd set up a subscription
            res.json({ success: true, message: 'Subscription activated' });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    // ============================================================================
    // AUCTION ENDPOINTS
    // ============================================================================

    async getAuctions(req, res) {
        try {
            const auctions = [
                {
                    _id: '1',
                    item: {
                        name: 'Rare Power',
                        description: 'A very rare power',
                        type: 'power',
                        icon: '⚡'
                    },
                    currentBid: 5000,
                    bidCount: 12,
                    endTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
                    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
                },
                {
                    _id: '2',
                    item: {
                        name: 'Short Name',
                        description: 'A cool short name',
                        type: 'shortname',
                        icon: '🏷️'
                    },
                    currentBid: 15000,
                    bidCount: 8,
                    endTime: new Date(Date.now() + 12 * 60 * 60 * 1000), // 12 hours
                    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000) // 1 hour ago
                }
            ];
            
            res.json({ success: true, auctions });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async getAuction(req, res) {
        try {
            const { id } = req.params;
            // In a real app, fetch auction from database
            res.json({ success: true, auction: {} });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async placeBid(req, res) {
        try {
            const { auctionId, bidAmount } = req.body;
            const userId = req.user._id;
            
            // In a real app, validate bid and update auction
            res.json({ success: true, message: 'Bid placed successfully' });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async createAuction(req, res) {
        try {
            const { item, startingBid, duration } = req.body;
            const userId = req.user._id;
            
            // In a real app, create auction in database
            res.json({ success: true, message: 'Auction created successfully' });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    // ============================================================================
    // POWERS ENDPOINTS
    // ============================================================================

    async getPowers(req, res) {
        try {
            const powers = await Power.find({ isActive: true })
                .select('name description price category icon purchases')
                .limit(100)
                .sort({ createdAt: -1 });
            
            res.json({ success: true, powers });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async getPower(req, res) {
        try {
            const { id } = req.params;
            const power = await Power.findById(id);
            
            if (!power) {
                return res.status(404).json({ success: false, message: 'Power not found' });
            }
            
            res.json({ success: true, power });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async purchasePower(req, res) {
        try {
            const { powerId } = req.body;
            const userId = req.user._id;
            
            const power = await Power.findById(powerId);
            if (!power) {
                return res.status(404).json({ success: false, message: 'Power not found' });
            }
            
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }
            
            if (user.xats < power.price) {
                return res.status(400).json({ success: false, message: 'Insufficient xats' });
            }
            
            // Deduct xats and add power to user
            user.xats -= power.price;
            if (!user.powers) user.powers = [];
            user.powers.push(powerId);
            await user.save();
            
            // Update power purchase count
            power.purchases = (power.purchases || 0) + 1;
            await power.save();
            
            res.json({ success: true, message: 'Power purchased successfully' });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async getUserPowers(req, res) {
        try {
            const userId = req.user._id;
            const user = await User.findById(userId).populate('powers');
            
            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }
            
            res.json({ success: true, powers: user.powers || [] });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    // ============================================================================
    // MISSING API METHOD IMPLEMENTATIONS
    // ============================================================================

    async getOnlineUsers(req, res) {
        try {
            const onlineUsers = Array.from(this.connectedUsers.values());
            res.json({ success: true, users: onlineUsers });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async getUserFriends(req, res) {
        try {
            const userId = req.user._id;
            const user = await User.findById(userId).populate('friends');
            res.json({ success: true, friends: user.friends || [] });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async kickUser(req, res) {
        try {
            const { username } = req.body;
            // Find user socket and disconnect
            for (let [socketId, user] of this.connectedUsers) {
                if (user.username === username) {
                    this.io.to(socketId).emit('kicked', { reason: 'Kicked by moderator' });
                    this.io.sockets.sockets.get(socketId)?.disconnect();
                    this.connectedUsers.delete(socketId);
                    break;
                }
            }
            res.json({ success: true, message: 'User kicked successfully' });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async getUserProfile(req, res) {
        try {
            const userId = req.user._id;
            const user = await User.findById(userId);
            res.json({ success: true, user });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async updateUserProfile(req, res) {
        try {
            const userId = req.user._id;
            const updates = req.body;
            const user = await User.findByIdAndUpdate(userId, updates, { new: true });
            res.json({ success: true, user });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async activatePower(req, res) {
        try {
            const { powerId } = req.body;
            const userId = req.user._id;
            
            const user = await User.findById(userId);
            if (!user.powers.includes(powerId)) {
                return res.status(400).json({ success: false, message: 'Power not owned' });
            }
            
            // Activate power logic here
            res.json({ success: true, message: 'Power activated' });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async getUserChats(req, res) {
        try {
            const userId = req.user._id;
            const chats = await Room.find({ members: userId });
            res.json({ success: true, chats });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async createChat(req, res) {
        try {
            const { name, description, isPublic } = req.body;
            const userId = req.user._id;
            
            const room = new Room({
                name,
                description,
                isPublic: isPublic || false,
                owner: userId,
                members: [userId]
            });
            
            await room.save();
            res.json({ success: true, room });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async getPublicChats(req, res) {
        try {
            const chats = await Room.find({ isPublic: true });
            res.json({ success: true, chats });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async getChatStats(req, res) {
        try {
            const stats = {
                totalUsers: this.connectedUsers.size,
                totalRooms: await Room.countDocuments(),
                onlineUsers: Array.from(this.connectedUsers.values()).length
            };
            res.json({ success: true, stats });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async joinChat(req, res) {
        try {
            const { roomId } = req.body;
            const userId = req.user._id;
            
            const room = await Room.findById(roomId);
            if (!room) {
                return res.status(404).json({ success: false, message: 'Room not found' });
            }
            
            if (!room.members.includes(userId)) {
                room.members.push(userId);
                await room.save();
            }
            
            res.json({ success: true, message: 'Joined chat successfully' });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async warnUser(req, res) {
        try {
            const { username, reason } = req.body;
            // Implement warning logic
            res.json({ success: true, message: 'User warned successfully' });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async muteUser(req, res) {
        try {
            const { username, duration } = req.body;
            // Implement mute logic
            res.json({ success: true, message: 'User muted successfully' });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async banUser(req, res) {
        try {
            const { username, reason } = req.body;
            // Implement ban logic
            res.json({ success: true, message: 'User banned successfully' });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async editRoom(req, res) {
        try {
            const { roomId, updates } = req.body;
            const room = await Room.findByIdAndUpdate(roomId, updates, { new: true });
            res.json({ success: true, room });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async updateRoom(req, res) {
        try {
            const { roomId, updates } = req.body;
            const room = await Room.findByIdAndUpdate(roomId, updates, { new: true });
            res.json({ success: true, room });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async getTradeItems(req, res) {
        try {
            const tradeItems = await Power.find({ tradeable: true });
            res.json({ success: true, items: tradeItems });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async getTradeList(req, res) {
        try {
            const trades = await Power.find({ tradeable: true, listed: true });
            res.json({ success: true, trades });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async listTradeItem(req, res) {
        try {
            const { powerId, price } = req.body;
            const power = await Power.findByIdAndUpdate(powerId, { 
                tradeable: true, 
                listed: true, 
                tradePrice: price 
            });
            res.json({ success: true, power });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async buyTradeItem(req, res) {
        try {
            const { powerId } = req.body;
            const userId = req.user._id;
            
            const power = await Power.findById(powerId);
            const user = await User.findById(userId);
            
            if (user.xats < power.tradePrice) {
                return res.status(400).json({ success: false, message: 'Insufficient xats' });
            }
            
            user.xats -= power.tradePrice;
            user.powers.push(powerId);
            power.listed = false;
            
            await user.save();
            await power.save();
            
            res.json({ success: true, message: 'Item purchased successfully' });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async removeTradeItem(req, res) {
        try {
            const { powerId } = req.body;
            const power = await Power.findByIdAndUpdate(powerId, { 
                tradeable: false, 
                listed: false 
            });
            res.json({ success: true, power });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async getStats(req, res) {
        try {
            const stats = {
                totalUsers: await User.countDocuments(),
                onlineUsers: this.connectedUsers.size,
                totalRooms: await Room.countDocuments(),
                totalMessages: await Message.countDocuments()
            };
            res.json({ success: true, stats });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async forgotPassword(req, res) {
        try {
            const { email } = req.body;
            // Implement password reset logic
            res.json({ success: true, message: 'Password reset email sent' });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async resetPassword(req, res) {
        try {
            const { token, newPassword } = req.body;
            // Implement password reset logic
            res.json({ success: true, message: 'Password reset successfully' });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async socialLogin(req, res) {
        try {
            const { provider } = req.params;
            // Implement social login logic
            res.json({ success: true, message: 'Social login not implemented yet' });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async getStorePackages(req, res) {
        try {
            const packages = [
                { id: 1, name: 'Starter Pack', price: 100, xats: 1000, days: 0 },
                { id: 2, name: 'Premium Pack', price: 500, xats: 5000, days: 30 },
                { id: 3, name: 'Ultimate Pack', price: 1000, xats: 10000, days: 90 }
            ];
            res.json({ success: true, packages });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async getStoreSubscriptions(req, res) {
        try {
            const subscriptions = [
                { id: 1, name: 'Monthly VIP', price: 10, days: 30, features: ['VIP Badge', 'Custom Colors'] },
                { id: 2, name: 'Yearly VIP', price: 100, days: 365, features: ['VIP Badge', 'Custom Colors', 'Priority Support'] }
            ];
            res.json({ success: true, subscriptions });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async purchaseCustom(req, res) {
        try {
            const { xats, days } = req.body;
            const userId = req.user._id;
            
            const user = await User.findById(userId);
            user.xats += xats || 0;
            user.days += days || 0;
            await user.save();
            
            res.json({ success: true, message: 'Purchase successful' });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async subscribe(req, res) {
        try {
            const { subscriptionId } = req.body;
            const userId = req.user._id;
            
            // Implement subscription logic
            res.json({ success: true, message: 'Subscription activated' });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async getAuction(req, res) {
        try {
            const { id } = req.params;
            const auction = await Power.findById(id);
            res.json({ success: true, auction });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async createAuction(req, res) {
        try {
            const { powerId, startingPrice, duration } = req.body;
            const userId = req.user._id;
            
            // Implement auction creation logic
            res.json({ success: true, message: 'Auction created successfully' });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    // ============================================================================
    // UTILITY METHODS
    // ============================================================================

    calculateAge(birthday) {
        const today = new Date();
        const birthDate = new Date(birthday);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        return age;
    }
}

module.exports = XatServer;

// Start server if called directly
if (require.main === module) {
    const server = new XatServer();
    server.start();
}