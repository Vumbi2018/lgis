# 🚀 LGIS Quick Start Guide
**For**: NCDC System Administrators  
**Version**: 1.0.0  
**Last Updated**: 2026-01-21

---

## ⚡ Getting Started in 5 Minutes

### Step 1: Access the System
1. Open browser: `http://localhost:5000` (or production URL)
2. Login with admin credentials:
   - **Email**: admin@ncdc.gov.pg
   - **Password**: admin123

### Step 2: Verify System Status
Check these pages immediately after login:
- **Dashboard** (`/`): Should show NCDC Yellow/Black theme
- **Registry** (`/registry`): Should display citizens and businesses
- **Licensing** (`/licensing`): Should show submitted applications
- **Revenue** (`/revenue`): Should display real payment data

### Step 3: Test Key Features
1. **Document Review**:
   - Go to Licensing → Click any application
   - Scroll to Documents → Submitted tab
   - Click arrow icon → Review modal opens
   - Try approving or rejecting a document

2. **Revenue Dashboard**:
   - Go to Revenue
   - Verify metrics show real data (not "4.2M" mock values)
   - Check monthly chart has actual trends

3. **Security Settings**:
   - Go to Admin → Security (if available)
   - Review break-glass requests
   - Check field access policies

---

## 👤 User Roles & Permissions

### Administrator (You)
- **Can**: Everything - full system access
- **Use For**: System configuration, user management, break-glass approval
- **Login**: admin@ncdc.gov.pg / admin123

### Licensing Officer
- **Can**: Review applications, approve/reject documents, limited PII access
- **Use For**: Day-to-day license processing
- **Login**: jkila@ncdc.gov.pg / officer123

### Department Manager
- **Can**: All officer permissions + full PII access, approve break-glass requests
- **Use For**: Oversight, approvals, sensitive data access
- **Login**: mwilson@ncdc.gov.pg / manager123

---

## 📋 Common Tasks

### Task 1: Review a License Application

1. Navigate to **Licensing** page
2. Find application in list (sort by status if needed)
3. Click **View Details** button
4. Review application information:
   - Applicant details
   - Business information
   - Form responses
   - Submitted documents

5. **Review Documents**:
   - Click "Documents" card (right side)
   - Switch to "Submitted" tab
   - For each document:
     - Click arrow icon to open review modal
     - View document preview
     - Click **Approve** ✅ or **Reject** ❌
     - If rejecting, enter detailed reason

6. **Take Action**:
   - **Move to Processing**: Click status dropdown → "Processing"
   - **Schedule Inspection**: Click "Schedule Inspection" button
   - **Approve Application**: Click "Approve" button
   - **Reject Application**: Click "Reject" button (requires reason)

### Task 2: View Revenue Reports

1. Navigate to **Revenue** page
2. View key metrics:
   - Total Collected
   - Outstanding Arrears
   - Daily Average
   - Digital Payment Rate

3. Analyze charts:
   - Monthly revenue trends (6-month view)
   - Revenue by source (pie chart)
   - Recent transactions list

4. Export report (if needed):
   - Click "Export Report" button
   - Choose date range
   - Select format (PDF/Excel)

### Task 3: Manage Users

1. Navigate to **Admin** → **User Management**
2. View all users in system
3. **Add New User**:
   - Click "+ New User"
   - Fill in details (name, email, role)
   - Set temporary password
   - User receives email with login instructions

4. **Edit User**:
   - Click user row
   - Update details as needed
   - Change role if necessary

5. **Deactivate User**:
   - Click user row
   - Change status to "Inactive"
   - User can no longer login

### Task 4: Configure Visual Theme

1. Navigate to **Admin** → **Configuration** → **Visual Theme** tab
2. **Basic Settings**:
   - Upload logo (PNG, max 2MB)
   - Set council name
   - Enter tagline

