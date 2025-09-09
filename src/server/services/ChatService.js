/**
 * Chat Service
 * Handles chat room management, messaging, and user interactions
 */

const Room = require('../models/Room');
const Message = require('../models/Message');
const User = require('../models/User');

class ChatService {
    /**
     * Create a new chat room
     */
    static async createRoom(ownerId, roomData) {
        try {
            const room = new Room({
                name: roomData.name,
                description: roomData.description,
                bg: roomData.background || 'http://oi60.tinypic.com/1r6io9.jpg',
                createdBy: ownerId,
                settings: {
                    isPrivate: roomData.isPrivate || false,
                    allowGuests: roomData.allowGuests !== false,
                    maxUsers: roomData.maxUsers || 100
                }
            });

            await room.save();

            // Add owner as admin
            room.admins = [ownerId];
            await room.save();

            return room;
        } catch (error) {
            console.error('Create room error:', error);
            throw error;
        }
    }

    /**
     * Join a chat room
     */
    static async joinRoom(user, roomId) {
        try {
            const room = await Room.findById(roomId);
            if (!room) {
                throw new Error('Room not found');
            }

            // Check if room allows guests
            if (user.rank === 0 && !room.settings.allowGuests) {
                throw new Error('This room does not allow guest users');
            }

            // Check room capacity
            const currentUsers = await this.getRoomUserCount(roomId);
            if (currentUsers >= room.settings.maxUsers) {
                throw new Error('Room is full');
            }

            // Add user to room's user list (in a real implementation, you'd track this)
            // For now, just return the room
            return room;
        } catch (error) {
            console.error('Join room error:', error);
            throw error;
        }
    }

    /**
     * Leave a chat room
     */
    static async leaveRoom(user, roomId) {
        try {
            // In a real implementation, you'd remove the user from the room's user list
            return { success: true };
        } catch (error) {
            console.error('Leave room error:', error);
            throw error;
        }
    }

    /**
     * Send a message to a room
     */
    static async sendMessage(user, roomId, messageText) {
        try {
            // Validate message
            if (!messageText || messageText.trim().length === 0) {
                throw new Error('Message cannot be empty');
            }

            if (messageText.length > 1000) {
                throw new Error('Message too long (max 1000 characters)');
            }

            // Check if user is banned
            if (user.banned && user.banned > new Date()) {
                throw new Error('You are banned from chatting');
            }

            // Create message
            const message = new Message({
                userId: user._id,
                roomId: roomId,
                content: messageText.trim(),
                timestamp: new Date()
            });

            await message.save();

            // Update user's message count
            await User.findByIdAndUpdate(user._id, {
                $inc: { totalMessages: 1 },
                lastSeen: new Date()
            });

            return message;
        } catch (error) {
            console.error('Send message error:', error);
            throw error;
        }
    }

    /**
     * Get messages for a room
     */
    static async getRoomMessages(roomId, limit = 50, offset = 0) {
        try {
            const messages = await Message.find({ roomId })
                .populate('userId', 'nickname username avatar rank')
                .sort({ timestamp: -1 })
                .skip(offset)
                .limit(limit);

            return messages.reverse();
        } catch (error) {
            console.error('Get room messages error:', error);
            throw error;
        }
    }

    /**
     * Get online users in a room
     */
    static async getRoomUsers(roomId) {
        try {
            // In a real implementation, you'd track users in rooms
            // For now, return a mock list
            return [
                {
                    id: '1',
                    nickname: 'TestUser',
                    avatar: '1',
                    rank: 1,
                    isOnline: true
                }
            ];
        } catch (error) {
            console.error('Get room users error:', error);
            throw error;
        }
    }

    /**
     * Get room user count
     */
    static async getRoomUserCount(roomId) {
        try {
            // In a real implementation, you'd count actual users in the room
            return 1; // Mock count
        } catch (error) {
            console.error('Get room user count error:', error);
            return 0;
        }
    }

    /**
     * Update room settings
     */
    static async updateRoomSettings(roomId, userId, settings) {
        try {
            const room = await Room.findById(roomId);
            if (!room) {
                throw new Error('Room not found');
            }

            // Check if user has permission to update
            if (room.createdBy.toString() !== userId && !room.admins.includes(userId)) {
                throw new Error('You do not have permission to update this room');
            }

            // Update settings
            Object.assign(room.settings, settings);
            await room.save();

            return room;
        } catch (error) {
            console.error('Update room settings error:', error);
            throw error;
        }
    }

    /**
     * Delete a room
     */
    static async deleteRoom(roomId, userId) {
        try {
            const room = await Room.findById(roomId);
            if (!room) {
                throw new Error('Room not found');
            }

            // Check if user is the owner
            if (room.createdBy.toString() !== userId) {
                throw new Error('Only the room owner can delete this room');
            }

            // Delete all messages in the room
            await Message.deleteMany({ roomId });

            // Delete the room
            await Room.findByIdAndDelete(roomId);

            return { success: true };
        } catch (error) {
            console.error('Delete room error:', error);
            throw error;
        }
    }

    /**
     * Search rooms
     */
    static async searchRooms(query, limit = 20) {
        try {
            const rooms = await Room.find({
                $or: [
                    { name: { $regex: query, $options: 'i' } },
                    { description: { $regex: query, $options: 'i' } }
                ],
                'settings.isPrivate': false
            })
            .populate('createdBy', 'nickname username')
            .limit(limit);

            return rooms;
        } catch (error) {
            console.error('Search rooms error:', error);
            throw error;
        }
    }

    /**
     * Get user's rooms
     */
    static async getUserRooms(userId) {
        try {
            const rooms = await Room.find({
                $or: [
                    { createdBy: userId },
                    { admins: userId }
                ]
            });

            return rooms;
        } catch (error) {
            console.error('Get user rooms error:', error);
            throw error;
        }
    }
}

module.exports = ChatService;