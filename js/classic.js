// Enhanced Classic Xat Chat JavaScript - Full Power System Implementation
// Based on original xat.com ActionScript and PHP code analysis

// Global variables
let socket;
let currentUser = null;
let currentRoom = 'general';
let isTyping = false;
let typingTimeout;
let selectedAvatar = 'default';
let selectedPower = null;
let soundEnabled = true;
let musicEnabled = true;
let effectsEnabled = true;
let userPowers = [];
let allPowers = [];
let commandHistory = [];
let commandIndex = -1;

// Power system data structure (based on original xat.com)
const POWER_TYPES = {
    CHAT: 'chat',
    AVATAR: 'avatar', 
    ROOM: 'room',
    USER: 'user',
    EFFECT: 'effect'
};

const POWER_RARITY = {
    COMMON: 'common',
    UNCOMMON: 'uncommon',
    RARE: 'rare',
    EPIC: 'epic',
    LEGENDARY: 'legendary'
};

// Command system (based on original xat.com commands)
const COMMANDS = {
    '/help': { description: 'Show available commands', handler: showHelp },
    '/me': { description: 'Perform an action', handler: handleMeCommand },
    '/p': { description: 'Send private message', handler: handlePrivateMessage },
    '/clear': { description: 'Clear chat', handler: clearChat },
    '/away': { description: 'Set away status', handler: setAwayStatus },
    '/back': { description: 'Set back status', handler: setBackStatus },
    '/kick': { description: 'Kick user (mod only)', handler: kickUser },
    '/ban': { description: 'Ban user (mod only)', handler: banUser },
    '/mute': { description: 'Mute user (mod only)', handler: muteUser },
    '/unmute': { description: 'Unmute user (mod only)', handler: unmuteUser },
    '/topic': { description: 'Set room topic (owner only)', handler: setTopic },
    '/bg': { description: 'Set background', handler: setBackground },
    '/music': { description: 'Play music', handler: playMusic },
    '/stopmusic': { description: 'Stop music', handler: stopMusic },
    '/smiley': { description: 'Show smiley list', handler: showSmileyList },
    '/power': { description: 'Activate power', handler: activatePower },
    '/avatar': { description: 'Change avatar', handler: changeAvatar },
    '/rainbow': { description: 'Rainbow text effect', handler: rainbowText },
    '/sparkle': { description: 'Sparkle effect', handler: sparkleEffect },
    '/fire': { description: 'Fire effect', handler: fireEffect },
    '/ice': { description: 'Ice effect', handler: iceEffect },
    '/lightning': { description: 'Lightning effect', handler: lightningEffect },
    '/star': { description: 'Star effect', handler: starEffect },
    '/diamond': { description: 'Diamond effect', handler: diamondEffect },
    '/musicnote': { description: 'Music note effect', handler: musicNoteEffect },
    '/drama': { description: 'Drama effect', handler: dramaEffect }
};

// Avatar system (based on original xat.com avatars)
const AVATAR_PARTS = {
    head: ['head1', 'head2', 'head3', 'head4', 'head5', 'head6', 'head7', 'head8', 'head9', 'head10'],
    eyes: ['eyes1', 'eyes2', 'eyes4', 'eyes5', 'eyes6', 'eyes7', 'eyes8', 'eyes9', 'eyes10', 'eyes11', 'eyes12', 'eyes13', 'eyes14'],
    mouth: ['mouthdefault'],
    hair: ['hair0', 'hair1', 'hair2', 'hair3', 'hair4', 'hair5', 'hair6', 'hair7', 'hair8', 'hair9', 'hair10', 'hair11', 'hair12'],
    hat: ['hat1', 'hat2', 'hat3', 'hat4', 'hat5', 'hat6', 'hat7', 'hat8', 'hat9', 'hat10', 'hat11', 'hat12', 'hat13', 'hat14', 'hat15', 'hat16', 'hat17', 'hat18', 'hat19', 'hat20', 'hat21', 'hat22', 'hat23', 'hat24', 'hat25', 'hat26', 'hat27', 'hat28', 'hat29', 'hat30', 'hat31', 'hat32', 'hat33', 'hat34', 'hat35', 'hat36', 'hat37', 'hat38', 'hat39', 'hat40'],
    brows: ['browdefault']
};

