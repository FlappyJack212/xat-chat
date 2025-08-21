const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
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
    trim: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 30
  },
  avatarId: {
    type: String,
    default: 'default'
  },
  level: {
    type: Number,
    default: 1
  },
  credits: {
    type: Number,
    default: 1000
  },
  // iXat currency system
  xats: {
    type: Number,
    default: 1000
  },
  days: {
    type: Number,
    default: 7
  },
  powers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Power'
  }],
  // iXat specific power tracking
  userPowers: [{
    powerId: { type: Number },
    count: { type: Number, default: 1 },
    purchased: { type: Date, default: Date.now }
  }],
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  blocked: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  status: {
    type: String,
    enum: ['online', 'away', 'offline'],
    default: 'offline'
  },
  lastSeen: {
    type: Date,
    default: Date.now
  },
  settings: {
    sound: {
      type: Boolean,
      default: true
    },
    notifications: {
      type: Boolean,
      default: true
    },
    privacy: {
      showStatus: {
        type: Boolean,
        default: true
      },
      allowFriendRequests: {
        type: Boolean,
        default: true
      }
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);