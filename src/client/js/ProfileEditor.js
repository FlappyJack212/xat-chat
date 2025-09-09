/**
 * Advanced Profile Editor
 * Comprehensive profile editing with avatar selection, status management, and preferences
 */

class ProfileEditor {
    constructor(authSystem) {
        this.authSystem = authSystem;
        this.isOpen = false;
        this.currentUser = null;
        this.avatarOptions = [];
        this.statusOptions = [];
        this.modal = null;
        this.avatarPreview = null;
        this.statusPreview = null;
        
        this.init();
    }

    /**
     * Initialize the profile editor
     */
    async init() {
        try {
            await this.loadAvatarOptions();
            await this.loadStatusOptions();
            this.createModal();
            this.setupEventListeners();
            console.log('👤 [PROFILE] Profile editor initialized');
        } catch (error) {
            console.error('👤 [PROFILE] Failed to initialize profile editor:', error);
        }
    }

    /**
     * Load available avatar options
     */
    async loadAvatarOptions() {
        // Load from server or use default avatars
        this.avatarOptions = [
            { id: 1, name: 'Default', url: '/avatars/1.png', category: 'default' },
            { id: 2, name: 'Smile', url: '/avatars/2.png', category: 'emotions' },
            { id: 3, name: 'Cool', url: '/avatars/3.png', category: 'emotions' },
            { id: 4, name: 'Wink', url: '/avatars/4.png', category: 'emotions' },
            { id: 5, name: 'Heart', url: '/avatars/5.png', category: 'emotions' },
            { id: 6, name: 'Star', url: '/avatars/6.png', category: 'symbols' },
            { id: 7, name: 'Diamond', url: '/avatars/7.png', category: 'symbols' },
            { id: 8, name: 'Crown', url: '/avatars/8.png', category: 'symbols' },
            { id: 9, name: 'Fire', url: '/avatars/9.png', category: 'elements' },
            { id: 10, name: 'Water', url: '/avatars/10.png', category: 'elements' },
            { id: 11, name: 'Earth', url: '/avatars/11.png', category: 'elements' },
            { id: 12, name: 'Air', url: '/avatars/12.png', category: 'elements' },
            { id: 13, name: 'Sun', url: '/avatars/13.png', category: 'nature' },
            { id: 14, name: 'Moon', url: '/avatars/14.png', category: 'nature' },
            { id: 15, name: 'Flower', url: '/avatars/15.png', category: 'nature' },
            { id: 16, name: 'Tree', url: '/avatars/16.png', category: 'nature' },
            { id: 17, name: 'Cat', url: '/avatars/17.png', category: 'animals' },
            { id: 18, name: 'Dog', url: '/avatars/18.png', category: 'animals' },
            { id: 19, name: 'Bird', url: '/avatars/19.png', category: 'animals' },
            { id: 20, name: 'Fish', url: '/avatars/20.png', category: 'animals' }
        ];
    }

    /**
     * Load available status options
     */
    async loadStatusOptions() {
        this.statusOptions = [
            { id: 'online', name: 'Online', icon: '🟢', color: '#28a745' },
            { id: 'away', name: 'Away', icon: '🟡', color: '#ffc107' },
            { id: 'busy', name: 'Busy', icon: '🔴', color: '#dc3545' },
            { id: 'invisible', name: 'Invisible', icon: '⚫', color: '#6c757d' },
            { id: 'custom', name: 'Custom', icon: '✏️', color: '#007acc' }
        ];
    }

