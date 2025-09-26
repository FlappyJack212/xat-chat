/**
 * Security middleware for request validation and sanitization
 */

const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Input sanitization
const sanitizeInput = (req, res, next) => {
    const sanitize = (obj) => {
        if (typeof obj === 'string') {
            // Remove null bytes and trim
            return obj.replace(/\0/g, '').trim();
        }
        if (typeof obj === 'object' && obj !== null) {
            for (const key in obj) {
                obj[key] = sanitize(obj[key]);
            }
        }
        return obj;
    };

    if (req.body) {
        req.body = sanitize(req.body);
    }
    if (req.query) {
        req.query = sanitize(req.query);
    }
    if (req.params) {
        req.params = sanitize(req.params);
    }

    next();
};

// Request size limiter
const requestSizeLimit = (limit = '10mb') => {
    return (req, res, next) => {
        const contentLength = parseInt(req.headers['content-length'] || '0');
        const maxSize = parseInt(limit.replace(/[^\d]/g, '')) * (limit.includes('mb') ? 1024 * 1024 : 1024);
        
        if (contentLength > maxSize) {
            return res.status(413).json({
                success: false,
                message: 'Request entity too large'
            });
        }
        
        next();
    };
};

// CORS configuration
const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:8000').split(',');
        
        // Allow requests with no origin (mobile apps, etc.)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    maxAge: 86400 // 24 hours
};

// Security headers configuration
const securityHeaders = helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.socket.io"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'", "ws:", "wss:"],
            objectSrc: ["'none'"],
            mediaSrc: ["'self'"],
            frameSrc: ["'none'"]
        }
    },
    hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
    },
    noSniff: true,
    xssFilter: true,
    referrerPolicy: { policy: "same-origin" }
});

// Request logging for security monitoring
const securityLogger = (req, res, next) => {
    // Log suspicious patterns
    const suspiciousPatterns = [
        /(\<script\>|\<\/script\>)/i,
        /(javascript:|data:)/i,
        /(union.*select|select.*from|insert.*into|delete.*from)/i,
        /(\.\.|\/\.\.|\.\.\/)/,
        /(eval\(|document\.write|innerHTML)/i
    ];

    const checkValue = (value) => {
        if (typeof value === 'string') {
            return suspiciousPatterns.some(pattern => pattern.test(value));
        }
        if (typeof value === 'object' && value !== null) {
            return Object.values(value).some(checkValue);
        }
        return false;
    };

    const hasSuspiciousContent = 
        checkValue(req.body) || 
        checkValue(req.query) || 
        checkValue(req.params);

    if (hasSuspiciousContent) {
        console.warn(`🚨 [SECURITY] Suspicious request from ${req.ip}: ${req.method} ${req.path}`, {
            body: req.body,
            query: req.query,
            userAgent: req.headers['user-agent']
        });
    }

    next();
};

// Validate JSON input
const validateJSON = (req, res, next) => {
    if (req.headers['content-type'] && req.headers['content-type'].includes('application/json')) {
        if (req.body && typeof req.body === 'string') {
            try {
                req.body = JSON.parse(req.body);
            } catch (error) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid JSON format'
                });
            }
        }
    }
    next();
};

module.exports = {
    sanitizeInput,
    requestSizeLimit,
    corsOptions,
    securityHeaders,
    securityLogger,
    validateJSON
};