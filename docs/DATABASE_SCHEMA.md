# LGIS Database Schema Documentation

## Overview

The LGIS (Local Government Information System) uses PostgreSQL with 35 tables following a multi-tenant architecture where all data is scoped by `councilId`.

## Core Tables

### councils
Primary tenant table for local government entities.
| Column | Type | Description |
|--------|------|-------------|
| councilId | UUID | Primary key |
| name | VARCHAR | Council name |
| level | VARCHAR | city, district, province |
| countryCode | VARCHAR(2) | Country code (PG for Papua New Guinea) |
| currencyCode | VARCHAR(3) | Currency (PGK) |
| timezone | VARCHAR | Pacific/Port_Moresby |
| status | VARCHAR | active, inactive |
| createdAt | TIMESTAMP | Creation timestamp |

### councilUnits
Organizational units within councils.
| Column | Type | Description |
|--------|------|-------------|
| unitId | UUID | Primary key |
| councilId | UUID | Foreign key to councils |
| name | VARCHAR | Unit name |
| type | VARCHAR | department, division, section |
| parentUnitId | UUID | Self-referencing for hierarchy |

## User Management

### users
System users with council association.
| Column | Type | Description |
|--------|------|-------------|
| userId | UUID | Primary key |
| councilId | UUID | Foreign key to councils |
| email | VARCHAR | Unique email |
| passwordHash | VARCHAR | Hashed password |
| firstName | VARCHAR | First name |
| lastName | VARCHAR | Last name |
| status | VARCHAR | active, inactive, suspended |

### roles
Role definitions for RBAC.
| Column | Type | Description |
|--------|------|-------------|
| roleId | UUID | Primary key |
| councilId | UUID | Foreign key to councils |
| name | VARCHAR | Role name |
| description | TEXT | Role description |

### permissions
System permissions.
| Column | Type | Description |
|--------|------|-------------|
| permissionId | UUID | Primary key |
| code | VARCHAR | Permission code (e.g., citizen.read) |
| name | VARCHAR | Display name |
| module | VARCHAR | Module name |

### rolePermissions
Many-to-many linking roles to permissions.

### userRoles
Many-to-many linking users to roles.

## Registry

### citizens
Individual resident records.
| Column | Type | Description |
|--------|------|-------------|
| citizenId | UUID | Primary key |
| councilId | UUID | Foreign key to councils |
| nationalId | VARCHAR | National ID number |
| localCitizenNo | VARCHAR | Council-assigned ID |
| firstName | VARCHAR | First name |
| lastName | VARCHAR | Last name |
| dob | DATE | Date of birth |
| sex | VARCHAR | male, female |
| phone | VARCHAR | Contact phone |
| email | VARCHAR | Email address |
| address | VARCHAR | Street address |
| village | VARCHAR | Village name |
| district | VARCHAR | District |
| province | VARCHAR | Province |
| status | VARCHAR | active, inactive |

### businesses
Commercial entity records.
| Column | Type | Description |
|--------|------|-------------|
| businessId | UUID | Primary key |
| councilId | UUID | Foreign key to councils |
| registrationNo | VARCHAR | Business registration number |
| tin | VARCHAR | Tax Identification Number |
| legalName | VARCHAR | Legal business name |
| tradingName | VARCHAR | Trading/brand name |
| businessType | VARCHAR | company, sole_trader, partnership, ngo |
| industry | VARCHAR | Industry classification |
| ownerName | VARCHAR | Primary owner |
| contactPhone | VARCHAR | Contact phone |
| contactEmail | VARCHAR | Contact email |
| physicalAddress | VARCHAR | Physical address |
| section | VARCHAR | Section (PNG addressing) |
| lot | VARCHAR | Lot number |
| suburb | VARCHAR | Suburb |
| status | VARCHAR | active, inactive, suspended |

### properties
Land and building records.
| Column | Type | Description |
|--------|------|-------------|
| propertyId | UUID | Primary key |
| councilId | UUID | Foreign key to councils |
| propertyNo | VARCHAR | Property number |
| section | VARCHAR | Section |
| lot | VARCHAR | Lot |
| suburb | VARCHAR | Suburb |
| propertyType | VARCHAR | residential, commercial, industrial |
| landArea | DECIMAL | Land area in sqm |
| valuationAmount | DECIMAL | Property valuation |
| ownerId | UUID | Owner (citizen or business) |
| ownerType | VARCHAR | citizen, business |

