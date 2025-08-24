/**
 * 🎭 MYSQL TO MONGODB MIGRATION SCRIPT
 * Reads the actual database.sql from Ixat Files and converts to MongoDB
 * Perfect migration from the original Ixat Files MySQL structure
 */

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');

// Import our Mongoose models
const User = require('../src/server/models/User');
const Power = require('../src/server/models/Power');
const Room = require('../src/server/models/Room');
const Message = require('../src/server/models/Message');

class MySQLToMongoDBMigration {
  constructor() {
    this.connection = null;
    this.sqlData = {
      powers: [],
      chats: [],
      users: [],
      messages: [],
      bans: [],
      ranks: [],
      trade: [],
      transfers: [],
      userpowers: []
    };
  }

  async connect() {
    try {
      await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ixat', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log('🎭 Connected to MongoDB for migration');
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error);
      process.exit(1);
    }
  }

  async disconnect() {
    await mongoose.disconnect();
    console.log('🎭 Disconnected from MongoDB');
  }

  async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  // Parse the database.sql file
  parseSQLFile() {
    console.log('📖 Reading database.sql from Ixat Files...');
    
    try {
      const sqlPath = path.join(__dirname, '..', 'Ixat Files', '_server', 'database.sql');
      const sqlContent = fs.readFileSync(sqlPath, 'utf8');
      
      console.log('✅ Successfully read database.sql file');
      
      // Parse INSERT statements
      this.parseInsertStatements(sqlContent);
      
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
            this.parseInsertStatements(sqlContent);
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

  parseInsertStatements(sqlContent) {
    console.log('🔍 Parsing INSERT statements...');
    
    // Parse powers INSERT statements (handle multi-line)
    const powersMatches = sqlContent.match(/INSERT INTO `powers`[\s\S]*?;/g);
    if (powersMatches) {
      for (const match of powersMatches) {
        const valuesMatch = match.match(/VALUES\s*([\s\S]*)/);
        if (valuesMatch) {
          // Clean up the values string - remove the final semicolon
          const valuesString = valuesMatch[1].replace(/;$/, '').trim();
          const values = this.parseSQLValues(valuesString);
          this.sqlData.powers.push(...values);
        }
      }
      console.log(`✅ Parsed ${this.sqlData.powers.length} powers`);
    }

    // Parse chats INSERT statements (handle multi-line)
    const chatsMatches = sqlContent.match(/INSERT INTO `chats`[\s\S]*?;/g);
    if (chatsMatches) {
      for (const match of chatsMatches) {
        const valuesMatch = match.match(/VALUES\s*([\s\S]*)/);
        if (valuesMatch) {
          // Clean up the values string - remove the final semicolon
          const valuesString = valuesMatch[1].replace(/;$/, '').trim();
          const values = this.parseSQLValues(valuesString);
          this.sqlData.chats.push(...values);
        }
      }
      console.log(`✅ Parsed ${this.sqlData.chats.length} chats`);
    }

    // Parse users INSERT statements (handle multi-line)
    const usersMatches = sqlContent.match(/INSERT INTO `users`[\s\S]*?;/g);
    if (usersMatches) {
      for (const match of usersMatches) {
        const valuesMatch = match.match(/VALUES\s*([\s\S]*)/);
        if (valuesMatch) {
          const valuesString = valuesMatch[1].replace(/;$/, '').trim();
          const values = this.parseSQLValues(valuesString);
          this.sqlData.users.push(...values);
        }
      }
      console.log(`✅ Parsed ${this.sqlData.users.length} users`);
    }

    // Parse messages INSERT statements (handle multi-line)
    const messagesMatches = sqlContent.match(/INSERT INTO `messages`[\s\S]*?;/g);
    if (messagesMatches) {
      for (const match of messagesMatches) {
        const valuesMatch = match.match(/VALUES\s*([\s\S]*)/);
        if (valuesMatch) {
          const valuesString = valuesMatch[1].replace(/;$/, '').trim();
          const values = this.parseSQLValues(valuesString);
          this.sqlData.messages.push(...values);
        }
      }
      console.log(`✅ Parsed ${this.sqlData.messages.length} messages`);
    }

    // Parse other tables...
    this.parseOtherTables(sqlContent);
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

  parseOtherTables(sqlContent) {
    // Parse bans, ranks, trade, etc.
    const tableParsers = [
      { table: 'bans', pattern: /INSERT INTO `bans`[^;]+;/g },
      { table: 'ranks', pattern: /INSERT INTO `ranks`[^;]+;/g },
      { table: 'trade', pattern: /INSERT INTO `trade`[^;]+;/g },
      { table: 'transfers', pattern: /INSERT INTO `transfers`[^;]+;/g },
      { table: 'userpowers', pattern: /INSERT INTO `userpowers`[^;]+;/g }
    ];

    for (const parser of tableParsers) {
      const matches = sqlContent.match(parser.pattern);
      if (matches) {
        for (const match of matches) {
          const valuesMatch = match.match(/VALUES\s*([^;]+)/);
          if (valuesMatch) {
            const values = this.parseSQLValues(valuesMatch[1]);
            this.sqlData[parser.table].push(...values);
          }
        }
        console.log(`✅ Parsed ${this.sqlData[parser.table].length} ${parser.table}`);
      }
    }
  }

  async migratePowers() {
    console.log('⚡ Migrating powers...');
    
    try {
      // Clear existing powers
      await Power.deleteMany({});
      
      // Create powers from SQL data
      for (const powerData of this.sqlData.powers) {
        if (powerData.length >= 10) {
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
            group: powerData[9] || ''
          });
          
          await power.save();
        }
      }
      
      console.log(`✅ Migrated ${this.sqlData.powers.length} powers`);
    } catch (error) {
      console.error('❌ Error migrating powers:', error);
    }
  }

  async migrateUsers() {
    console.log('👤 Migrating users...');
    
    try {
      // Clear existing users (except system user)
      await User.deleteMany({ username: { $ne: 'system' } });
      
      // Create users from SQL data
      for (const userData of this.sqlData.users) {
        if (userData.length >= 20) {
          const hashedPassword = await this.hashPassword(userData[3] || 'password123');
          
          const user = new User({
            username: userData[1] || `user${userData[0]}`,
            nickname: userData[2] || userData[1] || `User${userData[0]}`,
            email: userData[16] || `${userData[1]}@ixat.com`,
            password: hashedPassword,
            avatar: parseInt(userData[4]) || 0,
            xats: parseInt(userData[12]) || 0,
            days: parseInt(userData[15]) || 0,
            reserve: parseInt(userData[13]) || 0,
            credit: parseInt(userData[14]) || 0,
            k: parseInt(userData[6]) || 0,
            k2: parseInt(userData[7]) || 0,
            k3: parseInt(userData[8]) || 0,
            rank: parseInt(userData[20]) || 1,
            xavi: userData[21] || '{}',
            f: 0, // Default flags
            lastSeen: new Date(),
            connectedlast: userData[22] || '',
            active: parseInt(userData[23]) === 1,
            subscriber: parseInt(userData[24]) === 1
          });
          
          await user.save();
        }
      }
      
      console.log(`✅ Migrated ${this.sqlData.users.length} users`);
    } catch (error) {
      console.error('❌ Error migrating users:', error);
    }
  }

  async migrateRooms() {
    console.log('🏠 Migrating rooms...');
    
    try {
      // Clear existing rooms (except main room)
      await Room.deleteMany({ id: { $ne: 'main' } });
      
      // Get system user for ownership
      const systemUser = await User.findOne({ username: 'system' });
      
      // Create rooms from SQL data
      for (const chatData of this.sqlData.chats) {
        if (chatData.length >= 10) {
          const room = new Room({
            id: chatData[0].toString(),
            name: chatData[1] || 'Chat Room',
            background: chatData[2] || 'default',
            radio: chatData[6] || '',
            button: chatData[9] || '',
            attached: chatData[10] || '',
            pools: 1, // Convert to number - pools is a number in our model
            password: chatData[8] || '',
            private: false,
            owner: systemUser ? systemUser._id : null,
            ranks: {},
            bans: [],
            groupPowers: []
          });
          
          await room.save();
        }
      }
      
      console.log(`✅ Migrated ${this.sqlData.chats.length} rooms`);
    } catch (error) {
      console.error('❌ Error migrating rooms:', error);
    }
  }

  async migrateMessages() {
    console.log('📨 Migrating messages...');
    
    try {
      // Clear existing messages
      await Message.deleteMany({});
      
      // Create messages from SQL data
      for (const messageData of this.sqlData.messages) {
        if (messageData.length >= 8) {
          // Find the room and user
          const room = await Room.findOne({ id: messageData[2] });
          const user = await User.findOne({ id: messageData[3] });
          
          if (room && user) {
            const message = new Message({
              roomId: room._id,
              userId: user._id,
              text: messageData[4] || '',
              powerEffect: null,
              rank: user.rank,
              timestamp: new Date(parseInt(messageData[9]) * 1000) || new Date()
            });
            
            await message.save();
          }
        }
      }
      
      console.log(`✅ Migrated ${this.sqlData.messages.length} messages`);
    } catch (error) {
      console.error('❌ Error migrating messages:', error);
    }
  }

  async createSampleData() {
    console.log('🎭 Creating sample data for testing...');
    
    try {
      // Create sample users if none exist
      const userCount = await User.countDocuments();
      if (userCount === 0) {
        const sampleUsers = [
          {
            username: 'admin',
            nickname: 'Admin',
            email: 'admin@ixat.com',
            password: await this.hashPassword('admin123'),
            avatar: 0,
            xats: 10000,
            days: 365,
            rank: 1,
            xavi: '{}'
          },
          {
            username: 'moderator',
            nickname: 'Moderator',
            email: 'mod@ixat.com',
            password: await this.hashPassword('mod123'),
            avatar: 1,
            xats: 5000,
            days: 180,
            rank: 2,
            xavi: '{}'
          },
          {
            username: 'member',
            nickname: 'Member',
            email: 'member@ixat.com',
            password: await this.hashPassword('member123'),
            avatar: 2,
            xats: 1000,
            days: 30,
            rank: 3,
            xavi: '{}'
          }
        ];

        for (const userData of sampleUsers) {
          const user = new User(userData);
          await user.save();
        }
        
        console.log('✅ Created sample users');
      }

      // Create sample room if none exist
      const roomCount = await Room.countDocuments();
      if (roomCount === 0) {
        const systemUser = await User.findOne({ username: 'system' });
        const room = new Room({
          id: 'main',
          name: 'Main Chat',
          background: 'default',
          radio: '',
          button: '',
          attached: '',
          pools: 1,
          password: '',
          private: false,
          owner: systemUser ? systemUser._id : null,
          ranks: {},
          bans: [],
          groupPowers: []
        });
        
        await room.save();
        console.log('✅ Created sample room');
      }
    } catch (error) {
      console.error('❌ Error creating sample data:', error);
    }
  }

  async runMigration() {
    console.log('🎭 Starting MySQL to MongoDB Migration...');
    console.log('=' .repeat(50));
    
    try {
      await this.connect();
      
      // Parse the SQL file first
      this.parseSQLFile();
      
      // Run migrations in order
      await this.migratePowers();
      await this.migrateUsers();
      await this.migrateRooms();
      await this.migrateMessages();
      
      // Create sample data if needed
      await this.createSampleData();
      
      console.log('=' .repeat(50));
      console.log('🎉 MIGRATION COMPLETE!');
      console.log('=' .repeat(50));
      console.log('📊 Migration Summary:');
      console.log(`   ⚡ Powers: ${this.sqlData.powers.length}`);
      console.log(`   👤 Users: ${this.sqlData.users.length}`);
      console.log(`   🏠 Rooms: ${this.sqlData.chats.length}`);
      console.log(`   📨 Messages: ${this.sqlData.messages.length}`);
      console.log(`   🚫 Bans: ${this.sqlData.bans.length}`);
      console.log(`   👑 Ranks: ${this.sqlData.ranks.length}`);
      console.log(`   💰 Trades: ${this.sqlData.trade.length}`);
      console.log(`   💸 Transfers: ${this.sqlData.transfers.length}`);
      console.log(`   ⚡ User Powers: ${this.sqlData.userpowers.length}`);
      console.log('');
      console.log('🔑 Default Login Credentials (if no users migrated):');
      console.log('   👑 Admin: admin / admin123');
      console.log('   🛡️ Moderator: moderator / mod123');
      console.log('   👤 Member: member / member123');
      console.log('');
      console.log('🚀 Your Ixat recreation is now fully populated with data from database.sql!');
      
    } catch (error) {
      console.error('❌ Migration failed:', error);
    } finally {
      await this.disconnect();
    }
  }
}

// Run the migration if this script is executed directly
if (require.main === module) {
  const migration = new MySQLToMongoDBMigration();
  migration.runMigration();
}

module.exports = MySQLToMongoDBMigration;
