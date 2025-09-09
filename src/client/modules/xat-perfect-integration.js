/**
 * Xat Perfect Integration System
 * 
 * This is the ULTIMATE integration that brings together:
 * - Ixat Server (ixatServer.js)
 * - Chat Interface (embed.html)
 * - All Flash-to-JavaScript conversions
 * - Modernized Ixat Files JavaScript
 * - Performance optimization
 * - Memory management
 * - Event system
 * - State synchronization
 */

class XatPerfectIntegration {
    constructor() {
        this.server = null;
        this.chatInterface = null;
        this.flashModules = {};
        this.ixatModules = {};
        this.isInitialized = false;
        this.performanceMonitor = new PerformanceMonitor();
        this.memoryManager = new MemoryManager();
        this.eventSystem = new EventSystem();
        this.stateManager = new StateManager();
        
        this.init();
    }

    /**
     * Initialize the perfect integration system
     */
    async init() {
        try {
            console.log('🚀 [PERFECT] Starting Xat Perfect Integration...');
            this.performanceMonitor.start('total_initialization');
            
            // Initialize core systems
            await this.initializeCoreSystems();
            
            // Initialize Flash-to-JS modules
            await this.initializeFlashModules();
            
            // Initialize Ixat modules
            await this.initializeIxatModules();
            
            // Setup perfect integration
            this.setupPerfectIntegration();
            
            // Connect to server
            await this.connectToServer();
            
            // Initialize chat interface
            await this.initializeChatInterface();
            
            this.isInitialized = true;
            this.performanceMonitor.end('total_initialization');
            console.log('🎉 [PERFECT] Xat Perfect Integration completed successfully!');
            console.log(`⚡ Total initialization time: ${this.performanceMonitor.getDuration('total_initialization')}ms`);
            
        } catch (error) {
            console.error('❌ [PERFECT] Integration failed:', error);
            this.handleInitializationError(error);
        }
    }

    /**
     * Initialize core systems
     */
    async initializeCoreSystems() {
        console.log('🔧 [PERFECT] Initializing core systems...');
        
        // Initialize performance monitoring
        this.performanceMonitor.init();
        
        // Initialize memory management
        this.memoryManager.init();
        
        // Initialize event system
        this.eventSystem.init();
        
        // Initialize state manager
        this.stateManager.init();
        
        console.log('✅ [PERFECT] Core systems initialized');
    }

    /**
     * Initialize Flash-to-JavaScript modules
     */
    async initializeFlashModules() {
        console.log('🎭 [PERFECT] Initializing Flash-to-JS modules...');
        
        // Longer delay to ensure all scripts have loaded
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Debug: Check if scripts are loaded
        console.log('🔍 [PERFECT] Checking script loading status:');
        const scripts = document.querySelectorAll('script[src*="js/"]');
        scripts.forEach(script => {
            console.log(`  - Script: ${script.src} - Loaded: ${script.readyState || 'unknown'}`);
        });
        
        try {
            // Load and initialize all Flash-to-JS conversions
            const flashModules = [
                'xload', 'todo', 'xconst', 'main', 'chat', 'network', 'more',
                'xatsat', 'p1pwn', 'maintimeline', 'messages', 'smilies'
            ];
            
            for (const moduleName of flashModules) {
                try {
                    const module = await this.loadFlashModule(moduleName);
                    if (module) {
                        this.flashModules[moduleName] = module;
                        console.log(`✅ [PERFECT] Loaded Flash module: ${moduleName}`);
                    }
                } catch (error) {
                    console.warn(`⚠️ [PERFECT] Failed to load Flash module ${moduleName}:`, error);
                }
            }
            
            console.log(`✅ [PERFECT] Flash modules initialized: ${Object.keys(this.flashModules).length} modules`);
            
        } catch (error) {
            console.error('❌ [PERFECT] Flash modules initialization failed:', error);
        }
    }

