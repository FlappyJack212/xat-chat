/**
 * Advanced Moderation Interface
 * Provides comprehensive moderation tools and group management
 */

class ModerationInterface {
    constructor(groupPowersManager) {
        this.groupPowersManager = groupPowersManager;
        this.isOpen = false;
        this.currentTab = 'actions';
        this.modal = null;
        this.userList = [];
        this.selectedUser = null;
        this.moderationHistory = [];
        
        this.init();
    }

    /**
     * Initialize the moderation interface
     */
    init() {
        this.createModal();
        this.setupEventListeners();
        console.log('🛡️ [MOD] Moderation interface initialized');
    }

    /**
     * Create the modal UI
     */
    createModal() {
        // Create modal container
        this.modal = document.createElement('div');
        this.modal.className = 'moderation-modal';
        this.modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 10000;
            display: none;
            align-items: center;
            justify-content: center;
            font-family: Arial, sans-serif;
        `;

        // Create modal content
        const content = document.createElement('div');
        content.className = 'moderation-content';
        content.style.cssText = `
            background: #2a2a2a;
            border-radius: 8px;
            width: 90%;
            max-width: 1000px;
            height: 80%;
            max-height: 700px;
            display: flex;
            flex-direction: column;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        `;

        // Create header
        const header = this.createHeader();
        content.appendChild(header);

        // Create tabs
        const tabs = this.createTabs();
        content.appendChild(tabs);

        // Create main content area
        const mainContent = this.createMainContent();
        content.appendChild(mainContent);

        // Create footer
        const footer = this.createFooter();
        content.appendChild(footer);

        this.modal.appendChild(content);
        document.body.appendChild(this.modal);
    }

    /**
     * Create modal header
     */
    createHeader() {
        const header = document.createElement('div');
        header.className = 'moderation-header';
        header.style.cssText = `
            padding: 20px;
            border-bottom: 1px solid #444;
            display: flex;
            justify-content: space-between;
            align-items: center;
        `;

        const title = document.createElement('h2');
        title.textContent = 'Advanced Moderation Tools';
        title.style.cssText = `
            color: #fff;
            margin: 0;
            font-size: 24px;
        `;

        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '×';
        closeBtn.style.cssText = `
            background: #ff4444;
            color: white;
            border: none;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            font-size: 18px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        closeBtn.onclick = () => this.close();

        header.appendChild(title);
        header.appendChild(closeBtn);
        return header;
    }

    /**
     * Create tabs
     */
    createTabs() {
        const tabsContainer = document.createElement('div');
        tabsContainer.className = 'moderation-tabs';
        tabsContainer.style.cssText = `
            display: flex;
            border-bottom: 1px solid #444;
        `;

        const tabs = [
            { id: 'actions', name: 'Moderation Actions', icon: '🛡️' },
            { id: 'users', name: 'User Management', icon: '👥' },
            { id: 'settings', name: 'Group Settings', icon: '⚙️' },
            { id: 'rules', name: 'Auto-Moderation', icon: '🤖' },
            { id: 'history', name: 'Moderation Log', icon: '📋' },
            { id: 'powers', name: 'Group Powers', icon: '⭐' }
        ];

        tabs.forEach(tab => {
            const tabElement = document.createElement('button');
            tabElement.className = 'moderation-tab';
            tabElement.dataset.tab = tab.id;
            tabElement.innerHTML = `
                <span class="tab-icon">${tab.icon}</span>
                <span class="tab-text">${tab.name}</span>
            `;
            tabElement.style.cssText = `
                flex: 1;
                padding: 15px 20px;
                border: none;
                background: #333;
                color: #fff;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 8px;
                font-size: 14px;
                transition: all 0.2s;
            `;
            
            if (tab.id === 'actions') {
                tabElement.style.background = '#007acc';
            }

            tabElement.addEventListener('click', () => {
                this.setActiveTab(tab.id);
            });

            tabsContainer.appendChild(tabElement);
        });

        return tabsContainer;
    }

