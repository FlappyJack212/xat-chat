#!/usr/bin/env node
/**
 * Email Verification Handler
 * Handles email verification tokens (like verify.php)
 * Usage: node verify-email.js <token> <email>
 */

const mongoose = require('mongoose');

// Connect to database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ixat_chat');

const User = require('../models/User');

class EmailVerificationHandler {
    async verifyEmail(token, email) {
        try {
            console.log('🔍 Verifying email...');
            console.log(`📧 Email: ${email}`);
            console.log(`🔑 Token: ${token.substring(0, 8)}...`);

            // Find user with matching token and email
            const user = await User.findOne({
                email: email,
                emailVerificationToken: token,
                emailVerificationExpires: { $gt: new Date() }
            });

            if (!user) {
                console.log('❌ Invalid or expired verification token');
                return { success: false, message: 'Invalid or expired verification token' };
            }

            // Update user as verified
            user.emailVerified = true;
            user.emailVerificationToken = undefined;
            user.emailVerificationExpires = undefined;
            await user.save();

            console.log('✅ Email verified successfully!');
            console.log(`👤 User: ${user.username}`);
            
            return { 
                success: true, 
                message: 'Email verified successfully!',
                user: {
                    username: user.username,
                    email: user.email,
                    emailVerified: user.emailVerified
                }
            };
        } catch (error) {
            console.error('❌ Verification failed:', error.message);
            return { success: false, message: 'Verification failed: ' + error.message };
        }
    }
}

// Main execution
async function main() {
    const args = process.argv.slice(2);
    
    if (args.length < 2) {
        console.log('Usage: node verify-email.js <token> <email>');
        console.log('Example: node verify-email.js abc123def456 user@example.com');
        process.exit(1);
    }

    const [token, email] = args;
    
    console.log('🚀 Starting email verification...');
    
    const handler = new EmailVerificationHandler();
    const result = await handler.verifyEmail(token, email);
    
    if (result.success) {
        console.log('✅ Email verification completed successfully!');
        console.log(`👤 User ${result.user.username} is now verified`);
        process.exit(0);
    } else {
        console.log('❌ Email verification failed:', result.message);
        process.exit(1);
    }
}

// Run the script
main().catch(console.error);
