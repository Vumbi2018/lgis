# LGIS Technical Guide

**Local Government Information System - Developer & Administrator Reference**

Version 1.0 | January 2026

---

## Table of Contents

1. [System Overview](#1-system-overview)
2. [Architecture](#2-architecture)
3. [Technology Stack](#3-technology-stack)
4. [Database Schema](#4-database-schema)
5. [API Reference](#5-api-reference)
6. [Frontend Architecture](#6-frontend-architecture)
7. [Backend Architecture](#7-backend-architecture)
8. [Mobile App Implementation](#8-mobile-app-implementation)
9. [Security](#9-security)
10. [Development Workflow](#10-development-workflow)
11. [Key Modules](#11-key-modules)
12. [Testing Strategy](#12-testing-strategy)

---

## 1. System Overview

### 1.1 Introduction

LGIS is a comprehensive web and mobile application for Papua New Guinea's local government councils. Built with modern technologies, it provides a scalable, maintainable, and secure platform for civic service delivery.

**Key Technical Features:**
- Multi-tenant SaaS architecture
- Progressive Web App (PWA) capabilities
- Native Android mobile app via Capacitor
- Real-time data synchronization
- Offline-first mobile functionality
- RESTful API backend
- Role-based access control (RBAC)
- Digital signature integration
- Payment gateway integration

### 1.2 Architecture Principles

**Design Philosophy:**
1. **Separation of Concerns**: Clear boundaries between presentation, business logic, and data layers
2. **Multi-Tenancy**: Complete data isolation per council
3. **API-First**: All functionality exposed via REST API
4. **Mobile-First**: Responsive design and native mobile apps
5. **Security by Design**: Authentication, authorization, encryption built-in
6. **Scalability**: Horizontal scaling support
7. **Maintainability**: Clear code structure, comprehensive documentation

### 1.3 System Requirements

**Development Environment:**
- Node.js 18+ (LTS)
- PostgreSQL 14+
- Git 2.30+
- VS Code (recommended)
- 8GB RAM minimum
- Windows/macOS/Linux

**Production Environment:**
- VPS/Cloud server (2GB RAM minimum)
- PostgreSQL database server
- Node.js runtime
- Nginx reverse proxy
- SSL certificate
- Domain name

---

## 2. Architecture

### 2.1 High-Level Architecture

```
┌──────────────────────────────────────────────────────────┐
│                     CLIENT TIER                           │
├──────────────────────────────────────────────────────────┤
│  Web Application (React + TypeScript)                    │
│  Mobile App (Capacitor + React)                          │
└────────────────────┬─────────────────────────────────────┘
                     │ HTTPS/REST API
                     │
┌────────────────────▼─────────────────────────────────────┐
│                  APPLICATION TIER                         │
├──────────────────────────────────────────────────────────┤
│  Express.js Server                                       │
│  ├── Authentication (Passport.js)                        │
│  ├── API Routes                                          │
│  ├── Business Logic                                      │
│  ├── Storage Layer (Drizzle ORM)                         │
│  └── Integrations (Payment, Email, SMS)                  │
└────────────────────┬─────────────────────────────────────┘
                     │ SQL
                     │
┌────────────────────▼─────────────────────────────────────┐
│                     DATA TIER                             │
├──────────────────────────────────────────────────────────┤
│  PostgreSQL Database                                     │
│  ├── Application Tables (35+)                            │
│  ├── Row-Level Security                                  │
│  └── Multi-Tenant Data Isolation                         │
└──────────────────────────────────────────────────────────┘
```

### 2.2 Frontend Architecture

**React Component Hierarchy:**

```
App.tsx (Router)
├── MainLayout
│   ├── Header
│   ├── Sidebar
│   └── Page Content
│       ├── Dashboard
│       ├── Licensing
│       ├── Registry
│       ├── Inspections
│       └── Revenue
└── MobileLayout
    ├── BottomNav
    └── Mobile Pages
```

**State Management:**

- **TanStack Query**: Server state, caching, synchronization
- **React Context**: Global app state (user, org, theme)
- **Local State**: Component-specific state with useState
- **URL State**: Route parameters and query strings

### 2.3 Backend Architecture

**Layered Architecture:**

```
HTTP Request
    ↓
Express Middleware Stack
    ↓
Auth Middleware
    ↓
Route Handler
    ↓
Storage Layer (Abstraction)
    ↓
Drizzle ORM
    ↓
PostgreSQL
```

**Middleware Stack:**
1. CORS
2. Body Parser (JSON)
3. Session Management
4. Authentication
5. Organization Context
6. Request Logging
7. Error Handling

### 2.4 Database Architecture

**Multi-Tenancy Model:**

Every table includes `councilId`:
```sql
CREATE TABLE businesses (
    "businessId" UUID PRIMARY KEY,
    "councilId" UUID NOT NULL REFERENCES councils,
    "legalName" VARCHAR NOT NULL,
    ...
);

-- Row-Level Security
CREATE POLICY tenant_isolation ON businesses
    FOR ALL
    USING (councilId = current_setting('app.current_council')::uuid);
```

**Key Design Patterns:**
- UUID primary keys (distributed-friendly)
- Soft deletes (status fields)
- Audit trails (trigger-based or manual)
- JSONB for flexible data (formData, metadata)
- Timestamps (createdAt, updatedAt)

---

## 3. Technology Stack

### 3.1 Frontend Technologies

**Core Framework:**
```json
{
  "react": "^18.2.0",
  "typescript": "^5.0.0",
  "vite": "^5.0.0"
}
```

**Routing:**
- **Wouter**: Lightweight router (2KB)
- File-based routing pattern
- Programmatic navigation

**UI Components:**
- **Shadcn/UI**: Accessible component library
- **Radix UI**: Headless primitives
- **Tailwind CSS v4**: Utility-first CSS

**Forms:**
- **React Hook Form**: Performance-optimized forms
- **Zod**: Schema validation
- **@hookform/resolvers**: Zod integration

**Data Fetching:**
- **TanStack Query**: Data synchronization
- **Fetch API**: HTTP client

**Charts:**
- **Recharts**: Composable charting library

**Icons:**
- **Lucide React**: Icon library

### 3.2 Backend Technologies

**Server Framework:**
```json
{
  "express": "^4.18.0",
  "node": ">=18.0.0"
}
```

**Database:**
- **PostgreSQL**: 14+
- **Drizzle ORM**: Type-safe ORM
- **pg**: PostgreSQL client

**Authentication:**
- **Passport.js**: Authentication middleware
- **passport-local**: Username/password strategy
- **express-session**: Session management
- **bcrypt**: Password hashing

**Utilities:**
- **tsx**: TypeScript execution
- **dotenv**: Environment variables
- **multer**: File uploads
- **pdf-lib**: PDF generation
- **nodemailer**: Email sending

### 3.3 Mobile Technologies

**Capacitor:**
```json
{
  "@capacitor/core": "^6.0.0",
  "@capacitor/android": "^6.0.0",
  "@capacitor/camera": "^6.0.0",
  "@capacitor/geolocation": "^6.0.0",
  "@capacitor/filesystem": "^6.0.0"
}
```

**Native Features:**
- Camera for photo capture
- GPS for location tracking
- Local file storage
- Network status detection
- Push notifications

### 3.4 Development Tools

**Build Tools:**
- **Vite**: Fast build tool
- **ESBuild**: JavaScript bundler
- **TypeScript Compiler**: Type checking

**Code Quality:**
- **ESLint**: Linting
- **Prettier**: Code formatting
- **TypeScript**: Type safety

**Version Control:**
- **Git**: Source control
- **GitHub**: Repository hosting

---

## 4. Database Schema

### 4.1 Core Tables

**Multi-Tenancy:**

```typescript
// shared/schema.ts
export const councils = pgTable('councils', {
  councilId: uuid('councilId').defaultRandom().primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  level: varchar('level', { length: 50 }), // city, district, province
  countryCode: varchar('countryCode', { length: 2 }).default('PG'),
  currencyCode: varchar('currencyCode', { length: 3 }).default('PGK'),
  timezone: varchar('timezone', { length: 100 }).default('Pacific/Port_Moresby'),
  status: varchar('status', { length: 50 }).default('active'),
  createdAt: timestamp('createdAt').defaultNow(),
});
```

### 4.2 Registry Tables

**Citizens:**
```typescript
export const citizens = pgTable('citizens', {
  citizenId: uuid('citizenId').defaultRandom().primaryKey(),
  councilId: uuid('councilId').references(() => councils.councilId),
  nationalId: varchar('nationalId', { length: 50 }),
  firstName: varchar('firstName', { length: 100 }),
  lastName: varchar('lastName', { length: 100 }),
  dob: date('dob'),
  sex: varchar('sex', { length: 10 }),
  phone: varchar('phone', { length: 50 }),
  email: varchar('email', { length: 256 }),
  address: text('address'),
  village: varchar('village', { length: 100 }),
  district: varchar('district', { length: 100 }),
  province: varchar('province', { length: 100 }),
  status: varchar('status', { length: 50 }).default('active'),
  createdAt: timestamp('createdAt').defaultNow(),
});
```

**Businesses:**
```typescript
export const businesses = pgTable('businesses', {
  businessId: uuid('businessId').defaultRandom().primaryKey(),
  councilId: uuid('councilId').references(() => councils.councilId).notNull(),
  registrationNo: varchar('registrationNo', { length: 100 }),
  tin: varchar('tin', { length: 50 }),
  legalName: varchar('legalName', { length: 256 }).notNull(),
  tradingName: varchar('tradingName', { length: 256 }),
  businessType: varchar('businessType', { length: 50 }),
  industry: varchar('industry', { length: 100 }),
  ownerName: varchar('ownerName', { length: 256 }),
  contactPhone: varchar('contactPhone', { length: 50 }),
  contactEmail: varchar('contactEmail', { length: 256 }),
  physicalAddress: text('physical Address'),
  section: varchar('section', { length: 50 }),
  lot: varchar('lot', { length: 50 }),
  suburb: varchar('suburb', { length: 100 }),
  status: varchar('status', { length: 50 }).default('active'),
  verified: boolean('verified').default(false),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
});
```

### 4.3 Licensing Tables

**License Types:**
```typescript
export const licenseTypes = pgTable('licenseTypes', {
  id: uuid('id').defaultRandom().primaryKey(),
  councilId: uuid('councilId').references(() => councils.councilId),
  code: varchar('code', { length: 50 }),
  licenseName: varchar('licenseName', { length: 256 }),
  licenseCategory: varchar('licenseCategory', { length: 100 }),
  description: text('description'),
  validityYears: integer('validityYears').default(1),
  baseFee: decimal('baseFee', { precision: 10, scale: 2 }),
  renewalFee: decimal('renewalFee', { precision: 10, scale: 2 }),
  requiresInspection: boolean('requiresInspection').default(false),
  active: boolean('active').default(true),
  createdAt: timestamp('createdAt').defaultNow(),
});
```

**Service Requests:**
```typescript
export const serviceRequests = pgTable('serviceRequests', {
  requestId: uuid('requestId').defaultRandom().primaryKey(),
  councilId: uuid('councilId').references(() => councils.councilId).notNull(),
  serviceId: uuid('serviceId').references(() => services.serviceId).notNull(),
  requesterType: varchar('requesterType', { length: 50 }), // citizen, business
  requesterId: uuid('requesterId').notNull(),
  requestRef: varchar('requestRef', { length: 100 }),
  status: varchar('status', { length: 50 }).default('draft'),
  channel: varchar('channel', { length: 50 }).default('web'),
  formData: jsonb('formData'), // Flexible form storage
  submittedAt: timestamp('submittedAt'),
  completedAt: timestamp('completedAt'),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
});
```

### 4.4 Workflow Tables

**Workflow Instances:**
```typescript
export const workflowInstances = pgTable('workflowInstances', {
  instanceId: uuid('instanceId').defaultRandom().primaryKey(),
  councilId: uuid('councilId').references(() => councils.councilId),
  workflowDefId: uuid('workflowDefId').references(() => workflowDefinitions.defId),
  entityType: varchar('entityType', { length: 50 }), // service_request
  entityId: uuid('entityId'),
  currentStepId: uuid('currentStepId'),
  status: varchar('status', { length: 50 }).default('active'),
  startedAt: timestamp('startedAt').defaultNow(),
  completedAt: timestamp('completedAt'),
  metadata: jsonb('metadata'),
});
```

### 4.5 Inspection Tables

**Inspections:**
```typescript
export const inspections = pgTable('inspections', {
  inspectionId: uuid('inspectionId').defaultRandom().primaryKey(),
  councilId: uuid('councilId').references(() => councils.councilId),
  inspectionNo: varchar('inspectionNo', { length: 100 }),
  type: varchar('type', { length: 100 }),
  scheduledDate: date('scheduledDate'),
  completedDate: timestamp('completedDate'),
  status: varchar('status', { length: 50 }).default('scheduled'),
  inspectorId: uuid('inspectorId').references(() => users.userId),
  targetType: varchar('targetType', { length: 50 }), // business, property
  targetId: uuid('targetId'),
  checklistData: jsonb('checklistData'),
  observations: text('observations'),
  recommendation: varchar('recommendation', { length: 50 }),
  latitude: varchar('latitude', { length: 50 }),
  longitude: varchar('longitude', { length: 50 }),
  gpsAccuracy: decimal('gpsAccuracy', { precision: 10, scale: 2 }),
  capturedAt: timestamp('capturedAt'),
  signature: text('signature'),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
});
```

### 4.6 Key Relationships

**Entity Relationship Diagram (Simplified):**

```
councils (1) ──── (N) users
councils (1) ──── (N) businesses
councils (1) ──── (N) services
councils (1) ──── (N) licenseTypes

businesses (1) ──── (N) serviceRequests
services (1) ──── (N) serviceRequests

serviceRequests (1) ──── (1) workflowInstances
serviceRequests (1) ──── (N) inspections
```

---

## 5. API Reference

### 5.1 API Overview

**Base URL**: `https://your-domain.com/api`

**Authentication**: Session-based with cookies

**Response Format**: JSON

**Status Codes:**
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error

### 5.2 Authentication Endpoints

**POST /api/auth/login**

Login user and establish session.

Request:
```json
{
  "email": "user@council.gov.pg",
  "password": "userpassword"
}
```

Response:
```json
{
  "user": {
    "userId": "uuid",
    "email": "user@council.gov.pg",
    "firstName": "John",
    "lastName": "Doe",
    "role": "inspector"
  }
}
```

**POST /api/auth/logout**

Logout current user.

**GET /api/auth/me**

Get current logged-in user.

### 5.3 Business Endpoints

**GET /api/v1/businesses**

List all businesses (scoped to council).

Query Parameters:
- `councilId` (optional): Filter by council
- `status` (optional): Filter by status

Response:
```json
[
  {
    "businessId": "uuid",
    "legalName": "ABC Trading Ltd",
    "tradingName": "ABC Shop",
    "registrationNo": "12345",
    "tin": "1234567890",
    "contactPhone": "+675 7XX XXXXX",
    "status": "active",
    "verified": true
  }
]
```

**GET /api/v1/businesses/:businessId**

Get single business by ID.

**POST /api/v1/businesses**

Create new business.

Request:
```json
{
  "councilId": "uuid",
  "legalName": "New Business Ltd",
  "tradingName": "Trade Name",
  "registrationNo": "IPA123456",
  "tin": "1234567890",
  "businessType": "company",
  "industry": "retail",
  "contactPhone": "+675 7XX XXXXX",
  "contactEmail": "info@business.com",
  "physicalAddress": "Section 45, Lot 12, Boroko"
}
```

### 5.4 Licensing Endpoints

**POST /api/v1/licensing/apply-test**

Submit license application.

Request:
```json
{
  "businessId": "uuid",
  "licenseTypeId": "uuid",
  "councilId": "uuid",
  "formData": {
    "premisesDetails": "...",
    "operatingHours": "...",
    "employeeCount": 5,
    ...
  }
}
```

Response:
```json
{
  "request": {
    "requestId": "uuid",
    "requestRef": "LIC-2026-1234",
    "status": "submitted"
  },
  "workflow": {
    "instanceId": "uuid",
    "currentStep": "document_check"
  }
}
```

**GET /api/v1/service-requests**

List service requests.

### 5.5 Inspection Endpoints

**GET /api/inspections**

List inspections.

Query Parameters:
- `inspectorId`: Filter by inspector
- `status`: Filter by status
- `date`: Filter by date

**GET /api/inspections/:id**

Get inspection details.

**POST /api/inspections**

Create inspection.

**PATCH /api/inspections/:id**

Update inspection (submit completion).

### 5.6 File Upload

**POST /api/v1/uploads**

Upload file.

Request (multipart/form-data):
- `file`: File binary
- `councilId`: Council ID
- `ownerType`: Entity type
- `ownerId`: Entity ID

Response:
```json
{
  "documentId": "uuid",
  "fileName": "document.pdf",
  "filePath": "/uploads/...",
  "fileSize": 125456
}
````

---
