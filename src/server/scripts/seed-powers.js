const mongoose = require('mongoose');
const Power = require('../models/Power');

// Connect to database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ixat_chat');

// Original iXat powers data
const powers = [
    // Basic Powers (P0)
    { name: 'allpowers', section: 'p0', subid: 1, cost: 0, xats: 0, days: 0, type: 'utility', description: 'All Powers', status: 'Available' },
    { name: 'smile', section: 'p0', subid: 2, cost: 0, xats: 0, days: 0, type: 'smiley', description: 'Smile', status: 'Available' },
    { name: 'bigsmile', section: 'p0', subid: 3, cost: 0, xats: 0, days: 0, type: 'smiley', description: 'Big Smile', status: 'Available' },
    { name: 'sad', section: 'p0', subid: 4, cost: 0, xats: 0, days: 0, type: 'smiley', description: 'Sad', status: 'Available' },
    { name: 'wink', section: 'p0', subid: 5, cost: 0, xats: 0, days: 0, type: 'smiley', description: 'Wink', status: 'Available' },
    { name: 'tongue', section: 'p0', subid: 6, cost: 0, xats: 0, days: 0, type: 'smiley', description: 'Tongue', status: 'Available' },
    { name: 'surprised', section: 'p0', subid: 7, cost: 0, xats: 0, days: 0, type: 'smiley', description: 'Surprised', status: 'Available' },
    { name: 'confused', section: 'p0', subid: 8, cost: 0, xats: 0, days: 0, type: 'smiley', description: 'Confused', status: 'Available' },
    { name: 'cool', section: 'p0', subid: 9, cost: 0, xats: 0, days: 0, type: 'smiley', description: 'Cool', status: 'Available' },
    { name: 'laugh', section: 'p0', subid: 10, cost: 0, xats: 0, days: 0, type: 'smiley', description: 'Laugh', status: 'Available' },
    
    // Moderation Powers (P1)
    { name: 'kick', section: 'p1', subid: 1, cost: 0, xats: 0, days: 0, type: 'moderation', description: 'Kick', status: 'Available', requirements: { minRank: 'moderator' } },
    { name: 'ban', section: 'p1', subid: 2, cost: 0, xats: 0, days: 0, type: 'moderation', description: 'Ban', status: 'Available', requirements: { minRank: 'moderator' } },
    { name: 'mute', section: 'p1', subid: 3, cost: 0, xats: 0, days: 0, type: 'moderation', description: 'Mute', status: 'Available', requirements: { minRank: 'moderator' } },
    { name: 'unmute', section: 'p1', subid: 4, cost: 0, xats: 0, days: 0, type: 'moderation', description: 'Unmute', status: 'Available', requirements: { minRank: 'moderator' } },
    { name: 'kickall', section: 'p1', subid: 5, cost: 0, xats: 0, days: 0, type: 'moderation', description: 'Kick All', status: 'Available', requirements: { minRank: 'owner' } },
    { name: 'hush', section: 'p1', subid: 6, cost: 0, xats: 0, days: 0, type: 'moderation', description: 'Hush Chat', status: 'Available', requirements: { minRank: 'owner' } },
    { name: 'unhush', section: 'p1', subid: 7, cost: 0, xats: 0, days: 0, type: 'moderation', description: 'Unhush Chat', status: 'Available', requirements: { minRank: 'owner' } },
    { name: 'promote', section: 'p1', subid: 8, cost: 0, xats: 0, days: 0, type: 'moderation', description: 'Promote User', status: 'Available', requirements: { minRank: 'owner' } },
    { name: 'demote', section: 'p1', subid: 9, cost: 0, xats: 0, days: 0, type: 'moderation', description: 'Demote User', status: 'Available', requirements: { minRank: 'owner' } },
    { name: 'ranklock', section: 'p1', subid: 10, cost: 0, xats: 0, days: 0, type: 'moderation', description: 'Rank Lock', status: 'Available', requirements: { minRank: 'owner' } },
    
    // Chat Powers (P2)
    { name: 'color', section: 'p2', subid: 1, cost: 0, xats: 0, days: 0, type: 'chat', description: 'Color Text', status: 'Available' },
    { name: 'bold', section: 'p2', subid: 2, cost: 0, xats: 0, days: 0, type: 'chat', description: 'Bold Text', status: 'Available' },
    { name: 'italic', section: 'p2', subid: 3, cost: 0, xats: 0, days: 0, type: 'chat', description: 'Italic Text', status: 'Available' },
    { name: 'underline', section: 'p2', subid: 4, cost: 0, xats: 0, days: 0, type: 'chat', description: 'Underline Text', status: 'Available' },
    { name: 'strike', section: 'p2', subid: 5, cost: 0, xats: 0, days: 0, type: 'chat', description: 'Strikethrough Text', status: 'Available' },
    { name: 'rainbow', section: 'p2', subid: 6, cost: 0, xats: 0, days: 0, type: 'chat', description: 'Rainbow Text', status: 'Available' },
    { name: 'reverse', section: 'p2', subid: 7, cost: 0, xats: 0, days: 0, type: 'chat', description: 'Reverse Text', status: 'Available' },
    { name: 'jumble', section: 'p2', subid: 8, cost: 0, xats: 0, days: 0, type: 'chat', description: 'Jumble Text', status: 'Available' },
    { name: 'middle', section: 'p2', subid: 9, cost: 0, xats: 0, days: 0, type: 'chat', description: 'Middle Text', status: 'Available' },
    { name: 'mix', section: 'p2', subid: 10, cost: 0, xats: 0, days: 0, type: 'chat', description: 'Mix Text', status: 'Available' },
    
    // Game Powers (P3)
    { name: 'doodlerace', section: 'p3', subid: 1, cost: 0, xats: 0, days: 0, type: 'game', description: 'Doodle Race', status: 'Available', game: true },
    { name: 'snakerace', section: 'p3', subid: 2, cost: 0, xats: 0, days: 0, type: 'game', description: 'Snake Race', status: 'Available', game: true },
    { name: 'matchrace', section: 'p3', subid: 3, cost: 0, xats: 0, days: 0, type: 'game', description: 'Match Race', status: 'Available', game: true },
    { name: 'spacewar', section: 'p3', subid: 4, cost: 0, xats: 0, days: 0, type: 'game', description: 'Space War', status: 'Available', game: true },
    { name: 'hearts', section: 'p3', subid: 5, cost: 0, xats: 0, days: 0, type: 'game', description: 'Hearts', status: 'Available', game: true },
    { name: 'switch', section: 'p3', subid: 6, cost: 0, xats: 0, days: 0, type: 'game', description: 'Switch', status: 'Available', game: true },
    { name: 'darts', section: 'p3', subid: 7, cost: 0, xats: 0, days: 0, type: 'game', description: 'Darts', status: 'Available', game: true },
    { name: 'zwhack', section: 'p3', subid: 8, cost: 0, xats: 0, days: 0, type: 'game', description: 'Z Whack', status: 'Available', game: true },
    
    // Group Powers (P4)
    { name: 'create_group', section: 'p4', subid: 1, cost: 0, xats: 0, days: 0, type: 'group', description: 'Create Group', status: 'Available', group: true },
    { name: 'manage_group', section: 'p4', subid: 2, cost: 0, xats: 0, days: 0, type: 'group', description: 'Manage Group', status: 'Available', group: true },
    { name: 'group_control', section: 'p4', subid: 3, cost: 0, xats: 0, days: 0, type: 'group', description: 'Group Control', status: 'Available', group: true },
    { name: 'group_settings', section: 'p4', subid: 4, cost: 0, xats: 0, days: 0, type: 'group', description: 'Group Settings', status: 'Available', group: true },
    
    // Epic Powers (P5)
    { name: 'epic_smile', section: 'p5', subid: 1, cost: 100, xats: 100, days: 0, type: 'epic', description: 'Epic Smile', status: 'Available', epic: true },
    { name: 'epic_color', section: 'p5', subid: 2, cost: 200, xats: 200, days: 0, type: 'epic', description: 'Epic Color', status: 'Available', epic: true },
    { name: 'epic_effect', section: 'p5', subid: 3, cost: 300, xats: 300, days: 0, type: 'epic', description: 'Epic Effect', status: 'Available', epic: true },
    { name: 'epic_avatar', section: 'p5', subid: 4, cost: 500, xats: 500, days: 0, type: 'epic', description: 'Epic Avatar', status: 'Available', epic: true },
    { name: 'epic_sound', section: 'p5', subid: 5, cost: 400, xats: 400, days: 0, type: 'epic', description: 'Epic Sound', status: 'Available', epic: true },
    
    // Special Powers (P6)
    { name: 'transfer_xats', section: 'p6', subid: 1, cost: 0, xats: 0, days: 0, type: 'utility', description: 'Transfer Xats', status: 'Available' },
    { name: 'trade_items', section: 'p6', subid: 2, cost: 0, xats: 0, days: 0, type: 'utility', description: 'Trade Items', status: 'Available' },
    { name: '8ball_response', section: 'p6', subid: 3, cost: 0, xats: 0, days: 0, type: 'utility', description: '8-Ball Response', status: 'Available' },
    { name: 'play_music', section: 'p6', subid: 4, cost: 0, xats: 0, days: 0, type: 'utility', description: 'Play Music', status: 'Available' },
    { name: 'create_avatar', section: 'p6', subid: 5, cost: 0, xats: 0, days: 0, type: 'utility', description: 'Create Avatar', status: 'Available' },
    
    // Visual Effects (P7)
    { name: 'fireworks', section: 'p7', subid: 1, cost: 0, xats: 0, days: 0, type: 'effects', description: 'Fireworks', status: 'Available' },
    { name: 'hearts', section: 'p7', subid: 2, cost: 0, xats: 0, days: 0, type: 'effects', description: 'Hearts', status: 'Available' },
    { name: 'stars', section: 'p7', subid: 3, cost: 0, xats: 0, days: 0, type: 'effects', description: 'Stars', status: 'Available' },
    { name: 'sparkles', section: 'p7', subid: 4, cost: 0, xats: 0, days: 0, type: 'effects', description: 'Sparkles', status: 'Available' },
    { name: 'confetti', section: 'p7', subid: 5, cost: 0, xats: 0, days: 0, type: 'effects', description: 'Confetti', status: 'Available' },
    
    // Avatar Powers (P8)
    { name: 'custom_avatar', section: 'p8', subid: 1, cost: 0, xats: 0, days: 0, type: 'avatar', description: 'Custom Avatar', status: 'Available' },
    { name: 'animated_avatar', section: 'p8', subid: 2, cost: 0, xats: 0, days: 0, type: 'avatar', description: 'Animated Avatar', status: 'Available' },
    { name: 'avatar_effects', section: 'p8', subid: 3, cost: 0, xats: 0, days: 0, type: 'avatar', description: 'Avatar Effects', status: 'Available' },
    { name: 'avatar_background', section: 'p8', subid: 4, cost: 0, xats: 0, days: 0, type: 'avatar', description: 'Avatar Background', status: 'Available' },
    
    // Sound Powers (P9)
    { name: 'sound_effects', section: 'p9', subid: 1, cost: 0, xats: 0, days: 0, type: 'sound', description: 'Sound Effects', status: 'Available' },
    { name: 'music_player', section: 'p9', subid: 2, cost: 0, xats: 0, days: 0, type: 'sound', description: 'Music Player', status: 'Available' },
    { name: 'voice_chat', section: 'p9', subid: 3, cost: 0, xats: 0, days: 0, type: 'sound', description: 'Voice Chat', status: 'Available' },
    { name: 'notification_sounds', section: 'p9', subid: 4, cost: 0, xats: 0, days: 0, type: 'sound', description: 'Notification Sounds', status: 'Available' }
];

async function seedPowers() {
    try {
        console.log('🌱 Seeding powers...');
        
        // Clear existing powers
        await Power.deleteMany({});
        
        // Insert powers one by one to handle duplicates
        let successCount = 0;
        let errorCount = 0;
        
        for (const power of powers) {
            try {
                const newPower = new Power(power);
                await newPower.save();
                successCount++;
            } catch (error) {
                if (error.code === 11000) {
                    console.log(`⚠️ Skipping duplicate power: ${power.name}`);
                    errorCount++;
                } else {
                    console.error(`❌ Error inserting power ${power.name}:`, error.message);
                    errorCount++;
                }
            }
        }
        
        console.log(`✅ Successfully seeded ${successCount} powers!`);
        if (errorCount > 0) {
            console.log(`⚠️ Skipped ${errorCount} duplicate powers`);
        }
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding powers:', error);
        process.exit(1);
    }
}

seedPowers();
