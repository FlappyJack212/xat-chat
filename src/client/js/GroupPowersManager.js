/**
 * Group Powers Management System
 * Handles group creation, management, and advanced moderation features
 */

class GroupPowersManager {
    constructor() {
        this.currentGroup = null;
        this.groupSettings = {};
        this.moderationRules = new Map();
        this.autoModerationEnabled = false;
        this.moderationLog = [];
        this.isInitialized = false;
        
        // Group power categories
        this.groupPowerCategories = {
            'management': 'Group Management',
            'moderation': 'Moderation Tools',
            'appearance': 'Appearance & Themes',
            'features': 'Special Features',
            'security': 'Security & Privacy',
            'entertainment': 'Games & Entertainment'
        };
        
        this.init();
    }

    /**
     * Initialize the group powers manager
     */
    async init() {
        try {
            await this.loadGroupSettings();
            await this.loadModerationRules();
            this.setupEventListeners();
            this.isInitialized = true;
            console.log('👥 [GROUP] Group powers manager initialized');
        } catch (error) {
            console.error('👥 [GROUP] Failed to initialize group powers manager:', error);
        }
    }

    /**
     * Load group settings from storage
     */
    async loadGroupSettings() {
        try {
            const settings = localStorage.getItem('groupSettings');
            if (settings) {
                this.groupSettings = JSON.parse(settings);
            } else {
                this.groupSettings = this.getDefaultGroupSettings();
            }
        } catch (error) {
            console.warn('👥 [GROUP] Failed to load group settings:', error);
            this.groupSettings = this.getDefaultGroupSettings();
        }
    }

    /**
     * Get default group settings
     */
    getDefaultGroupSettings() {
        return {
            name: 'Main Chat',
            description: 'Welcome to our chat group!',
            password: '',
            isPrivate: false,
            maxUsers: 100,
            allowGuests: true,
            allowRegistration: true,
            autoModeration: false,
            profanityFilter: true,
            spamProtection: true,
            floodProtection: true,
            capsProtection: true,
            linkProtection: false,
            imageModeration: false,
            voiceChat: false,
            gamesEnabled: true,
            powersEnabled: true,
            customSmilies: true,
            background: 'default',
            theme: 'default',
            language: 'en',
            timezone: 'UTC',
            rules: [
                'Be respectful to other users',
                'No spam or flooding',
                'No inappropriate content',
                'Follow moderator instructions'
            ],
            moderators: [],
            bannedUsers: [],
            mutedUsers: [],
            warnings: {},
            statistics: {
                totalMessages: 0,
                totalUsers: 0,
                createdDate: new Date().toISOString(),
                lastActivity: new Date().toISOString()
            }
        };
    }

    /**
     * Load moderation rules
     */
    async loadModerationRules() {
        try {
            const rules = localStorage.getItem('moderationRules');
            if (rules) {
                this.moderationRules = new Map(JSON.parse(rules));
            } else {
                this.moderationRules = this.getDefaultModerationRules();
            }
        } catch (error) {
            console.warn('👥 [GROUP] Failed to load moderation rules:', error);
            this.moderationRules = this.getDefaultModerationRules();
        }
    }

    /**
     * Get default moderation rules
     */
    getDefaultModerationRules() {
        const rules = new Map();
        
        // Spam protection
        rules.set('spam', {
            enabled: true,
            maxMessagesPerMinute: 5,
            maxSimilarMessages: 3,
            action: 'mute',
            duration: 300, // 5 minutes
            message: 'Spam detected. You have been muted for 5 minutes.'
        });

        // Flood protection
        rules.set('flood', {
            enabled: true,
            maxCharactersPerMessage: 500,
            maxCapsPercentage: 70,
            action: 'warn',
            message: 'Please reduce the length of your message and avoid excessive caps.'
        });

        // Profanity filter
        rules.set('profanity', {
            enabled: true,
            wordList: ['badword1', 'badword2'], // Would be loaded from server
            action: 'warn',
            message: 'Please use appropriate language.'
        });

        // Link protection
        rules.set('links', {
            enabled: false,
            allowedDomains: [],
            action: 'delete',
            message: 'Links are not allowed in this chat.'
        });

        return rules;
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Listen for group power activations
        window.addEventListener('activateGroupPower', (event) => {
            this.handleGroupPowerActivation(event.detail);
        });

        // Listen for moderation commands
        window.addEventListener('moderationCommand', (event) => {
            this.handleModerationCommand(event.detail);
        });

        // Listen for group settings changes
        window.addEventListener('groupSettingsChanged', (event) => {
            this.updateGroupSettings(event.detail);
        });
    }

