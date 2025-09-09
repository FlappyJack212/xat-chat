// Main application entry point
class XatChatApp {
    constructor() {
        this.modules = {};
        this.init();
    }

    init() {
        this.initializeModules();
        this.setupGlobalEventListeners();
        this.initializeUI();
    }

    initializeModules() {
        // Initialize core modules
        this.modules.chat = window.chatManager;
        this.modules.visitors = window.visitorsManager;
        this.modules.friends = window.friendsManager;
        
        // Initialize Quickbar if available
        if (typeof Quickbar !== 'undefined') {
            this.modules.quickbar = new Quickbar();
            this.modules.quickbar.init();
        }
        
        // Initialize simple quickbar toggle
        this.initializeQuickbarToggle();
    }

    setupGlobalEventListeners() {
        // Global keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case 'k':
                        e.preventDefault();
                        this.focusMessageInput();
                        break;
                    case 'b':
                        e.preventDefault();
                        this.toggleSidebar();
                        break;
                }
            }
        });

        // Window resize handling
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    initializeUI() {
        this.initializeSidebar();
        this.initializeTabs();
        this.initializeAudioControls();
        this.updateOnlineCounter();
    }

    initializeSidebar() {
        const sidebar = document.getElementById('sidebar');
        const toggleBtn = document.getElementById('sidebarToggle');
        
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => this.toggleSidebar());
        }
    }

    initializeTabs() {
        const tabContainer = document.getElementById('chatTabs');
        if (tabContainer) {
            this.addNewTab('Main Chat');
        }
    }

    initializeAudioControls() {
        const audioToggle = document.getElementById('audioToggle');
        if (audioToggle) {
            audioToggle.addEventListener('click', () => this.toggleAudioPanel());
        }
    }

    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
            sidebar.classList.toggle('hidden');
        }
    }

    toggleAudioPanel() {
        const audioPanel = document.getElementById('audioPanel');
        if (audioPanel) {
            audioPanel.classList.toggle('hidden');
        }
    }

    focusMessageInput() {
        const messageInput = document.getElementById('messageInput');
        if (messageInput) {
            messageInput.focus();
        }
    }

    addNewTab(tabName) {
        const tabContainer = document.getElementById('chatTabs');
        if (!tabContainer) return;

        const tab = document.createElement('div');
        tab.className = 'chat-tab';
        tab.innerHTML = `
            <span>${tabName}</span>
            <button onclick="this.parentElement.remove()" class="close-tab">&times;</button>
        `;

        tabContainer.appendChild(tab);
    }

    updateOnlineCounter() {
        const counter = document.getElementById('onlineCounter');
        if (counter && this.modules.visitors) {
            const count = this.modules.visitors.visitors.length;
            counter.innerHTML = `<span>${count}</span> online`;
        }
    }
    
    initializeQuickbarToggle() {
        // Quickbar toggle functionality
        const quickbarToggle = document.getElementById('quickbarToggle');
        const sideBar = document.getElementById('sideBar');
        const sideBardiv = document.getElementById('sideBardiv');
        
        // Toggle button functionality (open Quickbar)
        if (quickbarToggle && sideBardiv) {
            quickbarToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.openQuickbar();
            });
        }
        
        // Arrow button functionality (close sidebar)
        if (sideBar && sideBardiv) {
            sideBar.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.closeQuickbar();
            });
        }
    }
    
    openQuickbar() {
        const sideBardiv = document.getElementById('sideBardiv');
        const quickbarToggle = document.getElementById('quickbarToggle');
        
        if (sideBardiv && quickbarToggle) {
            // Open sidebar
            sideBardiv.style.right = '0px';
            quickbarToggle.style.display = 'none'; // Hide toggle when sidebar is open
            console.log('Quickbar opened');
        }
    }
    
    closeQuickbar() {
        const sideBardiv = document.getElementById('sideBardiv');
        const quickbarToggle = document.getElementById('quickbarToggle');
        
        if (sideBardiv && quickbarToggle) {
            // Close sidebar
            sideBardiv.style.right = '-174px';
            quickbarToggle.style.display = 'flex'; // Show toggle when sidebar is closed
            console.log('Quickbar closed');
        }
    }

    handleResize() {
        // Handle responsive layout changes
        const sidebar = document.getElementById('sidebar');
        if (window.innerWidth < 768 && sidebar) {
            sidebar.classList.add('hidden');
        }
    }

    // Utility methods
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 50px;
            right: 20px;
            background: ${type === 'error' ? '#f44336' : '#4fc3f7'};
            color: #000000;
            padding: 10px 20px;
            border-radius: 5px;
            z-index: 1002;
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Power system integration
    activatePower(powerName) {
        if (window.powerEffects) {
            const userElement = document.querySelector('.user-info');
            if (userElement) {
                window.powerEffects.applyEffect(userElement, powerName.toLowerCase(), 'user', 10000);
            }
            window.powerEffects.showPowerPurchased(`${powerName} activated!`);
        }
    }

    // Group management
    createGroup() {
        const groupName = prompt('Enter group name:');
        if (groupName) {
            this.showNotification(`Created group: ${groupName}`);
            // Add group creation logic here
        }
    }

    editGroup(groupName) {
        this.showNotification(`Editing group: ${groupName}`);
        // Add group editing logic here
    }
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.xatApp = new XatChatApp();
});

// Global utility functions for backward compatibility
function toggleSidebar() {
    if (window.xatApp) {
        window.xatApp.toggleSidebar();
    }
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

function toggleUserList() {
    const userList = document.getElementById('userList');
    if (userList) {
        userList.classList.toggle('hidden');
    }
}

function toggleNotifications() {
    const notifications = document.getElementById('notifications');
    if (notifications) {
        notifications.classList.toggle('hidden');
    }
}

function addToFavorites(roomName) {
    if (window.xatApp) {
        window.xatApp.showNotification(`Added ${roomName} to favorites`);
    }
}

function removeFromFavorites(roomName) {
    if (window.xatApp) {
        window.xatApp.showNotification(`Removed ${roomName} from favorites`);
    }
}

function addToFriends(username) {
    if (window.friendsManager) {
        window.friendsManager.addToFriends(username);
    }
}

function removeFromFriends(username) {
    if (window.friendsManager) {
        window.friendsManager.removeFromFriends(username);
    }
}

function activatePower(powerName) {
    if (window.xatApp) {
        window.xatApp.activatePower(powerName);
    }
}

function createGroup() {
    if (window.xatApp) {
        window.xatApp.createGroup();
    }
}

function editGroup(groupName) {
    if (window.xatApp) {
        window.xatApp.editGroup(groupName);
    }
}
