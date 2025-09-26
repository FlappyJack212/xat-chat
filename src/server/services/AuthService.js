/**
 * Authentication Service
 * Handles user authentication, registration, and session management
 */

const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

class AuthService {
    /**
     * Register a new user
     */
    static async register(req, res) {
        try {
            // Remove sensitive logging in production
            if (process.env.NODE_ENV === 'development') {
                console.log('🔑 [AUTH] Register request received');
            }
            
            const { username, email, password } = req.body;

            // Validate input
            if (!username || !email || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Username, email, and password are required'
                });
            }

            console.log('🔑 [AUTH] Checking for existing user...');
            
            // Check if user already exists
            const existingUser = await User.findOne({
                $or: [{ username: username.toLowerCase() }, { email: email.toLowerCase() }]
            });

            if (existingUser) {
                console.log('🔑 [AUTH] User already exists');
                return res.status(400).json({
                    success: false,
                    message: 'Username or email already exists'
                });
            }

            console.log('🔑 [AUTH] Creating new user...');
            
            // Create new user
            const user = new User({
                username: username.toLowerCase(),
                email: email.toLowerCase(),
                nickname: username,
                password: password
            });

            console.log('🔑 [AUTH] Saving user to database...');
            await user.save();
            console.log('🔑 [AUTH] User saved successfully:', user._id);

            // Generate JWT token
            console.log('🔑 [AUTH] Generating JWT token...');
            const token = jwt.sign(
                { userId: user._id },
                process.env.JWT_SECRET || (() => {
                throw new Error('JWT_SECRET environment variable is required for security!');
            })(),
                { expiresIn: '7d' }
            );

            console.log('🔑 [AUTH] Registration successful');
            res.json({
                success: true,
                message: 'User registered successfully',
                token,
                user: {
                    id: user._id,
                    username: user.username,
                    nickname: user.nickname,
                    email: user.email,
                    avatar: user.avatar,
                    xats: user.xats,
                    days: user.days
                }
            });
        } catch (error) {
            console.error('🔑 [AUTH] Registration error:', error);
            res.status(500).json({
                success: false,
                message: 'Registration failed: ' + error.message
            });
        }
    }

    /**
     * Login user
     */
    static async login(req, res) {
        try {
            console.log('🔑 [AUTH] Login request body:', req.body);
            
            const { username, password } = req.body;

            // Validate input
            if (!username || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Username and password are required'
                });
            }

            console.log('🔑 [AUTH] Looking for user:', username);
            
            // Find user
            const user = await User.findOne({
                $or: [
                    { username: username.toLowerCase() },
                    { email: username.toLowerCase() }
                ]
            });

            if (!user) {
                console.log('🔑 [AUTH] User not found');
                return res.status(401).json({
                    success: false,
                    message: 'Invalid username or password'
                });
            }

            console.log('🔑 [AUTH] User found, checking password...');
            
            // Check password
            const isValidPassword = await user.comparePassword(password);
            if (!isValidPassword) {
                console.log('🔑 [AUTH] Invalid password');
                return res.status(401).json({
                    success: false,
                    message: 'Invalid username or password'
                });
            }

            console.log('🔑 [AUTH] Password valid, updating user status...');
            
            // Update last login
            user.lastSeen = new Date();
            user.isOnline = true;
            await user.save();

            // Generate JWT token
            console.log('🔑 [AUTH] Generating JWT token...');
            const token = jwt.sign(
                { userId: user._id },
                process.env.JWT_SECRET || (() => {
                throw new Error('JWT_SECRET environment variable is required for security!');
            })(),
                { expiresIn: '7d' }
            );

            console.log('🔑 [AUTH] Login successful');
            res.json({
                success: true,
                message: 'Login successful',
                token,
                user: {
                    id: user._id,
                    username: user.username,
                    nickname: user.nickname,
                    email: user.email,
                    avatar: user.avatar,
                    xats: user.xats,
                    days: user.days,
                    rank: user.rank
                }
            });
        } catch (error) {
            console.error('🔑 [AUTH] Login error:', error);
            res.status(500).json({
                success: false,
                message: 'Login failed: ' + error.message
            });
        }
    }

    /**
     * Logout user
     */
    static async logout(req, res) {
        try {
            // In a stateless JWT system, logout is handled client-side
            // by removing the token from storage
            res.json({
                success: true,
                message: 'Logged out successfully'
            });
        } catch (error) {
            console.error('Logout error:', error);
            res.status(500).json({
                success: false,
                message: 'Logout failed'
            });
        }
    }

    /**
     * Authenticate user from token
     */
    static async authenticate(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || (() => {
                throw new Error('JWT_SECRET environment variable is required for security!');
            })());
            const user = await User.findById(decoded.userId);

            if (user) {
                user.isOnline = true;
                user.lastSeen = new Date();
                await user.save();
            }

            return user;
        } catch (error) {
            console.error('Token authentication error:', error);
            return null;
        }
    }

    /**
     * Create guest user
     */
    static async createGuestUser(nickname = null) {
        try {
            const guestName = nickname || `Guest${Math.floor(Math.random() * 10000)}`;

            const user = new User({
                username: `guest_${Date.now()}`,
                nickname: guestName,
                email: `guest_${Date.now()}@xat.com`,
                password: 'guest123', // Meet minimum length requirement
                rank: 0, // Guest rank
                isOnline: true
            });

            await user.save();
            return user;
        } catch (error) {
            console.error('Guest user creation error:', error);
            throw error;
        }
    }

    /**
     * Middleware to verify JWT token
     */
    static verifyToken(req, res, next) {
        const token = req.headers.authorization?.split(' ')[1] || req.query.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Access token required'
            });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || (() => {
                throw new Error('JWT_SECRET environment variable is required for security!');
            })());
            req.userId = decoded.userId;
            next();
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: 'Invalid or expired token'
            });
        }
    }

    /**
     * Get current user from token
     */
    static async getCurrentUser(req, res) {
        try {
            const user = await User.findById(req.userId).select('-password');
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            res.json({
                success: true,
                user: user.getProfileData()
            });
        } catch (error) {
            console.error('Get current user error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to get user'
            });
        }
    }
}

module.exports = AuthService;