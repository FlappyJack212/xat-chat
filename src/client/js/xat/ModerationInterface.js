/**
 * ModerationInterface - Complete xat.com moderation tools
 * Handles kick, ban, promote, demote, and all moderation features
 */

class ModerationInterface {
    constructor(xatInterface) {
        this.xat = xatInterface;
        this.moderationHistory = [];
        this.bannedUsers = new Map();
        this.moduleName = 'ModerationInterface';
        this.init();
    }

    init() {
        this.createModerationModal();
        this.setupModerationData();
        logger.debug(this.moduleName, 'Moderation interface initialized');
    }

    /**
     * Setup moderation data and permissions
     */
    setupModerationData() {
        this.permissions = {
            guest: {
                kick: false,
                ban: false,
                promote: false,
                demote: false,
                mute: false,
                editRoom: false
            },
            member: {
                kick: false,
                ban: false,
                promote: false,
                demote: false,
                mute: false,
                editRoom: false
            },
            moderator: {
                kick: true,
                ban: true,
                promote: true, // Can promote to member only
                demote: true, // Can demote members to guest
                mute: true,
                editRoom: false
            },
            owner: {
                kick: true,
                ban: true,
                promote: true, // Can promote to any rank
                demote: true, // Can demote anyone except other owners
                mute: true,
                editRoom: true
            }
        };

        this.banReasons = [
            'Spamming',
            'Inappropriate behavior',
            'Harassment',
            'Advertising',
            'NSFW content',
            'Trolling',
            'Multiple account abuse',
            'Custom reason'
        ];

        this.kickReasons = [
            'Breaking chat rules',
            'Spamming',
            'Inappropriate language',
            'Off-topic discussion',
            'Warning - behavioral',
            'Custom reason'
        ];
    }

    /**
     * Create moderation modal interface
     */
    createModerationModal() {
        const modal = document.createElement('div');
        modal.id = 'moderation-modal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content xat-modal" style="width: 700px; height: 500px;">
                <div class="modal-header xat-modal-header">
                    <h3>🛡️ Moderation Tools</h3>
                    <span class="close">&times;</span>
                </div>
                <div class="modal-body xat-modal-body" style="padding: 0;">
                    <div class="moderation-interface">
                        <div class="mod-tabs">
                            <div class="mod-tab active" data-tab="actions">Quick Actions</div>
                            <div class="mod-tab" data-tab="users">User Management</div>
                            <div class="mod-tab" data-tab="bans">Bans & Kicks</div>
                            <div class="mod-tab" data-tab="room">Room Settings</div>
                            <div class="mod-tab" data-tab="history">Mod History</div>
                        </div>
                        
                        <div class="mod-content">
                            <div class="mod-panel active" id="mod-actions">
                                <!-- Quick Actions Panel -->
                            </div>
                            
                            <div class="mod-panel" id="mod-users">
                                <!-- User Management Panel -->
                            </div>
                            
                            <div class="mod-panel" id="mod-bans">
                                <!-- Bans & Kicks Panel -->
                            </div>
                            
                            <div class="mod-panel" id="mod-room">
                                <!-- Room Settings Panel -->
                            </div>
                            
                            <div class="mod-panel" id="mod-history">
                                <!-- Moderation History Panel -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        this.setupModerationEvents(modal);
    }