    /**
     * Initialize Ixat modules
     */
    async initializeIxatModules() {
        console.log('🎯 [PERFECT] Initializing Ixat modules...');
        
        try {
            // Load modernized Ixat Files JavaScript
            const ixatModules = [
                'script-modern', 'trade-modern', 'x4t-modern', 'xat-integration'
            ];
            
            for (const moduleName of ixatModules) {
                try {
                    const module = await this.loadIxatModule(moduleName);
                    if (module) {
                        this.ixatModules[moduleName] = module;
                        console.log(`✅ [PERFECT] Loaded Ixat module: ${moduleName}`);
                    } else {
                        console.log(`ℹ️ [PERFECT] Ixat module ${moduleName} not found (optional)`);
                    }
                } catch (error) {
                    console.log(`ℹ️ [PERFECT] Ixat module ${moduleName} not available (optional)`);
                }
            }
            
            console.log(`✅ [PERFECT] Ixat modules initialized: ${Object.keys(this.ixatModules).length} modules`);
            
        } catch (error) {
            console.error('❌ [PERFECT] Ixat modules initialization failed:', error);
        }
    }

    /**
     * Setup perfect integration between all components
     */
    setupPerfectIntegration() {
        console.log('🔗 [PERFECT] Setting up perfect integration...');
        
        // Connect Flash modules with Ixat modules
        this.connectFlashWithIxat();
        
        // Setup event bridges
        this.setupEventBridges();
        
        // Setup state synchronization
        this.setupStateSynchronization();
        
        // Setup performance monitoring
        this.setupPerformanceMonitoring();
        
        // Setup memory management
        this.setupMemoryManagement();
        
        console.log('✅ [PERFECT] Perfect integration setup completed');
    }

    /**
     * Connect Flash modules with Ixat modules
     */
    connectFlashWithIxat() {
        console.log('🔗 [PERFECT] Connecting Flash with Ixat modules...');
        
        // Connect xload with script-modern
        if (this.flashModules.xload && this.ixatModules['script-modern']) {
            this.flashModules.xload.setIxatIntegration(this.ixatModules['script-modern']);
            console.log('✅ [PERFECT] Connected xload with script-modern');
        }
        
        // Connect todo with xat-integration
        if (this.flashModules.todo && this.ixatModules['xat-integration']) {
            this.flashModules.todo.setIntegration(this.ixatModules['xat-integration']);
            console.log('✅ [PERFECT] Connected todo with xat-integration');
        }
        
        // Connect messages with smilies - use global instances directly
        if (window.smilieSystem) {
            // Ensure xMessage instance exists
            if (!window.xMessage && window.createXMessageInstance) {
                console.log('🔧 [PERFECT] Creating xMessage instance');
                window.createXMessageInstance();
            }
            
            if (window.xMessage && typeof window.xMessage.setSmilies === 'function') {
                window.xMessage.setSmilies(window.smilieSystem);
                console.log('✅ [PERFECT] Connected messages with smilies using global instances');
            } else {
                console.warn('⚠️ [PERFECT] setSmilies method not found on global xMessage');
            }
        } else {
            console.warn('⚠️ [PERFECT] smilieSystem not available');
        }
        
        // Connect main with chat - use global instances directly
        if (window.main && window.chat) {
            console.log('🔍 [PERFECT] Using global instances for main and chat');
            if (typeof window.main.setChat === 'function') {
                window.main.setChat(window.chat);
                console.log('✅ [PERFECT] Connected main with chat using global instances');
            } else {
                console.warn('⚠️ [PERFECT] setChat method not found on global main');
            }
        } else {
            console.warn('⚠️ [PERFECT] Global instances not available - window.main:', !!window.main, 'window.chat:', !!window.chat);
            // Try to create the instance if the class exists
            if (window.Main && !window.main) {
                console.log('🔧 [PERFECT] Creating main instance from class');
                window.main = new window.Main();
                if (window.chat && typeof window.main.setChat === 'function') {
                    window.main.setChat(window.chat);
                    console.log('✅ [PERFECT] Connected main with chat after creating instance');
                }
            }
        }
    }

