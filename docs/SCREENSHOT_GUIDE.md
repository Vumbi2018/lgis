# LGIS Screenshot Capture Guide

**Comprehensive guide for capturing all required screenshots for documentation**

## Overview

This guide outlines exactly which screenshots to capture, how to capture them, and where to place them in the documentation.

**Total Screenshots Needed: ~130**
- User Guide: ~80 screenshots
- Technical Guide: ~20 diagrams
- Deployment Manual: ~30 screenshots

---

## Tools Required

### Windows
- **Snipping Tool** (Built-in) - Quick captures
- **ShareX** (Free) - Advanced features, annotations
- **Greenshot** (Free) - Alternative with editing

### Android Screenshots
- **Android Studio Emulator** - Built-in screenshot (Ctrl+S)
- **Physical Device** - Power + Volume Down

### Database Screenshots
- **pgAdmin 4** - PostgreSQL management
- **DBeaver** - Universal database tool

---

## Screenshot Standards

### Quality Requirements
- **Resolution**: Minimum 1920x1080 for desktop, 1080x2400 for mobile
- **Format**: PNG (lossless)
- **File Size**: Compress to under 500KB each
- **Naming**: Descriptive names (e.g., `license-application-step1.png`)

### Composition Guidelines
- **Clean**: Close unnecessary windows/tabs
- **Relevant**: Capture only relevant UI elements
- **Readable**: Ensure text is legible
- **Annotations**: Add arrows/highlights where needed
- **Sample Data**: Use realistic but non-sensitive data

---

## User Guide Screenshots

### Section 1: Login & Dashboard (10 screenshots)

**1.1 Login Page** (`login-page.png`)
- Navigate to http://localhost:5000
- Ensure clean browser window
- Capture full login form
- Show "Remember me" checkbox

**1.2 Dashboard - Manager View** (`dashboard-manager.png`)
- Login as manager
- Capture dashboard with:
  - KPI cards
  - Charts
  - Recent activities

**1.3 Dashboard - Inspector View** (`dashboard-inspector.png`)
- Login as inspector
- Show inspection-focused dashboard

**1.4 Navigation Menu** (`sidebar-navigation.png`)
- Hover over menu to show all options
- Capture expanded sidebar

**1.5 User Profile** (`user-profile.png`)
- Click username dropdown
- Show profile menu options

**1.6 Profile Edit** (`profile-edit-form.png`)
- Click "Edit Profile"
- Show form with fields

**1.7 Notifications** (`notifications-panel.png`)
- Click notifications bell
- Show notification list

**1.8 Search** (`global-search.png`)
- Click search box
- Type query
- Show search results

**1.9 Quick Actions** (`quick-actions.png`)
- Show any quick action buttons

**1.10 Help Menu** (`help-menu.png`)
- Click help icon
- Show help options

### Section 2: Business Registration (5 screenshots)

**2.1 Business Registration Form - Page 1** (`business-reg-step1.png`)
- Navigate to business registration
- Show business details form

**2.2 Business Registration - Address** (`business-reg-address.png`)
- Show address section

**2.3 Document Upload** (`business-doc-upload.png`)
- Show file upload interface
- Include drag-drop area

**2.4 Business List** (`business-list.png`)
- Navigate to businesses page
- Show table with multiple businesses

**2.5 Business Details** (`business-details.png`)
- Click on a business
- Show detailed view

### Section 3: License Application (25 screenshots)

**3.1-3.7 Application Wizard Steps**
- `license-apply-step1-select-business.png` - Business selection
- `license-apply-step2-choose-type.png` - License type grid
- `license-apply-step3-requirements.png` - Requirements checklist
- `license-apply-step4-form.png` - Application form (Trade License)
- `license-apply-step5-documents.png` - Document upload
- `license-apply-step6-review.png` - Review summary
- `license-apply-step7-payment.png` - Payment screen

**3.8-3.12 Different License Types**
- `license-form-restaurant.png` - Restaurant license form
- `license-form-liquor.png` - Publican's license form
- `license-form-barber.png` - Barber shop form
- `license-form-cabaret.png` - Cabaret permit form
- `license-form-bottle-shop.png` - Bottle shop form

**3.13-3.18 Application Management**
- `applications-list.png` - All applications table
- `application-details.png` - Single application view
- `application-timeline.png` - Processing timeline
- `application-status-submitted.png` - Status: Submitted
- `application-status-processing.png` - Status: Processing
- `application-status-approved.png` - Status: Approved

**3.19-3.25 License Management**
- `licenses-active-list.png` - Active licenses
- `license-certificate.png` - Digital certificate view
- `license-qr-code.png` - QR code close-up
- `license-print-preview.png` - Print preview
- `license-renewal-form.png` - Renewal form
- `payment-invoice.png` - Sample invoice
- `payment-receipt.png` - Payment receipt

### Section 4: Inspections (15 screenshots)

