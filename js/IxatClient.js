/**
 * 🎭 IXAT CLIENT - Authentic Flash Recreation
 * Based on Ixat Files analysis - exact 728x486 dimensions
 */

console.log('🎭 [FILE] IxatClient.js loaded - Authentic Flash Recreation');
console.log('🎭 [FILE] ================================================');
console.log('🎭 [FILE] THIS IS THE NEW AUTHENTIC FLASH RECREATION FILE - VERSION 3 - FORCE LOADED');
console.log('🎭 [FILE] ================================================');

// Immediate test to see if file is loaded
console.log('🎭 [FILE] Testing immediate execution...');
if (typeof window !== 'undefined') {
    console.log('🎭 [FILE] Window object available');
    console.log('🎭 [FILE] Document ready state:', document.readyState);
} else {
    console.log('🎭 [FILE] No window object');
}

class IxatClient {
    constructor(containerId, config = {}) {
        this.containerId = containerId;
        this.config = {
            width: 728,
            height: 486,
            roomName: 'Main Chat',
            background: 'http://oi60.tinypic.com/1r6io9.jpg',
            ...config
        };
        
        // Set initial chat group based on room name
        if (this.config.roomName) {
            const roomNameLower = this.config.roomName.toLowerCase();
            if (['lobby', 'help', 'test', 'chat', 'flirt', 'gaming', 'music', 'anime', 'random'].includes(roomNameLower)) {
                this.currentChatGroup = roomNameLower;
            }
        }
        
        this.elements = {};
        this.users = new Map(); // Store user data objects
        this.userElements = new Map(); // Store DOM elements
        this.socket = null;
        this.authenticated = false;
        this.currentUser = null;
        this.powers = [];
        this.currentTab = 'chat';
        this.pawns = []; // Available pawns/avatars
        this.selectedPawn = null; // Currently selected pawn
        this.privateMessages = {}; // Initialize private messages storage
        this.currentPrivateChatTarget = null; // Current private chat target

        this.games = [
            { id: 'doodle', name: 'Doodle', icon: '🎨', description: 'Draw and collaborate' },
            { id: 'hangman', name: 'Hangman', icon: '🎯', description: 'Guess the word' },
            { id: 'tictactoe', name: 'Tic Tac Toe', icon: '⭕', description: 'Classic X and O' },
            { id: 'quiz', name: 'Quiz', icon: '❓', description: 'Test your knowledge' },
            { id: 'rps', name: 'Rock Paper Scissors', icon: '✂️', description: 'Rock beats scissors' },
            { id: 'dice', name: 'Dice', icon: '🎲', description: 'Roll the dice' }
        ];
        this.activeGame = null;
        this.gamePlayers = new Map(); // Track players in each game
        this.gameStates = new Map(); // Store game state
        
        // Initialize
        this.init();
    }
    
    async init() {
        console.log('🎭 [CLIENT] Initializing authentic Flash recreation...');
        
        // Create UI first
        this.createAuthenticFlashUI();
            
            // Connect to server
            this.connectToServer();
    }
    
    createAuthenticFlashUI() {
        console.log('🎭 [CLIENT] Creating authentic Flash UI...');
        console.log('🎭 [CLIENT] ================================================');
        console.log('🎭 [CLIENT] THIS IS THE NEW AUTHENTIC FLASH RECREATION UI');
        console.log('🎭 [CLIENT] ================================================');
        
        // Get container
        this.container = document.getElementById(this.containerId);
        if (!this.container) {
            console.error('🎭 [CLIENT] Container not found:', this.containerId);
            return;
        }
        
        // Clear and set exact dimensions
        this.container.innerHTML = '';
        this.container.style.width = '728px';
        this.container.style.height = '486px';
        this.container.style.position = 'relative';
        this.container.style.overflow = 'hidden';
        this.container.style.backgroundColor = '#000000';
        this.container.style.fontFamily = 'Arial, sans-serif';
        this.container.style.fontSize = '13px';
        
        // Define chat groups (like the original iXat)
        this.chatGroups = [
            { id: 'lobby', name: 'Lobby', description: 'Main chat room' },
            { id: 'help', name: 'Help', description: 'Get help and support' },
            { id: 'flirt', name: 'Flirt', description: 'Romance and dating' },
            { id: 'test', name: 'Test', description: 'Testing and development' },
            { id: 'gaming', name: 'Gaming', description: 'Video games discussion' },
            { id: 'music', name: 'Music', description: 'Music and entertainment' },
            { id: 'anime', name: 'Anime', description: 'Anime and manga' },
            { id: 'random', name: 'Random', description: 'Random topics' }
        ];
        
        this.currentChatGroup = 'lobby';
        
        // Create background
        const background = document.createElement('div');
        background.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: url("${this.config.background}") center center / cover, linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 50%, #000000 100%);
            z-index: 1;
        `;
        this.container.appendChild(background);
        
        // Create TOP HEADER BAR (Dark blue with planet icon and navigation)
        this.elements.header = document.createElement('div');
        this.elements.header.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 30px;
            background: linear-gradient(to bottom, #1a3a5a 0%, #0d2a4a 50%, #0a1f3a 100%);
            border-bottom: 2px solid #0066cc;
            display: flex;
            align-items: center;
            padding: 0 10px;
            z-index: 10;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        `;
        
        // Planet icon and room name (left side)
        const roomTitle = document.createElement('div');
        roomTitle.style.cssText = `
            display: flex;
            align-items: center;
            color: #ffffff;
            font-size: 13px;
            font-weight: bold;
            margin-right: 20px;
            text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.8);
        `;
        roomTitle.innerHTML = `
            <span style="font-size: 16px; margin-right: 8px;">🪐</span>
            ${this.config.roomName || 'Main Chat'}
        `;
        this.elements.header.appendChild(roomTitle);
        
        // Navigation icons (right side)
        const navIcons = [
            { icon: '👥', label: 'groups', color: '#ff4444' },
            { icon: '🛍️', label: 'store', color: '#ffcc00' },
            { icon: '🪐', label: 'xat', color: '#0066cc' },
            { icon: '👥', label: 'group', color: '#00cc00' },
            { icon: '👤', label: 'account', color: '#00cc00' },
            { icon: '⬜', label: '', color: '#0066cc' },
            { icon: '🌐', label: '', color: '#0066cc' }
        ];
        
        navIcons.forEach(nav => {
            const navElement = document.createElement('div');
            navElement.style.cssText = `
                display: flex;
                align-items: center;
                margin-left: 15px;
                cursor: pointer;
                padding: 2px 6px;
                border-radius: 3px;
                transition: all 0.2s ease;
            `;
            navElement.innerHTML = `
                <span style="font-size: 14px; margin-right: 4px;">${nav.icon}</span>
                <span style="color: #ffffff; font-size: 11px; font-weight: bold;">${nav.label}</span>
            `;
            
            navElement.onmouseover = () => {
                navElement.style.background = 'rgba(255, 255, 255, 0.1)';
            };
            navElement.onmouseout = () => {
                navElement.style.background = 'transparent';
            };
            
            this.elements.header.appendChild(navElement);
        });
        
        this.container.appendChild(this.elements.header);
        
        // Create LEFT SIDEBAR - GAMES BAR (like original iXat)
        this.elements.leftSidebar = document.createElement('div');
        this.elements.leftSidebar.style.cssText = `
            position: absolute;
            top: 30px;
            left: 0;
            width: 120px;
            bottom: 40px;
            background: linear-gradient(to bottom, #2a2a2a 0%, #1a1a1a 100%);
            border-right: 2px solid #444444;
            display: flex;
            flex-direction: column;
            padding: 10px;
            z-index: 5;
        `;
        
        // Games bar title
        const gamesTitle = document.createElement('div');
        gamesTitle.style.cssText = `
            color: #ffffff;
            font-size: 12px;
            font-weight: bold;
            text-align: center;
            margin-bottom: 10px;
            padding: 5px;
            background: #0066cc;
            border-radius: 3px;
        `;
        gamesTitle.textContent = '🎮 GAMES';
        this.elements.leftSidebar.appendChild(gamesTitle);
        
        // Games buttons
        const games = [
            { icon: '🎨', name: 'Doodle', id: 'doodle' },
            { icon: '🎯', name: 'Hangman', id: 'hangman' },
            { icon: '⭕', name: 'Tic Tac Toe', id: 'tictactoe' },
            { icon: '❓', name: 'Quiz', id: 'quiz' },
            { icon: '✂️', name: 'RPS', id: 'rps' },
            { icon: '🎲', name: 'Dice', id: 'dice' }
        ];
        
        games.forEach(game => {
            const gameBtn = document.createElement('div');
            gameBtn.style.cssText = `
                background: #333333;
            border: 1px solid #444444;
                color: #ffffff;
                padding: 8px;
                margin-bottom: 5px;
                font-size: 11px;
                font-weight: bold;
                cursor: pointer;
                text-align: center;
                border-radius: 3px;
                transition: all 0.2s ease;
            `;
            gameBtn.innerHTML = `
                <div style="font-size: 16px; margin-bottom: 3px;">${game.icon}</div>
                <div>${game.name}</div>
            `;
            
            gameBtn.onmouseover = () => {
                gameBtn.style.background = '#444444';
                gameBtn.style.borderColor = '#0066cc';
            };
            gameBtn.onmouseout = () => {
                gameBtn.style.background = '#333333';
                gameBtn.style.borderColor = '#444444';
            };
            
            gameBtn.onclick = () => this.startGame({ id: game.id, name: game.name });
            this.elements.leftSidebar.appendChild(gameBtn);
        });
        
        // Chat groups section
        const chatGroupsTitle = document.createElement('div');
        chatGroupsTitle.style.cssText = `
            color: #ffffff;
            font-size: 12px;
            font-weight: bold;
            text-align: center;
            margin: 15px 0 10px 0;
            padding: 5px;
            background: #28a745;
            border-radius: 3px;
        `;
        chatGroupsTitle.textContent = '💬 CHATS';
        this.elements.leftSidebar.appendChild(chatGroupsTitle);
        
        // Chat group buttons
        this.chatGroups.forEach(group => {
            const groupBtn = document.createElement('div');
            groupBtn.style.cssText = `
                background: ${group.id === this.currentChatGroup ? '#28a745' : '#333333'};
                border: 1px solid #444444;
            color: #ffffff;
                padding: 6px 8px;
                margin-bottom: 3px;
                font-size: 10px;
                font-weight: bold;
                cursor: pointer;
                text-align: center;
                border-radius: 3px;
                transition: all 0.2s ease;
            `;
            groupBtn.textContent = group.name;
            
            groupBtn.onmouseover = () => {
                if (group.id !== this.currentChatGroup) {
                    groupBtn.style.background = '#444444';
                    groupBtn.style.borderColor = '#28a745';
                }
            };
            groupBtn.onmouseout = () => {
                if (group.id !== this.currentChatGroup) {
                    groupBtn.style.background = '#333333';
                    groupBtn.style.borderColor = '#444444';
                }
            };
            
            groupBtn.onclick = () => this.switchChatGroup(group.id);
            this.elements.leftSidebar.appendChild(groupBtn);
        });
        
        this.container.appendChild(this.elements.leftSidebar);
        
        // Create MAIN CHAT INTERFACE (Central gray frame)
        this.elements.mainChatArea = document.createElement('div');
        this.elements.mainChatArea.style.cssText = `
            position: absolute;
            top: 30px;
            left: 120px;
            right: 0;
            bottom: 40px;
            background: #2a2a2a;
            border: 2px solid #666666;
            display: flex;
            z-index: 5;
        `;
        
        // LEFT SIDE - Main chat display and input
        const leftSide = document.createElement('div');
        leftSide.style.cssText = `
            flex: 1;
            display: flex;
            flex-direction: column;
            padding: 10px;
        `;
        
        // Chat tabs bar
        this.elements.chatTabs = document.createElement('div');
        this.elements.chatTabs.style.cssText = `
            display: flex;
            margin-bottom: 5px;
            border-bottom: 1px solid #444444;
        `;
        
        // Main Chat tab
        this.elements.mainTab = document.createElement('div');
        this.elements.mainTab.style.cssText = `
            padding: 8px 15px;
            background: #0066cc;
            color: #ffffff;
            border: 1px solid #0066cc;
            border-bottom: none;
            cursor: pointer;
            font-size: 12px;
            font-weight: bold;
            border-radius: 4px 4px 0 0;
        `;
        this.elements.mainTab.textContent = 'Main';
        this.elements.mainTab.onclick = () => this.switchChatTab('main');
        this.elements.chatTabs.appendChild(this.elements.mainTab);
        
        // Private Chat tab (initially hidden)
        this.elements.pcTab = document.createElement('div');
        this.elements.pcTab.style.cssText = `
            padding: 8px 15px;
            background: #3a3a3a;
            color: #cccccc;
            border: 1px solid #555555;
            border-bottom: none;
            cursor: pointer;
            font-size: 12px;
            font-weight: bold;
            border-radius: 4px 4px 0 0;
            display: none;
        `;
        this.elements.pcTab.textContent = 'PC';
        this.elements.pcTab.onclick = () => this.switchChatTab('pc');
        this.elements.chatTabs.appendChild(this.elements.pcTab);
        
        leftSide.appendChild(this.elements.chatTabs);
        
        // Main chat display area
        this.elements.chatArea = document.createElement('div');
        this.elements.chatArea.style.cssText = `
            flex: 1;
            background: #1a1a1a;
            border: 1px solid #444444;
            margin-bottom: 10px;
            overflow-y: auto;
            padding: 10px;
            font-family: Arial, sans-serif;
            font-size: 12px;
            color: #ffffff;
            -webkit-user-select: text;
            -moz-user-select: text;
            -ms-user-select: text;
            user-select: text;
        `;
        leftSide.appendChild(this.elements.chatArea);
        
        // Private chat display area (initially hidden)
        this.elements.privateChatArea = document.createElement('div');
        this.elements.privateChatArea.style.cssText = `
            flex: 1;
            background: #1a1a1a;
            border: 1px solid #444444;
            margin-bottom: 10px;
            overflow-y: auto;
            padding: 10px;
            font-family: Arial, sans-serif;
            font-size: 12px;
            color: #ffffff;
            -webkit-user-select: text;
            -moz-user-select: text;
            -ms-user-select: text;
            user-select: text;
            display: none;
        `;
        leftSide.appendChild(this.elements.privateChatArea);
        
        // Private chat input area (initially hidden)
        this.elements.privateChatInput = document.createElement('div');
        this.elements.privateChatInput.style.cssText = `
            display: none;
            align-items: center;
            margin-bottom: 10px;
        `;
        
        const privateInputField = document.createElement('input');
        privateInputField.type = 'text';
        privateInputField.placeholder = 'Type your private message...';
        privateInputField.style.cssText = `
            flex: 1;
            background: #3a3a3a;
            border: 1px solid #555555;
            color: #ffffff;
            padding: 8px;
            font-size: 12px;
            outline: none;
            border-radius: 3px;
        `;
        
        const privateSendButton = document.createElement('button');
        privateSendButton.textContent = 'Send';
        privateSendButton.style.cssText = `
            background: linear-gradient(to bottom, #0066cc 0%, #0052a3 50%, #003d7a 100%);
            color: #ffffff;
            border: none;
            padding: 8px 15px;
            margin-left: 5px;
            cursor: pointer;
            border-radius: 3px;
            font-size: 12px;
            font-weight: bold;
        `;
        
        privateSendButton.onclick = () => {
            const message = privateInputField.value.trim();
            if (message && this.currentPrivateChatTarget) {
                // Create message data
                const messageData = {
                    from: this.currentUser?.nickname || 'You',
                    message: message,
                    timestamp: new Date().toLocaleTimeString(),
                    isReceived: false
                };
                
                // Store in message history
                const chatId = `pm_${this.currentPrivateChatTarget.id}`;
                if (!this.privateMessages[chatId]) {
                    this.privateMessages[chatId] = [];
                }
                this.privateMessages[chatId].push(messageData);
                
                // Limit messages
                if (this.privateMessages[chatId].length > 25) {
                    this.privateMessages[chatId].shift();
                }
                
                // Add message to tab
                this.addPrivateMessageToTab(messageData);
                
                // Send to server
                this.sendPrivateMessagePacket(this.currentPrivateChatTarget.id, message);
                
                // Clear input
                privateInputField.value = '';
            }
        };
        
        privateInputField.onkeypress = (e) => {
            if (e.key === 'Enter') {
                privateSendButton.click();
            }
        };
        
        this.elements.privateChatInput.appendChild(privateInputField);
        this.elements.privateChatInput.appendChild(privateSendButton);
        leftSide.appendChild(this.elements.privateChatInput);
        
        // Chat input area
        const inputArea = document.createElement('div');
        inputArea.style.cssText = `
            display: flex;
            align-items: center;
            background: #1a1a1a;
            border: 1px solid #444444;
            padding: 5px;
        `;
        
        const chatIcon = document.createElement('span');
        chatIcon.style.cssText = `
            color: #ffffff;
            font-size: 14px;
            margin-right: 8px;
        `;
        chatIcon.textContent = '💬';
        inputArea.appendChild(chatIcon);
        
        const roomNameLabel = document.createElement('span');
        roomNameLabel.style.cssText = `
            color: #ffffff;
            font-size: 12px;
            margin-right: 8px;
        `;
        roomNameLabel.textContent = this.config.roomName || 'Main Chat';
        inputArea.appendChild(roomNameLabel);
        
        this.elements.messageInput = document.createElement('input');
        this.elements.messageInput.type = 'text';
        this.elements.messageInput.placeholder = 'Type your message...';
        this.elements.messageInput.style.cssText = `
            flex: 1;
            background: #000000;
            border: 1px solid #666666;
            color: #ffffff;
            padding: 5px 8px;
            font-size: 12px;
            outline: none;
            -webkit-user-select: text;
            -moz-user-select: text;
            -ms-user-select: text;
            user-select: text;
        `;
        inputArea.appendChild(this.elements.messageInput);
        
        leftSide.appendChild(inputArea);
        
        // Smiley bar below input
        const smileyBar = document.createElement('div');
        smileyBar.style.cssText = `
            display: flex;
            align-items: center;
            margin-top: 5px;
            gap: 3px;
        `;
        
        const smilies = ['😊', '😂', '😍', '😎', '😢', '😡', '😴', '😇', '🤔', '😋', '🎱', '💰', '🎵'];
        smilies.forEach(smiley => {
            const smileyElement = document.createElement('span');
            smileyElement.style.cssText = `
                font-size: 16px;
                cursor: pointer;
                padding: 2px;
                border-radius: 2px;
                transition: all 0.2s ease;
            `;
            smileyElement.textContent = smiley;
            
            smileyElement.onmouseover = () => {
                smileyElement.style.background = 'rgba(255, 255, 255, 0.2)';
            };
            smileyElement.onmouseout = () => {
                smileyElement.style.background = 'transparent';
            };
            
            smileyElement.onclick = () => this.insertSmiley(smiley);
            smileyBar.appendChild(smileyElement);
        });
        
        leftSide.appendChild(smileyBar);
        this.elements.mainChatArea.appendChild(leftSide);
        
        // RIGHT SIDE - VIP/Club/Chum tabs and user list
        const rightSide = document.createElement('div');
        rightSide.style.cssText = `
            width: 200px;
            display: flex;
            flex-direction: column;
            background: #1a1a1a;
            border-left: 1px solid #444444;
        `;
        

        
        // User list area (ABOVE the tabs)
        this.elements.userList = document.createElement('div');
        this.elements.userList.style.cssText = `
            flex: 1;
            background: #1a1a1a;
            border-top: 1px solid #444444;
            padding: 5px;
            overflow-y: auto;
            font-family: Arial, sans-serif;
            font-size: 11px;
        `;
        rightSide.appendChild(this.elements.userList);
        
        // Visitors/Friends tabs (BELOW the user list)
        const userTabs = document.createElement('div');
        userTabs.style.cssText = `
            display: flex;
            margin-top: 10px;
        `;
        
        const visitorsTab = document.createElement('div');
        visitorsTab.style.cssText = `
            flex: 1;
            background: #2a2a2a;
            color: #ffffff;
            padding: 5px;
            text-align: center;
            font-size: 11px;
            font-weight: bold;
            border: 1px solid #444444;
            cursor: pointer;
        `;
        visitorsTab.textContent = 'Visitors';
        userTabs.appendChild(visitorsTab);
        
        const friendsTab = document.createElement('div');
        friendsTab.style.cssText = `
            flex: 1;
            background: #1a1a1a;
            color: #cccccc;
            padding: 5px;
            text-align: center;
            font-size: 11px;
            font-weight: bold;
            border: 1px solid #444444;
            cursor: pointer;
        `;
        friendsTab.textContent = 'Friends';
        userTabs.appendChild(friendsTab);
        
        rightSide.appendChild(userTabs);
        
        // User list will be populated when users join
        
        // Bottom buttons
        const bottomButtons = document.createElement('div');
        bottomButtons.style.cssText = `
            display: flex;
            flex-direction: column;
            padding: 5px;
            gap: 3px;
        `;
        
        const editButton = document.createElement('div');
        editButton.style.cssText = `
            background: #2a2a2a;
            border: 1px solid #444444;
            color: #ffffff;
            padding: 5px 8px;
            font-size: 11px;
            font-weight: bold;
            cursor: pointer;
            text-align: center;
        `;
        editButton.textContent = 'Edit Your Chat';
        bottomButtons.appendChild(editButton);
        
        const signOutButton = document.createElement('div');
        signOutButton.style.cssText = `
            background: #2a2a2a;
            border: 1px solid #444444;
            color: #ffffff;
            padding: 5px 8px;
            font-size: 11px;
            font-weight: bold;
            cursor: pointer;
            text-align: center;
        `;
        signOutButton.textContent = 'Sign Out';
        bottomButtons.appendChild(signOutButton);
        
        rightSide.appendChild(bottomButtons);
        this.elements.mainChatArea.appendChild(rightSide);
        
        this.container.appendChild(this.elements.mainChatArea);
        
        // Create BOTTOM BAR (Celebration power)
        this.elements.bottomBar = document.createElement('div');
        this.elements.bottomBar.style.cssText = `
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 40px;
            background: linear-gradient(to bottom, #1a3a5a 0%, #0d2a4a 50%, #0a1f3a 100%);
            border-top: 2px solid #0066cc;
            display: flex;
            align-items: center;
            padding: 0 10px;
            z-index: 10;
        `;
        
        const celebrateText = document.createElement('div');
        celebrateText.style.cssText = `
            color: #ffffff;
            font-size: 12px;
            font-weight: bold;
            margin-right: 15px;
        `;
        celebrateText.textContent = 'CELEBRATE power';
        this.elements.bottomBar.appendChild(celebrateText);
        
        // Celebration emoticons
        const celebrationEmojis = ['👍', '🎉', '🏁', '🎩', '🎓', '🎺', '🎊', '🎈'];
        celebrationEmojis.forEach(emoji => {
            const emojiElement = document.createElement('span');
            emojiElement.style.cssText = `
                font-size: 16px;
                margin-right: 8px;
                cursor: pointer;
                padding: 2px;
                border-radius: 2px;
            transition: all 0.2s ease;
        `;
            emojiElement.textContent = emoji;
            
            emojiElement.onmouseover = () => {
                emojiElement.style.background = 'rgba(255, 255, 255, 0.1)';
            };
            emojiElement.onmouseout = () => {
                emojiElement.style.background = 'transparent';
            };
            
            this.elements.bottomBar.appendChild(emojiElement);
        });
        
        this.container.appendChild(this.elements.bottomBar);
        
        // Set up message input handler
        this.elements.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
        
        console.log('🎭 [CLIENT] Authentic Flash UI created successfully');
        console.log('🎭 [CLIENT] Container children count:', this.container.children.length);
        console.log('🎭 [CLIENT] Header element exists:', !!this.elements.header);
        console.log('🎭 [CLIENT] Header children count:', this.elements.header.children.length);
        console.log('🎭 [CLIENT] Final container HTML:', this.container.innerHTML.substring(0, 500) + '...');
    }
    
