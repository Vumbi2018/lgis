import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, decimal, boolean, jsonb } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name"),
  role: text("role").default("officer"), // officer, admin, manager
  organizationId: varchar("organization_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Organizations (Multi-tenant councils/LLGs)
export const organizations = pgTable("organizations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  type: text("type").notNull(), // City, District, Province
  district: text("district"),
  province: text("province"),
  country: text("country").default("Papua New Guinea"),
  contactEmail: text("contact_email"),
  contactPhone: text("contact_phone"),
  address: text("address"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Citizens Registry
export const citizens = pgTable("citizens", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  organizationId: varchar("organization_id").notNull(),
  nidNumber: text("nid_number"), // National ID
  fullName: text("full_name").notNull(),
  dateOfBirth: text("date_of_birth"),
  gender: text("gender"),
  phone: text("phone"),
  email: text("email"),
  address: text("address"),
  village: text("village"),
  province: text("province"),
  district: text("district"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Business Registry
export const businesses = pgTable("businesses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  organizationId: varchar("organization_id").notNull(),
  registrationNumber: text("registration_number"),
  businessName: text("business_name").notNull(),
  tradingAs: text("trading_as"),
  businessType: text("business_type"), // Sole Trader, Partnership, Company
  industry: text("industry"),
  ipaRegistration: text("ipa_registration"), // IPA Business Registry Number
  tinNumber: text("tin_number"), // Tax Identification Number
  ownerName: text("owner_name"),
  contactPhone: text("contact_phone"),
  contactEmail: text("contact_email"),
  physicalAddress: text("physical_address"),
  section: text("section"),
  lot: text("lot"),
  allotment: text("allotment"),
  suburb: text("suburb"),
  status: text("status").default("Active"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Properties Registry
export const properties = pgTable("properties", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  organizationId: varchar("organization_id").notNull(),
  parcelId: text("parcel_id").notNull(),
  section: text("section"),
  lot: text("lot"),
  allotment: text("allotment"),
  suburb: text("suburb"),
  district: text("district"),
  landType: text("land_type"), // State Lease, Customary, Freehold
  titleNumber: text("title_number"),
  ownerName: text("owner_name"),
  ownerType: text("owner_type"), // Individual, Business, Government
  landArea: text("land_area"),
  zoning: text("zoning"),
  rateableValue: decimal("rateable_value", { precision: 12, scale: 2 }),
  coordinates: text("coordinates"), // lat,lng
  status: text("status").default("Active"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// License Applications
export const licenseApplications = pgTable("license_applications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  organizationId: varchar("organization_id").notNull(),
  applicationNumber: text("application_number").notNull(),
  applicantName: text("applicant_name").notNull(),
  applicantType: text("applicant_type"), // Individual, Business
  applicantNid: text("applicant_nid"),
  applicantPhone: text("applicant_phone"),
  applicantEmail: text("applicant_email"),
  licenseType: text("license_type").notNull(), // Trading, Liquor, Signage, etc.
  businessName: text("business_name"),
  businessAddress: text("business_address"),
  section: text("section"),
  lot: text("lot"),
  allotment: text("allotment"),
  suburb: text("suburb"),
  parcelId: text("parcel_id"),
  licenseClass: text("license_class"),
  description: text("description"),
  status: text("status").default("Draft"), // Draft, Submitted, Under Review, Approved, Rejected
  submittedAt: timestamp("submitted_at"),
  reviewedBy: varchar("reviewed_by"),
  reviewedAt: timestamp("reviewed_at"),
  approvedBy: varchar("approved_by"),
  approvedAt: timestamp("approved_at"),
  reviewNotes: text("review_notes"),
  documents: jsonb("documents"), // Array of document metadata
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Licenses
export const licenses = pgTable("licenses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  organizationId: varchar("organization_id").notNull(),
  applicationId: varchar("application_id"),
  licenseNumber: text("license_number").notNull().unique(),
  holderName: text("holder_name").notNull(),
  holderType: text("holder_type"),
  businessName: text("business_name"),
  licenseType: text("license_type").notNull(),
  licenseClass: text("license_class"),
  issueDate: text("issue_date").notNull(),
  expiryDate: text("expiry_date").notNull(),
  annualFee: decimal("annual_fee", { precision: 10, scale: 2 }),
  status: text("status").default("Active"), // Active, Expired, Suspended, Revoked
  location: text("location"),
  conditions: text("conditions"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Inspections
export const inspections = pgTable("inspections", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  organizationId: varchar("organization_id").notNull(),
  inspectionNumber: text("inspection_number").notNull(),
  entityName: text("entity_name").notNull(), // Business or property name
  entityType: text("entity_type"), // Business, Property, License
  entityId: varchar("entity_id"), // Reference to business, property, or license
  inspectionType: text("inspection_type").notNull(), // Health & Safety, License Compliance, etc.
  scheduledDate: text("scheduled_date"),
  completedDate: text("completed_date"),
  inspector: text("inspector"),
  inspectorId: varchar("inspector_id"),
  status: text("status").default("Scheduled"), // Scheduled, In Progress, Completed, Cancelled
  result: text("result"), // Pass, Fail, Conditional Pass
  riskLevel: text("risk_level"), // Low, Medium, High, Critical
  findings: text("findings"),
  recommendations: text("recommendations"),
  followUpRequired: boolean("follow_up_required").default(false),
  followUpDate: text("follow_up_date"),
  documents: jsonb("documents"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Enforcement Cases
export const enforcementCases = pgTable("enforcement_cases", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  organizationId: varchar("organization_id").notNull(),
  caseNumber: text("case_number").notNull(),
  offenderName: text("offender_name").notNull(),
  offenderType: text("offender_type"), // Individual, Business
  offence: text("offence").notNull(),
  offenceCategory: text("offence_category"), // Trading, Building, Environmental
  location: text("location"),
  incidentDate: text("incident_date"),
  reportedDate: text("reported_date").notNull(),
  reportedBy: text("reported_by"),
  officer: text("officer"),
  officerId: varchar("officer_id"),
  status: text("status").default("Open"), // Open, Under Investigation, Pending Prosecution, Closed
  severity: text("severity"), // Minor, Moderate, Serious, Critical
  penaltyIssued: boolean("penalty_issued").default(false),
  penaltyAmount: decimal("penalty_amount", { precision: 10, scale: 2 }),
  penaltyStatus: text("penalty_status"), // Unpaid, Paid, Waived
  resolution: text("resolution"),
  resolutionDate: text("resolution_date"),
  notes: text("notes"),
  documents: jsonb("documents"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Complaints & Public Interaction
export const complaints = pgTable("complaints", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  organizationId: varchar("organization_id").notNull(),
  complaintNumber: text("complaint_number").notNull(),
  reporterName: text("reporter_name"),
  reporterPhone: text("reporter_phone"),
  reporterEmail: text("reporter_email"),
  anonymous: boolean("anonymous").default(false),
  category: text("category").notNull(), // Noise, Littering, Illegal Business, etc.
  priority: text("priority").default("Medium"), // Low, Medium, High, Urgent
  subject: text("subject").notNull(),
  description: text("description").notNull(),
  location: text("location"),
  status: text("status").default("New"), // New, Acknowledged, Under Investigation, Resolved, Closed
  assignedTo: varchar("assigned_to"),
  assignedOfficer: text("assigned_officer"),
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
  acknowledgedAt: timestamp("acknowledged_at"),
  resolvedAt: timestamp("resolved_at"),
  resolution: text("resolution"),
  internalNotes: text("internal_notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Invoices
export const invoices = pgTable("invoices", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  organizationId: varchar("organization_id").notNull(),
  invoiceNumber: text("invoice_number").notNull().unique(),
  recipientName: text("recipient_name").notNull(),
  recipientType: text("recipient_type"), // Individual, Business
  recipientId: varchar("recipient_id"), // Reference to citizen or business
  description: text("description").notNull(),
  category: text("category"), // Property Rates, License Fee, Fine, etc.
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  currency: text("currency").default("PGK"),
  issueDate: text("issue_date").notNull(),
  dueDate: text("due_date").notNull(),
  status: text("status").default("Unpaid"), // Unpaid, Paid, Overdue, Cancelled
  paidDate: text("paid_date"),
  paymentMethod: text("payment_method"),
  paymentReference: text("payment_reference"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Transactions
export const transactions = pgTable("transactions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  organizationId: varchar("organization_id").notNull(),
  transactionNumber: text("transaction_number").notNull().unique(),
  invoiceId: varchar("invoice_id"),
  payerName: text("payer_name").notNull(),
  transactionType: text("transaction_type").notNull(), // Payment, Refund, Adjustment
  category: text("category"), // Property Rates, Trading License, Fine, etc.
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  currency: text("currency").default("PGK"),
  paymentMethod: text("payment_method"), // Cash, Bank Transfer, Mobile Money, Cheque
  paymentReference: text("payment_reference"),
  transactionDate: text("transaction_date").notNull(),
  status: text("status").default("Completed"), // Completed, Pending, Failed, Reversed
  processedBy: varchar("processed_by"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Audit Logs
export const auditLogs = pgTable("audit_logs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  organizationId: varchar("organization_id"),
  userId: varchar("user_id"),
  userName: text("user_name").notNull(),
  action: text("action").notNull(), // Created, Updated, Deleted, Approved, etc.
  resourceType: text("resource_type").notNull(), // License, Invoice, User, etc.
  resourceId: varchar("resource_id"),
  resourceName: text("resource_name"),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  changes: jsonb("changes"), // Before/after data
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

// Relations
export const organizationsRelations = relations(organizations, ({ many }) => ({
  users: many(users),
  citizens: many(citizens),
  businesses: many(businesses),
  properties: many(properties),
  licenses: many(licenses),
  inspections: many(inspections),
  enforcementCases: many(enforcementCases),
  complaints: many(complaints),
  invoices: many(invoices),
  transactions: many(transactions),
}));

export const usersRelations = relations(users, ({ one }) => ({
  organization: one(organizations, {
    fields: [users.organizationId],
    references: [organizations.id],
  }),
}));

export const licenseApplicationsRelations = relations(licenseApplications, ({ one }) => ({
  organization: one(organizations, {
    fields: [licenseApplications.organizationId],
    references: [organizations.id],
  }),
}));

export const licensesRelations = relations(licenses, ({ one }) => ({
  organization: one(organizations, {
    fields: [licenses.organizationId],
    references: [organizations.id],
  }),
  application: one(licenseApplications, {
    fields: [licenses.applicationId],
    references: [licenseApplications.id],
  }),
}));

// Zod Schemas
export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export const insertOrganizationSchema = createInsertSchema(organizations).omit({ id: true, createdAt: true });
export const insertCitizenSchema = createInsertSchema(citizens).omit({ id: true, createdAt: true, updatedAt: true });
export const insertBusinessSchema = createInsertSchema(businesses).omit({ id: true, createdAt: true, updatedAt: true });
export const insertPropertySchema = createInsertSchema(properties).omit({ id: true, createdAt: true, updatedAt: true });
export const insertLicenseApplicationSchema = createInsertSchema(licenseApplications).omit({ id: true, createdAt: true, updatedAt: true });
export const insertLicenseSchema = createInsertSchema(licenses).omit({ id: true, createdAt: true, updatedAt: true });
export const insertInspectionSchema = createInsertSchema(inspections).omit({ id: true, createdAt: true, updatedAt: true });
export const insertEnforcementCaseSchema = createInsertSchema(enforcementCases).omit({ id: true, createdAt: true, updatedAt: true });
export const insertComplaintSchema = createInsertSchema(complaints).omit({ id: true, createdAt: true, updatedAt: true });
export const insertInvoiceSchema = createInsertSchema(invoices).omit({ id: true, createdAt: true, updatedAt: true });
export const insertTransactionSchema = createInsertSchema(transactions).omit({ id: true, createdAt: true });
export const insertAuditLogSchema = createInsertSchema(auditLogs).omit({ id: true, timestamp: true });

// Export Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertOrganization = z.infer<typeof insertOrganizationSchema>;
export type Organization = typeof organizations.$inferSelect;
export type InsertCitizen = z.infer<typeof insertCitizenSchema>;
export type Citizen = typeof citizens.$inferSelect;
export type InsertBusiness = z.infer<typeof insertBusinessSchema>;
export type Business = typeof businesses.$inferSelect;
export type InsertProperty = z.infer<typeof insertPropertySchema>;
export type Property = typeof properties.$inferSelect;
export type InsertLicenseApplication = z.infer<typeof insertLicenseApplicationSchema>;
export type LicenseApplication = typeof licenseApplications.$inferSelect;
export type InsertLicense = z.infer<typeof insertLicenseSchema>;
export type License = typeof licenses.$inferSelect;
export type InsertInspection = z.infer<typeof insertInspectionSchema>;
export type Inspection = typeof inspections.$inferSelect;
export type InsertEnforcementCase = z.infer<typeof insertEnforcementCaseSchema>;
export type EnforcementCase = typeof enforcementCases.$inferSelect;
export type InsertComplaint = z.infer<typeof insertComplaintSchema>;
export type Complaint = typeof complaints.$inferSelect;
export type InsertInvoice = z.infer<typeof insertInvoiceSchema>;
export type Invoice = typeof invoices.$inferSelect;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type Transaction = typeof transactions.$inferSelect;
export type InsertAuditLog = z.infer<typeof insertAuditLogSchema>;
export type AuditLog = typeof auditLogs.$inferSelect;
