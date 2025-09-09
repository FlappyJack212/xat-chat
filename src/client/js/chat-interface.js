// Chat Interface - Compact Version
const socket = io();

// User Profile System
let userProfile = {
    nickname: 'Guest',
    avatar: '👤',
    pawn: '♟️',
    id: Math.random().toString(36).substr(2, 9).toUpperCase(),
    rank: 'guest', // guest, member, moderator, owner
    xats: 0,
    days: 0
};

// Friends List System
let friendsList = [];

// Chat Tab System
let currentChat = 'main';
let privateChatUser = null;
let unreadCounts = { main: 0, private: 0 };
let notificationPermission = null;

// Load profile from localStorage
const savedProfile = localStorage.getItem('userProfile');
if (savedProfile) {
    userProfile = { ...userProfile, ...JSON.parse(savedProfile) };
}

// Load friends list from localStorage
const savedFriends = localStorage.getItem('friendsList');
if (savedFriends) {
    friendsList = JSON.parse(savedFriends);
}

// Check authentication status
const authToken = localStorage.getItem('authToken');
if (authToken) {
    // User is logged in, load their profile from server
    loadUserProfile();
} else {
    // Guest user, use default profile
    console.log('Guest user - using default profile');
}

const elements = {
    messageInput: document.getElementById('messageInput'),
    sendButton: document.getElementById('sendButton'),
    messagesContainer: document.getElementById('messagesContainer'),
    quickbarToggle: document.getElementById('quickbarToggle'),
    quickbar: document.getElementById('quickbar'),
    visitorsTab: document.getElementById('visitorsTab'),
    friendsTab: document.getElementById('friendsTab'),
    getChatBtn: document.getElementById('getChatBtn'),
    signInBtn: document.getElementById('signInBtn'),
    typingIndicator: document.getElementById('typingIndicator'),
    // Chat Tab Elements
    mainChatTab: document.getElementById('mainChatTab'),
    privateChatTab: document.getElementById('privateChatTab'),
    mainChatContainer: document.getElementById('mainChatContainer'),
    privateChatContainer: document.getElementById('privateChatContainer'),
    privateMessagesContainer: document.getElementById('privateMessagesContainer'),
    privateMessageInput: document.getElementById('privateMessageInput'),
    privateSendButton: document.getElementById('privateSendButton'),
    privateTypingIndicator: document.getElementById('privateTypingIndicator'),
    privateChatTitle: document.getElementById('privateChatTitle'),
    mainUnreadIndicator: document.getElementById('mainUnreadIndicator'),
    privateUnreadIndicator: document.getElementById('privateUnreadIndicator')
};

let typingTimer, isTyping = false;

// Event Listeners
elements.sendButton.addEventListener('click', sendMessage);
elements.messageInput.addEventListener('keypress', e => e.key === 'Enter' && sendMessage());
elements.messageInput.addEventListener('input', handleTyping);
elements.visitorsTab.addEventListener('click', () => switchTab('visitors'));
elements.friendsTab.addEventListener('click', () => switchTab('friends'));

// Chat Tab Event Listeners
elements.mainChatTab.addEventListener('click', () => switchChatTab('main'));
elements.privateChatTab.addEventListener('click', () => switchChatTab('private'));
elements.privateSendButton.addEventListener('click', sendPrivateMessage);
elements.privateMessageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendPrivateMessage();
});
elements.getChatBtn.addEventListener('click', () => alert('Get a Chat Box clicked!'));
elements.signInBtn.addEventListener('click', () => alert('Sign In clicked!'));

// Quickbar
if (elements.quickbarToggle) elements.quickbarToggle.addEventListener('click', () => elements.quickbar?.classList.toggle('open'));

// Quickbar menu item switching
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.querySelectorAll('.quickbar-item').forEach(item => {
            item.addEventListener('click', () => {
                // Remove active class from all items and sections
                document.querySelectorAll('.quickbar-item').forEach(i => i.classList.remove('active'));
                document.querySelectorAll('.quickbar-section').forEach(s => s.classList.add('d-none'));
                
                // Add active class to clicked item
                item.classList.add('active');
                
                // Show corresponding section
                const sectionId = item.getAttribute('data-section');
                const section = document.getElementById(sectionId + '-section');
                if (section) {
                    section.classList.remove('d-none');
                    section.classList.add('active');
                }
            });
        });
    }, 200);
});

// Functions
function sendMessage() {
    const message = elements.messageInput.value.trim();
    if (message) {
        addMessage('You', message, 'user');
        socket.emit('chat_message', { username: 'You', message, timestamp: new Date() });
        elements.messageInput.value = '';
    }
}