    /**
     * Create main content area
     */
    createMainContent() {
        const content = document.createElement('div');
        content.className = 'moderation-main-content';
        content.style.cssText = `
            flex: 1;
            padding: 20px;
            overflow-y: auto;
        `;

        // Create tab content containers
        this.createActionsTab(content);
        this.createUsersTab(content);
        this.createSettingsTab(content);
        this.createRulesTab(content);
        this.createHistoryTab(content);
        this.createPowersTab(content);

        return content;
    }

    /**
     * Create actions tab
     */
    createActionsTab(container) {
        const actionsTab = document.createElement('div');
        actionsTab.id = 'actions-tab';
        actionsTab.className = 'moderation-tab-content';
        actionsTab.style.cssText = `
            display: block;
        `;

        actionsTab.innerHTML = `
            <div class="moderation-actions">
                <div class="action-section">
                    <h3>Quick Actions</h3>
                    <div class="action-buttons">
                        <button class="action-btn kick-btn" onclick="moderationInterface.kickUser()">
                            <span class="btn-icon">👢</span>
                            <span>Kick User</span>
                        </button>
                        <button class="action-btn ban-btn" onclick="moderationInterface.banUser()">
                            <span class="btn-icon">🚫</span>
                            <span>Ban User</span>
                        </button>
                        <button class="action-btn mute-btn" onclick="moderationInterface.muteUser()">
                            <span class="btn-icon">🔇</span>
                            <span>Mute User</span>
                        </button>
                        <button class="action-btn warn-btn" onclick="moderationInterface.warnUser()">
                            <span class="btn-icon">⚠️</span>
                            <span>Warn User</span>
                        </button>
                    </div>
                </div>

                <div class="action-section">
                    <h3>Advanced Actions</h3>
                    <div class="action-buttons">
                        <button class="action-btn promote-btn" onclick="moderationInterface.promoteUser()">
                            <span class="btn-icon">⬆️</span>
                            <span>Promote User</span>
                        </button>
                        <button class="action-btn demote-btn" onclick="moderationInterface.demoteUser()">
                            <span class="btn-icon">⬇️</span>
                            <span>Demote User</span>
                        </button>
                        <button class="action-btn kickall-btn" onclick="moderationInterface.kickAllUsers()">
                            <span class="btn-icon">👥</span>
                            <span>Kick All</span>
                        </button>
                        <button class="action-btn hush-btn" onclick="moderationInterface.hushChat()">
                            <span class="btn-icon">🤫</span>
                            <span>Hush Chat</span>
                        </button>
                    </div>
                </div>

                <div class="action-section">
                    <h3>Special Powers</h3>
                    <div class="action-buttons">
                        <button class="action-btn blastban-btn" onclick="moderationInterface.blastBan()">
                            <span class="btn-icon">💥</span>
                            <span>Blast Ban</span>
                        </button>
                        <button class="action-btn blastkick-btn" onclick="moderationInterface.blastKick()">
                            <span class="btn-icon">💥</span>
                            <span>Blast Kick</span>
                        </button>
                        <button class="action-btn banish-btn" onclick="moderationInterface.banishUser()">
                            <span class="btn-icon">👻</span>
                            <span>Banish</span>
                        </button>
                        <button class="action-btn sinbin-btn" onclick="moderationInterface.sinbinUser()">
                            <span class="btn-icon">⏰</span>
                            <span>Sinbin</span>
                        </button>
                    </div>
                </div>
            </div>
        `;

        container.appendChild(actionsTab);
    }

    /**
     * Create users tab
     */
    createUsersTab(container) {
        const usersTab = document.createElement('div');
        usersTab.id = 'users-tab';
        usersTab.className = 'moderation-tab-content';
        usersTab.style.cssText = `
            display: none;
        `;

        usersTab.innerHTML = `
            <div class="users-management">
                <div class="users-header">
                    <h3>User Management</h3>
                    <div class="user-search">
                        <input type="text" id="userSearch" placeholder="Search users..." class="search-input">
                    </div>
                </div>
                <div class="users-list" id="usersList">
                    <!-- Users will be populated here -->
                </div>
            </div>
        `;

        container.appendChild(usersTab);
    }

