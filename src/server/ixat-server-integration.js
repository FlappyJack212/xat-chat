const IxatServer = require('./ixatServer');

/**
 * Enhanced Ixat Server Integration
 * Extends the original IxatServer with Flash-to-JavaScript conversions
 */
class IxatServerIntegration extends IxatServer {
    constructor() {
        super();
        this.performanceMetrics = {
            usersConnected: 0,
            messagesProcessed: 0,
            averageResponseTime: 0
        };
        this.initEnhancedFeatures();
    }

    /**
     * Initialize enhanced features
     */
    initEnhancedFeatures() {
        console.log('🚀 [SERVER-INTEGRATION] Initializing enhanced features...');
        this.setupEnhancedSocketHandlers();
        this.setupPerformanceMonitoring();
        this.setupMemoryManagement();
        this.setupEventSystem();
        console.log('✅ [SERVER-INTEGRATION] Enhanced features initialized');
    }

    /**
     * Setup enhanced socket handlers
     */
    setupEnhancedSocketHandlers() {
        console.log('🔌 [SERVER-INTEGRATION] Setting up enhanced socket handlers...');
        
        this.io.on('connection', (socket) => {
            this.handleEnhancedConnection(socket);
        });
        
        console.log('✅ [SERVER-INTEGRATION] Enhanced socket handlers setup completed');
    }

    /**
     * Handle enhanced connection
     */
    handleEnhancedConnection(socket) {
        console.log('🔌 [SERVER-INTEGRATION] Enhanced connection from:', socket.id);
        
        // Add enhanced features
        this.setupEnhancedSocketEvents(socket);
        
        // Update performance metrics
        this.performanceMetrics.usersConnected++;
        
        // Dispatch connection event
        this.dispatchEvent('user_connected', {
            socketId: socket.id,
            timestamp: new Date(),
            totalUsers: this.performanceMetrics.usersConnected
        });
    }

    /**
     * Setup enhanced socket events
     */
    setupEnhancedSocketEvents(socket) {
        // Override message handler
        socket.on('message', (data) => this.handleEnhancedMessage(socket, data));
        
        // Override other handlers
        socket.on('makeUser', (data) => this.handleEnhancedMakeUser(socket, data));
        socket.on('kickUser', (data) => this.handleEnhancedKickUser(socket, data));
        socket.on('banUser', (data) => this.handleEnhancedBanUser(socket, data));
        socket.on('disconnect', () => this.handleEnhancedDisconnect(socket));
    }

    /**
     * Handle enhanced message
     */
    handleEnhancedMessage(socket, data) {
        const startTime = Date.now();
        
        try {
            // Call parent message handler
            this.handleMessage(socket, data);
            
            // Update performance metrics
            this.performanceMetrics.messagesProcessed++;
            
            // Calculate response time
            const responseTime = Date.now() - startTime;
            this.performanceMetrics.averageResponseTime = 
                (this.performanceMetrics.averageResponseTime + responseTime) / 2;
            
            // Dispatch enhanced message event
            this.dispatchEvent('message_processed', {
                socketId: socket.id,
                message: data,
                responseTime: responseTime,
                timestamp: new Date()
            });
            
        } catch (error) {
            console.error('❌ [SERVER-INTEGRATION] Error in enhanced message handler:', error);
            this.dispatchEvent('message_error', {
                socketId: socket.id,
                error: error.message,
                timestamp: new Date()
            });
        }
    }

    /**
     * Handle enhanced make user
     */
    handleEnhancedMakeUser(socket, data) {
        try {
            // Call parent make user handler
            this.handleMakeUser(socket, data);
            
            // Dispatch enhanced make user event
            this.dispatchEvent('user_rank_changed', {
                socketId: socket.id,
                targetUsername: data.username,
                newRank: data.rank,
                timestamp: new Date()
            });
            
        } catch (error) {
            console.error('❌ [SERVER-INTEGRATION] Error in enhanced make user handler:', error);
        }
    }

