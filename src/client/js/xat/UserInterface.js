/**
 * UserInterface - Complete xat.com user interface components
 * Handles all UI interactions, settings, profiles, moderation, etc.
 */

class UserInterface {
    constructor(xatInterface) {
        this.xat = xatInterface;
        this.openModals = new Set();
        this.currentSettings = {};
        this.moduleName = 'UserInterface';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.createModals();
        this.setupGlobalFunctions();
        logger.debug(this.moduleName, 'User interface initialized');
    }

    /**
     * Setup event listeners for UI interactions
     */
    setupEventListeners() {
        // Header navigation clicks
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-nav]')) {
                this.handleNavigation(e.target.dataset.nav);
            }
        });

        // User clicks in user list
        document.addEventListener('click', (e) => {
            if (e.target.closest('.user-item')) {
                const userItem = e.target.closest('.user-item');
                const userId = userItem.dataset.userId;
                this.handleUserClick(userId, e);
            }
        });

        // Settings button click
        document.addEventListener('click', (e) => {
            if (e.target.id === 'settingsBtn') {
                this.openChatSettings();
            }
        });

        // Escape key closes modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
    }

    /**
     * Create all modal interfaces
     */
    createModals() {
        this.createUserProfileModal();
        this.createChatSettingsModal();
        this.createModerationModal();
        this.createEditRoomModal();
        this.createTradeModal();
        this.createSmileyPickerModal();
    }

    /**
     * Handle navigation clicks
     */
    handleNavigation(nav) {
        switch (nav) {
            case 'home':
                window.location.href = '/';
                break;
            case 'chat':
                // Already on chat
                break;
            case 'groups':
                window.location.href = '/groups.html';
                break;
            case 'powers':
                this.openPowersStore();
                break;
            case 'store':
                this.openMainStore();
                break;
        }
    }

    /**
     * Handle user clicks for profile/actions
     */
    handleUserClick(userId, event) {
        const user = this.xat.users.get(userId);
        if (!user) return;

        // Right click or long press for context menu
        if (event.button === 2 || event.type === 'contextmenu') {
            event.preventDefault();
            this.showUserContextMenu(user, event.clientX, event.clientY);
        } else {
            // Left click for profile
            this.showUserProfile(user);
        }
    }

    /**
     * Show user context menu (right-click)
     */
    showUserContextMenu(user, x, y) {
        const currentUser = this.xat.currentUser;
        if (!currentUser) return;

        const contextMenu = document.createElement('div');
        contextMenu.className = 'user-context-menu xat-modal';
        contextMenu.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            z-index: 10000;
            min-width: 120px;
            background: #1a1a1a;
            border: 1px solid #333333;
            border-radius: 3px;
            padding: 5px 0;
        `;

        const actions = [];

        // Basic actions
        actions.push({ label: 'View Profile', action: () => this.showUserProfile(user) });
        actions.push({ label: 'Private Chat', action: () => this.startPrivateChat(user) });
        
        if (user.id !== currentUser.id) {
            actions.push({ label: 'Kiss', action: () => this.sendKiss(user) });
            actions.push({ label: 'Hug', action: () => this.sendHug(user) });
        }

        // Moderation actions (if user has permissions)
        if (this.canModerate(currentUser, user)) {
            actions.push({ label: '─────────', action: null }); // Separator
            actions.push({ label: 'Kick', action: () => this.kickUser(user) });
            actions.push({ label: 'Ban', action: () => this.banUser(user) });
            
            if (user.rank === 'guest') {
                actions.push({ label: 'Make Member', action: () => this.promoteUser(user, 'member') });
            }
            if (user.rank === 'member' && currentUser.rank === 'owner') {
                actions.push({ label: 'Make Moderator', action: () => this.promoteUser(user, 'moderator') });
            }
        }

        // Create menu items
        actions.forEach(action => {
            if (action.label === '─────────') {
                const separator = document.createElement('div');
                separator.style.cssText = 'height: 1px; background: #333; margin: 3px 0;';
                contextMenu.appendChild(separator);
                return;
            }

            const item = document.createElement('div');
            item.className = 'context-menu-item';
            item.textContent = action.label;
            item.style.cssText = `
                padding: 5px 10px;
                cursor: pointer;
                font-size: 11px;
                color: #ffffff;
                transition: background 0.1s;
            `;
            
            item.addEventListener('mouseenter', () => {
                item.style.background = '#333333';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.background = 'transparent';
            });
            
            if (action.action) {
                item.addEventListener('click', () => {
                    action.action();
                    this.closeContextMenu();
                });
            }
            
            contextMenu.appendChild(item);
        });

        // Close menu on outside click
        const closeMenu = (e) => {
            if (!contextMenu.contains(e.target)) {
                this.closeContextMenu();
                document.removeEventListener('click', closeMenu);
            }
        };
        
        setTimeout(() => {
            document.addEventListener('click', closeMenu);
        }, 100);

        document.body.appendChild(contextMenu);
        this.currentContextMenu = contextMenu;
    }

    /**
     * Close context menu
     */
    closeContextMenu() {
        if (this.currentContextMenu) {
            this.currentContextMenu.remove();
            this.currentContextMenu = null;
        }
    }

    /**
     * Check if user can moderate another user
     */
    canModerate(moderator, target) {
        const ranks = { guest: 0, member: 1, moderator: 2, owner: 3 };
        const modRank = ranks[moderator.rank] || 0;
        const targetRank = ranks[target.rank] || 0;
        
        return modRank > targetRank && modRank >= 2; // Must be at least moderator
    }

    /**
     * Create user profile modal
     */
    createUserProfileModal() {
        const modal = document.createElement('div');
        modal.id = 'user-profile-modal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content xat-modal">
                <div class="modal-header xat-modal-header">
                    <h3>User Profile</h3>
                    <span class="close">&times;</span>
                </div>
                <div class="modal-body xat-modal-body" id="userProfileContent">
                    <!-- Profile content will be loaded here -->
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        this.setupModalEvents(modal);
    }

    /**
     * Create chat settings modal
     */
    createChatSettingsModal() {
        const modal = document.createElement('div');
        modal.id = 'chat-settings-modal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content xat-modal" style="width: 500px;">
                <div class="modal-header xat-modal-header">
                    <h3>Chat Settings</h3>
                    <span class="close">&times;</span>
                </div>
                <div class="modal-body xat-modal-body">
                    <div class="settings-tabs">
                        <div class="tab active" data-tab="general">General</div>
                        <div class="tab" data-tab="appearance">Appearance</div>
                        <div class="tab" data-tab="sounds">Sounds</div>
                        <div class="tab" data-tab="privacy">Privacy</div>
                    </div>
                    <div class="settings-content" id="settingsContent">
                        <!-- Settings content -->
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        this.setupModalEvents(modal);
        this.setupSettingsModal(modal);
    }

    /**
     * Create edit room modal
     */
    createEditRoomModal() {
        const modal = document.createElement('div');
        modal.id = 'edit-room-modal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content xat-modal" style="width: 600px;">
                <div class="modal-header xat-modal-header">
                    <h3>Edit Chat Room</h3>
                    <span class="close">&times;</span>
                </div>
                <div class="modal-body xat-modal-body">
                    <form id="editRoomForm">
                        <div class="form-group">
                            <label>Room Name:</label>
                            <input type="text" id="roomName" class="xat-input" style="width: 100%;" />
                        </div>
                        <div class="form-group">
                            <label>Description:</label>
                            <textarea id="roomDescription" class="xat-input" rows="3" style="width: 100%;"></textarea>
                        </div>
                        <div class="form-group">
                            <label>Background:</label>
                            <select id="roomBackground" class="xat-input">
                                <option value="">Default</option>
                                <option value="space">Space</option>
                                <option value="ocean">Ocean</option>
                                <option value="forest">Forest</option>
                                <option value="city">City</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>
                                <input type="checkbox" id="roomPassword" />
                                Password Protected
                            </label>
                            <input type="password" id="roomPasswordValue" class="xat-input" style="margin-left: 10px;" placeholder="Enter password" disabled />
                        </div>
                        <div class="form-group">
                            <label>Maximum Users:</label>
                            <select id="maxUsers" class="xat-input">
                                <option value="50">50</option>
                                <option value="100">100</option>
                                <option value="200">200</option>
                                <option value="500">500</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Chat Rules:</label>
                            <textarea id="roomRules" class="xat-input" rows="4" style="width: 100%;" placeholder="Enter chat rules..."></textarea>
                        </div>
                    </form>
                </div>
                <div class="xat-modal-footer">
                    <button type="button" class="xat-button" onclick="closeModal('edit-room-modal')">Cancel</button>
                    <button type="button" class="xat-button primary" onclick="saveRoomSettings()">Save Changes</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        this.setupModalEvents(modal);
    }

    /**
     * Create trade modal
     */
    createTradeModal() {
        const modal = document.createElement('div');
        modal.id = 'trade-modal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content xat-modal" style="width: 700px;">
                <div class="modal-header xat-modal-header">
                    <h3>Trade with <span id="tradePartnerName"></span></h3>
                    <span class="close">&times;</span>
                </div>
                <div class="modal-body xat-modal-body">
                    <div class="trade-interface">
                        <div class="trade-side">
                            <h4>Your Items</h4>
                            <div class="trade-items" id="yourTradeItems">
                                <!-- Your trade items -->
                            </div>
                            <div class="add-item-section">
                                <select id="yourItemSelect" class="xat-input">
                                    <option value="">Select item to add...</option>
                                </select>
                                <button type="button" class="xat-button" onclick="addTradeItem('yours')">Add</button>
                            </div>
                        </div>
                        
                        <div class="trade-center">
                            <div class="trade-status">
                                <div class="trade-ready" id="yourReady">You: Not Ready</div>
                                <div class="trade-ready" id="partnerReady">Partner: Not Ready</div>
                            </div>
                        </div>
                        
                        <div class="trade-side">
                            <h4><span id="partnerNameInTrade"></span>'s Items</h4>
                            <div class="trade-items" id="partnerTradeItems">
                                <!-- Partner's trade items -->
                            </div>
                        </div>
                    </div>
                </div>
                <div class="xat-modal-footer">
                    <button type="button" class="xat-button" onclick="cancelTrade()">Cancel Trade</button>
                    <button type="button" class="xat-button" id="readyButton" onclick="toggleTradeReady()">Ready</button>
                    <button type="button" class="xat-button primary" id="acceptButton" onclick="acceptTrade()" disabled>Accept Trade</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        this.setupModalEvents(modal);
    }

    /**
     * Create smiley picker modal
     */
    createSmileyPickerModal() {
        const modal = document.createElement('div');
        modal.id = 'smiley-picker-modal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content xat-modal" style="width: 400px;">
                <div class="modal-header xat-modal-header">
                    <h3>Smilies</h3>
                    <span class="close">&times;</span>
                </div>
                <div class="modal-body xat-modal-body">
                    <div class="smiley-categories">
                        <div class="category active" data-category="basic">Basic</div>
                        <div class="category" data-category="emotions">Emotions</div>
                        <div class="category" data-category="animals">Animals</div>
                        <div class="category" data-category="special">Special</div>
                    </div>
                    <div class="smiley-grid" id="smileyGrid">
                        <!-- Smilies will be loaded here -->
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        this.setupModalEvents(modal);
        this.setupSmileyPicker(modal);
    }

    /**
     * Setup modal event listeners
     */
    setupModalEvents(modal) {
        const closeBtn = modal.querySelector('.close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.closeModal(modal.id);
            });
        }

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal(modal.id);
            }
        });
    }

    /**
     * Show user profile
     */
    showUserProfile(user) {
        const modal = document.getElementById('user-profile-modal');
        const content = document.getElementById('userProfileContent');
        
        content.innerHTML = `
            <div class="user-profile">
                <div class="profile-header">
                    <div class="profile-avatar">
                        <img src="assets/images/avatar/${user.avatar || 0}.png" alt="Avatar" onerror="this.style.display='none'" />
                    </div>
                    <div class="profile-info">
                        <h3 class="username ${user.rank}">${user.username}</h3>
                        <div class="user-rank">${this.getRankDisplay(user.rank)}</div>
                        <div class="user-stats">
                            <div>Xats: ${user.xats || 0}</div>
                            <div>Days: ${user.days || 0}</div>
                        </div>
                    </div>
                </div>
                
                <div class="profile-sections">
                    <div class="profile-section">
                        <h4>Status</h4>
                        <p>${user.status || 'No status set'}</p>
                    </div>
                    
                    <div class="profile-section">
                        <h4>Powers</h4>
                        <div class="user-powers">
                            ${this.renderUserPowers(user)}
                        </div>
                    </div>
                    
                    <div class="profile-section">
                        <h4>Pawns</h4>
                        <div class="user-pawns">
                            ${this.renderUserPawns(user)}
                        </div>
                    </div>
                </div>
                
                <div class="profile-actions">
                    ${user.id !== this.xat.currentUser?.id ? `
                        <button class="xat-button" onclick="startPrivateChat('${user.id}')">Private Chat</button>
                        <button class="xat-button" onclick="sendKiss('${user.id}')">Kiss</button>
                        <button class="xat-button" onclick="sendHug('${user.id}')">Hug</button>
                        <button class="xat-button" onclick="initiateTrade('${user.id}')">Trade</button>
                    ` : `
                        <button class="xat-button primary" onclick="editProfile()">Edit Profile</button>
                    `}
                </div>
            </div>
        `;

        this.showModal('user-profile-modal');
    }

    /**
     * Open chat settings
     */
    openChatSettings() {
        this.showModal('chat-settings-modal');
        this.loadSettingsContent('general');
    }

    /**
     * Setup settings modal
     */
    setupSettingsModal(modal) {
        const tabs = modal.querySelectorAll('.tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                this.loadSettingsContent(tab.dataset.tab);
            });
        });
    }

    /**
     * Load settings content
     */
    loadSettingsContent(tab) {
        const content = document.getElementById('settingsContent');
        
        switch (tab) {
            case 'general':
                content.innerHTML = this.getGeneralSettings();
                break;
            case 'appearance':
                content.innerHTML = this.getAppearanceSettings();
                break;
            case 'sounds':
                content.innerHTML = this.getSoundSettings();
                break;
            case 'privacy':
                content.innerHTML = this.getPrivacySettings();
                break;
        }
    }

    /**
     * Get general settings HTML
     */
    getGeneralSettings() {
        return `
            <div class="settings-section">
                <h4>Chat Preferences</h4>
                <label>
                    <input type="checkbox" id="enableAutoScroll" checked />
                    Auto-scroll to new messages
                </label>
                <label>
                    <input type="checkbox" id="showTimestamps" checked />
                    Show message timestamps
                </label>
                <label>
                    <input type="checkbox" id="enableNotifications" />
                    Desktop notifications
                </label>
                <label>
                    <input type="checkbox" id="highlightMentions" checked />
                    Highlight @mentions
                </label>
            </div>
            
            <div class="settings-section">
                <h4>Message Settings</h4>
                <label>
                    Message Length Limit:
                    <select id="messageLimit" class="xat-input">
                        <option value="250">250 characters</option>
                        <option value="500" selected>500 characters</option>
                        <option value="1000">1000 characters</option>
                    </select>
                </label>
                <label>
                    <input type="checkbox" id="allowHtml" />
                    Allow HTML in messages (dangerous)
                </label>
            </div>
        `;
    }

    /**
     * Get appearance settings HTML
     */
    getAppearanceSettings() {
        return `
            <div class="settings-section">
                <h4>Chat Theme</h4>
                <label>
                    Theme:
                    <select id="chatTheme" class="xat-input">
                        <option value="classic" selected>Classic xat.com</option>
                        <option value="dark">Dark Mode</option>
                        <option value="light">Light Mode</option>
                        <option value="custom">Custom</option>
                    </select>
                </label>
                <label>
                    Font Size:
                    <select id="fontSize" class="xat-input">
                        <option value="10">10px</option>
                        <option value="11">11px</option>
                        <option value="12" selected>12px</option>
                        <option value="13">13px</option>
                        <option value="14">14px</option>
                    </select>
                </label>
            </div>
            
            <div class="settings-section">
                <h4>User Interface</h4>
                <label>
                    <input type="checkbox" id="showUserPawns" checked />
                    Show user pawns
                </label>
                <label>
                    <input type="checkbox" id="animatedEffects" checked />
                    Enable animated effects
                </label>
                <label>
                    <input type="checkbox" id="compactMode" />
                    Compact message display
                </label>
            </div>
        `;
    }

    /**
     * Get sound settings HTML
     */
    getSoundSettings() {
        return `
            <div class="settings-section">
                <h4>Sound Effects</h4>
                <label>
                    <input type="checkbox" id="enableSounds" checked />
                    Enable sound effects
                </label>
                <label>
                    Master Volume:
                    <input type="range" id="masterVolume" min="0" max="100" value="50" class="volume-slider" />
                    <span id="volumeDisplay">50%</span>
                </label>
            </div>
            
            <div class="settings-section">
                <h4>Specific Sounds</h4>
                <label>
                    <input type="checkbox" id="messageSound" checked />
                    New message sound
                </label>
                <label>
                    <input type="checkbox" id="mentionSound" checked />
                    @mention sound
                </label>
                <label>
                    <input type="checkbox" id="powerSound" />
                    Power activation sound
                </label>
                <label>
                    <input type="checkbox" id="userJoinSound" />
                    User join/leave sounds
                </label>
            </div>
        `;
    }

    /**
     * Get privacy settings HTML
     */
    getPrivacySettings() {
        return `
            <div class="settings-section">
                <h4>Privacy Controls</h4>
                <label>
                    <input type="checkbox" id="allowPrivateMessages" checked />
                    Allow private messages
                </label>
                <label>
                    <input type="checkbox" id="allowKissHug" checked />
                    Allow kiss/hug from others
                </label>
                <label>
                    <input type="checkbox" id="allowTrade" checked />
                    Allow trade requests
                </label>
                <label>
                    <input type="checkbox" id="showOnlineStatus" checked />
                    Show online status to others
                </label>
            </div>
            
            <div class="settings-section">
                <h4>Blocked Users</h4>
                <div id="blockedUsersList">
                    <p>No blocked users</p>
                </div>
                <button type="button" class="xat-button" onclick="manageBlockedUsers()">Manage Blocked Users</button>
            </div>
        `;
    }

    /**
     * Setup smiley picker
     */
    setupSmileyPicker(modal) {
        const categories = modal.querySelectorAll('.category');
        categories.forEach(category => {
            category.addEventListener('click', () => {
                categories.forEach(c => c.classList.remove('active'));
                category.classList.add('active');
                this.loadSmileyCategory(category.dataset.category);
            });
        });
        
        this.loadSmileyCategory('basic');
    }

    /**
     * Load smiley category
     */
    loadSmileyCategory(category) {
        const grid = document.getElementById('smileyGrid');
        let smilies = [];
        
        switch (category) {
            case 'basic':
                smilies = [
                    { code: '(smile)', display: '😊', title: 'Smile' },
                    { code: '(grin)', display: '😄', title: 'Grin' },
                    { code: '(wink)', display: '😉', title: 'Wink' },
                    { code: '(sad)', display: '😢', title: 'Sad' },
                    { code: '(angry)', display: '😠', title: 'Angry' },
                    { code: '(cool)', display: '😎', title: 'Cool' },
                    { code: '(love)', display: '😍', title: 'Love' },
                    { code: '(kiss)', display: '😘', title: 'Kiss' }
                ];
                break;
            case 'emotions':
                smilies = [
                    { code: '(laugh)', display: '😂', title: 'Laugh' },
                    { code: '(cry)', display: '😭', title: 'Cry' },
                    { code: '(surprised)', display: '😮', title: 'Surprised' },
                    { code: '(confused)', display: '😕', title: 'Confused' },
                    { code: '(tongue)', display: '😛', title: 'Tongue' },
                    { code: '(roll)', display: '🙄', title: 'Eye Roll' }
                ];
                break;
            // Add more categories as needed
        }
        
        grid.innerHTML = smilies.map(smiley => `
            <div class="smiley-item" data-code="${smiley.code}" title="${smiley.title}">
                ${smiley.display}
            </div>
        `).join('');
        
        // Add click handlers
        grid.querySelectorAll('.smiley-item').forEach(item => {
            item.addEventListener('click', () => {
                this.insertSmiley(item.dataset.code);
                this.closeModal('smiley-picker-modal');
            });
        });
    }

    /**
     * Insert smiley into chat input
     */
    insertSmiley(code) {
        const input = document.getElementById('chat-input');
        if (input) {
            const start = input.selectionStart;
            const end = input.selectionEnd;
            const text = input.value;
            
            input.value = text.substring(0, start) + code + text.substring(end);
            input.selectionStart = input.selectionEnd = start + code.length;
            input.focus();
        }
    }

    /**
     * Render user powers
     */
    renderUserPowers(user) {
        if (!user.powers || user.powers.length === 0) {
            return '<p>No powers owned</p>';
        }
        
        return user.powers.map(power => `
            <div class="power-item">
                <div class="power-icon ${power}"></div>
                <span>${power}</span>
            </div>
        `).join('');
    }

    /**
     * Render user pawns
     */
    renderUserPawns(user) {
        if (!user.pawns || user.pawns.length === 0) {
            return '<p>No pawns owned</p>';
        }
        
        return user.pawns.map(pawn => `
            <div class="pawn-item">
                <div class="xat-pawn ${pawn}"></div>
                <span>${pawn}</span>
            </div>
        `).join('');
    }

    /**
     * Get rank display text
     */
    getRankDisplay(rank) {
        switch (rank) {
            case 'owner': return '👑 Owner';
            case 'moderator': return '🛡️ Moderator';
            case 'member': return '👥 Member';
            default: return '👤 Guest';
        }
    }

    /**
     * Show modal
     */
    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
            this.openModals.add(modalId);
        }
    }

    /**
     * Close modal
     */
    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
            this.openModals.delete(modalId);
        }
    }

    /**
     * Close all modals
     */
    closeAllModals() {
        this.openModals.forEach(modalId => {
            this.closeModal(modalId);
        });
        this.closeContextMenu();
    }

    /**
     * Global functions for HTML onclick handlers
     */
    setupGlobalFunctions() {
        window.closeModal = (modalId) => this.closeModal(modalId);
        window.openSmileyPicker = () => this.showModal('smiley-picker-modal');
        window.startPrivateChat = (userId) => this.startPrivateChat(this.xat.users.get(userId));
        window.sendKiss = (userId) => this.sendKiss(this.xat.users.get(userId));
        window.sendHug = (userId) => this.sendHug(this.xat.users.get(userId));
        window.initiateTrade = (userId) => this.initiateTrade(this.xat.users.get(userId));
        window.editProfile = () => this.editProfile();
    }

    /**
     * Start private chat
     */
    startPrivateChat(user) {
        // Implementation for private chat
        logger.debug(this.moduleName, 'Starting private chat with:', user.username);
    }

    /**
     * Send kiss
     */
    sendKiss(user) {
        this.xat.powerSystem.activatePower('kiss');
        this.xat.chatSystem.addSystemMessage(`You sent a kiss to ${user.username}! 😘`);
    }

    /**
     * Send hug  
     */
    sendHug(user) {
        this.xat.powerSystem.activatePower('hug');
        this.xat.chatSystem.addSystemMessage(`You sent a hug to ${user.username}! 🤗`);
    }

    /**
     * Initiate trade
     */
    initiateTrade(user) {
        // Implementation for trade system
        logger.debug(this.moduleName, 'Initiating trade with:', user.username);
    }

    /**
     * Edit profile
     */
    editProfile() {
        // Implementation for profile editing
        logger.debug(this.moduleName, 'Opening profile editor');
    }
}

// Make available globally
if (typeof window !== 'undefined') {
    window.UserInterface = UserInterface;
}