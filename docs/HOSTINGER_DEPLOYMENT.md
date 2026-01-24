# Hostinger VPS Deployment Guide (Node.js + PostgreSQL)

This guide walks you through deploying the LGIS application to a Hostinger VPS (Ubuntu 22.04).

## 1. Prerequisites
- **Hostinger VPS Plan**: KVM 1 or higher (Recommended: KVM 2 for better database performance).
- **Domain Name**: Pointed to your VPS IP Address (A Record).
- **SSH Access**: You should be able to `ssh root@your_ip`.

## 2. Server Setup (Initial)
Run these commands on your VPS as root:

```bash
# Update System
apt update && apt upgrade -y

# Install Core Tools
apt install curl git build-essential nginx certbot python3-certbot-nginx -y

# Install Node.js 20 (LTS)
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Install Process Manager (PM2)
npm install -g pm2
```

## 3. Database Setup (PostgreSQL)
Hostinger VPS allows you to run your own database.

```bash
# Install PostgreSQL
apt install postgresql postgresql-contrib -y

# Start Service
systemctl start postgresql
systemctl enable postgresql

# Create Database and User
sudo -u postgres psql
```

Inside the `psql` shell:
```sql
CREATE DATABASE lgis;
CREATE USER lgis_user WITH ENCRYPTED PASSWORD 'StrongPassword123!';
GRANT ALL PRIVILEGES ON DATABASE lgis TO lgis_user;
ALTER DATABASE lgis OWNER TO lgis_user;
\q
```

## 4. Deploy Application (Docker Method)

This is the recommended method. It automates the setup and **restores your database**.

### Step 1: Clone Repository
```bash
cd /root
git clone https://github.com/Vumbi2018/lgis.git
cd lgis
```

### Step 2: Start with Docker Compose
Run the following command. This will build the app and start the database.
**IMPORTANT**: On the first run, it will automatically import `database_backup.sql` into the database.

```bash
docker compose up -d --build
```

### Step 3: Setup Nginx (Reverse Proxy)
Run these commands to expose the app on port 80/443 instead of 5000.

Create config:
```bash
nano /etc/nginx/sites-available/lgis
```

Paste this content:
```nginx
server {
    listen 80;
    server_name yourdomain.com; # <--- REPLACE WITH YOUR DOMAIN or IP

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:
```bash
rm /etc/nginx/sites-enabled/default
ln -s /etc/nginx/sites-available/lgis /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

### Step 4: Verify Deployment
Open your browser and visit `http://72.60.233.213`.
Login with your existing credentials (restored from backup).

## 8. SSL (HTTPS)
Secure your site with Let's Encrypt:

```bash
certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## 9. Verification
Visit `https://yourdomain.com` in your browser.
