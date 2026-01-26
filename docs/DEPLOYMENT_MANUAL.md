# LGIS Deployment Manual

**Local Government Information System - Deployment & Operations Guide**

Version 1.0 | January 2026

---

## Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [Local Development Setup](#2-local-development-setup)
3. [Database Setup](#3-database-setup)
4. [Environment Configuration](#4-environment-configuration)
5. [Production Build](#5-production-build)
6. [Server Deployment](#6-server-deployment)
7. [Database Deployment](#7-database-deployment)
8. [SSL & Domain Setup](#8-ssl--domain-setup)
9. [Mobile App Deployment](#9-mobile-app-deployment)
10. [Monitoring & Maintenance](#10-monitoring--maintenance)
11. [Backup & Recovery](#11-backup--recovery)
12. [Troubleshooting](#12-troubleshooting)
13. [Updates & Upgrades](#13-updates--upgrades)

---

## 1. Prerequisites

### 1.1 Development Machine Requirements

**Software:**
- Node.js 18+ (LTS recommended)
- PostgreSQL 14+
- Git 2.30+
- Code editor (VS Code recommended)
- Android Studio (for mobile development)

**Hardware:**
- 8GB RAM minimum (16GB recommended)
- 50GB free disk space
- Stable internet connection

### 1.2 Production Server Requirements

**VPS/Cloud Server:**
- OS: Ubuntu 22.04 LTS or similar
- CPU: 2 cores minimum
- RAM: 2GB minimum (4GB recommended)
- Storage: 20GB SSD minimum
- Network: 100Mbps connection

**Domain & DNS:**
- Registered domain name
- DNS access for configuration
- SSL certificate (Let's Encrypt free)

**Access:**
- SSH access with sudo privileges
- FTP/SFTP access (optional)
- Database access (PostgreSQL)

---

## 2. Local Development Setup

### 2.1 Install Node.js

**Windows:**
1. Download from https://nodejs.org/
2. Run installer (choose LTS version)
3. Verify installation:
```bash
node --version  # Should show v18.x.x or higher
npm --version   # Should show v9.x.x or higher
```

**macOS:**
```bash
brew install node@18
```

**Linux (Ubuntu):**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 2.2 Install PostgreSQL

**Windows:**
1. Download from https://www.postgresql.org/download/windows/
2. Run installer
3. Note the password you set for `postgres` user
4. Add to PATH: `C:\Program Files\PostgreSQL\14\bin`

**macOS:**
```bash
brew install postgresql@14
brew services start postgresql@14
```

**Linux (Ubuntu):**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### 2.3 Clone Repository

```bash
# Create workspace directory
mkdir ~/projects
cd ~/projects

# Clone repository
git clone https://github.com/your-council/lgis.git
cd lgis

# Install dependencies
npm install
```

Expected output:
```
added 1247 packages in 45s
```

### 2.4 Set Up Database

**Create Database:**

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE lgis_dev;

# Create user (optional)
CREATE USER lgis_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE lgis_dev TO lgis_user;

# Exit
\q
```

**Configure Connection:**

Create `.env` file:

```bash
cp .env.example .env
```

Edit `.env`:
```bash
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/lgis_dev
SESSION_SECRET=generate-a-random-secret-here
NODE_ENV=development
PORT=5000
```

**Push Schema:**

```bash
npm run db:push
```

Expected output:
```
[✓] Pushing schema changes...
[✓] Schema pushed successfully
```

**Seed Database:**

```bash
npx tsx server/seed.ts
```

Expected output:
```
✅ Seeded councils
✅ Seeded users
✅ Seeded license types
...
Seeding completed!
```

### 2.5 Start Development Server

```bash
npm run dev
```

Expected output:
```
> lgis@1.0.0 dev
> tsx --env-file=.env server/index.ts

📄 Swagger UI available at http://localhost:5000/api-docs
[DB] Connection successful
Server running on port 5000
```

**Verify Installation:**

1. Open browser
2. Navigate to `http://localhost:5000`
3. Should see login page
4. Login with default credentials:
   - Email: `admin@ncdc.gov.pg`
   - Password: `admin123`

---

## 3. Database Setup

### 3.1 PostgreSQL Installation (Production)

**Ubuntu Server:**

```bash
# Update package list
sudo apt update

# Install PostgreSQL
sudo apt install postgresql postgresql-contrib

# Start service
sudo systemctl start postgresql
sudo systemctl enable postgresql

#Verify
sudo systemctl status postgresql
```

### 3.2 Create Production Database

```bash
# Switch to postgres user
sudo -u postgres psql

# Create database
CREATE DATABASE lgis_prod;

# Create application user
CREATE USER lgis_app WITH PASSWORD 'very_secure_password_change_this';

# Grant privileges
GRANT ALL PRIVILEGES ON DATABASE lgis_prod TO lgis_app;

# Enable extensions
\c lgis_prod
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

# Exit
\q
```

### 3.3 Configure Remote Access (if needed)

Edit PostgreSQL config:

```bash
sudo nano /etc/postgresql/14/main/postgresql.conf
```

Change:
```
listen_addresses = 'localhost'
```
To:
```
listen_addresses = '*'
```

Edit pg_hba.conf:

```bash
sudo nano /etc/postgresql/14/main/pg_hba.conf
```

Add:
```
host    all             all             0.0.0.0/0               md5
```

Restart:
```bash
sudo systemctl restart postgresql
```

### 3.4 Firewall Configuration

```bash
# Allow PostgreSQL (only if remote access needed)
sudo ufw allow 5432/tcp

# Better: Restrict to specific IP
sudo ufw allow from YOUR_IP to any port 5432
```

---

## 4. Environment Configuration

### 4.1 Environment Variables

Create `.env` file on server:

```bash
# Database
DATABASE_URL=postgresql://lgis_app:password@localhost:5432/lgis_prod

# Session
SESSION_SECRET=generate-32-character-random-string

# Environment
NODE_ENV=production
PORT=5000

# Domain
DOMAIN=lgis.yourcouncil.gov.pg

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=noreply@yourcouncil.gov.pg
SMTP_PASS=your_email_password

# Payment Gateway (optional)
PAYMENT_API_KEY=your_payment_key
PAYMENT_API_SECRET=your_payment_secret

# File Upload
UPLOAD_DIR=/var/www/lgis/uploads
MAX_FILE_SIZE=5242880

# Mobile App
ANDROID_PACKAGE=pg.gov.yourcouncil.lgis
```

**Generate Secrets:**

```bash
# Session secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 4.2 Security Best Practices

**File Permissions:**

```bash
chmod 600 .env
chown www-data:www-data .env
```

**Never commit `.env` to Git:**

Verify `.gitignore` includes:
```
.env
.env.local
.env.production
```

---

## 5. Production Build

### 5.1 Build Process

**On Development Machine:**

```bash
# Install dependencies
npm install

# Type check
npm run typecheck

# Build
npm run build
```

Build output:
```
client/
└── dist/
    └── public/
        ├── assets/
        │   ├── index-ABC123.js
        │   └── index-XYZ789.css
        └── index.html

server/
└── dist/
    └── index.cjs
```

### 5.2 Build Optimization

**Analyze Bundle Size:**

```bash
npm run build -- --mode production
```

**Environment-Specific Builds:**

```bash
# Production
NODE_ENV=production npm run build

# Staging
NODE_ENV=staging npm run build
```

### 5.3 Verify Build

Test production build locally:

```bash
NODE_ENV=production node dist/index.cjs
```

Access at `http://localhost:5000`

---

## 6. Server Deployment

### 6.1 Hostinger VPS Deployment

**Step 1: Connect via SSH**

```bash
ssh root@your_server_ip
```

**Step 2: Update System**

```bash
apt update && apt upgrade -y
```

**Step 3: Install Node.js**

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt install -y nodejs 
```

**Step 4: Install Build Tools**

```bash
apt install -y build-essential git
```

**Step 5: Create Application User**

```bash
adduser lgis
usermod -aG sudo lgis
su - lgis
```

**Step 6: Upload Application**

Option A: Git Clone
```bash
cd /home/lgis
git clone https://github.com/your-council/lgis.git
cd lgis
```

Option B: SCP Upload
```bash
# From local machine
scp -r /path/to/lgis lgis@server:/home/lgis/
```

**Step 7: Install Dependencies**

```bash
cd /home/lgis/lgis
npm install --production
```

**Step 8: Set Up Environment**

```bash
nano .env
# Paste production environment variables
```

**Step 9: Build Application**

```bash
npm run build
```

**Step 10: Install PM2**

```bash
sudo npm install -g pm2
```

**Step 11: Start Application**

```bash
pm2 start dist/index.cjs --name lgis
pm2 save
pm2 startup
```

Copy and run the generated command.

**Verify:**

```bash
pm2 status
pm2 logs lgis
```

### 6.2 Nginx Setup

**Install Nginx:**

```bash
sudo apt install nginx
```

**Create Nginx Config:**

```bash
sudo nano /etc/nginx/sites-available/lgis
```

Paste:
```nginx
server {
    listen 80;
    server_name lgis.yourcouncil.gov.pg;

    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name lgis.yourcouncil.gov.pg;

    # SSL Configuration (will be added by Certbot)
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;

    # Proxy to Node.js
    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Upload size limit
    client_max_body_size 10M;
}
```

**Enable Site:**

```bash
sudo ln -s /etc/nginx/sites-available/lgis /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 6.3 Firewall Configuration

```bash
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw enable
sudo ufw status
```

---

## 7. SSL & Domain Setup

### 7.1 Domain Configuration

**DNS Records (at your domain registrar):**

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | lgis | YOUR_SERVER_IP | 3600 |
| CNAME | www | lgis.yourcouncil.gov.pg | 3600 |

Wait 5-30 minutes for DNS propagation.

**Verify:**
```bash
dig lgis.yourcouncil.gov.pg
nslookup lgis.yourcouncil.gov.pg
```

### 7.2 SSL Certificate (Let's Encrypt)

**Install Certbot:**

```bash
sudo apt install certbot python3-certbot-nginx
```

**Obtain Certificate:**

```bash
sudo certbot --nginx -d lgis.yourcouncil.gov.pg -d www.lgis.yourcouncil.gov.pg
```

Follow prompts:
1. Enter email
2. Agree to terms
3. Choose redirect option (yes)

**Auto-Renewal:**

```bash
sudo certbot renew --dry-run
```

Certbot automatically sets up cron job for renewals.

**Verify SSL:**

Visit `https://lgis.yourcouncil.gov.pg`

---

## 8. Mobile App Deployment

### 8.1 Android Build Setup

**Install Android Studio:**

1. Download from https://developer.android.com/studio
2. Install Android SDK
3. Set environment variables:

```bash
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

**Open Project:**

```bash
cd /path/to/lgis
npx cap sync android
npx cap open android
```

### 8.2 Configure App

**Android Manifest:**

Edit `android/app/src/main/AndroidManifest.xml`:

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="pg.gov.yourcouncil.lgis">
    
    <application
        android:label="LGIS"
        android:icon="@mipmap/ic_launcher"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:theme="@style/AppTheme">
        
        <meta-data
            android:name="com.google.android.geo.API_KEY"
            android:value="YOUR_GOOGLE_MAPS_KEY"/>
    </application>
    
    <uses-permission android:name="android.permission.CAMERA"/>
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION"/>
    <uses-permission android:name="android.permission.INTERNET"/>
</manifest>
```

**Update Version:**

Edit `android/app/build.gradle`:

```gradle
defaultConfig {
    applicationId "pg.gov.yourcouncil.lgis"
    versionCode 1
    versionName "1.0.0"
    ...
}
```

### 8.3 Generate Signing Key

```bash
cd android/app
keytool -genkey -v -keystore lgis-release-key.keystore -alias lgis-key-alias -keyalg RSA -keysize 2048 -validity 10000

# Enter details:
# Name: Your Council
# Organization: Local Government
# Location: Port Moresby
# State: NCD
# Country: PG
```

**Configure Signing:**

Create `android/key.properties`:

```properties
storePassword=your_keystore_password
keyPassword=your_key_password
keyAlias=lgis-key-alias
storeFile=lgis-release-key.keystore
```

Add to `.gitignore`:
```
android/key.properties
android/app/*.keystore
```

### 8.4 Build APK/AAB

**Build APK (for testing):**

```bash
cd android
./gradlew assembleRelease
```

Output: `android/app/build/outputs/apk/release/app-release.apk`

**Build AAB (for Play Store):**

```bash
./gradlew bundleRelease
```

Output: `android/app/build/outputs/bundle/release/app-release.aab`

### 8.5 Google Play Store Submission

**Prerequisites:**
- Google Play Developer account ($25 one-time fee)
- App icons (512x512 PNG)
- Feature graphic (1024x500)
- Screenshots (multiple devices)
- Privacy policy URL

**Steps:**

1. **Create App:**
   - Go to https://play.google.com/console
   - Click "Create app"
   - Fill in details

2. **Upload AAB:**
   - Production → Releases
   - Create new release
   - Upload app-release.aab

3. **Content Rating:**
   - Complete questionnaire
   - Government app category

4. **Store Listing:**
   - Upload app icon
   - Upload screenshots
   - Write description
   - Add privacy policy link

5. **Pricing:**
   - Free

6. **Submit for Review:**
   - Review summary
   - Submit

Review typically takes 3-7 days.

---

## 9. Monitoring & Maintenance

### 9.1 Application Monitoring

**PM2 Monitoring:**

```bash
# View status
pm2 status

# View logs
pm2 logs lgis

# View metrics
pm2 monit

# Restart app
pm2 restart lgis

# Stop app
pm2 stop lgis
```

**Setup PM2 Web Dashboard:**

```bash
pm2 install pm2-server-monit
```

### 9.2 Database Monitoring

**Check Connections:**

```sql
SELECT * FROM pg_stat_activity;
```

**Database Size:**

```sql
SELECT pg_size_pretty(pg_database_size('lgis_prod'));
```

**Slow Queries:**

```sql
SELECT pid, now() - query_start as duration, query
FROM pg_stat_activity
WHERE state = 'active' AND now() - query_start > interval '5 seconds';
```

### 9.3 Server Health

**Disk Space:**

```bash
df -h
```

**Memory Usage:**

```bash
free -h
```

**CPU Usage:**

```bash
top
```

### 9.4 Log Management

**Application Logs:**

```bash
pm2 logs lgis --lines 100
```

**Nginx Logs:**

```bash
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

**PostgreSQL Logs:**

```bash
sudo tail -f /var/log/postgresql/postgresql-14-main.log
```

**Log Rotation:**

PM2 automatically rotates logs. Configure:

```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 30
```

---

## 10. Backup & Recovery

### 10.1 Database Backup

**Manual Backup:**

```bash
pg_dump -U lgis_app lgis_prod > backup_$(date +%Y%m%d).sql
```

**Automated Daily Backup:**

Create script `/home/lgis/scripts/backup-db.sh`:

```bash
#!/bin/bash
BACKUP_DIR="/home/lgis/backups"
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump -U lgis_app lgis_prod | gzip > $BACKUP_DIR/lgis_$DATE.sql.gz

# Keep only last 30 days
find $BACKUP_DIR -name "lgis_*.sql.gz" -mtime +30 -delete
```

**Cron Job:**

```bash
crontab -e
```

Add:
```
0 2 * * * /home/lgis/scripts/backup-db.sh
```

### 10.2 File Backup

**Upload Files:**

```bash
tar -czf uploads_backup_$(date +%Y%m%d).tar.gz /var/www/lgis/uploads
```

### 10.3 Restore Database

```bash
gunzip < backup.sql.gz | psql -U lgis_app lgis_prod
```

Or from plain SQL:
```bash
psql -U lgis_app lgis_prod < backup.sql
```

### 10.4 Disaster Recovery Plan

**Full System Restore:**

1. Provision new server
2. Install dependencies (Node, PostgreSQL, Nginx)
3. Restore database from backup
4. Clone application code
5. Restore upload files
6. Configure environment
7. Start services
8. Update DNS if needed

---

## 11. Troubleshooting

### 11.1 Application Won't Start

**Check Logs:**

```bash
pm2 logs lgis --err
```

**Common Issues:**

1. **Port Already in Use:**
```bash
lsof -i :5000
kill -9 PID
```

2. **Database Connection Failed:**
- Check DATABASE_URL in .env
- Verify PostgreSQL is running
- Test connection: `psql $DATABASE_URL`

3. **Permission Denied:**
```bash
chown -R lgis:lgis /home/lgis/lgis
chmod +x dist/index.cjs
```

### 11.2 Build Failures

**Clear Cache:**

```bash
rm -rf node_modules
rm package-lock.json
npm install
```

**TypeScript Errors:**

```bash
npm run typecheck
```

### 11.3 Database Issues

**Connection Pool Exhausted:**

```sql
SELECT COUNT(*) FROM pg_stat_activity;
```

Increase max_connections in postgresql.conf.

**Slow Queries:**

Add indexes:
```sql
CREATE INDEX idx_businesses_council ON businesses(councilId);
CREATE INDEX idx_requests_status ON serviceRequests(status);
```

### 11.4 Mobile App Issues

**App Won't Build:**

1. Clean build:
```bash
cd android
./gradlew clean
```

2. Invalidate caches in Android Studio

3. Sync Gradle files

**App Crashes:**

1. Check logs: `adb logcat`
2. Verify permissions in AndroidManifest.xml
3. Check Capacitor plugin versions

---

## 12. Updates & Upgrades

### 12.1 Application Updates

**Zero-Downtime Deployment:**

```bash
cd /home/lgis/lgis

# Pull latest code
git pull origin main

# Install dependencies
npm install

# Build
npm run build

# Restart with PM2
pm2 reload lgis
```

### 12.2 Database Migrations

**Create Migration:**

```bash
npm run drizzle:generate
```

**Apply Migration:**

```bash
npm run drizzle:migrate
```

**Rollback (manual):**

Keep backup before migration:
```bash
pg_dump lgis_prod > pre_migration_backup.sql
```

### 12.3 Node.js Upgrade

```bash
# Install new version
nvm install 20
nvm use 20

# Rebuild dependencies
npm rebuild

# Test
npm run dev

# Deploy
pm2 restart lgis
```

### 12.4 Mobile App Updates

1. Increment version in `build.gradle`
2. Build new AAB
3. Upload to Play Console
4. Submit new release

---

**End of Deployment Manual**

*Version 1.0 - January 2026*
*LGIS Deployment Guide*
