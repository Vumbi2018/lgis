import fs from "fs";
import path from "path";
import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";
import { eq } from "drizzle-orm";

// Manually load .env file
const envPath = path.resolve(process.cwd(), ".env");
if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, "utf-8");
    envConfig.split("\n").forEach((line) => {
        const [key, value] = line.split("=");
        if (key && value) {
            process.env[key.trim()] = value.trim();
        }
    });
}

import { users, councils } from "./shared/schema";

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
    const salt = randomBytes(16).toString("hex");
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;
    return `${buf.toString("hex")}.${salt}`;
}

async function resetAdmin() {
    console.log("Starting Admin Reset...");
    // Dynamic import to ensure env is loaded first
    const { db } = await import("./server/db");

    try {
        const email = "admin@ncdc.gov.pg";
        const password = "admin123";
        const passwordHash = await hashPassword(password);

        // Get a valid council ID
        const councilList = await db.select().from(councils).limit(1);
        const councilId = councilList.length > 0 ? councilList[0].councilId : "ncdc_council_id"; // Fallback to hardcoded if no councils

        const existingUser = await db.select().from(users).where(eq(users.email, email));

        if (existingUser.length > 0) {
            console.log("Admin user found. Updating password...");
            await db.update(users)
                .set({
                    passwordHash: passwordHash,
                    role: "admin",
                    status: "active"
                })
                .where(eq(users.email, email));
            console.log("Admin password updated to 'admin123'.");
        } else {
            console.log("Admin user NOT found. Creating new admin...");
            await db.insert(users).values({
                email: email,
                passwordHash: passwordHash,
                fullName: "System Admin",
                role: "admin",
                status: "active",
                councilId: councilId
            });
            console.log("Admin user created with password 'admin123'.");
        }
    } catch (error) {
        console.error("Error resetting admin:", error);
    }
    process.exit(0);
}

resetAdmin();
