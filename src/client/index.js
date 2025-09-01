import './css/normalize.css';
import './css/main.css';
import DOMPurify from 'dompurify';
import bus from './eventBus.js';
import createChatBox, { renderMessage } from './components/ChatBox.js';
import createFriendList from './components/FriendList.js';
import createTradePanel from './components/TradePanel.js';
import FriendList from "./components/FriendList.js";
import TradePanel from "./components/TradePanel.js";
import XaviPanel from "./components/XaviPanel.js";
import BlastSystem from "./components/BlastSystem.js";
import RoomPanel from "./components/RoomPanel.js";

const showNotification = (message, type = 'info') => {
    const notification = document.createElement('div');
    notification.className = `notification ${type} fixed top-4 right-4 p-4 rounded-lg shadow-lg bg-${type === 'error' ? 'red' : 'blue'}-100 text-${type === 'error' ? 'red' : 'blue'}-800`;
    notification.innerHTML = DOMPurify.sanitize(`
        <div class="flex items-center">
            <span>${message}</span>
            <button class="notification-close ml-4 text-lg">&times;</button>
        </div>
    `);
    document.body.appendChild(notification);
    setTimeout(() => notification.classList.add('opacity-100'), 100);
    setTimeout(() => notification.remove(), 5000);
    notification.querySelector('.notification-close').addEventListener('click', () => notification.remove());
};

const apiRequest = async (url, options = {}) => {
    const token = localStorage.getItem('authToken');
    const headers = {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
    };
    try {
        const response = await fetch(url, {
            ...options,
            headers: { ...headers, ...options.headers }
        });
        const data = await response.json();
        if (response.status === 401) {
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            window.location.href = '/';
            return null;
        }
        return { response, data };
    } catch (error) {
        console.error('API request failed:', error);
        showNotification('Network error, please try again', 'error');
        throw error;
    }
};

const loginButton = document.getElementById('login-button');
const registerButton = document.getElementById('register-button');
const createRoomButton = document.getElementById('create-room-button');
const loginModal = document.getElementById('login-modal');
const registerModal = document.getElementById('register-modal');
const createRoomModal = document.getElementById('create-room-modal');
const closeButtons = document.querySelectorAll('.close');
const switchToRegister = document.getElementById('switch-to-register');
const switchToLogin = document.getElementById('switch-to-login');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const createRoomForm = document.getElementById('create-room-form');
const popularRoomsList = document.getElementById('popular-rooms-list');

if (loginButton && loginModal) {
    loginButton.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.style.display = 'block';
    });
}

if (registerButton && registerModal) {
    registerButton.addEventListener('click', (e) => {
        e.preventDefault();
        registerModal.style.display = 'block';
    });
}

if (createRoomButton && createRoomModal) {
    createRoomButton.addEventListener('click', (e) => {
        e.preventDefault();
        createRoomModal.style.display = 'block';
    });
}

if (closeButtons.length > 0) {
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (loginModal) loginModal.style.display = 'none';
            if (registerModal) registerModal.style.display = 'none';
            if (createRoomModal) createRoomModal.style.display = 'none';
        });
    });
}

if (switchToRegister && loginModal && registerModal) {
    switchToRegister.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.style.display = 'none';
        registerModal.style.display = 'block';
    });
}

if (switchToLogin && registerModal && loginModal) {
    switchToLogin.addEventListener('click', (e) => {
        e.preventDefault();
        registerModal.style.display = 'none';
        loginModal.style.display = 'block';
    });
}

window.addEventListener('click', (event) => {
    if (event.target === loginModal) loginModal.style.display = 'none';
    if (event.target === registerModal) registerModal.style.display = 'none';
    if (event.target === createRoomModal) createRoomModal.style.display = 'none';
});

if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        try {
            const { response, data } = await apiRequest('/api/auth/login', {
                method: 'POST',
                body: JSON.stringify({ username, password })
            });
            if (response.ok) {
                localStorage.setItem('authToken', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                window.location.href = '/chat.html';
            } else {
                showNotification(data.message || 'Login failed', 'error');
            }
        } catch (error) {
            showNotification('An error occurred during login', 'error');
        }
    });
}

if (registerForm) {
    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('register-username').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;
        if (password !== confirmPassword) {
            showNotification('Passwords do not match', 'error');
            return;
        }
        try {
            const { response, data } = await apiRequest('/api/auth/register', {
                method: 'POST',
                body: JSON.stringify({ username, email, password })
            });
            if (response.ok) {
                localStorage.setItem('authToken', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                window.location.href = '/chat.html';
            } else {
                showNotification(data.message || 'Registration failed', 'error');
            }
        } catch (error) {
            showNotification('An error occurred during registration', 'error');
        }
    });
}

if (createRoomForm) {
    createRoomForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const name = document.getElementById('room-name').value;
        const description = document.getElementById('room-description').value;
        try {
            const { response, data } = await apiRequest('/api/rooms', {
                method: 'POST',
                body: JSON.stringify({ name, description })
            });
            if (response.ok) {
                showNotification('Room created successfully', 'info');
                setTimeout(() => window.location.href = `/chat.html?room=${data._id}`, 1000);
            } else {
                showNotification(data.message || 'Failed to create room', 'error');
            }
        } catch (error) {
            showNotification('An error occurred while creating the room', 'error');
        }
    });
}

