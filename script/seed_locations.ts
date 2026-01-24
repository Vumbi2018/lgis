
import { db } from "../server/db";
import { locations, locationLevels, councils } from "../shared/schema";
import { eq, and } from "drizzle-orm";

async function main() {
    console.log("Starting seeding process...");

    try {
        // 1. Get or Create Council (We need a council to attach locations to)
        const allCouncils = await db.select().from(councils).limit(1);
        let councilId: string;

        if (allCouncils.length === 0) {
            console.log("No council found, creating default council...");
            const [newCouncil] = await db.insert(councils).values({
                name: "Default Council",
                level: "district",
                countryCode: "PG",
                currencyCode: "PGK",
                timezone: "Pacific/Port_Moresby",
                status: "active"
            }).returning();
            councilId = newCouncil.councilId;
        } else {
            councilId = allCouncils[0].councilId;
            console.log(`Using existing council: ${allCouncils[0].name} (${councilId})`);
        }

        // 2. Ensure Location Levels exist (Section and Lot)
        // We assume a hierarchy: Province(1) -> District(2) -> Section(3) -> Lot(4)
        // For this specific request, we just need Section and Lot levels.

        let sectionLevel = await db.query.locationLevels.findFirst({
            where: and(eq(locationLevels.councilId, councilId), eq(locationLevels.name, "Section"))
        });

        if (!sectionLevel) {
            console.log("Creating 'Section' level...");
            [sectionLevel] = await db.insert(locationLevels).values({
                councilId,
                name: "Section",
                level: 3,
                description: "Land Section"
            }).returning();
        } else {
            console.log("Found 'Section' level.");
        }

        let lotLevel = await db.query.locationLevels.findFirst({
            where: and(eq(locationLevels.councilId, councilId), eq(locationLevels.name, "Lot"))
        });

        if (!lotLevel) {
            console.log("Creating 'Lot' level...");
            [lotLevel] = await db.insert(locationLevels).values({
                councilId,
                name: "Lot",
                level: 4,
                description: "Land Lot"
            }).returning();
        } else {
            console.log("Found 'Lot' level.");
        }

        // 3. Seed Sections (1-100)
        console.log("Seeding Sections 1-100...");
        let sectionsCreated = 0;
        for (let i = 1; i <= 100; i++) {
            const code = i.toString().padStart(2, '0'); // "01", "02", ... "100" -> actually "01".."99", "100"

            // Check if exists
            const existing = await db.query.locations.findFirst({
                where: and(
                    eq(locations.councilId, councilId),
                    eq(locations.levelId, sectionLevel!.id),
                    eq(locations.code, code)
                )
            });

            if (!existing) {
                await db.insert(locations).values({
                    councilId,
                    levelId: sectionLevel!.id,
                    code: code,
                    status: "active"
                });
                sectionsCreated++;
            }
        }
        console.log(`Created ${sectionsCreated} new Sections.`);

        // 4. Seed Lots (1-100)
        console.log("Seeding Lots 1-100...");
        let lotsCreated = 0;
        for (let i = 1; i <= 100; i++) {
            const code = i.toString().padStart(2, '0');

            // Check if exists (Generic lots, not attached to specific sections as per "flat list" plan)
            const existing = await db.query.locations.findFirst({
                where: and(
                    eq(locations.councilId, councilId),
                    eq(locations.levelId, lotLevel!.id),
                    eq(locations.code, code)
                )
            });

            if (!existing) {
                await db.insert(locations).values({
                    councilId,
                    levelId: lotLevel!.id,
                    code: code,
                    status: "active"
                });
                lotsCreated++;
            }
        }
        console.log(`Created ${lotsCreated} new Lots.`);

        console.log("Seeding completed successfully.");

    } catch (error) {
        console.error("Seeding failed:", error);
    }
}

main();
