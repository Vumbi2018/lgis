import { db } from "../server/db";
import { sql } from "drizzle-orm";

async function main() {
    console.log("Synchronizing database schema...");
    try {
        await db.execute(sql`
      CREATE TABLE IF NOT EXISTS license_type_fees (
        id VARCHAR(255) PRIMARY KEY DEFAULT gen_random_uuid(),
        license_type_id VARCHAR(255) NOT NULL,
        amount DECIMAL(12, 2) NOT NULL,
        currency TEXT NOT NULL DEFAULT 'PGK',
        effective_date TIMESTAMP NOT NULL DEFAULT now(),
        active BOOLEAN DEFAULT true,
        created_at TIMESTAMP NOT NULL DEFAULT now()
      );
    `);
        console.log("Table 'license_type_fees' ensured.");
    } catch (error) {
        console.error("Error creating table:", error);
    } finally {
        process.exit(0);
    }
}

main();
