# Break-Glass Security & Field-Level Access Testing Guide
**System**: Local Government Information System (LGIS)  
**Feature**: Emergency Access Control & Data Redaction  
**Last Updated**: 2026-01-21

---

## 🛡️ Overview

The LGIS implements enterprise-grade field-level security with break-glass emergency access controls. This document provides comprehensive testing procedures to verify all security features are functioning correctly.

---

## 🔐 Security Features Implemented

### 1. **Field-Level Access Control**
- **Granular Permissions**: Different access levels per field (full, masked, partial, none)
- **Role-Based**: Public, Officer, Manager, Admin, Break-Glass
- **PII Protection**: Sensitive fields (National ID, DOB, Bank Details) are redacted
- **Audit Trail**: All access attempts logged

### 2. **Break-Glass Emergency Access**
- **Request-Based System**: Officers must justify emergency access
- **Time-Limited**: Access expires after defined duration (1-8 hours)
- **Approval Workflow**: Requires manager/admin approval
- **Complete Audit**: Every break-glass session fully logged
- **Revocation**: Can be revoked mid-session if needed

---

## 📋 Field Access Matrix

### Citizen Entity
| Field | Public | Officer | Manager | Admin | Break-Glass |
|-------|--------|---------|---------|-------|-------------|
| **citizenId** | ✅ Full | ✅ Full | ✅ Full | ✅ Full | ✅ Full |
| **firstName** | ✅ Full | ✅ Full | ✅ Full | ✅ Full | ✅ Full |
| **lastName** | ✅ Full | ✅ Full | ✅ Full | ✅ Full | ✅ Full |
| **nationalId** | ❌ None | 🔒 Masked | ✅ Full | ✅ Full | ✅ Full |
| **dob** | ❌ None | ❌ None | ✅ Full | ✅ Full | ✅ Full |
| **phone** | ❌ None | ✅ Full | ✅ Full | ✅ Full | ✅ Full |
| **email** | ❌ None | ✅ Full | ✅ Full | ✅ Full | ✅ Full |
| **address** | ⚠️ Partial | ✅ Full | ✅ Full | ✅ Full | ✅ Full |
| **bankDetails** | ❌ None | ❌ None | ❌ None | 🔒 Masked | ✅ Full |

**Legend**:
- ✅ **Full**: Complete access to field data
- 🔒 **Masked**: Partial masking (e.g., `NID-***-***23`)
- ⚠️ **Partial**: Limited information (e.g., suburb only, no street)
- ❌ **None**: Field completely hidden

---

## 🧪 Testing Procedures

### Test 1: Field Redaction Verification

#### Objective
Verify that sensitive fields are properly masked based on user role.

#### Pre-requisites
- Login credentials for different roles
- Sample citizen record with all fields populated

#### Steps

1. **Test as Public User (No Auth)**:
   ```bash
   # Navigate to /registry without login
   # Expected: Only see firstName, lastName, citizenId
   # Expected: nationalId, dob, phone, email should be hidden
   ```

2. **Test as Officer**:
   - Login as `jkila@ncdc.gov.pg` (password: `officer123`)
   - Navigate to `/registry`
   - Click on a citizen record
   - **Expected Results**:
     - ✅ Can see: phone, email, address
     - 🔒 nationalId shows as `NID-***-***XX` (last 2 digits visible)
     - ❌ Cannot see: dob, bankDetails

3. **Test as Manager**:
   - Login as `mwilson@ncdc.gov.pg` (password: `manager123`)
   - Navigate to `/registry`
   - Click on a citizen record
   - **Expected Results**:
     - ✅ Can see all fields except bankDetails
     - 🔒 bankDetails shows as `***` if present

4. **Test as Admin**:
   - Login as `admin@ncdc.gov.pg` (password: `admin123`)
   - Navigate to `/registry`
   - Click on a citizen record
   - **Expected Results**:
     - ✅ Can see ALL fields including masked versions of:
       - nationalId: `NID-***-***XX`
       - bankDetails: `Bank: *** Acct: ****1234`

### Test 2: Break-Glass Request Flow

#### Objective
Verify the complete break-glass emergency access workflow.

#### Steps

1. **Submit Break-Glass Request** (as Officer):
   - Login as Officer (`jkila@ncdc.gov.pg`)
   - Navigate to `/admin/security` or security settings
   - Click **"Request Break-Glass Access"** button
   - Fill in form:
     - **Incident Reference**: `INC-2026-TEST-001`
     - **Justification**: "Emergency access required to verify citizen details for court order in case REF-12345. Legal deadline is 2PM today."
     - **Duration**: 2 hours
   - Click **"Submit Request"**
   - **Expected**: 
     - ✅ Success message appears
     - ✅ Request shows with status "PENDING"
     - ✅ Email sent to approvers

2. **Approve Break-Glass Request** (as Admin):
   - Login as Admin (`admin@ncdc.gov.pg`)
   - Navigate to security dashboard
   - Find pending break-glass request `INC-2026-TEST-001`
   - Click **"Approve"** button
   - **Expected**:
     - ✅ Status changes to "APPROVED"
     - ✅ Expiry time calculated (current time + 2 hours)
     - ✅ Officer receives approval notification

3. **Use Break-Glass Access** (as Officer):
   - Return to officer login
   - Navigate to `/registry`
   - Click on citizen with sensitive data
   - **Expected**:
     - ✅ All fields now visible (nationalId, dob, bankDetails)
     - ✅ Yellow warning banner: "⚠️ Break-Glass Access Active (expires: XX:XX)"
     - ✅ All actions being audited

