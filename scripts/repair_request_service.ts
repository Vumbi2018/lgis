
import { db } from "../server/db";
import { serviceRequests, services } from "../shared/schema";
import { eq, and } from "drizzle-orm";

async function main() {
    try {
        const requestId = "8a6e1251-4755-44f4-8d67-503250f7e063";
        // 1. Get Request Council
        const requestResults = await db.select().from(serviceRequests).where(eq(serviceRequests.requestId, requestId));
        const request = requestResults[0];

        if (!request) {
            console.error("Request not found!");
            return;
        }
        console.log(`Found Request. Council ID: ${request.councilId}`);

        // 2. Find valid Trading Licence service for this council
        const serviceResults = await db.select().from(services).where(
            and(
                eq(services.councilId, request.councilId),
                eq(services.name, "Trading Licence")
            )
        );
        const validService = serviceResults[0];

        if (!validService) {
            console.error("No valid 'Trading Licence' service found for this council!");
            // Fallback: search for any service with 'Trading'
            return;
        }
        console.log(`Found valid Service: ${validService.name} (ID: ${validService.serviceId})`);

        // 3. Update Request
        console.log(`Updating request ${requestId} from Service ID ${request.serviceId} to ${validService.serviceId}...`);

        await db.update(serviceRequests)
            .set({ serviceId: validService.serviceId })
            .where(eq(serviceRequests.requestId, requestId));

        console.log("Update complete.");

    } catch (e) {
        console.error("Error:", e);
    }
    process.exit(0);
}
main();
