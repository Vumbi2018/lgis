
import { db } from "../server/db";
import { sql } from "drizzle-orm";

async function main() {
    try {
        console.log("Adding timestamp columns...");
        await db.execute(sql`
        ALTER TABLE service_requests 
        ADD COLUMN IF NOT EXISTS reviewed_at timestamp,
        ADD COLUMN IF NOT EXISTS inspected_at timestamp,
        ADD COLUMN IF NOT EXISTS approved_at timestamp;
      `);
        console.log("Columns added successfully.");
    } catch (e) {
        console.error("Migration failed:", e);
    }
    process.exit(0);
}
main();
