const mongoose = require('mongoose');

const userPowerSchema = new mongoose.Schema({
    // User and Power references
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    power: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Power',
        required: true
    },
    
    // Purchase information
    purchasedAt: {
        type: Date,
        default: Date.now
    },
    purchasedFor: {
        type: Number,
        required: true
    },
    purchasedFrom: {
        type: String,
        enum: ['store', 'gift', 'transfer', 'reward', 'admin'],
        default: 'store'
    },
    
    // Power status and usage
    active: {
        type: Boolean,
        default: true
    },
    usageCount: {
        type: Number,
        default: 0
    },
    lastUsed: {
        type: Date,
        default: null
    },
    
    // Power expiration and limitations
    expiresAt: {
        type: Date,
        default: null
    },
    maxUses: {
        type: Number,
        default: -1 // -1 means unlimited
    },
    
    // Power customization
    customName: {
        type: String,
        default: ''
    },
    customDescription: {
        type: String,
        default: ''
    },
    
    // Power settings and configuration
    settings: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },
    
    // Power cooldowns
    cooldown: {
        lastActivation: {
            type: Date,
            default: null
        },
        duration: {
            type: Number,
            default: 0 // in seconds
        }
    },
    
    // Power sharing and permissions
    shareable: {
        type: Boolean,
        default: false
    },
    sharedWith: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        sharedAt: {
            type: Date,
            default: Date.now
        },
        permissions: [{
            type: String,
            enum: ['use', 'configure', 'share']
        }]
    }],
    
    // Power history and logs
    history: [{
        action: {
            type: String,
            enum: ['purchased', 'activated', 'deactivated', 'configured', 'shared', 'expired']
        },
        timestamp: {
            type: Date,
            default: Date.now
        },
        details: mongoose.Schema.Types.Mixed
    }],
    
    // Power metadata
    notes: {
        type: String,
        default: ''
    },
    tags: [String],
    
    // Power status flags
    flags: {
        featured: { type: Boolean, default: false },
        hidden: { type: Boolean, default: false },
        locked: { type: Boolean, default: false },
        maintenance: { type: Boolean, default: false }
    }
}, {
    timestamps: true
});

// Compound index for unique user-power combinations
userPowerSchema.index({ user: 1, power: 1 }, { unique: true });

// Indexes for performance
userPowerSchema.index({ user: 1, active: 1 });
userPowerSchema.index({ power: 1, active: 1 });
userPowerSchema.index({ expiresAt: 1 });
userPowerSchema.index({ 'flags.hidden': 1 });
userPowerSchema.index({ purchasedAt: -1 });

// Instance methods
userPowerSchema.methods.isExpired = function() {
    return this.expiresAt && this.expiresAt < new Date();
};

userPowerSchema.methods.canUse = function() {
    if (!this.active) return false;
    if (this.isExpired()) return false;
    if (this.flags.locked) return false;
    if (this.flags.maintenance) return false;
    if (this.maxUses > 0 && this.usageCount >= this.maxUses) return false;
    
    // Check cooldown
    if (this.cooldown.duration > 0 && this.cooldown.lastActivation) {
        const timeSinceLastUse = (new Date() - this.cooldown.lastActivation) / 1000;
        if (timeSinceLastUse < this.cooldown.duration) return false;
    }
    
    return true;
};

userPowerSchema.methods.use = function() {
    if (!this.canUse()) {
        throw new Error('Power cannot be used at this time');
    }
    
    this.usageCount++;
    this.lastUsed = new Date();
    this.cooldown.lastActivation = new Date();
    
    // Add to history
    this.history.push({
        action: 'activated',
        timestamp: new Date(),
        details: { usageCount: this.usageCount }
    });
    
    return this.save();
};

userPowerSchema.methods.activate = function() {
    return this.use();
};

userPowerSchema.methods.deactivate = function() {
    this.active = false;
    
    this.history.push({
        action: 'deactivated',
        timestamp: new Date(),
        details: { reason: 'manual' }
    });
    
    return this.save();
};

userPowerSchema.methods.reactivate = function() {
    this.active = true;
    
    this.history.push({
        action: 'activated',
        timestamp: new Date(),
        details: { reason: 'manual' }
    });
    
    return this.save();
};

userPowerSchema.methods.extend = function(duration) {
    if (this.expiresAt) {
        this.expiresAt = new Date(this.expiresAt.getTime() + duration * 1000);
    } else {
        this.expiresAt = new Date(Date.now() + duration * 1000);
    }
    
    this.history.push({
        action: 'extended',
        timestamp: new Date(),
        details: { duration: duration }
    });
    
    return this.save();
};

