import { db } from "../server/db";
import { sql } from "drizzle-orm";
import fs from "fs";

async function main() {
    console.log("Deep database check...");
    try {
        const tables = await db.execute(sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public';
    `);

        let report = "Database Tables:\n";
        for (const row of tables.rows) {
            report += `- ${row.table_name}\n`;
            const columns = await db.execute(sql`
        SELECT column_name, data_type 
        FROM information_schema.columns 
        WHERE table_name = ${row.table_name};
      `);
            columns.rows.forEach(c => {
                report += `  - ${c.column_name} (${c.data_type})\n`;
            });
        }

        fs.writeFileSync("db_report.txt", report);
        console.log("Full DB report written to db_report.txt");
    } catch (error) {
        console.error("Error generating report:", error);
    } finally {
        process.exit(0);
    }
}

main();
