import { db } from "../server/db";
import { sql } from "drizzle-orm";

async function main() {
    console.log("Adding national_id column to users table...");
    try {
        await db.execute(sql`
      ALTER TABLE users ADD COLUMN IF NOT EXISTS national_id TEXT;
    `);
        console.log("Column 'national_id' added successfully.");
    } catch (error) {
        console.error("Error adding column:", error);
    } finally {
        process.exit(0);
    }
}

main();
