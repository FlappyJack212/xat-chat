const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('../config/database');
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
        const [rows] = await pool.execute(
            'SELECT id, username, nickname, email, rank, xats, days, avatar, enabled FROM users WHERE id = ? AND enabled = 1',
            [decoded.userId]
        );
        
        if (rows.length === 0) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.user = rows[0];
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};

// User registration
router.post('/register', async (req, res) => {
    try {
        const { username, email, password, nickname } = req.body;

        // Validation
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters' });
        }

        // Check if username already exists
        const [existingUsers] = await pool.execute(
            'SELECT id FROM users WHERE username = ? OR email = ?',
            [username.toLowerCase(), email.toLowerCase()]
        );
        
        if (existingUsers.length > 0) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new user
        const [result] = await pool.execute(
            `INSERT INTO users (username, nickname, password, avatar, email, xats, days, rank, enabled) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                username.toLowerCase(),
                nickname || username,
                hashedPassword,
                Math.floor(Math.random() * 1760).toString(),
                email.toLowerCase(),
                1000, // Starting xats
                0, // Starting days
                1, // Default rank
                '1' // Enabled as string
            ]
        );

        // Generate JWT token
        const token = jwt.sign(
            { userId: result.insertId, username: username.toLowerCase() },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        // Return user data and token
        const userData = {
            id: result.insertId,
            username: username.toLowerCase(),
            nickname: nickname || username,
            email: email.toLowerCase(),
            rank: 1,
            xats: 1000,
            days: 0,
            avatar: Math.floor(Math.random() * 1760).toString()
        };

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token: token,
            user: userData
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ success: false, message: 'Server error during registration' });
    }
});

// User login
router.post('/login', async (req, res) => {
    try {
        console.log('🔑 [AUTH] Login attempt:', { username: req.body.username });
        
        const { username, password } = req.body;

        // Validation
        if (!username || !password) {
            console.log('❌ [AUTH] Missing username or password');
            return res.status(400).json({ success: false, message: 'Username and password are required' });
        }

        console.log('🔍 [AUTH] Looking for user:', username.toLowerCase());

        // Find user by username
        const [rows] = await pool.execute(
            'SELECT * FROM users WHERE username = ? AND enabled = "1"',
            [username.toLowerCase()]
        );
        
        console.log('🔍 [AUTH] Database query result:', rows.length, 'users found');
        
        if (rows.length === 0) {
            console.log('❌ [AUTH] User not found or disabled');
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const user = rows[0];
        console.log('✅ [AUTH] User found:', { id: user.id, username: user.username, enabled: user.enabled });

        // Verify password
        console.log('🔐 [AUTH] Verifying password...');
        const isValidPassword = await bcrypt.compare(password, user.password);
        console.log('🔐 [AUTH] Password valid:', isValidPassword);
        
        if (!isValidPassword) {
            console.log('❌ [AUTH] Invalid password');
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Update user status
        console.log('📝 [AUTH] Updating user status...');
        await pool.execute(
            'UPDATE users SET connectedlast = ? WHERE id = ?',
            [req.ip, user.id]
        );

        // Generate JWT token
        console.log('🎫 [AUTH] Generating JWT token...');
        const token = jwt.sign(
            { userId: user.id, username: user.username },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        // Return user data and token
        const userData = {
            id: user.id,
            username: user.username,
            nickname: user.nickname,
            email: user.email,
            rank: user.rank,
            xats: user.xats,
            days: user.days,
            avatar: user.avatar
        };

        console.log('✅ [AUTH] Login successful for user:', user.username);
        res.json({
            success: true,
            message: 'Login successful',
            token: token,
            user: userData
        });

    } catch (error) {
        console.error('💥 [AUTH] Login error:', error);
        res.status(500).json({ success: false, message: 'Server error during login' });
    }
});

// Verify token
router.post('/verify', authenticateToken, async (req, res) => {
    try {
        res.json({
            success: true,
            message: 'Token is valid',
            user: req.user
        });
    } catch (error) {
        console.error('Token verification error:', error);
        res.status(500).json({ success: false, message: 'Server error during token verification' });
    }
});

// Refresh token
router.post('/refresh', authenticateToken, async (req, res) => {
    try {
        // Generate new token
        const token = jwt.sign(
            { userId: req.user.id, username: req.user.username },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            success: true,
            message: 'Token refreshed successfully',
            token: token,
            user: req.user
        });

    } catch (error) {
        console.error('Token refresh error:', error);
        res.status(500).json({ success: false, message: 'Server error during token refresh' });
    }
});

// Logout
router.post('/logout', authenticateToken, async (req, res) => {
    try {
        // Update user status
        await pool.execute(
            'UPDATE users SET lastSeen = NOW() WHERE id = ?',
            [req.user.id]
        );

        res.json({
            success: true,
            message: 'Logout successful'
        });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ success: false, message: 'Server error during logout' });
    }
});

// Get current user profile
router.get('/profile', authenticateToken, async (req, res) => {
    try {
        const [rows] = await pool.execute(
            'SELECT id, username, nickname, email, rank, xats, days, avatar, enabled, emailVerified FROM users WHERE id = ?',
            [req.user.id]
        );
        
        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.json({
            success: true,
            user: rows[0]
        });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ success: false, message: 'Server error getting profile' });
    }
});

// Update user profile
router.put('/profile', authenticateToken, async (req, res) => {
    try {
        const { nickname, email, bio, avatar } = req.body;
        
        // Build update query dynamically
        const updates = [];
        const values = [];
        
        if (nickname) {
            updates.push('nickname = ?');
            values.push(nickname);
        }
        if (email) {
            updates.push('email = ?');
            values.push(email);
        }
        if (bio) {
            updates.push('desc = ?');
            values.push(bio);
        }
        if (avatar) {
            updates.push('avatar = ?');
            values.push(avatar);
        }
        
        if (updates.length === 0) {
            return res.status(400).json({ success: false, message: 'No fields to update' });
        }
        
        values.push(req.user.id);
        
        await pool.execute(
            `UPDATE users SET ${updates.join(', ')} WHERE id = ?`,
            values
        );

        // Get updated user data
        const [rows] = await pool.execute(
            'SELECT id, username, nickname, email, rank, xats, days, avatar FROM users WHERE id = ?',
            [req.user.id]
        );

        res.json({
            success: true,
            message: 'Profile updated successfully',
            user: rows[0]
        });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ success: false, message: 'Server error updating profile' });
    }
});

// Change password
router.put('/change-password', authenticateToken, async (req, res) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ success: false, message: 'Authentication required' });
        }
        
        const decoded = jwt.verify(token, JWT_SECRET);
        const { currentPassword, newPassword } = req.body;
        
        // Get current user with password
        const [users] = await pool.execute(
            'SELECT password FROM users WHERE id = ?',
            [decoded.userId]
        );
        
        if (users.length === 0) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Verify current password
        const isValid = await bcrypt.compare(currentPassword, users[0].password);
        if (!isValid) {
            return res.status(400).json({ success: false, message: 'Current password is incorrect' });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        
        await pool.execute(
            'UPDATE users SET password = ? WHERE id = ?',
            [hashedPassword, decoded.userId]
        );

        res.json({ success: true, message: 'Password changed successfully' });
    } catch (error) {
        console.error('Change password error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Email verification endpoint
router.post('/verify-email', async (req, res) => {
    try {
        const { token } = req.body;
        
        if (!token) {
            return res.status(400).json({ success: false, message: 'Verification token required' });
        }

        // In a real implementation, you would verify the email verification token
        // For now, we'll just mark the user as verified if they provide any token
        // This is a simplified version - in production you'd use a proper email verification system
        
        // Find user by email verification token (you'd store this in the database)
        // For demo purposes, we'll just verify the first user we find
        const [users] = await pool.execute(
            'SELECT id FROM users WHERE emailVerified = FALSE LIMIT 1'
        );
        
        if (users.length === 0) {
            return res.status(400).json({ success: false, message: 'No unverified users found' });
        }

        // Mark user as verified
        await pool.execute(
            'UPDATE users SET emailVerified = TRUE WHERE id = ?',
            [users[0].id]
        );

        res.json({ success: true, message: 'Email verified successfully' });
    } catch (error) {
        console.error('Email verification error:', error);
        res.status(500).json({ success: false, message: 'Server error during email verification' });
    }
});

// Resend verification email endpoint
router.post('/resend-verification', async (req, res) => {
    try {
        const { email } = req.body;
        
        if (!email) {
            return res.status(400).json({ success: false, message: 'Email required' });
        }

        // Check if user exists and is not verified
        const [users] = await pool.execute(
            'SELECT id, username FROM users WHERE email = ? AND emailVerified = FALSE',
            [email.toLowerCase()]
        );
        
        if (users.length === 0) {
            return res.status(404).json({ success: false, message: 'User not found or already verified' });
        }

        // In a real implementation, you would send a verification email here
        // For now, we'll just return success
        
        res.json({ 
            success: true, 
            message: 'Verification email sent (demo mode - no actual email sent)',
            userId: users[0].id
        });
    } catch (error) {
        console.error('Resend verification error:', error);
        res.status(500).json({ success: false, message: 'Server error during resend verification' });
    }
});

// Forgot password
router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        
        if (!email) {
            return res.status(400).json({ success: false, message: 'Email is required' });
        }
        
        // Find user by email
        const [rows] = await pool.execute(
            'SELECT id, username, nickname FROM users WHERE email = ? AND enabled = "1"',
            [email.toLowerCase()]
        );
        
        if (rows.length === 0) {
            // Don't reveal if email exists or not for security
            return res.json({ 
                success: true, 
                message: 'If an account with that email exists, a password reset link has been sent.' 
            });
        }
        
        const user = rows[0];
        
        // Generate secure reset token (32 characters)
        const resetToken = require('crypto').randomBytes(32).toString('hex');
        const resetExpiry = new Date(Date.now() + 3600000); // 1 hour from now
        
        // Store reset token in database
        await pool.execute(
            'UPDATE users SET resetToken = ?, resetExpiry = ? WHERE id = ?',
            [resetToken, resetExpiry, user.id]
        );
        
        // In a real app, you'd send an email here
        // For now, we'll return the reset token (remove this in production)
        // Send password reset email
        const resetUrl = `http://localhost:8000/reset-password.html?token=${resetToken}`;
        const emailServiceInstance = await initializeEmailService();
        const emailResult = await emailServiceInstance.sendPasswordResetEmail(email, resetToken, resetUrl);
        
        if (emailResult.success) {
            res.json({
                success: true,
                message: 'Password reset link sent! Check your email.',
                resetToken: resetToken, // Remove this in production
                resetUrl: resetUrl
            });
        } else {
            // If email fails, still return success but log the error
            console.error('🎭 [AUTH] Email sending failed:', emailResult.error);
            res.json({
                success: true,
                message: 'Password reset link generated! Check your email or use the token below.',
                resetToken: resetToken, // Remove this in production
                resetUrl: resetUrl
            });
        }
        
    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({ success: false, message: 'Server error during password reset' });
    }
});

