/**
 * 🎭 XAT ENGINE - Complete Flash/ActionScript to JavaScript Transcription
 * Based on Adobe's AS3 to JavaScript Migration Guidelines
 * 
 * Original Flash Files:
 * - chat.swf (728x486 main interface)
 * - login.swf (authentication)
 * - musicplayer.swf (background music)
 * - load2.swf (loading screen)
 * - Power SWFs (visual effects)
 * - Smiley SWFs (2900+ animated smilies)
 * - Avatar SWFs (82 avatar part animations)
 */

// ============================================================================
// CORE ENGINE - Equivalent to Flash Main class
// ============================================================================

class XatEngine {
  constructor(containerId, config = {}) {
    // Flash Stage equivalent
    this.stage = {
      width: config.width || 728,
      height: config.height || 486,
      scaleMode: 'noScale',
      align: 'TL'
    };
    
    // Core systems (equivalent to Flash MovieClips)
    this.avatarSystem = new XatAvatarSystem(this);
    this.powerSystem = new XatPowerSystem(this);
    this.chatSystem = new XatChatSystem(this);
    this.smileySystem = new XatSmileySystem(this);
    this.soundSystem = new XatSoundSystem(this);
    this.animationSystem = new XatAnimationSystem(this);
    
    // 🎭 LEGENDARY SYSTEMS - Flash to JavaScript Migration
    this.xaviSystem = new XaviAnimationSystem(this);
    this.blastSystem = new BlastEffectsSystem(this);
    this.tradingSystem = new PowerTradingSystem(this);
    
    // User properties (from original client class)
    this.user = {
      id: config.userId || Math.floor(Math.random() * 1000000),
      username: config.username || 'Guest' + Math.floor(Math.random() * 1000),
      nickname: config.nickname || 'Unregistered',
      rank: config.rank || 5, // guest
      avatar: config.avatar || '0',
      xats: config.xats || 0,
      days: config.days || 0,
      powers: config.powers || '',
      pool: config.pool || 0,
      guest: config.guest !== false
    };
    
    // Chat properties
    this.chat = {
      id: config.chatId || '1',
      name: config.chatName || 'Lobby',
      background: config.background || 'default',
      radio: config.radio || '',
      button: config.button || '',
      attached: config.attached || ['', '']
    };
    
    // Socket connection (equivalent to Flash XMLSocket)
    this.socket = null;
    this.connected = false;
    this.loginKey = null;
    
    // UI elements (equivalent to Flash DisplayObjects)
    this.elements = {};
    
    // Initialize
    this.init(containerId);
  }
  
  init(containerId) {
    this.createStage(containerId);
    this.setupEventListeners();
    this.connectToServer();
    this.loadAssets();
  }
  
  // Create Flash Stage equivalent
  createStage(containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error('Container element not found');
    }
    
    // Create main stage (equivalent to Flash Stage)
    this.elements.stage = document.createElement('div');
    this.elements.stage.className = 'xat-stage';
    this.elements.stage.style.cssText = `
      width: ${this.stage.width}px;
      height: ${this.stage.height}px;
      background: linear-gradient(45deg, #1a1a2e, #16213e, #0f3460);
      border: 2px solid #533483;
      border-radius: 8px;
      position: relative;
      overflow: hidden;
      font-family: Tahoma, Arial, sans-serif;
      font-size: 11px;
      color: white;
    `;
    
    // Create header (equivalent to Flash header MovieClip)
    this.elements.header = document.createElement('div');
    this.elements.header.className = 'xat-header';
    this.elements.header.style.cssText = `
      height: 25px;
      background: linear-gradient(to bottom, #0f3460, #1a1a2e);
      border-bottom: 1px solid #533483;
      display: flex;
      align-items: center;
      padding: 0 10px;
      font-weight: bold;
    `;
    
    this.elements.title = document.createElement('span');
    this.elements.title.textContent = `Xat Recreation - ${this.chat.name}`;
    this.elements.title.style.cssText = `
      flex: 1;
      text-align: center;
      color: #ffd700;
    `;
    
    this.elements.connectionStatus = document.createElement('span');
    this.elements.connectionStatus.textContent = 'Connecting...';
    this.elements.connectionStatus.style.cssText = `
      color: #00ff00;
      font-size: 10px;
    `;
    
    this.elements.header.appendChild(this.elements.title);
    this.elements.header.appendChild(this.elements.connectionStatus);
    
    // Create main content area
    this.elements.main = document.createElement('div');
    this.elements.main.style.cssText = `
      height: ${this.stage.height - 25}px;
      display: flex;
    `;
    
    // Create chat area (left side)
    this.elements.chatArea = document.createElement('div');
    this.elements.chatArea.style.cssText = `
      flex: 1;
      display: flex;
      flex-direction: column;
    `;
    
    // Create messages area (equivalent to Flash TextArea)
    this.elements.messages = document.createElement('div');
    this.elements.messages.className = 'xat-messages';
    this.elements.messages.style.cssText = `
      flex: 1;
      overflow-y: auto;
      padding: 5px;
      background: rgba(26, 26, 46, 0.9);
      font-size: 11px;
      line-height: 14px;
    `;
    
    // Create input area (equivalent to Flash TextInput)
    this.elements.inputArea = document.createElement('div');
    this.elements.inputArea.style.cssText = `
      height: 60px;
      background: rgba(15, 52, 96, 0.9);
      border-top: 1px solid #533483;
      padding: 5px;
    `;
    
    this.elements.inputRow = document.createElement('div');
    this.elements.inputRow.style.cssText = `
      display: flex;
      margin-bottom: 5px;
    `;
    
    this.elements.messageInput = document.createElement('input');
    this.elements.messageInput.type = 'text';
    this.elements.messageInput.placeholder = 'Type your message...';
    this.elements.messageInput.maxLength = 255;
    this.elements.messageInput.style.cssText = `
      flex: 1;
      background: #1a1a2e;
      border: 1px solid #533483;
      color: white;
      padding: 3px 5px;
      font-family: inherit;
      font-size: 11px;
    `;
    
    this.elements.sendButton = document.createElement('button');
    this.elements.sendButton.textContent = 'Send';
    this.elements.sendButton.style.cssText = `
      width: 50px;
      background: linear-gradient(to bottom, #533483, #1a1a2e);
      border: 1px solid #533483;
      color: white;
      cursor: pointer;
      font-size: 10px;
      margin-left: 5px;
    `;
    
    this.elements.inputRow.appendChild(this.elements.messageInput);
    this.elements.inputRow.appendChild(this.elements.sendButton);
    
    // Create smiley bar (equivalent to Flash smiley MovieClips)
    this.elements.smileyBar = document.createElement('div');
    this.elements.smileyBar.style.cssText = `
      display: flex;
      gap: 2px;
      overflow-x: auto;
    `;
    
    // Create power bar (equivalent to Flash power bar MovieClip)
    this.elements.powerBar = document.createElement('div');
    this.elements.powerBar.className = 'xat-power-bar';
    this.elements.powerBar.style.cssText = `
      background: rgba(15, 52, 96, 0.9);
      border-top: 1px solid #533483;
      padding: 5px;
      display: flex;
      gap: 3px;
      flex-wrap: wrap;
      max-height: 80px;
      overflow-y: auto;
    `;
    
    // Create user list (right side)
    this.elements.userList = document.createElement('div');
    this.elements.userList.className = 'xat-userlist';
    this.elements.userList.style.cssText = `
      width: 120px;
      background: rgba(15, 52, 96, 0.8);
      border-left: 1px solid #533483;
      overflow-y: auto;
      font-size: 10px;
    `;
    
    // Assemble the stage
    this.elements.chatArea.appendChild(this.elements.messages);
    this.elements.inputArea.appendChild(this.elements.inputRow);
    this.elements.inputArea.appendChild(this.elements.smileyBar);
    this.elements.inputArea.appendChild(this.elements.powerBar);
    this.elements.chatArea.appendChild(this.elements.inputArea);
    this.elements.main.appendChild(this.elements.chatArea);
    this.elements.main.appendChild(this.elements.userList);
    this.elements.stage.appendChild(this.elements.header);
    this.elements.stage.appendChild(this.elements.main);
    container.appendChild(this.elements.stage);
    