    /**
     * Create settings tab
     */
    createSettingsTab(container) {
        const settingsTab = document.createElement('div');
        settingsTab.id = 'settings-tab';
        settingsTab.className = 'moderation-tab-content';
        settingsTab.style.cssText = `
            display: none;
        `;

        settingsTab.innerHTML = `
            <div class="group-settings">
                <h3>Group Settings</h3>
                <div class="settings-grid">
                    <div class="setting-group">
                        <label>Group Name:</label>
                        <input type="text" id="groupName" class="setting-input">
                    </div>
                    <div class="setting-group">
                        <label>Description:</label>
                        <textarea id="groupDescription" class="setting-textarea"></textarea>
                    </div>
                    <div class="setting-group">
                        <label>Max Users:</label>
                        <input type="number" id="maxUsers" class="setting-input" min="1" max="1000">
                    </div>
                    <div class="setting-group">
                        <label>Password:</label>
                        <input type="password" id="groupPassword" class="setting-input">
                    </div>
                    <div class="setting-group">
                        <label>Private Group:</label>
                        <input type="checkbox" id="isPrivate" class="setting-checkbox">
                    </div>
                    <div class="setting-group">
                        <label>Allow Guests:</label>
                        <input type="checkbox" id="allowGuests" class="setting-checkbox" checked>
                    </div>
                    <div class="setting-group">
                        <label>Auto Moderation:</label>
                        <input type="checkbox" id="autoModeration" class="setting-checkbox">
                    </div>
                    <div class="setting-group">
                        <label>Profanity Filter:</label>
                        <input type="checkbox" id="profanityFilter" class="setting-checkbox" checked>
                    </div>
                    <div class="setting-group">
                        <label>Spam Protection:</label>
                        <input type="checkbox" id="spamProtection" class="setting-checkbox" checked>
                    </div>
                    <div class="setting-group">
                        <label>Flood Protection:</label>
                        <input type="checkbox" id="floodProtection" class="setting-checkbox" checked>
                    </div>
                    <div class="setting-group">
                        <label>Caps Protection:</label>
                        <input type="checkbox" id="capsProtection" class="setting-checkbox" checked>
                    </div>
                    <div class="setting-group">
                        <label>Link Protection:</label>
                        <input type="checkbox" id="linkProtection" class="setting-checkbox">
                    </div>
                </div>
            </div>
        `;

        container.appendChild(settingsTab);
    }

    /**
     * Create rules tab
     */
    createRulesTab(container) {
        const rulesTab = document.createElement('div');
        rulesTab.id = 'rules-tab';
        rulesTab.className = 'moderation-tab-content';
        rulesTab.style.cssText = `
            display: none;
        `;

        rulesTab.innerHTML = `
            <div class="auto-moderation">
                <h3>Auto-Moderation Rules</h3>
                <div class="rules-list" id="rulesList">
                    <!-- Rules will be populated here -->
                </div>
                <button class="btn-primary" onclick="moderationInterface.addRule()">Add Rule</button>
            </div>
        `;

        container.appendChild(rulesTab);
    }

    /**
     * Create history tab
     */
    createHistoryTab(container) {
        const historyTab = document.createElement('div');
        historyTab.id = 'history-tab';
        historyTab.className = 'moderation-tab-content';
        historyTab.style.cssText = `
            display: none;
        `;

        historyTab.innerHTML = `
            <div class="moderation-history">
                <h3>Moderation History</h3>
                <div class="history-filters">
                    <select id="actionFilter" class="filter-select">
                        <option value="">All Actions</option>
                        <option value="kick">Kicks</option>
                        <option value="ban">Bans</option>
                        <option value="mute">Mutes</option>
                        <option value="warn">Warnings</option>
                    </select>
                    <input type="date" id="dateFilter" class="filter-input">
                </div>
                <div class="history-list" id="historyList">
                    <!-- History will be populated here -->
                </div>
            </div>
        `;

        container.appendChild(historyTab);
    }