**Desktop Interface:**
- `inspections-list-desktop.png` - Inspection list
- `inspection-details-desktop.png` - Inspection details
- `inspection-form-desktop.png` - Inspection form
- `inspection-assign.png` - Assignment screen
- `inspection-schedule.png` - Calendar view

**Mobile App:**
- `mobile-inspections-list.png` - Mobile list view
- `mobile-inspection-start.png` - Starting inspection
- `mobile-inspection-checklist.png` - Checklist items
- `mobile-camera-capture.png` - Camera interface
- `mobile-photo-taken.png` - Photo with GPS tag
- `mobile-inspection-observations.png` - Observations field
- `mobile-inspection-signature.png` - Signature capture
- `mobile-inspection-complete.png` - Completion screen
- `mobile-offline-queue.png` - Offline queue indicator
- `mobile-sync-status.png` - Sync in progress

### Section 5: Manager Approvals (10 screenshots)

**5.1-5.5 Approval Queue**
- `approval-queue.png` - Pending approvals list
- `approval-filters.png` - Filter options
- `application-review-documents.png` - Document viewer
- `application-review-inspection.png` - Inspection report
- `approval-decision-form.png` - Approval form

**5.6-5.10 Analytics**
- `manager-dashboard-kpis.png` - KPI cards
- `analytics-chart-applications.png` - Application trends
- `analytics-chart-revenue.png` - Revenue chart
- `report-generation.png` - Report builder
- `report-export.png` - Export options

### Section 6: Administrator (15 screenshots)

**6.1-6.5 User Management**
- `admin-users-list.png` - User list
- `admin-user-create.png` - Create user form
- `admin-user-roles.png` - Role assignment
- `admin-role-permissions.png` - Permission matrix
- `admin-user-audit.png` - User activity log

**6.6-6.10 System Configuration**
- `admin-license-types.png` - License type config
- `admin-fee-schedule.png` - Fee schedule
- `admin-workflow-builder.png` - Workflow builder
- `admin-integration-settings.png` - Integration config
- `admin-system-settings.png` - General settings

**6.11-6.15 Audit & Monitoring**
- `admin-audit-logs.png` - Audit log viewer
- `admin-audit-filter.png` - Audit filters
- `admin-audit-detail.png` - Single audit entry
- `admin-backup-interface.png` - Backup management
- `admin-system-health.png` - System health dashboard

### Section 7: Mobile App (10 screenshots total)

**7.1-7.10 Mobile App Screens**
- `mobile-login.png` - Login screen
- `mobile-dashboard.png` - Home dashboard
- `mobile-module-grid.png` - Module selection
- `mobile-licensing-list.png` - License list
- `mobile-apply-wizard.png` - Application wizard
- `mobile-settings.png` - Settings screen
- `mobile-profile.png` - User profile
- `mobile-notifications.png` - Notifications
- `mobile-offline-indicator.png` - Offline banner
- `mobile-bottom-nav.png` - Bottom navigation

---

## Technical Guide Diagrams

### Mermaid Diagrams (Already in documentation)

These are text-based and render automatically. No screenshots needed.

### Required Architecture Diagrams (20 diagrams)

**1. System Architecture** (`arch-system-overview.png`)
- Create using draw.io or similar
- Show: Client → Server → Database
- Include: Web app, Mobile app, API layer

**2. Database ER Diagram** (`arch-database-er.png`)
- Use dbdiagram.io or pgAdmin
- Show main tables and relationships
- Highlight: councils, businesses, serviceRequests

**3. Frontend Component Tree** (`arch-frontend-components.png`)
- Create component hierarchy diagram
- Show: App → Layout → Pages → Components

**4. Backend Layer Diagram** (`arch-backend-layers.png`)
- Visualize: Routes → Storage → Database
- Include middleware stack

**5. Multi-Tenancy Model** (`arch-multi-tenancy.png`)
- Show councilId isolation
- Include RLS policies

**6-10. Workflow Diagrams**
- `workflow-license-application.png` - License workflow
- `workflow-inspection.png` - Inspection process
- `workflow-approval.png` - Approval process
- `workflow-payment.png` - Payment flow
- `workflow-renewal.png` - Renewal process

**11-15. Database Screenshots**
- `db-pgadmin-overview.png` - pgAdmin interface
- `db-table-businesses.png` - Businesses table structure
- `db-table-servicerequests.png` - Service requests table
- `db-query-example.png` - Sample SQL query
- `db-indexes.png` - Index configuration

**16-20. Code Structure**
- `code-vscode-structure.png` - VS Code project tree
- `code-component-example.png` - Sample component
- `code-api-route.png` - API route example
- `code-drizzle-schema.png` - Drizzle schema
- `code-mobile-capacitor.png` - Capacitor config

---

## Deployment Manual Screenshots

### Section 1: Local Setup (10 screenshots)

