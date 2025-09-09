/**
 * Background Selector UI Component
 * Provides a user interface for selecting and managing backgrounds
 */

class BackgroundSelector {
    constructor(backgroundManager) {
        this.backgroundManager = backgroundManager;
        this.isOpen = false;
        this.currentCategory = 'all';
        this.searchQuery = '';
        this.modal = null;
        this.grid = null;
        this.searchInput = null;
        this.categoryTabs = null;
        
        this.init();
    }

    /**
     * Initialize the background selector
     */
    init() {
        this.createModal();
        this.setupEventListeners();
        console.log('🎨 [SELECTOR] Background selector initialized');
    }

    /**
     * Create the modal UI
     */
    createModal() {
        // Create modal container
        this.modal = document.createElement('div');
        this.modal.className = 'background-selector-modal';
        this.modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 10000;
            display: none;
            align-items: center;
            justify-content: center;
            font-family: Arial, sans-serif;
        `;

        // Create modal content
        const content = document.createElement('div');
        content.className = 'background-selector-content';
        content.style.cssText = `
            background: #2a2a2a;
            border-radius: 8px;
            width: 90%;
            max-width: 800px;
            height: 80%;
            max-height: 600px;
            display: flex;
            flex-direction: column;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        `;

        // Create header
        const header = this.createHeader();
        content.appendChild(header);

        // Create search bar
        const searchBar = this.createSearchBar();
        content.appendChild(searchBar);

        // Create category tabs
        const categoryTabs = this.createCategoryTabs();
        content.appendChild(categoryTabs);

        // Create background grid
        const grid = this.createBackgroundGrid();
        content.appendChild(grid);

        // Create footer
        const footer = this.createFooter();
        content.appendChild(footer);

        this.modal.appendChild(content);
        document.body.appendChild(this.modal);
    }

    /**
     * Create modal header
     */
    createHeader() {
        const header = document.createElement('div');
        header.className = 'background-selector-header';
        header.style.cssText = `
            padding: 20px;
            border-bottom: 1px solid #444;
            display: flex;
            justify-content: space-between;
            align-items: center;
        `;

        const title = document.createElement('h2');
        title.textContent = 'Select Background';
        title.style.cssText = `
            color: #fff;
            margin: 0;
            font-size: 24px;
        `;

        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '×';
        closeBtn.style.cssText = `
            background: #ff4444;
            color: white;
            border: none;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            font-size: 18px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        closeBtn.onclick = () => this.close();

        header.appendChild(title);
        header.appendChild(closeBtn);
        return header;
    }

    /**
     * Create search bar
     */
    createSearchBar() {
        const searchContainer = document.createElement('div');
        searchContainer.style.cssText = `
            padding: 15px 20px;
            border-bottom: 1px solid #444;
        `;

        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Search backgrounds...';
        searchInput.className = 'background-search-input';
        searchInput.style.cssText = `
            width: 100%;
            padding: 10px;
            border: 1px solid #555;
            border-radius: 4px;
            background: #333;
            color: #fff;
            font-size: 14px;
        `;
        searchInput.addEventListener('input', (e) => {
            this.searchQuery = e.target.value;
            this.updateGrid();
        });

        this.searchInput = searchInput;
        searchContainer.appendChild(searchInput);
        return searchContainer;
    }

    /**
     * Create category tabs
     */
    createCategoryTabs() {
        const tabsContainer = document.createElement('div');
        tabsContainer.className = 'background-category-tabs';
        tabsContainer.style.cssText = `
            padding: 10px 20px;
            border-bottom: 1px solid #444;
            display: flex;
            gap: 10px;
            overflow-x: auto;
        `;

        const categories = this.backgroundManager.getCategories();
        categories.unshift({ id: 'all', name: 'All' });

        categories.forEach(category => {
            const tab = document.createElement('button');
            tab.textContent = category.name;
            tab.dataset.category = category.id;
            tab.style.cssText = `
                padding: 8px 16px;
                border: 1px solid #555;
                border-radius: 4px;
                background: #333;
                color: #fff;
                cursor: pointer;
                white-space: nowrap;
                transition: all 0.2s;
            `;
            tab.addEventListener('click', () => {
                this.setCategory(category.id);
            });

            if (category.id === 'all') {
                tab.style.background = '#007acc';
                tab.style.borderColor = '#007acc';
            }

            tabsContainer.appendChild(tab);
        });

        this.categoryTabs = tabsContainer;
        return tabsContainer;
    }

