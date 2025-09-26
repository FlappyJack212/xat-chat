/**
 * PowerSystem - Manages xat.com style powers and effects
 * Handles power activation, effects, cooldowns, and visual feedback
 */

class PowerSystem {
    constructor(xatInterface) {
        this.xat = xatInterface;
        this.ownedPowers = new Set();
        this.activePowers = new Set();
        this.powerCooldowns = new Map();
        this.singleUsePowers = new Set(['rainbow', 'glow', 'sparkle', 'bounce', 'shake']);
        this.permanentPowers = new Set(['gold', 'emerald', 'diamond', 'everypower']);
        
        this.moduleName = 'PowerSystem';
        this.init();
    }

    init() {
        this.setupPowerDefinitions();
        this.setupPowerSlots();
        logger.debug(this.moduleName, 'Power system initialized');
    }

    /**
     * Define all available powers with their properties
     */
    setupPowerDefinitions() {
        this.powerDefinitions = {
            // Text Effect Powers
            rainbow: {
                name: 'Rainbow',
                icon: '🌈',
                type: 'text_effect',
                class: 'effect-rainbow',
                cost: 100,
                cooldown: 5000,
                singleUse: true,
                description: 'Makes your text rainbow colored'
            },
            glow: {
                name: 'Glow',
                icon: '✨',
                type: 'text_effect',
                class: 'effect-glow',
                cost: 75,
                cooldown: 3000,
                singleUse: true,
                description: 'Adds a glowing effect to your text'
            },
            sparkle: {
                name: 'Sparkle',
                icon: '💫',
                type: 'text_effect',
                class: 'effect-sparkle',
                cost: 50,
                cooldown: 2000,
                singleUse: true,
                description: 'Adds sparkles around your text'
            },
            bounce: {
                name: 'Bounce',
                icon: '⚡',
                type: 'text_effect',
                class: 'effect-bounce',
                cost: 25,
                cooldown: 1000,
                singleUse: true,
                description: 'Makes your text bounce'
            },
            shake: {
                name: 'Shake',
                icon: '📳',
                type: 'text_effect',
                class: 'effect-shake',
                cost: 25,
                cooldown: 1000,
                singleUse: true,
                description: 'Makes your text shake'
            },
            spin: {
                name: 'Spin',
                icon: '🌀',
                type: 'text_effect',
                class: 'effect-spin',
                cost: 50,
                cooldown: 2000,
                singleUse: true,
                description: 'Makes your text spin'
            },
            pulse: {
                name: 'Pulse',
                icon: '💓',
                type: 'text_effect',
                class: 'effect-pulse',
                cost: 30,
                cooldown: 1500,
                singleUse: true,
                description: 'Makes your text pulse'
            },
            neon: {
                name: 'Neon',
                icon: '⚡',
                type: 'text_effect',
                class: 'effect-neon',
                cost: 150,
                cooldown: 10000,
                singleUse: true,
                description: 'Neon light effect'
            },
            fire: {
                name: 'Fire',
                icon: '🔥',
                type: 'text_effect',
                class: 'effect-fire',
                cost: 200,
                cooldown: 15000,
                singleUse: true,
                description: 'Fire effect'
            },
            ice: {
                name: 'Ice',
                icon: '❄️',
                type: 'text_effect',
                class: 'effect-ice',
                cost: 200,
                cooldown: 15000,
                singleUse: true,
                description: 'Ice effect'
            },

            // Pawn Powers
            gold: {
                name: 'Gold Pawn',
                icon: '🟡',
                type: 'pawn',
                class: 'pawn-gold',
                cost: 1000,
                permanent: true,
                description: 'Golden pawn with glow effect'
            },
            emerald: {
                name: 'Emerald Pawn',
                icon: '🟢',
                type: 'pawn',
                class: 'pawn-emerald',
                cost: 2000,
                permanent: true,
                description: 'Emerald pawn with green glow'
            },
            ruby: {
                name: 'Ruby Pawn',
                icon: '🔴',
                type: 'pawn',
                class: 'pawn-ruby',
                cost: 2000,
                permanent: true,
                description: 'Ruby pawn with red glow'
            },
            sapphire: {
                name: 'Sapphire Pawn',
                icon: '🔵',
                type: 'pawn',
                class: 'pawn-sapphire',
                cost: 2000,
                permanent: true,
                description: 'Sapphire pawn with blue glow'
            },
            diamond: {
                name: 'Diamond Pawn',
                icon: '💎',
                type: 'pawn',
                class: 'pawn-diamond',
                cost: 5000,
                permanent: true,
                description: 'Diamond pawn with shine effect'
            },
            everypower: {
                name: 'Everypower',
                icon: '🌟',
                type: 'pawn',
                class: 'pawn-everypower',
                cost: 10000,
                permanent: true,
                description: 'All powers combined'
            },

            // Special Powers
            blast: {
                name: 'Blast',
                icon: '💥',
                type: 'special',
                cost: 500,
                cooldown: 30000,
                singleUse: true,
                description: 'Screen shake effect for everyone',
                action: 'blast_screen'
            },
            kiss: {
                name: 'Kiss',
                icon: '😘',
                type: 'social',
                cost: 10,
                cooldown: 1000,
                singleUse: true,
                description: 'Send a kiss to someone'
            },
            hug: {
                name: 'Hug',
                icon: '🤗',
                type: 'social',
                cost: 10,
                cooldown: 1000,
                singleUse: true,
                description: 'Send a hug to someone'
            }
        };
    }

