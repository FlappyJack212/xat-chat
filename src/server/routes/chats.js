const express = require('express');
const Chat = require('../models/Chat');
const User = require('../models/User');
const Message = require('../models/Message');
const { authenticateToken } = require('./auth');
const router = express.Router();

// Get all public chats
router.get('/', async (req, res) => {
    try {
        const { page = 1, limit = 20, group, category, search } = req.query;
        
        let query = { 
            status: 'active',
            'access.public': true
        };
        
        // Filter by group
        if (group) {
            query.group = group;
        }
        
        // Filter by category
        if (category) {
            query.category = category;
        }
        
        // Search by name or description
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }
        
        const chats = await Chat.find(query)
            .populate('owner', 'username rank avatar')
            .sort({ 'stats.lastActivity': -1 })
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit));
        
        const total = await Chat.countDocuments(query);
        
        res.json({
            message: 'Chats retrieved successfully',
            chats: chats,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: total,
                pages: Math.ceil(total / parseInt(limit))
            }
        });
        
    } catch (error) {
        console.error('Get chats error:', error);
        res.status(500).json({ message: 'Server error retrieving chats' });
    }
});

// Get chat by ID
router.get('/:id', async (req, res) => {
    try {
        const chat = await Chat.findById(req.params.id)
            .populate('owner', 'username rank avatar')
            .populate('coOwners', 'username rank avatar');
        
        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }
        
        if (chat.status !== 'active') {
            return res.status(404).json({ message: 'Chat not found' });
        }
        
        res.json({
            message: 'Chat retrieved successfully',
            chat: chat
        });
        
    } catch (error) {
        console.error('Get chat error:', error);
        res.status(500).json({ message: 'Server error retrieving chat' });
    }
});

// Create new chat (requires authentication)
router.post('/', authenticateToken, async (req, res) => {
    try {
        const { name, description, group, category, background, radio, password } = req.body;
        
        if (!name) {
            return res.status(400).json({ message: 'Chat name is required' });
        }
        
        // Check if chat name already exists
        const existingChat = await Chat.findOne({ name: name.toLowerCase() });
        if (existingChat) {
            return res.status(400).json({ message: 'Chat name already exists' });
        }
        
        // Create new chat
        const chat = new Chat({
            name: name.toLowerCase(),
            description: description || '',
            owner: req.user._id,
            group: group || 'General',
            category: category || 'Chat',
            background: background || 'default',
            radio: radio || '',
            password: password || '',
            pools: [
                { name: 'Club', description: 'Main chat room', requiresRank: 'guest' },
                { name: 'VIP', description: 'VIP members only', requiresRank: 'member' },
                { name: 'Chum', description: 'Friends chat', requiresRank: 'member' },
                { name: 'Banned', description: 'Banned users', requiresRank: 'guest' }
            ]
        });
        
        await chat.save();
        
        // Add chat to user's owned chats
        req.user.ownedChats.push(chat._id);
        await req.user.save();
        
        res.status(201).json({
            message: 'Chat created successfully',
            chat: chat
        });
        
    } catch (error) {
        console.error('Create chat error:', error);
        res.status(500).json({ message: 'Server error creating chat' });
    }
});

// Update chat (owner/admin only)
router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const chatId = req.params.id;
        const chat = await Chat.findById(chatId);
        
        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }
        
        // Check if user can modify this chat
        if (!chat.canModerate(req.user)) {
            return res.status(403).json({ message: 'Insufficient permissions to modify this chat' });
        }
        
        const { name, description, group, category, background, radio, password, rules, features } = req.body;
        
        // Update allowed fields
        if (name !== undefined) chat.name = name.toLowerCase();
        if (description !== undefined) chat.description = description;
        if (group !== undefined) chat.group = group;
        if (category !== undefined) chat.category = category;
        if (background !== undefined) chat.background = background;
        if (radio !== undefined) chat.radio = radio;
        if (password !== undefined) chat.password = password;
        if (rules !== undefined) chat.rules = { ...chat.rules, ...rules };
        if (features !== undefined) chat.features = { ...chat.features, ...features };
        
        await chat.save();
        
        res.json({
            message: 'Chat updated successfully',
            chat: chat
        });
        
    } catch (error) {
        console.error('Update chat error:', error);
        res.status(500).json({ message: 'Server error updating chat' });
    }
});

// Delete chat (owner only)
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const chatId = req.params.id;
        const chat = await Chat.findById(chatId);
        
        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }
        
        // Only owner can delete chat
        if (!chat.isOwner(req.user._id)) {
            return res.status(403).json({ message: 'Only the owner can delete this chat' });
        }
        
        // Change status to inactive instead of deleting
        chat.status = 'inactive';
        await chat.save();
        
        res.json({
            message: 'Chat deactivated successfully'
        });
        
    } catch (error) {
        console.error('Delete chat error:', error);
        res.status(500).json({ message: 'Server error deleting chat' });
    }
});

