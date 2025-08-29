const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    // Message content
    content: {
        type: String,
        required: true,
        maxlength: 1000
    },
    type: {
        type: String,
        enum: ['chat', 'system', 'private', 'command', 'power', 'moderation'],
        default: 'chat'
    },
    
    // Message author
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    
    // Message target (for private messages, commands, etc.)
    target: {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        chat: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Chat'
        }
    },
    
    // Chat context
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
        required: true
    },
    
    // Message metadata
    timestamp: {
        type: Date,
        default: Date.now
    },
    edited: {
        type: Boolean,
        default: false
    },
    editHistory: [{
        content: String,
        timestamp: Date,
        editor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }],
    
    // Power effects and formatting
    effects: {
        color: String,
        font: String,
        size: String,
        bold: { type: Boolean, default: false },
        italic: { type: Boolean, default: false },
        underline: { type: Boolean, default: false },
        rainbow: { type: Boolean, default: false },
        glow: { type: Boolean, default: false }
    },
    
    // Power information
    power: {
        powerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Power'
        },
        name: String,
        cost: Number
    },
    
    // Message moderation
    moderation: {
        flagged: {
            type: Boolean,
            default: false
        },
        flaggedBy: [{
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            reason: String,
            timestamp: Date
        }],
        hidden: {
            type: Boolean,
            default: false
        },
        hiddenBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        hiddenReason: String,
        hiddenTimestamp: Date
    },
    
    // Message reactions
    reactions: [{
        emoji: String,
        users: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        count: {
            type: Number,
            default: 0
        }
    }],
    
    // Message attachments
    attachments: [{
        type: {
            type: String,
            enum: ['image', 'file', 'link', 'audio', 'video']
        },
        url: String,
        filename: String,
        size: Number,
        mimeType: String
    }],
    
    // Message threading
    thread: {
        parent: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message'
        },
        replies: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message'
        }],
        replyCount: {
            type: Number,
            default: 0
        }
    },
    
    // Message visibility
    visibility: {
        public: {
            type: Boolean,
            default: true
        },
        visibleTo: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        hiddenFrom: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    
    // Message statistics
    stats: {
        views: {
            type: Number,
            default: 0
        },
        shares: {
            type: Number,
            default: 0
        },
        bookmarks: {
            type: Number,
            default: 0
        }
    },
    
    // Message tags and categorization
    tags: [String],
    category: {
        type: String,
        default: 'general'
    },
    
    // Message status
    status: {
        type: String,
        enum: ['active', 'deleted', 'archived', 'spam'],
        default: 'active'
    }
}, {
    timestamps: true
});

// Indexes for performance
messageSchema.index({ chat: 1, timestamp: -1 });
messageSchema.index({ author: 1, timestamp: -1 });
messageSchema.index({ type: 1 });
messageSchema.index({ 'moderation.flagged': 1 });
messageSchema.index({ 'thread.parent': 1 });
messageSchema.index({ content: 'text' });

// Instance methods
messageSchema.methods.isAuthor = function(userId) {
    return this.author.toString() === userId.toString();
};

messageSchema.methods.canEdit = function(user) {
    if (this.isAuthor(user._id)) return true;
    if (user.rank === 'mainowner') return true;
    if (user.rank === 'owner') return true;
    if (user.rank === 'moderator') return true;
    return false;
};

messageSchema.methods.canDelete = function(user) {
    if (this.isAuthor(user._id)) return true;
    if (user.rank === 'mainowner') return true;
    if (user.rank === 'owner') return true;
    if (user.rank === 'moderator') return true;
    return false;
};

messageSchema.methods.canModerate = function(user) {
    if (user.rank === 'mainowner') return true;
    if (user.rank === 'owner') return true;
    if (user.rank === 'moderator') return true;
    return false;
};

messageSchema.methods.edit = function(newContent, editor) {
    if (!this.canEdit(editor)) {
        throw new Error('Insufficient permissions to edit this message');
    }
    
    // Save edit history
    this.editHistory.push({
        content: this.content,
        timestamp: new Date(),
        editor: this.author
    });
    
    this.content = newContent;
    this.edited = true;
    this.timestamp = new Date();
    
    return this.save();
};

messageSchema.methods.flag = function(user, reason) {
    this.moderation.flagged = true;
    this.moderation.flaggedBy.push({
        user: user._id,
        reason: reason,
        timestamp: new Date()
    });
    
    return this.save();
};

