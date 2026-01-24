# LGIS Deployment Guide - Hostinger Cloud Hosting
**Application**: Local Government Information System (LGIS)  
**Target**: National Capital District Commission (NCDC)  
**Platform**: Hostinger Cloud Hosting  
**Created**: 2026-01-21

---

## 📋 Pre-Deployment Checklist

### ✅ System Requirements Verified
- [x] Node.js 20+ installed
- [x] PostgreSQL 14+ database configured
- [x] SSL certificate ready
- [x] Domain DNS configured
- [x] Backup system in place

### ✅ Code Ready for Production
- [x] All tests passing
- [x] Security features implemented
- [x] Email notifications configured
- [x] Branding correctly applied (NCDC Yellow/Black)
- [x] Database migrations complete

---

## 🚀 Deployment Steps

### Step 1: Build Production Bundle

```bash
# Navigate to project directory
cd c:\lgis

# Install dependencies
npm install --production=false

# Build frontend and backend
npm run build

# Verify build artifacts
# Should create: dist/index.cjs, dist/client/
```

**Expected Output**:
- `dist/index.cjs` - Server bundle
- `dist/client/` - Static frontend assets
- `dist/package.json` - Production dependencies list

---

### Step 2: Database Setup on Hostinger

#### 2.1 Create PostgreSQL Database

1. Log into Hostinger Control Panel
2. Navigate to **Databases** → **PostgreSQL**
3. Create new database:
   - **Name**: `lgis_production`
   - **User**: `lgis_user`
   - **Password**: [Generate strong password]
   - **Note credentials**: Save securely!

4. Get connection details:
   ```
   Host: [Hostinger provides - usually like postgresql-XXXXX.hosting.com]
   Port: 5432
   Database: lgis_production
   User: lgis_user
   Password: [your generated password]
   ```

#### 2.2 Initialize Database Schema

```bash
# On local machine, connect to production database
# Replace placeholders with actual Hostinger credentials
export DATABASE_URL="postgresql://lgis_user:PASSWORD@HOST:5432/lgis_production"

# Push schema
npx drizzle-kit push

# Seed initial data
npx tsx --env-file=.env server/seed.ts
npx tsx --env-file=.env server/run_seed.ts
```

**⚠️ IMPORTANT**: Make sure seeding completes successfully before proceeding!

---

### Step 3: Configure Environment Variables

Create `.env.production` file:

```bash
# Database
DATABASE_URL=postgresql://lgis_user:PASSWORD@HOST:5432/lgis_production

# Server
NODE_ENV=production
PORT=5000

# Email (Gmail SMTP)
EMAIL_USER=ncdc.licensing@gmail.com
EMAIL_PASS=[App-specific password from Gmail]

# Session Secret (Generate new one for production!)
SESSION_SECRET=[Run: openssl rand -base64 32]

# CORS (Your production domain)
CORS_ORIGIN=https://lgis.ncdc.gov.pg

# Frontend URL (for emails)
FRONTEND_URL=https://lgis.ncdc.gov.pg
```

**Security Note**: Never commit `.env.production` to Git!

---

### Step 4: Upload to Hostinger

#### Option A: FTP Upload (Recommended for first deployment)

1. Use FileZilla or WinSCP
2. Connect parameters:
   - **Host**: [From Hostinger FTP credentials]
   - **Username**: [From Hostinger]
   - **Password**: [From Hostinger]
   - **Port**: 21 (or 22 for SFTP)

3. Upload these directories/files:
   ```
   /dist/              → /public_html/lgis/dist/
   /node_modules/      → /public_html/lgis/node_modules/  (production only)
   /uploads/           → /public_html/lgis/uploads/
   /.env.production    → /public_html/lgis/.env
   /package.json       → /public_html/lgis/package.json
   ```

4. **DO NOT upload**:
   - `.git/`
   - `node_modules/` (dev dependencies)
   - `client/src/`
   - `server/` (source - only dist/)
   - `.env` (local env file)

#### Option B: Git Deployment (Advanced)

```bash
# On Hostinger server via SSH
cd /public_html/lgis
git clone https://github.com/your-org/lgis.git .
npm install --production
npm run build
```

---

### Step 5: Configure Node.js Application

1. Log into Hostinger Control Panel
2. Navigate to **Advanced** → **Node.js**
3. Click **Create Application**:
   - **Node.js Version**: 20.x or later
   - **Application Mode**: Production
   - **Application Root**: `/public_html/lgis`
   - **Application URL**: `https://lgis.ncdc.gov.pg`
   - **Application Startup File**: `dist/index.cjs`

4. Set Environment Variables in Hostinger panel:
   - Copy all from `.env.production`
   - Paste into Hostinger Node.js env var section

5. Click **Save** and **Start Application**

---

### Step 6: Configure Reverse Proxy (Apache/Nginx)

