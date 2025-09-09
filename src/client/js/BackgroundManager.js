/**
 * Dynamic Background Management System
 * Handles background loading, switching, and effects for the xat chat interface
 */

class BackgroundManager {
    constructor() {
        this.availableBackgrounds = [];
        this.currentBackground = null;
        this.backgroundHistory = [];
        this.maxHistorySize = 10;
        this.preloadedImages = new Map();
        this.backgroundEffects = new Map();
        this.isInitialized = false;
        
        // Background categories
        this.categories = {
            'default': 'Default Backgrounds',
            'nature': 'Nature & Landscapes',
            'abstract': 'Abstract & Patterns',
            'space': 'Space & Sci-Fi',
            'anime': 'Anime & Manga',
            'gaming': 'Gaming & Tech',
            'seasonal': 'Seasonal & Holiday',
            'custom': 'Custom Backgrounds'
        };
        
        this.init();
    }

    /**
     * Initialize the background manager
     */
    async init() {
        try {
            await this.loadAvailableBackgrounds();
            await this.preloadCommonBackgrounds();
            this.setupEventListeners();
            this.isInitialized = true;
            console.log('🎨 [BACKGROUND] Manager initialized with', this.availableBackgrounds.length, 'backgrounds');
        } catch (error) {
            console.error('🎨 [BACKGROUND] Failed to initialize:', error);
        }
    }

    /**
     * Load available backgrounds from server
     */
    async loadAvailableBackgrounds() {
        try {
            // Load from local images directory
            const response = await fetch('/api/backgrounds');
            if (response.ok) {
                const data = await response.json();
                this.availableBackgrounds = data.backgrounds || [];
            } else {
                // Fallback to hardcoded backgrounds
                this.availableBackgrounds = this.getDefaultBackgrounds();
            }
        } catch (error) {
            console.warn('🎨 [BACKGROUND] Failed to load from server, using defaults:', error);
            this.availableBackgrounds = this.getDefaultBackgrounds();
        }
    }

    /**
     * Get default background list
     */
    getDefaultBackgrounds() {
        return [
            {
                id: 'default',
                name: 'Default',
                category: 'default',
                url: '/src/client/images/1.jpg',
                thumbnail: '/src/client/images/1.jpg',
                description: 'Classic xat background'
            },
            {
                id: 'nature1',
                name: 'Forest Path',
                category: 'nature',
                url: '/src/client/images/2.jpg',
                thumbnail: '/src/client/images/2.jpg',
                description: 'Peaceful forest trail'
            },
            {
                id: 'nature2',
                name: 'Mountain View',
                category: 'nature',
                url: '/src/client/images/3.jpg',
                thumbnail: '/src/client/images/3.jpg',
                description: 'Majestic mountain landscape'
            },
            {
                id: 'abstract1',
                name: 'Geometric',
                category: 'abstract',
                url: '/src/client/images/4.jpg',
                thumbnail: '/src/client/images/4.jpg',
                description: 'Abstract geometric patterns'
            },
            {
                id: 'space1',
                name: 'Nebula',
                category: 'space',
                url: '/src/client/images/5.jpg',
                thumbnail: '/src/client/images/5.jpg',
                description: 'Cosmic nebula scene'
            },
            {
                id: 'gaming1',
                name: 'Cyber City',
                category: 'gaming',
                url: '/src/client/images/6.jpg',
                thumbnail: '/src/client/images/6.jpg',
                description: 'Futuristic cyberpunk city'
            },
            {
                id: 'anime1',
                name: 'Cherry Blossoms',
                category: 'anime',
                url: '/src/client/images/7.jpg',
                thumbnail: '/src/client/images/7.jpg',
                description: 'Beautiful cherry blossom scene'
            },
            {
                id: 'seasonal1',
                name: 'Winter Wonderland',
                category: 'seasonal',
                url: '/src/client/images/8.jpg',
                thumbnail: '/src/client/images/8.jpg',
                description: 'Snowy winter landscape'
            },
            {
                id: 'abstract2',
                name: 'Color Waves',
                category: 'abstract',
                url: '/src/client/images/9.jpg',
                thumbnail: '/src/client/images/9.jpg',
                description: 'Flowing color patterns'
            }
        ];
    }

    /**
     * Preload common backgrounds for faster switching
     */
    async preloadCommonBackgrounds() {
        const commonBackgrounds = this.availableBackgrounds.slice(0, 5);
        
        for (const bg of commonBackgrounds) {
            try {
                await this.preloadImage(bg.url);
                console.log('🎨 [BACKGROUND] Preloaded:', bg.name);
            } catch (error) {
                console.warn('🎨 [BACKGROUND] Failed to preload:', bg.name, error);
            }
        }
    }

