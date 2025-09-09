/**
 * NotificationSystem - Handles notifications and alerts
 * Manages toast notifications, alerts, and user feedback
 */
class NotificationSystem {
    constructor() {
        this.notifications = [];
        this.maxNotifications = 5;
        this.defaultDuration = 5000;
        this.container = null;
        this.initialized = false;
    }

    /**
     * Initialize NotificationSystem
     */
    init() {
        if (this.initialized) {
            console.log('NotificationSystem already initialized');
            return;
        }

        try {
            this.createContainer();
            this.setupEventListeners();
            this.initialized = true;
            console.log('✅ NotificationSystem initialized successfully');
        } catch (error) {
            console.error('❌ Error initializing NotificationSystem:', error);
        }
    }

    /**
     * Create notifications container
     */
    createContainer() {
        this.container = document.getElementById('notificationsContainer');
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.id = 'notificationsContainer';
            this.container.className = 'notifications-container';
            document.body.appendChild(this.container);
        }
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Handle window focus/blur for notification management
        window.addEventListener('focus', () => {
            this.handleWindowFocus();
        });

        window.addEventListener('blur', () => {
            this.handleWindowBlur();
        });
    }

    /**
     * Show notification
     */
    show(message, type = 'info', duration = null, options = {}) {
        if (!this.container) {
            console.error('Notification container not found');
            return;
        }

        // Use default duration if not specified
        if (duration === null) {
            duration = this.defaultDuration;
        }

        // Create notification element
        const notification = this.createNotification(message, type, duration, options);
        
        // Add to container
        this.container.appendChild(notification);
        
        // Store notification reference
        this.notifications.push(notification);
        
        // Limit number of notifications
        this.limitNotifications();
        
        // Auto remove after duration
        if (duration > 0) {
            setTimeout(() => {
                this.remove(notification);
            }, duration);
        }

        return notification;
    }

    /**
     * Create notification element
     */
    createNotification(message, type, duration, options) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        // Add custom classes if provided
        if (options.className) {
            notification.classList.add(options.className);
        }

        // Create content
        const content = document.createElement('div');
        content.className = 'notification-content';
        
        const messageEl = document.createElement('span');
        messageEl.className = 'notification-message';
        messageEl.textContent = message;
        
        const closeBtn = document.createElement('button');
        closeBtn.className = 'notification-close';
        closeBtn.innerHTML = '×';
        closeBtn.addEventListener('click', () => {
            this.remove(notification);
        });

        content.appendChild(messageEl);
        content.appendChild(closeBtn);
        notification.appendChild(content);

        // Add click to dismiss if enabled
        if (options.clickToDismiss !== false) {
            notification.addEventListener('click', () => {
                this.remove(notification);
            });
        }

        // Add progress bar if duration is specified
        if (duration > 0) {
            const progressBar = document.createElement('div');
            progressBar.className = 'notification-progress';
            progressBar.style.width = '100%';
            progressBar.style.height = '3px';
            progressBar.style.background = this.getTypeColor(type);
            progressBar.style.borderRadius = '0 0 10px 10px';
            progressBar.style.animation = `progressBar ${duration}ms linear forwards`;
            notification.appendChild(progressBar);
        }

        return notification;
    }

    /**
     * Remove notification
     */
    remove(notification) {
        if (!notification || !notification.parentNode) return;

        // Add closing animation
        notification.classList.add('closing');
        
        // Remove from DOM after animation
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
            
            // Remove from notifications array
            const index = this.notifications.indexOf(notification);
            if (index > -1) {
                this.notifications.splice(index, 1);
            }
        }, 300);
    }

    /**
     * Remove all notifications
     */
    removeAll() {
        this.notifications.forEach(notification => {
            this.remove(notification);
        });
    }

    /**
     * Limit number of notifications
     */
    limitNotifications() {
        while (this.notifications.length > this.maxNotifications) {
            const oldest = this.notifications[0];
            this.remove(oldest);
        }
    }

    /**
     * Get color for notification type
     */
    getTypeColor(type) {
        const colors = {
            info: '#3498db',
            success: '#27ae60',
            warning: '#f39c12',
            error: '#e74c3c'
        };
        return colors[type] || colors.info;
    }

    /**
     * Show info notification
     */
    info(message, duration = null, options = {}) {
        return this.show(message, 'info', duration, options);
    }

    /**
     * Show success notification
     */
    success(message, duration = null, options = {}) {
        return this.show(message, 'success', duration, options);
    }

    /**
     * Show warning notification
     */
    warning(message, duration = null, options = {}) {
        return this.show(message, 'warning', duration, options);
    }

    /**
     * Show error notification
     */
    error(message, duration = null, options = {}) {
        return this.show(message, 'error', duration, options);
    }

    /**
     * Show persistent notification (no auto-dismiss)
     */
    persistent(message, type = 'info', options = {}) {
        return this.show(message, type, 0, options);
    }

    /**
     * Show notification with custom duration
     */
    custom(message, type = 'info', duration = 5000, options = {}) {
        return this.show(message, type, duration, options);
    }

    /**
     * Handle window focus
     */
    handleWindowFocus() {
        // Resume any paused notifications
        this.notifications.forEach(notification => {
            if (notification.classList.contains('paused')) {
                notification.classList.remove('paused');
            }
        });
    }

    /**
     * Handle window blur
     */
    handleWindowBlur() {
        // Pause notifications when window loses focus
        this.notifications.forEach(notification => {
            notification.classList.add('paused');
        });
    }

    /**
     * Get notification count
     */
    getCount() {
        return this.notifications.length;
    }

    /**
     * Check if notifications are enabled
     */
    isEnabled() {
        return this.container !== null;
    }

    /**
     * Set maximum notifications
     */
    setMaxNotifications(max) {
        this.maxNotifications = max;
        this.limitNotifications();
    }

    /**
     * Set default duration
     */
    setDefaultDuration(duration) {
        this.defaultDuration = duration;
    }

    /**
     * Get all notifications
     */
    getAll() {
        return [...this.notifications];
    }

    /**
     * Clear all notifications
     */
    clear() {
        this.removeAll();
    }

    /**
     * Cleanup and destroy
     */
    destroy() {
        this.removeAll();
        if (this.container && this.container.parentNode) {
            this.container.parentNode.removeChild(this.container);
        }
        this.container = null;
        this.initialized = false;
        console.log('✅ NotificationSystem destroyed');
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NotificationSystem;
} else if (typeof window !== 'undefined') {
    window.NotificationSystem = NotificationSystem;
}
