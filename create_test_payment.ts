
import { db } from "./server/db";
import { payments, serviceRequests } from "./shared/schema";
import { eq } from "drizzle-orm";

async function createManualPayment() {
    const requestId = "f4496f8c-8d67-5032-b032-50f7e063df44"; // Example from my previous check (truncated)
    // Let's find the actual latest request first
    const [latestRequest] = await db.select().from(serviceRequests).orderBy(serviceRequests.createdAt).limit(1);

    if (!latestRequest) {
        console.log("No requests found");
        return;
    }

    console.log(`Creating payment for request: ${latestRequest.requestId} (${latestRequest.requestRef})`);

    const payment = await db.insert(payments).values({
        councilId: latestRequest.councilId,
        accountId: "citizen-account-id",
        paymentRef: latestRequest.requestId,
        amount: "150.00",
        currency: "PGK",
        method: "cash",
        status: "completed",
        paidAt: new Date()
    }).returning();

    console.log("Created Payment:", payment[0]);
}

createManualPayment().catch(console.error);
