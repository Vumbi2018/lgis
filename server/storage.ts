// Reference: blueprint:javascript_database integration
import { 
  users, citizens, businesses, properties, licenseApplications, licenses,
  inspections, enforcementCases, complaints, invoices, transactions, auditLogs,
  organizations,
  type User, type InsertUser, type Organization, type InsertOrganization,
  type Citizen, type InsertCitizen, type Business, type InsertBusiness,
  type Property, type InsertProperty, type LicenseApplication, type InsertLicenseApplication,
  type License, type InsertLicense, type Inspection, type InsertInspection,
  type EnforcementCase, type InsertEnforcementCase, type Complaint, type InsertComplaint,
  type Invoice, type InsertInvoice, type Transaction, type InsertTransaction,
  type AuditLog, type InsertAuditLog
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, or, like, sql } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Organization operations
  listOrganizations(): Promise<Organization[]>;
  getOrganization(id: string): Promise<Organization | undefined>;
  createOrganization(org: InsertOrganization): Promise<Organization>;

  // Citizen operations
  listCitizens(organizationId: string): Promise<Citizen[]>;
  getCitizen(id: string): Promise<Citizen | undefined>;
  createCitizen(citizen: InsertCitizen): Promise<Citizen>;
  updateCitizen(id: string, citizen: Partial<InsertCitizen>): Promise<Citizen>;

  // Business operations
  listBusinesses(organizationId: string): Promise<Business[]>;
  getBusiness(id: string): Promise<Business | undefined>;
  createBusiness(business: InsertBusiness): Promise<Business>;
  updateBusiness(id: string, business: Partial<InsertBusiness>): Promise<Business>;

  // Property operations
  listProperties(organizationId: string): Promise<Property[]>;
  getProperty(id: string): Promise<Property | undefined>;
  createProperty(property: InsertProperty): Promise<Property>;
  updateProperty(id: string, property: Partial<InsertProperty>): Promise<Property>;

  // License Application operations
  listLicenseApplications(organizationId: string): Promise<LicenseApplication[]>;
  getLicenseApplication(id: string): Promise<LicenseApplication | undefined>;
  createLicenseApplication(app: InsertLicenseApplication): Promise<LicenseApplication>;
  updateLicenseApplication(id: string, app: Partial<InsertLicenseApplication>): Promise<LicenseApplication>;

  // License operations
  listLicenses(organizationId: string): Promise<License[]>;
  getLicense(id: string): Promise<License | undefined>;
  createLicense(license: InsertLicense): Promise<License>;
  updateLicense(id: string, license: Partial<InsertLicense>): Promise<License>;

  // Inspection operations
  listInspections(organizationId: string): Promise<Inspection[]>;
  getInspection(id: string): Promise<Inspection | undefined>;
  createInspection(inspection: InsertInspection): Promise<Inspection>;
  updateInspection(id: string, inspection: Partial<InsertInspection>): Promise<Inspection>;

  // Enforcement operations
  listEnforcementCases(organizationId: string): Promise<EnforcementCase[]>;
  getEnforcementCase(id: string): Promise<EnforcementCase | undefined>;
  createEnforcementCase(enfCase: InsertEnforcementCase): Promise<EnforcementCase>;
  updateEnforcementCase(id: string, enfCase: Partial<InsertEnforcementCase>): Promise<EnforcementCase>;

  // Complaint operations
  listComplaints(organizationId: string): Promise<Complaint[]>;
  getComplaint(id: string): Promise<Complaint | undefined>;
  createComplaint(complaint: InsertComplaint): Promise<Complaint>;
  updateComplaint(id: string, complaint: Partial<InsertComplaint>): Promise<Complaint>;

  // Invoice operations
  listInvoices(organizationId: string): Promise<Invoice[]>;
  getInvoice(id: string): Promise<Invoice | undefined>;
  createInvoice(invoice: InsertInvoice): Promise<Invoice>;
  updateInvoice(id: string, invoice: Partial<InsertInvoice>): Promise<Invoice>;

  // Transaction operations
  listTransactions(organizationId: string): Promise<Transaction[]>;
  getTransaction(id: string): Promise<Transaction | undefined>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;

  // Audit Log operations
  listAuditLogs(organizationId?: string): Promise<AuditLog[]>;
  createAuditLog(log: InsertAuditLog): Promise<AuditLog>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Organization operations
  async listOrganizations(): Promise<Organization[]> {
    return await db.select().from(organizations).orderBy(desc(organizations.createdAt));
  }

  async getOrganization(id: string): Promise<Organization | undefined> {
    const [org] = await db.select().from(organizations).where(eq(organizations.id, id));
    return org || undefined;
  }

  async createOrganization(org: InsertOrganization): Promise<Organization> {
    const [created] = await db.insert(organizations).values(org).returning();
    return created;
  }

  // Citizen operations
  async listCitizens(organizationId: string): Promise<Citizen[]> {
    return await db.select().from(citizens)
      .where(eq(citizens.organizationId, organizationId))
      .orderBy(desc(citizens.createdAt));
  }

  async getCitizen(id: string): Promise<Citizen | undefined> {
    const [citizen] = await db.select().from(citizens).where(eq(citizens.id, id));
    return citizen || undefined;
  }

  async createCitizen(citizen: InsertCitizen): Promise<Citizen> {
    const [created] = await db.insert(citizens).values(citizen).returning();
    return created;
  }

  async updateCitizen(id: string, citizen: Partial<InsertCitizen>): Promise<Citizen> {
    const [updated] = await db.update(citizens)
      .set({ ...citizen, updatedAt: new Date() })
      .where(eq(citizens.id, id))
      .returning();
    return updated;
  }

  // Business operations
  async listBusinesses(organizationId: string): Promise<Business[]> {
    return await db.select().from(businesses)
      .where(eq(businesses.organizationId, organizationId))
      .orderBy(desc(businesses.createdAt));
  }

  async getBusiness(id: string): Promise<Business | undefined> {
    const [business] = await db.select().from(businesses).where(eq(businesses.id, id));
    return business || undefined;
  }

  async createBusiness(business: InsertBusiness): Promise<Business> {
    const [created] = await db.insert(businesses).values(business).returning();
    return created;
  }

  async updateBusiness(id: string, business: Partial<InsertBusiness>): Promise<Business> {
    const [updated] = await db.update(businesses)
      .set({ ...business, updatedAt: new Date() })
      .where(eq(businesses.id, id))
      .returning();
    return updated;
  }

  // Property operations
  async listProperties(organizationId: string): Promise<Property[]> {
    return await db.select().from(properties)
      .where(eq(properties.organizationId, organizationId))
      .orderBy(desc(properties.createdAt));
  }

  async getProperty(id: string): Promise<Property | undefined> {
    const [property] = await db.select().from(properties).where(eq(properties.id, id));
    return property || undefined;
  }

  async createProperty(property: InsertProperty): Promise<Property> {
    const [created] = await db.insert(properties).values(property).returning();
    return created;
  }

  async updateProperty(id: string, property: Partial<InsertProperty>): Promise<Property> {
    const [updated] = await db.update(properties)
      .set({ ...property, updatedAt: new Date() })
      .where(eq(properties.id, id))
      .returning();
    return updated;
  }

  // License Application operations
  async listLicenseApplications(organizationId: string): Promise<LicenseApplication[]> {
    return await db.select().from(licenseApplications)
      .where(eq(licenseApplications.organizationId, organizationId))
      .orderBy(desc(licenseApplications.createdAt));
  }

  async getLicenseApplication(id: string): Promise<LicenseApplication | undefined> {
    const [app] = await db.select().from(licenseApplications).where(eq(licenseApplications.id, id));
    return app || undefined;
  }

  async createLicenseApplication(app: InsertLicenseApplication): Promise<LicenseApplication> {
    const [created] = await db.insert(licenseApplications).values(app).returning();
    return created;
  }

  async updateLicenseApplication(id: string, app: Partial<InsertLicenseApplication>): Promise<LicenseApplication> {
    const [updated] = await db.update(licenseApplications)
      .set({ ...app, updatedAt: new Date() })
      .where(eq(licenseApplications.id, id))
      .returning();
    return updated;
  }

  // License operations
  async listLicenses(organizationId: string): Promise<License[]> {
    return await db.select().from(licenses)
      .where(eq(licenses.organizationId, organizationId))
      .orderBy(desc(licenses.createdAt));
  }

  async getLicense(id: string): Promise<License | undefined> {
    const [license] = await db.select().from(licenses).where(eq(licenses.id, id));
    return license || undefined;
  }

  async createLicense(license: InsertLicense): Promise<License> {
    const [created] = await db.insert(licenses).values(license).returning();
    return created;
  }

  async updateLicense(id: string, license: Partial<InsertLicense>): Promise<License> {
    const [updated] = await db.update(licenses)
      .set({ ...license, updatedAt: new Date() })
      .where(eq(licenses.id, id))
      .returning();
    return updated;
  }

  // Inspection operations
  async listInspections(organizationId: string): Promise<Inspection[]> {
    return await db.select().from(inspections)
      .where(eq(inspections.organizationId, organizationId))
      .orderBy(desc(inspections.createdAt));
  }

  async getInspection(id: string): Promise<Inspection | undefined> {
    const [inspection] = await db.select().from(inspections).where(eq(inspections.id, id));
    return inspection || undefined;
  }

  async createInspection(inspection: InsertInspection): Promise<Inspection> {
    const [created] = await db.insert(inspections).values(inspection).returning();
    return created;
  }

  async updateInspection(id: string, inspection: Partial<InsertInspection>): Promise<Inspection> {
    const [updated] = await db.update(inspections)
      .set({ ...inspection, updatedAt: new Date() })
      .where(eq(inspections.id, id))
      .returning();
    return updated;
  }

  // Enforcement operations
  async listEnforcementCases(organizationId: string): Promise<EnforcementCase[]> {
    return await db.select().from(enforcementCases)
      .where(eq(enforcementCases.organizationId, organizationId))
      .orderBy(desc(enforcementCases.createdAt));
  }

  async getEnforcementCase(id: string): Promise<EnforcementCase | undefined> {
    const [enfCase] = await db.select().from(enforcementCases).where(eq(enforcementCases.id, id));
    return enfCase || undefined;
  }

  async createEnforcementCase(enfCase: InsertEnforcementCase): Promise<EnforcementCase> {
    const [created] = await db.insert(enforcementCases).values(enfCase).returning();
    return created;
  }

  async updateEnforcementCase(id: string, enfCase: Partial<InsertEnforcementCase>): Promise<EnforcementCase> {
    const [updated] = await db.update(enforcementCases)
      .set({ ...enfCase, updatedAt: new Date() })
      .where(eq(enforcementCases.id, id))
      .returning();
    return updated;
  }

  // Complaint operations
  async listComplaints(organizationId: string): Promise<Complaint[]> {
    return await db.select().from(complaints)
      .where(eq(complaints.organizationId, organizationId))
      .orderBy(desc(complaints.createdAt));
  }

  async getComplaint(id: string): Promise<Complaint | undefined> {
    const [complaint] = await db.select().from(complaints).where(eq(complaints.id, id));
    return complaint || undefined;
  }

  async createComplaint(complaint: InsertComplaint): Promise<Complaint> {
    const [created] = await db.insert(complaints).values(complaint).returning();
    return created;
  }

  async updateComplaint(id: string, complaint: Partial<InsertComplaint>): Promise<Complaint> {
    const [updated] = await db.update(complaints)
      .set({ ...complaint, updatedAt: new Date() })
      .where(eq(complaints.id, id))
      .returning();
    return updated;
  }

  // Invoice operations
  async listInvoices(organizationId: string): Promise<Invoice[]> {
    return await db.select().from(invoices)
      .where(eq(invoices.organizationId, organizationId))
      .orderBy(desc(invoices.createdAt));
  }

  async getInvoice(id: string): Promise<Invoice | undefined> {
    const [invoice] = await db.select().from(invoices).where(eq(invoices.id, id));
    return invoice || undefined;
  }

  async createInvoice(invoice: InsertInvoice): Promise<Invoice> {
    const [created] = await db.insert(invoices).values(invoice).returning();
    return created;
  }

  async updateInvoice(id: string, invoice: Partial<InsertInvoice>): Promise<Invoice> {
    const [updated] = await db.update(invoices)
      .set({ ...invoice, updatedAt: new Date() })
      .where(eq(invoices.id, id))
      .returning();
    return updated;
  }

  // Transaction operations
  async listTransactions(organizationId: string): Promise<Transaction[]> {
    return await db.select().from(transactions)
      .where(eq(transactions.organizationId, organizationId))
      .orderBy(desc(transactions.createdAt));
  }

  async getTransaction(id: string): Promise<Transaction | undefined> {
    const [transaction] = await db.select().from(transactions).where(eq(transactions.id, id));
    return transaction || undefined;
  }

  async createTransaction(transaction: InsertTransaction): Promise<Transaction> {
    const [created] = await db.insert(transactions).values(transaction).returning();
    return created;
  }

  // Audit Log operations
  async listAuditLogs(organizationId?: string): Promise<AuditLog[]> {
    if (organizationId) {
      return await db.select().from(auditLogs)
        .where(eq(auditLogs.organizationId, organizationId))
        .orderBy(desc(auditLogs.timestamp))
        .limit(1000);
    }
    return await db.select().from(auditLogs)
      .orderBy(desc(auditLogs.timestamp))
      .limit(1000);
  }

  async createAuditLog(log: InsertAuditLog): Promise<AuditLog> {
    const [created] = await db.insert(auditLogs).values(log).returning();
    return created;
  }
}

export const storage = new DatabaseStorage();
