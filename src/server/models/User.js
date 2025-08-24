const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
        required: true
    },
    nickname: {
        type: String,
        trim: true,
        maxlength: 20
    },
    rank: {
        type: Number,
        default: 3, // Member
        enum: [1, 2, 3, 4, 5] // Main Owner, Admin, Member, Owner, Guest
    },
    xats: {
        type: Number,
        default: 0
    },
    days: {
        type: Number,
        default: 0
    },
    avatar: {
        type: Number,
        default: 1
    },
    custspawn: {
        type: String,
        default: ''
    },
    bio: {
        type: String,
        default: '',
        maxlength: 500
    },
    homepage: {
        type: String,
        default: ''
    },
    enabled: {
        type: Boolean,
        default: true
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    lastSeen: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);