const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  description: {
    type: String,
    trim: true,
    maxlength: 200
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  usersCount: {
    type: Number,
    default: 0
  },
  maxUsers: {
    type: Number,
    default: 100
  },
  moderators: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  background: {
    type: {
      type: String,
      enum: ['color', 'image', 'gradient'],
      default: 'color'
    },
    url: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: '#f5f5f7'
    }
  },
  theme: {
    colors: {
      primary: {
        type: String,
        default: '#4a86e8'
      },
      secondary: {
        type: String,
        default: '#ffffff'
      },
      text: {
        type: String,
        default: '#333333'
      }
    },
    font: {
      type: String,
      default: 'Arial, sans-serif'
    }
  },
  settings: {
    isPrivate: {
      type: Boolean,
      default: false
    },
    allowGuests: {
      type: Boolean,
      default: true
    },
    messageRateLimit: {
      type: Number,
      default: 3 // messages per second
    },
    backgroundMusic: {
      enabled: {
        type: Boolean,
        default: false
      },
      url: {
        type: String,
        default: ''
      },
      volume: {
        type: Number,
        default: 50 // percentage
      }
    }
  },
  bannedUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  mutedUsers: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    until: {
      type: Date
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Room', RoomSchema);