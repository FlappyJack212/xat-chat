/**
 * ChatSystem - Manages xat.com style chat functionality
 * Handles message display, formatting, commands, and chat features
 */

class ChatSystem {
    constructor(xatInterface) {
        this.xat = xatInterface;
        this.messages = [];
        this.maxMessages = 200;
        this.chatContainer = null;
        this.messageSound = null;
        
        this.moduleName = 'ChatSystem';
        this.init();
    }

    init() {
        this.chatContainer = this.xat.elements.chatMessages;
        this.setupChatCommands();
        this.loadSounds();
        logger.debug(this.moduleName, 'Chat system initialized');
    }

    /**
     * Setup chat commands
     */
    setupChatCommands() {
        this.commands = {
            '/help': this.showHelp.bind(this),
            '/clear': this.clearChat.bind(this),
            '/time': this.showTime.bind(this),
            '/users': this.showUsers.bind(this),
            '/me': this.showAction.bind(this),
            '/kiss': this.sendKiss.bind(this),
            '/hug': this.sendHug.bind(this),
            '/roll': this.rollDice.bind(this),
            '/8ball': this.eightBall.bind(this),
            '/flip': this.flipCoin.bind(this)
        };
    }

    /**
     * Load chat sounds
     */
    async loadSounds() {
        try {
            this.messageSound = new Audio('/sounds/message.mp3');
            this.messageSound.volume = 0.3;
        } catch (error) {
            logger.warn(this.moduleName, 'Failed to load chat sounds:', error);
        }
    }

    /**
     * Handle incoming message from server
     */
    handleIncomingMessage(data) {
        const message = {
            id: data.id || this.generateMessageId(),
            text: data.text,
            user: data.user,
            timestamp: data.timestamp || Date.now(),
            type: data.type || 'chat',
            effects: data.effects || []
        };

        this.addMessage(message);
        this.playMessageSound();
    }

    /**
     * Add a message to the chat
     */
    addMessage(message) {
        if (!this.chatContainer) return;

        // Create message element
        const messageElement = this.createMessageElement(message);
        
        // Add to container
        this.chatContainer.appendChild(messageElement);
        
        // Store message
        this.messages.push(message);
        
        // Trim old messages
        this.trimOldMessages();
        
        // Scroll to bottom
        this.scrollToBottom();
        
        // Apply entrance animation
        messageElement.classList.add('message-effect-entrance');
    }

