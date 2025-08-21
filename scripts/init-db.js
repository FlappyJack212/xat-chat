const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../src/server/models/User');
const Room = require('../src/server/models/Room');
const Power = require('../src/server/models/Power');
require('dotenv').config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/xat-chat', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

const initializeDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Room.deleteMany({});
    await Power.deleteMany({});

    console.log('Cleared existing data');

    // Drop and recreate collections to remove any problematic indexes
    try {
      await mongoose.connection.db.dropCollection('powers');
      console.log('Dropped powers collection');
    } catch (error) {
      console.log('Powers collection already dropped or doesn\'t exist');
    }

    // Create sample powers
    const powers = [
      {
        name: 'Rainbow Text',
        description: 'Makes your text appear in rainbow colors',
        category: 'text',
        icon: '🌈',
        effect: 'rainbow',
        sound: 'rainbow.mp3',
        animation: 'rainbow',
        price: 100,
        isActive: true
      },
      {
        name: 'Sparkle Effect',
        description: 'Adds sparkles around your messages',
        category: 'visual',
        icon: '⭐',
        effect: 'sparkle',
        sound: 'sparkle.mp3',
        animation: 'sparkle',
        price: 200,
        isActive: true
      },
      {
        name: 'Fire Effect',
        description: 'Burns your text with fire',
        category: 'visual',
        icon: '🔥',
        effect: 'fire',
        sound: 'fire.mp3',
        animation: 'fire',
        price: 300,
        isActive: true
      },
      {
        name: 'Ice Effect',
        description: 'Freezes your text with ice',
        category: 'visual',
        icon: '❄️',
        effect: 'ice',
        sound: 'ice.mp3',
        animation: 'ice',
        price: 250,
        isActive: true
      },
      {
        name: 'Lightning Effect',
        description: 'Electrifies your text',
        category: 'visual',
        icon: '⚡',
        effect: 'lightning',
        sound: 'lightning.mp3',
        animation: 'lightning',
        price: 400,
        isActive: true
      },
      {
        name: 'Diamond Effect',
        description: 'Makes your text sparkle like diamonds',
        category: 'visual',
        icon: '💎',
        effect: 'diamond',
        sound: 'diamond.mp3',
        animation: 'diamond',
        price: 500,
        isActive: true
      }
    ];

    // Create powers one by one to avoid bulk insert issues
    const createdPowers = [];
    for (const power of powers) {
      const newPower = new Power(power);
      await newPower.save();
      createdPowers.push(newPower);
    }
    console.log('Created powers:', createdPowers.length);

    // Create sample users
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    const users = [
      {
        username: 'admin',
        email: 'admin@xat.com',
        passwordHash: hashedPassword,
        displayName: 'Admin',
        avatarId: 'robot',
        level: 10,
        credits: 5000,
        status: 'online'
      },
      {
        username: 'user1',
        email: 'user1@xat.com',
        passwordHash: hashedPassword,
        displayName: 'User One',
        avatarId: 'cat',
        level: 5,
        credits: 2000,
        status: 'online'
      },
      {
        username: 'user2',
        email: 'user2@xat.com',
        passwordHash: hashedPassword,
        displayName: 'User Two',
        avatarId: 'dog',
        level: 3,
        credits: 1500,
        status: 'online'
      }
    ];

    const createdUsers = await User.insertMany(users);
    console.log('Created users:', createdUsers.length);

    // Create sample rooms
    const rooms = [
      {
        name: 'General',
        description: 'General chat room for everyone',
        createdBy: createdUsers[0]._id,
        users: [createdUsers[0]._id, createdUsers[1]._id, createdUsers[2]._id],
        usersCount: 3,
        maxUsers: 100,
        moderators: [createdUsers[0]._id]
      },
      {
        name: 'Gaming',
        description: 'Chat about your favorite games',
        createdBy: createdUsers[1]._id,
        users: [createdUsers[1]._id],
        usersCount: 1,
        maxUsers: 50,
        moderators: [createdUsers[1]._id]
      },
      {
        name: 'Music',
        description: 'Share and discuss music',
        createdBy: createdUsers[2]._id,
        users: [createdUsers[2]._id],
        usersCount: 1,
        maxUsers: 50,
        moderators: [createdUsers[2]._id]
      }
    ];

    const createdRooms = await Room.insertMany(rooms);
    console.log('Created rooms:', createdRooms.length);

    console.log('Database initialization completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
};

initializeDatabase();
