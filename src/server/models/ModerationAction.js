const mongoose = require('mongoose');

const moderationActionSchema = new mongoose.Schema({
    // Action details
    actionType: {
        type: String,
        required: true,
        enum: ['warning', 'mute', 'kick', 'ban', 'unban', 'unmute']
    },
    
    // Target user
    targetUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    
    // Moderator who performed the action
    moderator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    
    // Chat room where action occurred
    chatRoom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
        required: true
    },
    
    // Action details
    reason: {
        type: String,
        required: true,
        maxlength: 500
    },
    
    // Duration (for temporary actions)
    duration: {
        type: Number, // in minutes
        default: 0 // 0 = permanent
    },
    
    // Expiration time
    expiresAt: {
        type: Date,
        default: null
    },
    
    // Status
    status: {
        type: String,
        enum: ['active', 'expired', 'revoked'],
        default: 'active'
    },
    
    // Additional metadata
    metadata: {
        previousWarnings: { type: Number, default: 0 },
        ipAddress: String,
        userAgent: String,
        chatMessage: String // Message that triggered the action
    },
    
    // Timestamps
    createdAt: {
        type: Date,
        default: Date.now
    },
    
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Indexes for efficient queries
moderationActionSchema.index({ targetUser: 1, actionType: 1, status: 1 });
moderationActionSchema.index({ chatRoom: 1, createdAt: -1 });
moderationActionSchema.index({ moderator: 1, createdAt: -1 });
moderationActionSchema.index({ expiresAt: 1, status: 1 });

// Pre-save middleware to update timestamp
moderationActionSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});

// Instance methods
moderationActionSchema.methods.isExpired = function() {
    if (!this.expiresAt) return false;
    return new Date() > this.expiresAt;
};

moderationActionSchema.methods.getRemainingTime = function() {
    if (!this.expiresAt) return null;
    const remaining = this.expiresAt - new Date();
    return remaining > 0 ? Math.ceil(remaining / (1000 * 60)) : 0; // Return minutes
};

moderationActionSchema.methods.extendDuration = function(additionalMinutes) {
    if (this.expiresAt) {
        this.expiresAt = new Date(this.expiresAt.getTime() + (additionalMinutes * 60 * 1000));
    } else {
        this.expiresAt = new Date(Date.now() + (additionalMinutes * 60 * 1000));
    }
    this.duration += additionalMinutes;
    return this.save();
};

// Static methods
moderationActionSchema.statics.getActiveActions = function(userId, actionType = null) {
    const query = { targetUser: userId, status: 'active' };
    if (actionType) query.actionType = actionType;
    
    return this.find(query).populate('moderator', 'username rank');
};

moderationActionSchema.statics.getUserWarnings = function(userId, chatRoomId) {
    return this.find({
        targetUser: userId,
        chatRoom: chatRoomId,
        actionType: 'warning',
        status: 'active'
    }).sort({ createdAt: -1 });
};

moderationActionSchema.statics.getModerationHistory = function(userId, limit = 50) {
    return this.find({ targetUser: userId })
        .populate('moderator', 'username rank')
        .populate('chatRoom', 'name')
        .sort({ createdAt: -1 })
        .limit(limit);
};

// Auto-expire actions
moderationActionSchema.statics.cleanupExpiredActions = async function() {
    const now = new Date();
    const result = await this.updateMany(
        { 
            expiresAt: { $lt: now }, 
            status: 'active' 
        },
        { 
            $set: { status: 'expired' } 
        }
    );
    
    if (result.modifiedCount > 0) {
        console.log(`🎭 [MODERATION] Expired ${result.modifiedCount} moderation actions`);
    }
    
    return result.modifiedCount;
};

// Run cleanup every hour
setInterval(() => {
    moderationActionSchema.statics.cleanupExpiredActions().catch(console.error);
}, 60 * 60 * 1000);

const ModerationAction = mongoose.model('ModerationAction', moderationActionSchema);

module.exports = ModerationAction;
