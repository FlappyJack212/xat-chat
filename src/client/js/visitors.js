// Visitors management
class VisitorsManager {
    constructor() {
        this.visitors = [];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadVisitors();
    }

    setupEventListeners() {
        // Listen for visitor updates from server
        if (window.chatManager && window.chatManager.socket) {
            window.chatManager.socket.on('visitorUpdate', (data) => {
                this.updateVisitors(data.visitors);
            });
        }
    }

    updateVisitors(visitors) {
        this.visitors = visitors;
        this.renderVisitors();
        this.updateVisitorCount();
    }

    renderVisitors() {
        const visitorsContainer = document.getElementById('visitorsList');
        if (!visitorsContainer) return;

        visitorsContainer.innerHTML = '';

        this.visitors.forEach(visitor => {
            const visitorElement = this.createVisitorElement(visitor);
            visitorsContainer.appendChild(visitorElement);
        });
    }

    createVisitorElement(visitor) {
        const visitorDiv = document.createElement('div');
        visitorDiv.className = 'visitor-item';
        visitorDiv.innerHTML = `
            <div class="visitor-avatar">
                <img src="${visitor.avatar || 'assets/avatars/default.png'}" alt="${visitor.username}">
            </div>
            <div class="visitor-info">
                <div class="visitor-username">${visitor.username}</div>
                <div class="visitor-status">${visitor.status || 'Online'}</div>
            </div>
            <div class="visitor-actions">
                <button onclick="visitorsManager.openProfile('${visitor.username}')" class="profile-btn">Profile</button>
                <button onclick="visitorsManager.addToFriends('${visitor.username}')" class="add-friend-btn">Add</button>
            </div>
        `;

        return visitorDiv;
    }

    updateVisitorCount() {
        const countElement = document.getElementById('visitorCount');
        if (countElement) {
            countElement.textContent = this.visitors.length;
        }
    }

    openProfile(username) {
        const visitor = this.visitors.find(v => v.username === username);
        if (visitor) {
            this.showProfileModal(visitor);
        }
    }

    showProfileModal(visitor) {
        // Create profile modal
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content profile-modal">
                <div class="modal-header">
                    <h2>${visitor.username}'s Profile</h2>
                    <span class="close" onclick="this.closest('.modal').remove()">&times;</span>
                </div>
                <div class="profile-container">
                    <div class="profile-header">
                        <div class="profile-avatar-section">
                            <div class="profile-avatar-large">
                                <img src="${visitor.avatar || 'assets/avatars/default.png'}" alt="${visitor.username}">
                            </div>
                        </div>
                        <div class="profile-info">
                            <h3 class="profile-name">${visitor.username}</h3>
                            <p class="profile-id">ID: ${visitor.id || 'N/A'}</p>
                            <p class="profile-status">${visitor.status || 'Online'}</p>
                            <p class="profile-location">${visitor.location || 'Unknown'}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    addToFriends(username) {
        if (window.friendsManager) {
            window.friendsManager.addToFriends(username);
        }
    }

    loadVisitors() {
        // Load visitors from localStorage or server
        const savedVisitors = localStorage.getItem('visitors');
        if (savedVisitors) {
            this.visitors = JSON.parse(savedVisitors);
            this.renderVisitors();
            this.updateVisitorCount();
        }
    }

    saveVisitors() {
        localStorage.setItem('visitors', JSON.stringify(this.visitors));
    }
}

// Initialize visitors manager
document.addEventListener('DOMContentLoaded', () => {
    window.visitorsManager = new VisitorsManager();
});
