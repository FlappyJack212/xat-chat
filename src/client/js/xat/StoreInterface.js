/**
 * StoreInterface - Complete xat.com store implementation
 * Handles powers store, pawn store, and all purchasing functionality
 */

class StoreInterface {
    constructor(xatInterface) {
        this.xat = xatInterface;
        this.currentCategory = 'powers';
        this.currentFilter = 'all';
        this.cart = new Map();
        this.moduleName = 'StoreInterface';
        this.init();
    }

    init() {
        this.createStoreModal();
        this.setupStoreData();
        logger.debug(this.moduleName, 'Store interface initialized');
    }

    /**
     * Setup store data with all xat.com items
     */
    setupStoreData() {
        this.storeData = {
            powers: [
                // Text Effect Powers
                { id: 'rainbow', name: 'Rainbow', price: 100, description: 'Rainbow colored text', category: 'effects', icon: 'rainbow' },
                { id: 'glow', name: 'Glow', price: 75, description: 'Glowing text effect', category: 'effects', icon: 'glow' },
                { id: 'sparkle', name: 'Sparkle', price: 50, description: 'Sparkle effect around text', category: 'effects', icon: 'sparkle' },
                { id: 'bounce', name: 'Bounce', price: 25, description: 'Bouncing text animation', category: 'effects', icon: 'bounce' },
                { id: 'shake', name: 'Shake', price: 25, description: 'Shaking text effect', category: 'effects', icon: 'shake' },
                { id: 'spin', name: 'Spin', price: 50, description: 'Spinning text animation', category: 'effects', icon: 'spin' },
                { id: 'neon', name: 'Neon', price: 150, description: 'Neon light effect', category: 'effects', icon: 'neon' },
                { id: 'fire', name: 'Fire', price: 200, description: 'Fire text effect', category: 'effects', icon: 'fire' },
                { id: 'ice', name: 'Ice', price: 200, description: 'Ice crystal effect', category: 'effects', icon: 'ice' },
                
                // Special Powers
                { id: 'blast', name: 'Blast', price: 500, description: 'Screen shake for everyone', category: 'special', icon: 'blast' },
                { id: 'kiss', name: 'Kiss', price: 10, description: 'Send kisses to users', category: 'social', icon: 'kiss' },
                { id: 'hug', name: 'Hug', price: 10, description: 'Send hugs to users', category: 'social', icon: 'hug' },
                
                // Game Powers
                { id: 'gamespace', name: 'GameSpace', price: 1000, description: 'Access to games', category: 'games', icon: 'game' },
                { id: 'poker', name: 'Poker', price: 300, description: 'Play poker games', category: 'games', icon: 'poker' },
                { id: 'slots', name: 'Slots', price: 250, description: 'Slot machine games', category: 'games', icon: 'slots' },
                
                // Group Powers
                { id: 'groupies', name: 'Groupies', price: 800, description: 'Manage group settings', category: 'group', icon: 'group' },
                { id: 'protect', name: 'Protect', price: 600, description: 'Advanced protection', category: 'group', icon: 'protect' },
                { id: 'rank', name: 'Rank', price: 400, description: 'User ranking system', category: 'group', icon: 'rank' }
            ],
            
            pawns: [
                // Basic Pawns
                { id: 'white', name: 'White Pawn', price: 0, description: 'Classic white pawn', category: 'basic', rarity: 'common' },
                { id: 'red', name: 'Red Pawn', price: 10, description: 'Red colored pawn', category: 'basic', rarity: 'common' },
                { id: 'blue', name: 'Blue Pawn', price: 10, description: 'Blue colored pawn', category: 'basic', rarity: 'common' },
                { id: 'green', name: 'Green Pawn', price: 10, description: 'Green colored pawn', category: 'basic', rarity: 'common' },
                { id: 'yellow', name: 'Yellow Pawn', price: 10, description: 'Yellow colored pawn', category: 'basic', rarity: 'common' },
                { id: 'purple', name: 'Purple Pawn', price: 15, description: 'Purple colored pawn', category: 'basic', rarity: 'common' },
                { id: 'orange', name: 'Orange Pawn', price: 15, description: 'Orange colored pawn', category: 'basic', rarity: 'common' },
                { id: 'pink', name: 'Pink Pawn', price: 20, description: 'Pink colored pawn', category: 'basic', rarity: 'common' },
                { id: 'brown', name: 'Brown Pawn', price: 25, description: 'Brown colored pawn', category: 'basic', rarity: 'uncommon' },
                { id: 'black', name: 'Black Pawn', price: 50, description: 'Black colored pawn', category: 'basic', rarity: 'uncommon' },
                
                // Special Pawns
                { id: 'gold', name: 'Gold Pawn', price: 1000, description: 'Golden pawn with glow', category: 'special', rarity: 'rare' },
                { id: 'emerald', name: 'Emerald Pawn', price: 2000, description: 'Emerald with green glow', category: 'special', rarity: 'epic' },
                { id: 'ruby', name: 'Ruby Pawn', price: 2000, description: 'Ruby with red glow', category: 'special', rarity: 'epic' },
                { id: 'sapphire', name: 'Sapphire Pawn', price: 2000, description: 'Sapphire with blue glow', category: 'special', rarity: 'epic' },
                { id: 'diamond', name: 'Diamond Pawn', price: 5000, description: 'Diamond with shine effect', category: 'special', rarity: 'legendary' },
                { id: 'rainbow', name: 'Rainbow Pawn', price: 3000, description: 'Color-changing pawn', category: 'special', rarity: 'epic' },
                { id: 'everypower', name: 'Everypower', price: 10000, description: 'Ultimate pawn', category: 'special', rarity: 'mythic' }
            ],
            
            packages: [
                { id: 'starter', name: 'Starter Pack', price: 500, description: '5 basic powers + 3 pawns', items: ['glow', 'bounce', 'sparkle', 'kiss', 'hug', 'red', 'blue', 'green'] },
                { id: 'premium', name: 'Premium Pack', price: 2000, description: '10 powers + gold pawn', items: ['rainbow', 'glow', 'sparkle', 'bounce', 'shake', 'spin', 'kiss', 'hug', 'blast', 'neon', 'gold'] },
                { id: 'ultimate', name: 'Ultimate Pack', price: 15000, description: 'All powers + everypower pawn', items: ['*'] }
            ]
        };
    }

