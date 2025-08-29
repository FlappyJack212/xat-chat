const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// JWT secret (should be in environment variables in production)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-here';

// Middleware to verify JWT token
const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access token required' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.userId).select('-password');
        
        if (!user) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};

// User registration
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validation
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters' });
        }

        // Check if username already exists
        const existingUsername = await User.findOne({ username: username.toLowerCase() });
        if (existingUsername) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Check if email already exists
        const existingEmail = await User.findOne({ email: email.toLowerCase() });
        if (existingEmail) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Create new user
        const user = new User({
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            password: password, // Will be hashed by pre-save middleware
            rank: 'member', // Default rank for new users
            xats: 1000, // Starting xats
            days: 0
        });

        await user.save();

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        // Return user data (without password) and token
        const userData = user.toJSON();
        res.status(201).json({
            message: 'User registered successfully',
            token: token,
            user: userData
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error during registration' });
    }
});

// User login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validation
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        // Find user by username
        const user = await User.findOne({ username: username.toLowerCase() });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check if user is banned
        if (user.isBanned) {
            const banTimeLeft = user.banTimeLeft;
            return res.status(403).json({ 
                message: `Account is banned: ${user.banReason}`,
                banTimeLeft: banTimeLeft
            });
        }

        // Check if user is enabled
        if (!user.enabled) {
            return res.status(403).json({ message: 'Account is disabled' });
        }

        // Verify password
        const isValidPassword = await user.comparePassword(password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Update user status
        user.isOnline = true;
        user.lastSeen = new Date();
        user.totalLogins++;
        await user.save();

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        // Return user data and token
        const userData = user.toJSON();
        res.json({
            message: 'Login successful',
            token: token,
            user: userData
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
});

// Verify token
router.post('/verify', authenticateToken, async (req, res) => {
    try {
        // Update user's last seen
        req.user.lastSeen = new Date();
        await req.user.save();

        res.json({
            message: 'Token verified successfully',
            user: req.user
        });

    } catch (error) {
        console.error('Token verification error:', error);
        res.status(500).json({ message: 'Server error during token verification' });
    }
});

// Check auth status (GET method for easier client usage)
router.get('/status', async (req, res) => {
    try {
        const token = req.query.token;
        
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.userId).select('-password');
        
        if (!user) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        // Update user's last seen
        user.lastSeen = new Date();
        await user.save();

        res.json({
            message: 'Token valid',
            user: user
        });

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        }
        return res.status(401).json({ message: 'Invalid token' });
    }
});

// Refresh token
router.post('/refresh', authenticateToken, async (req, res) => {
    try {
        // Generate new token
        const token = jwt.sign(
            { userId: req.user._id, username: req.user.username },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            message: 'Token refreshed successfully',
            token: token,
            user: req.user
        });

    } catch (error) {
        console.error('Token refresh error:', error);
        res.status(500).json({ message: 'Server error during token refresh' });
    }
});

// Logout
router.post('/logout', authenticateToken, async (req, res) => {
    try {
        // Update user status
        req.user.isOnline = false;
        req.user.lastSeen = new Date();
        await req.user.save();

        res.json({ message: 'Logout successful' });

    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ message: 'Server error during logout' });
    }
});

// Get current user profile
router.get('/profile', authenticateToken, async (req, res) => {
    try {
        res.json({
            message: 'Profile retrieved successfully',
            user: req.user
        });

    } catch (error) {
        console.error('Profile retrieval error:', error);
        res.status(500).json({ message: 'Server error retrieving profile' });
    }
});

// Update user profile
router.put('/profile', authenticateToken, async (req, res) => {
    try {
        const { nickname, avatar, url, bio } = req.body;

        // Update allowed fields
        if (nickname !== undefined) req.user.nickname = nickname;
        if (avatar !== undefined) req.user.avatar = avatar;
        if (url !== undefined) req.user.url = url;

        await req.user.save();

        res.json({
            message: 'Profile updated successfully',
            user: req.user
        });

    } catch (error) {
        console.error('Profile update error:', error);
        res.status(500).json({ message: 'Server error updating profile' });
    }
});

// Change password
router.put('/password', authenticateToken, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ message: 'Current and new password are required' });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({ message: 'New password must be at least 6 characters' });
        }

        // Verify current password
        const isValidPassword = await req.user.comparePassword(currentPassword);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Current password is incorrect' });
        }

        // Update password
        req.user.password = newPassword; // Will be hashed by pre-save middleware
        await req.user.save();

        res.json({ message: 'Password changed successfully' });

    } catch (error) {
        console.error('Password change error:', error);
        res.status(500).json({ message: 'Server error changing password' });
    }
});

// Forgot password (placeholder - would need email service)
router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // TODO: Implement email service to send reset link
        // For now, just return success message
        res.json({ message: 'If an account exists with this email, a reset link has been sent' });

    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({ message: 'Server error processing forgot password request' });
    }
});

// Reset password (placeholder - would need email service)
router.post('/reset-password', async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        if (!token || !newPassword) {
            return res.status(400).json({ message: 'Reset token and new password are required' });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({ message: 'New password must be at least 6 characters' });
        }

        // TODO: Implement token verification and password reset
        // For now, just return success message
        res.json({ message: 'Password reset successful' });

    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({ message: 'Server error resetting password' });
    }
});

module.exports = { router, authenticateToken };