    /**
     * Create powers tab
     */
    createPowersTab(container) {
        const powersTab = document.createElement('div');
        powersTab.id = 'powers-tab';
        powersTab.className = 'moderation-tab-content';
        powersTab.style.cssText = `
            display: none;
        `;

        powersTab.innerHTML = `
            <div class="group-powers">
                <h3>Group Powers</h3>
                <div class="powers-grid" id="powersGrid">
                    <!-- Powers will be populated here -->
                </div>
            </div>
        `;

        container.appendChild(powersTab);
    }

    /**
     * Create footer
     */
    createFooter() {
        const footer = document.createElement('div');
        footer.className = 'moderation-footer';
        footer.style.cssText = `
            padding: 15px 20px;
            border-top: 1px solid #444;
            display: flex;
            justify-content: space-between;
            align-items: center;
        `;

        const status = document.createElement('div');
        status.className = 'moderation-status';
        status.textContent = 'Ready';
        status.style.cssText = `
            color: #ccc;
            font-size: 14px;
        `;

        const buttons = document.createElement('div');
        buttons.className = 'moderation-buttons';
        buttons.style.cssText = `
            display: flex;
            gap: 10px;
        `;

        const saveBtn = document.createElement('button');
        saveBtn.textContent = 'Save Settings';
        saveBtn.className = 'btn-primary';
        saveBtn.onclick = () => this.saveSettings();

        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'Close';
        closeBtn.className = 'btn-secondary';
        closeBtn.onclick = () => this.close();

        buttons.appendChild(saveBtn);
        buttons.appendChild(closeBtn);

        footer.appendChild(status);
        footer.appendChild(buttons);
        return footer;
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Listen for user selection
        document.addEventListener('click', (e) => {
            if (e.target.closest('.user-item')) {
                this.selectUser(e.target.closest('.user-item').dataset.userId);
            }
        });

        // Listen for moderation actions
        window.addEventListener('moderationAction', (event) => {
            this.handleModerationAction(event.detail);
        });
    }

    /**
     * Set active tab
     */
    setActiveTab(tabId) {
        // Update tab buttons
        this.modal.querySelectorAll('.moderation-tab').forEach(tab => {
            tab.style.background = '#333';
        });
        this.modal.querySelector(`[data-tab="${tabId}"]`).style.background = '#007acc';

        // Update tab content
        this.modal.querySelectorAll('.moderation-tab-content').forEach(content => {
            content.style.display = 'none';
        });
        this.modal.querySelector(`#${tabId}-tab`).style.display = 'block';

        this.currentTab = tabId;

        // Load tab-specific data
        this.loadTabData(tabId);
    }

    /**
     * Load tab-specific data
     */
    loadTabData(tabId) {
        switch (tabId) {
            case 'users':
                this.loadUsers();
                break;
            case 'settings':
                this.loadSettings();
                break;
            case 'rules':
                this.loadRules();
                break;
            case 'history':
                this.loadHistory();
                break;
            case 'powers':
                this.loadPowers();
                break;
        }
    }

    /**
     * Load users
     */
    loadUsers() {
        const usersList = this.modal.querySelector('#usersList');
        if (!usersList) return;

        // This would fetch users from the server
        const users = [
            { id: '1', username: 'User1', rank: 'member', status: 'online' },
            { id: '2', username: 'User2', rank: 'moderator', status: 'online' },
            { id: '3', username: 'User3', rank: 'guest', status: 'away' }
        ];

        usersList.innerHTML = users.map(user => `
            <div class="user-item" data-user-id="${user.id}">
                <div class="user-avatar">👤</div>
                <div class="user-info">
                    <div class="user-name">${user.username}</div>
                    <div class="user-rank">${user.rank}</div>
                </div>
                <div class="user-status ${user.status}">${user.status}</div>
                <div class="user-actions">
                    <button class="action-btn" onclick="moderationInterface.selectUser('${user.id}')">Select</button>
                </div>
            </div>
        `).join('');
    }

