const mongoose = require('mongoose');
const Power = require('../models/Power');
require('dotenv').config();

const pawnPowers = [
    // Basic pawn colors
    {
        id: 30,
        name: 'pink_pawn',
        displayName: 'Pink Pawn',
        category: 'pawn',
        cost: 500,
        description: 'A beautiful pink colored pawn',
        color: '#ff69b4',
        rarity: 'common'
    },
    {
        id: 35,
        name: 'purple_pawn',
        displayName: 'Purple Pawn',
        category: 'pawn',
        cost: 25000,
        description: 'An epic purple colored pawn',
        color: '#8a2be2',
        rarity: 'epic'
    },
    {
        id: 64,
        name: 'blueman',
        displayName: 'Dark Blue Pawn',
        category: 'pawn',
        cost: 1000,
        description: 'A dark blue colored pawn',
        color: '#0000cd',
        rarity: 'common'
    },
    {
        id: 153,
        name: 'gold_pawn',
        displayName: 'Gold Pawn',
        category: 'pawn',
        cost: 500,
        description: 'A shiny gold colored pawn',
        color: '#ffd700',
        rarity: 'epic'
    },
    {
        id: 200,
        name: 'green_pawn',
        displayName: 'Green Pawn',
        category: 'pawn',
        cost: 300,
        description: 'A fresh green colored pawn',
        color: '#00ff00',
        rarity: 'common'
    },
    {
        id: 201,
        name: 'orange_pawn',
        displayName: 'Orange Pawn',
        category: 'pawn',
        cost: 300,
        description: 'A vibrant orange colored pawn',
        color: '#ffa500',
        rarity: 'common'
    },
    {
        id: 202,
        name: 'red_pawn',
        displayName: 'Red Pawn',
        category: 'pawn',
        cost: 300,
        description: 'A bold red colored pawn',
        color: '#ff0000',
        rarity: 'common'
    },
    {
        id: 203,
        name: 'white_pawn',
        displayName: 'White Pawn',
        category: 'pawn',
        cost: 300,
        description: 'A clean white colored pawn',
        color: '#ffffff',
        rarity: 'common'
    },
    {
        id: 204,
        name: 'yellow_pawn',
        displayName: 'Yellow Pawn',
        category: 'pawn',
        cost: 300,
        description: 'A bright yellow colored pawn',
        color: '#ffff00',
        rarity: 'common'
    },
    {
        id: 205,
        name: 'cyan_pawn',
        displayName: 'Cyan Pawn',
        category: 'pawn',
        cost: 300,
        description: 'A cool cyan colored pawn',
        color: '#00ffff',
        rarity: 'common'
    },
    {
        id: 206,
        name: 'magenta_pawn',
        displayName: 'Magenta Pawn',
        category: 'pawn',
        cost: 300,
        description: 'A vibrant magenta colored pawn',
        color: '#ff00ff',
        rarity: 'common'
    },
    // Special pawn effects
    {
        id: 12,
        name: 'hat_power',
        displayName: 'Hat Power',
        category: 'effect',
        cost: 1000,
        description: 'Add hats to your pawn',
        color: '#00bfff',
        rarity: 'rare'
    },
    {
        id: 67,
        name: 'flashrank',
        displayName: 'Flashrank',
        category: 'effect',
        cost: 5000,
        description: 'Makes pawn fade between current pawn power and rank',
        color: '#00bfff',
        rarity: 'rare'
    },
    {
        id: 144,
        name: 'away_power',
        displayName: 'Away Power',
        category: 'effect',
        cost: 200,
        description: 'Shows away icon on pawn',
        color: '#00bfff',
        rarity: 'common'
    }
];

async function seedPawnPowers() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/xat-chat');
        console.log('Connected to MongoDB');

        // Clear existing pawn powers
        await Power.deleteMany({ category: 'pawn' });
        await Power.deleteMany({ category: 'effect' });
        console.log('Cleared existing pawn powers');

        // Insert new pawn powers
        for (const power of pawnPowers) {
            const existingPower = await Power.findOne({ id: power.id });
            if (existingPower) {
                await Power.updateOne({ id: power.id }, power);
                console.log(`Updated power: ${power.displayName}`);
            } else {
                await Power.create(power);
                console.log(`Created power: ${power.displayName}`);
            }
        }

        console.log('✅ Pawn powers seeded successfully!');
        console.log(`Total powers: ${pawnPowers.length}`);
        
        // Show summary by rarity
        const rarityCounts = await Power.aggregate([
            { $match: { category: { $in: ['pawn', 'effect'] } } },
            { $group: { _id: '$rarity', count: { $sum: 1 } } },
            { $sort: { _id: 1 } }
        ]);
        
        console.log('\n📊 Power Summary:');
        rarityCounts.forEach(rarity => {
            console.log(`${rarity._id}: ${rarity.count} powers`);
        });

    } catch (error) {
        console.error('❌ Error seeding pawn powers:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

// Run the seeder
if (require.main === module) {
    seedPawnPowers();
}

module.exports = { seedPawnPowers, pawnPowers };
