const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true, maxlength: 255 },
    timestamp: { type: Date, default: Date.now },
    visible: { type: Boolean, default: true },
    pool: { type: Number, default: 0 },
    mid: { type: Number, auto: true } // Message ID like Ixat Files
}, {
    timestamps: true
});

// Index for efficient querying
MessageSchema.index({ roomId: 1, timestamp: -1 });
MessageSchema.index({ userId: 1, timestamp: -1 });

module.exports = mongoose.model('Message', MessageSchema);