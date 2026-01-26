import nodemailer from 'nodemailer';
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Professional Email Template Helper - Minimal & Structured Design
const getEmailTemplate = (name: string, content: string, isConfirmation: boolean) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', Helvetica, Arial, sans-serif;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%); padding: 32px 40px; text-align: center;">
              <h1 style="margin: 0; font-size: 26px; font-weight: 600; color: #ffffff; letter-spacing: -0.5px;">
                Happy Dental Agency
              </h1>
              <p style="margin: 8px 0 0; font-size: 13px; color: #ecf0f1; opacity: 0.9;">
                ${isConfirmation ? 'Thank You for Contacting Us' : 'New Contact Inquiry'}
              </p>
            </td>
          </tr>
          
          <!-- Main Content -->
          <tr>
            <td style="padding: 40px;">
              ${isConfirmation ? `
                <p style="margin: 0 0 24px; font-size: 16px; color: #2c3e50; line-height: 1.6;">
                  Hello <strong>${name}</strong>,
                </p>
                <p style="margin: 0 0 24px; font-size: 15px; color: #4a5568; line-height: 1.7;">
                  Thank you for reaching out to Happy Dental Agency. We have successfully received your inquiry and our team is reviewing your message.
                </p>
                <div style="background-color: #f8f9fa; border-left: 4px solid #2c3e50; padding: 20px; margin: 24px 0; border-radius: 4px;">
                  <p style="margin: 0; font-size: 14px; color: #495057; line-height: 1.6;">
                    <strong>What's Next?</strong><br>
                    Our placement coordinators will review your details and respond within 2 hours during business hours (Mon-Fri, 8:00 AM - 6:00 PM).
                  </p>
                </div>
              ` : `
                <h2 style="margin: 0 0 24px; font-size: 18px; font-weight: 600; color: #2c3e50;">
                  New Inquiry Details
                </h2>
                ${content}
              `}
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 32px 40px; border-top: 1px solid #e9ecef;">
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="text-align: center;">
                    <p style="margin: 0 0 8px; font-size: 13px; color: #6c757d; line-height: 1.5;">
                      <strong>Happy Dental Agency</strong>
                    </p>
                    <p style="margin: 0 0 4px; font-size: 12px; color: #868e96;">
                      Capital Office, 124 City Road<br>
                      London, EC1V 2NX, United Kingdom
                    </p>
                    <p style="margin: 0 0 16px; font-size: 12px; color: #868e96;">
                      <a href="mailto:info@happydentalagency.co.uk" style="color: #2c3e50; text-decoration: none;">info@happydentalagency.co.uk</a>
                    </p>
                    <p style="margin: 0; font-size: 11px; color: #adb5bd;">
                      &copy; ${new Date().getFullYear()} Happy Dental Agency. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  console.log('--- Incoming Contact Request ---');
  console.log('Time:', new Date().toISOString());
  console.log('Body:', JSON.stringify(req.body));

  const { name, email, phone, message, type = 'General Inquiry', subject, attachment, filename } = req.body;

  if (!email || !name) {
    console.error('Validation Error: Missing name or email');
    return res.status(400).json({ error: 'Name and Email are required' });
  }

  // Check for environment variables
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('Missing environment variables: EMAIL_USER or EMAIL_PASS');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  // Configure Google SMTP (Gmail)
  const emailUser = String(process.env.EMAIL_USER || '').trim();
  const emailPass = String(process.env.EMAIL_PASS || '').replace(/\s/g, '');

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // Use SSL
    auth: {
      user: emailUser,
      pass: emailPass,
    },
    tls: {
      rejectUnauthorized: false // Helps with some network environments
    }
  });

  try {
    // Verify connection configuration
    console.log('Attempting SMTP Verification for:', emailUser);
    try {
      await transporter.verify();
      console.log('✅ SMTP Verification Success');
    } catch (verifyError) {
      console.error('❌ Critical SMTP Verification Failure:');
      console.error('Error Code:', (verifyError as any).code);
      console.error('Error Message:', (verifyError as Error).message);
      if ((verifyError as any).response) console.error('SMTP Response:', (verifyError as any).response);

      return res.status(500).json({
        error: 'Email service connection failed',
        code: (verifyError as any).code,
        details: verifyError instanceof Error ? verifyError.message : 'Unknown verification error'
      });
    }

    console.log('📧 Sending notification email to agency...');

    // Build email content
    const emailContent = `
      <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <tr>
          <td style="padding: 16px; background-color: #f8f9fa; border-radius: 6px;">
            <table role="presentation" style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef;">
                  <strong>Name:</strong> ${name}
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef;">
                  <strong>Email:</strong> <a href="mailto:${email}">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef;">
                  <strong>Phone:</strong> ${phone || 'Not provided'}
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef;">
                  <strong>Type:</strong> ${type}
                </td>
              </tr>
              ${subject ? `
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef;">
                  <strong>Subject:</strong> ${subject}
                </td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 12px 0;">
                  <strong>Message:</strong><br>
                  <div style="background-color: #ffffff; padding: 16px; border-radius: 6px; border: 1px solid #e9ecef; margin-top: 8px;">
                    ${message || 'No message provided'}
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    `;

    // 1. Send Notification to Agency
    await transporter.sendMail({
      from: `"Happy Dental System" <${emailUser}>`,
      to: process.env.RECIPIENT_EMAIL || 'info@happydentalagency.co.uk',
      subject: `New ${type} from ${name}`,
      html: getEmailTemplate(name, emailContent, false),
      attachments: (attachment && typeof attachment === 'string' && attachment.includes("base64,")) ? [
        {
          filename: filename || 'attachment.pdf',
          content: attachment.split("base64,")[1],
          encoding: 'base64'
        }
      ] : []
    });

    console.log('✅ Agency notification sent');

    // 2. Send Confirmation to User
    await transporter.sendMail({
      from: `"Happy Dental Agency" <${emailUser}>`,
      to: email,
      subject: `Thank you for contacting Happy Dental Agency`,
      html: getEmailTemplate(
        name,
        `<p>Thank you for reaching out to Happy Dental Agency. We have successfully received your inquiry regarding <strong>${type}</strong>.</p>
         <p>Our team is dedicated to connecting the finest dental professionals with leading practices, and we are excited to assist you.</p>`,
        true
      ),
    });

    console.log('✅ User confirmation sent');
    console.log('🎉 All emails sent successfully');

    return res.status(200).json({ success: true, message: 'Emails sent successfully' });
  } catch (error) {
    console.error('--- SMTP Execution Error ---');
    console.error('Error Name:', (error as Error).name);
    console.error('Error Message:', (error as Error).message);
    if ((error as any).code) console.error('Error Code:', (error as any).code);
    if ((error as any).response) console.error('SMTP Response:', (error as any).response);

    return res.status(500).json({
      error: 'Failed to send emails',
      code: (error as any).code,
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
