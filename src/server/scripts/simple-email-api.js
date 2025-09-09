#!/usr/bin/env node
/**
 * Simple Email API (No nodemailer needed!)
 * Uses email service APIs directly with HTTP requests
 * Like how most modern sites handle email
 */

const express = require('express');
const mongoose = require('mongoose');
const crypto = require('crypto');
const axios = require('axios');

// Connect to database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ixat_chat');

const User = require('../models/User');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

class SimpleEmailAPI {
    constructor() {
        this.emailProvider = process.env.EMAIL_PROVIDER || 'resend'; // resend, sendgrid, mailgun
    }

    async sendEmail(to, subject, html, text) {
        try {
            switch (this.emailProvider) {
                case 'resend':
                    return await this.sendWithResend(to, subject, html, text);
                case 'sendgrid':
                    return await this.sendWithSendGrid(to, subject, html, text);
                case 'mailgun':
                    return await this.sendWithMailgun(to, subject, html, text);
                default:
                    return await this.sendWithResend(to, subject, html, text);
            }
        } catch (error) {
            console.error('❌ Email sending failed:', error.message);
            throw error;
        }
    }

    // Resend API (Modern, simple)
    async sendWithResend(to, subject, html, text) {
        const response = await axios.post('https://api.resend.com/emails', {
            from: 'Xat Chat <noreply@xatchat.com>',
            to: [to],
            subject: subject,
            html: html,
            text: text
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    }

    // SendGrid API
    async sendWithSendGrid(to, subject, html, text) {
        const response = await axios.post('https://api.sendgrid.com/v3/mail/send', {
            personalizations: [{
                to: [{ email: to }]
            }],
            from: { email: 'noreply@xatchat.com', name: 'Xat Chat' },
            subject: subject,
            content: [
                { type: 'text/plain', value: text },
                { type: 'text/html', value: html }
            ]
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    }

    // Mailgun API
    async sendWithMailgun(to, subject, html, text) {
        const formData = new URLSearchParams();
        formData.append('from', 'Xat Chat <noreply@xatchat.com>');
        formData.append('to', to);
        formData.append('subject', subject);
        formData.append('text', text);
        formData.append('html', html);

        const response = await axios.post(
            `https://api.mailgun.net/v3/${process.env.MAILGUN_DOMAIN}/messages`,
            formData,
            {
                auth: {
                    username: 'api',
                    password: process.env.MAILGUN_API_KEY
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );

        return response.data;
    }
}

const emailAPI = new SimpleEmailAPI();

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

        // Send email using API
        const result = await emailAPI.sendEmail(
            email,
            '✅ Verify Your Xat Chat Account',
            `
                <h1>Welcome to Xat Chat!</h1>
                <p>Hi ${username},</p>
                <p>Please verify your email by clicking the link below:</p>
                <a href="${verificationUrl}" style="background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify Account</a>
                <p>This link expires in 24 hours.</p>
            `,
            `Welcome to Xat Chat!\n\nHi ${username},\n\nPlease verify your email by visiting: ${verificationUrl}\n\nThis link expires in 24 hours.`
        );
        
        console.log(`✅ Verification email sent to ${email}`);
        res.json({ 
            success: true, 
            message: 'Verification email sent successfully',
            verificationUrl: verificationUrl,
            emailId: result.id || result.message_id
        });
    } catch (error) {
        console.error('❌ Failed to send verification email:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to send verification email: ' + error.message
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
        service: 'Simple Email API',
        provider: emailAPI.emailProvider,
        timestamp: new Date().toISOString()
    });
});

const PORT = process.env.EMAIL_PORT || 3001;

app.listen(PORT, () => {
    console.log(`🚀 Simple Email API running on port ${PORT}`);
    console.log(`📧 Provider: ${emailAPI.emailProvider}`);
    console.log(`📧 Send verification: POST http://localhost:${PORT}/send-verification`);
    console.log(`✅ Verify email: GET http://localhost:${PORT}/verify-email?token=xxx&email=xxx`);
    console.log(`❤️ Health check: GET http://localhost:${PORT}/health`);
});

module.exports = app;
