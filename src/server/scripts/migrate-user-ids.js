/**
 * Migration script to add xat-style numeric IDs to existing users
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import User model
const User = require('../models/User');

async function migrateUserIds() {
    try {
        // Connect to database
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ixat_chat');
        console.log('🗄️ Connected to MongoDB');

        // Find all users without userId
        const usersWithoutId = await User.find({ userId: { $exists: false } });
        console.log(`📊 Found ${usersWithoutId.length} users without userId`);

        let migrated = 0;
        for (const user of usersWithoutId) {
            // Generate unique xat-style ID
            let userId;
            let isUnique = false;
            
            while (!isUnique) {
                userId = Math.floor(Math.random() * 900000000) + 100000000;
                const existingUser = await User.findOne({ userId });
                if (!existingUser) {
                    isUnique = true;
                }
            }

            // Update user with new ID
            user.userId = userId;
            await user.save();
            migrated++;

            console.log(`✅ Migrated user ${user.username}: ${userId}`);
        }

        console.log(`🎉 Migration complete! Migrated ${migrated} users`);
        
        // Verify migration
        const totalUsers = await User.countDocuments();
        const usersWithId = await User.countDocuments({ userId: { $exists: true } });
        console.log(`📊 Total users: ${totalUsers}, Users with ID: ${usersWithId}`);

    } catch (error) {
        console.error('❌ Migration error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('🔌 Disconnected from MongoDB');
    }
}

// Run migration if called directly
if (require.main === module) {
    migrateUserIds();
}

module.exports = migrateUserIds;
