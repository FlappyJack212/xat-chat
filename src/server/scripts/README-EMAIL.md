# 📧 Email Verification System

This system handles email verification like PHP scripts do - automatically and server-side.

## 🚀 Quick Start

### 1. **Email Webhook Server** (Recommended)
```bash
# Start the email webhook server
npm run email-webhook

# This runs on port 3001 and provides HTTP endpoints
```

### 2. **Command Line Scripts**
```bash
# Send verification email
npm run send-verification user@example.com JohnDoe

# Verify email token
npm run verify-email abc123def456 user@example.com
```

## 📋 Available Endpoints

### **POST /send-verification**
Send verification email to a user
```bash
curl -X POST http://localhost:3001/send-verification \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "username": "JohnDoe"}'
```

### **GET /verify-email**
Verify email with token (like verify.php)
```
http://localhost:3001/verify-email?token=abc123&email=user@example.com
```

### **GET /health**
Health check endpoint
```
http://localhost:3001/health
```

## ⚙️ Configuration

Set these environment variables:

```bash
# Gmail SMTP (most common)
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-password

# Database
MONGODB_URI=mongodb://localhost:27017/ixat_chat

# Email webhook port
EMAIL_PORT=3001
```

## 🔧 How It Works

1. **User registers** → System generates verification token
2. **Script sends email** → User receives verification link
3. **User clicks link** → Token is verified and account activated
4. **Account verified** → User can use all features

## 📱 Integration with Main Server

The email webhook runs alongside your main chat server:

```bash
# Terminal 1: Main chat server
npm start

# Terminal 2: Email webhook server  
npm run email-webhook
```

## 🎯 Benefits

- ✅ **No nodemailer complexity** - Simple HTTP endpoints
- ✅ **PHP-like behavior** - Scripts run automatically
- ✅ **Easy integration** - Just call HTTP endpoints
- ✅ **Production ready** - Uses Gmail SMTP or other providers
- ✅ **Token-based security** - Secure verification system

## 🔒 Security Features

- **Token expiration** - Links expire in 24 hours
- **One-time use** - Tokens are deleted after verification
- **Email validation** - Only verified emails can be used
- **Rate limiting** - Prevents spam (can be added)

This system works exactly like PHP email verification scripts but uses Node.js!
