const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    // Message participants
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    
    // Message content
    content: {
        type: String,
        required: true,
        maxlength: 2000
    },
    messageType: {
        type: String,
        enum: ['PM', 'PC', 'system'], // PM = Private Message, PC = Private Chat
        default: 'PM'
    },
    
    // Message status
    read: {
        type: Boolean,
        default: false
    },
    readAt: {
        type: Date,
        default: null
    },
    delivered: {
        type: Boolean,
        default: false
    },
    deliveredAt: {
        type: Date,
        default: null
    },
    
    // Message metadata
    isEdited: {
        type: Boolean,
        default: false
    },
    editedAt: {
        type: Date,
        default: null
    },
    originalContent: {
        type: String,
        default: null
    },
    
    // Message reactions
    reactions: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        emoji: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    
    // Message attachments
    attachments: [{
        type: {
            type: String,
            enum: ['image', 'file', 'link', 'power']
        },
        url: String,
        filename: String,
        size: Number,
        mimeType: String
    }],
    
    // Message flags
    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date,
        default: null
    },
    isSpam: {
        type: Boolean,
        default: false
    },
    isReported: {
        type: Boolean,
        default: false
    },
    
    // Message threading
    threadId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
        default: null
    },
    isThreadStart: {
        type: Boolean,
        default: false
    },
    
    // Message encryption (for future use)
    encrypted: {
        type: Boolean,
        default: false
    },
    encryptionKey: {
        type: String,
        default: null
    }
}, {
    timestamps: true
});

// Indexes for performance
messageSchema.index({ sender: 1, recipient: 1, createdAt: -1 });
messageSchema.index({ recipient: 1, read: 1, createdAt: -1 });
messageSchema.index({ threadId: 1, createdAt: 1 });
messageSchema.index({ createdAt: -1 });

// Instance methods
messageSchema.methods.markAsRead = function() {
    this.read = true;
    this.readAt = new Date();
    return this.save();
};

messageSchema.methods.markAsDelivered = function() {
    this.delivered = true;
    this.deliveredAt = new Date();
    return this.save();
};

messageSchema.methods.edit = function(newContent) {
    if (!this.originalContent) {
        this.originalContent = this.content;
    }
    this.content = newContent;
    this.isEdited = true;
    this.editedAt = new Date();
    return this.save();
};

messageSchema.methods.delete = function() {
    this.isDeleted = true;
    this.deletedAt = new Date();
    this.content = '[Message deleted]';
    return this.save();
};

messageSchema.methods.addReaction = function(userId, emoji) {
    // Remove existing reaction from this user
    this.reactions = this.reactions.filter(r => r.user.toString() !== userId.toString());
    
    // Add new reaction
    this.reactions.push({
        user: userId,
        emoji: emoji,
        createdAt: new Date()
    });
    
    return this.save();
};

messageSchema.methods.removeReaction = function(userId, emoji) {
    this.reactions = this.reactions.filter(r => 
        !(r.user.toString() === userId.toString() && r.emoji === emoji)
    );
    return this.save();
};

// Static methods
messageSchema.statics.getConversation = function(user1Id, user2Id, limit = 50, offset = 0) {
    return this.find({
        $or: [
            { sender: user1Id, recipient: user2Id },
            { sender: user2Id, recipient: user1Id }
        ],
        isDeleted: false
    })
    .populate('sender', 'username nickname avatar rank')
    .populate('recipient', 'username nickname avatar rank')
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(offset);
};

messageSchema.statics.getUnreadCount = function(userId) {
    return this.countDocuments({
        recipient: userId,
        read: false,
        isDeleted: false
    });
};

messageSchema.statics.getRecentConversations = function(userId, limit = 20) {
    return this.aggregate([
        {
            $match: {
                $or: [
                    { sender: mongoose.Types.ObjectId(userId) },
                    { recipient: mongoose.Types.ObjectId(userId) }
                ],
                isDeleted: false
            }
        },
        {
            $sort: { createdAt: -1 }
        },
        {
            $group: {
                _id: {
                    $cond: [
                        { $eq: ['$sender', mongoose.Types.ObjectId(userId)] },
                        '$recipient',
                        '$sender'
                    ]
                },
                lastMessage: { $first: '$$ROOT' },
                unreadCount: {
                    $sum: {
                        $cond: [
                            { $and: [
                                { $eq: ['$recipient', mongoose.Types.ObjectId(userId)] },
                                { $eq: ['$read', false] }
                            ]},
                            1,
                            0
                        ]
                    }
                }
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: '_id',
                foreignField: '_id',
                as: 'user'
            }
        },
        {
            $unwind: '$user'
        },
        {
            $project: {
                user: {
                    _id: 1,
                    username: 1,
                    nickname: 1,
                    avatar: 1,
                    rank: 1,
                    isOnline: 1
                },
                lastMessage: 1,
                unreadCount: 1
            }
        },
        {
            $sort: { 'lastMessage.createdAt': -1 }
        },
        {
            $limit: limit
        }
    ]);
};

messageSchema.statics.markConversationAsRead = function(user1Id, user2Id) {
    return this.updateMany({
        sender: user2Id,
        recipient: user1Id,
        read: false
    }, {
        $set: {
            read: true,
            readAt: new Date()
        }
    });
};

messageSchema.statics.searchMessages = function(userId, query, limit = 50) {
    return this.find({
        $or: [
            { sender: userId },
            { recipient: userId }
        ],
        content: { $regex: query, $options: 'i' },
        isDeleted: false
    })
    .populate('sender', 'username nickname avatar')
    .populate('recipient', 'username nickname avatar')
    .sort({ createdAt: -1 })
    .limit(limit);
};

// Virtual fields
messageSchema.virtual('isRead').get(function() {
    return this.read;
});

messageSchema.virtual('isDelivered').get(function() {
    return this.delivered;
});

messageSchema.virtual('timeAgo').get(function() {
    const now = new Date();
    const diff = now - this.createdAt;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
});

// JSON serialization
messageSchema.methods.toJSON = function() {
    const message = this.toObject();
    message.timeAgo = this.timeAgo;
    return message;
};

module.exports = mongoose.model('Message', messageSchema);