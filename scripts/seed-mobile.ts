
import { db } from "../server/db";
import { users, inspections, businesses } from "@shared/schema";
import { eq } from "drizzle-orm";

async function seedMobile() {
    console.log("Seeding mobile data...");

    // Get Admin User
    const user = await db.query.users.findFirst({
        where: eq(users.email, "admin@ncdc.gov.pg")
    });

    if (!user) {
        console.error("Admin user not found. Run fix-admin-user.ts first.");
        return;
    }

    // Get a Business
    const business = await db.query.businesses.findFirst();
    if (!business) {
        console.error("No business found.");
        return;
    }

    console.log(`Assigning inspections to ${user.fullName} (${user.userId})...`);

    // Create 3 Inspections
    await db.insert(inspections).values([
        {
            councilId: user.councilId,
            inspectorId: user.userId,
            businessId: business.businessId,
            status: "scheduled",
            scheduledAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // Tomorrow
            inspectionType: "Routine",
            latitude: "-9.478",
            longitude: "147.155",
            remarks: "Annual health safety check required for main floor.",
            createdAt: new Date()
        },
        {
            councilId: user.councilId,
            inspectorId: user.userId,
            businessId: business.businessId,
            status: "in_progress",
            scheduledAt: new Date(), // Today
            inspectionType: "Follow-up",
            latitude: "-9.462",
            longitude: "147.165",
            remarks: "Follow up on previous violation: blocked fire exit.",
            createdAt: new Date()
        },
        {
            councilId: user.councilId,
            inspectorId: user.userId,
            businessId: business.businessId,
            status: "completed",
            scheduledAt: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
            inspectionType: "Complaint",
            latitude: "-9.445",
            longitude: "147.175",
            remarks: "Noise complaint investigation. Found no issues.",
            completedAt: new Date(),
            result: "pass",
            createdAt: new Date()
        }
    ]);

    console.log("✅ Seeded 3 inspections for Mobile App.");
}

seedMobile()
    .then(() => process.exit(0))
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });
