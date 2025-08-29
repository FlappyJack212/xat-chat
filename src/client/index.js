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

// Bootstrapping
document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");

  FriendList.init(app);
  TradePanel.init(app);
  XaviPanel.init(app);
  BlastSystem.init(app);
  RoomPanel.init(app);
});

// Notification system
const showNotification = (message, type = 'info') => {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = DOMPurify.sanitize(`
    <div class="notification-content">
      <span class="notification-message">${message}</span>
      <button class="notification-close">&times;</button>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 5000);
  
  // Manual close
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.addEventListener('click', () => {
    notification.remove();
  });
  
  // Slide in animation
  setTimeout(() => {
    notification.classList.add('show');
  }, 100);
};

// Utility function for making authenticated API requests
const apiRequest = async (url, options = {}) => {
  const token = localStorage.getItem('token');
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }
  
  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };
  
  try {
    const response = await fetch(url, config);
    const data = await response.json();
    
    // Handle token expiration
    if (response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
      return null;
    }
    
    return { response, data };
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// DOM Elements
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

// Event Listeners
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

// Close modal when clicking outside
window.addEventListener('click', (event) => {
  if (event.target === loginModal) {
    loginModal.style.display = 'none';
  }
  if (event.target === registerModal) {
    registerModal.style.display = 'none';
  }
  if (event.target === createRoomModal) {
    createRoomModal.style.display = 'none';
  }
});

// Form submissions
if (loginForm) {
  loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;
  
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      // Store token in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Redirect to chat page
      window.location.href = '/chat.html';
    } else {
      showNotification(data.message || 'Login failed', 'error');
    }
  } catch (error) {
    console.error('Login error:', error);
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
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      // Store token in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Redirect to chat page
      window.location.href = '/chat.html';
    } else {
      showNotification(data.message || 'Registration failed', 'error');
    }
  } catch (error) {
    console.error('Registration error:', error);
    showNotification('An error occurred during registration', 'error');
  }
  });
}

// Room creation form
if (createRoomForm) {
  createRoomForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const name = document.getElementById('room-name').value;
    const description = document.getElementById('room-description').value;
    const maxUsers = parseInt(document.getElementById('max-users').value);
    const isPrivate = document.getElementById('is-private').checked;
    
    try {
      const result = await apiRequest('/api/room', {
        method: 'POST',
        body: JSON.stringify({ 
          name, 
          description: description || undefined, 
          maxUsers, 
          isPrivate 
        })
      });
      
      if (result && result.response.ok) {
        // Close modal
        createRoomModal.style.display = 'none';
        
        // Show success message
        showNotification(`Room "${result.data.room.name}" created successfully!`, 'success');
        
        // Redirect to the new room after a short delay
        setTimeout(() => {
          window.location.href = `/classic.html?room=${result.data.room._id}`;
        }, 1000);
      } else if (result) {
        showNotification(result.data.message || 'Failed to create room', 'error');
      }
    } catch (error) {
      console.error('Room creation error:', error);
      showNotification('An error occurred while creating the room', 'error');
    }
  });
}

// Load popular rooms
const loadPopularRooms = async () => {
  if (!popularRoomsList) return;
  
  try {
    const response = await fetch('/api/room?sort=popular&limit=6');
    const data = await response.json();
    
    if (response.ok) {
      popularRoomsList.innerHTML = '';
      
      if (data.rooms.length === 0) {
        popularRoomsList.innerHTML = `
          <div class="loading-rooms">
            <h3>No rooms available yet</h3>
            <p>Be the first to create a chat room!</p>
            <a href="/classic.html" class="btn btn-primary">
              <i class="fas fa-plus"></i>
              <span>Create Room</span>
            </a>
          </div>
        `;
        return;
      }
      
      data.rooms.forEach(room => {
        const roomElement = document.createElement('div');
        roomElement.className = 'room-card';
        roomElement.innerHTML = `
          <div class="room-card-header">
            <h3>${room.name}</h3>
            <p>${room.description || 'Join the conversation!'}</p>
          </div>
          <div class="room-card-body">
            <div class="room-stats">
              <div class="room-stat">
                <i class="fas fa-users"></i>
                <span>${room.usersCount || 0} users</span>
              </div>
              <div class="room-stat">
                <i class="fas fa-star"></i>
                <span>${room.powers ? room.powers.length : 0} powers</span>
              </div>
            </div>
            <div class="room-actions">
              <a href="/classic.html?room=${room._id}" class="btn btn-primary btn-small">
                <i class="fas fa-comments"></i>
                <span>Join Classic</span>
              </a>
              <a href="/chat.html?room=${room._id}" class="btn btn-secondary btn-small">
                <i class="fas fa-rocket"></i>
                <span>Modern Chat</span>
              </a>
            </div>
          </div>
        `;
        popularRoomsList.appendChild(roomElement);
      });
    } else {
      popularRoomsList.innerHTML = `
        <div class="loading-rooms">
          <h3>Failed to load rooms</h3>
          <p>Please try again later</p>
        </div>
      `;
    }
  } catch (error) {
    console.error('Error loading popular rooms:', error);
    popularRoomsList.innerHTML = `
      <div class="loading-rooms">
        <h3>Error loading rooms</h3>
        <p>Please check your connection and try again</p>
      </div>
    `;
  }
};

// Check if user is logged in
const checkAuth = () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  
  if (token && user) {
    // User is logged in
    if (loginButton) {
      loginButton.style.display = 'none';
    }
    if (registerButton) {
      registerButton.style.display = 'none';
    }
    if (createRoomButton) {
      createRoomButton.style.display = 'flex';
    }
    
    // Show profile and logout
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
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.reload();
      });
    }
    
    // Update welcome message
    const welcomeTitle = document.querySelector('.welcome-title');
    if (welcomeTitle) {
      const userData = JSON.parse(user);
      welcomeTitle.textContent = `Welcome back, ${userData.displayName || userData.username}!`;
    }
  } else {
    // User is not logged in
    if (createRoomButton) {
      createRoomButton.style.display = 'none';
    }
  }
};

// Carousel functionality
const initCarousel = () => {
  const carouselTrack = document.querySelector('.carousel-track');
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  
  let currentSlide = 0;
  
  const showSlide = (index) => {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    
    currentSlide = index;
  };
  
  const nextSlide = () => {
    const next = (currentSlide + 1) % slides.length;
    showSlide(next);
  };
  
  const prevSlide = () => {
    const prev = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prev);
  };
  
  // Event listeners
  if (prevBtn) {
    prevBtn.addEventListener('click', prevSlide);
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', nextSlide);
  }
  
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
  });
  
  // Auto-advance carousel every 5 seconds
  setInterval(nextSlide, 5000);
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  checkAuth();
  loadPopularRooms();
  initCarousel();
});

// ---- App bootstrap (modular UI) ----
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

  // Layout
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

  // Wire bus events (minimal demo)
  bus.on('chat:send', (e) => {
    const { text } = e.detail || {};
    const row = renderMessage({ user: 'You', text });
    messages.appendChild(row);
    messages.scrollTop = messages.scrollHeight;
  });

  // Example friend event to open PM (placeholder)
  bus.on('friends:message', (e) => {
    console.log('Open PM with', e.detail);
  });

  return { messages, friendList, tradePanel };
}

// Ensure UI is mounted once
if (!window.__XAT_UI_MOUNTED__) {
  window.__XAT_UI_MOUNTED__ = true;
  try { mountUI(); } catch (e) { console.error('UI mount failed', e); }
}
