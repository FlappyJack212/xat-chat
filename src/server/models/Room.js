const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    bg: { type: String, default: 'http://oi60.tinypic.com/1r6io9.jpg' },
    outter: { type: String, default: '' },
    sc: { type: String, default: 'Welcome to the chat!' }, // scroller message
    ch: { type: Number, default: 0 },
    email: { type: String, default: '' },
    radio: { type: String, default: '' }, // radio ip
    pass: { type: String, default: '' },
    button: { type: String, default: '#FFFFFF' },
    attached: { type: String, default: 'Help' },
    pool: { type: String, default: '0 2 1' },
    pools: { type: String, default: '{"m":"Main","t":"Chat","b":"Banned","rnk":"9"}' },
    gback: { type: String, default: 'kmoon' },
    gline: { type: String, default: 'wary,hehe,chew,evil,cd,wt,yum,smirk,smirk2,mad,goo,sleepy' },
    link: { type: String, default: '' },
    bad: { type: String, default: '' },
    announce: { type: String, default: '' },
    blastban: { type: String, default: '' },
    blastkick: { type: String, default: '' },
    blastpro: { type: String, default: '' },
    blastde: { type: String, default: '' },
    lang: { type: Number, default: 1 }
}, {
    timestamps: true
});

module.exports = mongoose.model('Room', RoomSchema);