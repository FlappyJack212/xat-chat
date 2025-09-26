/**
 * XatCore - Clean replacement for the obfuscated xat.js
 * Provides core xat functionality without the mess
 */

import { SecurityUtils } from '../core/SecurityUtils.js';
import { logger } from '../core/Logger.js';

class XatCore {
    constructor() {
        this.config = {
            fake: 0,
            xtrace: 1,
            trace: 0,
            background: "XatBackground.jpg",
            version: "1.0.0"
        };
        
        this.state = {
            initialized: false,
            language: 'en',
            isWeb: true,
            uniqueId: 1,
            currentUser: null,
            currentRoom: null
        };
        
        this.cache = {
            images: new Map(),
            sounds: new Map(),
            powers: new Map()
        };
        
        this.events = new EventTarget();
        this.moduleName = 'XatCore';
        
        this.init();
    }

    /**
     * Initialize XatCore
     */
    init() {
        if (this.state.initialized) {
            logger.warn(this.moduleName, 'Already initialized');
            return;
        }

        try {
            this.setupEventListeners();
            this.loadConfiguration();
            this.initializeModules();
            
            this.state.initialized = true;
            logger.info(this.moduleName, 'Initialized successfully');
            
            this.events.dispatchEvent(new CustomEvent('initialized'));
        } catch (error) {
            logger.error(this.moduleName, 'Initialization failed:', error);
            throw error;
        }
    }

    /**
     * Setup global event listeners
     */
    setupEventListeners() {
        // Listen for configuration changes
        this.events.addEventListener('config_changed', (event) => {
            this.handleConfigChange(event.detail);
        });

        // Listen for user state changes  
        this.events.addEventListener('user_changed', (event) => {
            this.handleUserChange(event.detail);
        });

        // Listen for room changes
        this.events.addEventListener('room_changed', (event) => {
            this.handleRoomChange(event.detail);
        });
    }

    /**
     * Load configuration from localStorage or defaults
     */
    loadConfiguration() {
        try {
            const savedConfig = localStorage.getItem('xat_config');
            if (savedConfig) {
                const parsed = JSON.parse(savedConfig);
                this.config = { ...this.config, ...parsed };
            }
            
            logger.debug(this.moduleName, 'Configuration loaded', this.config);
        } catch (error) {
            logger.warn(this.moduleName, 'Failed to load saved config, using defaults');
        }
    }

    /**
     * Save configuration to localStorage
     */
    saveConfiguration() {
        try {
            localStorage.setItem('xat_config', JSON.stringify(this.config));
            logger.debug(this.moduleName, 'Configuration saved');
        } catch (error) {
            logger.error(this.moduleName, 'Failed to save configuration:', error);
        }
    }

    /**
     * Initialize core modules
     */
    initializeModules() {
        // Power system
        this.initializePowerSystem();
        
        // Animation system
        this.initializeAnimationSystem();
        
        // Sound system  
        this.initializeSoundSystem();
        
        // Image loading system
        this.initializeImageSystem();
    }

    /**
     * Initialize power system
     */
    initializePowerSystem() {
        this.powers = {
            owned: new Set(),
            active: new Set(),
            cooldowns: new Map()
        };
        
        logger.debug(this.moduleName, 'Power system initialized');
    }

    /**
     * Initialize animation system
     */
    initializeAnimationSystem() {
        this.animations = {
            active: new Map(),
            queue: []
        };
        
        // Request animation frame for smooth animations
        this.animationFrame = null;
        this.startAnimationLoop();
        
        logger.debug(this.moduleName, 'Animation system initialized');
    }

    /**
     * Initialize sound system
     */
    initializeSoundSystem() {
        this.sounds = {
            enabled: true,
            volume: 0.7,
            cache: new Map()
        };
        
        // Load sound preferences
        const soundEnabled = localStorage.getItem('sound_enabled');
        if (soundEnabled !== null) {
            this.sounds.enabled = soundEnabled === 'true';
        }
        
        const volume = localStorage.getItem('sound_volume');
        if (volume !== null) {
            this.sounds.volume = parseFloat(volume);
        }
        
        logger.debug(this.moduleName, 'Sound system initialized');
    }

    /**
     * Initialize image loading system
     */
    initializeImageSystem() {
        this.images = {
            cache: new Map(),
            loading: new Set(),
            failed: new Set()
        };
        
        logger.debug(this.moduleName, 'Image system initialized');
    }

