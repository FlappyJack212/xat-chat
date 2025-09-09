/**
 * Power Service
 * Handles power management, activation, and effects
 */

const Power = require('../models/Power');
const User = require('../models/User');
const UserPower = require('../models/UserPower');

class PowerService {
    /**
     * Get all available powers
     */
    static async getAvailablePowers() {
        try {
            console.log('🔍 [DEBUG] PowerService.getAvailablePowers called');
            
            // First, let's check total count
            const totalCount = await Power.countDocuments();
            console.log('🔍 [DEBUG] Total powers in DB:', totalCount);
            
            // Check with different status values
            const availableCount = await Power.countDocuments({ status: 'Available' });
            console.log('🔍 [DEBUG] Powers with status Available:', availableCount);
            
            const activeCount = await Power.countDocuments({ status: 'active' });
            console.log('🔍 [DEBUG] Powers with status active:', activeCount);
            
            const powers = await Power.find({
                status: { $in: ['Available', 'active'] },
                $or: [
                    { endDate: { $exists: false } },
                    { endDate: null },
                    { endDate: { $gt: new Date() } }
                ]
            }).sort({ cost: 1 });

            console.log('🔍 [DEBUG] Query returned:', powers.length, 'powers');
            return powers;
        } catch (error) {
            console.error('Get available powers error:', error);
            throw error;
        }
    }

    /**
     * Get powers owned by a user
     */
    static async getUserPowers(userId) {
        try {
            const userPowers = await UserPower.find({ userId })
                .populate('powerId')
                .sort({ 'powerId.name': 1 });

            return userPowers;
        } catch (error) {
            console.error('Get user powers error:', error);
            throw error;
        }
    }

    /**
     * Purchase a power
     */
    static async purchasePower(userId, powerId) {
        try {
            const user = await User.findById(userId);
            const power = await Power.findById(powerId);

            if (!user || !power) {
                throw new Error('User or power not found');
            }

            // Check if power is available
            if (!power.isAvailable()) {
                throw new Error('Power is not available for purchase');
            }

            // Check if user has enough xats
            if (user.xats < power.cost) {
                throw new Error('Insufficient xats');
            }

            // Check if user already owns this power
            const existingPower = await UserPower.findOne({ userId, powerId });
            if (existingPower) {
                throw new Error('You already own this power');
            }

            // Deduct xats from user
            user.xats -= power.cost;
            await user.save();

            // Add power to user's collection
            const userPower = new UserPower({
                userId,
                powerId,
                count: 1,
                purchased: new Date()
            });

            await userPower.save();

            return {
                success: true,
                message: `Successfully purchased ${power.name}`,
                power: power,
                remainingXats: user.xats
            };
        } catch (error) {
            console.error('Purchase power error:', error);
            throw error;
        }
    }

    /**
     * Activate a power
     */
    static async activatePower(user, powerId) {
        try {
            // Find the power
            const power = await Power.findById(powerId);
            if (!power) {
                throw new Error('Power not found');
            }

            // Check if user owns this power
            const userPower = await UserPower.findOne({ userId: user._id, powerId });
            if (!userPower) {
                throw new Error('You do not own this power');
            }

            // Check if power has uses remaining
            if (userPower.count <= 0) {
                throw new Error('No uses remaining for this power');
            }

            // Decrement use count
            userPower.count -= 1;
            await userPower.save();

            // Generate power effect based on power type
            const effect = this.generatePowerEffect(power, user);

            return {
                success: true,
                power: power,
                effect: effect,
                remainingUses: userPower.count
            };
        } catch (error) {
            console.error('Activate power error:', error);
            throw error;
        }
    }