const loadPopularRooms = async () => {
    if (!popularRoomsList) return;
    try {
        const { response, data } = await apiRequest('/api/rooms?sort=popular&limit=6');
        if (response.ok) {
            popularRoomsList.innerHTML = '';
            if (data.rooms.length === 0) {
                popularRoomsList.innerHTML = `
                    <div class="loading-rooms p-4 text-center">
                        <h3 class="text-lg font-bold">No rooms available yet</h3>
                        <p>Be the first to create a chat room!</p>
                        <a href="/classic.html" class="px-4 py-2 bg-blue-500 text-white rounded-lg">Create Room</a>
                    </div>
                `;
                return;
            }
            data.rooms.forEach(room => {
                const roomElement = document.createElement('div');
                roomElement.className = 'room-card p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-4';
                roomElement.innerHTML = DOMPurify.sanitize(`
                    <div class="room-card-header">
                        <h3 class="text-lg font-bold">${room.name}</h3>
                        <p>${room.description || 'Join the conversation!'}</p>
                    </div>
                    <div class="room-card-body mt-2">
                        <div class="room-stats flex gap-4">
                            <div><i class="fas fa-users"></i> ${room.usersCount || 0} users</div>
                            <div><i class="fas fa-star"></i> ${room.powers ? room.powers.length : 0} powers</div>
                        </div>
                        <div class="room-actions flex gap-2 mt-2">
                            <a href="/classic.html?room=${room._id}" class="px-4 py-2 bg-blue-500 text-white rounded-lg">Join Classic</a>
                            <a href="/chat.html?room=${room._id}" class="px-4 py-2 bg-gray-500 text-white rounded-lg">Modern Chat</a>
                        </div>
                    </div>
                `);
                popularRoomsList.appendChild(roomElement);
            });
        } else {
            popularRoomsList.innerHTML = `
                <div class="loading-rooms p-4 text-center">
                    <h3 class="text-lg font-bold">Failed to load rooms</h3>
                    <p>Please try again later</p>
                </div>
            `;
        }
    } catch (error) {
        popularRoomsList.innerHTML = `
            <div class="loading-rooms p-4 text-center">
                <h3 class="text-lg font-bold">Error loading rooms</h3>
                <p>Please check your connection and try again</p>
            </div>
        `;
    }
};

const checkAuth = () => {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('user');
    if (token && user) {
        if (loginButton) loginButton.style.display = 'none';
        if (registerButton) registerButton.style.display = 'none';
        if (createRoomButton) createRoomButton.style.display = 'flex';
        const profileLink = document.getElementById('profile-link');
        const logoutLink = document.getElementById('logout-link');
        if (profileLink) {
            profileLink.style.display = 'flex';
            profileLink.classList.remove('d-none');
        }
        if (logoutLink) {
            logoutLink.style.display = 'flex';
            logoutLink.classList.remove('d-none');
            logoutLink.addEventListener('click', (event) => {
                event.preventDefault();
                localStorage.removeItem('authToken');
                localStorage.removeItem('user');
                window.location.reload();
            });
        }
        const welcomeTitle = document.querySelector('.welcome-title');
        if (welcomeTitle) {
            const userData = JSON.parse(user);
            welcomeTitle.textContent = `Welcome back, ${userData.displayName || userData.username}!`;
        }
    } else {
        if (createRoomButton) createRoomButton.style.display = 'none';
    }
};

const initCarousel = () => {
    const carouselTrack = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    let currentSlide = 0;
    const showSlide = (index) => {
        slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
        dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
        currentSlide = index;
    };
    const nextSlide = () => showSlide((currentSlide + 1) % slides.length);
    const prevSlide = () => showSlide((currentSlide - 1 + slides.length) % slides.length);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    dots.forEach((dot, index) => dot.addEventListener('click', () => showSlide(index)));
    setInterval(nextSlide, 5000);
};

document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    loadPopularRooms();
    initCarousel();
    mountUI();
});

function ensureAppRoot() {
    let root = document.getElementById('app');
    if (!root) {
        root = document.createElement('div');
        root.id = 'app';
        document.body.appendChild(root);
    }
    return root;
}

function mountUI() {
    const root = ensureAppRoot();
    if (root.id === 'app') {
        const shell = document.createElement('div');
        shell.className = 'grid grid-cols-4 gap-4 p-4';
        const colChat = document.createElement('div');
        colChat.className = 'col-span-3 rounded-2xl shadow p-2 flex flex-col gap-2';
        const messages = document.createElement('div');
        messages.id = 'messages';
        messages.className = 'flex-1 overflow-auto space-y-1';
        const chatBox = createChatBox();
        colChat.append(messages, chatBox);
        const colSide = document.createElement('div');
        colSide.className = 'col-span-1 space-y-4';
        const friendList = createFriendList([]);
        const tradePanel = createTradePanel();
        colSide.append(friendList.el, tradePanel.el);
        shell.append(colChat, colSide);
        root.appendChild(shell);
        bus.on('chat:send', (e) => {
            const { text } = e.detail || {};
            const row = renderMessage({ user: 'You', text });
            messages.appendChild(row);
            messages.scrollTop = messages.scrollHeight;
        });
        bus.on('friends:message', (e) => {
            console.log('Open PM with', e.detail);
        });
    }
}

if (!window.__XAT_UI_MOUNTED__) {
    window.__XAT_UI_MOUNTED__ = true;
    try {
        mountUI();
    } catch (e) {
        console.error('UI mount failed', e);
        showNotification('Failed to initialize UI', 'error');
    }
}
