
import { db } from "../server/db";
import { serviceRequests } from "../shared/schema";
import { eq } from "drizzle-orm";

async function main() {
    try {
        const requests = await db.query.serviceRequests.findMany();
        console.log(`Checking ${requests.length} requests:`);

        for (const req of requests) {
            console.log(`[${req.status}] ${req.requestId.substring(0, 8)} S:${req.submittedAt?.toISOString()} R:${req.reviewedAt?.toISOString()} I:${req.inspectedAt?.toISOString()} A:${req.approvedAt?.toISOString()}`);
        }

    } catch (e) {
        console.error("Error:", e);
    }
    process.exit(0);
}
main();
