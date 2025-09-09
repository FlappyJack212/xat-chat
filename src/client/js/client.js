/**
 * Xat Chat Client
 * Unified client-side JavaScript for the modern xat chat interface
 */

class XatClient {
    constructor() {
        this.socket = null;
        this.currentUser = null;
        this.currentRoom = 'Main Chat';
        this.isConnected = false;
        this.settings = this.loadSettings();

        this.initializeApp();
    }

    /**
     * Initialize the application
     */
    initializeApp() {
        console.log('🎭 [CLIENT] Initializing Xat Chat Client...');

        // Check if user is already authenticated
        const token = localStorage.getItem('authToken');
        if (token) {
            this.showChatInterface();
            this.connectSocket();
        } else {
            this.showAuthModal();
        }

        // Initialize event listeners
        this.initializeEventListeners();
    }

    /**
     * Initialize event listeners
     */
    initializeEventListeners() {
        // Message input
        const messageInput = document.getElementById('messageInput');
        if (messageInput) {
            messageInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });
        }

        // Settings checkboxes
        const settingsCheckboxes = ['darkMode', 'showTimestamps', 'messageSound', 'powerSound', 'showOnlineStatus'];
        settingsCheckboxes.forEach(id => {
            const checkbox = document.getElementById(id);
            if (checkbox) {
                checkbox.addEventListener('change', () => this.saveSettings());
            }
        });
    }

    /**
     * Connect to the server via Socket.IO
     */
    connectSocket() {
        console.log('🔌 [CLIENT] Connecting to server...');

        this.socket = io();

        this.socket.on('connect', () => {
            console.log('🔌 [CLIENT] Connected to server');
            this.isConnected = true;

            // Authenticate if we have a token
            const token = localStorage.getItem('authToken');
            if (token) {
                this.socket.emit('authenticate', { token });
            }
        });

        this.socket.on('disconnect', () => {
            console.log('🔌 [CLIENT] Disconnected from server');
            this.isConnected = false;
        });

        // Authentication events
        this.socket.on('authenticated', (data) => {
            console.log('🔐 [CLIENT] Authentication successful:', data);
            this.currentUser = data.user;
            this.updateUserInterface();
            this.joinMainChat();
        });

        this.socket.on('guest-authenticated', (data) => {
            console.log('👤 [CLIENT] Guest authentication successful:', data);
            this.currentUser = data.user;
            this.updateUserInterface();
            this.joinMainChat();
        });

        this.socket.on('auth-error', (data) => {
            console.error('🔐 [CLIENT] Authentication error:', data.message);
            this.showError(data.message);
            localStorage.removeItem('authToken');
            this.showAuthModal();
        });

        // Chat events
        this.socket.on('room-joined', (data) => {
            console.log('🚪 [CLIENT] Joined room:', data);
            this.currentRoom = data.room.name;
            this.updateRoomInfo();
        });

        this.socket.on('message', (data) => {
            this.displayMessage(data);
            if (this.settings.messageSound) {
                this.playSound('message');
            }
        });

        this.socket.on('user-joined', (data) => {
            this.displaySystemMessage(`${data.nickname} joined the chat`);
            this.updateUserCount();
        });

        this.socket.on('user-left', (data) => {
            this.displaySystemMessage(`${data.nickname} left the chat`);
            this.updateUserCount();
        });

        this.socket.on('user-list', (data) => {
            this.updateUserList(data.users);
        });

        // Power events
        this.socket.on('power-activated', (data) => {
            this.displayPowerEffect(data);
            if (this.settings.powerSound) {
                this.playSound('power');
            }
        });

        this.socket.on('power-error', (data) => {
            this.showError(data.message);
        });
    }

    /**
     * Show authentication modal
     */
    showAuthModal() {
        document.getElementById('authModal').style.display = 'block';
        document.getElementById('chatInterface').style.display = 'none';
    }

    /**
     * Show chat interface
     */
    showChatInterface() {
        document.getElementById('authModal').style.display = 'none';
        document.getElementById('chatInterface').style.display = 'flex';
    }

    /**
     * Handle login form submission
     */
    async handleLogin(event) {
        event.preventDefault();

        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        if (!username || !password) {
            this.showError('Please fill in all fields');
            return;
        }

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('authToken', data.token);
                localStorage.setItem('userData', JSON.stringify(data.user));
                this.showChatInterface();
                this.connectSocket();
            } else {
                this.showError(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            this.showError('Network error. Please try again.');
        }
    }

    /**
     * Handle register form submission
     */
    async handleRegister(event) {
        event.preventDefault();

        const username = document.getElementById('registerUsername').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;

        if (!username || !email || !password) {
            this.showError('Please fill in all fields');
            return;
        }

        if (password.length < 6) {
            this.showError('Password must be at least 6 characters');
            return;
        }

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            });

            const data = await response.json();

            if (response.ok) {
                this.showSuccess('Account created successfully! Please login.');
                setTimeout(() => {
                    this.showAuthTab('login');
                }, 2000);
            } else {
                this.showError(data.message || 'Registration failed');
            }
        } catch (error) {
            console.error('Registration error:', error);
            this.showError('Network error. Please try again.');
        }
    }

    /**
     * Show guest login
     */
    showGuestLogin() {
        if (this.socket && this.socket.connected) {
            const guestName = prompt('Enter your guest name:', 'Guest' + Math.floor(Math.random() * 1000));
            if (guestName) {
                this.socket.emit('guest-login', { nickname: guestName });
            }
        } else {
            this.showError('Not connected to server');
        }
    }

    /**
     * Switch authentication tabs
     */
    showAuthTab(tab) {
        // Update tab buttons
        document.querySelectorAll('.auth-tab').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');

        // Update forms
        document.querySelectorAll('.auth-form').forEach(form => {
            form.classList.remove('active');
        });

        if (tab === 'login') {
            document.getElementById('loginForm').classList.add('active');
        } else {
            document.getElementById('registerForm').classList.add('active');
        }
    }

    /**
     * Join main chat room
     */
    joinMainChat() {
        if (this.socket && this.socket.connected) {
            this.socket.emit('join-room', { roomId: 'main' });
        }
    }

    /**
     * Send a message
     */
    sendMessage() {
        const input = document.getElementById('messageInput');
        const message = input.value.trim();

        if (!message) return;

        if (this.socket && this.socket.connected) {
            this.socket.emit('send-message', {
                message: message,
                roomId: 'main'
            });
            input.value = '';
        } else {
            this.showError('Not connected to server');
        }
    }

    /**
     * Handle key press in message input
     */
    handleKeyPress(event) {
        if (event.key === 'Enter') {
            this.sendMessage();
        }
    }

    /**
     * Insert smiley into message input
     */
    insertSmiley(smiley) {
        const input = document.getElementById('messageInput');
        input.value += smiley;
        input.focus();
    }

    /**
     * Display a message in the chat
     */
    displayMessage(data) {
        const container = document.getElementById('messagesContainer');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message';

        if (this.currentUser && data.user.id === this.currentUser.id) {
            messageDiv.classList.add('own');
        }

        const timestamp = this.settings.showTimestamps ? `<div class="message-time">${new Date().toLocaleTimeString()}</div>` : '';

        messageDiv.innerHTML = `
            <div class="message-user">${data.user.nickname || data.user.username}</div>
            <div class="message-content">${this.formatMessage(data.message)}</div>
            ${timestamp}
        `;

        container.appendChild(messageDiv);
        container.scrollTop = container.scrollHeight;
    }

    /**
     * Display a system message
     */
    displaySystemMessage(message) {
        const container = document.getElementById('messagesContainer');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message system';

        messageDiv.innerHTML = `
            <div class="message-content">${message}</div>
        `;

        container.appendChild(messageDiv);
        container.scrollTop = container.scrollHeight;
    }

    /**
     * Display power effect
     */
    displayPowerEffect(data) {
        const container = document.getElementById('messagesContainer');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message system';

        messageDiv.innerHTML = `
            <div class="message-content">⚡ ${data.user.nickname} used ${data.power.name}! ⚡</div>
        `;

        container.appendChild(messageDiv);
        container.scrollTop = container.scrollHeight;

        // Add visual effect
        this.addPowerVisualEffect(data.effect);
    }

    /**
     * Add visual power effect
     */
    addPowerVisualEffect(effect) {
        // Simple visual effect - could be expanded
        const container = document.getElementById('messagesContainer');
        container.style.animation = 'none';
        setTimeout(() => {
            container.style.animation = 'pulse 0.5s ease-in-out';
        }, 10);
    }

    /**
     * Format message content (handle smilies, etc.)
     */
    formatMessage(text) {
        // Simple smiley replacement - could be expanded
        const smileyMap = {
            ':)': '😊',
            ':((': '😢',
            ':D': '😃',
            ';)': '😉',
            ':P': '😛',
            '<3': '❤️'
        };

        let formatted = text;
        for (const [code, emoji] of Object.entries(smileyMap)) {
            formatted = formatted.replace(new RegExp(code.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), emoji);
        }

        return formatted;
    }

    /**
     * Update user interface with current user info
     */
    updateUserInterface() {
        if (this.currentUser) {
            const userInfo = document.getElementById('userInfo');
            if (userInfo) {
                userInfo.textContent = `Welcome, ${this.currentUser.nickname || this.currentUser.username}!`;
            }
        }
    }

    /**
     * Update room information
     */
    updateRoomInfo() {
        const roomInfo = document.getElementById('roomInfo');
        if (roomInfo) {
            roomInfo.textContent = this.currentRoom;
        }
    }

    /**
     * Update user list
     */
    updateUserList(users) {
        const userList = document.getElementById('usersList');
        const userCount = document.getElementById('userCount');

        if (userList) {
            userList.innerHTML = '';

            users.forEach(user => {
                const userDiv = document.createElement('div');
                userDiv.className = 'user-item';
                userDiv.innerHTML = `
                    <div class="user-avatar">${(user.nickname || user.username).charAt(0).toUpperCase()}</div>
                    <div class="user-info">
                        <div class="user-name">${user.nickname || user.username}</div>
                        <div class="user-status">Online</div>
                    </div>
                `;
                userList.appendChild(userDiv);
            });
        }

        if (userCount) {
            userCount.textContent = users.length;
        }
    }

    /**
     * Update user count
     */
    updateUserCount() {
        // This would be called when users join/leave
        // For now, just request updated user list
        if (this.socket && this.socket.connected) {
            // Could emit a request for updated user list
        }
    }

    /**
     * Show power store
     */
    showPowerStore() {
        const modal = document.getElementById('powerStoreModal');
        if (modal) {
            modal.style.display = 'block';
            this.loadPowerStore();
        }
    }

    /**
     * Load power store content
     */
    async loadPowerStore() {
        try {
            const response = await fetch('/api/powers');
            const powers = await response.json();

            const container = document.getElementById('powerStoreContent');
            if (container) {
                container.innerHTML = '<div class="power-grid"></div>';
                const grid = container.querySelector('.power-grid');

                powers.forEach(power => {
                    const powerCard = document.createElement('div');
                    powerCard.className = 'power-card';
                    powerCard.innerHTML = `
                        <div class="power-card-icon">${power.icon || '⚡'}</div>
                        <h3>${power.name}</h3>
                        <p>${power.description}</p>
                        <div class="power-price">${power.cost} xats</div>
                        <button class="btn btn-primary" onclick="purchasePower('${power.id}')">Purchase</button>
                    `;
                    grid.appendChild(powerCard);
                });
            }
        } catch (error) {
            console.error('Error loading power store:', error);
            this.showError('Failed to load power store');
        }
    }

    /**
     * Show settings modal
     */
    showSettings() {
        const modal = document.getElementById('settingsModal');
        if (modal) {
            // Load current settings
            Object.keys(this.settings).forEach(key => {
                const checkbox = document.getElementById(key);
                if (checkbox) {
                    checkbox.checked = this.settings[key];
                }
            });
            modal.style.display = 'block';
        }
    }

    /**
     * Save settings
     */
    saveSettings() {
        const settingsCheckboxes = ['darkMode', 'showTimestamps', 'messageSound', 'powerSound', 'showOnlineStatus'];
        settingsCheckboxes.forEach(id => {
            const checkbox = document.getElementById(id);
            if (checkbox) {
                this.settings[id] = checkbox.checked;
            }
        });

        localStorage.setItem('xatSettings', JSON.stringify(this.settings));
        this.applySettings();
    }

    /**
     * Load settings from localStorage
     */
    loadSettings() {
        const saved = localStorage.getItem('xatSettings');
        return saved ? JSON.parse(saved) : {
            darkMode: false,
            showTimestamps: true,
            messageSound: true,
            powerSound: true,
            showOnlineStatus: true
        };
    }

    /**
     * Apply settings to UI
     */
    applySettings() {
        // Apply dark mode
        if (this.settings.darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }

        // Other settings can be applied here
    }

    /**
     * Play sound effect
     */
    playSound(type) {
        // Simple beep for now - could be expanded with actual sound files
        if (typeof Audio !== 'undefined') {
            const audio = new Audio();
            audio.volume = 0.3;

            switch (type) {
                case 'message':
                    // Create a simple beep
                    const context = new (window.AudioContext || window.webkitAudioContext)();
                    const oscillator = context.createOscillator();
                    const gainNode = context.createGain();

                    oscillator.connect(gainNode);
                    gainNode.connect(context.destination);

                    oscillator.frequency.setValueAtTime(800, context.currentTime);
                    oscillator.frequency.setValueAtTime(600, context.currentTime + 0.1);

                    gainNode.gain.setValueAtTime(0.3, context.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.2);

                    oscillator.start(context.currentTime);
                    oscillator.stop(context.currentTime + 0.2);
                    break;

                case 'power':
                    // Different tone for power effects
                    // Similar implementation as above with different frequency
                    break;
            }
        }
    }

    /**
     * Show error message
     */
    showError(message) {
        // Simple alert for now - could be enhanced with toast notifications
        alert('Error: ' + message);
    }

    /**
     * Show success message
     */
    showSuccess(message) {
        // Simple alert for now - could be enhanced with toast notifications
        alert('Success: ' + message);
    }

    /**
     * Logout user
     */
    logout() {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        this.currentUser = null;

        if (this.socket) {
            this.socket.disconnect();
        }

        this.showAuthModal();
    }

    /**
     * Close modal
     */
    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
        }
    }
}

