/**
 * 🎭 SIMPLE POWERS IMPORT
 * Creates a simple Power model that matches Ixat Files structure
 * and imports all 325+ powers from database.sql
 */

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Simple Power schema that matches Ixat Files
const simplePowerSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    section: { type: String, required: true, default: 'p0' },
    name: { type: String, required: true },
    subid: { type: Number, required: true },
    cost: { type: Number, required: true, default: 0 },
    limited: { type: Number, default: 0 },
    description: { type: String, default: '' },
    amount: { type: Number, default: 0 },
    topsh: { type: String, default: '' },
    group: { type: String, default: '' }
}, { 
    timestamps: true,
    collection: 'powers' // Use existing collection
});

// Create model
const SimplePower = mongoose.model('SimplePower', simplePowerSchema);

async function importPowers() {
    try {
        console.log('🎭 Connecting to MongoDB...');
        await mongoose.connect('mongodb://localhost:27017/ixat_chat', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('📖 Reading database.sql...');
        const sqlPath = path.join(__dirname, '..', 'Ixat Files', '_server', 'database.sql');
        const sqlContent = fs.readFileSync(sqlPath, 'utf8');

        // Extract ALL powers INSERT statements
        const powersMatches = sqlContent.match(/INSERT INTO `powers`[\s\S]*?;/g);
        if (!powersMatches) {
            throw new Error('No powers INSERT statements found in database.sql');
        }

        console.log(`🔍 Found ${powersMatches.length} powers INSERT statements`);

        let allPowers = [];
        for (const insertStatement of powersMatches) {
            const powersData = parsePowersInsert(insertStatement);
            allPowers = allPowers.concat(powersData);
        }

        console.log(`📦 Total powers found: ${allPowers.length}`);

        // Clear existing powers
        await SimplePower.deleteMany({});
        console.log('🗑️ Cleared existing powers');

        // Import all powers
        let imported = 0;
        for (const powerData of allPowers) {
            try {
                await SimplePower.create(powerData);
                imported++;
                if (imported % 50 === 0) {
                    console.log(`✅ Imported ${imported} powers...`);
                }
            } catch (error) {
                console.warn(`⚠️ Failed to import power ${powerData.name}: ${error.message}`);
            }
        }

        console.log(`🎉 Successfully imported ${imported} powers!`);

        // Show some examples
        const samplePowers = await SimplePower.find().limit(10);
        console.log('\n📋 Sample powers:');
        samplePowers.forEach(power => {
            console.log(`  - ${power.name} (${power.section}, ${power.cost} xats)`);
        });

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('🎭 Disconnected from MongoDB');
    }
}

function parsePowersInsert(insertStatement) {
    // Extract VALUES section
    const valuesMatch = insertStatement.match(/VALUES\s*([^;]+)/i);
    if (!valuesMatch) return [];

    const valuesSection = valuesMatch[1];
    
    // Split by ),( to get individual power entries
    const powerEntries = valuesSection.split('),(').map(entry => {
        // Clean up entry
        entry = entry.replace(/^\(/, '').replace(/\)$/, '');
        
        // Split by comma and handle quoted strings properly
        const parts = [];
        let current = '';
        let inQuotes = false;
        let quoteChar = '';
        let i = 0;
        
        while (i < entry.length) {
            const char = entry[i];
            
            if ((char === "'" || char === '"') && !inQuotes) {
                inQuotes = true;
                quoteChar = char;
                current = '';
                i++;
            } else if (char === quoteChar && inQuotes) {
                inQuotes = false;
                parts.push(current);
                current = '';
                i++;
            } else if (char === ',' && !inQuotes) {
                if (current.trim()) {
                    parts.push(current.trim());
                }
                current = '';
                i++;
            } else {
                current += char;
                i++;
            }
        }
        
        if (current.trim()) {
            parts.push(current.trim());
        }
        
        // Map to power object - handle different field counts
        if (parts.length >= 10) {
            return {
                id: parseInt(parts[0]) || 0,
                section: parts[1].replace(/'/g, ''),
                name: parts[2].replace(/'/g, ''),
                subid: parseInt(parts[3]) || 0,
                cost: parseInt(parts[4]) || 0,
                limited: parseInt(parts[5]) || 0,
                description: parts[6].replace(/'/g, ''),
                amount: parseInt(parts[7]) || 0,
                topsh: parts[8].replace(/'/g, ''),
                group: parts[9].replace(/'/g, '')
            };
        }
        
        return null;
    }).filter(Boolean);

    return powerEntries;
}

// Run if called directly
if (require.main === module) {
    importPowers();
}

module.exports = importPowers;
