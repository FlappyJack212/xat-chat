const mongoose = require('mongoose');
const Power = require('./models/Power');
require('dotenv').config();

// Real iXat powers data based on the SQL structure we analyzed
const realPowers = [
    // Epic Powers
    {
        name: 'everypower',
        description: 'Gives access to all powers temporarily',
        section: 'epic',
        subid: 1,
        cost: 10000,
        xats: 10000,
        days: 0,
        type: 'epic',
        status: 'active',
        effects: ['temporary_all_powers'],
        requirements: { rank: 'member' },
        cooldowns: { global: 3600000 }, // 1 hour
        metadata: { originalId: 1 }
    },
    {
        name: 'setxats',
        description: 'Set xats for any user',
        section: 'epic',
        subid: 2,
        cost: 5000,
        xats: 5000,
        days: 0,
        type: 'epic',
        status: 'active',
        effects: ['modify_xats'],
        requirements: { rank: 'moderator' },
        cooldowns: { global: 1800000 }, // 30 minutes
        metadata: { originalId: 2 }
    },
    {
        name: 'addpower',
        description: 'Add any power to any user',
        section: 'epic',
        subid: 3,
        cost: 8000,
        xats: 8000,
        days: 0,
        type: 'epic',
        status: 'active',
        effects: ['grant_power'],
        requirements: { rank: 'moderator' },
        cooldowns: { global: 3600000 }, // 1 hour
        metadata: { originalId: 3 }
    },

    // Game Powers
    {
        name: '8ball',
        description: 'Magic 8-ball power for answering questions',
        section: 'game',
        subid: 1,
        cost: 100,
        xats: 100,
        days: 0,
        type: 'game',
        status: 'active',
        effects: ['8ball_response'],
        requirements: { rank: 'guest' },
        cooldowns: { personal: 30000 }, // 30 seconds
        metadata: { originalId: 101 }
    },
    {
        name: 'radio',
        description: 'Radio power for playing music',
        section: 'game',
        subid: 2,
        cost: 200,
        xats: 200,
        days: 0,
        type: 'game',
        status: 'active',
        effects: ['play_music'],
        requirements: { rank: 'guest' },
        cooldowns: { personal: 60000 }, // 1 minute
        metadata: { originalId: 102 }
    },

    // Group Powers
    {
        name: 'group',
        description: 'Create and manage chat groups',
        section: 'group',
        subid: 1,
        cost: 500,
        xats: 500,
        days: 0,
        type: 'group',
        status: 'active',
        effects: ['create_group', 'manage_group'],
        requirements: { rank: 'member' },
        cooldowns: { personal: 300000 }, // 5 minutes
        metadata: { originalId: 201 }
    },

    // Moderation Powers
    {
        name: 'kick',
        description: 'Kick users from chat',
        section: 'moderation',
        subid: 1,
        cost: 300,
        xats: 300,
        days: 0,
        type: 'moderation',
        status: 'active',
        effects: ['kick_user'],
        requirements: { rank: 'moderator' },
        cooldowns: { personal: 60000 }, // 1 minute
        metadata: { originalId: 301 }
    },
    {
        name: 'ban',
        description: 'Ban users from chat',
        section: 'moderation',
        subid: 2,
        cost: 500,
        xats: 500,
        days: 0,
        type: 'moderation',
        status: 'active',
        effects: ['ban_user'],
        requirements: { rank: 'moderator' },
        cooldowns: { personal: 300000 }, // 5 minutes
        metadata: { originalId: 302 }
    },
    {
        name: 'mute',
        description: 'Mute users in chat',
        section: 'moderation',
        subid: 3,
        cost: 200,
        xats: 200,
        days: 0,
        type: 'moderation',
        status: 'active',
        effects: ['mute_user'],
        requirements: { rank: 'moderator' },
        cooldowns: { personal: 120000 }, // 2 minutes
        metadata: { originalId: 303 }
    },

    // Chat Powers
    {
        name: 'smilies',
        description: 'Access to extended smilies',
        section: 'chat',
        subid: 1,
        cost: 150,
        xats: 150,
        days: 0,
        type: 'chat',
        status: 'active',
        effects: ['extended_smilies'],
        requirements: { rank: 'guest' },
        cooldowns: { personal: 0 }, // No cooldown
        metadata: { originalId: 401 }
    },
    {
        name: 'colors',
        description: 'Use colors in chat',
        section: 'chat',
        subid: 2,
        cost: 100,
        xats: 100,
        days: 0,
        type: 'chat',
        status: 'active',
        effects: ['chat_colors'],
        requirements: { rank: 'guest' },
        cooldowns: { personal: 0 }, // No cooldown
        metadata: { originalId: 402 }
    },

    // Utility Powers
    {
        name: 'transfer',
        description: 'Transfer xats to other users',
        section: 'utility',
        subid: 1,
        cost: 50,
        xats: 50,
        days: 0,
        type: 'utility',
        status: 'active',
        effects: ['transfer_xats'],
        requirements: { rank: 'guest' },
        cooldowns: { personal: 60000 }, // 1 minute
        metadata: { originalId: 501 }
    },
    {
        name: 'trade',
        description: 'Trade items with other users',
        section: 'utility',
        subid: 2,
        cost: 75,
        xats: 75,
        days: 0,
        type: 'utility',
        status: 'active',
        effects: ['trade_items'],
        requirements: { rank: 'guest' },
        cooldowns: { personal: 30000 }, // 30 seconds
        metadata: { originalId: 502 }
    }
];

async function importPowers() {
    try {
        // Connect to MongoDB
        const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ixat_chat';
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
