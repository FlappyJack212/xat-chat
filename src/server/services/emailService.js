const nodemailer = require('nodemailer');

class EmailService {
    constructor() {
        this.transporter = null;
        this.isInitialized = false;
    }

    async initialize() {
        if (this.isInitialized) return;

        try {
            // Create a test account using Ethereal Email (for development)
            const testAccount = await nodemailer.createTestAccount();
            
            this.transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                secure: false,
                auth: {
                    user: testAccount.user,
                    pass: testAccount.pass
                }
            });

            // Test the connection
            await this.transporter.verify();
            console.log('🎭 [EMAIL] Email service initialized successfully');
            console.log('🎭 [EMAIL] Test account created:', testAccount.user);
            
            this.isInitialized = true;
        } catch (error) {
            console.error('🎭 [EMAIL] Failed to initialize email service:', error);
            throw error;
        }
    }

    async sendPasswordResetEmail(email, resetToken, resetUrl) {
        if (!this.isInitialized) {
            await this.initialize();
        }

        try {
            const mailOptions = {
                from: '"🎭 ShadowNet" <noreply@shadownet.com>',
                to: email,
                subject: '🔐 ShadowNet Password Reset - Action Required!',
                html: this.createPasswordResetEmailHTML(resetToken, resetUrl),
                text: this.createPasswordResetEmailText(resetToken, resetUrl)
            };

            const info = await this.transporter.sendMail(mailOptions);
            console.log('🎭 [EMAIL] Password reset email sent:', info.messageId);
            console.log('🎭 [EMAIL] Preview URL:', nodemailer.getTestMessageUrl(info));
            return { success: true, messageId: info.messageId };
        } catch (error) {
            console.error('🎭 [EMAIL] Failed to send password reset email:', error);
            return { success: false, error: error.message };
        }
    }

    createPasswordResetEmailHTML(resetToken, resetUrl) {
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>🔐 ShadowNet Password Reset</title>
            <style>
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
                    margin: 0;
                    padding: 20px;
                    color: #ffffff;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 15px;
                    padding: 30px;
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                }
                .header {
                    text-align: center;
                    margin-bottom: 30px;
                }
                .logo {
                    font-size: 2.5em;
                    margin-bottom: 10px;
                    background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                .title {
                    font-size: 1.8em;
                    margin-bottom: 10px;
                    color: #ff6b6b;
                }
                .subtitle {
                    font-size: 1.1em;
                    color: #b8b8b8;
                    margin-bottom: 30px;
                }
                .alert-box {
                    background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
                    border-radius: 10px;
                    padding: 20px;
                    margin: 20px 0;
                    text-align: center;
                    box-shadow: 0 8px 32px rgba(255, 107, 107, 0.3);
                }
                .reset-button {
                    display: inline-block;
                    background: linear-gradient(45deg, #4ecdc4, #45b7d1);
                    color: white;
                    padding: 15px 30px;
                    text-decoration: none;
                    border-radius: 25px;
                    font-weight: bold;
                    font-size: 1.1em;
                    margin: 20px 0;
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    box-shadow: 0 4px 15px rgba(78, 205, 196, 0.3);
                }
                .reset-button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(78, 205, 196, 0.4);
                }
                .token-box {
                    background: rgba(0, 0, 0, 0.3);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    border-radius: 8px;
                    padding: 15px;
                    margin: 20px 0;
                    font-family: 'Courier New', monospace;
                    font-size: 0.9em;
                    word-break: break-all;
                }
                .warning {
                    background: rgba(255, 193, 7, 0.2);
                    border: 1px solid rgba(255, 193, 7, 0.5);
                    border-radius: 8px;
                    padding: 15px;
                    margin: 20px 0;
                    color: #ffc107;
                }
                .footer {
                    text-align: center;
                    margin-top: 30px;
                    color: #b8b8b8;
                    font-size: 0.9em;
                }
                .social-links {
                    margin: 20px 0;
                    text-align: center;
                }
                .social-links a {
                    display: inline-block;
                    margin: 0 10px;
                    color: #4ecdc4;
                    text-decoration: none;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <div class="logo">🎭</div>
                    <h1 class="title">ShadowNet</h1>
                    <p class="subtitle">Secure Chat Platform</p>
                </div>

                <div class="alert-box">
                    <h2>🚨 URGENT: Password Reset Required!</h2>
                    <p>Someone (hopefully you) requested a password reset for your ShadowNet account.</p>
                </div>

                <p>Hello ShadowNet user!</p>
                
                <p>We received a request to reset your password. If you didn't make this request, you can safely ignore this email.</p>

                <div class="warning">
                    <strong>⚠️ Security Notice:</strong> This link will expire in 1 hour for your security.
                </div>

                <div style="text-align: center;">
                    <a href="${resetUrl}" class="reset-button">
                        🔐 Reset My Password Now
                    </a>
                </div>

                <p><strong>Or copy this reset token:</strong></p>
                <div class="token-box">
                    ${resetToken}
                </div>

                <p>If the button doesn't work, you can manually visit:</p>
                <p style="word-break: break-all; color: #4ecdc4;">${resetUrl}</p>

                <div class="social-links">
                    <a href="#">🌐 Website</a> |
                    <a href="#">📱 Mobile App</a> |
                    <a href="#">💬 Support</a>
                </div>

                <div class="footer">
                    <p>This is an automated message from ShadowNet. Please do not reply to this email.</p>
                    <p>© 2024 ShadowNet. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
        `;
    }

    createPasswordResetEmailText(resetToken, resetUrl) {
        return `
🔐 ShadowNet Password Reset - Action Required!

Hello ShadowNet user!

We received a request to reset your password. If you didn't make this request, you can safely ignore this email.

🚨 URGENT: Password Reset Required!
Someone (hopefully you) requested a password reset for your ShadowNet account.

⚠️ Security Notice: This link will expire in 1 hour for your security.

Reset your password by visiting:
${resetUrl}

Or use this reset token:
${resetToken}

If you have any questions, please contact our support team.

© 2024 ShadowNet. All rights reserved.
        `;
    }

    // Method to test email configuration
    async testConnection() {
        if (!this.isInitialized) {
            await this.initialize();
        }
        try {
            await this.transporter.verify();
            console.log('🎭 [EMAIL] Email service is ready');
            return true;
        } catch (error) {
            console.error('🎭 [EMAIL] Email service connection failed:', error);
            return false;
        }
    }
}

module.exports = EmailService;