    /**
     * Preload a single image
     */
    preloadImage(url) {
        return new Promise((resolve, reject) => {
            if (this.preloadedImages.has(url)) {
                resolve(this.preloadedImages.get(url));
                return;
            }

            const img = new Image();
            img.onload = () => {
                this.preloadedImages.set(url, img);
                resolve(img);
            };
            img.onerror = reject;
            img.src = url;
        });
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Listen for background change requests
        window.addEventListener('changeBackground', (event) => {
            this.changeBackground(event.detail.backgroundId);
        });

        // Listen for background effects
        window.addEventListener('applyBackgroundEffect', (event) => {
            this.applyBackgroundEffect(event.detail.effectType, event.detail.duration);
        });
    }

    /**
     * Change the current background
     */
    async changeBackground(backgroundId, options = {}) {
        try {
            const background = this.availableBackgrounds.find(bg => bg.id === backgroundId);
            if (!background) {
                throw new Error(`Background not found: ${backgroundId}`);
            }

            // Add to history
            if (this.currentBackground) {
                this.addToHistory(this.currentBackground);
            }

            // Preload if not already loaded
            if (!this.preloadedImages.has(background.url)) {
                await this.preloadImage(background.url);
            }

            // Apply the background
            this.applyBackground(background, options);
            this.currentBackground = background;

            // Emit change event
            this.emitBackgroundChange(background);

            console.log('🎨 [BACKGROUND] Changed to:', background.name);
            return true;

        } catch (error) {
            console.error('🎨 [BACKGROUND] Failed to change background:', error);
            return false;
        }
    }

    /**
     * Apply background to the interface
     */
    applyBackground(background, options = {}) {
        const container = document.getElementById('chat-container') || document.body;
        const transition = options.transition !== false;

        if (transition) {
            container.style.transition = 'background-image 0.5s ease-in-out';
        }

        // Set background properties
        container.style.backgroundImage = `url(${background.url})`;
        container.style.backgroundSize = background.size || 'cover';
        container.style.backgroundPosition = background.position || 'center';
        container.style.backgroundRepeat = background.repeat || 'no-repeat';
        container.style.backgroundAttachment = background.attachment || 'fixed';

        // Apply any custom styles
        if (background.customStyles) {
            Object.assign(container.style, background.customStyles);
        }

        // Remove transition after animation
        if (transition) {
            setTimeout(() => {
                container.style.transition = '';
            }, 500);
        }
    }

    /**
     * Apply background effect
     */
    applyBackgroundEffect(effectType, duration = 5000) {
        const container = document.getElementById('chat-container') || document.body;
        
        // Remove existing effects
        this.removeBackgroundEffects();

        const effectElement = document.createElement('div');
        effectElement.className = `background-effect effect-${effectType}`;
        effectElement.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;

        // Apply effect-specific styles
        this.applyEffectStyles(effectElement, effectType);

        container.appendChild(effectElement);

        // Store effect for cleanup
        this.backgroundEffects.set(effectType, effectElement);

        // Remove after duration
        setTimeout(() => {
            this.removeBackgroundEffect(effectType);
        }, duration);

        console.log('🎨 [BACKGROUND] Applied effect:', effectType);
    }

    /**
     * Apply effect-specific styles
     */
    applyEffectStyles(element, effectType) {
        switch (effectType) {
            case 'rainbow':
                element.style.background = 'linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3)';
                element.style.animation = 'rainbowShift 2s linear infinite';
                element.style.opacity = '0.3';
                break;
            case 'stars':
                element.style.background = 'radial-gradient(2px 2px at 20px 30px, #eee, transparent), radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent), radial-gradient(1px 1px at 90px 40px, #fff, transparent)';
                element.style.animation = 'twinkle 3s linear infinite';
                break;
            case 'snow':
                element.style.background = 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Ccircle cx=\'20\' cy=\'20\' r=\'1\' fill=\'white\'/%3E%3Ccircle cx=\'80\' cy=\'40\' r=\'1\' fill=\'white\'/%3E%3Ccircle cx=\'40\' cy=\'80\' r=\'1\' fill=\'white\'/%3E%3C/svg%3E")';
                element.style.animation = 'snowFall 4s linear infinite';
                break;
            case 'fade':
                element.style.background = 'rgba(0,0,0,0.1)';
                element.style.animation = 'fadeInOut 2s ease-in-out infinite';
                break;
        }
    }

    /**
     * Remove specific background effect
     */
    removeBackgroundEffect(effectType) {
        const effect = this.backgroundEffects.get(effectType);
        if (effect && effect.parentNode) {
            effect.parentNode.removeChild(effect);
            this.backgroundEffects.delete(effectType);
        }
    }

    /**
     * Remove all background effects
     */
    removeBackgroundEffects() {
        this.backgroundEffects.forEach((effect, type) => {
            this.removeBackgroundEffect(type);
        });
    }

