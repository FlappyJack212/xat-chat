const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Power = require('../src/server/models/Power');
const User = require('../src/server/models/User');
const Room = require('../src/server/models/Room');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ixat_chat', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Extract powers from database.sql
function extractPowersFromSQL() {
  const sqlPath = path.join(__dirname, '../Ixat Files/_server/database.sql');
  const sqlContent = fs.readFileSync(sqlPath, 'utf8');
  
  // Find the powers INSERT statement
  const powersMatch = sqlContent.match(/INSERT INTO `powers`[^;]+;/);
  if (!powersMatch) {
    throw new Error('Could not find powers INSERT statement in database.sql');
  }
  
  const powersInsert = powersMatch[0];
  
  // Extract all power entries using regex
  const powerEntries = powersInsert.match(/\([^)]+\)/g);
  
  const powers = [];
  
  powerEntries.forEach(entry => {
    // Remove the outer parentheses and split by comma
    const cleanEntry = entry.slice(1, -1);
    const values = cleanEntry.split(',').map(v => v.trim().replace(/^'|'$/g, ''));
    
    if (values.length >= 10) {
      const power = {
        id: parseInt(values[0]),
        section: values[1],
        name: values[2],
        subid: parseInt(values[3]),
        cost: parseInt(values[4]),
        limited: parseInt(values[5]) === 1,
        description: values[6],
        amount: parseInt(values[7]) || 0,
        topsh: values[8],
        group: values[9]
      };
      
      // Skip placeholder powers (like "31", "63", "95", etc.)
      if (!isNaN(power.id) && power.name && power.name !== '' && !power.name.match(/^\d+$/)) {
        powers.push(power);
      }
    }
  });
  
  return powers;
}

async function completeIxatImport() {
  try {
    console.log('🎭 Starting COMPLETE iXat data import...');
    
    // Extract all powers from database.sql
    console.log('📖 Extracting powers from database.sql...');
    const allPowers = extractPowersFromSQL();
    console.log(`✅ Extracted ${allPowers.length} powers from database.sql`);
    
    // Clear existing data
    await Power.deleteMany({});
    console.log('✅ Cleared existing powers');
    
    // Import all powers
    console.log('📦 Importing all powers...');
    let importedCount = 0;
    
    for (const powerData of allPowers) {
      try {
        const power = new Power({
          id: powerData.id,
          name: powerData.name,
          description: powerData.description,
          cost: powerData.cost,
          subid: powerData.subid,
          section: powerData.section,
          amount: powerData.amount,
          topsh: powerData.topsh,
          group: powerData.group,
          limited: powerData.limited
        });
        
        await power.save();
        importedCount++;
        
        if (importedCount % 20 === 0) {
          console.log(`  ✅ Imported ${importedCount}/${allPowers.length} powers...`);
        }
      } catch (error) {
        console.log(`  ❌ Failed to import power ${powerData.name}:`, error.message);
      }
    }
    
    console.log(`🎉 Complete iXat import finished!`);
    console.log(`📊 Summary:`);
    console.log(`   💎 Powers: ${await Power.countDocuments()}`);
    console.log(`   🏠 Rooms: ${await Room.countDocuments()}`);
    console.log(`   👥 Users: ${await User.countDocuments()}`);
    
    // Show some sample powers
    const samplePowers = await Power.find().limit(10);
    console.log('\n🔍 Sample powers imported:');
    samplePowers.forEach(power => {
      console.log(`  - ${power.name} (ID: ${power.id}, Cost: ${power.cost} xats, Section: ${power.section})`);
    });
    
  } catch (error) {
    console.error('❌ Import failed:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Run the complete import
completeIxatImport();
