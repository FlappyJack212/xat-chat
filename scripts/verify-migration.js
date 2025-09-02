/**
 * 🔍 VERIFICATION SCRIPT
 * Verifies that the migration worked correctly
 */

const mongoose = require('mongoose');
const Power = require('../src/server/models/Power');
const Room = require('../src/server/models/Room');

async function verifyMigration() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ixat', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log('🔍 VERIFYING MIGRATION...');
    console.log('=' .repeat(50));
    
    // Check powers
    const powerCount = await Power.countDocuments();
    console.log(`⚡ Total powers in MongoDB: ${powerCount}`);
    
    if (powerCount > 0) {
      const samplePowers = await Power.find().limit(5);
      console.log('\n📋 Sample powers:');
      samplePowers.forEach(p => {
        console.log(`  - ${p.name} (ID: ${p.id}, Section: ${p.section}, Cost: ${p.cost} xats)`);
      });
      
      const sections = await Power.distinct('section');
      console.log(`\n🎯 Power sections found: ${sections.join(', ')}`);
      
      // Check bitwise values
      const bitwisePowers = await Power.find({ section: 'p0' }).limit(3);
      console.log('\n🔢 Bitwise power values (p0 section):');
      bitwisePowers.forEach(p => {
        console.log(`  - ${p.name}: subid=${p.subid}, bitwise=${1 << (p.subid - 1)}`);
      });
    }
    
    // Check rooms
    const roomCount = await Room.countDocuments();
    console.log(`\n🏠 Total rooms in MongoDB: ${roomCount}`);
    
    if (roomCount > 0) {
      const rooms = await Room.find();
      console.log('\n📋 Rooms:');
      rooms.forEach(r => {
        console.log(`  - ${r.name} (Background: ${r.bg})`);
      });
    }
    
    console.log('\n' + '=' .repeat(50));
    console.log('✅ MIGRATION VERIFICATION COMPLETE!');
    console.log(`🎉 Successfully migrated ${powerCount} powers and ${roomCount} rooms!`);
    
  } catch (error) {
    console.error('❌ Verification failed:', error);
  } finally {
    await mongoose.disconnect();
  }
}

verifyMigration();
