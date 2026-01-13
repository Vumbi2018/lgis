import { db } from "./db";
import { eq, desc } from "drizzle-orm";
import {
  councils, councilUnits, users, roles, permissions, rolePermissions, userRoles,
  auditLogs, citizens, businesses, accounts, services, feeSchedules,
  serviceRequests, workflowDefinitions, workflowSteps, workflowInstances,
  inspections, inspectionFindings, inspectionEvidence,
  invoices, invoiceLines, payments, paymentAllocations,
  licences, licenceRenewals, properties, rateAssessments,
  markets, stalls, complaints, complaintUpdates, enforcementCases, notices, assets,
  type Council, type InsertCouncil,
  type Citizen, type InsertCitizen,
  type Business, type InsertBusiness,
  type Property,
  type ServiceRequest,
  type Inspection,
  type Invoice,
  type Payment,
  type Licence,
  type Complaint,
  type EnforcementCase,
  type AuditLog,
  type Service,
  type Market,
  type Stall,
  type User,
  type Asset
} from "@shared/schema";

export interface IStorage {
  // Councils
  getCouncils(): Promise<Council[]>;
  getCouncilById(councilId: string): Promise<Council | undefined>;
  createCouncil(council: InsertCouncil): Promise<Council>;

  // Citizens
  getCitizens(councilId?: string): Promise<Citizen[]>;
  getCitizenById(citizenId: string): Promise<Citizen | undefined>;
  createCitizen(citizen: InsertCitizen): Promise<Citizen>;
  updateCitizen(citizenId: string, updates: Partial<InsertCitizen>): Promise<Citizen | undefined>;

  // Businesses
  getBusinesses(councilId?: string): Promise<Business[]>;
  getBusinessById(businessId: string): Promise<Business | undefined>;
  createBusiness(business: InsertBusiness): Promise<Business>;
  updateBusiness(businessId: string, updates: Partial<InsertBusiness>): Promise<Business | undefined>;

  // Properties
  getProperties(councilId?: string): Promise<Property[]>;
  getPropertyById(propertyId: string): Promise<Property | undefined>;
  createProperty(property: any): Promise<Property>;

  // Services
  getServices(councilId?: string): Promise<Service[]>;
  getServiceById(serviceId: string): Promise<Service | undefined>;
  createService(service: any): Promise<Service>;

  // Service Requests
  getServiceRequests(councilId?: string): Promise<ServiceRequest[]>;
  getServiceRequestById(requestId: string): Promise<ServiceRequest | undefined>;
  createServiceRequest(request: any): Promise<ServiceRequest>;
  updateServiceRequestStatus(requestId: string, status: string): Promise<ServiceRequest | undefined>;

  // Inspections
  getInspections(councilId?: string): Promise<Inspection[]>;
  getInspectionById(inspectionId: string): Promise<Inspection | undefined>;
  createInspection(inspection: any): Promise<Inspection>;

  // Invoices
  getInvoices(councilId?: string): Promise<Invoice[]>;
  getInvoiceById(invoiceId: string): Promise<Invoice | undefined>;
  createInvoice(invoice: any): Promise<Invoice>;

  // Payments
  getPayments(councilId?: string): Promise<Payment[]>;
  getPaymentById(paymentId: string): Promise<Payment | undefined>;
  createPayment(payment: any): Promise<Payment>;

  // Licences
  getLicences(councilId?: string): Promise<Licence[]>;
  getLicenceById(licenceId: string): Promise<Licence | undefined>;
  createLicence(licence: any): Promise<Licence>;

  // Markets
  getMarkets(councilId?: string): Promise<Market[]>;
  createMarket(market: any): Promise<Market>;

  // Stalls
  getStalls(councilId?: string, marketId?: string): Promise<Stall[]>;
  createStall(stall: any): Promise<Stall>;

  // Complaints
  getComplaints(councilId?: string): Promise<Complaint[]>;
  getComplaintById(complaintId: string): Promise<Complaint | undefined>;
  createComplaint(complaint: any): Promise<Complaint>;

  // Enforcement Cases
  getEnforcementCases(councilId?: string): Promise<EnforcementCase[]>;
  createEnforcementCase(enforcementCase: any): Promise<EnforcementCase>;

  // Audit Logs
  getAuditLogs(councilId?: string): Promise<AuditLog[]>;
  createAuditLog(log: any): Promise<AuditLog>;

  // Users
  getUserById(userId: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;

  // Assets
  getAssets(councilId?: string): Promise<any[]>;
  getAssetById(assetId: string): Promise<any | undefined>;
  createAsset(asset: any): Promise<any>;
}

export class DatabaseStorage implements IStorage {
  // Councils
  async getCouncils(): Promise<Council[]> {
    return await db.select().from(councils).orderBy(desc(councils.createdAt));
  }

