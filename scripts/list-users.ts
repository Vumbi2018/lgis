
import { db } from "../server/db";
import { users } from "@shared/schema";
import * as fs from 'fs';
import * as path from 'path';

async function listUsers() {
    try {
        console.log("Fetching users...");
        const allUsers = await db.select().from(users);
        const dump = allUsers.map(u => ({ username: u.username, role: u.role, id: u.userId }));
        fs.writeFileSync(path.join(process.cwd(), 'users_dump.json'), JSON.stringify(dump, null, 2));
        console.log("Wrote users to users_dump.json");
    } catch (error) {
        console.error("Error listing users:", error);
    }
    process.exit(0);
}

listUsers();
