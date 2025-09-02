# 🎭 Migration Scripts

This directory contains scripts to migrate data from the original iXat Files SQL database to MongoDB for the xat recreation.

## 📋 Available Scripts

### Core Migration Scripts

- **`robust-migration.js`** - **BEST** - Handles complex data types and edge cases properly
- **`complete-migration.js`** - **GOOD** - Runs all migrations in the correct order
- **`migrate-mysql-to-mongodb.js`** - **BASIC** - Migrates core data (powers, users, rooms, messages)
- **`migrate-user-powers.js`** - Migrates user powers from SQL userpowers table
- **`run-migration.js`** - Simple runner for the complete migration

### Utility Scripts

- **`init-db.js`** - Initializes the MongoDB database with basic structure
- **`import-ixat-data.js`** - Imports data from iXat Files
- **`fix-guest-indexes.js`** - Fixes MongoDB indexes for guest user support

## 🚀 Quick Start

### Option 1: Robust Migration (BEST - Recommended)

```bash
# Run the robust migration (handles complex data properly)
npm run migrate-robust
```

### Option 2: Complete Migration (Good)

```bash
# Run the complete migration (migrates everything)
npm run migrate-complete
```

### Option 2: Step-by-Step Migration

```bash
# 1. Initialize the database
npm run init-db

# 2. Migrate core data (powers, users, rooms, messages)
npm run migrate-mysql

# 3. Migrate user powers (the missing piece!)
npm run migrate-user-powers
```

## 📊 What Gets Migrated

### From `database.sql`:

1. **Powers** - All power definitions with costs, descriptions, etc.
2. **Users** - User accounts with xats, days, ranks, etc.
3. **Rooms** - Chat rooms with settings and configurations
4. **Messages** - Chat message history
5. **User Powers** - Which users have which powers (the critical missing piece!)

### Additional Data:

- **Bans** - User bans and restrictions
- **Ranks** - User rank assignments
- **Trades** - Trade history
- **Transfers** - Transfer records

## 🔧 Technical Details

### Database Structure

The migration converts from MySQL to MongoDB with the following collections:

- **`powers`** - Power definitions
- **`users`** - User accounts
- **`rooms`** - Chat rooms
- **`messages`** - Chat messages
- **`userpowers`** - User power assignments (NEW!)

### Power System

The power system now properly works with:

- **Power Definitions** - Stored in `powers` collection with proper sections (p0, p1, p2, etc.)
- **Bitwise Power System** - Powers use bitwise operations for multiple power combinations
- **User Power Assignments** - Stored in `userpowers` collection with proper relationships
- **Power Loading** - Server loads user powers from MongoDB using bitwise OR operations
- **Power Strings** - Generated in the format expected by the client (dO, powerO)
- **Multiple Powers** - Users can have multiple powers properly combined using bitwise operations

## 🎯 Key Improvements

### Before (Broken):
- User powers were not properly migrated
- Power loading system was incomplete
- Users couldn't use their powers in chat
- Complex JSON data was not parsed correctly
- Bitwise power system was not handled properly
- Multiple powers per user were not supported

### After (Fixed):
- ✅ All user powers properly migrated from SQL
- ✅ Power loading system works with MongoDB using bitwise OR operations
- ✅ Users can use their powers in chat
- ✅ Complete data migration from database.sql
- ✅ Complex JSON data properly parsed and stored
- ✅ Bitwise power system correctly implemented
- ✅ Multiple powers per user properly supported
- ✅ Duplicate power assignments prevented

## 🚨 Important Notes

1. **Backup First** - Always backup your MongoDB before running migrations
2. **Database.sql Required** - The migration reads from `Ixat Files/_server/database.sql`
3. **MongoDB Connection** - Ensure MongoDB is running on `mongodb://localhost:27017/ixat`
4. **Power System** - User powers are now properly stored and loaded

## 🔍 Troubleshooting

### Common Issues:

1. **"database.sql not found"**
   - Ensure `Ixat Files/_server/database.sql` exists
   - Check file permissions

2. **"MongoDB connection failed"**
   - Start MongoDB: `mongod`
   - Check connection string in scripts

3. **"No user powers found"**
   - This is normal if database.sql doesn't contain user power data
   - The migration will still work for other data

### Verification:

After migration, check:
```bash
# Check if data was migrated
mongo ixat
> db.powers.count()
> db.users.count()
> db.userpowers.count()
```

## 📈 Migration Results

After successful migration, you should see:

- ✅ All powers from database.sql imported
- ✅ All users with their xats, days, ranks
- ✅ All user power assignments
- ✅ Chat rooms and message history
- ✅ Working power system in the chat

## 🎉 Success!

Once migration is complete, your xat recreation will have:

- **Complete data** from the original iXat Files
- **Working power system** with user power assignments
- **Proper authentication** for both registered users and guests
- **Full chat functionality** with powers, ranks, and features

The migration ensures that all the data from `database.sql` is properly converted to MongoDB format and the power system works correctly!
