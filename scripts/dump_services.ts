
import { db } from "../server/db";
import { services } from "../shared/schema";
import * as fs from 'fs';

async function main() {
    try {
        const allServices = await db.select().from(services);
        fs.writeFileSync('services_dump.json', JSON.stringify(allServices, null, 2));
        console.log(`Dumps ${allServices.length} services to services_dump.json`);
    } catch (e) {
        console.error("Error:", e);
    }
    process.exit(0);
}
main();
