import { db } from "../server/db";
import { citizens, businesses, properties } from "../shared/schema";
import { sql } from "drizzle-orm";

async function checkData() {
    try {
        const citizenCount = await db.select({ count: sql`count(*)` }).from(citizens);
        const businessCount = await db.select({ count: sql`count(*)` }).from(businesses);
        const propertyCount = await db.select({ count: sql`count(*)` }).from(properties);

        console.log("Citizen count:", citizenCount[0].count);
        console.log("Business count:", businessCount[0].count);
        console.log("Property count:", propertyCount[0].count);

        process.exit(0);
    } catch (error) {
        console.error("Error checking data:", error);
        process.exit(1);
    }
}

checkData();
