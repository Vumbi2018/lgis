
import fs from "fs";
import path from "path";
import { sql, eq } from "drizzle-orm";

// Manually load .env
const envPath = path.resolve(process.cwd(), ".env");
if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, "utf-8");
    envConfig.split("\n").forEach((line) => {
        const [key, value] = line.split("=");
        if (key && value) {
            process.env[key.trim()] = value.trim();
        }
    });
}

async function verifyPayments() {
    const { db } = await import("./server/db");
    const { payments, licences } = await import("./shared/schema");

    console.log("=== CHECKING PAYMENT STATUSES ===");

    // Get the top council ID again just to be sure
    const topCouncil = await db.select({
        councilId: licences.councilId,
        count: sql<number>`count(*)`
    })
        .from(licences) // using licences as anchor for active council
        .groupBy(licences.councilId)
        .orderBy(sql`count(*) desc`)
        .limit(1);

    const councilId = topCouncil[0]?.councilId;
    if (!councilId) {
        console.log("No data found.");
        process.exit(0);
    }
    console.log(`Checking payments for Council ID: ${councilId}`);

    const payStats = await db.select({
        status: payments.status,
        count: sql<number>`count(*)`,
        total: sql<number>`sum(${payments.amount})`
    })
        .from(payments)
        .where(eq(payments.councilId, councilId))
        .groupBy(payments.status);

    if (payStats.length === 0) {
        console.log("No payments found for this council.");
    } else {
        console.table(payStats);
    }

    process.exit(0);
}

verifyPayments().catch(console.error);
