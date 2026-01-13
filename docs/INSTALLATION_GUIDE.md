# LGIS Installation Guide

## Prerequisites

- Node.js 18+ 
- PostgreSQL 14+
- npm or yarn

## Quick Start

### 1. Clone/Download the Project

Download the project files as a ZIP or clone from your repository.

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Database

Set the `DATABASE_URL` environment variable:

```bash
export DATABASE_URL="postgresql://user:password@host:port/database"
```

### 4. Initialize Database Schema

```bash
npm run db:push
```

### 5. Seed Initial Data

```bash
npx tsx server/seed.ts
```

### 6. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5000`.

---

## Restoring from Backup

### Database Restoration

If you have a `database_backup.sql` file:

```bash
psql $DATABASE_URL < database_backup.sql
```

This will restore all tables and data.

---

## Environment Variables

Create a `.env` file or set these environment variables:

| Variable | Required | Description |
|----------|----------|-------------|
| DATABASE_URL | Yes | PostgreSQL connection string |
| NODE_ENV | No | development or production |
| SESSION_SECRET | No | Secret for session encryption |

### Example DATABASE_URL formats:

**Local PostgreSQL:**
```
postgresql://postgres:password@localhost:5432/lgis
```

**Replit PostgreSQL:**
```
postgresql://user:pass@host.replit.dev:5432/database
```

**Neon PostgreSQL:**
```
postgresql://user:pass@ep-xxx.region.neon.tech/neondb?sslmode=require
```

---

## Production Deployment

### Building for Production

```bash
npm run build
```

### Running in Production

```bash
npm start
```

### Replit Deployment

1. Click "Deploy" in the Replit interface
2. Configure domain settings
3. Application will auto-deploy with PostgreSQL

---

## Seed Data Summary

The seed script creates:

| Entity | Count |
|--------|-------|
| Councils | 2 |
| Council Units | 4 |
| Permissions | 24 |
| Roles | 4 |
| Users | 2 |
| Citizens | 2 |
| Businesses | 2 |
| Accounts | 4 |
| Services | 4 |
| Fee Schedules | 2 |
| Properties | 3 |
| Markets | 1 |
| Stalls | 3 |
| Complaints | 2 |
| Assets | 4 |

---

## Default Credentials

**Admin User:**
- Email: admin@ncdc.gov.pg
- Password: admin123 (change immediately)

**Officer User:**
- Email: officer@ncdc.gov.pg
- Password: officer123

---

## Troubleshooting

### Database Connection Failed

1. Check DATABASE_URL is set correctly
2. Verify PostgreSQL is running
3. Check network/firewall settings

### Schema Push Failed

1. Ensure database exists
2. Check user has CREATE TABLE permissions
3. Try dropping all tables and re-pushing

### Application Won't Start

1. Check all dependencies installed: `npm install`
2. Verify Node.js version: `node --version`
3. Check for port conflicts on 5000

---

## Support

For technical support, refer to the documentation files in the `/docs` directory:

- `DATABASE_SCHEMA.md` - Database table documentation
- `API_REFERENCE.md` - REST API endpoints
- `PROJECT_STRUCTURE.md` - Codebase organization