function addMessage(username, message, type = 'other', messageId = null, replyTo = null, userData = null) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.dataset.messageId = messageId || Date.now();
    
    const timestamp = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    const replyHtml = replyTo ? `<div class="message-reply"><div class="message-reply-header">Replying to ${replyTo.username}</div><div>${replyTo.message}</div></div>` : '';
    
    // Use userData if provided, otherwise use current user profile for "You"
    const user = userData || (username === 'You' ? userProfile : { nickname: username, avatar: '👤', pawn: '♟️', id: 'GUEST' });
    
    messageDiv.innerHTML = `
        <div class="message-pawn">${user.pawn}</div>
        <div class="message-avatar" style="cursor: pointer;" onclick="showUserPopup(${JSON.stringify(user).replace(/"/g, '&quot;')}, ${username === 'You'})">${user.avatar}</div>
        <div class="message-info">
            <div class="message-username" style="cursor: pointer;" onclick="showUserPopup(${JSON.stringify(user).replace(/"/g, '&quot;')}, ${username === 'You'})">
                ${user.nickname}
                <span class="message-id">${user.id}</span>
            </div>
            <div class="message-timestamp">${timestamp}</div>
            <div class="message-content">${message}</div>
            <div class="message-actions">
                <button class="message-action reply">Reply</button>
                ${username === 'You' ? `<button class="message-action edit">Edit</button><button class="message-action delete">Delete</button>` : ''}
            </div>
            ${replyHtml}
        </div>
    `;
    
    // Event listeners for message actions
    const replyBtn = messageDiv.querySelector('.reply');
    const editBtn = messageDiv.querySelector('.edit');
    const deleteBtn = messageDiv.querySelector('.delete');
    
    if (replyBtn) replyBtn.addEventListener('click', () => setReply(username, message));
    if (editBtn) editBtn.addEventListener('click', () => editMessage(messageDiv.dataset.messageId));
    if (deleteBtn) deleteBtn.addEventListener('click', () => deleteMessage(messageDiv.dataset.messageId));
    
    elements.messagesContainer.appendChild(messageDiv);
    elements.messagesContainer.scrollTop = elements.messagesContainer.scrollHeight;
    
    // Show unread indicator if not on main chat tab
    if (currentChat !== 'main') {
        unreadCounts.main++;
        elements.mainUnreadIndicator.style.display = 'inline';
        showNotification(`New message from ${user.nickname}`, message);
    }
}

function handleTyping() {
    if (elements.messageInput.value.trim()) {
        showTyping();
    } else {
        hideTyping();
    }
}

function showTyping() {
    if (!isTyping) {
        isTyping = true;
        elements.typingIndicator.textContent = 'You are typing...';
        elements.typingIndicator.classList.add('active');
        socket.emit('typing', { username: 'You' });
    }
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => hideTyping(), 1000);
}

function hideTyping() {
    if (isTyping) {
        isTyping = false;
        elements.typingIndicator.textContent = '';
        elements.typingIndicator.classList.remove('active');
        socket.emit('stop_typing', { username: 'You' });
    }
}

function switchTab(tab) {
    elements.visitorsTab.classList.toggle('active', tab === 'visitors');
    elements.friendsTab.classList.toggle('active', tab === 'friends');
    
    // Show/hide the appropriate list
    const visitorsList = document.getElementById('visitorsList');
    const friendsListElement = document.getElementById('friendsList');
    
    if (tab === 'visitors') {
        visitorsList.style.display = 'block';
        if (friendsListElement) friendsListElement.style.display = 'none';
    } else if (tab === 'friends') {
        if (friendsListElement) friendsListElement.style.display = 'block';
        visitorsList.style.display = 'none';
        // Update friends list when switching to friends tab
        updateFriendsList();
    }
}

function setReply(replyData) {
    elements.messageInput.placeholder = replyData ? `Replying to ${replyData.username}: ${replyData.message.substring(0, 30)}...` : 'Type your message...';
}

function editMessage(messageId) {
    const messageDiv = document.querySelector(`[data-message-id="${messageId}"]`);
    const contentDiv = messageDiv.querySelector('.message-content');
    const currentText = contentDiv.textContent;
    
    const editInput = document.createElement('input');
    editInput.className = 'message-edit';
    editInput.value = currentText;
    contentDiv.innerHTML = '';
    contentDiv.appendChild(editInput);
    editInput.focus();
    editInput.select();
    
    const finishEdit = () => {
        const newText = editInput.value.trim();
        if (newText && newText !== currentText) {
            contentDiv.textContent = newText;
            socket.emit('edit_message', { messageId, newText });
        } else {
            contentDiv.textContent = currentText;
        }
    };
    
    editInput.addEventListener('blur', finishEdit);
    editInput.addEventListener('keypress', e => e.key === 'Enter' && finishEdit());
}

function deleteMessage(messageId) {
    if (confirm('Are you sure you want to delete this message?')) {
        const messageDiv = document.querySelector(`[data-message-id="${messageId}"]`);
        messageDiv.remove();
        socket.emit('delete_message', { messageId });
    }
}

// Quickbar Functions (make them global)
window.toggleVisitorsList = function() {
    const rightSidebar = document.querySelector('.right-sidebar');
    rightSidebar.style.display = rightSidebar.style.display === 'none' ? 'flex' : 'none';
};

window.toggleNightMode = function() {
    document.body.classList.toggle('night-mode');
    localStorage.setItem('nightMode', document.body.classList.contains('night-mode'));
};

window.openTranslator = function() {
    const text = prompt('Enter text to translate:');
    if (text) addMessage('System', `Translation: [Translated] ${text}`, 'system');
};

window.showGroupPowers = function() {
    const powers = ['Kick', 'Ban', 'Mute', 'Promote', 'Demote', 'Moderator'];
    showModal('⚡ Group Powers', powers.map(power => 
        `<button class="action-button" onclick="this.closest('.modal-overlay').remove(); addMessage('System', 'Used power: ${power}', 'system')">${power}</button>`
    ).join(''));
};

window.startVote = function() {
    const question = prompt('Enter vote question:');
    if (question) {
        addMessage('System', `Vote started: ${question}`, 'system');
        addMessage('System', 'Type "yes" or "no" to vote!', 'system');
    }
};

window.openSettings = function() {
    const settings = ['Theme', 'Notifications', 'Sounds', 'Privacy', 'Account', 'Profile'];
    showModal('⚙️ Settings', settings.map(setting => 
        `<button class="action-button" onclick="this.closest('.modal-overlay').remove(); ${setting === 'Profile' ? 'openProfileEditor()' : `addMessage('System', 'Opening ${setting} settings...', 'system')`}">${setting}</button>`
    ).join(''));
};

// Profile Management Functions
window.openProfileEditor = function() {
    showProfileModal();
};