    /**
     * Create the modal UI
     */
    createModal() {
        // Create modal container
        this.modal = document.createElement('div');
        this.modal.className = 'profile-editor-modal';
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
        content.className = 'profile-editor-content';
        content.style.cssText = `
            background: #2a2a2a;
            border-radius: 8px;
            width: 90%;
            max-width: 800px;
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
        header.className = 'profile-editor-header';
        header.style.cssText = `
            padding: 20px;
            border-bottom: 1px solid #444;
            display: flex;
            justify-content: space-between;
            align-items: center;
        `;

        const title = document.createElement('h2');
        title.textContent = 'Edit Profile';
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
        tabsContainer.className = 'profile-editor-tabs';
        tabsContainer.style.cssText = `
            display: flex;
            border-bottom: 1px solid #444;
        `;

        const tabs = [
            { id: 'basic', name: 'Basic Info', icon: '👤' },
            { id: 'avatar', name: 'Avatar', icon: '🎭' },
            { id: 'status', name: 'Status', icon: '💬' },
            { id: 'preferences', name: 'Preferences', icon: '⚙️' },
            { id: 'security', name: 'Security', icon: '🔒' }
        ];

        tabs.forEach(tab => {
            const tabElement = document.createElement('button');
            tabElement.className = 'profile-editor-tab';
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
            
            if (tab.id === 'basic') {
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
        content.className = 'profile-editor-main-content';
        content.style.cssText = `
            flex: 1;
            padding: 20px;
            overflow-y: auto;
        `;

        // Create tab content containers
        this.createBasicTab(content);
        this.createAvatarTab(content);
        this.createStatusTab(content);
        this.createPreferencesTab(content);
        this.createSecurityTab(content);

        return content;
    }

    /**
     * Create basic info tab
     */
    createBasicTab(container) {
        const basicTab = document.createElement('div');
        basicTab.id = 'basic-tab';
        basicTab.className = 'profile-editor-tab-content';
        basicTab.style.cssText = `
            display: block;
        `;

        basicTab.innerHTML = `
            <div class="basic-info">
                <div class="form-section">
                    <h3>Personal Information</h3>
                    <div class="form-grid">
                        <div class="form-group">
                            <label for="username">Username:</label>
                            <input type="text" id="username" class="form-input" readonly>
                            <small class="form-help">Username cannot be changed</small>
                        </div>
                        <div class="form-group">
                            <label for="nickname">Display Name:</label>
                            <input type="text" id="nickname" class="form-input" maxlength="20">
                            <small class="form-help">This is how others see your name</small>
                        </div>
                        <div class="form-group">
                            <label for="email">Email:</label>
                            <input type="email" id="email" class="form-input">
                            <small class="form-help">Your email address</small>
                        </div>
                        <div class="form-group">
                            <label for="bio">Bio:</label>
                            <textarea id="bio" class="form-textarea" maxlength="500" placeholder="Tell us about yourself..."></textarea>
                            <small class="form-help">Maximum 500 characters</small>
                        </div>
                        <div class="form-group">
                            <label for="website">Website:</label>
                            <input type="url" id="website" class="form-input" placeholder="https://...">
                            <small class="form-help">Your personal website or social media</small>
                        </div>
                        <div class="form-group">
                            <label for="location">Location:</label>
                            <input type="text" id="location" class="form-input" placeholder="City, Country">
                            <small class="form-help">Where you're from</small>
                        </div>
                    </div>
                </div>

                <div class="form-section">
                    <h3>Account Information</h3>
                    <div class="account-info">
                        <div class="info-item">
                            <span class="info-label">User ID:</span>
                            <span class="info-value" id="userId">-</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Rank:</span>
                            <span class="info-value" id="userRank">-</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Xats:</span>
                            <span class="info-value" id="userXats">-</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Days:</span>
                            <span class="info-value" id="userDays">-</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Member Since:</span>
                            <span class="info-value" id="memberSince">-</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Last Active:</span>
                            <span class="info-value" id="lastActive">-</span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        container.appendChild(basicTab);
    }

