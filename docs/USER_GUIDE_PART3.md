## 8. Administrator Module

### 8.1 System Configuration

**Accessing Admin Panel:**

1. Login as Administrator
2. Navigate to "Configuration" or "Settings"
3. Access system-wide settings

**General Settings:**

- Council/Organization name
- Logo upload
- Contact information
- Business hours
- Default timezone
- System email address
- SMS gateway configuration

### 8.2 User Management

**Creating New Users:**

1. Navigate to "Users" → "Add User"
2. Enter user details:
   - Full name
   - Email address
   - Phone number
   - Role assignment
   - Department/unit
   - Start date
3. Set initial password
4. Send welcome email
5. Click "Create User"

**Managing Roles:**

Create and edit roles:
- Role name (Inspector, Manager, Clerk)
- Description
- Permission assignments
- Access level

**Permission Matrix:**

Configure what each role can do:

| Module | View | Create | Edit | Delete | Approve |
|--------|------|--------|------|--------|---------|
| Businesses | ✅ | ✅ | ✅ | ❌ | ❌ |
| Licensing | ✅ | ✅ | ✅ | ❌ | ⚠️ |
| Inspections | ✅ | ✅ | ✅ | ❌ | ❌ |

**User Status Management:**

- Activate/Deactivate users
- Reset passwords
- Unlock accounts
- View login history
- Manage sessions

### 8.3 License Type Configuration

**Creating License Types:**

1. Navigate to "Licensing" → "License Types"
2. Click "Add License Type"
3. Enter details:
   - License name
   - Category
   - Description
   - Validity period (years)
   - Application form template
   - Base fee
   - Renewal fee

**Checklist Requirements:**

For each license type, configure:
- Required documents list
- Issuing authorities
- Notes/instructions
- Mandatory/optional flags

**Special Requirements:**

Add specific requirements:
- Health certificates
- Fire safety clearance
- Police clearance
- Environmental permits
- Additional fees

### 8.4 Fee Schedule Management

**Setting Up Fees:**

1. Navigate to "Revenue" → "Fee Schedule"
2. For each license type:
   - Application fee
   - License fee
   - Inspection fee
   - Processing fee
   - Late renewal penalty

**Fee Modifiers:**

Configure fee variations:
- Business size tiers
- Location zones
- Activity types
- Volume/capacity-based

**Discounts and Waivers:**

- Early bird discounts
- Renewal discounts
- Bulk application discounts
- Fee waiver criteria

### 8.5 Workflow Configuration

**Workflow Builder:**

1. Navigate to "Workflows"
2. Select service type
3. Define workflow steps:
   - Step name
   - Assigned role
   - Required actions
   - Time limits
   - Notifications

**Example Workflow:**

Trade License Application:
1. **Submission** → Auto (instant)
2. **Document Check** → Clerk (2 days)
3. **Site Inspection** → Inspector (5 days)
4. **Manager Approval** → Manager (3 days)
5. **License Issuance** → Auto (instant)

**Step Configuration:**

For each step:
- Assignee (role/user)
- SLA (service level agreement)
- Auto-escalation rules
- Email/SMS notifications
- Required documents
- Approval criteria

### 8.6 Integration Management

**External System Integrations:**

Configure connections to:

1. **IPA (Investment Promotion Authority)**
   - API endpoint
   - Authentication credentials
   - Sync frequency
   - Data mapping

2. **IRC (Internal Revenue Commission)**
   - TIN validation
   - Tax clearance verification

3. **Payment Gateways**
   - Bank integration
   - Mobile money
   - Card payment providers

4. **SMS Gateway**
   - Provider credentials
   - Message templates
   - Delivery reports

5. **Email Service**
   - SMTP settings
   - Email templates
   - Bounce handling

**Integration Status:**

Monitor integration health:
- Connected/Disconnected status
- Last sync time
- Error logs
- Retry attempts

### 8.7 Audit Logs

**Viewing Audit Trail:**

1. Navigate to "Audit Logs"
2. Filter by:
   - Date range
   - User
   - Module
   - Action (create, update, delete)
   - IP address

**Audit Log Details:**

Each entry shows:
- Timestamp
- User who performed action
- Action type
- Entity affected
- Old value → New value
- IP address
- Session ID

**Compliance Reports:**

Generate audit reports for:
- User activity summary
- License approvals
- Data modifications
- Failed login attempts
- System changes

### 8.8 Backup and Maintenance

**Database Backups:**

Configure automated backups:
- Backup frequency (daily/weekly)
- Retention period
- Storage location
- Email notifications

**Manual Backup:**

1. Navigate to "System" → "Backup"
2. Click "Create Backup Now"
3. Wait for completion
4. Download backup file

