import nodemailer from 'nodemailer';

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'lawrencemukombo2@gmail.com',
        pass: process.env.EMAIL_PASS || 'ylbe fryj whsv hsul'
    }
});

interface EmailOptions {
    to: string;
    subject: string;
    text: string;
    html?: string;
}

export async function sendEmail({ to, subject, text, html }: EmailOptions): Promise<boolean> {
    try {
        const info = await transporter.sendMail({
            from: `"NCDC Licensing" <${process.env.EMAIL_USER || 'lawrencemukombo2@gmail.com'}>`,
            to,
            subject,
            text,
            html: html || text
        });
        console.log(`Email sent: ${info.messageId}`);
        return true;
    } catch (error) {
        console.error("Error sending email:", error);
        return false;
    }
}

export function getDocumentReviewEmailContent(documentName: string, status: 'approved' | 'rejected', rejectionReason?: string): { subject: string, text: string, html: string } {
    const statusFormatted = status.charAt(0).toUpperCase() + status.slice(1);

    let subject = `Document ${statusFormatted}: ${documentName}`;
    let message = `Your document "${documentName}" has been ${status}.`;

    if (status === 'rejected' && rejectionReason) {
        message += `\n\nReason: ${rejectionReason}`;
        message += `\n\nPlease re-upload a corrected version of this document to proceed with your application.`;
    } else if (status === 'approved') {
        message += ` Your application is progressing smoothly.`;
    }

    const html = `
      <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <div style="background: linear-gradient(135deg, #FFCC00 0%, #F0B700 100%); padding: 30px; border-radius: 8px 8px 0 0; text-align: center;">
          <h1 style="color: #07080A; margin: 0; font-size: 24px; font-weight: 700;">Document Review Update</h1>
        </div>
        
        <div style="background: #ffffff; padding: 30px; border: 1px solid #E5E7EB; border-top: none; border-radius: 0 0 8px 8px;">
          <div style="background: ${status === 'approved' ? '#ECFDF5' : '#FEF2F2'}; border-left: 4px solid ${status === 'approved' ? '#10B981' : '#EF4444'}; padding: 16px; margin-bottom: 24px; border-radius: 4px;">
            <p style="margin: 0; font-size: 16px; color: ${status === 'approved' ? '#065F46' : '#991B1B'}; font-weight: 600;">
              ${status === 'approved' ? '✅ Document Approved' : '❌ Document Rejected'}
            </p>
          </div>
          
          <p style="font-size: 15px; line-height: 1.6; color: #4B5563; margin-bottom: 16px;">
            <strong style="color: #111827;">Document:</strong> ${documentName}
          </p>
          
          <p style="font-size: 15px; line-height: 1.6; color: #4B5563; margin-bottom: 16px;">
            <strong style="color: #111827;">Status:</strong> 
            <span style="display: inline-block; padding: 4px 12px; background: ${status === 'approved' ? '#10B981' : '#EF4444'}; color: white; border-radius: 4px; font-weight: 600; font-size: 13px;">
              ${statusFormatted}
            </span>
          </p>
          
          ${rejectionReason ? `
            <div style="background: #FFF7ED; border: 1px solid #FDBA74; padding: 16px; border-radius: 6px; margin: 20px 0;">
              <p style="margin: 0 0 8px 0; font-weight: 600; color: #9A3412;">Rejection Reason:</p>
              <p style="margin: 0; color: #7C2D12; font-size: 14px; line-height: 1.5;">${rejectionReason}</p>
              <p style="margin: 16px 0 0 0; font-size: 14px; color: #9A3412;">
                <strong>Next Steps:</strong> Please upload a corrected version of this document to continue with your application.
              </p>
            </div>
          ` : ''}
          
          ${status === 'approved' ? `
            <div style="background: #F0FDF4; border: 1px solid #86EFAC; padding: 16px; border-radius: 6px; margin: 20px 0;">
              <p style="margin: 0; color: #166534; font-size: 14px; line-height: 1.5;">
                ✅ <strong>Great news!</strong> Your document has been verified and your application is progressing smoothly.
              </p>
            </div>
          ` : ''}
          
          <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #E5E7EB;">
            <a href="http://localhost:5000/licensing" 
               style="display: inline-block; background: #07080A; color: #FFCC00; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px;">
              View Application
            </a>
          </div>
        </div>
        
        <div style="text-align: center; padding: 20px; color: #6B7280; font-size: 12px;">
          <p style="margin: 0 0 8px 0;">This is an automated notification from the NCDC Licensing System</p>
          <p style="margin: 0;">National Capital District Commission</p>
        </div>
      </div>
    `;

    return { subject, text: message, html };
}

export function getStatusChangeEmailContent(status: string, requestId: string, refId: string | undefined | null): { subject: string, text: string, html: string } {
    const reference = refId || requestId;
    const statusFormatted = status.charAt(0).toUpperCase() + status.slice(1);

    let subject = `Application Update: ${statusFormatted}`;
    let message = `Your application (${reference}) status has been updated to: ${statusFormatted}.`;

    if (status === 'processing' || status === 'review') {
        subject = `Application Received: ${reference}`;
        message = `We have received your application (${reference}) and it is currently under review.`;
    } else if (status === 'inspection') {
        subject = `Inspection Scheduled: ${reference}`;
        message = `Your application (${reference}) has passed the initial review and is now scheduled for inspection. Please expect a visit from our inspectors soon.`;
    } else if (status === 'approved') {
        subject = `Application Approved: ${reference}`;
        message = `Congratulations! Your application (${reference}) has been approved. You can now proceed to payment and issuance.`;
    } else if (status === 'rejected') {
        subject = `Application Rejected: ${reference}`;
        message = `We regret to inform you that your application (${reference}) has been rejected. Please review the comments in your dashboard for more details.`;
    }

    return {
        subject,
        text: message,
        html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #0056b3;">Application Update</h2>
        <p><strong>Reference:</strong> ${reference}</p>
        <p><strong>New Status:</strong> <span style="font-weight: bold; color: #0056b3;">${statusFormatted}</span></p>
        <p>${message}</p>
        <hr style="border: 1px solid #eee; margin: 20px 0;" />
        <p style="font-size: 12px; color: #666;">This is an automated message from the NCDC Licensing System.</p>
      </div>
    `
    };
}
