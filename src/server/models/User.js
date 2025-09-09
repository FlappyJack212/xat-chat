const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    // xat-style numeric ID
    userId: {
        type: Number,
        unique: true,
        index: true,
        default: function() {
            // Generate a random 9-digit number like xat
            return Math.floor(Math.random() * 900000000) + 100000000;
        }
    },
    // Basic user information
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 20,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        index: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        validate: {
            validator: function(v) {
                // Allow shorter passwords for guest users
                if (this.username && this.username.startsWith('guest_')) {
                    return v.length >= 1;
                }
                return v.length >= 6;
            },
            message: 'Password must be at least 6 characters long (or 1+ for guests)'
        }
    },
    nickname: {
        type: String,
        default: '',
        maxlength: 255
    },
    avatar: {
        type: String,
        default: '0'
    },
    url: {
        type: String,
        default: ''
    },
    desc: {
        type: String,
        default: ''
    },
    custpawn: {
        type: String,
        default: 'off'
    },
    pawn: {
        type: String,
        default: '',
        enum: ['', 'pink', 'purple', 'gold', 'blueman', 'green', 'orange', 'red', 'white', 'yellow', 'cyan', 'magenta']
    },
    pawnColor: {
        type: String,
        default: '#00bfff' // Default blue color
    },
    credit: {
        type: Number,
        default: 0
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    connectedlast: {
        type: String,
        default: ''
    },
    xavi: {
        type: String,
        default: ''
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    powers: [{
        powerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Power'
        },
        assignedAt: {
            type: Date,
            default: Date.now
        },
        expiresAt: {
            type: Date,
            default: null
        },
        uses: {
            type: Number,
            default: 0
        },
        maxUses: {
            type: Number,
            default: -1 // -1 means unlimited
        },
        count: {
            type: Number,
            default: 1
        }
    }],
    powerBits: {
        type: String,
        default: '0' // Bitwise representation of powers
    },
    powerData: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
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
        type: Number,
        default: 1,
        min: 0,
        max: 9
        // 0 = Guest, 1 = Member, 2 = Admin, 3 = Moderator, 4 = Owner, 5 = Guest (special), 9 = Main Owner
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
    statusMessage: {
        type: String,
        default: ''
    },
    avatar: {
        type: String,
        default: ''
    },
    country: {
        type: String,
        default: ''
    },
    age: {
        type: Number,
        default: 0
    },
    gender: {
        type: String,
        default: '',
        enum: ['', 'male', 'female', 'other']
    },
    website: {
        type: String,
        default: ''
    },
    about: {
        type: String,
        default: ''
    },
    joinDate: {
        type: Date,
        default: Date.now
    },
    lastSeen: {
        type: Date,
        default: Date.now
    },
    totalChats: {
        type: Number,
        default: 0
    },
    totalMessages: {
        type: Number,
        default: 0
    },
    isVip: {
        type: Boolean,
        default: false
    },
    isPremium: {
        type: Boolean,
        default: false
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
    // Now using numeric ranks directly
    return this.rank >= requiredRank;
};

userSchema.methods.canModerate = function(targetUser) {
    if (this.rank >= 4) return true; // Owner or Main Owner
    if (this.rank >= 3 && targetUser.rank < 4) return true; // Moderator can moderate members and guests
    return false;
};

userSchema.methods.canModerateUser = function(targetUser) {
    return this.canModerate(targetUser);
};

userSchema.methods.getProfileData = function() {
    return {
        id: this._id,
        username: this.username,
        nickname: this.nickname,
        avatar: this.avatar,
        rank: this.rank,
        xats: this.xats,
        days: this.days,
        url: this.url,
        desc: this.desc,
        isOnline: this.isOnline || false,
        lastSeen: this.lastSeen,
        emailVerified: this.emailVerified
    };
};

userSchema.methods.getActivePowers = function() {
    return this.powers.filter(power => {
        if (power.expiresAt && power.expiresAt < new Date()) return false;
        if (power.maxUses !== -1 && power.uses >= power.maxUses) return false;
        return true;
    });
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

// Power management methods
userSchema.methods.hasPower = function(powerId, checkExpiry = true) {
    const power = this.powers.find(p => 
        p.powerId.toString() === powerId.toString() || 
        p.powerId._id?.toString() === powerId.toString()
    );
    
    if (!power) return false;
    
    if (checkExpiry && power.expiresAt && power.expiresAt < new Date()) {
        return false;
    }
    
    if (power.maxUses !== -1 && power.uses >= power.maxUses) {
        return false;
    }
    
    return true;
};

userSchema.methods.assignPower = function(powerId, options = {}) {
    const existingPower = this.powers.find(p => 
        p.powerId.toString() === powerId.toString() || 
        p.powerId._id?.toString() === powerId.toString()
    );
    
    if (existingPower) {
        existingPower.count += options.count || 1;
        existingPower.uses = options.uses || 0;
        existingPower.maxUses = options.maxUses || -1;
        if (options.expiresAt) {
            existingPower.expiresAt = options.expiresAt;
        }
    } else {
        this.powers.push({
            powerId: powerId,
            count: options.count || 1,
            uses: options.uses || 0,
            maxUses: options.maxUses || -1,
            expiresAt: options.expiresAt || null
        });
    }
    
    return this.save();
};

userSchema.methods.removePower = function(powerId) {
    this.powers = this.powers.filter(p => 
        p.powerId.toString() !== powerId.toString() && 
        p.powerId._id?.toString() !== powerId.toString()
    );
    return this.save();
};

userSchema.methods.usePower = function(powerId) {
    const power = this.powers.find(p => 
        p.powerId.toString() === powerId.toString() || 
        p.powerId._id?.toString() === powerId.toString()
    );
    
    if (!power) return false;
    
    if (power.maxUses !== -1 && power.uses >= power.maxUses) {
        return false;
    }
    
    power.uses += 1;
    return this.save();
};

userSchema.methods.getPowerCount = function(powerId) {
    const power = this.powers.find(p => 
        p.powerId.toString() === powerId.toString() || 
        p.powerId._id?.toString() === powerId.toString()
    );
    return power ? power.count : 0;
};

userSchema.methods.getActivePowers = function() {
    const now = new Date();
    return this.powers.filter(p => 
        (!p.expiresAt || p.expiresAt > now) && 
        (p.maxUses === -1 || p.uses < p.maxUses)
    );
};

userSchema.methods.getRankName = function() {
    const rankNames = {
        0: 'Guest',
        1: 'Member', 
        2: 'Admin',
        3: 'Moderator',
        4: 'Owner',
        5: 'Guest',
        9: 'Main Owner'
    };
    return rankNames[this.rank] || 'Unknown';
};

userSchema.methods.getRankColor = function() {
    const rankColors = {
        0: '#999999', // Guest
        1: '#4CAF50', // Member
        2: '#FF9800', // Admin
        3: '#2196F3', // Moderator
        4: '#9C27B0', // Owner
        5: '#999999', // Guest
        9: '#F44336'  // Main Owner
    };
    return rankColors[this.rank] || '#999999';
};

userSchema.methods.canModerateUser = function(targetUser) {
    if (this.rank >= 9) return true; // Main Owner can moderate everyone
    if (this.rank >= 4 && targetUser.rank < 4) return true; // Owner can moderate non-owners
    if (this.rank >= 3 && targetUser.rank < 3) return true; // Moderator can moderate members and guests
    return false;
};

userSchema.methods.getProfileData = function() {
    return {
        id: this.userId, // Use xat-style numeric ID
        _id: this._id, // Keep MongoDB _id for internal use
        username: this.username,
        nickname: this.nickname || this.username,
        avatar: this.avatar,
        rank: this.rank,
        rankName: this.getRankName(),
        rankColor: this.getRankColor(),
        xats: this.xats,
        days: this.days,
        isOnline: this.isOnline,
        lastSeen: this.lastSeen,
        totalMessages: this.totalMessages,
        totalChats: this.totalChats,
        registrationDate: this.registrationDate,
        joinDate: this.joinDate,
        powers: this.getActivePowers().length,
        friends: this.friends.length,
        status: this.status,
        statusMessage: this.statusMessage,
        desc: this.desc,
        about: this.about,
        url: this.url,
        website: this.website,
        country: this.country,
        age: this.age,
        gender: this.gender,
        isVip: this.isVip,
        isPremium: this.isPremium,
        emailVerified: this.emailVerified
    };
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

userSchema.statics.findByUserId = function(userId) {
    return this.findOne({ userId: userId });
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

// Removed virtual age field - now using real age field in schema

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