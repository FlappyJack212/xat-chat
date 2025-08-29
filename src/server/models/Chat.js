const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    // Basic chat information
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: 100
    },
    description: {
        type: String,
        default: '',
        maxlength: 500
    },
    
    // Chat ownership
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    coOwners: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    
    // Chat settings
    background: {
        type: String,
        default: 'default'
    },
    radio: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: ''
    },
    
    // Chat pools/rooms
    pools: [{
        name: String,
        description: String,
        requiresRank: {
            type: String,
            enum: ['guest', 'member', 'moderator', 'owner', 'mainowner'],
            default: 'guest'
        },
        maxUsers: {
            type: Number,
            default: 100
        }
    }],
    
    // Chat protection and moderation
    protection: {
        enabled: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            enum: ['noguest', 'unreg', 'password'],
            default: 'noguest'
        },
        endTime: {
            type: Date,
            default: null
        }
    },
    
    // Chat rules and settings
    rules: {
        maxMessageLength: {
            type: Number,
            default: 500
        },
        allowGuests: {
            type: Boolean,
            default: true
        },
        allowUnregistered: {
            type: Boolean,
            default: true
        },
        requireApproval: {
            type: Boolean,
            default: false
        }
    },
    
    // Chat appearance
    appearance: {
        theme: {
            type: String,
            default: 'default'
        },
        colors: {
            primary: { type: String, default: '#3498db' },
            secondary: { type: String, default: '#2c3e50' },
            accent: { type: String, default: '#e74c3c' }
        },
        logo: {
            type: String,
            default: ''
        }
    },
    
    // Chat features
    features: {
        powers: {
            type: Boolean,
            default: true
        },
        games: {
            type: Boolean,
            default: true
        },
        music: {
            type: Boolean,
            default: true
        },
        fileSharing: {
            type: Boolean,
            default: false
        }
    },
    
    // Chat statistics
    stats: {
        totalMessages: {
            type: Number,
            default: 0
        },
        totalUsers: {
            type: Number,
            default: 0
        },
        peakUsers: {
            type: Number,
            default: 0
        },
        createdDate: {
            type: Date,
            default: Date.now
        },
        lastActivity: {
            type: Date,
            default: Date.now
        }
    },
    
    // Chat moderation
    moderation: {
        autoMod: {
            type: Boolean,
            default: false
        },
        bannedWords: [String],
        allowedDomains: [String],
        maxWarnings: {
            type: Number,
            default: 3
        }
    },
    
    // Chat announcements
    announcements: [{
        message: String,
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        date: {
            type: Date,
            default: Date.now
        },
        active: {
            type: Boolean,
            default: true
        }
    }],
    
    // Chat groups and categories
    group: {
        type: String,
        default: 'General'
    },
    category: {
        type: String,
        default: 'Chat'
    },
    tags: [String],
    
    // Chat status
    status: {
        type: String,
        enum: ['active', 'inactive', 'maintenance', 'banned'],
        default: 'active'
    },
    
    // Chat access control
    access: {
        public: {
            type: Boolean,
            default: true
        },
        whitelist: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        blacklist: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }]
    }
}, {
    timestamps: true
});

// Indexes for performance
chatSchema.index({ name: 1 });
chatSchema.index({ owner: 1 });
chatSchema.index({ status: 1 });
chatSchema.index({ group: 1 });
chatSchema.index({ 'stats.lastActivity': -1 });
chatSchema.index({ 'stats.peakUsers': -1 });

// Instance methods
chatSchema.methods.isOwner = function(userId) {
    return this.owner.toString() === userId.toString();
};

chatSchema.methods.isCoOwner = function(userId) {
    return this.coOwners.some(coOwner => coOwner.toString() === userId.toString());
};

chatSchema.methods.canAccess = function(user) {
    if (this.status !== 'active') return false;
    if (!this.access.public && !this.isOwner(user._id) && !this.isCoOwner(user._id)) {
        return this.access.whitelist.some(whitelistedUser => whitelistedUser.toString() === user._id.toString());
    }
    if (this.access.blacklist.some(blacklistedUser => blacklistedUser.toString() === user._id.toString())) {
        return false;
    }
    return true;
};

