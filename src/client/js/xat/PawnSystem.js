/**
 * PawnSystem - Manages xat.com style pawns
 * Handles pawn display, colors, animations, and user pawn management
 */

class PawnSystem {
    constructor(xatInterface) {
        this.xat = xatInterface;
        this.ownedPawns = new Set(['white']); // Everyone starts with white pawn
        this.currentPawn = 'white';
        this.pawnGrid = null;
        
        this.moduleName = 'PawnSystem';
        this.init();
    }

    init() {
        this.setupPawnDefinitions();
        this.setupPawnGrid();
        logger.debug(this.moduleName, 'Pawn system initialized');
    }

    /**
     * Define all available pawns with their properties
     */
    setupPawnDefinitions() {
        this.pawnDefinitions = {
            // Basic pawns (free/cheap)
            white: {
                name: 'White',
                color: '#ffffff',
                cost: 0,
                description: 'Classic white pawn',
                rarity: 'common'
            },
            red: {
                name: 'Red',
                color: '#ff0000',
                cost: 10,
                description: 'Red pawn',
                rarity: 'common'
            },
            blue: {
                name: 'Blue',
                color: '#0080ff',
                cost: 10,
                description: 'Blue pawn',
                rarity: 'common'
            },
            green: {
                name: 'Green',
                color: '#00ff00',
                cost: 10,
                description: 'Green pawn',
                rarity: 'common'
            },
            yellow: {
                name: 'Yellow',
                color: '#ffff00',
                cost: 10,
                description: 'Yellow pawn',
                rarity: 'common'
            },
            purple: {
                name: 'Purple',
                color: '#8000ff',
                cost: 15,
                description: 'Purple pawn',
                rarity: 'common'
            },
            orange: {
                name: 'Orange',
                color: '#ff8000',
                cost: 15,
                description: 'Orange pawn',
                rarity: 'common'
            },
            pink: {
                name: 'Pink',
                color: '#ff00ff',
                cost: 20,
                description: 'Pink pawn',
                rarity: 'common'
            },
            brown: {
                name: 'Brown',
                color: '#8b4513',
                cost: 25,
                description: 'Brown pawn',
                rarity: 'uncommon'
            },
            black: {
                name: 'Black',
                color: '#000000',
                cost: 50,
                description: 'Black pawn',
                rarity: 'uncommon'
            },

            // Special pawns (expensive/animated)
            gold: {
                name: 'Gold',
                color: '#ffd700',
                cost: 1000,
                description: 'Golden pawn with glow effect',
                rarity: 'rare',
                animated: true,
                effect: 'glow'
            },
            emerald: {
                name: 'Emerald',
                color: '#00ff80',
                cost: 2000,
                description: 'Emerald pawn with green glow',
                rarity: 'epic',
                animated: true,
                effect: 'emerald_glow'
            },
            ruby: {
                name: 'Ruby',
                color: '#ff0040',
                cost: 2000,
                description: 'Ruby pawn with red glow',
                rarity: 'epic',
                animated: true,
                effect: 'ruby_glow'
            },
            sapphire: {
                name: 'Sapphire',
                color: '#0066ff',
                cost: 2000,
                description: 'Sapphire pawn with blue glow',
                rarity: 'epic',
                animated: true,
                effect: 'sapphire_glow'
            },
            diamond: {
                name: 'Diamond',
                color: '#ffffff',
                cost: 5000,
                description: 'Diamond pawn with shine effect',
                rarity: 'legendary',
                animated: true,
                effect: 'diamond_shine'
            },
            rainbow: {
                name: 'Rainbow',
                color: 'rainbow',
                cost: 3000,
                description: 'Rainbow colored pawn',
                rarity: 'epic',
                animated: true,
                effect: 'rainbow_cycle'
            },
            everypower: {
                name: 'Everypower',
                color: 'rainbow',
                cost: 10000,
                description: 'Ultimate pawn with all effects',
                rarity: 'mythic',
                animated: true,
                effect: 'everypower_combo'
            }
        };
    }

    /**
     * Setup pawn grid in the UI
     */
    setupPawnGrid() {
        this.pawnGrid = document.getElementById('pawnGrid');
        if (!this.pawnGrid) {
            logger.warn(this.moduleName, 'Pawn grid element not found');
            return;
        }

        this.renderPawnGrid();
    }

