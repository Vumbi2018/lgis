import { db } from "./db";
import {
  councils, councilUnits, users, roles, permissions, rolePermissions, userRoles,
  citizens, businesses, accounts, services, feeSchedules,
  properties, markets, stalls, complaints, assets,
  licenseTypes, checklistRequirements, specialRequirements,
  Document, serviceRequests
} from "@shared/schema";
import { licenseTypesData, checklistRequirementsData, specialRequirementsData } from "./license_data";
import { hashPassword } from "./auth";

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
      // Branding
      themeColor: "#EAB308", // Yellow-500
      fontFamily: "Inter",
      logoUrl: "", // TODO: Add default logo URL
      // Contact
      email: "info@ncdc.gov.pg",
      phone: "+675 324 0700",
      website: "https://ncdc.gov.pg",
      address: "City Hall, Waigani Drive, Port Moresby",
      // Localization
      dateFormat: "dd/MM/yyyy",
      timeFormat: "HH:mm",
    }).returning();

    console.log("✅ Created council:", ncdc.name);

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
    // Comprehensive permission catalogue - 78 permissions across 9 modules
    const permissionsData = [
      // Registry Module
      { permissionCode: "citizen:read", description: "View citizen records" },
      { permissionCode: "citizen:write", description: "Create/update citizen records" },
      { permissionCode: "citizen:delete", description: "Delete citizen records" },
      { permissionCode: "citizen:export", description: "Export citizen data" },
      { permissionCode: "citizen:pii", description: "Access personally identifiable information" },
      { permissionCode: "business:read", description: "View business records" },
      { permissionCode: "business:write", description: "Create/update business records" },
      { permissionCode: "business:delete", description: "Delete business records" },
      { permissionCode: "business:verify", description: "Verify business registrations" },
      { permissionCode: "business:export", description: "Export business data" },
      { permissionCode: "property:read", description: "View property records" },
      { permissionCode: "property:write", description: "Create/update property records" },
      { permissionCode: "property:delete", description: "Delete property records" },
      { permissionCode: "property:assess", description: "Create/update rate assessments" },

      // Licensing Module
      { permissionCode: "request:read", description: "View service requests/applications" },
      { permissionCode: "request:write", description: "Create/update service requests" },
      { permissionCode: "request:approve", description: "Approve requests" },
      { permissionCode: "request:reject", description: "Reject requests" },
      { permissionCode: "request:delete", description: "Delete requests" },
      { permissionCode: "licence:read", description: "View licences" },
      { permissionCode: "licence:write", description: "Issue/update licences" },
      { permissionCode: "licence:renew", description: "Renew licences" },
      { permissionCode: "licence:revoke", description: "Revoke licences" },
      { permissionCode: "licence:suspend", description: "Suspend licences" },
      { permissionCode: "inspection:read", description: "View inspections" },
      { permissionCode: "inspection:write", description: "Conduct/update inspections" },
      { permissionCode: "inspection:schedule", description: "Schedule inspections" },
      { permissionCode: "inspection:complete", description: "Complete inspections" },

      // Financial Module
      { permissionCode: "payment:read", description: "View payments" },
      { permissionCode: "payment:write", description: "Record payments" },
      { permissionCode: "payment:refund", description: "Process refunds" },
      { permissionCode: "payment:delete", description: "Delete/void payments" },
      { permissionCode: "payment:export", description: "Export payment records" },
      { permissionCode: "invoice:read", description: "View invoices" },
      { permissionCode: "invoice:write", description: "Create/update invoices" },
      { permissionCode: "invoice:delete", description: "Delete/void invoices" },
      { permissionCode: "invoice:waive", description: "Waive fees/charges" },
      { permissionCode: "fee:read", description: "View fee schedules" },
      { permissionCode: "fee:write", description: "Manage fee schedules" },

      // Enforcement Module
      { permissionCode: "enforcement:read", description: "View enforcement cases" },
      { permissionCode: "enforcement:write", description: "Create/update cases" },
      { permissionCode: "enforcement:assign", description: "Assign cases to officers" },
      { permissionCode: "enforcement:close", description: "Close cases" },
      { permissionCode: "complaint:read", description: "View complaints" },
      { permissionCode: "complaint:write", description: "Create/update complaints" },
      { permissionCode: "complaint:assign", description: "Assign complaints" },
      { permissionCode: "notice:read", description: "View notices" },
      { permissionCode: "notice:write", description: "Issue notices" },
      { permissionCode: "notice:approve", description: "Approve notices" },

      // Services Module
      { permissionCode: "service:read", description: "View service catalogue" },
      { permissionCode: "service:write", description: "Manage service catalogue" },
      { permissionCode: "service:activate", description: "Activate/deactivate services" },
      { permissionCode: "workflow:read", description: "View workflows" },
      { permissionCode: "workflow:write", description: "Manage workflows" },

      // Administration Module
      { permissionCode: "user:read", description: "View users" },
      { permissionCode: "user:write", description: "Create/update users" },
      { permissionCode: "user:delete", description: "Delete users" },
      { permissionCode: "user:activate", description: "Activate/deactivate users" },
      { permissionCode: "role:read", description: "View roles" },
      { permissionCode: "role:write", description: "Create/update roles" },
      { permissionCode: "role:assign", description: "Assign roles to users" },
      { permissionCode: "permission:read", description: "View permissions" },
      { permissionCode: "permission:assign", description: "Assign permissions to roles" },
      { permissionCode: "audit:read", description: "View audit logs" },
      { permissionCode: "audit:export", description: "Export audit logs" },
      { permissionCode: "config:read", description: "View configuration" },
      { permissionCode: "config:write", description: "Modify configuration" },

      // Security Module
      { permissionCode: "breakglass:use", description: "Use break-glass emergency access" },
      { permissionCode: "breakglass:review", description: "Review break-glass access logs" },
      { permissionCode: "breakglass:approve", description: "Approve break-glass requests" },

      // Reporting Module
      { permissionCode: "report:read", description: "View reports" },
      { permissionCode: "report:create", description: "Create custom reports" },
      { permissionCode: "report:export", description: "Export reports" },
      { permissionCode: "dashboard:read", description: "View dashboards" },
      { permissionCode: "analytics:read", description: "Access analytics" },

      // GIS Module
      { permissionCode: "gis:read", description: "View GIS maps and layers" },
      { permissionCode: "gis:write", description: "Edit GIS data" },
      { permissionCode: "gis:export", description: "Export GIS data" }
    ];

    await db.insert(permissions).values(permissionsData).onConflictDoNothing();

    console.log(`✅ Created ${permissionsData.length} permissions`);

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
      passwordHash: await hashPassword("admin123"),
      status: "active",
      mfaEnabled: false,
    }).returning();

    const [officerUser] = await db.insert(users).values({
      councilId: ncdc.councilId,
      unitId: licensingUnit.unitId,
      fullName: "John Kila",
      email: "jkila@ncdc.gov.pg",
      phone: "+675 7234 5678",
      passwordHash: await hashPassword("officer123"),
      status: "active",
      mfaEnabled: false,
    }).returning();

    const [managerUser] = await db.insert(users).values({
      councilId: ncdc.councilId,
      unitId: licensingUnit.unitId,
      fullName: "Mary Wilson",
      email: "mwilson@ncdc.gov.pg",
      phone: "+675 7234 9012",
      passwordHash: await hashPassword("manager123"),
      status: "active",
      mfaEnabled: true,
    }).returning();

    const [inspectorUser] = await db.insert(users).values({
      councilId: ncdc.councilId,
      unitId: licensingUnit.unitId,
      fullName: "Peter Tau",
      email: "ptau@ncdc.gov.pg",
      phone: "+675 7234 3456",
      passwordHash: await hashPassword("inspector123"),
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
      { userId: managerUser.userId, roleId: managerRole.roleId },
      { userId: inspectorUser.userId, roleId: inspectorRole.roleId },
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

    const servicesList = await db.insert(services).values([
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
      {
        councilId: ncdc.councilId,
        code: "ENV-EIA",
        name: "Environmental Impact Assessment",
        category: "environment",
        description: "Assessment of environmental impacts for major projects",
        requiresInspection: true,
        requiresApproval: true,
        active: true,
      },
      {
        councilId: ncdc.councilId,
        code: "ENV-WASTE",
        name: "Waste Audit",
        category: "environment",
        description: "Audit of waste management facilities",
        requiresInspection: true,
        requiresApproval: true,
        active: true,
      },
      {
        councilId: ncdc.councilId,
        code: "ENV-WATER",
        name: "Water Quality Investigation",
        category: "environment",
        description: "Investigation of water quality in local water bodies",
        requiresInspection: true,
        requiresApproval: true,
        active: true,
      },
    ]).returning();

    const envEIA = servicesList.find(s => s.code === "ENV-EIA")!;
    const envWaste = servicesList.find(s => s.code === "ENV-WASTE")!;
    const envWater = servicesList.find(s => s.code === "ENV-WATER")!;

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

    // ================================
    // ASSETS & FACILITIES
    // ================================
    await db.insert(assets).values([
      {
        councilId: ncdc.councilId,
        assetNo: "AST-001",
        name: "Boroko Market Stall Block A",
        type: "market_facility",
        location: "Boroko",
        condition: "good",
        value: "PGK 15,000",
        status: "active",
      },
      {
        councilId: ncdc.councilId,
        assetNo: "AST-002",
        name: "Konedobu Council Depot",
        type: "building",
        location: "Konedobu",
        condition: "fair",
        value: "PGK 2,500,000",
        status: "active",
      },
      {
        councilId: ncdc.councilId,
        assetNo: "AST-003",
        name: "Toyota Hilux Fleet #4",
        type: "vehicle",
        location: "City Hall Garage",
        condition: "excellent",
        value: "PGK 120,000",
        status: "active",
      },
      {
        councilId: ncdc.councilId,
        assetNo: "AST-004",
        name: "Waigani Community Hall",
        type: "building",
        location: "Waigani",
        condition: "good",
        value: "PGK 850,000",
        status: "active",
      },
    ]);

    console.log("✅ Seeded assets");

    // ================================
    // LICENSE TYPES
    // ================================
    console.log("Creating license types...");
    const licenseTypeMap = new Map<string, string>();

    for (const lt of licenseTypesData) {
      const [inserted] = await db.insert(licenseTypes).values({
        licenseName: lt.licenseName,
        licenseCategory: lt.licenseCategory,
        applicationForm: lt.applicationForm,
        description: lt.description,
      }).returning();
      licenseTypeMap.set(lt.licenseName, inserted.id);
    }
    console.log(`✅ Created ${licenseTypeMap.size} license types`);

    // ================================
    // CHECKLIST REQUIREMENTS
    // ================================
    console.log("Creating checklist requirements...");
    for (const req of checklistRequirementsData) {
      const licenseTypeId = licenseTypeMap.get(req.licenseName);
      if (licenseTypeId) {
        await db.insert(checklistRequirements).values({
          licenseTypeId: licenseTypeId,
          itemNumber: req.itemNumber,
          documentName: req.documentName,
          responsibleEntity: req.responsibleEntity,
          requirementNote: req.requirementNote,
        });
      }
    }
    console.log("✅ Created checklist requirements");

    // ================================
    // SPECIAL REQUIREMENTS
    // ================================
    console.log("Creating special requirements...");
    for (const req of specialRequirementsData) {
      const licenseTypeId = licenseTypeMap.get(req.licenseName);
      if (licenseTypeId) {
        await db.insert(specialRequirements).values({
          licenseTypeId: licenseTypeId,
          requirementName: req.requirementName,
          issuingAuthority: req.issuingAuthority,
          description: req.description,
        });
      }
    }
    console.log("✅ Created special requirements");

    // ================================
    // ENVIRONMENTAL SERVICE REQUESTS
    // ================================
    console.log("Creating environmental assessments...");
    await db.insert(serviceRequests).values([
      {
        councilId: ncdc.councilId,
        serviceId: envEIA.serviceId,
        requesterType: "business",
        requesterId: biz1.businessId,
        status: "processing",
        requestRef: "EIA-2026-001",
        formData: { projectName: "Harbour City Expansion", assessmentType: "Impact Assessment" },
        submittedAt: new Date("2026-01-18"),
      },
      {
        councilId: ncdc.councilId,
        serviceId: envWaste.serviceId,
        requesterType: "business",
        requesterId: biz2.businessId,
        status: "approved",
        requestRef: "ENV-2026-042",
        formData: { projectName: "Tuanaimato Industrial", assessmentType: "Waste Audit" },
        submittedAt: new Date("2026-01-15"),
      },
      {
        councilId: ncdc.councilId,
        serviceId: envWater.serviceId,
        requesterType: "citizen",
        requesterId: citizen1.citizenId,
        status: "submitted",
        requestRef: "INV-2026-009",
        formData: { projectName: "River Water Quality", assessmentType: "Investigation" },
        submittedAt: new Date("2026-01-12"),
      },
    ]);
    console.log("✅ Seeded environmental assessments");

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
    console.log("   - 4 Assets");

  } catch (error) {
    console.error("❌ Seeding failed:", error);
    throw error;
  }
}

seed()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
