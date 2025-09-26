/**
 * AnimationEngine - Handles all visual effects and animations for xat.com experience
 * Manages power effects, pawn animations, screen effects, and particle systems
 */

class AnimationEngine {
    constructor(xatInterface) {
        this.xat = xatInterface;
        this.isRunning = false;
        this.isPaused = false;
        this.frameId = null;
        
        // Animation systems
        this.particleSystem = null;
        this.screenEffects = new Map();
        this.activeAnimations = new Map();
        
        // Performance settings
        this.targetFPS = 60;
        this.frameInterval = 1000 / this.targetFPS;
        this.lastFrameTime = 0;
        
        this.moduleName = 'AnimationEngine';
        this.init();
    }

    init() {
        this.setupParticleSystem();
        this.setupPerformanceMonitoring();
        this.start();
        logger.debug(this.moduleName, 'Animation engine initialized');
    }

    /**
     * Setup particle system for effects
     */
    setupParticleSystem() {
        this.particleSystem = {
            particles: [],
            maxParticles: 100,
            
            create: (config) => {
                if (this.particleSystem.particles.length >= this.particleSystem.maxParticles) {
                    return null;
                }
                
                const particle = {
                    id: Math.random().toString(36).substr(2, 9),
                    x: config.x || 0,
                    y: config.y || 0,
                    vx: config.vx || 0,
                    vy: config.vy || 0,
                    life: config.life || 1000,
                    maxLife: config.life || 1000,
                    size: config.size || 5,
                    color: config.color || '#ffffff',
                    type: config.type || 'circle',
                    element: null,
                    update: config.update || this.defaultParticleUpdate,
                    render: config.render || this.defaultParticleRender
                };
                
                // Create DOM element
                particle.element = this.createParticleElement(particle);
                document.body.appendChild(particle.element);
                
                this.particleSystem.particles.push(particle);
                return particle;
            },
            
            update: (deltaTime) => {
                for (let i = this.particleSystem.particles.length - 1; i >= 0; i--) {
                    const particle = this.particleSystem.particles[i];
                    
                    particle.life -= deltaTime;
                    if (particle.life <= 0) {
                        // Remove particle
                        if (particle.element && particle.element.parentNode) {
                            particle.element.parentNode.removeChild(particle.element);
                        }
                        this.particleSystem.particles.splice(i, 1);
                        continue;
                    }
                    
                    // Update particle
                    if (particle.update) {
                        particle.update(particle, deltaTime);
                    }
                    
                    // Render particle
                    if (particle.render) {
                        particle.render(particle);
                    }
                }
            }
        };
    }

    /**
     * Create DOM element for particle
     */
    createParticleElement(particle) {
        const element = document.createElement('div');
        element.style.cssText = `
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            width: ${particle.size}px;
            height: ${particle.size}px;
            background: ${particle.color};
            border-radius: 50%;
            transform: translate(${particle.x}px, ${particle.y}px);
        `;
        
        if (particle.type === 'sparkle') {
            element.textContent = '✨';
            element.style.background = 'transparent';
            element.style.fontSize = `${particle.size}px`;
        } else if (particle.type === 'heart') {
            element.textContent = '❤️';
            element.style.background = 'transparent';
            element.style.fontSize = `${particle.size}px`;
        }
        
        return element;
    }

    /**
     * Default particle update function
     */
    defaultParticleUpdate(particle, deltaTime) {
        particle.x += particle.vx * deltaTime / 16.67; // Normalize to 60fps
        particle.y += particle.vy * deltaTime / 16.67;
        
        // Apply gravity
        particle.vy += 0.1;
        
        // Fade out
        const alpha = particle.life / particle.maxLife;
        particle.element.style.opacity = alpha;
    }

    /**
     * Default particle render function
     */
    defaultParticleRender(particle) {
        particle.element.style.transform = `translate(${particle.x}px, ${particle.y}px)`;
    }

    /**
     * Setup performance monitoring
     */
    setupPerformanceMonitoring() {
        this.performance = {
            frameCount: 0,
            fpsHistory: [],
            lastFPSUpdate: 0,
            averageFPS: 60
        };
    }