// Smiley system (based on original xat.com smilies)
const SMILEYS = {
    ':D': { emoji: '😀', action: 'biggrin' },
    ':)': { emoji: '🙂', action: 'smile' },
    ':(': { emoji: '😢', action: 'crying' },
    ';)': { emoji: '😉', action: 'wink' },
    ':P': { emoji: '😛', action: 'tongue' },
    ':O': { emoji: '😮', action: 'eek' },
    '<3': { emoji: '❤️', action: 'heart' },
    'lol': { emoji: '😂', action: 'laugh' },
    'cool': { emoji: '😎', action: 'cool' },
    'mad': { emoji: '😠', action: 'mad' },
    'sleepy': { emoji: '😴', action: 'sleepy' },
    'confused': { emoji: '😕', action: 'confused' },
    'what': { emoji: '🤔', action: 'what' },
    'yes': { emoji: '👍', action: 'yes' },
    'no': { emoji: '👎', action: 'no' }
};

// DOM Elements
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const messageList = document.getElementById('message-list');
const userList = document.getElementById('user-list');
const roomSelect = document.getElementById('room-select');
const backgroundSelect = document.getElementById('background-select');
const avatarContainer = document.getElementById('avatar-container');
const powerBar = document.getElementById('power-bar');
const smileyBar = document.getElementById('smiley-bar');
const typingIndicator = document.getElementById('typing-indicator');
const connectionStatus = document.getElementById('connection-status');
const userInfo = document.getElementById('user-info');
const musicPlayer = document.getElementById('music-player');
const powerAnimations = document.getElementById('classic-power-animations');

// Initialize the enhanced chat
document.addEventListener('DOMContentLoaded', () => {
    initializeEnhancedChat();
    setupEventListeners();
    loadUserPreferences();
    loadPowers();
    loadAvatars();
    createSampleMessages();
    setupCommandSystem();
});

// Initialize enhanced chat with full power system
function initializeEnhancedChat() {
    // Simulate socket connection for demo
    setTimeout(() => {
        connectionStatus.textContent = '🟢 Connected';
        connectionStatus.className = 'status connected';
        
        // Simulate user login with enhanced data
        currentUser = {
            id: 'user_' + Math.random().toString(36).substr(2, 9),
            username: 'User' + Math.floor(Math.random() * 1000),
            avatar: selectedAvatar,
            level: Math.floor(Math.random() * 50) + 1,
            xats: Math.floor(Math.random() * 10000) + 1000,
            powers: [],
            isMod: Math.random() > 0.8,
            isOwner: Math.random() > 0.95,
            status: 'online'
        };
        
        userInfo.innerHTML = `
            <span class="username">👤 ${currentUser.username} (Level ${currentUser.level})</span>
            <span class="xats">💰 ${currentUser.xats} xats</span>
        `;
        
        // Join default room
        joinRoom('general');
    }, 1000);
}

// Load powers from database (simulated)
function loadPowers() {
    // Simulate power loading from database
    allPowers = [
        { id: 1, name: 'rainbow', description: 'Rainbow text effect', cost: 100, type: POWER_TYPES.CHAT, rarity: POWER_RARITY.RARE, effect: 'rainbow' },
        { id: 2, name: 'sparkle', description: 'Sparkle effect', cost: 50, type: POWER_TYPES.AVATAR, rarity: POWER_RARITY.COMMON, effect: 'sparkle' },
        { id: 3, name: 'fire', description: 'Fire effect', cost: 200, type: POWER_TYPES.EFFECT, rarity: POWER_RARITY.UNCOMMON, effect: 'fire' },
        { id: 4, name: 'ice', description: 'Ice effect', cost: 150, type: POWER_TYPES.EFFECT, rarity: POWER_RARITY.UNCOMMON, effect: 'ice' },
        { id: 5, name: 'lightning', description: 'Lightning effect', cost: 300, type: POWER_TYPES.EFFECT, rarity: POWER_RARITY.RARE, effect: 'lightning' },
        { id: 6, name: 'star', description: 'Star effect', cost: 75, type: POWER_TYPES.AVATAR, rarity: POWER_RARITY.COMMON, effect: 'star' },
        { id: 7, name: 'diamond', description: 'Diamond effect', cost: 500, type: POWER_TYPES.EFFECT, rarity: POWER_RARITY.EPIC, effect: 'diamond' },
        { id: 8, name: 'musicnote', description: 'Music note effect', cost: 120, type: POWER_TYPES.EFFECT, rarity: POWER_RARITY.COMMON, effect: 'musicnote' },
        { id: 9, name: 'drama', description: 'Drama effect', cost: 80, type: POWER_TYPES.EFFECT, rarity: POWER_RARITY.COMMON, effect: 'drama' }
    ];

    // Update power bar
    updatePowerBar();
}