    /**
     * Setup event bridges between modules
     */
    setupEventBridges() {
        console.log('🌉 [PERFECT] Setting up event bridges...');
        
        // Bridge Flash events to Ixat events
        this.eventSystem.addEventListener('flash_message', (data) => {
            this.eventSystem.dispatchEvent('ixat_message', data);
        });
        
        this.eventSystem.addEventListener('flash_user_join', (data) => {
            this.eventSystem.dispatchEvent('ixat_user_join', data);
        });
        
        this.eventSystem.addEventListener('flash_user_leave', (data) => {
            this.eventSystem.dispatchEvent('ixat_user_leave', data);
        });
        
        // Bridge Ixat events to Flash events
        this.eventSystem.addEventListener('ixat_power_used', (data) => {
            this.eventSystem.dispatchEvent('flash_power_used', data);
        });
        
        this.eventSystem.addEventListener('ixat_trade_completed', (data) => {
            this.eventSystem.dispatchEvent('flash_trade_completed', data);
        });
        
        console.log('✅ [PERFECT] Event bridges setup completed');
    }

    /**
     * Setup state synchronization
     */
    setupStateSynchronization() {
        console.log('🔄 [PERFECT] Setting up state synchronization...');
        
        // Sync user state
        this.stateManager.subscribe('user', (newUser, oldUser) => {
            this.syncUserState(newUser, oldUser);
        });
        
        // Sync chat state
        this.stateManager.subscribe('chat', (newChat, oldChat) => {
            this.syncChatState(newChat, oldChat);
        });
        
        // Sync powers state
        this.stateManager.subscribe('powers', (newPowers, oldPowers) => {
            this.syncPowersState(newPowers, oldPowers);
        });
        
        console.log('✅ [PERFECT] State synchronization setup completed');
    }

    /**
     * Connect to Ixat server
     */
    async connectToServer() {
        console.log('🔌 [PERFECT] Connecting to Ixat server...');
        
        try {
            // Initialize socket connection
            this.socket = io();
            
            // Setup server event handlers
            this.setupServerEventHandlers();
            
            // Wait for connection
            await this.waitForConnection();
            
            console.log('✅ [PERFECT] Connected to Ixat server');
            
        } catch (error) {
            console.error('❌ [PERFECT] Failed to connect to server:', error);
            throw error;
        }
    }

    /**
     * Setup server event handlers
     */
    setupServerEventHandlers() {
        console.log('📡 [PERFECT] Setting up server event handlers...');
        
        this.socket.on('connect', () => {
            console.log('🔌 [PERFECT] Connected to server');
            this.eventSystem.dispatchEvent('server_connected', { socketId: this.socket.id });
        });
        
        this.socket.on('disconnect', () => {
            console.log('🔌 [PERFECT] Disconnected from server');
            this.eventSystem.dispatchEvent('server_disconnected', {});
        });
        
        this.socket.on('message', (data) => {
            this.handleServerMessage(data);
        });
        
        this.socket.on('userList', (data) => {
            this.handleUserList(data);
        });
        
        this.socket.on('userJoined', (data) => {
            this.handleUserJoined(data);
        });
        
        this.socket.on('userLeft', (data) => {
            this.handleUserLeft(data);
        });
        
        console.log('✅ [PERFECT] Server event handlers setup completed');
    }

    /**
     * Initialize chat interface
     */
    async initializeChatInterface() {
        console.log('💬 [PERFECT] Initializing chat interface...');
        
        try {
            // Get chat interface elements
            this.chatInterface = {
                messages: document.getElementById('chatMessages'),
                input: document.getElementById('messageInput'),
                users: document.getElementById('idvisitors'),
                userCount: document.getElementById('userCount')
            };
            
            // Setup chat interface event handlers
            this.setupChatInterfaceHandlers();
            
            // Connect chat interface with Flash modules
            this.connectChatInterfaceWithFlash();
            
            console.log('✅ [PERFECT] Chat interface initialized');
            
        } catch (error) {
            console.error('❌ [PERFECT] Chat interface initialization failed:', error);
        }
    }

    /**
     * Setup chat interface event handlers
     */
    setupChatInterfaceHandlers() {
        console.log('🎮 [PERFECT] Setting up chat interface handlers...');
        
        // Message input handler
        if (this.chatInterface.input) {
            this.chatInterface.input.addEventListener('keypress', (event) => {
                if (event.key === 'Enter') {
                    this.sendMessage();
                }
            });
        }
        
        // Connect with Flash message system
        this.eventSystem.addEventListener('flash_message_send', (data) => {
            this.sendMessageToServer(data.message);
        });
        
        console.log('✅ [PERFECT] Chat interface handlers setup completed');
    }

