// Core chat functionality for the new PakciXat structure
'use strict';

// Global variables
window.Classic = window.Classic || {};
window.isWEB = true;
window.config = {
    fake: 0,
    xtrace: 1,
    trace: 0,
    xatback: "XatBackground.jpg"
};

// Chat state
let messages = [];
let users = [];
let currentUser = null;
let socket = null;

// Initialize chat when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎭 [CHAT] Initializing chat core...');
    initializeChat();
});

function initializeChat() {
    // Initialize socket connection
    initializeSocket();
    
    // Setup event listeners
    setupEventListeners();
    
    // Add some sample data for testing
    addSampleData();
    
    console.log('✅ [CHAT] Chat core initialized');
}

function initializeSocket() {
    // For now, we'll simulate socket connection
    // In a real implementation, this would connect to your WebSocket server
    console.log('🔌 [SOCKET] Initializing socket connection...');
    
    // Simulate connection
    setTimeout(() => {
        console.log('✅ [SOCKET] Connected to server');
        onConnected();
    }, 1000);
}

function onConnected() {
    // Add welcome message
    addMessage({
        id: 1,
        name: 'System',
        text: 'Welcome to the chat!',
        time: new Date().toLocaleTimeString(),
        type: 'system'
    });
    
    // Add current user
    currentUser = {
        id: 1,
        name: 'You',
        status: 'online',
        avatar: '👤'
    };
    
    addUser(currentUser);
}

function setupEventListeners() {
    // Message input
    const messageInput = document.getElementById('messageInput');
    if (messageInput) {
        messageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // Send button
    const sendButton = document.getElementById('sendButton');
    if (sendButton) {
        sendButton.addEventListener('click', sendMessage);
    }
    
    // Sidebar toggle
    const sidebarToggle = document.getElementById('sidebarToggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }
}

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    if (!messageInput || !messageInput.value.trim()) return;
    
    const message = {
        id: Date.now(),
        name: currentUser ? currentUser.name : 'You',
        text: messageInput.value.trim(),
        time: new Date().toLocaleTimeString(),
        type: 'user'
    };
    
    // Add message to display
    addMessage(message);
    
    // Clear input
    messageInput.value = '';
    
    // Simulate other users responding
    setTimeout(() => {
        simulateResponse();
    }, 1000 + Math.random() * 2000);
}

function addMessage(message) {
    messages.push(message);
    displayMessage(message);
}

function displayMessage(message) {
    const messagesContainer = document.getElementById('messagesContainer');
    if (!messagesContainer) return;
    
    const messageElement = document.createElement('div');
    messageElement.className = 'message';
    messageElement.innerHTML = `
        <div class="message-header">
            <span class="message-name">${message.name}</span>
            <span class="message-time">${message.time}</span>
        </div>
        <div class="message-text">${message.text}</div>
    `;
    
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function addUser(user) {
    users.push(user);
    displayUser(user);
}

function displayUser(user) {
    const visitorsContainer = document.getElementById('visitorsContainer');
    if (!visitorsContainer) return;
    
    const userElement = document.createElement('div');
    userElement.className = 'user';
    userElement.innerHTML = `
        <span class="user-avatar">${user.avatar}</span>
        <span class="user-name">${user.name}</span>
        <span class="user-status ${user.status}"></span>
    `;
    
    visitorsContainer.appendChild(userElement);
}

function toggleSidebar() {
    const sidebar = document.getElementById('sideBardiv');
    if (sidebar) {
        sidebar.classList.toggle('active');
    }
}

function addSampleData() {
    // Add some sample users
    const sampleUsers = [
        { id: 2, name: 'Alice', status: 'online', avatar: '👩' },
        { id: 3, name: 'Bob', status: 'away', avatar: '👨' },
        { id: 4, name: 'Charlie', status: 'online', avatar: '🧑' },
        { id: 5, name: 'Diana', status: 'busy', avatar: '👩‍💼' }
    ];
    
    sampleUsers.forEach(user => addUser(user));
    
    // Add some sample messages
    const sampleMessages = [
        {
            id: 1,
            name: 'Alice',
            text: 'Hello everyone! 👋',
            time: '10:30 AM',
            type: 'user'
        },
        {
            id: 2,
            name: 'Bob',
            text: 'Hey Alice! How are you?',
            time: '10:31 AM',
            type: 'user'
        },
        {
            id: 3,
            name: 'Charlie',
            text: 'Good morning! 🌅',
            time: '10:32 AM',
            type: 'user'
        }
    ];
    
    sampleMessages.forEach(message => addMessage(message));
}

function simulateResponse() {
    const responses = [
        'That\'s interesting!',
        'I agree with you',
        'What do you think about this?',
        'Thanks for sharing!',
        'I\'m not sure about that',
        'Let me think about it...',
        'That makes sense!',
        'I have a different opinion',
        'Good point!',
        'I see what you mean'
    ];
    
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    const message = {
        id: Date.now(),
        name: randomUser.name,
        text: randomResponse,
        time: new Date().toLocaleTimeString(),
        type: 'user'
    };
    
    addMessage(message);
}

// Global functions that might be called from other scripts
window.addMessage = addMessage;
window.addUser = addUser;
window.sendMessage = sendMessage;
window.toggleSidebar = toggleSidebar;

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        addMessage,
        addUser,
        sendMessage,
        toggleSidebar
    };
}