    /**
     * Render the pawn grid with owned pawns
     */
    renderPawnGrid() {
        if (!this.pawnGrid) return;

        // Clear existing pawns
        this.pawnGrid.innerHTML = '';

        // Add owned pawns
        for (const pawnName of this.ownedPawns) {
            const pawnDefinition = this.pawnDefinitions[pawnName];
            if (pawnDefinition) {
                const pawnElement = this.createPawnElement(pawnName, pawnDefinition);
                this.pawnGrid.appendChild(pawnElement);
            }
        }

        // Add empty slot for purchasing more pawns
        const emptySlot = document.createElement('div');
        emptySlot.className = 'pawn-slot empty';
        emptySlot.textContent = '+';
        emptySlot.title = 'Buy more pawns';
        emptySlot.addEventListener('click', () => {
            this.showPawnStore();
        });
        this.pawnGrid.appendChild(emptySlot);
    }

    /**
     * Create a pawn element for the grid
     */
    createPawnElement(pawnName, definition) {
        const pawnElement = document.createElement('div');
        pawnElement.className = `pawn-slot pawn pawn-${pawnName}`;
        pawnElement.dataset.pawn = pawnName;
        pawnElement.title = `${definition.name} - ${definition.description}`;

        // Set visual properties
        if (definition.color !== 'rainbow') {
            pawnElement.style.backgroundColor = definition.color;
        }

        // Add click handler
        pawnElement.addEventListener('click', () => {
            this.selectPawn(pawnName);
        });

        // Mark as selected if current pawn
        if (pawnName === this.currentPawn) {
            pawnElement.classList.add('selected');
        }

        return pawnElement;
    }

    /**
     * Set user's owned pawns
     */
    setOwnedPawns(pawns) {
        this.ownedPawns.clear();
        this.ownedPawns.add('white'); // Always have white pawn
        
        pawns.forEach(pawn => {
            this.ownedPawns.add(pawn.name);
        });

        this.renderPawnGrid();
        logger.debug(this.moduleName, 'Owned pawns updated:', Array.from(this.ownedPawns));
    }

    /**
     * Select a pawn as current
     */
    selectPawn(pawnName) {
        if (!this.ownedPawns.has(pawnName)) {
            this.showPawnNotOwnedMessage(pawnName);
            return;
        }

        // Update current pawn
        const oldPawn = this.currentPawn;
        this.currentPawn = pawnName;

        // Update visual selection
        this.updatePawnSelection();

        // Update user pawn in the interface
        this.updateUserPawn(pawnName);

        // Save to backend
        this.saveCurrentPawn(pawnName);

        logger.debug(this.moduleName, `Pawn changed from ${oldPawn} to ${pawnName}`);
    }

    /**
     * Update visual selection in pawn grid
     */
    updatePawnSelection() {
        const pawnSlots = this.pawnGrid?.querySelectorAll('.pawn-slot');
        if (!pawnSlots) return;

        pawnSlots.forEach(slot => {
            const pawnName = slot.dataset.pawn;
            if (pawnName) {
                slot.classList.toggle('selected', pawnName === this.currentPawn);
            }
        });
    }

    /**
     * Update user's pawn in the interface
     */
    updateUserPawn(pawnName) {
        if (this.xat.currentUser) {
            this.xat.currentUser.pawn = pawnName;
        }

        // Update user's pawn in user list
        this.updateUserPawnInList();

        // Notify other systems
        this.xat.animationEngine?.updatePawnAnimations();
    }

    /**
     * Update user's pawn display in user list
     */
    updateUserPawnInList() {
        if (!this.xat.currentUser) return;

        const userElement = document.querySelector(`[data-user-id="${this.xat.currentUser.id}"]`);
        if (userElement) {
            const pawnElement = userElement.querySelector('.user-pawn');
            if (pawnElement) {
                pawnElement.className = `user-pawn pawn-${this.currentPawn}`;
            }
        }
    }

    /**
     * Create pawn element for user list
     */
    createUserPawnElement(pawnName) {
        const pawnElement = document.createElement('div');
        pawnElement.className = `user-pawn pawn pawn-${pawnName}`;
        
        const definition = this.pawnDefinitions[pawnName];
        if (definition) {
            if (definition.color !== 'rainbow') {
                pawnElement.style.backgroundColor = definition.color;
            }
            
            if (definition.animated) {
                pawnElement.classList.add('animated');
            }
        }

        return pawnElement;
    }

    /**
     * Show pawn store modal
     */
    showPawnStore() {
        // Create modal if it doesn't exist
        let modal = document.getElementById('pawn-store-modal');
        if (!modal) {
            modal = this.createPawnStoreModal();
            document.body.appendChild(modal);
        }

        // Show the modal
        modal.style.display = 'block';
        this.renderPawnStore(modal);
    }