    /**
     * Setup moderation event listeners
     */
    setupModerationEvents(modal) {
        // Close button
        const closeBtn = modal.querySelector('.close');
        closeBtn.addEventListener('click', () => this.closeModerationPanel());

        // Tab switching
        const tabs = modal.querySelectorAll('.mod-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                this.showModerationPanel(tab.dataset.tab);
            });
        });

        // Setup global functions
        window.kickUser = (userId, reason) => this.kickUser(userId, reason);
        window.banUser = (userId, reason, duration) => this.banUser(userId, reason, duration);
        window.unbanUser = (userId) => this.unbanUser(userId);
        window.promoteUser = (userId, rank) => this.promoteUser(userId, rank);
        window.demoteUser = (userId) => this.demoteUser(userId);
        window.muteUser = (userId, duration) => this.muteUser(userId, duration);
        window.openModerationPanel = () => this.openModerationPanel();
    }

    /**
     * Open moderation panel
     */
    openModerationPanel() {
        const currentUser = this.xat.currentUser;
        if (!currentUser || !this.canModerate(currentUser)) {
            this.xat.chatSystem?.addSystemMessage('You do not have moderation permissions.');
            return;
        }

        const modal = document.getElementById('moderation-modal');
        modal.style.display = 'block';
        this.showModerationPanel('actions');
    }

    /**
     * Close moderation panel
     */
    closeModerationPanel() {
        const modal = document.getElementById('moderation-modal');
        modal.style.display = 'none';
    }

    /**
     * Show specific moderation panel
     */
    showModerationPanel(panel) {
        // Hide all panels
        document.querySelectorAll('.mod-panel').forEach(p => p.classList.remove('active'));
        
        // Show selected panel
        const targetPanel = document.getElementById(`mod-${panel}`);
        targetPanel.classList.add('active');

        // Load panel content
        switch (panel) {
            case 'actions':
                this.loadQuickActions(targetPanel);
                break;
            case 'users':
                this.loadUserManagement(targetPanel);
                break;
            case 'bans':
                this.loadBansAndKicks(targetPanel);
                break;
            case 'room':
                this.loadRoomSettings(targetPanel);
                break;
            case 'history':
                this.loadModerationHistory(targetPanel);
                break;
        }
    }

    /**
     * Load quick actions panel
     */
    loadQuickActions(panel) {
        const currentUser = this.xat.currentUser;
        const permissions = this.permissions[currentUser?.rank] || this.permissions.guest;

        panel.innerHTML = `
            <div class="quick-actions">
                <h4>Quick Moderation Actions</h4>
                
                <div class="action-section">
                    <h5>User Actions</h5>
                    <div class="action-buttons">
                        ${permissions.kick ? `
                            <button class="xat-button mod-action" onclick="showKickDialog()">
                                🥾 Kick User
                            </button>
                        ` : ''}
                        ${permissions.ban ? `
                            <button class="xat-button mod-action" onclick="showBanDialog()">
                                🚫 Ban User
                            </button>
                        ` : ''}
                        ${permissions.mute ? `
                            <button class="xat-button mod-action" onclick="showMuteDialog()">
                                🔇 Mute User
                            </button>
                        ` : ''}
                        ${permissions.promote ? `
                            <button class="xat-button mod-action" onclick="showPromoteDialog()">
                                ⬆️ Promote User
                            </button>
                        ` : ''}
                        ${permissions.demote ? `
                            <button class="xat-button mod-action" onclick="showDemoteDialog()">
                                ⬇️ Demote User
                            </button>
                        ` : ''}
                    </div>
                </div>
                
                <div class="action-section">
                    <h5>Chat Management</h5>
                    <div class="action-buttons">
                        <button class="xat-button mod-action" onclick="clearChat()">
                            🗑️ Clear Chat
                        </button>
                        <button class="xat-button mod-action" onclick="lockChat()">
                            🔒 Lock Chat
                        </button>
                        <button class="xat-button mod-action" onclick="unlockChat()">
                            🔓 Unlock Chat
                        </button>
                        ${permissions.editRoom ? `
                            <button class="xat-button mod-action" onclick="editRoomSettings()">
                                ⚙️ Room Settings
                            </button>
                        ` : ''}
                    </div>
                </div>
                
                <div class="action-section">
                    <h5>Announcement</h5>
                    <textarea id="announcementText" class="xat-input" placeholder="Type announcement..." rows="3" style="width: 100%;"></textarea>
                    <button class="xat-button primary" onclick="sendAnnouncement()">
                        📢 Send Announcement
                    </button>
                </div>
            </div>
        `;

        // Setup action functions
        window.showKickDialog = () => this.showActionDialog('kick');
        window.showBanDialog = () => this.showActionDialog('ban');
        window.showMuteDialog = () => this.showActionDialog('mute');
        window.showPromoteDialog = () => this.showActionDialog('promote');
        window.showDemoteDialog = () => this.showActionDialog('demote');
        window.clearChat = () => this.clearChat();
        window.lockChat = () => this.lockChat();
        window.unlockChat = () => this.unlockChat();
        window.sendAnnouncement = () => this.sendAnnouncement();
    }

    /**
     * Load user management panel
     */
    loadUserManagement(panel) {
        const users = Array.from(this.xat.users.values());
        
        panel.innerHTML = `
            <div class="user-management">
                <h4>User Management</h4>
                
                <div class="user-search">
                    <input type="text" id="userSearch" class="xat-input" placeholder="Search users..." style="width: 100%;" />
                </div>
                
                <div class="user-list-management">
                    ${users.map(user => this.createUserManagementItem(user)).join('')}
                </div>
            </div>
        `;

        // Setup search functionality
        document.getElementById('userSearch').addEventListener('input', (e) => {
            this.filterUsers(e.target.value);
        });
    }

    /**
     * Create user management item
     */
    createUserManagementItem(user) {
        const currentUser = this.xat.currentUser;
        const canModerateUser = this.canModerateUser(currentUser, user);

        return `
            <div class="user-mgmt-item" data-user-id="${user.id}">
                <div class="user-info">
                    <div class="xat-pawn ${user.pawn || 'white'}"></div>
                    <span class="username ${user.rank}">${user.username}</span>
                    <span class="user-rank">${user.rank}</span>
                </div>
                <div class="user-actions">
                    ${canModerateUser ? `
                        <button class="xat-button small" onclick="quickKick('${user.id}')">Kick</button>
                        <button class="xat-button small" onclick="quickBan('${user.id}')">Ban</button>
                        <button class="xat-button small" onclick="quickMute('${user.id}')">Mute</button>
                    ` : ''}
                    <button class="xat-button small" onclick="viewUserProfile('${user.id}')">Profile</button>
                </div>
            </div>
        `;
    }

    /**
     * Load bans and kicks panel
     */
    loadBansAndKicks(panel) {
        const bannedUsers = Array.from(this.bannedUsers.values());
        
        panel.innerHTML = `
            <div class="bans-kicks">
                <h4>Banned Users</h4>
                
                <div class="ban-list">
                    ${bannedUsers.length > 0 ? bannedUsers.map(ban => `
                        <div class="ban-item">
                            <div class="ban-info">
                                <strong>${ban.username}</strong>
                                <div class="ban-details">
                                    Reason: ${ban.reason}<br>
                                    By: ${ban.moderator}<br>
                                    Date: ${new Date(ban.timestamp).toLocaleString()}<br>
                                    ${ban.duration ? `Duration: ${ban.duration}` : 'Permanent'}
                                </div>
                            </div>
                            <div class="ban-actions">
                                <button class="xat-button" onclick="unbanUser('${ban.userId}')">Unban</button>
                            </div>
                        </div>
                    `).join('') : '<p>No banned users</p>'}
                </div>
                
                <h4>Recent Kicks</h4>
                <div class="kick-list">
                    ${this.getRecentKicks().map(kick => `
                        <div class="kick-item">
                            <strong>${kick.username}</strong> kicked by ${kick.moderator}
                            <div class="kick-reason">${kick.reason}</div>
                            <div class="kick-time">${new Date(kick.timestamp).toLocaleString()}</div>
                        </div>
                    `).join('') || '<p>No recent kicks</p>'}
                </div>
            </div>
        `;
    }

    /**
     * Load room settings panel
     */
    loadRoomSettings(panel) {
        if (!this.canEditRoom()) {
            panel.innerHTML = '<p>You do not have permission to edit room settings.</p>';
            return;
        }

        panel.innerHTML = `
            <div class="room-settings">
                <h4>Room Settings</h4>
                
                <form id="roomSettingsForm">
                    <div class="setting-group">
                        <label>Room Name:</label>
                        <input type="text" id="roomNameSetting" class="xat-input" value="${this.xat.currentRoom}" />
                    </div>
                    
                    <div class="setting-group">
                        <label>Room Description:</label>
                        <textarea id="roomDescSetting" class="xat-input" rows="3"></textarea>
                    </div>
                    
                    <div class="setting-group">
                        <label>Maximum Users:</label>
                        <select id="maxUsersSetting" class="xat-input">
                            <option value="50">50</option>
                            <option value="100" selected>100</option>
                            <option value="200">200</option>
                            <option value="500">500</option>
                        </select>
                    </div>
                    
                    <div class="setting-group">
                        <label>
                            <input type="checkbox" id="guestChatSetting" checked />
                            Allow guest chat
                        </label>
                    </div>
                    
                    <div class="setting-group">
                        <label>
                            <input type="checkbox" id="memberChatSetting" checked />
                            Allow member chat
                        </label>
                    </div>
                    
                    <div class="setting-group">
                        <label>
                            <input type="checkbox" id="linksAllowedSetting" />
                            Allow links in chat
                        </label>
                    </div>
                    
                    <div class="setting-group">
                        <label>Room Background:</label>
                        <select id="backgroundSetting" class="xat-input">
                            <option value="">Default</option>
                            <option value="space">Space</option>
                            <option value="ocean">Ocean</option>
                            <option value="forest">Forest</option>
                            <option value="city">City</option>
                        </select>
                    </div>
                    
                    <button type="button" class="xat-button primary" onclick="saveRoomSettings()">
                        Save Settings
                    </button>
                </form>
            </div>
        `;

        window.saveRoomSettings = () => this.saveRoomSettings();
    }

    /**
     * Load moderation history panel
     */
    loadModerationHistory(panel) {
        panel.innerHTML = `
            <div class="mod-history">
                <h4>Moderation History</h4>
                
                <div class="history-filters">
                    <select id="historyFilter" class="xat-input">
                        <option value="all">All Actions</option>
                        <option value="kick">Kicks</option>
                        <option value="ban">Bans</option>
                        <option value="promote">Promotions</option>
                        <option value="demote">Demotions</option>
                        <option value="mute">Mutes</option>
                    </select>
                </div>
                
                <div class="history-list">
                    ${this.moderationHistory.map(action => `
                        <div class="history-item">
                            <div class="history-action">${action.action}</div>
                            <div class="history-details">
                                <strong>${action.target}</strong> by ${action.moderator}
                                <div class="history-reason">${action.reason}</div>
                                <div class="history-time">${new Date(action.timestamp).toLocaleString()}</div>
                            </div>
                        </div>
                    `).join('') || '<p>No moderation history</p>'}
                </div>
            </div>
        `;
    }

    /**
     * Show action dialog (kick, ban, etc.)
     */
    showActionDialog(action) {
        const users = Array.from(this.xat.users.values())
            .filter(user => this.canModerateUser(this.xat.currentUser, user));

        const dialog = document.createElement('div');
        dialog.className = 'action-dialog-overlay';
        dialog.innerHTML = `
            <div class="action-dialog xat-modal">
                <div class="modal-header xat-modal-header">
                    <h3>${action.charAt(0).toUpperCase() + action.slice(1)} User</h3>
                    <span class="close" onclick="closeActionDialog()">&times;</span>
                </div>
                <div class="modal-body xat-modal-body">
                    <div class="form-group">
                        <label>Select User:</label>
                        <select id="actionUserId" class="xat-input" style="width: 100%;">
                            <option value="">Choose user...</option>
                            ${users.map(user => `
                                <option value="${user.id}">${user.username} (${user.rank})</option>
                            `).join('')}
                        </select>
                    </div>
                    
                    ${action === 'ban' || action === 'kick' ? `
                        <div class="form-group">
                            <label>Reason:</label>
                            <select id="actionReason" class="xat-input" style="width: 100%;">
                                ${(action === 'ban' ? this.banReasons : this.kickReasons).map(reason => `
                                    <option value="${reason}">${reason}</option>
                                `).join('')}
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Custom Reason:</label>
                            <input type="text" id="customReason" class="xat-input" style="width: 100%;" placeholder="Enter custom reason..." />
                        </div>
                    ` : ''}
                    
                    ${action === 'ban' || action === 'mute' ? `
                        <div class="form-group">
                            <label>Duration:</label>
                            <select id="actionDuration" class="xat-input" style="width: 100%;">
                                <option value="1h">1 Hour</option>
                                <option value="6h">6 Hours</option>
                                <option value="24h">24 Hours</option>
                                <option value="7d">7 Days</option>
                                <option value="30d">30 Days</option>
                                <option value="permanent">Permanent</option>
                            </select>
                        </div>
                    ` : ''}
                    
                    ${action === 'promote' ? `
                        <div class="form-group">
                            <label>Promote to:</label>
                            <select id="promoteRank" class="xat-input" style="width: 100%;">
                                <option value="member">Member</option>
                                ${this.xat.currentUser?.rank === 'owner' ? '<option value="moderator">Moderator</option>' : ''}
                            </select>
                        </div>
                    ` : ''}
                </div>
                <div class="xat-modal-footer">
                    <button class="xat-button" onclick="closeActionDialog()">Cancel</button>
                    <button class="xat-button primary" onclick="executeAction('${action}')">
                        ${action.charAt(0).toUpperCase() + action.slice(1)}
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(dialog);

        window.closeActionDialog = () => {
            dialog.remove();
        };

        window.executeAction = (actionType) => {
            this.executeModAction(actionType);
            dialog.remove();
        };
    }

    /**
     * Execute moderation action
     */
    executeModAction(action) {
        const userId = document.getElementById('actionUserId').value;
        if (!userId) return;

        const user = this.xat.users.get(userId);
        if (!user) return;

        switch (action) {
            case 'kick':
                const kickReason = this.getSelectedReason();
                this.kickUser(userId, kickReason);
                break;
            case 'ban':
                const banReason = this.getSelectedReason();
                const banDuration = document.getElementById('actionDuration').value;
                this.banUser(userId, banReason, banDuration);
                break;
            case 'mute':
                const muteDuration = document.getElementById('actionDuration').value;
                this.muteUser(userId, muteDuration);
                break;
            case 'promote':
                const newRank = document.getElementById('promoteRank').value;
                this.promoteUser(userId, newRank);
                break;
            case 'demote':
                this.demoteUser(userId);
                break;
        }
    }

    /**
     * Get selected reason (handles custom reason)
     */
    getSelectedReason() {
        const reasonSelect = document.getElementById('actionReason');
        const customReason = document.getElementById('customReason');
        
        if (reasonSelect.value === 'Custom reason' && customReason.value.trim()) {
            return customReason.value.trim();
        }
        
        return reasonSelect.value;
    }

    /**
     * Kick user
     */
    async kickUser(userId, reason) {
        const user = this.xat.users.get(userId);
        if (!user || !this.canModerateUser(this.xat.currentUser, user)) {
            return;
        }

        try {
            const response = await fetch('/api/moderation/kick', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                },
                body: JSON.stringify({ userId, reason })
            });

            if (response.ok) {
                this.addModerationHistory('kick', user.username, reason);
                this.xat.chatSystem?.addSystemMessage(`${user.username} has been kicked. Reason: ${reason}`);
                this.xat.users.delete(userId);
                this.xat.updateUsersList();
            }
        } catch (error) {
            logger.error(this.moduleName, 'Kick error:', error);
        }
    }

    /**
     * Ban user
     */
    async banUser(userId, reason, duration) {
        const user = this.xat.users.get(userId);
        if (!user || !this.canModerateUser(this.xat.currentUser, user)) {
            return;
        }

        try {
            const response = await fetch('/api/moderation/ban', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                },
                body: JSON.stringify({ userId, reason, duration })
            });

            if (response.ok) {
                const banData = {
                    userId,
                    username: user.username,
                    reason,
                    duration,
                    timestamp: Date.now(),
                    moderator: this.xat.currentUser.username
                };

                this.bannedUsers.set(userId, banData);
                this.addModerationHistory('ban', user.username, reason);
                this.xat.chatSystem?.addSystemMessage(`${user.username} has been banned. Reason: ${reason}`);
                this.xat.users.delete(userId);
                this.xat.updateUsersList();
            }
        } catch (error) {
            logger.error(this.moduleName, 'Ban error:', error);
        }
    }

    /**
     * Unban user
     */
    async unbanUser(userId) {
        try {
            const response = await fetch('/api/moderation/unban', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                },
                body: JSON.stringify({ userId })
            });

            if (response.ok) {
                const banData = this.bannedUsers.get(userId);
                if (banData) {
                    this.bannedUsers.delete(userId);
                    this.addModerationHistory('unban', banData.username, 'Ban lifted');
                    this.xat.chatSystem?.addSystemMessage(`${banData.username} has been unbanned.`);
                }
            }
        } catch (error) {
            logger.error(this.moduleName, 'Unban error:', error);
        }
    }

    /**
     * Promote user
     */
    async promoteUser(userId, newRank) {
        const user = this.xat.users.get(userId);
        if (!user || !this.canPromoteUser(this.xat.currentUser, user, newRank)) {
            return;
        }

        try {
            const response = await fetch('/api/moderation/promote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                },
                body: JSON.stringify({ userId, rank: newRank })
            });

            if (response.ok) {
                user.rank = newRank;
                this.addModerationHistory('promote', user.username, `Promoted to ${newRank}`);
                this.xat.chatSystem?.addSystemMessage(`${user.username} has been promoted to ${newRank}.`);
                this.xat.updateUsersList();
            }
        } catch (error) {
            logger.error(this.moduleName, 'Promote error:', error);
        }
    }

    /**
     * Demote user
     */
    async demoteUser(userId) {
        const user = this.xat.users.get(userId);
        if (!user || !this.canDemoteUser(this.xat.currentUser, user)) {
            return;
        }

        const newRank = user.rank === 'moderator' ? 'member' : 'guest';

        try {
            const response = await fetch('/api/moderation/demote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                },
                body: JSON.stringify({ userId, rank: newRank })
            });

            if (response.ok) {
                user.rank = newRank;
                this.addModerationHistory('demote', user.username, `Demoted to ${newRank}`);
                this.xat.chatSystem?.addSystemMessage(`${user.username} has been demoted to ${newRank}.`);
                this.xat.updateUsersList();
            }
        } catch (error) {
            logger.error(this.moduleName, 'Demote error:', error);
        }
    }

    /**
     * Mute user
     */
    async muteUser(userId, duration) {
        const user = this.xat.users.get(userId);
        if (!user || !this.canModerateUser(this.xat.currentUser, user)) {
            return;
        }

        try {
            const response = await fetch('/api/moderation/mute', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                },
                body: JSON.stringify({ userId, duration })
            });

            if (response.ok) {
                this.addModerationHistory('mute', user.username, `Muted for ${duration}`);
                this.xat.chatSystem?.addSystemMessage(`${user.username} has been muted for ${duration}.`);
            }
        } catch (error) {
            logger.error(this.moduleName, 'Mute error:', error);
        }
    }

    /**
     * Add moderation history entry
     */
    addModerationHistory(action, target, reason) {
        const entry = {
            action,
            target,
            reason,
            moderator: this.xat.currentUser?.username || 'System',
            timestamp: Date.now()
        };

        this.moderationHistory.unshift(entry);
        
        // Keep only last 100 entries
        if (this.moderationHistory.length > 100) {
            this.moderationHistory = this.moderationHistory.slice(0, 100);
        }
    }

    /**
     * Get recent kicks
     */
    getRecentKicks() {
        return this.moderationHistory
            .filter(entry => entry.action === 'kick')
            .slice(0, 10);
    }

    /**
     * Check if user can moderate
     */
    canModerate(user) {
        if (!user) return false;
        const permissions = this.permissions[user.rank] || this.permissions.guest;
        return Object.values(permissions).some(perm => perm);
    }

    /**
     * Check if user can moderate another user
     */
    canModerateUser(moderator, target) {
        if (!moderator || !target) return false;
        
        const ranks = { guest: 0, member: 1, moderator: 2, owner: 3 };
        const modRank = ranks[moderator.rank] || 0;
        const targetRank = ranks[target.rank] || 0;
        
        return modRank > targetRank && modRank >= 2;
    }

    /**
     * Check if user can promote
     */
    canPromoteUser(moderator, target, newRank) {
        if (!this.canModerateUser(moderator, target)) return false;
        
        const ranks = { guest: 0, member: 1, moderator: 2, owner: 3 };
        const modRank = ranks[moderator.rank] || 0;
        const newRankLevel = ranks[newRank] || 0;
        
        return newRankLevel < modRank;
    }

    /**
     * Check if user can demote
     */
    canDemoteUser(moderator, target) {
        return this.canModerateUser(moderator, target);
    }

    /**
     * Check if user can edit room
     */
    canEditRoom() {
        const currentUser = this.xat.currentUser;
        return currentUser && currentUser.rank === 'owner';
    }

    /**
     * Clear chat
     */
    clearChat() {
        if (this.xat.chatSystem) {
            this.xat.chatSystem.clear();
            this.xat.chatSystem.addSystemMessage('Chat has been cleared by a moderator.');
        }
    }

    /**
     * Lock/unlock chat
     */
    lockChat() {
        this.xat.chatSystem?.addSystemMessage('Chat has been locked by a moderator.');
    }

    unlockChat() {
        this.xat.chatSystem?.addSystemMessage('Chat has been unlocked by a moderator.');
    }

    /**
     * Send announcement
     */
    sendAnnouncement() {
        const text = document.getElementById('announcementText').value.trim();
        if (!text) return;

        this.xat.chatSystem?.addSystemMessage(`📢 ANNOUNCEMENT: ${text}`);
        document.getElementById('announcementText').value = '';
    }

    /**
     * Save room settings
     */
    async saveRoomSettings() {
        const settings = {
            name: document.getElementById('roomNameSetting').value,
            description: document.getElementById('roomDescSetting').value,
            maxUsers: parseInt(document.getElementById('maxUsersSetting').value),
            guestChat: document.getElementById('guestChatSetting').checked,
            memberChat: document.getElementById('memberChatSetting').checked,
            linksAllowed: document.getElementById('linksAllowedSetting').checked,
            background: document.getElementById('backgroundSetting').value
        };

        try {
            const response = await fetch('/api/moderation/room-settings', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                },
                body: JSON.stringify(settings)
            });

            if (response.ok) {
                this.xat.chatSystem?.addSystemMessage('Room settings have been updated.');
            }
        } catch (error) {
            logger.error(this.moduleName, 'Room settings error:', error);
        }
    }
}

// Make available globally
if (typeof window !== 'undefined') {
    window.ModerationInterface = ModerationInterface;
}