// Snackbar Component for iXat Chat Interface
// Provides toast notifications

// Check if Snackbar already exists
if (window.Snackbar) {
    console.log('🍞 [SNACKBAR] Snackbar already exists, skipping initialization');
} else {

class Snackbar {
    constructor() {
        this.container = null;
        this.isInitialized = false;
    }

    init() {
        if (this.isInitialized) return;
        
        console.log('🍞 [SNACKBAR] Initializing Snackbar...');
        
        try {
            this.createContainer();
            this.isInitialized = true;
            console.log('✅ [SNACKBAR] Snackbar initialized successfully');
        } catch (error) {
            console.error('❌ [SNACKBAR] Failed to initialize:', error);
        }
    }

    createContainer() {
        // Create snackbar container if it doesn't exist
        this.container = document.getElementById('snackbar-container');
        
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.id = 'snackbar-container';
            this.container.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                display: flex;
                flex-direction: column;
                gap: 10px;
            `;
            document.body.appendChild(this.container);
        }
    }

    show(message, type = 'info', duration = 3000) {
        if (!this.isInitialized) {
            this.init();
        }

        const snackbar = document.createElement('div');
        snackbar.style.cssText = `
            background: ${this.getBackgroundColor(type)};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
            word-wrap: break-word;
            position: relative;
        `;

        snackbar.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <span style="font-size: 16px;">${this.getIcon(type)}</span>
                <span>${message}</span>
                <button onclick="this.parentElement.parentElement.remove()" style="
                    background: none;
                    border: none;
                    color: white;
                    font-size: 18px;
                    cursor: pointer;
                    padding: 0;
                    margin-left: auto;
                ">×</button>
            </div>
        `;

        this.container.appendChild(snackbar);

        // Animate in
        setTimeout(() => {
            snackbar.style.transform = 'translateX(0)';
        }, 10);

        // Auto remove
        setTimeout(() => {
            this.hide(snackbar);
        }, duration);

        return snackbar;
    }

    hide(snackbar) {
        if (snackbar && snackbar.parentNode) {
            snackbar.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (snackbar.parentNode) {
                    snackbar.parentNode.removeChild(snackbar);
                }
            }, 300);
        }
    }

    getBackgroundColor(type) {
        const colors = {
            'success': '#10b981',
            'error': '#ef4444',
            'warning': '#f59e0b',
            'info': '#3b82f6',
            'default': '#374151'
        };
        return colors[type] || colors['default'];
    }

    getIcon(type) {
        const icons = {
            'success': '✅',
            'error': '❌',
            'warning': '⚠️',
            'info': 'ℹ️',
            'default': '📢'
        };
        return icons[type] || icons['default'];
    }

    success(message, duration) {
        return this.show(message, 'success', duration);
    }

    error(message, duration) {
        return this.show(message, 'error', duration);
    }

    warning(message, duration) {
        return this.show(message, 'warning', duration);
    }

    info(message, duration) {
        return this.show(message, 'info', duration);
    }
}

// Create global instance
window.Snackbar = new Snackbar();

} // End of Snackbar check
