'use strict';

// Visitors module for xat chat
var visitors = new function() {
  this.Classic = false;
  this.ScrollContainer = null;
  this.users = [];
  this.sections = [];
  
  // Initialize visitors
  this.init = function() {
    console.log('🎭 [VISITORS] Initializing visitors module...');
    this.ScrollContainer = document.getElementById('visitorsContainer');
    if (!this.ScrollContainer) {
      console.warn('Visitors container not found');
      return;
    }
    this.loadSampleUsers();
    this.displayUsers();
  };
  
  // Load sample users for testing
  this.loadSampleUsers = function() {
    this.users = [
      { id: 1, name: 'Alice', status: 'online', avatar: '👩', pFlags: 0 },
      { id: 2, name: 'Bob', status: 'away', avatar: '👨', pFlags: 0 },
      { id: 3, name: 'Charlie', status: 'online', avatar: '🧑', pFlags: 0 },
      { id: 4, name: 'Diana', status: 'busy', avatar: '👩‍💼', pFlags: 0 },
      { id: 5, name: 'Eve', status: 'online', avatar: '👩‍🎨', pFlags: 0 }
    ];
  };
  
  // Display users in the visitors container
  this.displayUsers = function() {
    if (!this.ScrollContainer) return;
    
    // Clear existing content
    this.ScrollContainer.innerHTML = '';
    
    // Create visitors list
    const visitorsList = document.createElement('ul');
    visitorsList.id = 'idvisitors';
    
    this.users.forEach(user => {
      const userItem = document.createElement('li');
      userItem.className = 'friend';
      userItem.innerHTML = `
        <span class="visitorsName">${user.avatar} ${user.name}</span>
        <span class="user-status ${user.status}"></span>
      `;
      visitorsList.appendChild(userItem);
    });
    
    this.ScrollContainer.appendChild(visitorsList);
  };
  
  // Add a user to the visitors list
  this.addUser = function(user) {
    this.users.push(user);
    this.displayUsers();
  };
  
  // Remove a user from the visitors list
  this.removeUser = function(userId) {
    this.users = this.users.filter(user => user.id !== userId);
    this.displayUsers();
  };
  
  // Update user status
  this.updateUserStatus = function(userId, status) {
    const user = this.users.find(u => u.id === userId);
    if (user) {
      user.status = status;
      this.displayUsers();
    }
  };
  
  // Update all users (called by the main system)
  this.updateAll = function(users) {
    this.users = users || [];
    this.displayUsers();
  };
  
  // Get user count
  this.getUserCount = function() {
    return this.users.length;
  };
  
  // Get online user count
  this.getOnlineCount = function() {
    return this.users.filter(user => user.status === 'online').length;
  };
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  if (window.visitors) {
    window.visitors.init();
  }
});

// Make visitors available globally
window.visitors = visitors;