    /**
     * Handle enhanced kick user
     */
    handleEnhancedKickUser(socket, data) {
        try {
            // Call parent kick user handler
            this.handleKickUser(socket, data);
            
            // Dispatch enhanced kick user event
            this.dispatchEvent('user_kicked', {
                socketId: socket.id,
                targetUsername: data.username,
                reason: data.reason,
                timestamp: new Date()
            });
            
        } catch (error) {
            console.error('❌ [SERVER-INTEGRATION] Error in enhanced kick user handler:', error);
        }
    }

    /**
     * Handle enhanced ban user
     */
    handleEnhancedBanUser(socket, data) {
        try {
            // Call parent ban user handler
            this.handleBanUser(socket, data);
            
            // Dispatch enhanced ban user event
            this.dispatchEvent('user_banned', {
                socketId: socket.id,
                targetUsername: data.username,
                reason: data.reason,
                duration: data.duration,
                timestamp: new Date()
            });
            
        } catch (error) {
            console.error('❌ [SERVER-INTEGRATION] Error in enhanced ban user handler:', error);
        }
    }

    /**
     * Handle enhanced disconnect
     */
    handleEnhancedDisconnect(socket) {
        console.log('🔌 [SERVER-INTEGRATION] Enhanced disconnect from:', socket.id);
        
        // Call parent disconnect handler
        this.handleDisconnect(socket);
        
        // Update performance metrics
        this.performanceMetrics.usersConnected--;
        
        // Dispatch enhanced disconnect event
        this.dispatchEvent('user_disconnected', {
            socketId: socket.id,
            timestamp: new Date(),
            totalUsers: this.performanceMetrics.usersConnected
        });
    }

    /**
     * Setup performance monitoring
     */
    setupPerformanceMonitoring() {
        console.log('📊 [SERVER-INTEGRATION] Setting up performance monitoring...');
        
        // Monitor performance every 30 seconds
        setInterval(() => {
            const memoryUsage = process.memoryUsage();
            console.log('📊 [PERFORMANCE] Metrics:', {
                usersConnected: this.performanceMetrics.usersConnected,
                messagesProcessed: this.performanceMetrics.messagesProcessed,
                averageResponseTime: this.performanceMetrics.averageResponseTime + 'ms',
                memoryUsage: Math.round(memoryUsage.heapUsed / 1024 / 1024) + 'MB'
            });
        }, 30000);
        
        console.log('✅ [SERVER-INTEGRATION] Performance monitoring setup completed');
    }

    /**
     * Setup memory management
     */
    setupMemoryManagement() {
        console.log('🧠 [SERVER-INTEGRATION] Setting up memory management...');
        
        // Force garbage collection every 5 minutes
        setInterval(() => {
            if (global.gc) {
                global.gc();
                console.log('🧠 [MEMORY] Garbage collection performed');
            }
        }, 300000);
        
        console.log('✅ [SERVER-INTEGRATION] Memory management setup completed');
    }

    /**
     * Setup event system
     */
    setupEventSystem() {
        console.log('📡 [SERVER-INTEGRATION] Setting up event system...');
        
        this.eventListeners = new Map();
        
        console.log('✅ [SERVER-INTEGRATION] Event system setup completed');
    }

    /**
     * Dispatch event
     */
    dispatchEvent(eventName, data) {
        if (this.eventListeners && this.eventListeners.has(eventName)) {
            const listeners = this.eventListeners.get(eventName);
            listeners.forEach(listener => {
                try {
                    listener(data);
                } catch (error) {
                    console.error('❌ [EVENT] Error in event listener:', error);
                }
            });
        }
    }

    /**
     * Add event listener
     */
    addEventListener(eventName, callback) {
        if (!this.eventListeners) {
            this.eventListeners = new Map();
        }
        
        if (!this.eventListeners.has(eventName)) {
            this.eventListeners.set(eventName, []);
        }
        
        this.eventListeners.get(eventName).push(callback);
    }

    /**
     * Remove event listener
     */
    removeEventListener(eventName, callback) {
        if (this.eventListeners && this.eventListeners.has(eventName)) {
            const listeners = this.eventListeners.get(eventName);
            const index = listeners.indexOf(callback);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        }
    }

    /**
     * Get performance metrics
     */
    getPerformanceMetrics() {
        return {
            ...this.performanceMetrics,
            uptime: process.uptime(),
            memoryUsage: process.memoryUsage()
        };
    }
}

module.exports = IxatServerIntegration;
