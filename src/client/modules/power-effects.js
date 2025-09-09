/**
 * Power Effects System for iXat Chat
 * Handles animated power effects, visual feedback, and chat modifications
 */

class PowerEffects {
    constructor() {
        this.activeEffects = new Map();
        this.powerCooldowns = new Map();
        this.chatContainer = null;
        this.messageContainer = null;
        this.userList = null;
        
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupElements());
        } else {
            this.setupElements();
        }
    }

    setupElements() {
        this.chatContainer = document.querySelector('.chat-container') || document.querySelector('#chat-container');
        this.messageContainer = document.querySelector('.messages') || document.querySelector('#messages');
        this.userList = document.querySelector('.user-list') || document.querySelector('#user-list');
        
        // Add CSS for power effects
        this.addPowerStyles();
    }

    addPowerStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Power Effect Animations */
            .power-effect {
                position: relative;
                display: inline-block;
            }
            
            .power-rainbow {
                background: linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3);
                background-size: 400% 400%;
                animation: rainbow 2s ease-in-out infinite;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
            
            @keyframes rainbow {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
            
            .power-glow {
                text-shadow: 0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor;
                animation: glow 1.5s ease-in-out infinite alternate;
            }
            
            @keyframes glow {
                from { text-shadow: 0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor; }
                to { text-shadow: 0 0 20px currentColor, 0 0 30px currentColor, 0 0 40px currentColor; }
            }
            
            .power-bounce {
                animation: bounce 0.6s ease-in-out;
            }
            
            @keyframes bounce {
                0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                40% { transform: translateY(-10px); }
                60% { transform: translateY(-5px); }
            }
            
            .power-spin {
                animation: spin 1s linear infinite;
            }
            
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            
            .power-pulse {
                animation: pulse 1s ease-in-out infinite;
            }
            
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
            }
            
            .power-shake {
                animation: shake 0.5s ease-in-out;
            }
            
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-5px); }
                75% { transform: translateX(5px); }
            }
            
            .power-fade-in {
                animation: fadeIn 0.5s ease-in;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            .power-slide-in {
                animation: slideIn 0.3s ease-out;
            }
            
            @keyframes slideIn {
                from { transform: translateX(-100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            .power-zoom-in {
                animation: zoomIn 0.3s ease-out;
            }
            
            @keyframes zoomIn {
                from { transform: scale(0); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
            }
            
            /* Color Powers */
            .power-red { color: #ff0000 !important; }
            .power-green { color: #00ff00 !important; }
            .power-blue { color: #0000ff !important; }
            .power-pink { color: #ff69b4 !important; }
            .power-purple { color: #800080 !important; }
            .power-yellow { color: #ffff00 !important; }
            .power-orange { color: #ffa500 !important; }
            .power-cyan { color: #00ffff !important; }
            
            /* Shape Powers */
            .power-heart::before {
                content: '♥';
                color: #ff0000;
                margin-right: 2px;
            }
            
            .power-square::before {
                content: '■';
                color: #00ffff;
                margin-right: 2px;
            }
            
            .power-diamond::before {
                content: '♦';
                color: #800080;
                margin-right: 2px;
            }
            
            .power-hexagon::before {
                content: '⬡';
                color: #ff69b4;
                margin-right: 2px;
            }
            
            .power-octogram::before {
                content: '✴';
                color: #00ff00;
                margin-right: 2px;
            }
            
            /* Chat Background Effects */
            .chat-bg-effect {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                pointer-events: none;
                z-index: -1;
            }
            
            .bg-rainbow {
                background: linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3);
                background-size: 400% 400%;
                animation: rainbow 3s ease-in-out infinite;
                opacity: 0.1;
            }
            
            .bg-stars {
                background-image: 
                    radial-gradient(2px 2px at 20px 30px, #eee, transparent),
                    radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent),
                    radial-gradient(1px 1px at 90px 40px, #fff, transparent),
                    radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.6), transparent),
                    radial-gradient(2px 2px at 160px 30px, #ddd, transparent);
                background-repeat: repeat;
                background-size: 200px 100px;
                animation: twinkle 4s ease-in-out infinite;
                opacity: 0.3;
            }
            
            @keyframes twinkle {
                0%, 100% { opacity: 0.3; }
                50% { opacity: 0.8; }
            }
            
            /* Message Effects */
            .message-power-effect {
                position: relative;
                overflow: hidden;
            }
            
            .message-rainbow {
                background: linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3);
                background-size: 400% 400%;
                animation: rainbow 2s ease-in-out infinite;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
            
            .message-glow {
                text-shadow: 0 0 5px currentColor, 0 0 10px currentColor;
            }
            
            .message-bounce {
                animation: bounce 0.6s ease-in-out;
            }
            
            /* User List Effects */
            .user-power-effect {
                position: relative;
            }
            
            .user-glow {
                box-shadow: 0 0 10px currentColor;
                border-radius: 3px;
                padding: 2px 4px;
            }
            
            .user-bounce {
                animation: bounce 0.6s ease-in-out;
            }
            
            /* Power Purchase Effects */
            .power-purchased {
                animation: zoomIn 0.5s ease-out;
                background: linear-gradient(45deg, #00ff00, #00cc00);
                color: white;
                padding: 2px 6px;
                border-radius: 3px;
                font-weight: bold;
            }
            
            .power-insufficient {
                animation: shake 0.5s ease-in-out;
                background: linear-gradient(45deg, #ff0000, #cc0000);
                color: white;
                padding: 2px 6px;
                border-radius: 3px;
                font-weight: bold;
            }
        `;
        document.head.appendChild(style);
    }

    // Apply power effect to an element
    applyEffect(element, powerName, effectType, duration = 3000) {
        if (!element) return;

        const effectId = `${powerName}-${Date.now()}`;
        
        // Add base power effect class
        element.classList.add('power-effect');
        
        // Apply specific effect based on power name and type
        switch (powerName.toLowerCase()) {
            case 'rainbow':
                this.applyRainbowEffect(element, effectType);
                break;
            case 'red':
                this.applyColorEffect(element, 'red');
                break;
            case 'green':
                this.applyColorEffect(element, 'green');
                break;
            case 'blue':
                this.applyColorEffect(element, 'blue');
                break;
            case 'pink':
                this.applyColorEffect(element, 'pink');
                break;
            case 'purple':
                this.applyColorEffect(element, 'purple');
                break;
            case 'heart':
                this.applyShapeEffect(element, 'heart');
                break;
            case 'square':
                this.applyShapeEffect(element, 'square');
                break;
            case 'diamond':
                this.applyShapeEffect(element, 'diamond');
                break;
            case 'hexagon':
                this.applyShapeEffect(element, 'hexagon');
                break;
            case 'octogram':
                this.applyShapeEffect(element, 'octogram');
                break;
            case 'glow':
                this.applyGlowEffect(element);
                break;
            case 'bounce':
                this.applyBounceEffect(element);
                break;
            case 'spin':
                this.applySpinEffect(element);
                break;
            case 'pulse':
                this.applyPulseEffect(element);
                break;
            case 'shake':
                this.applyShakeEffect(element);
                break;
            case 'fade':
                this.applyFadeEffect(element);
                break;
            default:
                this.applyGenericEffect(element, powerName);
        }

        // Store active effect
        this.activeEffects.set(effectId, {
            element,
            powerName,
            effectType,
            startTime: Date.now(),
            duration
        });

        // Remove effect after duration
        setTimeout(() => {
            this.removeEffect(effectId);
        }, duration);

        return effectId;
    }

    applyRainbowEffect(element, effectType) {
        element.classList.add('power-rainbow');
        if (effectType === 'message') {
            element.classList.add('message-rainbow');
        }
    }

    applyColorEffect(element, color) {
        element.classList.add(`power-${color}`);
    }

    applyShapeEffect(element, shape) {
        element.classList.add(`power-${shape}`);
    }

    applyGlowEffect(element) {
        element.classList.add('power-glow');
    }

    applyBounceEffect(element) {
        element.classList.add('power-bounce');
    }

    applySpinEffect(element) {
        element.classList.add('power-spin');
    }

    applyPulseEffect(element) {
        element.classList.add('power-pulse');
    }

    applyShakeEffect(element) {
        element.classList.add('power-shake');
    }

    applyFadeEffect(element) {
        element.classList.add('power-fade-in');
    }

    applyGenericEffect(element, powerName) {
        // Apply a generic effect based on power name
        if (powerName.includes('color') || powerName.includes('red') || powerName.includes('green') || powerName.includes('blue')) {
            this.applyColorEffect(element, 'blue');
        } else if (powerName.includes('glow') || powerName.includes('shine')) {
            this.applyGlowEffect(element);
        } else if (powerName.includes('bounce') || powerName.includes('jump')) {
            this.applyBounceEffect(element);
        } else if (powerName.includes('spin') || powerName.includes('rotate')) {
            this.applySpinEffect(element);
        } else {
            this.applyFadeEffect(element);
        }
    }

    // Apply chat background effect
    applyChatBackgroundEffect(powerName) {
        if (!this.chatContainer) return;

        // Remove existing background effects
        const existingEffects = this.chatContainer.querySelectorAll('.chat-bg-effect');
        existingEffects.forEach(effect => effect.remove());

        const bgEffect = document.createElement('div');
        bgEffect.className = 'chat-bg-effect';

        switch (powerName.toLowerCase()) {
            case 'rainbow':
                bgEffect.classList.add('bg-rainbow');
                break;
            case 'stars':
                bgEffect.classList.add('bg-stars');
                break;
            default:
                return; // No background effect for this power
        }

        this.chatContainer.appendChild(bgEffect);

        // Remove after 10 seconds
        setTimeout(() => {
            if (bgEffect.parentNode) {
                bgEffect.parentNode.removeChild(bgEffect);
            }
        }, 10000);
    }

    // Apply message effect
    applyMessageEffect(messageElement, powerName) {
        if (!messageElement) return;

        messageElement.classList.add('message-power-effect');

        switch (powerName.toLowerCase()) {
            case 'rainbow':
                messageElement.classList.add('message-rainbow');
                break;
            case 'glow':
                messageElement.classList.add('message-glow');
                break;
            case 'bounce':
                messageElement.classList.add('message-bounce');
                break;
        }
    }

    // Apply user list effect
    applyUserEffect(userElement, powerName) {
        if (!userElement) return;

        userElement.classList.add('user-power-effect');

        switch (powerName.toLowerCase()) {
            case 'glow':
                userElement.classList.add('user-glow');
                break;
            case 'bounce':
                userElement.classList.add('user-bounce');
                break;
        }
    }

    // Remove effect
    removeEffect(effectId) {
        const effect = this.activeEffects.get(effectId);
        if (!effect) return;

        const { element, powerName } = effect;

        // Remove all power effect classes
        element.classList.remove('power-effect', 'power-rainbow', 'power-glow', 'power-bounce', 
                                'power-spin', 'power-pulse', 'power-shake', 'power-fade-in',
                                'message-power-effect', 'message-rainbow', 'message-glow', 'message-bounce',
                                'user-power-effect', 'user-glow', 'user-bounce');

        // Remove color classes
        const colorClasses = ['power-red', 'power-green', 'power-blue', 'power-pink', 
                             'power-purple', 'power-yellow', 'power-orange', 'power-cyan'];
        colorClasses.forEach(cls => element.classList.remove(cls));

        // Remove shape classes
        const shapeClasses = ['power-heart', 'power-square', 'power-diamond', 
                             'power-hexagon', 'power-octogram'];
        shapeClasses.forEach(cls => element.classList.remove(cls));

        this.activeEffects.delete(effectId);
    }

    // Check if power is on cooldown
    isPowerOnCooldown(powerName) {
        const cooldown = this.powerCooldowns.get(powerName);
        if (!cooldown) return false;
        
        return Date.now() - cooldown.startTime < cooldown.duration;
    }

    // Set power cooldown
    setPowerCooldown(powerName, duration) {
        this.powerCooldowns.set(powerName, {
            startTime: Date.now(),
            duration: duration * 1000 // Convert to milliseconds
        });
    }

    // Get remaining cooldown time
    getRemainingCooldown(powerName) {
        const cooldown = this.powerCooldowns.get(powerName);
        if (!cooldown) return 0;
        
        const remaining = cooldown.duration - (Date.now() - cooldown.startTime);
        return Math.max(0, Math.ceil(remaining / 1000));
    }

    // Show power purchase effect
    showPowerPurchased(powerName) {
        const notification = document.createElement('div');
        notification.className = 'power-purchased';
        notification.textContent = `Power "${powerName}" purchased!`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
            padding: 10px 20px;
            border-radius: 5px;
            font-weight: bold;
            color: white;
            background: linear-gradient(45deg, #00ff00, #00cc00);
            box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    }

    // Show insufficient funds effect
    showInsufficientFunds(powerName, cost) {
        const notification = document.createElement('div');
        notification.className = 'power-insufficient';
        notification.textContent = `Insufficient xats! Need ${cost} xats for "${powerName}"`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
            padding: 10px 20px;
            border-radius: 5px;
            font-weight: bold;
            color: white;
            background: linear-gradient(45deg, #ff0000, #cc0000);
            box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    }

    // Process power command in message
    processPowerCommand(message, powerName) {
        // Look for power commands in the message
        const powerRegex = new RegExp(`\\/${powerName}\\b`, 'gi');
        if (powerRegex.test(message)) {
            return true;
        }
        return false;
    }

    // Apply power effects to message
    applyMessagePowerEffects(messageElement, powers) {
        if (!messageElement || !powers) return;

        const messageText = messageElement.textContent || messageElement.innerText;
        
        powers.forEach(power => {
            if (this.processPowerCommand(messageText, power.name)) {
                this.applyMessageEffect(messageElement, power.name);
            }
        });
    }

    // Clean up all effects
    cleanup() {
        this.activeEffects.forEach((effect, effectId) => {
            this.removeEffect(effectId);
        });
        this.activeEffects.clear();
        this.powerCooldowns.clear();
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PowerEffects;
} else {
    window.PowerEffects = PowerEffects;
}