    /**
     * Connect chat interface with Flash modules
     */
    connectChatInterfaceWithFlash() {
        console.log('🔗 [PERFECT] Connecting chat interface with Flash modules...');
        
        // Connect with Flash messages module - use global instances
        if (window.smilieSystem) {
            // Ensure xMessage instance exists
            if (!window.xMessage && window.createXMessageInstance) {
                console.log('🔧 [PERFECT] Creating xMessage instance for chat interface');
                window.createXMessageInstance();
            }
            
            if (window.xMessage && typeof window.xMessage.setChatInterface === 'function') {
                window.xMessage.setChatInterface(this.chatInterface);
            }
        }
        
        // Connect with Flash smilies module - use global instances
        if (window.smilieSystem && typeof window.smilieSystem.setChatInterface === 'function') {
            window.smilieSystem.setChatInterface(this.chatInterface);
        }
        
        // Connect with Flash main module - use global instances
        if (window.main && typeof window.main.setChatInterface === 'function') {
            window.main.setChatInterface(this.chatInterface);
        }
        
        console.log('✅ [PERFECT] Chat interface connected with Flash modules');
    }

    /**
     * Handle server messages
     */
    handleServerMessage(data) {
        console.log('📨 [PERFECT] Handling server message:', data);
        
        // Update state
        this.stateManager.setState('lastMessage', data);
        
        // Dispatch events
        this.eventSystem.dispatchEvent('server_message', data);
        this.eventSystem.dispatchEvent('flash_message', data);
        
        // Update chat interface
        if (this.chatInterface.messages) {
            this.addMessageToInterface(data);
        }
    }

    /**
     * Handle user list updates
     */
    handleUserList(data) {
        console.log('👥 [PERFECT] Handling user list:', data.users.length, 'users');
        
        // Update state
        this.stateManager.setState('users', data.users);
        
        // Dispatch events
        this.eventSystem.dispatchEvent('user_list_updated', data);
        
        // Update chat interface
        if (this.chatInterface.users) {
            this.updateUserList(data.users);
        }
    }

    /**
     * Handle user joined
     */
    handleUserJoined(data) {
        console.log('👋 [PERFECT] User joined:', data.nickname);
        
        // Update state
        const currentUsers = this.stateManager.getState('users') || [];
        currentUsers.push(data.user);
        this.stateManager.setState('users', currentUsers);
        
        // Dispatch events
        this.eventSystem.dispatchEvent('user_joined', data);
        this.eventSystem.dispatchEvent('flash_user_join', data);
        
        // Update chat interface
        this.addMessageToInterface({
            user: { nickname: 'System' },
            message: `${data.nickname} joined the chat`,
            timestamp: new Date()
        });
    }

    /**
     * Handle user left
     */
    handleUserLeft(data) {
        console.log('👋 [PERFECT] User left:', data.nickname);
        
        // Update state
        const currentUsers = this.stateManager.getState('users') || [];
        const updatedUsers = currentUsers.filter(user => user.nickname !== data.nickname);
        this.stateManager.setState('users', updatedUsers);
        
        // Dispatch events
        this.eventSystem.dispatchEvent('user_left', data);
        this.eventSystem.dispatchEvent('flash_user_leave', data);
        
        // Update chat interface
        this.addMessageToInterface({
            user: { nickname: 'System' },
            message: `${data.nickname} left the chat`,
            timestamp: new Date()
        });
    }

    /**
     * Send message to server
     */
    sendMessageToServer(message) {
        if (this.socket && this.socket.connected) {
            this.socket.emit('message', { message: message });
            console.log('📤 [PERFECT] Message sent to server:', message);
        } else {
            console.warn('⚠️ [PERFECT] Cannot send message - not connected to server');
        }
    }

    /**
     * Add message to chat interface
     */
    addMessageToInterface(data) {
        if (!this.chatInterface.messages) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message';
        messageDiv.innerHTML = `
            <div class="username">${data.user.nickname}</div>
            <div class="content">${data.message}</div>
            <div class="timestamp">${this.formatTimestamp(data.timestamp)}</div>
        `;
        
        this.chatInterface.messages.appendChild(messageDiv);
        this.chatInterface.messages.scrollTop = this.chatInterface.messages.scrollHeight;
    }

