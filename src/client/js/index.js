import './css/normalize.css';
import './css/main.css';

// Notification system
const showNotification = (message, type = 'info') => {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
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

// Check authentication status
const checkAuthStatus = async () => {
  const token = localStorage.getItem('token');
  if (!token) return false;
  
  try {
    const response = await fetch(`/api/auth/status?token=${token}`);
    const data = await response.json();
    
    if (data.authenticated) {
      return data.user;
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return false;
    }
  } catch (error) {
    console.error('Auth status check failed:', error);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return false;
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

// Close modal when clicking on X
closeButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    event.target.closest('.modal').style.display = 'none';
  });
});

// Close modal when clicking outside of it
window.addEventListener('click', (event) => {
  if (event.target.classList.contains('modal')) {
    event.target.style.display = 'none';
  }
});

// Switch between login and register forms
if (switchToRegister) {
  switchToRegister.addEventListener('click', (event) => {
    event.preventDefault();
    loginModal.style.display = 'none';
    registerModal.style.display = 'block';
  });
}

if (switchToLogin) {
  switchToLogin.addEventListener('click', (event) => {
    event.preventDefault();
    registerModal.style.display = 'none';
    loginModal.style.display = 'block';
  });
}

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
      
      if (response.ok && data.success) {
        // Store token in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Close modal
        if (loginModal) loginModal.style.display = 'none';
        
        // Show success message
        showNotification('Login successful!', 'success');
        
        // Redirect to chat page or refresh
        setTimeout(() => {
          window.location.href = '/chat.html';
        }, 1000);
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
        body: JSON.stringify({ username, email, password, nickname: username })
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        showNotification('Registration successful! Please login.', 'success');
        
        // Close modal and switch to login
        if (registerModal) registerModal.style.display = 'none';
        if (loginModal) loginModal.style.display = 'block';
        
        // Clear form
        registerForm.reset();
      } else {
        showNotification(data.message || 'Registration failed', 'error');
      }
    } catch (error) {
      console.error('Registration error:', error);
      showNotification('An error occurred during registration', 'error');
    }
  });
}

// Initialize the page
const initPage = async () => {
  // Check if user is already authenticated
  const user = await checkAuthStatus();
  
  if (user) {
    // User is logged in, update UI accordingly
    updateUIForAuthenticatedUser(user);
  } else {
    // User is not logged in, show login/register buttons
    updateUIForUnauthenticatedUser();
  }
  
  // Load popular rooms
  loadPopularRooms();
};

// Update UI for authenticated user
const updateUIForAuthenticatedUser = (user) => {
  // Hide login/register buttons
  if (loginButton) loginButton.style.display = 'none';
  if (registerButton) registerButton.style.display = 'none';
  
  // Show user info and logout button
  const userInfo = document.createElement('div');
  userInfo.className = 'user-info';
  userInfo.innerHTML = `
    <span>Welcome, ${user.nickname || user.username}!</span>
    <button onclick="logout()" class="btn btn-outline-light btn-sm">Logout</button>
  `;
  
  // Find where to insert user info (usually in navbar)
  const navbarNav = document.querySelector('.navbar-nav');
  if (navbarNav) {
    navbarNav.appendChild(userInfo);
  }
};

// Update UI for unauthenticated user
const updateUIForUnauthenticatedUser = () => {
  // Show login/register buttons
  if (loginButton) loginButton.style.display = 'inline-block';
  if (registerButton) registerButton.style.display = 'inline-block';
  
  // Remove user info if it exists
  const userInfo = document.querySelector('.user-info');
  if (userInfo) userInfo.remove();
};

// Logout function
const logout = async () => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    }
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    // Clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Redirect to home page
    window.location.href = '/';
  }
};

// Load popular rooms
const loadPopularRooms = async () => {
  try {
    const response = await fetch('/api/rooms?sort=popular&limit=5');
    const data = await response.json();
    
    if (popularRoomsList && data.rooms) {
      popularRoomsList.innerHTML = data.rooms.map(room => `
        <div class="room-item">
          <h5>${room.name}</h5>
          <p>${room.description || 'Join the conversation!'}</p>
          <a href="/chat-group.html?room=${room.name}" class="btn btn-primary btn-sm">Join Room</a>
        </div>
      `).join('');
    }
  } catch (error) {
    console.error('Failed to load popular rooms:', error);
  }
};

// Make logout function global
window.logout = logout;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initPage);