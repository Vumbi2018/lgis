# LGIS - Local Government Information System

## Overview

LGIS is a modular, multi-tenant digital platform designed for local government operations in Papua New Guinea. It digitizes municipal services including licensing, revenue collection, inspections, enforcement, and citizen services. The system supports multiple councils/jurisdictions with role-based access control and comprehensive audit logging.

The platform targets both internal government users (administrators, finance managers, licensing officers) and external users (citizens, businesses) through a web-first interface with offline-first mobile capabilities planned.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state, React Context for organization switching
- **UI Components**: Shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS v4 with CSS variables for theming
- **Charts**: Recharts for dashboard visualizations
- **Build Tool**: Vite with custom plugins for Replit integration

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ESM modules
- **API Pattern**: RESTful JSON API under `/api/*` prefix
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Session Management**: Express sessions with PostgreSQL storage (connect-pg-simple)

### Data Storage
- **Database**: PostgreSQL (required, configured via DATABASE_URL)
- **Schema Location**: `shared/schema.ts` using Drizzle table definitions
- **Migrations**: Drizzle Kit with `drizzle-kit push` for schema sync
- **Validation**: Zod schemas generated from Drizzle tables via drizzle-zod

### Multi-Tenancy Model
- Organizations table serves as tenant isolation boundary
- All data entities include `organizationId` foreign key
- Frontend context provider manages current organization state
- API endpoints filter data by organization context

### Core Data Entities
- **Organizations**: Council/jurisdiction management (City, District, Province types)
- **Citizens Registry**: Individual resident records with NID tracking
- **Business Registry**: Commercial entity registration
- **Properties**: Land/building records
- **Licenses**: License applications and issued licenses
- **Inspections**: Compliance inspection records
- **Enforcement Cases**: Violation tracking and penalties
- **Complaints**: Public interaction and grievance handling
- **Invoices/Transactions**: Revenue management
- **Audit Logs**: Immutable action logging for compliance

### Authentication & Authorization
- Session-based authentication with Passport.js (passport-local strategy)
- Role-based access: officer, admin, manager roles on users table
- Organization-scoped data access (location-based access control planned)

## External Dependencies

### Database
- **PostgreSQL**: Primary data store, connection via `DATABASE_URL` environment variable
- **Drizzle ORM**: Type-safe database queries and schema management

### Frontend Libraries
- **@tanstack/react-query**: Async state management and caching
- **@tanstack/react-table**: Data table functionality
- **Radix UI**: Accessible UI primitives (dialogs, dropdowns, forms, etc.)
- **Recharts**: Dashboard charts and data visualization
- **date-fns**: Date formatting and manipulation

### Backend Libraries
- **Express.js**: HTTP server and middleware
- **connect-pg-simple**: PostgreSQL session storage
- **multer**: File upload handling (planned)
- **nodemailer**: Email notifications (planned)
- **jsonwebtoken**: JWT token support (available)

### Development & Build
- **Vite**: Frontend dev server and bundler
- **esbuild**: Production server bundling
- **TSX**: TypeScript execution for development
- **Tailwind CSS v4**: Utility-first styling with @tailwindcss/vite plugin

### Replit-Specific
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-cartographer**: Code navigation (dev only)
- **@replit/vite-plugin-dev-banner**: Development environment indicator