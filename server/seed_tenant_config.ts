import { db } from "./db";
import { councils, tenantConfig, dynamicLocations } from "@shared/schema";
import { eq } from "drizzle-orm";
// import { hashPassword } from "./auth"; // Unused in this file based on logic shown

/**
 * Seed default tenant configuration for NCDC
 */
async function seedDefaultTenantConfig() {
    console.log("🌱 Seeding default tenant configuration...");

    try {
        // Get NCDC council
        const [ncdc] = await db.select().from(councils).where(eq(councils.name, "National Capital District Commission")).limit(1);

        if (!ncdc) {
            console.log("⚠️  NCDC council not found, skipping tenant config seed");
            return;
        }

        // Check if config already exists
        const existing = await db.select().from(tenantConfig).where(eq(tenantConfig.councilId, ncdc.councilId)).limit(1);

        if (existing.length > 0) {
            console.log("✅ Tenant config already exists");
            return;
        }

        // Create default configuration
        await db.insert(tenantConfig).values({
            councilId: ncdc.councilId,
            councilName: "National Capital District Commission",
            shortName: "NCDC",
            tagline: "City of Excellence",
            logoUrl: "/logo.png",
            primaryColor: "#07080a",
            secondaryColor: "#10b981",
            accentColor: "#f59e0b",
            primaryForeground: "#ffcc00",
            positiveColor: "#10b981",
            warningColor: "#f59e0b",
            negativeColor: "#ef4444",
            sidebarBackground: "#07080a",
            sidebarForeground: "#ffffff",
            headerBackground: "#ffffff",
            borderRadius: 4,
            buttonRadius: 4,
            cardRadius: 8,
            inputRadius: 4,
            fontFamily: "Inter",
            locationLevels: ["Country", "Province", "District", "Ward", "Section", "Lot"],
            locale: "en-PG",
            timezone: "Pacific/Port_Moresby",
            dateFormat: "DD/MM/YYYY",
            timeFormat: "HH:mm",
            firstDayOfWeek: "monday",
            currency: "PGK",
            currencySymbol: "K",
            currencyPosition: "before",
            decimalSeparator: ".",
            thousandsSeparator: ",",
            address: "Port Moresby, Papua New Guinea",
            phone: "+675 325 6400",
            email: "info@ncdc.gov.pg",
            website: "https://ncdc.gov.pg"
        });

        console.log("✅ Created default tenant configuration for NCDC");

        // Seed default dynamic locations
        await seedDynamicLocations(ncdc.councilId);

    } catch (error) {
        console.error("❌ Error seeding tenant config:", error);
        throw error;
    }
}

/**
 * Seed default dynamic locations for PNG hierarchy
 */
async function seedDynamicLocations(councilId: string) {
    console.log("🌱 Seeding dynamic locations...");

    try {
        // Check if already seeded
        const existing = await db.select().from(dynamicLocations).where(eq(dynamicLocations.councilId, councilId)).limit(1);

        if (existing.length > 0) {
            console.log("✅ Dynamic locations already exist");
            return;
        }

        // Create Papua New Guinea (Country)
        const [country] = await db.insert(dynamicLocations).values({
            councilId,
            level: "Country",
            levelIndex: "0",
            name: "Papua New Guinea",
            code: "PNG",
            isActive: "true"
        }).returning();

        // Create National Capital District (Province)
        const [province] = await db.insert(dynamicLocations).values({
            councilId,
            level: "Province",
            levelIndex: "1",
            name: "National Capital District",
            code: "NCD",
            parentId: country.locationId,
            isActive: "true"
        }).returning();

        // Create sample districts
        const districts = [
            { name: "Port Moresby North-East", code: "PMNE" },
            { name: "Port Moresby South", code: "PMS" },
            { name: "Port Moresby North-West", code: "PMNW" }
        ];

        for (const district of districts) {
            const [dist] = await db.insert(dynamicLocations).values({
                councilId,
                level: "District",
                levelIndex: "2",
                name: district.name,
                code: district.code,
                parentId: province.locationId,
                isActive: "true"
            }).returning();

            // Create sample wards
            const wards = [
                `${district.name} Ward 1`,
                `${district.name} Ward 2`
            ];

            for (const ward of wards) {
                await db.insert(dynamicLocations).values({
                    councilId,
                    level: "Ward",
                    levelIndex: "3",
                    name: ward,
                    parentId: dist.locationId,
                    isActive: "true"
                });
            }
        }

        console.log("✅ Seeded dynamic location hierarchy");

    } catch (error) {
        console.error("❌ Error seeding dynamic locations:", error);
        throw error;
    }
}

// function exported for manual running

export { seedDefaultTenantConfig, seedDynamicLocations };