userPowerSchema.methods.share = function(targetUser, permissions = ['use']) {
    if (!this.shareable) {
        throw new Error('This power cannot be shared');
    }
    
    // Check if already shared with this user
    const existingShare = this.sharedWith.find(share => 
        share.user.toString() === targetUser._id.toString()
    );
    
    if (existingShare) {
        // Update permissions
        existingShare.permissions = permissions;
        existingShare.sharedAt = new Date();
    } else {
        // Add new share
        this.sharedWith.push({
            user: targetUser._id,
            sharedAt: new Date(),
            permissions: permissions
        });
    }
    
    this.history.push({
        action: 'shared',
        timestamp: new Date(),
        details: { 
            targetUser: targetUser.username,
            permissions: permissions
        }
    });
    
    return this.save();
};

userPowerSchema.methods.unshare = function(targetUserId) {
    this.sharedWith = this.sharedWith.filter(share => 
        share.user.toString() !== targetUserId.toString()
    );
    
    this.history.push({
        action: 'unshared',
        timestamp: new Date(),
        details: { targetUserId: targetUserId }
    });
    
    return this.save();
};

userPowerSchema.methods.configure = function(newSettings) {
    this.settings = { ...this.settings, ...newSettings };
    
    this.history.push({
        action: 'configured',
        timestamp: new Date(),
        details: { settings: newSettings }
    });
    
    return this.save();
};

userPowerSchema.methods.getCooldownRemaining = function() {
    if (!this.cooldown.duration || !this.cooldown.lastActivation) return 0;
    
    const timeSinceLastUse = (new Date() - this.cooldown.lastActivation) / 1000;
    const remaining = this.cooldown.duration - timeSinceLastUse;
    
    return Math.max(0, remaining);
};

// Static methods
userPowerSchema.statics.findByUser = function(userId, options = {}) {
    const query = { user: userId };
    
    if (options.active !== undefined) {
        query.active = options.active;
    }
    
    if (options.power) {
        query.power = options.power;
    }
    
    return this.find(query)
        .populate('power', 'name description cost effects')
        .sort({ purchasedAt: -1 });
};

userPowerSchema.statics.findActiveByUser = function(userId) {
    return this.find({
        user: userId,
        active: true,
        $or: [
            { expiresAt: null },
            { expiresAt: { $gt: new Date() } }
        ]
    }).populate('power', 'name description cost effects');
};

userPowerSchema.statics.findExpiredByUser = function(userId) {
    return this.find({
        user: userId,
        expiresAt: { $lt: new Date() }
    }).populate('power', 'name description cost effects');
};

userPowerSchema.statics.findByPower = function(powerId, options = {}) {
    const query = { power: powerId };
    
    if (options.active !== undefined) {
        query.active = options.active;
    }
    
    return this.find(query)
        .populate('user', 'username rank avatar')
        .sort({ purchasedAt: -1 });
};

userPowerSchema.statics.getUserPowerStats = async function(userId) {
    const stats = await this.aggregate([
        { $match: { user: mongoose.Types.ObjectId(userId) } },
        {
            $group: {
                _id: null,
                totalPowers: { $sum: 1 },
                activePowers: { $sum: { $cond: ['$active', 1, 0] } },
                totalSpent: { $sum: '$purchasedFor' },
                totalUsage: { $sum: '$usageCount' },
                uniquePowers: { $addToSet: '$power' }
            }
        },
        {
            $project: {
                totalPowers: 1,
                activePowers: 1,
                totalSpent: 1,
                totalUsage: 1,
                uniquePowerCount: { $size: '$uniquePowers' }
            }
        }
    ]);
    
    return stats[0] || {
        totalPowers: 0,
        activePowers: 0,
        totalSpent: 0,
        totalUsage: 0,
        uniquePowerCount: 0
    };
};

// Virtual fields
userPowerSchema.virtual('isExpiredVirtual').get(function() {
    return this.isExpired();
});

userPowerSchema.virtual('canUseVirtual').get(function() {
    return this.canUse();
});

userPowerSchema.virtual('cooldownRemainingVirtual').get(function() {
    return this.getCooldownRemaining();
});

userPowerSchema.virtual('timeUntilExpiry').get(function() {
    if (!this.expiresAt) return null;
    return Math.max(0, this.expiresAt - new Date());
});

// JSON serialization
userPowerSchema.methods.toJSON = function() {
    const userPower = this.toObject();
    userPower.isExpired = this.isExpired();
    userPower.canUse = this.canUse();
    userPower.cooldownRemaining = this.getCooldownRemaining();
    userPower.timeUntilExpiry = this.timeUntilExpiry;
    return userPower;
};

module.exports = mongoose.model('UserPower', userPowerSchema);