    /**
     * Load settings
     */
    loadSettings() {
        const settings = this.groupPowersManager.getGroupSettings();
        
        // Populate form fields
        const fields = [
            'groupName', 'groupDescription', 'maxUsers', 'groupPassword',
            'isPrivate', 'allowGuests', 'autoModeration', 'profanityFilter',
            'spamProtection', 'floodProtection', 'capsProtection', 'linkProtection'
        ];

        fields.forEach(field => {
            const element = this.modal.querySelector(`#${field}`);
            if (element) {
                if (element.type === 'checkbox') {
                    element.checked = settings[field] || false;
                } else {
                    element.value = settings[field] || '';
                }
            }
        });
    }

    /**
     * Load rules
     */
    loadRules() {
        const rulesList = this.modal.querySelector('#rulesList');
        if (!rulesList) return;

        const rules = this.groupPowersManager.getModerationRules();
        
        rulesList.innerHTML = Array.from(rules.entries()).map(([name, rule]) => `
            <div class="rule-item">
                <div class="rule-header">
                    <h4>${name.charAt(0).toUpperCase() + name.slice(1)} Protection</h4>
                    <label class="toggle">
                        <input type="checkbox" ${rule.enabled ? 'checked' : ''} onchange="moderationInterface.toggleRule('${name}')">
                        <span class="slider"></span>
                    </label>
                </div>
                <div class="rule-details">
                    <p>Action: ${rule.action}</p>
                    <p>Message: ${rule.message}</p>
                </div>
            </div>
        `).join('');
    }

    /**
     * Load history
     */
    loadHistory() {
        const historyList = this.modal.querySelector('#historyList');
        if (!historyList) return;

        const history = this.groupPowersManager.getModerationLog();
        
        historyList.innerHTML = history.map(entry => `
            <div class="history-item">
                <div class="history-action">${entry.action}</div>
                <div class="history-target">${entry.target?.username || 'N/A'}</div>
                <div class="history-moderator">${entry.moderator?.username || 'N/A'}</div>
                <div class="history-time">${new Date(entry.timestamp).toLocaleString()}</div>
            </div>
        `).join('');
    }

    /**
     * Load powers
     */
    loadPowers() {
        const powersGrid = this.modal.querySelector('#powersGrid');
        if (!powersGrid) return;

        const powers = this.groupPowersManager.getAvailableGroupPowers();
        
        powersGrid.innerHTML = powers.map(power => `
            <div class="power-item">
                <div class="power-icon">⭐</div>
                <div class="power-info">
                    <div class="power-name">${power.name}</div>
                    <div class="power-description">${power.description}</div>
                    <div class="power-cost">${power.cost} xats</div>
                </div>
                <button class="power-activate" onclick="moderationInterface.activatePower('${power.id}')">
                    Activate
                </button>
            </div>
        `).join('');
    }

    /**
     * Select user
     */
    selectUser(userId) {
        this.selectedUser = userId;
        
        // Update UI to show selected user
        this.modal.querySelectorAll('.user-item').forEach(item => {
            item.classList.remove('selected');
        });
        
        const selectedItem = this.modal.querySelector(`[data-user-id="${userId}"]`);
        if (selectedItem) {
            selectedItem.classList.add('selected');
        }
    }

    /**
     * Kick user
     */
    kickUser() {
        if (!this.selectedUser) {
            this.showNotification('Please select a user first', 'error');
            return;
        }

        const reason = prompt('Reason for kick:');
        if (reason) {
            this.groupPowersManager.handleModerationCommand({
                command: 'kick',
                targetUser: this.selectedUser,
                parameters: { reason }
            });
        }
    }

