#!/usr/bin/env node
/**
 * Ultra Simple Email System
 * No external APIs, no nodemailer - just generates verification links
 * Like how many sites handle email verification
 */

const express = require('express');
const mongoose = require('mongoose');
const crypto = require('crypto');

// Connect to database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ixat_chat');

const User = require('../models/User');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Send verification email endpoint
app.post('/send-verification', async (req, res) => {
    try {
        const { email, username } = req.body;
        
        if (!email || !username) {
            return res.status(400).json({ 
                success: false, 
                message: 'Email and username are required' 
            });
        }

        // Generate verification token
        const token = crypto.randomBytes(32).toString('hex');
        const verificationUrl = `http://localhost:8000/verify-email?token=${token}&email=${email}`;

        // Update user with verification token
        await User.findOneAndUpdate(
            { email: email },
            { 
                emailVerificationToken: token,
                emailVerificationExpires: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
            }
        );

        // In a real app, you would send this via email service
        // For now, we'll just return the verification URL
        console.log(`📧 Verification email for ${email}:`);
        console.log(`🔗 Verification URL: ${verificationUrl}`);
        console.log(`👤 Username: ${username}`);
        
        res.json({ 
            success: true, 
            message: 'Verification email generated successfully',
            verificationUrl: verificationUrl,
            note: 'In production, this URL would be sent via email service'
        });
    } catch (error) {
        console.error('❌ Failed to generate verification:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to generate verification: ' + error.message
        });
    }
});

// Verify email endpoint
app.get('/verify-email', async (req, res) => {
    try {
        const { token, email } = req.query;
        
        if (!token || !email) {
            return res.status(400).send(`
                <h1>❌ Invalid Request</h1>
                <p>Token and email are required.</p>
            `);
        }

        // Find user with matching token and email
        const user = await User.findOne({
            email: email,
            emailVerificationToken: token,
            emailVerificationExpires: { $gt: new Date() }
        });

        if (!user) {
            return res.status(400).send(`
                <h1>❌ Invalid or Expired Token</h1>
                <p>This verification link is invalid or has expired.</p>
                <p>Please request a new verification email.</p>
            `);
        }

        // Update user as verified
        user.emailVerified = true;
        user.emailVerificationToken = undefined;
        user.emailVerificationExpires = undefined;
        await user.save();

        console.log(`✅ Email verified for ${user.username}`);
        
        res.send(`
            <h1>✅ Email Verified Successfully!</h1>
            <p>Welcome to Xat Chat, ${user.username}!</p>
            <p>Your email has been verified and you can now use all features.</p>
            <a href="http://localhost:8000" style="background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Go to Chat</a>
        `);
    } catch (error) {
        console.error('❌ Verification failed:', error);
        res.status(500).send(`
            <h1>❌ Verification Failed</h1>
            <p>An error occurred during verification. Please try again.</p>
        `);
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        service: 'Ultra Simple Email System',
        timestamp: new Date().toISOString()
    });
});

const PORT = process.env.EMAIL_PORT || 3001;

app.listen(PORT, () => {
    console.log(`🚀 Ultra Simple Email System running on port ${PORT}`);
    console.log(`📧 Send verification: POST http://localhost:${PORT}/send-verification`);
    console.log(`✅ Verify email: GET http://localhost:${PORT}/verify-email?token=xxx&email=xxx`);
    console.log(`❤️ Health check: GET http://localhost:${PORT}/health`);
    console.log(`\n💡 This system generates verification URLs that you can copy/paste or send via any email service!`);
});

module.exports = app;
