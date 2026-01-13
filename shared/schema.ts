import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, decimal, boolean, jsonb, date, char, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// ================================
// COUNCILS & ORGANISATION STRUCTURE
// ================================

export const councils = pgTable("councils", {
  councilId: varchar("council_id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  level: text("level").notNull(), // city, municipal, district, llg
  countryCode: char("country_code", { length: 2 }).notNull().default("PG"),
  currencyCode: char("currency_code", { length: 3 }).notNull().default("PGK"),
  timezone: text("timezone").notNull().default("Pacific/Port_Moresby"),
  status: text("status").notNull().default("active"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const councilUnits = pgTable("council_units", {
  unitId: varchar("unit_id").primaryKey().default(sql`gen_random_uuid()`),
  councilId: varchar("council_id").notNull(),
  name: text("name").notNull(),
  type: text("type").notNull(), // department, division, branch
  parentUnitId: varchar("parent_unit_id"),
});

// ================================
// USERS, ROLES, PERMISSIONS (RBAC + LBAC)
// ================================

export const users = pgTable("users", {
  userId: varchar("user_id").primaryKey().default(sql`gen_random_uuid()`),
  councilId: varchar("council_id").notNull(),
  unitId: varchar("unit_id"),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  passwordHash: text("password_hash").notNull(),
  status: text("status").notNull().default("active"),
  mfaEnabled: boolean("mfa_enabled").default(false),
  lastLoginAt: timestamp("last_login_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const roles = pgTable("roles", {
  roleId: varchar("role_id").primaryKey().default(sql`gen_random_uuid()`),
  councilId: varchar("council_id").notNull(),
  name: text("name").notNull(),
  scope: text("scope").notNull().default("council"), // council, unit, ward, location
});

export const permissions = pgTable("permissions", {
  permissionCode: text("permission_code").primaryKey(),
  description: text("description").notNull(),
});

export const rolePermissions = pgTable("role_permissions", {
  roleId: varchar("role_id").notNull(),
  permissionCode: text("permission_code").notNull(),
});

export const userRoles = pgTable("user_roles", {
  userId: varchar("user_id").notNull(),
  roleId: varchar("role_id").notNull(),
  assignedAt: timestamp("assigned_at").defaultNow(),
});

// ================================
// AUDIT LOGS (IMMUTABLE)
// ================================

export const auditLogs = pgTable("audit_logs", {
  auditId: varchar("audit_id").primaryKey().default(sql`gen_random_uuid()`),
  councilId: varchar("council_id").notNull(),
  userId: varchar("user_id"),
  action: text("action").notNull(),
  entityType: text("entity_type").notNull(),
  entityId: varchar("entity_id"),
  beforeState: jsonb("before_state"),
  afterState: jsonb("after_state"),
  ipAddress: text("ip_address"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ================================
// CITIZENS, BUSINESSES & ACCOUNTS
// ================================

export const citizens = pgTable("citizens", {
  citizenId: varchar("citizen_id").primaryKey().default(sql`gen_random_uuid()`),
  councilId: varchar("council_id").notNull(),
  nationalId: text("national_id"),
  localCitizenNo: text("local_citizen_no"),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  dob: date("dob"),
  sex: text("sex"), // male, female
  phone: text("phone"),
  email: text("email"),
  address: text("address"),
  village: text("village"),
  district: text("district"),
  province: text("province"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const businesses = pgTable("businesses", {
  businessId: varchar("business_id").primaryKey().default(sql`gen_random_uuid()`),
  councilId: varchar("council_id").notNull(),
  registrationNo: text("registration_no"),
  tin: text("tin"), // Tax Identification Number
  legalName: text("legal_name").notNull(),
  tradingName: text("trading_name"),
  businessType: text("business_type"), // Sole Trader, Partnership, Company
  industry: text("industry"),
  ownerName: text("owner_name"),
  contactPhone: text("contact_phone"),
  contactEmail: text("contact_email"),
  physicalAddress: text("physical_address"),
  section: text("section"),
  lot: text("lot"),
  suburb: text("suburb"),
  status: text("status").default("active"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const accounts = pgTable("accounts", {
  accountId: varchar("account_id").primaryKey().default(sql`gen_random_uuid()`),
  councilId: varchar("council_id").notNull(),
  holderType: text("holder_type").notNull(), // citizen, business
  holderId: varchar("holder_id").notNull(),
  accountNo: text("account_no").notNull(),
  status: text("status").notNull().default("active"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ================================
// SERVICE CATALOGUE & FEES
// ================================

export const services = pgTable("services", {
  serviceId: varchar("service_id").primaryKey().default(sql`gen_random_uuid()`),
  councilId: varchar("council_id").notNull(),
  code: text("code").notNull(),
  name: text("name").notNull(),
  category: text("category").notNull(), // licensing, permits, rates, complaints
  description: text("description"),
  requiresInspection: boolean("requires_inspection").default(false),
  requiresApproval: boolean("requires_approval").default(true),
  active: boolean("active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const feeSchedules = pgTable("fee_schedules", {
  feeId: varchar("fee_id").primaryKey().default(sql`gen_random_uuid()`),
  councilId: varchar("council_id").notNull(),
  serviceId: varchar("service_id").notNull(),
  name: text("name").notNull(),
  basis: text("basis").notNull(), // flat, per_unit, percentage
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  currency: char("currency", { length: 3 }).notNull().default("PGK"),
  validFrom: date("valid_from").notNull(),
  validTo: date("valid_to"),
});

// ================================
// WORKFLOWS & SERVICE REQUESTS
// ================================

export const workflowDefinitions = pgTable("workflow_definitions", {
  workflowId: varchar("workflow_id").primaryKey().default(sql`gen_random_uuid()`),
  councilId: varchar("council_id").notNull(),
  serviceId: varchar("service_id").notNull(),
  version: text("version").notNull().default("1.0"),
  active: boolean("active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const workflowSteps = pgTable("workflow_steps", {
  stepId: varchar("step_id").primaryKey().default(sql`gen_random_uuid()`),
  councilId: varchar("council_id").notNull(),
  workflowId: varchar("workflow_id").notNull(),
  name: text("name").notNull(),
  orderNo: integer("order_no").notNull(),
  assigneeRole: text("assignee_role"),
  slaRule: text("sla_rule"), // e.g., "3_business_days"
});

export const serviceRequests = pgTable("service_requests", {
  requestId: varchar("request_id").primaryKey().default(sql`gen_random_uuid()`),
  councilId: varchar("council_id").notNull(),
  serviceId: varchar("service_id").notNull(),
  requesterType: text("requester_type").notNull(), // citizen, business
  requesterId: varchar("requester_id").notNull(),
  status: text("status").notNull().default("draft"), // draft, submitted, processing, approved, rejected
  channel: text("channel").notNull().default("web"), // web, mobile, counter
  formData: jsonb("form_data"),
  submittedAt: timestamp("submitted_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const workflowInstances = pgTable("workflow_instances", {
  instanceId: varchar("instance_id").primaryKey().default(sql`gen_random_uuid()`),
  councilId: varchar("council_id").notNull(),
  requestId: varchar("request_id").notNull(),
  workflowId: varchar("workflow_id").notNull(),
  state: text("state").notNull().default("pending"),
  currentStepId: varchar("current_step_id"),
  startedAt: timestamp("started_at").defaultNow(),
  endedAt: timestamp("ended_at"),
});

// ================================
// INSPECTIONS & FIELD DATA
// ================================

export const inspections = pgTable("inspections", {
  inspectionId: varchar("inspection_id").primaryKey().default(sql`gen_random_uuid()`),
  councilId: varchar("council_id").notNull(),
  requestId: varchar("request_id"),
  inspectorUserId: varchar("inspector_user_id"),
  scheduledAt: timestamp("scheduled_at"),
  performedAt: timestamp("performed_at"),
  result: text("result"), // pass, fail, conditional_pass
  remarks: text("remarks"),
  latitude: decimal("latitude", { precision: 10, scale: 7 }),
  longitude: decimal("longitude", { precision: 10, scale: 7 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const inspectionFindings = pgTable("inspection_findings", {
  findingId: varchar("finding_id").primaryKey().default(sql`gen_random_uuid()`),
  councilId: varchar("council_id").notNull(),
  inspectionId: varchar("inspection_id").notNull(),
  code: text("code"),
  severity: text("severity"), // low, medium, high, critical
  description: text("description"),
  correctiveAction: text("corrective_action"),
  dueDate: date("due_date"),
});

export const inspectionEvidence = pgTable("inspection_evidence", {
  evidenceId: varchar("evidence_id").primaryKey().default(sql`gen_random_uuid()`),
  councilId: varchar("council_id").notNull(),
  inspectionId: varchar("inspection_id").notNull(),
  mediaType: text("media_type"), // photo, video, document
  url: text("url"),
  hash: text("hash"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ================================
// BILLING, PAYMENTS & LICENSING
// ================================

export const invoices = pgTable("invoices", {
  invoiceId: varchar("invoice_id").primaryKey().default(sql`gen_random_uuid()`),
  councilId: varchar("council_id").notNull(),
  accountId: varchar("account_id").notNull(),
  invoiceNo: text("invoice_no").notNull(),
  totalAmount: decimal("total_amount", { precision: 12, scale: 2 }).notNull(),
  currency: char("currency", { length: 3 }).notNull().default("PGK"),
  status: text("status").notNull().default("draft"), // draft, issued, paid, overdue, cancelled
  issuedAt: timestamp("issued_at"),
  dueAt: timestamp("due_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const invoiceLines = pgTable("invoice_lines", {
  lineId: varchar("line_id").primaryKey().default(sql`gen_random_uuid()`),
  councilId: varchar("council_id").notNull(),
  invoiceId: varchar("invoice_id").notNull(),
  description: text("description"),
  quantity: integer("quantity").default(1),
  unitPrice: decimal("unit_price", { precision: 12, scale: 2 }),
  lineTotal: decimal("line_total", { precision: 12, scale: 2 }),
});

export const payments = pgTable("payments", {
  paymentId: varchar("payment_id").primaryKey().default(sql`gen_random_uuid()`),
  councilId: varchar("council_id").notNull(),
  accountId: varchar("account_id").notNull(),
  paymentRef: text("payment_ref").notNull(),
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  currency: char("currency", { length: 3 }).notNull().default("PGK"),
  method: text("method").notNull(), // cash, eftpos, bank_transfer, mobile_money
  provider: text("provider"), // BSP, Kina Bank, etc.
  status: text("status").notNull().default("pending"), // pending, completed, failed, refunded
  paidAt: timestamp("paid_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const paymentAllocations = pgTable("payment_allocations", {
  allocationId: varchar("allocation_id").primaryKey().default(sql`gen_random_uuid()`),
  councilId: varchar("council_id").notNull(),
  paymentId: varchar("payment_id").notNull(),
  invoiceId: varchar("invoice_id").notNull(),
  allocatedAmount: decimal("allocated_amount", { precision: 12, scale: 2 }).notNull(),
});

export const licences = pgTable("licences", {
  licenceId: varchar("licence_id").primaryKey().default(sql`gen_random_uuid()`),
  councilId: varchar("council_id").notNull(),
  requestId: varchar("request_id").notNull(),
  licenceNo: text("licence_no").notNull(),
  issueDate: date("issue_date"),
  expiryDate: date("expiry_date"),
  status: text("status").notNull().default("active"), // active, expired, suspended, revoked
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const licenceRenewals = pgTable("licence_renewals", {
  renewalId: varchar("renewal_id").primaryKey().default(sql`gen_random_uuid()`),
  councilId: varchar("council_id").notNull(),
  licenceId: varchar("licence_id").notNull(),
  requestId: varchar("request_id"),
  previousExpiryDate: date("previous_expiry_date"),
  newExpiryDate: date("new_expiry_date"),
  renewedAt: timestamp("renewed_at").defaultNow(),
});

// ================================
// PROPERTIES & RATES
// ================================

export const properties = pgTable("properties", {
  propertyId: varchar("property_id").primaryKey().default(sql`gen_random_uuid()`),
  councilId: varchar("council_id").notNull(),
  parcelId: text("parcel_id"),
  section: text("section"),
  lot: text("lot"),
  allotment: text("allotment"),
  suburb: text("suburb"),
  district: text("district"),
  landType: text("land_type"), // state_lease, customary, freehold
  titleNumber: text("title_number"),
  ownerName: text("owner_name"),
  ownerType: text("owner_type"), // individual, business, government
  landArea: text("land_area"),
  zoning: text("zoning"),
  rateableValue: decimal("rateable_value", { precision: 12, scale: 2 }),
  coordinates: text("coordinates"),
  status: text("status").default("active"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const rateAssessments = pgTable("rate_assessments", {
  assessmentId: varchar("assessment_id").primaryKey().default(sql`gen_random_uuid()`),
  councilId: varchar("council_id").notNull(),
  propertyId: varchar("property_id").notNull(),
  assessmentYear: integer("assessment_year").notNull(),
  rateableValue: decimal("rateable_value", { precision: 12, scale: 2 }),
  rateAmount: decimal("rate_amount", { precision: 12, scale: 2 }),
  status: text("status").default("pending"), // pending, issued, paid, overdue
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ================================
// MARKETS & STALLS
// ================================

export const markets = pgTable("markets", {
  marketId: varchar("market_id").primaryKey().default(sql`gen_random_uuid()`),
  councilId: varchar("council_id").notNull(),
  name: text("name").notNull(),
  location: text("location"),
  capacity: integer("capacity"),
  operatingHours: text("operating_hours"),
  status: text("status").default("active"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const stalls = pgTable("stalls", {
  stallId: varchar("stall_id").primaryKey().default(sql`gen_random_uuid()`),
  councilId: varchar("council_id").notNull(),
  marketId: varchar("market_id").notNull(),
  stallNo: text("stall_no").notNull(),
  category: text("category"), // produce, crafts, food, general
  size: text("size"),
  dailyRate: decimal("daily_rate", { precision: 10, scale: 2 }),
  monthlyRate: decimal("monthly_rate", { precision: 10, scale: 2 }),
  status: text("status").default("available"), // available, occupied, reserved, maintenance
  currentTenantId: varchar("current_tenant_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ================================
// COMPLAINTS & SERVICE REQUESTS
// ================================

export const complaints = pgTable("complaints", {
  complaintId: varchar("complaint_id").primaryKey().default(sql`gen_random_uuid()`),
  councilId: varchar("council_id").notNull(),
  complainantType: text("complainant_type"), // citizen, business, anonymous
  complainantId: varchar("complainant_id"),
  category: text("category"), // noise, littering, illegal_business, road_damage
  status: text("status").notNull().default("new"), // new, acknowledged, investigating, resolved, closed
  description: text("description"),
  latitude: decimal("latitude", { precision: 10, scale: 7 }),
  longitude: decimal("longitude", { precision: 10, scale: 7 }),
  location: text("location"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const complaintUpdates = pgTable("complaint_updates", {
  updateId: varchar("update_id").primaryKey().default(sql`gen_random_uuid()`),
  councilId: varchar("council_id").notNull(),
  complaintId: varchar("complaint_id").notNull(),
  updatedBy: varchar("updated_by"),
  status: text("status"),
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ================================
// ASSETS & FACILITIES
// ================================

export const assets = pgTable("assets", {
  assetId: varchar("asset_id").primaryKey().default(sql`gen_random_uuid()`),
  councilId: varchar("council_id").notNull(),
  assetNo: text("asset_no").notNull(),
  name: text("name").notNull(),
  type: text("type").notNull(), // building, vehicle, equipment, market_facility
  location: text("location"),
  condition: text("condition"), // excellent, good, fair, poor
  value: text("value"),
  status: text("status").default("active"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ================================
// ENFORCEMENT CASES & NOTICES
// ================================

export const enforcementCases = pgTable("enforcement_cases", {
  caseId: varchar("case_id").primaryKey().default(sql`gen_random_uuid()`),
  councilId: varchar("council_id").notNull(),
  requestId: varchar("request_id"),
  caseNo: text("case_no").notNull(),
  type: text("type"), // non_compliance, illegal_activity, penalty
  status: text("status").default("open"), // open, investigating, pending_prosecution, closed
  offenderType: text("offender_type"), // citizen, business
  offenderId: varchar("offender_id"),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const notices = pgTable("notices", {
  noticeId: varchar("notice_id").primaryKey().default(sql`gen_random_uuid()`),
  councilId: varchar("council_id").notNull(),
  caseId: varchar("case_id").notNull(),
  noticeNo: text("notice_no").notNull(),
  noticeType: text("notice_type"), // warning, compliance, penalty, closure
  issuedDate: date("issued_date"),
  complianceDue: date("compliance_due"),
  details: text("details"),
  status: text("status").default("issued"), // issued, served, complied, escalated
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ================================
// INSERT SCHEMAS (for validation)
// ================================

export const insertCouncilSchema = createInsertSchema(councils).omit({ councilId: true, createdAt: true });
export const insertCouncilUnitSchema = createInsertSchema(councilUnits).omit({ unitId: true });
export const insertUserSchema = createInsertSchema(users).omit({ userId: true, createdAt: true, lastLoginAt: true });
export const insertRoleSchema = createInsertSchema(roles).omit({ roleId: true });
export const insertPermissionSchema = createInsertSchema(permissions);
export const insertCitizenSchema = createInsertSchema(citizens).omit({ citizenId: true, createdAt: true });
export const insertBusinessSchema = createInsertSchema(businesses).omit({ businessId: true, createdAt: true });
export const insertAccountSchema = createInsertSchema(accounts).omit({ accountId: true, createdAt: true });
export const insertServiceSchema = createInsertSchema(services).omit({ serviceId: true, createdAt: true });
export const insertFeeScheduleSchema = createInsertSchema(feeSchedules).omit({ feeId: true });
export const insertServiceRequestSchema = createInsertSchema(serviceRequests).omit({ requestId: true, createdAt: true });
export const insertInspectionSchema = createInsertSchema(inspections).omit({ inspectionId: true, createdAt: true });
export const insertInvoiceSchema = createInsertSchema(invoices).omit({ invoiceId: true, createdAt: true });
export const insertPaymentSchema = createInsertSchema(payments).omit({ paymentId: true, createdAt: true });
export const insertLicenceSchema = createInsertSchema(licences).omit({ licenceId: true, createdAt: true });
export const insertPropertySchema = createInsertSchema(properties).omit({ propertyId: true, createdAt: true });
export const insertMarketSchema = createInsertSchema(markets).omit({ marketId: true, createdAt: true });
export const insertStallSchema = createInsertSchema(stalls).omit({ stallId: true, createdAt: true });
export const insertComplaintSchema = createInsertSchema(complaints).omit({ complaintId: true, createdAt: true });
export const insertEnforcementCaseSchema = createInsertSchema(enforcementCases).omit({ caseId: true, createdAt: true });
export const insertNoticeSchema = createInsertSchema(notices).omit({ noticeId: true, createdAt: true });
export const insertAuditLogSchema = createInsertSchema(auditLogs).omit({ auditId: true, createdAt: true });
export const insertAssetSchema = createInsertSchema(assets).omit({ assetId: true, createdAt: true });

// ================================
// TYPE EXPORTS
// ================================

export type Council = typeof councils.$inferSelect;
export type InsertCouncil = z.infer<typeof insertCouncilSchema>;
export type CouncilUnit = typeof councilUnits.$inferSelect;
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Role = typeof roles.$inferSelect;
export type Permission = typeof permissions.$inferSelect;
export type Citizen = typeof citizens.$inferSelect;
export type InsertCitizen = z.infer<typeof insertCitizenSchema>;
export type Business = typeof businesses.$inferSelect;
export type InsertBusiness = z.infer<typeof insertBusinessSchema>;
export type Account = typeof accounts.$inferSelect;
export type Service = typeof services.$inferSelect;
export type FeeSchedule = typeof feeSchedules.$inferSelect;
export type ServiceRequest = typeof serviceRequests.$inferSelect;
export type WorkflowDefinition = typeof workflowDefinitions.$inferSelect;
export type WorkflowStep = typeof workflowSteps.$inferSelect;
export type WorkflowInstance = typeof workflowInstances.$inferSelect;
export type Inspection = typeof inspections.$inferSelect;
export type InspectionFinding = typeof inspectionFindings.$inferSelect;
export type InspectionEvidence = typeof inspectionEvidence.$inferSelect;
export type Invoice = typeof invoices.$inferSelect;
export type InvoiceLine = typeof invoiceLines.$inferSelect;
export type Payment = typeof payments.$inferSelect;
export type PaymentAllocation = typeof paymentAllocations.$inferSelect;
export type Licence = typeof licences.$inferSelect;
export type LicenceRenewal = typeof licenceRenewals.$inferSelect;
export type Property = typeof properties.$inferSelect;
export type RateAssessment = typeof rateAssessments.$inferSelect;
export type Market = typeof markets.$inferSelect;
export type Stall = typeof stalls.$inferSelect;
export type Complaint = typeof complaints.$inferSelect;
export type ComplaintUpdate = typeof complaintUpdates.$inferSelect;
export type EnforcementCase = typeof enforcementCases.$inferSelect;
export type Notice = typeof notices.$inferSelect;
export type AuditLog = typeof auditLogs.$inferSelect;
export type Asset = typeof assets.$inferSelect;
export type InsertAsset = z.infer<typeof insertAssetSchema>;
