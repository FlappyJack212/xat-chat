// Global state
let socket, currentUser, currentChat = { _id: 'default', name: 'Main Chat', description: 'Welcome!' };
let users = new Map(), messages = [], userPowers = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initializeChat();
});

// Initialization
function initializeChat() {
  loadUsersList();
  loadUserPowers();
  initializeSocket();
  setupEventListeners();
  checkChatOwnership();
  addSystemMessage('Welcome to iXat Chat!');
}

// Socket setup
function initializeSocket() {
  socket = io();
  socket.on('connect', () => socket.emit('authenticate', { token: localStorage.getItem('authToken') }));
  socket.on('authenticated', data => currentUser = data.user);
  socket.on('message:received', addMessage);
  socket.on('user:joined', user => addSystemMessage(`${user.username} joined`));
  socket.on('user:left', user => addSystemMessage(`${user.username} left`));
}

// Event listeners
function setupEventListeners() {
  document.getElementById('textEntryEditable').addEventListener('keypress', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
  document.getElementById('returnBut').addEventListener('click', sendMessage);
  document.getElementById('defaultList').addEventListener('click', showVisitors);
  document.getElementById('friendsList').addEventListener('click', showFriends);
  document.getElementById('groupBut').addEventListener('click', () => window.location.href = 'groups.html');
  document.getElementById('helpBut').addEventListener('click', () => window.location.href = 'terms.html');
  document.getElementById('xatBut').addEventListener('click', () => window.location.href = 'index.html');
  document.getElementById('GetaChat').addEventListener('click', getChat);
  document.getElementById('signIn').addEventListener('click', signIn);
}

// ... (Keep all other functions like loadUsersList, displayUsers, etc., but remove duplicates and debug logs)


// Updated Powers UI
function updatePowersDisplay() {
  const smileyBar = document.getElementById('smileyBar');
  smileyBar.innerHTML = userPowers.map(power => `
    <button class="emoticon" onclick="activatePower('${power._id}', '${power.name}')">${power.icon || '⚡'}</button>
  `).join('');
}

// Trading (New Feature)
function initiateTrade(targetUserId) {
  socket.emit('trade-request', { targetUserId, powerId: 'examplePower', price: 100 });
}

// Etc. (Add more as needed)
