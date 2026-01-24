import { pgTable, text, uuid, timestamp, integer, varchar, jsonb, boolean, pgEnum } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { users, roles } from "@shared/schema";

// ================================
// ENUMS
// ================================
export const accessLevelEnum = pgEnum('access_level', ['full', 'masked', 'partial', 'none']);
export const breakglassStatusEnum = pgEnum('breakglass_status', ['pending', 'approved', 'denied', 'expired', 'revoked', 'active']);
export const auditActionEnum = pgEnum('audit_action', ['read', 'write', 'update', 'delete', 'export']);

// ================================
// FIELD ACCESS POLICIES
// ================================
export const fieldPolicies = pgTable('field_policies', {
    policyId: uuid('policy_id').primaryKey().defaultRandom(),
    entityType: varchar('entity_type', { length: 50 }).notNull(), // 'citizen', 'business', 'payment', etc.
    fieldName: varchar('field_name', { length: 100 }).notNull(),
    roleId: uuid('role_id').references(() => roles.roleId, { onDelete: 'cascade' }),
    accessLevel: accessLevelEnum('access_level').notNull().default('none'),
    maskPattern: text('mask_pattern'), // e.g., '***-**-{last4}' for SSN
    description: text('description'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull()
});

// ================================
// BREAK-GLASS REQUESTS
// ================================
export const breakglassRequests = pgTable('breakglass_requests', {
    requestId: uuid('request_id').primaryKey().defaultRandom(),
    userId: uuid('user_id').notNull().references(() => users.userId, { onDelete: 'cascade' }),
    incidentRef: varchar('incident_ref', { length: 100 }).notNull(),
    justification: text('justification').notNull(),
    requestedScope: jsonb('requested_scope').notNull(), // { entities: ['citizen', 'business'], permissions: ['citizen:pii'] }
    duration: integer('duration').notNull().default(120), // minutes
    authorizerId: uuid('authorizer_id').references(() => users.userId),
    authorizerNotes: text('authorizer_notes'),
    status: breakglassStatusEnum('status').notNull().default('pending'),
    approvedAt: timestamp('approved_at'),
    expiresAt: timestamp('expires_at'),
    revokedAt: timestamp('revoked_at'),
    revokedBy: uuid('revoked_by').references(() => users.userId),
    revocationReason: text('revocation_reason'),
    reviewedAt: timestamp('reviewed_at'),
    reviewedBy: uuid('reviewed_by').references(() => users.userId),
    reviewNotes: text('review_notes'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull()
});

// ================================
// BREAK-GLASS AUDIT LOG
// ================================
export const breakglassAudit = pgTable('breakglass_audit', {
    auditId: uuid('audit_id').primaryKey().defaultRandom(),
    requestId: uuid('request_id').notNull().references(() => breakglassRequests.requestId, { onDelete: 'cascade' }),
    userId: uuid('user_id').notNull().references(() => users.userId),
    entityType: varchar('entity_type', { length: 50 }).notNull(),
    entityId: uuid('entity_id').notNull(),
    fieldName: varchar('field_name', { length: 100 }),
    action: auditActionEnum('action').notNull(),
    oldValue: text('old_value'),
    newValue: text('new_value'),
    ipAddress: varchar('ip_address', { length: 50 }),
    userAgent: text('user_agent'),
    createdAt: timestamp('created_at').defaultNow().notNull()
});

// ================================
// ENHANCED AUDIT LOG (General)
// ================================
export const auditLog = pgTable('audit_log', {
    auditId: uuid('audit_id').primaryKey().defaultRandom(),
    userId: uuid('user_id').references(() => users.userId),
    permissionCode: varchar('permission_code', { length: 100 }),
    entityType: varchar('entity_type', { length: 50 }),
    entityId: uuid('entity_id'),
    action: auditActionEnum('action').notNull(),
    details: jsonb('details'), // Additional context
    ipAddress: varchar('ip_address', { length: 50 }),
    userAgent: text('user_agent'),
    success: boolean('success').notNull().default(true),
    failureReason: text('failure_reason'),
    createdAt: timestamp('created_at').defaultNow().notNull()
});

// ================================
// RELATIONS
// ================================
export const fieldPoliciesRelations = relations(fieldPolicies, ({ one }) => ({
    role: one(roles, {
        fields: [fieldPolicies.roleId],
        references: [roles.roleId]
    })
}));

export const breakglassRequestsRelations = relations(breakglassRequests, ({ one, many }) => ({
    user: one(users, {
        fields: [breakglassRequests.userId],
        references: [users.userId],
        relationName: 'requester'
    }),
    authorizer: one(users, {
        fields: [breakglassRequests.authorizerId],
        references: [users.userId],
        relationName: 'authorizer'
    }),
    revoker: one(users, {
        fields: [breakglassRequests.revokedBy],
        references: [users.userId],
        relationName: 'revoker'
    }),
    reviewer: one(users, {
        fields: [breakglassRequests.reviewedBy],
        references: [users.userId],
        relationName: 'reviewer'
    }),
    auditLogs: many(breakglassAudit)
}));

export const breakglassAuditRelations = relations(breakglassAudit, ({ one }) => ({
    request: one(breakglassRequests, {
        fields: [breakglassAudit.requestId],
        references: [breakglassRequests.requestId]
    }),
    user: one(users, {
        fields: [breakglassAudit.userId],
        references: [users.userId]
    })
}));

export const auditLogRelations = relations(auditLog, ({ one }) => ({
    user: one(users, {
        fields: [auditLog.userId],
        references: [users.userId]
    })
}));
