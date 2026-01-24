# LGIS API Reference

## Base URL

Development: `http://localhost:5000`  
Production: `https://your-app.replit.app`

## Authentication

Session-based authentication using Passport.js with local strategy.

## API Versions

- `/api/v1/*` - Specification-compliant endpoints (uses X-Council-Id header)
- `/api/*` - Legacy endpoints (uses query parameters)

## Endpoints

### Councils

#### GET /api/councils
List all councils.

**Response:**
```json
[
  {
    "councilId": "uuid",
    "name": "National Capital District Commission",
    "level": "city",
    "countryCode": "PG",
    "currencyCode": "PGK",
    "timezone": "Pacific/Port_Moresby",
    "status": "active"
  }
]
```

#### GET /api/councils/:councilId
Get single council by ID.

---

### Citizens

#### GET /api/citizens
List all citizens.

**Query Parameters:**
- `councilId` or `organizationId` - Filter by council

**Response:**
```json
[
  {
    "citizenId": "uuid",
    "councilId": "uuid",
    "nationalId": "NID-2024-00123",
    "localCitizenNo": "NCDC-CIT-0001",
    "firstName": "Michael",
    "lastName": "Kila",
    "dob": "1985-03-15",
    "phone": "+675 7234 5678",
    "email": "mkila@email.pg",
    "address": "Section 45, Lot 12, Boroko",
    "status": "active"
  }
]
```

#### POST /api/citizens
Create new citizen.

**Request Body:**
```json
{
  "organizationId": "uuid",
  "firstName": "John",
  "lastName": "Doe",
  "nationalId": "NID-2024-XXXXX",
  "phone": "+675 7XXX XXXX",
  "email": "john@email.pg",
  "address": "Section XX, Lot XX, Suburb"
}
```

#### PATCH /api/citizens/:citizenId
Update citizen record.

**Request Body:** Partial citizen object with fields to update.

---

### Businesses

#### GET /api/businesses
List all businesses.

**Query Parameters:**
- `councilId` or `organizationId` - Filter by council

**Response:**
```json
[
  {
    "businessId": "uuid",
    "councilId": "uuid",
    "registrationNo": "BIZ-2020-0045",
    "tin": "TIN-987654321",
    "legalName": "Papindo Trading Limited",
    "tradingName": "Papindo Supermarket",
    "businessType": "Company",
    "industry": "Retail",
    "ownerName": "John Kamaso",
    "status": "active"
  }
]
```

#### POST /api/businesses
Create new business.

**Request Body:**
```json
{
  "organizationId": "uuid",
  "legalName": "Company Name",
  "tradingName": "Trading As",
  "tin": "TIN-XXXXXXXXX",
  "businessType": "company",
  "ownerName": "Owner Name",
  "industry": "Retail"
}
```

#### PATCH /api/businesses/:businessId
Update business record.

---

### Properties

#### GET /api/properties
List all properties.

#### GET /api/properties/:propertyId
Get single property.

#### POST /api/properties
Create new property.

---

### Assets

#### GET /api/v1/assets
List all council assets.

**Response:**
```json
[
  {
    "assetId": "uuid",
    "councilId": "uuid",
    "assetNo": "AST-001",
    "name": "Boroko Market Stall Block A",
    "type": "market_facility",
    "location": "Boroko",
    "condition": "good",
    "value": "PGK 15,000",
    "status": "active"
  }
]
```

#### POST /api/v1/assets
Create new asset.

---

### Procurement

#### GET /api/v1/procurement/orders
List purchase orders.

**Response:**
```json
[
  {
    "orderId": "uuid",
    "description": "Office Supplies",
    "totalAmount": 1500.50,
    "status": "approved",
    "orderDate": "2024-03-20"
  }
]
```

#### POST /api/v1/procurement/orders
Create purchase order.

#### GET /api/v1/procurement/orders/:id
Get purchase order details with line items.

---

### Services

#### GET /api/services
List service catalogue.

#### POST /api/services
Create new service.

---

### Licences

#### GET /api/licences
List all licences.

#### POST /api/licences
Issue new licence.

---

### Inspections

#### GET /api/inspections
List all inspections.

#### POST /api/inspections
Schedule new inspection.

---

### Complaints

#### GET /api/complaints
List all complaints.

#### POST /api/complaints
Submit new complaint.

---

### Payments

#### GET /api/payments
List all payments.

#### POST /api/payments
Record new payment.

---

### Invoices

#### GET /api/invoices
List all invoices.

#### POST /api/invoices
Create new invoice.

---

### Markets & Stalls

#### GET /api/markets
List all markets.

#### GET /api/stalls
List all stalls.

---

### Enforcement

#### GET /api/enforcement
List enforcement cases.

---

### Audit Logs

#### GET /api/audit-logs
List audit trail entries.

---

### Dashboard

#### GET /api/dashboard/stats
Get dashboard statistics.

**Response:**
```json
{
  "citizens": 100,
  "businesses": 50,
  "properties": 200,
  "complaints": 25
}
```

---

## V1 API (Specification-Compliant)

Uses `X-Council-Id` header for multi-tenancy.

### Headers

```
X-Council-Id: <council-uuid>
Content-Type: application/json
```

### Endpoints

- `GET /api/v1/citizens`
- `GET /api/v1/citizens/:citizenId`
- `POST /api/v1/citizens`
- `GET /api/v1/businesses`
- `GET /api/v1/businesses/:businessId`
- `POST /api/v1/businesses`
- `GET /api/v1/properties`
- `GET /api/v1/services`
- `GET /api/v1/licences`
- `GET /api/v1/inspections`
- `GET /api/v1/complaints`
- `GET /api/v1/payments`
- `GET /api/v1/invoices`
- `GET /api/v1/markets`
- `GET /api/v1/stalls`
- `GET /api/v1/enforcement`
- `GET /api/v1/audit-logs`
- `GET /api/v1/assets`
- `GET /api/v1/procurement/orders`

---

## Error Responses

```json
{
  "error": "Error message description"
}
```

**Status Codes:**
- 200: Success
- 201: Created
- 400: Bad Request
- 404: Not Found
- 500: Internal Server Error

---

## Pagination (Future)

Standard query parameters:
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 50)
- `sort` - Sort field
- `order` - asc or desc