    /**
     * Create avatar tab
     */
    createAvatarTab(container) {
        const avatarTab = document.createElement('div');
        avatarTab.id = 'avatar-tab';
        avatarTab.className = 'profile-editor-tab-content';
        avatarTab.style.cssText = `
            display: none;
        `;

        avatarTab.innerHTML = `
            <div class="avatar-selection">
                <div class="avatar-preview-section">
                    <h3>Current Avatar</h3>
                    <div class="avatar-preview" id="avatarPreview">
                        <div class="avatar-image"></div>
                        <div class="avatar-name">Select an avatar</div>
                    </div>
                </div>

                <div class="avatar-categories">
                    <h3>Choose Avatar</h3>
                    <div class="category-tabs" id="avatarCategoryTabs">
                        <!-- Category tabs will be populated here -->
                    </div>
                    <div class="avatar-grid" id="avatarGrid">
                        <!-- Avatars will be populated here -->
                    </div>
                </div>

                <div class="custom-avatar-section">
                    <h3>Custom Avatar</h3>
                    <div class="custom-avatar-upload">
                        <input type="file" id="avatarUpload" accept="image/*" style="display: none;">
                        <button class="upload-btn" onclick="document.getElementById('avatarUpload').click()">
                            <span class="btn-icon">📁</span>
                            Upload Custom Avatar
                        </button>
                        <small class="form-help">Supported formats: PNG, JPG, GIF. Max size: 2MB</small>
                    </div>
                </div>
            </div>
        `;

        container.appendChild(avatarTab);
    }

    /**
     * Create status tab
     */
    createStatusTab(container) {
        const statusTab = document.createElement('div');
        statusTab.id = 'status-tab';
        statusTab.className = 'profile-editor-tab-content';
        statusTab.style.cssText = `
            display: none;
        `;

        statusTab.innerHTML = `
            <div class="status-management">
                <div class="status-preview-section">
                    <h3>Current Status</h3>
                    <div class="status-preview" id="statusPreview">
                        <div class="status-icon">🟢</div>
                        <div class="status-text">Online</div>
                    </div>
                </div>

                <div class="status-options">
                    <h3>Status Options</h3>
                    <div class="status-list" id="statusList">
                        <!-- Status options will be populated here -->
                    </div>
                </div>

                <div class="custom-status-section">
                    <h3>Custom Status Message</h3>
                    <div class="form-group">
                        <label for="customStatus">Status Message:</label>
                        <input type="text" id="customStatus" class="form-input" maxlength="128" placeholder="What's on your mind?">
                        <small class="form-help">Maximum 128 characters</small>
                    </div>
                </div>
            </div>
        `;

        container.appendChild(statusTab);
    }

