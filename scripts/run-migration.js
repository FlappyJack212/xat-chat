#!/usr/bin/env node

/**
 * 🎭 MIGRATION RUNNER
 * Simple script to run the complete migration
 * Usage: node scripts/run-migration.js
 */

const CompleteMigration = require('./complete-migration');

console.log('🎭 Starting xat Recreation Migration...');
console.log('This will migrate all data from database.sql to MongoDB');
console.log('');

const migration = new CompleteMigration();
migration.runCompleteMigration().catch(error => {
  console.error('❌ Migration failed:', error);
  process.exit(1);
});