    /**
     * Setup power slots in the UI
     */
    setupPowerSlots() {
        const powerSlots = document.querySelectorAll('.power-slot');
        powerSlots.forEach((slot, index) => {
            if (slot.dataset.power) {
                const power = this.powerDefinitions[slot.dataset.power];
                if (power) {
                    slot.innerHTML = power.icon;
                    slot.title = `${power.name} - ${power.description}`;
                }
            }
        });
    }

    /**
     * Set user's owned powers
     */
    setOwnedPowers(powers) {
        this.ownedPowers.clear();
        powers.forEach(power => {
            this.ownedPowers.add(power.name);
        });
        
        this.updatePowerSlotsAvailability();
        logger.debug(this.moduleName, 'Owned powers updated:', Array.from(this.ownedPowers));
    }

    /**
     * Update power slots to show which are available
     */
    updatePowerSlotsAvailability() {
        const powerSlots = document.querySelectorAll('.power-slot');
        powerSlots.forEach(slot => {
            const powerName = slot.dataset.power;
            if (powerName) {
                const isOwned = this.ownedPowers.has(powerName);
                const isOnCooldown = this.powerCooldowns.has(powerName);
                
                slot.classList.toggle('owned', isOwned);
                slot.classList.toggle('locked', !isOwned);
                slot.classList.toggle('power-cooldown', isOnCooldown);
            }
        });
    }

    /**
     * Activate a power
     */
    activatePower(powerName) {
        const power = this.powerDefinitions[powerName];
        if (!power) {
            logger.warn(this.moduleName, 'Unknown power:', powerName);
            return false;
        }

        // Check if user owns the power
        if (!this.ownedPowers.has(powerName)) {
            this.showPowerNotOwnedMessage(powerName);
            return false;
        }

        // Check cooldown
        if (this.powerCooldowns.has(powerName)) {
            this.showPowerOnCooldownMessage(powerName);
            return false;
        }

        // Activate the power
        if (power.type === 'text_effect') {
            this.activateTextEffect(powerName);
        } else if (power.type === 'pawn') {
            this.activatePawn(powerName);
        } else if (power.type === 'special') {
            this.activateSpecialPower(powerName);
        }

        // Apply cooldown
        if (power.cooldown) {
            this.applyCooldown(powerName, power.cooldown);
        }

        // Visual feedback
        this.showPowerActivationEffect(powerName);

        logger.debug(this.moduleName, 'Power activated:', powerName);
        return true;
    }

    /**
     * Activate text effect power
     */
    activateTextEffect(powerName) {
        const power = this.powerDefinitions[powerName];
        
        if (power.singleUse) {
            // Single use - applies to next message only
            this.activePowers.add(powerName);
        } else {
            // Toggle permanent effect
            if (this.activePowers.has(powerName)) {
                this.activePowers.delete(powerName);
            } else {
                this.activePowers.add(powerName);
            }
        }

        this.updateActivePowersDisplay();
    }

    /**
     * Activate pawn power
     */
    activatePawn(powerName) {
        // Set user's current pawn
        if (this.xat.currentUser) {
            this.xat.currentUser.pawn = powerName;
            this.xat.pawnSystem.updateUserPawn(powerName);
        }

        // Update in backend
        this.updateUserPawn(powerName);
    }

    /**
     * Activate special power
     */
    activateSpecialPower(powerName) {
        const power = this.powerDefinitions[powerName];
        
        switch (power.action) {
            case 'blast_screen':
                this.performBlastEffect();
                break;
            default:
                this.activePowers.add(powerName);
        }
    }