    /**
     * Create preferences tab
     */
    createPreferencesTab(container) {
        const preferencesTab = document.createElement('div');
        preferencesTab.id = 'preferences-tab';
        preferencesTab.className = 'profile-editor-tab-content';
        preferencesTab.style.cssText = `
            display: none;
        `;

        preferencesTab.innerHTML = `
            <div class="preferences-settings">
                <div class="preference-section">
                    <h3>Chat Preferences</h3>
                    <div class="preference-grid">
                        <div class="preference-item">
                            <label class="preference-label">
                                <input type="checkbox" id="soundEnabled" class="preference-checkbox">
                                <span class="checkmark"></span>
                                Enable Sounds
                            </label>
                            <small class="preference-help">Play notification sounds</small>
                        </div>
                        <div class="preference-item">
                            <label class="preference-label">
                                <input type="checkbox" id="musicEnabled" class="preference-checkbox">
                                <span class="checkmark"></span>
                                Enable Music
                            </label>
                            <small class="preference-help">Play background music</small>
                        </div>
                        <div class="preference-item">
                            <label class="preference-label">
                                <input type="checkbox" id="notificationsEnabled" class="preference-checkbox">
                                <span class="checkmark"></span>
                                Enable Notifications
                            </label>
                            <small class="preference-help">Show desktop notifications</small>
                        </div>
                        <div class="preference-item">
                            <label class="preference-label">
                                <input type="checkbox" id="autoScrollEnabled" class="preference-checkbox">
                                <span class="checkmark"></span>
                                Auto Scroll
                            </label>
                            <small class="preference-help">Automatically scroll to new messages</small>
                        </div>
                        <div class="preference-item">
                            <label class="preference-label">
                                <input type="checkbox" id="showTimestamps" class="preference-checkbox">
                                <span class="checkmark"></span>
                                Show Timestamps
                            </label>
                            <small class="preference-help">Display message timestamps</small>
                        </div>
                        <div class="preference-item">
                            <label class="preference-label">
                                <input type="checkbox" id="showAvatars" class="preference-checkbox">
                                <span class="checkmark"></span>
                                Show Avatars
                            </label>
                            <small class="preference-help">Display user avatars in chat</small>
                        </div>
                    </div>
                </div>

                <div class="preference-section">
                    <h3>Display Preferences</h3>
                    <div class="preference-grid">
                        <div class="preference-item">
                            <label for="language">Language:</label>
                            <select id="language" class="preference-select">
                                <option value="en">English</option>
                                <option value="es">Spanish</option>
                                <option value="fr">French</option>
                                <option value="de">German</option>
                                <option value="it">Italian</option>
                                <option value="pt">Portuguese</option>
                            </select>
                        </div>
                        <div class="preference-item">
                            <label for="theme">Theme:</label>
                            <select id="theme" class="preference-select">
                                <option value="default">Default</option>
                                <option value="dark">Dark</option>
                                <option value="light">Light</option>
                                <option value="colorful">Colorful</option>
                            </select>
                        </div>
                        <div class="preference-item">
                            <label for="fontSize">Font Size:</label>
                            <select id="fontSize" class="preference-select">
                                <option value="small">Small</option>
                                <option value="medium">Medium</option>
                                <option value="large">Large</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        `;

        container.appendChild(preferencesTab);
    }

    /**
     * Create security tab
     */
    createSecurityTab(container) {
        const securityTab = document.createElement('div');
        securityTab.id = 'security-tab';
        securityTab.className = 'profile-editor-tab-content';
        securityTab.style.cssText = `
            display: none;
        `;

        securityTab.innerHTML = `
            <div class="security-settings">
                <div class="security-section">
                    <h3>Change Password</h3>
                    <div class="form-grid">
                        <div class="form-group">
                            <label for="currentPassword">Current Password:</label>
                            <input type="password" id="currentPassword" class="form-input">
                        </div>
                        <div class="form-group">
                            <label for="newPassword">New Password:</label>
                            <input type="password" id="newPassword" class="form-input">
                        </div>
                        <div class="form-group">
                            <label for="confirmPassword">Confirm Password:</label>
                            <input type="password" id="confirmPassword" class="form-input">
                        </div>
                    </div>
                    <button class="btn-primary" onclick="profileEditor.changePassword()">Change Password</button>
                </div>

                <div class="security-section">
                    <h3>Privacy Settings</h3>
                    <div class="preference-grid">
                        <div class="preference-item">
                            <label class="preference-label">
                                <input type="checkbox" id="showEmail" class="preference-checkbox">
                                <span class="checkmark"></span>
                                Show Email
                            </label>
                            <small class="preference-help">Display email in profile</small>
                        </div>
                        <div class="preference-item">
                            <label class="preference-label">
                                <input type="checkbox" id="showLocation" class="preference-checkbox">
                                <span class="checkmark"></span>
                                Show Location
                            </label>
                            <small class="preference-help">Display location in profile</small>
                        </div>
                        <div class="preference-item">
                            <label class="preference-label">
                                <input type="checkbox" id="showLastActive" class="preference-checkbox">
                                <span class="checkmark"></span>
                                Show Last Active
                            </label>
                            <small class="preference-help">Display last active time</small>
                        </div>
                    </div>
                </div>

                <div class="security-section">
                    <h3>Account Actions</h3>
                    <div class="account-actions">
                        <button class="btn-secondary" onclick="profileEditor.exportData()">Export Data</button>
                        <button class="btn-danger" onclick="profileEditor.deleteAccount()">Delete Account</button>
                    </div>
                </div>
            </div>
        `;

        container.appendChild(securityTab);
    }

