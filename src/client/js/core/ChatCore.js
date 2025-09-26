/**
 * ChatCore - Main chat functionality
 * Handles messaging, user management, and core chat features
 */
class ChatCore {
    constructor() {
        this.socket = null;
        this.currentUser = null;
        this.isConnected = false;
        this.messages = [];
        this.users = [];
        this.currentRoom = 'main';
        this.initialized = false;
        this.moduleName = 'ChatCore';
        this.messageBuffer = new Map(); // For message deduplication
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
    }

    /**
     * Initialize ChatCore
     */
    init() {
        if (this.initialized) {
            logger.debug(this.moduleName, 'Already initialized');
            return;
        }

        const startTime = performance.now();
        
        try {
            this.initializeSocket();
            this.setupEventListeners();
            this.initializeUI();
            this.initialized = true;
            
            logger.timing(this.moduleName, 'Initialization', startTime);
            logger.info(this.moduleName, 'Initialized successfully');
        } catch (error) {
            logger.error(this.moduleName, 'Error initializing:', error);
            throw error;
        }
    }

    /**
     * Initialize socket connection
     */
    initializeSocket() {
        if (typeof io === 'undefined') {
            logger.error(this.moduleName, 'Socket.IO not loaded - please include the Socket.IO client library');
            throw new Error('Socket.IO client library not found');
        }

        this.socket = io({
            transports: ['websocket', 'polling'], // Prefer websocket
            upgrade: true,
            timeout: 20000,
            forceNew: true
        });
        
        this.socket.on('connect', () => {
            logger.info(this.moduleName, 'Connected to server');
            this.isConnected = true;
            this.reconnectAttempts = 0;
            this.updateConnectionStatus(true);
        });

        this.socket.on('disconnect', (reason) => {
            logger.warn(this.moduleName, `Disconnected from server: ${reason}`);
            this.isConnected = false;
            this.updateConnectionStatus(false);
            
            // Attempt reconnection for client-side disconnects
            if (reason === 'io client disconnect') {
                this.attemptReconnect();
            }
        });

        this.socket.on('connect_error', (error) => {
            logger.error(this.moduleName, 'Connection error:', error);
            this.attemptReconnect();
        });

        this.socket.on('message', (data) => {
            this.handleMessage(data);
        });

        this.socket.on('user-joined', (data) => {
            this.handleUserJoined(data);
        });

        this.socket.on('user-left', (data) => {
            this.handleUserLeft(data);
        });

        this.socket.on('user-list', (data) => {
            this.updateUserList(data.users);
        });

        this.socket.on('error', (error) => {
            console.error('Socket error:', error);
            this.showNotification('Connection error: ' + error.message, 'error');
        });
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Message input handling
        const messageInput = document.getElementById('messageInput');
        if (messageInput) {
            messageInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });
        }

        // Send button
        const sendBtn = document.getElementById('sendBtn');
        if (sendBtn) {
            sendBtn.addEventListener('click', () => {
                this.sendMessage();
            });
        }

        // Menu toggle
        const menuToggle = document.getElementById('menuToggle');
        if (menuToggle) {
            menuToggle.addEventListener('click', () => {
                this.toggleSidebar();
            });
        }

        // User list toggle
        const userMenuBtn = document.getElementById('userMenuBtn');
        if (userMenuBtn) {
            userMenuBtn.addEventListener('click', () => {
                this.toggleUserList();
            });
        }
    }

    /**
     * Initialize UI components
     */
    initializeUI() {
        this.updateOnlineCount(0);
        this.addWelcomeMessage();
    }

    /**
     * Send message
     */
    sendMessage() {
        const messageInput = document.getElementById('messageInput');
        if (!messageInput || !this.isConnected) return;

        const message = messageInput.value.trim();
        if (!message) return;

        // Create message object
        const messageData = {
            text: message,
            timestamp: Date.now(),
            room: this.currentRoom
        };

        // Send to server
        this.socket.emit('message', messageData);

        // Clear input
        messageInput.value = '';

        // Add to local messages (optimistic update)
        this.addMessage({
            ...messageData,
            user: this.currentUser || { name: 'You', avatar: 'default' },
            isOwn: true
        });
    }

    /**
     * Handle incoming message
     */
    handleMessage(data) {
        this.addMessage(data);
    }

    /**
     * Add message to chat
     */
    addMessage(messageData) {
        const messagesContainer = document.getElementById('messages');
        if (!messagesContainer) return;

        const messageElement = this.createMessageElement(messageData);
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // Store message
        this.messages.push(messageData);
    }

    /**
     * Create message element
     */
    createMessageElement(messageData) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${messageData.isOwn ? 'own' : 'other'}`;

        const time = new Date(messageData.timestamp).toLocaleTimeString();
        
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <img src="${messageData.user.avatar || 'default-avatar.png'}" alt="${messageData.user.name}">
            </div>
            <div class="message-content">
                <div class="message-header">
                    <span class="message-username">${messageData.user.name}</span>
                    <span class="message-time">${time}</span>
                </div>
                <div class="message-text">${this.formatMessage(messageData.text)}</div>
            </div>
        `;

        return messageDiv;
    }

    /**
     * Format message text (handle links, mentions, etc.)
     */
    formatMessage(text) {
        // Convert URLs to links
        text = text.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');
        
        // Convert mentions to highlighted text
        text = text.replace(/@(\w+)/g, '<span class="mention">@$1</span>');
        
        return text;
    }

    /**
     * Handle user joined
     */
    handleUserJoined(data) {
        this.showNotification(`${data.user.name} joined the chat`, 'info');
        this.updateUserList(data.users);
    }

    /**
     * Handle user left
     */
    handleUserLeft(data) {
        this.showNotification(`${data.user.name} left the chat`, 'info');
        this.updateUserList(data.users);
    }

    /**
     * Update user list
     */
    updateUserList(users) {
        this.users = users;
        this.updateOnlineCount(users.length);
        this.renderUserList(users);
    }

    /**
     * Render user list
     */
    renderUserList(users) {
        const userListContent = document.getElementById('userListContent');
        if (!userListContent) return;

        userListContent.innerHTML = '';

        users.forEach(user => {
            const userElement = document.createElement('div');
            userElement.className = 'user-item';
            userElement.innerHTML = `
                <div class="user-avatar">
                    <img src="${user.avatar || 'default-avatar.png'}" alt="${user.name}">
                </div>
                <div class="user-info">
                    <div class="user-name">${user.name}</div>
                    <div class="user-status">${user.status || 'Online'}</div>
                </div>
            `;
            userListContent.appendChild(userElement);
        });
    }

    /**
     * Update online count
     */
    updateOnlineCount(count) {
        const onlineCount = document.getElementById('onlineCount');
        if (onlineCount) {
            onlineCount.textContent = `${count} online`;
        }
    }

    /**
     * Update connection status
     */
    updateConnectionStatus(connected) {
        const chatTitle = document.getElementById('chatTitle');
        if (chatTitle) {
            chatTitle.textContent = connected ? 'Main Chat' : 'Main Chat (Disconnected)';
        }
    }

    /**
     * Toggle sidebar
     */
    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
            sidebar.classList.toggle('hidden');
        }
    }

    /**
     * Toggle user list
     */
    toggleUserList() {
        const userList = document.getElementById('userList');
        if (userList) {
            userList.classList.toggle('hidden');
        }
    }

    /**
     * Add welcome message
     */
    addWelcomeMessage() {
        const welcomeMessage = {
            text: 'Welcome to the chat! Type a message to get started.',
            timestamp: Date.now(),
            user: { name: 'System', avatar: 'system-avatar.png' },
            isOwn: false,
            isSystem: true
        };
        this.addMessage(welcomeMessage);
    }

    /**
     * Show notification
     */
    showNotification(message, type = 'info') {
        if (window.notificationSystem) {
            window.notificationSystem.show(message, type);
        } else {
            console.log(`[${type.toUpperCase()}] ${message}`);
        }
    }

    /**
     * Get current user
     */
    getCurrentUser() {
        return this.currentUser;
    }

    /**
     * Set current user
     */
    setCurrentUser(user) {
        this.currentUser = user;
    }

    /**
     * Get connection status
     */
    isConnectedToServer() {
        return this.isConnected;
    }

    /**
     * Cleanup and destroy
     */
    destroy() {
        if (this.socket) {
            this.socket.disconnect();
        }
        this.initialized = false;
        console.log('✅ ChatCore destroyed');
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ChatCore;
} else if (typeof window !== 'undefined') {
    window.ChatCore = ChatCore;
}