    /**
     * Create background grid
     */
    createBackgroundGrid() {
        const gridContainer = document.createElement('div');
        gridContainer.style.cssText = `
            flex: 1;
            padding: 20px;
            overflow-y: auto;
        `;

        const grid = document.createElement('div');
        grid.className = 'background-grid';
        grid.style.cssText = `
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 15px;
        `;

        this.grid = grid;
        gridContainer.appendChild(grid);
        return gridContainer;
    }

    /**
     * Create modal footer
     */
    createFooter() {
        const footer = document.createElement('div');
        footer.className = 'background-selector-footer';
        footer.style.cssText = `
            padding: 15px 20px;
            border-top: 1px solid #444;
            display: flex;
            justify-content: space-between;
            align-items: center;
        `;

        const randomBtn = document.createElement('button');
        randomBtn.textContent = 'Random';
        randomBtn.style.cssText = `
            padding: 8px 16px;
            background: #28a745;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        `;
        randomBtn.onclick = () => {
            this.backgroundManager.setRandomBackground();
            this.close();
        };

        const currentInfo = document.createElement('div');
        currentInfo.className = 'current-background-info';
        currentInfo.style.cssText = `
            color: #ccc;
            font-size: 14px;
        `;

        footer.appendChild(randomBtn);
        footer.appendChild(currentInfo);
        return footer;
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });

        // Close on backdrop click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });

        // Listen for background changes
        window.addEventListener('backgroundChanged', () => {
            this.updateCurrentInfo();
        });
    }

    /**
     * Set active category
     */
    setCategory(categoryId) {
        this.currentCategory = categoryId;
        
        // Update tab styles
        this.categoryTabs.querySelectorAll('button').forEach(tab => {
            if (tab.dataset.category === categoryId) {
                tab.style.background = '#007acc';
                tab.style.borderColor = '#007acc';
            } else {
                tab.style.background = '#333';
                tab.style.borderColor = '#555';
            }
        });

        this.updateGrid();
    }

    /**
     * Update the background grid
     */
    updateGrid() {
        if (!this.grid) return;

        this.grid.innerHTML = '';

        let backgrounds = this.backgroundManager.availableBackgrounds;

        // Filter by category
        if (this.currentCategory !== 'all') {
            backgrounds = backgrounds.filter(bg => bg.category === this.currentCategory);
        }

        // Filter by search query
        if (this.searchQuery) {
            backgrounds = backgrounds.filter(bg => 
                bg.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                bg.description.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        }

        // Create background items
        backgrounds.forEach(background => {
            const item = this.createBackgroundItem(background);
            this.grid.appendChild(item);
        });

        // Show message if no backgrounds found
        if (backgrounds.length === 0) {
            const noResults = document.createElement('div');
            noResults.textContent = 'No backgrounds found';
            noResults.style.cssText = `
                grid-column: 1 / -1;
                text-align: center;
                color: #888;
                padding: 40px;
            `;
            this.grid.appendChild(noResults);
        }
    }

    /**
     * Create a background item
     */
    createBackgroundItem(background) {
        const item = document.createElement('div');
        item.className = 'background-item';
        item.style.cssText = `
            background: #333;
            border: 2px solid #555;
            border-radius: 6px;
            overflow: hidden;
            cursor: pointer;
            transition: all 0.2s;
            position: relative;
        `;

        // Highlight current background
        const current = this.backgroundManager.getCurrentBackground();
        if (current && current.id === background.id) {
            item.style.borderColor = '#007acc';
            item.style.boxShadow = '0 0 10px rgba(0, 122, 204, 0.5)';
        }

        // Create thumbnail
        const thumbnail = document.createElement('div');
        thumbnail.className = 'background-thumbnail';
        thumbnail.style.cssText = `
            width: 100%;
            height: 100px;
            background-image: url(${background.thumbnail || background.url});
            background-size: cover;
            background-position: center;
            position: relative;
        `;

        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'background-overlay';
        overlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.2s;
        `;

        const selectBtn = document.createElement('button');
        selectBtn.textContent = 'Select';
        selectBtn.style.cssText = `
            background: #007acc;
            color: white;
            border: none;
            padding: 6px 12px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
        `;
        selectBtn.onclick = (e) => {
            e.stopPropagation();
            this.selectBackground(background);
        };

        overlay.appendChild(selectBtn);

        // Create info
        const info = document.createElement('div');
        info.className = 'background-info';
        info.style.cssText = `
            padding: 10px;
        `;

        const name = document.createElement('div');
        name.textContent = background.name;
        name.style.cssText = `
            color: #fff;
            font-weight: bold;
            font-size: 12px;
            margin-bottom: 4px;
        `;

        const description = document.createElement('div');
        description.textContent = background.description;
        description.style.cssText = `
            color: #ccc;
            font-size: 10px;
            line-height: 1.3;
        `;

        info.appendChild(name);
        info.appendChild(description);

        // Hover effects
        item.addEventListener('mouseenter', () => {
            item.style.borderColor = '#007acc';
            overlay.style.opacity = '1';
        });

        item.addEventListener('mouseleave', () => {
            if (!(current && current.id === background.id)) {
                item.style.borderColor = '#555';
            }
            overlay.style.opacity = '0';
        });

        // Click to select
        item.addEventListener('click', () => {
            this.selectBackground(background);
        });

        item.appendChild(thumbnail);
        thumbnail.appendChild(overlay);
        item.appendChild(info);

        return item;
    }

    /**
     * Select a background
     */
    async selectBackground(background) {
        try {
            const success = await this.backgroundManager.changeBackground(background.id);
            if (success) {
                this.close();
                this.showNotification(`Background changed to: ${background.name}`, 'success');
            } else {
                this.showNotification('Failed to change background', 'error');
            }
        } catch (error) {
            console.error('Failed to select background:', error);
            this.showNotification('Failed to change background', 'error');
        }
    }

    /**
     * Update current background info
     */
    updateCurrentInfo() {
        const currentInfo = this.modal.querySelector('.current-background-info');
        if (currentInfo) {
            const current = this.backgroundManager.getCurrentBackground();
            if (current) {
                currentInfo.textContent = `Current: ${current.name}`;
            } else {
                currentInfo.textContent = 'No background selected';
            }
        }
    }

    /**
     * Show notification
     */
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 4px;
            color: white;
            font-weight: bold;
            z-index: 10001;
            animation: slideIn 0.3s ease-out;
        `;

        // Set color based on type
        switch (type) {
            case 'success':
                notification.style.background = '#28a745';
                break;
            case 'error':
                notification.style.background = '#dc3545';
                break;
            default:
                notification.style.background = '#007acc';
        }

        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    }

    /**
     * Open the background selector
     */
    open() {
        this.isOpen = true;
        this.modal.style.display = 'flex';
        this.updateGrid();
        this.updateCurrentInfo();
        this.searchInput.focus();
    }

    /**
     * Close the background selector
     */
    close() {
        this.isOpen = false;
        this.modal.style.display = 'none';
    }

    /**
     * Toggle the background selector
     */
    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    /**
     * Destroy the selector
     */
    destroy() {
        if (this.modal && this.modal.parentNode) {
            this.modal.parentNode.removeChild(this.modal);
        }
        this.modal = null;
        this.grid = null;
        this.searchInput = null;
        this.categoryTabs = null;
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BackgroundSelector;
} else if (typeof window !== 'undefined') {
    window.BackgroundSelector = BackgroundSelector;
    console.log('✅ [SELECTOR] BackgroundSelector class loaded');
}