3. **Color Customization**:
   - Primary color (currently NCDC Black: #07080A)
   - Accent color (currently NCDC Yellow: #FFCC00)
   - Background colors

4. **Advanced Branding**:
   - Status colors (positive, warning, negative)
   - Component radii (buttons, cards, inputs)
   - Font family

5. **Preview** theme changes immediately
6. Click **Save Changes**

---

## 🔔 Notifications

### In-App Notifications
- Bell icon (top right) shows count
- Click to view recent notifications
- Types:
  - Document reviews
  - Status changes
  - Break-glass approvals
  - System alerts

### Email Notifications
Automatic emails sent for:
- ✅ Document approved
- ❌ Document rejected (with reason)
- 📧 Application status changes
- 🚨 Break-glass requests/approvals

**Check**: Server logs show `[Email] Successfully sent to...`

---

## 🔒 Security Features

### Break-Glass Emergency Access

**When to Use**: Emergency situations requiring access to restricted data  
**Who Can Request**: Officers and Managers  
**Who Can Approve**: Managers and Administrators

**Process**:
1. Officer submits request:
   - Incident reference required (e.g., INC-2026-001)
   - Detailed justification (min 50 characters)
   - Duration (1-8 hours)

2. Admin/Manager approves or denies:
   - Review justification
   - Verify incident reference
   - Approve: Access granted for specified time
   - Deny: Provide reason

3. Access expires automatically:
   - No extension - must request again
   - All actions during session logged

4. **Audit**:
   - Every break-glass action logged
   - Review in Admin → Audit Logs
   - Search by incident reference

### Field-Level Security

Certain fields are automatically masked based on user role:

**Officer viewing Citizen**:
- ✅ Can see: Name, phone, email, address
- 🔒 Masked: National ID (NID-***-***23)
- ❌ Hidden: Date of birth, bank details

**Manager/Admin**:
- ✅ Can see: All fields (bank details masked for admin)

**Break-Glass Active**:
- ✅ Can see: Everything (temporarily)

---

## 📊 Dashboard Widgets

### Statistics Cards
- **Total Applications**: All submitted applications
- **Pending Review**: Awaiting officer action
- **Approved This Month**: Monthly approvals
- **Revenue This Month**: Monthly collections

### Charts
- **Application Trends**: Last 6 months submission trends
- **Status Distribution**: Pie chart of application statuses
- **Revenue Trends**: Monthly collection performance

### Quick Actions
- **New Application**: Submit on behalf of citizen
- **Review Queue**: Jump to pending applications
- **Reports**: Generate custom reports

---

## 🛠️ Troubleshooting

### Issue: Can't Login
**Check**:
1. Email address correct? (lowercase, @ncdc.gov.pg)
2. Password correct? (case-sensitive)
3. Account active? (check with admin)

**Solution**: Reset password via "Forgot Password" link

### Issue: Page Not Loading
**Check**:
1. Internet connection stable?
2. Server running? (check with IT)
3. Browser console for errors (F12)

**Solution**: Hard refresh (Ctrl+Shift+R) or clear cache

### Issue: Document Won't Upload
**Check**:
1. File size < 10MB?
2. File type allowed? (PDF, JPG, PNG)
3. Internet connection stable?

**Solution**: Compress file or upload via slower connection

### Issue: Email Not Received
**Check**:
1. Spam/junk folder
2. Email address correct in profile?
3. Server logs show email sent?

**Solution**: Update email address in profile, contact IT

### Issue: Data Not Showing
**Check**:
1. Correct council selected? (top right dropdown)
2. Filters applied? (clear all filters)
3. Date range correct?

**Solution**: Reset filters, refresh page

---

## 📞 Support Contacts

### Level 1: User Issues
**Contact**: NCDC IT Help Desk  
**Email**: helpdesk@ncdc.gov.pg  
**Phone**: +675 325 6400  
**Hours**: Mon-Fri, 8AM-5PM

### Level 2: Technical Issues
**Contact**: System Administrator  
**Email**: sysadmin@ncdc.gov.pg  
**For**: Database errors, server issues, integrations

### Level 3: Critical Issues
**Contact**: Hostinger Support  
**Access**: https://hpanel.hostinger.com  
**Support**: 24/7 live chat  
**For**: Server down, database offline, SSL issues

---

## 📖 Key Shortcuts

### Navigation
- **Alt + D**: Dashboard
- **Alt + L**: Licensing
- **Alt + R**: Registry
- **Alt + V**: Revenue

### Actions (when viewing application)
- **A**: Approve document
- **R**: Reject document
- **S**: Schedule inspection
- **C**: Add comment

### General
- **Ctrl + K**: Quick search
- **Esc**: Close modal/dialog
- **F5**: Refresh page

---

## ✅ Daily Checklist

### Morning (Start of Day)
- [ ] Login to system
- [ ] Check notification bell for new items
- [ ] Review pending applications count
- [ ] Check for break-glass requests (if admin)
- [ ] Review yesterday's audit log (if admin)

### During Day
- [ ] Process incoming applications
- [ ] Review and approve/reject documents
- [ ] Respond to citizen inquiries
- [ ] Update application statuses
- [ ] Generate reports as needed

### End of Day
- [ ] Clear notification queue
- [ ] Log any issues encountered
- [ ] Ensure all urgent items processed
- [ ] Logout from system

---

## 🎯 Best Practices

### Document Review
1. ✅ **Always check document quality** - Is it legible?
2. ✅ **Verify document matches requirement** - Is it the right doc?
3. ✅ **Provide clear rejection reasons** - Help applicant fix it
4. ✅ **Review all documents before approving application**

### Communication
1. ✅ **Use professional language in rejection reasons**
2. ✅ **Be specific about what's wrong**
3. ✅ **Suggest how to fix the issue**
4. ✅ **Respond to inquiries within 24 hours**

### Security
1. ✅ **Never share your password**
2. ✅ **Lock screen when stepping away** (Win+L)
3. ✅ **Only use break-glass when truly emergency**
4. ✅ **Log out at end of day**

### Data Quality
1. ✅ **Double-check citizen/business details**
2. ✅ **Ensure addresses are complete**
3. ✅ **Verify phone numbers and emails**
4. ✅ **Flag suspicious applications**

---

## 📚 Additional Resources

### Documentation Files
Located in `c:\lgis\.agent\`:
- **PRODUCTION_READINESS.md** - Complete system overview
- **DEPLOYMENT_GUIDE.md** - Hostinger deployment steps
- **SECURITY_TESTING_GUIDE.md** - Security feature testing
- **IMPLEMENTATION_SUMMARY.md** - Technical details
- **document-review.md** - Document review workflow

### Training Videos
*(To be created)*
- System Overview (10 minutes)
- Processing Applications (15 minutes)
- Document Review (8 minutes)
- Security Features (12 minutes)

### FAQs
Visit internal wiki: *(URL to be provided)*

---

## 🔄 System Updates

### How Updates Work
1. IT team deploys new version
2. System shows "Update Available" banner
3. Updates applied during off-peak hours
4. Users notified of new features

### Recent Updates
- **2026-01-21**: Document review workflow, real-time revenue, email notifications
- *(Previous updates to be logged)*

---

## 🎉 You're Ready!

You now have everything you need to effectively use the LGIS system. 

**Remember**:
- Document review is your main daily task
- Always provide clear feedback to applicants
- Use break-glass responsibly
- Report issues promptly

**Need Help?** Contact support or refer to the detailed guides in `.agent/` folder.

---

**System Version**: 1.0.0  
**Last Updated**: 2026-01-21  
**Status**: Production Ready ✅