// Get chat messages
router.get('/:id/messages', async (req, res) => {
    try {
        const chatId = req.params.id;
        const { page = 1, limit = 50 } = req.query;
        
        const chat = await Chat.findById(chatId);
        if (!chat || chat.status !== 'active') {
            return res.status(404).json({ message: 'Chat not found' });
        }
        
        const messages = await Message.findByChat(chatId, parseInt(limit), (parseInt(page) - 1) * parseInt(limit));
        const total = await Message.countDocuments({ 
            chat: chatId,
            status: 'active',
            'moderation.hidden': false
        });
        
        res.json({
            message: 'Chat messages retrieved successfully',
            messages: messages,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: total,
                pages: Math.ceil(total / parseInt(limit))
            }
        });
        
    } catch (error) {
        console.error('Get chat messages error:', error);
        res.status(500).json({ message: 'Server error retrieving chat messages' });
    }
});

// Send message to chat (requires authentication)
router.post('/:id/messages', authenticateToken, async (req, res) => {
    try {
        const chatId = req.params.id;
        const { content, type = 'chat', target } = req.body;
        
        if (!content || content.trim().length === 0) {
            return res.status(400).json({ message: 'Message content is required' });
        }
        
        const chat = await Chat.findById(chatId);
        if (!chat || chat.status !== 'active') {
            return res.status(404).json({ message: 'Chat not found' });
        }
        
        // Check if user can access this chat
        if (!chat.canAccess(req.user)) {
            return res.status(403).json({ message: 'Access denied to this chat' });
        }
        
        // Check message length
        if (content.length > chat.rules.maxMessageLength) {
            return res.status(400).json({ 
                message: `Message too long. Maximum length is ${chat.rules.maxMessageLength} characters.` 
            });
        }
        
        // Create message
        const message = new Message({
            content: content.trim(),
            type: type,
            author: req.user._id,
            chat: chatId,
            target: target || {}
        });
        
        await message.save();
        
        // Update chat statistics
        await chat.addMessage();
        
        // Populate author info for response
        await message.populate('author', 'username rank avatar');
        
        res.status(201).json({
            message: 'Message sent successfully',
            messageData: message
        });
        
    } catch (error) {
        console.error('Send message error:', error);
        res.status(500).json({ message: 'Server error sending message' });
    }
});

// Get chat statistics
router.get('/:id/stats', async (req, res) => {
    try {
        const chatId = req.params.id;
        
        const chat = await Chat.findById(chatId);
        if (!chat || chat.status !== 'active') {
            return res.status(404).json({ message: 'Chat not found' });
        }
        
        const messageStats = await Message.getMessageStats(chatId);
        
        const stats = {
            chat: {
                name: chat.name,
                totalMessages: chat.stats.totalMessages,
                totalUsers: chat.stats.totalUsers,
                peakUsers: chat.stats.peakUsers,
                createdDate: chat.stats.createdDate,
                lastActivity: chat.stats.lastActivity
            },
            messages: messageStats
        };
        
        res.json({
            message: 'Chat statistics retrieved successfully',
            stats: stats
        });
        
    } catch (error) {
        console.error('Get chat stats error:', error);
        res.status(500).json({ message: 'Server error retrieving chat statistics' });
    }
});

// Enable chat protection (owner/admin only)
router.post('/:id/protection', authenticateToken, async (req, res) => {
    try {
        const chatId = req.params.id;
        const { type, duration } = req.body;
        
        if (!type) {
            return res.status(400).json({ message: 'Protection type is required' });
        }
        
        const chat = await Chat.findById(chatId);
        if (!chat || chat.status !== 'active') {
            return res.status(404).json({ message: 'Chat not found' });
        }
        
        // Check if user can modify this chat
        if (!chat.canModerate(req.user)) {
            return res.status(403).json({ message: 'Insufficient permissions to modify this chat' });
        }
        
        // Enable protection
        await chat.enableProtection(type, duration || 60);
        
        res.json({
            message: `Chat protection enabled: ${type}`,
            chat: chat
        });
        
    } catch (error) {
        console.error('Enable chat protection error:', error);
        res.status(500).json({ message: 'Server error enabling chat protection' });
    }
});

// Disable chat protection (owner/admin only)
router.delete('/:id/protection', authenticateToken, async (req, res) => {
    try {
        const chatId = req.params.id;
        
        const chat = await Chat.findById(chatId);
        if (!chat || chat.status !== 'active') {
            return res.status(404).json({ message: 'Chat not found' });
        }
        
        // Check if user can modify this chat
        if (!chat.canModerate(req.user)) {
            return res.status(403).json({ message: 'Insufficient permissions to modify this chat' });
        }
        
        // Disable protection
        await chat.disableProtection();
        
        res.json({
            message: 'Chat protection disabled',
            chat: chat
        });
        
    } catch (error) {
        console.error('Disable chat protection error:', error);
        res.status(500).json({ message: 'Server error disabling chat protection' });
    }
});