// Load avatars from database (simulated)
function loadAvatars() {
    // Simulate avatar loading
    const avatarItems = [
        'default', '1759', '998', '999', '994', '995', '996', '997', '992', '993',
        '989', '99', '990', '991', '987', '988', '983', '984', '985', '986'
    ];

    avatarContainer.innerHTML = avatarItems.map(avatar => 
        `<div class="avatar-item" data-avatar="${avatar}">
            <img src="/avatars/${avatar}.png" alt="${avatar}" onerror="this.style.display='none'">
        </div>`
    ).join('');
}

// Update power bar with available powers
function updatePowerBar() {
    powerBar.innerHTML = allPowers.map(power => 
        `<div class="power-item" data-power="${power.name}" title="${power.description} (${power.cost} xats)">
            <span class="power-icon">${getPowerIcon(power.name)}</span>
            <span class="power-name">${power.name}</span>
        </div>`
    ).join('');
}

// Get power icon
function getPowerIcon(powerName) {
    const icons = {
        'rainbow': '🌈',
        'sparkle': '⭐',
        'fire': '🔥',
        'ice': '❄️',
        'lightning': '⚡',
        'star': '⭐',
        'diamond': '💎',
        'musicnote': '🎵',
        'drama': '🎭'
    };
    return icons[powerName] || '✨';
}

// Setup command system
function setupCommandSystem() {
    messageInput.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            navigateCommandHistory('up');
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            navigateCommandHistory('down');
        }
    });
}

// Navigate command history
function navigateCommandHistory(direction) {
    if (direction === 'up' && commandIndex < commandHistory.length - 1) {
        commandIndex++;
        messageInput.value = commandHistory[commandHistory.length - 1 - commandIndex];
    } else if (direction === 'down' && commandIndex > 0) {
        commandIndex--;
        messageInput.value = commandHistory[commandHistory.length - 1 - commandIndex];
    } else if (direction === 'down' && commandIndex === 0) {
        commandIndex = -1;
        messageInput.value = '';
    }
}

// Setup event listeners
function setupEventListeners() {
    // Send message
    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Typing indicator
    messageInput.addEventListener('input', () => {
        if (!isTyping) {
            isTyping = true;
            showTypingIndicator();
        }
        clearTimeout(typingTimeout);
        typingTimeout = setTimeout(() => {
            isTyping = false;
            hideTypingIndicator();
        }, 2000);
    });

    // Room selection
    roomSelect.addEventListener('change', (e) => {
        joinRoom(e.target.value);
    });

    // Background selection
    backgroundSelect.addEventListener('change', (e) => {
        changeBackground(e.target.value);
    });

    // Avatar selection
    avatarContainer.addEventListener('click', (e) => {
        if (e.target.closest('.avatar-item')) {
            const avatarItem = e.target.closest('.avatar-item');
            selectedAvatar = avatarItem.dataset.avatar;
            updateUserAvatar();
            addPowerEffect('avatar-change');
        }
    });

    // Power selection
    powerBar.addEventListener('click', (e) => {
        if (e.target.closest('.power-item')) {
            const powerItem = e.target.closest('.power-item');
            const powerName = powerItem.dataset.power;
            activatePowerByName(powerName);
        }
    });

    // Smiley selection
    smileyBar.addEventListener('click', (e) => {
        if (e.target.classList.contains('smiley-item')) {
            insertSmiley(e.target.textContent);
        }
    });

    // Music player
    if (musicPlayer) {
        musicPlayer.addEventListener('play', () => {
            if (musicEnabled) {
                addPowerEffect('music-start');
            }
        });
    }
}

// Send message with command processing
function sendMessage() {
    const message = messageInput.value.trim();
    if (!message) return;

    // Add to command history
    commandHistory.push(message);
    if (commandHistory.length > 50) commandHistory.shift();
    commandIndex = -1;

    // Check if it's a command
    if (message.startsWith('/')) {
        handleCommand(message);
        messageInput.value = '';
                return;
    }

    const messageData = {
        id: 'msg_' + Date.now(),
        user: currentUser,
        content: message,
        timestamp: new Date(),
        avatar: selectedAvatar,
        power: selectedPower
    };

    addMessage(messageData);
    messageInput.value = '';
    hideTypingIndicator();

    // Add power effects if power is selected
    if (selectedPower) {
        addPowerEffect('message-send');
        selectedPower = null; // Reset power after use
    }

    // Play sound effect
    if (soundEnabled) {
        playSound('message');
    }
}

