/**
 * UserInterface - UI management and interactions
 * Handles UI state, modals, notifications, and user interactions
 */
class UserInterface {
    constructor() {
        this.isSidebarOpen = false;
        this.isUserListOpen = false;
        this.isQuickbarOpen = false;
        this.currentModal = null;
        this.notifications = [];
        this.initialized = false;
    }

    /**
     * Initialize UserInterface
     */
    init() {
        if (this.initialized) {
            console.log('UserInterface already initialized');
            return;
        }

        try {
            this.setupEventListeners();
            this.initializeComponents();
            this.initialized = true;
            console.log('✅ UserInterface initialized successfully');
        } catch (error) {
            console.error('❌ Error initializing UserInterface:', error);
        }
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Global keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });

        // Click outside to close modals
        document.addEventListener('click', (e) => {
            this.handleOutsideClick(e);
        });

        // Window resize
        window.addEventListener('resize', () => {
            this.handleResize();
        });

        // Orientation change
        window.addEventListener('orientationchange', () => {
            this.handleOrientationChange();
        });
    }

    /**
     * Initialize UI components
     */
    initializeComponents() {
        this.initializeSidebar();
        this.initializeUserList();
        this.initializeQuickbar();
        this.initializeModals();
        this.initializeNotifications();
    }

    /**
     * Initialize sidebar
     */
    initializeSidebar() {
        const sidebar = document.getElementById('sidebar');
        if (!sidebar) return;

        const sidebarContent = document.getElementById('sidebarContent');
        if (sidebarContent) {
            sidebarContent.innerHTML = this.createSidebarContent();
        }
    }

    /**
     * Create sidebar content
     */
    createSidebarContent() {
        return `
            <div class="sidebar-section">
                <h3>Navigation</h3>
                <ul class="sidebar-menu">
                    <li><a href="#" onclick="this.openProfile()">👤 Profile</a></li>
                    <li><a href="#" onclick="this.openFriends()">👥 Friends</a></li>
                    <li><a href="#" onclick="this.openMessages()">💬 Messages</a></li>
                    <li><a href="#" onclick="this.openVisitors()">👀 Visitors</a></li>
                    <li><a href="#" onclick="this.openPowers()">⚡ Powers</a></li>
                    <li><a href="#" onclick="this.openStore()">🛒 Store</a></li>
                    <li><a href="#" onclick="this.openGroups()">🏘️ Groups</a></li>
                    <li><a href="#" onclick="this.openHelp()">❓ Help</a></li>
                </ul>
            </div>
            <div class="sidebar-section">
                <h3>Quick Actions</h3>
                <ul class="sidebar-menu">
                    <li><a href="#" onclick="this.openSmilies()">😊 Smilies</a></li>
                    <li><a href="#" onclick="this.openPawns()">🎭 Pawns</a></li>
                    <li><a href="#" onclick="this.openGames()">🎮 Games</a></li>
                    <li><a href="#" onclick="this.openRadio()">📻 Radio</a></li>
                </ul>
            </div>
        `;
    }

    /**
     * Initialize user list
     */
    initializeUserList() {
        const userList = document.getElementById('userList');
        if (!userList) return;

        // Add close button functionality
        const closeBtn = document.getElementById('closeUserList');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.toggleUserList();
            });
        }
    }

    /**
     * Initialize quickbar
     */
    initializeQuickbar() {
        const quickbarArrow = document.getElementById('quickbarArrow');
        if (quickbarArrow) {
            quickbarArrow.addEventListener('click', () => {
                this.toggleQuickbar();
            });
        }

        const quickbarMenu = document.getElementById('quickbarMenu');
        if (quickbarMenu) {
            quickbarMenu.innerHTML = this.createQuickbarContent();
        }
    }

    /**
     * Create quickbar content
     */
    createQuickbarContent() {
        return `
            <div class="quickbar-section">
                <h4>Quick Actions</h4>
                <div class="quickbar-buttons">
                    <button onclick="this.openSmilies()" class="quickbar-btn">😊</button>
                    <button onclick="this.openPawns()" class="quickbar-btn">🎭</button>
                    <button onclick="this.openGames()" class="quickbar-btn">🎮</button>
                    <button onclick="this.openRadio()" class="quickbar-btn">📻</button>
                </div>
            </div>
            <div class="quickbar-section">
                <h4>Tools</h4>
                <div class="quickbar-buttons">
                    <button onclick="this.openSettings()" class="quickbar-btn">⚙️</button>
                    <button onclick="this.openProfile()" class="quickbar-btn">👤</button>
                    <button onclick="this.openHelp()" class="quickbar-btn">❓</button>
                </div>
            </div>
        `;
    }

    /**
     * Initialize modals
     */
    initializeModals() {
        // Create modals container if it doesn't exist
        let modalsContainer = document.getElementById('modalsContainer');
        if (!modalsContainer) {
            modalsContainer = document.createElement('div');
            modalsContainer.id = 'modalsContainer';
            modalsContainer.className = 'modals-container';
            document.body.appendChild(modalsContainer);
        }
    }

    /**
     * Initialize notifications
     */
    initializeNotifications() {
        // Create notifications container if it doesn't exist
        let notificationsContainer = document.getElementById('notificationsContainer');
        if (!notificationsContainer) {
            notificationsContainer = document.createElement('div');
            notificationsContainer.id = 'notificationsContainer';
            notificationsContainer.className = 'notifications-container';
            document.body.appendChild(notificationsContainer);
        }
    }

    /**
     * Handle keyboard shortcuts
     */
    handleKeyboardShortcuts(e) {
        // Escape key - close modals/panels
        if (e.key === 'Escape') {
            this.closeAllModals();
            this.closeQuickbar();
        }

        // Ctrl/Cmd + K - focus message input
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const messageInput = document.getElementById('messageInput');
            if (messageInput) {
                messageInput.focus();
            }
        }

        // Ctrl/Cmd + / - toggle help
        if ((e.ctrlKey || e.metaKey) && e.key === '/') {
            e.preventDefault();
            this.openHelp();
        }
    }

    /**
     * Handle outside clicks
     */
    handleOutsideClick(e) {
        // Close quickbar if clicking outside
        const quickbarMenu = document.getElementById('quickbarMenu');
        const quickbarArrow = document.getElementById('quickbarArrow');
        
        if (quickbarMenu && quickbarArrow && 
            !quickbarMenu.contains(e.target) && 
            !quickbarArrow.contains(e.target)) {
            this.closeQuickbar();
        }
    }

    /**
     * Handle window resize
     */
    handleResize() {
        // Adjust UI elements based on screen size
        const isMobile = window.innerWidth < 768;
        
        if (isMobile) {
            this.closeSidebar();
            this.closeUserList();
        }
    }

    /**
     * Handle orientation change
     */
    handleOrientationChange() {
        // Adjust UI for orientation change
        setTimeout(() => {
            this.handleResize();
        }, 100);
    }

    /**
     * Toggle sidebar
     */
    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        if (!sidebar) return;

        this.isSidebarOpen = !this.isSidebarOpen;
        sidebar.classList.toggle('hidden', !this.isSidebarOpen);
    }

    /**
     * Close sidebar
     */
    closeSidebar() {
        const sidebar = document.getElementById('sidebar');
        if (!sidebar) return;

        this.isSidebarOpen = false;
        sidebar.classList.add('hidden');
    }

    /**
     * Toggle user list
     */
    toggleUserList() {
        const userList = document.getElementById('userList');
        if (!userList) return;

        this.isUserListOpen = !this.isUserListOpen;
        userList.classList.toggle('hidden', !this.isUserListOpen);
    }

    /**
     * Close user list
     */
    closeUserList() {
        const userList = document.getElementById('userList');
        if (!userList) return;

        this.isUserListOpen = false;
        userList.classList.add('hidden');
    }

    /**
     * Toggle quickbar
     */
    toggleQuickbar() {
        const quickbarMenu = document.getElementById('quickbarMenu');
        if (!quickbarMenu) return;

        this.isQuickbarOpen = !this.isQuickbarOpen;
        quickbarMenu.classList.toggle('show', this.isQuickbarOpen);
    }

    /**
     * Close quickbar
     */
    closeQuickbar() {
        const quickbarMenu = document.getElementById('quickbarMenu');
        if (!quickbarMenu) return;

        this.isQuickbarOpen = false;
        quickbarMenu.classList.remove('show');
    }

    /**
     * Show modal
     */
    showModal(title, content, options = {}) {
        const modalsContainer = document.getElementById('modalsContainer');
        if (!modalsContainer) return;

        // Close existing modal
        this.closeAllModals();

        // Create modal
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close" onclick="this.closeModal()">×</button>
                </div>
                <div class="modal-content">
                    ${content}
                </div>
            </div>
        `;

        modalsContainer.appendChild(modal);
        this.currentModal = modal;

        // Add close functionality
        modal.querySelector('.modal-close').addEventListener('click', () => {
            this.closeModal();
        });

        // Close on overlay click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        });
    }

    /**
     * Close modal
     */
    closeModal() {
        if (this.currentModal) {
            this.currentModal.remove();
            this.currentModal = null;
        }
    }

    /**
     * Close all modals
     */
    closeAllModals() {
        const modalsContainer = document.getElementById('modalsContainer');
        if (modalsContainer) {
            modalsContainer.innerHTML = '';
        }
        this.currentModal = null;
    }

    /**
     * Show notification
     */
    showNotification(message, type = 'info', duration = 5000) {
        const notificationsContainer = document.getElementById('notificationsContainer');
        if (!notificationsContainer) return;

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close" onclick="this.remove()">×</button>
            </div>
        `;

        notificationsContainer.appendChild(notification);

        // Auto remove after duration
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, duration);

        // Store notification
        this.notifications.push(notification);
    }

    /**
     * Open profile
     */
    openProfile() {
        this.showModal('Profile', `
            <div class="profile-content">
                <h4>User Profile</h4>
                <p>Profile management coming soon!</p>
            </div>
        `);
    }

    /**
     * Open friends
     */
    openFriends() {
        this.showModal('Friends', `
            <div class="friends-content">
                <h4>Friends List</h4>
                <p>Friends management coming soon!</p>
            </div>
        `);
    }

    /**
     * Open messages
     */
    openMessages() {
        this.showModal('Messages', `
            <div class="messages-content">
                <h4>Private Messages</h4>
                <p>Private messaging coming soon!</p>
            </div>
        `);
    }

    /**
     * Open visitors
     */
    openVisitors() {
        this.showModal('Visitors', `
            <div class="visitors-content">
                <h4>Recent Visitors</h4>
                <p>Visitor tracking coming soon!</p>
            </div>
        `);
    }

    /**
     * Open powers
     */
    openPowers() {
        this.showModal('Powers', `
            <div class="powers-content">
                <h4>User Powers</h4>
                <p>Power management coming soon!</p>
            </div>
        `);
    }

    /**
     * Open store
     */
    openStore() {
        this.showModal('Store', `
            <div class="store-content">
                <h4>Xat Store</h4>
                <p>Store functionality coming soon!</p>
            </div>
        `);
    }

    /**
     * Open groups
     */
    openGroups() {
        this.showModal('Groups', `
            <div class="groups-content">
                <h4>Groups</h4>
                <p>Group management coming soon!</p>
            </div>
        `);
    }

    /**
     * Open help
     */
    openHelp() {
        this.showModal('Help', `
            <div class="help-content">
                <h4>Help & Commands</h4>
                <div class="help-section">
                    <h5>Keyboard Shortcuts</h5>
                    <ul>
                        <li><kbd>Enter</kbd> - Send message</li>
                        <li><kbd>Ctrl/Cmd + K</kbd> - Focus message input</li>
                        <li><kbd>Ctrl/Cmd + /</kbd> - Open help</li>
                        <li><kbd>Escape</kbd> - Close modals</li>
                    </ul>
                </div>
                <div class="help-section">
                    <h5>Chat Commands</h5>
                    <ul>
                        <li><code>/help</code> - Show this help</li>
                        <li><code>/clear</code> - Clear chat</li>
                        <li><code>/who</code> - Show online users</li>
                    </ul>
                </div>
            </div>
        `);
    }

    /**
     * Open smilies
     */
    openSmilies() {
        this.showModal('Smilies', `
            <div class="smilies-content">
                <h4>Smilies</h4>
                <div class="smilies-grid">
                    <button onclick="this.insertSmiley(':)')" class="smiley-btn">:)</button>
                    <button onclick="this.insertSmiley(':(')" class="smiley-btn">:(</button>
                    <button onclick="this.insertSmiley(':D')" class="smiley-btn">:D</button>
                    <button onclick="this.insertSmiley(';)')" class="smiley-btn">;)</button>
                    <button onclick="this.insertSmiley(':P')" class="smiley-btn">:P</button>
                    <button onclick="this.insertSmiley(':|')" class="smiley-btn">:|</button>
                </div>
            </div>
        `);
    }

    /**
     * Open pawns
     */
    openPawns() {
        this.showModal('Pawns', `
            <div class="pawns-content">
                <h4>Pawns & Avatars</h4>
                <p>Pawn selection coming soon!</p>
            </div>
        `);
    }

    /**
     * Open games
     */
    openGames() {
        this.showModal('Games', `
            <div class="games-content">
                <h4>Games</h4>
                <p>Game selection coming soon!</p>
            </div>
        `);
    }

    /**
     * Open radio
     */
    openRadio() {
        this.showModal('Radio', `
            <div class="radio-content">
                <h4>Radio</h4>
                <p>Radio functionality coming soon!</p>
            </div>
        `);
    }

    /**
     * Open settings
     */
    openSettings() {
        this.showModal('Settings', `
            <div class="settings-content">
                <h4>Settings</h4>
                <p>Settings panel coming soon!</p>
            </div>
        `);
    }

    /**
     * Insert smiley
     */
    insertSmiley(smiley) {
        const messageInput = document.getElementById('messageInput');
        if (messageInput) {
            messageInput.value += smiley;
            messageInput.focus();
        }
        this.closeModal();
    }

    /**
     * Get UI state
     */
    getUIState() {
        return {
            isSidebarOpen: this.isSidebarOpen,
            isUserListOpen: this.isUserListOpen,
            isQuickbarOpen: this.isQuickbarOpen,
            currentModal: this.currentModal ? true : false
        };
    }

    /**
     * Cleanup and destroy
     */
    destroy() {
        this.closeAllModals();
        this.initialized = false;
        console.log('✅ UserInterface destroyed');
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserInterface;
} else if (typeof window !== 'undefined') {
    window.UserInterface = UserInterface;
}