function showProfileModal() {
    const modal = document.createElement('div');
    modal.className = 'avatar-modal';
    modal.innerHTML = `
        <div class="avatar-modal-content">
            <h2 style="color: white; margin-bottom: 20px; text-align: center;">👤 Profile Editor</h2>
            
            <div class="profile-form">
                <div>
                    <label>Nickname:</label>
                    <input type="text" id="profileNickname" value="${userProfile.nickname}" maxlength="20">
                </div>
                
                <div>
                    <label>User ID:</label>
                    <input type="text" id="profileId" value="${userProfile.id}" maxlength="12" readonly style="background: #2c3e50; color: #95a5a6;">
                </div>
                
                <div>
                    <label>Rank:</label>
                    <select id="profileRank" style="padding: 10px; border: 1px solid #34495e; border-radius: 4px; background: #34495e; color: white; font-size: 14px; width: 100%;">
                        <option value="guest" ${userProfile.rank === 'guest' ? 'selected' : ''}>Guest</option>
                        <option value="member" ${userProfile.rank === 'member' ? 'selected' : ''}>Member</option>
                        <option value="moderator" ${userProfile.rank === 'moderator' ? 'selected' : ''}>Moderator</option>
                        <option value="owner" ${userProfile.rank === 'owner' ? 'selected' : ''}>Owner</option>
                    </select>
                </div>
            </div>
            
            <h3 style="color: white; margin: 20px 0 10px 0;">Choose Pawn:</h3>
            <div class="pawn-grid" id="pawnGrid">
                ${getPawnOptions()}
            </div>
            
            <h3 style="color: white; margin: 20px 0 10px 0;">Choose Avatar:</h3>
            <div class="avatar-grid" id="avatarGrid">
                ${getAvatarOptions()}
            </div>
            
            <div style="display: flex; gap: 10px; margin-top: 20px;">
                <button class="action-button" onclick="saveProfile()" style="flex: 1;">Save Profile</button>
                <button class="action-button" onclick="this.closest('.avatar-modal').remove()" style="flex: 1;">Cancel</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add event listeners for pawn and avatar selection
    modal.querySelectorAll('.pawn-option').forEach(option => {
        option.addEventListener('click', () => {
            modal.querySelectorAll('.pawn-option').forEach(o => o.classList.remove('selected'));
            option.classList.add('selected');
        });
    });
    
    modal.querySelectorAll('.avatar-option').forEach(option => {
        option.addEventListener('click', () => {
            modal.querySelectorAll('.avatar-option').forEach(o => o.classList.remove('selected'));
            option.classList.add('selected');
        });
    });
    
    // Set current selections
    modal.querySelector(`[data-pawn="${userProfile.pawn}"]`)?.classList.add('selected');
    modal.querySelector(`[data-avatar="${userProfile.avatar}"]`)?.classList.add('selected');
}

function getPawnOptions() {
    const pawns = ['♟️', '♛', '♜', '♝', '♞', '♚', '⚔️', '🛡️', '🏹', '🗡️', '⚡', '🔥', '❄️', '💎', '🌟', '⭐', '🌙', '☀️', '🌈', '💫', '🎯', '🎪', '🎭', '🎨', '🎵', '🎸', '🎹', '🎺', '🎻', '🥁', '🎤', '🎧', '🎬', '📷', '📹', '🎮', '🕹️', '🎲', '🃏', '🎯', '🎳', '🏆', '🥇', '🥈', '🥉', '🏅', '🎖️', '🏵️', '🎗️', '🎀'];
    return pawns.map(pawn => `<div class="pawn-option" data-pawn="${pawn}">${pawn}</div>`).join('');
}

function getAvatarOptions() {
    const avatars = ['👤', '👨', '👩', '👦', '👧', '🧑', '👴', '👵', '👶', '🧒', '👱', '👱‍♀️', '👱‍♂️', '🧔', '👨‍🦰', '👩‍🦰', '👨‍🦱', '👩‍🦱', '👨‍🦳', '👩‍🦳', '👨‍🦲', '👩‍🦲', '🤵', '👰', '🤰', '🤱', '👼', '🎅', '🤶', '🦸', '🦸‍♂️', '🦸‍♀️', '🦹', '🦹‍♂️', '🦹‍♀️', '🧙', '🧙‍♂️', '🧙‍♀️', '🧚', '🧚‍♂️', '🧚‍♀️', '🧛', '🧛‍♂️', '🧛‍♀️', '🧜', '🧜‍♂️', '🧜‍♀️', '🧝', '🧝‍♂️', '🧝‍♀️', '🧞', '🧞‍♂️', '🧞‍♀️', '🧟', '🧟‍♂️', '🧟‍♀️', '💆', '💆‍♂️', '💆‍♀️', '💇', '💇‍♂️', '💇‍♀️', '🚶', '🚶‍♂️', '🚶‍♀️', '🏃', '🏃‍♂️', '🏃‍♀️', '💃', '🕺', '👯', '👯‍♂️', '👯‍♀️', '🧖', '🧖‍♂️', '🧖‍♀️', '🧗', '🧗‍♂️', '🧗‍♀️', '🤺', '🏇', '⛷️', '🏂', '🏌️', '🏌️‍♂️', '🏌️‍♀️', '🏄', '🏄‍♂️', '🏄‍♀️', '🚣', '🚣‍♂️', '🚣‍♀️', '🏊', '🏊‍♂️', '🏊‍♀️', '⛹️', '⛹️‍♂️', '⛹️‍♀️', '🏋️', '🏋️‍♂️', '🏋️‍♀️', '🚴', '🚴‍♂️', '🚴‍♀️', '🚵', '🚵‍♂️', '🚵‍♀️', '🤸', '🤸‍♂️', '🤸‍♀️', '🤼', '🤼‍♂️', '🤼‍♀️', '🤽', '🤽‍♂️', '🤽‍♀️', '🤾', '🤾‍♂️', '🤾‍♀️', '🤹', '🤹‍♂️', '🤹‍♀️', '🧘', '🧘‍♂️', '🧘‍♀️', '🛀', '🛌', '👭', '👫', '👬', '💏', '💑', '👪', '👨‍👩‍👧', '👨‍👩‍👧‍👦', '👨‍👩‍👦‍👦', '👨‍👩‍👧‍👧', '👨‍👨‍👦', '👨‍👨‍👧', '👨‍👨‍👧‍👦', '👨‍👨‍👦‍👦', '👨‍👨‍👧‍👧', '👩‍👩‍👦', '👩‍👩‍👧', '👩‍👩‍👧‍👦', '👩‍👩‍👦‍👦', '👩‍👩‍👧‍👧', '👨‍👦', '👨‍👦‍👦', '👨‍👧', '👨‍👧‍👦', '👨‍👧‍👧', '👩‍👦', '👩‍👦‍👦', '👩‍👧', '👩‍👧‍👦', '👩‍👧‍👧'];
    return avatars.map(avatar => `<div class="avatar-option" data-avatar="${avatar}">${avatar}</div>`).join('');
}

function saveProfile() {
    const modal = document.querySelector('.avatar-modal');
    const nickname = modal.querySelector('#profileNickname').value.trim();
    const selectedPawn = modal.querySelector('.pawn-option.selected')?.dataset.pawn;
    const selectedAvatar = modal.querySelector('.avatar-option.selected')?.dataset.avatar;
    const selectedRank = modal.querySelector('#profileRank').value;
    
    if (!nickname) {
        alert('Please enter a nickname!');
        return;
    }
    
    if (selectedPawn) userProfile.pawn = selectedPawn;
    if (selectedAvatar) userProfile.avatar = selectedAvatar;
    if (selectedRank) userProfile.rank = selectedRank;
    userProfile.nickname = nickname;
    
    // Save to localStorage
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
    
    // Update visitor list
    updateVisitorList();
    
    // Update welcome message
    addMessage('System', `Profile updated! Welcome ${userProfile.nickname} (${userProfile.id}) - Rank: ${userProfile.rank}`, 'system');
    
    modal.remove();
}

function showModal(title, content) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>${title}</h3>
            <div style="display: flex; flex-direction: column; gap: 10px; margin: 15px 0;">${content}</div>
            <button class="action-button" onclick="this.closest('.modal-overlay').remove()" style="width: 100%;">Close</button>
        </div>
    `;
    document.body.appendChild(modal);
}

