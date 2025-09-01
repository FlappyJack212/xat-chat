let socket, currentUser, currentChat = { _id: 'default', name: 'Main Chat', description: 'Welcome!' };
let users = new Map(), messages = [], userPowers = [];

document.addEventListener('DOMContentLoaded', () => {
    initializeChat();
});

function initializeChat() {
    loadUsersList();
    loadUserPowers();
    initializeSocket();
    setupEventListeners();
    checkChatOwnership();
    addSystemMessage('Welcome to iXat Chat!');
    toggleDarkMode(localStorage.getItem('theme') === 'dark');
}

function initializeSocket() {
    socket = io();
    socket.on('connect', () => {
        socket.emit('authenticate', { token: localStorage.getItem('authToken') });
        socket.emit('join-room', { roomId: currentChat._id });
    });
    socket.on('authenticated', data => {
        currentUser = data.user;
        updatePowersDisplay();
        document.getElementById('powersControl').classList.toggle('hidden', !currentUser);
    });
    socket.on('message:received', addMessage);
    socket.on('user:joined', user => {
        users.set(user.id, user);
        updateUsersList();
        addSystemMessage(`${user.username} joined`);
    });
    socket.on('user:left', user => {
        users.delete(user.id);
        updateUsersList();
        addSystemMessage(`${user.username} left`);
    });
    socket.on('trade-request', handleTradeRequest);
    socket.on('trade-response', handleTradeResponse);
    socket.on('error', error => addSystemMessage(`Error: ${error.message}`, 'error'));
}

function setupEventListeners() {
    const textEntry = document.getElementById('textEntryEditable');
    textEntry.addEventListener('keypress', e => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    document.getElementById('returnBut').addEventListener('click', sendMessage);
    document.getElementById('defaultList').addEventListener('click', () => toggleTab('visitors'));
    document.getElementById('friendsList').addEventListener('click', () => toggleTab('friends'));
    document.getElementById('groupBut').addEventListener('click', () => window.location.href = 'groups.html');
    document.getElementById('helpBut').addEventListener('click', () => window.location.href = 'terms.html');
    document.getElementById('xatBut').addEventListener('click', () => window.location.href = 'index.html');
    document.getElementById('GetaChat').addEventListener('click', getChat);
    document.getElementById('signIn').addEventListener('click', signIn);
    document.getElementById('darkModeToggle').addEventListener('click', () => toggleDarkMode());
    document.getElementById('activatePower').addEventListener('click', activatePower);
}

function sendMessage() {
    const textEntry = document.getElementById('textEntryEditable');
    const text = DOMPurify.sanitize(textEntry.innerText.trim());
    if (text) {
        socket.emit('send-message', { roomId: currentChat._id, text });
        textEntry.innerText = '';
    }
}

function addMessage(data) {
    messages.push(data);
    const messagesList = document.getElementById('messages');
    const li = document.createElement('li');
    li.className = `p-2 rounded ${data.type === 'system' ? 'bg-gray-200 dark:bg-gray-700' : 'bg-blue-100 dark:bg-blue-900'}`;
    li.innerHTML = DOMPurify.sanitize(`
        <span class="font-bold">${data.user || 'System'}:</span> ${data.text}
    `);
    messagesList.appendChild(li);
    messagesList.scrollTop = messagesList.scrollHeight;
}

function addSystemMessage(text, type = 'info') {
    addMessage({ user: 'System', text, type: 'system' });
}

async function loadUsersList() {
    try {
        const response = await fetch('/api/users/online');
        const data = await response.json();
        if (data.users) {
            users = new Map(data.users.map(u => [u.id, u]));
            updateUsersList();
        }
    } catch (error) {
        addSystemMessage('Failed to load users', 'error');
    }
}

function updateUsersList() {
    const visitorsList = document.getElementById('idvisitors');
    const friendsList = document.getElementById('idfriends');
    visitorsList.innerHTML = '';
    friendsList.innerHTML = '';
    users.forEach(user => {
        const li = document.createElement('li');
        li.className = 'p-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer';
        li.innerHTML = DOMPurify.sanitize(`
            <span>${user.username}</span>
            <button onclick="initiateTrade('${user.id}')" class="ml-2 text-xs bg-blue-500 text-white px-2 py-1 rounded">Trade</button>
        `);
        visitorsList.appendChild(li);
        if (user.isFriend) friendsList.appendChild(li.cloneNode(true));
    });
}

function toggleTab(tab) {
    document.getElementById('defaultList').classList.toggle('active', tab === 'visitors');
    document.getElementById('friendsList').classList.toggle('active', tab === 'friends');
    document.getElementById('visitorsTabContainer').classList.toggle('hidden', tab !== 'visitors');
    document.getElementById('friendsTabContainer').classList.toggle('hidden', tab !== 'friends');
}

async function loadUserPowers() {
    if (!currentUser) return;
    try {
        const response = await fetch('/api/powers/user/me', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
        });
        const data = await response.json();
        userPowers = data.powers || [];
        updatePowersDisplay();
    } catch (error) {
        addSystemMessage('Failed to load powers', 'error');
    }
}

function updatePowersDisplay() {
    const powerSelect = document.getElementById('powerSelect');
    powerSelect.innerHTML = '<option value="">Select Power</option>' + userPowers.map(power => `
        <option value="${power._id}">${power.name}</option>
    `).join('');
    const smileyBar = document.getElementById('smileyBar');
    smileyBar.innerHTML = userPowers.map(power => `
        <button onclick="activatePower('${power._id}', '${power.name}')" class="p-2 bg-gray-200 dark:bg-gray-700 rounded">${power.icon || '⚡'}</button>
    `).join('');
}

function activatePower(powerId, powerName) {
    socket.emit('activate-power', { powerId, roomId: currentChat._id });
    addSystemMessage(`Activated power: ${powerName}`);
}

function initiateTrade(targetUserId) {
    const powerId = document.getElementById('powerSelect').value;
    if (!powerId) return addSystemMessage('Select a power to trade', 'error');
    socket.emit('trade-request', { targetUserId, powerId, price: 100 });
    addSystemMessage('Trade request sent');
}

function handleTradeRequest(data) {
    const tradeModal = document.getElementById('tradeModal');
    const tradeDetails = document.getElementById('tradeDetails');
    tradeDetails.innerHTML = DOMPurify.sanitize(`
        <p>Trade offer from ${data.fromUser}: Power ${data.powerName} for ${data.price} xats</p>
    `);
    tradeModal.classList.remove('hidden');
    document.getElementById('acceptTrade').onclick = () => {
        socket.emit('trade-response', { tradeId: data.tradeId, accept: true });
        tradeModal.classList.add('hidden');
    };
    document.getElementById('declineTrade').onclick = () => {
        socket.emit('trade-response', { tradeId: data.tradeId, accept: false });
        tradeModal.classList.add('hidden');
    };
}

function handleTradeResponse(data) {
    addSystemMessage(data.accepted ? 'Trade accepted!' : 'Trade declined', data.accepted ? 'info' : 'error');
}

function getChat() {
    window.location.href = '/create-room.html';
}

function signIn() {
    window.location.href = '/login.html';
}

function toggleDarkMode(force = null) {
    const isDark = level !== null ? level : document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', !isDark);
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
}

function checkChatOwnership() {
    if (currentUser && currentUser.rank === 'owner') {
        document.getElementById('powersControl').classList.remove('hidden');
    }
}
