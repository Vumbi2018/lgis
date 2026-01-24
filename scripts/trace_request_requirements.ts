
import { db } from "../server/db";
import { serviceRequests, services, licenseTypes, checklistRequirements } from "../shared/schema";
import { eq } from "drizzle-orm";

async function main() {
    try {
        console.log("Fetching all requests...");

        // 1. Fetch all requests raw (no relations)
        const requests = await db.select().from(serviceRequests);
        console.log(`Fetched ${requests.length} requests.`);

        console.log("\nListing all requests:");
        requests.forEach(r => {
            const data = r.processingData as any;
            console.log(`- ID: ${r.requestId} | Trading: "${data?.tradingName || 'N/A'}" | Applicant: "${data?.applicantName || 'N/A'}" | ServiceId: ${r.serviceId}`);
        });

        // Try to matching Goat
        const targetRequest = requests.find(r => {
            const data = r.processingData as any;
            return data?.tradingName === "Goat Enterprises" || data?.applicantName?.includes("Goat");
        });

        if (targetRequest) {
            console.log("\n=== FOUND TARGET REQUEST ===");
            console.log(`Request ID: ${targetRequest.requestId}`);
            console.log(`Service ID: ${targetRequest.serviceId}`);

            // 2. Fetch Service manually
            const service = await db.query.services.findFirst({
                where: (services, { eq }) => eq(services.serviceId, targetRequest.serviceId)
            });

            if (service) {
                console.log(`Service Name: ${service.name}`);
                console.log(`Service License Type ID: ${service.licenseTypeId}`);

                // 3. Fetch License Type manually
                if (service.licenseTypeId) {
                    const licenseType = await db.query.licenseTypes.findFirst({
                        where: (types, { eq }) => eq(types.id, service.licenseTypeId!)
                    });
                    console.log(`Linked License Type Name: "${licenseType?.licenseName}"`);

                    // 4. Trace Requirements
                    const reqs = await db.select().from(checklistRequirements)
                        .where(eq(checklistRequirements.licenseTypeId, service.licenseTypeId));
                    console.log(`\nRequirements found in DB for License ID ${service.licenseTypeId}: ${reqs.length}`);
                    reqs.forEach(r => console.log(`- ${r.documentName}`));
                } else {
                    console.log("Service has no License Type ID!");
                }
            } else {
                console.log("Service not found!");
            }
        } else {
            console.log("\nNo request matches 'Goat Enterprises'. Check list above.");
        }

    } catch (e) {
        console.error("Error:", e);
    }
    process.exit(0);
}
main();
