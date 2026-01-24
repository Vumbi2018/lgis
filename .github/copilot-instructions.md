# LGIS Copilot Instructions

## Architecture Overview

LGIS is a multi-tenant Local Government Information System for Papua New Guinea councils. It follows a client-server architecture:

- **Frontend**: React 18 + TypeScript, Wouter routing, TanStack Query, Shadcn/ui + Radix UI components, Tailwind CSS v4
- **Backend**: Node.js + Express + TypeScript, Drizzle ORM, PostgreSQL
- **Multi-tenancy**: All data scoped by `councilId` (UUID primary keys)
- **Modules**: Registry (citizens/businesses/properties/assets), Licensing, Revenue, Inspections, Complaints, Enforcement, Markets, Audit Logs

## Key Files & Structure

- `shared/schema.ts`: 35 Drizzle table definitions with Zod schemas
- `server/routes.ts`: All API endpoints (1250+ lines)
- `server/storage.ts`: Database operations layer
- `client/src/App.tsx`: Route definitions for all pages
- `client/src/lib/api.ts`: API client with organized methods
- `client/src/contexts/organization-context.tsx`: Council/organization state management

## Development Workflows

### Starting Development
```bash
npm run dev  # Starts Express server with Vite middleware on port 5000
```

### Database Operations
```bash
npm run db:push        # Push schema changes to PostgreSQL
npx tsx server/seed.ts # Seed initial data
```

### Building for Production
```bash
npm run build  # Custom esbuild + Vite build script
npm start      # Production server
```

### Debugging & Maintenance
- Debug scripts in `scripts/` folder (e.g., `debug-fetch.ts`, `check-columns.ts`)
- Run with: `npx tsx scripts/debug-fetch.ts`
- Check logs: `server.log`, `debug_output.txt`

## Project Conventions

### Multi-Tenancy
- Every table has `councilId` foreign key
- API requests use `X-Council-Id` header (v1) or `organizationId` query param (legacy)
- Frontend stores current organization in localStorage

### Authentication & Authorization
- Session-based auth with Passport.js local strategy
- RBAC/LBAC: users → roles → permissions
- Audit logging for all data changes (immutable `audit_logs` table)

### API Patterns
- RESTful endpoints in `server/routes.ts`
- Zod validation using shared schemas
- Error handling with try/catch and audit logging
- File uploads via Multer to `uploads/` directory

### Frontend Patterns
- Shadcn/ui components in `client/src/components/ui/`
- Custom hooks in `client/src/hooks/`
- Page components in `client/src/pages/` with subfolders per module
- TanStack Query for server state management

### Database Patterns
- UUID primary keys with `gen_random_uuid()`
- Foreign keys as `varchar` (not UUID type)
- JSONB for flexible data storage
- Timestamps with `defaultNow()`

## Common Tasks

### Adding New Module
1. Define tables in `shared/schema.ts`
2. Add Zod schemas for insert/select
3. Implement CRUD in `server/storage.ts`
4. Add routes in `server/routes.ts` with audit logging
5. Create API methods in `client/src/lib/api.ts`
6. Add page components and routes in `client/src/`

### Database Schema Changes
1. Update `shared/schema.ts`
2. Run `npm run db:push`
3. Update server storage methods if needed
4. Test with debug scripts

### Adding UI Components
- Use Shadcn/ui: copy from `client/src/components/ui/`
- Follow existing patterns for forms, tables, dialogs
- Use `cn()` utility for Tailwind class merging

## Environment & Deployment

- **Database**: PostgreSQL with `DATABASE_URL` env var
- **Session Secret**: `SESSION_SECRET` for Express sessions
- **Production**: Built to single `dist/index.cjs` file
- **Development**: Hot reload via Vite middleware

## Gotchas

- Always scope queries by `councilId` for multi-tenancy
- Use `organizationId` in legacy API calls, `councilId` in v1
- Audit log all mutations with `logAudit()` helper
- Check `scripts/` for existing debug/fix utilities before writing new ones
- Frontend assumes single active organization context