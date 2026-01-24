import { db } from "../server/db";
import { licenseTypes, checklistRequirements, specialRequirements } from "../shared/schema";
import { licenseTypesData, checklistRequirementsData, specialRequirementsData } from "../server/license_data";
import { eq } from "drizzle-orm";

async function sync() {
    console.log("🔄 Synchronizing license data...");

    try {
        // 1. Sync License Types
        console.log("Syncing license types...");
        const existingTypes = await db.select().from(licenseTypes);
        const licenseTypeMap = new Map<string, string>();

        for (const data of licenseTypesData) {
            const existing = existingTypes.find(t => t.licenseName === data.licenseName);
            if (existing) {
                // Update
                await db.update(licenseTypes)
                    .set({
                        licenseCategory: data.licenseCategory,
                        applicationForm: data.applicationForm,
                        description: data.description
                    })
                    .where(eq(licenseTypes.id, existing.id));
                licenseTypeMap.set(data.licenseName, existing.id);
                console.log(`  Updated ${data.licenseName}`);
            } else {
                // Insert
                const [inserted] = await db.insert(licenseTypes).values({
                    licenseName: data.licenseName,
                    licenseCategory: data.licenseCategory,
                    applicationForm: data.applicationForm,
                    description: data.description
                }).returning();
                licenseTypeMap.set(data.licenseName, inserted.id);
                console.log(`  Inserted ${data.licenseName}`);
            }
        }

        // 2. Sync Checklist Requirements
        console.log("Syncing checklist requirements...");
        // For simplicity, we'll clear and re-insert checklist requirements for the types we have in map
        // but only for the ones we're updating to avoid deleting others if any.
        // However, usually it's better to clear and re-insert all for a clean state in this dev environment.

        for (const [name, id] of licenseTypeMap.entries()) {
            // Clear existing checklist for this type
            await db.delete(checklistRequirements).where(eq(checklistRequirements.licenseTypeId, id));

            const requirements = checklistRequirementsData.filter(r => r.licenseName === name);
            if (requirements.length > 0) {
                await db.insert(checklistRequirements).values(requirements.map(r => ({
                    licenseTypeId: id,
                    itemNumber: r.itemNumber,
                    documentName: r.documentName,
                    responsibleEntity: r.responsibleEntity,
                    requirementNote: r.requirementNote
                })));
                console.log(`  Synced ${requirements.length} checklist items for ${name}`);
            }
        }

        // 3. Sync Special Requirements
        console.log("Syncing special requirements...");
        for (const [name, id] of licenseTypeMap.entries()) {
            // Clear existing special requirements for this type
            await db.delete(specialRequirements).where(eq(specialRequirements.licenseTypeId, id));

            const specials = specialRequirementsData.filter(r => r.licenseName === name);
            if (specials.length > 0) {
                await db.insert(specialRequirements).values(specials.map(r => ({
                    licenseTypeId: id,
                    requirementName: r.requirementName,
                    issuingAuthority: r.issuingAuthority,
                    description: r.description
                })));
                console.log(`  Synced ${specials.length} special requirements for ${name}`);
            }
        }

        console.log("✅ Synchronization completed successfully!");
    } catch (error) {
        console.error("❌ Synchronization failed:", error);
        process.exit(1);
    }
}

sync().then(() => process.exit(0));
