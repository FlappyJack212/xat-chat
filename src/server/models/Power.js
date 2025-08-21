const mongoose = require('mongoose');

const PowerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  icon: {
    type: String,
    default: ''
  },
  effect: {
    type: String,
    default: ''
  },
  sound: {
    type: String,
    default: ''
  },
  animation: {
    type: String,
    default: ''
  },
  price: {
    type: Number,
    default: 0
  },
  usageCount: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  // iXat specific fields for compatibility
  cost: {
    type: Number,
    default: 0
  },
  subid: {
    type: Number,
    required: false
  },
  section: {
    type: String,
    default: 'p0'
  },
  amount: {
    type: Number,
    default: 0
  },
  topsh: {
    type: String,
    default: ''
  },
  group: {
    type: String,
    default: ''
  },
  limited: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Power', PowerSchema);