// Seed initial data for testing and demonstration
import { storage } from "./storage";

async function seed() {
  console.log("🌱 Seeding database...");

  try {
    // Create default organization (NCDC)
    const ncdc = await storage.createOrganization({
      name: "National Capital District Commission",
      type: "City",
      district: "Port Moresby",
      province: "National Capital District",
      country: "Papua New Guinea",
      contactEmail: "info@ncdc.gov.pg",
      contactPhone: "+675 325 6400",
      address: "Waigani Drive, Port Moresby, NCD",
    });

    console.log("✅ Created organization:", ncdc.name);

    // Seed some citizens
    await storage.createCitizen({
      organizationId: ncdc.id,
      nidNumber: "NID-2024-00123",
      fullName: "Michael Kila",
      dateOfBirth: "1985-03-15",
      gender: "Male",
      phone: "+675 7234 5678",
      email: "mkila@email.pg",
      address: "Section 45, Lot 12, Boroko",
      village: "Hanuabada",
      province: "Central Province",
      district: "Port Moresby",
    });

    await storage.createCitizen({
      organizationId: ncdc.id,
      nidNumber: "NID-2024-00456",
      fullName: "Sarah Toua",
      dateOfBirth: "1992-07-22",
      gender: "Female",
      phone: "+675 7345 6789",
      email: "stoua@email.pg",
      address: "Section 12, Lot 8, Gordons",
      province: "NCD",
      district: "Port Moresby",
    });

    console.log("✅ Seeded 2 citizens");

    // Seed businesses
    const papindo = await storage.createBusiness({
      organizationId: ncdc.id,
      registrationNumber: "BIZ-2020-0045",
      businessName: "Papindo Trading Limited",
      tradingAs: "Papindo Supermarket",
      businessType: "Company",
      industry: "Retail",
      ipaRegistration: "IPA-45678",
      tinNumber: "TIN-987654321",
      ownerName: "John Kamaso",
      contactPhone: "+675 325 1234",
      contactEmail: "info@papindo.pg",
      physicalAddress: "Section 32, Lot 5, Gordons",
      section: "32",
      lot: "5",
      suburb: "Gordons",
      status: "Active",
    });

    await storage.createBusiness({
      organizationId: ncdc.id,
      registrationNumber: "BIZ-2021-0112",
      businessName: "City Pharmacy PNG",
      tradingAs: "City Pharmacy Waigani",
      businessType: "Company",
      industry: "Healthcare",
      ipaRegistration: "IPA-78901",
      tinNumber: "TIN-123456789",
      ownerName: "Maria Santos",
      contactPhone: "+675 325 5678",
      contactEmail: "waigani@citypharmacy.pg",
      physicalAddress: "Section 14, Lot 22, Waigani",
      section: "14",
      lot: "22",
      suburb: "Waigani",
      status: "Active",
    });

    console.log("✅ Seeded 2 businesses");

    // Seed properties
    await storage.createProperty({
      organizationId: ncdc.id,
      parcelId: "POM-SEC32-LOT5",
      section: "32",
      lot: "5",
      suburb: "Gordons",
      district: "Port Moresby",
      landType: "State Lease",
      titleNumber: "VOL-45-FOL-789",
      ownerName: "Papindo Trading Limited",
      ownerType: "Business",
      landArea: "1,200 sqm",
      zoning: "Commercial",
      rateableValue: "450000",
      coordinates: "-9.478,147.155",
      status: "Active",
    });

    await storage.createProperty({
      organizationId: ncdc.id,
      parcelId: "POM-SEC14-LOT22",
      section: "14",
      lot: "22",
      suburb: "Waigani",
      district: "Port Moresby",
      landType: "State Lease",
      titleNumber: "VOL-14-FOL-222",
      ownerName: "City Pharmacy PNG",
      ownerType: "Business",
      landArea: "800 sqm",
      zoning: "Commercial",
      rateableValue: "380000",
      coordinates: "-9.445,147.180",
      status: "Active",
    });

    console.log("✅ Seeded 2 properties");

    // Seed license application
    const app1 = await storage.createLicenseApplication({
      organizationId: ncdc.id,
      applicationNumber: "APP-2025-001",
      applicantName: "John Kamaso",
      applicantType: "Business",
      applicantNid: "NID-2020-05678",
      applicantPhone: "+675 325 1234",
      applicantEmail: "info@papindo.pg",
      licenseType: "Trading License",
      businessName: "Papindo Trading Limited",
      businessAddress: "Section 32, Lot 5, Gordons",
      section: "32",
      lot: "5",
      suburb: "Gordons",
      parcelId: "POM-SEC32-LOT5",
      licenseClass: "Class A - General Merchandise",
      description: "Trading license for retail supermarket operations",
      status: "Approved",
      submittedAt: new Date("2025-01-10"),
      approvedAt: new Date("2025-01-12"),
      approvedBy: "officer-001",
      reviewNotes: "All documentation complete. Business premises inspected and approved.",
      documents: null,
    });

    console.log("✅ Seeded 1 license application");

    // Seed license
    await storage.createLicense({
      organizationId: ncdc.id,
      applicationId: app1.id,
      licenseNumber: "LIC-2025-001",
      holderName: "John Kamaso",
      holderType: "Business",
      businessName: "Papindo Trading Limited",
      licenseType: "Trading License",
      licenseClass: "Class A",
      issueDate: "2025-01-15",
      expiryDate: "2026-01-15",
      annualFee: "500.00",
      status: "Active",
      location: "Gordons, Port Moresby",
      conditions: "Must display license prominently at business premises",
    });

    console.log("✅ Seeded 1 license");

    // Seed inspections
    await storage.createInspection({
      organizationId: ncdc.id,
      inspectionNumber: "INS-2025-001",
      entityName: "Papindo Trading Limited",
      entityType: "Business",
      inspectionType: "Health & Safety",
      scheduledDate: "2025-02-15",
      inspector: "Officer Kila",
      inspectorId: "officer-002",
      status: "Scheduled",
      riskLevel: "Medium",
      followUpRequired: false,
      documents: null,
    });

    await storage.createInspection({
      organizationId: ncdc.id,
      inspectionNumber: "INS-2025-002",
      entityName: "City Pharmacy Waigani",
      entityType: "Business",
      inspectionType: "License Compliance",
      scheduledDate: "2025-01-14",
      completedDate: "2025-01-14",
      inspector: "Officer John",
      inspectorId: "officer-003",
      status: "Completed",
      result: "Pass",
      riskLevel: "Low",
      findings: "All compliance requirements met. Pharmacy license valid and displayed.",
      recommendations: "Continue maintaining high standards",
      followUpRequired: false,
      documents: null,
    });

    console.log("✅ Seeded 2 inspections");

    // Seed enforcement case
    await storage.createEnforcementCase({
      organizationId: ncdc.id,
      caseNumber: "ENF-2025-015",
      offenderName: "Unauthorized Street Vendor",
      offenderType: "Individual",
      offence: "Trading without a license",
      offenceCategory: "Trading",
      location: "Boroko Market Area",
      incidentDate: "2025-01-10",
      reportedDate: "2025-01-10",
      reportedBy: "Market Inspector",
      officer: "Officer Toea",
      officerId: "officer-004",
      status: "Open",
      severity: "Moderate",
      penaltyIssued: true,
      penaltyAmount: "200.00",
      penaltyStatus: "Unpaid",
      notes: "Vendor operating without proper trading license. Goods confiscated pending resolution.",
      documents: null,
    });

    console.log("✅ Seeded 1 enforcement case");

    // Seed complaints
    await storage.createComplaint({
      organizationId: ncdc.id,
      complaintNumber: "CMP-2025-056",
      reporterName: "Anonymous Resident",
      reporterPhone: "+675 7111 2222",
      anonymous: true,
      category: "Noise Pollution",
      priority: "Medium",
      subject: "Excessive noise from nightclub",
      description: "Loud music and noise disturbances from nightclub operating past permitted hours in Boroko area.",
      location: "Boroko - Near Boroko Foodworld",
      status: "Under Investigation",
      assignedTo: "officer-005",
      assignedOfficer: "Officer Sela",
      acknowledgedAt: new Date("2025-01-11"),
      internalNotes: "Scheduled site visit for Friday evening to verify complaint",
    });

    console.log("✅ Seeded 1 complaint");

    // Seed invoices
    await storage.createInvoice({
      organizationId: ncdc.id,
      invoiceNumber: "INV-2025-001",
      recipientName: "Steamships Trading Company",
      recipientType: "Business",
      description: "Annual Property Rates 2025",
      category: "Property Rates",
      amount: "25000.00",
      currency: "PGK",
      issueDate: "2025-01-01",
      dueDate: "2025-02-01",
      status: "Unpaid",
      notes: "Property rates for commercial building at Waigani",
    });

    await storage.createInvoice({
      organizationId: ncdc.id,
      invoiceNumber: "INV-2025-002",
      recipientName: "John Kamaso",
      recipientType: "Individual",
      description: "Trading License Renewal",
      category: "License Fee",
      amount: "500.00",
      currency: "PGK",
      issueDate: "2025-01-10",
      dueDate: "2025-01-15",
      status: "Paid",
      paidDate: "2025-01-14",
      paymentMethod: "Bank Transfer",
      paymentReference: "BSP-TXN-789456",
    });

    console.log("✅ Seeded 2 invoices");

    // Seed transactions
    await storage.createTransaction({
      organizationId: ncdc.id,
      transactionNumber: "TRX-8893",
      payerName: "John Kamaso",
      transactionType: "Payment",
      category: "Trading License",
      amount: "500.00",
      currency: "PGK",
      paymentMethod: "Bank Transfer",
      paymentReference: "BSP-TXN-789456",
      transactionDate: "2025-01-14",
      status: "Completed",
      notes: "Payment for trading license renewal",
    });

    await storage.createTransaction({
      organizationId: ncdc.id,
      transactionNumber: "TRX-8892",
      payerName: "Steamships Trading",
      transactionType: "Payment",
      category: "Property Rates",
      amount: "12500.00",
      currency: "PGK",
      paymentMethod: "Cash",
      paymentReference: "CASH-001234",
      transactionDate: "2025-01-13",
      status: "Completed",
      notes: "Partial payment for property rates",
    });

    console.log("✅ Seeded 2 transactions");

    console.log("🎉 Database seeded successfully!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    throw error;
  }
}

seed()
  .then(() => {
    console.log("Seeding complete. Exiting...");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
  });