If using custom domain, add this to your `.htaccess`:

```apache
# .htaccess in /public_html/
RewriteEngine On
RewriteCond %{REQUEST_URI} !^/lgis
RewriteRule ^(.*)$ /lgis/$1 [L,P]

# Proxy WebSocket connections
RewriteCond %{HTTP:Upgrade} websocket [NC]
RewriteCond %{HTTP:Connection} upgrade [NC]
RewriteRule .* ws://localhost:5000/$1 [P,L]

# Proxy all other requests
ProxyPass / http://localhost:5000/
ProxyPassReverse / http://localhost:5000/
```

For Nginx:

```nginx
server {
    listen 443 ssl http2;
    server_name lgis.ncdc.gov.pg;

    ssl_certificate /path/to/ssl/cert.pem;
    ssl_certificate_key /path/to/ssl/key.pem;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

---

### Step 7: SSL Certificate Setup

1. In Hostinger, go to **SSL/TLS**
2. Request free Let's Encrypt SSL:
   - Domain: `lgis.ncdc.gov.pg`
   - Auto-renewal: Enabled
3. Click **Install**
4. Verify HTTPS works: `https://lgis.ncdc.gov.pg`

---

### Step 8: Email Service Configuration

#### Option 1: Gmail SMTP (Current Setup)

1. Go to Google Account → Security
2. Enable 2-Step Verification
3. Generate App Password:
   - Select "Mail"
   - Select "Other (Custom name)" → "LGIS Notifications"
   - Copy the 16-character password
4. Update `.env.production` with this password

#### Option 2: SendGrid (Recommended for Production)

```bash
EMAIL_SERVICE=sendgrid
SENDGRID_API_KEY=[Your SendGrid API key]
EMAIL_FROM=notifications@ncdc.gov.pg
```

Update `server/email.ts`:
```typescript
const transporter = nodemailer.createTransport({
    service: 'SendGrid',
    auth: {
        user: 'apikey',
        pass: process.env.SENDGRID_API_KEY
    }
});
```

---

### Step 9: Post-Deployment Verification

#### 9.1 Health Check

Visit these URLs and verify:

1. **Homepage**: `https://lgis.ncdc.gov.pg/`
   - [ ] NCDC branding loads correctly
   - [ ] Yellow/Black theme applied

2. **Backend API**: `https://lgis.ncdc.gov.pg/api/v1/councils`
   - [ ] Returns JSON with NCDC council data

3. **Login**: `https://lgis.ncdc.gov.pg/auth/login`
   - [ ] Can login as admin@ncdc.gov.pg
   - [ ] Dashboard loads after login

4. **Database Connection**: Check server logs
   -[ ] No connection errors
   - [ ] Successful queries logged

#### 9.2 Functional Tests

- [ ] Create a citizen record
- [ ] Submit a license application
- [ ] Upload a document
- [ ] Review and approve a document
- [ ] Verify email notification sent
- [ ] Check revenue dashboard shows real data
- [ ] Test break-glass security (request → approve → access)

#### 9.3 Performance Check

```bash
# Test response times
curl -w "@curl-format.txt" -o /dev/null -s https://lgis.ncdc.gov.pg/
# Target: < 2 seconds for first load
```

---

### Step 10: Configure Automated Backups

#### Database Backups

Create backup script: `/home/lgis/backup-db.sh`

```bash
#!/bin/bash
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/home/lgis/backups"
DB_NAME="lgis_production"
DB_USER="lgis_user"

# Create backup
pg_dump -U $DB_USER -h localhost $DB_NAME | gzip > $BACKUP_DIR/lgis_$TIMESTAMP.sql.gz

# Keep only last 30 days
find $BACKUP_DIR -name "lgis_*.sql.gz" -mtime +30 -delete

echo "Backup completed: lgis_$TIMESTAMP.sql.gz"
```

Add to crontab (runs daily at 2 AM):
```bash
0 2 * * * /home/lgis/backup-db.sh
```

#### File Backups

```bash
# Backup uploads directory
tar -czf /home/lgis/backups/uploads_$(date +%Y%m%d).tar.gz /public_html/lgis/uploads
```

---

## 🔒 Security Hardening

### 1. Firewall Rules

Ensure only these ports are open:
- **80** (HTTP - redirects to HTTPS)
- **443** (HTTPS)
- **22** (SSH - restricted to admin IPs)
- **5432** (PostgreSQL - localhost only)

### 2. Database Security

```sql
-- Revoke public access
REVOKE ALL ON DATABASE lgis_production FROM PUBLIC;

-- Grant specific permissions
GRANT CONNECT ON DATABASE lgis_production TO lgis_user;
GRANT USAGE ON SCHEMA public TO lgis_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO lgis_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO lgis_user;
```

### 3. Application Security

