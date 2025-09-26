/**
 * XatInterface - Main controller for authentic xat.com experience
 * Manages the complete xat interface including chat, powers, pawns, and animations
 */

class XatInterface {
    constructor() {
        this.socket = null;
        this.currentUser = null;
        this.currentRoom = 'main';
        this.isConnected = false;
        
        // System components
        this.chatSystem = null;
        this.powerSystem = null;
        this.pawnSystem = null;
        this.animationEngine = null;
        this.userInterface = null;
        this.storeInterface = null;
        this.moderationInterface = null;
        
        // UI elements
        this.elements = {
            chatMessages: null,
            chatInput: null,
            sendButton: null,
            usersList: null,
            powersBar: null,
            pawnDisplay: null
        };
        
        // State
        this.users = new Map();
        this.messages = [];
        this.activePowers = new Set();
        this.ownedPawns = new Set();
        
        this.moduleName = 'XatInterface';
    }

    /**
     * Initialize the complete xat interface
     */
    init() {
        logger.info(this.moduleName, 'Initializing xat interface...');
        
        try {
            this.setupElements();
            this.initializeSystems();
            this.setupEventListeners();
            this.connectToServer();
            this.loadUserData();
            
            logger.info(this.moduleName, 'xat interface initialized successfully');
        } catch (error) {
            logger.error(this.moduleName, 'Failed to initialize:', error);
            throw error;
        }
    }

    /**
     * Setup DOM element references
     */
    setupElements() {
        this.elements = {
            chatMessages: document.getElementById('chat-messages'),
            chatInput: document.getElementById('chat-input'),
            sendButton: document.getElementById('send-button'),
            usersList: document.getElementById('user-list'),
            powersBar: document.querySelector('.powers-bar'),
            pawnDisplay: document.getElementById('pawn-display'),
            roomName: document.getElementById('roomName'),
            userCount: document.getElementById('userCount'),
            userXats: document.getElementById('userXats'),
            userDays: document.getElementById('userDays'),
            userAvatar: document.getElementById('userAvatar')
        };

        // Verify all elements exist
        for (const [name, element] of Object.entries(this.elements)) {
            if (!element) {
                logger.warn(this.moduleName, `Element not found: ${name}`);
            }
        }
    }

