
import { db } from "../server/db";
import { serviceRequests } from "../shared/schema";
import { eq } from "drizzle-orm";

async function main() {
    try {
        const ref = "LIC-2026-8594";
        const requestResults = await db.select().from(serviceRequests).where(eq(serviceRequests.requestRef, ref));
        const request = requestResults[0];

        if (!request) {
            console.error(`Request with ref ${ref} not found!`);
            // Fallback: list all refs matching *8594*
            return;
        }

        console.log(`Found Request: ${request.requestId}`);
        console.log("formData Keys:", Object.keys(request.formData || {}));
        console.log("processingData Keys:", Object.keys((request.processingData as any) || {}));

        console.log("\nFormData Content:");
        console.log(JSON.stringify(request.formData, null, 2));

    } catch (e) {
        console.error("Error:", e);
    }
    process.exit(0);
}
main();
