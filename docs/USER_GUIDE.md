# LGIS User Guide

**Version**: 2.0  
**Last Updated**: January 2026

## Overview
The Local Government Information System (LGIS) is a comprehensive platform for managing council operations, including licensing, assets, procurement, and revenue.

## 1. Getting Started
- **Login**: Use your council credentials to access the portal.
- **Dashboard**: The main dashboard shows key metrics (Active Licenses, Pending Requests, Revenue).
- **Navigation**: Use the sidebar to access different modules.

## 2. Licensing & Digital Signatures
### Issuing a Licence
1. Navigate to **Licensing > Applications**.
2. Review pending applications.
3. Upon approval and payment (recorded in the **Revenue** module), click **Issue License**.
4. The system will:
   - Generate a PDF certificate.
   - Embed a QR code and cryptographic signature.
   - Lock the record to prevent tampering.

### Verifying a Licence
- **Public Portal**: Go to `/verify/:licenceNo` (or scan the QR code).
- **Status Indicators**:
  - ✅ **Active & Valid**: Signature is cryptographically verified.
  - ❌ **Tampered**: Content has been modified since signing.
  - ⚠️ **Revoked/Expired**: License is no longer valid.

## 3. Assets Management
Navigate to **Assets** in the sidebar.
- **View Assets**: See a list of all council assets (vehicles, buildings, equipment).
- **Add Asset**: Click **Add Asset** button (Top Right).
- **Search**: Use the search bar to find assets by number or name.

## 4. Procurement
Navigate to **Procurement** in the sidebar.
- **Purchase Orders**: View interactions with vendors.
- **Create Order**: Click **New Purchase Order** to initiate a request.
- **Status Tracking**: Orders move from `Draft` -> `Submitted` -> `Approved` -> `Received`.

## 5. Workflows
- **Automation**: Workflows define the steps for service requests (e.g., "Business License Approval").
- **Visual Editor**: Use the workflow editor to add steps (e.g., Inspection, Payment, Approval).
- **Styling**: Primary actions use the High-Contrast Gold on Black theme for visibility.

## 6. Support
For technical issues, contact the IT Department or refer to the `API_REFERENCE.md` for integration details.
