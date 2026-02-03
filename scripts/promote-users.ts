
import { db } from "../server/db";
import { users } from "@shared/schema";
import { eq } from "drizzle-orm";

async function promoteUsers() {
    try {
        console.log("Promoting all users to admin...");
        // Update all users where role is not admin
        const result = await db.update(users)
            .set({ role: "admin" })
            .returning();

        console.log(`Updated ${result.length} users to admin role.`);
        result.forEach(u => console.log(`- ${u.username || u.userId}: ${u.role}`));
    } catch (error) {
        console.error("Error promoting users:", error);
    }
    process.exit(0);
}

promoteUsers();