    /**
     * Generate power effect
     */
    static generatePowerEffect(power, user) {
        const effects = {
            // Text color powers
            'red': { type: 'textColor', color: '#FF0000' },
            'green': { type: 'textColor', color: '#00FF00' },
            'blue': { type: 'textColor', color: '#0000FF' },
            'yellow': { type: 'textColor', color: '#FFFF00' },

            // Special effects
            'rainbow': { type: 'rainbow', duration: 30000 },
            'glow': { type: 'glow', color: '#FFD700', duration: 30000 },
            'bold': { type: 'bold', duration: 30000 },
            'italic': { type: 'italic', duration: 30000 },

            // Avatar effects
            'zoom': { type: 'avatarZoom', scale: 1.5, duration: 10000 },
            'spin': { type: 'avatarSpin', duration: 5000 },
            'bounce': { type: 'avatarBounce', duration: 3000 },

            // Room effects
            'dark': { type: 'roomDark', duration: 30000 },
            'light': { type: 'roomLight', duration: 30000 },
            'shake': { type: 'roomShake', duration: 5000 },

            // Sound effects
            'bell': { type: 'sound', sound: 'bell.mp3' },
            'gong': { type: 'sound', sound: 'gong.mp3' },
            'clap': { type: 'sound', sound: 'clap.mp3' }
        };

        return effects[power.name.toLowerCase()] || {
            type: 'generic',
            message: `${user.nickname} used ${power.name}!`
        };
    }

    /**
     * Assign power to user (admin function)
     */
    static async assignPower(adminId, targetUserId, powerId, duration = null) {
        try {
            const admin = await User.findById(adminId);
            const targetUser = await User.findById(targetUserId);
            const power = await Power.findById(powerId);

            if (!admin || !targetUser || !power) {
                throw new Error('User or power not found');
            }

            // Check if admin has permission
            if (admin.rank < 3) {
                throw new Error('Insufficient permissions to assign powers');
            }

            // Check if user already has this power
            const existingPower = await UserPower.findOne({ userId: targetUserId, powerId });
            if (existingPower) {
                // Extend existing power
                if (duration) {
                    existingPower.expiresAt = new Date(Date.now() + duration * 60 * 60 * 1000);
                }
                existingPower.count += 1;
                await existingPower.save();
            } else {
                // Create new power assignment
                const userPower = new UserPower({
                    userId: targetUserId,
                    powerId: powerId,
                    count: 1,
                    assignedBy: adminId,
                    assigned: new Date(),
                    expiresAt: duration ? new Date(Date.now() + duration * 60 * 60 * 1000) : null
                });
                await userPower.save();
            }

            return {
                success: true,
                message: `Power ${power.name} assigned to ${targetUser.nickname}`,
                power: power,
                targetUser: targetUser.getProfileData()
            };
        } catch (error) {
            console.error('Assign power error:', error);
            throw error;
        }
    }

    /**
     * Remove power from user (admin function)
     */
    static async removePower(adminId, targetUserId, powerId) {
        try {
            const admin = await User.findById(adminId);
            const targetUser = await User.findById(targetUserId);
            const power = await Power.findById(powerId);

            if (!admin || !targetUser || !power) {
                throw new Error('User or power not found');
            }

            // Check if admin has permission
            if (admin.rank < 3) {
                throw new Error('Insufficient permissions to remove powers');
            }

            // Remove the power
            const result = await UserPower.deleteOne({ userId: targetUserId, powerId });

            if (result.deletedCount === 0) {
                throw new Error('User does not have this power');
            }

            return {
                success: true,
                message: `Power ${power.name} removed from ${targetUser.nickname}`,
                power: power,
                targetUser: targetUser.getProfileData()
            };
        } catch (error) {
            console.error('Remove power error:', error);
            throw error;
        }
    }

    /**
     * Use a power effect (for ongoing effects)
     */
    static async usePowerEffect(user, powerName, targetUser = null) {
        try {
            const effect = this.generatePowerEffect({ name: powerName }, user);

            return {
                success: true,
                effect: effect,
                user: user,
                target: targetUser,
                timestamp: new Date()
            };
        } catch (error) {
            console.error('Use power effect error:', error);
            throw error;
        }
    }

    /**
     * Get power statistics
     */
    static async getPowerStats() {
        try {
            const stats = await Power.aggregate([
                {
                    $group: {
                        _id: null,
                        totalPowers: { $sum: 1 },
                        availablePowers: {
                            $sum: { $cond: [{ $in: ['$status', ['Available', 'active']] }, 1, 0] }
                        },
                        totalCost: { $sum: '$cost' },
                        epicPowers: { $sum: { $cond: ['$epic', 1, 0] } },
                        gamePowers: { $sum: { $cond: ['$game', 1, 0] } }
                    }
                }
            ]);

            return stats[0] || {
                totalPowers: 0,
                availablePowers: 0,
                totalCost: 0,
                epicPowers: 0,
                gamePowers: 0
            };
        } catch (error) {
            console.error('Get power stats error:', error);
            throw error;
        }
    }