// Socket Events
socket.on('connect', () => {
    console.log('Connected to server');
    addMessage('System', 'Connected to chat server', 'system');
});

socket.on('chat_message', (data) => {
    const messageType = data.username === 'You' ? 'user' : 'other';
    addMessage(data.username, data.message, messageType, null, data.replyTo);
});

socket.on('user_joined', (user) => addMessage('System', `${user.username} joined the chat`, 'system'));
socket.on('user_left', (user) => addMessage('System', `${user.username} left the chat`, 'system'));

socket.on('typing', (data) => {
    if (data.username !== 'You') {
        elements.typingIndicator.textContent = `${data.username} is typing...`;
        elements.typingIndicator.classList.add('active');
    }
});

socket.on('stop_typing', (data) => {
    if (data.username !== 'You') {
        elements.typingIndicator.textContent = '';
        elements.typingIndicator.classList.remove('active');
    }
});

socket.on('edit_message', (data) => {
    const messageDiv = document.querySelector(`[data-message-id="${data.messageId}"]`);
    if (messageDiv) messageDiv.querySelector('.message-content').textContent = data.newText;
});

socket.on('delete_message', (data) => {
    const messageDiv = document.querySelector(`[data-message-id="${data.messageId}"]`);
    if (messageDiv) messageDiv.remove();
});

// Load night mode preference
if (localStorage.getItem('nightMode') === 'true') {
    document.body.classList.add('night-mode');
}

// Update visitor list with current user profile
function updateVisitorList() {
    const visitorsList = document.getElementById('visitorsList');
    const sampleUsers = [
        { nickname: 'ACE', avatar: '👑', pawn: '♛', id: 'ACE123' },
        { nickname: 'SnoogleCute', avatar: '🐱', pawn: '♞', id: 'SNO456' },
        { nickname: 'Bot', avatar: '🤖', pawn: '⚡', id: 'BOT789' },
        { nickname: userProfile.nickname, avatar: userProfile.avatar, pawn: userProfile.pawn, id: userProfile.id }
    ];
    
    visitorsList.innerHTML = sampleUsers.map(user => `
        <div class="visitor-item" onclick="showUserPopup(${JSON.stringify(user).replace(/"/g, '&quot;')}, ${user.nickname === userProfile.nickname})">
            <div class="visitor-pawn">${user.pawn}</div>
            <div class="visitor-avatar">${user.avatar}</div>
            <div class="visitor-info">
                <div class="visitor-name">${user.nickname} <span class="visitor-id">${user.id}</span></div>
            </div>
        </div>
    `).join('');
}

// Friends Management Functions
function addFriend(user) {
    // Check if already a friend
    const existingFriend = friendsList.find(friend => friend.id === user.id);
    if (existingFriend) {
        addMessage('System', `${user.nickname} is already your friend!`, 'system');
        return;
    }
    
    // Add to friends list
    friendsList.push({
        nickname: user.nickname,
        avatar: user.avatar,
        pawn: user.pawn,
        id: user.id,
        rank: user.rank || 'guest',
        xats: user.xats || 0,
        days: user.days || 0,
        addedAt: new Date().toISOString()
    });
    
    // Save to localStorage
    localStorage.setItem('friendsList', JSON.stringify(friendsList));
    
    // Update friends display if on friends tab
    updateFriendsList();
    
    // Show confirmation message
    addMessage('System', `Added ${user.nickname} as a friend!`, 'system');
}

function removeFriend(userId) {
    const friendIndex = friendsList.findIndex(friend => friend.id === userId);
    if (friendIndex !== -1) {
        const friend = friendsList[friendIndex];
        friendsList.splice(friendIndex, 1);
        
        // Save to localStorage
        localStorage.setItem('friendsList', JSON.stringify(friendsList));
        
        // Update friends display
        updateFriendsList();
        
        // Show confirmation message
        addMessage('System', `Removed ${friend.nickname} from friends list`, 'system');
    }
}

