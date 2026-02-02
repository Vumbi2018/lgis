# LGIS Standard Operating Procedures (SOP)

**Local Government Information System**

**Standard Operating Procedures Manual**

---

**Document Control**

| Field | Details |
|-------|---------|
| **Version** | 1.0 |
| **Effective Date** | February 2026 |
| **Prepared By** | LGIS Development Team |
| **Approved By** | [Authority Name] |
| **Classification** | Internal Use |

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [System Overview](#2-system-overview)
3. [User Role Procedures](#3-user-role-procedures)
4. [Registry Module SOPs](#4-registry-module-sops)
5. [Licensing Module SOPs](#5-licensing-module-sops)
6. [Inspection Module SOPs](#6-inspection-module-sops)
7. [Revenue Module SOPs](#7-revenue-module-sops)
8. [GIS Module SOPs](#8-gis-module-sops)
9. [Administration SOPs](#9-administration-sops)
10. [Security Procedures](#10-security-procedures)
11. [Backup and Recovery](#11-backup-and-recovery)
12. [Troubleshooting Guide](#12-troubleshooting-guide)
13. [Document Control](#13-document-control)

---

## 1. Introduction

### 1.1 Purpose

This Standard Operating Procedures (SOP) manual provides detailed step-by-step instructions for all operational activities within the Local Government Information System (LGIS). It ensures consistency, compliance, and efficiency in managing local government services for Papua New Guinea councils.

### 1.2 Scope

This SOP covers all modules of the LGIS platform:
- Registry Management (Citizens and Businesses)
- Licensing and Permits
- Inspection Management
- Revenue Collection
- Geographic Information System (GIS)
- Reporting and Analytics
- System Administration

### 1.3 Target Audience

This manual is intended for:
- Council Administrators
- Licensing Officers
- Field Inspectors
- Revenue Clerks
- Customer Service Staff
- IT Administrators
- System Managers

### 1.4 Definitions and Acronyms

| Term | Definition |
|------|------------|
| LGIS | Local Government Information System |
| RBAC | Role-Based Access Control |
| SOP | Standard Operating Procedure |
| TIN | Tax Identification Number |
| IPA | Investment Promotion Authority |
| NCDC | National Capital District Commission |
| UUID | Universally Unique Identifier |
| API | Application Programming Interface |

---

## 2. System Overview

### 2.1 System Description

LGIS is a comprehensive digital platform enabling Papua New Guinea local government councils to:

1. **Register and Track** citizens and businesses
2. **Process Applications** for licenses and permits
3. **Conduct Inspections** with mobile device support
4. **Collect Revenue** and generate invoices
5. **Visualize Data** on interactive maps
6. **Generate Reports** for decision-making

### 2.2 System Access

**Web Application**
- URL: https://[council-domain].com
- Supported Browsers: Chrome, Firefox, Edge, Safari
- Minimum Resolution: 1366x768

**Mobile Application**
- Platform: Android 8.0 or higher
- Download: Google Play Store (search "LGIS")

### 2.3 User Roles and Permissions

| Role | Permissions |
|------|-------------|
| **System Administrator** | Full system access, user management, configuration |
| **Manager** | Approve/reject applications, view reports, manage staff |
| **Officer** | Process applications, conduct inspections, data entry |
| **Inspector** | Field inspections, evidence capture, mobile access |
| **Clerk** | Front desk operations, customer service, basic data entry |
| **Business Owner** | Self-service portal, application tracking, payments |
| **Citizen** | View services, submit requests, track applications |

---

## 3. User Role Procedures

### 3.1 User Authentication

**SOP-UA-001: User Login**

**Purpose:** Securely authenticate users to access the system

**Procedure:**

1. Navigate to the login page
2. Enter registered email address
3. Enter password
4. Click "Sign In"
5. If Multi-Factor Authentication (MFA) is enabled:
   - Enter the code sent to registered mobile/email
   - Click "Verify"
6. System redirects to role-appropriate dashboard

**First-Time Login:**

1. Use temporary password provided by administrator
2. System prompts password change
3. Enter new password meeting requirements:
   - Minimum 8 characters
   - At least one uppercase letter
   - At least one lowercase letter
   - At least one number
4. Confirm new password
5. Click "Update Password"

---

**SOP-UA-002: Password Reset**

**Purpose:** Allow users to recover access when password is forgotten

**Procedure:**

1. Click "Forgot Password" on login page
2. Enter registered email address
3. Click "Send Reset Link"
4. Check email inbox for reset link
5. Click link within 24 hours
6. Enter new password
7. Confirm new password
8. Click "Reset Password"
9. Log in with new credentials

---

**SOP-UA-003: User Logout**

**Purpose:** Securely end user session

**Procedure:**

1. Click user profile icon (top-right corner)
2. Click "Logout"
3. System clears session and redirects to login page

**Note:** Sessions automatically expire after 30 minutes of inactivity.

---

### 3.2 Profile Management

**SOP-PM-001: Update User Profile**

**Purpose:** Keep user information current

**Procedure:**

1. Click profile icon (top-right)
2. Select "Profile"
3. Update fields as needed:
   - Full Name
   - Phone Number
   - Email Address
   - Profile Photo
4. Click "Save Changes"
5. Verify confirmation message

---

## 4. Registry Module SOPs

### 4.1 Citizen Registration

**SOP-REG-001: Register New Citizen**

**Purpose:** Add a new citizen to the council registry

**Authorized Roles:** Officer, Clerk, Administrator

**Required Documents:**
- National ID card or Birth Certificate
- Proof of residence

**Procedure:**

1. Navigate to Registry → Citizens
2. Click "Add New Citizen"
3. Enter personal details:
   - National ID Number
   - First Name
   - Last Name
   - Date of Birth
   - Gender
   - Phone Number
   - Email Address
4. Enter address details:
   - Physical Address
   - Village
   - District
   - Province
5. Attach supporting documents
6. Click "Save"
7. Record citizen ID for reference

**Verification Steps:**

1. Verify National ID against provided document
2. Confirm address details
3. Set status to "Verified" when confirmed

---

**SOP-REG-002: Update Citizen Information**

**Purpose:** Modify existing citizen records

**Procedure:**

1. Navigate to Registry → Citizens
2. Search for citizen by name or ID
3. Click citizen record
4. Click "Edit"
5. Update required fields
6. Add reason for change in notes
7. Click "Save Changes"
8. System logs update with timestamp

---

### 4.2 Business Registration

**SOP-REG-003: Register New Business**

**Purpose:** Add a new business to the council registry

**Authorized Roles:** Officer, Clerk, Administrator

**Required Documents:**
- IPA Certificate of Incorporation
- TIN Certificate
- Proof of Business Address
- National ID of Owner/Directors

**Procedure:**

1. Navigate to Registry → Businesses
2. Click "Register New Business"
3. Enter business details:
   - Legal Name (as per IPA certificate)
   - Trading Name
   - IPA Registration Number
   - Tax Identification Number (TIN)
   - Business Type (Sole Trader/Partnership/Company/NGO)
   - Industry Category
4. Enter owner information:
   - Owner Name
   - Contact Phone
   - Contact Email
5. Enter location details:
   - Physical Address
   - Section/Lot/Block
   - Suburb
   - District
   - Province
   - GPS Coordinates (if available)
6. Upload supporting documents
7. Click "Submit Registration"
8. Record business ID for reference

**Verification Process:**

1. Validate IPA registration number
2. Confirm TIN with IRC
3. Verify physical address
4. Set status to "Verified" upon confirmation
5. Notify business owner via email

---

**SOP-REG-004: Edit Business Information**

**Purpose:** Update existing business records

**Authorized Roles:** Officer (owner only), Manager, Administrator

**Procedure:**

1. Navigate to Registry → Businesses
2. Search for business by name or registration number
3. Click business record to open details
4. Click "Edit"
5. Navigate tabs to update information:
   - **Business Info Tab:** Legal name, trading name, registration, TIN, type, industry
   - **Contact Tab:** Owner name, phone, email
   - **Location Tab:** Address, section, lot, suburb, district, province
6. Click "Save Changes"
7. System logs update with user and timestamp

**Authorization Rules:**
- Business owners can edit only their own businesses
- Officers with "officer" or higher role can edit any business
- All edits are logged for audit purposes

---

**SOP-REG-005: View Business on Map**

**Purpose:** Locate business position on GIS map

**Procedure:**

1. Navigate to Registry → Businesses
2. Search and select business
3. View business details page
4. Click "View on Map" button
5. System opens GIS page centered on business location
6. View business marker with popup information

**Requirements:**
- Business must have GPS coordinates recorded
- Coordinates format: Latitude, Longitude (decimal degrees)

---

## 5. Licensing Module SOPs

### 5.1 License Application Processing

**SOP-LIC-001: Receive License Application**

**Purpose:** Process incoming license applications

**Authorized Roles:** Officer, Clerk

**Procedure:**

1. Navigate to Licensing → Applications
2. View new applications (status: "Submitted")
3. Click application to open details
4. Verify applicant information:
   - Business is registered and verified
   - Contact information is current
5. Review uploaded documents against checklist
6. Update status to "Under Review"
7. Assign to processing officer if required

---

**SOP-LIC-002: Document Review**

**Purpose:** Verify submitted documents meet requirements

**Authorized Roles:** Officer, Manager

**Procedure:**

1. Open application details
2. Navigate to "Documents" tab
3. For each required document:
   - Click to view/download
   - Verify document is legible
   - Verify document is current (not expired)
   - Verify document matches application details
4. If document is acceptable:
   - Click "Approve" for that document
5. If document is unacceptable:
   - Click "Reject"
   - Enter reason for rejection
   - System notifies applicant
6. Once all documents reviewed:
   - If all approved: proceed to inspection (if required)
   - If any rejected: status changes to "Pending Documents"

---

**SOP-LIC-003: Schedule Inspection**

**Purpose:** Arrange site inspection for license applications

**Authorized Roles:** Officer, Manager

**Procedure:**

1. Verify application status is "Documents Approved"
2. Click "Schedule Inspection"
3. Select inspection type
4. Choose inspector from available list
5. Set scheduled date and time
6. Add notes/instructions for inspector
7. Click "Schedule"
8. System notifies:
   - Inspector via email/mobile
   - Applicant via email

---

**SOP-LIC-004: Approve License Application**

**Purpose:** Grant license approval after successful review

**Authorized Roles:** Manager, Administrator

**Procedure:**

1. Verify all requirements met:
   - Documents approved
   - Inspection passed (if required)
   - Payment received
2. Open application details
3. Click "Approve"
4. Enter approval notes (optional)
5. Set license validity period
6. Click "Confirm Approval"
7. System:
   - Generates license certificate
   - Updates application status to "Approved"
   - Notifies applicant
   - Creates license record

---

**SOP-LIC-005: Reject License Application**

**Purpose:** Deny license application that fails requirements

**Authorized Roles:** Manager, Administrator

**Procedure:**

1. Open application details
2. Click "Reject"
3. Select rejection reason(s):
   - Incomplete documentation
   - Failed inspection
   - Does not meet criteria
   - Other (specify)
4. Enter detailed explanation
5. Click "Confirm Rejection"
6. System notifies applicant with:
   - Rejection reason
   - Appeal instructions
   - Reapplication guidance

---

### 5.2 License Management

**SOP-LIC-006: Issue License Certificate**

**Purpose:** Generate and provide license certificate

**Procedure:**

1. Navigate to Licensing → Approved Licenses
2. Select license record
3. Click "Issue Certificate"
4. System generates certificate with:
   - License number
   - Business details
   - License type
   - Issue date
   - Expiry date
   - QR code for verification
5. Download PDF certificate
6. Email certificate to license holder

---

**SOP-LIC-007: Renew License**

**Purpose:** Process license renewal before expiry

**Authorized Roles:** Officer, Clerk

**Procedure:**

1. Navigate to Licensing → Expiring Soon
2. Contact license holders 30 days before expiry
3. When renewal application received:
   - Verify license is currently active
   - Review any changes to business
   - Check for outstanding payments
4. If no changes and compliant:
   - Process simplified renewal
   - Generate renewal invoice
5. If changes required:
   - Process as amendment application
6. Upon payment:
   - Issue renewed certificate
   - Update expiry date

---

**SOP-LIC-008: Record Manual Payment**

**Purpose:** Record payments made at council office

**Authorized Roles:** Clerk, Officer, Manager

**Procedure:**

1. Navigate to Revenue → Manual Payments
2. Click "Record Payment"
3. Search and select business
4. Select invoice to pay
5. Enter payment details:
   - Payment Amount
   - Payment Method (Cash/Cheque/Bank Transfer/Mobile Money)
   - Receipt Number
   - Payment Date
   - Payer Name
   - Notes (optional)
6. Click "Record Payment"
7. System:
   - Updates invoice status to "Paid"
   - Generates receipt
   - Updates license status if applicable
8. Print receipt for customer

---

## 6. Inspection Module SOPs

### 6.1 Field Inspection Procedures

**SOP-INS-001: Prepare for Inspection**

**Purpose:** Ensure inspectors are prepared before site visit

**Procedure:**

1. Review assigned inspections for the day
2. Download inspection details to mobile device
3. Review previous inspection history (if any)
4. Prepare inspection checklist
5. Ensure mobile device is charged
6. Verify camera is functional
7. Note any special instructions

---

**SOP-INS-002: Conduct Site Inspection**

**Purpose:** Perform thorough site inspection

**Procedure:**

1. Arrive at business premises
2. Introduce yourself and show identification
3. Explain purpose of inspection
4. Use mobile app to:
   - Capture GPS location
   - Take photographs of premises
   - Complete inspection checklist
5. Check compliance with license conditions
6. Document any violations
7. Discuss findings with business owner
8. Collect owner signature on mobile device
9. Submit inspection report

---

**SOP-INS-003: Submit Inspection Report**

**Purpose:** Complete and submit inspection findings

**Procedure:**

1. Open inspection in mobile app
2. Complete all checklist items
3. Enter overall observations
4. Add photographs with descriptions
5. Select recommendation:
   - **Compliant** - Meets all requirements
   - **Minor Issues** - Requires follow-up
   - **Non-Compliant** - License at risk
   - **Critical** - Immediate action required
6. Request owner signature
7. Click "Submit Report"
8. Sync with server when connected

---

### 6.2 Inspection Follow-up

**SOP-INS-004: Schedule Follow-up Inspection**

**Purpose:** Arrange re-inspection after violations

**Procedure:**

1. Review inspection report with issues
2. Set follow-up deadline based on severity:
   - Minor: 30 days
   - Moderate: 14 days
   - Critical: 7 days or immediate
3. Create follow-up inspection
4. Notify business owner of:
   - Issues to resolve
   - Deadline for compliance
   - Consequences of non-compliance
5. Assign to inspector

---

## 7. Revenue Module SOPs

### 7.1 Invoice Management

**SOP-REV-001: Generate Invoice**

**Purpose:** Create invoice for license or service fees

**Procedure:**

1. Navigate to Revenue → Invoices
2. Click "Create Invoice"
3. Select customer (business or citizen)
4. Select invoice items:
   - License fee
   - Application fee
   - Penalty (if applicable)
5. Apply discounts if authorized
6. Set payment due date
7. Click "Generate Invoice"
8. System assigns invoice number
9. Send invoice to customer

---

**SOP-REV-002: Record Payment**

**Purpose:** Record received payments against invoices

**Procedure:**

1. Navigate to Revenue → Payments
2. Search for invoice by number or customer
3. Click "Record Payment"
4. Enter:
   - Amount received
   - Payment method
   - Reference number
   - Payment date
5. Click "Process Payment"
6. Print receipt for customer
7. System updates invoice status

---

**SOP-REV-003: Process Refund**

**Purpose:** Refund payment when required

**Authorized Roles:** Manager, Administrator

**Procedure:**

1. Obtain refund authorization from supervisor
2. Navigate to Revenue → Payments
3. Find original payment
4. Click "Request Refund"
5. Enter:
   - Refund amount
   - Refund reason
   - Authorization reference
6. Submit for approval
7. Once approved:
   - Process refund through appropriate channel
   - Update records
   - Notify customer

---

## 8. GIS Module SOPs

### 8.1 Map Operations

**SOP-GIS-001: View Business Locations**

**Purpose:** Visualize business distribution on map

**Procedure:**

1. Navigate to GIS → Map
2. Select data layer: "Businesses"
3. Use filter options if needed:
   - License status
   - Business type
   - Ward/suburb
4. Click markers to view business details
5. Use zoom controls for detail levels

---

**SOP-GIS-002: Navigate to Specific Location**

**Purpose:** Center map on specific coordinates

**Procedure:**

1. Navigate to GIS → Map
2. Use URL parameters:
   - lat: Latitude coordinate
   - lng: Longitude coordinate
   - zoom: Zoom level (1-18)
3. Example: `/gis?lat=-9.4438&lng=147.1803&zoom=15`
4. Map centers on specified location

---

**SOP-GIS-003: Capture GPS Coordinates**

**Purpose:** Record location coordinates for new records

**Procedure (Mobile):**

1. Enable location services on device
2. Open inspection or registration form
3. Click "Capture Location"
4. Wait for GPS lock (accuracy indicator)
5. Accept coordinates when accuracy is acceptable
6. Coordinates saved to record

---

## 9. Administration SOPs

### 9.1 User Management

**SOP-ADM-001: Create New User Account**

**Purpose:** Add new staff member to system

**Authorized Roles:** Administrator

**Procedure:**

1. Navigate to Settings → User Management
2. Click "Add User"
3. Enter user details:
   - Email address (unique)
   - First name
   - Last name
   - Phone number
4. Select role from dropdown
5. Assign to council
6. Set initial password or send invitation
7. Click "Create User"
8. User receives email with login instructions

---

**SOP-ADM-002: Modify User Permissions**

**Purpose:** Adjust user access levels

**Authorized Roles:** Administrator

**Procedure:**

1. Navigate to Settings → User Management
2. Search and select user
3. Click "Edit Permissions"
4. Modify assigned role
5. Update specific permissions if needed
6. Click "Save Changes"
7. User must log out and back in for changes to take effect

---

**SOP-ADM-003: Deactivate User Account**

**Purpose:** Disable user access without deleting record

**Authorized Roles:** Administrator

**Procedure:**

1. Navigate to Settings → User Management
2. Search and select user
3. Click "Deactivate"
4. Confirm action
5. User can no longer log in
6. All historical records retained

---

### 9.2 System Configuration

**SOP-ADM-004: Configure License Types**

**Purpose:** Add or modify license categories

**Authorized Roles:** Administrator

**Procedure:**

1. Navigate to Settings → License Types
2. Click "Add License Type" or select existing
3. Configure:
   - License code
   - License name
   - Category
   - Base fee (PGK)
   - Renewal fee
   - Validity period
   - Requirements checklist
   - Inspection required (Yes/No)
4. Click "Save"
5. New license type available for applications

---

**SOP-ADM-005: Manage Tenant Configuration**

**Purpose:** Configure council-specific settings

**Authorized Roles:** Administrator

**Procedure:**

1. Navigate to Settings → Council Configuration
2. Update settings:
   - Council name and logo
   - Theme colors
   - Contact information
   - Address details
   - Active modules
   - Currency settings
3. Click "Save Configuration"
4. Changes apply immediately

---

## 10. Security Procedures

### 10.1 Access Control

**SOP-SEC-001: Role-Based Access Review**

**Purpose:** Periodic review of user access rights

**Frequency:** Quarterly

**Procedure:**

1. Generate user access report
2. Review each user's assigned role
3. Verify role is still appropriate
4. Remove unnecessary permissions
5. Deactivate inactive accounts (no login > 90 days)
6. Document review in audit log

---

**SOP-SEC-002: Respond to Security Incident**

**Purpose:** Handle potential security breaches

**Procedure:**

1. Identify and document the incident
2. Immediately report to IT Administrator
3. If unauthorized access detected:
   - Lock affected user accounts
   - Preserve logs for investigation
   - Change affected passwords
4. Assess scope of incident
5. Notify affected parties if required
6. Implement corrective measures
7. Document lessons learned

---

### 10.2 Data Protection

**SOP-SEC-003: Handle Sensitive Data**

**Purpose:** Protect personal and financial information

**Procedure:**

1. Access sensitive data only when necessary
2. Never share login credentials
3. Log out when leaving workstation
4. Do not download data to personal devices
5. Report suspicious activities immediately
6. Follow data retention policies

---

## 11. Backup and Recovery

### 11.1 Backup Procedures

**SOP-BAK-001: Daily Database Backup**

**Purpose:** Protect against data loss

**Frequency:** Daily (Automated at 2:00 AM)

**Procedure:**

1. Automated script runs `pg_dump`
2. Backup compressed and stored locally
3. Backup copied to off-site location
4. Backups retained for 30 days
5. Verify backup integrity weekly

**Manual Backup (if needed):**

```bash
# SSH to server
ssh root@72.60.233.213

# Run backup
docker exec lgis-db-1 pg_dump -U lgis_user database_backup > backup_$(date +%Y%m%d).sql
```

---

**SOP-BAK-002: Restore from Backup**

**Purpose:** Recover system after data loss

**Authorized Roles:** IT Administrator only

**Procedure:**

1. Identify correct backup file
2. Stop application:
   ```bash
   docker compose stop app
   ```
3. Restore database:
   ```bash
   docker exec -i lgis-db-1 psql -U lgis_user database_backup < backup_YYYYMMDD.sql
   ```
4. Start application:
   ```bash
   docker compose start app
   ```
5. Verify data restored correctly
6. Document recovery action

---

## 12. Troubleshooting Guide

### 12.1 Common Issues

**Issue: Cannot Login**

| Symptom | Solution |
|---------|----------|
| "Invalid credentials" | Verify email and password, check caps lock |
| "Account locked" | Contact administrator to unlock |
| Page not loading | Check internet connection, try different browser |
| Session expired | Log in again |

---

**Issue: Application Not Loading**

| Symptom | Solution |
|---------|----------|
| Blank page | Clear browser cache, try incognito mode |
| Error 404 | Check URL is correct |
| Error 500 | Contact IT support, server issue |
| Slow loading | Check network connection |

---

**Issue: Cannot Upload Documents**

| Symptom | Solution |
|---------|----------|
| "File too large" | Reduce file size (max 5MB) |
| "Invalid format" | Use PDF, JPG, or PNG only |
| Upload stuck | Check internet, try smaller file |

---

**Issue: Mobile App Not Syncing**

| Symptom | Solution |
|---------|----------|
| No connection | Check internet/wifi |
| Sync failed | Retry, check login status |
| Data not appearing | Pull down to refresh |

---

### 12.2 Escalation Procedures

**Level 1 - User Self-Help**
- Consult this SOP manual
- Check FAQ section
- Try basic troubleshooting

**Level 2 - IT Help Desk**
- Contact: helpdesk@council.gov.pg
- Provide: User ID, description of issue, steps tried

**Level 3 - System Administrator**
- Server and database issues
- Security incidents
- Configuration problems

**Level 4 - Development Team**
- Software bugs
- Feature requests
- System upgrades

---

## 13. Document Control

### 13.1 Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | Feb 2026 | LGIS Team | Initial release |

### 13.2 Review Schedule

This document should be reviewed:
- Quarterly for accuracy
- After major system updates
- When regulations change
- Following significant incidents

### 13.3 Document Approval

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Prepared by | ________________ | ________________ | ________ |
| Reviewed by | ________________ | ________________ | ________ |
| Approved by | ________________ | ________________ | ________ |

---

## Appendices

### Appendix A: Quick Reference Cards

**Login Quick Reference:**
1. Go to https://[your-council].lgis.pg
2. Enter email and password
3. Click "Sign In"

**Record Payment Quick Reference:**
1. Revenue → Manual Payments
2. Select Business → Select Invoice
3. Enter amount and method
4. Click "Record Payment"
5. Print receipt

**New Business Quick Reference:**
1. Registry → Businesses
2. Click "Register New Business"
3. Fill all tabs (Business/Contact/Location)
4. Upload documents
5. Submit

---

### Appendix B: Contact Information

| Role | Contact |
|------|---------|
| IT Help Desk | helpdesk@council.gov.pg |
| System Admin | admin@council.gov.pg |
| Training | training@council.gov.pg |

---

### Appendix C: Glossary

| Term | Definition |
|------|------------|
| Application | A request for a license or permit |
| Business Registry | Central database of registered businesses |
| Inspection | Site visit to verify compliance |
| Invoice | Bill for fees payable |
| License | Authorization to conduct business activity |
| Multi-tenant | System supporting multiple councils |
| Workflow | Automated process steps |

---

**END OF DOCUMENT**

*LGIS Standard Operating Procedures v1.0*

*© 2026 Local Government Information System*