    /**
     * Update user list in chat interface
     */
    updateUserList(users) {
        if (!this.chatInterface.users) return;
        
        this.chatInterface.users.innerHTML = '';
        
        users.forEach(user => {
            const userElement = document.createElement('li');
            userElement.innerHTML = `
                <div style="display:flex;align-items:center;gap:10px;">
                    <div style="width:32px;height:32px;background:#2ecc71;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:14px;color:white;">
                        ${this.getUserRankIcon(user.rank)}
                    </div>
                    <div style="flex:1;">
                        <div style="display:flex;align-items:center;gap:5px;">
                            <strong style="color:#ffffff;">${user.nickname}</strong>
                            <span style="width:8px;height:8px;background:#27ae60;border-radius:50%;display:inline-block;"></span>
                        </div>
                        <small style="color:#bdc3c7;">
                            ${this.getUserRankText(user.rank)}
                        </small>
                    </div>
                </div>
            `;
            
            userElement.onclick = () => this.showUserProfile(user);
            this.chatInterface.users.appendChild(userElement);
        });
        
        // Update user count
        if (this.chatInterface.userCount) {
            this.chatInterface.userCount.textContent = `${users.length} users`;
        }
    }

    /**
     * Get user rank icon
     */
    getUserRankIcon(rank) {
        const rankIcons = {
            9: '👑', // Main Owner
            4: '👑', // Owner
            3: '🛡️', // Moderator
            2: '👤', // Member
            5: '👻'  // Guest
        };
        return rankIcons[rank] || '👻';
    }

    /**
     * Get user rank text
     */
    getUserRankText(rank) {
        const rankTexts = {
            9: 'Main Owner',
            4: 'Owner',
            3: 'Moderator',
            2: 'Member',
            5: 'Guest'
        };
        return rankTexts[rank] || 'Guest';
    }

    /**
     * Show user profile
     */
    showUserProfile(user) {
        console.log('👤 [PERFECT] Showing user profile:', user.nickname);
        
        // Dispatch event for profile display
        this.eventSystem.dispatchEvent('show_user_profile', user);
        
        // Use existing profile modal if available
        if (typeof showUserProfile === 'function') {
            showUserProfile(user);
        }
    }

    /**
     * Format timestamp
     */
    formatTimestamp(timestamp) {
        if (!timestamp) return 'just now';
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;
        
        if (diff < 60000) return 'just now';
        if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
        if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
        return date.toLocaleDateString();
    }

    /**
     * Load Flash module
     */
    async loadFlashModule(moduleName) {
        try {
            // First, try to access global instances (they should be available after scripts load)
            if (typeof window !== 'undefined') {
                // Check for specific global instances
                const globalMap = {
                    'messages': window.xMessage,
                    'smilies': window.smilieSystem,
                    'todo': window.todo,
                    'main': window.main,
                    'chat': window.chat,
                    'network': window.network,
                    'xload': window.xload,
                    'xconst': window.xconst,
                    'more': window.more,
                    'xatsat': window.xatsat,
                    'p1pwn': window.p1pwn,
                    'maintimeline': window.maintimeline
                };
                
                if (globalMap[moduleName]) {
                    console.log(`✅ [PERFECT] Found global instance for ${moduleName}:`, globalMap[moduleName]);
                    return globalMap[moduleName];
                } else {
                    console.log(`❌ [PERFECT] Global instance not found for ${moduleName}:`, globalMap[moduleName]);
                }
                
                // Fallback to direct window property
                if (window[moduleName]) {
                    console.log(`✅ [PERFECT] Found window property for ${moduleName}`);
                    return window[moduleName];
                }
                
                // Debug: Check what's actually in window for this module
                if (moduleName === 'messages') {
                    console.log('🔍 [PERFECT] Debug messages module:');
                    console.log('  - window.xMessage:', window.xMessage);
                    console.log('  - window.XMessage:', window.XMessage);
                    console.log('  - window.messages:', window.messages);
                }
                if (moduleName === 'main') {
                    console.log('🔍 [PERFECT] Debug main module:');
                    console.log('  - window.main:', window.main);
                    console.log('  - window.Main:', window.Main);
                    console.log('  - window.soundManager:', window.soundManager);
                }
            }
            
            // If global instances not found, try to load from different possible locations
            const possiblePaths = [
                `../js/${moduleName}.js`,
                `./js/${moduleName}.js`,
                `../../js/${moduleName}.js`
            ];
            
            for (const path of possiblePaths) {
                try {
                    const module = await import(path);
                    // Try to get the actual class or instance from the module
                    if (module.default) {
                        // If it's a class, instantiate it
                        if (typeof module.default === 'function' && module.default.prototype) {
                            return new module.default();
                        }
                        return module.default;
                    }
                    // If no default export, try to find the class or instance
                    const moduleKeys = Object.keys(module);
                    for (const key of moduleKeys) {
                        const value = module[key];
                        if (typeof value === 'function' && value.prototype) {
                            // Found a class, instantiate it
                            return new value();
                        } else if (value && typeof value === 'object' && value.constructor && value.constructor.name) {
                            // Found an instance
                            return value;
                        }
                    }
                    return module;
                } catch (error) {
                    // Continue to next path
                }
            }
            
            return null;
        } catch (error) {
            console.warn(`⚠️ [PERFECT] Failed to load Flash module ${moduleName}:`, error);
            return null;
        }
    }

