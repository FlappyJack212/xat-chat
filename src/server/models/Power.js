const mongoose = require('mongoose');

const powerSchema = new mongoose.Schema({
    // Basic power information
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        default: '',
        maxlength: 500
    },
    subdesc: {
        type: String,
        default: '',
        maxlength: 200
    },
    
    // Power categorization
    section: {
        type: String,
        required: true,
        enum: ['epic', 'game', 'group', 'moderation', 'chat', 'utility', 'p0', 'p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9'],
        default: 'p0'
    },
    subid: {
        type: Number,
        required: true,
        min: 1
    },
    
    // Power properties
    cost: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    xats: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    days: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    limited: {
        type: Boolean,
        default: false
    },
    amount: {
        type: Number,
        default: -1, // -1 means unlimited
        min: -1
    },
    
    // Power types
    allpowers: {
        type: Boolean,
        default: false
    },
    epic: {
        type: Boolean,
        default: false
    },
    game: {
        type: Boolean,
        default: false
    },
    group: {
        type: Boolean,
        default: false
    },
    newpower: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        enum: ['epic', 'game', 'group', 'moderation', 'chat', 'utility'],
        default: 'utility'
    },
    
    // Power status
    status: {
        type: String,
        enum: ['active', 'Available', 'Limited', 'Unavailable', 'Coming Soon'],
        default: 'Available'
    },
    
    // Power effects and features
    effects: [{
        type: String,
        enum: ['text', 'avatar', 'sound', 'visual', 'game', 'moderation', 'social', 'temporary_all_powers', 'modify_xats', 'grant_power', '8ball_response', 'play_music', 'create_group', 'manage_group', 'kick_user', 'ban_user', 'mute_user', 'extended_smilies', 'chat_colors', 'transfer_xats', 'trade_items']
    }],
    
    // Power cooldowns
    cooldowns: {
        personal: {
            type: Number,
            default: 0
        },
        global: {
            type: Number,
            default: 0
        }
    },
    
    // Smileys and visual elements
    smileys: [{
        type: String,
        trim: true
    }],
    
    // Power requirements
    requirements: {
        rank: {
            type: String,
            enum: ['guest', 'member', 'moderator', 'owner', 'mainowner'],
            default: 'guest'
        },
        minRank: {
            type: String,
            enum: ['guest', 'member', 'moderator', 'owner', 'mainowner'],
            default: 'guest'
        },
        minXats: {
            type: Number,
            default: 0
        },
        minDays: {
            type: Number,
            default: 0
        }
    },
    
    // Power cooldowns and limitations
    cooldown: {
        type: Number,
        default: 0, // in seconds
        min: 0
    },
    maxUses: {
        type: Number,
        default: -1, // -1 means unlimited
        min: -1
    },
    
    // Power metadata
    category: {
        type: String,
        enum: ['basic', 'premium', 'epic', 'legendary', 'special'],
        default: 'basic'
    },
    tags: [{
        type: String,
        trim: true
    }],
    
    // Power availability
    releaseDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date,
        default: null
    },
    
    // Power statistics
    totalSold: {
        type: Number,
        default: 0,
        min: 0
    },
    totalUsed: {
        type: Number,
        default: 0,
        min: 0
    },
    
    // Power configuration
    config: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },
    
    // Power images and assets
    images: {
        icon: String,
        preview: String,
        banner: String
    },
    
    // Power documentation
    wiki: {
        type: String,
        default: ''
    },
    help: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

// Indexes for performance
powerSchema.index({ name: 1 });
powerSchema.index({ section: 1, subid: 1 });
powerSchema.index({ cost: 1 });
powerSchema.index({ status: 1 });
powerSchema.index({ category: 1 });
powerSchema.index({ 'requirements.minRank': 1 });

// Instance methods
powerSchema.methods.isAvailable = function() {
    if (!['Available', 'active'].includes(this.status)) return false;
    if (this.endDate && this.endDate < new Date()) return false;
    if (this.amount === 0) return false;
    return true;
};

powerSchema.methods.canBePurchasedBy = function(user) {
    if (!this.isAvailable()) return false;
    if (user.xats < this.cost) return false;
    if (user.days < this.requirements.minDays) return false;
    
    const rankHierarchy = {
        'guest': 0,
        'member': 1,
        'moderator': 2,
        'owner': 3,
        'mainowner': 4
    };
    
    return rankHierarchy[user.rank] >= rankHierarchy[this.requirements.minRank];
};

powerSchema.methods.getBitwiseValue = function() {
    // Convert section and subid to bitwise value for compatibility
    const sectionIndex = parseInt(this.section.substring(1));
    return Math.pow(2, this.subid - 1);
};

powerSchema.methods.getFullBitwiseValue = function() {
    // Get full bitwise value including section
    const sectionIndex = parseInt(this.section.substring(1));
    return (sectionIndex << 32) | this.getBitwiseValue();
};

// Static methods
powerSchema.statics.findBySection = function(section) {
    return this.find({ section: section }).sort({ subid: 1 });
};

powerSchema.statics.findAvailable = function() {
    return this.find({ status: { $in: ['Available', 'active'] } });
};

powerSchema.statics.findByCategory = function(category) {
    return this.find({ category: category });
};

powerSchema.statics.findByCostRange = function(minCost, maxCost) {
    return this.find({
        cost: { $gte: minCost, $lte: maxCost }
    });
};

powerSchema.statics.findByRank = function(rank) {
    return this.find({
        'requirements.minRank': { $lte: rank }
    });
};

powerSchema.statics.getPowerStats = async function() {
    const stats = await this.aggregate([
        {
            $group: {
                _id: null,
                totalPowers: { $sum: 1 },
                totalCost: { $sum: '$cost' },
                availablePowers: { $sum: { $cond: [{ $in: ['$status', ['Available', 'active']] }, 1, 0] } },
                epicPowers: { $sum: { $cond: ['$epic', 1, 0] } },
                gamePowers: { $sum: { $cond: ['$game', 1, 0] } },
                groupPowers: { $sum: { $cond: ['$group', 1, 0] } }
            }
        }
    ]);
    
    return stats[0] || {
        totalPowers: 0,
        totalCost: 0,
        availablePowers: 0,
        epicPowers: 0,
        gamePowers: 0,
        groupPowers: 0
    };
};

powerSchema.statics.getPowersBySection = async function() {
    return this.aggregate([
        {
            $group: {
                _id: '$section',
                powers: { $push: '$$ROOT' },
                count: { $sum: 1 },
                totalCost: { $sum: '$cost' }
            }
        },
        {
            $sort: { _id: 1 }
        }
    ]);
};

// Virtual fields
powerSchema.virtual('isEpic').get(function() {
    return this.epic;
});

powerSchema.virtual('isGame').get(function() {
    return this.game;
});

powerSchema.virtual('isGroup').get(function() {
    return this.group;
});

powerSchema.virtual('isLimited').get(function() {
    return this.limited || this.amount > 0;
});

powerSchema.virtual('isUnlimited').get(function() {
    return this.amount === -1;
});

powerSchema.virtual('remainingAmount').get(function() {
    if (this.amount === -1) return 'Unlimited';
    return Math.max(0, this.amount - this.totalSold);
});

// JSON serialization
powerSchema.methods.toJSON = function() {
    const power = this.toObject();
    power.bitwiseValue = this.getBitwiseValue();
    power.fullBitwiseValue = this.getFullBitwiseValue();
    power.isAvailable = this.isAvailable();
    return power;
};

module.exports = mongoose.model('Power', powerSchema);