    /**
     * Search powers
     */
    static async searchPowers(query, category = null, limit = 20) {
        try {
            const searchQuery = {
                $and: [
                    {
                        $or: [
                            { name: { $regex: query, $options: 'i' } },
                            { description: { $regex: query, $options: 'i' } }
                        ]
                    },
                    { status: { $in: ['Available', 'active'] } }
                ]
            };

            if (category) {
                searchQuery.$and.push({ category: category });
            }

            const powers = await Power.find(searchQuery)
                .sort({ cost: 1 })
                .limit(limit);

            return powers;
        } catch (error) {
            console.error('Search powers error:', error);
            throw error;
        }
    }

    /**
     * Get powers by category
     */
    static async getPowersByCategory(category) {
        try {
            const powers = await Power.find({
                category: category,
                status: { $in: ['Available', 'active'] }
            }).sort({ cost: 1 });

            return powers;
        } catch (error) {
            console.error('Get powers by category error:', error);
            throw error;
        }
    }

    /**
     * Check if user can use a power
     */
    static async canUsePower(userId, powerId) {
        try {
            const userPower = await UserPower.findOne({ userId, powerId });
            return userPower && userPower.count > 0;
        } catch (error) {
            console.error('Can use power error:', error);
            return false;
        }
    }

    /**
     * Get power usage history for a user
     */
    static async getUserPowerHistory(userId, limit = 50) {
        try {
            // In a real implementation, you'd track power usage history
            // For now, return user's current powers
            const userPowers = await this.getUserPowers(userId);
            return userPowers;
        } catch (error) {
            console.error('Get user power history error:', error);
            throw error;
        }
    }

    /**
     * Transfer power between users
     */
    static async transferPower(fromUserId, toUserId, powerId) {
        try {
            const fromUserPower = await UserPower.findOne({ userId: fromUserId, powerId });
            if (!fromUserPower || fromUserPower.count <= 0) {
                throw new Error('You do not have this power to transfer');
            }

            // Check if recipient already has this power
            let toUserPower = await UserPower.findOne({ userId: toUserId, powerId });

            if (toUserPower) {
                // Increment existing power count
                toUserPower.count += 1;
                await toUserPower.save();
            } else {
                // Create new power entry for recipient
                toUserPower = new UserPower({
                    userId: toUserId,
                    powerId,
                    count: 1,
                    purchased: new Date()
                });
                await toUserPower.save();
            }

            // Decrement sender's power count
            fromUserPower.count -= 1;
            if (fromUserPower.count <= 0) {
                await UserPower.findByIdAndDelete(fromUserPower._id);
            } else {
                await fromUserPower.save();
            }

            return {
                success: true,
                message: 'Power transferred successfully'
            };
        } catch (error) {
            console.error('Transfer power error:', error);
            throw error;
        }
    }

    /**
     * Use a power
     */
    static async usePower(user, powerId, roomId) {
        try {
            const power = await Power.findById(powerId);
            if (!power) {
                return { success: false, message: 'Power not found' };
            }

            // Check if user owns the power
            const userPower = await UserPower.findOne({
                userId: user._id,
                powerId: powerId
            });

            if (!userPower) {
                return { success: false, message: 'You do not own this power' };
            }

            // Check cooldown
            const now = new Date();
            if (userPower.lastUsed && (now - userPower.lastUsed) < power.cooldown * 1000) {
                const remainingTime = Math.ceil((power.cooldown * 1000 - (now - userPower.lastUsed)) / 1000);
                return { success: false, message: `Power is on cooldown for ${remainingTime} seconds` };
            }

            // Update last used time
            userPower.lastUsed = now;
            await userPower.save();

            // Apply power effect
            const effect = {
                powerId: power._id,
                powerName: power.name,
                userId: user._id,
                roomId: roomId,
                effect: power.effects[0] || 'default',
                timestamp: now
            };

            return {
                success: true,
                message: `Used ${power.name}`,
                effect: effect
            };
        } catch (error) {
            console.error('Use power error:', error);
            return { success: false, message: 'Failed to use power' };
        }
    }
}

module.exports = PowerService;