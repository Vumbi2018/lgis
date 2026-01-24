
import { db } from "../server/db";
import { services, licenseTypes } from "../shared/schema";
import { eq } from "drizzle-orm";

async function main() {
    try {
        const id = "a50465f6-c249-4fa2-a399-483bc005dbd1";
        const serviceResults = await db.select().from(services).where(eq(services.serviceId, id));
        const service = serviceResults[0];

        if (service) {
            console.log(`Service Name: "${service.name}"`);
            console.log(`Linked License Type ID: ${service.licenseTypeId}`);

            if (service.licenseTypeId) {
                const typeResults = await db.select().from(licenseTypes).where(eq(licenseTypes.id, service.licenseTypeId));
                const type = typeResults[0];
                console.log(`Linked License Type Name: "${type?.licenseName}"`);
            } else {
                console.log("No Linked License Type ID.");
            }
        } else {
            console.log("Service not found");
        }

    } catch (e) {
        console.error("Error:", e);
    }
    process.exit(0);
}
main();