    /**
     * Handle group power activation
     */
    async handleGroupPowerActivation(powerData) {
        try {
            const { powerName, targetUser, parameters } = powerData;
            
            switch (powerName) {
                case 'gcontrol':
                    await this.handleGroupControl(parameters);
                    break;
                case 'gline':
                    await this.handleGroupLine(parameters);
                    break;
                case 'gkaoani':
                    await this.handleGroupKaoani(parameters);
                    break;
                case 'gkbear':
                    await this.handleGroupKbear(parameters);
                    break;
                case 'gscol':
                    await this.handleGroupScol(parameters);
                    break;
                case 'blastban':
                    await this.handleBlastBan(targetUser, parameters);
                    break;
                case 'blastkick':
                    await this.handleBlastKick(targetUser, parameters);
                    break;
                case 'blastpro':
                    await this.handleBlastPromote(targetUser, parameters);
                    break;
                case 'banish':
                    await this.handleBanish(targetUser, parameters);
                    break;
                case 'bump':
                    await this.handleBump(targetUser, parameters);
                    break;
                case 'rapid':
                    await this.handleRapid(parameters);
                    break;
                default:
                    console.warn('👥 [GROUP] Unknown group power:', powerName);
            }
        } catch (error) {
            console.error('👥 [GROUP] Failed to handle group power activation:', error);
        }
    }

    /**
     * Handle group control power
     */
    async handleGroupControl(parameters) {
        const { setting, value } = parameters;
        
        switch (setting) {
            case 'autoModeration':
                this.groupSettings.autoModeration = value;
                this.autoModerationEnabled = value;
                break;
            case 'profanityFilter':
                this.groupSettings.profanityFilter = value;
                break;
            case 'spamProtection':
                this.groupSettings.spamProtection = value;
                break;
            case 'floodProtection':
                this.groupSettings.floodProtection = value;
                break;
            case 'capsProtection':
                this.groupSettings.capsProtection = value;
                break;
            case 'linkProtection':
                this.groupSettings.linkProtection = value;
                break;
            case 'imageModeration':
                this.groupSettings.imageModeration = value;
                break;
            case 'voiceChat':
                this.groupSettings.voiceChat = value;
                break;
            case 'gamesEnabled':
                this.groupSettings.gamesEnabled = value;
                break;
            case 'powersEnabled':
                this.groupSettings.powersEnabled = value;
                break;
            case 'customSmilies':
                this.groupSettings.customSmilies = value;
                break;
        }
        
        await this.saveGroupSettings();
        this.emitGroupSettingsChanged();
    }

    /**
     * Handle group line power
     */
    async handleGroupLine(parameters) {
        const { lineType, content } = parameters;
        
        // Add custom line to group
        if (!this.groupSettings.customLines) {
            this.groupSettings.customLines = [];
        }
        
        this.groupSettings.customLines.push({
            type: lineType,
            content: content,
            timestamp: new Date().toISOString()
        });
        
        await this.saveGroupSettings();
        this.emitGroupSettingsChanged();
    }

    /**
     * Handle group kaoani power
     */
    async handleGroupKaoani(parameters) {
        const { animationType, targetUser } = parameters;
        
        // Apply kaoani animation to target user
        this.emitAnimationEffect({
            type: 'kaoani',
            animation: animationType,
            target: targetUser
        });
    }

    /**
     * Handle group kbear power
     */
    async handleGroupKbear(parameters) {
        const { bearType, targetUser } = parameters;
        
        // Apply kbear effect to target user
        this.emitAnimationEffect({
            type: 'kbear',
            bear: bearType,
            target: targetUser
        });
    }

    /**
     * Handle group scol power
     */
    async handleGroupScol(parameters) {
        const { color, targetUser } = parameters;
        
        // Apply scol color effect to target user
        this.emitAnimationEffect({
            type: 'scol',
            color: color,
            target: targetUser
        });
    }

