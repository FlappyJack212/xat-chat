const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    // Basic user information
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    nickname: {
        type: String,
        default: '',
        maxlength: 255
    },
    avatar: {
        type: String,
        default: 'default'
    },
    url: {
        type: String,
        default: ''
    },
    
    // iXat specific fields
    xats: {
        type: Number,
        default: 1000,
        min: 0
    },
    days: {
        type: Number,
        default: 0,
        min: 0
    },
    reserve: {
        type: Number,
        default: 0,
        min: 0
    },
    
    // Rank and permissions
    rank: {
        type: String,
        enum: ['guest', 'member', 'moderator', 'owner', 'mainowner'],
        default: 'guest'
    },
    enabled: {
        type: Boolean,
        default: true
    },
    
    // Relationship fields
    bride: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    d0: {
        type: Number,
        default: 0
    },
    d2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    
    // Authentication and security
    loginKey: {
        type: String,
        default: null
    },
    k: {
        type: String,
        default: null
    },
    k2: {
        type: String,
        default: null
    },
    k3: {
        type: String,
        default: null
    },
    
    // Chat ownership
    ownedChats: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat'
    }],
    
    // User status
    status: {
        type: String,
        default: 'Online'
    },
    lastSeen: {
        type: Date,
        default: Date.now
    },
    isOnline: {
        type: Boolean,
        default: false
    },
    
    // Ban and moderation
    banned: {
        type: Date,
        default: null
    },
    banReason: {
        type: String,
        default: ''
    },
    warnings: [{
        reason: String,
        moderator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        date: {
            type: Date,
            default: Date.now
        }
    }],
    
    // Customization
    customPawn: {
        type: String,
        default: 'off'
    },
    theme: {
        type: String,
        default: 'default'
    },
    
    // Statistics
    totalMessages: {
        type: Number,
        default: 0
    },
    totalLogins: {
        type: Number,
        default: 0
    },
    registrationDate: {
        type: Date,
        default: Date.now
    },
    
    // API and external
    apiKey: {
        type: String,
        default: null
    },
    transferBlock: {
        type: Date,
        default: null
    },
    
    // Additional fields for modern features
    preferences: {
        sound: { type: Boolean, default: true },
        music: { type: Boolean, default: false },
        notifications: { type: Boolean, default: true },
        autoScroll: { type: Boolean, default: true },
        language: { type: String, default: 'en' }
    }
}, {
    timestamps: true
});

// Indexes for performance
userSchema.index({ username: 1 });
userSchema.index({ email: 1 });
userSchema.index({ rank: 1 });
userSchema.index({ isOnline: 1 });
userSchema.index({ lastSeen: 1 });

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    try {
        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Instance methods
userSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.hasRank = function(requiredRank) {
    const rankHierarchy = {
        'guest': 0,
        'member': 1,
        'moderator': 2,
        'owner': 3,
        'mainowner': 4
    };
    
    return rankHierarchy[this.rank] >= rankHierarchy[requiredRank];
};

userSchema.methods.canModerate = function(targetUser) {
    if (this.rank === 'mainowner') return true;
    if (this.rank === 'owner' && targetUser.rank !== 'mainowner') return true;
    if (this.rank === 'moderator' && ['guest', 'member'].includes(targetUser.rank)) return true;
    return false;
};

userSchema.methods.addXats = function(amount) {
    this.xats += amount;
    if (this.xats < 0) this.xats = 0;
    return this.save();
};

userSchema.methods.removeXats = function(amount) {
    return this.addXats(-amount);
};

userSchema.methods.addDays = function(amount) {
    this.days += amount;
    if (this.days < 0) this.days = 0;
    return this.save();
};

userSchema.methods.removeDays = function(amount) {
    return this.addDays(-amount);
};

userSchema.methods.ban = function(duration, reason, moderator) {
    this.banned = new Date(Date.now() + duration * 60 * 60 * 1000); // duration in hours
    this.banReason = reason;
    this.warnings.push({
        reason: `Banned: ${reason}`,
        moderator: moderator,
        date: new Date()
    });
    return this.save();
};

userSchema.methods.unban = function() {
    this.banned = null;
    this.banReason = '';
    return this.save();
};

userSchema.methods.changeRank = function(newRank, moderator) {
    const oldRank = this.rank;
    this.rank = newRank;
    
    this.warnings.push({
        reason: `Rank changed from ${oldRank} to ${newRank}`,
        moderator: moderator,
        date: new Date()
    });
    
    return this.save();
};

// Static methods
userSchema.statics.findByUsername = function(username) {
    return this.findOne({ username: username.toLowerCase() });
};

userSchema.statics.findOnline = function() {
    return this.find({ isOnline: true });
};

userSchema.statics.findByRank = function(rank) {
    return this.find({ rank: rank });
};

userSchema.statics.getStats = async function() {
    const stats = await this.aggregate([
        {
            $group: {
                _id: null,
                totalUsers: { $sum: 1 },
                totalXats: { $sum: '$xats' },
                totalDays: { $sum: '$days' },
                onlineUsers: { $sum: { $cond: ['$isOnline', 1, 0] } }
            }
        }
    ]);
    
    return stats[0] || { totalUsers: 0, totalXats: 0, totalDays: 0, onlineUsers: 0 };
};

// Virtual fields
userSchema.virtual('isBanned').get(function() {
    return this.banned && this.banned > new Date();
});

userSchema.virtual('banTimeLeft').get(function() {
    if (!this.isBanned) return 0;
    return Math.max(0, this.banned - new Date());
});

userSchema.virtual('displayName').get(function() {
    return this.nickname || this.username;
});

userSchema.virtual('age').get(function() {
    return Math.floor((new Date() - this.registrationDate) / (1000 * 60 * 60 * 24));
});

// JSON serialization
userSchema.methods.toJSON = function() {
    const user = this.toObject();
    delete user.password;
    delete user.loginKey;
    delete user.k;
    delete user.k2;
    delete user.k3;
    delete user.apiKey;
    return user;
};

module.exports = mongoose.model('User', userSchema);