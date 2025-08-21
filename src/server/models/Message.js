const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
  },
  type: {
    type: String,
    enum: ['text', 'system', 'power', 'image'],
    default: 'text'
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  mentions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  powerEffect: {
    powerId: {
      type: String
    },
    effect: {
      type: String
    }
  },
  isEdited: {
    type: Boolean,
    default: false
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});

// Index for efficient querying
MessageSchema.index({ roomId: 1, timestamp: -1 });

module.exports = mongoose.model('Message', MessageSchema);