### assets
Council assets and facilities.
| Column | Type | Description |
|--------|------|-------------|
| assetId | UUID | Primary key |
| councilId | UUID | Foreign key to councils |
| assetNo | VARCHAR | Asset number |
| name | VARCHAR | Asset name |
| type | VARCHAR | building, vehicle, equipment, market_facility |
| location | VARCHAR | Physical location |
| condition | VARCHAR | excellent, good, fair, poor |
| value | VARCHAR | Asset value |
| status | VARCHAR | active, inactive |

## Billing & Revenue

### accounts
Billing accounts for citizens/businesses.
| Column | Type | Description |
|--------|------|-------------|
| accountId | UUID | Primary key |
| councilId | UUID | Foreign key to councils |
| holderType | VARCHAR | citizen, business |
| holderId | UUID | Citizen or business ID |
| accountNo | VARCHAR | Account number |
| status | VARCHAR | active, suspended, closed |

### invoices
Invoice records.
| Column | Type | Description |
|--------|------|-------------|
| invoiceId | UUID | Primary key |
| councilId | UUID | Foreign key to councils |
| accountId | UUID | Foreign key to accounts |
| invoiceNo | VARCHAR | Invoice number |
| issueDate | DATE | Issue date |
| dueDate | DATE | Due date |
| totalAmount | DECIMAL | Total amount |
| status | VARCHAR | draft, issued, paid, overdue, cancelled |

### invoiceLines
Line items on invoices.

### payments
Payment records.
| Column | Type | Description |
|--------|------|-------------|
| paymentId | UUID | Primary key |
| councilId | UUID | Foreign key to councils |
| accountId | UUID | Foreign key to accounts |
| receiptNo | VARCHAR | Receipt number |
| amount | DECIMAL | Payment amount |
| paymentMethod | VARCHAR | cash, eftpos, mobile, bank_transfer |
| paymentDate | TIMESTAMP | Payment timestamp |

### paymentAllocations
Allocation of payments to invoices.

## Services & Licencing

### services
Service catalogue.
| Column | Type | Description |
|--------|------|-------------|
| serviceId | UUID | Primary key |
| councilId | UUID | Foreign key to councils |
| code | VARCHAR | Service code |
| name | VARCHAR | Service name |
| category | VARCHAR | licensing, permits, complaints |
| description | TEXT | Description |
| requiresInspection | BOOLEAN | Requires inspection |
| requiresApproval | BOOLEAN | Requires approval |
| active | BOOLEAN | Is active |

### feeSchedules
Fee definitions for services.
| Column | Type | Description |
|--------|------|-------------|
| feeScheduleId | UUID | Primary key |
| councilId | UUID | Foreign key to councils |
| serviceId | UUID | Foreign key to services |
| name | VARCHAR | Fee name |
| basis | VARCHAR | flat, percentage, tiered |
| amount | DECIMAL | Fee amount |
| currency | VARCHAR | PGK |
| validFrom | DATE | Start date |
| validTo | DATE | End date (nullable) |

### licences
Issued licences.
| Column | Type | Description |
|--------|------|-------------|
| licenceId | UUID | Primary key |
| councilId | UUID | Foreign key to councils |
| licenceNo | VARCHAR | Licence number |
| serviceId | UUID | Foreign key to services |
| holderId | UUID | Licence holder |
| holderType | VARCHAR | citizen, business |
| issueDate | DATE | Issue date |
| expiryDate | DATE | Expiry date |
| status | VARCHAR | active, expired, suspended, revoked |
| licencePayloadHash | TEXT | SHA-256 of canonical licence data |
| pdfHash | TEXT | SHA-256 of unsigned PDF |
| signedPdfHash | TEXT | SHA-256 of signed PDF (PAdES) |
| signatureMetadata | JSONB | Digital signature details |
| version | INTEGER | Version number |

### licenceRenewals
Licence renewal records.

## Procurement

### purchaseOrders
Purchase orders for council procurement.
| Column | Type | Description |
|--------|------|-------------|
| orderId | UUID | Primary key |
| councilId | UUID | Foreign key to councils |
| vendorId | UUID | Foreign key to businesses (vendors) |
| requestorId | UUID | Foreign key to users |
| orderDate | DATE | Date of order |
| expectedDate | DATE | Expected delivery date |
| status | VARCHAR | draft, submitted, approved, received, cancelled |
| totalAmount | DECIMAL | Total order value |
| currency | VARCHAR | Currency code (PGK) |
| description | TEXT | Order description |

