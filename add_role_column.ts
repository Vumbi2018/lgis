import { db } from './server/db';
import { sql } from 'drizzle-orm';

async function addRoleColumn() {
    try {
        console.log('Adding role column to users table...');

        // Add role column with default value 'user'
        await db.execute(sql`
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS role TEXT NOT NULL DEFAULT 'user'
    `);

        console.log('✅ Role column added successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error adding role column:', error);
        process.exit(1);
    }
}

addRoleColumn();