// Handle commands
function handleCommand(message) {
    const parts = message.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    if (COMMANDS[command]) {
        COMMANDS[command].handler(args);
        } else {
        addSystemMessage(`Unknown command: ${command}. Type /help for available commands.`);
    }
}

// Command handlers
function showHelp() {
    const helpText = Object.entries(COMMANDS)
        .map(([cmd, info]) => `${cmd} - ${info.description}`)
        .join('\n');
    
    addSystemMessage('Available commands:\n' + helpText);
}

function handleMeCommand(args) {
    if (args.length === 0) {
        addSystemMessage('Usage: /me <action>');
        return;
    }
    
    const action = args.join(' ');
    const messageData = {
        id: 'msg_' + Date.now(),
        user: currentUser,
        content: `*${currentUser.username} ${action}*`,
        timestamp: new Date(),
        avatar: selectedAvatar,
        isAction: true
    };
    
    addMessage(messageData);
}

function handlePrivateMessage(args) {
    if (args.length < 2) {
        addSystemMessage('Usage: /p <username> <message>');
        return;
    }
    
    const targetUser = args[0];
    const message = args.slice(1).join(' ');
    
    addSystemMessage(`[PM to ${targetUser}]: ${message}`);
}

function clearChat() {
    messageList.innerHTML = `
        <div class="welcome-message">
            <h2>🌟 Chat Cleared! 🌟</h2>
            <p>Chat history has been cleared.</p>
        </div>
    `;
}

function setAwayStatus() {
    currentUser.status = 'away';
    addSystemMessage(`${currentUser.username} is now away.`);
}

function setBackStatus() {
    currentUser.status = 'online';
    addSystemMessage(`${currentUser.username} is back.`);
}

function kickUser(args) {
    if (!currentUser.isMod) {
        addSystemMessage('You do not have permission to kick users.');
        return;
    }
    
    if (args.length === 0) {
        addSystemMessage('Usage: /kick <username>');
        return;
    }
    
    const targetUser = args[0];
    addSystemMessage(`${targetUser} has been kicked from the room.`);
}

function banUser(args) {
    if (!currentUser.isMod) {
        addSystemMessage('You do not have permission to ban users.');
        return;
    }
    
    if (args.length === 0) {
        addSystemMessage('Usage: /ban <username>');
        return;
    }
    
    const targetUser = args[0];
    addSystemMessage(`${targetUser} has been banned from the room.`);
}

function muteUser(args) {
    if (!currentUser.isMod) {
        addSystemMessage('You do not have permission to mute users.');
        return;
    }
    
    if (args.length === 0) {
        addSystemMessage('Usage: /mute <username>');
        return;
    }
    
    const targetUser = args[0];
    addSystemMessage(`${targetUser} has been muted.`);
}

function unmuteUser(args) {
    if (!currentUser.isMod) {
        addSystemMessage('You do not have permission to unmute users.');
        return;
    }
    
    if (args.length === 0) {
        addSystemMessage('Usage: /unmute <username>');
                return;
    }
    
    const targetUser = args[0];
    addSystemMessage(`${targetUser} has been unmuted.`);
}

function setTopic(args) {
    if (!currentUser.isOwner) {
        addSystemMessage('You do not have permission to set the topic.');
        return;
    }
    
    if (args.length === 0) {
        addSystemMessage('Usage: /topic <new topic>');
        return;
    }
    
    const topic = args.join(' ');
    addSystemMessage(`Room topic changed to: ${topic}`);
}

function setBackground(args) {
    if (args.length === 0) {
        addSystemMessage('Usage: /bg <background>');
        return;
    }
    
    const bg = args[0];
    changeBackground(bg);
    addSystemMessage(`Background changed to: ${bg}`);
}

function playMusic(args) {
    if (args.length === 0) {
        addSystemMessage('Usage: /music <song>');
        return;
    }
    
    const song = args.join(' ');
    addSystemMessage(`Now playing: ${song}`);
    if (musicPlayer) {
        musicPlayer.play();
    }
}

function stopMusic() {
    addSystemMessage('Music stopped.');
    if (musicPlayer) {
        musicPlayer.pause();
        musicPlayer.currentTime = 0;
    }
}