function updateFriendsList() {
    const friendsListElement = document.getElementById('friendsList');
    if (!friendsListElement) return;
    
    if (friendsList.length === 0) {
        friendsListElement.innerHTML = `
            <div style="text-align: center; color: #95a5a6; padding: 20px;">
                No friends yet. Add some friends by clicking on users!
            </div>
        `;
        return;
    }
    
    friendsListElement.innerHTML = friendsList.map(friend => `
        <div class="visitor-item" onclick="showUserPopup(${JSON.stringify(friend).replace(/"/g, '&quot;')}, false)">
            <div class="visitor-pawn">${friend.pawn}</div>
            <div class="visitor-avatar">${friend.avatar}</div>
            <div class="visitor-info">
                <div class="visitor-name">${friend.nickname} <span class="visitor-id">${friend.id}</span></div>
            </div>
        </div>
    `).join('');
}

// Chat Tab Functions
function switchChatTab(chatType) {
    if (chatType === currentChat) return;
    
    // Hide current chat
    if (currentChat === 'main') {
        elements.mainChatContainer.classList.remove('active');
        elements.mainChatContainer.style.display = 'none';
        elements.mainChatTab.classList.remove('active');
    } else if (currentChat === 'private') {
        elements.privateChatContainer.classList.remove('active');
        elements.privateChatContainer.style.display = 'none';
        elements.privateChatTab.classList.remove('active');
    }
    
    // Show new chat
    if (chatType === 'main') {
        elements.mainChatContainer.classList.add('active');
        elements.mainChatContainer.style.display = 'flex';
        elements.mainChatTab.classList.add('active');
        elements.mainUnreadIndicator.style.display = 'none';
        unreadCounts.main = 0;
    } else if (chatType === 'private') {
        elements.privateChatContainer.classList.add('active');
        elements.privateChatTab.classList.add('active');
        elements.privateChatContainer.style.display = 'flex';
        elements.privateUnreadIndicator.style.display = 'none';
        unreadCounts.private = 0;
    }
    
    currentChat = chatType;
}

function openPrivateChat(user) {
    privateChatUser = user;
    elements.privateChatTitle.textContent = `Private Chat with ${user.nickname}`;
    elements.privateChatTab.style.display = 'flex';
    switchChatTab('private');
    
    // Clear any existing private messages
    elements.privateMessagesContainer.innerHTML = '';
    
    // Add welcome message
    addPrivateMessage('System', `Started private chat with ${user.nickname}`, 'system');
}

function closePrivateChat() {
    elements.privateChatTab.style.display = 'none';
    elements.privateChatContainer.classList.remove('active');
    elements.privateChatTab.classList.remove('active');
    
    if (currentChat === 'private') {
        switchChatTab('main');
    }
    
    privateChatUser = null;
    unreadCounts.private = 0;
    elements.privateUnreadIndicator.style.display = 'none';
}

function clearPrivateChat() {
    elements.privateMessagesContainer.innerHTML = '';
    addPrivateMessage('System', 'Private chat cleared', 'system');
}

function addPrivateMessage(username, message, type = 'other', messageId = null, replyTo = null, userData = null) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.dataset.messageId = messageId || Date.now();
    
    const timestamp = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    const replyHtml = replyTo ? `<div class="message-reply"><div class="message-reply-header">Replying to ${replyTo.username}</div><div>${replyTo.message}</div></div>` : '';
    
    const user = userData || (username === 'You' ? userProfile : { nickname: username, avatar: '👤', pawn: '♟️', id: 'GUEST' });
    
    messageDiv.innerHTML = `
        <div class="message-pawn">${user.pawn}</div>
        <div class="message-avatar" style="cursor: pointer;" onclick="showUserPopup(${JSON.stringify(user).replace(/"/g, '&quot;')}, ${username === 'You'})">${user.avatar}</div>
        <div class="message-info">
            <div class="message-username" style="cursor: pointer;" onclick="showUserPopup(${JSON.stringify(user).replace(/"/g, '&quot;')}, ${username === 'You'})">
                ${user.nickname}
                <span class="message-id">${user.id}</span>
            </div>
            <div class="message-timestamp">${timestamp}</div>
            <div class="message-content">${message}</div>
            <div class="message-actions">
                <button class="message-action reply">Reply</button>
                ${username === 'You' ? `<button class="message-action edit">Edit</button><button class="message-action delete">Delete</button>` : ''}
            </div>
            ${replyHtml}
        </div>
    `;
    
    elements.privateMessagesContainer.appendChild(messageDiv);
    elements.privateMessagesContainer.scrollTop = elements.privateMessagesContainer.scrollHeight;
    
    // Add event listeners for message actions
    const replyBtn = messageDiv.querySelector('.reply');
    const editBtn = messageDiv.querySelector('.edit');
    const deleteBtn = messageDiv.querySelector('.delete');
    
    if (replyBtn) replyBtn.addEventListener('click', () => setReply({ username, message, messageId }));
    if (editBtn) editBtn.addEventListener('click', () => editMessage(messageId));
    if (deleteBtn) deleteBtn.addEventListener('click', () => deleteMessage(messageId));
    
    // Show unread indicator if not on private chat tab
    if (currentChat !== 'private') {
        unreadCounts.private++;
        elements.privateUnreadIndicator.style.display = 'inline';
        showNotification(`New private message from ${user.nickname}`, message);
    }
}

