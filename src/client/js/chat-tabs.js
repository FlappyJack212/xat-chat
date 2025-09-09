// Chat Tabs Management Module
class ChatTabsManager {
    constructor() {
        this.chatTabs = new Map();
        this.tabCounter = 0;
        this.currentRoom = 'main';
        this.init();
    }

    init() {
        this.initializeChatTabs();
    }

    initializeChatTabs() {
        // Add main chat tab
        this.addChatTab('Main Chat', 'main', true, false);
    }

    addNewTab() {
        const roomName = prompt('Enter room name:');
        if (roomName && roomName.trim()) {
            this.addChatTab(roomName.trim(), null, true, true);
            this.switchRoom(roomName.trim());
        }
    }

    addChatTab(roomName, roomId = null, isActive = false, canClose = true) {
        const tabId = roomId || `tab_${++this.tabCounter}`;
        const tabContainer = document.getElementById('chatTabs');
        
        if (!tabContainer) return;
        
        const tab = document.createElement('div');
        tab.className = `chat-tab ${isActive ? 'active' : ''}`;
        tab.id = `tab_${tabId}`;
        tab.innerHTML = `
            <span class="tab-name">${roomName}</span>
            <span class="tab-count" id="count_${tabId}"></span>
            ${canClose ? `<span class="tab-close" onclick="chatTabsManager.closeTab(event, '${tabId}')">×</span>` : ''}
        `;
        
        tab.addEventListener('click', (e) => {
            if (!e.target.classList.contains('tab-close')) {
                this.switchToTab(tabId, roomName);
            }
        });
        
        // Store tab reference
        this.chatTabs.set(tabId, {
            element: tab,
            roomName: roomName,
            roomId: roomId,
            isActive: isActive,
            canClose: canClose
        });
        
        // Add to container
        tabContainer.appendChild(tab);
        this.updateTabLayout();
        
        if (isActive) {
            this.switchToTab(tabId, roomName);
        }
    }

    switchToTab(tabId, roomName) {
        if (!this.chatTabs.has(tabId)) return;
        
        // Update tab states
        this.chatTabs.forEach((tab, id) => {
            tab.element.classList.toggle('active', id === tabId);
            tab.isActive = (id === tabId);
        });
        
        // Switch room
        this.switchRoom(roomName);
    }

    closeTab(event, tabId) {
        event.stopPropagation();
        
        if (!this.chatTabs.has(tabId)) return;
        
        const tab = this.chatTabs.get(tabId);
        if (!tab.canClose) return;
        
        // Remove from DOM
        tab.element.remove();
        this.chatTabs.delete(tabId);
        
        // If this was the active tab, switch to another
        if (tab.isActive && this.chatTabs.size > 0) {
            const firstTab = this.chatTabs.values().next().value;
            this.switchToTab(firstTab.roomId || `tab_${this.tabCounter}`, firstTab.roomName);
        }
        
        this.updateTabLayout();
    }

    updateTabLayout() {
        const tabContainer = document.getElementById('chatTabs');
        if (!tabContainer) return;
        
        const tabs = tabContainer.querySelectorAll('.chat-tab');
        const containerWidth = tabContainer.offsetWidth;
        const tabWidth = Math.min(150, containerWidth / tabs.length);
        
        tabs.forEach(tab => {
            tab.style.width = `${tabWidth}px`;
        });
    }

    updateTabCount(tabId, count) {
        const countElement = document.getElementById(`count_${tabId}`);
        if (countElement) {
            countElement.textContent = count > 0 ? `(${count})` : '';
        }
    }

    addUnreadToTab(roomName, count = 1) {
        const tab = Array.from(this.chatTabs.values()).find(t => t.roomName === roomName);
        if (tab) {
            const currentCount = parseInt(tab.element.querySelector('.tab-count').textContent.replace(/[^\d]/g, '') || 0);
            this.updateTabCount(tab.roomId || `tab_${this.tabCounter}`, currentCount + count);
        }
    }

    switchRoom(roomName) {
        if (this.currentRoom === roomName) return;
        
        console.log(`Switching to room: ${roomName}`);
        this.currentRoom = roomName;
        
        // Update UI
        document.querySelectorAll('.room-item').forEach(item => {
            item.classList.remove('active');
        });
        const roomItem = document.querySelector(`[data-room="${roomName}"]`);
        if (roomItem) {
            roomItem.classList.add('active');
        }
        
        // Leave current room and join new room logic would go here
        // This would typically involve socket events
    }

    createRoom() {
        const roomName = prompt('Enter room name:');
        if (roomName && roomName.trim()) {
            this.addRoomToSidebar(roomName.trim());
            this.addChatTab(roomName.trim(), null, true, true);
            this.switchRoom(roomName.trim());
        }
    }

    joinRoom() {
        const roomName = prompt('Enter room name to join:');
        if (roomName && roomName.trim()) {
            this.addRoomToSidebar(roomName.trim());
            this.addChatTab(roomName.trim(), null, true, true);
            this.switchRoom(roomName.trim());
        }
    }

    addRoomToSidebar(roomName) {
        const roomsSidebar = document.querySelector('.rooms-sidebar');
        if (!roomsSidebar) return;
        
        const roomItem = document.createElement('div');
        roomItem.className = 'room-item';
        roomItem.setAttribute('data-room', roomName);
        roomItem.innerHTML = `
            <div class="room-name">${roomName}</div>
            <div class="room-users">0 users</div>
        `;
        
        roomItem.addEventListener('click', () => {
            this.switchRoom(roomName);
        });
        
        roomsSidebar.appendChild(roomItem);
    }

    updateRoomUserCount(roomName, count) {
        const roomItem = document.querySelector(`[data-room="${roomName}"]`);
        if (roomItem) {
            const userCount = roomItem.querySelector('.room-users');
            if (userCount) {
                userCount.textContent = `${count} users`;
            }
        }
    }
}

// Initialize chat tabs manager
const chatTabsManager = new ChatTabsManager();