  async getCouncilById(councilId: string): Promise<Council | undefined> {
    const [council] = await db.select().from(councils).where(eq(councils.councilId, councilId));
    return council;
  }

  async createCouncil(council: InsertCouncil): Promise<Council> {
    const [created] = await db.insert(councils).values(council).returning();
    return created;
  }

  // Citizens
  async getCitizens(councilId?: string): Promise<Citizen[]> {
    if (councilId) {
      return await db.select().from(citizens).where(eq(citizens.councilId, councilId));
    }
    return await db.select().from(citizens);
  }

  async getCitizenById(citizenId: string): Promise<Citizen | undefined> {
    const [citizen] = await db.select().from(citizens).where(eq(citizens.citizenId, citizenId));
    return citizen;
  }

  async createCitizen(citizen: InsertCitizen): Promise<Citizen> {
    const [created] = await db.insert(citizens).values(citizen).returning();
    return created;
  }

  async updateCitizen(citizenId: string, updates: Partial<InsertCitizen>): Promise<Citizen | undefined> {
    const [updated] = await db.update(citizens)
      .set(updates)
      .where(eq(citizens.citizenId, citizenId))
      .returning();
    return updated;
  }

  // Businesses
  async getBusinesses(councilId?: string): Promise<Business[]> {
    if (councilId) {
      return await db.select().from(businesses).where(eq(businesses.councilId, councilId));
    }
    return await db.select().from(businesses);
  }

  async getBusinessById(businessId: string): Promise<Business | undefined> {
    const [business] = await db.select().from(businesses).where(eq(businesses.businessId, businessId));
    return business;
  }

  async createBusiness(business: InsertBusiness): Promise<Business> {
    const [created] = await db.insert(businesses).values(business).returning();
    return created;
  }

  async updateBusiness(businessId: string, updates: Partial<InsertBusiness>): Promise<Business | undefined> {
    const [updated] = await db.update(businesses)
      .set(updates)
      .where(eq(businesses.businessId, businessId))
      .returning();
    return updated;
  }

  // Properties
  async getProperties(councilId?: string): Promise<Property[]> {
    if (councilId) {
      return await db.select().from(properties).where(eq(properties.councilId, councilId));
    }
    return await db.select().from(properties);
  }

  async getPropertyById(propertyId: string): Promise<Property | undefined> {
    const [property] = await db.select().from(properties).where(eq(properties.propertyId, propertyId));
    return property;
  }

  async createProperty(property: any): Promise<Property> {
    const [created] = await db.insert(properties).values(property).returning();
    return created;
  }

  // Services
  async getServices(councilId?: string): Promise<Service[]> {
    if (councilId) {
      return await db.select().from(services).where(eq(services.councilId, councilId));
    }
    return await db.select().from(services);
  }

  async getServiceById(serviceId: string): Promise<Service | undefined> {
    const [service] = await db.select().from(services).where(eq(services.serviceId, serviceId));
    return service;
  }

  async createService(service: any): Promise<Service> {
    const [created] = await db.insert(services).values(service).returning();
    return created;
  }

  // Service Requests
  async getServiceRequests(councilId?: string): Promise<ServiceRequest[]> {
    if (councilId) {
      return await db.select().from(serviceRequests).where(eq(serviceRequests.councilId, councilId));
    }
    return await db.select().from(serviceRequests);
  }

  async getServiceRequestById(requestId: string): Promise<ServiceRequest | undefined> {
    const [request] = await db.select().from(serviceRequests).where(eq(serviceRequests.requestId, requestId));
    return request;
  }

  async createServiceRequest(request: any): Promise<ServiceRequest> {
    const [created] = await db.insert(serviceRequests).values(request).returning();
    return created;
  }

  async updateServiceRequestStatus(requestId: string, status: string): Promise<ServiceRequest | undefined> {
    const [updated] = await db.update(serviceRequests)
      .set({ status })
      .where(eq(serviceRequests.requestId, requestId))
      .returning();
    return updated;
  }

  // Inspections
  async getInspections(councilId?: string): Promise<Inspection[]> {
    if (councilId) {
      return await db.select().from(inspections).where(eq(inspections.councilId, councilId));
    }
    return await db.select().from(inspections);
  }

  async getInspectionById(inspectionId: string): Promise<Inspection | undefined> {
    const [inspection] = await db.select().from(inspections).where(eq(inspections.inspectionId, inspectionId));
    return inspection;
  }

  async createInspection(inspection: any): Promise<Inspection> {
    const [created] = await db.insert(inspections).values(inspection).returning();
    return created;
  }