    /**
     * Load Ixat module
     */
    async loadIxatModule(moduleName) {
        try {
            // Try to load from different possible locations
            const possiblePaths = [
                `../Ixat Files/cache/js/${moduleName}.js`,
                `./Ixat Files/cache/js/${moduleName}.js`,
                `../../Ixat Files/cache/js/${moduleName}.js`
            ];
            
            for (const path of possiblePaths) {
                try {
                    const module = await import(path);
                    return module.default || module;
                } catch (error) {
                    // Continue to next path
                }
            }
            
            // If not found as ES6 module, try to access global
            if (typeof window !== 'undefined' && window[moduleName]) {
                return window[moduleName];
            }
            
            return null;
        } catch (error) {
            console.warn(`⚠️ [PERFECT] Failed to load Ixat module ${moduleName}:`, error);
            return null;
        }
    }

    /**
     * Wait for connection
     */
    async waitForConnection() {
        return new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                reject(new Error('Connection timeout'));
            }, 10000);
            
            if (this.socket.connected) {
                clearTimeout(timeout);
                resolve();
            } else {
                this.socket.on('connect', () => {
                    clearTimeout(timeout);
                    resolve();
                });
            }
        });
    }

    /**
     * Setup performance monitoring
     */
    setupPerformanceMonitoring() {
        console.log('📊 [PERFECT] Setting up performance monitoring...');
        
        // Monitor message processing
        this.eventSystem.addEventListener('server_message', () => {
            this.performanceMonitor.start('message_processing');
        });
        
        this.eventSystem.addEventListener('message_processed', () => {
            this.performanceMonitor.end('message_processing');
        });
        
        // Monitor user list updates
        this.eventSystem.addEventListener('user_list_updated', () => {
            this.performanceMonitor.start('user_list_update');
        });
        
        this.eventSystem.addEventListener('user_list_updated_complete', () => {
            this.performanceMonitor.end('user_list_update');
        });
        
        console.log('✅ [PERFECT] Performance monitoring setup completed');
    }

    /**
     * Setup memory management
     */
    setupMemoryManagement() {
        console.log('🧠 [PERFECT] Setting up memory management...');
        
        // Add cleanup callbacks
        this.memoryManager.addCleanupCallback(() => {
            this.cleanupOldMessages();
        });
        
        this.memoryManager.addCleanupCallback(() => {
            this.cleanupOldUsers();
        });
        
        console.log('✅ [PERFECT] Memory management setup completed');
    }

    /**
     * Cleanup old messages
     */
    cleanupOldMessages() {
        if (this.chatInterface.messages) {
            const messages = this.chatInterface.messages.children;
            if (messages.length > 100) {
                // Remove oldest messages
                for (let i = 0; i < messages.length - 100; i++) {
                    messages[i].remove();
                }
            }
        }
    }

    /**
     * Cleanup old users
     */
    cleanupOldUsers() {
        const users = this.stateManager.getState('users') || [];
        if (users.length > 500) {
            // Keep only the most recent 500 users
            const recentUsers = users.slice(-500);
            this.stateManager.setState('users', recentUsers);
        }
    }

    /**
     * Handle initialization error
     */
    handleInitializationError(error) {
        console.error('❌ [PERFECT] Initialization error:', error);
        
        // Try to recover gracefully
        this.attemptRecovery();
    }

    /**
     * Attempt recovery
     */
    attemptRecovery() {
        console.log('🔄 [PERFECT] Attempting recovery...');
        
        // Try to initialize with minimal functionality
        try {
            this.initializeMinimal();
        } catch (error) {
            console.error('❌ [PERFECT] Recovery failed:', error);
        }
    }

    /**
     * Initialize minimal functionality
     */
    initializeMinimal() {
        console.log('🔧 [PERFECT] Initializing minimal functionality...');
        
        // Initialize only essential components
        this.eventSystem.init();
        this.stateManager.init();
        
        // Try to connect to server
        this.connectToServer().catch(error => {
            console.warn('⚠️ [PERFECT] Server connection failed in minimal mode:', error);
        });
        
        console.log('✅ [PERFECT] Minimal functionality initialized');
    }

    /**
     * Get module by name
     */
    getModule(name) {
        return this.flashModules[name] || this.ixatModules[name] || null;
    }

    /**
     * Dispatch event
     */
    dispatchEvent(eventName, detail) {
        this.eventSystem.dispatchEvent(eventName, detail);
    }

    /**
     * Add event listener
     */
    addEventListener(eventName, callback) {
        this.eventSystem.addEventListener(eventName, callback);
    }

    /**
     * Remove event listener
     */
    removeEventListener(eventName, callback) {
        this.eventSystem.removeEventListener(eventName, callback);
    }
}

