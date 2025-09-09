// Socket Management Module
class SocketManager {
    constructor() {
        this.socket = null;
        this.currentUser = null;
        this.authSystem = null;
        this.powerEffects = null;
        this.init();
    }

    init() {
        this.initializeSocket();
    }

    initializeSocket() {
        // Check if Socket.IO is available
        if (typeof io === 'undefined') {
            console.error('Socket.IO not loaded. Retrying in 100ms...');
            setTimeout(() => this.initializeSocket(), 100);
            return;
        }
        
        this.socket = io();
        
        this.socket.on('connect', () => {
            console.log('🔌 [XAT] Connected to server');
            this.authenticateAsGuest();
        });
        
        this.socket.on('authenticated', (data) => {
            console.log('🔐 [XAT] Authenticated:', data);
            if (data.user) {
                this.currentUser = data.user;
            }
            this.joinMainChat();
        });

        this.socket.on('message', (data) => {
            this.addMessage(data.user.nickname || data.user.username, data.message, data.user);
        });
        
        this.socket.on('userList', (data) => {
            console.log('👥 [XAT] Received user list:', data);
            this.displayUsers(data.users);
        });
        
        // Room-related events
        this.socket.on('roomJoined', (data) => {
            console.log('🚪 [XAT] Joined room:', data.room.name);
            this.addMessage('System', `Joined room: ${data.room.name}`);
        });
        
        this.socket.on('userJoined', (data) => {
            this.addMessage('System', `${data.user.nickname || data.user.username} joined the room`);
            this.updateRoomUserCount(window.chatTabsManager?.currentRoom || 'main', data.userCount || 0);
        });
        
        this.socket.on('userLeft', (data) => {
            this.addMessage('System', `${data.user.nickname || data.user.username} left the room`);
            this.updateRoomUserCount(window.chatTabsManager?.currentRoom || 'main', data.userCount || 0);
        });

        // Handle pawn changes
        this.socket.on('pawn-changed', (data) => {
            console.log('🎭 [XAT] Pawn changed:', data);
            this.showNotification(`Pawn changed to ${data.color || 'custom image'}`, 'success');
        });

        // Handle pawn upload response
        this.socket.on('pawn-uploaded', (data) => {
            console.log('🎭 [XAT] Pawn uploaded:', data);
            this.showNotification('Pawn uploaded successfully!', 'success');
        });

        // Handle game events
        this.socket.on('game-started', (data) => {
            console.log('🎮 [XAT] Game started:', data);
            this.showNotification(`${data.starter} started a ${data.gameType} game!`, 'info');
        });

        this.socket.on('game-joined', (data) => {
            console.log('🎮 [XAT] Joined game:', data);
            this.updateGamePlayers(data.players);
        });

        this.socket.on('game-invitation', (data) => {
            console.log('🎮 [XAT] Game invitation:', data);
            this.showGameInvitation(data);
        });

        this.socket.on('player-left-game', (data) => {
            console.log('🎮 [XAT] Player left game:', data);
            this.showNotification(`${data.player} left the game`, 'info');
        });

        this.socket.on('error', (data) => {
            console.error('❌ [XAT] Error:', data.message);
            this.addMessage('System', `Error: ${data.message}`, 'error');
        });

        // Handle private chat started
        this.socket.on('private-chat-started', (data) => {
            console.log('💬 [XAT] Private chat started:', data);
            this.showNotification(`Private chat started with ${data.otherUser}`, 'info');
        });

        // Handle friend events
        this.socket.on('friend-added', (data) => {
            console.log('👥 Friend added:', data);
            this.showNotification(`${data.username} added you as a friend!`, 'success');
            
            if (document.getElementById('friendsContent')) {
                window.friendsManager?.updateFriendsList();
            }
        });

        this.socket.on('friend-removed', (data) => {
            console.log('👥 Friend removed:', data);
            this.showNotification(`${data.username} removed you from friends`, 'info');
            
            if (document.getElementById('friendsContent')) {
                window.friendsManager?.updateFriendsList();
            }
        });

        this.socket.on('friend-error', (data) => {
            console.log('👥 Friend error:', data);
            this.showNotification(data.message, 'error');
        });

        // Handle name change events
        this.socket.on('name-changed', (data) => {
            console.log('📝 [XAT] Name changed:', data);
            this.showNotification(`Name changed to ${data.newName}`, 'success');
            
            if (this.currentUser && this.currentUser.id === data.userId) {
                this.currentUser.nickname = data.newName;
            }
            
            // Close modal if open
            this.closeModal();
        });

        this.socket.on('name-error', (data) => {
            console.log('📝 [XAT] Name change error:', data);
            this.showNotification(data.message, 'error');
        });
    }

