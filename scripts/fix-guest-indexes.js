const mongoose = require('mongoose');
require('dotenv').config();

async function fixGuestIndexes() {
    try {
        const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/xat-chat';
        await mongoose.connect(uri);
        console.log('🎭 [FIX] Connected to MongoDB');
        
        const db = mongoose.connection.db;
        const collection = db.collection('users');
        
        // Drop existing indexes
        console.log('🎭 [FIX] Dropping existing indexes...');
        try {
            await collection.dropIndex('username_1');
            console.log('🎭 [FIX] Dropped username_1 index');
        } catch (e) {
            console.log('🎭 [FIX] username_1 index not found or already dropped');
        }
        
        try {
            await collection.dropIndex('email_1');
            console.log('🎭 [FIX] Dropped email_1 index');
        } catch (e) {
            console.log('🎭 [FIX] email_1 index not found or already dropped');
        }
        
        // Create new sparse indexes for guest support
        console.log('🎭 [FIX] Creating new sparse indexes...');
        await collection.createIndex({ username: 1 }, { 
            unique: true, 
            sparse: true,
            name: 'username_1_sparse'
        });
        console.log('🎭 [FIX] Created sparse username index');
        
        await collection.createIndex({ email: 1 }, { 
            unique: true, 
            sparse: true,
            name: 'email_1_sparse'
        });
        console.log('🎭 [FIX] Created sparse email index');
        
        // Create guest-specific indexes (skip if they exist)
        try {
            await collection.createIndex({ guestId: 1 }, { 
                unique: true, 
                sparse: true,
                name: 'guestId_1_sparse'
            });
            console.log('🎭 [FIX] Created guestId index');
        } catch (e) {
            console.log('🎭 [FIX] guestId index already exists');
        }
        
        try {
            await collection.createIndex({ guestSessionId: 1 }, { 
                unique: true, 
                sparse: true,
                name: 'guestSessionId_1_sparse'
            });
            console.log('🎭 [FIX] Created guestSessionId index');
        } catch (e) {
            console.log('🎭 [FIX] guestSessionId index already exists');
        }
        
        try {
            await collection.createIndex({ isGuest: 1 });
            console.log('🎭 [FIX] Created isGuest index');
        } catch (e) {
            console.log('🎭 [FIX] isGuest index already exists');
        }
        
        console.log('🎭 [FIX] All indexes created successfully!');
        
    } catch (error) {
        console.error('🎭 [FIX] Error fixing indexes:', error);
    } finally {
        await mongoose.disconnect();
        console.log('🎭 [FIX] Disconnected from MongoDB');
    }
}

fixGuestIndexes();