// Reset password
router.post('/reset-password', async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        
        if (!token || !newPassword) {
            return res.status(400).json({ success: false, message: 'Token and new password are required' });
        }
        
        if (newPassword.length < 6) {
            return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
        }
        
        // Find user by reset token and check expiry
        const [rows] = await pool.execute(
            'SELECT id, username FROM users WHERE resetToken = ? AND resetExpiry > NOW() AND enabled = "1"',
            [token]
        );
        
        if (rows.length === 0) {
            return res.status(400).json({ success: false, message: 'Invalid or expired reset token' });
        }
        
        const user = rows[0];
        
        // Hash new password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
        
        // Update password and clear reset token
        await pool.execute(
            'UPDATE users SET password = ?, resetToken = NULL, resetExpiry = NULL WHERE id = ?',
            [hashedPassword, user.id]
        );
        
        res.json({
            success: true,
            message: 'Password reset successful! You can now login with your new password.'
        });
        
    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({ success: false, message: 'Server error during password reset' });
    }
});

// Check auth status (GET method for easier client usage)
router.get('/status', async (req, res) => {
    try {
        const token = req.query.token || req.headers.authorization?.replace('Bearer ', '');
        
        if (!token) {
            return res.json({ authenticated: false });
        }

        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);
        const [rows] = await pool.execute(
            'SELECT id, username, nickname, email, rank, xats, days, avatar, emailVerified FROM users WHERE id = ? AND enabled = 1',
            [decoded.userId]
        );
        
        if (rows.length === 0) {
            return res.json({ authenticated: false });
        }

        res.json({ 
            authenticated: true, 
            user: rows[0]
        });

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.json({ authenticated: false, message: 'Token expired' });
        }
        return res.json({ authenticated: false, message: 'Invalid token' });
    }
});

module.exports = router;