4. **Verify Audit Logging**:
   - As Admin, navigate to audit logs
   - Search for `INC-2026-TEST-001`
   - **Expected Audit Entries**:
     - ✅ "break_glass:request" - Officer requested access
     - ✅ "break_glass:approve" - Admin approved
     - ✅ "citizen:read" - Officer accessed citizen data
     - ✅ Each entry has timestamp, user, IP address

5. **Test Expiry**:
   - Wait for expiry time (or manually expire for testing)
   - As Officer, try to access sensitive field again
   - **Expected**:
     - ❌ Access revoked
     - 🔒 Fields back to normal masked state
     - ⚠️ Message: "Break-glass access expired"

### Test 3: Rejection Flow

#### Objective
Verify that denied break-glass requests are handled correctly.

#### Steps

1. **Submit Request**:
   - As Officer, submit break-glass request
   - Use insufficient justification: "Need access"

2. **Deny Request**:
   - As Admin, click **"Deny"** button
   - Add reason: "Justification insufficient - requires incident number and legal basis"

3. **Verify**:
   - ✅ Officer receives denial notification
   - ✅ Audit log shows denial with reason
   - ❌ No access granted

---

## 🔍 Manual Verification Checklist

### UI Components
- [ ] Break-Glass Request button is clearly visible
- [ ] Warning badges display for active sessions
- [ ] Masked fields show `***` instead of real data
- [ ] Access level indicators are color-coded
- [ ] Approval/Denial buttons work correctly

### Security
- [ ] Sensitive fields hidden without proper permission
- [ ] Break-glass requires approval (can't auto-approve)
- [ ] Sessions expire at correct time
- [ ] Revocation immediately removes access
- [ ] All actions create audit entries

### Audit Trail
- [ ] Request submission logged
- [ ] Approval/denial logged
- [ ] Every field access logged during break-glass
- [ ] Session expiry logged
- [ ] Logs include: timestamp, user, action, entity, field

---

## 🚨 Critical Security Tests

### Test: SQL Injection via Break-Glass Form
**Attempt**: Enter `'; DROP TABLE citizens; --` in incident reference  
**Expected**: Input sanitized, no database damage

### Test: XSS via Justification Field
**Attempt**: Enter `<script>alert('XSS')</script>` in justification  
**Expected**: Script tags escaped, rendered as text

### Test: Session Hijacking
**Attempt**: Copy break-glass session token to another browser  
**Expected**: Token invalid or tied to specific IP/browser

### Test: Privilege Escalation
**Attempt**: Officer tries to approve their own request  
**Expected**: Error - "Cannot approve your own request"

---

## 📊 Expected Audit Log Format

```json
{
  "auditId": "uuid",
  "timestamp": "2026-01-21T07:30:00Z",
  "userId": "officer-uuid",
  "userName": "John Kila",
  "action": "break_glass:request",
  "entityType": "break_glass_session",
  "entityId": "INC-2026-TEST-001",
  "beforeState": null,
  "afterState": {
    "status": "pending",
    "duration": 120,
    "justification": "Emergency access for court order..."
  },
  "ipAddress": "192.168.1.100",
  "userAgent": "Mozilla/5.0...",
  "breakGlassActive": false
}
```

---

## 🔧 Database Verification Queries

### Check Break-Glass Requests
```sql
SELECT * FROM break_glass_requests 
WHERE created_at > NOW() - INTERVAL '24 hours'
ORDER BY created_at DESC;
```

### Check Audit Logs for Break-Glass
```sql
SELECT 
  action,
  user_name,
  entity_type,
  created_at,
  before_state,
  after_state
FROM audit_logs
WHERE action LIKE 'break_glass%'
ORDER BY created_at DESC
LIMIT 50;
```

### Verify Field Access Policies
```sql
SELECT 
  entity,
  field,
  officer_access,
  manager_access,
  admin_access,
  break_glass_access
FROM field_access_policies
WHERE entity = 'citizen';
```

---

## ✅ Test Results Template

| Test Case | Status | Notes | Tester | Date |
|-----------|--------|-------|--------|------|
| Field redaction (Officer) | ⏳ Pending | | | |
| Field redaction (Manager) | ⏳ Pending | | | |
| Field redaction (Admin) | ⏳ Pending | | | |
| Break-glass request | ⏳ Pending | | | |
| Break-glass approval | ⏳ Pending | | | |
| Break-glass denial | ⏳ Pending | | | |
| Session expiry | ⏳ Pending | | | |
| Audit logging | ⏳ Pending | | | |
| SQL injection test | ⏳ Pending | | | |
| XSS test | ⏳ Pending | | | |

---

## 📞 Support & Troubleshooting

### Issue: Masked fields showing full data
**Solution**: Check role permissions in database, verify field policy matrix configuration

### Issue: Break-glass request not submitting
**Solution**: Check browser console for errors, verify API endpoint is reachable

### Issue: Audit logs not appearing
**Solution**: Verify `audit_logs` table exists, check database write permissions

### Issue: Session not expiring
**Solution**: Check server time synchronization, verify cron job for expiry checking

---

## 🎯 Success Criteria

✅ All sensitive fields properly masked based on role  
✅ Break-glass requires valid justification (min 50 chars)  
✅ Approval workflow functions correctly  
✅ Sessions expire at specified time  
✅ Complete audit trail for all break-glass actions  
✅ No SQL injection or XSS vulnerabilities  
✅ UI clearly indicates when break-glass is active  
✅ Denied requests provide clear feedback  

---

**Testing Status**: Ready for UAT  
**Security Level**: Enterprise-Grade  
**Compliance**: Audit-Ready
