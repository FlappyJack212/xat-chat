const mongoose = require('mongoose');
const Power = require('./models/Power');
require('dotenv').config();

// Real iXat powers data based on the SQL structure we analyzed
const realPowers = [
    // Epic Powers
    {
        id: 1,
        name: 'everypower',
        displayName: 'Every Power',
        description: 'Gives access to all powers temporarily',
        category: 'epic',
        cost: 10000,
        status: 'active',
        effects: ['temporary_all_powers'],
        requirements: { minRank: 1 },
        cooldown: 3600, // 1 hour in seconds
        rarity: 'legendary',
        epic: true
    },
    {
        id: 2,
        name: 'setxats',
        displayName: 'Set Xats',
        description: 'Set xats for any user',
        category: 'epic',
        cost: 5000,
        status: 'active',
        effects: ['modify_xats'],
        requirements: { minRank: 3 },
        cooldown: 1800, // 30 minutes
        rarity: 'legendary',
        epic: true
    },
    {
        id: 3,
        name: 'addpower',
        displayName: 'Add Power',
        description: 'Add any power to any user',
        category: 'epic',
        cost: 8000,
        status: 'active',
        effects: ['grant_power'],
        requirements: { minRank: 3 },
        cooldown: 3600, // 1 hour
        rarity: 'legendary',
        epic: true
    },

    // Game Powers
    {
        id: 101,
        name: '8ball',
        displayName: 'Magic 8-Ball',
        description: 'Magic 8-ball power for answering questions',
        category: 'special',
        cost: 100,
        status: 'active',
        effects: ['8ball_response'],
        requirements: { minRank: 0 },
        cooldown: 30, // 30 seconds
        rarity: 'common',
        game: true
    },
    {
        id: 102,
        name: 'radio',
        displayName: 'Radio',
        description: 'Radio power for playing music',
        category: 'special',
        cost: 200,
        status: 'active',
        effects: ['play_music'],
        requirements: { minRank: 0 },
        cooldown: 60, // 1 minute
        rarity: 'common',
        game: true
    },

    // Group Powers
    {
        id: 201,
        name: 'group',
        displayName: 'Group',
        description: 'Create and manage chat groups',
        category: 'special',
        cost: 500,
        status: 'active',
        effects: ['create_group', 'manage_group'],
        requirements: { minRank: 1 },
        cooldown: 300, // 5 minutes
        rarity: 'rare'
    },

    // Moderation Powers
    {
        id: 301,
        name: 'kick',
        displayName: 'Kick',
        description: 'Kick users from chat',
        category: 'moderation',
        cost: 300,
        status: 'active',
        effects: ['kick_user'],
        requirements: { minRank: 3 },
        cooldown: 60, // 1 minute
        rarity: 'common'
    },
    {
        id: 302,
        name: 'ban',
        displayName: 'Ban',
        description: 'Ban users from chat',
        category: 'moderation',
        cost: 500,
        status: 'active',
        effects: ['ban_user'],
        requirements: { minRank: 3 },
        cooldown: 300, // 5 minutes
        rarity: 'rare'
    },
    {
        id: 303,
        name: 'mute',
        displayName: 'Mute',
        description: 'Mute users in chat',
        category: 'moderation',
        cost: 200,
        status: 'active',
        effects: ['mute_user'],
        requirements: { minRank: 3 },
        cooldown: 120, // 2 minutes
        rarity: 'common'
    },

    // Chat Powers
    {
        id: 401,
        name: 'smilies',
        displayName: 'Smilies',
        description: 'Access to extended smilies',
        category: 'pawn',
        cost: 150,
        status: 'active',
        effects: ['extended_smilies'],
        requirements: { minRank: 0 },
        cooldown: 0, // No cooldown
        rarity: 'common'
    },
    {
        id: 402,
        name: 'colors',
        displayName: 'Colors',
        description: 'Use colors in chat',
        category: 'pawn',
        cost: 100,
        status: 'active',
        effects: ['chat_colors'],
        requirements: { minRank: 0 },
        cooldown: 0, // No cooldown
        rarity: 'common'
    },

    // Utility Powers
    {
        id: 501,
        name: 'transfer',
        displayName: 'Transfer',
        description: 'Transfer xats to other users',
        category: 'special',
        cost: 50,
        status: 'active',
        effects: ['transfer_xats'],
        requirements: { minRank: 0 },
        cooldown: 60, // 1 minute
        rarity: 'common'
    },
    {
        id: 502,
        name: 'trade',
        displayName: 'Trade',
        description: 'Trade items with other users',
        category: 'special',
        cost: 75,
        status: 'active',
        effects: ['trade_items'],
        requirements: { minRank: 0 },
        cooldown: 30, // 30 seconds
        rarity: 'common'
    }
];

async function importPowers() {
    try {
        // Connect to MongoDB
        const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/xat-chat';
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
        console.log('🎭 [IMPORT] Connected to MongoDB');
        
        // Clear existing powers
        await Power.deleteMany({});
        console.log('🎭 [IMPORT] Cleared existing powers');
        
        // Import real powers
        const importedPowers = await Power.insertMany(realPowers);
        console.log(`🎭 [IMPORT] Successfully imported ${importedPowers.length} real powers`);
        
        // Log some examples
        console.log('🎭 [IMPORT] Sample powers imported:');
        importedPowers.slice(0, 5).forEach(power => {
            console.log(`  - ${power.name}: ${power.description} (${power.cost} xats)`);
        });
        
        console.log('🎭 [IMPORT] Power import completed successfully!');
        
    } catch (error) {
        console.error('🎭 [IMPORT] Error importing powers:', error);
    } finally {
        await mongoose.disconnect();
        console.log('🎭 [IMPORT] Disconnected from MongoDB');
    }
}

// Run the import
importPowers();
