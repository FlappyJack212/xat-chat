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
    section: {
        type: String,
        required: true,
        enum: ['epic', 'game', 'group', 'moderation', 'chat', 'utility', 'p0', 'p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9', 'p10', 'p11', 'p12', 'p13', 'p14', 'p15'],
        default: 'p0'
    },
    subid: {
        type: Number,
        required: true,
        min: 1
    },
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
        default: -1,
        min: -1
    },
    topsh: {
        type: String,
        default: ''
    },
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
        type: String,
        default: ''
    },
    groupPower: {
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
    status: {
        type: String,
        enum: ['active', 'Available', 'Limited', 'Unavailable', 'Coming Soon'],
        default: 'Available'
    },
    effects: [{
        type: String,
        enum: ['text', 'avatar', 'sound', 'visual', 'game', 'moderation', 'social', 'temporary_all_powers', 'modify_xats', 'grant_power', '8ball_response', 'play_music', 'create_group', 'manage_group', 'kick_user', 'ban_user', 'mute_user', 'extended_smilies', 'chat_colors', 'transfer_xats', 'trade_items']
    }],
    cooldowns: {
        personal: { type: Number, default: 0 },
        global: { type: Number, default: 0 }
    },
    smileys: [{ type: String, trim: true }],
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
        minXats: { type: Number, default: 0 },
        minDays: { type: Number, default: 0 }
    },
    cooldown: { type: Number, default: 0, min: 0 },
    maxUses: { type: Number, default: -1, min: -1 },
    category: {
        type: String,
        enum: ['basic', 'premium', 'epic', 'legendary', 'special'],
        default: 'basic'
    },
    tags: [{ type: String, trim: true }],
    releaseDate: { type: Date, default: Date.now },
    endDate: { type: Date, default: null },
    totalSold: { type: Number, default: 0, min: 0 },
    totalUsed: { type: Number, default: 0, min: 0 },
    config: { type: mongoose.Schema.Types.Mixed, default: {} },
    images: {
        icon: String,
        preview: String,
        banner: String
    },
    wiki: { type: String, default: '' },
    help: { type: String, default: '' }
}, { timestamps: true });

powerSchema.index({ name: 1 });
powerSchema.index({ section: 1, subid: 1 });
powerSchema.index({ cost: 1 });
powerSchema.index({ status: 1 });
powerSchema.index({ category: 1 });
powerSchema.index({ 'requirements.minRank': 1 });

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
    const rankHierarchy = { 'guest': 0, 'member': 1, 'moderator': 2, 'owner': 3, 'mainowner': 4 };
    return rankHierarchy[user.rank] >= rankHierarchy[this.requirements.minRank];
};

powerSchema.methods.getBitwiseValue = function() {
    const sectionIndex = parseInt(this.section.substring(1)) || 0;
    return 1 << (this.subid - 1);
};

powerSchema.methods.getFullBitwiseValue = function() {
    const sectionIndex = parseInt(this.section.substring(1)) || 0;
    return (sectionIndex << 32) | this.getBitwiseValue();
};

powerSchema.statics.findBySection = function(section) {
    return this.find({ section }).sort({ subid: 1 });
};

powerSchema.statics.findAvailable = function() {
    return this.find({ status: { $in: ['Available', 'active'] } });
};

powerSchema.statics.findByCategory = function(category) {
    return this.find({ category });
};

powerSchema.statics.findByCostRange = function(minCost, maxCost) {
    return this.find({ cost: { $gte: minCost, $lte: maxCost } });
};

powerSchema.statics.findByRank = function(rank) {
    return this.find({ 'requirements.minRank': { $lte: rank } });
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
        { $sort: { _id: 1 } }
    ]);
};

powerSchema.virtual('isEpic').get(function() { return this.epic; });
powerSchema.virtual('isGame').get(function() { return this.game; });
powerSchema.virtual('isGroup').get(function() { return this.group; });
powerSchema.virtual('isLimited').get(function() { return this.limited || this.amount > 0; });
powerSchema.virtual('isUnlimited').get(function() { return this.amount === -1; });
powerSchema.virtual('remainingAmount').get(function() {
    if (this.amount === -1) return 'Unlimited';
    return Math.max(0, this.amount - this.totalSold);
});

powerSchema.methods.toJSON = function() {
    const power = this.toObject();
    power.bitwiseValue = this.getBitwiseValue();
    power.fullBitwiseValue = this.getFullBitwiseValue();
    power.isAvailable = this.isAvailable();
    return power;
};

module.exports = mongoose.model('Power', powerSchema);
