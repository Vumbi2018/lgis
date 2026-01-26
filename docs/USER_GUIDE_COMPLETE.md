# LGIS User Guide

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Citizen Portal](#citizen-portal)
4. [Business Portal](#business-portal)
5. [Inspector Module](#inspector-module)
6. [Manager Module](#manager-module)
7. [Administrator Module](#administrator-module)
8. [Mobile Application](#mobile-application)
9. [Common Tasks](#common-tasks)
10. [Troubleshooting](#troubleshooting)

---

## 1. Introduction

### 1.1 System Overview

The **Local Government Information System (LGIS)** is a comprehensive digital platform designed for Papua New Guinea's local government councils to manage civic services, licensing, inspections, revenue collection, and citizen engagement.

**Key Capabilities:**
- 🏛️ Multi-tenant architecture supporting multiple councils
- 💼 Business registration and licensing
- 📋 Inspection management for field officers
- 💰 Revenue collection and billing
- 📱 Mobile app for inspectors and managers
- 🗺️ GIS mapping integration
- 🔐 Role-based access control

### 1.2 User Roles

The system supports multiple user roles:

| Role | Description | Access Level |
|------|-------------|--------------|
| **Citizen** | General public | View services, submit requests |
| **Business Owner** | Business representatives | Apply for licenses, make payments |
| **Inspector** | Field officers | Conduct inspections, capture evidence |
| **Manager** | Department heads | Review and approve applications |
| **Administrator** | System admins | Full system configuration |
| **Clerk** | Front desk staff | Data entry, customer service |

### 1.3 Accessing the System

**Web Application:**
- URL: `https://your-council-domain.com`
- Compatible browsers: Chrome, Firefox, Edge, Safari
- Minimum screen resolution: 1366x768

**Mobile Application:**
- Platform: Android (iOS coming soon)
- Download: Google Play Store → Search "LGIS"
- Requirements: Android 8.0 or higher

---

## 2. Getting Started

### 2.1 First-Time Login

**Step 1: Navigate to Login Page**

Open your web browser and go to your council's LGIS portal URL.

**Step 2: Enter Credentials**

- Email: Your registered email address
- Password: Provided by your administrator

**Step 3: Change Password (First Login)**

For security, you'll be prompted to change your password on first login:
- Minimum 8 characters
- Must include uppercase, lowercase, and numbers
- Avoid common passwords

### 2.2 Understanding the Dashboard

After logging in, you'll see the main dashboard tailored to your role:

**Dashboard Components:**

1. **Top Navigation Bar**
   - User profile dropdown
   - Notifications bell icon
   - Search box
   - Help icon

2. **Left Sidebar**
   - Module navigation menu
   - Collapsible sections
   - Active module highlight

3. **Main Content Area**
   - Key metrics cards
   - Recent activities
   - Quick actions
   - Charts and visualizations

4. **Footer**
   - Version information
   - Support links
   - Privacy policy

### 2.3 Navigating the Interface

**Using the Sidebar Menu:**

Click on any module icon to access:
- 🏠 Dashboard
- 👥 Registry (Citizens, Businesses)
- 📄 Licensing
- 🔍 Inspections
- ⚖️ Enforcement
- 💰 Revenue
- 📊 Reports
- ⚙️ Settings

**Breadcrumb Navigation:**

Follow the breadcrumb trail at the top to track your location:
`Dashboard > Licensing > Applications > LIC-2026-1234`

### 2.4 Profile Management

**Updating Your Profile:**

1. Click your name in the top-right corner
2. Select "Profile"
3. Update:
   - Full name
   - Contact phone
   - Email address
   - Profile photo
4. Click "Save Changes"

**Changing Password:**

1. Profile → "Change Password"
2. Enter current password
3. Enter new password (twice)
4. Click "Update Password"

**Setting Preferences:**

- Language: English/Tok Pisin
- Timezone: PNG Time (UTC+10)
- Email notifications: On/Off
- Dashboard layout: Compact/Detailed

---

## 3. Citizen Portal

### 3.1 Creating an Account

**Self-Registration Process:**

1. Click "Register" on login page
2. Fill in personal details:
   - Full name
   - National ID number
   - Email address
   - Phone number
   - Residential address
3. Create password
4. Verify email (check inbox)
5. Complete profile

**Verification:**

Some councils may require document verification:
- Upload National ID photo
- Proof of residence
- Wait for admin approval (1-2 business days)

### 3.2 Viewing Available Services

**Service Catalogue:**

Navigate to "Services" to see:
- Business licenses
- Building permits
- Market stalls
- Waste collection
- Community certificates

Each service shows:
- Description
- Required documents
- Processing time
- Fees
- Application process

### 3.3 Submitting Service Requests

**Application Workflow:**

1. **Select Service**
   - Browse or search service catalogue
   - Click "Apply Now"

2. **Fill Application Form**
   - Complete all required fields
   - Mark mandatory fields (*)
   - Save draft if needed

3. **Upload Documents**
   - Drag and drop files
   - Supported: PDF, JPG, PNG (max 5MB)
   - Attach all required documents

4. **Review and Submit**
   - Check summary
   - Accept terms and conditions
   - Click "Submit Application"

5. **Payment**
   - View invoice
   - Choose payment method
   - Make payment
   - Save receipt

### 3.4 Tracking Applications

**My Applications Dashboard:**

View all your submitted applications with:
- Application reference number
- Status badge (Submitted, Processing, Approved, Rejected)
- Submission date
- Last updated
- Actions (View Details, Download Receipt)

**Application Details:**

Click any application to see:
- Timeline of processing stages
- Assigned officer
- Comments/feedback
- Outstanding requirements
- Estimated completion date

**Notifications:**

Receive updates via:
- Email alerts
- SMS (if configured)
- In-app notifications
- Mobile push notifications

---

## 4. Business Portal

### 4.1 Business Registration

**New Business Registration:**

1. **Access Registration Form**
   - Login or click "Register Business"
   - Select registration type:
     - Sole Trader
     - Partnership
     - Company (Ltd)
     - NGO

2. **Business Details**
   - Legal business name
   - Trading name (if different)
   - Registration number (IPA)
   - Tax Identification Number (TIN)
   - Business category/industry
   - Date of establishment

3. **Business Address**
   - Physical address
   - Postal address
   - GPS coordinates (optional)
   - Ward/district

4. **Contact Information**
   - Primary contact person
   - Phone number(s)
   - Email address
   - Website (optional)

5. **Ownership Information**
   - Owner/Director details
   - Shareholding structure
   - Authorized representatives

6. **Supporting Documents**
   Upload required documents:
   - IPA Certificate of Incorporation
   - TIN Certificate
   - Proof of physical address
   - National ID of directors
   - Memorandum & Articles (if applicable)

7. **Submit for Verification**
   - Review all information
   - Click "Submit for Verification"
   - Await admin approval (2-5 business days)

###

 4.2 License Application Wizard

**Step-by-Step Application Process:**

**Step 1: Select Business**
- Choose your registered business
- System validates business is verified

**Step 2: Choose License Type**

Available license categories:
- **Trading Licenses**
  - General Trade License
  - Storekeeper License
  - Second-Hand Dealer
- **Food Licenses**
  - Restaurant License
  - Bottle Shop License
  - Food Vendor Permit
- **Service Licenses**
  - Barber Shop License
  - Entertainment License
  - Electronic Shop License
- **Specialized Permits**
  - Publican's License (Tavern/Hotel)
  - Club License
  - Cabaret Permit
  - Dinner Special Permit

**Step 3: Requirements Checklist**

Review checklist of required documents:
- IPA Business Registration
- TIN Certificate
- Land Title/Lease Agreement
- Health Department Clearance
- Fire Safety Certificate
- Police Clearance
- Floor Plan (if applicable)

Acknowledge you have read requirements.

**Step 4: Application Form**

Complete license-specific form fields:
- Business premises details
- Operational information
- Employee count
- Operating hours
- Specific license requirements

**Step 5: Document Upload**

Upload all required documents:
- Click "Choose Files" or drag-and-drop
- Supported formats: PDF, JPG, PNG
- Maximum file size: 5MB per file
- Label each document correctly

**Step 6: Review & Submit**

- Preview application summary
- Check all information is correct
- Accept declaration and terms
- Click "Submit Application"

**Step 7: Payment**

- View generated invoice
- Select payment method:
  - Bank deposit
  - Mobile money
  - Card payment (if available)
  - Cash (at council office)
- Make payment
- Upload payment proof
- Save receipt

### 4.3 Application Tracking

**My Applications Dashboard:**

View all license applications with:

| Column | Description |
|--------|-------------|
| Reference | LIC-2026-XXXX |
| License Type | Trade License, Restaurant, etc. |
| Business | Your business name |
| Status | Submitted, Processing, Approved, Rejected |
| Submitted | Date submitted |
| Actions | View, Download, Pay |

**Status Meanings:**

- **Draft**: Saved but not submitted
- **Submitted**: Received by council
- **Processing**: Under review
- **Inspection Required**: Field inspection scheduled
- **Pending Payment**: Approved, payment needed
- **Approved**: License issued
- **Rejected**: Application denied

### 4.4 Managing Active Licenses

**License Dashboard:**

View all your active licenses:
- License number
- Business name
- License type
- Issue date
- Expiry date
- Status (Active/Expired/Suspended)

**License Actions:**

1. **View License Certificate**
   - Click "View Certificate"
   - See digital license with QR code
   - Print or download PDF

2. **Renew License**
   - Click "Renew" before expiry
   - Simplified renewal form
   - Pay renewal fee
   - Receive updated license

3. **Request Amendment**
   - Change business details
   - Update premises
   - Add/remove activities
   - Submit amendment request

4. **Download Documents**
   - License certificate (PDF)
   - Payment receipts
   - Inspection reports
   - Correspondence

### 4.5 Payment Management

**Making Payments:**

1. **View Invoices**
   - Navigate to "Payments"
   - See all outstanding invoices
   - Filter by date, type, status

2. **Pay Online** (if available)
   - Click "Pay Now"
   - Enter card details
   - Authorize payment
   - Receive confirmation

3. **Bank Deposit**
   - Download payment slip
   - Deposit at bank
   - Upload deposit slip
   - Wait for verification

4. **Mobile Money**
   - Get mobile money reference
   - Pay via phone
   - Enter transaction ID
   - System verifies payment

**Payment History:**

Track all payments:
- Transaction reference
- Invoice number
- Amount paid
- Payment date
- Payment method
- Receipt download

### 4.6 Digital License Features

**QR Code Verification:**

Every license includes a QR code for:
- Quick verification by authorities
- Public verification portal
- Anti-counterfeit protection

**How to Use:**
1. Open license certificate
2. Show QR code to inspector
3. Inspector scans with mobile app
4. Instant verification of license validity

**Mobile Wallet:**

Save digital license to phone:
- Add to Apple Wallet / Google Pay
- Quick access without internet
- Show at inspections
- Receive expiry reminders

---
