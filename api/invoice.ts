import nodemailer from 'nodemailer';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { email, subject, html, invoiceNumber } = req.body;

    if (!email || !html) {
        return res.status(400).json({ error: 'Email and Content are required' });
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        return res.status(500).json({ error: 'Server configuration error' });
    }

    const emailUser = String(process.env.EMAIL_USER || '').trim();
    const emailPass = String(process.env.EMAIL_PASS || '').replace(/\s/g, '');

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: emailUser,
            pass: emailPass,
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    try {
        await transporter.verify();

        await transporter.sendMail({
            from: `"Happy Dental Accounts" <${emailUser}>`,
            to: email, // Send directly to the client/practice
            bcc: process.env.RECIPIENT_EMAIL || 'info@happydentalagency.co.uk', // Copy the agency
            subject: subject || `Invoice #${invoiceNumber}`,
            html: html,
        });

        return res.status(200).json({ success: true, message: 'Invoice sent successfully' });
    } catch (error) {
        console.error('Invoice Email Error:', error);
        return res.status(500).json({ error: 'Failed to send invoice', details: error instanceof Error ? error.message : 'Unknown' });
    }
}