    /**
     * Create main store modal
     */
    createStoreModal() {
        const modal = document.createElement('div');
        modal.id = 'main-store-modal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content xat-modal" style="width: 800px; height: 600px;">
                <div class="modal-header xat-modal-header">
                    <h3>🛍️ ixchats Store</h3>
                    <div class="user-currency">
                        <span id="userXatsDisplay">${this.xat.currentUser?.xats || 0}</span> xats
                    </div>
                    <span class="close">&times;</span>
                </div>
                <div class="modal-body xat-modal-body" style="padding: 0; overflow: hidden;">
                    <div class="store-interface">
                        <!-- Store Navigation -->
                        <div class="store-nav">
                            <div class="nav-item active" data-category="powers">Powers</div>
                            <div class="nav-item" data-category="pawns">Pawns</div>
                            <div class="nav-item" data-category="packages">Packages</div>
                        </div>
                        
                        <!-- Store Content -->
                        <div class="store-content">
                            <div class="store-sidebar">
                                <div class="filter-section">
                                    <h4>Filter by:</h4>
                                    <div class="filter-group" id="categoryFilters">
                                        <!-- Category filters will be loaded here -->
                                    </div>
                                    <div class="filter-group">
                                        <h5>Price Range:</h5>
                                        <select id="priceFilter" class="xat-input">
                                            <option value="all">All prices</option>
                                            <option value="0-50">0 - 50 xats</option>
                                            <option value="51-200">51 - 200 xats</option>
                                            <option value="201-1000">201 - 1,000 xats</option>
                                            <option value="1001+">1,000+ xats</option>
                                        </select>
                                    </div>
                                    <div class="filter-group">
                                        <h5>Sort by:</h5>
                                        <select id="sortFilter" class="xat-input">
                                            <option value="name">Name A-Z</option>
                                            <option value="price-low">Price: Low to High</option>
                                            <option value="price-high">Price: High to Low</option>
                                            <option value="newest">Newest First</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div class="cart-section">
                                    <h4>Shopping Cart</h4>
                                    <div id="cartItems" class="cart-items">
                                        <p class="empty-cart">Cart is empty</p>
                                    </div>
                                    <div class="cart-total">
                                        Total: <span id="cartTotal">0</span> xats
                                    </div>
                                    <button class="xat-button primary" id="checkoutBtn" onclick="checkout()" disabled>
                                        Checkout
                                    </button>
                                </div>
                            </div>
                            
                            <div class="store-main">
                                <div class="store-grid" id="storeGrid">
                                    <!-- Store items will be loaded here -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        this.setupStoreEvents(modal);
    }