    /**
     * Handle blast ban power
     */
    async handleBlastBan(targetUser, parameters) {
        const { duration, reason } = parameters;
        
        // Ban user with blast effect
        this.emitModerationAction({
            action: 'ban',
            target: targetUser,
            duration: duration,
            reason: reason,
            effect: 'blast'
        });
    }

    /**
     * Handle blast kick power
     */
    async handleBlastKick(targetUser, parameters) {
        const { reason } = parameters;
        
        // Kick user with blast effect
        this.emitModerationAction({
            action: 'kick',
            target: targetUser,
            reason: reason,
            effect: 'blast'
        });
    }

    /**
     * Handle blast promote power
     */
    async handleBlastPromote(targetUser, parameters) {
        const { newRank } = parameters;
        
        // Promote user with blast effect
        this.emitModerationAction({
            action: 'promote',
            target: targetUser,
            newRank: newRank,
            effect: 'blast'
        });
    }

    /**
     * Handle banish power
     */
    async handleBanish(targetUser, parameters) {
        const { duration, reason } = parameters;
        
        // Banish user (temporary ban with special effect)
        this.emitModerationAction({
            action: 'banish',
            target: targetUser,
            duration: duration,
            reason: reason,
            effect: 'banish'
        });
    }

    /**
     * Handle bump power
     */
    async handleBump(targetUser, parameters) {
        const { intensity } = parameters;
        
        // Bump user (move them around)
        this.emitAnimationEffect({
            type: 'bump',
            target: targetUser,
            intensity: intensity
        });
    }

    /**
     * Handle rapid power
     */
    async handleRapid(parameters) {
        const { speed, duration } = parameters;
        
        // Apply rapid effect to chat
        this.emitAnimationEffect({
            type: 'rapid',
            speed: speed,
            duration: duration
        });
    }

    /**
     * Handle moderation command
     */
    async handleModerationCommand(commandData) {
        try {
            const { command, targetUser, parameters } = commandData;
            
            switch (command) {
                case 'kick':
                    await this.kickUser(targetUser, parameters);
                    break;
                case 'ban':
                    await this.banUser(targetUser, parameters);
                    break;
                case 'mute':
                    await this.muteUser(targetUser, parameters);
                    break;
                case 'unmute':
                    await this.unmuteUser(targetUser, parameters);
                    break;
                case 'warn':
                    await this.warnUser(targetUser, parameters);
                    break;
                case 'promote':
                    await this.promoteUser(targetUser, parameters);
                    break;
                case 'demote':
                    await this.demoteUser(targetUser, parameters);
                    break;
                case 'kickall':
                    await this.kickAllUsers(parameters);
                    break;
                case 'hush':
                    await this.hushChat(parameters);
                    break;
                case 'ranklock':
                    await this.lockRanks(parameters);
                    break;
                case 'tempmod':
                    await this.tempMod(targetUser, parameters);
                    break;
                case 'sinbin':
                    await this.sinbin(targetUser, parameters);
                    break;
                case 'gag':
                    await this.gagUser(targetUser, parameters);
                    break;
                default:
                    console.warn('👥 [GROUP] Unknown moderation command:', command);
            }
        } catch (error) {
            console.error('👥 [GROUP] Failed to handle moderation command:', error);
        }
    }

    /**
     * Kick user
     */
    async kickUser(targetUser, parameters) {
        const { reason } = parameters;
        
        this.logModerationAction('kick', targetUser, { reason });
        
        this.emitModerationAction({
            action: 'kick',
            target: targetUser,
            reason: reason
        });
    }

    /**
     * Ban user
     */
    async banUser(targetUser, parameters) {
        const { duration, reason } = parameters;
        
        this.logModerationAction('ban', targetUser, { duration, reason });
        
        this.emitModerationAction({
            action: 'ban',
            target: targetUser,
            duration: duration,
            reason: reason
        });
    }

    /**
     * Mute user
     */
    async muteUser(targetUser, parameters) {
        const { duration, reason } = parameters;
        
        this.logModerationAction('mute', targetUser, { duration, reason });
        
        this.emitModerationAction({
            action: 'mute',
            target: targetUser,
            duration: duration,
            reason: reason
        });
    }

    /**
     * Unmute user
     */
    async unmuteUser(targetUser, parameters) {
        this.logModerationAction('unmute', targetUser, parameters);
        
        this.emitModerationAction({
            action: 'unmute',
            target: targetUser
        });
    }

