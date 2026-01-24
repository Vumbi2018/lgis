import { db } from "../server/db";
import { sql } from "drizzle-orm";
import * as fs from "fs";

async function checkColumns() {
    try {
        const res = await db.execute(sql`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'citizens';
    `);
        fs.writeFileSync("citizens_cols.json", JSON.stringify(res.rows, null, 2));

        const res2 = await db.execute(sql`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'businesses';
    `);
        fs.writeFileSync("businesses_cols.json", JSON.stringify(res2.rows, null, 2));

        process.exit(0);
    } catch (error) {
        console.error("DEBUG ERROR:", error);
        process.exit(1);
    }
}

checkColumns();
