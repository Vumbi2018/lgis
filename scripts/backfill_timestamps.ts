
import { db } from "../server/db";
import { serviceRequests, inspections } from "../shared/schema";
import { eq } from "drizzle-orm";

async function main() {
    try {
        const requests = await db.select().from(serviceRequests);
        console.log(`Found ${requests.length} requests to check.`);

        for (const req of requests) {
            const updates: any = {};
            const baseTime = req.submittedAt || req.createdAt;

            // 1. Backfill ReviewedAt
            if (['inspection', 'approved', 'completed'].includes(req.status)) {
                if (!req.reviewedAt) {
                    updates.reviewedAt = baseTime;
                }
            }

            // 2. Backfill InspectedAt
            if (['approved', 'completed'].includes(req.status)) {
                if (!req.inspectedAt) {
                    // Try to find inspection
                    const inspection = await db.query.inspections.findFirst({
                        where: eq(inspections.requestId, req.requestId)
                    });
                    if (inspection && (inspection.performedAt || inspection.scheduledAt)) {
                        updates.inspectedAt = inspection.performedAt || inspection.scheduledAt;
                    } else {
                        // Fallback
                        updates.inspectedAt = baseTime;
                    }
                }

                // 3. Backfill ApprovedAt
                if (!req.approvedAt) {
                    updates.approvedAt = baseTime;
                }
            }

            if (Object.keys(updates).length > 0) {
                console.log(`Updating request ${req.requestId} with`, updates);
                await db.update(serviceRequests)
                    .set(updates)
                    .where(eq(serviceRequests.requestId, req.requestId));
            }
        }
        console.log("Backfill complete.");
    } catch (e) {
        console.error("Backfill failed:", e);
    }
    process.exit(0);
}
main();