    // Initialize systems
    this.avatarSystem.init();
    this.powerSystem.init();
    this.chatSystem.init();
    this.smileySystem.init();
    this.soundSystem.init();
    this.animationSystem.init();
  }
  
  setupEventListeners() {
    // Send message events (equivalent to Flash button events)
    this.elements.sendButton.addEventListener('click', () => this.sendMessage());
    this.elements.messageInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.sendMessage();
      }
    });
    
    // Add enhanced settings button to header
    this.elements.settingsButton = document.createElement('button');
    this.elements.settingsButton.textContent = '⚙️';
    this.elements.settingsButton.title = 'Settings & Preferences';
    this.elements.settingsButton.style.cssText = `
      background: none;
      border: none;
      color: #ffd700;
      font-size: 16px;
      cursor: pointer;
      margin-left: 10px;
      padding: 2px 5px;
      border-radius: 3px;
      transition: all 0.2s ease;
    `;
    
    this.elements.settingsButton.addEventListener('click', () => this.showSettingsPanel());
    this.elements.settingsButton.addEventListener('mouseenter', () => {
      this.elements.settingsButton.style.transform = 'scale(1.1)';
      this.elements.settingsButton.style.color = '#ffffff';
    });
    this.elements.settingsButton.addEventListener('mouseleave', () => {
      this.elements.settingsButton.style.transform = 'scale(1)';
      this.elements.settingsButton.style.color = '#ffd700';
    });
    this.elements.header.appendChild(this.elements.settingsButton);
    
    // Add enhanced avatar button to header
    this.elements.avatarButton = document.createElement('button');
    this.elements.avatarButton.textContent = '👤';
    this.elements.avatarButton.title = 'Change Avatar & Appearance';
    this.elements.avatarButton.style.cssText = `
      background: none;
      border: none;
      color: #ffd700;
      font-size: 16px;
      cursor: pointer;
      margin-left: 5px;
      padding: 2px 5px;
      border-radius: 3px;
      transition: all 0.2s ease;
    `;
    
    this.elements.avatarButton.addEventListener('click', () => this.showAvatarPanel());
    this.elements.avatarButton.addEventListener('mouseenter', () => {
      this.elements.avatarButton.style.transform = 'scale(1.1)';
      this.elements.avatarButton.style.color = '#ffffff';
    });
    this.elements.avatarButton.addEventListener('mouseleave', () => {
      this.elements.avatarButton.style.transform = 'scale(1)';
      this.elements.avatarButton.style.color = '#ffd700';
    });
    this.elements.header.appendChild(this.elements.avatarButton);
    
    // Add enhanced music button to header
    this.elements.musicButton = document.createElement('button');
    this.elements.musicButton.textContent = '🎵';
    this.elements.musicButton.title = 'Background Music & Sounds';
    this.elements.musicButton.style.cssText = `
      background: none;
      border: none;
      color: #ffd700;
      font-size: 16px;
      cursor: pointer;
      margin-left: 5px;
      padding: 2px 5px;
      border-radius: 3px;
      transition: all 0.2s ease;
    `;
    
    this.elements.musicButton.addEventListener('click', () => this.showMusicPanel());
    this.elements.musicButton.addEventListener('mouseenter', () => {
      this.elements.musicButton.style.transform = 'scale(1.1)';
      this.elements.musicButton.style.color = '#ffffff';
    });
    this.elements.musicButton.addEventListener('mouseleave', () => {
      this.elements.musicButton.style.transform = 'scale(1)';
      this.elements.musicButton.style.color = '#ffd700';
    });
    this.elements.header.appendChild(this.elements.musicButton);
    
    // Add new quick actions button
    this.elements.quickActionsButton = document.createElement('button');
    this.elements.quickActionsButton.textContent = '⚡';
    this.elements.quickActionsButton.title = 'Quick Actions & Powers';
    this.elements.quickActionsButton.style.cssText = `
      background: none;
      border: none;
      color: #ffd700;
      font-size: 16px;
      cursor: pointer;
      margin-left: 5px;
      padding: 2px 5px;
      border-radius: 3px;
      transition: all 0.2s ease;
    `;
    
    this.elements.quickActionsButton.addEventListener('click', () => this.showQuickActionsPanel());
    this.elements.quickActionsButton.addEventListener('mouseenter', () => {
      this.elements.quickActionsButton.style.transform = 'scale(1.1)';
      this.elements.quickActionsButton.style.color = '#ffffff';
    });
    this.elements.quickActionsButton.addEventListener('mouseleave', () => {
      this.elements.quickActionsButton.style.transform = 'scale(1)';
      this.elements.quickActionsButton.style.color = '#ffd700';
    });
    this.elements.header.appendChild(this.elements.quickActionsButton);
    
    // Add new friends button
    this.elements.friendsButton = document.createElement('button');
    this.elements.friendsButton.textContent = '👥';
    this.elements.friendsButton.title = 'Friends & Social';
    this.elements.friendsButton.style.cssText = `
      background: none;
      border: none;
      color: #ffd700;
      font-size: 16px;
      cursor: pointer;
      margin-left: 5px;
      padding: 2px 5px;
      border-radius: 3px;
      transition: all 0.2s ease;
    `;
    
    this.elements.friendsButton.addEventListener('click', () => this.showFriendsPanel());
    this.elements.friendsButton.addEventListener('mouseenter', () => {
      this.elements.friendsButton.style.transform = 'scale(1.1)';
      this.elements.friendsButton.style.color = '#ffffff';
    });
    this.elements.friendsButton.addEventListener('mouseleave', () => {
      this.elements.friendsButton.style.transform = 'scale(1)';
      this.elements.friendsButton.style.color = '#ffd700';
    });
    this.elements.header.appendChild(this.elements.friendsButton);
    
    // Add status indicator
    this.elements.statusIndicator = document.createElement('div');
    this.elements.statusIndicator.className = 'status-indicator';
    this.elements.statusIndicator.style.cssText = `
      width: 8px;
      height: 8px;
      background: #00ff00;
      border-radius: 50%;
      margin-left: 10px;
      animation: pulse 2s infinite;
    `;
    this.elements.header.appendChild(this.elements.statusIndicator);
    
    // Add clickable user info display
    this.elements.userInfo = document.createElement('div');
    this.elements.userInfo.className = 'user-info';
    this.elements.userInfo.style.cssText = `
      display: flex;
      align-items: center;
      margin-left: 10px;
      cursor: pointer;
      padding: 2px 5px;
      border-radius: 3px;
      transition: all 0.2s ease;
    `;
    this.elements.userInfo.innerHTML = `
      <span style="font-size: 12px; color: #ccc;">${this.user.username}</span>
      <span style="font-size: 10px; color: #888; margin-left: 5px;">(${this.user.xats} xats)</span>
    `;
    this.elements.userInfo.addEventListener('click', () => this.showUserProfile());
    this.elements.userInfo.addEventListener('mouseenter', () => {
      this.elements.userInfo.style.background = 'rgba(83, 52, 131, 0.3)';
    });
    this.elements.userInfo.addEventListener('mouseleave', () => {
      this.elements.userInfo.style.background = 'transparent';
    });
    this.elements.header.appendChild(this.elements.userInfo);
  }
  
  connectToServer() {
    // Equivalent to Flash XMLSocket connection
    this.socket = io('http://localhost:9000');
    
    this.socket.on('connect', () => {
      this.connected = true;
      this.updateConnectionStatus('Connected', true);
      this.addSystemMessage('Connected to Xat Server! 🎭');
      
      // Request login key (equivalent to Flash 'y' packet)
      this.socket.emit('login-request');
    });
    
    this.socket.on('disconnect', () => {
      this.connected = false;
      this.updateConnectionStatus('Disconnected', false);
      this.addSystemMessage('Disconnected from server 😞');
    });
    
    // Login key response (equivalent to Flash 'y' response)
    this.socket.on('login-key', (data) => {
      this.loginKey = data.yi;
      this.addSystemMessage(`Login key received: ${this.loginKey}`);
      
      // Join room (equivalent to Flash 'j2' packet)
      this.socket.emit('join-room', {
        chatId: this.chat.id,
        username: this.user.username
      });
    });
    
    // Room info (equivalent to Flash 'i' packet)
    this.socket.on('room-info', (data) => {
      this.addSystemMessage('Joined room successfully! 🚪');
      this.addSystemMessage(`Welcome ${this.user.username}! Type /help for commands.`);
    });
    
    // User list (equivalent to Flash user list MovieClip)
    this.socket.on('user-list', (data) => {
      this.updateUserList(data.users);
    });
    
    // New message (equivalent to Flash 'm' packet)
    this.socket.on('message', (data) => {
      this.addMessage(data.n || 'System', data.t, data.u === '0' ? 'system' : 'user');
    });
    
    // User joined (equivalent to Flash user join animation)
    this.socket.on('user-joined', (data) => {
      this.addSystemMessage(`${data.n} joined the chat`);
      this.addUserToList(data);
    });
    
    // User left (equivalent to Flash user leave animation)
    this.socket.on('user-left', (data) => {
      this.removeUserFromList(data.u);
    });
  }
  
  loadAssets() {
    // Load all assets (equivalent to Flash Loader class)
    this.avatarSystem.loadAvatarActions();
    this.powerSystem.loadPowers();
    this.smileySystem.loadSmilies();
    this.soundSystem.loadSounds();
  }
  
  sendMessage() {
    const text = this.elements.messageInput.value.trim();
    if (!text || !this.connected) return;
    
    // Check for commands first (equivalent to Flash command processing)
    if (this.chatSystem.processCommand(text)) {
      this.elements.messageInput.value = '';
      return;
    }
    
    // Process smilies (equivalent to Flash smiley replacement)
    const processedText = this.smileySystem.processSmilies(text);
    
    // Process powers (equivalent to Flash power processing)
    const finalText = this.powerSystem.processPowers(processedText);
    
    // Show own message immediately (equivalent to Flash immediate display)
    this.addMessage(this.user.username, finalText, 'user');
    
    // Send to server (equivalent to Flash XMLSocket send)
    this.socket.emit('send-message', {
      text: finalText
    });
    
    this.elements.messageInput.value = '';
  }
  
  addMessage(username, text, type = 'user') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.style.marginBottom = '2px';
    messageDiv.style.wordWrap = 'break-word';
    
    const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    if (type === 'system') {
      messageDiv.innerHTML = `<span style="color: #ffd700;">[${time}] ${text}</span>`;
    } else {
      const rankClass = this.getRankClass(this.user.rank);
      const processedText = this.powerSystem.processPowers(text);
      
      messageDiv.innerHTML = `
        <span class="username ${rankClass}" onclick="window.showUserProfile('${username}')" style="font-weight: bold; cursor: pointer; margin-right: 5px;">${username}</span>
        <span style="color: #888; font-size: 9px; margin-left: 5px;">(${time})</span>
        <span class="text">${processedText}</span>
      `;
    }
    
    this.elements.messages.appendChild(messageDiv);
    this.elements.messages.scrollTop = this.elements.messages.scrollHeight;
    
    // Play sound (equivalent to Flash Sound.play())
    this.soundSystem.playSound('message');
  }
  
  addSystemMessage(text) {
    this.addMessage('System', text, 'system');
  }
  
  updateUserList(users) {
    this.elements.userList.innerHTML = '';
    users.forEach(user => this.addUserToList(user));
  }
  
  addUserToList(user) {
    const userDiv = document.createElement('div');
    userDiv.className = 'user-item';
    userDiv.dataset.userId = user.u;
    userDiv.dataset.username = user.n;
    userDiv.style.cssText = `
      padding: 2px 5px;
      border-bottom: 1px solid rgba(83, 52, 131, 0.3);
      cursor: pointer;
      display: flex;
      align-items: center;
      position: relative;
    `;
    
    const rankClass = this.getRankClass(user.rank);
    
    userDiv.innerHTML = `
      <div style="width: 12px; height: 12px; background: #ffd700; border-radius: 2px; margin-right: 3px; font-size: 8px; text-align: center; line-height: 12px;">${user.a || '👤'}</div>
      <div class="${rankClass}" style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${user.n}</div>
      <div style="font-size: 8px; color: #888; margin-left: 3px;">${user.rank === 1 ? '👑' : user.rank === 2 ? '🛡️' : user.rank === 3 ? '⭐' : ''}</div>
    `;
    
    // Left click - show user profile
    userDiv.addEventListener('click', (e) => {
      e.preventDefault();
      this.showUserProfile(user.n);
    });
    
    // Right click - context menu
    userDiv.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      this.showUserContextMenu(e, user);
    });
    
    // Double click - private message
    userDiv.addEventListener('dblclick', (e) => {
      e.preventDefault();
      this.openPrivateChat(user.n);
    });
    
    // Hover effects
    userDiv.addEventListener('mouseenter', () => {
      userDiv.style.background = 'rgba(83, 52, 131, 0.3)';
    });
    
    userDiv.addEventListener('mouseleave', () => {
      userDiv.style.background = 'transparent';
    });
    
    this.elements.userList.appendChild(userDiv);
  }
  
  removeUserFromList(userId) {
    const userElement = this.elements.userList.querySelector(`[data-user-id="${userId}"]`);
    if (userElement) {
      userElement.remove();
    }
  }
  
  getRankClass(rank) {
    switch(rank) {
      case 1: return 'rank-owner'; // Red
      case 2: return 'rank-mod';   // Blue
      case 3: return 'rank-member'; // Green
      case 5: return 'rank-guest'; // White
      default: return 'rank-guest';
    }
  }
  
  updateConnectionStatus(status, connected) {
    this.elements.connectionStatus.textContent = status;
    this.elements.connectionStatus.style.color = connected ? '#00ff00' : '#ff0000';
  }
  
  // Panel Management Methods
  showSettingsPanel() {
    this.hideAllPanels();
    this.createSettingsPanel();
  }
  
  showAvatarPanel() {
    this.hideAllPanels();
    this.createAvatarPanel();
  }
  
  showMusicPanel() {
    this.hideAllPanels();
    this.createMusicPanel();
  }
  
  showQuickActionsPanel() {
    this.hideAllPanels();
    this.createQuickActionsPanel();
  }
  
  showFriendsPanel() {
    this.hideAllPanels();
    this.createFriendsPanel();
  }
  
  showUserProfile() {
    this.hideAllPanels();
    this.createUserProfilePanel();
  }
  
  hideAllPanels() {
    const existingPanel = this.elements.stage.querySelector('.xat-panel');
    if (existingPanel) {
      existingPanel.remove();
    }
  }
  
  createSettingsPanel() {
    const panel = document.createElement('div');
    panel.className = 'xat-panel';
    panel.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 400px;
      height: 300px;
      background: rgba(15, 52, 96, 0.95);
      border: 2px solid #533483;
      border-radius: 8px;
      z-index: 1000;
      padding: 15px;
      color: white;
      font-family: inherit;
    `;
    
    panel.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
        <h3 style="margin: 0; color: #ffd700;">Settings</h3>
        <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: #ff0000; font-size: 18px; cursor: pointer;">✕</button>
      </div>
      
      <div style="margin-bottom: 15px;">
        <label style="display: block; margin-bottom: 5px;">Sound Effects:</label>
        <input type="checkbox" id="sound-enabled" ${this.soundSystem.enabled ? 'checked' : ''} onchange="window.flashEngine.soundSystem.setEnabled(this.checked)">
        <label for="sound-enabled">Enable sounds</label>
      </div>
      
      <div style="margin-bottom: 15px;">
        <label style="display: block; margin-bottom: 5px;">Username:</label>
        <input type="text" id="username-input" value="${this.user.username}" style="width: 100%; padding: 5px; background: #1a1a2e; border: 1px solid #533483; color: white; border-radius: 3px;">
      </div>
      
      <div style="margin-bottom: 15px;">
        <label style="display: block; margin-bottom: 5px;">Current Avatar:</label>
        <div style="font-size: 24px; text-align: center; padding: 10px; background: rgba(83, 52, 131, 0.3); border-radius: 5px;">
          ${this.avatarSystem.getAvatarEmoji(this.user.avatar)}
        </div>
      </div>
      
      <div style="margin-bottom: 15px;">
        <label style="display: block; margin-bottom: 5px;">Xats: ${this.user.xats}</label>
        <label style="display: block; margin-bottom: 5px;">Days: ${this.user.days}</label>
      </div>
      
      <button onclick="window.flashEngine.saveSettings()" style="background: linear-gradient(to bottom, #533483, #1a1a2e); border: 1px solid #533483; color: white; padding: 8px 15px; border-radius: 3px; cursor: pointer;">Save Settings</button>
    `;
    
    this.elements.stage.appendChild(panel);
  }
  
  createAvatarPanel() {
    const panel = document.createElement('div');
    panel.className = 'xat-panel';
    panel.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 500px;
      height: 400px;
      background: rgba(15, 52, 96, 0.95);
      border: 2px solid #533483;
      border-radius: 8px;
      z-index: 1000;
      padding: 15px;
      color: white;
      font-family: inherit;
      overflow-y: auto;
    `;
    
    const avatarCategories = [
      { name: 'Humans', avatars: ['0', '1', '2', '3', '4', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19'] },
      { name: 'Fantasy', avatars: ['20', '21', '22', '23', '24', '25', '26', '27', '28', '29'] },
      { name: 'Animals', avatars: ['5', '6', '7', '8', '9', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39'] },
      { name: 'Mythical', avatars: ['40', '41', '42', '43', '44', '45', '46', '47', '48', '49'] },
      { name: 'Tech', avatars: ['50', '51', '52', '53', '54', '55', '56', '57', '58', '59'] },
      { name: 'Food', avatars: ['60', '61', '62', '63', '64', '65', '66', '67', '68', '69'] },
      { name: 'Nature', avatars: ['70', '71', '72', '73', '74', '75', '76', '77', '78', '79'] },
      { name: 'Space', avatars: ['80', '81', '82', '83', '84', '85', '86', '87', '88', '89'] },
      { name: 'Sports', avatars: ['90', '91', '92', '93', '94', '95', '96', '97', '98', '99'] }
    ];
    
    let avatarHtml = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
        <h3 style="margin: 0; color: #ffd700;">Select Avatar</h3>
        <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: #ff0000; font-size: 18px; cursor: pointer;">✕</button>
      </div>
      
      <div style="margin-bottom: 15px;">
        <label style="display: block; margin-bottom: 5px;">Current Avatar:</label>
        <div style="font-size: 32px; text-align: center; padding: 15px; background: rgba(83, 52, 131, 0.3); border-radius: 5px; margin-bottom: 10px;">
          ${this.avatarSystem.getAvatarEmoji(this.user.avatar)}
        </div>
      </div>
    `;
    
    avatarCategories.forEach(category => {
      avatarHtml += `
        <div style="margin-bottom: 20px;">
          <h4 style="margin: 0 0 10px 0; color: #ffd700;">${category.name}</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(40px, 1fr)); gap: 5px;">
      `;
      
      category.avatars.forEach(avatarId => {
        const emoji = this.avatarSystem.getAvatarEmoji(avatarId);
        const isSelected = this.user.avatar === avatarId;
        avatarHtml += `
          <div onclick="window.flashEngine.selectAvatar('${avatarId}')" 
               style="font-size: 24px; text-align: center; padding: 8px; background: ${isSelected ? 'rgba(255, 215, 0, 0.3)' : 'rgba(83, 52, 131, 0.3)'}; border: 2px solid ${isSelected ? '#ffd700' : '#533483'}; border-radius: 5px; cursor: pointer; transition: all 0.2s ease;">
            ${emoji}
          </div>
        `;
      });
      
      avatarHtml += `
          </div>
        </div>
      `;
    });
    
    panel.innerHTML = avatarHtml;
    this.elements.stage.appendChild(panel);
  }
  
  createMusicPanel() {
    const panel = document.createElement('div');
    panel.className = 'xat-panel';
    panel.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 350px;
      height: 250px;
      background: rgba(15, 52, 96, 0.95);
      border: 2px solid #533483;
      border-radius: 8px;
      z-index: 1000;
      padding: 15px;
      color: white;
      font-family: inherit;
    `;
    
    panel.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
        <h3 style="margin: 0; color: #ffd700;">Background Music</h3>
        <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: #ff0000; font-size: 18px; cursor: pointer;">✕</button>
      </div>
      
      <div style="margin-bottom: 15px;">
        <label style="display: block; margin-bottom: 5px;">Music:</label>
        <select id="music-select" style="width: 100%; padding: 5px; background: #1a1a2e; border: 1px solid #533483; color: white; border-radius: 3px;">
          <option value="">No Music</option>
          <option value="ambient">Ambient Music</option>
          <option value="chill">Chill Beats</option>
          <option value="rock">Rock Music</option>
          <option value="electronic">Electronic</option>
          <option value="classical">Classical</option>
        </select>
      </div>
      
      <div style="margin-bottom: 15px;">
        <label style="display: block; margin-bottom: 5px;">Volume: <span id="volume-display">50</span>%</label>
        <input type="range" id="volume-slider" min="0" max="100" value="50" style="width: 100%;" oninput="document.getElementById('volume-display').textContent = this.value">
      </div>
      
      <div style="margin-bottom: 15px;">
        <button id="play-music" onclick="window.flashEngine.toggleMusic()" style="background: linear-gradient(to bottom, #533483, #1a1a2e); border: 1px solid #533483; color: white; padding: 8px 15px; border-radius: 3px; cursor: pointer; margin-right: 10px;">Play</button>
        <button onclick="window.flashEngine.stopMusic()" style="background: linear-gradient(to bottom, #533483, #1a1a2e); border: 1px solid #533483; color: white; padding: 8px 15px; border-radius: 3px; cursor: pointer;">Stop</button>
      </div>
      
      <div style="font-size: 12px; color: #ccc;">
        Note: Background music will play for all users in the room.
      </div>
    `;
    
    this.elements.stage.appendChild(panel);
  }
  
  createQuickActionsPanel() {
    const panel = document.createElement('div');
    panel.className = 'xat-panel';
    panel.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 450px;
      height: 350px;
      background: rgba(15, 52, 96, 0.95);
      border: 2px solid #533483;
      border-radius: 8px;
      z-index: 1000;
      padding: 15px;
      color: white;
      font-family: inherit;
      overflow-y: auto;
    `;
    
    const quickActions = [
      { name: 'Dance', icon: '💃', action: () => this.chatSystem.actionMessage('dances! 💃') },
      { name: 'Wave', icon: '👋', action: () => this.chatSystem.actionMessage('waves! 👋') },
      { name: 'Laugh', icon: '😂', action: () => this.chatSystem.actionMessage('laughs! 😂') },
      { name: 'Cry', icon: '😢', action: () => this.chatSystem.actionMessage('cries! 😢') },
      { name: 'Sleep', icon: '😴', action: () => this.chatSystem.actionMessage('falls asleep! 😴') },
      { name: 'Wake', icon: '😊', action: () => this.chatSystem.actionMessage('wakes up! 😊') },
      { name: 'Kiss', icon: '😘', action: () => this.chatSystem.actionMessage('blows a kiss! 😘') },
      { name: 'Hug', icon: '🤗', action: () => this.chatSystem.actionMessage('gives a hug! 🤗') },
      { name: 'Clap', icon: '👏', action: () => this.chatSystem.actionMessage('claps! 👏') },
      { name: 'Bow', icon: '🙇', action: () => this.chatSystem.actionMessage('bows respectfully! 🙇') },
      { name: 'Shrug', icon: '🤷', action: () => this.chatSystem.actionMessage('shrugs! 🤷') },
      { name: 'Facepalm', icon: '🤦', action: () => this.chatSystem.actionMessage('facepalms! 🤦') }
    ];
    
    const powerActions = [
      { name: 'Rainbow', icon: '🌈', action: () => this.chatSystem.activatePowerMode('rainbow') },
      { name: 'Sparkle', icon: '✨', action: () => this.chatSystem.activatePowerMode('sparkle') },
      { name: 'Fire', icon: '🔥', action: () => this.chatSystem.activatePowerMode('fire') },
      { name: 'Ice', icon: '❄️', action: () => this.chatSystem.activatePowerMode('ice') },
      { name: 'Glitter', icon: '💫', action: () => this.chatSystem.activatePowerMode('glitter') },
      { name: 'Neon', icon: '💡', action: () => this.chatSystem.activatePowerMode('neon') }
    ];
    
    let panelHtml = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
        <h3 style="margin: 0; color: #ffd700;">Quick Actions</h3>
        <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: #ff0000; font-size: 18px; cursor: pointer;">✕</button>
      </div>
      
      <div style="margin-bottom: 20px;">
        <h4 style="margin: 0 0 10px 0; color: #ffd700;">Actions</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(80px, 1fr)); gap: 8px;">
    `;
    
    quickActions.forEach(action => {
      panelHtml += `
        <button onclick="window.flashEngine.executeQuickAction('${action.name}')" 
                style="background: rgba(83, 52, 131, 0.5); border: 1px solid #533483; color: white; padding: 8px; border-radius: 5px; cursor: pointer; transition: all 0.2s ease; display: flex; flex-direction: column; align-items: center; font-size: 10px;">
          <span style="font-size: 16px; margin-bottom: 2px;">${action.icon}</span>
          <span>${action.name}</span>
        </button>
      `;
    });
    
    panelHtml += `
        </div>
      </div>
      
      <div style="margin-bottom: 20px;">
        <h4 style="margin: 0 0 10px 0; color: #ffd700;">Power Effects</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(80px, 1fr)); gap: 8px;">
    `;
    
    powerActions.forEach(action => {
      panelHtml += `
        <button onclick="window.flashEngine.executePowerAction('${action.name}')" 
                style="background: rgba(255, 215, 0, 0.2); border: 1px solid #ffd700; color: white; padding: 8px; border-radius: 5px; cursor: pointer; transition: all 0.2s ease; display: flex; flex-direction: column; align-items: center; font-size: 10px;">
          <span style="font-size: 16px; margin-bottom: 2px;">${action.icon}</span>
          <span>${action.name}</span>
        </button>
      `;
    });
    
    panelHtml += `
        </div>
      </div>
      
      <div style="font-size: 12px; color: #ccc;">
        💡 Tip: Click any action to perform it instantly!
      </div>
    `;
    
    panel.innerHTML = panelHtml;
    this.elements.stage.appendChild(panel);
  }
  
  createFriendsPanel() {
    const panel = document.createElement('div');
    panel.className = 'xat-panel';
    panel.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 400px;
      height: 300px;
      background: rgba(15, 52, 96, 0.95);
      border: 2px solid #533483;
      border-radius: 8px;
      z-index: 1000;
      padding: 15px;
      color: white;
      font-family: inherit;
    `;
    
    // Mock friends data
    const friends = [
      { name: 'Alice', status: 'online', avatar: '😊' },
      { name: 'Bob', status: 'away', avatar: '😎' },
      { name: 'Charlie', status: 'busy', avatar: '🤖' },
      { name: 'Diana', status: 'online', avatar: '👻' }
    ];
    
    let panelHtml = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
        <h3 style="margin: 0; color: #ffd700;">Friends & Social</h3>
        <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: #ff0000; font-size: 18px; cursor: pointer;">✕</button>
      </div>
      
      <div style="margin-bottom: 15px;">
        <input type="text" placeholder="Search friends..." style="width: 100%; padding: 5px; background: #1a1a2e; border: 1px solid #533483; color: white; border-radius: 3px;">
      </div>
      
      <div style="margin-bottom: 15px;">
        <h4 style="margin: 0 0 10px 0; color: #ffd700;">Online Friends</h4>
        <div style="max-height: 150px; overflow-y: auto;">
    `;
    
    friends.forEach(friend => {
      const statusColor = friend.status === 'online' ? '#00ff00' : friend.status === 'away' ? '#ffff00' : '#ff0000';
      panelHtml += `
        <div style="display: flex; align-items: center; padding: 5px; border-bottom: 1px solid rgba(83, 52, 131, 0.3); cursor: pointer;" onclick="window.flashEngine.openPrivateChat('${friend.name}')">
          <span style="font-size: 20px; margin-right: 8px;">${friend.avatar}</span>
          <div style="flex: 1;">
            <div style="font-weight: bold;">${friend.name}</div>
            <div style="font-size: 10px; color: ${statusColor};">${friend.status}</div>
          </div>
          <button style="background: rgba(83, 52, 131, 0.5); border: 1px solid #533483; color: white; padding: 2px 6px; border-radius: 3px; font-size: 9px; cursor: pointer;">PM</button>
        </div>
      `;
    });
    
    panelHtml += `
        </div>
      </div>
      
      <div style="display: flex; gap: 10px;">
        <button onclick="window.flashEngine.addFriend()" style="background: linear-gradient(to bottom, #533483, #1a1a2e); border: 1px solid #533483; color: white; padding: 8px 15px; border-radius: 3px; cursor: pointer; flex: 1;">Add Friend</button>
        <button onclick="window.flashEngine.importFriends()" style="background: linear-gradient(to bottom, #533483, #1a1a2e); border: 1px solid #533483; color: white; padding: 8px 15px; border-radius: 3px; cursor: pointer; flex: 1;">Import</button>
      </div>
    `;
    
    panel.innerHTML = panelHtml;
    this.elements.stage.appendChild(panel);
  }
  
  createUserProfilePanel() {
    const panel = document.createElement('div');
    panel.className = 'xat-panel';
    panel.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 350px;
      height: 400px;
      background: rgba(15, 52, 96, 0.95);
      border: 2px solid #533483;
      border-radius: 8px;
      z-index: 1000;
      padding: 15px;
      color: white;
      font-family: inherit;
    `;
    
    panel.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
        <h3 style="margin: 0; color: #ffd700;">User Profile</h3>
        <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: #ff0000; font-size: 18px; cursor: pointer;">✕</button>
      </div>
      
      <div style="text-align: center; margin-bottom: 20px;">
        <div style="font-size: 48px; margin-bottom: 10px;">${this.avatarSystem.getAvatarEmoji(this.user.avatar)}</div>
        <div style="font-size: 18px; font-weight: bold; color: #ffd700;">${this.user.username}</div>
        <div style="font-size: 12px; color: #ccc;">${this.user.nickname}</div>
      </div>
      
      <div style="margin-bottom: 15px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
          <span>Xats:</span>
          <span style="color: #ffd700;">${this.user.xats}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
          <span>Days:</span>
          <span style="color: #ffd700;">${this.user.days}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
          <span>Rank:</span>
          <span style="color: #ffd700;">${this.getRankName(this.user.rank)}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
          <span>Pool:</span>
          <span style="color: #ffd700;">${this.user.pool}</span>
        </div>
      </div>
      
      <div style="margin-bottom: 15px;">
        <label style="display: block; margin-bottom: 5px;">Status Message:</label>
        <input type="text" id="status-message" placeholder="Set your status..." value="${this.user.statusMessage || ''}" style="width: 100%; padding: 5px; background: #1a1a2e; border: 1px solid #533483; color: white; border-radius: 3px;">
      </div>
      
      <div style="margin-bottom: 15px;">
        <label style="display: block; margin-bottom: 5px;">Away Message:</label>
        <input type="text" id="away-message" placeholder="Set away message..." value="${this.user.awayMessage || ''}" style="width: 100%; padding: 5px; background: #1a1a2e; border: 1px solid #533483; color: white; border-radius: 3px;">
      </div>
      
      <div style="display: flex; gap: 10px;">
        <button onclick="window.flashEngine.saveProfile()" style="background: linear-gradient(to bottom, #533483, #1a1a2e); border: 1px solid #533483; color: white; padding: 8px 15px; border-radius: 3px; cursor: pointer; flex: 1;">Save</button>
        <button onclick="window.flashEngine.exportProfile()" style="background: linear-gradient(to bottom, #533483, #1a1a2e); border: 1px solid #533483; color: white; padding: 8px 15px; border-radius: 3px; cursor: pointer; flex: 1;">Export</button>
      </div>
    `;
    
    this.elements.stage.appendChild(panel);
  }
  
  selectAvatar(avatarId) {
    this.user.avatar = avatarId;
    this.avatarButton.textContent = this.avatarSystem.getAvatarEmoji(avatarId);
    this.addSystemMessage(`Avatar changed to ${this.avatarSystem.getAvatarEmoji(avatarId)}`);
    
    // Update avatar in user list
    const userElement = this.elements.userList.querySelector(`[data-user-id="${this.user.id}"]`);
    if (userElement) {
      const avatarElement = userElement.querySelector('div');
      avatarElement.textContent = this.avatarSystem.getAvatarEmoji(avatarId);
    }
    
    // Send avatar change to server
    this.socket.emit('avatar-change', { avatarId: avatarId });
  }
  
  saveSettings() {
    const usernameInput = document.getElementById('username-input');
    if (usernameInput && usernameInput.value !== this.user.username) {
      this.user.username = usernameInput.value;
      this.elements.title.textContent = `Xat Recreation - ${this.user.username}`;
      this.addSystemMessage(`Username changed to ${this.user.username}`);
      this.socket.emit('username-change', { username: this.user.username });
    }
    
    this.hideAllPanels();
    this.addSystemMessage('Settings saved!');
  }
  
  toggleMusic() {
    const musicSelect = document.getElementById('music-select');
    const playButton = document.getElementById('play-music');
    
    if (musicSelect && musicSelect.value) {
      if (playButton.textContent === 'Play') {
        this.soundSystem.playBackgroundMusic(musicSelect.value);
        playButton.textContent = 'Pause';
      } else {
        this.soundSystem.pauseBackgroundMusic();
        playButton.textContent = 'Play';
      }
    }
  }
  
  stopMusic() {
    this.soundSystem.stopBackgroundMusic();
    const playButton = document.getElementById('play-music');
    if (playButton) {
      playButton.textContent = 'Play';
    }
  }
  
  // New interactive methods
  executeQuickAction(actionName) {
    const actions = {
      'Dance': () => this.chatSystem.actionMessage('dances! 💃'),
      'Wave': () => this.chatSystem.actionMessage('waves! 👋'),
      'Laugh': () => this.chatSystem.actionMessage('laughs! 😂'),
      'Cry': () => this.chatSystem.actionMessage('cries! 😢'),
      'Sleep': () => this.chatSystem.actionMessage('falls asleep! 😴'),
      'Wake': () => this.chatSystem.actionMessage('wakes up! 😊'),
      'Kiss': () => this.chatSystem.actionMessage('blows a kiss! 😘'),
      'Hug': () => this.chatSystem.actionMessage('gives a hug! 🤗'),
      'Clap': () => this.chatSystem.actionMessage('claps! 👏'),
      'Bow': () => this.chatSystem.actionMessage('bows respectfully! 🙇'),
      'Shrug': () => this.chatSystem.actionMessage('shrugs! 🤷'),
      'Facepalm': () => this.chatSystem.actionMessage('facepalms! 🤦')
    };
    
    if (actions[actionName]) {
      actions[actionName]();
      this.hideAllPanels();
    }
  }
  
  executePowerAction(powerName) {
    this.chatSystem.activatePowerMode(powerName.toLowerCase());
    this.hideAllPanels();
  }
  
  openPrivateChat(username) {
    this.hideAllPanels();
    this.addSystemMessage(`Opening private chat with ${username}...`);
    // TODO: Implement private chat functionality
  }
  
  addFriend() {
    this.hideAllPanels();
    this.addSystemMessage('Add friend functionality coming soon!');
  }
  
  importFriends() {
    this.hideAllPanels();
    this.addSystemMessage('Import friends functionality coming soon!');
  }
  
  saveProfile() {
    const statusMessage = document.getElementById('status-message');
    const awayMessage = document.getElementById('away-message');
    
    if (statusMessage) this.user.statusMessage = statusMessage.value;
    if (awayMessage) this.user.awayMessage = awayMessage.value;
    
    this.hideAllPanels();
    this.addSystemMessage('Profile saved successfully!');
  }
  
  exportProfile() {
    this.hideAllPanels();
    this.addSystemMessage('Profile export functionality coming soon!');
  }
  
  getRankName(rank) {
    const ranks = {
      1: 'Owner',
      2: 'Moderator', 
      3: 'Member',
      5: 'Guest'
    };
    return ranks[rank] || 'Guest';
  }
}

