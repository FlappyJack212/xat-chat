/**
 * Authentication System for iXat Chat
 * Handles user registration, login, profile management, and session handling
 */

class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.isAuthenticated = false;
        this.authToken = localStorage.getItem('authToken');
        this.apiBaseUrl = window.location.origin + '/api';
        
        this.init();
    }

    init() {
        // Check if user is already logged in
        if (this.authToken) {
            this.validateToken();
        }
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Setup UI
        this.setupUI();
    }

    setupEventListeners() {
        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // Register form
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => this.handleRegister(e));
        }

        // Logout button
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.handleLogout());
        }

        // Profile form
        const profileForm = document.getElementById('profileForm');
        if (profileForm) {
            profileForm.addEventListener('submit', (e) => this.handleProfileUpdate(e));
        }
    }

    setupUI() {
        this.updateAuthUI();
    }

    // Validate existing token
    async validateToken() {
        try {
            const response = await fetch(`${this.apiBaseUrl}/auth/me`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.authToken}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const userData = await response.json();
                this.currentUser = userData.user;
                this.isAuthenticated = true;
                this.updateAuthUI();
                return true;
            } else {
                this.logout();
                return false;
            }
        } catch (error) {
            console.error('Token validation failed:', error);
            this.logout();
            return false;
        }
    }

    // Handle login
    async handleLogin(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const loginData = {
            username: formData.get('username'),
            password: formData.get('password')
        };

        try {
            const response = await fetch(`${this.apiBaseUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });

            const result = await response.json();

            if (response.ok) {
                this.authToken = result.token;
                this.currentUser = result.user;
                this.isAuthenticated = true;
                
                // Store token in localStorage
                localStorage.setItem('authToken', this.authToken);
                
                // Update UI
                this.updateAuthUI();
                
                // Show success message
                this.showNotification('Login successful!', 'success');
                
                // Close login modal if open
                this.closeModal('loginModal');
                
                // Redirect to chat or refresh page
                if (window.location.pathname === '/login.html') {
                    window.location.href = '/';
                }
            } else {
                this.showNotification(result.message || 'Login failed', 'error');
            }
        } catch (error) {
            console.error('Login error:', error);
            this.showNotification('Login failed. Please try again.', 'error');
        }
    }

    // Handle registration
    async handleRegister(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const registerData = {
            username: formData.get('username'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
            nickname: formData.get('nickname') || formData.get('username')
        };

        // Validate passwords match
        if (registerData.password !== registerData.confirmPassword) {
            this.showNotification('Passwords do not match', 'error');
            return;
        }

        // Validate password strength
        if (registerData.password.length < 6) {
            this.showNotification('Password must be at least 6 characters long', 'error');
            return;
        }

        try {
            const response = await fetch(`${this.apiBaseUrl}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registerData)
            });

            const result = await response.json();

            if (response.ok) {
                this.showNotification('Registration successful! Please login.', 'success');
                this.closeModal('registerModal');
                this.openModal('loginModal');
            } else {
                this.showNotification(result.message || 'Registration failed', 'error');
            }
        } catch (error) {
            console.error('Registration error:', error);
            this.showNotification('Registration failed. Please try again.', 'error');
        }
    }

    // Handle profile update
    async handleProfileUpdate(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const profileData = {
            nickname: formData.get('nickname'),
            email: formData.get('email'),
            avatar: formData.get('avatar'),
            desc: formData.get('desc'),
            preferences: {
                sound: formData.get('sound') === 'on',
                music: formData.get('music') === 'on',
                notifications: formData.get('notifications') === 'on',
                autoScroll: formData.get('autoScroll') === 'on',
                language: formData.get('language')
            }
        };

        try {
            const response = await fetch(`${this.apiBaseUrl}/auth/profile`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${this.authToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(profileData)
            });

            const result = await response.json();

            if (response.ok) {
                this.currentUser = { ...this.currentUser, ...result.user };
                this.updateAuthUI();
                this.showNotification('Profile updated successfully!', 'success');
            } else {
                this.showNotification(result.message || 'Profile update failed', 'error');
            }
        } catch (error) {
            console.error('Profile update error:', error);
            this.showNotification('Profile update failed. Please try again.', 'error');
        }
    }

    // Handle logout
    handleLogout() {
        this.logout();
        this.showNotification('Logged out successfully', 'info');
    }

    // Logout user
    logout() {
        this.currentUser = null;
        this.isAuthenticated = false;
        this.authToken = null;
        localStorage.removeItem('authToken');
        this.updateAuthUI();
    }

    // Update authentication UI
    updateAuthUI() {
        const loginBtn = document.getElementById('loginBtn');
        const registerBtn = document.getElementById('registerBtn');
        const logoutBtn = document.getElementById('logoutBtn');
        const userInfo = document.getElementById('userInfo');
        const profileBtn = document.getElementById('profileBtn');

        if (this.isAuthenticated && this.currentUser) {
            // User is logged in
            if (loginBtn) loginBtn.style.display = 'none';
            if (registerBtn) registerBtn.style.display = 'none';
            if (logoutBtn) logoutBtn.style.display = 'inline-block';
            if (profileBtn) profileBtn.style.display = 'inline-block';
            
            if (userInfo) {
                userInfo.innerHTML = `
                    <div class="user-info">
                        <span class="user-avatar">${this.getAvatarDisplay(this.currentUser.avatar)}</span>
                        <span class="user-name">${this.currentUser.nickname || this.currentUser.username}</span>
                        <span class="user-xats">${this.currentUser.xats} xats</span>
                        <span class="user-days">${this.currentUser.days} days</span>
                    </div>
                `;
                userInfo.style.display = 'block';
            }
        } else {
            // User is not logged in
            if (loginBtn) loginBtn.style.display = 'inline-block';
            if (registerBtn) registerBtn.style.display = 'inline-block';
            if (logoutBtn) logoutBtn.style.display = 'none';
            if (profileBtn) profileBtn.style.display = 'none';
            
            if (userInfo) {
                userInfo.innerHTML = '';
                userInfo.style.display = 'none';
            }
        }
    }

    // Get avatar display
    getAvatarDisplay(avatar) {
        if (avatar && avatar !== '0' && avatar !== '1') {
            return `<img src="assets/images/${avatar}.png" alt="Avatar" class="avatar-img" onerror="this.style.display='none'">`;
        }
        return '👤';
    }

    // Open modal
    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
            modal.classList.add('show');
        }
    }

    // Close modal
    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
            modal.classList.remove('show');
        }
    }

    // Show notification
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
            padding: 12px 20px;
            border-radius: 5px;
            color: white;
            font-weight: bold;
            box-shadow: 0 4px 8px rgba(0,0,0,0.3);
            animation: slideIn 0.3s ease-out;
        `;

        // Set background color based on type
        switch (type) {
            case 'success':
                notification.style.background = 'linear-gradient(45deg, #00ff00, #00cc00)';
                break;
            case 'error':
                notification.style.background = 'linear-gradient(45deg, #ff0000, #cc0000)';
                break;
            case 'warning':
                notification.style.background = 'linear-gradient(45deg, #ffa500, #ff8c00)';
                break;
            default:
                notification.style.background = 'linear-gradient(45deg, #007bff, #0056b3)';
        }

        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOut 0.3s ease-in';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }
        }, 3000);
    }

    // Get current user
    getCurrentUser() {
        return this.currentUser;
    }

    // Check if user is authenticated
    isUserAuthenticated() {
        return this.isAuthenticated;
    }

    // Get auth token
    getAuthToken() {
        return this.authToken;
    }

    // Get auth headers for API calls
    getAuthHeaders() {
        return {
            'Authorization': `Bearer ${this.authToken}`,
            'Content-Type': 'application/json'
        };
    }

    // Check if user has required rank
    hasRank(requiredRank) {
        if (!this.currentUser) return false;
        
        const rankHierarchy = {
            'guest': 0,
            'member': 1,
            'moderator': 3,
            'owner': 4,
            'mainowner': 9
        };
        
        const userRank = rankHierarchy[this.getRankName(this.currentUser.rank)] || 0;
        const required = rankHierarchy[requiredRank] || 0;
        
        return userRank >= required;
    }

    // Get rank name from rank number
    getRankName(rank) {
        const rankNames = {
            0: 'guest',
            1: 'member',
            2: 'admin',
            3: 'moderator',
            4: 'owner',
            5: 'guest',
            9: 'mainowner'
        };
        return rankNames[rank] || 'guest';
    }

    // Check if user can moderate another user
    canModerate(targetUser) {
        if (!this.currentUser || !targetUser) return false;
        
        // Main owners can moderate everyone
        if (this.currentUser.rank === 9) return true;
        
        // Owners can moderate moderators and below
        if (this.currentUser.rank === 4 && targetUser.rank < 4) return true;
        
        // Moderators can moderate members and guests
        if (this.currentUser.rank === 3 && targetUser.rank < 3) return true;
        
        return false;
    }

    // Update user xats
    updateXats(amount) {
        if (this.currentUser) {
            this.currentUser.xats += amount;
            if (this.currentUser.xats < 0) this.currentUser.xats = 0;
            this.updateAuthUI();
        }
    }

    // Update user days
    updateDays(amount) {
        if (this.currentUser) {
            this.currentUser.days += amount;
            if (this.currentUser.days < 0) this.currentUser.days = 0;
            this.updateAuthUI();
        }
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AuthSystem;
} else {
    window.AuthSystem = AuthSystem;
}