### purchaseOrderLines
Line items for purchase orders.
| Column | Type | Description |
|--------|------|-------------|
| lineId | UUID | Primary key |
| orderId | UUID | Foreign key to purchaseOrders |
| description | TEXT | Item description |
| quantity | INTEGER | Quantity ordered |
| unitPrice | DECIMAL | Cost per unit |
| lineTotal | DECIMAL | Total line cost |

### serviceRequests
Service application requests.

## Workflow

### workflowDefinitions
Workflow definitions.

### workflowSteps
Steps within workflows.

### workflowInstances
Running workflow instances.

## Inspections & Enforcement

### inspections
Inspection records.
| Column | Type | Description |
|--------|------|-------------|
| inspectionId | UUID | Primary key |
| councilId | UUID | Foreign key to councils |
| inspectionNo | VARCHAR | Inspection number |
| type | VARCHAR | Inspection type |
| scheduledDate | DATE | Scheduled date |
| status | VARCHAR | scheduled, in_progress, completed, cancelled |
| inspectorId | UUID | Assigned inspector |
| targetType | VARCHAR | property, business, licence |
| targetId | UUID | Target entity ID |

### inspectionFindings
Findings from inspections.

### inspectionEvidence
Evidence attachments.

### enforcementCases
Enforcement case records.
| Column | Type | Description |
|--------|------|-------------|
| caseId | UUID | Primary key |
| councilId | UUID | Foreign key to councils |
| caseNo | VARCHAR | Case number |
| violationType | VARCHAR | Violation category |
| status | VARCHAR | open, investigating, resolved, closed |
| offenderId | UUID | Offender ID |
| offenderType | VARCHAR | citizen, business |

### notices
Enforcement notices.

## Complaints

### complaints
Complaint records.
| Column | Type | Description |
|--------|------|-------------|
| complaintId | UUID | Primary key |
| councilId | UUID | Foreign key to councils |
| complainantType | VARCHAR | citizen, business, anonymous |
| complainantId | UUID | Complainant ID (nullable) |
| category | VARCHAR | noise, illegal_business, etc. |
| status | VARCHAR | new, investigating, resolved, closed |
| description | TEXT | Complaint description |
| location | VARCHAR | Location |
| latitude | VARCHAR | GPS latitude |
| longitude | VARCHAR | GPS longitude |

### complaintUpdates
Updates/notes on complaints.

## Markets

### markets
Market facilities.
| Column | Type | Description |
|--------|------|-------------|
| marketId | UUID | Primary key |
| councilId | UUID | Foreign key to councils |
| name | VARCHAR | Market name |
| location | VARCHAR | Location |
| capacity | INTEGER | Total stall capacity |
| operatingHours | VARCHAR | Hours of operation |
| status | VARCHAR | active, closed, maintenance |

### stalls
Market stalls.
| Column | Type | Description |
|--------|------|-------------|
| stallId | UUID | Primary key |
| councilId | UUID | Foreign key to councils |
| marketId | UUID | Foreign key to markets |
| stallNo | VARCHAR | Stall number |
| category | VARCHAR | produce, crafts, food |
| size | VARCHAR | Stall dimensions |
| dailyRate | DECIMAL | Daily rental rate |
| monthlyRate | DECIMAL | Monthly rental rate |
| status | VARCHAR | available, occupied, reserved |

## Rate Assessments

### rateAssessments
Property rate assessment records.

## Audit

### auditLogs
Immutable audit trail.
| Column | Type | Description |
|--------|------|-------------|
| logId | UUID | Primary key |
| councilId | UUID | Foreign key to councils |
| userId | UUID | User who performed action |
| action | VARCHAR | create, update, delete |
| entityType | VARCHAR | Entity type affected |
| entityId | VARCHAR | Entity ID affected |
| oldValue | JSONB | Previous state |
| newValue | JSONB | New state |
| createdAt | TIMESTAMP | Timestamp |

## Multi-Tenancy

All tables include `councilId` as a foreign key to enforce data isolation between councils. This enables:
- Row-Level Security (RLS) policies
- Location-Based Access Control (LBAC)
- Complete data separation between councils

## PNG-Specific Conventions

- Currency: PGK (Papua New Guinea Kina)
- Timezone: Pacific/Port_Moresby
- Addressing: Section/Lot format
- Spelling: British English ("licence" not "license")
- National ID integration support