// ============================================================================
// AVATAR SYSTEM - Equivalent to Flash Avatar MovieClips
// ============================================================================

class XatAvatarSystem {
  constructor(engine) {
    this.engine = engine;
    this.avatarActions = {};
    this.currentAvatars = new Map();
  }
  
  init() {
    // Create avatar container (equivalent to Flash avatar MovieClip)
    this.container = document.createElement('div');
    this.container.className = 'avatar-container';
    this.container.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    `;
    
    this.engine.elements.stage.appendChild(this.container);
  }
  
  loadAvatarActions() {
    // Load JSON keyframe data (equivalent to Flash avatar animation data)
    this.avatarActions = {
      smile: {
        mouth: [{y: 0, a: 'smile', x: 0}],
        xface: [{y: -15, x: 0}]
      },
      wink: {
        mouth: [{y: 0, a: 'wink', x: 0}],
        pupilr: [{y: 3, x: 18}]
      },
      laugh: {
        mouth: [{y: 0, a: 'laugh', x: 0}],
        xface: [{y: -20, x: 0}]
      },
      cry: {
        mouth: [{y: 0, a: 'cry', x: 0}],
        xface: [{y: 10, x: 0}]
      }
    };
  }
  
  createAvatar(userId, avatarId) {
    // Create avatar element (equivalent to Flash MovieClip)
    const avatar = document.createElement('div');
    avatar.className = 'avatar';
    avatar.dataset.userId = userId;
    avatar.style.cssText = `
      position: absolute;
      width: 50px;
      height: 50px;
      background: #ffd700;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
    `;
    
    // Set avatar image/emoji
    avatar.textContent = this.getAvatarEmoji(avatarId);
    
    this.container.appendChild(avatar);
    this.currentAvatars.set(userId, avatar);
    
    return avatar;
  }
  
  playAnimation(userId, actionName) {
    // Play avatar animation (equivalent to Flash gotoAndPlay())
    const avatar = this.currentAvatars.get(userId);
    if (!avatar) return;
    
    const action = this.avatarActions[actionName];
    if (!action) return;
    
    // Apply animation (equivalent to Flash tweening)
    this.engine.animationSystem.createAnimation(avatar, {
      transform: 'scale(1.2)',
      filter: 'brightness(1.5)'
    }, 500, 'ease-out');
    
    // Reset after animation
    setTimeout(() => {
      this.engine.animationSystem.createAnimation(avatar, {
        transform: 'scale(1)',
        filter: 'brightness(1)'
      }, 300, 'ease-in');
    }, 500);
  }
  
  getAvatarEmoji(avatarId) {
    // Map avatar IDs to emojis (equivalent to Flash avatar graphics)
    const avatarMap = {
      // Human avatars
      '0': '👤', '1': '😊', '2': '😎', '3': '🤖', '4': '👻',
      '5': '🐱', '6': '🐶', '7': '🐼', '8': '🐨', '9': '🐯',
      
      // More human variations
      '10': '👨', '11': '👩', '12': '👦', '13': '👧', '14': '👴',
      '15': '👵', '16': '👶', '17': '👱‍♂️', '18': '👱‍♀️', '19': '👨‍🦰',
      
      // Fantasy characters
      '20': '🧙‍♂️', '21': '🧙‍♀️', '22': '🧛‍♂️', '23': '🧛‍♀️', '24': '🧜‍♂️',
      '25': '🧜‍♀️', '26': '🧚‍♂️', '27': '🧚‍♀️', '28': '👹', '29': '👺',
      
      // Animals
      '30': '🐺', '31': '🦊', '32': '🐻', '33': '🐰', '34': '🐸',
      '35': '🐙', '36': '🦑', '37': '🦐', '38': '🦞', '39': '🦀',
      
      // Mythical creatures
      '40': '🐉', '41': '🦄', '42': '🦕', '43': '🦖', '44': '🦈',
      '45': '🐊', '46': '🦅', '47': '🦉', '48': '🦇', '49': '🦋',
      
      // Robots and tech
      '50': '🤖', '51': '👾', '52': '🤖', '53': '🦾', '54': '🦿',
      '55': '🧠', '56': '💻', '57': '📱', '58': '⌚', '59': '🎮',
      
      // Food and objects
      '60': '🍕', '61': '🍔', '62': '🌮', '63': '🍦', '64': '🍰',
      '65': '🎂', '66': '🍺', '67': '☕', '68': '🍷', '69': '🥤',
      
      // Nature and elements
      '70': '🌲', '71': '🌺', '72': '🌻', '73': '🌹', '74': '🌸',
      '75': '🌼', '76': '🌿', '77': '🍀', '78': '🌱', '79': '🌳',
      
      // Weather and space
      '80': '☀️', '81': '🌙', '82': '⭐', '83': '🌟', '84': '💫',
      '85': '🌠', '86': '☁️', '87': '🌈', '88': '⚡', '89': '❄️',
      
      // Sports and activities
      '90': '⚽', '91': '🏀', '92': '🏈', '93': '⚾', '94': '🎾',
      '95': '🏓', '96': '🎯', '97': '🎳', '98': '🎮', '99': '🎲'
    };
    return avatarMap[avatarId] || '👤';
  }
}

// ============================================================================
// POWER SYSTEM - Equivalent to Flash Power MovieClips
// ============================================================================

class XatPowerSystem {
  constructor(engine) {
    this.engine = engine;
    this.powers = new Map();
    this.userPowers = {
      p0: 0, p1: 0, p2: 0, p3: 0, p4: 0, p5: 0, p6: 0, p7: 0, p8: 0, p9: 0, p10: 0
    };
    this.powerDefinitions = this.loadPowerDefinitions();
  }
  
  init() {
    // Load power definitions (equivalent to Flash power SWFs)
    this.createPowerBar();
  }
  
  loadPowerDefinitions() {
    // Power definitions from original iXat database
    // Format: {id, section, name, subid, cost, description, topsh}
    return [
      // p0 powers (basic powers)
      {id: 1, section: 'p0', name: 'topman', subid: 2, cost: 180, description: 'Your icon will go to the top of your section'},
      {id: 2, section: 'p0', name: 'subhide', subid: 4, cost: 90, description: 'Set your star or heart to black'},
      {id: 3, section: 'p0', name: 'mod8', subid: 8, cost: 450, description: 'Ban for up to 8 hours'},
      {id: 4, section: 'p0', name: 'zoom', subid: 16, cost: 270, description: 'Zoom pictures on mouse over'},
      {id: 5, section: 'p0', name: 'nofollow', subid: 32, cost: 90, description: 'Block friends from locating you'},
      {id: 6, section: 'p0', name: 'invert', subid: 64, cost: 180, description: 'Make smilies upside down with #i'},
      {id: 7, section: 'p0', name: 'mirror', subid: 128, cost: 90, description: 'Mirror smilies with #m'},
      {id: 8, section: 'p0', name: 'noaudies', subid: 256, cost: 9, description: 'Turn off audie sound effects'},
      {id: 9, section: 'p0', name: 'reghide', subid: 512, cost: 90, description: 'Remove star/heart from user list'},
      {id: 10, section: 'p0', name: 'nopc', subid: 1024, cost: 180, description: 'Block incoming private chats'},
      {id: 11, section: 'p0', name: 'tempmod', subid: 2048, cost: 585, description: 'Make user moderator temporarily'},
      {id: 12, section: 'p0', name: 'hat', subid: 4096, cost: 90, description: 'Add hats to smilies with #t'},
      {id: 13, section: 'p0', name: 'red', subid: 8192, cost: 135, description: 'Color smilies red with #r'},
      {id: 14, section: 'p0', name: 'green', subid: 16384, cost: 135, description: 'Color smilies green with #g'},
      {id: 15, section: 'p0', name: 'blue', subid: 32768, cost: 135, description: 'Color smilies blue with #b'},
      {id: 16, section: 'p0', name: 'light', subid: 65536, cost: 135, description: 'Light/dark smilies with #+++ or #---'},
      {id: 17, section: 'p0', name: 'heart', subid: 131072, cost: 597, description: 'Heart shape smilies with #h'},
      {id: 18, section: 'p0', name: 'shuffle', subid: 262144, cost: 22, description: 'Random avatar from strip'},
      {id: 19, section: 'p0', name: 'animate', subid: 524288, cost: 360, description: 'Animated avatar from strip'},
      {id: 20, section: 'p0', name: 'square', subid: 1048576, cost: 90, description: 'Square shape smilies with #s'},
      {id: 21, section: 'p0', name: 'nameglow', subid: 2097152, cost: 360, description: 'Neon glow to name with (glow)'},
      {id: 22, section: 'p0', name: 'cycle', subid: 4194304, cost: 450, description: 'Rainbow cycle smilies with #y'},
      {id: 23, section: 'p0', name: 'hexagon', subid: 8388608, cost: 90, description: 'Hexagon shape smilies with #x'},
      {id: 24, section: 'p0', name: 'clear', subid: 16777216, cost: 3300, description: 'Clear background smilies with #c'},
      {id: 25, section: 'p0', name: 'boot', subid: 33554432, cost: 13716, description: 'Boot users to other chats'},
      {id: 26, section: 'p0', name: 'octogram', subid: 67108864, cost: 135, description: 'Octogram shape smilies with #o'},
      {id: 27, section: 'p0', name: 'show', subid: 134217728, cost: 45, description: 'Show xats and days'},
      {id: 28, section: 'p0', name: 'superkick', subid: 268435456, cost: 175, description: 'Kick lower ranks'},
      {id: 29, section: 'p0', name: 'invisible', subid: 536870912, cost: 468, description: 'Become invisible'},
      {id: 30, section: 'p0', name: 'pink', subid: 1073741824, cost: 450, description: 'Turn pawn pink'},
      
      // p1 powers (advanced powers)
      {id: 32, section: 'p1', name: 'guestself', subid: 1, cost: 225, description: 'Turn yourself into guest with /g'},
      {id: 33, section: 'p1', name: 'sinbin', subid: 2, cost: 270, description: 'Strip moderator powers temporarily'},
      {id: 34, section: 'p1', name: 'diamond', subid: 4, cost: 738, description: 'Diamond shape smilies with #d'},
      {id: 35, section: 'p1', name: 'purple', subid: 8, cost: 22500, description: 'Turn pawn purple'},
      {id: 36, section: 'p1', name: 'ttth', subid: 16, cost: 360, description: 'Send giant kiss and ignore with /t'},
      {id: 37, section: 'p1', name: 'hands', subid: 32, cost: 270, description: 'Add hands to smilies'},
      {id: 38, section: 'p1', name: 'hairm', subid: 64, cost: 135, description: 'Male hair styles on smilies'},
      {id: 39, section: 'p1', name: 'hairf', subid: 128, cost: 180, description: 'Female hair styles on smilies'},
      {id: 40, section: 'p1', name: 'fade', subid: 256, cost: 1638, description: 'Ghost fade effect with #f'},
      {id: 41, section: 'p1', name: 'gag', subid: 512, cost: 1116, description: 'Gag users for up to an hour'},
      {id: 42, section: 'p1', name: 'costumes', subid: 1024, cost: 270, description: 'Add costumes to smilies'},
      {id: 43, section: 'p1', name: 'six', subid: 2048, cost: 2124, description: 'Turn smilies into devils with #6'},
      {id: 44, section: 'p1', name: 'dood', subid: 4096, cost: 225, description: 'Import images into doodle'},
      {id: 45, section: 'p1', name: 'angel', subid: 8192, cost: 10000, description: 'Add wings, halo, cloud to smilies'},
      {id: 46, section: 'p1', name: 'mute', subid: 16384, cost: 468, description: 'Silent ban users'},
      {id: 47, section: 'p1', name: 'radio', subid: 32768, cost: 225, description: 'Take radio stations with you'},
      {id: 48, section: 'p1', name: 'fruit', subid: 65536, cost: 639, description: 'Fruity backgrounds for smilies'},
      {id: 49, section: 'p1', name: 'sport', subid: 131072, cost: 360, description: 'Sport effects for smilies'},
      {id: 50, section: 'p1', name: 'num', subid: 262144, cost: 360, description: 'Add numbers to smilies'},
      {id: 51, section: 'p1', name: 'hush', subid: 524288, cost: 292, description: 'Hush chat for announcements'},
      {id: 52, section: 'p1', name: 'halloween', subid: 1048576, cost: 600, description: 'Halloween themed smilies'},
      {id: 53, section: 'p1', name: 'anime', subid: 2097152, cost: 270, description: 'Anime smilies and accessories'},
      {id: 54, section: 'p1', name: 'status', subid: 4194304, cost: 360, description: 'Show status message under name'},
      {id: 55, section: 'p1', name: 'thanksgiving', subid: 8388608, cost: 706, description: 'Thanksgiving themed smilies'},
      {id: 56, section: 'p1', name: 'snowy', subid: 16777216, cost: 363, description: 'Snowflake backgrounds for smilies'},
      {id: 57, section: 'p1', name: 'christmas', subid: 33554432, cost: 2061, description: 'Christmas themed smilies'},
      {id: 58, section: 'p1', name: 'count', subid: 67108864, cost: 180, description: 'Countdown timer'},
      {id: 59, section: 'p1', name: 'stick', subid: 134217728, cost: 270, description: 'Create custom stickmen'},
      {id: 60, section: 'p1', name: 'dx', subid: 268435456, cost: 81, description: 'Convert days to xats'},
      {id: 61, section: 'p1', name: 'tempmem', subid: 536870912, cost: 175, description: 'Make guest member temporarily'},
      {id: 62, section: 'p1', name: 'valentine', subid: 1073741824, cost: 2610, description: 'Valentine themed smilies'},
      
      // p2 powers (group powers)
      {id: 64, section: 'p2', name: 'blueman', subid: 1, cost: 900, description: 'Turn pawn dark blue'},
      {id: 65, section: 'p2', name: 'party', subid: 2, cost: 180, description: 'Party themed smilies'},
      {id: 66, section: 'p2', name: 'irish', subid: 4, cost: 720, description: 'St Patrick\'s day smilies'},
      {id: 67, section: 'p2', name: 'flashrank', subid: 8, cost: 585, description: 'Flash between pawn color and rank'},
      {id: 68, section: 'p2', name: 'easter', subid: 16, cost: 243, description: 'Easter themed smilies'},
      {id: 69, section: 'p2', name: 'nopm', subid: 32, cost: 135, description: 'Block incoming PMs'},
      {id: 70, section: 'p2', name: 'banish', subid: 64, cost: 270, description: 'Banish banned users'},
      {id: 71, section: 'p2', name: 'circus', subid: 128, cost: 225, description: 'Circus themed smilies'},
      {id: 72, section: 'p2', name: 'gkaoani', subid: 256, cost: 900, description: 'Kaoani style smilies for group'},
      {id: 73, section: 'p2', name: 'military', subid: 512, cost: 534, description: 'Military themed smilies'},
      {id: 74, section: 'p2', name: 'gline', subid: 1024, cost: 810, description: 'Change smilie line for group'},
      {id: 75, section: 'p2', name: 'bump', subid: 2048, cost: 180, description: 'Bump private chat tabs'},
      {id: 76, section: 'p2', name: 'gkaliens', subid: 4096, cost: 3258, description: 'Alien smilies for group'},
      {id: 77, section: 'p2', name: 'scifi', subid: 8192, cost: 659, description: 'Science fiction smilies'},
      {id: 78, section: 'p2', name: 'supporter', subid: 16384, cost: 90, description: 'Supporter themed smilies'},
      {id: 79, section: 'p2', name: 'tempown', subid: 32768, cost: 292, description: 'Make mod owner temporarily'},
      {id: 80, section: 'p2', name: 'gcontrol', subid: 65536, cost: 450, description: 'Control group settings'},
      {id: 81, section: 'p2', name: 'tickle', subid: 131072, cost: 1000, description: 'Tickle effect'},
      {id: 82, section: 'p2', name: 'sea', subid: 262144, cost: 270, description: 'Sea themed smilies'},
      {id: 83, section: 'p2', name: 'silly', subid: 524288, cost: 180, description: 'Silly smilies'},
      {id: 84, section: 'p2', name: 'blastpro', subid: 1048576, cost: 360, description: 'Promotion animations'},
      {id: 85, section: 'p2', name: 'flag', subid: 2097152, cost: 225, description: 'Flag smilies with animation'},
      {id: 86, section: 'p2', name: 'blastban', subid: 4194304, cost: 450, description: 'Ban animations'},
      {id: 87, section: 'p2', name: 'independence', subid: 8388608, cost: 284, description: 'Independence day smilies'},
      {id: 88, section: 'p2', name: 'blastde', subid: 16777216, cost: 2772, description: 'Demotion animations'},
      {id: 89, section: 'p2', name: 'summer', subid: 33554432, cost: 148, description: 'Summer themed smilies'},
      {id: 90, section: 'p2', name: 'bad', subid: 67108864, cost: 180, description: 'Add bad words filter'},
      {id: 91, section: 'p2', name: 'rapid', subid: 134217728, cost: 234, description: 'Rapid moderation actions'},
      {id: 92, section: 'p2', name: 'horror', subid: 268435456, cost: 306, description: 'Horror themed backgrounds'},
      {id: 93, section: 'p2', name: 'mint', subid: 536870912, cost: 90, description: 'Set minimum transfer amount'},
      {id: 94, section: 'p2', name: 'blastkick', subid: 1073741824, cost: 270, description: 'Kick animations'}
    ];
  }
  
  hasPower(powerName) {
    // Check if user has power using bitwise operations (equivalent to original iXat)
    const power = this.powerDefinitions.find(p => p.name === powerName);
    if (!power) return false;
    
    const section = power.section;
    const subid = power.subid;
    
    // Bitwise AND operation: (userPowers[section] & subid) === subid
    return (this.userPowers[section] & subid) === subid;
  }
  
  addPower(powerName) {
    // Add power to user (equivalent to buying power)
    const power = this.powerDefinitions.find(p => p.name === powerName);
    if (!power) return false;
    
    const section = power.section;
    const subid = power.subid;
    
    // Bitwise OR operation to add power
    this.userPowers[section] |= subid;
    
    this.engine.addSystemMessage(`Power "${powerName}" added!`);
    return true;
  }
  
  removePower(powerName) {
    // Remove power from user
    const power = this.powerDefinitions.find(p => p.name === powerName);
    if (!power) return false;
    
    const section = power.section;
    const subid = power.subid;
    
    // Bitwise AND with NOT to remove power
    this.userPowers[section] &= ~subid;
    
    this.engine.addSystemMessage(`Power "${powerName}" removed!`);
    return true;
  }
  
  getPowerString() {
    // Generate power string (equivalent to original pStr)
    let pStr = '';
    Object.keys(this.userPowers).forEach(section => {
      if (this.userPowers[section] > 0) {
        pStr += `${section}="${this.userPowers[section]}" `;
      }
    });
    return pStr.trim();
  }
  
  processPowers(text) {
    // Process power commands in text (equivalent to Flash text processing)
    let processed = text;
    
    // Check for color powers
    if (this.hasPower('red') && processed.includes('#r')) {
      processed = processed.replace(/#r/g, '');
      processed = `<span style="color: #ff0000;">${processed}</span>`;
    }
    if (this.hasPower('green') && processed.includes('#g')) {
      processed = processed.replace(/#g/g, '');
      processed = `<span style="color: #00ff00;">${processed}</span>`;
    }
    if (this.hasPower('blue') && processed.includes('#b')) {
      processed = processed.replace(/#b/g, '');
      processed = `<span style="color: #0000ff;">${processed}</span>`;
    }
    
    // Check for shape powers
    if (this.hasPower('heart') && processed.includes('#h')) {
      processed = processed.replace(/#h/g, '');
      processed = `<span style="color: #ff69b4;">${processed}</span>`;
    }
    if (this.hasPower('square') && processed.includes('#s')) {
      processed = processed.replace(/#s/g, '');
      processed = `<span style="background: #00ffff; padding: 2px;">${processed}</span>`;
    }
    if (this.hasPower('diamond') && processed.includes('#d')) {
      processed = processed.replace(/#d/g, '');
      processed = `<span style="color: #800080;">${processed}</span>`;
    }
    if (this.hasPower('hexagon') && processed.includes('#x')) {
      processed = processed.replace(/#x/g, '');
      processed = `<span style="color: #ffc0cb;">${processed}</span>`;
    }
    if (this.hasPower('octogram') && processed.includes('#o')) {
      processed = processed.replace(/#o/g, '');
      processed = `<span style="color: #90ee90;">${processed}</span>`;
    }
    
    // Check for effect powers
    if (this.hasPower('invert') && processed.includes('#i')) {
      processed = processed.replace(/#i/g, '');
      processed = `<span style="transform: rotate(180deg); display: inline-block;">${processed}</span>`;
    }
    if (this.hasPower('mirror') && processed.includes('#m')) {
      processed = processed.replace(/#m/g, '');
      processed = `<span style="transform: scaleX(-1); display: inline-block;">${processed}</span>`;
    }
    if (this.hasPower('clear') && processed.includes('#c')) {
      processed = processed.replace(/#c/g, '');
      processed = `<span style="background: transparent;">${processed}</span>`;
    }
    if (this.hasPower('cycle') && processed.includes('#y')) {
      processed = processed.replace(/#y/g, '');
      processed = `<span class="rainbow-text">${processed}</span>`;
    }
    
    // Check for light/dark power
    if (this.hasPower('light')) {
      if (processed.includes('#+++')) {
        processed = processed.replace(/#\+\+\+/g, '');
        processed = `<span style="filter: brightness(1.5);">${processed}</span>`;
      } else if (processed.includes('#---')) {
        processed = processed.replace(/#---/g, '');
        processed = `<span style="filter: brightness(0.5);">${processed}</span>`;
      }
    }
    
    return processed;
  }
  
  createPowerBar() {
    // Create power bar (equivalent to Flash power bar MovieClip)
    const powerBar = this.engine.elements.powerBar;
    powerBar.innerHTML = '';
    
    // Create category selector
    const categorySelect = document.createElement('select');
    categorySelect.style.cssText = `
      background: rgba(83, 52, 131, 0.8);
      color: white;
      border: 1px solid #533483;
      border-radius: 3px;
      padding: 2px 5px;
      font-size: 10px;
      margin-right: 5px;
    `;
    
    const categories = [
      { name: 'Basic', section: 'p0' },
      { name: 'Advanced', section: 'p1' },
      { name: 'Group', section: 'p2' },
      { name: 'Special', section: 'p3' }
    ];
    
    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category.section;
      option.textContent = category.name;
      categorySelect.appendChild(option);
    });
    
    powerBar.appendChild(categorySelect);
    
    // Create power container
    const powerContainer = document.createElement('div');
    powerContainer.style.cssText = `
      display: flex;
      gap: 3px;
      flex-wrap: wrap;
      max-height: 80px;
      overflow-y: auto;
    `;
    
    powerBar.appendChild(powerContainer);
    
    // Function to update visible powers
    const updatePowers = (section) => {
      powerContainer.innerHTML = '';
      const sectionPowers = this.powerDefinitions.filter(p => p.section === section);
      
      sectionPowers.forEach(power => {
        const powerItem = document.createElement('div');
        powerItem.className = 'power-item';
        powerItem.dataset.power = power.name;
        powerItem.title = `${power.name} (${power.cost} xats) - ${power.description}`;
        powerItem.textContent = power.name;
        powerItem.style.cssText = `
          background: ${this.hasPower(power.name) ? 'rgba(255, 215, 0, 0.3)' : 'rgba(83, 52, 131, 0.5)'};
          border: 1px solid ${this.hasPower(power.name) ? '#ffd700' : '#533483'};
          color: white;
          padding: 3px 6px;
          font-size: 9px;
          border-radius: 3px;
          cursor: pointer;
          transition: all 0.2s ease;
        `;
        
        powerItem.addEventListener('click', () => {
          if (this.hasPower(power.name)) {
            this.removePower(power.name);
          } else {
            this.addPower(power.name);
          }
          updatePowers(section);
        });
        
        powerItem.addEventListener('mouseenter', () => {
          powerItem.style.background = 'rgba(83, 52, 131, 0.8)';
          powerItem.style.transform = 'scale(1.05)';
        });
        
        powerItem.addEventListener('mouseleave', () => {
          powerItem.style.background = this.hasPower(power.name) ? 'rgba(255, 215, 0, 0.3)' : 'rgba(83, 52, 131, 0.5)';
          powerItem.style.transform = 'scale(1)';
        });
        
        powerContainer.appendChild(powerItem);
      });
    };
    
    // Initialize with first category
    updatePowers('p0');
    
    // Handle category change
    categorySelect.addEventListener('change', (e) => {
      updatePowers(e.target.value);
    });
  }
  
  getPowerIcon(powerName) {
    // Get power icon (equivalent to Flash power graphics)
    const powerIcons = {
      'red': '🔴', 'green': '🟢', 'blue': '🔵', 'pink': '🩷', 'purple': '🟣',
      'heart': '❤️', 'square': '⬜', 'diamond': '💎', 'hexagon': '⬡', 'octogram': '⭐',
      'hat': '🎩', 'zoom': '🔍', 'invert': '🔄', 'mirror': '🪞', 'clear': '💎',
      'cycle': '🌈', 'light': '💡', 'animate': '🎬', 'shuffle': '🎲', 'boot': '👢',
      'topman': '👑', 'mod8': '🛡️', 'tempmod': '⚡', 'superkick': '🥾', 'invisible': '👻',
      'show': '👁️', 'nofollow': '🚫', 'nopc': '🔒', 'noaudies': '🔇', 'reghide': '🙈',
      'subhide': '🫥', 'guestself': '👤', 'sinbin': '⏰', 'ttth': '💋', 'hands': '✋',
      'hairm': '👨', 'hairf': '👩', 'fade': '👻', 'gag': '🤐', 'costumes': '🎭',
      'six': '😈', 'dood': '🎨', 'angel': '👼', 'mute': '🤫', 'radio': '📻',
      'fruit': '🍎', 'sport': '⚽', 'num': '🔢', 'hush': '🤐', 'halloween': '🎃',
      'anime': '🌸', 'status': '📝', 'thanksgiving': '🦃', 'snowy': '❄️', 'christmas': '🎄',
      'count': '⏰', 'stick': '🦴', 'dx': '💱', 'tempmem': '👤', 'valentine': '💝'
    };
    
    return powerIcons[powerName] || '⚡';
  }
}

// ============================================================================
// CHAT SYSTEM - Equivalent to Flash Chat MovieClip
// ============================================================================

class XatChatSystem {
  constructor(engine) {
    this.engine = engine;
    this.commands = new Map();
    this.messageHistory = [];
    this.maxHistory = 100;
  }
  
  init() {
    // Setup commands (equivalent to Flash command processing)
    this.setupCommands();
  }
  
  setupCommands() {
    // Command definitions (equivalent to Flash command handlers)
    this.commands.set('me', (args) => this.actionMessage(args.join(' ')));
    this.commands.set('rainbow', () => this.activatePowerMode('rainbow'));
    this.commands.set('sparkle', () => this.activatePowerMode('sparkle'));
    this.commands.set('fire', () => this.activatePowerMode('fire'));
    this.commands.set('ice', () => this.activatePowerMode('ice'));
    this.commands.set('help', () => this.showHelp());
    
    // Admin commands (equivalent to Flash admin system)
    this.commands.set('kick', (args) => this.kickUser(args[0]));
    this.commands.set('ban', (args) => this.banUser(args[0]));
    this.commands.set('mute', (args) => this.muteUser(args[0]));
    this.commands.set('unmute', (args) => this.unmuteUser(args[0]));
    this.commands.set('clear', () => this.clearChat());
    this.commands.set('announce', (args) => this.announce(args.join(' ')));
    
    // User commands
    this.commands.set('profile', (args) => this.showProfile(args[0] || this.engine.user.username));
    this.commands.set('pm', (args) => this.sendPrivateMessage(args[0], args.slice(1).join(' ')));
    this.commands.set('ignore', (args) => this.ignoreUser(args[0]));
    this.commands.set('unignore', (args) => this.unignoreUser(args[0]));
    this.commands.set('away', (args) => this.setAwayStatus(args.join(' ')));
    this.commands.set('back', () => this.setBackStatus());
    
    // Power commands
    this.commands.set('red', () => this.activatePowerMode('red'));
    this.commands.set('green', () => this.activatePowerMode('green'));
    this.commands.set('blue', () => this.activatePowerMode('blue'));
    this.commands.set('yellow', () => this.activatePowerMode('yellow'));
    this.commands.set('purple', () => this.activatePowerMode('purple'));
    this.commands.set('orange', () => this.activatePowerMode('orange'));
    this.commands.set('pink', () => this.activatePowerMode('pink'));
    this.commands.set('cyan', () => this.activatePowerMode('cyan'));
    this.commands.set('white', () => this.activatePowerMode('white'));
    this.commands.set('black', () => this.activatePowerMode('black'));
    
    // Fun commands
    this.commands.set('dance', () => this.actionMessage('dances! 💃'));
    this.commands.set('wave', () => this.actionMessage('waves! 👋'));
    this.commands.set('laugh', () => this.actionMessage('laughs! 😂'));
    this.commands.set('cry', () => this.actionMessage('cries! 😢'));
    this.commands.set('sleep', () => this.actionMessage('falls asleep! 😴'));
    this.commands.set('wake', () => this.actionMessage('wakes up! 😊'));
  }
  
  processCommand(message) {
    // Process chat commands (equivalent to Flash command parsing)
    if (!message.startsWith('/')) return false;
    
    const parts = message.slice(1).split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);
    
    const handler = this.commands.get(command);
    if (handler) {
      handler(args);
      return true;
    }
    
    return false;
  }
  
  actionMessage(action) {
    // Action message (equivalent to Flash /me command)
    this.engine.addMessage(this.engine.user.username, `* ${action} *`, 'action');
  }
  
  activatePowerMode(powerName) {
    // Activate power mode (equivalent to Flash power activation)
    if (this.engine.powerSystem.hasPower(powerName)) {
      this.engine.addSystemMessage(`Power "${powerName}" is already active!`);
    } else {
      this.engine.powerSystem.addPower(powerName);
    }
  }
  
  showHelp() {
    // Show help (equivalent to Flash help display)
    const helpText = `
Available commands:
/me [action] - Perform an action
/rainbow, /sparkle, /fire, /ice - Activate powers
/red, /green, /blue, /yellow, /purple, /orange, /pink, /cyan, /white, /black - Color powers
/dance, /wave, /laugh, /cry, /sleep, /wake - Fun actions
/profile [user] - Show user profile
/pm [user] [message] - Send private message
/ignore [user] - Ignore user
/away [message] - Set away status
/back - Return from away status
/help - Show this help

Admin commands (if you have permission):
/kick [user] - Kick user from room
/ban [user] - Ban user from room
/mute [user] - Mute user
/unmute [user] - Unmute user
/clear - Clear chat
/announce [message] - Make announcement
    `.trim();
    
    this.engine.addSystemMessage(helpText);
  }
  
  // Admin command implementations
  kickUser(username) {
    if (this.engine.user.rank > 2) {
      this.engine.addSystemMessage('You do not have permission to kick users.');
      return;
    }
    this.engine.socket.emit('admin-action', { action: 'kick', target: username });
    this.engine.addSystemMessage(`Attempting to kick ${username}...`);
  }
  
  banUser(username) {
    if (this.engine.user.rank > 1) {
      this.engine.addSystemMessage('You do not have permission to ban users.');
      return;
    }
    this.engine.socket.emit('admin-action', { action: 'ban', target: username });
    this.engine.addSystemMessage(`Attempting to ban ${username}...`);
  }
  
  muteUser(username) {
    if (this.engine.user.rank > 2) {
      this.engine.addSystemMessage('You do not have permission to mute users.');
      return;
    }
    this.engine.socket.emit('admin-action', { action: 'mute', target: username });
    this.engine.addSystemMessage(`Attempting to mute ${username}...`);
  }
  
  unmuteUser(username) {
    if (this.engine.user.rank > 2) {
      this.engine.addSystemMessage('You do not have permission to unmute users.');
      return;
    }
    this.engine.socket.emit('admin-action', { action: 'unmute', target: username });
    this.engine.addSystemMessage(`Attempting to unmute ${username}...`);
  }
  
  clearChat() {
    if (this.engine.user.rank > 2) {
      this.engine.addSystemMessage('You do not have permission to clear chat.');
      return;
    }
    this.engine.elements.messages.innerHTML = '';
    this.engine.addSystemMessage('Chat cleared by moderator.');
  }
  
  announce(message) {
    if (this.engine.user.rank > 2) {
      this.engine.addSystemMessage('You do not have permission to make announcements.');
      return;
    }
    this.engine.socket.emit('admin-action', { action: 'announce', message: message });
    this.engine.addSystemMessage(`Announcement: ${message}`);
  }
  
  // User command implementations
  showProfile(username) {
    this.engine.addSystemMessage(`Profile for ${username}: [Profile system coming soon!]`);
  }
  
  sendPrivateMessage(username, message) {
    if (!message) {
      this.engine.addSystemMessage('Usage: /pm [username] [message]');
      return;
    }
    this.engine.socket.emit('private-message', { target: username, message: message });
    this.engine.addSystemMessage(`PM to ${username}: ${message}`);
  }
  
  ignoreUser(username) {
    this.engine.addSystemMessage(`Now ignoring ${username}`);
  }
  
  unignoreUser(username) {
    this.engine.addSystemMessage(`No longer ignoring ${username}`);
  }
  
  setAwayStatus(message) {
    this.engine.user.away = true;
    this.engine.user.awayMessage = message || 'Away';
    this.engine.socket.emit('status-change', { away: true, message: this.engine.user.awayMessage });
    this.engine.addSystemMessage(`You are now away: ${this.engine.user.awayMessage}`);
  }
  
  setBackStatus() {
    this.engine.user.away = false;
    this.engine.user.awayMessage = '';
    this.engine.socket.emit('status-change', { away: false });
    this.engine.addSystemMessage('You are back!');
  }
  
  addToHistory(message) {
    // Add message to history (equivalent to Flash message storage)
    this.messageHistory.push(message);
    if (this.messageHistory.length > this.maxHistory) {
      this.messageHistory.shift();
    }
  }
}

// ============================================================================
// SMILEY SYSTEM - Equivalent to Flash Smiley MovieClips
// ============================================================================

class XatSmileySystem {
  constructor(engine) {
    this.engine = engine;
    this.smilies = new Map();
  }
  
  init() {
    // Load smilies (equivalent to Flash smiley SWFs)
    this.loadSmilies();
    this.createSmileyBar();
  }
  
  loadSmilies() {
    // Smiley definitions (equivalent to Flash smiley graphics)
    const smileyDefinitions = {
      // Basic emotions
      '(smile)': '😊',
      '(wink)': '😉', 
      '(laugh)': '😂',
      '(frown)': '😢',
      '(big_smile)': '😃',
      '(tongue)': '😛',
      '(surprised)': '😮',
      '(cool)': '😎',
      '(cry)': '😭',
      '(angry)': '😠',
      '(devil)': '😈',
      '(angel)': '😇',
      '(kiss)': '😘',
      '(love)': '🥰',
      '(party)': '🎉',
      '(sad)': '😔',
      '(confused)': '😕',
      '(sleepy)': '😴',
      '(sick)': '🤒',
      '(nerd)': '🤓',
      
      // Objects and symbols
      '(heart)': '❤️',
      '(star)': '⭐',
      '(fire)': '🔥',
      '(diamond)': '💎',
      '(music)': '🎵',
      '(flower)': '🌸',
      '(sun)': '☀️',
      '(moon)': '🌙',
      '(rainbow)': '🌈',
      '(thumbsup)': '👍',
      '(thumbsdown)': '👎',
      '(clap)': '👏',
      '(wave)': '👋',
      '(peace)': '✌️',
      '(ok)': '👌',
      '(rock)': '🤘',
      '(pray)': '🙏',
      '(eyes)': '👀',
      '(brain)': '🧠',
      '(lightbulb)': '💡',
      
      // Animals
      '(cat)': '🐱',
      '(dog)': '🐶',
      '(panda)': '🐼',
      '(koala)': '🐨',
      '(tiger)': '🐯',
      '(lion)': '🦁',
      '(elephant)': '🐘',
      '(giraffe)': '🦒',
      '(monkey)': '🐒',
      '(penguin)': '🐧',
      '(owl)': '🦉',
      '(eagle)': '🦅',
      '(dragon)': '🐉',
      '(unicorn)': '🦄',
      '(butterfly)': '🦋',
      '(bee)': '🐝',
      '(spider)': '🕷️',
      '(snake)': '🐍',
      '(fish)': '🐠',
      '(shark)': '🦈',
      
      // Food and drinks
      '(pizza)': '🍕',
      '(hamburger)': '🍔',
      '(hotdog)': '🌭',
      '(taco)': '🌮',
      '(sushi)': '🍣',
      '(icecream)': '🍦',
      '(cake)': '🍰',
      '(cookie)': '🍪',
      '(coffee)': '☕',
      '(beer)': '🍺',
      '(wine)': '🍷',
      '(cocktail)': '🍸',
      '(soda)': '🥤',
      '(water)': '💧',
      '(milk)': '🥛',
      '(egg)': '🥚',
      '(bread)': '🍞',
      '(cheese)': '🧀',
      '(apple)': '🍎',
      '(banana)': '🍌',
      
      // Activities and sports
      '(soccer)': '⚽',
      '(basketball)': '🏀',
      '(baseball)': '⚾',
      '(tennis)': '🎾',
      '(golf)': '⛳',
      '(ski)': '⛷️',
      '(surf)': '🏄',
      '(swim)': '🏊',
      '(run)': '🏃',
      '(bike)': '🚴',
      '(car)': '🚗',
      '(plane)': '✈️',
      '(boat)': '⛵',
      '(train)': '🚂',
      '(rocket)': '🚀',
      '(game)': '🎮',
      '(movie)': '🎬',
      '(tv)': '📺',
      '(phone)': '📱',
      '(computer)': '💻',
      
      // Weather and nature
      '(rain)': '🌧️',
      '(snow)': '❄️',
      '(storm)': '⛈️',
      '(cloud)': '☁️',
      '(tree)': '🌳',
      '(flower)': '🌺',
      '(leaf)': '🍃',
      '(mountain)': '⛰️',
      '(beach)': '🏖️',
      '(island)': '🏝️',
      '(volcano)': '🌋',
      '(earth)': '🌍',
      '(globe)': '🌐',
      '(map)': '🗺️',
      '(compass)': '🧭',
      '(telescope)': '🔭',
      '(microscope)': '🔬',
      '(atom)': '⚛️',
      '(dna)': '🧬',
      '(virus)': '🦠'
    };
    
    Object.entries(smileyDefinitions).forEach(([code, emoji]) => {
      this.smilies.set(code, emoji);
    });
  }
  
  createSmileyBar() {
    // Create smiley bar (equivalent to Flash smiley bar MovieClip)
    const smileyBar = this.engine.elements.smileyBar;
    
    // Add category buttons
    const categories = [
      { name: 'Emotions', smilies: ['(smile)', '(wink)', '(laugh)', '(cry)', '(angry)', '(cool)', '(surprised)'] },
      { name: 'Objects', smilies: ['(heart)', '(star)', '(fire)', '(diamond)', '(music)', '(flower)', '(sun)'] },
      { name: 'Animals', smilies: ['(cat)', '(dog)', '(panda)', '(tiger)', '(dragon)', '(unicorn)', '(butterfly)'] },
      { name: 'Food', smilies: ['(pizza)', '(hamburger)', '(icecream)', '(cake)', '(coffee)', '(beer)', '(apple)'] },
      { name: 'Activities', smilies: ['(soccer)', '(game)', '(movie)', '(car)', '(plane)', '(rocket)', '(phone)'] }
    ];
    
    // Create category selector
    const categorySelect = document.createElement('select');
    categorySelect.style.cssText = `
      background: rgba(83, 52, 131, 0.8);
      color: white;
      border: 1px solid #533483;
      border-radius: 3px;
      padding: 2px 5px;
      font-size: 10px;
      margin-right: 5px;
    `;
    
    categories.forEach((category, index) => {
      const option = document.createElement('option');
      option.value = index;
      option.textContent = category.name;
      categorySelect.appendChild(option);
    });
    
    smileyBar.appendChild(categorySelect);
    
    // Create smiley container
    const smileyContainer = document.createElement('div');
    smileyContainer.style.cssText = `
      display: flex;
      gap: 2px;
      flex-wrap: wrap;
      max-height: 60px;
      overflow-y: auto;
    `;
    
    smileyBar.appendChild(smileyContainer);
    
    // Function to update visible smilies
    const updateSmilies = (categoryIndex) => {
      smileyContainer.innerHTML = '';
      const category = categories[categoryIndex];
      
      category.smilies.forEach(code => {
        const smileyItem = document.createElement('div');
        smileyItem.className = 'smiley-item';
        smileyItem.dataset.smiley = code;
        smileyItem.title = code;
        smileyItem.textContent = this.smilies.get(code) || '😊';
        smileyItem.style.cssText = `
          width: 20px;
          height: 20px;
          background: rgba(83, 52, 131, 0.5);
          border: 1px solid #533483;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 12px;
          border-radius: 3px;
          transition: all 0.2s ease;
        `;
        
        smileyItem.addEventListener('click', () => {
          this.engine.elements.messageInput.value += code;
          this.engine.elements.messageInput.focus();
        });
        
        smileyItem.addEventListener('mouseenter', () => {
          smileyItem.style.background = 'rgba(83, 52, 131, 0.8)';
          smileyItem.style.transform = 'scale(1.1)';
        });
        
        smileyItem.addEventListener('mouseleave', () => {
          smileyItem.style.background = 'rgba(83, 52, 131, 0.5)';
          smileyItem.style.transform = 'scale(1)';
        });
        
        smileyContainer.appendChild(smileyItem);
      });
    };
    
    // Initialize with first category
    updateSmilies(0);
    
    // Handle category change
    categorySelect.addEventListener('change', (e) => {
      updateSmilies(parseInt(e.target.value));
    });
  }
  
  processSmilies(text) {
    // Process smilies in text (equivalent to Flash smiley replacement)
    let processed = text;
    
    this.smilies.forEach((emoji, code) => {
      const regex = new RegExp(code.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      processed = processed.replace(regex, emoji);
    });
    
    return processed;
  }
}

// ============================================================================
// SOUND SYSTEM - Equivalent to Flash Sound class
// ============================================================================

class XatSoundSystem {
  constructor(engine) {
    this.engine = engine;
    this.sounds = new Map();
    this.enabled = true;
    this.backgroundMusic = null;
    this.currentMusic = null;
    this.volume = 0.5;
  }
  
  init() {
    // Load sounds (equivalent to Flash Sound loading)
    this.loadSounds();
  }
  
  loadSounds() {
    // Sound definitions (equivalent to Flash MP3 files)
    const soundDefinitions = [
      {name: 'message', url: '/sounds/message.mp3'},
      {name: 'join', url: '/sounds/join.mp3'},
      {name: 'leave', url: '/sounds/leave.mp3'},
      {name: 'notification', url: '/sounds/notification.mp3'}
    ];
    
    soundDefinitions.forEach(sound => {
      const audio = new Audio(sound.url);
      audio.preload = 'auto';
      this.sounds.set(sound.name, audio);
    });
  }
  
  playSound(soundName) {
    // Play sound (equivalent to Flash Sound.play())
    if (!this.enabled) return;
    
    const sound = this.sounds.get(soundName);
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(e => console.log('Sound play failed:', e));
    }
  }
  
  setEnabled(enabled) {
    this.enabled = enabled;
  }
  
  playBackgroundMusic(musicType) {
    if (!this.enabled) return;
    
    // Stop current music if playing
    this.stopBackgroundMusic();
    
    // Create background music (equivalent to Flash music player)
    this.backgroundMusic = new Audio();
    this.backgroundMusic.loop = true;
    this.backgroundMusic.volume = this.volume;
    
    // Map music types to URLs (in real implementation, these would be actual music files)
    const musicUrls = {
      'ambient': 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav', // Placeholder
      'chill': 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav', // Placeholder
      'rock': 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav', // Placeholder
      'electronic': 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav', // Placeholder
      'classical': 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav' // Placeholder
    };
    
    this.backgroundMusic.src = musicUrls[musicType] || musicUrls['ambient'];
    this.currentMusic = musicType;
    
    this.backgroundMusic.play().catch(e => {
      console.log('Background music play failed:', e);
      // Fallback: create a simple tone for demonstration
      this.createToneMusic(musicType);
    });
    
    this.engine.addSystemMessage(`🎵 Now playing: ${musicType} music`);
  }
  
  createToneMusic(musicType) {
    // Create a simple tone as fallback (equivalent to Flash Sound synthesis)
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Different frequencies for different music types
    const frequencies = {
      'ambient': 220,
      'chill': 440,
      'rock': 330,
      'electronic': 550,
      'classical': 660
    };
    
    oscillator.frequency.setValueAtTime(frequencies[musicType] || 220, audioContext.currentTime);
    oscillator.type = 'sine';
    gainNode.gain.setValueAtTime(this.volume * 0.1, audioContext.currentTime);
    
    oscillator.start();
    this.backgroundMusic = { stop: () => oscillator.stop() };
    this.currentMusic = musicType;
  }
  
  pauseBackgroundMusic() {
    if (this.backgroundMusic && this.backgroundMusic.pause) {
      this.backgroundMusic.pause();
      this.engine.addSystemMessage('⏸️ Music paused');
    }
  }
  
  stopBackgroundMusic() {
    if (this.backgroundMusic) {
      if (this.backgroundMusic.stop) {
        this.backgroundMusic.stop();
      } else if (this.backgroundMusic.pause) {
        this.backgroundMusic.pause();
        this.backgroundMusic.currentTime = 0;
      }
      this.backgroundMusic = null;
      this.currentMusic = null;
      this.engine.addSystemMessage('⏹️ Music stopped');
    }
  }
  
  setVolume(volume) {
    this.volume = volume / 100;
    if (this.backgroundMusic && this.backgroundMusic.volume !== undefined) {
      this.backgroundMusic.volume = this.volume;
    }
  }
}

// ============================================================================
// ANIMATION SYSTEM - Equivalent to Flash Tween class
// ============================================================================

class XatAnimationSystem {
  constructor(engine) {
    this.engine = engine;
    this.animations = new Map();
    this.animationId = 0;
  }
  
  init() {
    // Initialize animation system
  }
  
  createAnimation(element, properties, duration, easing = 'ease-out') {
    // Create animation (equivalent to Flash Tween)
    const animationId = ++this.animationId;
    
    const animation = {
      id: animationId,
      element: element,
      properties: properties,
      duration: duration,
      easing: easing,
      startTime: Date.now(),
      startValues: this.getCurrentValues(element, properties)
    };
    
    this.animations.set(animationId, animation);
    
    // Start animation loop if not already running
    if (this.animations.size === 1) {
      this.animationLoop();
    }
    
    return animationId;
  }
  
  getCurrentValues(element, properties) {
    // Get current CSS values (equivalent to Flash property reading)
    const values = {};
    Object.keys(properties).forEach(prop => {
      const computed = window.getComputedStyle(element);
      switch(prop) {
        case 'transform':
          values[prop] = computed.transform;
          break;
        case 'opacity':
          values[prop] = parseFloat(computed.opacity);
          break;
        case 'filter':
          values[prop] = computed.filter;
          break;
        default:
          values[prop] = computed[prop];
      }
    });
    return values;
  }
  
  animationLoop() {
    // Animation loop (equivalent to Flash ENTER_FRAME)
    const currentTime = Date.now();
    const completedAnimations = [];
    
    this.animations.forEach((animation, id) => {
      const elapsed = currentTime - animation.startTime;
      const progress = Math.min(elapsed / animation.duration, 1);
      
      if (progress >= 1) {
        // Animation complete
        this.applyProperties(animation.element, animation.properties);
        completedAnimations.push(id);
      } else {
        // Apply interpolated values
        const interpolated = this.interpolateProperties(
          animation.startValues,
          animation.properties,
          this.easeValue(progress, animation.easing)
        );
        this.applyProperties(animation.element, interpolated);
      }
    });
    
    // Remove completed animations
    completedAnimations.forEach(id => {
      this.animations.delete(id);
    });
    
    // Continue loop if animations remain
    if (this.animations.size > 0) {
      requestAnimationFrame(() => this.animationLoop());
    }
  }
  
  easeValue(t, easing) {
    // Easing functions (equivalent to Flash easing)
    switch(easing) {
      case 'ease-in':
        return t * t;
      case 'ease-out':
        return t * (2 - t);
      case 'ease-in-out':
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      default:
        return t;
    }
  }
  
  interpolateProperties(start, end, progress) {
    // Interpolate between property values
    const interpolated = {};
    
    Object.keys(end).forEach(prop => {
      if (typeof end[prop] === 'number') {
        interpolated[prop] = start[prop] + (end[prop] - start[prop]) * progress;
      } else {
        interpolated[prop] = progress < 0.5 ? start[prop] : end[prop];
      }
    });
    
    return interpolated;
  }
  
  applyProperties(element, properties) {
    // Apply CSS properties (equivalent to Flash property setting)
    Object.entries(properties).forEach(([prop, value]) => {
      switch(prop) {
        case 'transform':
          element.style.transform = value;
          break;
        case 'opacity':
          element.style.opacity = value;
          break;
        case 'filter':
          element.style.filter = value;
          break;
        default:
          element.style[prop] = value;
      }
    });
  }
}

// ============================================================================
// GLOBAL FUNCTIONS - Equivalent to Flash global functions
// ============================================================================

window.showUserProfile = function(username) {
  // Show user profile (equivalent to Flash profile popup)
  console.log('Show profile for:', username);
  // TODO: Implement user profile modal
};

// ============================================================================
// CSS STYLES - Equivalent to Flash visual styling
// ============================================================================

const styles = `
  .rank-owner { color: #ff0000; }
  .rank-mod { color: #0000ff; }
  .rank-member { color: #00ff00; }
  .rank-guest { color: #ffffff; }
  
  .power-red { color: #ff0000; }
  .power-green { color: #00ff00; }
  .power-blue { color: #0000ff; }
  
  .rainbow-text {
    background: linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: rainbow 2s ease-in-out infinite;
  }
  
  .sparkle-text {
    text-shadow: 0 0 5px #ffd700, 0 0 10px #ffd700;
    animation: sparkle 1s ease-in-out infinite alternate;
  }
  
  .fire-text {
    color: #ff4500;
    text-shadow: 0 0 5px #ff4500;
    animation: fire 0.5s ease-in-out infinite alternate;
  }
  
  .ice-text {
    color: #00bfff;
    text-shadow: 0 0 5px #00bfff;
    animation: ice 1s ease-in-out infinite;
  }
  
  .glitter-text {
    background: linear-gradient(45deg, #ffd700, #ffed4e, #fff200, #ffd700);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: glitter 0.8s ease-in-out infinite;
  }
  
  .neon-text {
    color: #00ff00;
    text-shadow: 0 0 5px #00ff00, 0 0 10px #00ff00, 0 0 15px #00ff00;
    animation: neon 1.5s ease-in-out infinite alternate;
  }
  
  .matrix-text {
    color: #00ff00;
    font-family: 'Courier New', monospace;
    text-shadow: 0 0 5px #00ff00;
    animation: matrix 0.1s linear infinite;
  }
  
  .zombie-text {
    color: #8b4513;
    text-shadow: 0 0 5px #8b4513;
    animation: zombie 2s ease-in-out infinite;
  }
  
  .power-yellow { color: #ffff00; text-shadow: 0 0 3px #ffff00; }
  .power-purple { color: #800080; text-shadow: 0 0 3px #800080; }
  .power-orange { color: #ffa500; text-shadow: 0 0 3px #ffa500; }
  .power-pink { color: #ffc0cb; text-shadow: 0 0 3px #ffc0cb; }
  .power-cyan { color: #00ffff; text-shadow: 0 0 3px #00ffff; }
  .power-white { color: #ffffff; text-shadow: 0 0 3px #ffffff; }
  .power-black { color: #000000; text-shadow: 0 0 3px #000000; }
  
  @keyframes rainbow {
    0%, 100% { filter: hue-rotate(0deg); }
    50% { filter: hue-rotate(180deg); }
  }
  
  @keyframes sparkle {
    0% { text-shadow: 0 0 5px #ffd700, 0 0 10px #ffd700; }
    100% { text-shadow: 0 0 10px #ffd700, 0 0 20px #ffd700, 0 0 30px #ffd700; }
  }
  
  @keyframes fire {
    0% { text-shadow: 0 0 5px #ff4500; }
    100% { text-shadow: 0 0 10px #ff4500, 0 0 15px #ff4500; }
  }
  
  @keyframes ice {
    0%, 100% { text-shadow: 0 0 5px #00bfff; }
    50% { text-shadow: 0 0 10px #00bfff, 0 0 15px #00bfff; }
  }
  
  @keyframes glitter {
    0%, 100% { filter: brightness(1) saturate(1); }
    50% { filter: brightness(1.3) saturate(1.5); }
  }
  
  @keyframes neon {
    0% { text-shadow: 0 0 5px #00ff00, 0 0 10px #00ff00, 0 0 15px #00ff00; }
    100% { text-shadow: 0 0 10px #00ff00, 0 0 20px #00ff00, 0 0 30px #00ff00; }
  }
  
  @keyframes matrix {
    0% { opacity: 1; }
    50% { opacity: 0.8; }
    100% { opacity: 1; }
  }
  
  @keyframes zombie {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-1px); }
    75% { transform: translateX(1px); }
  }
  
  @keyframes blast {
    0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
    100% { transform: translate(-50%, -50%) scale(3); opacity: 0; }
  }
  
  @keyframes confetti-fall {
    0% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
    100% { transform: translateY(400px) rotate(360deg); opacity: 0; }
  }
  
  @keyframes snow-fall {
    0% { transform: translateY(-20px) translateX(0); opacity: 1; }
    100% { transform: translateY(400px) translateX(20px); opacity: 0; }
  }
  
  @keyframes firework-explode {
    0% { transform: scale(0); opacity: 1; }
    50% { transform: scale(1); opacity: 1; }
    100% { transform: scale(2); opacity: 0; }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.7; transform: scale(1.1); }
  }
  
  @keyframes bounce {
    0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0); }
    40%, 43% { transform: translate3d(0, -8px, 0); }
    70% { transform: translate3d(0, -4px, 0); }
    90% { transform: translate3d(0, -2px, 0); }
  }
  
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
    20%, 40%, 60%, 80% { transform: translateX(2px); }
  }
  
  .smiley-item:hover {
    background: rgba(83, 52, 131, 0.8) !important;
    transform: scale(1.1);
  }
  
  .user-item:hover {
    background: rgba(83, 52, 131, 0.5);
    transform: translateX(2px);
    transition: all 0.2s ease;
  }
  
  .user-item {
    transition: all 0.2s ease;
  }
  
  .user-item:active {
    transform: scale(0.95);
  }
  
  .xat-send-btn:hover {
    background: linear-gradient(to bottom, #6a4498, #533483) !important;
  }
  
  .status-indicator {
    box-shadow: 0 0 5px currentColor;
  }
  
  .user-info:hover {
    background: rgba(83, 52, 131, 0.3);
    transform: scale(1.02);
  }
  
  .xat-panel button:hover {
    transform: scale(1.05);
    box-shadow: 0 2px 5px rgba(0,0,0,0.3);
  }
  
  .xat-panel button:active {
    transform: scale(0.95);
  }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

// ============================================================================
// EXPORT FOR USE
// ============================================================================

// Make XatEngine available globally
window.XatEngine = XatEngine;