    /**
     * Warn user
     */
    async warnUser(targetUser, parameters) {
        const { reason } = parameters;
        
        this.logModerationAction('warn', targetUser, { reason });
        
        this.emitModerationAction({
            action: 'warn',
            target: targetUser,
            reason: reason
        });
    }

    /**
     * Promote user
     */
    async promoteUser(targetUser, parameters) {
        const { newRank } = parameters;
        
        this.logModerationAction('promote', targetUser, { newRank });
        
        this.emitModerationAction({
            action: 'promote',
            target: targetUser,
            newRank: newRank
        });
    }

    /**
     * Demote user
     */
    async demoteUser(targetUser, parameters) {
        const { newRank } = parameters;
        
        this.logModerationAction('demote', targetUser, { newRank });
        
        this.emitModerationAction({
            action: 'demote',
            target: targetUser,
            newRank: newRank
        });
    }

    /**
     * Kick all users
     */
    async kickAllUsers(parameters) {
        const { reason } = parameters;
        
        this.logModerationAction('kickall', null, { reason });
        
        this.emitModerationAction({
            action: 'kickall',
            reason: reason
        });
    }

    /**
     * Hush chat (silence all users)
     */
    async hushChat(parameters) {
        const { duration } = parameters;
        
        this.logModerationAction('hush', null, { duration });
        
        this.emitModerationAction({
            action: 'hush',
            duration: duration
        });
    }

    /**
     * Lock ranks (prevent rank changes)
     */
    async lockRanks(parameters) {
        const { locked } = parameters;
        
        this.groupSettings.ranksLocked = locked;
        await this.saveGroupSettings();
        
        this.emitGroupSettingsChanged();
    }

    /**
     * Temporary moderator
     */
    async tempMod(targetUser, parameters) {
        const { duration } = parameters;
        
        this.logModerationAction('tempmod', targetUser, { duration });
        
        this.emitModerationAction({
            action: 'tempmod',
            target: targetUser,
            duration: duration
        });
    }

    /**
     * Sinbin (temporary ban)
     */
    async sinbin(targetUser, parameters) {
        const { duration, reason } = parameters;
        
        this.logModerationAction('sinbin', targetUser, { duration, reason });
        
        this.emitModerationAction({
            action: 'sinbin',
            target: targetUser,
            duration: duration,
            reason: reason
        });
    }

    /**
     * Gag user (prevent from typing)
     */
    async gagUser(targetUser, parameters) {
        const { duration, reason } = parameters;
        
        this.logModerationAction('gag', targetUser, { duration, reason });
        
        this.emitModerationAction({
            action: 'gag',
            target: targetUser,
            duration: duration,
            reason: reason
        });
    }

    /**
     * Log moderation action
     */
    logModerationAction(action, targetUser, parameters) {
        const logEntry = {
            action: action,
            target: targetUser,
            parameters: parameters,
            timestamp: new Date().toISOString(),
            moderator: this.getCurrentUser()
        };
        
        this.moderationLog.unshift(logEntry);
        
        // Keep only last 1000 entries
        if (this.moderationLog.length > 1000) {
            this.moderationLog = this.moderationLog.slice(0, 1000);
        }
        
        // Save to storage
        this.saveModerationLog();
    }

    /**
     * Get current user
     */
    getCurrentUser() {
        // This would get the current user from the auth system
        return {
            id: 'current_user',
            username: 'CurrentUser',
            rank: 'moderator'
        };
    }

    /**
     * Save moderation log
     */
    async saveModerationLog() {
        try {
            localStorage.setItem('moderationLog', JSON.stringify(this.moderationLog));
        } catch (error) {
            console.warn('👥 [GROUP] Failed to save moderation log:', error);
        }
    }

    /**
     * Save group settings
     */
    async saveGroupSettings() {
        try {
            localStorage.setItem('groupSettings', JSON.stringify(this.groupSettings));
        } catch (error) {
            console.warn('👥 [GROUP] Failed to save group settings:', error);
        }
    }

    /**
     * Update group settings
     */
    async updateGroupSettings(newSettings) {
        this.groupSettings = { ...this.groupSettings, ...newSettings };
        await this.saveGroupSettings();
        this.emitGroupSettingsChanged();
    }