**System Maintenance:**

- Clear cache
- Rebuild indexes
- Compress logs
- Archive old data
- Update system

---

## 9. Common Tasks

### 9.1 Searching and Filtering

**Global Search:**

1. Click search box in top navigation
2. Enter search term
3. Results show across all modules:
   - Businesses
   - Citizens
   - Licenses
   - Applications

**Advanced Filters:**

In any list view:
- Click "Filters" button
- Select filter criteria
- Multiple filters combine with AND logic
- Save filter presets

**Common Filter Fields:**
- Date range
- Status
- Type/Category
- Location
- Amount range

### 9.2 Exporting Data

**Export Options:**

1. Navigate to any list view
2. Click "Export" button
3. Choose format:
   - Excel (.xlsx)
   - CSV
   - PDF

**Export All vs Current View:**
- Export All: All matching records
- Current View: Only visible page

**Scheduled Exports:**

Set up recurring exports:
- Daily/Weekly/Monthly
- Email delivery
- FTP upload
- Predefined filters

### 9.3 Printing Documents

**Print License Certificate:**

1. Open license details
2. Click "Print Certificate"
3. Preview appears
4. Click browser print
5. Select printer or Save as PDF

**Print Receipts:**

1. Open payment details
2. Click "Print Receipt"
3. Official receipt template loads
4. Print or save

**Batch Printing:**

- Select multiple items
- Click "Batch Print"
- All documents queue
- Print in sequence

### 9.4 Using the GIS Map

**Accessing Map View:**

1. Navigate to "GIS" module
2. Interactive map loads
3. See businesses, properties, assets

**Map Controls:**

- **Zoom**: +/- buttons or mouse wheel
- **Pan**: Click and drag
- **Layers**: Toggle different layers
  - Businesses
  - Properties
  - Inspections
  - Assets
  - Wards/Districts

**Search on Map:**

1. Enter address or business name
2. Map centers on location
3. Pin appears
4. Click pin for details

**Measuring Tools:**

- Measure distance
- Measure area
- Draw shapes

**Spatial Queries:**

- Find all businesses in ward
- Find properties within 500m
- Identify clustering

### 9.5 Document Upload Best Practices

**File Requirements:**

- **Formats**: PDF, JPG, PNG
- **Size**: Maximum 5MB per file
- **Quality**: 150 DPI minimum
- **Orientation**: Portrait for documents

**Naming Convention:**

Good: `IPA_Certificate_ABC_Trading_2026.pdf`
Bad: `scan001.pdf`

**Tips:**

1. Scan at high quality
2. Ensure text is readable
3. Include all pages
4. Avoid photographing documents (scan instead)
5. Remove sensitive information if required

### 9.6 Making Payments

**Payment Methods:**

1. **Bank Deposit**
   - Print payment slip
   - Deposit at any BSP/Westpac branch
   - Upload deposit slip
   - Reference: Invoice number

2. **Mobile Money**
   - Available: Digicel, bmobile
   - Dial payment USSD code
   - Use invoice reference
   - Confirmation via SMS

3. **Online Payment** (if enabled)
   - Credit/Debit card
   - Secure payment gateway
   - Instant confirmation

**Payment Confirmation:**

- Keep all receipts
- Screenshot SMS confirmations
- Save bank deposit slips
- Upload proof to system

---

## 10. Troubleshooting

### 10.1 Login Issues

**Problem: Forgot Password**

Solution:
1. Click "Forgot Password" on login page
2. Enter your email address
3. Check email for reset link
4. Click link (valid for 1 hour)
5. Enter new password
6. Login with new password

**Problem: Account Locked**

Cause: Too many failed login attempts

Solution:
- Wait 15 minutes
- Or contact system administrator
- Admin will unlock account

**Problem: Email Not Recognized**

Check:
- Email address spelling
- Using work email vs personal
- Account created by admin
- Contact help desk

### 10.2 Application Errors

**Problem: Application Not Submitting**

Checklist:
- ✅ All required fields completed
- ✅ All required documents uploaded
- ✅ Internet connection stable
- ✅ File sizes under 5MB
- ✅ Correct document formats

Solution:
- Save as draft
- Refresh page
- Clear browser cache
- Try different browser

**Problem: Documents Not Uploading**

Check:
- File size (max 5MB)
- File format (PDF, JPG, PNG only)
- Internet speed
- Browser compatibility

Solution:
- Compress large files
- Convert to PDF if needed
- Try uploading one at a time
- Use different browser

### 10.3 Payment Issues

**Problem: Payment Not Reflecting**

Wait: 2-4 hours for processing

