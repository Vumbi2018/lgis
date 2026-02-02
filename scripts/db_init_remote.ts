import { db, pool } from "../server/db";
import { users } from "../shared/schema";
import { sql } from "drizzle-orm";

async function initialize() {
    console.log("🚀 Starting Remote Database Initialization...");
    console.log(`📡 Connecting to: ${process.env.DATABASE_URL?.split('@')[1] || "Unknown"}`);

    try {
        // 1. Check connection
        const now = await pool.query('SELECT NOW()');
        console.log(`✅ Connection successful. Server time: ${now.rows[0].now}`);

        // 2. Check if users table exists
        try {
            await db.select().from(users).limit(1);
            console.log("✅ 'users' table exists.");
        } catch (e: any) {
            if (e.message.includes('relation "users" does not exist')) {
                console.log("❌ 'users' table is missing. You need to run 'npm run db:push' first.");
                console.log("💡 Tip: Try running: $env:DATABASE_URL=\"your_remote_url\"; npm run db:push");
                return;
            } else {
                throw e;
            }
        }

        // 3. Trigger seeding
        console.log("🌱 Starting seed process...");
        const { default: seed } = await import("../server/seed");
        // Note: seed.ts is a standalone script that runs on import if called via tsx,
        // but since we are importing it here, we should ensure it executes.
        // If seed.ts has a main call at the bottom, importing it might trigger it.

        console.log("✅ Initialization script finished.");
    } catch (error) {
        console.error("💥 Critical error during initialization:", error);
    } finally {
        process.exit(0);
    }
}

initialize();
