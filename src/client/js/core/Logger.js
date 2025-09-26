/**
 * Production-safe logging utility
 * Automatically filters out logs in production unless explicitly enabled
 */
class Logger {
    constructor() {
        this.isDevelopment = window.location.hostname === 'localhost' || 
                           window.location.hostname === '127.0.0.1' ||
                           window.location.search.includes('debug=true');
        
        this.logLevel = this.isDevelopment ? 'debug' : 'error';
        this.enabledModules = new Set();
        
        // Enable all modules in development
        if (this.isDevelopment) {
            this.enabledModules.add('*');
        }
    }

    /**
     * Enable logging for specific modules
     * @param {string|Array} modules - Module names or '*' for all
     */
    enable(modules) {
        if (modules === '*') {
            this.enabledModules.add('*');
        } else if (Array.isArray(modules)) {
            modules.forEach(module => this.enabledModules.add(module));
        } else {
            this.enabledModules.add(modules);
        }
    }

    /**
     * Check if logging is enabled for a module
     * @param {string} module - Module name
     * @returns {boolean}
     */
    isEnabled(module) {
        return this.enabledModules.has('*') || this.enabledModules.has(module);
    }

    /**
     * Log debug messages
     * @param {string} module - Module name
     * @param {string} message - Log message
     * @param {...any} args - Additional arguments
     */
    debug(module, message, ...args) {
        if (this.isDevelopment && this.isEnabled(module)) {
            console.log(`🔍 [${module}] ${message}`, ...args);
        }
    }

    /**
     * Log info messages
     * @param {string} module - Module name
     * @param {string} message - Log message
     * @param {...any} args - Additional arguments
     */
    info(module, message, ...args) {
        if (this.isEnabled(module)) {
            console.info(`ℹ️ [${module}] ${message}`, ...args);
        }
    }

    /**
     * Log warning messages
     * @param {string} module - Module name
     * @param {string} message - Log message
     * @param {...any} args - Additional arguments
     */
    warn(module, message, ...args) {
        if (this.isEnabled(module)) {
            console.warn(`⚠️ [${module}] ${message}`, ...args);
        }
    }

    /**
     * Log error messages (always shown)
     * @param {string} module - Module name
     * @param {string} message - Log message
     * @param {...any} args - Additional arguments
     */
    error(module, message, ...args) {
        console.error(`❌ [${module}] ${message}`, ...args);
    }

    /**
     * Log performance timing
     * @param {string} module - Module name
     * @param {string} operation - Operation name
     * @param {number} startTime - Start time from performance.now()
     */
    timing(module, operation, startTime) {
        if (this.isDevelopment && this.isEnabled(module)) {
            const duration = performance.now() - startTime;
            console.log(`⏱️ [${module}] ${operation} took ${duration.toFixed(2)}ms`);
        }
    }

    /**
     * Group related logs
     * @param {string} module - Module name
     * @param {string} groupName - Group name
     * @param {Function} callback - Function containing grouped logs
     */
    group(module, groupName, callback) {
        if (this.isDevelopment && this.isEnabled(module)) {
            console.group(`📁 [${module}] ${groupName}`);
            try {
                callback();
            } finally {
                console.groupEnd();
            }
        }
    }
}

// Create global logger instance
const logger = new Logger();

// Make available globally
if (typeof window !== 'undefined') {
    window.Logger = Logger;
    window.logger = logger;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Logger, logger };
}