// Supporting classes (same as in xat-integration.js)
class PerformanceMonitor {
    constructor() {
        this.timers = {};
        this.metrics = {};
        this.thresholds = {
            initialization: 1000,
            moduleLoad: 100,
            eventProcessing: 10,
            message_processing: 50,
            user_list_update: 100
        };
    }

    init() {
        this.startTime = performance.now();
        this.setupPerformanceObserver();
    }

    start(label) {
        this.timers[label] = performance.now();
    }

    end(label) {
        if (this.timers[label]) {
            const duration = performance.now() - this.timers[label];
            this.metrics[label] = duration;
            
            if (duration > (this.thresholds[label] || 100)) {
                console.warn(`⚠️ Performance: ${label} took ${duration.toFixed(2)}ms`);
            }
            
            delete this.timers[label];
            return duration;
        }
        return 0;
    }

    getDuration(label) {
        return this.metrics[label] || 0;
    }

    setupPerformanceObserver() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.duration > 16) { // 60fps threshold
                        console.warn(`⚠️ Long task detected: ${entry.name} took ${entry.duration.toFixed(2)}ms`);
                    }
                }
            });
            observer.observe({ entryTypes: ['measure', 'navigation'] });
        }
    }
}

class MemoryManager {
    constructor() {
        this.memoryThreshold = 50 * 1024 * 1024; // 50MB
        this.cleanupInterval = 30000; // 30 seconds
        this.cleanupCallbacks = [];
    }

    init() {
        this.setupMemoryMonitoring();
        this.startCleanupTimer();
    }

    setupMemoryMonitoring() {
        if ('memory' in performance) {
            setInterval(() => {
                const memory = performance.memory;
                if (memory.usedJSHeapSize > this.memoryThreshold) {
                    console.warn('⚠️ High memory usage detected, triggering cleanup');
                    this.triggerCleanup();
                }
            }, 10000);
        }
    }

    startCleanupTimer() {
        setInterval(() => {
            this.triggerCleanup();
        }, this.cleanupInterval);
    }

    addCleanupCallback(callback) {
        this.cleanupCallbacks.push(callback);
    }

    triggerCleanup() {
        this.cleanupCallbacks.forEach(callback => {
            try {
                callback();
            } catch (error) {
                console.error('Memory cleanup error:', error);
            }
        });
    }
}

class EventSystem {
    constructor() {
        this.events = new Map();
        this.eventQueue = [];
        this.processing = false;
    }

    init() {
        this.setupEventProcessing();
    }