function sendPrivateMessage() {
    const message = elements.privateMessageInput.value.trim();
    if (!message || !privateChatUser) return;
    
    addPrivateMessage('You', message, 'user');
    elements.privateMessageInput.value = '';
    
    // Simulate response (in real app, this would be sent via socket)
    setTimeout(() => {
        addPrivateMessage(privateChatUser.nickname, `Thanks for the message: "${message}"`, 'other', null, null, privateChatUser);
    }, 1000);
}

// Notification System
function requestNotificationPermission() {
    if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
            notificationPermission = permission;
        });
    }
}

function showNotification(title, body) {
    if (notificationPermission === 'granted') {
        new Notification(title, { body, icon: '/favicon.ico' });
    }
}

// Initialize visitor list
updateVisitorList();

// Request notification permission on page load
requestNotificationPermission();

// Load user profile from server
async function loadUserProfile() {
    try {
        const response = await fetch('/api/users/profile', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
        });
        
        if (response.ok) {
            const userData = await response.json();
            userProfile = {
                nickname: userData.nickname || userData.username,
                avatar: userData.avatar || '👤',
                pawn: userData.pawn || '♟️',
                id: userData.id,
                rank: userData.rank || 'guest',
                xats: userData.xats || 0,
                days: userData.days || 0
            };
            
            // Save to localStorage
            localStorage.setItem('userProfile', JSON.stringify(userProfile));
            
            // Update visitor list to show current user
            updateVisitorList();
            
            console.log('User profile loaded:', userProfile);
        } else {
            console.log('Failed to load user profile, using guest mode');
        }
    } catch (error) {
        console.error('Error loading user profile:', error);
    }
}

// Send message with authentication
async function sendMessage() {
    const message = elements.messageInput.value.trim();
    if (!message) return;
    
    // Add message to UI immediately
    addMessage('You', message, 'user');
    elements.messageInput.value = '';
    
    // Send to server if authenticated
    if (authToken) {
        try {
            const response = await fetch('/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify({
                    message: message,
                    roomId: 'main',
                    type: 'chat'
                })
            });
            
            if (!response.ok) {
                console.error('Failed to send message to server');
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    } else {
        // Guest user - simulate server response
        setTimeout(() => {
            addMessage('System', 'Please login to send messages to other users', 'system');
        }, 1000);
    }
}

// Chat system is ready - no sample messages