chatSchema.methods.canModerate = function(user) {
    if (this.isOwner(user._id)) return true;
    if (this.isCoOwner(user._id)) return true;
    if (user.rank === 'mainowner') return true;
    if (user.rank === 'owner') return true;
    return false;
};

chatSchema.methods.addUser = function() {
    this.stats.totalUsers++;
    if (this.stats.totalUsers > this.stats.peakUsers) {
        this.stats.peakUsers = this.stats.totalUsers;
    }
    this.stats.lastActivity = new Date();
    return this.save();
};

chatSchema.methods.removeUser = function() {
    this.stats.totalUsers = Math.max(0, this.stats.totalUsers - 1);
    this.stats.lastActivity = new Date();
    return this.save();
};

chatSchema.methods.addMessage = function() {
    this.stats.totalMessages++;
    this.stats.lastActivity = new Date();
    return this.save();
};

chatSchema.methods.enableProtection = function(type, duration = 60) {
    this.protection.enabled = true;
    this.protection.type = type;
    this.protection.endTime = new Date(Date.now() + duration * 60 * 1000); // duration in minutes
    return this.save();
};

chatSchema.methods.disableProtection = function() {
    this.protection.enabled = false;
    this.protection.endTime = null;
    return this.save();
};

chatSchema.methods.addAnnouncement = function(message, author) {
    this.announcements.push({
        message,
        author,
        date: new Date(),
        active: true
    });
    return this.save();
};

chatSchema.methods.removeAnnouncement = function(announcementId) {
    this.announcements = this.announcements.filter(announcement => 
        announcement._id.toString() !== announcementId.toString()
    );
    return this.save();
};

// Static methods
chatSchema.statics.findByOwner = function(ownerId) {
    return this.find({ owner: ownerId });
};

chatSchema.statics.findPublic = function() {
    return this.find({ 
        status: 'active',
        'access.public': true
    });
};

chatSchema.statics.findByGroup = function(group) {
    return this.find({ group: group, status: 'active' });
};

chatSchema.statics.findByCategory = function(category) {
    return this.find({ category: category, status: 'active' });
};

chatSchema.statics.getChatStats = async function() {
    const stats = await this.aggregate([
        {
            $group: {
                _id: null,
                totalChats: { $sum: 1 },
                activeChats: { $sum: { $cond: [{ $eq: ['$status', 'active'] }, 1, 0] } },
                totalMessages: { $sum: '$stats.totalMessages' },
                totalUsers: { $sum: '$stats.totalUsers' },
                peakUsers: { $sum: '$stats.peakUsers' }
            }
        }
    ]);
    
    return stats[0] || {
        totalChats: 0,
        activeChats: 0,
        totalMessages: 0,
        totalUsers: 0,
        peakUsers: 0
    };
};

chatSchema.statics.getPopularChats = function(limit = 10) {
    return this.find({ status: 'active' })
        .sort({ 'stats.peakUsers': -1, 'stats.lastActivity': -1 })
        .limit(limit);
};

// Virtual fields
chatSchema.virtual('isProtected').get(function() {
    return this.protection.enabled && this.protection.endTime > new Date();
});

chatSchema.virtual('protectionTimeLeft').get(function() {
    if (!this.isProtected) return 0;
    return Math.max(0, this.protection.endTime - new Date());
});

chatSchema.virtual('age').get(function() {
    return Math.floor((new Date() - this.stats.createdDate) / (1000 * 60 * 60 * 24));
});

chatSchema.virtual('isActive').get(function() {
    return this.status === 'active';
});

// JSON serialization
chatSchema.methods.toJSON = function() {
    const chat = this.toObject();
    chat.isProtected = this.isProtected;
    chat.protectionTimeLeft = this.protectionTimeLeft;
    chat.age = this.age;
    chat.isActive = this.isActive;
    return chat;
};

module.exports = mongoose.model('Chat', chatSchema);
