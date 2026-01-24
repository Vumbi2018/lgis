
import { db } from "../server/db";
import { tenantConfig } from "../shared/schema";
import { eq } from "drizzle-orm";

async function main() {
    const councilId = '3c4d4a9f-92a7-4dd2-82fb-ceff90c57094';

    const allModules = [
        "dashboard",
        "registry",
        "licensing",
        "services",
        "payments",
        "inspections",
        "enforcement",
        "complaints",
        "audit",
        "gis",
        "properties",
        "planning",
        "environment",
        "building",
        "assets",
        "waste",
        "procurement",
        "fleet",
        "portal",
        "mobile",
        "notifications",
        "feedback",
        "reports",
        "api",
        "documents",
        "workflows",
        "configuration"
    ];

    console.log(`Updating enabled modules for council ID: ${councilId}...`);

    try {
        const existing = await db.select().from(tenantConfig).where(eq(tenantConfig.councilId, councilId));

        if (existing.length === 0) {
            console.log("No config found, creating...");
            await db.insert(tenantConfig).values({
                councilId,
                enabledModules: allModules
            });
            console.log("Created successfully.");
        } else {
            console.log("Found existing config, updating...");
            const result = await db
                .update(tenantConfig)
                .set({ enabledModules: allModules })
                .where(eq(tenantConfig.councilId, councilId))
                .returning();

            console.log("Update successful!");
            console.log("Enabled modules:", JSON.stringify(result[0]?.enabledModules, null, 2));
        }

    } catch (error) {
        console.error("Error updating modules:", error);
    }
}

main().catch(console.error).finally(() => process.exit(0));