function showSmileyList() {
    const smileyList = Object.entries(SMILEYS)
        .map(([code, data]) => `${code} ${data.emoji}`)
        .join(' ');
    
    addSystemMessage('Available smilies: ' + smileyList);
}

function activatePower(args) {
    if (args.length === 0) {
        addSystemMessage('Usage: /power <powername>');
        return;
    }
    
    const powerName = args[0];
    activatePowerByName(powerName);
}

function changeAvatar(args) {
    if (args.length === 0) {
        addSystemMessage('Usage: /avatar <avatarname>');
                return;
    }
    
    const avatarName = args[0];
    selectedAvatar = avatarName;
    updateUserAvatar();
    addSystemMessage(`Avatar changed to: ${avatarName}`);
}

// Power effect functions
function rainbowText(args) {
    if (args.length === 0) {
        addSystemMessage('Usage: /rainbow <text>');
                        return;
    }
    
    const text = args.join(' ');
    const messageData = {
        id: 'msg_' + Date.now(),
        user: currentUser,
        content: text,
        timestamp: new Date(),
        avatar: selectedAvatar,
        power: 'rainbow'
    };
    
    addMessage(messageData);
}

function sparkleEffect(args) {
    addPowerEffect('sparkle');
    addSystemMessage('Sparkle effect activated!');
}

function fireEffect(args) {
    addPowerEffect('fire');
    addSystemMessage('Fire effect activated!');
}

function iceEffect(args) {
    addPowerEffect('ice');
    addSystemMessage('Ice effect activated!');
}

function lightningEffect(args) {
    addPowerEffect('lightning');
    addSystemMessage('Lightning effect activated!');
}

function starEffect(args) {
    addPowerEffect('star');
    addSystemMessage('Star effect activated!');
}

function diamondEffect(args) {
    addPowerEffect('diamond');
    addSystemMessage('Diamond effect activated!');
}

function musicNoteEffect(args) {
    addPowerEffect('musicnote');
    addSystemMessage('Music note effect activated!');
}

function dramaEffect(args) {
    addPowerEffect('drama');
    addSystemMessage('Drama effect activated!');
}

// Activate power by name
function activatePowerByName(powerName) {
    const power = allPowers.find(p => p.name === powerName);
    if (!power) {
        addSystemMessage(`Power '${powerName}' not found.`);
                return;
    }
    
    if (currentUser.xats < power.cost) {
        addSystemMessage(`You need ${power.cost} xats to use ${power.name}.`);
                        return;
    }
    
    selectedPower = power;
    currentUser.xats -= power.cost;
    updateUserInfo();
    addPowerEffect('power-activate');
    addSystemMessage(`${power.name} power activated! (Cost: ${power.cost} xats)`);
}

// Update user info display
function updateUserInfo() {
    userInfo.innerHTML = `
        <span class="username">
            <img src="/avatars/${currentUser.avatar}.png" class="user-avatar-small" onerror="this.style.display='none'">
            ${currentUser.username} (Level ${currentUser.level})
        </span>
        <span class="xats">💰 ${currentUser.xats} xats</span>
    `;
}

// Add message to chat with enhanced formatting
function addMessage(messageData) {
    const messageElement = document.createElement('div');
    messageElement.className = 'message-item';
    
    let content = formatMessage(messageData.content);
    
    // Apply power effects
    if (messageData.power) {
        content = applyPowerEffect(content, messageData.power);
        messageElement.classList.add('power-message');
    }
    
    // Handle action messages
    if (messageData.isAction) {
        messageElement.classList.add('action-message');
        messageElement.innerHTML = `
            <div class="message-content action-content">
                ${content}
            </div>
        `;
                } else {
        messageElement.innerHTML = `
            <div class="message-header">
                <span class="message-username">
                    <img src="/avatars/${messageData.avatar}.png" class="message-avatar" onerror="this.style.display='none'">
                    ${messageData.user.username}
                </span>
                <span class="message-time">${formatTime(messageData.timestamp)}</span>
            </div>
            <div class="message-content">${content}</div>
        `;
    }

    messageList.appendChild(messageElement);
    scrollToBottom();

    // Add power effects to message if power is active
    if (messageData.power) {
        messageElement.style.animation = 'rainbow 2s infinite';
    }
}