    /**
     * Create message element
     */
    createMessageElement(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${message.type}`;
        messageDiv.dataset.messageId = message.id;

        // Add timestamp
        const timestamp = document.createElement('span');
        timestamp.className = 'timestamp';
        timestamp.textContent = this.formatTimestamp(message.timestamp);
        messageDiv.appendChild(timestamp);

        // Add username with appropriate styling
        if (message.user && message.type !== 'system') {
            const username = document.createElement('span');
            username.className = `username ${message.user.rank || 'guest'}`;
            username.textContent = message.user.username + ':';
            
            // Add pawn if user has one
            if (message.user.pawn && message.user.pawn !== 'white') {
                const pawn = document.createElement('span');
                pawn.className = `pawn pawn-${message.user.pawn}`;
                username.insertBefore(pawn, username.firstChild);
            }
            
            messageDiv.appendChild(username);
        }

        // Add message text with effects
        const textSpan = document.createElement('span');
        textSpan.className = 'text';
        
        if (message.effects && message.effects.length > 0) {
            textSpan.className += ' ' + message.effects.join(' ');
        }
        
        // Process message text for special formatting
        const processedText = this.processMessageText(message.text);
        textSpan.innerHTML = processedText;
        
        messageDiv.appendChild(textSpan);

        return messageDiv;
    }

    /**
     * Process message text for smilies, mentions, etc.
     */
    processMessageText(text) {
        // Escape HTML first
        let processed = SecurityUtils.escapeHTML(text);
        
        // Process smilies
        processed = this.processSmilies(processed);
        
        // Process mentions
        processed = this.processMentions(processed);
        
        // Process URLs
        processed = this.processUrls(processed);
        
        return processed;
    }

    /**
     * Process smilies in text
     */
    processSmilies(text) {
        const smilies = {
            ':)': '😊',
            ':D': '😄',
            ';)': '😉',
            ':(': '😢',
            ':P': '😛',
            ':o': '😮',
            ':angry:': '😠',
            ':love:': '😍',
            ':cry:': '😭',
            ':cool:': '😎'
        };

        for (const [code, emoji] of Object.entries(smilies)) {
            text = text.replaceAll(code, emoji);
        }

        return text;
    }

    /**
     * Process @mentions
     */
    processMentions(text) {
        return text.replace(/@(\w+)/g, '<span class="mention">@$1</span>');
    }

    /**
     * Process URLs
     */
    processUrls(text) {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.replace(urlRegex, '<a href="$1" target="_blank" rel="noopener">$1</a>');
    }

    /**
     * Add system message
     */
    addSystemMessage(text) {
        const message = {
            id: this.generateMessageId(),
            text: text,
            user: { username: 'System', rank: 'system' },
            timestamp: Date.now(),
            type: 'system'
        };

        this.addMessage(message);
    }

    /**
     * Process chat command
     */
    processCommand(text) {
        const parts = text.split(' ');
        const command = parts[0].toLowerCase();
        const args = parts.slice(1);

        if (this.commands[command]) {
            this.commands[command](args);
            return true;
        }

        return false;
    }

    /**
     * Chat commands implementation
     */
    showHelp(args) {
        const helpText = `
            Available commands:
            /help - Show this help
            /clear - Clear chat
            /time - Show current time
            /users - Show user count
            /me <action> - Show action
            /kiss <user> - Send a kiss
            /hug <user> - Send a hug
            /roll <sides> - Roll dice
            /8ball <question> - Magic 8-ball
            /flip - Flip a coin
        `;
        this.addSystemMessage(helpText);
    }

    clearChat(args) {
        if (this.chatContainer) {
            this.chatContainer.innerHTML = '';
            this.messages = [];
        }
        this.addSystemMessage('Chat cleared');
    }

    showTime(args) {
        const now = new Date();
        this.addSystemMessage(`Current time: ${now.toLocaleTimeString()}`);
    }

    showUsers(args) {
        const userCount = this.xat.users.size;
        this.addSystemMessage(`There are ${userCount} users online`);
    }

    showAction(args) {
        if (!this.xat.currentUser) return;
        
        const action = args.join(' ');
        if (!action) {
            this.addSystemMessage('Usage: /me <action>');
            return;
        }

        const message = {
            id: this.generateMessageId(),
            text: action,
            user: this.xat.currentUser,
            timestamp: Date.now(),
            type: 'action'
        };

        this.addMessage(message);
    }

    sendKiss(args) {
        const target = args[0];
        if (!target) {
            this.addSystemMessage('Usage: /kiss <username>');
            return;
        }

        this.xat.powerSystem.activateSpecialPower('kiss');
        this.addSystemMessage(`You sent a kiss to ${target}! 😘`);
    }

    sendHug(args) {
        const target = args[0];
        if (!target) {
            this.addSystemMessage('Usage: /hug <username>');
            return;
        }

        this.xat.powerSystem.activateSpecialPower('hug');
        this.addSystemMessage(`You sent a hug to ${target}! 🤗`);
    }

    rollDice(args) {
        const sides = parseInt(args[0]) || 6;
        if (sides < 2 || sides > 100) {
            this.addSystemMessage('Dice must have 2-100 sides');
            return;
        }

        const result = Math.floor(Math.random() * sides) + 1;
        this.addSystemMessage(`🎲 You rolled a ${result} (1-${sides})`);
    }

    eightBall(args) {
        const question = args.join(' ');
        if (!question) {
            this.addSystemMessage('Usage: /8ball <question>');
            return;
        }

        const responses = [
            'It is certain', 'It is decidedly so', 'Without a doubt',
            'Yes definitely', 'You may rely on it', 'As I see it, yes',
            'Most likely', 'Outlook good', 'Yes', 'Signs point to yes',
            'Reply hazy, try again', 'Ask again later', 'Better not tell you now',
            'Cannot predict now', 'Concentrate and ask again',
            "Don't count on it", 'My reply is no', 'My sources say no',
            'Outlook not so good', 'Very doubtful'
        ];

        const response = responses[Math.floor(Math.random() * responses.length)];
        this.addSystemMessage(`🎱 ${response}`);
    }

    flipCoin(args) {
        const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
        this.addSystemMessage(`🪙 Coin flip result: ${result}`);
    }

    /**
     * Trim old messages to prevent memory issues
     */
    trimOldMessages() {
        while (this.messages.length > this.maxMessages) {
            this.messages.shift();
            
            // Remove from DOM
            const firstMessage = this.chatContainer?.firstElementChild;
            if (firstMessage) {
                firstMessage.remove();
            }
        }
    }

    /**
     * Scroll chat to bottom
     */
    scrollToBottom() {
        if (this.chatContainer) {
            this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
        }
    }

    /**
     * Play message sound
     */
    playMessageSound() {
        if (this.messageSound && !document.hidden) {
            try {
                this.messageSound.currentTime = 0;
                this.messageSound.play().catch(() => {
                    // Ignore autoplay errors
                });
            } catch (error) {
                // Ignore sound errors
            }
        }
    }

    /**
     * Format timestamp for display
     */
    formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `[${hours}:${minutes}]`;
    }

    /**
     * Generate unique message ID
     */
    generateMessageId() {
        return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * Clear all messages
     */
    clear() {
        this.messages = [];
        if (this.chatContainer) {
            this.chatContainer.innerHTML = '';
        }
    }
}

// Make available globally
if (typeof window !== 'undefined') {
    window.ChatSystem = ChatSystem;
}