    setupEventProcessing() {
        const processEvents = () => {
            if (this.eventQueue.length > 0 && !this.processing) {
                this.processing = true;
                const event = this.eventQueue.shift();
                this.processEvent(event);
                this.processing = false;
                requestAnimationFrame(processEvents);
            }
        };
        
        setInterval(processEvents, 16); // 60fps
    }

    addEventListener(eventName, callback, options = {}) {
        if (!this.events.has(eventName)) {
            this.events.set(eventName, []);
        }
        this.events.get(eventName).push({ callback, options });
    }

    removeEventListener(eventName, callback) {
        if (this.events.has(eventName)) {
            const listeners = this.events.get(eventName);
            const index = listeners.findIndex(l => l.callback === callback);
            if (index !== -1) {
                listeners.splice(index, 1);
            }
        }
    }

    dispatchEvent(eventName, detail) {
        this.eventQueue.push({ eventName, detail, timestamp: performance.now() });
    }

    processEvent(event) {
        if (this.events.has(event.eventName)) {
            const listeners = this.events.get(event.eventName);
            listeners.forEach(({ callback, options }) => {
                try {
                    callback(event.detail);
                } catch (error) {
                    console.error(`Event processing error for ${event.eventName}:`, error);
                }
            });
        }
    }
}

class StateManager {
    constructor() {
        this.state = {};
        this.subscribers = new Map();
        this.stateHistory = [];
        this.maxHistorySize = 100;
    }

    init() {
        this.setupStatePersistence();
    }

    setupStatePersistence() {
        setInterval(() => {
            this.saveState();
        }, 5000);
        
        this.loadState();
    }

    setState(key, value) {
        const oldValue = this.state[key];
        this.state[key] = value;
        
        this.stateHistory.push({
            key,
            oldValue,
            newValue: value,
            timestamp: Date.now()
        });
        
        if (this.stateHistory.length > this.maxHistorySize) {
            this.stateHistory.shift();
        }
        
        this.notifySubscribers(key, value, oldValue);
    }

    getState(key) {
        return this.state[key];
    }

    subscribe(key, callback) {
        if (!this.subscribers.has(key)) {
            this.subscribers.set(key, []);
        }
        this.subscribers.get(key).push(callback);
    }

    unsubscribe(key, callback) {
        if (this.subscribers.has(key)) {
            const callbacks = this.subscribers.get(key);
            const index = callbacks.indexOf(callback);
            if (index !== -1) {
                callbacks.splice(index, 1);
            }
        }
    }

    notifySubscribers(key, newValue, oldValue) {
        if (this.subscribers.has(key)) {
            this.subscribers.get(key).forEach(callback => {
                try {
                    callback(newValue, oldValue);
                } catch (error) {
                    console.error(`State subscriber error for ${key}:`, error);
                }
            });
        }
    }

    saveState() {
        try {
            localStorage.setItem('xat_perfect_state', JSON.stringify(this.state));
        } catch (error) {
            console.error('Failed to save state:', error);
        }
    }

    loadState() {
        try {
            const saved = localStorage.getItem('xat_perfect_state');
            if (saved) {
                this.state = { ...this.state, ...JSON.parse(saved) };
            }
        } catch (error) {
            console.error('Failed to load state:', error);
        }
    }
}

// Initialize the perfect integration system
let xatPerfectIntegration;

if (typeof window !== 'undefined') {
    window.XatPerfectIntegration = XatPerfectIntegration;
    
    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
        console.log('🚀 [PERFECT] DOM ready, initializing Xat Perfect Integration...');
        xatPerfectIntegration = new XatPerfectIntegration();
        
        // Make it globally available
        window.xatPerfectIntegration = xatPerfectIntegration;
        
        // Global convenience methods
        window.getXatPerfectModule = (name) => xatPerfectIntegration.getModule(name);
        window.dispatchXatPerfectEvent = (eventName, detail) => xatPerfectIntegration.dispatchEvent(eventName, detail);
        window.addXatPerfectEventListener = (eventName, callback) => xatPerfectIntegration.addEventListener(eventName, callback);
        window.removeXatPerfectEventListener = (eventName, callback) => xatPerfectIntegration.removeEventListener(eventName, callback);
    });
} else if (typeof module !== 'undefined' && module.exports) {
    module.exports = XatPerfectIntegration;
}
