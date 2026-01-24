
import { db } from "../server/db";
import { serviceRequests } from "../shared/schema";
import * as fs from 'fs';

async function main() {
    try {
        const requests = await db.select().from(serviceRequests);

        const dump = requests.map(r => ({
            id: r.requestId,
            serviceId: r.serviceId,
            data: r.processingData
        }));

        fs.writeFileSync('requests_dump.json', JSON.stringify(dump, null, 2));
        console.log(`Dumps ${requests.length} requests to requests_dump.json`);

    } catch (e) {
        console.error("Error:", e);
    }
    process.exit(0);
}
main();
