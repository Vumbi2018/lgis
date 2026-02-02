
import { db } from '../server/db';
import { users } from '../shared/schema';
import { eq } from 'drizzle-orm';

async function main() {
    console.log("Fixing admin role...");
    const [updated] = await db.update(users)
        .set({ role: 'admin' })
        .where(eq(users.email, 'admin@ncdc.gov.pg'))
        .returning();

    console.log("Updated user:", updated);
    process.exit(0);
}

main().catch(console.error);