    /**
     * Start animation loop
     */
    startAnimationLoop() {
        const animate = (timestamp) => {
            this.updateAnimations(timestamp);
            this.animationFrame = requestAnimationFrame(animate);
        };
        
        this.animationFrame = requestAnimationFrame(animate);
    }

    /**
     * Update all active animations
     */
    updateAnimations(timestamp) {
        for (const [id, animation] of this.animations.active) {
            if (animation.update) {
                const completed = animation.update(timestamp);
                if (completed) {
                    this.animations.active.delete(id);
                    if (animation.onComplete) {
                        animation.onComplete();
                    }
                }
            }
        }
    }

    /**
     * Load an image with caching
     */
    async loadImage(url, options = {}) {
        const cacheKey = url;
        
        // Return cached image if available
        if (this.cache.images.has(cacheKey)) {
            return this.cache.images.get(cacheKey);
        }
        
        // Return loading promise if already loading
        if (this.images.loading.has(url)) {
            return new Promise((resolve, reject) => {
                const checkLoaded = () => {
                    if (this.cache.images.has(cacheKey)) {
                        resolve(this.cache.images.get(cacheKey));
                    } else if (this.images.failed.has(url)) {
                        reject(new Error('Image failed to load'));
                    } else {
                        setTimeout(checkLoaded, 50);
                    }
                };
                checkLoaded();
            });
        }
        
        this.images.loading.add(url);
        
        return new Promise((resolve, reject) => {
            const img = new Image();
            
            img.onload = () => {
                this.cache.images.set(cacheKey, img);
                this.images.loading.delete(url);
                resolve(img);
            };
            
            img.onerror = () => {
                this.images.loading.delete(url);
                this.images.failed.add(url);
                logger.error(this.moduleName, `Failed to load image: ${url}`);
                reject(new Error(`Failed to load image: ${url}`));
            };
            
            img.src = url;
        });
    }

    /**
     * Play a sound effect
     */
    async playSound(soundName, options = {}) {
        if (!this.sounds.enabled) {
            return;
        }
        
        try {
            const audio = await this.loadSound(soundName);
            audio.volume = options.volume || this.sounds.volume;
            
            if (options.loop) {
                audio.loop = true;
            }
            
            await audio.play();
            logger.debug(this.moduleName, `Sound played: ${soundName}`);
        } catch (error) {
            logger.warn(this.moduleName, `Failed to play sound ${soundName}:`, error);
        }
    }

    /**
     * Load a sound with caching
     */
    async loadSound(soundName) {
        const cacheKey = soundName;
        
        if (this.cache.sounds.has(cacheKey)) {
            // Clone audio for multiple simultaneous plays
            const original = this.cache.sounds.get(cacheKey);
            return original.cloneNode();
        }
        
        const audio = new Audio(`/sounds/${soundName}.mp3`);
        this.cache.sounds.set(cacheKey, audio);
        
        return new Promise((resolve, reject) => {
            audio.oncanplaythrough = () => resolve(audio.cloneNode());
            audio.onerror = () => reject(new Error(`Failed to load sound: ${soundName}`));
        });
    }

    /**
     * Handle configuration changes
     */
    handleConfigChange(changes) {
        Object.assign(this.config, changes);
        this.saveConfiguration();
        
        logger.debug(this.moduleName, 'Configuration updated:', changes);
    }

    /**
     * Handle user state changes
     */
    handleUserChange(user) {
        this.state.currentUser = user;
        logger.debug(this.moduleName, 'User changed:', user?.username || 'null');
    }

    /**
     * Handle room changes
     */
    handleRoomChange(room) {
        this.state.currentRoom = room;
        logger.debug(this.moduleName, 'Room changed:', room?.name || 'null');
    }

    /**
     * Generate unique ID
     */
    generateUniqueId() {
        return this.state.uniqueId++;
    }

    /**
     * Clean shutdown
     */
    destroy() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        
        this.animations.active.clear();
        this.cache.images.clear();
        this.cache.sounds.clear();
        
        this.state.initialized = false;
        
        logger.info(this.moduleName, 'Destroyed successfully');
    }
}

// Export for use
export default XatCore;

// Legacy global support
if (typeof window !== 'undefined') {
    window.XatCore = XatCore;
}