- [ ] CORS configured for production domain only
- [ ] Session secret is strong and unique
- [ ] SQL injection protection (using Drizzle ORM)
- [ ] XSS protection (React escapes by default)
- [ ] CSRF tokens enabled
- [ ] Rate limiting implemented

### 4. File Upload Security

```javascript
// In server/upload_middleware.ts - verify these limits exist:
const upload = multer({
    dest: 'uploads/',
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB max
    },
    fileFilter: (req, file, cb) => {
        // Only allow specific types
        const allowed = ['image/jpeg', 'image/png', 'application/pdf'];
        if (allowed.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type'));
        }
    }
});
```

---

## 📊 Monitoring & Logging

### Application Logs

View logs in Hostinger:
```bash
# Via SSH
tail -f /home/lgis/logs/application.log

# Or through Hostinger panel: Node.js → Logs
```

### Error Monitoring

Add PM2 for process management:

```bash
npm install -g pm2

# Start application with PM2
pm2 start dist/index.cjs --name lgis-ncdc

# Enable auto-restart on crash
pm2 startup
pm2 save

# Monitor
pm2 monit
```

### Database Query Monitoring

```sql
-- Enable query logging in PostgreSQL
ALTER SYSTEM SET log_statement = 'all';
SELECT pg_reload_conf();

-- View slow queries
SELECT * FROM pg_stat_statements
WHERE mean_exec_time > 1000
ORDER BY mean_exec_time DESC
LIMIT 10;
```

---

## 🔄 Update & Maintenance Procedures

### Deploying Updates

```bash
# 1. Build new version locally
npm run build

# 2. Create backup of production
ssh lgis@hostinger
cd /public_html/lgis
tar -czf ../lgis-backup-$(date +%Y%m%d).tar.gz .

# 3. Upload new dist/ folder
# Via FTP or:
scp -r dist/* lgis@hostinger:/public_html/lgis/dist/

# 4. Restart application
pm2 restart lgis-ncdc

# 5. Verify
curl https://lgis.ncdc.gov.pg/api/health
```

### Database Migrations

```bash
# Test migration locally first!
npx drizzle-kit generate:pg

# Apply to production (with backup)
pg_dump lgis_production > backup_pre_migration.sql
npx drizzle-kit push
```

---

## 🆘 Troubleshooting

### Issue: Application won't start

**Check**:
1. Node.js version compatible (20+)
2. Environment variables set correctly
3. Database connection working
4. Port 5000 not already in use

**Debug**:
```bash
# View full logs
pm2 logs lgis-ncdc --lines 100

# Test database connection
psql $DATABASE_URL -c "SELECT 1;"
```

### Issue: White screen / No frontend

**Check**:
1. Static files in `dist/client/` uploaded
2. Server is serving static files correctly
3. Browser console for errors

**Fix**:
```javascript
// Verify in dist/index.cjs:
app.use(express.static(join(__dirname, 'client')));
```

### Issue: Email not sending

**Check**:
1. EMAIL_USER and EMAIL_PASS set correctly
2. Gmail app password (not regular password)
3. Server logs for SMTP errors

**Test**:
```javascript
// Add test endpoint temporarily:
app.get('/test-email', async (req, res) => {
    await sendEmail({
        to: 'test@example.com',
        subject: 'Test',
        text: 'Testing'
    });
    res.json({ success: true });
});
```

### Issue: Database connection failed

**Check**:
1. DATABASE_URL format correct
2. PostgreSQL service running
3. Firewall not blocking port 5432
4. Credentials correct

**Test**:
```bash
psql "postgresql://lgis_user:PASSWORD@HOST:5432/lgis_production" -c "\dt"
```

---

## 📞 Support Contacts

### Hostinger Support
- **Panel**: https://hpanel.hostinger.com
- **Support**: Available 24/7 via live chat
- **Docs**: https://support.hostinger.com

### Technical Support
- **Database Issues**: Check Hostinger PostgreSQL docs
- **Node.js Issues**: https://nodejs.org/docs
- **SSL Issues**: Let's Encrypt community forum

---

## ✅ Launch Checklist

**Pre-Launch** (1 week before):
- [ ] Run full security audit
- [ ] Complete UAT with NCDC staff
- [ ] Verify all email templates
- [ ] Test break-glass workflow
- [ ] Create admin user accounts
- [ ] Import any existing data

**Launch Day**:
- [ ] Final database backup
- [ ] Deploy production build
- [ ] Verify SSL certificate
- [ ] Test all critical paths
- [ ] Monitor error logs
- [ ] Send launch announcement

**Post-Launch** (1 week after):
- [ ] Monitor performance metrics
- [ ] Review error logs daily
- [ ] Gather user feedback
- [ ] Address any issues
- [ ] Schedule training sessions

---

**Deployment Status**: Ready  
**Expected Downtime**: None (initial deployment)  
**Rollback Plan**: Restore from backup tarball  
**Next Review**: 1 week post-launch