    authenticateAsGuest() {
        const guestName = `Guest${Math.floor(Math.random() * 1000)}`;
        this.socket.emit('authenticate', { 
            type: 'guest', 
            username: guestName 
        });
    }

    joinMainChat() {
        console.log('🚪 [XAT] Joining main chat...');
        this.socket.emit('joinRoom', { room: 'main' });
    }

    sendMessage() {
        const input = document.getElementById('messageInput');
        const message = input.value.trim();
        
        if (message && this.socket) {
            this.socket.emit('message', { 
                message: message,
                room: window.chatTabsManager?.currentRoom || 'main'
            });
            input.value = '';
        }
    }

    addMessage(username, message, user = null) {
        const messageArea = document.getElementById('messageArea');
        if (!messageArea) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message';
        
        const time = new Date().toLocaleTimeString();
        const avatar = this.getUserAvatarDisplay(user);
        
        messageDiv.innerHTML = `
            <div class="message-avatar">${avatar}</div>
            <div class="message-content">
                <div class="message-header">
                    <span class="message-username">${username}</span>
                    <span class="message-time">${time}</span>
                </div>
                <div class="message-text">${this.renderMarkdown(message)}</div>
            </div>
        `;
        
        messageArea.appendChild(messageDiv);
        messageArea.scrollTop = messageArea.scrollHeight;
    }

    getUserAvatarDisplay(user) {
        if (!user) return '👤';
        
        // Enhanced pawn system with iXat-style colors
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'];
        const colorIndex = (user.id || 0) % colors.length;
        const bgColor = colors[colorIndex];
        
        if (user.avatar) {
            return `<img src="${user.avatar}" alt="${user.nickname || user.username}" class="user-avatar-img" style="background-color: ${bgColor}">`;
        }
        
        return `<div class="user-avatar" style="background-color: ${bgColor}">${(user.nickname || user.username).charAt(0).toUpperCase()}</div>`;
    }

    displayUsers(users) {
        const userList = document.getElementById('userList');
        if (!userList) return;
        
        userList.innerHTML = '';
        
        users.forEach(user => {
            const userElement = document.createElement('div');
            userElement.className = 'user-item';
            userElement.innerHTML = `
                <div class="user-avatar">${this.getUserAvatarDisplay(user)}</div>
                <div class="user-info">
                    <div class="user-name">${user.nickname || user.username}</div>
                    <div class="user-status">${user.status || 'Online'}</div>
                </div>
            `;
            
            userElement.addEventListener('click', () => {
                this.showUserProfile(user);
            });
            
            userList.appendChild(userElement);
        });
    }

    renderMarkdown(text) {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code>$1</code>')
            .replace(/@(\w+)/g, '<span class="mention">@$1</span>');
    }

    showNotification(message, type = 'info') {
        if (window.notificationSystem) {
            window.notificationSystem.show(message, type);
        } else {
            console.log(`[${type.toUpperCase()}] ${message}`);
        }
    }

    closeModal() {
        if (window.modalSystem) {
            window.modalSystem.close();
        }
    }

    updateRoomUserCount(roomName, count) {
        if (window.chatTabsManager) {
            window.chatTabsManager.updateRoomUserCount(roomName, count);
        }
    }

    updateGamePlayers(players) {
        // Game players update logic
        console.log('Game players updated:', players);
    }

    showGameInvitation(data) {
        // Game invitation display logic
        console.log('Game invitation:', data);
    }
}

// Initialize socket manager
const socketManager = new SocketManager();
