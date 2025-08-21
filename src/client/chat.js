import io from 'socket.io-client';
import './css/normalize.css';
import './css/main.css';
import './css/chat.css';

class ChatApp {
  constructor() {
    this.socket = null;
    this.currentRoom = null;
    this.user = null;
    this.isTyping = false;
    this.typingTimeout = null;
    
    this.initializeElements();
    this.initializeSocket();
    this.bindEvents();
    this.loadUserData();
  }

  initializeElements() {
    this.chatContainer = document.getElementById('chat-container');
    this.messageList = document.getElementById('message-list');
    this.messageInput = document.getElementById('message-input');
    this.sendButton = document.getElementById('send-button');
    this.roomInfo = document.getElementById('room-info');
    this.userList = document.getElementById('user-list');
    this.typingIndicator = document.getElementById('typing-indicator');
    this.roomSelect = document.getElementById('room-select');
    this.avatarSelect = document.getElementById('avatar-select');
    this.powerSelect = document.getElementById('power-select');
  }

  initializeSocket() {
    this.socket = io();
    
    this.socket.on('connect', () => {
      console.log('Connected to server');
      this.updateConnectionStatus('Connected');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from server');
      this.updateConnectionStatus('Disconnected');
    });

    this.socket.on('message:received', (data) => {
      this.displayMessage(data);
    });

    this.socket.on('user:join', (data) => {
      this.handleUserJoin(data);
    });

    this.socket.on('user:leave', (data) => {
      this.handleUserLeave(data);
    });

    this.socket.on('typing:start', (data) => {
      this.showTypingIndicator(data.userId);
    });

    this.socket.on('typing:stop', (data) => {
      this.hideTypingIndicator(data.userId);
    });

    this.socket.on('power:effect', (data) => {
      this.handlePowerEffect(data);
    });
  }

  bindEvents() {
    // Send message
    this.sendButton.addEventListener('click', () => {
      this.sendMessage();
    });

    this.messageInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });

    // Typing indicators
    this.messageInput.addEventListener('input', () => {
      this.handleTyping();
    });

    // Room selection
    this.roomSelect.addEventListener('change', (e) => {
      this.joinRoom(e.target.value);
    });

    // Avatar selection
    this.avatarSelect.addEventListener('change', (e) => {
      this.changeAvatar(e.target.value);
    });

    // Power activation
    this.powerSelect.addEventListener('change', (e) => {
      this.activatePower(e.target.value);
    });
  }

  loadUserData() {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
      this.updateUserInfo();
    } else {
      // Redirect to login if no user data
      window.location.href = '/';
    }
  }

  sendMessage() {
    const message = this.messageInput.value.trim();
    if (!message || !this.currentRoom) return;

    const messageData = {
      roomId: this.currentRoom,
      content: message,
      type: 'text'
    };

    this.socket.emit('message:send', messageData);
    this.messageInput.value = '';
    this.stopTyping();
  }

  displayMessage(data) {
    const messageElement = document.createElement('div');
    messageElement.className = 'message';
    
    const timestamp = new Date(data.timestamp).toLocaleTimeString();
    
    messageElement.innerHTML = `
      <div class="message-header">
        <span class="username">${data.username || 'Anonymous'}</span>
        <span class="timestamp">${timestamp}</span>
      </div>
      <div class="message-content">${this.escapeHtml(data.content)}</div>
    `;

    this.messageList.appendChild(messageElement);
    this.scrollToBottom();
  }

  handleUserJoin(data) {
    const joinElement = document.createElement('div');
    joinElement.className = 'system-message join';
    joinElement.textContent = `${data.username || 'Anonymous'} joined the room`;
    
    this.messageList.appendChild(joinElement);
    this.scrollToBottom();
    this.updateUserList();
  }

  handleUserLeave(data) {
    const leaveElement = document.createElement('div');
    leaveElement.className = 'system-message leave';
    leaveElement.textContent = `${data.username || 'Anonymous'} left the room`;
    
    this.messageList.appendChild(leaveElement);
    this.scrollToBottom();
    this.updateUserList();
  }

  joinRoom(roomId) {
    if (this.currentRoom) {
      this.socket.emit('room:leave', this.currentRoom);
    }
    
    this.currentRoom = roomId;
    this.socket.emit('room:join', roomId);
    
    // Clear messages
    this.messageList.innerHTML = '';
    
    // Update room info
    this.updateRoomInfo(roomId);
  }

  handleTyping() {
    if (!this.isTyping) {
      this.isTyping = true;
      this.socket.emit('typing:start', this.currentRoom);
    }

    clearTimeout(this.typingTimeout);
    this.typingTimeout = setTimeout(() => {
      this.stopTyping();
    }, 3000);
  }

  stopTyping() {
    if (this.isTyping) {
      this.isTyping = false;
      this.socket.emit('typing:stop', this.currentRoom);
    }
  }

  showTypingIndicator(userId) {
    if (userId !== this.socket.id) {
      this.typingIndicator.textContent = 'Someone is typing...';
      this.typingIndicator.style.display = 'block';
    }
  }

  hideTypingIndicator(userId) {
    if (userId !== this.socket.id) {
      this.typingIndicator.style.display = 'none';
    }
  }

  changeAvatar(avatarId) {
    // Update user avatar
    this.socket.emit('avatar:change', { avatarId });
  }

  activatePower(powerId) {
    if (this.currentRoom) {
      this.socket.emit('power:activate', {
        roomId: this.currentRoom,
        powerId: powerId
      });
    }
  }

  handlePowerEffect(data) {
    // Handle power effects (animations, sounds, etc.)
    console.log('Power effect:', data);
    
    // Example: Play sound effect
    if (data.sound) {
      this.playSound(data.sound);
    }
    
    // Example: Show animation
    if (data.animation) {
      this.showAnimation(data.animation);
    }
  }

  playSound(soundFile) {
    const audio = new Audio(`/sounds/${soundFile}`);
    audio.play().catch(e => console.log('Audio play failed:', e));
  }

  showAnimation(animationType) {
    // Create animation element
    const animationElement = document.createElement('div');
    animationElement.className = `power-animation ${animationType}`;
    this.chatContainer.appendChild(animationElement);
    
    // Remove after animation
    setTimeout(() => {
      animationElement.remove();
    }, 3000);
  }

  updateConnectionStatus(status) {
    const statusElement = document.getElementById('connection-status');
    if (statusElement) {
      statusElement.textContent = status;
      statusElement.className = `status ${status.toLowerCase()}`;
    }
  }

  updateUserInfo() {
    const userInfoElement = document.getElementById('user-info');
    if (userInfoElement && this.user) {
      userInfoElement.innerHTML = `
        <span class="username">${this.user.username}</span>
        <span class="level">Level ${this.user.level || 1}</span>
      `;
    }
  }

  updateRoomInfo(roomId) {
    if (this.roomInfo) {
      this.roomInfo.innerHTML = `
        <h3>Room: ${roomId}</h3>
        <span class="user-count">0 users</span>
      `;
    }
  }

  updateUserList() {
    // This would be populated with actual user data from the server
    if (this.userList) {
      this.userList.innerHTML = '<div class="user-item">Loading users...</div>';
    }
  }

  scrollToBottom() {
    this.messageList.scrollTop = this.messageList.scrollHeight;
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Initialize the chat app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ChatApp();
});
