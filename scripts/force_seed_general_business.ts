
import { db } from "../server/db";
import { checklistRequirements } from "../shared/schema";
import { eq } from "drizzle-orm";

const GENERAL_BUSINESS_ID = "f948d0d4-f28b-4163-b3c6-f907a6c5d840";
const requirements = [
    { itemNumber: 1, documentName: 'Application FORM .1', responsibleEntity: 'NCDC', requirementNote: 'Completed, signed and dated' },
    { itemNumber: 2, documentName: 'Physical Planning Approvals', responsibleEntity: 'NCDC', requirementNote: 'Applicable if land use changes' },
    { itemNumber: 3, documentName: 'Building Authority Approvals', responsibleEntity: 'NCDC', requirementNote: 'Applicable if structural changes occur' },
    { itemNumber: 4, documentName: 'Land Title/Lease Agreement', responsibleEntity: 'Landlord', requirementNote: 'Valid' },
    { itemNumber: 5, documentName: 'Certificate of Incorporation', responsibleEntity: 'IPA', requirementNote: 'Local and Foreign Companies' },
    { itemNumber: 6, documentName: 'Company Extract', responsibleEntity: 'IPA', requirementNote: 'Local and Foreign Companies' },
    { itemNumber: 7, documentName: 'Certificate of Registration of Business Name', responsibleEntity: 'IPA', requirementNote: 'Valid' },
    { itemNumber: 8, documentName: 'Certificate Permitting Foreigners to Operate Business in PNG', responsibleEntity: 'IPA', requirementNote: 'Applicable for Foreign Enterprise' },
    { itemNumber: 9, documentName: 'Land Tax & Garbage Rates', responsibleEntity: 'NCDC', requirementNote: 'Evidence of payment' },
    { itemNumber: 10, documentName: 'Copy of License for previous Operator', responsibleEntity: 'Applicant', requirementNote: 'Applicable if COM/New Ownership' }
];

async function main() {
    try {
        console.log(`Clearing requirements for License ID: ${GENERAL_BUSINESS_ID}`);
        await db.delete(checklistRequirements)
            .where(eq(checklistRequirements.licenseTypeId, GENERAL_BUSINESS_ID));

        console.log(`Inserting ${requirements.length} requirements...`);

        for (const req of requirements) {
            await db.insert(checklistRequirements).values({
                licenseTypeId: GENERAL_BUSINESS_ID,
                itemNumber: req.itemNumber,
                documentName: req.documentName,
                responsibleEntity: req.responsibleEntity,
                requirementNote: req.requirementNote
            });
        }
        console.log("Seeding complete.");
    } catch (e) {
        console.error("Error:", e);
    }
    process.exit(0);
}
main();
