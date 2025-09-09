// UI Utilities Module
class UIUtils {
    constructor() {
        this.sidebarOpen = false;
        this.settings = {
            darkMode: true,
            showUserList: true,
            notifications: true
        };
        this.favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
        this.loadSettings();
        this.updateFavoritesList();
    }

    loadSettings() {
        this.settings.darkMode = localStorage.getItem('darkMode') === 'true';
        this.settings.showUserList = localStorage.getItem('showUserList') !== 'false';
        this.settings.notifications = localStorage.getItem('notifications') !== 'false';
        
        this.applySettings();
    }

    applySettings() {
        // Apply dark mode
        if (document.body) {
            document.body.classList.toggle('dark-mode', this.settings.darkMode);
        }
        
        // Apply user list visibility
        const userPanel = document.querySelector('.user-panel');
        if (userPanel) {
            userPanel.style.display = this.settings.showUserList ? 'block' : 'none';
        }
        
        // Update toggle states
        const darkModeToggle = document.getElementById('darkModeToggle');
        const userListToggle = document.getElementById('userListToggle');
        const notificationsToggle = document.getElementById('notificationsToggle');
        
        if (darkModeToggle) darkModeToggle.classList.toggle('active', this.settings.darkMode);
        if (userListToggle) userListToggle.classList.toggle('active', this.settings.showUserList);
        if (notificationsToggle) notificationsToggle.classList.toggle('active', this.settings.notifications);
    }

    toggleSidebar() {
        const sidebar = document.getElementById('collapsibleSidebar');
        this.sidebarOpen = !this.sidebarOpen;
        sidebar.classList.toggle('open', this.sidebarOpen);
    }

    toggleDarkMode() {
        this.settings.darkMode = !this.settings.darkMode;
        const toggle = document.getElementById('darkModeToggle');
        toggle.classList.toggle('active', this.settings.darkMode);
        
        if (document.body) {
            document.body.classList.toggle('dark-mode', this.settings.darkMode);
        }
        localStorage.setItem('darkMode', this.settings.darkMode);
    }

    toggleUserList() {
        this.settings.showUserList = !this.settings.showUserList;
        const toggle = document.getElementById('userListToggle');
        toggle.classList.toggle('active', this.settings.showUserList);
        
        const userPanel = document.querySelector('.user-panel');
        if (userPanel) {
            userPanel.style.display = this.settings.showUserList ? 'block' : 'none';
        }
        localStorage.setItem('showUserList', this.settings.showUserList);
    }

    toggleNotifications() {
        this.settings.notifications = !this.settings.notifications;
        const toggle = document.getElementById('notificationsToggle');
        toggle.classList.toggle('active', this.settings.notifications);
        localStorage.setItem('notifications', this.settings.notifications);
    }

    // Favorites management
    addToFavorites(roomName) {
        if (!this.favorites.includes(roomName)) {
            this.favorites.push(roomName);
            localStorage.setItem('favorites', JSON.stringify(this.favorites));
            this.updateFavoritesList();
        }
    }

    removeFromFavorites(roomName) {
        this.favorites = this.favorites.filter(fav => fav !== roomName);
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
        this.updateFavoritesList();
    }

    updateFavoritesList() {
        const favoritesList = document.getElementById('favoritesList');
        if (!favoritesList) return;
        
        favoritesList.innerHTML = '';
        
        this.favorites.forEach(roomName => {
            const item = document.createElement('div');
            item.className = 'favorite-item';
            item.innerHTML = `
                <span class="sidebar-icon">⭐</span>
                <span class="favorite-name">${roomName}</span>
                <span class="favorite-remove" onclick="uiUtils.removeFromFavorites('${roomName}')">×</span>
            `;
            item.onclick = () => {
                this.toggleSidebar();
                // Switch to room logic here
            };
            favoritesList.appendChild(item);
        });
    }

    // Scroll text functionality
    setScrollText(text) {
        if (!text) return;
        
        const scrollContainer = document.getElementById('scrollText');
        if (!scrollContainer) return;
        
        const words = text.split(' ');
        const processedWords = words.map(word => {
            if (this.isValidUrl(word)) {
                return `<a href="${word}" target="_blank" class="scroll-url">${word}</a>`;
            }
            return word;
        });
        
        scrollContainer.innerHTML = processedWords.join(' ');
        this.startScrollAnimation(scrollContainer);
    }

    startScrollAnimation(container) {
        const containerWidth = container.offsetWidth;
        const parentWidth = container.parentElement.offsetWidth;
        
        if (containerWidth <= parentWidth) {
            container.style.animation = 'none';
            container.style.transform = 'translateX(0)';
            return;
        }
        
        const scrollDistance = containerWidth - parentWidth;
        const duration = Math.max(scrollDistance / 50, 10);
        
        container.style.animation = `scrollText ${duration}s linear infinite`;
    }

    isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }

    // Online counter functionality
    setTotalOnline(count) {
        const counter = document.getElementById('onlineCounter');
        if (counter) {
            counter.textContent = count;
        }
    }

    startOnlineCounter() {
        // Online counter logic here
        console.log('Online counter started');
    }

    stopOnlineCounter() {
        // Stop online counter logic here
        console.log('Online counter stopped');
    }
}

// Initialize UI utils
const uiUtils = new UIUtils();