    /**
     * Ban user
     */
    banUser() {
        if (!this.selectedUser) {
            this.showNotification('Please select a user first', 'error');
            return;
        }

        const duration = prompt('Ban duration (hours):');
        const reason = prompt('Reason for ban:');
        
        if (duration && reason) {
            this.groupPowersManager.handleModerationCommand({
                command: 'ban',
                targetUser: this.selectedUser,
                parameters: { duration: parseInt(duration), reason }
            });
        }
    }

    /**
     * Mute user
     */
    muteUser() {
        if (!this.selectedUser) {
            this.showNotification('Please select a user first', 'error');
            return;
        }

        const duration = prompt('Mute duration (minutes):');
        const reason = prompt('Reason for mute:');
        
        if (duration && reason) {
            this.groupPowersManager.handleModerationCommand({
                command: 'mute',
                targetUser: this.selectedUser,
                parameters: { duration: parseInt(duration), reason }
            });
        }
    }

    /**
     * Warn user
     */
    warnUser() {
        if (!this.selectedUser) {
            this.showNotification('Please select a user first', 'error');
            return;
        }

        const reason = prompt('Warning reason:');
        if (reason) {
            this.groupPowersManager.handleModerationCommand({
                command: 'warn',
                targetUser: this.selectedUser,
                parameters: { reason }
            });
        }
    }

    /**
     * Promote user
     */
    promoteUser() {
        if (!this.selectedUser) {
            this.showNotification('Please select a user first', 'error');
            return;
        }

        const newRank = prompt('New rank (moderator/owner):');
        if (newRank) {
            this.groupPowersManager.handleModerationCommand({
                command: 'promote',
                targetUser: this.selectedUser,
                parameters: { newRank }
            });
        }
    }

    /**
     * Demote user
     */
    demoteUser() {
        if (!this.selectedUser) {
            this.showNotification('Please select a user first', 'error');
            return;
        }

        const newRank = prompt('New rank (member/guest):');
        if (newRank) {
            this.groupPowersManager.handleModerationCommand({
                command: 'demote',
                targetUser: this.selectedUser,
                parameters: { newRank }
            });
        }
    }

    /**
     * Kick all users
     */
    kickAllUsers() {
        const reason = prompt('Reason for kicking all users:');
        if (reason) {
            this.groupPowersManager.handleModerationCommand({
                command: 'kickall',
                parameters: { reason }
            });
        }
    }

    /**
     * Hush chat
     */
    hushChat() {
        const duration = prompt('Hush duration (minutes):');
        if (duration) {
            this.groupPowersManager.handleModerationCommand({
                command: 'hush',
                parameters: { duration: parseInt(duration) }
            });
        }
    }

    /**
     * Blast ban
     */
    blastBan() {
        if (!this.selectedUser) {
            this.showNotification('Please select a user first', 'error');
            return;
        }

        const duration = prompt('Ban duration (hours):');
        const reason = prompt('Reason for blast ban:');
        
        if (duration && reason) {
            this.groupPowersManager.handleGroupPowerActivation({
                powerName: 'blastban',
                targetUser: this.selectedUser,
                parameters: { duration: parseInt(duration), reason }
            });
        }
    }

    /**
     * Blast kick
     */
    blastKick() {
        if (!this.selectedUser) {
            this.showNotification('Please select a user first', 'error');
            return;
        }

        const reason = prompt('Reason for blast kick:');
        if (reason) {
            this.groupPowersManager.handleGroupPowerActivation({
                powerName: 'blastkick',
                targetUser: this.selectedUser,
                parameters: { reason }
            });
        }
    }

