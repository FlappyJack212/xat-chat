// Global Variables and Constants for iXat Chat
// This file must be loaded before any other modules

// Global variables that multiple modules need
window.page = 'chat';
window.defaultwidth = 800;
window.defaultheight = 486;
window.ww = window.innerWidth;
window.messages = [];
window.currentChat = null;
window.tempFeature = [];
window.fontSelect = null;
window.ReleaseMode = 0;

// iXat specific globals
window.isWEB = true;
window.xrRoot = '/';
window.ThisPage = 'chat';
window.GetXconst = function() {
    return {
        // Add any constants needed by other modules
        VERSION: '1.0.0',
        CHAT_URL: '/embed.html',
        API_URL: '/api'
    };
};

// Utility functions
window.addToolTip = function(element, text) {
    if (element && text) {
        element.title = text;
        element.setAttribute('data-tooltip', text);
    }
};

// Initialize global state
window.XatGlobals = {
    initialized: false,
    modules: new Map(),
    
    init: function() {
        if (this.initialized) return;
        
        console.log('🌐 [GLOBALS] Initializing global variables...');
        
        // Set up global event listeners
        window.addEventListener('resize', function() {
            window.ww = window.innerWidth;
        });
        
        this.initialized = true;
        console.log('✅ [GLOBALS] Global variables initialized');
    }
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        window.XatGlobals.init();
    });
} else {
    window.XatGlobals.init();
}
