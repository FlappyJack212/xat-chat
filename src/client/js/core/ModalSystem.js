/**
 * ModalSystem - Handles modal dialogs and overlays
 * Manages modal creation, display, and interaction
 */
class ModalSystem {
    constructor() {
        this.modals = [];
        this.currentModal = null;
        this.container = null;
        this.initialized = false;
    }

    /**
     * Initialize ModalSystem
     */
    init() {
        if (this.initialized) {
            console.log('ModalSystem already initialized');
            return;
        }

        try {
            this.createContainer();
            this.setupEventListeners();
            this.initialized = true;
            console.log('✅ ModalSystem initialized successfully');
        } catch (error) {
            console.error('❌ Error initializing ModalSystem:', error);
        }
    }

    /**
     * Create modals container
     */
    createContainer() {
        this.container = document.getElementById('modalsContainer');
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.id = 'modalsContainer';
            this.container.className = 'modals-container';
            document.body.appendChild(this.container);
        }
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.currentModal) {
                this.close();
            }
        });

        // Handle outside clicks
        document.addEventListener('click', (e) => {
            if (e.target === this.container && this.currentModal) {
                this.close();
            }
        });
    }

    /**
     * Show modal
     */
    show(title, content, options = {}) {
        if (!this.container) {
            console.error('Modal container not found');
            return;
        }

        // Close existing modal if specified
        if (options.closeExisting !== false) {
            this.close();
        }

        // Create modal element
        const modal = this.createModal(title, content, options);
        
        // Add to container
        this.container.appendChild(modal);
        
        // Store modal reference
        this.modals.push(modal);
        this.currentModal = modal;

        // Trigger show animation
        requestAnimationFrame(() => {
            modal.classList.add('show');
        });

        return modal;
    }

    /**
     * Create modal element
     */
    createModal(title, content, options) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        
        if (options.className) {
            modal.classList.add(options.className);
        }

        const modalContent = document.createElement('div');
        modalContent.className = 'modal';
        
        if (options.size) {
            modalContent.classList.add(`modal-${options.size}`);
        }

        // Create header
        const header = document.createElement('div');
        header.className = 'modal-header';
        header.innerHTML = `
            <h3>${title}</h3>
            ${options.closable !== false ? '<button class="modal-close">×</button>' : ''}
        `;

        // Create content
        const contentEl = document.createElement('div');
        contentEl.className = 'modal-content';
        contentEl.innerHTML = content;

        // Create footer if specified
        let footer = null;
        if (options.footer) {
            footer = document.createElement('div');
            footer.className = 'modal-footer';
            footer.innerHTML = options.footer;
        }

        // Assemble modal
        modalContent.appendChild(header);
        modalContent.appendChild(contentEl);
        if (footer) {
            modalContent.appendChild(footer);
        }
        modal.appendChild(modalContent);

        // Add close functionality
        const closeBtn = modal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.close();
            });
        }

        // Add click outside to close
        if (options.clickOutside !== false) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.close();
                }
            });
        }

        return modal;
    }

    /**
     * Close current modal
     */
    close() {
        if (!this.currentModal) return;

        // Add closing animation
        this.currentModal.classList.add('closing');
        
        // Remove from DOM after animation
        setTimeout(() => {
            if (this.currentModal && this.currentModal.parentNode) {
                this.currentModal.parentNode.removeChild(this.currentModal);
            }
            
            // Remove from modals array
            const index = this.modals.indexOf(this.currentModal);
            if (index > -1) {
                this.modals.splice(index, 1);
            }
            
            this.currentModal = null;
        }, 300);
    }

    /**
     * Close all modals
     */
    closeAll() {
        this.modals.forEach(modal => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        });
        this.modals = [];
        this.currentModal = null;
    }

    /**
     * Show confirmation dialog
     */
    confirm(message, title = 'Confirm', options = {}) {
        return new Promise((resolve) => {
            const footer = `
                <button class="btn btn-secondary" onclick="this.close()">Cancel</button>
                <button class="btn btn-primary" onclick="this.confirmAction()">Confirm</button>
            `;

            const modal = this.show(title, `
                <div class="confirm-content">
                    <p>${message}</p>
                </div>
            `, {
                ...options,
                footer: footer,
                closable: false
            });

            // Add confirm action
            modal.confirmAction = () => {
                this.close();
                resolve(true);
            };

            // Add cancel action
            modal.cancelAction = () => {
                this.close();
                resolve(false);
            };
        });
    }

    /**
     * Show alert dialog
     */
    alert(message, title = 'Alert', options = {}) {
        return new Promise((resolve) => {
            const footer = `
                <button class="btn btn-primary" onclick="this.close()">OK</button>
            `;

            const modal = this.show(title, `
                <div class="alert-content">
                    <p>${message}</p>
                </div>
            `, {
                ...options,
                footer: footer,
                closable: false
            });

            // Add close action
            modal.closeAction = () => {
                this.close();
                resolve();
            };
        });
    }

    /**
     * Show prompt dialog
     */
    prompt(message, defaultValue = '', title = 'Prompt', options = {}) {
        return new Promise((resolve) => {
            const inputId = 'prompt-input-' + Date.now();
            const footer = `
                <button class="btn btn-secondary" onclick="this.cancelAction()">Cancel</button>
                <button class="btn btn-primary" onclick="this.confirmAction()">OK</button>
            `;

            const modal = this.show(title, `
                <div class="prompt-content">
                    <p>${message}</p>
                    <input type="text" id="${inputId}" class="prompt-input" value="${defaultValue}" placeholder="Enter value...">
                </div>
            `, {
                ...options,
                footer: footer,
                closable: false
            });

            // Focus input
            setTimeout(() => {
                const input = modal.querySelector(`#${inputId}`);
                if (input) {
                    input.focus();
                    input.select();
                }
            }, 100);

            // Add confirm action
            modal.confirmAction = () => {
                const input = modal.querySelector(`#${inputId}`);
                const value = input ? input.value : defaultValue;
                this.close();
                resolve(value);
            };

            // Add cancel action
            modal.cancelAction = () => {
                this.close();
                resolve(null);
            };

            // Handle enter key
            modal.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    modal.confirmAction();
                }
            });
        });
    }

    /**
     * Show loading modal
     */
    loading(message = 'Loading...', title = 'Please Wait') {
        const modal = this.show(title, `
            <div class="loading-content">
                <div class="loading-spinner"></div>
                <p>${message}</p>
            </div>
        `, {
            closable: false,
            clickOutside: false
        });

        return modal;
    }

    /**
     * Check if modal is open
     */
    isOpen() {
        return this.currentModal !== null;
    }

    /**
     * Get current modal
     */
    getCurrent() {
        return this.currentModal;
    }

    /**
     * Get all modals
     */
    getAll() {
        return [...this.modals];
    }

    /**
     * Get modal count
     */
    getCount() {
        return this.modals.length;
    }

    /**
     * Cleanup and destroy
     */
    destroy() {
        this.closeAll();
        if (this.container && this.container.parentNode) {
            this.container.parentNode.removeChild(this.container);
        }
        this.container = null;
        this.initialized = false;
        console.log('✅ ModalSystem destroyed');
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ModalSystem;
} else if (typeof window !== 'undefined') {
    window.ModalSystem = ModalSystem;
}