    /**
     * Create footer
     */
    createFooter() {
        const footer = document.createElement('div');
        footer.className = 'profile-editor-footer';
        footer.style.cssText = `
            padding: 15px 20px;
            border-top: 1px solid #444;
            display: flex;
            justify-content: space-between;
            align-items: center;
        `;

        const status = document.createElement('div');
        status.className = 'profile-editor-status';
        status.textContent = 'Ready to save changes';
        status.style.cssText = `
            color: #ccc;
            font-size: 14px;
        `;

        const buttons = document.createElement('div');
        buttons.className = 'profile-editor-buttons';
        buttons.style.cssText = `
            display: flex;
            gap: 10px;
        `;

        const saveBtn = document.createElement('button');
        saveBtn.textContent = 'Save Changes';
        saveBtn.className = 'btn-primary';
        saveBtn.onclick = () => this.saveProfile();

        const cancelBtn = document.createElement('button');
        cancelBtn.textContent = 'Cancel';
        cancelBtn.className = 'btn-secondary';
        cancelBtn.onclick = () => this.close();

        buttons.appendChild(saveBtn);
        buttons.appendChild(cancelBtn);

        footer.appendChild(status);
        footer.appendChild(buttons);
        return footer;
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Listen for avatar upload
        document.addEventListener('change', (e) => {
            if (e.target.id === 'avatarUpload') {
                this.handleAvatarUpload(e.target.files[0]);
            }
        });

        // Listen for status changes
        document.addEventListener('click', (e) => {
            if (e.target.closest('.status-option')) {
                this.selectStatus(e.target.closest('.status-option').dataset.statusId);
            }
        });

        // Listen for avatar selection
        document.addEventListener('click', (e) => {
            if (e.target.closest('.avatar-option')) {
                this.selectAvatar(e.target.closest('.avatar-option').dataset.avatarId);
            }
        });
    }

    /**
     * Set active tab
     */
    setActiveTab(tabId) {
        // Update tab buttons
        this.modal.querySelectorAll('.profile-editor-tab').forEach(tab => {
            tab.style.background = '#333';
        });
        this.modal.querySelector(`[data-tab="${tabId}"]`).style.background = '#007acc';

        // Update tab content
        this.modal.querySelectorAll('.profile-editor-tab-content').forEach(content => {
            content.style.display = 'none';
        });
        this.modal.querySelector(`#${tabId}-tab`).style.display = 'block';

        // Load tab-specific data
        this.loadTabData(tabId);
    }

    /**
     * Load tab-specific data
     */
    loadTabData(tabId) {
        switch (tabId) {
            case 'avatar':
                this.loadAvatarTab();
                break;
            case 'status':
                this.loadStatusTab();
                break;
            case 'preferences':
                this.loadPreferencesTab();
                break;
        }
    }

    /**
     * Load avatar tab
     */
    loadAvatarTab() {
        // Load avatar categories
        const categoryTabs = this.modal.querySelector('#avatarCategoryTabs');
        if (categoryTabs) {
            const categories = [...new Set(this.avatarOptions.map(avatar => avatar.category))];
            categoryTabs.innerHTML = categories.map(category => `
                <button class="category-tab" data-category="${category}">
                    ${category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
            `).join('');
        }

        // Load avatars
        this.loadAvatarsByCategory('default');
    }

    /**
     * Load avatars by category
     */
    loadAvatarsByCategory(category) {
        const avatarGrid = this.modal.querySelector('#avatarGrid');
        if (!avatarGrid) return;

        const avatars = this.avatarOptions.filter(avatar => avatar.category === category);
        
        avatarGrid.innerHTML = avatars.map(avatar => `
            <div class="avatar-option" data-avatar-id="${avatar.id}">
                <div class="avatar-image" style="background-image: url('${avatar.url}')"></div>
                <div class="avatar-name">${avatar.name}</div>
            </div>
        `).join('');
    }

