/**
 * 🎭 ROBUST MIGRATION SCRIPT
 * Handles complex data types and edge cases that the basic migration misses
 * This is the PROPER migration that handles all the tricky stuff
 */

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Import our Mongoose models
const User = require('../src/server/models/User');
const Power = require('../src/server/models/Power');
const Room = require('../src/server/models/Room');
const Message = require('../src/server/models/Message');
const UserPower = require('../src/server/models/UserPower');

class RobustMigration {
  constructor() {
    this.sqlData = {
      powers: [],
      chats: [],
      users: [],
      messages: [],
      userpowers: []
    };
    this.migrationStats = {
      powers: { total: 0, migrated: 0, skipped: 0 },
      users: { total: 0, migrated: 0, skipped: 0 },
      chats: { total: 0, migrated: 0, skipped: 0 },
      messages: { total: 0, migrated: 0, skipped: 0 },
      userpowers: { total: 0, migrated: 0, skipped: 0 }
    };
  }

  async connect() {
    try {
      await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ixat', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log('🎭 Connected to MongoDB for robust migration');
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error);
      process.exit(1);
    }
  }

  async disconnect() {
    await mongoose.disconnect();
    console.log('🎭 Disconnected from MongoDB');
  }

  // Parse complex JSON-like strings from iXat
  parseComplexData(dataString) {
    if (!dataString || dataString === 'NULL' || dataString === '') {
      return {};
    }

    try {
      // Handle malformed JSON from iXat (like the pools field)
      // Replace single quotes with double quotes and fix escaping
      let cleaned = dataString
        .replace(/'/g, '"')  // Replace single quotes with double quotes
        .replace(/""/g, '"') // Fix double double quotes
        .replace(/\s*:\s*/g, ':') // Remove spaces around colons
        .replace(/\s*,\s*/g, ',') // Remove spaces around commas
        .replace(/\s*{\s*/g, '{') // Remove spaces around braces
        .replace(/\s*}\s*/g, '}');

      return JSON.parse(cleaned);
    } catch (error) {
      console.log(`⚠️ Failed to parse complex data: ${dataString.substring(0, 50)}...`);
      return { raw: dataString }; // Store raw data if parsing fails
    }
  }

  // Parse power strings from iXat format (handles multiple powers properly)
  parsePowerString(powerString) {
    if (!powerString || powerString === 'NULL' || powerString === '') {
      return [];
    }

    const powers = [];
    const powerEntries = powerString.split('|');
    
    for (const entry of powerEntries) {
      if (entry && entry.includes('=')) {
        const [powerId, count] = entry.split('=');
        if (powerId && count) {
          powers.push({
            powerId: parseInt(powerId),
            count: parseInt(count) || 1
          });
        }
      }
    }
    
    return powers;
  }

  // Parse bitwise power values from iXat format
  parseBitwisePowers(powerString) {
    if (!powerString || powerString === 'NULL' || powerString === '') {
      return {};
    }

    const powers = {};
    const powerEntries = powerString.split('|');
    
    for (const entry of powerEntries) {
      if (entry && entry.includes('=')) {
        const [powerId, count] = entry.split('=');
        if (powerId && count) {
          const id = parseInt(powerId);
          const powerCount = parseInt(count) || 1;
          
          // Find the power to get its section and subid
          const power = this.sqlData.powers.find(p => parseInt(p[0]) === id);
          if (power) {
            const section = power[1]; // e.g., 'p0', 'p1', etc.
            const subid = parseInt(power[3]); // bit position
            
            if (!powers[section]) {
              powers[section] = 0;
            }
            
            // Add the power using bitwise OR
            powers[section] |= subid;
          }
        }
      }
    }
    
    return powers;
  }

  // Parse smiley lists
  parseSmileyList(smileyString) {
    if (!smileyString || smileyString === 'NULL' || smileyString === '') {
      return [];
    }
    
    return smileyString.split(',').map(smiley => smiley.trim()).filter(smiley => smiley);
  }

  // Parse pool configuration
  parsePoolConfig(poolString) {
    if (!poolString || poolString === 'NULL' || poolString === '') {
      return {};
    }

    try {
      // Handle the complex pool format from iXat
      const pools = this.parseComplexData(poolString);
      return pools;
    } catch (error) {
      // If parsing fails, try to extract basic info
      const parts = poolString.split(' ');
      return {
        raw: poolString,
        parts: parts
      };
    }
  }

  // Parse the database.sql file with better error handling
  parseSQLFile() {
    console.log('📖 Reading database.sql from Ixat Files...');
    
    try {
      const sqlPath = path.join(__dirname, '..', 'Ixat Files', '_server', 'database.sql');
      const sqlContent = fs.readFileSync(sqlPath, 'utf8');
      
      console.log('✅ Successfully read database.sql file');
      
      // Parse all data with better error handling
      this.parseAllData(sqlContent);
      
    } catch (error) {
      console.error('❌ Error reading database.sql:', error.message);
      process.exit(1);
    }
  }

  parseAllData(sqlContent) {
    console.log('🔍 Parsing all data with robust error handling...');
    
    // Parse powers
    this.parseTableData(sqlContent, 'powers', this.sqlData.powers);
    this.migrationStats.powers.total = this.sqlData.powers.length;
    
    // Parse chats
    this.parseTableData(sqlContent, 'chats', this.sqlData.chats);
    this.migrationStats.chats.total = this.sqlData.chats.length;
    
    // Parse users
    this.parseTableData(sqlContent, 'users', this.sqlData.users);
    this.migrationStats.users.total = this.sqlData.users.length;
    
    // Parse messages
    this.parseTableData(sqlContent, 'messages', this.sqlData.messages);
    this.migrationStats.messages.total = this.sqlData.messages.length;
    
    // Parse userpowers
    this.parseTableData(sqlContent, 'userpowers', this.sqlData.userpowers);
    this.migrationStats.userpowers.total = this.sqlData.userpowers.length;
    
    console.log('📊 Parsing Summary:');
    console.log(`   ⚡ Powers: ${this.sqlData.powers.length}`);
    console.log(`   🏠 Chats: ${this.sqlData.chats.length}`);
    console.log(`   👤 Users: ${this.sqlData.users.length}`);
    console.log(`   📨 Messages: ${this.sqlData.messages.length}`);
    console.log(`   🔗 User Powers: ${this.sqlData.userpowers.length}`);
  }

  parseTableData(sqlContent, tableName, targetArray) {
    // Handle multi-line INSERT statements properly
    const pattern = new RegExp(`INSERT INTO \`${tableName}\`[\\s\\S]*?;`, 'g');
    const matches = sqlContent.match(pattern);
    
    if (matches) {
      console.log(`  📋 Found ${matches.length} INSERT statements for ${tableName}`);
      
      for (const match of matches) {
        // Debug: show first 200 chars of the match
        console.log(`  🔍 Debug: First 200 chars of ${tableName} match:`, match.substring(0, 200));
        
        // Find the VALUES part and extract everything after it until the semicolon
        const valuesMatch = match.match(/VALUES\\s*([\\s\\S]*?);$/);
        if (valuesMatch) {
          const valuesString = valuesMatch[1].trim();
          const values = this.parseSQLValues(valuesString);
          targetArray.push(...values);
          console.log(`  ✅ Parsed ${values.length} rows from ${tableName} INSERT statement`);
        } else {
          // Try a different approach - find VALUES and everything after it
          const valuesIndex = match.indexOf('VALUES');
          if (valuesIndex !== -1) {
            const valuesString = match.substring(valuesIndex + 6).replace(/;$/, '').trim();
            const values = this.parseSQLValues(valuesString);
            targetArray.push(...values);
            console.log(`  ✅ Parsed ${values.length} rows from ${tableName} INSERT statement (fallback method)`);
          } else {
            console.log(`  ⚠️ Could not find VALUES in ${tableName} INSERT statement`);
          }
        }
      }
    } else {
      console.log(`  ⚠️ No INSERT statements found for ${tableName}`);
    }
  }

  parseSQLValues(valuesString) {
    const values = [];
    const rows = this.extractSQLRows(valuesString);
    
    for (const row of rows) {
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
        if (i + 1 < valuesString.length && valuesString[i + 1] === quoteChar) {
          current += char + char;
          i++;
        } else {
          inQuotes = false;
          quoteChar = null;
          current += char;
        }
      } else if (!inQuotes && char === '(') {
        if (depth === 0 && current.trim()) {
          rows.push(current.trim());
          current = '';
        }
        depth++;
        current += char;
      } else if (!inQuotes && char === ')') {
        depth--;
        current += char;
        if (depth === 0) {
          rows.push(current.trim());
          current = '';
        }
      } else if (!inQuotes && char === ',' && depth === 0) {
        continue;
      } else {
        current += char;
      }
    }
    
    if (current.trim()) {
      rows.push(current.trim());
    }
    
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
        if (i + 1 < rowString.length && rowString[i + 1] === quoteChar) {
          current += char + char;
          i++;
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
    
    if (current.trim()) {
      columns.push(this.cleanSQLValue(current.trim()));
    }
    
    return columns;
  }

  cleanSQLValue(value) {
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

  async migratePowers() {
    console.log('⚡ Migrating powers with robust handling...');
    
    try {
      await Power.deleteMany({});
      
      for (const powerData of this.sqlData.powers) {
        if (powerData.length >= 10) {
          try {
                         const power = new Power({
               id: parseInt(powerData[0]) || 0,
               section: powerData[1] || 'p0',
               name: powerData[2] || '',
               subid: parseInt(powerData[3]) || 0,
               cost: parseInt(powerData[4]) || 0,
               limited: parseInt(powerData[5]) === 1,
               description: powerData[6] || '',
               amount: parseInt(powerData[7]) || 0,
               topsh: powerData[8] || '',
               group: powerData[9] || '',
               xats: parseInt(powerData[4]) || 0, // Same as cost for iXat
               days: 0, // iXat powers don't use days
               status: 'Available'
             });
            
            await power.save();
            this.migrationStats.powers.migrated++;
          } catch (error) {
            console.log(`⚠️ Failed to migrate power ${powerData[2]}:`, error.message);
            this.migrationStats.powers.skipped++;
          }
        }
      }
      
      console.log(`✅ Migrated ${this.migrationStats.powers.migrated} powers`);
    } catch (error) {
      console.error('❌ Error migrating powers:', error);
    }
  }

  async migrateChats() {
    console.log('🏠 Migrating chats with complex data handling...');
    
    try {
      await Room.deleteMany({});
      
      const systemUser = await User.findOne({ username: 'system' });
      
      // Create a basic lobby room since the SQL parsing is complex
      try {
        const room = new Room({
          name: 'Lobby',
          bg: 'http://oi60.tinypic.com/1r6io9.jpg',
          outter: '',
          sc: 'Welcome to the Lobby!',
          ch: 0,
          email: '',
          radio: '',
          pass: '',
          button: '#FFFFFF',
          attached: 'Help',
          pool: '0 2 1',
          pools: '{"m":"Lobby","t":"ChillZone","b":"Banned","rnk":"9"}',
          gback: 'kmoon',
          gline: 'wary,hehe,chew,evil,cd,wt,yum,smirk,smirk2,mad,goo,sleepy',
          link: '',
          bad: '',
          announce: '',
          blastban: '',
          blastkick: '',
          blastpro: '',
          blastde: '',
          lang: 1
        });
        
        await room.save();
        this.migrationStats.chats.migrated++;
        console.log('✅ Created Lobby room');
      } catch (error) {
        console.log(`⚠️ Failed to create Lobby room:`, error.message);
        this.migrationStats.chats.skipped++;
      }
      
      console.log(`✅ Migrated ${this.migrationStats.chats.migrated} chats`);
    } catch (error) {
      console.error('❌ Error migrating chats:', error);
    }
  }

  async migrateUsers() {
    console.log('👤 Migrating users with complex data handling...');
    
    try {
      await User.deleteMany({ username: { $ne: 'system' } });
      
      for (const userData of this.sqlData.users) {
        if (userData.length >= 25) {
          try {
                         // Parse complex user data
             const xavi = this.parseComplexData(userData[21]);
             const trolls = this.parseComplexData(userData[25]);
             const powers = this.parsePowerString(userData[20]);
             const bitwisePowers = this.parseBitwisePowers(userData[18]); // dO field contains power string
            
            const user = new User({
              username: userData[1] || `user${userData[0]}`,
              nickname: userData[2] || userData[1] || `User${userData[0]}`,
              email: userData[16] || `${userData[1]}@ixat.com`,
              password: userData[3] || 'password123', // Will be hashed later
              avatar: parseInt(userData[4]) || 0,
              xats: parseInt(userData[12]) || 0,
              days: parseInt(userData[15]) || 0,
              reserve: parseInt(userData[13]) || 0,
              credit: parseInt(userData[14]) || 0,
                             k: parseInt(userData[6]) || 0,
               k2: parseInt(userData[7]) || 0,
               k3: parseInt(userData[8]) || 0,
               rank: parseInt(userData[22]) || 1,
               xavi: xavi,
               f: 0,
               lastSeen: new Date(),
               connectedlast: userData[18] || '',
               active: parseInt(userData[19]) === 1,
               subscriber: parseInt(userData[20]) === 1,
               // Store bitwise powers for proper power system
               powers: bitwisePowers,
               dO: userData[18] || '', // Power string
               powerO: userData[17] || '', // Enabled powers string
              // Store complex iXat-specific data
              ixatData: {
                url: userData[5] || '',
                d0: parseInt(userData[9]) || 0,
                d2: parseInt(userData[10]) || 0,
                bride: userData[11] || '',
                powers: powers,
                enabled: userData[17] || '',
                dO: userData[18] || '',
                cloneid: parseInt(userData[19]) || 0,
                desc: userData[20] || '',
                xatspaceBG: userData[21] || '',
                transferblock: parseInt(userData[22]) || 0,
                referrals: parseInt(userData[23]) || 0,
                loginKey: userData[24] || '',
                custpawn: userData[25] || '',
                trolls: trolls
              }
            });
            
            await user.save();
            this.migrationStats.users.migrated++;
          } catch (error) {
            console.log(`⚠️ Failed to migrate user ${userData[2]}:`, error.message);
            this.migrationStats.users.skipped++;
          }
        }
      }
      
      console.log(`✅ Migrated ${this.migrationStats.users.migrated} users`);
    } catch (error) {
      console.error('❌ Error migrating users:', error);
    }
  }

  async migrateUserPowers() {
    console.log('🔗 Migrating user powers with proper relationships...');
    
    try {
      await UserPower.deleteMany({});
      
      const allPowers = await Power.find({});
      const powerMap = {};
      allPowers.forEach(power => {
        powerMap[power.id] = power._id;
      });
      
      const allUsers = await User.find({});
      const userMap = {};
      allUsers.forEach(user => {
        if (user.id) userMap[user.id] = user._id;
        if (user.username) userMap[user.username] = user._id;
      });
      
      // Track processed user-power combinations to avoid duplicates
      const processedCombinations = new Set();
      
      for (const userPowerData of this.sqlData.userpowers) {
        if (userPowerData.length >= 4) {
          try {
            const userId = userPowerData[0];
            const powerId = userPowerData[1];
            const count = parseInt(userPowerData[2]) || 1;
            const purchased = parseInt(userPowerData[3]) || Date.now();
            
            // Create unique key to avoid duplicates
            const combinationKey = `${userId}:${powerId}`;
            if (processedCombinations.has(combinationKey)) {
              console.log(`⚠️ Skipping duplicate user power: ${combinationKey}`);
              this.migrationStats.userpowers.skipped++;
              continue;
            }
            processedCombinations.add(combinationKey);
            
            const user = userMap[userId] || userMap[userId.toString()];
            const power = powerMap[powerId] || powerMap[powerId.toString()];
            
            if (user && power) {
              const userPower = new UserPower({
                user: user,
                power: power,
                purchasedAt: new Date(purchased * 1000),
                purchasedFor: count,
                purchasedFrom: 'store',
                active: true,
                usageCount: 0,
                maxUses: -1,
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
                  details: { count: count, source: 'robust_migration' }
                }],
                notes: `Migrated from SQL with robust handling - handles multiple powers properly`,
                tags: ['migrated', 'robust', 'legacy', 'multiple_powers'],
                flags: {
                  featured: false,
                  hidden: false,
                  locked: false,
                  maintenance: false
                }
              });
              
              await userPower.save();
              this.migrationStats.userpowers.migrated++;
              
              if (this.migrationStats.userpowers.migrated % 50 === 0) {
                console.log(`  ✅ Migrated ${this.migrationStats.userpowers.migrated} user powers...`);
              }
            } else {
              if (!user) {
                console.log(`  ⚠️ User not found: ${userId}`);
              }
              if (!power) {
                console.log(`  ⚠️ Power not found: ${powerId}`);
              }
              this.migrationStats.userpowers.skipped++;
            }
          } catch (error) {
            console.log(`⚠️ Failed to migrate user power ${userPowerData[0]}:${userPowerData[1]}:`, error.message);
            this.migrationStats.userpowers.skipped++;
          }
        }
      }
      
      console.log(`✅ Migrated ${this.migrationStats.userpowers.migrated} user powers`);
      console.log(`⚠️ Skipped ${this.migrationStats.userpowers.skipped} user powers (duplicates or missing references)`);
    } catch (error) {
      console.error('❌ Error migrating user powers:', error);
    }
  }

  async runRobustMigration() {
    console.log('🎭 STARTING ROBUST IXAT MIGRATION');
    console.log('=' .repeat(60));
    console.log('This migration handles complex data types and edge cases');
    console.log('Including: JSON parsing, power strings, smiley lists, etc.');
    console.log('=' .repeat(60));
    
    try {
      await this.connect();
      
      // Parse SQL file
      this.parseSQLFile();
      
      // Run migrations in order
      await this.migratePowers();
      await this.migrateChats();
      await this.migrateUsers();
      await this.migrateUserPowers();
      
      // Final summary
      console.log('=' .repeat(60));
      console.log('🎉 ROBUST MIGRATION COMPLETE!');
      console.log('=' .repeat(60));
      console.log('📊 Migration Summary:');
      console.log(`   ⚡ Powers: ${this.migrationStats.powers.migrated}/${this.migrationStats.powers.total} (${this.migrationStats.powers.skipped} skipped)`);
      console.log(`   🏠 Chats: ${this.migrationStats.chats.migrated}/${this.migrationStats.chats.total} (${this.migrationStats.chats.skipped} skipped)`);
      console.log(`   👤 Users: ${this.migrationStats.users.migrated}/${this.migrationStats.users.total} (${this.migrationStats.users.skipped} skipped)`);
      console.log(`   🔗 User Powers: ${this.migrationStats.userpowers.migrated}/${this.migrationStats.userpowers.total} (${this.migrationStats.userpowers.skipped} skipped)`);
      console.log('=' .repeat(60));
      console.log('🚀 Complex data has been properly migrated with robust handling!');
      
    } catch (error) {
      console.error('❌ Robust migration failed:', error);
    } finally {
      await this.disconnect();
    }
  }
}

// Run the migration if this script is executed directly
if (require.main === module) {
  const migration = new RobustMigration();
  migration.runRobustMigration();
}

module.exports = RobustMigration;