    /**
     * Start animation loop
     */
    start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.isPaused = false;
        this.lastFrameTime = performance.now();
        this.animate();
        
        logger.debug(this.moduleName, 'Animation engine started');
    }

    /**
     * Pause animations
     */
    pause() {
        this.isPaused = true;
        logger.debug(this.moduleName, 'Animation engine paused');
    }

    /**
     * Resume animations
     */
    resume() {
        if (!this.isPaused) return;
        
        this.isPaused = false;
        this.lastFrameTime = performance.now();
        logger.debug(this.moduleName, 'Animation engine resumed');
    }

    /**
     * Stop animation engine
     */
    stop() {
        this.isRunning = false;
        this.isPaused = false;
        
        if (this.frameId) {
            cancelAnimationFrame(this.frameId);
            this.frameId = null;
        }
        
        logger.debug(this.moduleName, 'Animation engine stopped');
    }

    /**
     * Main animation loop
     */
    animate() {
        if (!this.isRunning) return;
        
        const currentTime = performance.now();
        const deltaTime = currentTime - this.lastFrameTime;
        
        // Frame rate limiting
        if (deltaTime >= this.frameInterval && !this.isPaused) {
            this.update(deltaTime);
            this.updatePerformance(currentTime);
            this.lastFrameTime = currentTime;
        }
        
        this.frameId = requestAnimationFrame(() => this.animate());
    }

    /**
     * Update all animations
     */
    update(deltaTime) {
        // Update particle system
        if (this.particleSystem) {
            this.particleSystem.update(deltaTime);
        }
        
        // Update screen effects
        for (const [id, effect] of this.screenEffects) {
            if (effect.update) {
                const shouldContinue = effect.update(deltaTime);
                if (!shouldContinue) {
                    this.removeScreenEffect(id);
                }
            }
        }
        
        // Update active animations
        for (const [id, animation] of this.activeAnimations) {
            if (animation.update) {
                const shouldContinue = animation.update(deltaTime);
                if (!shouldContinue) {
                    this.activeAnimations.delete(id);
                }
            }
        }
    }

    /**
     * Update performance metrics
     */
    updatePerformance(currentTime) {
        this.performance.frameCount++;
        
        if (currentTime - this.performance.lastFPSUpdate >= 1000) {
            const fps = this.performance.frameCount;
            this.performance.fpsHistory.push(fps);
            
            if (this.performance.fpsHistory.length > 10) {
                this.performance.fpsHistory.shift();
            }
            
            this.performance.averageFPS = this.performance.fpsHistory.reduce((a, b) => a + b, 0) / this.performance.fpsHistory.length;
            this.performance.frameCount = 0;
            this.performance.lastFPSUpdate = currentTime;
            
            // Adjust quality based on performance
            this.adjustQuality();
        }
    }

    /**
     * Adjust animation quality based on performance
     */
    adjustQuality() {
        if (this.performance.averageFPS < 30) {
            // Reduce particle count
            this.particleSystem.maxParticles = Math.max(20, this.particleSystem.maxParticles - 10);
            logger.debug(this.moduleName, 'Reduced animation quality due to low FPS');
        } else if (this.performance.averageFPS > 55) {
            // Increase particle count
            this.particleSystem.maxParticles = Math.min(100, this.particleSystem.maxParticles + 5);
        }
    }

    /**
     * Create sparkle effect at position
     */
    createSparkleEffect(x, y, count = 5) {
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count;
            const speed = 2 + Math.random() * 3;
            
            this.particleSystem.create({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1000 + Math.random() * 1000,
                size: 12 + Math.random() * 8,
                type: 'sparkle'
            });
        }
    }

    /**
     * Create heart effect for kiss/hug
     */
    createHeartEffect(x, y, count = 3) {
        for (let i = 0; i < count; i++) {
            this.particleSystem.create({
                x: x + (Math.random() - 0.5) * 50,
                y: y,
                vx: (Math.random() - 0.5) * 2,
                vy: -2 - Math.random() * 2,
                life: 2000 + Math.random() * 1000,
                size: 16 + Math.random() * 8,
                type: 'heart'
            });
        }
    }

    /**
     * Create screen shake effect
     */
    createScreenShake(intensity = 10, duration = 500) {
        const shakeId = 'shake_' + Date.now();
        let elapsed = 0;
        
        const effect = {
            update: (deltaTime) => {
                elapsed += deltaTime;
                
                if (elapsed >= duration) {
                    document.body.style.transform = '';
                    return false;
                }
                
                const progress = elapsed / duration;
                const currentIntensity = intensity * (1 - progress);
                
                const offsetX = (Math.random() - 0.5) * currentIntensity;
                const offsetY = (Math.random() - 0.5) * currentIntensity;
                
                document.body.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
                
                return true;
            }
        };
        
        this.screenEffects.set(shakeId, effect);
    }

    /**
     * Create rainbow text animation
     */
    createRainbowAnimation(element) {
        if (!element) return;
        
        const animationId = 'rainbow_' + Date.now();
        let hue = 0;
        
        const animation = {
            update: (deltaTime) => {
                hue += deltaTime * 0.1;
                if (hue >= 360) hue = 0;
                
                element.style.filter = `hue-rotate(${hue}deg)`;
                
                // Continue indefinitely for rainbow effect
                return element.parentNode !== null;
            }
        };
        
        this.activeAnimations.set(animationId, animation);
        return animationId;
    }

    /**
     * Create glow pulse animation
     */
    createGlowAnimation(element, color = '#ffffff') {
        if (!element) return;
        
        const animationId = 'glow_' + Date.now();
        let time = 0;
        
        const animation = {
            update: (deltaTime) => {
                time += deltaTime;
                
                const intensity = (Math.sin(time * 0.005) + 1) / 2;
                const shadowSize = 5 + intensity * 15;
                
                element.style.textShadow = `
                    0 0 ${shadowSize}px ${color},
                    0 0 ${shadowSize * 2}px ${color},
                    0 0 ${shadowSize * 3}px ${color}
                `;
                
                return element.parentNode !== null;
            }
        };
        
        this.activeAnimations.set(animationId, animation);
        return animationId;
    }

    /**
     * Create power activation burst
     */
    createPowerBurst(element) {
        if (!element) return;
        
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Create burst particles
        for (let i = 0; i < 12; i++) {
            const angle = (Math.PI * 2 * i) / 12;
            const speed = 3 + Math.random() * 2;
            
            this.particleSystem.create({
                x: centerX,
                y: centerY,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 800 + Math.random() * 400,
                size: 4 + Math.random() * 4,
                color: '#fed327'
            });
        }
    }

    /**
     * Update pawn animations
     */
    updatePawnAnimations() {
        const pawns = document.querySelectorAll('.pawn');
        pawns.forEach(pawn => {
            if (pawn.classList.contains('pawn-gold')) {
                this.createGlowAnimation(pawn, '#ffd700');
            } else if (pawn.classList.contains('pawn-emerald')) {
                this.createGlowAnimation(pawn, '#00ff80');
            } else if (pawn.classList.contains('pawn-rainbow')) {
                this.createRainbowAnimation(pawn);
            }
        });
    }

    /**
     * Remove screen effect
     */
    removeScreenEffect(id) {
        this.screenEffects.delete(id);
    }

    /**
     * Remove animation
     */
    removeAnimation(id) {
        this.activeAnimations.delete(id);
    }

    /**
     * Get performance stats
     */
    getPerformanceStats() {
        return {
            fps: Math.round(this.performance.averageFPS),
            particles: this.particleSystem.particles.length,
            effects: this.screenEffects.size,
            animations: this.activeAnimations.size
        };
    }

    /**
     * Destroy animation engine
     */
    destroy() {
        this.stop();
        
        // Clear all particles
        this.particleSystem.particles.forEach(particle => {
            if (particle.element && particle.element.parentNode) {
                particle.element.parentNode.removeChild(particle.element);
            }
        });
        this.particleSystem.particles = [];
        
        // Clear effects and animations
        this.screenEffects.clear();
        this.activeAnimations.clear();
        
        // Reset body transform
        document.body.style.transform = '';
        
        logger.info(this.moduleName, 'Animation engine destroyed');
    }
}

// Make available globally
if (typeof window !== 'undefined') {
    window.AnimationEngine = AnimationEngine;
}