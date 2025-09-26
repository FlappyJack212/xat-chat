/**
 * Rate limiting middleware for API endpoints
 */

const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');

// General API rate limiter
const createRateLimiter = (windowMs = 15 * 60 * 1000, max = 100) => {
    return rateLimit({
        windowMs, // 15 minutes by default
        max, // limit each IP to max requests per windowMs
        message: {
            error: 'Too many requests from this IP, please try again later.',
            retryAfter: Math.ceil(windowMs / 1000)
        },
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
        handler: (req, res) => {
            res.status(429).json({
                success: false,
                message: 'Too many requests from this IP, please try again later.',
                retryAfter: Math.ceil(windowMs / 1000)
            });
        }
    });
};

// Strict rate limiter for auth endpoints
const authLimiter = createRateLimiter(15 * 60 * 1000, 5); // 5 attempts per 15 minutes

// Moderate rate limiter for general API
const apiLimiter = createRateLimiter(15 * 60 * 1000, 100); // 100 requests per 15 minutes

// Chat message rate limiter
const chatLimiter = createRateLimiter(60 * 1000, 30); // 30 messages per minute

// Progressive delay for repeated requests
const speedLimiter = slowDown({
    windowMs: 15 * 60 * 1000, // 15 minutes
    delayAfter: 50, // allow 50 requests per windowMs without delay
    delayMs: 200 // add 200ms delay per request after delayAfter
});

// Custom rate limiter that tracks per user instead of IP
const createUserRateLimiter = (windowMs, max) => {
    const userAttempts = new Map();
    
    return (req, res, next) => {
        const userId = req.user?.id || req.ip;
        const now = Date.now();
        const windowStart = now - windowMs;
        
        // Clean up old entries
        const attempts = userAttempts.get(userId) || [];
        const recentAttempts = attempts.filter(time => time > windowStart);
        
        if (recentAttempts.length >= max) {
            return res.status(429).json({
                success: false,
                message: 'Rate limit exceeded. Please try again later.',
                retryAfter: Math.ceil((recentAttempts[0] + windowMs - now) / 1000)
            });
        }
        
        // Add current attempt
        recentAttempts.push(now);
        userAttempts.set(userId, recentAttempts);
        
        // Clean up old user data periodically
        if (userAttempts.size > 10000) {
            const cutoff = now - windowMs * 2;
            for (const [user, attempts] of userAttempts.entries()) {
                if (attempts.every(time => time < cutoff)) {
                    userAttempts.delete(user);
                }
            }
        }
        
        next();
    };
};

// Message flood protection
const messageFloodProtection = createUserRateLimiter(60 * 1000, 20); // 20 messages per minute per user

module.exports = {
    authLimiter,
    apiLimiter,
    chatLimiter,
    speedLimiter,
    messageFloodProtection,
    createRateLimiter,
    createUserRateLimiter
};