    /**
     * Initialize system components
     */
    initializeSystems() {
        // Initialize chat system
        this.chatSystem = new ChatSystem(this);
        
        // Initialize power system
        this.powerSystem = new PowerSystem(this);
        
        // Initialize pawn system
        this.pawnSystem = new PawnSystem(this);
        
        // Initialize animation engine
        this.animationEngine = new AnimationEngine(this);
        
        // Initialize user interface
        this.userInterface = new UserInterface(this);
        
        // Initialize store interface
        this.storeInterface = new StoreInterface(this);
        
        // Initialize moderation interface
        this.moderationInterface = new ModerationInterface(this);
        
        logger.debug(this.moduleName, 'All systems initialized');
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Chat input events
        if (this.elements.chatInput) {
            this.elements.chatInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });
        }

        if (this.elements.sendButton) {
            this.elements.sendButton.addEventListener('click', () => {
                this.sendMessage();
            });
        }

        // Smiley bar events
        document.querySelectorAll('.smiley').forEach(smiley => {
            smiley.addEventListener('click', (e) => {
                this.insertSmiley(e.target.textContent);
            });
        });

        // Power slots events
        document.querySelectorAll('.power-slot').forEach(slot => {
            slot.addEventListener('click', (e) => {
                const power = e.target.dataset.power;
                if (power) {
                    this.activatePower(power);
                }
            });
        });

        // Window events
        window.addEventListener('beforeunload', () => {
            if (this.socket) {
                this.socket.disconnect();
            }
        });

        // Visibility events for optimizing animations
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.animationEngine?.pause();
            } else {
                this.animationEngine?.resume();
            }
        });
    }

    /**
     * Connect to the chat server
     */
    connectToServer() {
        if (typeof io === 'undefined') {
            logger.error(this.moduleName, 'Socket.IO not loaded');
            return;
        }

        this.socket = io({
            transports: ['websocket', 'polling'],
            upgrade: true,
            timeout: 20000
        });

        // Connection events
        this.socket.on('connect', () => {
            logger.info(this.moduleName, 'Connected to server');
            this.isConnected = true;
            this.updateConnectionStatus(true);
        });

        this.socket.on('disconnect', (reason) => {
            logger.warn(this.moduleName, `Disconnected: ${reason}`);
            this.isConnected = false;
            this.updateConnectionStatus(false);
        });

        this.socket.on('connect_error', (error) => {
            logger.error(this.moduleName, 'Connection error:', error);
        });

        // Chat events
        this.socket.on('message', (data) => {
            this.chatSystem.handleIncomingMessage(data);
        });

        this.socket.on('user_joined', (data) => {
            this.handleUserJoined(data);
        });

        this.socket.on('user_left', (data) => {
            this.handleUserLeft(data);
        });

        this.socket.on('user_list', (data) => {
            this.handleUserList(data);
        });

        this.socket.on('power_used', (data) => {
            this.powerSystem.handlePowerUsed(data);
        });
    }

    /**
     * Load user data and preferences
     */
    async loadUserData() {
        try {
            // Load user profile
            const token = localStorage.getItem('authToken');
            if (token) {
                const response = await fetch('/api/user/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    this.currentUser = await response.json();
                    this.updateUserDisplay();
                    await this.loadUserPowers();
                    await this.loadUserPawns();
                }
            }
        } catch (error) {
            logger.warn(this.moduleName, 'Failed to load user data:', error);
        }
    }

    /**
     * Load user's owned powers
     */
    async loadUserPowers() {
        try {
            const response = await fetch('/api/user/powers', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            });

            if (response.ok) {
                const powers = await response.json();
                this.powerSystem.setOwnedPowers(powers);
            }
        } catch (error) {
            logger.warn(this.moduleName, 'Failed to load user powers:', error);
        }
    }

    /**
     * Load user's owned pawns
     */
    async loadUserPawns() {
        try {
            const response = await fetch('/api/user/pawns', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            });

            if (response.ok) {
                const pawns = await response.json();
                this.pawnSystem.setOwnedPawns(pawns);
            }
        } catch (error) {
            logger.warn(this.moduleName, 'Failed to load user pawns:', error);
        }
    }

    /**
     * Send a chat message
     */
    sendMessage() {
        if (!this.elements.chatInput) return;

        const text = this.elements.chatInput.value.trim();
        if (!text) return;

        // Apply active power effects to the message
        const processedMessage = this.powerSystem.processMessage(text);

        const messageData = {
            text: processedMessage,
            user: this.currentUser,
            timestamp: Date.now(),
            room: this.currentRoom,
            effects: Array.from(this.activePowers)
        };

        // Send to server
        if (this.socket && this.isConnected) {
            this.socket.emit('message', messageData);
        }

        // Clear input
        this.elements.chatInput.value = '';
        
        // Clear single-use powers
        this.powerSystem.clearSingleUsePowers();
    }

    /**
     * Insert smiley at cursor position
     */
    insertSmiley(smiley) {
        if (!this.elements.chatInput) return;

        const input = this.elements.chatInput;
        const start = input.selectionStart;
        const end = input.selectionEnd;
        const text = input.value;

        input.value = text.substring(0, start) + smiley + text.substring(end);
        input.selectionStart = input.selectionEnd = start + smiley.length;
        input.focus();
    }

    /**
     * Activate a power
     */
    activatePower(powerName) {
        this.powerSystem.activatePower(powerName);
    }

    /**
     * Handle user joined event
     */
    handleUserJoined(data) {
        this.users.set(data.user.id, data.user);
        this.updateUsersList();
        this.chatSystem.addSystemMessage(`${data.user.username} joined the chat`);
        
        logger.debug(this.moduleName, 'User joined:', data.user.username);
    }

    /**
     * Handle user left event
     */
    handleUserLeft(data) {
        this.users.delete(data.user.id);
        this.updateUsersList();
        this.chatSystem.addSystemMessage(`${data.user.username} left the chat`);
        
        logger.debug(this.moduleName, 'User left:', data.user.username);
    }

    /**
     * Handle user list update
     */
    handleUserList(data) {
        this.users.clear();
        data.users.forEach(user => {
            this.users.set(user.id, user);
        });
        this.updateUsersList();
        this.updateUserCount();
    }

    /**
     * Update users list display
     */
    updateUsersList() {
        const lists = {
            owners: document.getElementById('owners-list'),
            moderators: document.getElementById('moderators-list'),
            members: document.getElementById('members-list'),
            guests: document.getElementById('guests-list')
        };

        // Clear all lists
        Object.values(lists).forEach(list => {
            if (list) list.innerHTML = '';
        });

        // Sort users by rank
        const sortedUsers = Array.from(this.users.values()).sort((a, b) => {
            const rankOrder = { owner: 0, moderator: 1, member: 2, guest: 3 };
            return rankOrder[a.rank] - rankOrder[b.rank];
        });

        // Add users to appropriate lists
        sortedUsers.forEach(user => {
            const listId = user.rank === 'owner' ? 'owners' : 
                          user.rank === 'moderator' ? 'moderators' :
                          user.rank === 'member' ? 'members' : 'guests';
            
            const list = lists[listId];
            if (list) {
                const userElement = this.createUserElement(user);
                list.appendChild(userElement);
            }
        });
    }

    /**
     * Create user element for the user list
     */
    createUserElement(user) {
        const userDiv = document.createElement('div');
        userDiv.className = 'user-item';
        userDiv.dataset.userId = user.id;

        // Add pawn if user has one
        if (user.pawn && user.pawn !== 'none') {
            const pawnDiv = document.createElement('div');
            pawnDiv.className = `user-pawn pawn-${user.pawn}`;
            userDiv.appendChild(pawnDiv);
        }

        // Add username
        const nameSpan = document.createElement('span');
        nameSpan.className = 'user-name';
        nameSpan.textContent = user.username;
        userDiv.appendChild(nameSpan);

        // Add click event for user profile
        userDiv.addEventListener('click', () => {
            this.showUserProfile(user);
        });

        return userDiv;
    }

    /**
     * Update user count display
     */
    updateUserCount() {
        const count = this.users.size;
        if (this.elements.userCount) {
            this.elements.userCount.textContent = `${count} user${count !== 1 ? 's' : ''}`;
        }

        // Update online count in user list
        const onlineCount = document.getElementById('onlineCount');
        if (onlineCount) {
            onlineCount.textContent = count;
        }
    }

    /**
     * Update user display in header
     */
    updateUserDisplay() {
        if (!this.currentUser) return;

        if (this.elements.userXats) {
            this.elements.userXats.textContent = this.currentUser.xats || 0;
        }

        if (this.elements.userDays) {
            this.elements.userDays.textContent = this.currentUser.days || 0;
        }

        if (this.elements.userAvatar) {
            this.elements.userAvatar.src = `assets/images/avatar/${this.currentUser.avatar || 0}.png`;
        }
    }

    /**
     * Update connection status
     */
    updateConnectionStatus(connected) {
        const indicator = document.querySelector('.connection-indicator');
        if (indicator) {
            indicator.className = `connection-indicator ${connected ? 'connected' : 'disconnected'}`;
            indicator.title = connected ? 'Connected' : 'Disconnected';
        }
    }

    /**
     * Show user profile modal
     */
    showUserProfile(user) {
        // Implementation for user profile modal
        logger.debug(this.moduleName, 'Show profile for user:', user.username);
    }

    /**
     * Get current timestamp formatted for chat
     */
    getFormattedTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `[${hours}:${minutes}]`;
    }

    /**
     * Destroy the interface and clean up
     */
    destroy() {
        if (this.socket) {
            this.socket.disconnect();
        }

        if (this.animationEngine) {
            this.animationEngine.destroy();
        }

        logger.info(this.moduleName, 'Interface destroyed');
    }
}

// Make available globally
if (typeof window !== 'undefined') {
    window.XatInterface = XatInterface;
}