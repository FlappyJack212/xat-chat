import io from 'socket.io-client';
import './css/normalize.css';
import './css/main.css';
import './css/chat.css';

class AuthenticXatClassic {
  constructor() {
    this.socket = null;
    this.currentRoom = 'general';
    this.user = null;
    this.isTyping = false;
    this.typingTimeout = null;
    this.activePower = null;
    this.selectedAvatar = 'default';
    this.userPowers = [];
    this.allPowers = [];
    this.smilies = {};
    this.avatars = [];
    this.isConnected = false;
    this.notificationsEnabled = true;
    this.chatSoundEnabled = true;
    this.radioEnabled = false;
    this.currentTab = 'visitors';
    
    // Classic xat.com constants - authentic xat smilies
    this.SMILEYS = {
      // Classic xat smilies (exactly as shown in the image)
      '(smile)': '😊', '(frown)': '😢', '(big_smile)': '😃', '(wink)': '😉', 
      '(tongue)': '😛', '(surprised)': '😮', '(upset)': '😠', '(cool)': '😎',
      '(cry)': '😭', '(laugh)': '😂', '(rolleyes)': '🙄', '(kiss)': '😘',
      '(blush)': '😊', '(sleepy)': '😴', '(unsure)': '😕', '(devil)': '😈',
      '(angel)': '😇', '(sick)': '🤢', '(heart)': '❤️', '(broken_heart)': '💔',
      '(love)': '🥰', '(music)': '🎵', '(star)': '⭐', '(diamond)': '💎',
      '(beer)': '🍺', '(coffee)': '☕', '(pizza)': '🍕', '(cake)': '🎂',
      '(money)': '💰', '(phone)': '📞', '(mail)': '📧', '(computer)': '💻',
      '(tv)': '📺', '(car)': '🚗', '(plane)': '✈️', '(umbrella)': '☂️'
    };
    
    this.AVATAR_OPTIONS = [
      { id: 'default', emoji: '👤', name: 'Default' },
      { id: 'cat', emoji: '🐱', name: 'Cat' },
      { id: 'dog', emoji: '🐶', name: 'Dog' },
      { id: 'robot', emoji: '🤖', name: 'Robot' },
      { id: 'ninja', emoji: '🥷', name: 'Ninja' },
      { id: 'wizard', emoji: '🧙‍♂️', name: 'Wizard' },
      { id: 'dragon', emoji: '🐉', name: 'Dragon' },
      { id: 'unicorn', emoji: '🦄', name: 'Unicorn' },
      { id: 'ghost', emoji: '👻', name: 'Ghost' },
      { id: 'alien', emoji: '👽', name: 'Alien' },
      { id: 'clown', emoji: '🤡', name: 'Clown' },
      { id: 'vampire', emoji: '🧛‍♂️', name: 'Vampire' }
    ];
    
    this.POWER_EFFECTS = {
      rainbow: 'xat-rainbow-text',
      sparkle: 'xat-sparkle-text',
      fire: 'xat-fire-text',
      ice: 'xat-ice-text',
      lightning: 'xat-lightning-text',
      diamond: 'xat-diamond-text'
    };
    
    this.initializeElements();
    this.initializeSocket();
    this.bindEvents();
    this.loadUserData();
    this.initializeClassicFeatures();
  }

  initializeElements() {
    this.messageList = document.getElementById('message-list');
    this.messageInput = document.getElementById('message-input');
    this.sendButton = document.getElementById('send-button');
    this.userList = document.getElementById('user-list');
    this.typingIndicator = document.getElementById('typing-indicator');
    this.smileyBar = document.getElementById('smiley-bar');
    this.powerBar = document.getElementById('power-bar');
    this.connectionStatus = document.getElementById('connection-status');
    this.roomName = document.getElementById('room-name');
    this.bgMusic = document.getElementById('bg-music');
    
    // Sidebar buttons
    this.getChatboxBtn = document.getElementById('get-chatbox-btn');
    this.signOutBtn = document.getElementById('sign-out-btn');
    this.powerNotification = document.getElementById('power-notification');
    
    // Tabs
    this.visitorsTab = document.querySelector('[data-tab="visitors"]');
    this.friendsTab = document.querySelector('[data-tab="friends"]');
    
    // Profile modal
    this.profileModal = document.getElementById('profile-modal');
    this.profileClose = document.getElementById('profile-close');
    this.profileTitle = document.getElementById('profile-title');
    this.profileAvatar = document.getElementById('profile-avatar');
    this.profileName = document.getElementById('profile-name');
    this.profileXats = document.getElementById('profile-xats');
    this.profileDays = document.getElementById('profile-days');
    this.profileFields = document.getElementById('profile-fields');
    this.profileActions = document.getElementById('profile-actions');
  }

