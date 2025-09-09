// Activity Component for iXat Chat Interface
// Handles activity management and state

class Activity {
    constructor() {
        this.isInitialized = false;
        this.isClassic = false;
        this.currentPage = 'chat';
        this.user = null;
        this.settings = {};
    }

    init() {
        if (this.isInitialized) return;
        
        console.log('🎯 [ACTIVITY] Initializing Activity...');
        
        try {
            this.loadSettings();
            this.setupEventListeners();
            this.isInitialized = true;
            console.log('✅ [ACTIVITY] Activity initialized successfully');
        } catch (error) {
            console.error('❌ [ACTIVITY] Failed to initialize:', error);
        }
    }

    loadSettings() {
        // Load settings from localStorage
        this.settings = JSON.parse(localStorage.getItem('activitySettings') || '{}');
        this.isClassic = this.settings.isClassic || false;
        this.currentPage = this.settings.currentPage || 'chat';
    }

    setupEventListeners() {
        // Listen for page changes
        window.addEventListener('hashchange', () => {
            this.currentPage = window.location.hash.substring(1) || 'chat';
            this.saveSettings();
        });

        // Listen for user changes
        window.addEventListener('userChanged', (event) => {
            this.user = event.detail.user;
        });
    }

    saveSettings() {
        this.settings.isClassic = this.isClassic;
        this.settings.currentPage = this.currentPage;
        localStorage.setItem('activitySettings', JSON.stringify(this.settings));
    }

    setClassicMode(isClassic) {
        this.isClassic = isClassic;
        this.saveSettings();
        
        // Dispatch event for other components
        window.dispatchEvent(new CustomEvent('classicModeChanged', {
            detail: { isClassic }
        }));
    }

    setCurrentPage(page) {
        this.currentPage = page;
        this.saveSettings();
    }

    setUser(user) {
        this.user = user;
        window.dispatchEvent(new CustomEvent('userChanged', {
            detail: { user }
        }));
    }

    getCurrentPage() {
        return this.currentPage;
    }

    isClassicMode() {
        return this.isClassic;
    }

    getCurrentUser() {
        return this.user;
    }
}

// Create global instance
window._Activity = new Activity();
