#!/usr/bin/env node
/**
 * Email Webhook Server
 * Simple HTTP server that handles email verification (like PHP scripts)
 * Usage: node email-webhook.js
 */

const express = require('express');
const mongoose = require('mongoose');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

// Connect to database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ixat_chat');

const User = require('../models/User');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Email transporter
const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER || 'your-email@gmail.com',
        pass: process.env.GMAIL_APP_PASSWORD || 'your-app-password'
    }
});

// Send verification email endpoint (like send-email.php)
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

        // Send email
        const mailOptions = {
            from: '"🎭 Xat Chat" <noreply@xatchat.com>',
            to: email,
            subject: '✅ Verify Your Xat Chat Account',
            html: `
                <h1>Welcome to Xat Chat!</h1>
                <p>Hi ${username},</p>
                <p>Please verify your email by clicking the link below:</p>
                <a href="${verificationUrl}" style="background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify Account</a>
                <p>This link expires in 24 hours.</p>
            `
        };

        await transporter.sendMail(mailOptions);
        
        console.log(`✅ Verification email sent to ${email}`);
        res.json({ 
            success: true, 
            message: 'Verification email sent successfully',
            verificationUrl: verificationUrl
        });
    } catch (error) {
        console.error('❌ Failed to send verification email:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to send verification email' 
        });
    }
});

// Verify email endpoint (like verify.php)
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
        service: 'Email Webhook Server',
        timestamp: new Date().toISOString()
    });
});

const PORT = process.env.EMAIL_PORT || 3001;

app.listen(PORT, () => {
    console.log(`🚀 Email webhook server running on port ${PORT}`);
    console.log(`📧 Send verification: POST http://localhost:${PORT}/send-verification`);
    console.log(`✅ Verify email: GET http://localhost:${PORT}/verify-email?token=xxx&email=xxx`);
    console.log(`❤️ Health check: GET http://localhost:${PORT}/health`);
});

module.exports = app;