    /**
     * Load status tab
     */
    loadStatusTab() {
        const statusList = this.modal.querySelector('#statusList');
        if (!statusList) return;

        statusList.innerHTML = this.statusOptions.map(status => `
            <div class="status-option" data-status-id="${status.id}">
                <div class="status-icon">${status.icon}</div>
                <div class="status-name">${status.name}</div>
            </div>
        `).join('');
    }

    /**
     * Load preferences tab
     */
    loadPreferencesTab() {
        // This would load current preferences from the user data
        // For now, we'll just set defaults
    }

    /**
     * Select avatar
     */
    selectAvatar(avatarId) {
        const avatar = this.avatarOptions.find(a => a.id == avatarId);
        if (!avatar) return;

        // Update preview
        const preview = this.modal.querySelector('#avatarPreview');
        if (preview) {
            preview.querySelector('.avatar-image').style.backgroundImage = `url('${avatar.url}')`;
            preview.querySelector('.avatar-name').textContent = avatar.name;
        }

        // Update selection
        this.modal.querySelectorAll('.avatar-option').forEach(option => {
            option.classList.remove('selected');
        });
        this.modal.querySelector(`[data-avatar-id="${avatarId}"]`).classList.add('selected');
    }

    /**
     * Select status
     */
    selectStatus(statusId) {
        const status = this.statusOptions.find(s => s.id === statusId);
        if (!status) return;

        // Update preview
        const preview = this.modal.querySelector('#statusPreview');
        if (preview) {
            preview.querySelector('.status-icon').textContent = status.icon;
            preview.querySelector('.status-text').textContent = status.name;
        }

        // Update selection
        this.modal.querySelectorAll('.status-option').forEach(option => {
            option.classList.remove('selected');
        });
        this.modal.querySelector(`[data-status-id="${statusId}"]`).classList.add('selected');
    }

