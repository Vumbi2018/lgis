
import { db } from "./server/db";
import { sql } from "drizzle-orm";

async function main() {
    console.log("Dropping payments table...");
    try {
        await db.execute(sql`DROP TABLE IF EXISTS payments CASCADE`);
        console.log("Dropped payments successfully");
    } catch (e) {
        console.error("Error dropping payments:", e);
    }
    process.exit(0);
}

main();
