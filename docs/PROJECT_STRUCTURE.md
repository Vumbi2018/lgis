# LGIS Project Structure

## Directory Layout

```
lgis/
├── client/                    # Frontend React application
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── layout/        # Layout components (MainLayout, Sidebar)
│   │   │   └── ui/            # Shadcn/ui component library
│   │   ├── contexts/          # React Context providers
│   │   ├── hooks/             # Custom React hooks
│   │   ├── lib/               # Utility functions
│   │   ├── pages/             # Page components
│   │   │   ├── assets/        # Council assets and facilities
│   │   │   ├── dashboard/     # Dashboard page
│   │   │   ├── registry/      # Citizens, Businesses
│   │   │   ├── licensing/     # Licences and permits
│   │   │   ├── procurement/   # Purchase orders and procurement
│   │   │   ├── revenue/       # Billing and payments
│   │   │   ├── inspections/   # Inspection management
│   │   │   ├── complaints/    # Complaint handling
│   │   │   ├── enforcement/   # Enforcement cases
│   │   │   ├── markets/       # Market management
│   │   │   ├── reports/       # Reporting
│   │   │   ├── settings/      # System settings
│   │   │   └── audit/         # Audit logs
│   │   ├── App.tsx            # Main app with routing
│   │   ├── index.css          # Global styles
│   │   └── main.tsx           # Entry point
│   └── index.html             # HTML template
│
├── server/                    # Backend Express application
│   ├── db.ts                  # Database connection
│   ├── index.ts               # Server entry point
│   ├── routes.ts              # API route definitions
│   ├── seed.ts                # Database seed script
│   └── storage.ts             # Data access layer (Drizzle ORM)
│
├── shared/                    # Shared code between client/server
│   └── schema.ts              # Drizzle schema definitions
│
├── docs/                      # Documentation
│   ├── DATABASE_SCHEMA.md     # Database documentation
│   ├── API_REFERENCE.md       # API documentation
│   └── PROJECT_STRUCTURE.md   # This file
│
├── database_backup.sql        # Database export
├── drizzle.config.ts          # Drizzle ORM configuration
├── package.json               # Node.js dependencies
├── tsconfig.json              # TypeScript configuration
├── vite.config.ts             # Vite bundler configuration
├── tailwind.config.ts         # Tailwind CSS configuration
└── replit.md                  # Project summary for Replit
```

## Key Files

### Frontend

| File | Purpose |
|------|---------|
| `client/src/App.tsx` | Main router and page registration |
| `client/src/pages/registry/index.tsx` | Citizen/Business/Asset management |
| `client/src/components/layout/main-layout.tsx` | App shell with sidebar |
| `client/src/lib/queryClient.ts` | TanStack Query configuration |
| `client/src/contexts/organization-context.tsx` | Council/organization state |

### Backend

| File | Purpose |
|------|---------|
| `server/index.ts` | Express server setup |
| `server/routes.ts` | All API endpoint definitions |
| `server/storage.ts` | Database operations (CRUD) |
| `server/seed.ts` | Sample data population |
| `server/db.ts` | PostgreSQL connection |

### Shared

| File | Purpose |
|------|---------|
| `shared/schema.ts` | All 35 Drizzle table definitions |

## Technology Stack

### Frontend
- React 18 with TypeScript
- Wouter for routing
- TanStack Query for data fetching
- Shadcn/ui + Radix UI components
- Tailwind CSS v4
- Recharts for visualizations

### Backend
- Node.js with Express
- TypeScript with ESM
- Drizzle ORM
- PostgreSQL database
- Passport.js for auth

### Development
- Vite for building
- TSX for TypeScript execution
- Drizzle Kit for migrations

## Running the Application

### Development
```bash
npm run dev
```
This starts the Express server with Vite middleware for hot reloading.

### Database Operations
```bash
# Push schema changes
npm run db:push

# Seed database
npx tsx server/seed.ts

# Export database
pg_dump $DATABASE_URL > database_backup.sql
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| DATABASE_URL | PostgreSQL connection string |
| NODE_ENV | development or production |
| SESSION_SECRET | Express session secret |

## Modules Overview

1. **Council Setup** - Multi-tenant organization management
2. **User Management** - RBAC/LBAC with roles and permissions
3. **Citizen Registry** - Individual resident records
4. **Business Registry** - Commercial entity records
5. **Property Registry** - Land and building records
6. **Asset Management** - Council assets and facilities
7. **Service Catalogue** - Available services and fees
8. **Licensing** - Licence issuance and renewals
9. **Revenue & Billing** - Invoices and accounts
10. **Payments** - Multi-channel payment recording
11. **Inspections** - Compliance inspections
12. **Enforcement** - Violations and penalties
13. **Complaints** - Public grievance handling
14. **Markets** - Market and stall management
15. **Procurement** - Purchase orders and inventory
16. **Audit Logs** - Immutable activity tracking