    setupEventListeners() {
        // Message input
        this.elements.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
        
        // Message input hover effects
        this.elements.messageInput.addEventListener('focus', () => {
            this.elements.messageInput.style.borderColor = '#0066cc';
            this.elements.messageInput.style.boxShadow = 'inset 0 1px 3px rgba(0, 0, 0, 0.5), 0 0 5px rgba(0, 102, 204, 0.3)';
        });
        
        this.elements.messageInput.addEventListener('blur', () => {
            this.elements.messageInput.style.borderColor = '#555555';
            this.elements.messageInput.style.boxShadow = 'inset 0 1px 3px rgba(0, 0, 0, 0.5)';
        });
        
        // Send button
        this.elements.sendButton.addEventListener('click', () => {
            this.sendMessage();
        });
        
        // Send button hover effects
        this.elements.sendButton.addEventListener('mouseover', () => {
            this.elements.sendButton.style.background = 'linear-gradient(to bottom, #0077ee 0%, #0066cc 50%, #0052a3 100%)';
            this.elements.sendButton.style.transform = 'translateY(-1px)';
            this.elements.sendButton.style.boxShadow = '0 3px 6px rgba(0, 0, 0, 0.4)';
        });
        
        this.elements.sendButton.addEventListener('mouseout', () => {
            this.elements.sendButton.style.background = 'linear-gradient(to bottom, #0066cc 0%, #0052a3 50%, #003d7a 100%)';
            this.elements.sendButton.style.transform = 'translateY(0)';
            this.elements.sendButton.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.3)';
        });
        
        // Get Chat button
        this.elements.getChatButton.addEventListener('click', () => {
            window.open('/groups.html', '_blank');
        });
        
        this.elements.getChatButton.addEventListener('mouseover', () => {
            this.elements.getChatButton.style.background = 'linear-gradient(to bottom, #444444 0%, #333333 50%, #222222 100%)';
            this.elements.getChatButton.style.transform = 'translateY(-1px)';
            this.elements.getChatButton.style.boxShadow = '0 3px 6px rgba(0, 0, 0, 0.4)';
        });
        