  // Invoices
  async getInvoices(councilId?: string): Promise<Invoice[]> {
    if (councilId) {
      return await db.select().from(invoices).where(eq(invoices.councilId, councilId));
    }
    return await db.select().from(invoices);
  }

  async getInvoiceById(invoiceId: string): Promise<Invoice | undefined> {
    const [invoice] = await db.select().from(invoices).where(eq(invoices.invoiceId, invoiceId));
    return invoice;
  }

  async createInvoice(invoice: any): Promise<Invoice> {
    const [created] = await db.insert(invoices).values(invoice).returning();
    return created;
  }

  // Payments
  async getPayments(councilId?: string): Promise<Payment[]> {
    if (councilId) {
      return await db.select().from(payments).where(eq(payments.councilId, councilId));
    }
    return await db.select().from(payments);
  }

  async getPaymentById(paymentId: string): Promise<Payment | undefined> {
    const [payment] = await db.select().from(payments).where(eq(payments.paymentId, paymentId));
    return payment;
  }

  async createPayment(payment: any): Promise<Payment> {
    const [created] = await db.insert(payments).values(payment).returning();
    return created;
  }

  // Licences
  async getLicences(councilId?: string): Promise<Licence[]> {
    if (councilId) {
      return await db.select().from(licences).where(eq(licences.councilId, councilId));
    }
    return await db.select().from(licences);
  }

  async getLicenceById(licenceId: string): Promise<Licence | undefined> {
    const [licence] = await db.select().from(licences).where(eq(licences.licenceId, licenceId));
    return licence;
  }

  async createLicence(licence: any): Promise<Licence> {
    const [created] = await db.insert(licences).values(licence).returning();
    return created;
  }

  // Markets
  async getMarkets(councilId?: string): Promise<Market[]> {
    if (councilId) {
      return await db.select().from(markets).where(eq(markets.councilId, councilId));
    }
    return await db.select().from(markets);
  }

  async createMarket(market: any): Promise<Market> {
    const [created] = await db.insert(markets).values(market).returning();
    return created;
  }

  // Stalls
  async getStalls(councilId?: string, marketId?: string): Promise<Stall[]> {
    if (marketId) {
      return await db.select().from(stalls).where(eq(stalls.marketId, marketId));
    }
    if (councilId) {
      return await db.select().from(stalls).where(eq(stalls.councilId, councilId));
    }
    return await db.select().from(stalls);
  }

  async createStall(stall: any): Promise<Stall> {
    const [created] = await db.insert(stalls).values(stall).returning();
    return created;
  }

  // Complaints
  async getComplaints(councilId?: string): Promise<Complaint[]> {
    if (councilId) {
      return await db.select().from(complaints).where(eq(complaints.councilId, councilId));
    }
    return await db.select().from(complaints);
  }

  async getComplaintById(complaintId: string): Promise<Complaint | undefined> {
    const [complaint] = await db.select().from(complaints).where(eq(complaints.complaintId, complaintId));
    return complaint;
  }

  async createComplaint(complaint: any): Promise<Complaint> {
    const [created] = await db.insert(complaints).values(complaint).returning();
    return created;
  }

  // Enforcement Cases
  async getEnforcementCases(councilId?: string): Promise<EnforcementCase[]> {
    if (councilId) {
      return await db.select().from(enforcementCases).where(eq(enforcementCases.councilId, councilId));
    }
    return await db.select().from(enforcementCases);
  }

  async createEnforcementCase(enforcementCase: any): Promise<EnforcementCase> {
    const [created] = await db.insert(enforcementCases).values(enforcementCase).returning();
    return created;
  }

  // Audit Logs
  async getAuditLogs(councilId?: string): Promise<AuditLog[]> {
    if (councilId) {
      return await db.select().from(auditLogs).where(eq(auditLogs.councilId, councilId)).orderBy(desc(auditLogs.createdAt));
    }
    return await db.select().from(auditLogs).orderBy(desc(auditLogs.createdAt));
  }

  async createAuditLog(log: any): Promise<AuditLog> {
    const [created] = await db.insert(auditLogs).values(log).returning();
    return created;
  }

  // Users
  async getUserById(userId: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.userId, userId));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  // Assets
  async getAssets(councilId?: string): Promise<Asset[]> {
    if (councilId) {
      return await db.select().from(assets).where(eq(assets.councilId, councilId));
    }
    return await db.select().from(assets);
  }

  async getAssetById(assetId: string): Promise<Asset | undefined> {
    const [asset] = await db.select().from(assets).where(eq(assets.assetId, assetId));
    return asset;
  }

  async createAsset(asset: any): Promise<Asset> {
    const [created] = await db.insert(assets).values(asset).returning();
    return created;
  }
}

export const storage = new DatabaseStorage();
