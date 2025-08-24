const mongoose = require('mongoose');

const PowerSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    section: { type: String, required: true, default: 'p0' }, // P string index
    name: { type: String, required: true }, // Power name
    subid: { type: Number, required: true }, // ID in the p string
    cost: { type: Number, default: 0 },
    limited: { type: Boolean, default: false },
    description: { type: String, default: '' },
    amount: { type: Number, default: 0 }, // Amount to sell
    topsh: { type: String, default: '' },
    group: { type: String, default: '' }
}, {
    timestamps: true
});

// Index for efficient querying
PowerSchema.index({ id: 1 });
PowerSchema.index({ section: 1, subid: 1 });
PowerSchema.index({ name: 1 });

module.exports = mongoose.model('Power', PowerSchema);