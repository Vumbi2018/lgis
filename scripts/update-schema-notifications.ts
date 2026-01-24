
import { db } from "../server/db";
import { sql } from "drizzle-orm";

async function updateSchema() {
    try {
        console.log("Updating database schema...");

        // Add requestRef column
        await db.execute(sql`
            ALTER TABLE service_requests 
            ADD COLUMN IF NOT EXISTS request_ref TEXT;
        `);
        console.log("Added request_ref column to service_requests");

        // Create notifications table
        await db.execute(sql`
            CREATE TABLE IF NOT EXISTS notifications (
                notification_id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
                council_id VARCHAR NOT NULL,
                user_id VARCHAR NOT NULL,
                type TEXT NOT NULL,
                title TEXT NOT NULL,
                message TEXT NOT NULL,
                reference_type TEXT,
                reference_id VARCHAR,
                read BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT NOW() NOT NULL
            );
        `);
        console.log("Created notifications table");

        console.log("Schema update complete!");
        process.exit(0);
    } catch (error) {
        console.error("Error updating schema:", error);
        process.exit(1);
    }
}

updateSchema();