// Add chat announcement (owner/admin only)
router.post('/:id/announcements', authenticateToken, async (req, res) => {
    try {
        const chatId = req.params.id;
        const { message } = req.body;
        
        if (!message || message.trim().length === 0) {
            return res.status(400).json({ message: 'Announcement message is required' });
        }
        
        const chat = await Chat.findById(chatId);
        if (!chat || chat.status !== 'active') {
            return res.status(404).json({ message: 'Chat not found' });
        }
        
        // Check if user can modify this chat
        if (!chat.canModerate(req.user)) {
            return res.status(403).json({ message: 'Insufficient permissions to modify this chat' });
        }
        
        // Add announcement
        await chat.addAnnouncement(message, req.user);
        
        res.json({
            message: 'Announcement added successfully',
            chat: chat
        });
        
    } catch (error) {
        console.error('Add announcement error:', error);
        res.status(500).json({ message: 'Server error adding announcement' });
    }
});

// Remove chat announcement (owner/admin only)
router.delete('/:id/announcements/:announcementId', authenticateToken, async (req, res) => {
    try {
        const chatId = req.params.id;
        const announcementId = req.params.announcementId;
        
        const chat = await Chat.findById(chatId);
        if (!chat || chat.status !== 'active') {
            return res.status(404).json({ message: 'Chat not found' });
        }
        
        // Check if user can modify this chat
        if (!chat.canModerate(req.user)) {
            return res.status(403).json({ message: 'Insufficient permissions to modify this chat' });
        }
        
        // Remove announcement
        await chat.removeAnnouncement(announcementId);
        
        res.json({
            message: 'Announcement removed successfully',
            chat: chat
        });
        
    } catch (error) {
        console.error('Remove announcement error:', error);
        res.status(500).json({ message: 'Server error removing announcement' });
    }
});

// Get chat groups
router.get('/groups/list', async (req, res) => {
    try {
        const groups = await Chat.distinct('group', { status: 'active' });
        
        res.json({
            message: 'Chat groups retrieved successfully',
            groups: groups
        });
        
    } catch (error) {
        console.error('Get chat groups error:', error);
        res.status(500).json({ message: 'Server error retrieving chat groups' });
    }
});

// Get chats by group
router.get('/groups/:group', async (req, res) => {
    try {
        const { group } = req.params;
        const { page = 1, limit = 20 } = req.query;
        
        const chats = await Chat.findByGroup(group)
            .populate('owner', 'username rank avatar')
            .sort({ 'stats.lastActivity': -1 })
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit));
        
        const total = await Chat.countDocuments({ group: group, status: 'active' });
        
        res.json({
            message: `Chats in group ${group} retrieved successfully`,
            group: group,
            chats: chats,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: total,
                pages: Math.ceil(total / parseInt(limit))
            }
        });
        
    } catch (error) {
        console.error('Get chats by group error:', error);
        res.status(500).json({ message: 'Server error retrieving chats by group' });
    }
});

// Get popular chats
router.get('/popular/list', async (req, res) => {
    try {
        const { limit = 10 } = req.query;
        
        const chats = await Chat.getPopularChats(parseInt(limit));
        
        res.json({
            message: 'Popular chats retrieved successfully',
            chats: chats
        });
        
    } catch (error) {
        console.error('Get popular chats error:', error);
        res.status(500).json({ message: 'Server error retrieving popular chats' });
    }
});

// Get chat system statistics (admin only)
router.get('/stats/system', authenticateToken, async (req, res) => {
    try {
        // Check if user has permission
        if (req.user.rank !== 'mainowner' && req.user.rank !== 'owner') {
            return res.status(403).json({ message: 'Insufficient permissions' });
        }
        
        const chatStats = await Chat.getChatStats();
        
        res.json({
            message: 'Chat system statistics retrieved successfully',
            stats: chatStats
        });
        
    } catch (error) {
        console.error('Get chat system stats error:', error);
        res.status(500).json({ message: 'Server error retrieving chat system statistics' });
    }
});

// Check if user owns a chat
router.get('/:id/owner', authenticateToken, async (req, res) => {
    try {
        const chatId = req.params.id;
        const chat = await Chat.findById(chatId);
        
        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }
        
        const isOwner = chat.isOwner(req.user._id);
        const isCoOwner = chat.isCoOwner(req.user._id);
        
        res.json({
            message: 'Chat ownership status retrieved successfully',
            isOwner: isOwner,
            isCoOwner: isCoOwner,
            canModerate: chat.canModerate(req.user)
        });
        
    } catch (error) {
        console.error('Check chat ownership error:', error);
        res.status(500).json({ message: 'Server error checking chat ownership' });
    }
});

module.exports = router;