Then:
1. Check payment history
2. Verify transaction details
3. Upload payment proof
4. Contact finance department
5. Provide: Transaction ID, date, amount

**Problem: Duplicate Payment**

Contact immediately:
- Email: finance@council.gov.pg
- Provide both transaction IDs
- Request refund/credit
- Resolution: 5-10 business days

### 10.4 Mobile App Issues

**Problem: App Crashing**

Solutions:
1. Force stop app
2. Clear app cache:
   - Settings → Apps → LGIS → Storage → Clear Cache
3. Update app from Play Store
4. Reinstall app (data will sync)

**Problem: Data Not Syncing**

Check:
- Internet connection
- Storage space available
- App permissions granted
- Last sync time

Solution:
- Pull down to refresh
- Tap "Sync Now"
- Check sync settings
- Re-login if needed

**Problem: Photos Not Uploading**

Check:
- Camera permission granted
- Storage space available
- Photo size reasonable
- Internet connectivity

Solution:
- Grant permissions
- Free up storage
- Compress photos
- Upload on WiFi

### 10.5 Common Error Messages

**"Session Expired"**

Cause: Inactive for 30+ minutes

Solution: Simply login again

**"Access Denied"**

Cause: Insufficient permissions

Solution: Contact administrator for role/permission update

**"Network Error"**

Cause: Internet connection issues

Solution:
- Check WiFi/data connection
- Refresh page
- Try again in a few minutes

**"Server Error 500"**

Cause: System issue

Solution:
- Wait a few minutes
- Try again
- If persists, contact support

### 10.6 Getting Help

**Help Resources:**

1. **User Guide**: This document
2. **Video Tutorials**: Coming soon
3. **Help Desk**:
   - Email: support@council.gov.pg
   - Phone: +675 XXX XXXX
   - Hours: 8AM - 4PM weekdays

4. **Submit Ticket**:
   - Click "Help" icon
   - Describe issue
   - Attach screenshots
   - Track ticket status

**Best Practices for Getting Help:**

- Describe problem clearly
- Include error messages
- Note what you were doing
- Attach screenshots
- Provide reference numbers
- Test on different browser first

### 10.7 FAQ

**Q: How long does license approval take?**

A: Typical processing times:
- Trade License: 10-14 days
- Restaurant License: 14-21 days
- Liquor License: 21-30 days

**Q: Can I track my application status?**

A: Yes, login and go to "My Applications" to see real-time status.

**Q: What if I lose my license certificate?**

A: Request a duplicate:
1. Login to portal
2. Go to "My Licenses"
3. Click "Request Duplicate"
4. Pay duplicate fee
5. Download/print

**Q: How do I renew my license?**

A: 30 days before expiry:
1. Login to portal
2. Find expiring license
3. Click "Renew"
4. Simplified renewal form
5. Pay renewal fee

**Q: Can I apply from mobile phone?**

A: Yes! Download the LGIS mobile app from Play Store.

---

## Appendix A: Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Open Search | Ctrl + K |
| Save Form | Ctrl + S |
| Cancel/Close | Esc |
| Navigate Back | Alt + ← |
| Navigate Forward | Alt + → |
| Print | Ctrl + P |
| Refresh | F5 |
| Help Menu | F1 |

## Appendix B: Contact Information

**Technical Support:**
- Email: support@lgis.gov.pg
- Phone: +675 XXX XXXX
- Hours: 8:00 AM - 4:00 PM (Mon-Fri)

**License Inquiries:**
- Email: licensing@council.gov.pg
- Phone: +675 XXX XXXX

**Payment Issues:**
- Email: finance@council.gov.pg
- Phone: +675 XXX XXXX

**General Inquiries:**
- Email: info@council.gov.pg
- Phone: +675 XXX XXXX

## Appendix C: Document Checklist

### Trade License
- [  ] IPA Certificate
- [  ] TIN Certificate
- [  ] Lease/Title
- [  ] Owner ID
- [  ] Business Plan

### Restaurant License
- [  ] IPA Certificate
- [  ] TIN Certificate
- [  ] Health Clearance
- [  ] Fire Safety
- [  ] Lease/Title
- [  ] Floor Plan
- [  ] Menu
- [  ] Owner ID

### Liquor License
- [  ] IPA Certificate
- [  ] TIN Certificate
- [  ] Police Clearance
- [  ] Health Clearance
- [  ] Lease/Title (min 3 years)
- [  ] Floor Plan
- [  ] Owner Photo
- [  ] Character References

---

**End of User Guide**

*Version 1.0 - January 2026*
*For LGIS System*

*This guide is regularly updated. Check the system for the latest version.*