// Apply power effects to text
function applyPowerEffect(text, powerName) {
    switch (powerName) {
        case 'rainbow':
            return `<span class="rainbow-text">${text}</span>`;
        case 'sparkle':
            return `<span class="sparkle-text">${text} ✨</span>`;
        case 'fire':
            return `<span class="fire-text">${text} 🔥</span>`;
        case 'ice':
            return `<span class="ice-text">${text} ❄️</span>`;
        case 'lightning':
            return `<span class="lightning-text">${text} ⚡</span>`;
        case 'star':
            return `<span class="star-text">${text} ⭐</span>`;
        case 'diamond':
            return `<span class="diamond-text">${text} 💎</span>`;
        case 'musicnote':
            return `<span class="musicnote-text">${text} 🎵</span>`;
        case 'drama':
            return `<span class="drama-text">${text} 🎭</span>`;
        default:
            return text;
    }
}

// Format message content with enhanced smiley support
function formatMessage(content) {
    // Convert text smilies to emojis
    let formatted = content;
    Object.entries(SMILEYS).forEach(([text, data]) => {
        formatted = formatted.replace(new RegExp(text, 'gi'), data.emoji);
    });

    return formatted;
}

// Insert smiley into input
function insertSmiley(smiley) {
    const cursorPos = messageInput.selectionStart;
    const textBefore = messageInput.value.substring(0, cursorPos);
    const textAfter = messageInput.value.substring(cursorPos);
    
    messageInput.value = textBefore + smiley + textAfter;
    messageInput.focus();
    messageInput.setSelectionRange(cursorPos + smiley.length, cursorPos + smiley.length);
}

// Join room with enhanced functionality
function joinRoom(roomName) {
    if (!roomName) return;
    
    currentRoom = roomName;
    
    // Update room info
    const roomInfo = document.getElementById('room-info');
    roomInfo.innerHTML = `
        <h4>🎮 ${roomName.charAt(0).toUpperCase() + roomName.slice(1)}</h4>
        <span class="user-count">👥 ${Math.floor(Math.random() * 50) + 5} users</span>
    `;

    // Clear messages and add welcome message
    messageList.innerHTML = `
        <div class="welcome-message">
            <h2>🌟 Welcome to ${roomName.charAt(0).toUpperCase() + roomName.slice(1)}! 🌟</h2>
            <p>You've joined the ${roomName} room</p>
            <div class="classic-features">
                <span>🎭 Avatars</span>
                <span>✨ Powers</span>
                <span>😊 Smilies</span>
                <span>🎵 Music</span>
                <span>⚡ Commands</span>
            </div>
        </div>
    `;

    // Update user list
    updateUserList();

    // Add join effect
    addPowerEffect('room-join');
    
    addSystemMessage(`You joined ${roomName}. Type /help for commands.`);
}

// Update user list with enhanced data
function updateUserList() {
    const users = [
        { name: 'ChatMaster', avatar: '1759', level: 99, isMod: true },
        { name: 'CoolUser', avatar: '998', level: 45 },
        { name: 'Gamer123', avatar: '999', level: 32 },
        { name: 'MusicLover', avatar: '994', level: 28 },
        { name: 'AnimeFan', avatar: '995', level: 15 }
    ];

    userList.innerHTML = users.map(user => `
        <div class="user-item">
            <img src="/avatars/${user.avatar}.png" class="user-avatar" onerror="this.style.display='none'">
            <span class="user-name">${user.name}</span>
            <span class="user-level">(Level ${user.level})</span>
            ${user.isMod ? '<span class="user-mod">👑</span>' : ''}
        </div>
    `).join('');
}

