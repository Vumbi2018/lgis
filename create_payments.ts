
import { db } from "./server/db";
import { sql } from "drizzle-orm";

async function main() {
    console.log("Creating payments table...");
    try {
        await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "payments" (
        "payment_id" varchar PRIMARY KEY DEFAULT gen_random_uuid(),
        "council_id" varchar NOT NULL,
        "account_id" varchar NOT NULL,
        "payment_ref" text NOT NULL,
        "amount" numeric(12, 2) NOT NULL,
        "currency" char(3) DEFAULT 'PGK' NOT NULL,
        "method" text NOT NULL,
        "provider" text,
        "status" text DEFAULT 'pending' NOT NULL,
        "external_reference" text,
        "payment_details" jsonb,
        "paid_at" timestamp,
        "created_at" timestamp DEFAULT now() NOT NULL
      );
    `);
        console.log("Created payments table successfully");
    } catch (e) {
        console.error("Error creating payments table:", e);
    }
    process.exit(0);
}

main();
