
import { db } from "../server/db";
import { checklistRequirements, licenseTypes } from "../shared/schema";
import { checklistRequirementsData } from "../server/license_data";
import { eq, sql } from "drizzle-orm";

async function main() {
    try {
        console.log("Fetching license types...");
        const allTypes = await db.select().from(licenseTypes);
        console.log(`Found ${allTypes.length} license types.`);

        // Create map of Name -> ID
        const typeMap = new Map<string, string>();
        for (const t of allTypes) {
            if (t.licenseName) {
                typeMap.set(t.licenseName.toUpperCase(), t.id);
            }
        }

        console.log("Cleaning existing requirements...");
        await db.delete(checklistRequirements);
        console.log("Deleted old requirements.");

        console.log(`Seeding ${checklistRequirementsData.length} requirements...`);
        let insertedCount = 0;
        let skippedCount = 0;

        for (const req of checklistRequirementsData) {
            const licenseName = req.licenseName.toUpperCase().trim();
            let typeId = typeMap.get(licenseName);

            // Manual mapping fixes
            if (!typeId) {
                // Try finding partial matches or aliases
                if (licenseName === 'GENERAL BUSINESS') {
                    const match = allTypes.find(t => t.licenseName.toUpperCase().includes('TRADING') || t.licenseName.toUpperCase().includes('GENERAL'));
                    if (match) typeId = match.id;
                }
                // Map "BOTTLE-SHOP" to "BOTTLE SHOP" or similar if needed
                if (!typeId) {
                    const match = allTypes.find(t => t.licenseName.toUpperCase() === licenseName.replace(/-/g, ' '));
                    if (match) typeId = match.id;
                }
            }

            if (typeId) {
                await db.insert(checklistRequirements).values({
                    licenseTypeId: typeId,
                    itemNumber: req.itemNumber,
                    documentName: req.documentName,
                    responsibleEntity: req.responsibleEntity,
                    requirementNote: req.requirementNote
                });
                insertedCount++;
            } else {
                console.warn(`Skipping requirement for unknown license: ${req.licenseName} (No matching ID found)`);
                skippedCount++;
            }
        }

        console.log(`Seeding complete. Inserted: ${insertedCount}, Skipped: ${skippedCount}`);

    } catch (e) {
        console.error("Error:", e);
    }
    process.exit(0);
}
main();
