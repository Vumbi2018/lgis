import { db } from "../server/db";
import { sql } from "drizzle-orm";

async function main() {
    console.log("Resetting license_type_fees table...");
    try {
        // Drop existing table
        await db.execute(sql`DROP TABLE IF EXISTS license_type_fees CASCADE;`);
        console.log("Old table dropped.");

        // Create new table with full schema
        await db.execute(sql`
      CREATE TABLE license_type_fees (
        id VARCHAR(255) PRIMARY KEY DEFAULT gen_random_uuid(),
        license_type_id VARCHAR(255) NOT NULL,
        amount DECIMAL(12, 2) NOT NULL,
        currency TEXT NOT NULL DEFAULT 'PGK',
        effective_date TIMESTAMP NOT NULL DEFAULT now(),
        active BOOLEAN DEFAULT true,
        created_at TIMESTAMP NOT NULL DEFAULT now()
      );
    `);
        console.log("New table 'license_type_fees' created successfully.");
    } catch (error) {
        console.error("Error resetting table:", error);
    } finally {
        process.exit(0);
    }
}

main();