    /**
     * Add background to history
     */
    addToHistory(background) {
        this.backgroundHistory.unshift(background);
        if (this.backgroundHistory.length > this.maxHistorySize) {
            this.backgroundHistory.pop();
        }
    }

    /**
     * Get previous background from history
     */
    getPreviousBackground() {
        return this.backgroundHistory[0] || null;
    }

    /**
     * Go back to previous background
     */
    async goBack() {
        const previous = this.getPreviousBackground();
        if (previous) {
            return await this.changeBackground(previous.id, { transition: true });
        }
        return false;
    }

    /**
     * Get backgrounds by category
     */
    getBackgroundsByCategory(category) {
        return this.availableBackgrounds.filter(bg => bg.category === category);
    }

    /**
     * Get all categories
     */
    getCategories() {
        return Object.keys(this.categories).map(key => ({
            id: key,
            name: this.categories[key]
        }));
    }

    /**
     * Search backgrounds
     */
    searchBackgrounds(query) {
        const searchTerm = query.toLowerCase();
        return this.availableBackgrounds.filter(bg => 
            bg.name.toLowerCase().includes(searchTerm) ||
            bg.description.toLowerCase().includes(searchTerm) ||
            bg.category.toLowerCase().includes(searchTerm)
        );
    }

    /**
     * Get random background
     */
    getRandomBackground() {
        const randomIndex = Math.floor(Math.random() * this.availableBackgrounds.length);
        return this.availableBackgrounds[randomIndex];
    }

    /**
     * Set random background
     */
    async setRandomBackground() {
        const random = this.getRandomBackground();
        return await this.changeBackground(random.id);
    }

    /**
     * Emit background change event
     */
    emitBackgroundChange(background) {
        const event = new CustomEvent('backgroundChanged', {
            detail: {
                background: background,
                previous: this.backgroundHistory[0] || null
            }
        });
        window.dispatchEvent(event);
    }

    /**
     * Get current background
     */
    getCurrentBackground() {
        return this.currentBackground;
    }

    /**
     * Get background by ID
     */
    getBackgroundById(id) {
        return this.availableBackgrounds.find(bg => bg.id === id);
    }

    /**
     * Add custom background
     */
    addCustomBackground(backgroundData) {
        const customBg = {
            id: `custom_${Date.now()}`,
            category: 'custom',
            ...backgroundData
        };
        
        this.availableBackgrounds.push(customBg);
        console.log('🎨 [BACKGROUND] Added custom background:', customBg.name);
        return customBg;
    }

    /**
     * Remove custom background
     */
    removeCustomBackground(backgroundId) {
        const index = this.availableBackgrounds.findIndex(bg => bg.id === backgroundId);
        if (index > -1) {
            const removed = this.availableBackgrounds.splice(index, 1)[0];
            console.log('🎨 [BACKGROUND] Removed custom background:', removed.name);
            return removed;
        }
        return null;
    }

    /**
     * Export background settings
     */
    exportSettings() {
        return {
            currentBackground: this.currentBackground?.id,
            backgroundHistory: this.backgroundHistory.map(bg => bg.id),
            customBackgrounds: this.availableBackgrounds.filter(bg => bg.category === 'custom')
        };
    }

    /**
     * Import background settings
     */
    async importSettings(settings) {
        try {
            if (settings.currentBackground) {
                await this.changeBackground(settings.currentBackground);
            }
            
            if (settings.customBackgrounds) {
                settings.customBackgrounds.forEach(bg => {
                    this.addCustomBackground(bg);
                });
            }
            
            console.log('🎨 [BACKGROUND] Settings imported successfully');
        } catch (error) {
            console.error('🎨 [BACKGROUND] Failed to import settings:', error);
        }
    }

    /**
     * Cleanup
     */
    destroy() {
        this.removeBackgroundEffects();
        this.preloadedImages.clear();
        this.backgroundEffects.clear();
        this.availableBackgrounds = [];
        this.backgroundHistory = [];
        this.currentBackground = null;
    }
}

// Add CSS animations for background effects
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbowShift {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
    
    @keyframes twinkle {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 1; }
    }
    
    @keyframes snowFall {
        0% { transform: translateY(-100vh); }
        100% { transform: translateY(100vh); }
    }
    
    @keyframes fadeInOut {
        0%, 100% { opacity: 0.1; }
        50% { opacity: 0.3; }
    }
    
    .background-effect {
        animation-fill-mode: both;
    }
`;
document.head.appendChild(style);

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BackgroundManager;
} else if (typeof window !== 'undefined') {
    window.BackgroundManager = BackgroundManager;
    console.log('✅ [BACKGROUND] BackgroundManager class loaded');
}
