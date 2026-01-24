import { db } from "../server/db";
import { citizens } from "../shared/schema";
import { eq } from "drizzle-orm";

async function debugFetch() {
    try {
        console.log("Fetching all citizens...");
        const allCitizens = await db.select().from(citizens);
        console.log("All citizens:", JSON.stringify(allCitizens, null, 2));

        process.exit(0);
    } catch (error) {
        console.error("DEBUG ERROR:", error);
        process.exit(1);
    }
}

debugFetch();
