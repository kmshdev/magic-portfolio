#!/usr/bin/env node

/**
 * Generate bcrypt hash for PAGE_ACCESS_PASSWORD
 * 
 * Usage:
 *   node scripts/generate-password-hash.js "your-password"
 * 
 * Add the output to your .env file:
 *   PAGE_ACCESS_PASSWORD_HASH=<generated-hash>
 */

const bcrypt = require('bcryptjs');

const password = process.argv[2];

if (!password) {
  console.error('Error: Please provide a password as an argument');
  console.error('Usage: node scripts/generate-password-hash.js "your-password"');
  process.exit(1);
}

const saltRounds = 10;

bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) {
    console.error('Error generating hash:', err);
    process.exit(1);
  }
  
  console.log('\n✅ Password hash generated successfully!\n');
  console.log('Add this to your .env file:\n');
  console.log(`PAGE_ACCESS_PASSWORD_HASH=${hash}\n`);
  console.log('⚠️  Remember to remove the old PAGE_ACCESS_PASSWORD variable');
});
