import { db } from "../server/db";
import { sql } from "drizzle-orm";

async function fixSchema() {
    try {
        console.log("Applying schema fixes...");

        // Citizens
        await db.execute(sql`ALTER TABLE citizens ADD COLUMN IF NOT EXISTS nationality text;`);

        // Businesses
        await db.execute(sql`ALTER TABLE businesses ADD COLUMN IF NOT EXISTS block text;`);
        await db.execute(sql`ALTER TABLE businesses ADD COLUMN IF NOT EXISTS village text;`);
        await db.execute(sql`ALTER TABLE businesses ADD COLUMN IF NOT EXISTS district text;`);
        await db.execute(sql`ALTER TABLE businesses ADD COLUMN IF NOT EXISTS province text;`);

        // assets table (Let's check it too)
        // In schema.ts: assetId, councilId, assetNo, name, type, location, condition, value, status, createdAt
        // In backup: asset_id, council_id, asset_no, name, type, location, condition, value, status, created_at
        // Seems correct.

        console.log("Schema fixes applied successfully.");
        process.exit(0);
    } catch (error) {
        console.error("FIX SCHEMA ERROR:", error);
        process.exit(1);
    }
}

fixSchema();
