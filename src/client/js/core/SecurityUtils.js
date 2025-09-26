/**
 * Security utilities for safe DOM manipulation and XSS prevention
 */
class SecurityUtils {
    /**
     * Safely set HTML content by escaping user input
     * @param {HTMLElement} element - The DOM element
     * @param {string} content - The content to set
     * @param {boolean} allowBasicHTML - Whether to allow basic HTML tags
     */
    static safeSetHTML(element, content, allowBasicHTML = false) {
        if (!element) {
            console.warn('SecurityUtils.safeSetHTML: element is null');
            return;
        }

        if (allowBasicHTML) {
            // Allow only specific safe HTML tags
            const allowedTags = ['b', 'i', 'u', 'br', 'strong', 'em', 'span'];
            const sanitized = this.sanitizeHTML(content, allowedTags);
            element.innerHTML = sanitized;
        } else {
            // Escape all HTML
            element.textContent = content;
        }
    }

    /**
     * Sanitize HTML content to prevent XSS
     * @param {string} html - The HTML content
     * @param {Array} allowedTags - Array of allowed tag names
     * @returns {string} - Sanitized HTML
     */
    static sanitizeHTML(html, allowedTags = []) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;

        const walker = document.createTreeWalker(
            tempDiv,
            NodeFilter.SHOW_ELEMENT,
            null,
            false
        );

        const elementsToRemove = [];
        let node;

        while (node = walker.nextNode()) {
            const tagName = node.tagName.toLowerCase();
            
            if (!allowedTags.includes(tagName)) {
                elementsToRemove.push(node);
            } else {
                // Remove all attributes for security
                while (node.attributes.length > 0) {
                    node.removeAttribute(node.attributes[0].name);
                }
            }
        }

        elementsToRemove.forEach(el => {
            el.parentNode.removeChild(el);
        });

        return tempDiv.innerHTML;
    }

    /**
     * Safely create an element with text content
     * @param {string} tagName - The tag name
     * @param {string} textContent - The text content
     * @param {Object} attributes - Attributes to set
     * @returns {HTMLElement}
     */
    static createElement(tagName, textContent = '', attributes = {}) {
        const element = document.createElement(tagName);
        
        if (textContent) {
            element.textContent = textContent;
        }

        Object.keys(attributes).forEach(key => {
            if (this.isValidAttribute(key)) {
                element.setAttribute(key, attributes[key]);
            }
        });

        return element;
    }

    /**
     * Check if an attribute is safe to set
     * @param {string} attributeName 
     * @returns {boolean}
     */
    static isValidAttribute(attributeName) {
        const dangerous = ['onclick', 'onload', 'onerror', 'onmouseover', 'javascript:'];
        const lower = attributeName.toLowerCase();
        
        return !dangerous.some(danger => lower.includes(danger));
    }

    /**
     * Escape special characters for HTML
     * @param {string} text 
     * @returns {string}
     */
    static escapeHTML(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Validate and sanitize user input
     * @param {string} input - User input
     * @param {Object} options - Validation options
     * @returns {string} - Sanitized input
     */
    static sanitizeInput(input, options = {}) {
        if (typeof input !== 'string') {
            return '';
        }

        let sanitized = input.trim();

        // Remove null bytes
        sanitized = sanitized.replace(/\0/g, '');

        // Limit length
        const maxLength = options.maxLength || 1000;
        if (sanitized.length > maxLength) {
            sanitized = sanitized.substring(0, maxLength);
        }

        // Remove dangerous patterns
        if (!options.allowHTML) {
            sanitized = this.escapeHTML(sanitized);
        }

        return sanitized;
    }
}

// Make available globally for the modular system
if (typeof window !== 'undefined') {
    window.SecurityUtils = SecurityUtils;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = SecurityUtils;
}