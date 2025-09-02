const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const fs = require('fs');
require('dotenv').config();

// Import models
const User = require('./models/User');
const Room = require('./models/Room');
const Message = require('./models/Message');
const Power = require('./models/Power');
const UserPower = require('./models/UserPower');

class IxatServer {
  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.io = socketIo(this.server, {
      cors: {
                origin: "*",
                methods: ["GET", "POST"]
            }
        });
        
        // Core server state (matching Ixat Files)
        this.users = new Map(); // socket.id -> user object
        this.ipbans = [];
        this.protected = new Map(); // chat protection
        this.rfilter = new Map(); // rate limiting
        this.hasGroupPowers = ["Lobby", "Help"];
        
        // Server configuration
    this.config = {
            spam_wait: 800,
            max_per_ip: 5,
            max_total: 1000,
            staff: [], // admin user IDs
            pawns: [], // special pawns
            pcount: 0
        };
        
        this.startTime = Date.now();
        this.hash = this.generateHash(25);
        this.dbConnected = false;
        
    this.setupMiddleware();
    this.setupRoutes();
    this.setupSocketHandlers();
        this.loadConfiguration();
    }
    
    generateHash(length) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }
    
    async loadConfiguration() {
        try {
            // Load powers count
            this.config.pcount = await Power.countDocuments();
            
            // Load staff members (admins)
            const staffUsers = await User.find({ rank: 2 }); // Admin rank
            this.config.staff = staffUsers.map(u => u._id.toString());
            
            console.log('🎭 [SERVER] Configuration loaded:', {
                pcount: this.config.pcount,
                staff: this.config.staff.length
            });
    } catch (error) {
            console.error('🎭 [SERVER] Failed to load configuration:', error);
    }
  }
  
  setupMiddleware() {
    this.app.use(express.json());
        
        // Serve client files directly
        this.app.use(express.static(path.join(__dirname, '../client')));
        
        // Serve Ixat Files assets
        this.app.use('/web_gear', express.static(path.join(__dirname, '../../Ixat Files/web_gear')));
    this.app.use('/avatars', express.static('avatars'));
        
        // Serve sounds
    this.app.use('/sounds', express.static('sounds'));
        
        // Serve CSS files
    this.app.use('/css', express.static('css'));
        
        // Serve JS files
    this.app.use('/js', express.static('js'));
    this.app.use('/svg', express.static('svg'));
    
    // Serve test files
    this.app.get('/test-new-interface', (req, res) => {
        res.sendFile(path.join(__dirname, '../../test-new-interface.html'));
    });
    
    // Serve root test files
    this.app.get('/test-new-interface.html', (req, res) => {
        res.sendFile(path.join(__dirname, '../../test-new-interface.html'));
    });
    
    // Serve standalone authentic Flash chat
    this.app.get('/authentic-flash-chat', (req, res) => {
        res.sendFile(path.join(__dirname, '../../authentic-flash-chat.html'));
    });
    
    this.app.get('/authentic-flash-chat.html', (req, res) => {
        res.sendFile(path.join(__dirname, '../../authentic-flash-chat.html'));
    });
    
    // CORS
    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      next();
    });
  }
  
  setupRoutes() {
        // Redirect root to chat.html (main interface)
        this.app.get('/', (req, res) => {
            res.redirect('/chat.html');
        });
        
        // Health check
        this.app.get('/health', (req, res) => {
            res.json({
                ok: true,
                dbConnected: this.dbConnected,
                uptime: Math.round(process.uptime()),
                pcount: this.config.pcount
            });
        });
        
        // Debug endpoint to check current users
        this.app.get('/api/debug/users', (req, res) => {
            const users = Array.from(this.users.values()).map(u => ({
                id: u.id,
                nickname: u.nickname,
                guest: u.guest,
                chat: u.chat,
                online: u.online,
                guestLevel: u.guestLevel,
                persistent: !!u.dbId
            }));
            res.json({ 
                totalUsers: this.users.size,
                users: users 
            });
        });
    
        // API Routes
        this.app.get('/api/stats', this.handleGetStats.bind(this));
        this.app.get('/api/rooms', this.handleGetRooms.bind(this));
        this.app.get('/api/powers', this.handleGetPowers.bind(this));
        this.app.get('/api/users', this.handleGetUsers.bind(this));
        this.app.get('/api/user/:id', this.handleGetUser.bind(this));
        this.app.post('/api/user/pawn', this.handleUpdatePawn.bind(this));
        this.app.post('/api/user/bio', this.handleUpdateBio.bind(this));
        
        // Auth routes
    this.app.post('/api/auth/login', this.handleLogin.bind(this));
    this.app.post('/api/auth/register', this.handleRegister.bind(this));
    this.app.post('/api/auth/logout', this.handleLogout.bind(this));
        this.app.get('/api/auth/status', this.handleAuthStatus.bind(this));
        this.app.get('/api/auth/verify-email', this.handleVerifyEmail.bind(this));
        
        // Test endpoint to create a test user
        this.app.post('/api/test/create-user', async (req, res) => {
            try {
                const testUser = new User({
                    username: 'testuser',
                    password: await bcrypt.hash('password123', 10),
                    nickname: 'TestUser',
                    email: 'test@example.com',
                    avatar: '1',
                    xats: 1000,
                    days: 0,
                    rank: 1,
                    enabled: true
                });
                
                await testUser.save();
                res.json({ message: 'Test user created successfully', user: testUser });
            } catch (error) {
                console.error('🎭 [SERVER] Test user creation error:', error);
                res.status(500).json({ error: 'Failed to create test user' });
            }
        });
        
        // Test endpoint to fix user accounts
        this.app.post('/api/test/fix-user', async (req, res) => {
            try {
                const { username, email } = req.body;
                
                // Find user by username or email
                const user = await User.findOne({ 
                    $or: [{ username }, { email }] 
                });
                
                if (!user) {
                    return res.status(404).json({ error: 'User not found' });
                }
                
                // Fix the user account
                user.enabled = true;
                user.emailVerified = true;
                await user.save();
                
                res.json({ 
                    message: 'User account fixed successfully', 
                    user: {
                        id: user._id,
                        username: user.username,
                        nickname: user.nickname,
                        email: user.email,
                        enabled: user.enabled,
                        emailVerified: user.emailVerified
                    }
                });
            } catch (error) {
                console.error('🎭 [SERVER] Fix user error:', error);
                res.status(500).json({ error: 'Failed to fix user account' });
            }
        });
        
        // Serve pages
        this.app.get('/auth.html', (req, res) => {
            res.sendFile(path.join(__dirname, '../client/auth.html'));
    });
    
            this.app.get('/chat.html', (req, res) => {
            res.sendFile(path.join(__dirname, '../client/chat.html'));
        });
        
        this.app.get('/powers', (req, res) => {
            res.sendFile(path.join(__dirname, '../client/powers.html'));
        });
        
        this.app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, '../client/index.html'));
        });

        // Chat Group Pages
        this.app.get('/lobby.html', (req, res) => {
            res.sendFile(path.join(__dirname, '../client/lobby.html'));
        });
        
        this.app.get('/help.html', (req, res) => {
            res.sendFile(path.join(__dirname, '../client/help.html'));
        });
        
        this.app.get('/test.html', (req, res) => {
            res.sendFile(path.join(__dirname, '../client/test.html'));
        });
        
        this.app.get('/chat-group.html', (req, res) => {
            res.sendFile(path.join(__dirname, '../client/chat-group.html'));
        });
        
        // Serve chat edit page
        this.app.get('/chat-edit.html', (req, res) => {
            res.sendFile(path.join(__dirname, '../client/chat-edit.html'));
        });
        
        // Serve chat interface (for iframe embedding)
        this.app.get('/chat-interface.html', (req, res) => {
            res.sendFile(path.join(__dirname, '../client/chat-interface.html'));
        });

        // Friends API
        this.app.get('/api/friends', this.handleGetFriends.bind(this));
        this.app.post('/api/friends/add', this.handleAddFriend.bind(this));
        this.app.delete('/api/friends/remove/:friendId', this.handleRemoveFriend.bind(this));
        
        // Visitors API
        this.app.get('/api/visitors', this.handleGetVisitors.bind(this));
        
        // Chat creation API
        this.app.post('/api/chats/create', this.handleCreateChat.bind(this));
        this.app.get('/api/chats/recent', this.handleGetRecentChats.bind(this));
        
        // Radio API
        this.app.post('/api/radio/play', this.handlePlayRadio.bind(this));
        this.app.post('/api/radio/stop', this.handleStopRadio.bind(this));
        
        // Power Purchase API
        this.app.post('/api/powers/buy', this.handleBuyPower.bind(this));
        this.app.get('/api/powers/user', this.handleGetUserPowers.bind(this));
        
        // Moderation API routes
        this.app.post('/api/moderation/warn', this.handleModerationWarn.bind(this));
        this.app.post('/api/moderation/mute', this.handleModerationMute.bind(this));
        this.app.post('/api/moderation/ban', this.handleModerationBan.bind(this));
        this.app.post('/api/moderation/kick', this.handleModerationKick.bind(this));
        this.app.get('/api/moderation/history/:userId', this.handleGetModerationHistory.bind(this));
        this.app.get('/api/moderation/actions/:userId', this.handleGetActiveModerationActions.bind(this));
        
        // User management routes
        this.app.post('/api/user/update', this.handleUserUpdate.bind(this));
        this.app.get('/api/users/online', this.handleGetOnlineUsers.bind(this));
        this.app.post('/api/user/change-password', this.handleChangePassword.bind(this));
        this.app.delete('/api/user/delete', this.handleDeleteAccount.bind(this));
        this.app.post('/api/user/pawn', this.handleUpdatePawn.bind(this));
        this.app.post('/api/user/bio', this.handleUpdateBio.bind(this));
  }
  
  setupSocketHandlers() {
    this.io.on('connection', (socket) => {
            console.log('🎭 [SERVER] New connection:', socket.id);
            
            // Initialize user object (matching Ixat Files structure)
            const user = {
                id: null,
                index: socket.id,
                sock: socket,
                ipaddr: socket.handshake.address,
                authenticated: false,
                online: false,
                hidden: false,
                mobile: false,
                mobready: false,
                buffer: '',
                loginKey: null,
                loginTime: null,
                loginShift: null,
                username: '',
                nickname: '',
                avatar: '0',
                url: '',
                k: 0,
                k2: 0,
                k3: 0,
                d0: 0,
                d1: 0,
                d2: 0,
                d3: 0,
                dt: 0,
                dx: 0,
                rank: 0,
                guest: true,
                chat: null,
                pool: 0,
                switchingPools: false,
                banned: 0,
                powers: {},
                powerO: '',
                dO: '',
                bride: '',
                xavi: '',
                enabled: true,
                lastMessage: 0
            };
            
            this.users.set(socket.id, user);
            
            // Handle authentication
            socket.on('authenticate', (data) => this.handleAuthenticate(socket, data));
      
      // Handle room joining
            socket.on('joinRoom', (data) => this.handleJoinRoom(socket, data));
      
      // Handle messages
            socket.on('message', (data) => this.handleMessage(socket, data));
            
            // Handle commands
            socket.on('command', (data) => this.handleCommand(socket, data));
            
            // Handle power usage
            socket.on('power', (data) => this.handlePower(socket, data));
            
            // Handle avatar changes
            socket.on('avatar', (data) => this.handleAvatar(socket, data));
            
            // Handle user profile requests (z tag - from Ixat Files)
            socket.on('z', (data) => {
                console.log('🎭 [SERVER] Received z tag request:', data);
                this.handleUserProfileRequest(socket, data);
            });
            
            // Handle private messages
            socket.on('privateMessage', (data) => {
                this.handlePrivateMessage(socket, data);
            });
            
            // Handle private messages (alternative event name)
            socket.on('private_message', (data) => {
                this.handlePrivateMessagePacket(socket, data);
            });
            
            // Handle friend requests
            socket.on('friendRequest', (data) => {
                this.handleFriendRequest(socket, data);
            });
            
            // Handle radio commands
            socket.on('radioCommand', (data) => {
                this.handleRadioCommand(socket, data);
            });
            
            // Handle 8ball questions
            socket.on('8ballQuestion', (data) => {
                this.handle8BallQuestion(socket, data);
            });
            
            // Handle transfers
            socket.on('transfer', (data) => this.handleTransfer(socket, data));
            
            // Handle marriage/BFF system
            socket.on('marry', (data) => this.handleMarry(socket, data));
            
            // Handle power assignment (ap tag)
            socket.on('ap', (data) => this.handlePowerAssignment(socket, data));
            
            // Handle disconnection
            socket.on('disconnect', () => this.handleDisconnect(socket));
        });
    }
    
    async handleAuthenticate(socket, data) {
        const user = this.users.get(socket.id);
        if (!user) return;
        
        console.log('🎭 [SERVER] Authentication attempt:', data);
        
        if (data.guest) {
            // Enhanced guest user authentication with persistent accounts
            const guestName = data.nickname || `Guest${Math.floor(Math.random() * 1000)}`;
            
            try {
                // Check if guest already exists by session or create new one
                let guestUser = null;
                const sessionId = data.sessionId;
                
                if (sessionId) {
                    // Try to find existing guest by session
                    guestUser = await User.findOne({ 
                        guestSessionId: sessionId, 
                        isGuest: true 
                    });
                }
                
                if (!guestUser) {
                    // Create new persistent guest account
                    guestUser = new User({
                        isGuest: true,
                        username: null, // Explicitly set to null for guests
                        email: null,    // Explicitly set to null for guests
                        password: null, // Explicitly set to null for guests
                        nickname: guestName,
                        avatar: Math.floor(Math.random() * 1760).toString(),
                        rank: 'guest',
                        xats: 100, // Starting xats for guests
                        days: 0,
                        enabled: true,
                        guestPowers: [
                            { powerId: 1, active: true }, // Basic color power
                            { powerId: 2, active: true }  // Basic smiley power
                        ],
                        guestLevel: 1,
                        guestExperience: 0,
                        guestLastActive: new Date(),
                        guestUpgradePrompted: false
                    });
                    
                    // Generate unique IDs
                    guestUser.generateGuestId();
                    guestUser.generateGuestSessionId();
                    
                    try {
                        await guestUser.save();
                        console.log(`🎭 [SERVER] Created new persistent guest account: ${guestUser.guestId}`);
                    } catch (saveError) {
                        console.error('🎭 [SERVER] Failed to save guest user:', saveError);
                        // Fallback to temporary guest without database storage
                        guestUser = null;
                    }
                } else {
                    // Update existing guest activity
                    guestUser.guestLastActive = new Date();
                    guestUser.nickname = guestName; // Allow nickname changes
                    await guestUser.save();
                    console.log(`🎭 [SERVER] Reconnected existing guest: ${guestUser.guestId}`);
                }
                
                // Create session user object
                if (guestUser) {
                    // Database-backed guest
                    user.id = guestUser._id.toString();
                    user.dbId = guestUser._id;
                    user.nickname = guestUser.nickname;
                    user.username = guestUser.nickname;
                    user.avatar = guestUser.avatar;
                    user.rank = 5; // Guest rank
                    user.guest = true;
                    user.authenticated = true;
                    user.online = true;
                    user.xats = guestUser.xats;
                    user.days = guestUser.days;
                    user.powers = guestUser.guestPowers || [];
                    user.guestId = guestUser.guestId;
                    user.guestSessionId = guestUser.guestSessionId;
                    user.guestLevel = guestUser.guestLevel;
                    user.guestExperience = guestUser.guestExperience;
                    user.canUpgrade = guestUser.canUpgradeToMember();
                } else {
                    // Fallback temporary guest
                    user.id = Math.floor(Math.random() * 1000000);
                    user.dbId = null;
                    user.nickname = guestName;
                    user.username = guestName;
                    user.avatar = Math.floor(Math.random() * 1760).toString();
                    user.rank = 5; // Guest rank
                    user.guest = true;
                    user.authenticated = true;
                    user.online = true;
                    user.xats = 100;
                    user.days = 0;
                    user.powers = [];
                    user.guestId = 'temp_' + Date.now();
                    user.guestSessionId = 'temp_' + Date.now();
                    user.guestLevel = 1;
                    user.guestExperience = 0;
                    user.canUpgrade = false;
                    console.log(`🎭 [SERVER] Created temporary guest: ${user.nickname}`);
                }
                
                // Generate login key for guest
                user.loginKey = Math.floor(Math.random() * 90000000) + 10000000;
                user.loginTime = Math.floor(Date.now() / 1000);
                user.loginShift = Math.floor(Math.random() * 4) + 2;
                
                socket.emit('authenticated', {
                    user: {
                        id: user.id,
                        nickname: user.nickname,
                        avatar: user.avatar,
                        rank: user.rank,
                        guest: true,
                        loginKey: user.loginKey,
                        loginTime: user.loginTime,
                        loginShift: user.loginShift,
                        guestId: user.guestId,
                        guestLevel: user.guestLevel,
                        guestExperience: user.guestExperience,
                        canUpgrade: user.canUpgrade,
                        xats: user.xats,
                        persistent: !!user.dbId // Indicates if guest is database-backed
                    },
                    sessionId: user.guestSessionId
                });
                
                console.log(`🎭 [SERVER] Guest joined: ${user.nickname} (Level: ${user.guestLevel}, Avatar: ${user.avatar})`);
                
            } catch (error) {
                console.error('🎭 [SERVER] Guest authentication error:', error);
                socket.emit('authError', { message: 'Guest authentication failed' });
                return;
            }
        } else if (data.token && data.token !== 'undefined' && data.token !== 'null' && data.token.trim() !== '') {
            // Registered user authentication
            console.log('🎭 [SERVER] Processing registered user authentication with token:', data.token);
            
            try {
                const decoded = jwt.verify(data.token, process.env.JWT_SECRET || 'your-secret-key');
                console.log('🎭 [SERVER] JWT decoded:', decoded);
                
                const dbUser = await User.findById(decoded.userId);
                console.log('🎭 [SERVER] Database user found:', dbUser ? 'Yes' : 'No');
                
                if (!dbUser || !dbUser.enabled) {
                    console.log('🎭 [SERVER] User not found or disabled, falling back to guest');
                    socket.emit('authError', { message: 'Invalid or disabled account' });
                    return;
                }
                
                console.log('🎭 [SERVER] Authenticating registered user:', dbUser.username);
                
                // Update user data from database (matching Ixat Files structure)
                user.id = dbUser._id.toString();
                user.username = dbUser.username;
                user.nickname = dbUser.nickname;
                user.rank = dbUser.rank;
                user.avatar = dbUser.avatar || '0';
                user.xavi = dbUser.xavi || '';
                user.xats = dbUser.xats;
                user.days = dbUser.days;
                user.email = dbUser.email;
                user.enabled = dbUser.enabled;
                user.guest = false;
                user.authenticated = true;
                user.online = true;
                user.k = dbUser.k;
                user.k2 = dbUser.k2;
                user.k3 = dbUser.k3;
                user.bride = dbUser.bride || '';
                user.url = dbUser.url || '';
                user.dx = dbUser.xats;
                user.d1 = dbUser.days;
                
                // Load user powers (complex bitwise system from Ixat Files)
                await this.loadUserPowers(user, dbUser);
                
                // Generate login key
                user.loginKey = Math.floor(Math.random() * 90000000) + 10000000;
                user.loginTime = Math.floor(Date.now() / 1000);
                user.loginShift = Math.floor(Math.random() * 4) + 2;
                
                // Update last seen
                dbUser.lastSeen = new Date();
                dbUser.connectedlast = socket.handshake.address;
                await dbUser.save();
                
                socket.emit('authenticated', {
        user: {
                        id: user.id,
          username: user.username,
          nickname: user.nickname,
                        rank: user.rank,
          avatar: user.avatar,
          xavi: user.xavi,
                        xats: user.xats,
                        days: user.days,
                        email: user.email,
                        enabled: user.enabled,
                        guest: false,
                        powers: user.powers,
                        loginKey: user.loginKey,
                        loginTime: user.loginTime,
                        loginShift: user.loginShift
                    }
                });
                
                console.log(`🎭 [SERVER] Registered user joined: ${user.nickname} (Rank: ${user.rank}, Avatar: ${user.avatar})`);
            } catch (jwtError) {
                console.error('🎭 [SERVER] JWT verification failed:', jwtError);
                console.log('🎭 [SERVER] Falling back to guest authentication');
                socket.emit('authError', { message: 'Invalid authentication token' });
                return;
            }
        } else {
            console.log('🎭 [SERVER] No valid token provided, falling back to guest');
            socket.emit('authError', { message: 'Invalid authentication data' });
        }
    }
    
    async loadUserPowers(user, dbUser) {
        try {
            // Import UserPower model
            const UserPower = require('./models/UserPower');
            
            // Initialize power sections
            user.powers = {};
            user.powerO = '';
            user.dO = '';
            
            // Load user's powers from UserPower collection
            const userPowers = await UserPower.find({ 
                user: dbUser._id, 
                active: true 
            }).populate('power');
            
            if (userPowers && userPowers.length > 0) {
                userPowers.forEach(userPower => {
                    const power = userPower.power;
                    if (power && userPower.purchasedFor >= 1) {
                        // Initialize section if not exists
                        if (!user.powers[power.section]) {
                            user.powers[power.section] = 0;
                        }
                        
                        // Add power value using bitwise OR (not addition!)
                        user.powers[power.section] |= power.subid;
                        
                        // Build power strings (matching Ixat Files format)
                        const powerStr = `${power.id}=${userPower.purchasedFor > 1 ? (userPower.purchasedFor - 1) : 1}|`;
                        user.dO += powerStr;
                        
                        if (userPower.purchasedFor > 1) {
                            user.powerO += powerStr;
                        }
                    }
                });
            }
            
            console.log(`🎭 [SERVER] Loaded ${userPowers.length} powers for ${user.nickname}:`, user.powers);
        } catch (error) {
            console.error('🎭 [SERVER] Failed to load user powers:', error);
        }
    }
    
    async handleJoinRoom(socket, data) {
        const user = this.users.get(socket.id);
        if (!user || !user.authenticated) return;
        
        try {
            // Use room name from data or default to 'Main Chat'
            const roomName = data.roomName || 'Main Chat';
            let room = await Room.findOne({ name: roomName });
            
            if (!room) {
                // Create default room if it doesn't exist
                room = new Room({
                    name: roomName,
                    bg: 'http://oi60.tinypic.com/1r6io9.jpg',
                    sc: 'Welcome to the chat!',
                    ch: 0,
                    radio: '',
                    pass: '',
                    button: '#FFFFFF',
                    attached: 'Help',
                    pool: '0 2 1',
                    pools: '{"m":"Main","t":"Chat","b":"Banned","rnk":"9"}',
                    gback: 'kmoon',
                    gline: 'wary,hehe,chew,evil,cd,wt,yum,smirk,smirk2,mad,goo,sleepy',
                    link: '',
                    bad: '',
                    announce: '',
                    lang: 1
                });
                await room.save();
            }
            
            // Check if user is banned
            const ban = await mongoose.connection.db.collection('bans')
                .findOne({ 
                    userid: user.id, 
                    chatid: room.name,
                    unbandate: { $gt: Date.now() }
                });
            
            if (ban) {
                socket.emit('banned', { 
                    message: `You are banned for ${Math.ceil((ban.unbandate - Date.now()) / 60000)} more minutes.` 
                });
        return;
      }
      
            // Join room
            user.chat = room.name; // Store room name, not ObjectId
            user.pool = 0;
            
            // Send room info
            socket.emit('roomJoined', {
                room: {
                    id: room._id,
                    name: room.name,
                    bg: room.bg,
                    sc: room.sc,
                    radio: room.radio,
                    button: room.button,
                    attached: room.attached,
                    pool: room.pool,
                    pools: room.pools,
                    gback: room.gback,
                    gline: room.gline
                }
            });
            
            // Send user list
            const roomUsers = Array.from(this.users.values())
                .filter(u => u.chat && u.chat === room.name && u.online);
            
            console.log(`🎭 [SERVER] Sending user list to ${user.nickname}:`, roomUsers.length, 'users');
            console.log('🎭 [SERVER] Room users:', roomUsers.map(u => u.nickname));
            
            socket.emit('userList', {
                users: roomUsers.map(u => ({
                    id: u.id,
                    nickname: u.nickname,
                    avatar: u.avatar,
                    rank: u.rank,
                    guest: u.guest,
                    pool: u.pool,
                    xats: u.xats,
                    days: u.days,
                    bride: u.bride,
                    guestLevel: u.guestLevel,
                    guestExperience: u.guestExperience,
                    persistent: !!u.dbId,
                    rankPool: this.getUserRankPool(u)
                }))
            });
            
                        // Notify other users
            socket.to(room.name).emit('userJoined', {
                id: user.id,
                nickname: user.nickname,
                avatar: user.avatar,
                rank: user.rank,
                guest: user.guest,
                pool: user.pool,
                xats: user.xats,
                days: user.days,
                bride: user.bride,
                guestLevel: user.guestLevel,
                guestExperience: user.guestExperience,
                persistent: !!user.dbId,
                rankPool: this.getUserRankPool(user)
            });
            
            console.log(`🎭 [SERVER] User ${user.nickname} joined room ${room.name}`);
            
      } catch (error) {
            console.error('🎭 [SERVER] Error joining room:', error);
            socket.emit('error', { message: 'Failed to join room' });
        }
    }
    
    async handleMessage(socket, data) {
        const user = this.users.get(socket.id);
        if (!user || !user.authenticated || !user.chat) return;
        
        const message = data.message;
        if (!message || message.trim() === '') return;
        
        // Check if user is banned
        if (user.banned > Date.now()) {
        return;
      }
      
        // Rate limiting for guests (matching Ixat Files)
        if (user.guest && user.rank === 5) {
            const now = Date.now();
            if (!this.rfilter.has(user.chat)) {
                this.rfilter.set(user.chat, []);
            }
            
            const chatFilter = this.rfilter.get(user.chat);
            const cutoff = now - 5000; // 5 seconds
            
            // Remove old entries
            const filtered = chatFilter.filter(time => time > cutoff);
            filtered.push(now);
            this.rfilter.set(user.chat, filtered);
            
            if (filtered.length >= 12) {
                // Enable protection
                this.protected.set(user.chat, {
                    end: now + 3600000, // 1 hour
                    type: 'unreg'
                });
                
                socket.emit('message', {
                    user: { id: 0, nickname: 'System' },
                    message: 'Protection has been enabled for the next 60 minutes!(Raid Detected)',
                    timestamp: now
                });
                
                // Kick unregistered guests
                const roomUsers = Array.from(this.users.values())
                    .filter(u => u.chat && u.chat === user.chat && u.guest && u.rank === 5);
                
                roomUsers.forEach(u => {
                    u.sock.emit('message', {
                        user: { id: 0, nickname: 'System' },
                        message: 'Protection enabled, kicking unregistered guests.',
                        timestamp: now
                    });
                    this.handleDisconnect(u.sock);
                });
                
                this.rfilter.delete(user.chat);
        return;
      }
        }
        
        // Check for commands
        if (message.startsWith('~')) {
            this.handleCommand(socket, { command: message.substring(1) });
        return;
      }
      
        // Check for special commands (matching Ixat Files)
        if (message.startsWith('/')) {
            const cmd = message.substring(1, 2);
            const param = message.substring(2);
            
            switch (cmd) {
                case 'd': // Delete message
                    if ([1, 2, 4].includes(user.rank)) {
                        if (param === 'clear') {
                            // Clear all messages
                            try {
                                const room = await Room.findOne({ name: user.chat });
                                if (room) {
                                    await Message.updateMany(
                                        { roomId: room._id },
                                        { visible: false }
                                    );
                                }
                                
                                socket.emit('message', {
                                    user: { id: 0, nickname: 'System' },
                                    message: 'Chat has been cleared.',
                                    timestamp: Date.now()
                                });
                                
                                // Refresh room for all users
                                const roomUsers = Array.from(this.users.values())
                                    .filter(u => u.chat && u.chat === user.chat);
                                
                                roomUsers.forEach(u => {
                                    u.sock.emit('roomRefresh');
                                });
                            } catch (error) {
                                console.error('🎭 [SERVER] Clear command error:', error);
                            }
                        } else if (!isNaN(param)) {
                            // Delete specific message
                            try {
                                const room = await Room.findOne({ name: user.chat });
                                if (room) {
                                    await Message.updateOne(
                                        { _id: param, roomId: room._id },
                                        { visible: false }
                                    );
                                }
                                
                                socket.to(user.chat).emit('message', {
                                    user: { id: 0, nickname: 'System' },
                                    message: `Message ${param} has been deleted.`,
                                    timestamp: Date.now()
                                });
                            } catch (error) {
                                console.error('🎭 [SERVER] Delete message error:', error);
                            }
                        }
                    }
                    return;
                    
                case 'p': // Protection toggle
                    if ([1, 4].includes(user.rank)) {
                        if (this.protected.has(user.chat)) {
                            this.protected.delete(user.chat);
                            socket.emit('message', {
                                user: { id: 0, nickname: 'System' },
                                message: 'Protection has been disabled!',
                                timestamp: Date.now()
                            });
                        } else {
                            this.protected.set(user.chat, {
                                end: Date.now() + 3600000, // 1 hour
                                type: 'noguest'
                            });
                            socket.emit('message', {
                                user: { id: 0, nickname: 'System' },
                                message: 'Protection has been enabled for the next 60 minutes!',
                                timestamp: Date.now()
                            });
                        }
                    }
                    return;
                    
                case 's': // Set scroll message
                    if (user.rank === 1) {
                        try {
                            await Room.findByIdAndUpdate(user.chat, { sc: param });
                            socket.emit('message', {
                                user: { id: 0, nickname: 'System' },
                                message: `Scroll message set to: ${param}`,
                                timestamp: Date.now()
                            });
    } catch (error) {
                            console.error('🎭 [SERVER] Set scroll error:', error);
                        }
                    }
                    return;
                    
                case 'g': // Give up rank
                    if (user.hasPower && user.hasPower(32)) {
                        try {
                            await User.findByIdAndUpdate(user.id, { rank: 3 }); // Reset to member
                            user.rank = 3;
                            socket.emit('message', {
                                user: { id: 0, nickname: 'System' },
                                message: 'You have given up your rank.',
                                timestamp: Date.now()
                            });
                        } catch (error) {
                            console.error('🎭 [SERVER] Give up rank error:', error);
                        }
                    }
        return;
            }
        }
        
        // Save message to database (only for registered users)
        if (!user.guest) {
            try {
                // Find the room by name to get the ObjectId
                const room = await Room.findOne({ name: user.chat });
                if (room) {
                    const newMessage = new Message({
                        roomId: room._id,
          userId: user.id,
                        text: message,
                        timestamp: new Date()
                    });
                    await newMessage.save();
                }
    } catch (error) {
                console.error('🎭 [SERVER] Failed to save message:', error);
            }
        } else {
            // Handle guest experience and leveling
            try {
                if (user.dbId) {
                    // Database-backed guest
                    const guestUser = await User.findById(user.dbId);
                    if (guestUser && guestUser.isGuest) {
                        // Award experience for messaging (1-3 XP based on message length)
                        const experienceGain = Math.min(Math.floor(message.length / 10) + 1, 3);
                        const levelResult = guestUser.addGuestExperience(experienceGain);
                        
                        // Update user object with new values
                        user.guestExperience = guestUser.guestExperience;
                        user.guestLevel = guestUser.guestLevel;
                        user.xats = guestUser.xats;
                        
                        // Update activity
                        await guestUser.updateGuestActivity();
                        
                        // Notify client if leveled up
                        if (levelResult.leveledUp) {
                            socket.emit('guestLevelUp', {
                                newLevel: levelResult.newLevel,
                                experience: guestUser.guestExperience,
                                xatsReward: 50
                            });
                            
                            // Broadcast level up to room
                            this.io.to(user.chat).emit('message', {
                                user: { id: 0, nickname: 'System' },
                                message: `🎉 ${user.nickname} leveled up to level ${levelResult.newLevel}!`,
                                timestamp: Date.now()
                            });
                        }
                        
                        // Check if guest can upgrade to member
                        if (guestUser.canUpgradeToMember()) {
                            socket.emit('upgradePrompt', {
                                message: 'You can now upgrade to a full member account!',
                                level: guestUser.guestLevel,
                                benefits: ['Keep your progress', 'More powers', 'Trading', 'Custom avatar']
                            });
                        }
                    }
                } else {
                    // Temporary guest - basic experience tracking in memory
                    const experienceGain = Math.min(Math.floor(message.length / 10) + 1, 3);
                    user.guestExperience += experienceGain;
                    
                    // Simple level up logic for temporary guests
                    const experienceNeeded = user.guestLevel * 100;
                    if (user.guestExperience >= experienceNeeded && user.guestLevel < 10) {
                        user.guestLevel++;
                        user.guestExperience -= experienceNeeded;
                        user.xats += 50; // Reward for leveling up
                        
                        // Notify client of level up
                        socket.emit('guestLevelUp', {
                            newLevel: user.guestLevel,
                            experience: user.guestExperience,
                            xatsReward: 50
                        });
                        
                        // Broadcast level up to room
                        this.io.to(user.chat).emit('message', {
                            user: { id: 0, nickname: 'System' },
                            message: `🎉 ${user.nickname} leveled up to level ${user.guestLevel}!`,
                            timestamp: Date.now()
                        });
                    }
                }
            } catch (error) {
                console.error('🎭 [SERVER] Guest experience error:', error);
            }
        }
        
        // Broadcast message to room
        const messageData = {
            user: {
                id: user.id,
                nickname: user.nickname,
                avatar: user.avatar,
                rank: user.rank,
                guest: user.guest
            },
            message: message,
            timestamp: Date.now()
        };
        
        socket.to(user.chat).emit('message', messageData);
        socket.emit('message', messageData);
        
        console.log(`🎭 [SERVER] Message from ${user.nickname}: ${message}`);
    }
    
    async handleCommand(socket, data) {
        const user = this.users.get(socket.id);
        if (!user || !user.authenticated) return;
        
        const command = data.command;
        if (!command) return;
        
        const args = command.split(' ');
        const cmd = args[0].toLowerCase();
        const isOwner = this.config.staff.includes(user.id);
        
        switch (cmd) {
            case 'clear':
                if (!isOwner) break;
                
                try {
                    const room = await Room.findOne({ name: user.chat });
                    if (room) {
                        await Message.updateMany(
                            { roomId: room._id },
                            { visible: false }
                        );
                    }
                    
                    socket.emit('message', {
                        user: { id: 0, nickname: 'System' },
                        message: 'Chat has been cleared.',
                        timestamp: Date.now()
                    });
                    
                    // Refresh room for all users
                    const roomUsers = Array.from(this.users.values())
                        .filter(u => u.chat && u.chat === user.chat);
                    
                    roomUsers.forEach(u => {
                        u.sock.emit('roomRefresh');
                    });
                } catch (error) {
                    console.error('🎭 [SERVER] Clear command error:', error);
                }
          break;
          
            case 'users':
                if (!isOwner) break;
                
                const onlineCount = this.users.size;
                socket.emit('message', {
                    user: { id: 0, nickname: 'System' },
                    message: `${onlineCount} currently online`,
                    timestamp: Date.now()
                });
          break;
          
            case 'global':
                if (!isOwner) break;
                
                const globalMessage = args.slice(1).join(' ');
                if (globalMessage) {
                    this.io.emit('message', {
                        user: { id: 0, nickname: 'System' },
                        message: globalMessage,
                        timestamp: Date.now()
                    });
                }
                break;
                
            case 'roulette':
                const num = Math.floor(Math.random() * 37);
                socket.emit('message', {
                    user: { id: 0, nickname: 'System' },
                    message: `${num} IS Your Number!`,
                    timestamp: Date.now()
                });
                break;
                
            default:
                socket.emit('message', {
                    user: { id: 0, nickname: 'System' },
                    message: `Unknown command: ${cmd}`,
                    timestamp: Date.now()
          });
          break;
        }
    }
    
    async handlePower(socket, data) {
        const user = this.users.get(socket.id);
        if (!user || !user.authenticated) return;
        
        const powerId = data.powerId;
        const targetId = data.targetId;
        
        // Check if user has the power
        // This is a simplified version - the real system is much more complex
        console.log(`🎭 [SERVER] Power usage: ${user.nickname} used power ${powerId} on ${targetId}`);
        
        // Broadcast power effect
        socket.to(user.chat.toString()).emit('powerEffect', {
            powerId: powerId,
            userId: user.id,
            targetId: targetId
        });
    }
    
    async handleAvatar(socket, data) {
        const user = this.users.get(socket.id);
        if (!user || !user.authenticated) return;
        
        const newAvatar = data.avatar;
        if (newAvatar >= 0 && newAvatar < 1760) {
            user.avatar = newAvatar.toString();
            
            // Update database for registered users
            if (!user.guest) {
                try {
                    await User.findByIdAndUpdate(user.id, { avatar: newAvatar });
    } catch (error) {
                    console.error('🎭 [SERVER] Failed to update avatar in database:', error);
                }
            }
            
            // Broadcast avatar change to room
            this.broadcastToRoom(user.chat, 'avatarChange', {
                userId: user.id,
                avatar: newAvatar
            });
        }
    }
    
    async handleUserProfileRequest(socket, data) {
        console.log('🎭 [SERVER] handleUserProfileRequest called with:', data);
        
        const user = this.users.get(socket.id);
      if (!user) {
            console.log('🎭 [SERVER] User not found for socket:', socket.id);
        return;
      }
      
        const targetUserId = data.u;
        console.log('🎭 [SERVER] Looking for target user:', targetUserId);
        
        // Find target user in the room
        const targetUser = Array.from(this.users.values()).find(u => u.id == targetUserId);
        console.log('🎭 [SERVER] Target user found:', targetUser ? targetUser.nickname : 'No');
        
      if (!targetUser) {
            console.log('🎭 [SERVER] Target user not found');
        return;
      }
      
        // Send user profile data (matching Ixat Files format)
        const profileData = {
            b: 1,
            d: user.id,
            u: targetUser.id,
            t: "/l",
            po: targetUser.dO || 0,
            x: targetUser.xats || 0,
            y: targetUser.days || 0,
            q: 3,
            N: targetUser.username || '',
            n: targetUser.nickname,
            a: targetUser.avatar,
            h: targetUser.url || '',
            v: 2,
            rank: targetUser.rank,
            guest: targetUser.guest,
            bride: targetUser.bride || ''
        };
        
        socket.emit('z', profileData);
        
        // Also send the requesting user's profile to the target (for mutual profile viewing)
        const requesterProfile = {
            b: 1,
            d: targetUser.id,
            u: user.id,
            t: "/l",
            po: user.dO || 0,
            x: user.xats || 0,
            y: user.days || 0,
            q: 3,
            N: user.username || '',
            n: user.nickname,
            a: user.avatar,
            h: user.url || '',
            v: 2,
            rank: user.rank,
            guest: user.guest,
            bride: user.bride || ''
        };
        
        // Find target user's socket
        const targetSocket = targetUser.sock;
        if (targetSocket) {
            console.log('🎭 [SERVER] Sending mutual profile to target user');
            targetSocket.emit('z', requesterProfile);
        } else {
            console.log('🎭 [SERVER] Target user socket not found');
        }
        
        console.log('🎭 [SERVER] Profile data sent to requester:', profileData);
    }
    
    async handlePrivateMessage(socket, data) {
        const user = this.users.get(socket.id);
        if (!user || !user.authenticated) return;

        const targetUsername = data.targetUsername;
        const message = data.message;

        if (!targetUsername || !message) {
            socket.emit('error', { message: 'Invalid private message data' });
            return;
        }
      
        // Find target user
        const targetUser = Array.from(this.users.values()).find(u => 
            u.username === targetUsername || u.nickname === targetUsername
        );

        if (!targetUser) {
            socket.emit('error', { message: 'User not found or not online' });
            return;
        }

        // Create private message data for main chat display
        const privateMessageData = {
            id: Date.now(),
            user: user.nickname,
            message: `[Private to ${targetUser.nickname}] ${message}`,
            timestamp: new Date().toLocaleTimeString(),
            avatar: user.avatar,
            rank: user.rank,
            isPrivate: true,
            privateTo: targetUser.id
        };

        // Send private message to sender (appears in their main chat)
        socket.emit('message', privateMessageData);

        // Send private message to recipient (appears in their main chat)
        targetUser.sock.emit('message', {
            ...privateMessageData,
            message: `[Private from ${user.nickname}] ${message}`,
            privateFrom: user.id
        });

        console.log(`🎭 [SERVER] Private message from ${user.nickname} to ${targetUser.nickname}: ${message}`);
    }
    
    async handlePrivateMessagePacket(socket, data) {
        const user = this.users.get(socket.id);
        if (!user || !user.authenticated) {
            console.log('🎭 [SERVER] User not authenticated for private message');
            return;
        }

        const targetUserId = data.targetUserId;
        const message = data.message;

        console.log('🎭 [SERVER] Private message packet received:', {
            from: user.nickname,
            fromId: user.id,
            targetUserId: targetUserId,
            message: message
        });

        if (!targetUserId || !message) {
            console.log('🎭 [SERVER] Invalid private message data');
            socket.emit('error', { message: 'Invalid private message data' });
            return;
        }
        
        // Find target user by ID
        const targetUser = Array.from(this.users.values()).find(u => u.id === targetUserId);

        console.log('🎭 [SERVER] All users:', Array.from(this.users.values()).map(u => ({ id: u.id, nickname: u.nickname })));
        console.log('🎭 [SERVER] Looking for target user ID:', targetUserId);
        console.log('🎭 [SERVER] Found target user:', targetUser ? { id: targetUser.id, nickname: targetUser.nickname } : 'NOT FOUND');

        if (!targetUser) {
            console.log('🎭 [SERVER] Target user not found or not online');
            socket.emit('error', { message: 'User not found or not online' });
            return;
        }

        // Send private message to target user
        console.log('🎭 [SERVER] Sending private message to target user socket:', targetUser.sock.id);
        targetUser.sock.emit('privateMessage', {
            from: user.nickname,
            fromId: user.id,
            message: message,
            timestamp: Date.now()
        });

        // Confirm to sender
        socket.emit('privateMessageSent', {
            to: targetUser.nickname,
            message: message,
            timestamp: Date.now()
        });

        console.log(`🎭 [SERVER] Private message packet from ${user.nickname} to ${targetUser.nickname}: ${message}`);
    }
    
    getUserRankPool(user) {
        // Determine which rank pool this user belongs to
        if (user.rank >= 3) { // Moderator or higher
            return 'Club';
        } else if (user.rank === -1 || user.banned) { // Banned users
            return 'Chum';
        } else if (user.rank >= 1) { // VIP users
            return 'VIP';
        } else {
            return 'VIP'; // Default for guests and regular users
        }
    }
    
    async handleFriendRequest(socket, data) {
        const user = this.users.get(socket.id);
        if (!user || !user.authenticated) return;

        const targetId = data.targetId;
        const targetUser = Array.from(this.users.values()).find(u => u.id === targetId);

        if (!targetUser) {
            socket.emit('error', { message: 'Target user not found' });
            return;
        }

        // Check if already friends
        if (user.friends.includes(targetUser.id) || targetUser.friends.includes(user.id)) {
            socket.emit('friendRequestError', { message: 'Already friends' });
            return;
        }

        // Add to friend list
        user.friends.push(targetUser.id);
        targetUser.friends.push(user.id);

        // Save to database
        try {
            await User.findByIdAndUpdate(user.id, { $set: { friends: user.friends } });
            await User.findByIdAndUpdate(targetUser.id, { $set: { friends: targetUser.friends } });

            // Notify target user
            targetUser.sock.emit('friendRequestAccepted', {
                from: user.nickname,
                id: user.id
            });

            socket.emit('friendRequestAccepted', {
                from: targetUser.nickname,
                id: targetUser.id
            });

            console.log(`🎭 [SERVER] Friend request accepted: ${user.nickname} and ${targetUser.nickname}`);
        } catch (error) {
            console.error('🎭 [SERVER] Friend request error:', error);
            socket.emit('error', { message: 'Friend request failed' });
        }
    }

    async handleRadioCommand(socket, data) {
        const user = this.users.get(socket.id);
        if (!user || !user.authenticated) return;

        const command = data.command;
        if (!command) return;

    const args = command.split(' ');
        const cmd = args[0].toLowerCase();

        if (cmd === 'on') {
            user.radio = true;
            socket.emit('radioStatus', { status: true });
            console.log(`🎭 [SERVER] Radio turned on by ${user.nickname}`);
        } else if (cmd === 'off') {
            user.radio = false;
            socket.emit('radioStatus', { status: false });
            console.log(`🎭 [SERVER] Radio turned off by ${user.nickname}`);
        } else {
            socket.emit('message', {
                user: { id: 0, nickname: 'System' },
                message: `Unknown radio command: ${cmd}`,
                timestamp: Date.now()
            });
        }
    }

    async handle8BallQuestion(socket, data) {
        const user = this.users.get(socket.id);
        if (!user || !user.authenticated) return;

        const question = data.question;
        if (!question || question.trim() === '') {
            socket.emit('message', {
                user: { id: 0, nickname: 'System' },
                message: 'Please ask a question.',
                timestamp: Date.now()
            });
            return;
        }

        const answers = [
            'It is certain.',
            'It is decidedly so.',
            'Without a doubt.',
            'Yes - definitely.',
            'You may rely on it.',
            'As I see it, yes.',
            'Most likely.',
            'Outlook good.',
            'Yes.',
            'Signs point to yes.',
            'Reply hazy, try again.',
            'Ask again later.',
            'Better not tell you now.',
            'Cannot predict now.',
            'Concentrate and ask again.',
            'Don\'t count on it.',
            'My reply is no.',
            'My sources say no.',
            'Outlook not so good.',
            'Very doubtful.'
        ];

        const answer = answers[Math.floor(Math.random() * answers.length)];
        socket.emit('message', {
            user: { id: 0, nickname: 'System' },
            message: `${answer}`,
            timestamp: Date.now()
        });
        console.log(`🎭 [SERVER] 8-ball question from ${user.nickname}: ${question}`);
    }
    
    async handleTransfer(socket, data) {
        const user = this.users.get(socket.id);
        if (!user || !user.authenticated || user.guest) return;
        
        const targetId = data.targetId;
        const xats = data.xats;
        const days = data.days;
        
        if (!xats || !days || xats < 0 || days < 0) {
            socket.emit('error', { message: 'Invalid transfer amount' });
      return;
    }
    
        // Find target user
        const targetUser = Array.from(this.users.values()).find(u => u.id === targetId);
        if (!targetUser || targetUser.guest) {
            socket.emit('error', { message: 'Target user not found or is a guest' });
            return;
        }
        
        // Check if user has enough xats and days
        if (user.xats < xats) {
            socket.emit('error', { message: 'Not enough xats' });
            return;
        }
        
        if (user.days < days) {
            socket.emit('error', { message: 'Not enough days' });
            return;
        }
        
        try {
            // Update both users in database
            await User.findByIdAndUpdate(user.id, {
                $inc: { xats: -xats, days: -days }
            });
            
            await User.findByIdAndUpdate(targetUser.id, {
                $inc: { xats: xats, days: days }
            });
            
            // Update local user objects
            user.xats -= xats;
            user.days -= days;
            targetUser.xats += xats;
            targetUser.days += days;
            
            // Notify both users
            socket.emit('transferComplete', {
                to: targetUser.nickname,
                xats: xats,
                days: days,
                newBalance: { xats: user.xats, days: user.days }
            });
            
            targetUser.sock.emit('transferReceived', {
                from: user.nickname,
                xats: xats,
                days: days,
                newBalance: { xats: targetUser.xats, days: targetUser.days }
            });
            
            console.log(`🎭 [SERVER] Transfer: ${user.nickname} sent ${xats} xats and ${days} days to ${targetUser.nickname}`);
            
    } catch (error) {
            console.error('🎭 [SERVER] Transfer error:', error);
            socket.emit('error', { message: 'Transfer failed' });
        }
    }
    
    async handleMarry(socket, data) {
        const user = this.users.get(socket.id);
        if (!user || !user.authenticated || user.guest) return;
        
        const targetId = data.targetId;
        
        // Find target user
        const targetUser = Array.from(this.users.values()).find(u => u.id === targetId);
        if (!targetUser || targetUser.guest) {
            socket.emit('error', { message: 'Target user not found or is a guest' });
            return;
        }
        
        // Check if already married
        if (user.bride || targetUser.bride) {
            socket.emit('error', { message: 'One or both users are already married' });
            return;
        }
        
        // Check if user has enough xats (200 for marriage)
        if (user.xats < 200) {
            socket.emit('error', { message: 'Not enough xats (200 required for marriage)' });
            return;
        }
        
        try {
            // Update both users in database
            await User.findByIdAndUpdate(user.id, {
                bride: targetUser.id,
                d2: targetUser.id,
                $inc: { xats: -200 }
            });
            
            await User.findByIdAndUpdate(targetUser.id, {
                bride: user.id,
                d2: user.id
            });
            
            // Update local user objects
            user.bride = targetUser.id;
            user.d2 = targetUser.id;
            user.xats -= 200;
            targetUser.bride = user.id;
            targetUser.d2 = user.id;
            
            // Notify both users
            socket.emit('marriageComplete', {
                spouse: targetUser.nickname,
                newBalance: { xats: user.xats }
            });
            
            targetUser.sock.emit('marriageComplete', {
                spouse: user.nickname,
                newBalance: { xats: targetUser.xats }
            });
            
            // Notify room of marriage
            socket.to(user.chat.toString()).emit('marriageAnnouncement', {
                user1: user.nickname,
                user2: targetUser.nickname
            });
            
            console.log(`🎭 [SERVER] Marriage: ${user.nickname} and ${targetUser.nickname} are now married!`);
            
    } catch (error) {
            console.error('🎭 [SERVER] Marriage error:', error);
            socket.emit('error', { message: 'Marriage failed' });
        }
    }
    
    async handlePowerAssignment(socket, data) {
        const user = this.users.get(socket.id);
        if (!user || !user.authenticated) return;
        
        const powerId = data.p;
        const action = data.a; // 1 = assign, 0 = unassign
        
        try {
            const power = await Power.findById(powerId);
            if (!power) {
                socket.emit('ap', { p: powerId, r: 2 }); // Power not found
                return;
            }
            
            if (action === '1') {
                // Assign power to group
                // Check if already assigned
                const existingAssignment = await mongoose.connection.db.collection('group_powers')
                    .findOne({ 
                        group: user.chat, 
                        power: powerId,
                        assignedBy: user.id 
                    });
                
                if (existingAssignment) {
                    socket.emit('ap', { p: powerId, r: 3 }); // Already assigned
                    return;
                }
                
                // Check if group already has this power
                const groupHasPower = await mongoose.connection.db.collection('group_powers')
                    .findOne({ 
                        group: user.chat, 
                        power: powerId 
                    });
                
                if (groupHasPower) {
                    socket.emit('ap', { p: powerId, r: 4 }); // Group already has power
                    return;
                }
                
                // Assign power
                await mongoose.connection.db.collection('group_powers').insertOne({
                    group: user.chat,
                    power: powerId,
                    assignedBy: user.id,
                    assignedAt: new Date()
                });
                
                socket.emit('ap', { p: powerId, r: 1 }); // Success
                
            } else if (action === '0') {
                // Unassign power
                const result = await mongoose.connection.db.collection('group_powers')
                    .deleteOne({ 
                        assignedBy: user.id,
                        group: user.chat,
                        power: powerId 
                    });
                
                if (result.deletedCount > 0) {
                    socket.emit('ap', { p: powerId, r: 1 }); // Success
                } else {
                    socket.emit('ap', { p: powerId, r: 2 }); // Not found
                }
            }
            
    } catch (error) {
            console.error('🎭 [SERVER] Power assignment error:', error);
            socket.emit('ap', { p: powerId, r: 0 }); // Error
        }
    }
    
    handleDisconnect(socket) {
        const user = this.users.get(socket.id);
        if (user) {
            console.log(`🎭 [SERVER] User disconnected: ${user.nickname}`);
            
            // Notify other users in the same room
            if (user.chat) {
                socket.to(user.chat.toString()).emit('userLeft', {
                    id: user.id,
                    nickname: user.nickname
                });
            }
            
            this.users.delete(socket.id);
        }
    }
    
    // API Handlers
    async handleGetStats(req, res) {
        try {
            const stats = {
                totalUsers: await User.countDocuments(),
                onlineUsers: this.users.size,
                totalRooms: await Room.countDocuments(),
                totalMessages: await Message.countDocuments(),
                activeRooms: await Room.countDocuments({ active: true }),
                serverUptime: Math.floor((Date.now() - this.startTime) / 1000),
                version: '1.0.0'
            };
            res.json(stats);
    } catch (error) {
            console.error(' [SERVER] Get stats error:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }
    
    async handleGetRooms(req, res) {
        if (!this.dbConnected) {
            return res.status(503).json({ success: false, message: 'Database unavailable' });
        }

        try {
            const { sort = 'name', limit = 10 } = req.query;
            let query = Room.find({});
            
            if (sort === 'popular') {
                query = query.sort({ userCount: -1 });
            } else if (sort === 'recent') {
                query = query.sort({ createdAt: -1 });
            } else {
                query = query.sort({ name: 1 });
            }
            
            if (limit) {
                query = query.limit(parseInt(limit));
            }
            
            const rooms = await query.exec();
            res.json({ rooms });
    } catch (error) {
            console.error('🎭 [SERVER] Get rooms error:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }
    
    async handleGetPowers(req, res) {
        if (!this.dbConnected) {
            return res.status(503).json({ success: false, message: 'Database unavailable' });
        }

        try {
            const powers = await Power.find({}).sort({ id: 1 });
            res.json({ powers });
    } catch (error) {
            console.error('🎭 [SERVER] Get powers error:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }
    
    async handleBuyPower(req, res) {
        try {
            const { powerName } = req.body;
            const token = req.headers.authorization?.replace('Bearer ', '') || req.query.token;
            
            if (!token) {
                return res.status(401).json({ 
                    success: false, 
                    message: 'Authentication required' 
                });
            }
            
            // Verify user authentication
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
            const user = await User.findById(decoded.userId);
            
            if (!user || !user.enabled) {
                return res.status(401).json({ 
                    success: false, 
                    message: 'Invalid user' 
                });
            }
            
            console.log('🎭 [SERVER] Power purchase attempt:', { powerName, userId: user._id, userXats: user.xats });
            
            // Find the power
            const power = await Power.findOne({ name: powerName });
            if (!power) {
                return res.status(404).json({ 
                    success: false, 
                    message: 'Power not found' 
                });
            }
            
            // Check if user has enough xats
            if (user.xats < power.cost) {
                return res.status(400).json({ 
                    success: false, 
                    message: `Insufficient xats. You need ${power.cost} xats but only have ${user.xats}.` 
                });
            }
            
            // Check if user already has this power
            const existingUserPower = await UserPower.findOne({ 
                user: user._id, 
                power: power._id 
            });
            
            if (existingUserPower) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'You already own this power!' 
                });
            }
            
            // Deduct xats and create user power
            user.xats -= power.cost;
            await user.save();
            
            // Create user power relationship
            const userPower = new UserPower({
                user: user._id,
                power: power._id,
                purchasedAt: new Date(),
                purchasedFor: 1,
                active: true
            });
            await userPower.save();
            
            console.log('🎭 [SERVER] Power purchased successfully:', { powerName, userId: user._id, remainingXats: user.xats });
            
            res.json({
                success: true,
                message: `Successfully purchased ${powerName} for ${power.cost} xats!`,
                power: {
                    id: power.id,
                    name: power.name,
                    cost: power.cost,
                    description: power.description
                },
                user: {
                    xats: user.xats
                }
            });
            
        } catch (error) {
            console.error('🎭 [SERVER] Buy power error:', error);
            res.status(500).json({ 
                success: false, 
                message: 'Server error during power purchase' 
            });
        }
    }
    
    async handleGetUsers(req, res) {
        if (!this.dbConnected) {
            return res.status(503).json({ success: false, message: 'Database unavailable' });
        }

        try {
            const users = await User.find({}).select('-password').limit(100);
            res.json({ users });
    } catch (error) {
            console.error('🎭 [SERVER] Get users error:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }

    async handleGetUser(req, res) {
        if (!this.dbConnected) {
            return res.status(503).json({ success: false, message: 'Database unavailable' });
        }

        try {
            const userId = req.params.id;
            const user = await User.findById(userId).select('-password');
            
            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }
            
            // Get user's power count
            const powerCount = await Power.countDocuments({ userId: user._id });
            
            res.json({
                success: true,
                user: {
                    id: user._id,
                    username: user.username,
                    nickname: user.nickname,
                    email: user.email,
                    avatar: user.avatar,
                    rank: user.rank,
                    xats: user.xats,
                    days: user.days,
                    desc: user.desc || '',
                    custpawn: user.custpawn || 'off',
                    credit: user.credit || 0
                },
                powerCount
            });
        } catch (error) {
            console.error('🎭 [SERVER] Get user error:', error);
            res.status(500).json({ success: false, message: 'Server error' });
        }
    }
    
    async handleLogin(req, res) {
        if (!this.dbConnected) {
            return res.status(503).json({ success: false, message: 'Database unavailable' });
        }

        try {
            const { username, password } = req.body;
            
            const user = await User.findOne({ username });
            if (!user || !user.enabled) {
                return res.status(401).json({ success: false, message: 'Invalid credentials' });
            }
            
            // Check if email is verified
            if (!user.emailVerified) {
                return res.status(401).json({ 
                    success: false, 
                    message: 'Please verify your email before logging in. Check your inbox for a verification link.' 
                });
            }
            
            const isValid = await bcrypt.compare(password, user.password);
            if (!isValid) {
                return res.status(401).json({ success: false, message: 'Invalid credentials' });
            }
            
            const token = jwt.sign(
                { userId: user._id },
                process.env.JWT_SECRET || 'your-secret-key',
                { expiresIn: '7d' }
            );
            
            res.json({
                success: true,
                message: 'Login successful',
                token,
                user: {
                    id: user._id,
                    username: user.username,
                    nickname: user.nickname,
                    avatar: user.avatar,
                    rank: user.rank,
                    xats: user.xats,
                    days: user.days,
                    email: user.email
                }
            });
        } catch (error) {
            console.error('🎭 [SERVER] Login error:', error);
            res.status(500).json({ success: false, message: 'Server error' });
        }
    }
    
    async handleRegister(req, res) {
        if (!this.dbConnected) {
            return res.status(503).json({ success: false, message: 'Database unavailable' });
        }

        try {
            const { username, password, nickname, email } = req.body;
            
            // Check if user exists
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                return res.status(400).json({ success: false, message: 'Username already exists' });
            }
            
            // Check if email exists
            const existingEmail = await User.findOne({ email });
            if (existingEmail) {
                return res.status(400).json({ success: false, message: 'Email already exists' });
            }
            
            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);
            
            // Generate email verification token
            const emailVerificationToken = jwt.sign(
                { userId: username, email },
                process.env.JWT_SECRET || 'your-secret-key',
                { expiresIn: '24h' }
            );
            
            // Create user with email verification
            const user = new User({
                username,
                password: hashedPassword,
                nickname: nickname || username,
                email,
                avatar: Math.floor(Math.random() * 1760).toString(),
                xats: 1000, // Starting xats
                days: 0,
                rank: 1, // Member rank
                enabled: false, // Disable until email verified
                emailVerified: false,
                emailVerificationToken: emailVerificationToken
            });
            
            await user.save();
            
            // For now, auto-verify email to avoid issues
            // In production, you'd send a verification email here
            user.emailVerified = true;
            user.enabled = true;
            user.emailVerificationToken = null; // Clear token after verification
            await user.save();
            
            const token = jwt.sign(
                { userId: user._id },
                process.env.JWT_SECRET || 'your-secret-key',
                { expiresIn: '7d' }
            );
            
            res.json({
                success: true,
                message: 'Account created successfully! Please check your email for verification link.',
                verificationToken: emailVerificationToken,
                user: {
                    id: user._id,
                    username: user.username,
                    nickname: user.nickname,
                    avatar: user.avatar,
                    rank: user.rank,
                    xats: user.xats,
                    days: user.days,
                    email: user.email,
                    emailVerified: user.emailVerified
                }
            });
        } catch (error) {
            console.error('🎭 [SERVER] Register error:', error);
            res.status(500).json({ success: false, message: 'Server error' });
        }
    }
    
    async handleLogout(req, res) {
        try {
            // Clear any server-side session data if needed
            res.json({ success: true, message: 'Logged out successfully' });
    } catch (error) {
            console.error('🎭 [SERVER] Logout error:', error);
            res.status(500).json({ success: false, message: 'Logout failed' });
    }
  }

    async handleAuthStatus(req, res) {
    try {
            // Try to get token from Authorization header first, then from query parameter
            const token = req.headers.authorization?.replace('Bearer ', '') || req.query.token;
      
      if (!token) {
                return res.json({ authenticated: false });
            }
            
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
            const user = await User.findById(decoded.userId).select('-password');
            
            if (!user || !user.enabled) {
                return res.json({ authenticated: false });
            }
            
            res.json({ 
                authenticated: true, 
                user: {
                    id: user._id,
                    username: user.username,
                    nickname: user.nickname,
                    email: user.email,
                    rank: user.rank,
                    avatar: user.avatar,
                    xats: user.xats,
                    days: user.days
                }
            });
    } catch (error) {
            console.error('🎭 [SERVER] Auth status check error:', error);
            res.json({ authenticated: false });
        }
    }
    
    async handleVerifyEmail(req, res) {
        try {
            const { token } = req.query;
            
            if (!token) {
                return res.status(400).json({ success: false, message: 'Verification token required' });
            }
            
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
            const user = await User.findOne({ 
                username: decoded.userId,
                emailVerificationToken: token 
            });
            
            if (!user) {
                return res.status(400).json({ success: false, message: 'Invalid or expired verification token' });
            }
            
            // Verify the email
            user.emailVerified = true;
            user.enabled = true;
            user.emailVerificationToken = null;
            await user.save();
            
            res.json({ 
                success: true, 
                message: 'Email verified successfully! You can now log in.' 
            });
            
        } catch (error) {
            console.error('🎭 [SERVER] Email verification error:', error);
            res.status(400).json({ success: false, message: 'Invalid or expired verification token' });
        }
    }
    
    async handleUpdatePawn(req, res) {
        try {
            const token = req.headers.authorization?.replace('Bearer ', '');
            if (!token) {
                return res.status(401).json({ success: false, message: 'Authentication required' });
            }
            
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
            const { pawn } = req.body;
            
            const user = await User.findById(decoded.userId);
      if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' });
      }

            // Validate pawn format (hex color or 'off')
            if (pawn !== 'off' && !/^#[0-9A-Fa-f]{6}$/.test(pawn)) {
                return res.status(400).json({ success: false, message: 'Invalid pawn format. Use hex color (e.g., #000000) or "off"' });
      }

            user.custpawn = pawn === 'off' ? '' : pawn.substring(1); // Remove # for storage
      await user.save();

            res.json({ success: true, message: 'Custom pawn updated successfully' });
    } catch (error) {
            console.error('🎭 [SERVER] Update pawn error:', error);
            res.status(500).json({ success: false, message: 'Server error' });
        }
    }
    
    async handleUpdateBio(req, res) {
        try {
            const token = req.headers.authorization?.replace('Bearer ', '');
            if (!token) {
                return res.status(401).json({ success: false, message: 'Authentication required' });
            }
            
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
            const { bio } = req.body;
            
            const user = await User.findById(decoded.userId);
            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }

            user.desc = bio;
            await user.save();

            res.json({ success: true, message: 'Bio updated successfully' });
        } catch (error) {
            console.error('🎭 [SERVER] Update bio error:', error);
            res.status(500).json({ success: false, message: 'Server error' });
        }
    }

    async handleUserUpdate(req, res) {
        try {
            const token = req.headers.authorization?.replace('Bearer ', '');
            if (!token) {
                return res.status(401).json({ success: false, message: 'Authentication required' });
            }
            
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
            const { nickname, email, bio, avatar, pawn } = req.body;
            
            const user = await User.findById(decoded.userId);
            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }

            // Update fields if provided
            if (nickname) user.nickname = nickname;
            if (email) user.email = email;
            if (bio) user.desc = bio;
            if (avatar) user.avatar = avatar;
            if (pawn) {
                if (pawn === 'off') {
                    user.custpawn = '';
                } else if (/^#[0-9A-Fa-f]{6}$/.test(pawn)) {
                    user.custpawn = pawn.substring(1); // Remove # for storage
                }
            }

            await user.save();

            res.json({ 
                success: true, 
                message: 'Profile updated successfully',
                user: {
                    id: user._id,
                    username: user.username,
                    nickname: user.nickname,
                    email: user.email,
                    avatar: user.avatar,
                    rank: user.rank,
                    xats: user.xats,
                    days: user.days
                }
            });
        } catch (error) {
            console.error('🎭 [SERVER] User update error:', error);
            res.status(500).json({ success: false, message: 'Server error' });
        }
    }

    async handleChangePassword(req, res) {
        try {
            const token = req.headers.authorization?.replace('Bearer ', '');
            if (!token) {
                return res.status(401).json({ success: false, message: 'Authentication required' });
            }
            
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
            const { currentPassword, newPassword } = req.body;
            
            const user = await User.findById(decoded.userId);
            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }

            // Verify current password
            const isValid = await bcrypt.compare(currentPassword, user.password);
            if (!isValid) {
                return res.status(400).json({ success: false, message: 'Current password is incorrect' });
            }

            // Hash new password
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
            await user.save();

            res.json({ success: true, message: 'Password changed successfully' });
        } catch (error) {
            console.error('🎭 [SERVER] Change password error:', error);
            res.status(500).json({ success: false, message: 'Server error' });
        }
    }

    async handleDeleteAccount(req, res) {
        try {
            const token = req.headers.authorization?.replace('Bearer ', '');
            if (!token) {
                return res.status(401).json({ success: false, message: 'Authentication required' });
            }
            
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
            
            const user = await User.findById(decoded.userId);
            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }

            // Delete user
            await User.findByIdAndDelete(decoded.userId);

            res.json({ success: true, message: 'Account deleted successfully' });
        } catch (error) {
            console.error('🎭 [SERVER] Delete account error:', error);
            res.status(500).json({ success: false, message: 'Server error' });
        }
    }
    
    // Friends API handlers
    async handleGetFriends(req, res) {
        try {
            const token = req.headers.authorization?.replace('Bearer ', '') || req.query.token;
            if (!token) {
                return res.status(401).json({ success: false, message: 'No token provided' });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.userId).populate('friends', 'username nickname avatar lastSeen');
            
            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }

            res.json({ success: true, friends: user.friends });
    } catch (error) {
            console.error('🎭 [SERVER] Get friends error:', error);
            res.status(500).json({ success: false, message: 'Server error' });
    }
  }

    async handleAddFriend(req, res) {
    try {
            const token = req.headers.authorization?.replace('Bearer ', '') || req.query.token;
      if (!token) {
                return res.status(401).json({ success: false, message: 'No token provided' });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.userId);
      
      if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }

            const { friendUsername } = req.body;
            const friend = await User.findOne({ username: friendUsername });
            
            if (!friend) {
                return res.status(404).json({ success: false, message: 'Friend not found' });
            }

            if (user.friends.includes(friend._id)) {
                return res.status(400).json({ success: false, message: 'Already friends' });
            }

            user.friends.push(friend._id);
            await user.save();

            res.json({ success: true, message: 'Friend added successfully' });
              } catch (error) {
            console.error('🎭 [SERVER] Add friend error:', error);
            res.status(500).json({ success: false, message: 'Server error' });
        }
    }

    async handleRemoveFriend(req, res) {
        try {
            const token = req.headers.authorization?.replace('Bearer ', '') || req.query.token;
            if (!token) {
                return res.status(401).json({ success: false, message: 'No token provided' });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.userId);
      
      if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }

            const { friendId } = req.params;
            user.friends = user.friends.filter(id => id.toString() !== friendId);
      await user.save();

            res.json({ success: true, message: 'Friend removed successfully' });
    } catch (error) {
            console.error('🎭 [SERVER] Remove friend error:', error);
            res.status(500).json({ success: false, message: 'Server error' });
        }
    }

    // Visitors API handlers
    async handleGetVisitors(req, res) {
        try {
            // Get real visitors data from database
            const visitors = await User.find({ 
                lastSeen: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } // Last 24 hours
            }).select('username nickname avatar lastSeen').limit(10).sort({ lastSeen: -1 });
            
            const stats = {
                today: await User.countDocuments({ 
                    lastSeen: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } 
                }),
                week: await User.countDocuments({ 
                    lastSeen: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } 
                }),
                month: await User.countDocuments({ 
                    lastSeen: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } 
                })
            };

            res.json({ success: true, visitors, stats });
    } catch (error) {
            console.error('🎭 [SERVER] Get visitors error:', error);
            res.status(500).json({ success: false, message: 'Server error' });
        }
    }

    // Chat creation API handlers
    async handleCreateChat(req, res) {
        try {
            const { name, password, radio, background } = req.body;

            if (!name || !password) {
                return res.status(400).json({ success: false, message: 'Name and password required' });
            }

            if (name.length < 5 || name.length > 15) {
                return res.status(400).json({ success: false, message: 'Chat name must be 5-15 characters' });
            }

            if (password.length < 6) {
                return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
            }

            // In real implementation, this would create a new room in the database
            res.json({ success: true, message: 'Chat created successfully' });
    } catch (error) {
            console.error('🎭 [SERVER] Create chat error:', error);
            res.status(500).json({ success: false, message: 'Server error' });
        }
    }

    async handleGetRecentChats(req, res) {
        try {
            // Get real recent chats data from database
            const chats = await Room.find({}).select('name bg').limit(10).sort({ updatedAt: -1 });
            
            // Add user count for each room (this would be calculated from active connections in a real implementation)
            const chatsWithUserCount = chats.map(room => ({
                name: room.name,
                users: Math.floor(Math.random() * 20) + 1, // Placeholder until we implement real user counting
                bg: room.bg
            }));

            res.json({ success: true, chats: chatsWithUserCount });
        } catch (error) {
            console.error('🎭 [SERVER] Get recent chats error:', error);
            res.status(500).json({ success: false, message: 'Server error' });
        }
    }

    // Radio API handlers
    async handlePlayRadio(req, res) {
        try {
            const { url } = req.body;
            if (!url) {
                return res.status(400).json({ success: false, message: 'Radio URL required' });
            }

            // In real implementation, this would start playing radio in the room
            res.json({ success: true, message: 'Radio started playing' });
    } catch (error) {
            console.error('🎭 [SERVER] Play radio error:', error);
            res.status(500).json({ success: false, message: 'Server error' });
        }
    }

    async handleStopRadio(req, res) {
        try {
            // In real implementation, this would stop playing radio in the room
            res.json({ success: true, message: 'Radio stopped' });
        } catch (error) {
            console.error('🎭 [SERVER] Stop radio error:', error);
            res.status(500).json({ success: false, message: 'Server error' });
        }
    }
    
    // Moderation API handlers
    async handleModerationWarn(req, res) {
        try {
            const { targetUserId, chatRoomId, reason } = req.body;
            
            if (!targetUserId || !chatRoomId || !reason) {
                return res.status(400).json({ success: false, message: 'Missing required fields' });
            }
            
            // For now, return success (in real implementation, this would use the ModerationService)
            res.json({ 
                success: true, 
                message: 'Warning issued successfully',
                action: {
                    type: 'warning',
                    targetUser: targetUserId,
                    reason: reason,
                    timestamp: new Date()
                }
            });
        } catch (error) {
            console.error('🎭 [SERVER] Warning error:', error);
            res.status(500).json({ success: false, message: 'Server error' });
        }
    }
    
    async handleModerationMute(req, res) {
        try {
            const { targetUserId, chatRoomId, reason, duration = 15 } = req.body;
            
            if (!targetUserId || !chatRoomId || !reason) {
                return res.status(400).json({ success: false, message: 'Missing required fields' });
            }
            
            res.json({ 
                success: true, 
                message: 'User muted successfully',
                action: {
                    type: 'mute',
                    targetUser: targetUserId,
                    reason: reason,
                    duration: duration,
                    timestamp: new Date()
                }
            });
        } catch (error) {
            console.error('🎭 [SERVER] Mute error:', error);
            res.status(500).json({ success: false, message: 'Server error' });
        }
    }
    
    async handleModerationBan(req, res) {
        try {
            const { targetUserId, chatRoomId, reason, duration = 1440 } = req.body;
            
            if (!targetUserId || !chatRoomId || !reason) {
                return res.status(400).json({ success: false, message: 'Missing required fields' });
            }
            
            res.json({ 
                success: true, 
                message: 'User banned successfully',
                action: {
                    type: 'ban',
                    targetUser: targetUserId,
                    reason: reason,
                    duration: duration,
                    timestamp: new Date()
                }
            });
        } catch (error) {
            console.error('🎭 [SERVER] Ban error:', error);
            res.status(500).json({ success: false, message: 'Server error' });
        }
    }
    
    async handleModerationKick(req, res) {
        try {
            const { targetUserId, chatRoomId, reason } = req.body;
            
            if (!targetUserId || !chatRoomId || !reason) {
                return res.status(400).json({ success: false, message: 'Missing required fields' });
            }
            
            res.json({ 
                success: true, 
                message: 'User kicked successfully',
                action: {
                    type: 'kick',
                    targetUser: targetUserId,
                    reason: reason,
                    timestamp: new Date()
                }
            });
        } catch (error) {
            console.error('🎭 [SERVER] Kick error:', error);
            res.status(500).json({ success: false, message: 'Server error' });
        }
    }
    
    async handleGetModerationHistory(req, res) {
        try {
            const { userId } = req.params;
            
            // Mock moderation history (in real implementation, this would come from database)
            const history = [
                {
                    type: 'warning',
                    reason: 'Spam',
                    moderator: 'Admin',
                    timestamp: new Date(Date.now() - 86400000), // 1 day ago
                    status: 'active'
                }
            ];
            
            res.json({ success: true, history });
        } catch (error) {
            console.error('🎭 [SERVER] Get moderation history error:', error);
            res.status(500).json({ success: false, message: 'Server error' });
        }
    }
    
    async handleGetActiveModerationActions(req, res) {
        try {
            const { userId } = req.params;
            
            // Mock active actions (in real implementation, this would come from database)
            const actions = [];
            
            res.json({ success: true, actions });
        } catch (error) {
            console.error('🎭 [SERVER] Get active moderation actions error:', error);
            res.status(500).json({ success: false, message: 'Server error' });
        }
    }
    
    async handleGetOnlineUsers(req, res) {
        try {
            // Get real online users from server state
            const onlineUsers = Array.from(this.users.values()).map(user => ({
                id: user.id,
                username: user.username,
                nickname: user.nickname,
                avatar: user.avatar,
                rank: user.rank || 5,
                guest: user.guest || false,
                xats: user.xats || 0,
                days: user.days || 0
            }));
            
            res.json({ success: true, users: onlineUsers });
        } catch (error) {
            console.error('🎭 [SERVER] Get online users error:', error);
            res.status(500).json({ success: false, message: 'Server error' });
        }
    }
    
    async handleGetUserPowers(req, res) {
        try {
            // Get real user powers from database
            const token = req.headers.authorization?.replace('Bearer ', '') || req.query.token;
            
            if (!token) {
                return res.status(401).json({ success: false, message: 'Authentication required' });
            }
            
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
            const user = await User.findById(decoded.userId);
            
            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }
            
            const userPowers = await UserPower.find({ user: user._id, active: true })
                .populate('power')
                .select('power purchasedAt purchasedFor');
            
            const powers = userPowers.map(up => ({
                id: up.power.id,
                name: up.power.name,
                cost: up.power.cost,
                category: up.power.section,
                purchasedAt: up.purchasedAt,
                purchasedFor: up.purchasedFor
            }));
            
            res.json({ success: true, powers });
        } catch (error) {
            console.error('🎭 [SERVER] Get user powers error:', error);
            res.status(500).json({ success: false, message: 'Server error' });
        }
    }
    
    
    async init() {
        const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ixat';
        try {
            // Connect once at startup
            await mongoose.connect(uri, {
                serverSelectionTimeoutMS: 5000,
            });
            this.dbConnected = true;
            console.log(`🎭 [SERVER] ShadowNet MongoDB connected at ${uri}`);
            
            // Warm-up: compute powers count (non-fatal if collection missing)
            try {
                const count = await Power.countDocuments();
                this.config.pcount = count;
                console.log(`🎭 [SERVER] Powers count: ${count}`);
            } catch (err) {
                console.warn('🎭 [SERVER] Could not count powers:', err.message);
            }
        } catch (err) {
            this.dbConnected = false;
            console.error('🎭 [SERVER] MongoDB connection failed:', err.message);
            console.error('🎭 [SERVER] Running in limited mode (no database).');
        }
    }
    
    start(port = 8000) {
        this.server.listen(port, () => {
            console.log(`🎭 [SERVER] ShadowNet Server running on port ${port}`);
            console.log(`🎭 [SERVER] Server hash: ${this.hash}`);
            console.log(`🎭 [SERVER] Powers count: ${this.config.pcount}`);
        });
  }
}

module.exports = IxatServer;

// Start the server
const server = new IxatServer();
(async () => {
  await server.init();
  server.start(process.env.PORT ? parseInt(process.env.PORT,10) : 8000);
})();
