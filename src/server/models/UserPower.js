/**
 * UserPower Model
 * Represents powers owned by users
 */

const mongoose = require('mongoose');

const userPowerSchema = new mongoose.Schema({
    // Relationships
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    powerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Power',
        required: true
    },

    // Power ownership details
    count: {
        type: Number,
        default: 1,
        min: 0
    },

    purchased: {
        type: Date,
        default: Date.now
    },

    // For limited edition powers
    expiresAt: {
        type: Date,
        default: null
    },

    // Usage tracking
    lastUsed: {
        type: Date,
        default: null
    },

    totalUses: {
        type: Number,
        default: 0
    },

    // Power status
    isActive: {
        type: Boolean,
        default: true
    },

    // For transferable powers
    isTransferable: {
        type: Boolean,
        default: true
    },

    // Metadata
    metadata: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    }
}, {
    timestamps: true
});

// Indexes for performance
userPowerSchema.index({ userId: 1, powerId: 1 }, { unique: true });
userPowerSchema.index({ userId: 1 });
userPowerSchema.index({ powerId: 1 });
userPowerSchema.index({ expiresAt: 1 });
userPowerSchema.index({ isActive: 1 });

// Instance methods
userPowerSchema.methods.use = function() {
    if (this.count > 0) {
        this.count -= 1;
        this.lastUsed = new Date();
        this.totalUses += 1;
        return this.save();
    }
    throw new Error('No uses remaining');
};

userPowerSchema.methods.addUses = function(amount) {
    this.count += amount;
    return this.save();
};

userPowerSchema.methods.removeUses = function(amount) {
    this.count = Math.max(0, this.count - amount);
    return this.save();
};

userPowerSchema.methods.checkIfExpired = function() {
    return this.expiresAt && this.expiresAt < new Date();
};

userPowerSchema.methods.canUse = function() {
    return this.isActive && !this.checkIfExpired() && this.count > 0;
};

userPowerSchema.methods.deactivate = function() {
    this.isActive = false;
    return this.save();
};

userPowerSchema.methods.activate = function() {
    this.isActive = true;
    return this.save();
};

// Static methods
userPowerSchema.statics.findByUser = function(userId) {
    return this.find({ userId, isActive: true })
        .populate('powerId')
        .sort({ 'powerId.name': 1 });
};

userPowerSchema.statics.findByPower = function(powerId) {
    return this.find({ powerId, isActive: true })
        .populate('userId', 'nickname username')
        .sort({ purchased: -1 });
};

userPowerSchema.statics.findExpired = function() {
    return this.find({
        expiresAt: { $lt: new Date() },
        isActive: true
    });
};

userPowerSchema.statics.getUserPowerStats = async function(userId) {
    const stats = await this.aggregate([
        { $match: { userId: mongoose.Types.ObjectId(userId), isActive: true } },
        {
            $group: {
                _id: null,
                totalPowers: { $sum: 1 },
                totalUses: { $sum: '$totalUses' },
                availableUses: { $sum: '$count' },
                expiredPowers: {
                    $sum: {
                        $cond: [
                            { $and: [
                                { $ne: ['$expiresAt', null] },
                                { $lt: ['$expiresAt', new Date()] }
                            ]},
                            1,
                            0
                        ]
                    }
                }
            }
        }
    ]);

    return stats[0] || {
        totalPowers: 0,
        totalUses: 0,
        availableUses: 0,
        expiredPowers: 0
    };
};

userPowerSchema.statics.getPowerUsageStats = async function(powerId) {
    const stats = await this.aggregate([
        { $match: { powerId: mongoose.Types.ObjectId(powerId), isActive: true } },
        {
            $group: {
                _id: null,
                totalOwners: { $sum: 1 },
                totalUses: { $sum: '$totalUses' },
                totalAvailable: { $sum: '$count' }
            }
        }
    ]);

    return stats[0] || {
        totalOwners: 0,
        totalUses: 0,
        totalAvailable: 0
    };
};

userPowerSchema.statics.transferPower = async function(fromUserId, toUserId, powerId, amount = 1) {
    const fromUserPower = await this.findOne({ userId: fromUserId, powerId });
    if (!fromUserPower || fromUserPower.count < amount) {
        throw new Error('Insufficient power count to transfer');
    }

    // Find or create recipient's power entry
    let toUserPower = await this.findOne({ userId: toUserId, powerId });

    if (toUserPower) {
        toUserPower.count += amount;
        await toUserPower.save();
    } else {
        toUserPower = new this({
            userId: toUserId,
            powerId,
            count: amount,
            purchased: new Date()
        });
        await toUserPower.save();
    }

    // Update sender's power count
    fromUserPower.count -= amount;
    if (fromUserPower.count <= 0) {
        await this.findByIdAndDelete(fromUserPower._id);
    } else {
        await fromUserPower.save();
    }

    return { fromUserPower, toUserPower };
};

// Virtual fields
userPowerSchema.virtual('isExpired').get(function() {
    return this.expiresAt && this.expiresAt < new Date();
});

userPowerSchema.virtual('isUnlimited').get(function() {
    return this.count === -1;
});

userPowerSchema.virtual('hasUses').get(function() {
    return this.isUnlimited || this.count > 0;
});

userPowerSchema.virtual('daysUntilExpiry').get(function() {
    if (!this.expiresAt) return null;
    const now = new Date();
    const diffTime = this.expiresAt - now;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

// JSON serialization
userPowerSchema.methods.toJSON = function() {
    const userPower = this.toObject();
    userPower.id = userPower._id;
    delete userPower._id;
    delete userPower.__v;
    return userPower;
};

module.exports = mongoose.model('UserPower', userPowerSchema);