    /**
     * Setup store event listeners
     */
    setupStoreEvents(modal) {
        // Close button
        const closeBtn = modal.querySelector('.close');
        closeBtn.addEventListener('click', () => this.closeStore());

        // Navigation tabs
        const navItems = modal.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navItems.forEach(n => n.classList.remove('active'));
                item.classList.add('active');
                this.currentCategory = item.dataset.category;
                this.loadStoreCategory();
            });
        });

        // Filters
        document.getElementById('priceFilter').addEventListener('change', () => this.applyFilters());
        document.getElementById('sortFilter').addEventListener('change', () => this.applyFilters());

        // Setup global functions
        window.addToCart = (itemId) => this.addToCart(itemId);
        window.removeFromCart = (itemId) => this.removeFromCart(itemId);
        window.checkout = () => this.checkout();
        window.buyNow = (itemId) => this.buyNow(itemId);
    }

    /**
     * Open the store
     */
    openStore() {
        const modal = document.getElementById('main-store-modal');
        modal.style.display = 'block';
        this.currentCategory = 'powers';
        this.loadStoreCategory();
        this.updateUserCurrency();
    }

    /**
     * Close the store
     */
    closeStore() {
        const modal = document.getElementById('main-store-modal');
        modal.style.display = 'none';
    }

    /**
     * Load store category
     */
    loadStoreCategory() {
        this.loadCategoryFilters();
        this.loadStoreItems();
    }

    /**
     * Load category-specific filters
     */
    loadCategoryFilters() {
        const filtersContainer = document.getElementById('categoryFilters');
        let filters = [];

        switch (this.currentCategory) {
            case 'powers':
                filters = [
                    { value: 'all', label: 'All Powers' },
                    { value: 'effects', label: 'Text Effects' },
                    { value: 'special', label: 'Special Powers' },
                    { value: 'social', label: 'Social Powers' },
                    { value: 'games', label: 'Game Powers' },
                    { value: 'group', label: 'Group Powers' }
                ];
                break;
            case 'pawns':
                filters = [
                    { value: 'all', label: 'All Pawns' },
                    { value: 'basic', label: 'Basic Pawns' },
                    { value: 'special', label: 'Special Pawns' }
                ];
                break;
            case 'packages':
                filters = [
                    { value: 'all', label: 'All Packages' }
                ];
                break;
        }

        filtersContainer.innerHTML = filters.map(filter => `
            <label>
                <input type="radio" name="categoryFilter" value="${filter.value}" ${filter.value === 'all' ? 'checked' : ''} />
                ${filter.label}
            </label>
        `).join('');

        // Add event listeners
        filtersContainer.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.addEventListener('change', () => {
                if (radio.checked) {
                    this.currentFilter = radio.value;
                    this.applyFilters();
                }
            });
        });
    }

    /**
     * Load and display store items
     */
    loadStoreItems() {
        const grid = document.getElementById('storeGrid');
        const items = this.storeData[this.currentCategory] || [];

        grid.innerHTML = items.map(item => this.createStoreItemHTML(item)).join('');
    }

    /**
     * Create HTML for store item
     */
    createStoreItemHTML(item) {
        const isOwned = this.isItemOwned(item);
        const inCart = this.cart.has(item.id);

        return `
            <div class="store-item ${isOwned ? 'owned' : ''}" data-item-id="${item.id}">
                <div class="item-preview">
                    ${this.getItemPreview(item)}
                </div>
                <div class="item-info">
                    <h4 class="item-name">${item.name}</h4>
                    <p class="item-description">${item.description}</p>
                    <div class="item-price">${item.price} xats</div>
                    ${item.rarity ? `<div class="item-rarity ${item.rarity}">${item.rarity}</div>` : ''}
                </div>
                <div class="item-actions">
                    ${isOwned ? `
                        <button class="xat-button" disabled>Owned</button>
                    ` : `
                        <button class="xat-button" onclick="addToCart('${item.id}')" ${inCart ? 'disabled' : ''}>
                            ${inCart ? 'In Cart' : 'Add to Cart'}
                        </button>
                        <button class="xat-button primary" onclick="buyNow('${item.id}')">
                            Buy Now
                        </button>
                    `}
                </div>
            </div>
        `;
    }

    /**
     * Get item preview HTML
     */
    getItemPreview(item) {
        switch (this.currentCategory) {
            case 'powers':
                return `<div class="power-icon ${item.icon || item.id}"></div>`;
            case 'pawns':
                return `<div class="xat-pawn ${item.id}"></div>`;
            case 'packages':
                return `<div class="package-icon">📦</div>`;
            default:
                return `<div class="item-icon">?</div>`;
        }
    }

    /**
     * Check if item is owned
     */
    isItemOwned(item) {
        const user = this.xat.currentUser;
        if (!user) return false;

        switch (this.currentCategory) {
            case 'powers':
                return user.powers && user.powers.includes(item.id);
            case 'pawns':
                return user.pawns && user.pawns.includes(item.id);
            default:
                return false;
        }
    }

    /**
     * Apply filters and sorting
     */
    applyFilters() {
        const priceFilter = document.getElementById('priceFilter').value;
        const sortFilter = document.getElementById('sortFilter').value;
        
        let items = [...(this.storeData[this.currentCategory] || [])];

        // Apply category filter
        if (this.currentFilter !== 'all') {
            items = items.filter(item => item.category === this.currentFilter);
        }

        // Apply price filter
        if (priceFilter !== 'all') {
            const [min, max] = this.parsePriceFilter(priceFilter);
            items = items.filter(item => {
                return item.price >= min && (max === Infinity || item.price <= max);
            });
        }

        // Apply sorting
        items.sort((a, b) => {
            switch (sortFilter) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'price-low':
                    return a.price - b.price;
                case 'price-high':
                    return b.price - a.price;
                case 'newest':
                    return 0; // No timestamp data
                default:
                    return 0;
            }
        });

        // Update display
        const grid = document.getElementById('storeGrid');
        grid.innerHTML = items.map(item => this.createStoreItemHTML(item)).join('');
    }

    /**
     * Parse price filter string
     */
    parsePriceFilter(filter) {
        switch (filter) {
            case '0-50': return [0, 50];
            case '51-200': return [51, 200];
            case '201-1000': return [201, 1000];
            case '1001+': return [1001, Infinity];
            default: return [0, Infinity];
        }
    }

    /**
     * Add item to cart
     */
    addToCart(itemId) {
        const item = this.findItem(itemId);
        if (!item || this.isItemOwned(item)) return;

        this.cart.set(itemId, item);
        this.updateCartDisplay();
        this.updateStoreDisplay();
    }

    /**
     * Remove item from cart
     */
    removeFromCart(itemId) {
        this.cart.delete(itemId);
        this.updateCartDisplay();
        this.updateStoreDisplay();
    }

    /**
     * Update cart display
     */
    updateCartDisplay() {
        const cartItems = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');
        const checkoutBtn = document.getElementById('checkoutBtn');

        if (this.cart.size === 0) {
            cartItems.innerHTML = '<p class="empty-cart">Cart is empty</p>';
            cartTotal.textContent = '0';
            checkoutBtn.disabled = true;
            return;
        }

        let total = 0;
        const itemsHTML = Array.from(this.cart.values()).map(item => {
            total += item.price;
            return `
                <div class="cart-item">
                    <span class="cart-item-name">${item.name}</span>
                    <span class="cart-item-price">${item.price}</span>
                    <button class="cart-remove" onclick="removeFromCart('${item.id}')">&times;</button>
                </div>
            `;
        }).join('');

        cartItems.innerHTML = itemsHTML;
        cartTotal.textContent = total.toString();
        checkoutBtn.disabled = false;
    }

    /**
     * Update store display after cart changes
     */
    updateStoreDisplay() {
        const items = document.querySelectorAll('.store-item');
        items.forEach(itemElement => {
            const itemId = itemElement.dataset.itemId;
            const inCart = this.cart.has(itemId);
            const addBtn = itemElement.querySelector('button:not(.primary)');
            
            if (addBtn && !addBtn.disabled) {
                addBtn.textContent = inCart ? 'In Cart' : 'Add to Cart';
                addBtn.disabled = inCart;
            }
        });
    }

    /**
     * Buy single item immediately
     */
    async buyNow(itemId) {
        const item = this.findItem(itemId);
        if (!item) return;

        const success = await this.purchaseItems([item]);
        if (success) {
            this.updateStoreDisplay();
            this.updateUserCurrency();
        }
    }

    /**
     * Checkout cart
     */
    async checkout() {
        if (this.cart.size === 0) return;

        const items = Array.from(this.cart.values());
        const success = await this.purchaseItems(items);
        
        if (success) {
            this.cart.clear();
            this.updateCartDisplay();
            this.updateStoreDisplay();
            this.updateUserCurrency();
        }
    }

    /**
     * Purchase items (send to backend)
     */
    async purchaseItems(items) {
        try {
            const response = await fetch('/api/store/purchase', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                },
                body: JSON.stringify({ 
                    items: items.map(item => ({ id: item.id, price: item.price }))
                })
            });

            if (response.ok) {
                const result = await response.json();
                
                // Update user data
                if (this.xat.currentUser) {
                    this.xat.currentUser.xats = result.newXats;
                    if (result.newPowers) {
                        this.xat.currentUser.powers = result.newPowers;
                    }
                    if (result.newPawns) {
                        this.xat.currentUser.pawns = result.newPawns;
                    }
                }

                // Show success message
                this.xat.chatSystem?.addSystemMessage(`Successfully purchased ${items.length} item(s)!`);
                
                return true;
            } else {
                const error = await response.json();
                this.xat.chatSystem?.addSystemMessage(`Purchase failed: ${error.message}`);
                return false;
            }
        } catch (error) {
            logger.error(this.moduleName, 'Purchase error:', error);
            this.xat.chatSystem?.addSystemMessage('Purchase failed. Please try again.');
            return false;
        }
    }

    /**
     * Find item by ID
     */
    findItem(itemId) {
        for (const category of Object.values(this.storeData)) {
            const item = category.find(item => item.id === itemId);
            if (item) return item;
        }
        return null;
    }

    /**
     * Update user currency display
     */
    updateUserCurrency() {
        const display = document.getElementById('userXatsDisplay');
        if (display && this.xat.currentUser) {
            display.textContent = this.xat.currentUser.xats || 0;
        }
    }
}

// Make available globally
if (typeof window !== 'undefined') {
    window.StoreInterface = StoreInterface;
}