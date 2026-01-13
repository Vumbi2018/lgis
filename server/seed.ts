import { db } from "./db";
import {
  councils, councilUnits, users, roles, permissions, rolePermissions, userRoles,
  citizens, businesses, accounts, services, feeSchedules,
  properties, markets, stalls, complaints
} from "@shared/schema";

async function seed() {
  console.log("🌱 Seeding LGIS database with specification-compliant data...");

  try {
    // ================================
    // COUNCILS
    // ================================
    const [ncdc] = await db.insert(councils).values({
      name: "National Capital District Commission",
      level: "city",
      countryCode: "PG",
      currencyCode: "PGK",
      timezone: "Pacific/Port_Moresby",
      status: "active",
    }).returning();

    const [laecc] = await db.insert(councils).values({
      name: "Lae City Council",
      level: "city",
      countryCode: "PG",
      currencyCode: "PGK",
      timezone: "Pacific/Port_Moresby",
      status: "active",
    }).returning();

    console.log("✅ Created 2 councils:", ncdc.name, ",", laecc.name);

    // ================================
    // COUNCIL UNITS
    // ================================
    const [licensingUnit] = await db.insert(councilUnits).values({
      councilId: ncdc.councilId,
      name: "Licensing & Permits",
      type: "department",
    }).returning();

    await db.insert(councilUnits).values([
      { councilId: ncdc.councilId, name: "Revenue & Finance", type: "department" },
      { councilId: ncdc.councilId, name: "Enforcement & Compliance", type: "department" },
      { councilId: ncdc.councilId, name: "Property & Rates", type: "department" },
    ]);

    console.log("✅ Created council units");

    // ================================
    // PERMISSIONS (Platform-defined)
    // ================================
    await db.insert(permissions).values([
      { permissionCode: "citizen:read", description: "View citizen records" },
      { permissionCode: "citizen:write", description: "Create/update citizen records" },
      { permissionCode: "business:read", description: "View business records" },
      { permissionCode: "business:write", description: "Create/update business records" },
      { permissionCode: "service:read", description: "View service catalogue" },
      { permissionCode: "service:write", description: "Manage service catalogue" },
      { permissionCode: "request:read", description: "View service requests" },
      { permissionCode: "request:write", description: "Process service requests" },
      { permissionCode: "request:approve", description: "Approve service requests" },
      { permissionCode: "inspection:read", description: "View inspections" },
      { permissionCode: "inspection:write", description: "Conduct inspections" },
      { permissionCode: "invoice:read", description: "View invoices" },
      { permissionCode: "invoice:write", description: "Create/manage invoices" },
      { permissionCode: "payment:read", description: "View payments" },
      { permissionCode: "payment:write", description: "Record payments" },
      { permissionCode: "licence:read", description: "View licences" },
      { permissionCode: "licence:write", description: "Issue licences" },
      { permissionCode: "enforcement:read", description: "View enforcement cases" },
      { permissionCode: "enforcement:write", description: "Manage enforcement cases" },
      { permissionCode: "audit:read", description: "View audit logs" },
      { permissionCode: "user:read", description: "View users" },
      { permissionCode: "user:write", description: "Manage users" },
      { permissionCode: "role:read", description: "View roles" },
      { permissionCode: "role:write", description: "Manage roles" },
    ]).onConflictDoNothing();

    console.log("✅ Created permissions");

    // ================================
    // ROLES (Council-specific)
    // ================================
    const [adminRole] = await db.insert(roles).values({
      councilId: ncdc.councilId,
      name: "Administrator",
      scope: "council",
    }).returning();

    const [managerRole] = await db.insert(roles).values({
      councilId: ncdc.councilId,
      name: "Manager",
      scope: "unit",
    }).returning();

    const [officerRole] = await db.insert(roles).values({
      councilId: ncdc.councilId,
      name: "Licensing Officer",
      scope: "unit",
    }).returning();

    const [inspectorRole] = await db.insert(roles).values({
      councilId: ncdc.councilId,
      name: "Inspector",
      scope: "ward",
    }).returning();

    console.log("✅ Created roles");

    // ================================
    // ROLE PERMISSIONS
    // ================================
    const allPermissions = [
      "citizen:read", "citizen:write", "business:read", "business:write",
      "service:read", "service:write", "request:read", "request:write", "request:approve",
      "inspection:read", "inspection:write", "invoice:read", "invoice:write",
      "payment:read", "payment:write", "licence:read", "licence:write",
      "enforcement:read", "enforcement:write", "audit:read", "user:read", "user:write",
      "role:read", "role:write"
    ];

    for (const code of allPermissions) {
      await db.insert(rolePermissions).values({
        roleId: adminRole.roleId,
        permissionCode: code,
      }).onConflictDoNothing();
    }

    console.log("✅ Assigned permissions to admin role");

    // ================================
    // USERS
    // ================================
    const [adminUser] = await db.insert(users).values({
      councilId: ncdc.councilId,
      unitId: licensingUnit.unitId,
      fullName: "System Administrator",
      email: "admin@ncdc.gov.pg",
      phone: "+675 325 6400",
      passwordHash: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.5GGdA", // placeholder
      status: "active",
      mfaEnabled: false,
    }).returning();

    const [officerUser] = await db.insert(users).values({
      councilId: ncdc.councilId,
      unitId: licensingUnit.unitId,
      fullName: "John Kila",
      email: "jkila@ncdc.gov.pg",
      phone: "+675 7234 5678",
      passwordHash: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.5GGdB",
      status: "active",
      mfaEnabled: false,
    }).returning();

    console.log("✅ Created users");

    // ================================
    // USER ROLES
    // ================================
    await db.insert(userRoles).values([
      { userId: adminUser.userId, roleId: adminRole.roleId },
      { userId: officerUser.userId, roleId: officerRole.roleId },
    ]);

    console.log("✅ Assigned roles to users");

    // ================================
    // CITIZENS
    // ================================
    const [citizen1] = await db.insert(citizens).values({
      councilId: ncdc.councilId,
      nationalId: "NID-2024-00123",
      localCitizenNo: "NCDC-CIT-0001",
      firstName: "Michael",
      lastName: "Kila",
      dob: "1985-03-15",
      sex: "male",
      phone: "+675 7234 5678",
      email: "mkila@email.pg",
      address: "Section 45, Lot 12, Boroko",
      village: "Hanuabada",
      province: "Central Province",
      district: "Port Moresby",
    }).returning();

    const [citizen2] = await db.insert(citizens).values({
      councilId: ncdc.councilId,
      nationalId: "NID-2024-00456",
      localCitizenNo: "NCDC-CIT-0002",
      firstName: "Sarah",
      lastName: "Toua",
      dob: "1992-07-22",
      sex: "female",
      phone: "+675 7345 6789",
      email: "stoua@email.pg",
      address: "Section 12, Lot 8, Gordons",
      province: "NCD",
      district: "Port Moresby",
    }).returning();

    console.log("✅ Seeded 2 citizens");

    // ================================
    // BUSINESSES
    // ================================
    const [biz1] = await db.insert(businesses).values({
      councilId: ncdc.councilId,
      registrationNo: "BIZ-2020-0045",
      tin: "TIN-987654321",
      legalName: "Papindo Trading Limited",
      tradingName: "Papindo Supermarket",
      businessType: "Company",
      industry: "Retail",
      ownerName: "John Kamaso",
      contactPhone: "+675 325 1234",
      contactEmail: "info@papindo.pg",
      physicalAddress: "Section 32, Lot 5, Gordons",
      section: "32",
      lot: "5",
      suburb: "Gordons",
      status: "active",
    }).returning();

    const [biz2] = await db.insert(businesses).values({
      councilId: ncdc.councilId,
      registrationNo: "BIZ-2021-0112",
      tin: "TIN-123456789",
      legalName: "City Pharmacy PNG",
      tradingName: "City Pharmacy Waigani",
      businessType: "Company",
      industry: "Healthcare",
      ownerName: "Maria Santos",
      contactPhone: "+675 325 5678",
      contactEmail: "waigani@citypharmacy.pg",
      physicalAddress: "Section 14, Lot 22, Waigani",
      section: "14",
      lot: "22",
      suburb: "Waigani",
      status: "active",
    }).returning();

    console.log("✅ Seeded 2 businesses");

    // ================================
    // ACCOUNTS (for billing)
    // ================================
    await db.insert(accounts).values([
      {
        councilId: ncdc.councilId,
        holderType: "citizen",
        holderId: citizen1.citizenId,
        accountNo: "NCDC-ACC-C0001",
        status: "active",
      },
      {
        councilId: ncdc.councilId,
        holderType: "citizen",
        holderId: citizen2.citizenId,
        accountNo: "NCDC-ACC-C0002",
        status: "active",
      },
      {
        councilId: ncdc.councilId,
        holderType: "business",
        holderId: biz1.businessId,
        accountNo: "NCDC-ACC-B0001",
        status: "active",
      },
      {
        councilId: ncdc.councilId,
        holderType: "business",
        holderId: biz2.businessId,
        accountNo: "NCDC-ACC-B0002",
        status: "active",
      },
    ]);

    console.log("✅ Created accounts for billing");

    // ================================
    // SERVICES (Service Catalogue)
    // ================================
    const [tradingLicence] = await db.insert(services).values({
      councilId: ncdc.councilId,
      code: "LIC-TRADING",
      name: "Trading Licence",
      category: "licensing",
      description: "General trading licence for businesses operating within the city",
      requiresInspection: true,
      requiresApproval: true,
      active: true,
    }).returning();

    await db.insert(services).values([
      {
        councilId: ncdc.councilId,
        code: "LIC-LIQUOR",
        name: "Liquor Licence",
        category: "licensing",
        description: "Licence to sell or serve alcohol",
        requiresInspection: true,
        requiresApproval: true,
        active: true,
      },
      {
        councilId: ncdc.councilId,
        code: "LIC-SIGNAGE",
        name: "Signage Permit",
        category: "permits",
        description: "Permit for advertising signage",
        requiresInspection: false,
        requiresApproval: true,
        active: true,
      },
      {
        councilId: ncdc.councilId,
        code: "COMP-GENERAL",
        name: "General Complaint",
        category: "complaints",
        description: "Lodge a general complaint",
        requiresInspection: false,
        requiresApproval: false,
        active: true,
      },
    ]);

    console.log("✅ Created service catalogue");

    // ================================
    // FEE SCHEDULES
    // ================================
    await db.insert(feeSchedules).values([
      {
        councilId: ncdc.councilId,
        serviceId: tradingLicence.serviceId,
        name: "Trading Licence - Standard",
        basis: "flat",
        amount: "500.00",
        currency: "PGK",
        validFrom: "2024-01-01",
        validTo: null,
      },
      {
        councilId: ncdc.councilId,
        serviceId: tradingLicence.serviceId,
        name: "Trading Licence - Premium (Large Business)",
        basis: "flat",
        amount: "1500.00",
        currency: "PGK",
        validFrom: "2024-01-01",
        validTo: null,
      },
    ]);

    console.log("✅ Created fee schedules");

    // ================================
    // PROPERTIES
    // ================================
    await db.insert(properties).values([
      {
        councilId: ncdc.councilId,
        parcelId: "POM-SEC32-LOT5",
        section: "32",
        lot: "5",
        suburb: "Gordons",
        district: "Port Moresby",
        landType: "state_lease",
        titleNumber: "VOL-45-FOL-789",
        ownerName: "Papindo Trading Limited",
        ownerType: "business",
        landArea: "1,200 sqm",
        zoning: "Commercial",
        rateableValue: "450000",
        coordinates: "-9.478,147.155",
        status: "active",
      },
      {
        councilId: ncdc.councilId,
        parcelId: "POM-SEC14-LOT22",
        section: "14",
        lot: "22",
        suburb: "Waigani",
        district: "Port Moresby",
        landType: "state_lease",
        titleNumber: "VOL-14-FOL-222",
        ownerName: "City Pharmacy PNG",
        ownerType: "business",
        landArea: "800 sqm",
        zoning: "Commercial",
        rateableValue: "380000",
        coordinates: "-9.445,147.175",
        status: "active",
      },
      {
        councilId: ncdc.councilId,
        parcelId: "POM-SEC45-LOT12",
        section: "45",
        lot: "12",
        suburb: "Boroko",
        district: "Port Moresby",
        landType: "state_lease",
        titleNumber: "VOL-45-FOL-012",
        ownerName: "Michael Kila",
        ownerType: "individual",
        landArea: "600 sqm",
        zoning: "Residential",
        rateableValue: "250000",
        coordinates: "-9.462,147.165",
        status: "active",
      },
    ]);

    console.log("✅ Seeded 3 properties");

    // ================================
    // MARKETS & STALLS
    // ================================
    const [gordonsMarket] = await db.insert(markets).values({
      councilId: ncdc.councilId,
      name: "Gordons Market",
      location: "Gordons, Port Moresby",
      capacity: 500,
      operatingHours: "06:00-18:00",
      status: "active",
    }).returning();

    await db.insert(stalls).values([
      {
        councilId: ncdc.councilId,
        marketId: gordonsMarket.marketId,
        stallNo: "GM-A001",
        category: "produce",
        size: "3x3m",
        dailyRate: "20.00",
        monthlyRate: "400.00",
        status: "available",
      },
      {
        councilId: ncdc.councilId,
        marketId: gordonsMarket.marketId,
        stallNo: "GM-A002",
        category: "produce",
        size: "3x3m",
        dailyRate: "20.00",
        monthlyRate: "400.00",
        status: "occupied",
      },
      {
        councilId: ncdc.councilId,
        marketId: gordonsMarket.marketId,
        stallNo: "GM-B001",
        category: "crafts",
        size: "4x4m",
        dailyRate: "30.00",
        monthlyRate: "600.00",
        status: "available",
      },
    ]);

    console.log("✅ Created market and stalls");

    // ================================
    // COMPLAINTS
    // ================================
    await db.insert(complaints).values([
      {
        councilId: ncdc.councilId,
        complainantType: "citizen",
        complainantId: citizen1.citizenId,
        category: "noise",
        status: "new",
        description: "Loud music from neighbouring business after 10pm",
        location: "Section 45, Boroko",
        latitude: "-9.462",
        longitude: "147.165",
      },
      {
        councilId: ncdc.councilId,
        complainantType: "anonymous",
        complainantId: null,
        category: "illegal_business",
        status: "investigating",
        description: "Unlicensed street vendor operating without permit",
        location: "Near Gordons Market entrance",
        latitude: "-9.478",
        longitude: "147.155",
      },
    ]);

    console.log("✅ Seeded complaints");

    console.log("\n🎉 Database seeding completed successfully!");
    console.log("📊 Summary:");
    console.log("   - 2 Councils");
    console.log("   - 4 Council Units");
    console.log("   - 24 Permissions");
    console.log("   - 4 Roles");
    console.log("   - 2 Users");
    console.log("   - 2 Citizens");
    console.log("   - 2 Businesses");
    console.log("   - 4 Accounts");
    console.log("   - 4 Services");
    console.log("   - 2 Fee Schedules");
    console.log("   - 3 Properties");
    console.log("   - 1 Market with 3 Stalls");
    console.log("   - 2 Complaints");

  } catch (error) {
    console.error("❌ Seeding failed:", error);
    throw error;
  }
}

seed()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
