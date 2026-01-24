
import { db } from "./server/db";
import { licences } from "@shared/schema";
import { isNull } from "drizzle-orm";

async function cleanup() {
    console.log("Cleaning up broken license records...");
    const res = await db.delete(licences).where(isNull(licences.pdfHash)).returning();
    console.log(`Deleted ${res.length} broken licences:`);
    res.forEach(l => console.log(` - ${l.licenceNo}`));
    process.exit();
}
cleanup();
