/**
 * 🎭 FETCH XAT POWERS - Real xat.com Powers Integration
 * Fetches all current xat.com powers from xatstuff API and updates our database
 */

const mongoose = require('mongoose');
const Power = require('../src/server/models/Power');

async function fetchXatPowers() {
    try {
        console.log('🎭 Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ixat', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('🎭 Fetching powers from xatstuff API...');
        
        // Fetch all powers from xatstuff API
        const response = await fetch('https://api.xatstuff.com/powers');
        const powersData = await response.json();
        
        console.log(`🎭 Found ${Object.keys(powersData).length} powers from xat.com`);

        let updated = 0;
        let created = 0;

        for (const [powerId, powerData] of Object.entries(powersData)) {
            const id = parseInt(powerId);
            
            // Skip invalid power IDs
            if (isNaN(id) || id < 0) continue;

            // Convert xatstuff data to our schema
            const powerDoc = {
                id: id,
                name: powerData.name || `power${id}`,
                section: `p${Math.floor(id / 32)}`, // Calculate section like Ixat Files
                subid: Math.pow(2, id % 32), // Calculate subid using bitwise like Ixat Files
                cost: powerData.cost || 0,
                limited: powerData.limited ? 1 : 0,
                description: powerData.description || '',
                amount: powerData.amount || 0,
                topsh: powerData.smilies ? powerData.smilies.join(',') : '',
                group: powerData.group || ''
            };

            try {
                // Update or create power
                const existingPower = await Power.findOne({ id: id });
                
                if (existingPower) {
                    await Power.updateOne({ id: id }, powerDoc);
                    updated++;
                } else {
                    await Power.create(powerDoc);
                    created++;
                }

                if ((created + updated) % 50 === 0) {
                    console.log(`🎭 Processed ${created + updated} powers...`);
                }
            } catch (error) {
                console.warn(`Failed to save power ${id}: ${error.message}`);
            }
        }

        console.log(`🎭 Powers update complete!`);
        console.log(`   ✅ Created: ${created} new powers`);
        console.log(`   ✅ Updated: ${updated} existing powers`);
        console.log(`   ⚡ Total powers in database: ${created + updated}`);

        // Also fetch latest power for homepage display
        try {
            const latestResponse = await fetch('https://api.xatstuff.com/latest');
            const latestData = await latestResponse.json();
            console.log(`🎭 Latest power: ${latestData.name} (${latestData.cost} xats)`);
        } catch (error) {
            console.warn('Could not fetch latest power info');
        }

    } catch (error) {
        console.error('❌ Error fetching xat powers:', error);
    } finally {
        await mongoose.disconnect();
        console.log('🎭 Database connection closed');
    }
}

// Run if called directly
if (require.main === module) {
    fetchXatPowers();
}

module.exports = fetchXatPowers;
