
import { db } from "../server/db";
import { checklistRequirements } from "../shared/schema";
import { eq } from "drizzle-orm";

const GENERAL_BUSINESS_ID = "f948d0d4-f28b-4163-b3c6-f907a6c5d840";

async function main() {
    try {
        const reqs = await db.select().from(checklistRequirements)
            .where(eq(checklistRequirements.licenseTypeId, GENERAL_BUSINESS_ID));

        console.log(`Verified: Found ${reqs.length} requirements for General Business.`);
        reqs.forEach(r => console.log(`- ${r.documentName}`));
    } catch (e) {
        console.error("Error:", e);
    }
    process.exit(0);
}
main();
