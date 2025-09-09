const mongoose = require('mongoose');

const powerSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    displayName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['pawn', 'effect', 'special', 'moderation', 'premium']
    },
    cost: {
        type: Number,
        required: true,
        default: 0
    },
    description: {
        type: String,
        required: true
    },
    color: {
        type: String,
        default: '#00bfff'
    },
    rarity: {
        type: String,
        enum: ['common', 'rare', 'epic', 'legendary'],
        default: 'common'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    status: {
        type: String,
        enum: ['Available', 'active', 'inactive', 'discontinued'],
        default: 'Available'
    },
    cooldown: {
        type: Number,
        default: 0 // in seconds
    },
    effects: [{
        type: String
    }],
    epic: {
        type: Boolean,
        default: false
    },
    game: {
        type: Boolean,
        default: false
    },
    endDate: {
        type: Date,
        default: null
    },
    requirements: {
        minRank: {
            type: Number,
            default: 0
        },
        minDays: {
            type: Number,
            default: 0
        }
    }
}, {
    timestamps: true
});

// Index for efficient queries
powerSchema.index({ category: 1, isActive: 1 });
powerSchema.index({ cost: 1 });
powerSchema.index({ rarity: 1 });
powerSchema.index({ status: 1 });

// Instance methods
powerSchema.methods.isAvailable = function() {
    return this.isActive && 
           (this.status === 'Available' || this.status === 'active') &&
           (!this.endDate || this.endDate > new Date());
};

powerSchema.methods.canBePurchasedBy = function(user) {
    if (!this.isAvailable()) return false;
    if (user.rank < this.requirements.minRank) return false;
    if (user.days < this.requirements.minDays) return false;
    return true;
};

// Static methods
powerSchema.statics.findAvailable = function() {
    return this.find({
        isActive: true,
        status: { $in: ['Available', 'active'] },
        $or: [
            { endDate: { $exists: false } },
            { endDate: null },
            { endDate: { $gt: new Date() } }
        ]
    });
};

powerSchema.statics.findByCategory = function(category) {
    return this.find({
        category: category,
        isActive: true,
        status: { $in: ['Available', 'active'] }
    });
};

module.exports = mongoose.model('Power', powerSchema);