// CreateJS Manager for iXat Chat Interface
// Handles animations, effects, and visual enhancements

class CreateJSManager {
    constructor() {
        this.stage = null;
        this.canvas = null;
        this.animations = new Map();
        this.effects = new Map();
        this.isInitialized = false;
    }

    init() {
        try {
            console.log('🎨 [CREATEJS] Initializing CreateJS Manager...');
            
            // Create canvas for effects
            this.createCanvas();
            
            // Initialize CreateJS stage
            this.initializeStage();
            
            // Setup event listeners
            this.setupEventListeners();
            
            this.isInitialized = true;
            console.log('✅ [CREATEJS] CreateJS Manager initialized successfully');
            
        } catch (error) {
            console.error('❌ [CREATEJS] Failed to initialize:', error);
        }
    }

    createCanvas() {
        // Create a hidden canvas for effects
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'createjs-canvas';
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9999;
            background: transparent;
        `;
        document.body.appendChild(this.canvas);
    }

    initializeStage() {
        if (typeof createjs === 'undefined') {
            console.warn('⚠️ [CREATEJS] CreateJS library not loaded');
            return;
        }

        this.stage = new createjs.Stage(this.canvas);
        this.stage.enableMouseOver(20);
        
        // Start the ticker
        createjs.Ticker.addEventListener("tick", this.stage);
        createjs.Ticker.framerate = 60;
    }

    setupEventListeners() {
        // Listen for power activations
        document.addEventListener('powerActivated', (event) => {
            this.showPowerEffect(event.detail.powerName, event.detail.target);
        });

        // Listen for user actions
        document.addEventListener('userAction', (event) => {
            this.showUserEffect(event.detail.action, event.detail.user);
        });
    }

    showPowerEffect(powerName, target) {
        if (!this.stage) return;

        const effect = this.createPowerEffect(powerName, target);
        if (effect) {
            this.stage.addChild(effect);
            this.animatePowerEffect(effect);
        }
    }

    createPowerEffect(powerName, target) {
        const container = new createjs.Container();
        
        // Get target position
        const targetElement = document.querySelector(target) || document.body;
        const rect = targetElement.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        container.x = x;
        container.y = y;

        // Create effect based on power name
        const powerNameLower = powerName.toLowerCase();
        
        if (powerNameLower.includes('rainbow')) {
            return this.createRainbowEffect(container);
        } else if (powerNameLower.includes('glow')) {
            return this.createGlowEffect(container);
        } else if (powerNameLower.includes('bounce')) {
            return this.createBounceEffect(container);
        } else if (powerNameLower.includes('spin')) {
            return this.createSpinEffect(container);
        } else if (powerNameLower.includes('heart')) {
            return this.createHeartEffect(container);
        } else if (powerNameLower.includes('star')) {
            return this.createStarEffect(container);
        } else {
            return this.createDefaultEffect(container);
        }
    }

    createRainbowEffect(container) {
        const colors = ['#ff0000', '#ff8000', '#ffff00', '#00ff00', '#0080ff', '#8000ff'];
        
        for (let i = 0; i < 6; i++) {
            const circle = new createjs.Shape();
            circle.graphics.beginFill(colors[i]).drawCircle(0, 0, 20 - i * 3);
            circle.alpha = 0.8;
            circle.rotation = i * 60;
            container.addChild(circle);
        }

        return container;
    }

    createGlowEffect(container) {
        const glow = new createjs.Shape();
        glow.graphics.beginRadialGradientFill(['#ffff00', '#ff8000', 'transparent'], [0, 0.5, 1], 0, 0, 0, 0, 0, 50);
        glow.graphics.drawCircle(0, 0, 50);
        glow.alpha = 0.8;
        container.addChild(glow);

        return container;
    }

    createBounceEffect(container) {
        const bounce = new createjs.Shape();
        bounce.graphics.beginFill('#00ff00').drawCircle(0, 0, 15);
        bounce.alpha = 0.9;
        container.addChild(bounce);

        return container;
    }

    createSpinEffect(container) {
        const spin = new createjs.Shape();
        spin.graphics.beginFill('#0080ff').drawRect(-10, -10, 20, 20);
        spin.alpha = 0.8;
        container.addChild(spin);

        return container;
    }

    createHeartEffect(container) {
        const heart = new createjs.Shape();
        heart.graphics.beginFill('#ff0080').drawPolyStar(0, 0, 20, 3, 0.5, 0);
        heart.alpha = 0.9;
        container.addChild(heart);

        return container;
    }

    createStarEffect(container) {
        const star = new createjs.Shape();
        star.graphics.beginFill('#ffff00').drawPolyStar(0, 0, 25, 5, 0.5, 0);
        star.alpha = 0.8;
        container.addChild(star);

        return container;
    }

    createDefaultEffect(container) {
        const effect = new createjs.Shape();
        effect.graphics.beginFill('#ffffff').drawCircle(0, 0, 20);
        effect.alpha = 0.7;
        container.addChild(effect);

        return container;
    }

    animatePowerEffect(container) {
        // Scale animation
        container.scaleX = 0;
        container.scaleY = 0;
        
        createjs.Tween.get(container)
            .to({ scaleX: 1, scaleY: 1, alpha: 1 }, 300, createjs.Ease.backOut)
            .wait(500)
            .to({ scaleX: 1.5, scaleY: 1.5, alpha: 0 }, 500, createjs.Ease.quadOut)
            .call(() => {
                this.stage.removeChild(container);
            });

        // Rotation for spin effects
        if (container.getChildAt(0).rotation !== undefined) {
            createjs.Tween.get(container)
                .to({ rotation: 360 }, 1000, createjs.Ease.linear);
        }
    }

    showUserEffect(action, user) {
        if (!this.stage) return;

        const effect = this.createUserEffect(action, user);
        if (effect) {
            this.stage.addChild(effect);
            this.animateUserEffect(effect);
        }
    }

    createUserEffect(action, user) {
        const container = new createjs.Container();
        
        // Get user element position
        const userElement = document.querySelector(`[data-user-id="${user._id}"]`);
        if (!userElement) return null;

        const rect = userElement.getBoundingClientRect();
        container.x = rect.left + rect.width / 2;
        container.y = rect.top + rect.height / 2;

        const actionLower = action.toLowerCase();
        
        if (actionLower.includes('join')) {
            return this.createJoinEffect(container);
        } else if (actionLower.includes('leave')) {
            return this.createLeaveEffect(container);
        } else if (actionLower.includes('message')) {
            return this.createMessageEffect(container);
        } else {
            return this.createDefaultUserEffect(container);
        }
    }

    createJoinEffect(container) {
        const join = new createjs.Shape();
        join.graphics.beginFill('#00ff00').drawCircle(0, 0, 15);
        join.alpha = 0.8;
        container.addChild(join);

        return container;
    }

    createLeaveEffect(container) {
        const leave = new createjs.Shape();
        leave.graphics.beginFill('#ff0000').drawCircle(0, 0, 15);
        leave.alpha = 0.8;
        container.addChild(leave);

        return container;
    }

    createMessageEffect(container) {
        const message = new createjs.Shape();
        message.graphics.beginFill('#0080ff').drawCircle(0, 0, 10);
        message.alpha = 0.6;
        container.addChild(message);

        return container;
    }

    createDefaultUserEffect(container) {
        const effect = new createjs.Shape();
        effect.graphics.beginFill('#ffffff').drawCircle(0, 0, 12);
        effect.alpha = 0.7;
        container.addChild(effect);

        return container;
    }

    animateUserEffect(container) {
        container.scaleX = 0;
        container.scaleY = 0;
        
        createjs.Tween.get(container)
            .to({ scaleX: 1, scaleY: 1, alpha: 1 }, 200, createjs.Ease.backOut)
            .wait(300)
            .to({ scaleX: 0, scaleY: 0, alpha: 0 }, 200, createjs.Ease.quadIn)
            .call(() => {
                this.stage.removeChild(container);
            });
    }

    // Public methods for external use
    showNotification(message, type = 'info') {
        if (!this.stage) return;

        const notification = this.createNotification(message, type);
        this.stage.addChild(notification);
        this.animateNotification(notification);
    }

    createNotification(message, type) {
        const container = new createjs.Container();
        
        const background = new createjs.Shape();
        const colors = {
            'info': '#0080ff',
            'success': '#00ff00',
            'warning': '#ff8000',
            'error': '#ff0000'
        };
        
        background.graphics.beginFill(colors[type] || colors.info).drawRoundRect(0, 0, 200, 50, 10);
        background.alpha = 0.9;
        container.addChild(background);

        const text = new createjs.Text(message, "14px Arial", "#ffffff");
        text.textAlign = "center";
        text.textBaseline = "middle";
        text.x = 100;
        text.y = 25;
        container.addChild(text);

        container.x = window.innerWidth - 220;
        container.y = 20;

        return container;
    }

    animateNotification(container) {
        container.alpha = 0;
        container.y -= 50;
        
        createjs.Tween.get(container)
            .to({ alpha: 1, y: container.y + 50 }, 300, createjs.Ease.backOut)
            .wait(2000)
            .to({ alpha: 0, y: container.y - 50 }, 300, createjs.Ease.quadIn)
            .call(() => {
                this.stage.removeChild(container);
            });
    }

    // Cleanup method
    destroy() {
        if (this.stage) {
            this.stage.removeAllChildren();
            createjs.Ticker.removeEventListener("tick", this.stage);
        }
        
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
        
        this.isInitialized = false;
    }
}

// Initialize CreateJS Manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.createJSManager = new CreateJSManager();
    window.createJSManager.init();
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CreateJSManager;
}
