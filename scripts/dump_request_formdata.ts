
import { db } from "../server/db";
import { serviceRequests } from "../shared/schema";
import { eq } from "drizzle-orm";
import * as fs from 'fs';

async function main() {
    try {
        const requestId = "8a6e1251-4755-44f4-8d67-503250f7e063"; // Goat Enterprises request
        const requestResults = await db.select().from(serviceRequests).where(eq(serviceRequests.requestId, requestId));
        const request = requestResults[0];

        if (!request) {
            console.error("Request not found!");
            return;
        }

        console.log("Request formData:");
        console.log(JSON.stringify(request.formData, null, 2));

        fs.writeFileSync('request_formdata.json', JSON.stringify(request.formData, null, 2));

    } catch (e) {
        console.error("Error:", e);
    }
    process.exit(0);
}
main();
