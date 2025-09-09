/**
 * Store Service - Handles store operations, auctions, and purchases
 */
class StoreService {
    constructor() {
        this.powers = [
            {
                id: 1,
                name: 'Rainbow Text',
                description: 'Make your text appear in rainbow colors',
                price: 100,
                icon: '🌈',
                category: 'Text Effects',
                rarity: 'common'
            },
            {
                id: 2,
                name: 'Glow Effect',
                description: 'Add a glowing effect to your messages',
                price: 150,
                icon: '✨',
                category: 'Text Effects',
                rarity: 'uncommon'
            },
            {
                id: 3,
                name: 'Bold Text',
                description: 'Make your text bold and stand out',
                price: 50,
                icon: '💪',
                category: 'Text Effects',
                rarity: 'common'
            },
            {
                id: 4,
                name: 'Italic Text',
                description: 'Make your text italic and elegant',
                price: 50,
                icon: '📝',
                category: 'Text Effects',
                rarity: 'common'
            },
            {
                id: 5,
                name: 'Underline Text',
                description: 'Underline your text for emphasis',
                price: 50,
                icon: '📏',
                category: 'Text Effects',
                rarity: 'common'
            },
            {
                id: 6,
                name: 'Strike Text',
                description: 'Strike through your text',
                price: 50,
                icon: '❌',
                category: 'Text Effects',
                rarity: 'common'
            },
            {
                id: 7,
                name: 'Shadow Text',
                description: 'Add shadow effect to your text',
                price: 200,
                icon: '👻',
                category: 'Text Effects',
                rarity: 'rare'
            },
            {
                id: 8,
                name: 'Neon Text',
                description: 'Make your text glow like neon',
                price: 300,
                icon: '💡',
                category: 'Text Effects',
                rarity: 'epic'
            }
        ];
        
        this.auctions = [
            {
                id: 1,
                name: 'Rare Power Bundle',
                description: 'Exclusive collection of rare powers',
                currentBid: 500,
                timeLeft: 7200, // 2 hours in seconds
                icon: '🎁',
                bidders: 12,
                seller: 'Admin',
                endTime: new Date(Date.now() + 7200000)
            },
            {
                id: 2,
                name: 'Limited Edition Avatar',
                description: 'Special avatar only available through auction',
                currentBid: 750,
                timeLeft: 4500, // 1.25 hours in seconds
                icon: '👤',
                bidders: 8,
                seller: 'Admin',
                endTime: new Date(Date.now() + 4500000)
            }
        ];
        
        this.promotions = [
            {
                id: 1,
                name: 'Room Promotion',
                description: 'Promote your room to the top of the list',
                price: 200,
                icon: '📈',
                duration: '24 hours'
            },
            {
                id: 2,
                name: 'Profile Boost',
                description: 'Make your profile more visible',
                price: 100,
                icon: '⭐',
                duration: '7 days'
            }
        ];
    }
    
    /**
     * Get all powers
     */
    getPowers() {
        return this.powers;
    }
    
    /**
     * Get power by ID
     */
    getPowerById(id) {
        return this.powers.find(power => power.id === parseInt(id));
    }
    
    /**
     * Get powers by category
     */
    getPowersByCategory(category) {
        return this.powers.filter(power => power.category === category);
    }
    
    /**
     * Search powers
     */
    searchPowers(query) {
        const lowercaseQuery = query.toLowerCase();
        return this.powers.filter(power => 
            power.name.toLowerCase().includes(lowercaseQuery) ||
            power.description.toLowerCase().includes(lowercaseQuery) ||
            power.category.toLowerCase().includes(lowercaseQuery)
        );
    }
    
    /**
     * Get all auctions
     */
    getAuctions() {
        return this.auctions.map(auction => ({
            ...auction,
            timeLeft: Math.max(0, Math.floor((auction.endTime - new Date()) / 1000))
        }));
    }
    
    /**
     * Get auction by ID
     */
    getAuctionById(id) {
        return this.auctions.find(auction => auction.id === parseInt(id));
    }
    
    /**
     * Place a bid on an auction
     */
    placeBid(auctionId, userId, amount) {
        const auction = this.getAuctionById(auctionId);
        if (!auction) {
            throw new Error('Auction not found');
        }
        
        if (auction.timeLeft <= 0) {
            throw new Error('Auction has ended');
        }
        
        if (amount <= auction.currentBid) {
            throw new Error('Bid must be higher than current bid');
        }
        
        auction.currentBid = amount;
        auction.bidders++;
        
        return {
            success: true,
            auction: auction,
            message: 'Bid placed successfully'
        };
    }
    
    /**
     * Get all promotions
     */
    getPromotions() {
        return this.promotions;
    }
    
    /**
     * Purchase an item
     */
    purchaseItem(userId, itemId, itemType) {
        let item;
        
        switch (itemType) {
            case 'power':
                item = this.getPowerById(itemId);
                break;
            case 'promotion':
                item = this.promotions.find(p => p.id === parseInt(itemId));
                break;
            default:
                throw new Error('Invalid item type');
        }
        
        if (!item) {
            throw new Error('Item not found');
        }
        
        return {
            success: true,
            item: item,
            message: 'Item purchased successfully'
        };
    }
    
    /**
     * Get user's balance
     */
    async getUserBalance(userId) {
        // In a real implementation, this would fetch from database
        return 1000; // Mock balance
    }
    
    /**
     * Update user balance
     */
    async updateUserBalance(userId, amount) {
        // In a real implementation, this would update database
        return true;
    }
    
    /**
     * Get store statistics
     */
    getStoreStats() {
        return {
            totalPowers: this.powers.length,
            totalAuctions: this.auctions.length,
            totalPromotions: this.promotions.length,
            activeAuctions: this.auctions.filter(a => a.timeLeft > 0).length
        };
    }
}

module.exports = new StoreService();