// Global functions for HTML event handlers
function showAuthTab(tab) {
    if (window.xatClient) {
        window.xatClient.showAuthTab(tab);
    }
}

function handleLogin(event) {
    if (window.xatClient) {
        window.xatClient.handleLogin(event);
    }
}

function handleRegister(event) {
    if (window.xatClient) {
        window.xatClient.handleRegister(event);
    }
}

function showGuestLogin() {
    if (window.xatClient) {
        window.xatClient.showGuestLogin();
    }
}

function sendMessage() {
    if (window.xatClient) {
        window.xatClient.sendMessage();
    }
}

function handleKeyPress(event) {
    if (window.xatClient) {
        window.xatClient.handleKeyPress(event);
    }
}

function insertSmiley(smiley) {
    if (window.xatClient) {
        window.xatClient.insertSmiley(smiley);
    }
}

function showPowerStore() {
    if (window.xatClient) {
        window.xatClient.showPowerStore();
    }
}

function showSettings() {
    if (window.xatClient) {
        window.xatClient.showSettings();
    }
}

function saveSettings() {
    if (window.xatClient) {
        window.xatClient.saveSettings();
    }
}

function logout() {
    if (window.xatClient) {
        window.xatClient.logout();
    }
}

function closeModal(modalId) {
    if (window.xatClient) {
        window.xatClient.closeModal(modalId);
    }
}

function purchasePower(powerId) {
    // Placeholder for power purchase functionality
    alert('Power purchase functionality coming soon!');
}

// Initialize the client when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.xatClient = new XatClient();
});