#!/usr/bin/env node
/**
 * Email Verification Script
 * Automatically sends verification emails (like PHP scripts do)
 * Usage: node send-verification-email.js <email> <username>
 */

const nodemailer = require('nodemailer');
const crypto = require('crypto');
const mongoose = require('mongoose');

// Connect to database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ixat_chat');

const User = require('../models/User');

class EmailVerificationScript {
    constructor() {
        this.transporter = null;
        this.init();
    }

    async init() {
        // Use Gmail SMTP (most common for scripts)
        this.transporter = nodemailer.createTransporter({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER || 'your-email@gmail.com',
                pass: process.env.GMAIL_APP_PASSWORD || 'your-app-password'
            }
        });
    }

    async sendVerificationEmail(email, username) {
        try {
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
                html: this.createVerificationEmailHTML(username, verificationUrl),
                text: this.createVerificationEmailText(username, verificationUrl)
            };

            const info = await this.transporter.sendMail(mailOptions);
            console.log('✅ Verification email sent successfully!');
            console.log('📧 Email ID:', info.messageId);
            console.log('🔗 Verification URL:', verificationUrl);
            
            return { success: true, messageId: info.messageId };
        } catch (error) {
            console.error('❌ Failed to send verification email:', error.message);
            return { success: false, error: error.message };
        }
    }

    createVerificationEmailHTML(username, verificationUrl) {
        return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Verify Your Xat Chat Account</title>
            <style>
                body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 20px; }
                .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; padding: 30px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
                .header { text-align: center; margin-bottom: 30px; }
                .logo { font-size: 3em; margin-bottom: 10px; }
                .title { color: #333; margin-bottom: 20px; }
                .button { display: inline-block; background: #007bff; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
                .footer { text-align: center; color: #666; font-size: 14px; margin-top: 30px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <div class="logo">🎭</div>
                    <h1 class="title">Welcome to Xat Chat!</h1>
                </div>
                
                <p>Hi <strong>${username}</strong>,</p>
                
                <p>Thank you for registering with Xat Chat! To complete your account setup, please verify your email address by clicking the button below:</p>
                
                <div style="text-align: center;">
                    <a href="${verificationUrl}" class="button">✅ Verify My Account</a>
                </div>
                
                <p>Or copy and paste this link into your browser:</p>
                <p style="word-break: break-all; color: #007bff;">${verificationUrl}</p>
                
                <p><strong>This link will expire in 24 hours.</strong></p>
                
                <div class="footer">
                    <p>If you didn't create this account, you can safely ignore this email.</p>
                    <p>© 2024 Xat Chat. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
        `;
    }

    createVerificationEmailText(username, verificationUrl) {
        return `
🎭 Welcome to Xat Chat!

Hi ${username},

Thank you for registering with Xat Chat! To complete your account setup, please verify your email address by visiting this link:

${verificationUrl}

This link will expire in 24 hours.

If you didn't create this account, you can safely ignore this email.

© 2024 Xat Chat. All rights reserved.
        `;
    }
}

// Main execution
async function main() {
    const args = process.argv.slice(2);
    
    if (args.length < 2) {
        console.log('Usage: node send-verification-email.js <email> <username>');
        console.log('Example: node send-verification-email.js user@example.com JohnDoe');
        process.exit(1);
    }

    const [email, username] = args;
    
    console.log('🚀 Starting email verification script...');
    console.log(`📧 Email: ${email}`);
    console.log(`👤 Username: ${username}`);
    
    const script = new EmailVerificationScript();
    const result = await script.sendVerificationEmail(email, username);
    
    if (result.success) {
        console.log('✅ Email verification sent successfully!');
        process.exit(0);
    } else {
        console.log('❌ Failed to send verification email');
        process.exit(1);
    }
}

// Run the script
main().catch(console.error);
