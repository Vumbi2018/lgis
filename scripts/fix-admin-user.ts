
import { db } from "../server/db";
import { users } from "@shared/schema";
import { eq } from "drizzle-orm";
import { hashPassword } from "../server/auth";

async function checkUser() {
    console.log("Checking for user admin@ncdc.gov.pg...");

    try {
        const user = await db.query.users.findFirst({
            where: eq(users.email, "admin@ncdc.gov.pg")
        });

        if (user) {
            console.log("Details for user:", user);
            // Reset password to be sure
            console.log("Resetting password to 'admin123'...");
            const newHash = await hashPassword("admin123");
            await db.update(users)
                .set({ passwordHash: newHash })
                .where(eq(users.userId, user.userId));
            console.log("Password reset successful.");
        } else {
            console.log("User NOT FOUND. Attempting to seed...");
            // We need a council first
            const council = await db.query.councils.findFirst();
            if (!council) {
                console.error("No councils found! Run seed script first.");
                return;
            }

            const newHash = await hashPassword("admin123");
            const [newUser] = await db.insert(users).values({
                councilId: council.councilId,
                fullName: "System Administrator",
                email: "admin@ncdc.gov.pg",
                phone: "+675 325 6400",
                passwordHash: newHash,
                status: "active",
                mfaEnabled: false,
                createdAt: new Date()
            }).returning();
            console.log("User created:", newUser);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

checkUser()
    .then(() => process.exit(0))
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });
