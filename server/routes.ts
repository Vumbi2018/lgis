import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertCouncilSchema, insertCitizenSchema, insertBusinessSchema,
  insertPropertySchema, insertServiceSchema, insertServiceRequestSchema,
  insertInspectionSchema, insertInvoiceSchema, insertPaymentSchema,
  insertLicenceSchema, insertMarketSchema, insertStallSchema,
  insertComplaintSchema, insertEnforcementCaseSchema, insertNoticeSchema,
  insertAuditLogSchema
} from "@shared/schema";

async function logAudit(
  councilId: string,
  userId: string | undefined,
  action: string,
  entityType: string,
  entityId: string | undefined,
  beforeState?: any,
  afterState?: any,
  ipAddress?: string
) {
  try {
    await storage.createAuditLog({
      councilId,
      userId,
      action,
      entityType,
      entityId,
      beforeState,
      afterState,
      ipAddress: ipAddress || "system",
    });
  } catch (error) {
    console.error("Audit log error:", error);
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // ================================
  // COUNCILS
  // ================================
  app.get("/api/v1/councils", async (req, res) => {
    try {
      const data = await storage.getCouncils();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch councils" });
    }
  });

  app.get("/api/v1/councils/:councilId", async (req, res) => {
    try {
      const council = await storage.getCouncilById(req.params.councilId);
      if (!council) {
        return res.status(404).json({ error: "Council not found" });
      }
      res.json(council);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch council" });
    }
  });

  app.post("/api/v1/councils", async (req, res) => {
    try {
      const data = insertCouncilSchema.parse(req.body);
      const council = await storage.createCouncil(data);
      res.status(201).json(council);
    } catch (error) {
      res.status(400).json({ error: "Invalid council data" });
    }
  });

  // Legacy endpoint for backwards compatibility
  app.get("/api/organizations", async (req, res) => {
    try {
      const councils = await storage.getCouncils();
      const orgs = councils.map(c => ({
        id: c.councilId,
        name: c.name,
        type: c.level,
        status: c.status,
        createdAt: c.createdAt
      }));
      res.json(orgs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch organizations" });
    }
  });

  // Legacy councils endpoint for frontend compatibility
  app.get("/api/councils", async (req, res) => {
    try {
      const data = await storage.getCouncils();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch councils" });
    }
  });

  // ================================
  // CITIZENS
  // ================================
  app.get("/api/v1/citizens", async (req, res) => {
    try {
      const councilId = req.headers["x-council-id"] as string || req.query.councilId as string;
      const data = await storage.getCitizens(councilId);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch citizens" });
    }
  });

  app.get("/api/v1/citizens/:citizenId", async (req, res) => {
    try {
      const citizen = await storage.getCitizenById(req.params.citizenId);
      if (!citizen) {
        return res.status(404).json({ error: "Citizen not found" });
      }
      res.json(citizen);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch citizen" });
    }
  });

  app.post("/api/v1/citizens", async (req, res) => {
    try {
      const data = insertCitizenSchema.parse(req.body);
      const citizen = await storage.createCitizen(data);
      await logAudit(data.councilId, undefined, "create", "citizen", citizen.citizenId, null, citizen);
      res.status(201).json(citizen);
    } catch (error) {
      console.error("Create citizen error:", error);
      res.status(400).json({ error: "Invalid citizen data" });
    }
  });

  // Legacy endpoint - returns new schema format for updated frontend
  app.get("/api/citizens", async (req, res) => {
    try {
      const councilId = req.query.organizationId as string || req.query.councilId as string;
      const citizens = await storage.getCitizens(councilId);
      res.json(citizens);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch citizens" });
    }
  });

  app.post("/api/citizens", async (req, res) => {
    try {
      const { organizationId, fullName, nidNumber, ...rest } = req.body;
      const names = (fullName || "").split(" ");
      const firstName = names[0] || "";
      const lastName = names.slice(1).join(" ") || "";
      const data = {
        councilId: organizationId,
        firstName,
        lastName,
        nationalId: nidNumber,
        ...rest
      };
      const citizen = await storage.createCitizen(data);
      res.status(201).json({
        id: citizen.citizenId,
        fullName: `${citizen.firstName} ${citizen.lastName}`,
        ...citizen
      });
    } catch (error) {
      console.error("Create citizen error:", error);
      res.status(400).json({ error: "Invalid citizen data" });
    }
  });

  // ================================
  // BUSINESSES
  // ================================
  app.get("/api/v1/businesses", async (req, res) => {
    try {
      const councilId = req.headers["x-council-id"] as string || req.query.councilId as string;
      const data = await storage.getBusinesses(councilId);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch businesses" });
    }
  });

  app.get("/api/v1/businesses/:businessId", async (req, res) => {
    try {
      const business = await storage.getBusinessById(req.params.businessId);
      if (!business) {
        return res.status(404).json({ error: "Business not found" });
      }
      res.json(business);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch business" });
    }
  });

  app.post("/api/v1/businesses", async (req, res) => {
    try {
      const data = insertBusinessSchema.parse(req.body);
      const business = await storage.createBusiness(data);
      await logAudit(data.councilId, undefined, "create", "business", business.businessId, null, business);
      res.status(201).json(business);
    } catch (error) {
      res.status(400).json({ error: "Invalid business data" });
    }
  });

  // Legacy endpoint - returns new schema format for updated frontend
  app.get("/api/businesses", async (req, res) => {
    try {
      const councilId = req.query.organizationId as string || req.query.councilId as string;
      const businesses = await storage.getBusinesses(councilId);
      res.json(businesses);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch businesses" });
    }
  });

  app.post("/api/businesses", async (req, res) => {
    try {
      const { organizationId, businessName, tradingAs, tinNumber, registrationNumber, ...rest } = req.body;
      const data = {
        councilId: organizationId,
        legalName: businessName,
        tradingName: tradingAs,
        tin: tinNumber,
        registrationNo: registrationNumber,
        ...rest
      };
      const business = await storage.createBusiness(data);
      res.status(201).json({
        id: business.businessId,
        businessName: business.legalName,
        ...business
      });
    } catch (error) {
      res.status(400).json({ error: "Invalid business data" });
    }
  });

  // ================================
  // PROPERTIES
  // ================================
  app.get("/api/v1/properties", async (req, res) => {
    try {
      const councilId = req.headers["x-council-id"] as string || req.query.councilId as string;
      const data = await storage.getProperties(councilId);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch properties" });
    }
  });

  app.get("/api/v1/properties/:propertyId", async (req, res) => {
    try {
      const property = await storage.getPropertyById(req.params.propertyId);
      if (!property) {
        return res.status(404).json({ error: "Property not found" });
      }
      res.json(property);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch property" });
    }
  });

  app.post("/api/v1/properties", async (req, res) => {
    try {
      const data = insertPropertySchema.parse(req.body);
      const property = await storage.createProperty(data);
      await logAudit(data.councilId, undefined, "create", "property", property.propertyId, null, property);
      res.status(201).json(property);
    } catch (error) {
      res.status(400).json({ error: "Invalid property data" });
    }
  });

  // Legacy endpoint
  app.get("/api/properties", async (req, res) => {
    try {
      const councilId = req.query.organizationId as string || req.query.councilId as string;
      const properties = await storage.getProperties(councilId);
      res.json(properties);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch properties" });
    }
  });

  app.post("/api/properties", async (req, res) => {
    try {
      const { organizationId, ...rest } = req.body;
      const data = { councilId: organizationId, ...rest };
      const property = await storage.createProperty(data);
      res.status(201).json({ id: property.propertyId, ...property });
    } catch (error) {
      res.status(400).json({ error: "Invalid property data" });
    }
  });

  // ================================
  // SERVICES
  // ================================
  app.get("/api/v1/services", async (req, res) => {
    try {
      const councilId = req.headers["x-council-id"] as string || req.query.councilId as string;
      const data = await storage.getServices(councilId);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch services" });
    }
  });

  app.post("/api/v1/services", async (req, res) => {
    try {
      const data = insertServiceSchema.parse(req.body);
      const service = await storage.createService(data);
      res.status(201).json(service);
    } catch (error) {
      res.status(400).json({ error: "Invalid service data" });
    }
  });

  // ================================
  // SERVICE REQUESTS (replaces license applications)
  // ================================
  app.get("/api/v1/requests", async (req, res) => {
    try {
      const councilId = req.headers["x-council-id"] as string || req.query.councilId as string;
      const data = await storage.getServiceRequests(councilId);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch service requests" });
    }
  });

  app.get("/api/v1/requests/:requestId", async (req, res) => {
    try {
      const request = await storage.getServiceRequestById(req.params.requestId);
      if (!request) {
        return res.status(404).json({ error: "Service request not found" });
      }
      res.json(request);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch service request" });
    }
  });

  app.post("/api/v1/requests", async (req, res) => {
    try {
      const data = insertServiceRequestSchema.parse(req.body);
      const request = await storage.createServiceRequest(data);
      await logAudit(data.councilId, undefined, "create", "service_request", request.requestId, null, request);
      res.status(201).json(request);
    } catch (error) {
      res.status(400).json({ error: "Invalid service request data" });
    }
  });

  app.patch("/api/v1/requests/:requestId/status", async (req, res) => {
    try {
      const { status } = req.body;
      const request = await storage.updateServiceRequestStatus(req.params.requestId, status);
      if (!request) {
        return res.status(404).json({ error: "Service request not found" });
      }
      res.json(request);
    } catch (error) {
      res.status(400).json({ error: "Failed to update status" });
    }
  });

  // ================================
  // INSPECTIONS
  // ================================
  app.get("/api/v1/inspections", async (req, res) => {
    try {
      const councilId = req.headers["x-council-id"] as string || req.query.councilId as string;
      const data = await storage.getInspections(councilId);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch inspections" });
    }
  });

  app.post("/api/v1/inspections", async (req, res) => {
    try {
      const data = insertInspectionSchema.parse(req.body);
      const inspection = await storage.createInspection(data);
      await logAudit(data.councilId, undefined, "create", "inspection", inspection.inspectionId, null, inspection);
      res.status(201).json(inspection);
    } catch (error) {
      res.status(400).json({ error: "Invalid inspection data" });
    }
  });

  // Legacy endpoint
  app.get("/api/inspections", async (req, res) => {
    try {
      const councilId = req.query.organizationId as string;
      const inspections = await storage.getInspections(councilId);
      const mapped = inspections.map(i => ({
        id: i.inspectionId,
        organizationId: i.councilId,
        ...i
      }));
      res.json(mapped);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch inspections" });
    }
  });

  // ================================
  // INVOICES
  // ================================
  app.get("/api/v1/invoices", async (req, res) => {
    try {
      const councilId = req.headers["x-council-id"] as string || req.query.councilId as string;
      const data = await storage.getInvoices(councilId);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch invoices" });
    }
  });

  app.post("/api/v1/invoices", async (req, res) => {
    try {
      const data = insertInvoiceSchema.parse(req.body);
      const invoice = await storage.createInvoice(data);
      await logAudit(data.councilId, undefined, "create", "invoice", invoice.invoiceId, null, invoice);
      res.status(201).json(invoice);
    } catch (error) {
      res.status(400).json({ error: "Invalid invoice data" });
    }
  });

  // Legacy endpoint
  app.get("/api/invoices", async (req, res) => {
    try {
      const councilId = req.query.organizationId as string;
      const invoices = await storage.getInvoices(councilId);
      const mapped = invoices.map(i => ({
        id: i.invoiceId,
        invoiceNumber: i.invoiceNo,
        organizationId: i.councilId,
        ...i
      }));
      res.json(mapped);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch invoices" });
    }
  });

  // ================================
  // PAYMENTS
  // ================================
  app.get("/api/v1/payments", async (req, res) => {
    try {
      const councilId = req.headers["x-council-id"] as string || req.query.councilId as string;
      const data = await storage.getPayments(councilId);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch payments" });
    }
  });

  app.post("/api/v1/payments", async (req, res) => {
    try {
      const data = insertPaymentSchema.parse(req.body);
      const payment = await storage.createPayment(data);
      await logAudit(data.councilId, undefined, "create", "payment", payment.paymentId, null, payment);
      res.status(201).json(payment);
    } catch (error) {
      res.status(400).json({ error: "Invalid payment data" });
    }
  });

  // Legacy endpoint
  app.get("/api/transactions", async (req, res) => {
    try {
      const councilId = req.query.organizationId as string;
      const payments = await storage.getPayments(councilId);
      const mapped = payments.map(p => ({
        id: p.paymentId,
        transactionNumber: p.paymentRef,
        type: "payment",
        organizationId: p.councilId,
        ...p
      }));
      res.json(mapped);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch transactions" });
    }
  });

  // ================================
  // LICENCES
  // ================================
  app.get("/api/v1/licences", async (req, res) => {
    try {
      const councilId = req.headers["x-council-id"] as string || req.query.councilId as string;
      const data = await storage.getLicences(councilId);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch licences" });
    }
  });

  app.post("/api/v1/licences", async (req, res) => {
    try {
      const data = insertLicenceSchema.parse(req.body);
      const licence = await storage.createLicence(data);
      await logAudit(data.councilId, undefined, "create", "licence", licence.licenceId, null, licence);
      res.status(201).json(licence);
    } catch (error) {
      res.status(400).json({ error: "Invalid licence data" });
    }
  });

  // Legacy endpoint
  app.get("/api/licenses", async (req, res) => {
    try {
      const councilId = req.query.organizationId as string;
      const licences = await storage.getLicences(councilId);
      const mapped = licences.map(l => ({
        id: l.licenceId,
        licenseNumber: l.licenceNo,
        organizationId: l.councilId,
        ...l
      }));
      res.json(mapped);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch licenses" });
    }
  });

  // ================================
  // MARKETS & STALLS
  // ================================
  app.get("/api/v1/markets", async (req, res) => {
    try {
      const councilId = req.headers["x-council-id"] as string || req.query.councilId as string;
      const data = await storage.getMarkets(councilId);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch markets" });
    }
  });

  app.post("/api/v1/markets", async (req, res) => {
    try {
      const data = insertMarketSchema.parse(req.body);
      const market = await storage.createMarket(data);
      res.status(201).json(market);
    } catch (error) {
      res.status(400).json({ error: "Invalid market data" });
    }
  });

  app.get("/api/v1/stalls", async (req, res) => {
    try {
      const councilId = req.headers["x-council-id"] as string;
      const marketId = req.query.marketId as string;
      const data = await storage.getStalls(councilId, marketId);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch stalls" });
    }
  });

  app.post("/api/v1/stalls", async (req, res) => {
    try {
      const data = insertStallSchema.parse(req.body);
      const stall = await storage.createStall(data);
      res.status(201).json(stall);
    } catch (error) {
      res.status(400).json({ error: "Invalid stall data" });
    }
  });

  // ================================
  // COMPLAINTS
  // ================================
  app.get("/api/v1/complaints", async (req, res) => {
    try {
      const councilId = req.headers["x-council-id"] as string || req.query.councilId as string;
      const data = await storage.getComplaints(councilId);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch complaints" });
    }
  });

  app.post("/api/v1/complaints", async (req, res) => {
    try {
      const data = insertComplaintSchema.parse(req.body);
      const complaint = await storage.createComplaint(data);
      await logAudit(data.councilId, undefined, "create", "complaint", complaint.complaintId, null, complaint);
      res.status(201).json(complaint);
    } catch (error) {
      res.status(400).json({ error: "Invalid complaint data" });
    }
  });

  // Legacy endpoint
  app.get("/api/complaints", async (req, res) => {
    try {
      const councilId = req.query.organizationId as string;
      const complaints = await storage.getComplaints(councilId);
      const mapped = complaints.map(c => ({
        id: c.complaintId,
        organizationId: c.councilId,
        ...c
      }));
      res.json(mapped);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch complaints" });
    }
  });

  // ================================
  // ENFORCEMENT
  // ================================
  app.get("/api/v1/enforcement", async (req, res) => {
    try {
      const councilId = req.headers["x-council-id"] as string || req.query.councilId as string;
      const data = await storage.getEnforcementCases(councilId);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch enforcement cases" });
    }
  });

  app.post("/api/v1/enforcement", async (req, res) => {
    try {
      const data = insertEnforcementCaseSchema.parse(req.body);
      const enfCase = await storage.createEnforcementCase(data);
      await logAudit(data.councilId, undefined, "create", "enforcement_case", enfCase.caseId, null, enfCase);
      res.status(201).json(enfCase);
    } catch (error) {
      res.status(400).json({ error: "Invalid enforcement case data" });
    }
  });

  // Legacy endpoint
  app.get("/api/enforcement-cases", async (req, res) => {
    try {
      const councilId = req.query.organizationId as string;
      const cases = await storage.getEnforcementCases(councilId);
      const mapped = cases.map(c => ({
        id: c.caseId,
        caseNumber: c.caseNo,
        organizationId: c.councilId,
        ...c
      }));
      res.json(mapped);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch enforcement cases" });
    }
  });

  // ================================
  // AUDIT LOGS
  // ================================
  app.get("/api/v1/audit/logs", async (req, res) => {
    try {
      const councilId = req.headers["x-council-id"] as string || req.query.councilId as string;
      const data = await storage.getAuditLogs(councilId);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch audit logs" });
    }
  });

  // Legacy endpoint
  app.get("/api/audit-logs", async (req, res) => {
    try {
      const councilId = req.query.organizationId as string;
      const logs = await storage.getAuditLogs(councilId);
      const mapped = logs.map(l => ({
        id: l.auditId,
        organizationId: l.councilId,
        ...l
      }));
      res.json(mapped);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch audit logs" });
    }
  });

  // ================================
  // DASHBOARD STATS
  // ================================
  app.get("/api/dashboard/stats", async (req, res) => {
    try {
      const councilId = req.query.organizationId as string || req.headers["x-council-id"] as string;
      
      const [citizensData, businessesData, propertiesData, complaintsData] = await Promise.all([
        storage.getCitizens(councilId),
        storage.getBusinesses(councilId),
        storage.getProperties(councilId),
        storage.getComplaints(councilId)
      ]);

      res.json({
        citizens: citizensData.length,
        businesses: businessesData.length,
        properties: propertiesData.length,
        complaints: complaintsData.length,
        licences: 0,
        inspections: 0,
        revenue: 0
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch dashboard stats" });
    }
  });

  return httpServer;
}