    /**
     * Process message with active power effects
     */
    processMessage(text) {
        if (this.activePowers.size === 0) {
            return text;
        }

        // Create wrapper with power effects
        const effects = Array.from(this.activePowers).map(powerName => {
            const power = this.powerDefinitions[powerName];
            return power ? power.class : '';
        }).filter(Boolean);

        if (effects.length > 0) {
            return `<span class="power-effect ${effects.join(' ')}">${SecurityUtils.escapeHTML(text)}</span>`;
        }

        return text;
    }

    /**
     * Clear single-use powers after message is sent
     */
    clearSingleUsePowers() {
        for (const powerName of this.activePowers) {
            const power = this.powerDefinitions[powerName];
            if (power && power.singleUse) {
                this.activePowers.delete(powerName);
            }
        }
        this.updateActivePowersDisplay();
    }

    /**
     * Handle power used by another user
     */
    handlePowerUsed(data) {
        const { user, power, target } = data;
        
        switch (power) {
            case 'blast':
                this.performBlastEffect();
                break;
            case 'kiss':
                this.showSocialPowerEffect(user, power, target);
                break;
            case 'hug':
                this.showSocialPowerEffect(user, power, target);
                break;
        }
    }

    /**
     * Apply cooldown to a power
     */
    applyCooldown(powerName, duration) {
        this.powerCooldowns.set(powerName, Date.now() + duration);
        
        // Remove cooldown after duration
        setTimeout(() => {
            this.powerCooldowns.delete(powerName);
            this.updatePowerSlotsAvailability();
        }, duration);

        this.updatePowerSlotsAvailability();
    }

    /**
     * Update active powers display
     */
    updateActivePowersDisplay() {
        const powerSlots = document.querySelectorAll('.power-slot');
        powerSlots.forEach(slot => {
            const powerName = slot.dataset.power;
            if (powerName) {
                const isActive = this.activePowers.has(powerName);
                slot.classList.toggle('active', isActive);
            }
        });
    }

    /**
     * Show power activation visual effect
     */
    showPowerActivationEffect(powerName) {
        const slot = document.querySelector(`[data-power="${powerName}"]`);
        if (slot) {
            slot.classList.add('power-activation');
            setTimeout(() => {
                slot.classList.remove('power-activation');
            }, 600);
        }
    }

    /**
     * Perform blast screen effect
     */
    performBlastEffect() {
        const blastOverlay = document.createElement('div');
        blastOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
            pointer-events: none;
            z-index: 9999;
            animation: blast 1s ease-out;
        `;

        document.body.appendChild(blastOverlay);

        // Add screen shake
        document.body.style.animation = 'shake 0.5s ease-in-out';

        setTimeout(() => {
            document.body.removeChild(blastOverlay);
            document.body.style.animation = '';
        }, 1000);
    }

    /**
     * Show social power effect
     */
    showSocialPowerEffect(user, power, target) {
        const effect = document.createElement('div');
        effect.className = 'social-power-effect';
        effect.textContent = `${user.username} sent a ${power} to ${target ? target.username : 'everyone'}!`;
        
        if (this.xat.elements.chatMessages) {
            this.xat.elements.chatMessages.appendChild(effect);
            this.xat.elements.chatMessages.scrollTop = this.xat.elements.chatMessages.scrollHeight;
        }

        setTimeout(() => {
            if (effect.parentNode) {
                effect.parentNode.removeChild(effect);
            }
        }, 5000);
    }

    /**
     * Show power not owned message
     */
    showPowerNotOwnedMessage(powerName) {
        const power = this.powerDefinitions[powerName];
        this.xat.chatSystem?.addSystemMessage(`You don't own the ${power.name} power. Visit the store to purchase it!`);
    }

    /**
     * Show power on cooldown message
     */
    showPowerOnCooldownMessage(powerName) {
        const remainingTime = Math.ceil((this.powerCooldowns.get(powerName) - Date.now()) / 1000);
        this.xat.chatSystem?.addSystemMessage(`${powerName} is on cooldown for ${remainingTime} more seconds.`);
    }

    /**
     * Update user pawn in backend
     */
    async updateUserPawn(pawnName) {
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
                throw new Error('Failed to update pawn');
            }
        } catch (error) {
            logger.error(this.moduleName, 'Failed to update user pawn:', error);
        }
    }
}

// Make available globally
if (typeof window !== 'undefined') {
    window.PowerSystem = PowerSystem;
}