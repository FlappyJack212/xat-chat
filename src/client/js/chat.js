// Chat functionality
class ChatManager {
    constructor() {
        this.socket = null;
        this.currentRoom = 'main';
        this.messages = [];
        this.init();
    }

    init() {
        this.initializeSocket();
        this.setupEventListeners();
        this.loadMessages();
    }

    initializeSocket() {
        this.socket = io();
        
        this.socket.on('connect', () => {
            console.log('Connected to server');
            this.updateConnectionStatus(true);
        });

        this.socket.on('disconnect', () => {
            console.log('Disconnected from server');
            this.updateConnectionStatus(false);
        });

        this.socket.on('message', (data) => {
            this.addMessage(data);
        });

        this.socket.on('userJoined', (data) => {
            this.showUserNotification(`${data.username} joined the chat`);
        });

        this.socket.on('userLeft', (data) => {
            this.showUserNotification(`${data.username} left the chat`);
        });
    }

    setupEventListeners() {
        const messageInput = document.getElementById('messageInput');
        const sendButton = document.getElementById('sendButton');

        if (messageInput && sendButton) {
            sendButton.addEventListener('click', () => this.sendMessage());
            messageInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });
        }
    }

    sendMessage() {
        const messageInput = document.getElementById('messageInput');
        const message = messageInput.value.trim();

        if (message && this.socket) {
            const messageData = {
                username: this.getCurrentUsername(),
                message: message,
                timestamp: new Date(),
                room: this.currentRoom
            };

            this.socket.emit('message', messageData);
            messageInput.value = '';
        }
    }

    addMessage(data) {
        const messagesContainer = document.getElementById('messagesContainer');
        if (!messagesContainer) return;

        const messageElement = this.createMessageElement(data);
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        this.messages.push(data);
    }

    createMessageElement(data) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message';

        const time = new Date(data.timestamp).toLocaleTimeString();
        
        messageDiv.innerHTML = `
            <div class="message-header">
                <span class="message-username">${data.username}</span>
                <span class="message-time">${time}</span>
            </div>
            <div class="message-content">${this.escapeHtml(data.message)}</div>
        `;

        return messageDiv;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    getCurrentUsername() {
        return localStorage.getItem('username') || 'Anonymous';
    }

    updateConnectionStatus(connected) {
        const statusElement = document.getElementById('connectionStatus');
        if (statusElement) {
            statusElement.textContent = connected ? 'Connected' : 'Disconnected';
            statusElement.className = connected ? 'connected' : 'disconnected';
        }
    }

    showUserNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'user-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 50px;
            right: 20px;
            background: #4fc3f7;
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

    loadMessages() {
        // Load messages from localStorage or server
        const savedMessages = localStorage.getItem('chatMessages');
        if (savedMessages) {
            this.messages = JSON.parse(savedMessages);
            this.renderMessages();
        }
    }

    renderMessages() {
        const messagesContainer = document.getElementById('messagesContainer');
        if (!messagesContainer) return;

        messagesContainer.innerHTML = '';
        this.messages.forEach(message => {
            const messageElement = this.createMessageElement(message);
            messagesContainer.appendChild(messageElement);
        });
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}

// Initialize chat when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.chatManager = new ChatManager();
});