**1.1-1.5 Installation**
- `deploy-nodejs-version.png` - Node.js version check
- `deploy-postgres-install.png` - PostgreSQL installation
- `deploy-npm-install.png` - npm install output
- `deploy-env-file.png` - .env file setup
- `deploy-db-seed.png` - Database seeding output

**1.6-1.10 Running**
- `deploy-npm-dev.png` - Dev server running
- `deploy-browser-localhost.png` - App running on localhost
- `deploy-vscode-terminal.png` - VS Code terminal
- `deploy-database-tables.png` - Tables in pgAdmin
- ` deploy-build-output.png` - Build success

### Section 2: Production Deployment (10 screenshots)

**2.1-2.5 Server Setup**
- `deploy-ssh-connection.png` - SSH to server
- `deploy-server-install.png` - Installing dependencies
- `deploy-pm2-status.png` - PM2 process list
- `deploy-nginx-config.png` - Nginx configuration file
- `deploy-ufw-status.png` - Firewall status

**2.6-2.10 SSL & Domain**
- `deploy-certbot-install.png` - Certbot running
- `deploy-ssl-success.png` - SSL certificate obtained
- `deploy-dns-config.png` - DNS settings
- `deploy-https-browser.png` - Site running with HTTPS
- `deploy-nginx-test.png` - Nginx test output

### Section 3: Mobile Deployment (10 screenshots)

**3.1-3.5 Android Build**
- `deploy-android-studio.png` - Android Studio open
- `deploy-android-sync.png` - Gradle sync
- `deploy-android-build.png` - Build process
- `deploy-apk-generated.png` - APK file generated
- `deploy-aab-generated.png` - AAB file

**3.6-3.10 Play Store**
- `deploy-play-console.png` - Play Console dashboard
- `deploy-play-upload.png` - Upload AAB
- `deploy-play-listing.png` - Store listing editor
- `deploy-play-screenshots.png` - App screenshots upload
- `deploy-play-submit.png` - Submission confirmation

---

## Screenshot Capture Workflow

### Preparation
1. **Clean Environment**
   ```bash
   # Start fresh dev server
   npm run dev
   
   # Seed database with sample data
   npx tsx server/seed.ts
   ```

2. **Browser Setup**
   - Use Chrome for consistency
   - Clear cache and cookies
   - Set zoom to 100%
   - Close unnecessary tabs
   - Hide bookmarks bar

3. **Sample Data**
   - Create 5-10 sample businesses
   - Create 10-15 license applications in various states
   - Create sample inspections
   - Create sample users with different roles

### Capture Process

For each screenshot:

1. **Navigate** to the screen
2. **Prepare** the view (scroll to show relevant content)
3. **Capture** using Snipping Tool or ShareX
4. **Save** with descriptive name
5. **Annotate** if needed (add arrows, highlights)
6. **Compress** to reduce file size
7. **Place** in `docs/screenshots/` folder

### Organization

```
docs/
└── screenshots/
    ├── user-guide/
    │   ├── login/
    │   ├── business/
    │   ├── licensing/
    │   ├── inspections/
    │   └── admin/
    ├── technical/
    │   ├── architecture/
    │   ├── database/
    │   └── code/
    └── deployment/
        ├── local/
        ├── production/
        └── mobile/
```

---

## Embedding Screenshots in Markdown

### Syntax

```markdown
![Screenshot Description](./screenshots/folder/filename.png)
*Figure 1: Dashboard showing KPI metrics*
```

### Best Practices

1. **Caption Every Screenshot**: Explain what the user is seeing
2. **Reference in Text**: "As shown in Figure 1..."
3. **Maintain Order**: Number figures sequentially
4. **Size Appropriately**: Resize large screenshots
5. **Compress Images**: Use tools like TinyPNG

---

## Automation Scripts

### Batch Screenshot Naming

```bash
# Rename screenshots with prefix
for file in *.png; do
    mv "$file" "user-guide-${file}"
done
```

### Image Compression

```bash
# Using pngquant
pngquant --quality=65-80 *.png --ext .png --force
```

### Generate Screenshot List

```bash
# List all screenshots
find docs/screenshots -name "*.png" | sort > screenshot-inventory.txt
```

---

## Quality Checklist

Before finalizing:

- [ ] All text is readable (minimum 12pt visible)
- [ ] No personal/sensitive data visible
- [ ] Consistent browser window size
- [ ] No distracting elements (notifications, etc.)
- [ ] Proper file naming convention
- [ ] Images compressed (< 500KB each)
- [ ] Screenshots placed in correct folders
- [ ] All screenshots captioned
- [ ] Figure numbers sequential
- [ ] Cross-references updated

---

## Estimated Time

- **User Guide Screenshots** (80): 4-6 hours
- **Technical Diagrams** (20): 3-4 hours
- **Deployment Screenshots** (30): 2-3 hours

**Total: 10-13 hours of work**

Can be spread over 2-3 days for thorough, quality captures.

---

*Use this guide systematically to capture all required screenshots for professional documentation.*