messageSchema.methods.hide = function(moderator, reason) {
    this.moderation.hidden = true;
    this.moderation.hiddenBy = moderator._id;
    this.moderation.hiddenReason = reason;
    this.moderation.hiddenTimestamp = new Date();
    
    return this.save();
};

messageSchema.methods.unhide = function(moderator) {
    this.moderation.hidden = false;
    this.moderation.hiddenBy = null;
    this.moderation.hiddenReason = '';
    this.moderation.hiddenTimestamp = null;
    
    return this.save();
};

messageSchema.methods.addReaction = function(emoji, user) {
    let reaction = this.reactions.find(r => r.emoji === emoji);
    
    if (!reaction) {
        reaction = {
            emoji: emoji,
            users: [],
            count: 0
        };
        this.reactions.push(reaction);
    }
    
    if (!reaction.users.some(u => u.toString() === user._id.toString())) {
        reaction.users.push(user._id);
        reaction.count = reaction.users.length;
    }
    
    return this.save();
};

messageSchema.methods.removeReaction = function(emoji, user) {
    const reaction = this.reactions.find(r => r.emoji === emoji);
    
    if (reaction) {
        reaction.users = reaction.users.filter(u => u.toString() !== user._id.toString());
        reaction.count = reaction.users.length;
        
        if (reaction.count === 0) {
            this.reactions = this.reactions.filter(r => r.emoji !== emoji);
        }
    }
    
    return this.save();
};

messageSchema.methods.reply = function(replyMessage) {
    if (!this.thread.replies) {
        this.thread.replies = [];
    }
    
    this.thread.replies.push(replyMessage._id);
    this.thread.replyCount = this.thread.replies.length;
    
    return this.save();
};

// Static methods
messageSchema.statics.findByChat = function(chatId, limit = 50, skip = 0) {
    return this.find({ 
        chat: chatId,
        status: 'active',
        'moderation.hidden': false
    })
    .sort({ timestamp: -1 })
    .limit(limit)
    .skip(skip)
    .populate('author', 'username rank avatar')
    .populate('power', 'name description');
};

messageSchema.statics.findByUser = function(userId, limit = 50) {
    return this.find({ 
        author: userId,
        status: 'active'
    })
    .sort({ timestamp: -1 })
    .limit(limit)
    .populate('chat', 'name');
};

messageSchema.statics.findPrivateMessages = function(userId1, userId2, limit = 50) {
    return this.find({
        type: 'private',
        $or: [
            { author: userId1, 'target.user': userId2 },
            { author: userId2, 'target.user': userId1 }
        ],
        status: 'active'
    })
    .sort({ timestamp: -1 })
    .limit(limit)
    .populate('author', 'username rank avatar')
    .populate('target.user', 'username rank avatar');
};

messageSchema.statics.getMessageStats = async function(chatId) {
    const stats = await this.aggregate([
        { $match: { chat: mongoose.Types.ObjectId(chatId) } },
        {
            $group: {
                _id: null,
                totalMessages: { $sum: 1 },
                totalWords: { $sum: { $strLenCP: '$content' } },
                averageLength: { $avg: { $strLenCP: '$content' } },
                messagesToday: {
                    $sum: {
                        $cond: [
                            { $gte: ['$timestamp', new Date(new Date().setHours(0, 0, 0, 0))] },
                            1,
                            0
                        ]
                    }
                }
            }
        }
    ]);
    
    return stats[0] || {
        totalMessages: 0,
        totalWords: 0,
        averageLength: 0,
        messagesToday: 0
    };
};

// Virtual fields
messageSchema.virtual('isEdited').get(function() {
    return this.edited;
});

messageSchema.virtual('isFlagged').get(function() {
    return this.moderation.flagged;
});

messageSchema.virtual('isHidden').get(function() {
    return this.moderation.hidden;
});

messageSchema.virtual('hasReplies').get(function() {
    return this.thread && this.thread.replyCount > 0;
});

messageSchema.virtual('age').get(function() {
    return Math.floor((new Date() - this.timestamp) / (1000 * 60 * 60 * 1000)); // in hours
});

// JSON serialization
messageSchema.methods.toJSON = function() {
    const message = this.toObject();
    message.isEdited = this.isEdited;
    message.isFlagged = this.isFlagged;
    message.isHidden = this.isHidden;
    message.hasReplies = this.hasReplies;
    message.age = this.age;
    return message;
};

module.exports = mongoose.model('Message', messageSchema);