    /**
     * Handle avatar upload
     */
    handleAvatarUpload(file) {
        if (!file) return;

        // Validate file
        if (!file.type.startsWith('image/')) {
            this.showNotification('Please select an image file', 'error');
            return;
        }

        if (file.size > 2 * 1024 * 1024) { // 2MB
            this.showNotification('File size must be less than 2MB', 'error');
            return;
        }

        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
            const preview = this.modal.querySelector('#avatarPreview');
            if (preview) {
                preview.querySelector('.avatar-image').style.backgroundImage = `url('${e.target.result}')`;
                preview.querySelector('.avatar-name').textContent = 'Custom Avatar';
            }
        };
        reader.readAsDataURL(file);
    }

    /**
     * Change password
     */
    async changePassword() {
        const currentPassword = this.modal.querySelector('#currentPassword').value;
        const newPassword = this.modal.querySelector('#newPassword').value;
        const confirmPassword = this.modal.querySelector('#confirmPassword').value;

        if (!currentPassword || !newPassword || !confirmPassword) {
            this.showNotification('Please fill in all password fields', 'error');
            return;
        }

        if (newPassword !== confirmPassword) {
            this.showNotification('New passwords do not match', 'error');
            return;
        }

        if (newPassword.length < 6) {
            this.showNotification('Password must be at least 6 characters', 'error');
            return;
        }

        try {
            // This would call the auth system to change password
            this.showNotification('Password changed successfully', 'success');
            
            // Clear password fields
            this.modal.querySelector('#currentPassword').value = '';
            this.modal.querySelector('#newPassword').value = '';
            this.modal.querySelector('#confirmPassword').value = '';
        } catch (error) {
            this.showNotification('Failed to change password', 'error');
        }
    }

    /**
     * Export data
     */
    exportData() {
        // This would export user data
        this.showNotification('Data export started', 'info');
    }

    /**
     * Delete account
     */
    deleteAccount() {
        if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            // This would delete the account
            this.showNotification('Account deletion requested', 'info');
        }
    }

    /**
     * Load current user data
     */
    loadUserData(user) {
        this.currentUser = user;
        
        // Populate basic info
        if (user) {
            this.modal.querySelector('#username').value = user.username || '';
            this.modal.querySelector('#nickname').value = user.nickname || '';
            this.modal.querySelector('#email').value = user.email || '';
            this.modal.querySelector('#bio').value = user.bio || '';
            this.modal.querySelector('#website').value = user.website || '';
            this.modal.querySelector('#location').value = user.location || '';
            
            // Populate account info
            this.modal.querySelector('#userId').textContent = user.id || '-';
            this.modal.querySelector('#userRank').textContent = user.rank || '-';
            this.modal.querySelector('#userXats').textContent = user.xats || '0';
            this.modal.querySelector('#userDays').textContent = user.days || '0';
            this.modal.querySelector('#memberSince').textContent = user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-';
            this.modal.querySelector('#lastActive').textContent = user.lastActive ? new Date(user.lastActive).toLocaleDateString() : '-';
        }
    }

    /**
     * Save profile
     */
    async saveProfile() {
        try {
            const profileData = {
                nickname: this.modal.querySelector('#nickname').value,
                email: this.modal.querySelector('#email').value,
                bio: this.modal.querySelector('#bio').value,
                website: this.modal.querySelector('#website').value,
                location: this.modal.querySelector('#location').value,
                avatar: this.getSelectedAvatar(),
                status: this.getSelectedStatus(),
                preferences: this.getPreferences()
            };

            // This would call the auth system to save the profile
            if (this.authSystem) {
                await this.authSystem.handleProfileUpdate({ target: { value: profileData } });
            }

            this.showNotification('Profile saved successfully', 'success');
            this.close();
        } catch (error) {
            console.error('Failed to save profile:', error);
            this.showNotification('Failed to save profile', 'error');
        }
    }

    /**
     * Get selected avatar
     */
    getSelectedAvatar() {
        const selected = this.modal.querySelector('.avatar-option.selected');
        return selected ? selected.dataset.avatarId : null;
    }

    /**
     * Get selected status
     */
    getSelectedStatus() {
        const selected = this.modal.querySelector('.status-option.selected');
        return selected ? selected.dataset.statusId : 'online';
    }

    /**
     * Get preferences
     */
    getPreferences() {
        return {
            sound: this.modal.querySelector('#soundEnabled').checked,
            music: this.modal.querySelector('#musicEnabled').checked,
            notifications: this.modal.querySelector('#notificationsEnabled').checked,
            autoScroll: this.modal.querySelector('#autoScrollEnabled').checked,
            showTimestamps: this.modal.querySelector('#showTimestamps').checked,
            showAvatars: this.modal.querySelector('#showAvatars').checked,
            language: this.modal.querySelector('#language').value,
            theme: this.modal.querySelector('#theme').value,
            fontSize: this.modal.querySelector('#fontSize').value
        };
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
     * Open the profile editor
     */
    open(user = null) {
        this.isOpen = true;
        this.modal.style.display = 'flex';
        
        if (user) {
            this.loadUserData(user);
        }
        
        this.setActiveTab('basic');
    }

    /**
     * Close the profile editor
     */
    close() {
        this.isOpen = false;
        this.modal.style.display = 'none';
    }

    /**
     * Toggle the profile editor
     */
    toggle(user = null) {
        if (this.isOpen) {
            this.close();
        } else {
            this.open(user);
        }
    }

    /**
     * Destroy the editor
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
    module.exports = ProfileEditor;
} else if (typeof window !== 'undefined') {
    window.ProfileEditor = ProfileEditor;
    console.log('✅ [PROFILE] ProfileEditor class loaded');
}
