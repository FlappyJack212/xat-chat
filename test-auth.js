#!/usr/bin/env node

/**
 * Test script to debug authentication issues
 */

const mongoose = require('mongoose');
const User = require('./src/server/models/User');
require('dotenv').config();

async function testAuth() {
    try {
        console.log('🧪 Testing authentication system...\n');

        // Test 1: Database connection
        console.log('1. Testing database connection...');
        const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/xat-chat';
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('✅ Database connected successfully\n');

        // Test 2: User model
        console.log('2. Testing User model...');
        const userCount = await User.countDocuments();
        console.log(`✅ User model working, ${userCount} users in database\n`);

        // Test 3: Create test user
        console.log('3. Testing user creation...');
        const testUser = new User({
            username: 'testuser123',
            email: 'test@example.com',
            password: 'testpass123'
        });

        await testUser.save();
        console.log('✅ Test user created successfully:', testUser._id);

        // Test 4: Password comparison
        console.log('4. Testing password comparison...');
        const isValid = await testUser.comparePassword('testpass123');
        console.log('✅ Password comparison working:', isValid);

        // Test 5: Clean up test user
        console.log('5. Cleaning up test user...');
        await User.findByIdAndDelete(testUser._id);
        console.log('✅ Test user deleted\n');

        console.log('🎉 All tests passed! Authentication system is working correctly.\n');
        
        console.log('📋 Next steps:');
        console.log('1. Start the server: node src/server/server-clean.js');
        console.log('2. Test the API: http://localhost:3000/api/test-db');
        console.log('3. Try registration: http://localhost:3000/pages/register.html');

    } catch (error) {
        console.error('❌ Test failed:', error.message);
        console.error('Stack trace:', error.stack);
        process.exit(1);
    } finally {
        await mongoose.disconnect();
        console.log('🔌 Disconnected from database');
    }
}

// Run tests
testAuth();
