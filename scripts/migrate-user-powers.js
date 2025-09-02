/**
 * 🎭 USER POWERS MIGRATION SCRIPT
 * Migrates user powers from SQL userpowers table to MongoDB UserPower collection
 * This is the missing piece for proper power system functionality
 */

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Import our Mongoose models
const User = require('../src/server/models/User');
const Power = require('../src/server/models/Power');
const UserPower = require('../src/server/models/UserPower');

class UserPowersMigration {
  constructor() {
    this.sqlData = {
      userpowers: []
    };
  }

  async connect() {
    try {
      await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ixat', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log('🎭 Connected to MongoDB for user powers migration');
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error);
      process.exit(1);
    }
  }

  async disconnect() {
    await mongoose.disconnect();
    console.log('🎭 Disconnected from MongoDB');
  }

  // Parse the database.sql file to extract userpowers data
  parseSQLFile() {
    console.log('📖 Reading database.sql from Ixat Files...');
    
    try {
      const sqlPath = path.join(__dirname, '..', 'Ixat Files', '_server', 'database.sql');
      const sqlContent = fs.readFileSync(sqlPath, 'utf8');
      
      console.log('✅ Successfully read database.sql file');
      
      // Parse userpowers INSERT statements
      this.parseUserPowersStatements(sqlContent);
      
    } catch (error) {
      console.error('❌ Error reading database.sql:', error.message);
      console.log('📁 Looking for database.sql in Ixat Files folder...');
      
      // Try alternative paths
      const alternativePaths = [
        path.join(__dirname, '..', 'Ixat Files', 'database.sql'),
        path.join(__dirname, '..', 'database.sql'),
        path.join(__dirname, '..', 'Ixat Files', '_server', 'database.sql')
      ];
      
      for (const altPath of alternativePaths) {
        try {
          if (fs.existsSync(altPath)) {
            console.log(`✅ Found database.sql at: ${altPath}`);
            const sqlContent = fs.readFileSync(altPath, 'utf8');
            this.parseUserPowersStatements(sqlContent);
            return;
          }
        } catch (e) {
          // Continue to next path
        }
      }
      
      console.error('❌ Could not find database.sql file');
      process.exit(1);
    }
  }

  parseUserPowersStatements(sqlContent) {
    console.log('🔍 Parsing userpowers INSERT statements...');
    
    // Parse userpowers INSERT statements (handle multi-line)
    const userpowersMatches = sqlContent.match(/INSERT INTO `userpowers`[\s\S]*?;/g);
    if (userpowersMatches) {
      for (const match of userpowersMatches) {
        const valuesMatch = match.match(/VALUES\s*([\s\S]*)/);
        if (valuesMatch) {
          // Clean up the values string - remove the final semicolon
          const valuesString = valuesMatch[1].replace(/;$/, '').trim();
          const values = this.parseSQLValues(valuesString);
          this.sqlData.userpowers.push(...values);
        }
      }
      console.log(`✅ Parsed ${this.sqlData.userpowers.length} user powers`);
    } else {
      console.log('⚠️ No userpowers INSERT statements found in database.sql');
    }
  }

  parseSQLValues(valuesString) {
    const values = [];
    
    // More robust parsing - find () pairs while respecting quotes
    const rows = this.extractSQLRows(valuesString);
    
    for (const row of rows) {
      // Split by comma, but handle quoted strings
      const columns = this.splitSQLColumns(row);
      values.push(columns);
    }
    
    return values;
  }

  extractSQLRows(valuesString) {
    const rows = [];
    let current = '';
    let depth = 0;
    let inQuotes = false;
    let quoteChar = null;
    
    for (let i = 0; i < valuesString.length; i++) {
      const char = valuesString[i];
      
      if (!inQuotes && (char === "'" || char === '"')) {
        inQuotes = true;
        quoteChar = char;
        current += char;
      } else if (inQuotes && char === quoteChar) {
        // Check for escaped quote
        if (i + 1 < valuesString.length && valuesString[i + 1] === quoteChar) {
          current += char + char;
          i++; // Skip next char
        } else {
          inQuotes = false;
          quoteChar = null;
          current += char;
        }
      } else if (!inQuotes && char === '(') {
        if (depth === 0 && current.trim()) {
          // Start of new row, save previous if exists
          rows.push(current.trim());
          current = '';
        }
        depth++;
        current += char;
      } else if (!inQuotes && char === ')') {
        depth--;
        current += char;
        if (depth === 0) {
          // End of row
          rows.push(current.trim());
          current = '';
        }
      } else if (!inQuotes && char === ',' && depth === 0) {
        // Skip commas between rows
        continue;
      } else {
        current += char;
      }
    }
    
    // Add any remaining content
    if (current.trim()) {
      rows.push(current.trim());
    }
    
    // Clean up the rows - remove outer parentheses
    return rows.map(row => row.replace(/^\(/, '').replace(/\)$/, ''));
  }

  splitSQLColumns(rowString) {
    const columns = [];
    let current = '';
    let inQuotes = false;
    let quoteChar = null;
    
    for (let i = 0; i < rowString.length; i++) {
      const char = rowString[i];
      
      if (!inQuotes && (char === "'" || char === '"')) {
        inQuotes = true;
        quoteChar = char;
        current += char;
      } else if (inQuotes && char === quoteChar) {
        // Check for escaped quote
        if (i + 1 < rowString.length && rowString[i + 1] === quoteChar) {
          current += char + char;
          i++; // Skip next char
        } else {
          inQuotes = false;
          quoteChar = null;
          current += char;
        }
      } else if (!inQuotes && char === ',') {
        columns.push(this.cleanSQLValue(current.trim()));
        current = '';
      } else {
        current += char;
      }
    }
    
    // Add the last column
    if (current.trim()) {
      columns.push(this.cleanSQLValue(current.trim()));
    }
    
    return columns;
  }

  cleanSQLValue(value) {
    // Remove quotes and handle NULL
    if (value === 'NULL' || value === 'null') {
      return null;
    }
    
    if (value.startsWith("'") && value.endsWith("'")) {
      return value.slice(1, -1).replace(/''/g, "'");
    }
    
    if (value.startsWith('"') && value.endsWith('"')) {
      return value.slice(1, -1).replace(/""/g, '"');
    }
    
    return value;
  }

  async migrateUserPowers() {
    console.log('⚡ Migrating user powers...');
    
    try {
      // Clear existing user powers
      await UserPower.deleteMany({});
      console.log('✅ Cleared existing user powers');
      
      // Get all powers for mapping
      const allPowers = await Power.find({});
      const powerMap = {};
      allPowers.forEach(power => {
        powerMap[power.id] = power._id;
      });
      
      console.log(`✅ Loaded ${allPowers.length} powers for mapping`);
      
      // Get all users for mapping
      const allUsers = await User.find({});
      const userMap = {};
      allUsers.forEach(user => {
        // Map by both id and username for flexibility
        if (user.id) userMap[user.id] = user._id;
        if (user.username) userMap[user.username] = user._id;
      });
      
      console.log(`✅ Loaded ${allUsers.length} users for mapping`);
      
      let migratedCount = 0;
      let skippedCount = 0;
      
      // Create user powers from SQL data
      for (const userPowerData of this.sqlData.userpowers) {
        if (userPowerData.length >= 4) {
          const userId = userPowerData[0];
          const powerId = userPowerData[1];
          const count = parseInt(userPowerData[2]) || 1;
          const purchased = parseInt(userPowerData[3]) || Date.now();
          
          // Find the user and power
          const user = userMap[userId] || userMap[userId.toString()];
          const power = powerMap[powerId] || powerMap[powerId.toString()];
          
          if (user && power) {
            try {
              const userPower = new UserPower({
                user: user,
                power: power,
                purchasedAt: new Date(purchased * 1000), // Convert from Unix timestamp
                purchasedFor: count,
                purchasedFrom: 'store',
                active: true,
                usageCount: 0,
                maxUses: -1, // Unlimited by default
                settings: {},
                cooldown: {
                  lastActivation: null,
                  duration: 0
                },
                shareable: false,
                sharedWith: [],
                history: [{
                  action: 'purchased',
                  timestamp: new Date(purchased * 1000),
                  details: { count: count, source: 'migration' }
                }],
                notes: `Migrated from SQL userpowers table`,
                tags: ['migrated', 'legacy'],
                flags: {
                  featured: false,
                  hidden: false,
                  locked: false,
                  maintenance: false
                }
              });
              
              await userPower.save();
              migratedCount++;
              
              if (migratedCount % 100 === 0) {
                console.log(`  ✅ Migrated ${migratedCount} user powers...`);
              }
            } catch (error) {
              console.log(`  ⚠️ Failed to migrate user power ${userId}:${powerId}:`, error.message);
              skippedCount++;
            }
          } else {
            if (!user) {
              console.log(`  ⚠️ User not found: ${userId}`);
            }
            if (!power) {
              console.log(`  ⚠️ Power not found: ${powerId}`);
            }
            skippedCount++;
          }
        }
      }
      
      console.log(`✅ Migrated ${migratedCount} user powers`);
      console.log(`⚠️ Skipped ${skippedCount} user powers (missing user/power)`);
      
    } catch (error) {
      console.error('❌ Error migrating user powers:', error);
    }
  }

  async updateUserPowerStrings() {
    console.log('🔄 Updating user power strings (dO, powerO)...');
    
    try {
      const users = await User.find({});
      
      for (const user of users) {
        // Get all user powers for this user
        const userPowers = await UserPower.find({ user: user._id, active: true })
          .populate('power');
        
        // Build power strings in the format expected by the client
        let dO = '';
        let powerO = '';
        const powers = {};
        
        userPowers.forEach(userPower => {
          const power = userPower.power;
          if (power) {
            // Initialize section if not exists
            if (!powers[power.section]) {
              powers[power.section] = 0;
            }
            
            // Add power value using bitwise operations
            powers[power.section] += power.subid;
            
            // Build power strings (matching Ixat Files format)
            const powerStr = `${power.id}=${userPower.purchasedFor > 1 ? (userPower.purchasedFor - 1) : 1}|`;
            dO += powerStr;
            
            if (userPower.purchasedFor > 1) {
              powerO += powerStr;
            }
          }
        });
        
        // Update user with power information
        user.powers = powers;
        user.dO = dO;
        user.powerO = powerO;
        
        await user.save();
      }
      
      console.log(`✅ Updated power strings for ${users.length} users`);
      
    } catch (error) {
      console.error('❌ Error updating user power strings:', error);
    }
  }

  async runMigration() {
    console.log('🎭 Starting User Powers Migration...');
    console.log('=' .repeat(50));
    
    try {
      await this.connect();
      
      // Parse the SQL file first
      this.parseSQLFile();
      
      if (this.sqlData.userpowers.length === 0) {
        console.log('⚠️ No user powers found in database.sql');
        console.log('💡 This might be normal if the database.sql doesn\'t contain user power data');
        return;
      }
      
      // Run migrations in order
      await this.migrateUserPowers();
      await this.updateUserPowerStrings();
      
      console.log('=' .repeat(50));
      console.log('🎉 USER POWERS MIGRATION COMPLETE!');
      console.log('=' .repeat(50));
      console.log('📊 Migration Summary:');
      console.log(`   ⚡ User Powers: ${this.sqlData.userpowers.length} parsed`);
      console.log(`   👤 Users with powers: ${await UserPower.distinct('user').length}`);
      console.log(`   💎 Unique powers assigned: ${await UserPower.distinct('power').length}`);
      console.log('');
      console.log('🚀 User powers are now properly migrated to MongoDB!');
      console.log('💡 Users can now use their powers in the chat system.');
      
    } catch (error) {
      console.error('❌ Migration failed:', error);
    } finally {
      await this.disconnect();
    }
  }
}

// Run the migration if this script is executed directly
if (require.main === module) {
  const migration = new UserPowersMigration();
  migration.runMigration();
}

module.exports = UserPowersMigration;