  initializeSocket() {
    this.socket = io();
    
    this.socket.on('connect', () => {
      console.log('Connected to Xat Classic server');
      this.isConnected = true;
      this.updateConnectionStatus('Connected');
      this.updateSignButton();
      this.joinRoom(this.currentRoom);
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from Xat Classic server');
      this.isConnected = false;
      this.updateConnectionStatus('Disconnected');
      this.updateSignButton();
    });

    this.socket.on('message:received', (data) => {
      this.displayAuthenticMessage(data);
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

    this.socket.on('avatar:update', (data) => {
      this.updateUserAvatar(data);
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

    // Smiley bar events
    if (this.smileyBar) {
      this.smileyBar.addEventListener('click', (e) => {
        if (e.target.classList.contains('xat-smiley-item')) {
          const smiley = e.target.dataset.smiley;
          this.insertSmiley(smiley);
        }
      });
    }

    // Power bar events
    if (this.powerBar) {
      this.powerBar.addEventListener('click', (e) => {
        if (e.target.classList.contains('xat-power-item')) {
          const power = e.target.dataset.power;
          this.activatePower(power);
        }
      });
    }

    // Sidebar buttons
    if (this.getChatboxBtn) {
      this.getChatboxBtn.addEventListener('click', () => {
        this.getChatBox();
      });
    }

    if (this.signOutBtn) {
      this.signOutBtn.addEventListener('click', () => {
        this.signOut();
      });
    }

    // Tab events
    if (this.visitorsTab) {
      this.visitorsTab.addEventListener('click', () => {
        this.switchTab('visitors');
      });
    }

    if (this.friendsTab) {
      this.friendsTab.addEventListener('click', () => {
        this.switchTab('friends');
      });
    }

    // Profile modal events
    if (this.profileClose) {
      this.profileClose.addEventListener('click', () => {
        this.closeProfileModal();
      });
    }

    // Close modal when clicking outside
    if (this.profileModal) {
      this.profileModal.addEventListener('click', (e) => {
        if (e.target === this.profileModal) {
          this.closeProfileModal();
        }
      });
    }

    // Username click events (delegated)
    this.messageList.addEventListener('click', (e) => {
      if (e.target.classList.contains('xat-username')) {
        const username = e.target.textContent;
        this.showUserProfile(username);
      }
    });

    // User list click events
    if (this.userList) {
      this.userList.addEventListener('click', (e) => {
        const userItem = e.target.closest('.xat-user-item');
        if (userItem) {
          const username = userItem.querySelector('.xat-user-name').textContent;
          this.showUserProfile(username);
        }
      });
    }
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

  initializeClassicFeatures() {
    this.loadSmilies();
    this.setupCommandSystem();
    this.startBackgroundMusic();
    this.showPowerNotification();
  }

  loadSmilies() {
    if (!this.smileyBar) return;
    
    this.smileyBar.innerHTML = '';
    Object.entries(this.SMILEYS).forEach(([code, emoji]) => {
      const smileyElement = document.createElement('div');
      smileyElement.className = 'xat-smiley-item';
      smileyElement.dataset.smiley = code;
      smileyElement.innerHTML = emoji;
      smileyElement.title = code;
      this.smileyBar.appendChild(smileyElement);
    });
  }

  showPowerNotification() {
    if (this.powerNotification) {
      // Show SILENTG power notification like in the image
      this.powerNotification.style.display = 'flex';
    }
  }

  setupCommandSystem() {
    this.messageInput.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        this.navigateCommandHistory('up');
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        this.navigateCommandHistory('down');
      }
    });
  }

  sendMessage() {
    const message = this.messageInput.value.trim();
    if (!message) return;

    // Check if it's a command
    if (message.startsWith('/')) {
      this.handleCommand(message);
    } else {
      // Regular message
    const messageData = {
      roomId: this.currentRoom,
        content: message,
      type: 'text',
        power: this.activePower,
        avatar: this.selectedAvatar
    };

    this.socket.emit('message:send', messageData);
    }

    this.messageInput.value = '';
    this.stopTyping();
    this.activePower = null;
    this.updatePowerBar();
  }

  handleCommand(command) {
    const parts = command.slice(1).split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (cmd) {
      case 'me':
        this.sendActionMessage(args.join(' '));
        break;
      case 'rainbow':
      case 'sparkle':
      case 'fire':
      case 'ice':
      case 'lightning':
      case 'diamond':
        this.activatePower(cmd);
        break;
      case 'bg':
        this.changeBackground(args[0] || 'default');
        break;
      case 'music':
        this.toggleMusic();
        break;
      case 'clear':
        this.clearChat();
        break;
      case 'help':
        this.showHelp();
        break;
      default:
        this.addSystemMessage(`Unknown command: /${cmd}. Type /help for available commands.`);
    }
  }

  sendActionMessage(action) {
    const messageData = {
      roomId: this.currentRoom,
      content: action,
      type: 'action',
      avatar: this.selectedAvatar
    };

    this.socket.emit('message:send', messageData);
  }

  activatePower(powerName) {
    this.activePower = powerName;
    this.updatePowerBar();
    this.addSystemMessage(`Power activated: ${powerName}!`);
  }

  updatePowerBar() {
    if (!this.powerBar) return;
    
    const powerItems = this.powerBar.querySelectorAll('.xat-power-item');
    powerItems.forEach(item => {
      item.classList.remove('active');
      if (item.dataset.power === this.activePower) {
        item.classList.add('active');
      }
    });
  }

  displayAuthenticMessage(data) {
    const messageElement = document.createElement('div');
    messageElement.className = 'xat-message';
    
    const timestamp = new Date(data.timestamp || Date.now()).toLocaleTimeString();
    
    if (data.type === 'action') {
      // Action message (/me)
      messageElement.classList.add('xat-system-message');
      messageElement.innerHTML = `
        <div class="xat-message-content">
          <em>${data.username || 'Anonymous'} ${this.formatMessage(data.content)}</em>
        </div>
      `;
    } else if (data.type === 'system') {
      // System message
      messageElement.classList.add('xat-system-message');
      messageElement.innerHTML = `
        <div class="xat-message-content">
          ${this.formatMessage(data.content)}
        </div>
      `;
    } else {
      // Regular message
      const messageContent = this.formatMessage(data.content);
      let formattedContent = messageContent;
      
      // Apply power effects
      if (data.power && this.POWER_EFFECTS[data.power]) {
        formattedContent = `<span class="${this.POWER_EFFECTS[data.power]}">${messageContent}</span>`;
      }
    
    messageElement.innerHTML = `
        <div class="xat-message-header">
          <span class="xat-username">${data.username || 'Anonymous'}</span>
          <span class="xat-timestamp">${timestamp}</span>
        </div>
        <div class="xat-message-content">
          ${formattedContent}
      </div>
    `;
    }

    this.messageList.appendChild(messageElement);
    this.scrollToBottom();
  }

  formatMessage(text) {
    // Convert smilies
    let formatted = text;
    Object.entries(this.SMILEYS).forEach(([code, emoji]) => {
      const regex = new RegExp(code.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      formatted = formatted.replace(regex, emoji);
    });
    
    // Basic HTML escaping
    formatted = formatted.replace(/&/g, '&amp;')
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;')
                        .replace(/"/g, '&quot;')
                        .replace(/'/g, '&#039;');
    
    return formatted;
  }

  handleUserJoin(data) {
    const joinElement = document.createElement('div');
    joinElement.className = 'xat-message xat-join-message';
    joinElement.innerHTML = `
      <div class="xat-message-content">
        <strong>${data.username || 'Anonymous'}</strong> joined the room
      </div>
    `;
    
    this.messageList.appendChild(joinElement);
    this.scrollToBottom();
    this.updateUserList();
  }

  handleUserLeave(data) {
    const leaveElement = document.createElement('div');
    leaveElement.className = 'xat-message xat-leave-message';
    leaveElement.innerHTML = `
      <div class="xat-message-content">
        <strong>${data.username || 'Anonymous'}</strong> left the room
      </div>
    `;
    
    this.messageList.appendChild(leaveElement);
    this.scrollToBottom();
    this.updateUserList();
  }

  joinRoom(roomId) {
    this.currentRoom = roomId;
    this.socket.emit('room:join', roomId);
    
    // Clear messages
    this.messageList.innerHTML = '';
    
    // Add welcome message
    this.addWelcomeMessage();
    
    // Update room name
    if (this.roomName) {
      this.roomName.textContent = `Room: ${roomId}`;
    }
  }

  addWelcomeMessage() {
    const welcomeElement = document.createElement('div');
    welcomeElement.className = 'xat-welcome';
    welcomeElement.innerHTML = `
      <h2>🎭 Welcome to Xat Classic! 🎭</h2>
      <p>Experience the authentic xat.com chat from 2007-2016</p>
      <div class="xat-features">
        <div class="xat-feature">🎭 Custom Avatars</div>
        <div class="xat-feature">✨ Special Powers</div>
        <div class="xat-feature">😊 Classic Smilies</div>
        <div class="xat-feature">🎵 Background Music</div>
        <div class="xat-feature">💬 Real-time Chat</div>
        <div class="xat-feature">🎨 Visual Effects</div>
      </div>
    `;
    this.messageList.appendChild(welcomeElement);
  }

  addSystemMessage(message) {
    const systemElement = document.createElement('div');
    systemElement.className = 'xat-message xat-system-message';
    systemElement.innerHTML = `
      <div class="xat-message-content">
        ${this.formatMessage(message)}
      </div>
    `;
    
    this.messageList.appendChild(systemElement);
    this.scrollToBottom();
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
      this.typingIndicator.style.display = 'block';
    }
  }

  hideTypingIndicator(userId) {
    if (userId !== this.socket.id) {
      this.typingIndicator.style.display = 'none';
    }
  }

  insertSmiley(smileyCode) {
    const currentValue = this.messageInput.value;
    const cursorPos = this.messageInput.selectionStart;
    const newValue = currentValue.slice(0, cursorPos) + smileyCode + currentValue.slice(cursorPos);
    this.messageInput.value = newValue;
    this.messageInput.focus();
    this.messageInput.setSelectionRange(cursorPos + smileyCode.length, cursorPos + smileyCode.length);
  }

  handlePowerEffect(data) {
    console.log('Power effect:', data);
    
    // Add visual effect to the chat
    const effectElement = document.createElement('div');
    effectElement.className = `xat-power-effect ${data.power}`;
    effectElement.innerHTML = `${data.icon || '✨'} ${data.username || 'Someone'} used ${data.power}!`;
    effectElement.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0,0,0,0.8);
      color: white;
      padding: 20px;
      border-radius: 10px;
      z-index: 1000;
      animation: fadeInOut 3s ease-in-out;
    `;
    
    document.body.appendChild(effectElement);
    
    setTimeout(() => {
      effectElement.remove();
    }, 3000);
  }

  // Sidebar button functions
  getChatBox() {
    this.addSystemMessage('Get a Chat Box - Visit xat.com to get your own chatbox!');
    // In a real implementation, this would redirect to xat.com's chat box page
  }

  signOut() {
    this.addSystemMessage('Signing out...');
    // Clear user data and redirect to homepage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setTimeout(() => {
      window.location.href = '/';
    }, 1000);
  }

  switchTab(tabName) {
    this.currentTab = tabName;
    
    // Update tab UI
    const tabs = document.querySelectorAll('.xat-tab');
    tabs.forEach(tab => {
      tab.classList.remove('active');
      if (tab.dataset.tab === tabName) {
        tab.classList.add('active');
      }
    });
    
    // Update user list based on tab
    this.updateUserList();
    this.addSystemMessage(`Switched to ${tabName} tab`);
  }

  updateSignButton() {
    if (this.signOutBtn) {
      // Always show "Sign Out" since user is logged in
      this.signOutBtn.textContent = 'Sign Out';
    }
  }

  // User profile modal functions
  showUserProfile(username) {
    const isOwnProfile = username === this.user?.username;
    
    if (isOwnProfile) {
      this.showOwnProfile();
    } else {
      this.showOtherUserProfile(username);
    }
  }

  showOwnProfile() {
    this.profileTitle.textContent = `${this.user.username} (${this.user.id || '123456789'})`;
    this.profileName.textContent = this.user.displayName || this.user.username;
    this.profileXats.textContent = `${this.user.credits || 1000} xats`;
    this.profileDays.textContent = `${this.user.level || 1} days`;
    
    // Show editable fields
    this.profileFields.style.display = 'block';
    
    // Set up own profile actions
    this.profileActions.innerHTML = `
      <button class="xat-profile-btn" onclick="this.settings()">⚙️ Settings</button>
      <button class="xat-profile-btn" onclick="this.divorce()">💔 Divorce</button>
      <button class="xat-profile-btn" onclick="this.xatStore()">🛍️ xat Store</button>
      <button class="xat-profile-btn" onclick="this.gifts()">🎁 Gifts</button>
      <button class="xat-profile-btn" onclick="this.login()">👤 Login</button>
      <button class="xat-profile-btn" onclick="this.buyXats()">💰 Buy xats</button>
      <button class="xat-profile-btn" onclick="this.powers()">⚡ Powers</button>
      <button class="xat-profile-btn primary" onclick="this.saveProfile()">✓ Save</button>
    `;
    
    this.profileModal.style.display = 'block';
  }

  showOtherUserProfile(username) {
    this.profileTitle.textContent = `${username} (${Math.floor(Math.random() * 1000000000)})`;
    this.profileName.textContent = username;
    this.profileXats.textContent = `${Math.floor(Math.random() * 5000)} xats`;
    this.profileDays.textContent = `${Math.floor(Math.random() * 365)} days`;
    
    // Hide editable fields for other users
    this.profileFields.style.display = 'none';
    
    // Set up other user actions
    this.profileActions.innerHTML = `
      <button class="xat-profile-btn" onclick="this.privateChat()">💬 Private Chat</button>
      <button class="xat-profile-btn" onclick="this.privateMessage()">📨 Private Message</button>
      <button class="xat-profile-btn" onclick="this.addFriend()">➕ Add as Friend</button>
      <button class="xat-profile-btn" onclick="this.ignore()">🚫 Ignore</button>
      <button class="xat-profile-btn" onclick="this.divorce()">💔 Divorce</button>
      <button class="xat-profile-btn" onclick="this.transfer()">↔️ Transfer</button>
      <button class="xat-profile-btn" onclick="this.powers()">⚡ Powers</button>
      <button class="xat-profile-btn" onclick="this.gifts()">🎁 Gifts</button>
    `;
    
    this.profileModal.style.display = 'block';
  }

  closeProfileModal() {
    this.profileModal.style.display = 'none';
  }

  changeBackground(background) {
    document.body.style.backgroundImage = `url('/backgrounds/${background}.jpg')`;
    this.addSystemMessage(`Background changed to: ${background}`);
  }

  toggleMusic() {
    if (this.bgMusic.paused) {
      this.bgMusic.play();
      this.addSystemMessage('Background music started');
    } else {
      this.bgMusic.pause();
      this.addSystemMessage('Background music stopped');
    }
  }

  clearChat() {
    this.messageList.innerHTML = '';
    this.addWelcomeMessage();
  }

  showHelp() {
    const helpMessage = `
Available commands:
/me [action] - Perform an action
/rainbow - Activate rainbow text effect
/sparkle - Activate sparkle text effect
/fire - Activate fire text effect
/ice - Activate ice text effect
/lightning - Activate lightning text effect
/diamond - Activate diamond text effect
/bg [background] - Change background
/music - Toggle background music
/clear - Clear chat
/help - Show this help message

You can also use smilies like :D :) :P <3 in your messages!
    `;
    this.addSystemMessage(helpMessage);
  }

  updateUserList() {
    if (!this.userList) return;
    
    // Simulate user list for demo
    const demoUsers = [
      { username: 'Admin', avatar: '🤖', status: 'online' },
      { username: 'CoolUser', avatar: '😎', status: 'online' },
      { username: 'Gamer123', avatar: '🎮', status: 'away' },
      { username: 'MusicLover', avatar: '🎵', status: 'online' }
    ];
    
    this.userList.innerHTML = '';
    demoUsers.forEach(user => {
      const userElement = document.createElement('div');
      userElement.className = 'xat-user-item';
      userElement.innerHTML = `
        <div class="xat-user-avatar">${user.avatar}</div>
        <div class="xat-user-name">${user.username}</div>
        <div class="xat-user-status" style="background: ${user.status === 'online' ? 'var(--xat-green)' : 'var(--xat-yellow)'}"></div>
      `;
      this.userList.appendChild(userElement);
    });
  }

  updateConnectionStatus(status) {
    if (this.connectionStatus) {
      this.connectionStatus.textContent = status;
      this.connectionStatus.style.color = status === 'Connected' ? 'var(--xat-green)' : 'var(--xat-highlight)';
    }
  }

  updateUserInfo() {
    if (this.user) {
      console.log('User loaded:', this.user.username);
    }
  }

  startBackgroundMusic() {
    if (this.bgMusic) {
      this.bgMusic.volume = 0.3;
      // Auto-play is disabled in modern browsers, so we'll just prepare it
    }
  }

  scrollToBottom() {
    this.messageList.scrollTop = this.messageList.scrollHeight;
  }

  navigateCommandHistory(direction) {
    // Command history navigation (placeholder)
    console.log('Command history navigation:', direction);
  }
}

// Initialize the authentic Xat Classic when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new AuthenticXatClassic();
});

// Add CSS for power effect animations
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInOut {
    0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
    20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    100% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
  }
`;
document.head.appendChild(style);