// Change background with enhanced themes
function changeBackground(background) {
    const body = document.body;
    
    switch (background) {
        case 'space':
            body.style.background = 'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%)';
                        break;
        case 'nature':
            body.style.background = 'linear-gradient(135deg, #2d5016 0%, #4a7c59 50%, #7fb069 100%)';
        break;
        case 'abstract':
            body.style.background = 'linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 50%, #45b7d1 100%)';
                            break;
        case 'neon':
            body.style.background = 'linear-gradient(135deg, #ff006e 0%, #8338ec 50%, #3a86ff 100%)';
                            break;
        case 'retro':
            body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                            break;
        default:
            body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
}

// Update user avatar
function updateUserAvatar() {
    if (currentUser) {
        currentUser.avatar = selectedAvatar;
        userInfo.innerHTML = `
            <span class="username">
                <img src="/avatars/${selectedAvatar}.png" class="user-avatar-small" onerror="this.style.display='none'">
                ${currentUser.username} (Level ${currentUser.level})
            </span>
            <span class="xats">💰 ${currentUser.xats} xats</span>
        `;
    }
}

// Enhanced power effects system
function addPowerEffect(type) {
    if (!effectsEnabled) return;

    const effect = document.createElement('div');
    effect.className = 'power-effect';
    
    switch (type) {
        case 'power-activate':
            effect.innerHTML = getPowerIcon(selectedPower?.name || 'sparkle');
            effect.style.fontSize = '48px';
            effect.style.left = Math.random() * 80 + 10 + '%';
            effect.style.top = Math.random() * 80 + 10 + '%';
                                break;
        case 'message-send':
            effect.innerHTML = '✨';
            effect.style.fontSize = '32px';
            effect.style.left = '50%';
            effect.style.top = '50%';
            effect.style.transform = 'translate(-50%, -50%)';
            break;
        case 'room-join':
            effect.innerHTML = '🚀';
            effect.style.fontSize = '40px';
            effect.style.left = '50%';
            effect.style.top = '20%';
            effect.style.transform = 'translateX(-50%)';
            break;
        case 'avatar-change':
            effect.innerHTML = '🔄';
            effect.style.fontSize = '36px';
            effect.style.left = '80%';
            effect.style.top = '10%';
            break;
        case 'music-start':
            effect.innerHTML = '🎵';
            effect.style.fontSize = '44px';
            effect.style.left = '20%';
            effect.style.top = '80%';
            break;
        case 'sparkle':
            effect.innerHTML = '✨';
            effect.style.fontSize = '32px';
            effect.style.left = Math.random() * 80 + 10 + '%';
            effect.style.top = Math.random() * 80 + 10 + '%';
            break;
        case 'fire':
            effect.innerHTML = '🔥';
            effect.style.fontSize = '40px';
            effect.style.left = Math.random() * 80 + 10 + '%';
            effect.style.top = Math.random() * 80 + 10 + '%';
            break;
        case 'ice':
            effect.innerHTML = '❄️';
            effect.style.fontSize = '40px';
            effect.style.left = Math.random() * 80 + 10 + '%';
            effect.style.top = Math.random() * 80 + 10 + '%';
            break;
        case 'lightning':
            effect.innerHTML = '⚡';
            effect.style.fontSize = '44px';
            effect.style.left = Math.random() * 80 + 10 + '%';
            effect.style.top = Math.random() * 80 + 10 + '%';
            break;
        case 'star':
            effect.innerHTML = '⭐';
            effect.style.fontSize = '36px';
            effect.style.left = Math.random() * 80 + 10 + '%';
            effect.style.top = Math.random() * 80 + 10 + '%';
            break;
        case 'diamond':
            effect.innerHTML = '💎';
            effect.style.fontSize = '48px';
            effect.style.left = Math.random() * 80 + 10 + '%';
            effect.style.top = Math.random() * 80 + 10 + '%';
            break;
        case 'musicnote':
            effect.innerHTML = '🎵';
            effect.style.fontSize = '40px';
            effect.style.left = Math.random() * 80 + 10 + '%';
            effect.style.top = Math.random() * 80 + 10 + '%';
            break;
        case 'drama':
            effect.innerHTML = '🎭';
            effect.style.fontSize = '40px';
            effect.style.left = Math.random() * 80 + 10 + '%';
            effect.style.top = Math.random() * 80 + 10 + '%';
                                    break;
                                }

    powerAnimations.appendChild(effect);
    
    // Remove effect after animation
    setTimeout(() => {
        if (effect.parentNode) {
            effect.parentNode.removeChild(effect);
        }
    }, 3000);
}

// Add system message
function addSystemMessage(content) {
    const messageElement = document.createElement('div');
    messageElement.className = 'message-item system-message';
    messageElement.innerHTML = `
        <div class="message-content" style="text-align: center; font-style: italic; color: #7f8c8d;">
            ${content}
        </div>
    `;

    messageList.appendChild(messageElement);
    scrollToBottom();
}

// Show typing indicator
function showTypingIndicator() {
    typingIndicator.style.display = 'flex';
    scrollToBottom();
}

// Hide typing indicator
function hideTypingIndicator() {
    typingIndicator.style.display = 'none';
}

// Scroll to bottom
function scrollToBottom() {
    const messagesArea = document.querySelector('.classic-messages-area');
    messagesArea.scrollTop = messagesArea.scrollHeight;
}

// Format time
function formatTime(date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Play sound effect
function playSound(type) {
    // Create audio context for sound effects
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    switch (type) {
        case 'message':
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
            break;
        case 'power':
            oscillator.frequency.setValueAtTime(1200, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.2);
            break;
    }

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

// Load user preferences
function loadUserPreferences() {
    const savedSound = localStorage.getItem('xat-sound-enabled');
    const savedMusic = localStorage.getItem('xat-music-enabled');
    const savedEffects = localStorage.getItem('xat-effects-enabled');

    if (savedSound !== null) soundEnabled = savedSound === 'true';
    if (savedMusic !== null) musicEnabled = savedMusic === 'true';
    if (savedEffects !== null) effectsEnabled = savedEffects === 'true';
}

// Create sample messages for demo
function createSampleMessages() {
    const sampleMessages = [
        { user: 'ChatMaster', content: 'Welcome to the enhanced xat experience! 🌟', avatar: '1759', isMod: true },
        { user: 'CoolUser', content: 'This brings back memories! :D', avatar: '998' },
        { user: 'Gamer123', content: 'Anyone up for some retro gaming? 🎮', avatar: '999' },
        { user: 'MusicLover', content: 'The music player is working great! 🎵', avatar: '994' },
        { user: 'AnimeFan', content: 'Love the retro vibes here! <3', avatar: '995' }
    ];

    setTimeout(() => {
        sampleMessages.forEach((msg, index) => {
            setTimeout(() => {
                const messageData = {
                    id: 'sample_' + index,
                    user: { username: msg.user, avatar: msg.avatar, isMod: msg.isMod },
                    content: msg.content,
                    timestamp: new Date()
                };
                addMessage(messageData);
            }, index * 2000);
        });
    }, 2000);
}

// Add enhanced CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes rainbow {
    0% { color: #ff0000; }
    14% { color: #ff7f00; }
    28% { color: #ffff00; }
    42% { color: #00ff00; }
    57% { color: #0000ff; }
    71% { color: #4b0082; }
    85% { color: #9400d3; }
    100% { color: #ff0000; }
  }

  .power-message {
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4);
    background-size: 400% 400%;
    animation: gradientShift 2s ease infinite;
  }

  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .system-message {
    background: rgba(52, 152, 219, 0.1);
    border-left-color: #3498db;
  }

  .action-message {
    background: rgba(155, 89, 182, 0.1);
    border-left-color: #9b59b6;
  }

  .action-content {
    font-style: italic;
    color: #9b59b6;
  }

  .rainbow-text {
    animation: rainbow 2s infinite;
  }

  .sparkle-text {
    text-shadow: 0 0 10px #ffd700;
  }

  .fire-text {
    color: #ff4500;
    text-shadow: 0 0 10px #ff4500;
  }

  .ice-text {
    color: #00bfff;
    text-shadow: 0 0 10px #00bfff;
  }

  .lightning-text {
    color: #ffff00;
    text-shadow: 0 0 15px #ffff00;
  }

  .star-text {
    color: #ffd700;
    text-shadow: 0 0 10px #ffd700;
  }

  .diamond-text {
    color: #b9f2ff;
    text-shadow: 0 0 15px #b9f2ff;
  }

  .musicnote-text {
    color: #ff69b4;
    text-shadow: 0 0 10px #ff69b4;
  }

  .drama-text {
    color: #ff1493;
    text-shadow: 0 0 10px #ff1493;
  }

  .message-avatar {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-right: 8px;
    vertical-align: middle;
  }

  .user-avatar {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-right: 5px;
    vertical-align: middle;
  }

  .user-avatar-small {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    margin-right: 5px;
    vertical-align: middle;
  }

  .user-mod {
    color: #f39c12;
    font-weight: bold;
  }

  .power-item {
    cursor: pointer;
    padding: 5px;
    border-radius: 5px;
    transition: background-color 0.2s;
  }

  .power-item:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  .power-icon {
    font-size: 20px;
    margin-right: 5px;
  }

  .power-name {
    font-size: 12px;
  }

  .avatar-item {
    cursor: pointer;
    padding: 5px;
    border-radius: 5px;
    transition: background-color 0.2s;
    text-align: center;
  }

  .avatar-item:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  .avatar-item img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
`;
document.head.appendChild(style);

console.log('🌟 Enhanced Classic Xat Chat initialized with full power system! 🌟');