        this.elements.getChatButton.addEventListener('mouseout', () => {
            this.elements.getChatButton.style.background = 'linear-gradient(to bottom, #333333 0%, #222222 50%, #111111 100%)';
            this.elements.getChatButton.style.transform = 'translateY(0)';
            this.elements.getChatButton.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.3)';
        });
        
        // Sign Out button
        this.elements.signOutButton.addEventListener('click', () => {
            if (confirm('Are you sure you want to sign out?')) {
                localStorage.removeItem('authToken');
                localStorage.removeItem('userData');
                window.location.href = '/auth.html';
            }
        });
        
        this.elements.signOutButton.addEventListener('mouseover', () => {
            this.elements.signOutButton.style.background = 'linear-gradient(to bottom, #dd4444 0%, #cc3333 50%, #bb2222 100%)';
            this.elements.signOutButton.style.transform = 'translateY(-1px)';
            this.elements.signOutButton.style.boxShadow = '0 3px 6px rgba(0, 0, 0, 0.4)';
        });
        
        this.elements.signOutButton.addEventListener('mouseout', () => {
            this.elements.signOutButton.style.background = 'linear-gradient(to bottom, #cc3333 0%, #aa2222 50%, #881111 100%)';
            this.elements.signOutButton.style.transform = 'translateY(0)';
            this.elements.signOutButton.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.3)';
        });
        
        // User list clicks
        this.elements.userList.addEventListener('click', (e) => {
            const userElement = e.target.closest('.user-item');
            if (userElement) {
                const userId = userElement.dataset.userId;
                if (userId) {
                this.showUserProfile(userId);
                }
            }
        });
    }
    
    switchTab(tabId) {
        console.log('🎭 [CLIENT] Switching to tab:', tabId);
        
        // Update tab appearance
        const tabs = this.elements.header.querySelectorAll('div');
        tabs.forEach((tab, index) => {
            if (index < 8) { // First 8 elements are tabs
                const isActive = tab.textContent.toLowerCase().includes(tabId);
                tab.style.background = isActive ? '#0066ff' : 'transparent';
                tab.style.color = isActive ? '#ffffff' : '#cccccc';
            }
        });
        
        // Handle tab content
        switch (tabId) {
            case 'chat':
                this.showChatTab();
                break;
            case 'smilies':
                this.showSmiliesTab();
                break;
            case 'radio':
                this.showRadioTab();
                break;
            case '8ball':
                this.show8BallTab();
                break;
            case 'friends':
                this.showFriendsTab();
                break;
            case 'visitors':
                this.showVisitorsTab();
                break;
            case 'getchat':
                this.showGetChatTab();
                break;
            case 'signin':
                this.showSignInTab();
                break;
        }
    }
    
    showChatTab() {
        this.elements.chatArea.style.display = 'block';
        this.elements.userList.style.display = 'block';
    }
    
    showSmiliesTab() {
        this.elements.chatArea.style.display = 'none';
        this.elements.userList.style.display = 'none';
        
        const smiliesPanel = document.createElement('div');
        smiliesPanel.style.cssText = `
            position: absolute;
            top: 30px;
            left: 0;
            right: 0;
            bottom: 60px;
            background: rgba(0, 0, 0, 0.9);
            padding: 20px;
            overflow-y: auto;
            z-index: 5;
        `;
        
        smiliesPanel.innerHTML = `
            <h3 style="color: #ffcc00; margin-bottom: 20px;">😊 Smilies</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(80px, 1fr)); gap: 5px;">
                <button onclick="window.ixatClient.insertSmiley('(hi)')" style="padding: 5px; background: #2a2a2a; border: 1px solid #444; color: white; cursor: pointer;">(hi)</button>
                <button onclick="window.ixatClient.insertSmiley('(bye)')" style="padding: 5px; background: #2a2a2a; border: 1px solid #444; color: white; cursor: pointer;">(bye)</button>
                <button onclick="window.ixatClient.insertSmiley('(yes)')" style="padding: 5px; background: #2a2a2a; border: 1px solid #444; color: white; cursor: pointer;">(yes)</button>
                <button onclick="window.ixatClient.insertSmiley('(no)')" style="padding: 5px; background: #2a2a2a; border: 1px solid #444; color: white; cursor: pointer;">(no)</button>
                <button onclick="window.ixatClient.insertSmiley('(cool)')" style="padding: 5px; background: #2a2a2a; border: 1px solid #444; color: white; cursor: pointer;">(cool)</button>
                <button onclick="window.ixatClient.insertSmiley('(love)')" style="padding: 5px; background: #2a2a2a; border: 1px solid #444; color: white; cursor: pointer;">(love)</button>
                <button onclick="window.ixatClient.insertSmiley('(kiss)')" style="padding: 5px; background: #2a2a2a; border: 1px solid #444; color: white; cursor: pointer;">(kiss)</button>
                <button onclick="window.ixatClient.insertSmiley('(hug)')" style="padding: 5px; background: #2a2a2a; border: 1px solid #444; color: white; cursor: pointer;">(hug)</button>
                <button onclick="window.ixatClient.insertSmiley('(cry)')" style="padding: 5px; background: #2a2a2a; border: 1px solid #444; color: white; cursor: pointer;">(cry)</button>
                <button onclick="window.ixatClient.insertSmiley('(laugh)')" style="padding: 5px; background: #2a2a2a; border: 1px solid #444; color: white; cursor: pointer;">(laugh)</button>
            </div>
        `;
        
        // Remove existing panel and add new one
        const existingPanel = document.querySelector('.smilies-panel');
        if (existingPanel) existingPanel.remove();
        smiliesPanel.className = 'smilies-panel';
        this.container.appendChild(smiliesPanel);
    }
    
    showRadioTab() {
        this.elements.chatArea.style.display = 'none';
        this.elements.userList.style.display = 'none';
        
        const radioPanel = document.createElement('div');
        radioPanel.style.cssText = `
            position: absolute;
            top: 30px;
            left: 0;
            right: 0;
            bottom: 60px;
            background: rgba(0, 0, 0, 0.9);
            padding: 20px;
            z-index: 5;
        `;
        
        radioPanel.innerHTML = `
            <h3 style="color: #ffcc00; margin-bottom: 20px;">🎵 Radio</h3>
            <div style="margin-bottom: 20px;">
                <label style="color: white; display: block; margin-bottom: 5px;">Radio URL:</label>
                <input type="text" id="radioUrl" placeholder="http://relay.181.fm:8128" style="width: 100%; padding: 8px; background: #2a2a2a; border: 1px solid #444; color: white; border-radius: 3px;">
            </div>
            <div>
                <button onclick="window.ixatClient.playRadio()" style="padding: 10px 20px; background: #0066ff; color: white; border: none; border-radius: 3px; cursor: pointer; margin-right: 10px;">▶️ Play</button>
                <button onclick="window.ixatClient.stopRadio()" style="padding: 10px 20px; background: #dc3545; color: white; border: none; border-radius: 3px; cursor: pointer;">⏹️ Stop</button>
            </div>
        `;
        
        const existingPanel = document.querySelector('.radio-panel');
        if (existingPanel) existingPanel.remove();
        radioPanel.className = 'radio-panel';
        this.container.appendChild(radioPanel);
    }
    
    show8BallTab() {
        this.elements.chatArea.style.display = 'none';
        this.elements.userList.style.display = 'none';
        
        const ballPanel = document.createElement('div');
        ballPanel.style.cssText = `
            position: absolute;
            top: 30px;
            left: 0;
            right: 0;
            bottom: 60px;
            background: rgba(0, 0, 0, 0.9);
            padding: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 5;
        `;
        
        ballPanel.innerHTML = `
            <div style="text-align: center;">
                <div style="width: 200px; height: 200px; background: radial-gradient(circle, #000, #333); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; border: 3px solid #666;">
                    <div id="8ballAnswer" style="color: white; font-size: 16px; text-align: center; padding: 20px;">Ask the Magic 8-Ball</div>
                </div>
                <input type="text" id="8ballQuestion" placeholder="Ask a question..." style="width: 300px; padding: 10px; background: #2a2a2a; border: 1px solid #444; color: white; border-radius: 3px; margin-bottom: 10px;">
                <br>
                <button onclick="window.ixatClient.ask8Ball()" style="padding: 10px 20px; background: #0066ff; color: white; border: none; border-radius: 3px; cursor: pointer;">Ask 8-Ball</button>
            </div>
        `;
        
        const existingPanel = document.querySelector('.8ball-panel');
        if (existingPanel) existingPanel.remove();
        ballPanel.className = '8ball-panel';
        this.container.appendChild(ballPanel);
    }
    
    showFriendsTab() {
        this.elements.chatArea.style.display = 'none';
        this.elements.userList.style.display = 'none';
        
        const friendsPanel = document.createElement('div');
        friendsPanel.style.cssText = `
            position: absolute;
            top: 30px;
            left: 0;
            right: 0;
            bottom: 60px;
            background: rgba(0, 0, 0, 0.9);
            padding: 20px;
            z-index: 5;
        `;
        
        friendsPanel.innerHTML = `
            <h3 style="color: #ffcc00; margin-bottom: 20px;">👥 Friends</h3>
            <div style="color: #ccc; text-align: center; padding: 20px;">Friends list coming soon...</div>
        `;
        
        const existingPanel = document.querySelector('.friends-panel');
        if (existingPanel) existingPanel.remove();
        friendsPanel.className = 'friends-panel';
        this.container.appendChild(friendsPanel);
    }
    
    showVisitorsTab() {
        this.elements.chatArea.style.display = 'none';
        this.elements.userList.style.display = 'none';
        
        const visitorsPanel = document.createElement('div');
        visitorsPanel.style.cssText = `
            position: absolute;
            top: 30px;
            left: 0;
            right: 0;
            bottom: 60px;
            background: rgba(0, 0, 0, 0.9);
            padding: 20px;
            z-index: 5;
        `;
        
        visitorsPanel.innerHTML = `
            <h3 style="color: #ffcc00; margin-bottom: 20px;">👀 Visitors</h3>
            <div style="color: #ccc; text-align: center; padding: 20px;">Visitor statistics coming soon...</div>
        `;
        
        const existingPanel = document.querySelector('.visitors-panel');
        if (existingPanel) existingPanel.remove();
        visitorsPanel.className = 'visitors-panel';
        this.container.appendChild(visitorsPanel);
    }
    
    showGetChatTab() {
        this.elements.chatArea.style.display = 'none';
        this.elements.userList.style.display = 'none';
        
        const getChatPanel = document.createElement('div');
        getChatPanel.style.cssText = `
            position: absolute;
            top: 30px;
            left: 0;
            right: 0;
            bottom: 60px;
            background: rgba(0, 0, 0, 0.9);
            padding: 20px;
            z-index: 5;
        `;
        
        getChatPanel.innerHTML = `
            <h3 style="color: #ffcc00; margin-bottom: 20px;">🏠 Get a Chat</h3>
            <div style="color: #ccc; text-align: center; padding: 20px;">Chat creation coming soon...</div>
        `;
        
        const existingPanel = document.querySelector('.getchat-panel');
        if (existingPanel) existingPanel.remove();
        getChatPanel.className = 'getchat-panel';
        this.container.appendChild(getChatPanel);
    }
    
    showSignInTab() {
        this.elements.chatArea.style.display = 'none';
        this.elements.userList.style.display = 'none';
        
        const signInPanel = document.createElement('div');
        signInPanel.style.cssText = `
            position: absolute;
            top: 30px;
            left: 0;
            right: 0;
            bottom: 60px;
            background: rgba(0, 0, 0, 0.9);
            padding: 20px;
            z-index: 5;
        `;
        
        signInPanel.innerHTML = `
            <h3 style="color: #ffcc00; margin-bottom: 20px;">🔐 Sign In/Out</h3>
            <div style="color: #ccc; text-align: center; padding: 20px;">Authentication coming soon...</div>
        `;
        
        const existingPanel = document.querySelector('.signin-panel');
        if (existingPanel) existingPanel.remove();
        signInPanel.className = 'signin-panel';
        this.container.appendChild(signInPanel);
    }
    
    connectToServer() {
        console.log('🎭 [CLIENT] Connecting to server...');
        
        this.socket = io();
        
        this.socket.on('connect', () => {
            console.log('🎭 [CLIENT] Connected to server');
            this.authenticate();
        });
        
        this.socket.on('authenticated', (data) => {
            console.log('🎭 [CLIENT] Authenticated:', data);
            this.user = data.user;
            this.authenticated = true;
            
            // Store guest session data
            if (data.user.guest && data.sessionId) {
                localStorage.setItem('guestSessionId', data.sessionId);
                localStorage.setItem('guestName', data.user.nickname);
                localStorage.setItem('guestLevel', data.user.guestLevel || 1);
                localStorage.setItem('guestExperience', data.user.guestExperience || 0);
            }
            
            this.joinRoom();
        });
        
        // Handle guest level up
        this.socket.on('guestLevelUp', (data) => {
            console.log('🎭 [CLIENT] Guest leveled up!', data);
            this.showGuestLevelUp(data);
        });
        
        // Handle upgrade prompt
        this.socket.on('upgradePrompt', (data) => {
            console.log('🎭 [CLIENT] Upgrade prompt received:', data);
            this.showUpgradePrompt(data);
        });
        
        this.socket.on('userList', (data) => {
            console.log('🎭 [CLIENT] User list received:', data);
            this.updateUserList(data.users);
        });
        
        this.socket.on('userJoined', (data) => {
            console.log('🎭 [CLIENT] User joined:', data);
            this.addUser(data);
        });
        
        this.socket.on('userLeft', (data) => {
            console.log('🎭 [CLIENT] User left:', data);
            this.removeUser(data.id);
        });
        
        this.socket.on('message', (data) => {
            console.log('🎭 [CLIENT] Message received:', data);
            this.addMessage(data);
        });
        
        // Handle private messages
        this.socket.on('privateMessage', (data) => {
            console.log('🎭 [CLIENT] Private message received:', data);
            console.log('🎭 [CLIENT] Current user:', this.currentUser);
            this.handlePrivateMessage(data);
        });
        
        this.socket.on('privateMessageSent', (data) => {
            console.log('🎭 [CLIENT] Private message sent confirmation:', data);
            this.showPrivateMessageSent(data);
        });
        
        this.socket.on('error', (data) => {
            console.log('🎭 [CLIENT] Socket error:', data);
            alert('Error: ' + data.message);
        });
    }
    
    authenticate() {
        const token = localStorage.getItem('authToken');
        if (token && token !== 'undefined') {
            this.socket.emit('authenticate', { token });
        } else {
            // Check for existing guest session
            let guestSessionId = localStorage.getItem('guestSessionId');
            let guestName = localStorage.getItem('guestName');
            
            // If no existing session, create new guest
            if (!guestSessionId) {
                guestName = 'Guest' + Math.floor(Math.random() * 1000);
                guestSessionId = 'temp_' + Date.now();
            }
            
            this.socket.emit('authenticate', {
                guest: true,
                nickname: guestName,
                sessionId: guestSessionId
            });
        }
    }
    
    joinRoom() {
        if (!this.authenticated) return;
        
        this.socket.emit('joinRoom', {
            roomName: this.config.roomName
        });
    }
    
    sendMessage() {
        if (!this.authenticated) return;
        
        const message = this.elements.messageInput.value.trim();
        if (!message) return;
        
        this.socket.emit('message', { message });
        this.elements.messageInput.value = '';
    }
    
    insertSmiley(smiley) {
        const input = this.elements.messageInput;
        const start = input.selectionStart;
        const end = input.selectionEnd;
        const text = input.value;
        
        input.value = text.substring(0, start) + smiley + text.substring(end);
        input.selectionStart = input.selectionEnd = start + smiley.length;
        input.focus();
    }
    
    // Private Messaging System (based on iXat's implementation)
    startPrivateChat(targetUser) {
        console.log('🎭 [CLIENT] Starting private chat with:', targetUser);
        
        // Store the current private chat target
        this.currentPrivateChatTarget = targetUser;
        
        // Show the PC tab
        this.elements.pcTab.style.display = 'block';
        this.elements.pcTab.textContent = `PC (${targetUser.nickname})`;
        
        // Switch to PC tab
        this.switchChatTab('pc');
        
        // Load message history
        this.loadPrivateChatHistory();
    }
    
    createPrivateChatWindow(targetUser, chatId) {
        const privateChatWindow = document.createElement('div');
        privateChatWindow.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 400px;
            height: 300px;
            background: #2a2a2a;
            border: 1px solid #444444;
            border-radius: 4px;
            color: #ffffff;
            font-family: Arial, sans-serif;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
            display: none;
            flex-direction: column;
            z-index: 1001;
        `;
        
        privateChatWindow.innerHTML = `
            <div style="background: #1a1a1a; padding: 8px 12px; border-bottom: 1px solid #444444; display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 14px; font-weight: bold;">Private Chat with ${targetUser.nickname || targetUser.username}</span>
                <span id="close_${chatId}" style="color: #ffffff; font-size: 16px; cursor: pointer; font-weight: bold;">×</span>
            </div>
            
            <div id="pm_messages_${chatId}" style="flex: 1; padding: 10px; overflow-y: auto; background: #1a1a1a; margin: 5px; border: 1px solid #444444; border-radius: 2px;">
                <!-- Private messages will appear here -->
            </div>
            
            <div style="padding: 10px; display: flex; gap: 5px;">
                <input id="pm_input_${chatId}" type="text" placeholder="Type your message..." style="flex: 1; background: #3a3a3a; border: 1px solid #555555; color: #ffffff; padding: 8px; font-size: 12px; outline: none;">
                <button id="pm_send_${chatId}" style="background: #0066cc; border: none; color: #ffffff; padding: 8px 12px; cursor: pointer; font-size: 12px;">Send</button>
            </div>
        `;
        
        document.body.appendChild(privateChatWindow);
        this.elements.privateChats[chatId] = privateChatWindow;
        
        // Close button handler
        document.getElementById(`close_${chatId}`).onclick = () => {
            privateChatWindow.style.display = 'none';
        };
        
        // Send button handler
        document.getElementById(`pm_send_${chatId}`).onclick = () => {
            this.sendPrivateMessageToUser(targetUser, chatId);
        };
        
        // Enter key handler
        document.getElementById(`pm_input_${chatId}`).onkeypress = (e) => {
            if (e.key === 'Enter') {
                this.sendPrivateMessageToUser(targetUser, chatId);
            }
        };
        
        // Initialize empty message array for this chat
        if (!this.privateMessages) {
            this.privateMessages = {};
        }
        if (!this.privateMessages[chatId]) {
            this.privateMessages[chatId] = [];
        }
    }
    
    switchChatTab(tabType) {
        console.log('🎭 [CLIENT] Switching chat tab to:', tabType);
        
        if (tabType === 'main') {
            // Show main chat
            this.elements.chatArea.style.display = 'block';
            this.elements.privateChatArea.style.display = 'none';
            this.elements.privateChatInput.style.display = 'none';
            
            // Update tab styles
            this.elements.mainTab.style.background = '#0066cc';
            this.elements.mainTab.style.color = '#ffffff';
            this.elements.pcTab.style.background = '#3a3a3a';
            this.elements.pcTab.style.color = '#cccccc';
        } else if (tabType === 'pc') {
            // Show private chat
            this.elements.chatArea.style.display = 'none';
            this.elements.privateChatArea.style.display = 'block';
            this.elements.privateChatInput.style.display = 'flex';
            
            // Update tab styles
            this.elements.mainTab.style.background = '#3a3a3a';
            this.elements.mainTab.style.color = '#cccccc';
            this.elements.pcTab.style.background = '#0066cc';
            this.elements.pcTab.style.color = '#ffffff';
        }
    }
    
    loadPrivateChatHistory() {
        if (!this.currentPrivateChatTarget) {
            console.log('🎭 [CLIENT] No private chat target set');
            return;
        }
        
        const chatId = `pm_${this.currentPrivateChatTarget.id}`;
        console.log('🎭 [CLIENT] Loading private chat history for:', chatId);
        console.log('🎭 [CLIENT] Message history:', this.privateMessages[chatId]);
        
        // Clear existing messages
        this.elements.privateChatArea.innerHTML = '';
        
        // Initialize privateMessages if it doesn't exist
        if (!this.privateMessages) {
            this.privateMessages = {};
        }
        
        // Load all stored messages
        if (this.privateMessages[chatId] && this.privateMessages[chatId].length > 0) {
            this.privateMessages[chatId].forEach(messageData => {
                this.addPrivateMessageToTab(messageData);
            });
        } else {
            // Show welcome message if no history
            const welcomeMessage = document.createElement('div');
            welcomeMessage.style.cssText = `
                text-align: center;
                color: #888888;
                font-style: italic;
                margin-top: 20px;
            `;
            welcomeMessage.textContent = `Start a conversation with ${this.currentPrivateChatTarget.nickname}...`;
            this.elements.privateChatArea.appendChild(welcomeMessage);
        }
        
        // Scroll to bottom
        this.elements.privateChatArea.scrollTop = this.elements.privateChatArea.scrollHeight;
    }
    
    addPrivateMessageToTab(messageData) {
        const messageElement = document.createElement('div');
        messageElement.style.cssText = `
            margin-bottom: 8px;
            padding: 5px;
            background: #2a2a2a;
            border-radius: 3px;
        `;
        
        messageElement.innerHTML = `
            <div style="font-size: 11px; color: #888888; margin-bottom: 2px;">${messageData.timestamp}</div>
            <div style="font-weight: bold; color: #0066cc; margin-bottom: 2px;">${messageData.from}</div>
            <div style="color: #ffffff; word-wrap: break-word;">${messageData.message}</div>
        `;
        
        this.elements.privateChatArea.appendChild(messageElement);
        this.elements.privateChatArea.scrollTop = this.elements.privateChatArea.scrollHeight;
    }
    
    sendPrivateMessageToUser(targetUser, chatId) {
        const inputElement = document.getElementById(`pm_input_${chatId}`);
        const message = inputElement.value.trim();
        
        if (message) {
            // Create message data
            const messageData = {
                from: this.currentUser?.nickname || 'You',
                message: message,
                timestamp: new Date().toLocaleTimeString(),
                isReceived: false
            };
            
            // Store in message history
            if (!this.privateMessages[chatId]) {
                this.privateMessages[chatId] = [];
            }
            this.privateMessages[chatId].push(messageData);
            
            // Limit messages (like iXat did)
            if (this.privateMessages[chatId].length > 25) {
                this.privateMessages[chatId].shift();
            }
            
            // Add message to local chat display
            this.addPrivateMessage(chatId, messageData);
            
            // Send to server (simulate iXat's packet system)
            this.sendPrivateMessagePacket(targetUser.id, message);
            
            // Clear input
            inputElement.value = '';
        }
    }
    
    addPrivateMessage(chatId, messageData) {
        const messagesContainer = document.getElementById(`pm_messages_${chatId}`);
        const messageElement = document.createElement('div');
        messageElement.style.cssText = `
            margin-bottom: 8px;
            padding: 5px;
            background: #2a2a2a;
            border-radius: 3px;
        `;
        
        messageElement.innerHTML = `
            <div style="font-size: 11px; color: #888888; margin-bottom: 2px;">${messageData.timestamp}</div>
            <div style="font-weight: bold; color: #0066cc; margin-bottom: 2px;">${messageData.from}</div>
            <div style="color: #ffffff; word-wrap: break-word;">${messageData.message}</div>
        `;
        
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    sendPrivateMessagePacket(targetUserId, message) {
        // Simulate iXat's packet system: <p u="targetUserId" t="message" s="2" />
        const packet = {
            type: 'private_message',
            targetUserId: targetUserId,
            message: message,
            sender: this.currentUser?.id || 'guest'
        };
        
        console.log('🎭 [CLIENT] Sending private message packet:', packet);
        console.log('🎭 [CLIENT] Current user:', this.currentUser);
        console.log('🎭 [CLIENT] Target user ID:', targetUserId);
        console.log('🎭 [CLIENT] Are they the same?', this.currentUser?.id === targetUserId);
        
        // Send to server via Socket.IO
        if (this.socket) {
            this.socket.emit('private_message', packet);
        }
    }
    
    sendPrivateMessage(targetUser) {
        console.log('🎭 [CLIENT] Sending private message to:', targetUser);
        console.log('🎭 [CLIENT] Target user ID:', targetUser.id);
        console.log('🎭 [CLIENT] Current user ID:', this.currentUser?.id);
        
        // Create a simple private message input
        const message = prompt(`Send private message to ${targetUser.nickname || targetUser.username}:`);
        
        if (message && message.trim()) {
            console.log('🎭 [CLIENT] Sending private message:', message.trim(), 'to user ID:', targetUser.id);
            
            // Send private message that appears in main chat but only visible to sender and recipient
            this.socket.emit('privateMessage', {
                targetUsername: targetUser.nickname,
                message: message.trim()
            });
            
            // Show confirmation
            alert(`Private message sent to ${targetUser.nickname || targetUser.username}!`);
        }
    }
    
    // All the missing functionality methods
    addAsFriend(targetUser) {
        console.log('🎭 [CLIENT] Adding as friend:', targetUser);
        if (this.socket) {
            this.socket.emit('add_friend', { targetUserId: targetUser.id });
        }
        alert(`Friend request sent to ${targetUser.nickname || targetUser.username}!`);
    }
    
    ignoreUser(targetUser) {
        console.log('🎭 [CLIENT] Ignoring user:', targetUser);
        if (this.socket) {
            this.socket.emit('ignore_user', { targetUserId: targetUser.id });
        }
        alert(`You are now ignoring ${targetUser.nickname || targetUser.username}!`);
    }
    
    kickUser(targetUser) {
        console.log('🎭 [CLIENT] Kicking user:', targetUser);
        const reason = prompt(`Enter kick reason for ${targetUser.nickname || targetUser.username}:`);
        if (this.socket) {
            this.socket.emit('kick_user', { 
                targetUserId: targetUser.id, 
                reason: reason || 'No reason provided' 
            });
        }
        alert(`${targetUser.nickname || targetUser.username} has been kicked!`);
    }
    
    banUser(targetUser) {
        console.log('🎭 [CLIENT] Banning user:', targetUser);
        const reason = prompt(`Enter ban reason for ${targetUser.nickname || targetUser.username}:`);
        const duration = prompt(`Enter ban duration in hours (0 for permanent):`);
        if (this.socket) {
            this.socket.emit('ban_user', { 
                targetUserId: targetUser.id, 
                reason: reason || 'No reason provided',
                duration: parseInt(duration) || 0
            });
        }
        alert(`${targetUser.nickname || targetUser.username} has been banned!`);
    }
    
    makeUserGuest(targetUser) {
        console.log('🎭 [CLIENT] Making user guest:', targetUser);
        if (this.socket) {
            this.socket.emit('change_rank', { 
                targetUserId: targetUser.id, 
                newRank: 0 
            });
        }
        alert(`${targetUser.nickname || targetUser.username} is now a guest!`);
    }
    
    makeUserMember(targetUser) {
        console.log('🎭 [CLIENT] Making user member:', targetUser);
        if (this.socket) {
            this.socket.emit('change_rank', { 
                targetUserId: targetUser.id, 
                newRank: 1 
            });
        }
        alert(`${targetUser.nickname || targetUser.username} is now a member!`);
    }
    
    makeUserModerator(targetUser) {
        console.log('🎭 [CLIENT] Making user moderator:', targetUser);
        const duration = prompt(`Enter moderator duration in hours (0 for permanent):`);
        if (this.socket) {
            this.socket.emit('change_rank', { 
                targetUserId: targetUser.id, 
                newRank: 2,
                duration: parseInt(duration) || 0
            });
        }
        alert(`${targetUser.nickname || targetUser.username} is now a moderator!`);
    }
    
    makeUserOwner(targetUser) {
        console.log('🎭 [CLIENT] Making user owner:', targetUser);
        const duration = prompt(`Enter owner duration in hours (0 for permanent):`);
        if (this.socket) {
            this.socket.emit('change_rank', { 
                targetUserId: targetUser.id, 
                newRank: 3,
                duration: parseInt(duration) || 0
            });
        }
        alert(`${targetUser.nickname || targetUser.username} is now an owner!`);
    }
    
    divorceUser(targetUser) {
        console.log('🎭 [CLIENT] Divorcing user:', targetUser);
        const confirm = window.confirm(`Are you sure you want to divorce ${targetUser.nickname || targetUser.username}?`);
        if (confirm && this.socket) {
            this.socket.emit('divorce_user', { targetUserId: targetUser.id });
        }
        if (confirm) {
            alert(`You have divorced ${targetUser.nickname || targetUser.username}!`);
        }
    }
    
    transferOwnership(targetUser) {
        console.log('🎭 [CLIENT] Transferring ownership to:', targetUser);
        const confirm = window.confirm(`Are you sure you want to transfer ownership to ${targetUser.nickname || targetUser.username}? This action cannot be undone!`);
        if (confirm && this.socket) {
            this.socket.emit('transfer_ownership', { targetUserId: targetUser.id });
        }
        if (confirm) {
            alert(`Ownership transferred to ${targetUser.nickname || targetUser.username}!`);
        }
    }
    
    showUserPowers(targetUser) {
        console.log('🎭 [CLIENT] Showing user powers:', targetUser);
        // This would open a powers window for the user
        alert(`Powers window for ${targetUser.nickname || targetUser.username} - Coming soon!`);
    }
    
    handleRegularProfileAction(action, targetUser) {
        console.log('🎭 [CLIENT] Regular profile action:', action, 'for user:', targetUser);
        
        switch (action) {
            case 'privatechat':
                this.startPrivateChat(targetUser);
                break;
            case 'privatemessage':
                this.sendPrivateMessage(targetUser);
                break;
            case 'addfriend':
                this.addAsFriend(targetUser);
                break;
            case 'ignore':
                this.ignoreUser(targetUser);
                break;
            case 'marry':
                this.marryUser(targetUser);
                break;
            case 'transfer':
                this.transferToUser(targetUser);
                break;
            case 'powers':
                this.showUserPowers(targetUser);
                break;
            case 'gifts':
                this.showUserGifts(targetUser);
                break;
        }
    }
    
    marryUser(targetUser) {
        console.log('🎭 [CLIENT] Marrying user:', targetUser);
        const confirm = window.confirm(`Do you want to marry ${targetUser.nickname || targetUser.username}?`);
        if (confirm && this.socket) {
            this.socket.emit('marry_user', { targetUserId: targetUser.id });
        }
        if (confirm) {
            alert(`You are now married to ${targetUser.nickname || targetUser.username}!`);
        }
    }
    
    transferToUser(targetUser) {
        console.log('🎭 [CLIENT] Transferring to user:', targetUser);
        const amount = prompt(`Enter amount to transfer to ${targetUser.nickname || targetUser.username}:`);
        const type = prompt(`Enter transfer type (xats/powers):`);
        if (amount && type && this.socket) {
            this.socket.emit('transfer_to_user', { 
                targetUserId: targetUser.id,
                amount: parseInt(amount),
                type: type
            });
        }
        if (amount && type) {
            alert(`Transferred ${amount} ${type} to ${targetUser.nickname || targetUser.username}!`);
        }
    }
    
    showUserGifts(targetUser) {
        console.log('🎭 [CLIENT] Showing user gifts:', targetUser);
        alert(`Gifts window for ${targetUser.nickname || targetUser.username} - Coming soon!`);
    }
    
    // Pawns System (iXat Color Squares)
    loadPawns() {
        console.log('🎭 [CLIENT] Loading pawns...');
        
        // Pawns in iXat were 6-character hex color codes that created colored squares
        this.pawns = [
            { hex: '000000', name: 'Black', color: '#000000' },
            { hex: 'FFFFFF', name: 'White', color: '#FFFFFF' },
            { hex: 'FF0000', name: 'Red', color: '#FF0000' },
            { hex: '00FF00', name: 'Green', color: '#00FF00' },
            { hex: '0000FF', name: 'Blue', color: '#0000FF' },
            { hex: 'FFFF00', name: 'Yellow', color: '#FFFF00' },
            { hex: 'FF00FF', name: 'Magenta', color: '#FF00FF' },
            { hex: '00FFFF', name: 'Cyan', color: '#00FFFF' },
            { hex: 'FFA500', name: 'Orange', color: '#FFA500' },
            { hex: '800080', name: 'Purple', color: '#800080' },
            { hex: 'FFC0CB', name: 'Pink', color: '#FFC0CB' },
            { hex: 'A52A2A', name: 'Brown', color: '#A52A2A' },
            { hex: '808080', name: 'Gray', color: '#808080' },
            { hex: 'FFD700', name: 'Gold', color: '#FFD700' },
            { hex: 'C0C0C0', name: 'Silver', color: '#C0C0C0' },
            { hex: 'FF4500', name: 'Orange Red', color: '#FF4500' }
        ];
        
        console.log('🎭 [CLIENT] Loaded pawns:', this.pawns.length);
    }
    
    showPawnSelector() {
        console.log('🎭 [CLIENT] Showing pawn selector');
        
        // Create pawn selector modal
        if (!this.elements.pawnSelector) {
            this.elements.pawnSelector = document.createElement('div');
            this.elements.pawnSelector.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: none;
                justify-content: center;
                align-items: center;
                z-index: 1000;
            `;
            
            this.elements.pawnSelector.innerHTML = `
                <div style="background: #2a2a2a; border: 1px solid #444444; border-radius: 8px; width: 500px; max-height: 80vh; color: #ffffff; font-family: Arial, sans-serif; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5); overflow: hidden;">
                    <!-- Title Bar -->
                    <div style="background: #1a1a1a; padding: 15px 20px; border-bottom: 1px solid #444444; display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-size: 18px; font-weight: bold;">🎨 Select Your Pawn</span>
                        <span id="closePawnSelector" style="color: #ffffff; font-size: 20px; cursor: pointer; font-weight: bold;">×</span>
                    </div>
                    
                    <!-- Custom Hex Input -->
                    <div style="padding: 15px 20px; border-bottom: 1px solid #444444; background: #1a1a1a;">
                        <div style="display: flex; gap: 10px; align-items: center;">
                            <span style="font-size: 14px;">Custom Color:</span>
                            <input type="text" id="customPawnHex" placeholder="#000000" style="width: 100px; padding: 8px; border: 1px solid #444444; border-radius: 4px; background: #333333; color: #ffffff; font-family: monospace;">
                            <button id="applyCustomPawn" style="background: #0066cc; border: none; color: #ffffff; padding: 8px 15px; border-radius: 4px; cursor: pointer; font-size: 12px;">Apply</button>
                        </div>
                    </div>
                    
                    <!-- Pawns Grid -->
                    <div id="pawnsGrid" style="padding: 20px; max-height: 300px; overflow-y: auto; display: grid; grid-template-columns: repeat(auto-fill, minmax(60px, 1fr)); gap: 10px;">
                        <!-- Pawns will be loaded here -->
                    </div>
                    
                    <!-- Current Selection -->
                    <div style="padding: 15px 20px; border-top: 1px solid #444444; background: #1a1a1a;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span>Selected: <span id="selectedPawnName">None</span></span>
                            <button id="applyPawn" style="background: #0066cc; border: none; color: #ffffff; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-weight: bold;">Apply Pawn</button>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(this.elements.pawnSelector);
            
            // Close button handler
            document.getElementById('closePawnSelector').onclick = () => {
                this.elements.pawnSelector.style.display = 'none';
            };
            
            // Click outside to close
            this.elements.pawnSelector.onclick = (e) => {
                if (e.target === this.elements.pawnSelector) {
                    this.elements.pawnSelector.style.display = 'none';
                }
            };
            
            // Category filter handlers
            document.querySelectorAll('.pawn-category').forEach(btn => {
                btn.onclick = (e) => {
                    const category = e.target.dataset.category;
                    this.filterPawns(category);
                    
                    // Update active category button
                    document.querySelectorAll('.pawn-category').forEach(b => {
                        b.style.background = '#333333';
                    });
                    e.target.style.background = '#0066cc';
                };
            });
            
            // Apply pawn handler
            document.getElementById('applyPawn').onclick = () => {
                if (this.selectedPawn) {
                    this.applyPawn(this.selectedPawn);
                }
            };
        }
        
        // Load and display pawns
        this.loadPawns();
        this.displayPawns();
        this.elements.pawnSelector.style.display = 'flex';
    }
    
    displayPawns() {
        const pawnsGrid = document.getElementById('pawnsGrid');
        pawnsGrid.innerHTML = '';
        
        this.pawns.forEach(pawn => {
            const pawnElement = document.createElement('div');
            pawnElement.style.cssText = `
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 8px;
                border: 2px solid #444444;
                border-radius: 6px;
                cursor: pointer;
                transition: all 0.3s ease;
                background: #333333;
            `;
            
            pawnElement.innerHTML = `
                <div style="width: 40px; height: 40px; background: ${pawn.color}; border: 1px solid #666666; border-radius: 4px; margin-bottom: 5px;"></div>
                <span style="font-size: 9px; text-align: center; color: #cccccc;">${pawn.name}</span>
            `;
            
            pawnElement.onclick = () => {
                this.selectPawn(pawn);
                
                // Update visual selection
                document.querySelectorAll('#pawnsGrid > div').forEach(el => {
                    el.style.borderColor = '#444444';
                    el.style.background = '#333333';
                });
                pawnElement.style.borderColor = '#0066cc';
                pawnElement.style.background = '#1a1a1a';
            };
            
            pawnElement.onmouseover = () => {
                if (this.selectedPawn?.hex !== pawn.hex) {
                    pawnElement.style.borderColor = '#666666';
                    pawnElement.style.background = '#444444';
                }
            };
            
            pawnElement.onmouseout = () => {
                if (this.selectedPawn?.hex !== pawn.hex) {
                    pawnElement.style.borderColor = '#444444';
                    pawnElement.style.background = '#333333';
                }
            };
            
            pawnsGrid.appendChild(pawnElement);
        });
        
        // Add custom pawn handler
        document.getElementById('applyCustomPawn').onclick = () => {
            const customHex = document.getElementById('customPawnHex').value.replace('#', '');
            if (customHex.length === 6 && /^[0-9A-Fa-f]{6}$/.test(customHex)) {
                const customPawn = { hex: customHex.toUpperCase(), name: 'Custom', color: `#${customHex}` };
                this.selectPawn(customPawn);
                this.applyPawn(customPawn);
            } else {
                alert('Please enter a valid 6-character hex color (e.g., #FF0000)');
            }
        };
    }
    
    selectPawn(pawn) {
        this.selectedPawn = pawn;
        document.getElementById('selectedPawnName').textContent = `${pawn.name} (#${pawn.hex})`;
        console.log('🎭 [CLIENT] Selected pawn:', pawn);
    }
    
    applyPawn(pawn) {
        console.log('🎭 [CLIENT] Applying pawn:', pawn);
        
        if (this.socket) {
            this.socket.emit('change_pawn', { pawnHex: pawn.hex });
        }
        
        // Update current user's pawn
        if (this.currentUser) {
            this.currentUser.pawn = pawn.hex;
        }
        
        // Update UI
        this.elements.pawnSelector.style.display = 'none';
        
        // Show success message
        alert(`Pawn changed to ${pawn.name} (#${pawn.hex})!`);
    }
    
    // Games System (iXat Mini-Games)
    loadGames() {
        console.log('🎭 [CLIENT] Loading games...');
        
        this.games = [
            { id: 'doodle', name: 'Doodle', description: 'Draw and guess game', icon: '🎨' },
            { id: 'hangman', name: 'Hangman', description: 'Word guessing game', icon: '🎯' },
            { id: 'tictactoe', name: 'Tic Tac Toe', description: 'Classic X and O game', icon: '⭕' },
            { id: 'quiz', name: 'Quiz', description: 'Trivia questions', icon: '❓' },
            { id: 'rps', name: 'Rock Paper Scissors', description: 'Rock, Paper, Scissors', icon: '✂️' },
            { id: 'dice', name: 'Dice', description: 'Roll virtual dice', icon: '🎲' }
        ];
        
        console.log('🎭 [CLIENT] Loaded games:', this.games.length);
    }
    
    showGamesMenu() {
        console.log('🎭 [CLIENT] Showing games menu');
        
        // Create games menu modal
        if (!this.elements.gamesMenu) {
            this.elements.gamesMenu = document.createElement('div');
            this.elements.gamesMenu.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: none;
                justify-content: center;
                align-items: center;
                z-index: 1000;
            `;
            
            this.elements.gamesMenu.innerHTML = `
                <div style="background: #2a2a2a; border: 1px solid #444444; border-radius: 8px; width: 600px; max-height: 80vh; color: #ffffff; font-family: Arial, sans-serif; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5); overflow: hidden;">
                    <!-- Title Bar -->
                    <div style="background: #1a1a1a; padding: 15px 20px; border-bottom: 1px solid #444444; display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-size: 18px; font-weight: bold;">🎮 Games</span>
                        <span id="closeGamesMenu" style="color: #ffffff; font-size: 20px; cursor: pointer; font-weight: bold;">×</span>
                    </div>
                    
                    <!-- Games Grid -->
                    <div id="gamesGrid" style="padding: 20px; max-height: 400px; overflow-y: auto; display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 15px;">
                        <!-- Games will be loaded here -->
                    </div>
                    
                    <!-- Active Game Area -->
                    <div id="activeGameArea" style="padding: 15px 20px; border-top: 1px solid #444444; background: #1a1a1a; display: none;">
                        <div id="activeGameContent">
                            <!-- Active game content will be loaded here -->
                        </div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(this.elements.gamesMenu);
            
            // Close button handler
            document.getElementById('closeGamesMenu').onclick = () => {
                this.elements.gamesMenu.style.display = 'none';
                if (this.activeGame) {
                    this.endGame();
                }
            };
            
            // Click outside to close
            this.elements.gamesMenu.onclick = (e) => {
                if (e.target === this.elements.gamesMenu) {
                    this.elements.gamesMenu.style.display = 'none';
                    if (this.activeGame) {
                        this.endGame();
                    }
                }
            };
        }
        
        // Load and display games
        this.loadGames();
        this.displayGames();
        this.elements.gamesMenu.style.display = 'flex';
    }
    
    displayGames() {
        const gamesGrid = document.getElementById('gamesGrid');
        gamesGrid.innerHTML = '';
        
        this.games.forEach(game => {
            const gameElement = document.createElement('div');
            gameElement.style.cssText = `
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 15px;
                border: 2px solid #444444;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.3s ease;
                background: #333333;
                text-align: center;
            `;
            
            gameElement.innerHTML = `
                <div style="font-size: 32px; margin-bottom: 10px;">${game.icon}</div>
                <div style="font-size: 14px; font-weight: bold; margin-bottom: 5px; color: #ffffff;">${game.name}</div>
                <div style="font-size: 11px; color: #cccccc;">${game.description}</div>
            `;
            
            gameElement.onclick = () => {
                this.startGame(game);
            };
            
            gameElement.onmouseover = () => {
                gameElement.style.borderColor = '#0066cc';
                gameElement.style.background = '#444444';
            };
            
            gameElement.onmouseout = () => {
                gameElement.style.borderColor = '#444444';
                gameElement.style.background = '#333333';
            };
            
            gamesGrid.appendChild(gameElement);
        });
    }
    
    startGame(game) {
        console.log('🎭 [CLIENT] Starting game:', game);
        
        this.activeGame = game;
        const activeGameArea = document.getElementById('activeGameArea');
        const activeGameContent = document.getElementById('activeGameContent');
        
        // Show active game area
        activeGameArea.style.display = 'block';
        
        // Initialize game state
        this.gameStates.set(game.id, {
            players: [],
            status: 'waiting',
            startTime: Date.now(),
            data: {}
        });
        
        // Load game-specific content
        switch (game.id) {
            case 'doodle':
                this.loadDoodleGame(activeGameContent);
                break;
            case 'hangman':
                this.loadHangmanGame(activeGameContent);
                break;
            case 'tictactoe':
                this.loadTicTacToeGame(activeGameContent);
                break;
            case 'quiz':
                this.loadQuizGame(activeGameContent);
                break;
            case 'rps':
                this.loadRockPaperScissorsGame(activeGameContent);
                break;
            case 'dice':
                this.loadDiceGame(activeGameContent);
                break;
            default:
                activeGameContent.innerHTML = `<div style="text-align: center; padding: 20px;">Game ${game.name} coming soon!</div>`;
        }
        
        // Emit game start to server
        if (this.socket) {
            this.socket.emit('start_game', { 
                gameId: game.id,
                room: this.config.roomName,
                player: this.currentUser ? this.currentUser.nickname : 'Guest'
            });
        }
    }
    
    endGame() {
        if (this.activeGame) {
            console.log('🎭 [CLIENT] Ending game:', this.activeGame);
            
            if (this.socket) {
                this.socket.emit('end_game', { gameId: this.activeGame.id });
            }
            
            this.activeGame = null;
            document.getElementById('activeGameArea').style.display = 'none';
        }
    }
    
    // Individual game implementations
    loadDoodleGame(container) {
        container.innerHTML = `
            <div style="text-align: center;">
                <h3 style="margin-bottom: 15px;">🎨 Doodle Game</h3>
                <canvas id="doodleCanvas" width="400" height="300" style="border: 2px solid #444444; background: #ffffff; cursor: crosshair;"></canvas>
                <div style="margin-top: 10px;">
                    <button id="clearCanvas" style="background: #dc3545; border: none; color: #ffffff; padding: 8px 15px; border-radius: 4px; cursor: pointer; margin-right: 10px;">Clear</button>
                    <button id="saveDoodle" style="background: #0066cc; border: none; color: #ffffff; padding: 8px 15px; border-radius: 4px; cursor: pointer;">Save</button>
                </div>
            </div>
        `;
        
        // Initialize canvas drawing
        const canvas = document.getElementById('doodleCanvas');
        const ctx = canvas.getContext('2d');
        let isDrawing = false;
        
        canvas.onmousedown = () => isDrawing = true;
        canvas.onmouseup = () => isDrawing = false;
        canvas.onmouseleave = () => isDrawing = false;
        
        canvas.onmousemove = (e) => {
            if (!isDrawing) return;
            
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ctx.lineWidth = 2;
            ctx.lineCap = 'round';
            ctx.strokeStyle = '#000000';
            
            ctx.lineTo(x, y);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x, y);
        };
        
        document.getElementById('clearCanvas').onclick = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        };
        
        document.getElementById('saveDoodle').onclick = () => {
            const dataURL = canvas.toDataURL();
            console.log('🎭 [CLIENT] Doodle saved:', dataURL);
            alert('Doodle saved! (This would upload to server in full implementation)');
        };
    }
    
    loadHangmanGame(container) {
        container.innerHTML = `
            <div style="text-align: center;">
                <h3 style="margin-bottom: 15px;">🎯 Hangman</h3>
                <div id="hangmanWord" style="font-size: 24px; font-weight: bold; margin-bottom: 15px; letter-spacing: 5px;">_ _ _ _ _</div>
                <div id="hangmanLives" style="margin-bottom: 15px;">Lives: 6</div>
                <div id="hangmanGuessed" style="margin-bottom: 15px;">Guessed: </div>
                <input type="text" id="hangmanGuess" placeholder="Enter a letter" style="padding: 8px; border: 1px solid #444444; border-radius: 4px; background: #333333; color: #ffffff; margin-right: 10px;">
                <button id="submitGuess" style="background: #0066cc; border: none; color: #ffffff; padding: 8px 15px; border-radius: 4px; cursor: pointer;">Guess</button>
            </div>
        `;
        
        // Simple hangman implementation
        const words = ['CHAT', 'GAME', 'FUN', 'PLAY', 'WIN'];
        const word = words[Math.floor(Math.random() * words.length)];
        let guessed = new Set();
        let lives = 6;
        
        document.getElementById('submitGuess').onclick = () => {
            const guess = document.getElementById('hangmanGuess').value.toUpperCase();
            if (guess && guess.length === 1) {
                guessed.add(guess);
                
                if (!word.includes(guess)) {
                    lives--;
                }
                
                // Update display
                const display = word.split('').map(letter => guessed.has(letter) ? letter : '_').join(' ');
                document.getElementById('hangmanWord').textContent = display;
                document.getElementById('hangmanLives').textContent = `Lives: ${lives}`;
                document.getElementById('hangmanGuessed').textContent = `Guessed: ${Array.from(guessed).join(', ')}`;
                
                document.getElementById('hangmanGuess').value = '';
                
                // Check win/lose
                if (lives <= 0) {
                    alert(`Game Over! The word was: ${word}`);
                } else if (!display.includes('_')) {
                    alert('Congratulations! You won!');
                }
            }
        };
    }
    
    loadTicTacToeGame(container) {
        container.innerHTML = `
            <div style="text-align: center;">
                <h3 style="margin-bottom: 15px;">⭕ Tic Tac Toe</h3>
                <div id="tictactoeBoard" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 5px; width: 150px; margin: 0 auto 15px auto;">
                    ${Array(9).fill().map((_, i) => `<div class="tictactoeCell" data-index="${i}" style="width: 50px; height: 50px; border: 2px solid #444444; display: flex; align-items: center; justify-content: center; font-size: 24px; cursor: pointer; background: #333333;"></div>`).join('')}
                </div>
                <button id="resetTicTacToe" style="background: #0066cc; border: none; color: #ffffff; padding: 8px 15px; border-radius: 4px; cursor: pointer;">Reset Game</button>
            </div>
        `;
        
        let board = Array(9).fill('');
        let currentPlayer = 'X';
        
        document.querySelectorAll('.tictactoeCell').forEach(cell => {
            cell.onclick = () => {
                const index = parseInt(cell.dataset.index);
                if (board[index] === '') {
                    board[index] = currentPlayer;
                    cell.textContent = currentPlayer;
                    cell.style.color = currentPlayer === 'X' ? '#ff0000' : '#0000ff';
                    
                    if (this.checkTicTacToeWin(board, currentPlayer)) {
                        alert(`${currentPlayer} wins!`);
                        this.resetTicTacToe();
                    } else if (board.every(cell => cell !== '')) {
                        alert("It's a tie!");
                        this.resetTicTacToe();
                    } else {
                        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                    }
                }
            };
        });
        
        document.getElementById('resetTicTacToe').onclick = () => {
            this.resetTicTacToe();
        };
    }
    
    checkTicTacToeWin(board, player) {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6] // diagonals
        ];
        
        return lines.some(line => line.every(index => board[index] === player));
    }
    
    resetTicTacToe() {
        board = Array(9).fill('');
        currentPlayer = 'X';
        document.querySelectorAll('.tictactoeCell').forEach(cell => {
            cell.textContent = '';
            cell.style.color = '#ffffff';
        });
    }
    
    loadQuizGame(container) {
        container.innerHTML = `
            <div style="text-align: center;">
                <h3 style="margin-bottom: 15px;">❓ Quiz</h3>
                <div id="quizQuestion" style="margin-bottom: 15px; font-size: 16px;">Loading question...</div>
                <div id="quizAnswers" style="display: grid; grid-template-columns: 1fr; gap: 10px; margin-bottom: 15px;">
                    <!-- Answers will be loaded here -->
                </div>
                <div id="quizScore" style="margin-bottom: 15px;">Score: 0</div>
            </div>
        `;
        
        const questions = [
            { question: 'What is the capital of France?', answers: ['London', 'Berlin', 'Paris', 'Madrid'], correct: 2 },
            { question: 'Which planet is closest to the Sun?', answers: ['Venus', 'Mercury', 'Earth', 'Mars'], correct: 1 },
            { question: 'What is 2 + 2?', answers: ['3', '4', '5', '6'], correct: 1 }
        ];
        
        let currentQuestion = 0;
        let score = 0;
        
        const loadQuestion = () => {
            const q = questions[currentQuestion];
            document.getElementById('quizQuestion').textContent = q.question;
            document.getElementById('quizAnswers').innerHTML = q.answers.map((answer, index) => 
                `<button class="quizAnswer" data-index="${index}" style="background: #333333; border: 1px solid #444444; color: #ffffff; padding: 10px; border-radius: 4px; cursor: pointer;">${answer}</button>`
            ).join('');
            
            document.querySelectorAll('.quizAnswer').forEach(btn => {
                btn.onclick = () => {
                    const selected = parseInt(btn.dataset.index);
                    if (selected === q.correct) {
                        score++;
                        btn.style.background = '#28a745';
                    } else {
                        btn.style.background = '#dc3545';
                    }
                    
                    document.getElementById('quizScore').textContent = `Score: ${score}`;
                    
                    setTimeout(() => {
                        currentQuestion++;
                        if (currentQuestion < questions.length) {
                            loadQuestion();
                        } else {
                            alert(`Quiz complete! Final score: ${score}/${questions.length}`);
                        }
                    }, 1000);
                };
            });
        };
        
        loadQuestion();
    }
    
    loadRockPaperScissorsGame(container) {
        container.innerHTML = `
            <div style="text-align: center;">
                <h3 style="margin-bottom: 15px;">✂️ Rock Paper Scissors</h3>
                <div id="rpsResult" style="margin-bottom: 15px; font-size: 18px;">Choose your move!</div>
                <div style="display: flex; gap: 10px; justify-content: center; margin-bottom: 15px;">
                    <button class="rpsChoice" data-choice="rock" style="background: #333333; border: 1px solid #444444; color: #ffffff; padding: 15px; border-radius: 4px; cursor: pointer; font-size: 24px;">🪨</button>
                    <button class="rpsChoice" data-choice="paper" style="background: #333333; border: 1px solid #444444; color: #ffffff; padding: 15px; border-radius: 4px; cursor: pointer; font-size: 24px;">📄</button>
                    <button class="rpsChoice" data-choice="scissors" style="background: #333333; border: 1px solid #444444; color: #ffffff; padding: 15px; border-radius: 4px; cursor: pointer; font-size: 24px;">✂️</button>
                </div>
                <div id="rpsScore" style="margin-bottom: 15px;">Wins: 0 | Losses: 0 | Ties: 0</div>
            </div>
        `;
        
        let wins = 0, losses = 0, ties = 0;
        
        document.querySelectorAll('.rpsChoice').forEach(btn => {
            btn.onclick = () => {
                const choices = ['rock', 'paper', 'scissors'];
                const playerChoice = btn.dataset.choice;
                const computerChoice = choices[Math.floor(Math.random() * 3)];
                
                let result;
                if (playerChoice === computerChoice) {
                    result = 'Tie!';
                    ties++;
                } else if (
                    (playerChoice === 'rock' && computerChoice === 'scissors') ||
                    (playerChoice === 'paper' && computerChoice === 'rock') ||
                    (playerChoice === 'scissors' && computerChoice === 'paper')
                ) {
                    result = 'You win!';
                    wins++;
                } else {
                    result = 'Computer wins!';
                    losses++;
                }
                
                document.getElementById('rpsResult').textContent = `You chose ${playerChoice}, computer chose ${computerChoice}. ${result}`;
                document.getElementById('rpsScore').textContent = `Wins: ${wins} | Losses: ${losses} | Ties: ${ties}`;
            };
        });
    }
    
    loadDiceGame(container) {
        container.innerHTML = `
            <div style="text-align: center;">
                <h3 style="margin-bottom: 15px;">🎲 Dice Roll</h3>
                <div id="diceResult" style="font-size: 48px; margin-bottom: 15px;">⚀</div>
                <button id="rollDice" style="background: #0066cc; border: none; color: #ffffff; padding: 10px 20px; border-radius: 4px; cursor: pointer; margin-right: 10px;">Roll Dice</button>
                <button id="rollMultiple" style="background: #28a745; border: none; color: #ffffff; padding: 10px 20px; border-radius: 4px; cursor: pointer;">Roll 5 Dice</button>
                <div id="diceHistory" style="margin-top: 15px; font-size: 14px; color: #cccccc;"></div>
            </div>
        `;
        
        const diceFaces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
        let history = [];
        
        const rollDice = () => {
            const result = Math.floor(Math.random() * 6);
            return { face: diceFaces[result], value: result + 1 };
        };
        
        document.getElementById('rollDice').onclick = () => {
            const dice = rollDice();
            document.getElementById('diceResult').textContent = dice.face;
            history.push(dice.value);
            document.getElementById('diceHistory').textContent = `History: ${history.slice(-5).join(', ')}`;
        };
        
        document.getElementById('rollMultiple').onclick = () => {
            const results = [];
            for (let i = 0; i < 5; i++) {
                results.push(rollDice());
            }
            document.getElementById('diceResult').textContent = results.map(d => d.face).join(' ');
            results.forEach(d => history.push(d.value));
            document.getElementById('diceHistory').textContent = `History: ${history.slice(-10).join(', ')}`;
        };
    }
    
    addMessage(data) {
        const messageElement = document.createElement('div');
        messageElement.style.cssText = `
            margin-bottom: 5px;
            padding: 5px;
            background: rgba(0, 0, 0, 0.5);
            border-radius: 3px;
            color: #ffffff;
        `;
        
        const timestamp = new Date(data.timestamp).toLocaleTimeString();
        messageElement.innerHTML = `
            <span style="color: #ffcc00; font-weight: bold;">${data.user.nickname}</span>
            <span style="color: #666666; margin-left: 5px;">${timestamp}</span>
            <div style="margin-top: 2px;">${data.message}</div>
        `;
        
        this.elements.chatArea.appendChild(messageElement);
        this.elements.chatArea.scrollTop = this.elements.chatArea.scrollHeight;
    }
    
    updateUserList(users) {
        this.elements.userList.innerHTML = '';
        this.users.clear();
        this.userElements.clear();
        
        users.forEach(user => {
            this.addUser(user);
        });
        
        // Fix: Check if userCount element exists
        if (this.elements.userCount) {
        this.elements.userCount.textContent = `Users: ${users.length}`;
        }
    }
    
    addUser(user) {
        console.log('🎭 [CLIENT] Adding user to list:', user);
        const userElement = document.createElement('div');
        userElement.className = 'user-item';
        userElement.dataset.userId = user.id;
        userElement.dataset.nickname = user.nickname || '';
        userElement.dataset.username = user.username || '';
        userElement.dataset.rank = user.rank || 0;
        userElement.dataset.avatar = user.avatar || 1;
        userElement.dataset.guest = user.guest || false;
        userElement.dataset.guestLevel = user.guestLevel || 1;
        userElement.dataset.xats = user.xats || 0;
        
        console.log('🎭 [CLIENT] User element dataset:', userElement.dataset);
        userElement.style.cssText = `
            display: flex;
            align-items: center;
            padding: 4px 6px;
            margin: 1px 0;
            background: rgba(0, 0, 0, 0.3);
            border: 1px solid transparent;
            border-radius: 3px;
            cursor: pointer;
            transition: all 0.2s ease;
        `;
        
        const rankColor = this.getUserColor(user.rank);
        const rankText = this.getRankText(user.rank);
        
        // Enhanced display for guests
        let guestInfo = '';
        if (user.guest) {
            const level = user.guestLevel || 1;
            const xats = user.xats || 0;
            const persistent = user.persistent ? '💾' : '⚡';
            guestInfo = `
                <div style="color: #${rankColor}; font-size: 9px;">
                    ${rankText} Lv.${level} ${persistent}
                </div>
                <div style="color: #ffcc00; font-size: 8px;">${xats} xats</div>
            `;
        } else {
            guestInfo = `<div style="color: #${rankColor}; font-size: 9px;">${rankText}</div>`;
        }
        
        userElement.innerHTML = `
            <span style="color: #${rankColor}; font-weight: bold; margin-right: 5px;">●</span>
            <img src="/avatars/${user.avatar}.png" style="width: 20px; height: 20px; border-radius: 2px; margin-right: 6px; border: 1px solid #333;">
            <div style="flex: 1;">
                <div style="color: #ffffff; font-weight: bold; font-size: 11px;">${user.nickname || user.username}</div>
                ${guestInfo}
            </div>
        `;
        
        userElement.onmouseover = () => {
            userElement.style.background = 'linear-gradient(to right, rgba(0, 102, 204, 0.3), rgba(0, 102, 204, 0.1))';
            userElement.style.borderColor = '#0066cc';
            userElement.style.transform = 'translateX(2px)';
        };
        userElement.onmouseout = () => {
            userElement.style.background = 'rgba(0, 0, 0, 0.3)';
            userElement.style.borderColor = 'transparent';
            userElement.style.transform = 'translateX(0)';
        };
        userElement.onclick = () => {
            console.log('🎭 [CLIENT] User clicked in user list:', user);
            console.log('🎭 [CLIENT] User ID from click:', user.id);
            console.log('🎭 [CLIENT] Current user ID:', this.currentUser?.id);
            this.showUserProfile(user);
        };
        
        // Store user data and DOM element separately
        this.users.set(user.id, user);
        this.userElements.set(user.id, userElement);
        
        // Add to display
        this.elements.userList.appendChild(userElement);
        

    }
    
    removeUser(userId) {
        // Remove from both maps
        this.users.delete(userId);
        
        // Remove DOM element if it exists
        const userElement = this.userElements.get(userId);
        if (userElement && userElement.parentNode) {
            userElement.parentNode.removeChild(userElement);
        }
        this.userElements.delete(userId);
        
        // Update user count
        if (this.elements.userCount) {
            this.elements.userCount.textContent = `Users: ${this.users.size}`;
        }
    }
    
    getUserColor(rank) {
        const colors = {
            0: 'cccccc', // Guest
            1: 'ffffff', // Member
            2: '00ff00', // Owner
            3: 'ff0000', // Admin
            4: 'ffff00'  // Main Owner
        };
        return colors[rank] || 'cccccc';
    }
    
    getRankText(rank) {
        const ranks = {
            0: 'Guest',
            1: 'Member',
            2: 'Owner',
            3: 'Admin',
            4: 'Main Owner'
        };
        return ranks[rank] || 'Guest';
    }
    
    showUserProfile(userOrId) {
        console.log('🎭 [CLIENT] Showing profile for user:', userOrId);
        
        // Handle both user object and user ID string
        let user;
        if (typeof userOrId === 'string') {
            // Find user by ID from the user list
            const userElement = this.users.get(userOrId);
            if (!userElement) {
                console.error('🎭 [CLIENT] User not found:', userOrId);
                return;
            }
            // Get user data from the element's dataset
            user = {
                id: userElement.dataset.userId,
                nickname: userElement.dataset.nickname,
                username: userElement.dataset.username,
                rank: userElement.dataset.rank,
                avatar: userElement.dataset.avatar
            };
            console.log('🎭 [CLIENT] Found user element:', userElement);
            console.log('🎭 [CLIENT] User element dataset:', userElement.dataset);
        } else {
            user = userOrId;
        }
        
        console.log('🎭 [CLIENT] Resolved user object:', user);
        console.log('🎭 [CLIENT] Current user for comparison:', this.currentUser);
        
        // Get current user's rank
        const currentUserRank = this.getCurrentUserRank();
        
        // For guests and members, always show regular profile
        if (currentUserRank === 'guest' || currentUserRank === 'member') {
            this.showRegularProfile(user);
            return;
        }
        
        // For higher ranks, show appropriate menu
        switch (currentUserRank) {
            case 'mainowner':
                this.showMainOwnerMenu(user);
                break;
            case 'owner':
                this.showOwnerMenu(user);
                break;
            case 'moderator':
                this.showModeratorMenu(user);
                break;
            default:
                this.showRegularProfile(user);
        }
    }
    
    getCurrentUserRank() {
        // Get the actual current user's rank from the authenticated user data
        if (this.currentUser) {
            // If user has a rank property, use it
            if (this.currentUser.rank !== undefined) {
                return this.currentUser.rank;
            }
            
            // If user is a guest, return 'guest'
            if (this.currentUser.isGuest) {
                return 'guest';
            }
            
            // If user is authenticated but not a guest, they're a member
            return 'member';
        }
        
        // Default to guest if no current user
        return 'guest';
    }
    
    showMainOwnerMenu(user) {
        console.log('🎭 [CLIENT] Showing main owner menu for user:', user);
        
        // Create main owner modal if it doesn't exist
        if (!this.elements.mainOwnerModal) {
            this.elements.mainOwnerModal = document.createElement('div');
            this.elements.mainOwnerModal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: none;
                justify-content: center;
                align-items: center;
                z-index: 1000;
            `;
            
            this.elements.mainOwnerModal.innerHTML = `
                <div style="background: #2a2a2a; border: 1px solid #444444; border-radius: 4px; width: 350px; color: #ffffff; font-family: Arial, sans-serif; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);">
                    <!-- Title Bar -->
                    <div style="background: #1a1a1a; padding: 8px 12px; border-bottom: 1px solid #444444; display: flex; justify-content: space-between; align-items: center;">
                        <span id="mainOwnerTitle" style="font-size: 14px; font-weight: bold; color: #ffffff;"></span>
                        <div style="display: flex; gap: 10px;">
                            <span style="color: #ffffff; font-size: 14px; cursor: pointer;">⚙️</span>
                            <span id="closeMainOwner" style="color: #ffffff; font-size: 16px; cursor: pointer; font-weight: bold;">×</span>
                        </div>
                    </div>
                    
                    <!-- User Info Section -->
                    <div style="padding: 15px; display: flex; align-items: flex-start;">
                        <!-- Avatar -->
                        <img id="mainOwnerAvatar" src="" style="width: 50px; height: 50px; border: 1px solid #666666; margin-right: 15px;">
                        
                        <!-- User Details -->
                        <div style="flex: 1;">
                            <div id="mainOwnerUsername" style="font-size: 16px; font-weight: bold; color: #ffffff; margin-bottom: 5px;"></div>
                            <div id="mainOwnerStatus" style="color: #00ff00; font-size: 12px; margin-bottom: 3px;">Online</div>
                            <div id="mainOwnerFriendStatus" style="color: #cccccc; font-size: 11px;">Not added you as a friend</div>
                        </div>
                    </div>
                    
                    <!-- Action Buttons Grid -->
                    <div style="padding: 0 15px 15px 15px;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                            <button class="main-owner-btn" data-action="privatechat" style="background: linear-gradient(to bottom, #3a3a3a 0%, #2a2a2a 100%); border: 1px solid #555555; color: #ffffff; padding: 8px; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 5px;">
                                <span>💬</span> Private Chat
                            </button>
                            <button class="main-owner-btn" data-action="privatemessage" style="background: linear-gradient(to bottom, #3a3a3a 0%, #2a2a2a 100%); border: 1px solid #555555; color: #ffffff; padding: 8px; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 5px;">
                                <span>✉️</span> Private Message
                            </button>
                            <button class="main-owner-btn" data-action="addfriend" style="background: linear-gradient(to bottom, #3a3a3a 0%, #2a2a2a 100%); border: 1px solid #555555; color: #ffffff; padding: 8px; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 5px;">
                                <span style="color: #00ff00;">➕</span> Add as Friend
                            </button>
                            <button class="main-owner-btn" data-action="ignore" style="background: linear-gradient(to bottom, #3a3a3a 0%, #2a2a2a 100%); border: 1px solid #555555; color: #ffffff; padding: 8px; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 5px;">
                                <span style="color: #ff4444;">🚫</span> Ignore
                            </button>
                            <button class="main-owner-btn" data-action="kick" style="background: linear-gradient(to bottom, #3a3a3a 0%, #2a2a2a 100%); border: 1px solid #555555; color: #ffffff; padding: 8px; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 5px;">
                                <span style="color: #8b4513;">👢</span> Kick
                            </button>
                            <button class="main-owner-btn" data-action="ban" style="background: linear-gradient(to bottom, #3a3a3a 0%, #2a2a2a 100%); border: 1px solid #555555; color: #ffffff; padding: 8px; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 5px;">
                                <span style="color: #ff4444;">❌</span> Ban
                            </button>
                            <button class="main-owner-btn" data-action="makeguest" style="background: linear-gradient(to bottom, #3a3a3a 0%, #2a2a2a 100%); border: 1px solid #555555; color: #ffffff; padding: 8px; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 5px;">
                                <span style="color: #00ff00;">👤</span> Make Guest
                            </button>
                            <button class="main-owner-btn" data-action="makemember" style="background: linear-gradient(to bottom, #3a3a3a 0%, #2a2a2a 100%); border: 1px solid #555555; color: #ffffff; padding: 8px; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 5px;">
                                <span style="color: #0066cc;">👤</span> Make Member
                            </button>
                            <button class="main-owner-btn" data-action="makemoderator" style="background: linear-gradient(to bottom, #3a3a3a 0%, #2a2a2a 100%); border: 1px solid #555555; color: #ffffff; padding: 8px; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 5px;">
                                <span style="color: #ffffff;">👤</span> Make Moderator
                            </button>
                            <button class="main-owner-btn" data-action="makeowner" style="background: linear-gradient(to bottom, #3a3a3a 0%, #2a2a2a 100%); border: 1px solid #555555; color: #ffffff; padding: 8px; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 5px;">
                                <span style="color: #ff8800;">👤</span> Make Owner
                            </button>
                            <button class="main-owner-btn" data-action="divorce" style="background: linear-gradient(to bottom, #3a3a3a 0%, #2a2a2a 100%); border: 1px solid #555555; color: #ffffff; padding: 8px; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 5px;">
                                <span style="color: #ff4444;">💔</span> Divorce
                            </button>
                            <button class="main-owner-btn" data-action="transfer" style="background: linear-gradient(to bottom, #3a3a3a 0%, #2a2a2a 100%); border: 1px solid #555555; color: #ffffff; padding: 8px; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 5px;">
                                <span style="color: #ff4444;">⬅️</span> Transfer
                            </button>
                            <button class="main-owner-btn" data-action="powers" style="background: linear-gradient(to bottom, #3a3a3a 0%, #2a2a2a 100%); border: 1px solid #555555; color: #ffffff; padding: 8px; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 5px;">
                                <span style="color: #ffcc00;">⚡</span> Powers
                            </button>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(this.elements.mainOwnerModal);
            
            // Close button handler
            document.getElementById('closeMainOwner').onclick = () => {
                this.elements.mainOwnerModal.style.display = 'none';
            };
            
            // Click outside to close
            this.elements.mainOwnerModal.onclick = (e) => {
                if (e.target === this.elements.mainOwnerModal) {
                    this.elements.mainOwnerModal.style.display = 'none';
                }
            };
            
            // Button handlers
            document.querySelectorAll('.main-owner-btn').forEach(btn => {
                btn.onclick = (e) => {
                    const action = e.currentTarget.dataset.action;
                    this.handleMainOwnerAction(action, user);
                };
            });
        }
        
        // Update main owner menu content
        document.getElementById('mainOwnerTitle').textContent = user.id;
        document.getElementById('mainOwnerAvatar').src = `/avatars/${user.avatar}.png`;
        document.getElementById('mainOwnerUsername').textContent = user.nickname || user.username;
        
        // Show modal
        this.elements.mainOwnerModal.style.display = 'flex';
    }
    
    showRegularProfile(user) {
        console.log('🎭 [CLIENT] Showing regular profile for user:', user);
        
        // Create regular profile modal if it doesn't exist
        if (!this.elements.regularProfileModal) {
            this.elements.regularProfileModal = document.createElement('div');
            this.elements.regularProfileModal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: none;
                justify-content: center;
                align-items: center;
                z-index: 1000;
            `;
            
            this.elements.regularProfileModal.innerHTML = `
                <div style="background: #2a2a2a; border: 1px solid #444444; border-radius: 4px; width: 350px; color: #ffffff; font-family: Arial, sans-serif; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);">
                    <!-- Title Bar -->
                    <div style="background: #1a1a1a; padding: 8px 12px; border-bottom: 1px solid #444444; display: flex; justify-content: space-between; align-items: center;">
                        <span id="regularProfileTitle" style="font-size: 14px; font-weight: bold; color: #ffffff;"></span>
                        <div style="display: flex; gap: 10px;">
                            <span style="color: #ff4444; font-size: 14px; cursor: pointer;">🚫</span>
                            <span id="closeRegularProfile" style="color: #ffffff; font-size: 16px; cursor: pointer; font-weight: bold;">×</span>
                        </div>
                    </div>
                    
                    <!-- User Info Section -->
                    <div style="padding: 15px; display: flex; align-items: flex-start;">
                        <img id="regularProfileAvatar" src="" style="width: 50px; height: 50px; border: 1px solid #666666; margin-right: 15px;">
                        <div style="flex: 1;">
                            <div id="regularProfileRank" style="font-size: 16px; font-weight: bold; color: #ffffff; margin-bottom: 5px;"></div>
                            <div id="regularProfileStatus" style="color: #00ff00; font-size: 12px; margin-bottom: 3px;">Online</div>
                        </div>
                    </div>
                    
                    <!-- Action Buttons Grid (8 buttons - 2x4) -->
                    <div style="padding: 0 15px 15px 15px;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                            <button class="regular-profile-btn" data-action="privatechat" style="background: linear-gradient(to bottom, #3a3a3a 0%, #2a2a2a 100%); border: 1px solid #555555; color: #ffffff; padding: 8px; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 5px;">
                                <span>💬</span> Private Chat
                            </button>
                            <button class="regular-profile-btn" data-action="privatemessage" style="background: linear-gradient(to bottom, #3a3a3a 0%, #2a2a2a 100%); border: 1px solid #555555; color: #ffffff; padding: 8px; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 5px;">
                                <span>✉️</span> Private Message
                            </button>
                            <button class="regular-profile-btn" data-action="addfriend" style="background: linear-gradient(to bottom, #3a3a3a 0%, #2a2a2a 100%); border: 1px solid #555555; color: #ffffff; padding: 8px; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 5px;">
                                <span style="color: #00ff00;">➕</span> Add as Friend
                            </button>
                            <button class="regular-profile-btn" data-action="ignore" style="background: linear-gradient(to bottom, #3a3a3a 0%, #2a2a2a 100%); border: 1px solid #555555; color: #ffffff; padding: 8px; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 5px;">
                                <span style="color: #ff4444;">🚫</span> Ignore
                            </button>
                            <button class="regular-profile-btn" data-action="marry" style="background: linear-gradient(to bottom, #3a3a3a 0%, #2a2a2a 100%); border: 1px solid #555555; color: #ffffff; padding: 8px; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 5px;">
                                <span style="color: #ff4444;">❤️</span> Marry/BFF
                            </button>
                            <button class="regular-profile-btn" data-action="transfer" style="background: linear-gradient(to bottom, #3a3a3a 0%, #2a2a2a 100%); border: 1px solid #555555; color: #ffffff; padding: 8px; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 5px;">
                                <span style="color: #ff4444;">➡️</span> Transfer
                            </button>
                            <button class="regular-profile-btn" data-action="powers" style="background: linear-gradient(to bottom, #3a3a3a 0%, #2a2a2a 100%); border: 1px solid #555555; color: #ffffff; padding: 8px; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 5px;">
                                <span style="color: #ffcc00;">⚡</span> Powers
                            </button>
                            <button class="regular-profile-btn" data-action="gifts" style="background: linear-gradient(to bottom, #3a3a3a 0%, #2a2a2a 100%); border: 1px solid #555555; color: #ffffff; padding: 8px; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 5px;">
                                <span style="color: #ff4444;">🎁</span> Gifts
                            </button>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(this.elements.regularProfileModal);
            
            document.getElementById('closeRegularProfile').onclick = () => {
                this.elements.regularProfileModal.style.display = 'none';
            };
            
            this.elements.regularProfileModal.onclick = (e) => {
                if (e.target === this.elements.regularProfileModal) {
                    this.elements.regularProfileModal.style.display = 'none';
                }
            };
            
            document.querySelectorAll('.regular-profile-btn').forEach(btn => {
                btn.onclick = (e) => {
                    const action = e.currentTarget.dataset.action;
                    this.handleRegularProfileAction(action, user);
                };
            });
        }
        
        // Update regular profile content
        document.getElementById('regularProfileTitle').textContent = `${user.nickname || user.username} (${user.id})`;
        document.getElementById('regularProfileAvatar').src = `/avatars/${user.avatar}.png`;
        document.getElementById('regularProfileRank').textContent = this.getRankText(user.rank);
        
        // Show modal
        this.elements.regularProfileModal.style.display = 'flex';
    }
    
    showOwnerMenu(user) {
        console.log('🎭 [CLIENT] Showing owner menu for user:', user);
        
        // Create owner modal if it doesn't exist
        if (!this.elements.ownerModal) {
            this.elements.ownerModal = document.createElement('div');
            this.elements.ownerModal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: none;
                justify-content: center;
                align-items: center;
                z-index: 1000;
            `;
            
            this.elements.ownerModal.innerHTML = `
                <div style="background: #2a2a2a; border: 1px solid #444444; border-radius: 4px; width: 350px; color: #ffffff; font-family: Arial, sans-serif; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);">
                    <!-- Title Bar -->
                    <div style="background: #1a1a1a; padding: 8px 12px; border-bottom: 1px solid #444444; display: flex; justify-content: space-between; align-items: center;">
                        <span id="ownerTitle" style="font-size: 14px; font-weight: bold; color: #ffffff;"></span>
                        <div style="display: flex; gap: 10px;">
                            <span style="color: #ffffff; font-size: 14px; cursor: pointer;">⚙️</span>
                            <span id="closeOwner" style="color: #ffffff; font-size: 16px; cursor: pointer; font-weight: bold;">×</span>
                        </div>
                    </div>
                    
                    <!-- User Info Section -->
                    <div style="padding: 15px; display: flex; align-items: flex-start;">
                        <img id="ownerAvatar" src="" style="width: 50px; height: 50px; border: 1px solid #666666; margin-right: 15px;">
                        <div style="flex: 1;">
                            <div id="ownerUsername" style="font-size: 16px; font-weight: bold; color: #ffffff; margin-bottom: 5px;"></div>
                            <div id="ownerStatus" style="color: #00ff00; font-size: 12px; margin-bottom: 3px;">Online</div>
                            <div id="ownerFriendStatus" style="color: #cccccc; font-size: 11px;">Not added you as a friend</div>
                        </div>
                    </div>
                    
                    <!-- Action Buttons Grid (11 buttons - no transfer) -->
                    <div style="padding: 0 15px 15px 15px;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                            <button class="owner-btn" data-action="privatechat" style="background: linear-gradient(to bottom, #3a3a3a 0%, #2a2a2a 100%); border: 1px solid #555555; color: #ffffff; padding: 8px; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 5px;">
                                <span>💬</span> Private Chat
                            </button>
                            <button class="owner-btn" data-action="privatemessage" style="background: linear-gradient(to bottom, #3a3a3a 0%, #2a2a2a 100%); border: 1px solid #555555; color: #ffffff; padding: 8px; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 5px;">
                                <span>✉️</span> Private Message
                            </button>
                            <button class="owner-btn" data-action="addfriend" style="background: linear-gradient(to bottom, #3a3a3a 0%, #2a2a2a 100%); border: 1px solid #555555; color: #ffffff; padding: 8px; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 5px;">
                                <span style="color: #00ff00;">➕</span> Add as Friend
                            </button>
                            <button class="owner-btn" data-action="ignore" style="background: linear-gradient(to bottom, #3a3a3a 0%, #2a2a2a 100%); border: 1px solid #555555; color: #ffffff; padding: 8px; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 5px;">
                                <span style="color: #ff4444;">🚫</span> Ignore
                            </button>
                            <button class="owner-btn" data-action="kick" style="background: linear-gradient(to bottom, #3a3a3a 0%, #2a2a2a 100%); border: 1px solid #555555; color: #ffffff; padding: 8px; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 5px;">
                                <span style="color: #8b4513;">👢</span> Kick
                            </button>
                            <button class="owner-btn" data-action="ban" style="background: linear-gradient(to bottom, #3a3a3a 0%, #2a2a2a 100%); border: 1px solid #555555; color: #ffffff; padding: 8px; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 5px;">
                                <span style="color: #ff4444;">❌</span> Ban
                            </button>
                            <button class="owner-btn" data-action="makeguest" style="background: linear-gradient(to bottom, #3a3a3a 0%, #2a2a2a 100%); border: 1px solid #555555; color: #ffffff; padding: 8px; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 5px;">
                                <span style="color: #00ff00;">👤</span> Make Guest
                            </button>
                            <button class="owner-btn" data-action="makemember" style="background: linear-gradient(to bottom, #3a3a3a 0%, #2a2a2a 100%); border: 1px solid #555555; color: #ffffff; padding: 8px; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 5px;">
                                <span style="color: #0066cc;">👤</span> Make Member
                            </button>
                            <button class="owner-btn" data-action="makemoderator" style="background: linear-gradient(to bottom, #3a3a3a 0%, #2a2a2a 100%); border: 1px solid #555555; color: #ffffff; padding: 8px; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 5px;">
                                <span style="color: #ffffff;">👤</span> Make Moderator
                            </button>
                            <button class="owner-btn" data-action="makeowner" style="background: linear-gradient(to bottom, #3a3a3a 0%, #2a2a2a 100%); border: 1px solid #555555; color: #ffffff; padding: 8px; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 5px;">
                                <span style="color: #ff8800;">👤</span> Make Owner
                            </button>
                            <button class="owner-btn" data-action="divorce" style="background: linear-gradient(to bottom, #3a3a3a 0%, #2a2a2a 100%); border: 1px solid #555555; color: #ffffff; padding: 8px; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 5px;">
                                <span style="color: #ff4444;">💔</span> Divorce
                            </button>
                            <button class="owner-btn" data-action="powers" style="background: linear-gradient(to bottom, #3a3a3a 0%, #2a2a2a 100%); border: 1px solid #555555; color: #ffffff; padding: 8px; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 5px;">
                                <span style="color: #ffcc00;">⚡</span> Powers
                            </button>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(this.elements.ownerModal);
            
            document.getElementById('closeOwner').onclick = () => {
                this.elements.ownerModal.style.display = 'none';
            };
            
            this.elements.ownerModal.onclick = (e) => {
                if (e.target === this.elements.ownerModal) {
                    this.elements.ownerModal.style.display = 'none';
                }
            };
            
            document.querySelectorAll('.owner-btn').forEach(btn => {
                btn.onclick = (e) => {
                    const action = e.currentTarget.dataset.action;
                    this.handleOwnerAction(action, user);
                };
            });
        }
        
        document.getElementById('ownerTitle').textContent = user.id;
        document.getElementById('ownerAvatar').src = `/avatars/${user.avatar}.png`;
        document.getElementById('ownerUsername').textContent = user.nickname || user.username;
        
        this.elements.ownerModal.style.display = 'flex';
    }
    
    showModeratorMenu(user) {
        console.log('🎭 [CLIENT] Showing moderator menu for user:', user);
        
        if (!this.elements.moderatorModal) {
            this.elements.moderatorModal = document.createElement('div');
            this.elements.moderatorModal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: none;
                justify-content: center;
                align-items: center;
                z-index: 1000;
            `;
            
            this.elements.moderatorModal.innerHTML = `
                <div style="background: #2a2a2a; border: 1px solid #444444; border-radius: 4px; width: 350px; color: #ffffff; font-family: Arial, sans-serif; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);">
                    <div style="background: #1a1a1a; padding: 8px 12px; border-bottom: 1px solid #444444; display: flex; justify-content: space-between; align-items: center;">
                        <span id="moderatorTitle" style="font-size: 14px; font-weight: bold; color: #ffffff;"></span>
                        <div style="display: flex; gap: 10px;">
                            <span style="color: #ffffff; font-size: 14px; cursor: pointer;">⚙️</span>
                            <span id="closeModerator" style="color: #ffffff; font-size: 16px; cursor: pointer; font-weight: bold;">×</span>
                        </div>
                    </div>
                    
                    <div style="padding: 15px; display: flex; align-items: flex-start;">
                        <img id="moderatorAvatar" src="" style="width: 50px; height: 50px; border: 1px solid #666666; margin-right: 15px;">
                        <div style="flex: 1;">
                            <div id="moderatorUsername" style="font-size: 16px; font-weight: bold; color: #ffffff; margin-bottom: 5px;"></div>
                            <div id="moderatorStatus" style="color: #00ff00; font-size: 12px; margin-bottom: 3px;">Online</div>
                            <div id="moderatorFriendStatus" style="color: #cccccc; font-size: 11px;">Not added you as a friend</div>
                        </div>
                    </div>
                    
                    <!-- Moderator buttons (limited admin powers) -->
                    <div style="padding: 0 15px 15px 15px;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                            <button class="moderator-btn" data-action="privatechat" style="background: linear-gradient(to bottom, #3a3a3a 0%, #2a2a2a 100%); border: 1px solid #555555; color: #ffffff; padding: 8px; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 5px;">
                                <span>💬</span> Private Chat
                            </button>
                            <button class="moderator-btn" data-action="privatemessage" style="background: linear-gradient(to bottom, #3a3a3a 0%, #2a2a2a 100%); border: 1px solid #555555; color: #ffffff; padding: 8px; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 5px;">
                                <span>✉️</span> Private Message
                            </button>
                            <button class="moderator-btn" data-action="addfriend" style="background: linear-gradient(to bottom, #3a3a3a 0%, #2a2a2a 100%); border: 1px solid #555555; color: #ffffff; padding: 8px; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 5px;">
                                <span style="color: #00ff00;">➕</span> Add as Friend
                            </button>
                            <button class="moderator-btn" data-action="ignore" style="background: linear-gradient(to bottom, #3a3a3a 0%, #2a2a2a 100%); border: 1px solid #555555; color: #ffffff; padding: 8px; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 5px;">
                                <span style="color: #ff4444;">🚫</span> Ignore
                            </button>
                            <button class="moderator-btn" data-action="kick" style="background: linear-gradient(to bottom, #3a3a3a 0%, #2a2a2a 100%); border: 1px solid #555555; color: #ffffff; padding: 8px; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 5px;">
                                <span style="color: #8b4513;">👢</span> Kick
                            </button>
                            <button class="moderator-btn" data-action="ban" style="background: linear-gradient(to bottom, #3a3a3a 0%, #2a2a2a 100%); border: 1px solid #555555; color: #ffffff; padding: 8px; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 5px;">
                                <span style="color: #ff4444;">❌</span> Ban
                            </button>
                            <button class="moderator-btn" data-action="makeguest" style="background: linear-gradient(to bottom, #3a3a3a 0%, #2a2a2a 100%); border: 1px solid #555555; color: #ffffff; padding: 8px; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 5px;">
                                <span style="color: #00ff00;">👤</span> Make Guest
                            </button>
                            <button class="moderator-btn" data-action="makemember" style="background: linear-gradient(to bottom, #3a3a3a 0%, #2a2a2a 100%); border: 1px solid #555555; color: #ffffff; padding: 8px; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 5px;">
                                <span style="color: #0066cc;">👤</span> Make Member
                            </button>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(this.elements.moderatorModal);
            
            document.getElementById('closeModerator').onclick = () => {
                this.elements.moderatorModal.style.display = 'none';
            };
            
            this.elements.moderatorModal.onclick = (e) => {
                if (e.target === this.elements.moderatorModal) {
                    this.elements.moderatorModal.style.display = 'none';
                }
            };
            
            document.querySelectorAll('.moderator-btn').forEach(btn => {
                btn.onclick = (e) => {
                    const action = e.currentTarget.dataset.action;
                    this.handleModeratorAction(action, user);
                };
            });
        }
        
        document.getElementById('moderatorTitle').textContent = user.id;
        document.getElementById('moderatorAvatar').src = `/avatars/${user.avatar}.png`;
        document.getElementById('moderatorUsername').textContent = user.nickname || user.username;
        
        this.elements.moderatorModal.style.display = 'flex';
    }
    
    showMemberMenu(user) {
        console.log('🎭 [CLIENT] Showing member menu for user:', user);
        
        if (!this.elements.memberModal) {
            this.elements.memberModal = document.createElement('div');
            this.elements.memberModal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: none;
                justify-content: center;
                align-items: center;
                z-index: 1000;
            `;
            
            this.elements.memberModal.innerHTML = `
                <div style="background: #2a2a2a; border: 1px solid #444444; border-radius: 4px; width: 350px; color: #ffffff; font-family: Arial, sans-serif; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);">
                    <div style="background: #1a1a1a; padding: 8px 12px; border-bottom: 1px solid #444444; display: flex; justify-content: space-between; align-items: center;">
                        <span id="memberTitle" style="font-size: 14px; font-weight: bold; color: #ffffff;"></span>
                        <div style="display: flex; gap: 10px;">
                            <span style="color: #ffffff; font-size: 14px; cursor: pointer;">⚙️</span>
                            <span id="closeMember" style="color: #ffffff; font-size: 16px; cursor: pointer; font-weight: bold;">×</span>
                        </div>
                    </div>
                    
                    <div style="padding: 15px; display: flex; align-items: flex-start;">
                        <img id="memberAvatar" src="" style="width: 50px; height: 50px; border: 1px solid #666666; margin-right: 15px;">
                        <div style="flex: 1;">
                            <div id="memberUsername" style="font-size: 16px; font-weight: bold; color: #ffffff; margin-bottom: 5px;"></div>
                            <div id="memberStatus" style="color: #00ff00; font-size: 12px; margin-bottom: 3px;">Online</div>
                            <div id="memberFriendStatus" style="color: #cccccc; font-size: 11px;">Not added you as a friend</div>
                        </div>
                    </div>
                    
                    <!-- Member buttons (social only) -->
                    <div style="padding: 0 15px 15px 15px;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                            <button class="member-btn" data-action="privatechat" style="background: linear-gradient(to bottom, #3a3a3a 0%, #2a2a2a 100%); border: 1px solid #555555; color: #ffffff; padding: 8px; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 5px;">
                                <span>💬</span> Private Chat
                            </button>
                            <button class="member-btn" data-action="privatemessage" style="background: linear-gradient(to bottom, #3a3a3a 0%, #2a2a2a 100%); border: 1px solid #555555; color: #ffffff; padding: 8px; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 5px;">
                                <span>✉️</span> Private Message
                            </button>
                            <button class="member-btn" data-action="addfriend" style="background: linear-gradient(to bottom, #3a3a3a 0%, #2a2a2a 100%); border: 1px solid #555555; color: #ffffff; padding: 8px; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 5px;">
                                <span style="color: #00ff00;">➕</span> Add as Friend
                            </button>
                            <button class="member-btn" data-action="ignore" style="background: linear-gradient(to bottom, #3a3a3a 0%, #2a2a2a 100%); border: 1px solid #555555; color: #ffffff; padding: 8px; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 5px;">
                                <span style="color: #ff4444;">🚫</span> Ignore
                            </button>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(this.elements.memberModal);
            
            document.getElementById('closeMember').onclick = () => {
                this.elements.memberModal.style.display = 'none';
            };
            
            this.elements.memberModal.onclick = (e) => {
                if (e.target === this.elements.memberModal) {
                    this.elements.memberModal.style.display = 'none';
                }
            };
            
            document.querySelectorAll('.member-btn').forEach(btn => {
                btn.onclick = (e) => {
                    const action = e.currentTarget.dataset.action;
                    this.handleMemberAction(action, user);
                };
            });
        }
        
        document.getElementById('memberTitle').textContent = user.id;
        document.getElementById('memberAvatar').src = `/avatars/${user.avatar}.png`;
        document.getElementById('memberUsername').textContent = user.nickname || user.username;
        
        this.elements.memberModal.style.display = 'flex';
    }
    
    showGuestMenu(user) {
        console.log('🎭 [CLIENT] Showing guest menu for user:', user);
        
        if (!this.elements.guestModal) {
            this.elements.guestModal = document.createElement('div');
            this.elements.guestModal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: none;
                justify-content: center;
                align-items: center;
                z-index: 1000;
            `;
            
            this.elements.guestModal.innerHTML = `
                <div style="background: #2a2a2a; border: 1px solid #444444; border-radius: 4px; width: 350px; color: #ffffff; font-family: Arial, sans-serif; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);">
                    <div style="background: #1a1a1a; padding: 8px 12px; border-bottom: 1px solid #444444; display: flex; justify-content: space-between; align-items: center;">
                        <span id="guestTitle" style="font-size: 14px; font-weight: bold; color: #ffffff;"></span>
                        <div style="display: flex; gap: 10px;">
                            <span style="color: #ffffff; font-size: 14px; cursor: pointer;">⚙️</span>
                            <span id="closeGuest" style="color: #ffffff; font-size: 16px; cursor: pointer; font-weight: bold;">×</span>
                        </div>
                    </div>
                    
                    <div style="padding: 15px; display: flex; align-items: flex-start;">
                        <img id="guestAvatar" src="" style="width: 50px; height: 50px; border: 1px solid #666666; margin-right: 15px;">
                        <div style="flex: 1;">
                            <div id="guestUsername" style="font-size: 16px; font-weight: bold; color: #ffffff; margin-bottom: 5px;"></div>
                            <div id="guestStatus" style="color: #00ff00; font-size: 12px; margin-bottom: 3px;">Online</div>
                            <div id="guestFriendStatus" style="color: #cccccc; font-size: 11px;">Not added you as a friend</div>
                        </div>
                    </div>
                    
                    <!-- Guest buttons (minimal) -->
                    <div style="padding: 0 15px 15px 15px;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                            <button class="guest-btn" data-action="privatechat" style="background: linear-gradient(to bottom, #3a3a3a 0%, #2a2a2a 100%); border: 1px solid #555555; color: #ffffff; padding: 8px; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 5px;">
                                <span>💬</span> Private Chat
                            </button>
                            <button class="guest-btn" data-action="privatemessage" style="background: linear-gradient(to bottom, #3a3a3a 0%, #2a2a2a 100%); border: 1px solid #555555; color: #ffffff; padding: 8px; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 5px;">
                                <span>✉️</span> Private Message
                            </button>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(this.elements.guestModal);
            
            document.getElementById('closeGuest').onclick = () => {
                this.elements.guestModal.style.display = 'none';
            };
            
            this.elements.guestModal.onclick = (e) => {
                if (e.target === this.elements.guestModal) {
                    this.elements.guestModal.style.display = 'none';
                }
            };
            
            document.querySelectorAll('.guest-btn').forEach(btn => {
                btn.onclick = (e) => {
                    const action = e.currentTarget.dataset.action;
                    this.handleGuestAction(action, user);
                };
            });
        }
        
        document.getElementById('guestTitle').textContent = user.id;
        document.getElementById('guestAvatar').src = `/avatars/${user.avatar}.png`;
        document.getElementById('guestUsername').textContent = user.nickname || user.username;
        
        this.elements.guestModal.style.display = 'flex';
    }
    
    showBotMenu(user) {
        console.log('🎭 [CLIENT] Showing bot menu for user:', user);
        
        if (!this.elements.botModal) {
            this.elements.botModal = document.createElement('div');
            this.elements.botModal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: none;
                justify-content: center;
                align-items: center;
                z-index: 1000;
            `;
            
            this.elements.botModal.innerHTML = `
                <div style="background: #2a2a2a; border: 1px solid #444444; border-radius: 4px; width: 350px; color: #ffffff; font-family: Arial, sans-serif; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);">
                    <div style="background: #1a1a1a; padding: 8px 12px; border-bottom: 1px solid #444444; display: flex; justify-content: space-between; align-items: center;">
                        <span id="botTitle" style="font-size: 14px; font-weight: bold; color: #ffffff;"></span>
                        <div style="display: flex; gap: 10px;">
                            <span style="color: #ffffff; font-size: 14px; cursor: pointer;">⚙️</span>
                            <span id="closeBot" style="color: #ffffff; font-size: 16px; cursor: pointer; font-weight: bold;">×</span>
                        </div>
                    </div>
                    
                    <div style="padding: 15px; display: flex; align-items: flex-start;">
                        <img id="botAvatar" src="" style="width: 50px; height: 50px; border: 1px solid #666666; margin-right: 15px;">
                        <div style="flex: 1;">
                            <div id="botUsername" style="font-size: 16px; font-weight: bold; color: #ffffff; margin-bottom: 5px;"></div>
                            <div id="botStatus" style="color: #00ff00; font-size: 12px; margin-bottom: 3px;">Online</div>
                            <div id="botType" style="color: #cccccc; font-size: 11px;">Bot Account</div>
                        </div>
                    </div>
                    
                    <!-- Bot buttons (bot-specific) -->
                    <div style="padding: 0 15px 15px 15px;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                            <button class="bot-btn" data-action="configure" style="background: linear-gradient(to bottom, #3a3a3a 0%, #2a2a2a 100%); border: 1px solid #555555; color: #ffffff; padding: 8px; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 5px;">
                                <span>⚙️</span> Configure Bot
                            </button>
                            <button class="bot-btn" data-action="responses" style="background: linear-gradient(to bottom, #3a3a3a 0%, #2a2a2a 100%); border: 1px solid #555555; color: #ffffff; padding: 8px; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 5px;">
                                <span>🤖</span> Set Responses
                            </button>
                            <button class="bot-btn" data-action="enable" style="background: linear-gradient(to bottom, #3a3a3a 0%, #2a2a2a 100%); border: 1px solid #555555; color: #ffffff; padding: 8px; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 5px;">
                                <span style="color: #00ff00;">✅</span> Enable Bot
                            </button>
                            <button class="bot-btn" data-action="disable" style="background: linear-gradient(to bottom, #3a3a3a 0%, #2a2a2a 100%); border: 1px solid #555555; color: #ffffff; padding: 8px; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 5px;">
                                <span style="color: #ff4444;">❌</span> Disable Bot
                            </button>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(this.elements.botModal);
            
            document.getElementById('closeBot').onclick = () => {
                this.elements.botModal.style.display = 'none';
            };
            
            this.elements.botModal.onclick = (e) => {
                if (e.target === this.elements.botModal) {
                    this.elements.botModal.style.display = 'none';
                }
            };
            
            document.querySelectorAll('.bot-btn').forEach(btn => {
                btn.onclick = (e) => {
                    const action = e.currentTarget.dataset.action;
                    this.handleBotAction(action, user);
                };
            });
        }
        
        document.getElementById('botTitle').textContent = user.id;
        document.getElementById('botAvatar').src = `/avatars/${user.avatar}.png`;
        document.getElementById('botUsername').textContent = user.nickname || user.username;
        
        this.elements.botModal.style.display = 'flex';
    }
    
    handleProfileAction(action) {
        console.log('🎭 [CLIENT] Profile action:', action);
        
        switch (action) {
            case 'settings':
                alert('Settings functionality coming soon!');
                break;
            case 'login':
                alert('Login functionality coming soon!');
                break;
            case 'divorce':
                alert('Divorce functionality coming soon!');
                break;
            case 'buyxats':
                alert('Buy xats functionality coming soon!');
                break;
            case 'store':
                alert('xat Store functionality coming soon!');
                break;
            case 'powers':
                alert('Powers functionality coming soon!');
                break;
            case 'gifts':
                alert('Gifts functionality coming soon!');
                break;
            case 'save':
                alert('Profile saved!');
                break;
        }
    }
    
    handleMainOwnerAction(action, targetUser) {
        console.log('🎭 [CLIENT] Main owner action:', action, 'for user:', targetUser);
        
        switch (action) {
            case 'privatechat':
                this.startPrivateChat(targetUser);
                break;
            case 'privatemessage':
                this.sendPrivateMessage(targetUser);
                break;
            case 'addfriend':
                this.addAsFriend(targetUser);
                break;
            case 'ignore':
                this.ignoreUser(targetUser);
                break;
            case 'kick':
                this.kickUser(targetUser);
                break;
            case 'ban':
                this.banUser(targetUser);
                break;
            case 'makeguest':
                this.makeUserGuest(targetUser);
                break;
            case 'makemember':
                this.makeUserMember(targetUser);
                break;
            case 'makemoderator':
                this.makeUserModerator(targetUser);
                break;
            case 'makeowner':
                this.makeUserOwner(targetUser);
                break;
            case 'divorce':
                this.divorceUser(targetUser);
                break;
            case 'transfer':
                this.transferOwnership(targetUser);
                break;
            case 'powers':
                this.showUserPowers(targetUser);
                break;
        }
    }
    
    handleOwnerAction(action, targetUser) {
        console.log('🎭 [CLIENT] Owner action:', action, 'for user:', targetUser);
        // Same as main owner but no transfer
        this.handleMainOwnerAction(action, targetUser);
    }
    
    handleModeratorAction(action, targetUser) {
        console.log('🎭 [CLIENT] Moderator action:', action, 'for user:', targetUser);
        
        switch (action) {
            case 'privatechat':
                this.startPrivateChat(targetUser);
                break;
            case 'privatemessage':
                this.sendPrivateMessage(targetUser);
                break;
            case 'addfriend':
                this.addAsFriend(targetUser);
                break;
            case 'ignore':
                this.ignoreUser(targetUser);
                break;
            case 'kick':
                this.kickUser(targetUser);
                break;
            case 'ban':
                this.banUser(targetUser);
                break;
            case 'makeguest':
                this.makeUserGuest(targetUser);
                break;
            case 'makemember':
                this.makeUserMember(targetUser);
                break;
            default:
                alert('Action not available for moderators!');
        }
    }
    
    handleMemberAction(action, targetUser) {
        console.log('🎭 [CLIENT] Member action:', action, 'for user:', targetUser);
        
        switch (action) {
            case 'privatechat':
                this.startPrivateChat(targetUser);
                break;
            case 'privatemessage':
                this.sendPrivateMessage(targetUser);
                break;
            case 'addfriend':
                this.addAsFriend(targetUser);
                break;
            case 'ignore':
                this.ignoreUser(targetUser);
                break;
            default:
                alert('Action not available for members!');
        }
    }
    
    handleGuestAction(action, targetUser) {
        console.log('🎭 [CLIENT] Guest action:', action, 'for user:', targetUser);
        
        switch (action) {
            case 'privatechat':
                this.startPrivateChat(targetUser);
                break;
            case 'privatemessage':
                this.sendPrivateMessage(targetUser);
                break;
            default:
                alert('Action not available for guests!');
        }
    }
    
    handleBotAction(action, targetUser) {
        console.log('🎭 [CLIENT] Bot action:', action, 'for user:', targetUser);
        
        switch (action) {
            case 'configure':
                this.configureBot(targetUser);
                break;
            case 'responses':
                this.setBotResponses(targetUser);
                break;
            case 'enable':
                this.enableBot(targetUser);
                break;
            case 'disable':
                this.disableBot(targetUser);
                break;
        }
    }
    
    configureBot(targetUser) {
        console.log('🎭 [CLIENT] Configuring bot:', targetUser);
        alert(`Bot configuration for ${targetUser.nickname || targetUser.username} - Coming soon!`);
    }
    
    setBotResponses(targetUser) {
        console.log('🎭 [CLIENT] Setting bot responses:', targetUser);
        alert(`Bot responses for ${targetUser.nickname || targetUser.username} - Coming soon!`);
    }
    
    enableBot(targetUser) {
        console.log('🎭 [CLIENT] Enabling bot:', targetUser);
        if (this.socket) {
            this.socket.emit('enable_bot', { targetUserId: targetUser.id });
        }
        alert(`Bot ${targetUser.nickname || targetUser.username} has been enabled!`);
    }
    
    disableBot(targetUser) {
        console.log('🎭 [CLIENT] Disabling bot:', targetUser);
        if (this.socket) {
            this.socket.emit('disable_bot', { targetUserId: targetUser.id });
        }
        alert(`Bot ${targetUser.nickname || targetUser.username} has been disabled!`);
    }
    
    insertSmiley(smiley) {
        const input = this.elements.messageInput;
        const start = input.selectionStart;
        const end = input.selectionEnd;
        const text = input.value;
        
        input.value = text.substring(0, start) + smiley + text.substring(end);
        input.selectionStart = input.selectionEnd = start + smiley.length;
        input.focus();
    }
    
    playRadio() {
        const url = document.getElementById('radioUrl')?.value;
        if (url) {
            console.log('🎭 [CLIENT] Playing radio:', url);
            // Radio implementation
        }
    }
    
    stopRadio() {
        console.log('🎭 [CLIENT] Stopping radio');
        // Radio stop implementation
    }
    
    ask8Ball() {
        const question = document.getElementById('8ballQuestion')?.value;
        if (question) {
            const answers = [
                'It is certain', 'It is decidedly so', 'Without a doubt', 'Yes definitely',
                'Reply hazy, try again', 'Ask again later', 'Better not tell you now',
                'Don\'t count on it', 'My reply is no', 'My sources say no'
            ];
            const answer = answers[Math.floor(Math.random() * answers.length)];
            document.getElementById('8ballAnswer').textContent = answer;
            
            if (this.socket) {
                this.socket.emit('message', { message: `8-Ball says: ${answer}` });
            }
        }
    }
    
    // Power System Methods
    async loadPowers() {
        try {
            console.log('🎭 [CLIENT] Loading powers from API...');
            const response = await fetch('/api/powers');
            const data = await response.json();
            this.powers = data.powers || [];
            console.log('🎭 [CLIENT] Loaded', this.powers.length, 'powers');
            return this.powers;
        } catch (error) {
            console.error('🎭 [CLIENT] Error loading powers:', error);
            return [];
        }
    }
    
    switchTab(tabId) {
        console.log('🎭 [CLIENT] Switching to tab:', tabId);
        this.currentTab = tabId;
        
        // Update tab styles
        const tabs = this.elements.header.querySelectorAll('[data-tab]');
        tabs.forEach(tab => {
            const isActive = tab.dataset.tab === tabId;
            tab.style.background = isActive ? 
                `linear-gradient(to bottom, ${tab.dataset.color} 0%, ${tab.dataset.color}80 50%, ${tab.dataset.color}60 100%)` :
                'linear-gradient(to bottom, #3a3a3a 0%, #2a2a2a 50%, #1a1a1a 100%)';
            tab.style.borderColor = isActive ? tab.dataset.color : '#555555';
            tab.style.color = isActive ? '#ffffff' : '#cccccc';
        });
        
        // Show appropriate content
        this.showTabContent(tabId);
    }
    
    showTabContent(tabId) {
        // Hide all content areas
        const contentAreas = ['chatArea', 'powersArea', 'smiliesArea'];
        contentAreas.forEach(area => {
            if (this.elements[area]) {
                this.elements[area].style.display = 'none';
            }
        });
        
        // Show selected content - ORIGINAL TABS ONLY
        switch (tabId) {
            case 'chat':
                if (this.elements.chatArea) {
                    this.elements.chatArea.style.display = 'block';
                }
                break;
            case 'powers':
                this.showPowersTab();
                break;
            case 'smilies':
                this.showSmiliesTab();
                break;
        }
    }
    
    showPowersTab() {
        console.log('🎭 [CLIENT] Showing powers tab...');
        
        // Create powers area if it doesn't exist
        if (!this.elements.powersArea) {
            this.elements.powersArea = document.createElement('div');
            this.elements.powersArea.style.cssText = `
                position: absolute;
                top: 30px;
                left: 0;
                right: 200px;
                bottom: 85px;
                background: rgba(0, 0, 0, 0.95);
                border-right: 2px solid #ffcc00;
                overflow-y: auto;
                padding: 10px;
                z-index: 5;
                font-family: Arial, sans-serif;
                font-size: 12px;
                color: #ffffff;
            `;
            this.container.appendChild(this.elements.powersArea);
        }
        
        this.elements.powersArea.style.display = 'block';
        this.elements.chatArea.style.display = 'none';
        
        // Load and display powers
        this.displayPowers();
    }
    
    async displayPowers() {
        if (this.powers.length === 0) {
            await this.loadPowers();
        }
        
        const powersArea = this.elements.powersArea;
        powersArea.innerHTML = `
            <div style="text-align: center; margin-bottom: 15px;">
                <h2 style="color: #ffcc00; margin: 0; font-size: 18px;">⚡ iXat Powers Store</h2>
                <p style="color: #cccccc; margin: 5px 0;">${this.powers.length} authentic powers available</p>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 10px;">
        `;
        
        this.powers.forEach(power => {
            const powerElement = document.createElement('div');
            powerElement.style.cssText = `
                background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);
                border: 2px solid #ffcc00;
                border-radius: 8px;
                padding: 10px;
                text-align: center;
                transition: all 0.3s ease;
                cursor: pointer;
            `;
            
            powerElement.innerHTML = `
                <div style="font-size: 24px; margin-bottom: 5px;">⚡</div>
                <div style="font-weight: bold; color: #ffcc00; margin-bottom: 5px;">${power.name}</div>
                <div style="color: #cccccc; font-size: 11px; margin-bottom: 8px;">${power.cost} xats</div>
                <div style="color: #999999; font-size: 10px; line-height: 1.3;">${power.description.substring(0, 80)}${power.description.length > 80 ? '...' : ''}</div>
                <button onclick="window.ixatClient.buyPower('${power.name}')" style="
                    background: linear-gradient(to bottom, #ffcc00 0%, #ffaa00 100%);
                    border: none;
                    border-radius: 4px;
                    color: #000000;
                    padding: 5px 15px;
                    font-weight: bold;
                    cursor: pointer;
                    margin-top: 8px;
                    font-size: 11px;
                ">Buy Power</button>
            `;
            
            powerElement.onmouseover = () => {
                powerElement.style.transform = 'translateY(-2px)';
                powerElement.style.boxShadow = '0 4px 8px rgba(255, 204, 0, 0.3)';
            };
            
            powerElement.onmouseout = () => {
                powerElement.style.transform = 'translateY(0)';
                powerElement.style.boxShadow = 'none';
            };
            
            powersArea.appendChild(powerElement);
        });
        
        powersArea.innerHTML += '</div>';
    }
    
    async buyPower(powerName) {
        console.log('🎭 [CLIENT] Attempting to buy power:', powerName);
        
        try {
            const response = await fetch('/api/powers/buy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    powerName: powerName,
                    userId: this.currentUser?.id || 'guest'
                })
            });
            
            const result = await response.json();
            
            if (result.success) {
                console.log('🎭 [CLIENT] Power purchased successfully:', result.message);
                alert(`✅ ${result.message}\n\nPower: ${result.power.name}\nCost: ${result.power.cost} xats\n\nDescription: ${result.power.description}`);
            } else {
                console.error('🎭 [CLIENT] Power purchase failed:', result.message);
                alert(`❌ Purchase failed: ${result.message}`);
            }
            
        } catch (error) {
            console.error('🎭 [CLIENT] Error buying power:', error);
            alert(`❌ Error: Could not connect to server. Please try again.`);
        }
    }
    
    showSmiliesTab() {
        console.log('🎭 [CLIENT] Showing smilies tab...');
        
        // Create smilies area if it doesn't exist
        if (!this.elements.smiliesArea) {
            this.elements.smiliesArea = document.createElement('div');
            this.elements.smiliesArea.style.cssText = `
                position: absolute;
                top: 30px;
                left: 0;
                right: 200px;
                bottom: 85px;
                background: rgba(0, 0, 0, 0.95);
                border-right: 2px solid #ff9900;
                overflow-y: auto;
                padding: 10px;
                z-index: 5;
                font-family: Arial, sans-serif;
                font-size: 12px;
                color: #ffffff;
            `;
            this.container.appendChild(this.elements.smiliesArea);
        }
        
        this.elements.smiliesArea.style.display = 'block';
        this.elements.chatArea.style.display = 'none';
        
        const smilies = ['😊', '😂', '😍', '😎', '😢', '😡', '😴', '😇', '🤔', '😋', '😘', '😜', '😁', '😄', '😅', '😆', '😉', '😌', '😍', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '😎', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣', '😖', '😫', '😩', '😤', '😠', '😡', '😶', '😐', '😑', '😯', '😦', '😧', '😮', '😲', '😴', '😵', '😳', '😱', '😨', '😰', '😢', '😥', '😭', '😓', '😪', '😷', '🤒', '🤕', '🤢', '🤧', '😈', '👿', '👹', '👺', '💀', '👻', '👽', '🤖', '💩', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾'];
        
        this.elements.smiliesArea.innerHTML = `
            <div style="text-align: center; margin-bottom: 15px;">
                <h2 style="color: #ff9900; margin: 0; font-size: 18px;">😊 Smilies</h2>
                <p style="color: #cccccc; margin: 5px 0;">Click a smiley to add it to your message</p>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(40px, 1fr)); gap: 5px; padding: 10px;">
        `;
        
        smilies.forEach(smiley => {
            const smileyElement = document.createElement('div');
            smileyElement.textContent = smiley;
            smileyElement.style.cssText = `
                font-size: 24px;
                text-align: center;
                padding: 5px;
                cursor: pointer;
                border-radius: 3px;
                transition: all 0.2s ease;
            `;
            
            smileyElement.onmouseover = () => {
                smileyElement.style.background = 'rgba(255, 153, 0, 0.3)';
                smileyElement.style.transform = 'scale(1.2)';
            };
            
            smileyElement.onmouseout = () => {
                smileyElement.style.background = 'transparent';
                smileyElement.style.transform = 'scale(1)';
            };
            
            smileyElement.onclick = () => this.insertSmiley(smiley);
            
            this.elements.smiliesArea.appendChild(smileyElement);
        });
        
        this.elements.smiliesArea.innerHTML += '</div>';
    }
    

    

    

    

    

    

    

    
    switchChatGroup(groupId) {
        console.log('🎭 [CLIENT] Switching chat group to:', groupId);
        
        this.currentChatGroup = groupId;
        const group = this.chatGroups.find(g => g.id === groupId);
        
        // Update the room name in the header
        const roomTitle = this.elements.header.querySelector('div');
        if (roomTitle) {
            roomTitle.innerHTML = `
                <span style="font-size: 16px; margin-right: 8px;">🪐</span>
                ${group ? group.name : 'Chat'}
            `;
        }
        
        // Update chat group button styling
        const groupButtons = this.elements.leftSidebar.querySelectorAll('div');
        groupButtons.forEach(btn => {
            if (btn.textContent && this.chatGroups.some(g => g.name === btn.textContent)) {
                if (btn.textContent === group.name) {
                    btn.style.background = '#28a745';
                    btn.style.borderColor = '#28a745';
                } else {
                    btn.style.background = '#333333';
                    btn.style.borderColor = '#444444';
                }
            }
        });
        
        // Clear chat and add system message
        this.elements.chatArea.innerHTML = '';
        this.addMessage({
            type: 'system',
            text: `Welcome to ${group.name}!`,
            timestamp: new Date()
        });
        
        // Emit to server
        if (this.socket) {
            this.socket.emit('switch_room', { roomId: groupId });
        }
        
        console.log('🎭 [CLIENT] Switched to chat group:', group.name);
    }
    
    showGuestLevelUp(data) {
        // Create level up notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #4CAF50, #45a049);
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 10000;
            font-family: Arial, sans-serif;
            font-size: 14px;
            max-width: 300px;
            animation: slideIn 0.3s ease-out;
        `;
        
        notification.innerHTML = `
            <div style="font-weight: bold; margin-bottom: 5px;">🎉 Level Up!</div>
            <div>You reached level ${data.newLevel}!</div>
            <div style="font-size: 12px; margin-top: 5px; opacity: 0.9;">
                +${data.xatsReward} xats earned!
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOut 0.3s ease-in';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
        
        // Update stored level
        localStorage.setItem('guestLevel', data.newLevel);
        localStorage.setItem('guestExperience', data.experience);
    }
    
    showUpgradePrompt(data) {
        // Create upgrade prompt modal
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            font-family: Arial, sans-serif;
        `;
        
        modal.innerHTML = `
            <div style="background: #2a2a2a; border: 1px solid #444; border-radius: 8px; padding: 20px; max-width: 400px; color: white;">
                <h3 style="color: #ffcc00; margin-top: 0;">🚀 Ready to Upgrade?</h3>
                <p>You've reached level ${data.level}! You can now upgrade to a full member account.</p>
                <div style="margin: 15px 0;">
                    <strong>Benefits of upgrading:</strong>
                    <ul style="margin: 10px 0; padding-left: 20px;">
                        ${data.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                    </ul>
                </div>
                <div style="display: flex; gap: 10px; justify-content: flex-end; margin-top: 20px;">
                    <button id="upgradeLater" style="background: #666; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">
                        Maybe Later
                    </button>
                    <button id="upgradeNow" style="background: #4CAF50; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">
                        Upgrade Now
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Handle button clicks
        modal.querySelector('#upgradeLater').onclick = () => {
            modal.remove();
        };
        
        modal.querySelector('#upgradeNow').onclick = () => {
            modal.remove();
            // Redirect to registration page
            window.location.href = '/auth.html?upgrade=true';
        };
    }
    
    handlePrivateMessage(data) {
        console.log('🎭 [CLIENT] Handling private message:', data);
        
        // Show private message notification
        this.showPrivateMessageNotification(data);
        
        // Always store the message in the private messages history
        const chatId = `pm_${data.fromId}`;
        if (!this.privateMessages) {
            this.privateMessages = {};
        }
        if (!this.privateMessages[chatId]) {
            this.privateMessages[chatId] = [];
        }
        
        // Add message to history
        const messageData = {
            from: data.from,
            message: data.message,
            timestamp: new Date(data.timestamp).toLocaleTimeString(),
            isReceived: true
        };
        
        this.privateMessages[chatId].push(messageData);
        
        // Limit messages (like iXat did)
        if (this.privateMessages[chatId].length > 25) {
            this.privateMessages[chatId].shift();
        }
        
        console.log('🎭 [CLIENT] Stored private message in history:', this.privateMessages[chatId]);
        
        // If private chat is open for this user, add message to it
        if (this.currentPrivateChatTarget && this.currentPrivateChatTarget.id === data.fromId) {
            this.addPrivateMessageToTab(messageData);
        }
    }
    
    showPrivateMessageNotification(data) {
        // Create notification for private message
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 20px;
            background: linear-gradient(135deg, #ff6b6b, #ee5a52);
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 10000;
            font-family: Arial, sans-serif;
            font-size: 14px;
            max-width: 300px;
            cursor: pointer;
            animation: slideInLeft 0.3s ease-out;
        `;
        
        notification.innerHTML = `
            <div style="font-weight: bold; margin-bottom: 5px;">💬 Private Message</div>
            <div style="font-size: 12px; margin-bottom: 3px;">From: ${data.from}</div>
            <div style="font-size: 11px; opacity: 0.9;">${data.message}</div>
        `;
        
        document.body.appendChild(notification);
        
        // Click to open private chat
        notification.onclick = () => {
            notification.remove();
            // Find the user and open private chat
            const user = Array.from(this.users.values()).find(u => u.id === data.fromId);
            if (user) {
                this.startPrivateChat(user);
            }
        };
        
        // Auto remove after 10 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutLeft 0.3s ease-in';
                setTimeout(() => notification.remove(), 300);
            }
        }, 10000);
    }
    
    showPrivateMessageSent(data) {
        // Show confirmation that message was sent
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #4CAF50, #45a049);
            color: white;
            padding: 10px 15px;
            border-radius: 6px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            z-index: 10000;
            font-family: Arial, sans-serif;
            font-size: 12px;
            animation: slideIn 0.3s ease-out;
        `;
        
        notification.innerHTML = `
            <div>✅ Message sent to ${data.to}</div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOut 0.3s ease-in';
                setTimeout(() => notification.remove(), 300);
            }
        }, 3000);
    }
}

// Global function to create chat instance
window.createIxatChat = function(containerId, config) {
    console.log('🎭 [GLOBAL] createIxatChat called with containerId:', containerId);
    console.log('🎭 [GLOBAL] Config:', config);
    console.log('🎭 [GLOBAL] Container element exists:', !!document.getElementById(containerId));
    
    try {
        const client = new IxatClient(containerId, config);
        window.ixatClient = client;
        console.log('🎭 [GLOBAL] Client created successfully:', client);
        return client;
        } catch (error) {
        console.error('🎭 [GLOBAL] Error creating client:', error);
        throw error;
    }
};

// Test if global function is available
console.log('🎭 [GLOBAL] createIxatChat function available:', typeof window.createIxatChat);