    /**
     * Create pawn store modal
     */
    createPawnStoreModal() {
        const modal = document.createElement('div');
        modal.id = 'pawn-store-modal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Pawn Store</h3>
                    <span class="close">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="store-categories">
                        <div class="category active" data-category="common">Common</div>
                        <div class="category" data-category="uncommon">Uncommon</div>
                        <div class="category" data-category="rare">Rare</div>
                        <div class="category" data-category="epic">Epic</div>
                        <div class="category" data-category="legendary">Legendary</div>
                        <div class="category" data-category="mythic">Mythic</div>
                    </div>
                    <div class="pawns-grid" id="storeGrid"></div>
                </div>
            </div>
        `;

        // Add event listeners
        modal.querySelector('.close').addEventListener('click', () => {
            modal.style.display = 'none';
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });

        return modal;
    }

    /**
     * Render pawn store content
     */
    renderPawnStore(modal) {
        const grid = modal.querySelector('#storeGrid');
        const categories = modal.querySelectorAll('.category');
        
        // Setup category switching
        categories.forEach(category => {
            category.addEventListener('click', () => {
                categories.forEach(c => c.classList.remove('active'));
                category.classList.add('active');
                this.renderPawnCategory(grid, category.dataset.category);
            });
        });

        // Render initial category
        this.renderPawnCategory(grid, 'common');
    }

    /**
     * Render pawns for a specific category
     */
    renderPawnCategory(grid, category) {
        grid.innerHTML = '';

        const pawnsInCategory = Object.entries(this.pawnDefinitions)
            .filter(([name, def]) => def.rarity === category);

        pawnsInCategory.forEach(([name, definition]) => {
            const pawnItem = this.createStorePawnElement(name, definition);
            grid.appendChild(pawnItem);
        });
    }

    /**
     * Create store pawn element
     */
    createStorePawnElement(pawnName, definition) {
        const owned = this.ownedPawns.has(pawnName);
        
        const item = document.createElement('div');
        item.className = `store-pawn-item ${owned ? 'owned' : ''}`;
        item.innerHTML = `
            <div class="pawn-preview pawn pawn-${pawnName}"></div>
            <div class="pawn-info">
                <div class="pawn-name">${definition.name}</div>
                <div class="pawn-description">${definition.description}</div>
                <div class="pawn-cost">${definition.cost} xats</div>
            </div>
            <button class="buy-btn" ${owned ? 'disabled' : ''}>
                ${owned ? 'Owned' : 'Buy'}
            </button>
        `;

        // Set pawn color
        const preview = item.querySelector('.pawn-preview');
        if (definition.color !== 'rainbow') {
            preview.style.backgroundColor = definition.color;
        }

        // Add buy handler
        if (!owned) {
            const buyBtn = item.querySelector('.buy-btn');
            buyBtn.addEventListener('click', () => {
                this.buyPawn(pawnName, definition);
            });
        }

        return item;
    }

    /**
     * Buy a pawn
     */
    async buyPawn(pawnName, definition) {
        try {
            const response = await fetch('/api/store/buy-pawn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                },
                body: JSON.stringify({ 
                    pawn: pawnName,
                    cost: definition.cost
                })
            });

            if (response.ok) {
                const result = await response.json();
                
                // Add to owned pawns
                this.ownedPawns.add(pawnName);
                
                // Update displays
                this.renderPawnGrid();
                
                // Update user's xats
                if (this.xat.currentUser) {
                    this.xat.currentUser.xats = result.newXats;
                    this.xat.updateUserDisplay();
                }

                this.xat.chatSystem?.addSystemMessage(`You bought the ${definition.name} pawn!`);
                logger.info(this.moduleName, `Pawn purchased: ${pawnName}`);
            } else {
                const error = await response.json();
                this.xat.chatSystem?.addSystemMessage(`Failed to buy pawn: ${error.message}`);
            }
        } catch (error) {
            logger.error(this.moduleName, 'Error buying pawn:', error);
            this.xat.chatSystem?.addSystemMessage('Error buying pawn. Please try again.');
        }
    }

    /**
     * Save current pawn to backend
     */
    async saveCurrentPawn(pawnName) {
        try {
            const response = await fetch('/api/user/pawn', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                },
                body: JSON.stringify({ pawn: pawnName })
            });

            if (!response.ok) {
                throw new Error('Failed to save pawn');
            }
        } catch (error) {
            logger.error(this.moduleName, 'Failed to save current pawn:', error);
        }
    }

    /**
     * Show pawn not owned message
     */
    showPawnNotOwnedMessage(pawnName) {
        const definition = this.pawnDefinitions[pawnName];
        this.xat.chatSystem?.addSystemMessage(`You don't own the ${definition.name} pawn. Visit the store to purchase it!`);
    }
}

// Make available globally
if (typeof window !== 'undefined') {
    window.PawnSystem = PawnSystem;
}