    /**
     * Emit group settings changed event
     */
    emitGroupSettingsChanged() {
        const event = new CustomEvent('groupSettingsChanged', {
            detail: this.groupSettings
        });
        window.dispatchEvent(event);
    }

    /**
     * Emit moderation action event
     */
    emitModerationAction(actionData) {
        const event = new CustomEvent('moderationAction', {
            detail: actionData
        });
        window.dispatchEvent(event);
    }

    /**
     * Emit animation effect event
     */
    emitAnimationEffect(effectData) {
        const event = new CustomEvent('animationEffect', {
            detail: effectData
        });
        window.dispatchEvent(event);
    }

    /**
     * Get group settings
     */
    getGroupSettings() {
        return this.groupSettings;
    }

    /**
     * Get moderation rules
     */
    getModerationRules() {
        return this.moderationRules;
    }

    /**
     * Get moderation log
     */
    getModerationLog() {
        return this.moderationLog;
    }

    /**
     * Check if user can perform moderation action
     */
    canModerate(action, targetUser) {
        const currentUser = this.getCurrentUser();
        
        // Check rank requirements
        if (action === 'kick' && currentUser.rank < 'moderator') {
            return false;
        }
        
        if (action === 'ban' && currentUser.rank < 'moderator') {
            return false;
        }
        
        if (action === 'promote' && currentUser.rank < 'owner') {
            return false;
        }
        
        if (action === 'kickall' && currentUser.rank < 'owner') {
            return false;
        }
        
        // Check if target user has higher or equal rank
        if (targetUser && targetUser.rank >= currentUser.rank) {
            return false;
        }
        
        return true;
    }

    /**
     * Get available group powers
     */
    getAvailableGroupPowers() {
        return [
            {
                id: 'gcontrol',
                name: 'Group Control',
                description: 'Control group settings and features',
                category: 'management',
                cost: 100,
                requirements: { rank: 'owner' }
            },
            {
                id: 'gline',
                name: 'Group Line',
                description: 'Add custom lines to group',
                category: 'appearance',
                cost: 50,
                requirements: { rank: 'moderator' }
            },
            {
                id: 'gkaoani',
                name: 'Group Kaoani',
                description: 'Apply kaoani animations',
                category: 'entertainment',
                cost: 75,
                requirements: { rank: 'moderator' }
            },
            {
                id: 'gkbear',
                name: 'Group Kbear',
                description: 'Apply kbear effects',
                category: 'entertainment',
                cost: 75,
                requirements: { rank: 'moderator' }
            },
            {
                id: 'gscol',
                name: 'Group Scol',
                description: 'Apply scol color effects',
                category: 'appearance',
                cost: 50,
                requirements: { rank: 'moderator' }
            },
            {
                id: 'blastban',
                name: 'Blast Ban',
                description: 'Ban user with blast effect',
                category: 'moderation',
                cost: 200,
                requirements: { rank: 'moderator' }
            },
            {
                id: 'blastkick',
                name: 'Blast Kick',
                description: 'Kick user with blast effect',
                category: 'moderation',
                cost: 150,
                requirements: { rank: 'moderator' }
            },
            {
                id: 'blastpro',
                name: 'Blast Promote',
                description: 'Promote user with blast effect',
                category: 'moderation',
                cost: 300,
                requirements: { rank: 'owner' }
            },
            {
                id: 'banish',
                name: 'Banish',
                description: 'Banish user with special effect',
                category: 'moderation',
                cost: 250,
                requirements: { rank: 'moderator' }
            },
            {
                id: 'bump',
                name: 'Bump',
                description: 'Bump user around',
                category: 'entertainment',
                cost: 25,
                requirements: { rank: 'moderator' }
            },
            {
                id: 'rapid',
                name: 'Rapid',
                description: 'Apply rapid effect to chat',
                category: 'entertainment',
                cost: 100,
                requirements: { rank: 'moderator' }
            }
        ];
    }

    /**
     * Destroy the manager
     */
    destroy() {
        this.moderationRules.clear();
        this.moderationLog = [];
        this.groupSettings = {};
        this.currentGroup = null;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GroupPowersManager;
} else if (typeof window !== 'undefined') {
    window.GroupPowersManager = GroupPowersManager;
    console.log('✅ [GROUP] GroupPowersManager class loaded');
}
