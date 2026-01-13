import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertOrganizationSchema, insertCitizenSchema, insertBusinessSchema,
  insertPropertySchema, insertLicenseApplicationSchema, insertLicenseSchema,
  insertInspectionSchema, insertEnforcementCaseSchema, insertComplaintSchema,
  insertInvoiceSchema, insertTransactionSchema, insertAuditLogSchema
} from "@shared/schema";

// Helper to log audit trail
async function logAudit(
  userId: string | undefined,
  userName: string,
  action: string,
  resourceType: string,
  resourceId: string | undefined,
  resourceName: string | undefined,
  organizationId?: string,
) {
  try {
    await storage.createAuditLog({
      userId,
      userName,
      action,
      resourceType,
      resourceId,
      resourceName,
      organizationId,
      ipAddress: "system",
      userAgent: "api",
      changes: null,
    });
  } catch (error) {
    console.error("Audit log error:", error);
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Organizations
  app.get("/api/organizations", async (req, res) => {
    try {
      const orgs = await storage.listOrganizations();
      res.json(orgs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch organizations" });
    }
  });

  app.post("/api/organizations", async (req, res) => {
    try {
      const data = insertOrganizationSchema.parse(req.body);
      const org = await storage.createOrganization(data);
      await logAudit(undefined, "System", "Created", "Organization", org.id, org.name);
      res.status(201).json(org);
    } catch (error) {
      res.status(400).json({ error: "Invalid organization data" });
    }
  });

  // Citizens
  app.get("/api/citizens", async (req, res) => {
    try {
      const { organizationId } = req.query;
      if (!organizationId || typeof organizationId !== "string") {
        return res.status(400).json({ error: "organizationId required" });
      }
      const citizens = await storage.listCitizens(organizationId);
      res.json(citizens);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch citizens" });
    }
  });

  app.post("/api/citizens", async (req, res) => {
    try {
      const data = insertCitizenSchema.parse(req.body);
      const citizen = await storage.createCitizen(data);
      await logAudit(undefined, "Officer", "Created", "Citizen", citizen.id, citizen.fullName, data.organizationId);
      res.status(201).json(citizen);
    } catch (error) {
      res.status(400).json({ error: "Invalid citizen data" });
    }
  });

  app.patch("/api/citizens/:id", async (req, res) => {
    try {
      const citizen = await storage.updateCitizen(req.params.id, req.body);
      await logAudit(undefined, "Officer", "Updated", "Citizen", citizen.id, citizen.fullName);
      res.json(citizen);
    } catch (error) {
      res.status(400).json({ error: "Failed to update citizen" });
    }
  });

  // Businesses
  app.get("/api/businesses", async (req, res) => {
    try {
      const { organizationId } = req.query;
      if (!organizationId || typeof organizationId !== "string") {
        return res.status(400).json({ error: "organizationId required" });
      }
      const businesses = await storage.listBusinesses(organizationId);
      res.json(businesses);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch businesses" });
    }
  });

  app.post("/api/businesses", async (req, res) => {
    try {
      const data = insertBusinessSchema.parse(req.body);
      const business = await storage.createBusiness(data);
      await logAudit(undefined, "Officer", "Created", "Business", business.id, business.businessName, data.organizationId);
      res.status(201).json(business);
    } catch (error) {
      res.status(400).json({ error: "Invalid business data" });
    }
  });

  app.patch("/api/businesses/:id", async (req, res) => {
    try {
      const business = await storage.updateBusiness(req.params.id, req.body);
      await logAudit(undefined, "Officer", "Updated", "Business", business.id, business.businessName);
      res.json(business);
    } catch (error) {
      res.status(400).json({ error: "Failed to update business" });
    }
  });

  // Properties
  app.get("/api/properties", async (req, res) => {
    try {
      const { organizationId } = req.query;
      if (!organizationId || typeof organizationId !== "string") {
        return res.status(400).json({ error: "organizationId required" });
      }
      const properties = await storage.listProperties(organizationId);
      res.json(properties);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch properties" });
    }
  });

  app.get("/api/properties/:id", async (req, res) => {
    try {
      const property = await storage.getProperty(req.params.id);
      if (!property) {
        return res.status(404).json({ error: "Property not found" });
      }
      res.json(property);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch property" });
    }
  });

  app.post("/api/properties", async (req, res) => {
    try {
      const data = insertPropertySchema.parse(req.body);
      const property = await storage.createProperty(data);
      await logAudit(undefined, "Officer", "Created", "Property", property.id, property.parcelId, data.organizationId);
      res.status(201).json(property);
    } catch (error) {
      res.status(400).json({ error: "Invalid property data" });
    }
  });

  app.patch("/api/properties/:id", async (req, res) => {
    try {
      const property = await storage.updateProperty(req.params.id, req.body);
      await logAudit(undefined, "Officer", "Updated", "Property", property.id, property.parcelId);
      res.json(property);
    } catch (error) {
      res.status(400).json({ error: "Failed to update property" });
    }
  });

  // License Applications
  app.get("/api/license-applications", async (req, res) => {
    try {
      const { organizationId } = req.query;
      if (!organizationId || typeof organizationId !== "string") {
        return res.status(400).json({ error: "organizationId required" });
      }
      const applications = await storage.listLicenseApplications(organizationId);
      res.json(applications);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch applications" });
    }
  });

  app.get("/api/license-applications/:id", async (req, res) => {
    try {
      const application = await storage.getLicenseApplication(req.params.id);
      if (!application) {
        return res.status(404).json({ error: "Application not found" });
      }
      res.json(application);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch application" });
    }
  });

  app.post("/api/license-applications", async (req, res) => {
    try {
      const data = insertLicenseApplicationSchema.parse(req.body);
      const application = await storage.createLicenseApplication(data);
      await logAudit(undefined, "Applicant", "Created", "LicenseApplication", application.id, application.applicationNumber, data.organizationId);
      res.status(201).json(application);
    } catch (error) {
      res.status(400).json({ error: "Invalid application data" });
    }
  });

  app.patch("/api/license-applications/:id", async (req, res) => {
    try {
      const application = await storage.updateLicenseApplication(req.params.id, req.body);
      await logAudit(undefined, "Officer", "Updated", "LicenseApplication", application.id, application.applicationNumber);
      res.json(application);
    } catch (error) {
      res.status(400).json({ error: "Failed to update application" });
    }
  });

  // Licenses
  app.get("/api/licenses", async (req, res) => {
    try {
      const { organizationId } = req.query;
      if (!organizationId || typeof organizationId !== "string") {
        return res.status(400).json({ error: "organizationId required" });
      }
      const licenses = await storage.listLicenses(organizationId);
      res.json(licenses);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch licenses" });
    }
  });

  app.post("/api/licenses", async (req, res) => {
    try {
      const data = insertLicenseSchema.parse(req.body);
      const license = await storage.createLicense(data);
      await logAudit(undefined, "Officer", "Issued", "License", license.id, license.licenseNumber, data.organizationId);
      res.status(201).json(license);
    } catch (error) {
      res.status(400).json({ error: "Invalid license data" });
    }
  });

  app.patch("/api/licenses/:id", async (req, res) => {
    try {
      const license = await storage.updateLicense(req.params.id, req.body);
      await logAudit(undefined, "Officer", "Updated", "License", license.id, license.licenseNumber);
      res.json(license);
    } catch (error) {
      res.status(400).json({ error: "Failed to update license" });
    }
  });

  // Inspections
  app.get("/api/inspections", async (req, res) => {
    try {
      const { organizationId } = req.query;
      if (!organizationId || typeof organizationId !== "string") {
        return res.status(400).json({ error: "organizationId required" });
      }
      const inspections = await storage.listInspections(organizationId);
      res.json(inspections);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch inspections" });
    }
  });

  app.post("/api/inspections", async (req, res) => {
    try {
      const data = insertInspectionSchema.parse(req.body);
      const inspection = await storage.createInspection(data);
      await logAudit(undefined, "Officer", "Created", "Inspection", inspection.id, inspection.inspectionNumber, data.organizationId);
      res.status(201).json(inspection);
    } catch (error) {
      res.status(400).json({ error: "Invalid inspection data" });
    }
  });

  app.patch("/api/inspections/:id", async (req, res) => {
    try {
      const inspection = await storage.updateInspection(req.params.id, req.body);
      await logAudit(undefined, "Officer", "Updated", "Inspection", inspection.id, inspection.inspectionNumber);
      res.json(inspection);
    } catch (error) {
      res.status(400).json({ error: "Failed to update inspection" });
    }
  });

  // Enforcement Cases
  app.get("/api/enforcement-cases", async (req, res) => {
    try {
      const { organizationId } = req.query;
      if (!organizationId || typeof organizationId !== "string") {
        return res.status(400).json({ error: "organizationId required" });
      }
      const cases = await storage.listEnforcementCases(organizationId);
      res.json(cases);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch enforcement cases" });
    }
  });

  app.post("/api/enforcement-cases", async (req, res) => {
    try {
      const data = insertEnforcementCaseSchema.parse(req.body);
      const enfCase = await storage.createEnforcementCase(data);
      await logAudit(undefined, "Officer", "Created", "EnforcementCase", enfCase.id, enfCase.caseNumber, data.organizationId);
      res.status(201).json(enfCase);
    } catch (error) {
      res.status(400).json({ error: "Invalid enforcement case data" });
    }
  });

  app.patch("/api/enforcement-cases/:id", async (req, res) => {
    try {
      const enfCase = await storage.updateEnforcementCase(req.params.id, req.body);
      await logAudit(undefined, "Officer", "Updated", "EnforcementCase", enfCase.id, enfCase.caseNumber);
      res.json(enfCase);
    } catch (error) {
      res.status(400).json({ error: "Failed to update enforcement case" });
    }
  });

  // Complaints
  app.get("/api/complaints", async (req, res) => {
    try {
      const { organizationId } = req.query;
      if (!organizationId || typeof organizationId !== "string") {
        return res.status(400).json({ error: "organizationId required" });
      }
      const complaints = await storage.listComplaints(organizationId);
      res.json(complaints);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch complaints" });
    }
  });

  app.post("/api/complaints", async (req, res) => {
    try {
      const data = insertComplaintSchema.parse(req.body);
      const complaint = await storage.createComplaint(data);
      await logAudit(undefined, "System", "Created", "Complaint", complaint.id, complaint.complaintNumber, data.organizationId);
      res.status(201).json(complaint);
    } catch (error) {
      res.status(400).json({ error: "Invalid complaint data" });
    }
  });

  app.patch("/api/complaints/:id", async (req, res) => {
    try {
      const complaint = await storage.updateComplaint(req.params.id, req.body);
      await logAudit(undefined, "Officer", "Updated", "Complaint", complaint.id, complaint.complaintNumber);
      res.json(complaint);
    } catch (error) {
      res.status(400).json({ error: "Failed to update complaint" });
    }
  });

  // Invoices
  app.get("/api/invoices", async (req, res) => {
    try {
      const { organizationId } = req.query;
      if (!organizationId || typeof organizationId !== "string") {
        return res.status(400).json({ error: "organizationId required" });
      }
      const invoices = await storage.listInvoices(organizationId);
      res.json(invoices);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch invoices" });
    }
  });

  app.post("/api/invoices", async (req, res) => {
    try {
      const data = insertInvoiceSchema.parse(req.body);
      const invoice = await storage.createInvoice(data);
      await logAudit(undefined, "Officer", "Created", "Invoice", invoice.id, invoice.invoiceNumber, data.organizationId);
      res.status(201).json(invoice);
    } catch (error) {
      res.status(400).json({ error: "Invalid invoice data" });
    }
  });

  app.patch("/api/invoices/:id", async (req, res) => {
    try {
      const invoice = await storage.updateInvoice(req.params.id, req.body);
      await logAudit(undefined, "Officer", "Updated", "Invoice", invoice.id, invoice.invoiceNumber);
      res.json(invoice);
    } catch (error) {
      res.status(400).json({ error: "Failed to update invoice" });
    }
  });

  // Transactions
  app.get("/api/transactions", async (req, res) => {
    try {
      const { organizationId } = req.query;
      if (!organizationId || typeof organizationId !== "string") {
        return res.status(400).json({ error: "organizationId required" });
      }
      const transactions = await storage.listTransactions(organizationId);
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch transactions" });
    }
  });

  app.post("/api/transactions", async (req, res) => {
    try {
      const data = insertTransactionSchema.parse(req.body);
      const transaction = await storage.createTransaction(data);
      await logAudit(undefined, "Officer", "Created", "Transaction", transaction.id, transaction.transactionNumber, data.organizationId);
      res.status(201).json(transaction);
    } catch (error) {
      res.status(400).json({ error: "Invalid transaction data" });
    }
  });

  // Audit Logs
  app.get("/api/audit-logs", async (req, res) => {
    try {
      const { organizationId } = req.query;
      const logs = await storage.listAuditLogs(organizationId as string | undefined);
      res.json(logs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch audit logs" });
    }
  });

  return httpServer;
}
