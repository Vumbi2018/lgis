---
description: Document Review Workflow Implementation Guide
---

# Document Review Workflow

## Overview
This workflow enables licensing officers to **individually review, approve, or reject** uploaded documents within license applications. When a document is reviewed, the system automatically:
- Updates the document status in the database
- Logs the action in the audit trail
- Sends notifications to the applicant (in-app and email)

## Architecture

### Frontend Components
1. **DocumentReviewModal** (`client/src/components/DocumentReviewModal.tsx`)
   - Displays document preview (images, PDFs, or download link)
   - Provides "Approve" and "Reject" buttons
   - Captures rejection reason via textarea
   - Prevents approval of already-approved documents

2. **Request Details Page** (`client/src/pages/licensing/request-details.tsx`)
   - Lists all submitted documents in the "Submitted" tab
   - Each document shows its current status badge (pending/approved/rejected)
   - Clicking a document opens the `DocumentReviewModal`
   - Integrates with the review mutation to update UI automatically

### Backend Implementation
**Endpoint**: `PATCH /api/v1/documents/:id/review`

**Request Body**:
```json
{
  "status": "approved" | "rejected",
  "rejectionReason": "Optional string, required if status is rejected"
}
```

**Response**:
```json
{
  "documentId": "uuid",
  "status": "approved",
  "verified": true,
  "verifiedBy": "user-id",
  "verifiedAt": "2026-01-21T06:40:00Z",
  ...
}
```

**Logic Flow** (`server/routes.ts`, lines 119-210):
1. Update document status in database
2. Create audit log entry
3. Identify document owner (business or citizen via service request)
4. Create in-app notification (if user account exists)
5. Send email notification (currently mocked via console.log)
6. Return updated document

### Database Schema
**Table**: `documents`

**Key Fields**:
- `status`: TEXT NOT NULL DEFAULT 'pending' → 'approved' | 'rejected'
- `rejectionReason`: TEXT (populated only when rejected)
- `verified`: BOOLEAN DEFAULT false (set to true when approved)
- `verifiedBy`: VARCHAR (user ID of reviewing officer)
- `verifiedAt`: TIMESTAMP (timestamp of approval)

## Usage Guide

### For Licensing Officers

1. **Navigate to Application**
   - Go to `/licensing`
   - Click on any application to view details

2. **Review Documents**
   - Click the "Documents" card on the right side
   - Switch to the "Submitted" tab
   - Each document shows:
     - File name and type
     - Source (Request or Business)
     - Current status badge
     - File size

3. **Approve a Document**
   - Click the arrow icon next to a document
   - Review the document preview
   - Click "Approve" button
   - Document status updates to "approved" ✅

4. **Reject a Document**
   - Click the arrow icon next to a document
   - Click "Reject" button
   - Enter a detailed rejection reason
   - Click "Confirm Rejection"
   - Document status updates to "rejected" ❌
   - Applicant receives notification with the reason

### For Applicants (Future Portal Enhancement)
- Receive in-app notification when document is reviewed
- Receive email notification with outcome
- If rejected, see the specific reason provided by the officer
- Can re-upload corrected documents

## Notification System

### In-App Notifications
**Created when**: Document is approved or rejected  
**Stored in**: `notifications` table  
**Fields**:
```typescript
{
  userId: string,           // Recipient user ID
  type: 'success' | 'warning',
  title: 'Document Approved' | 'Document Rejected',
  message: 'Your document "file.pdf" has been approved.',
  referenceType: 'document',
  referenceId: documentId,
  read: false
}
```

### Email Notifications
**Status**: Currently mocked (console.log)  
**To enable**:
1. Uncomment email logic in `server/routes.ts` (line ~198)
2. Implement using existing `sendEmail` function from `server/email.ts`
3. Create email template for document review notifications

## Testing Checklist

### Manual Testing Steps
1. ✅ Upload a document to a license application
2. ✅ Open the application details page
3. ✅ Click on the uploaded document
4. ✅ Verify document preview displays correctly
5. ✅ Approve the document → Check status badge updates
6. ✅ Try to approve again → Button should be disabled
7. ✅ Upload another document and reject it
8. ✅ Verify rejection reason is required
9. ✅ Check server logs for notification messages
10. ✅ Verify audit logs are created

### API Testing
```bash
# Approve a document
curl -X PATCH http://localhost:5000/api/v1/documents/:documentId/review \
  -H "Content-Type: application/json" \
  -d '{"status": "approved"}'

# Reject a document
curl -X PATCH http://localhost:5000/api/v1/documents/:documentId/review \
  -H "Content-Type: application/json" \
  -d '{"status": "rejected", "rejectionReason": "Document is blurry and unreadable"}'
```

## Integration Points

### Workflow Status Transitions
The document review status influences the application workflow:
- **Processing → Inspection**: Requires all required documents to be submitted
- **Inspection → Approval**: Requires inspection report to be uploaded
- Officers can reject documents at any stage, triggering applicant notification

### Audit Trail
All document reviews are logged in `audit_logs`:
```typescript
{
  action: 'review_document',
  entityType: 'document',
  entityId: documentId,
  beforeState: { status: 'pending' },
  afterState: { status: 'approved', rejectionReason: null },
  userId: officerUserId,
  timestamp: ...
}
```

## Future Enhancements

1. **Email Integration**: Connect to real email service (Nodemailer is already installed)
2. **Bulk Actions**: Allow approving/rejecting multiple documents at once
3. **Document Versioning**: Track multiple uploads of the same document type
4. **Auto-Review**: AI-powered initial document validation
5. **Expiry Tracking**: Flag documents that are close to expiration
6. **Compliance Checks**: Auto-validate document against requirements checklist

## Troubleshooting

### Issue: Document modal doesn't open
- **Check**: Console for errors
- **Fix**: Ensure document has `documentId`, `fileName`, `mimeType`

### Issue: Notification not created
- **Check**: Server logs for "Notification failed" error
- **Common Cause**: Missing `ownerUserId` on business/citizen record
- **Fix**: Ensure businesses have `ownerUserId` field populated during registration

### Issue: Status not updating in UI
- **Check**: React Query cache invalidation
- **Fix**: Verify `queryClient.invalidateQueries` is called after mutation

## Related Files

- **Frontend**:
  - `client/src/components/DocumentReviewModal.tsx`
  - `client/src/pages/licensing/request-details.tsx`
  
- **Backend**:
  - `server/routes.ts` (lines 119-210)
  - `server/storage.ts` (`updateDocumentStatus`, `createNotification`)
  
- **Schema**:
  - `shared/schema.ts` (`documents`, `notifications`)

## Success Criteria

✅ Officers can approve documents with a single click  
✅ Officers must provide a reason when rejecting  
✅ Applicants receive immediate feedback via notifications  
✅ All actions are audited for compliance  
✅ UI updates in real-time without page refresh  
✅ System prevents duplicate approvals  

---

**Implementation Status**: ✅ **COMPLETE**  
**Last Updated**: 2026-01-21  
**Author**: Antigravity AI Assistant