    /**
     * Banish user
     */
    banishUser() {
        if (!this.selectedUser) {
            this.showNotification('Please select a user first', 'error');
            return;
        }

        const duration = prompt('Banish duration (hours):');
        const reason = prompt('Reason for banish:');
        
        if (duration && reason) {
            this.groupPowersManager.handleGroupPowerActivation({
                powerName: 'banish',
                targetUser: this.selectedUser,
                parameters: { duration: parseInt(duration), reason }
            });
        }
    }

    /**
     * Sinbin user
     */
    sinbinUser() {
        if (!this.selectedUser) {
            this.showNotification('Please select a user first', 'error');
            return;
        }

        const duration = prompt('Sinbin duration (minutes):');
        const reason = prompt('Reason for sinbin:');
        
        if (duration && reason) {
            this.groupPowersManager.handleModerationCommand({
                command: 'sinbin',
                targetUser: this.selectedUser,
                parameters: { duration: parseInt(duration), reason }
            });
        }
    }

    /**
     * Activate power
     */
    activatePower(powerId) {
        const power = this.groupPowersManager.getAvailableGroupPowers().find(p => p.id === powerId);
        if (power) {
            this.groupPowersManager.handleGroupPowerActivation({
                powerName: powerId,
                parameters: {}
            });
        }
    }

    /**
     * Toggle rule
     */
    toggleRule(ruleName) {
        const rules = this.groupPowersManager.getModerationRules();
        const rule = rules.get(ruleName);
        if (rule) {
            rule.enabled = !rule.enabled;
            rules.set(ruleName, rule);
        }
    }

    /**
     * Add rule
     */
    addRule() {
        const name = prompt('Rule name:');
        const action = prompt('Action (warn/mute/kick/ban):');
        const message = prompt('Message:');
        
        if (name && action && message) {
            const rules = this.groupPowersManager.getModerationRules();
            rules.set(name.toLowerCase(), {
                enabled: true,
                action: action,
                message: message
            });
            this.loadRules();
        }
    }

    /**
     * Save settings
     */
    saveSettings() {
        const settings = {};
        
        // Collect form data
        const fields = [
            'groupName', 'groupDescription', 'maxUsers', 'groupPassword',
            'isPrivate', 'allowGuests', 'autoModeration', 'profanityFilter',
            'spamProtection', 'floodProtection', 'capsProtection', 'linkProtection'
        ];

        fields.forEach(field => {
            const element = this.modal.querySelector(`#${field}`);
            if (element) {
                if (element.type === 'checkbox') {
                    settings[field] = element.checked;
                } else {
                    settings[field] = element.value;
                }
            }
        });

        this.groupPowersManager.updateGroupSettings(settings);
        this.showNotification('Settings saved successfully', 'success');
    }

    /**
     * Handle moderation action
     */
    handleModerationAction(actionData) {
        console.log('🛡️ [MOD] Moderation action:', actionData);
        this.showNotification(`Moderation action: ${actionData.action}`, 'info');
    }

    /**
     * Show notification
     */
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 4px;
            color: white;
            font-weight: bold;
            z-index: 10001;
            animation: slideIn 0.3s ease-out;
        `;

        switch (type) {
            case 'success':
                notification.style.background = '#28a745';
                break;
            case 'error':
                notification.style.background = '#dc3545';
                break;
            default:
                notification.style.background = '#007acc';
        }

        document.body.appendChild(notification);

        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    }

    /**
     * Open the moderation interface
     */
    open() {
        this.isOpen = true;
        this.modal.style.display = 'flex';
        this.setActiveTab('actions');
    }

    /**
     * Close the moderation interface
     */
    close() {
        this.isOpen = false;
        this.modal.style.display = 'none';
    }

    /**
     * Toggle the moderation interface
     */
    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    /**
     * Destroy the interface
     */
    destroy() {
        if (this.modal && this.modal.parentNode) {
            this.modal.parentNode.removeChild(this.modal);
        }
        this.modal = null;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ModerationInterface;
} else if (typeof window !== 'undefined') {
    window.ModerationInterface = ModerationInterface;
    console.log('✅ [MOD] ModerationInterface class loaded');
}
