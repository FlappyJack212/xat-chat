/**
 * 🎭 COMPLETE MIGRATION SCRIPT
 * Runs all migrations in the correct order to fully migrate from SQL to MongoDB
 * This ensures everything is properly set up for the xat recreation
 */

const mongoose = require('mongoose');
const MySQLToMongoDBMigration = require('./migrate-mysql-to-mongodb');
const UserPowersMigration = require('./migrate-user-powers');

class CompleteMigration {
  constructor() {
    this.mysqlMigration = new MySQLToMongoDBMigration();
    this.userPowersMigration = new UserPowersMigration();
  }

  async connect() {
    try {
      await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ixat', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log('🎭 Connected to MongoDB for complete migration');
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error);
      process.exit(1);
    }
  }

  async disconnect() {
    await mongoose.disconnect();
    console.log('🎭 Disconnected from MongoDB');
  }

  async runCompleteMigration() {
    console.log('🎭 STARTING COMPLETE IXAT MIGRATION');
    console.log('=' .repeat(60));
    console.log('This will migrate ALL data from database.sql to MongoDB');
    console.log('Including: Powers, Users, Rooms, Messages, and User Powers');
    console.log('=' .repeat(60));
    
    try {
      await this.connect();
      
      // Step 1: Run the main MySQL to MongoDB migration
      console.log('\n📦 STEP 1: Migrating core data (Powers, Users, Rooms, Messages)...');
      console.log('-' .repeat(50));
      
      // Parse SQL file
      this.mysqlMigration.parseSQLFile();
      
      // Run core migrations
      await this.mysqlMigration.migratePowers();
      await this.mysqlMigration.migrateUsers();
      await this.mysqlMigration.migrateRooms();
      await this.mysqlMigration.migrateMessages();
      
      console.log('✅ Core data migration completed!');
      
      // Step 2: Migrate user powers (the missing piece!)
      console.log('\n⚡ STEP 2: Migrating user powers...');
      console.log('-' .repeat(50));
      
      // Parse user powers from SQL
      this.userPowersMigration.parseSQLFile();
      
      // Migrate user powers
      await this.userPowersMigration.migrateUserPowers();
      await this.userPowersMigration.updateUserPowerStrings();
      
      console.log('✅ User powers migration completed!');
      
      // Step 3: Create sample data if needed
      console.log('\n🎭 STEP 3: Creating sample data...');
      console.log('-' .repeat(50));
      
      await this.mysqlMigration.createSampleData();
      
      console.log('✅ Sample data creation completed!');
      
      // Step 4: Final verification
      console.log('\n🔍 STEP 4: Final verification...');
      console.log('-' .repeat(50));
      
      const Power = require('../src/server/models/Power');
      const User = require('../src/server/models/User');
      const Room = require('../src/server/models/Room');
      const Message = require('../src/server/models/Message');
      const UserPower = require('../src/server/models/UserPower');
      
      const powerCount = await Power.countDocuments();
      const userCount = await User.countDocuments();
      const roomCount = await Room.countDocuments();
      const messageCount = await Message.countDocuments();
      const userPowerCount = await UserPower.countDocuments();
      
      console.log('📊 FINAL MIGRATION SUMMARY:');
      console.log('=' .repeat(60));
      console.log(`   ⚡ Powers: ${powerCount}`);
      console.log(`   👤 Users: ${userCount}`);
      console.log(`   🏠 Rooms: ${roomCount}`);
      console.log(`   📨 Messages: ${messageCount}`);
      console.log(`   🔗 User Powers: ${userPowerCount}`);
      console.log('=' .repeat(60));
      
      // Show some sample data
      console.log('\n🔍 SAMPLE DATA:');
      console.log('-' .repeat(30));
      
      const samplePowers = await Power.find().limit(5);
      console.log('Sample Powers:');
      samplePowers.forEach(power => {
        console.log(`  - ${power.name} (ID: ${power.id}, Cost: ${power.cost} xats)`);
      });
      
      const sampleUsers = await User.find().limit(3);
      console.log('\nSample Users:');
      sampleUsers.forEach(user => {
        console.log(`  - ${user.nickname} (${user.username}) - ${user.xats} xats`);
      });
      
      const sampleUserPowers = await UserPower.find().populate('user power').limit(3);
      console.log('\nSample User Powers:');
      sampleUserPowers.forEach(userPower => {
        console.log(`  - ${userPower.user.nickname} has ${userPower.power.name} (${userPower.purchasedFor} uses)`);
      });
      
      console.log('\n🎉 COMPLETE MIGRATION SUCCESSFUL!');
      console.log('=' .repeat(60));
      console.log('🚀 Your xat recreation is now fully populated with data from database.sql!');
      console.log('💡 Users can now log in and use their powers in the chat system.');
      console.log('🔑 Default login credentials (if no users were migrated):');
      console.log('   👑 Admin: admin / admin123');
      console.log('   🛡️ Moderator: moderator / mod123');
      console.log('   👤 Member: member / member123');
      console.log('=' .repeat(60));
      
    } catch (error) {
      console.error('❌ Complete migration failed:', error);
      console.error('Stack trace:', error.stack);
    } finally {
      await this.disconnect();
    }
  }
}

// Run the complete migration if this script is executed directly
if (require.main === module) {
  const migration = new CompleteMigration();
  migration.runCompleteMigration();
}

module.exports = CompleteMigration;
