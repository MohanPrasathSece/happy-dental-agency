import nodemailer from 'nodemailer';
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Professional Email Template Helper
const getEmailTemplate = (name: string, content: string, isConfirmation: boolean) => `
<div style="font-family: 'Inter', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #1a1f2c;">
  <div style="text-align: center; padding: 20px 0; background: #fff2b2; border-radius: 12px 12px 0 0;">
    <h1 style="margin: 0; font-size: 24px; color: #221F26;">Happy Dental Agency</h1>
  </div>
  
  <div style="padding: 30px; background: #ffffff; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px;">
    <h2 style="font-size: 20px; color: #221F26; margin-bottom: 20px;">
      ${isConfirmation ? `Hello ${name},` : 'New Inquiry Received'}
    </h2>
    
    <div style="line-height: 1.6; color: #4a5568;">
      ${content}
    </div>
    
    ${isConfirmation ? `
      <div style="margin-top: 30px; padding: 20px; background: #f8fafc; border-radius: 8px;">
        <p style="margin: 0; font-size: 14px; color: #64748b;">
          Our placement coordinators are currently reviewing your details. You can expect a response within 2 hours during our business hours.
        </p>
      </div>
    ` : ''}
    
    <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center;">
      <p style="margin: 0; font-size: 14px; color: #94a3b8;">
        &copy; ${new Date().getFullYear()} Happy Dental Agency. All rights reserved.
      </p>
      <p style="margin: 5px 0 0; font-size: 12px; color: #94a3b8;">
        United Kingdom | info@happydentalagency.co.uk
      </p>
    </div>
  </div>
</div>
`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, phone, message, type = 'General Inquiry', attachment, filename } = req.body;

  if (!email || !name) {
    return res.status(400).json({ error: 'Name and Email are required' });
  }

  // Configure transporter (Suggested: Provide these via environment variables in Vercel)
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: Number(process.env.EMAIL_PORT) || 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS, // Your app password
    },
  });

  try {
    // 1. Send Notification to Agency
    await transporter.sendMail({
      from: `"Happy Dental System" <${process.env.EMAIL_USER}>`,
      to: 'info@happydentalagency.co.uk',
      subject: `New ${type} from ${name}`,
      html: getEmailTemplate(
        name,
        `<p><strong>Name:</strong> ${name}</p>
         <p><strong>Email:</strong> ${email}</p>
         <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
         <p><strong>Inquiry Type:</strong> ${type}</p>
         <p><strong>Message:</strong></p>
         <div style="background: #f1f5f9; padding: 15px; border-radius: 6px;">${message || 'No message provided.'}</div>
         ${filename ? `<p><strong>Attachment:</strong> ${filename}</p>` : ""}`,
        false
      ),
      attachments: attachment ? [
        {
          filename: filename || 'attachment.pdf',
          content: attachment.split("base64,")[1],
          encoding: 'base64'
        }
      ] : []
    });

    // 2. Send Confirmation to User
    await transporter.sendMail({
      from: `"Happy Dental Agency" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Thank you for contacting Happy Dental Agency`,
      html: getEmailTemplate(
        name,
        `<p>Thank you for reaching out to Happy Dental Agency. We have successfully received your inquiry regarding <strong>${type}</strong>.</p>
         <p>Our team is dedicated to connecting the finest dental professionals with leading practices, and we are excited to assist you.</p>`,
        true
      ),
    });

    return res.status(200).json({ success: true, message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({ error: 'Failed to send emails' });
  }
}