// User Popup System
function showUserPopup(user, isOwnProfile = false) {
    const modal = document.createElement('div');
    modal.className = 'user-popup';
    
    const actions = getActionsForUser(user, isOwnProfile);
    
    modal.innerHTML = `
        <div class="user-popup-content">
            <div class="user-popup-header">
                <div class="user-popup-title">${user.nickname} (${user.id})</div>
                <button class="user-popup-close" onclick="this.closest('.user-popup').remove()">×</button>
            </div>
            <div class="user-popup-body">
                <div class="user-popup-profile">
                    <div class="user-popup-avatar">${user.avatar}</div>
                    <div class="user-popup-info">
                        <h3>${user.nickname}</h3>
                        <div class="user-popup-status">Online</div>
                        <div class="user-popup-relationship">${isOwnProfile ? 'Your Profile' : 'Not added you as a friend'}</div>
                        ${user.xats !== undefined ? `<div style="color: #f39c12; font-size: 12px; margin-top: 5px;">${user.xats} xats • ${user.days} days</div>` : ''}
                    </div>
                </div>
                <div class="user-popup-actions">
                    ${actions.map(action => `
                        <button class="user-popup-action ${action.class || ''}" onclick="${action.onclick}">
                            <span class="user-popup-action-icon">${action.icon}</span>
                            ${action.text}
                        </button>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

function getActionsForUser(user, isOwnProfile) {
    const actions = [];
    const isFriend = friendsList.some(friend => friend.id === user.id);
    
    if (isOwnProfile) {
        // Own profile actions
        actions.push(
            { icon: '⚙️', text: 'Settings', onclick: 'this.closest(".user-popup").remove(); openProfileEditor();' },
            { icon: '💰', text: 'Buy xats', onclick: 'this.closest(".user-popup").remove(); addMessage("System", "Opening xat store...", "system");' },
            { icon: '⚡', text: 'Powers', onclick: 'this.closest(".user-popup").remove(); showGroupPowers();' },
            { icon: '💾', text: 'Save', onclick: 'this.closest(".user-popup").remove(); addMessage("System", "Profile saved!", "system");' },
            { icon: '🔑', text: 'Login', onclick: 'this.closest(".user-popup").remove(); addMessage("System", "Opening login...", "system");' },
            { icon: '🛒', text: 'xat Store', onclick: 'this.closest(".user-popup").remove(); addMessage("System", "Opening xat store...", "system");' },
            { icon: '🎁', text: 'Gifts', onclick: 'this.closest(".user-popup").remove(); addMessage("System", "Opening gifts...", "system");' }
        );
    } else {
        // Other user actions based on rank
        if (userProfile.rank === 'owner' || userProfile.rank === 'moderator') {
            // Rank actions (first image)
            actions.push(
                { icon: '💬', text: 'Private Chat', onclick: `this.closest('.user-popup').remove(); openPrivateChat(${JSON.stringify(user).replace(/"/g, '&quot;')});` },
                { icon: isFriend ? '❌' : '➕', text: isFriend ? 'Remove Friend' : 'Add as Friend', onclick: isFriend ? `this.closest('.user-popup').remove(); removeFriend('${user.id}');` : `this.closest('.user-popup').remove(); addFriend(${JSON.stringify(user).replace(/"/g, '&quot;')});` },
                { icon: '👢', text: 'Kick', onclick: 'this.closest(".user-popup").remove(); addMessage("System", `Kicked ${user.nickname}`, "system");', class: 'warning' },
                { icon: '👤', text: 'Make Guest', onclick: 'this.closest(".user-popup").remove(); addMessage("System", `Made ${user.nickname} a guest`, "system");' },
                { icon: '👮', text: 'Make Moderator', onclick: 'this.closest(".user-popup").remove(); addMessage("System", `Made ${user.nickname} a moderator`, "system");' },
                { icon: '💔', text: 'Divorce', onclick: 'this.closest(".user-popup").remove(); addMessage("System", `Divorced ${user.nickname}`, "system");', class: 'danger' },
                { icon: '⚡', text: 'Powers', onclick: 'this.closest(".user-popup").remove(); showGroupPowers();' },
                { icon: '🔒', text: 'Private Message', onclick: 'this.closest(".user-popup").remove(); addMessage("System", `Opening private message with ${user.nickname}`, "system");' },
                { icon: '🚫', text: 'Ignore', onclick: 'this.closest(".user-popup").remove(); addMessage("System", `Ignored ${user.nickname}`, "system");', class: 'danger' },
                { icon: '❌', text: 'Ban', onclick: 'this.closest(".user-popup").remove(); addMessage("System", `Banned ${user.nickname}`, "system");', class: 'danger' },
                { icon: '👥', text: 'Make Member', onclick: 'this.closest(".user-popup").remove(); addMessage("System", `Made ${user.nickname} a member`, "system");' },
                { icon: '👑', text: 'Make Owner', onclick: 'this.closest(".user-popup").remove(); addMessage("System", `Made ${user.nickname} an owner`, "system");' },
                { icon: '🔄', text: 'Transfer', onclick: 'this.closest(".user-popup").remove(); addMessage("System", `Transferred ownership to ${user.nickname}`, "system");', class: 'warning' }
            );
        } else {
            // Guest/Member actions (third image)
            actions.push(
                { icon: '💬', text: 'Private Chat', onclick: `this.closest('.user-popup').remove(); openPrivateChat(${JSON.stringify(user).replace(/"/g, '&quot;')});` },
                { icon: isFriend ? '❌' : '➕', text: isFriend ? 'Remove Friend' : 'Add as Friend', onclick: isFriend ? `this.closest('.user-popup').remove(); removeFriend('${user.id}');` : `this.closest('.user-popup').remove(); addFriend(${JSON.stringify(user).replace(/"/g, '&quot;')});` },
                { icon: '❤️', text: 'Marry/BFF', onclick: 'this.closest(".user-popup").remove(); addMessage("System", `Married ${user.nickname}`, "system");', class: 'success' },
                { icon: '⚡', text: 'Powers', onclick: 'this.closest(".user-popup").remove(); showGroupPowers();' },
                { icon: '🔒', text: 'Private Message', onclick: 'this.closest(".user-popup").remove(); addMessage("System", `Opening private message with ${user.nickname}`, "system");' },
                { icon: '🚫', text: 'Ignore', onclick: 'this.closest(".user-popup").remove(); addMessage("System", `Ignored ${user.nickname}`, "system");', class: 'danger' },
                { icon: '🔄', text: 'Transfer', onclick: 'this.closest(".user-popup").remove(); addMessage("System", `Cannot transfer - insufficient permissions`, "system");' },
                { icon: '🎁', text: 'Gifts', onclick: 'this.closest(".user-popup").remove(); addMessage("System", `Opening gifts for ${user.nickname}`, "system");' }
            );
        }
    }
    
    return actions;
}