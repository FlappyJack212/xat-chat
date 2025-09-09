/**
 * Background Management API Routes
 * Handles background loading, management, and effects
 */

const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const router = express.Router();

// Background data storage
let backgroundCache = null;
let lastCacheUpdate = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Get all available backgrounds
 */
router.get('/', async (req, res) => {
    try {
        // Check cache
        if (backgroundCache && Date.now() - lastCacheUpdate < CACHE_DURATION) {
            return res.json({
                success: true,
                backgrounds: backgroundCache
            });
        }

        // Load backgrounds from file system
        const backgrounds = await loadBackgroundsFromFS();
        
        // Cache the results
        backgroundCache = backgrounds;
        lastCacheUpdate = Date.now();

        res.json({
            success: true,
            backgrounds: backgrounds
        });

    } catch (error) {
        console.error('Background API error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to load backgrounds'
        });
    }
});

/**
 * Get backgrounds by category
 */
router.get('/category/:category', async (req, res) => {
    try {
        const { category } = req.params;
        const backgrounds = await loadBackgroundsFromFS();
        const filtered = backgrounds.filter(bg => bg.category === category);

        res.json({
            success: true,
            backgrounds: filtered
        });

    } catch (error) {
        console.error('Background category API error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to load backgrounds by category'
        });
    }
});

/**
 * Search backgrounds
 */
router.get('/search', async (req, res) => {
    try {
        const { q: query } = req.query;
        if (!query) {
            return res.status(400).json({
                success: false,
                message: 'Search query required'
            });
        }

        const backgrounds = await loadBackgroundsFromFS();
        const searchTerm = query.toLowerCase();
        const filtered = backgrounds.filter(bg => 
            bg.name.toLowerCase().includes(searchTerm) ||
            bg.description.toLowerCase().includes(searchTerm) ||
            bg.category.toLowerCase().includes(searchTerm)
        );

        res.json({
            success: true,
            backgrounds: filtered,
            query: query
        });

    } catch (error) {
        console.error('Background search API error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to search backgrounds'
        });
    }
});

/**
 * Get background by ID
 */
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const backgrounds = await loadBackgroundsFromFS();
        const background = backgrounds.find(bg => bg.id === id);

        if (!background) {
            return res.status(404).json({
                success: false,
                message: 'Background not found'
            });
        }

        res.json({
            success: true,
            background: background
        });

    } catch (error) {
        console.error('Background by ID API error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to load background'
        });
    }
});

/**
 * Upload custom background
 */
router.post('/upload', async (req, res) => {
    try {
        // This would handle file uploads
        // For now, return a placeholder response
        res.json({
            success: false,
            message: 'File upload not implemented yet'
        });

    } catch (error) {
        console.error('Background upload API error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to upload background'
        });
    }
});

/**
 * Load backgrounds from file system
 */
async function loadBackgroundsFromFS() {
    const backgrounds = [];
    const imagesDir = path.join(__dirname, '../../client/images');
    
    try {
        // Check if images directory exists
        await fs.access(imagesDir);
        
        // Read directory contents
        const files = await fs.readdir(imagesDir);
        const imageFiles = files.filter(file => 
            /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
        );

        // Create background objects
        imageFiles.forEach((file, index) => {
            const background = {
                id: `bg_${index + 1}`,
                name: getBackgroundName(file),
                category: getBackgroundCategory(file, index),
                url: `/src/client/images/${file}`,
                thumbnail: `/src/client/images/${file}`,
                description: getBackgroundDescription(file, index),
                size: 'cover',
                position: 'center',
                repeat: 'no-repeat',
                attachment: 'fixed',
                customStyles: {},
                metadata: {
                    filename: file,
                    uploadDate: new Date().toISOString(),
                    size: 'unknown' // Would need file stats for actual size
                }
            };

            backgrounds.push(background);
        });

        // Add some default backgrounds if no images found
        if (backgrounds.length === 0) {
            backgrounds.push(...getDefaultBackgrounds());
        }

        return backgrounds;

    } catch (error) {
        console.warn('Failed to load backgrounds from FS, using defaults:', error);
        return getDefaultBackgrounds();
    }
}

/**
 * Get background name from filename
 */
function getBackgroundName(filename) {
    const name = filename.replace(/\.[^/.]+$/, '');
    return name.charAt(0).toUpperCase() + name.slice(1).replace(/[-_]/g, ' ');
}

/**
 * Get background category based on filename and index
 */
function getBackgroundCategory(filename, index) {
    const name = filename.toLowerCase();
    
    if (name.includes('nature') || name.includes('forest') || name.includes('mountain')) {
        return 'nature';
    } else if (name.includes('space') || name.includes('cosmic') || name.includes('nebula')) {
        return 'space';
    } else if (name.includes('abstract') || name.includes('pattern') || name.includes('geometric')) {
        return 'abstract';
    } else if (name.includes('anime') || name.includes('manga') || name.includes('cherry')) {
        return 'anime';
    } else if (name.includes('game') || name.includes('cyber') || name.includes('tech')) {
        return 'gaming';
    } else if (name.includes('winter') || name.includes('christmas') || name.includes('snow')) {
        return 'seasonal';
    } else {
        // Default categories based on index
        const categories = ['default', 'nature', 'abstract', 'space', 'gaming', 'anime', 'seasonal'];
        return categories[index % categories.length];
    }
}

/**
 * Get background description
 */
function getBackgroundDescription(filename, index) {
    const name = filename.toLowerCase();
    
    if (name.includes('1')) return 'Beautiful landscape scene';
    if (name.includes('2')) return 'Peaceful natural environment';
    if (name.includes('3')) return 'Stunning mountain vista';
    if (name.includes('4')) return 'Abstract artistic pattern';
    if (name.includes('5')) return 'Cosmic space scene';
    if (name.includes('6')) return 'Futuristic cyberpunk city';
    if (name.includes('7')) return 'Cherry blossom garden';
    if (name.includes('8')) return 'Winter wonderland';
    if (name.includes('9')) return 'Colorful abstract design';
    
    return 'Custom background image';
}

/**
 * Get default backgrounds
 */
function getDefaultBackgrounds() {
    return [
        {
            id: 'default_1',
            name: 'Classic Blue',
            category: 'default',
            url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzMwIiBoZWlnaHQ9IjQ5MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMDA0MDgwO3N0b3Atb3BhY2l0eToxIiAvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMwMDAwNDA7c3RvcC1vcGFjaXR5OjEiIC8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyYWRpZW50KSIgLz4KPC9zdmc+',
            thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzMwIiBoZWlnaHQ9IjQ5MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMDA0MDgwO3N0b3Atb3BhY2l0eToxIiAvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMwMDAwNDA7c3RvcC1vcGFjaXR5OjEiIC8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyYWRpZW50KSIgLz4KPC9zdmc+',
            description: 'Classic xat blue gradient background',
            size: 'cover',
            position: 'center',
            repeat: 'no-repeat',
            attachment: 'fixed'
        },
        {
            id: 'default_2',
            name: 'Dark Theme',
            category: 'default',
            url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzMwIiBoZWlnaHQ9IjQ5MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMTExMTExIiAvPgo8L3N2Zz4=',
            thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzMwIiBoZWlnaHQ9IjQ5MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMTExMTExIiAvPgo8L3N2Zz4=',
            description: 'Dark theme background',
            size: 'cover',
            position: 'center',
            repeat: 'no-repeat',
            attachment: 'fixed'
        }
    ];
}

module.exports = router;
