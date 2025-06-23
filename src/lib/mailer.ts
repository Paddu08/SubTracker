// lib/mailer.ts
import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_EMAIL, // your Gmail address
    pass: process.env.GMAIL_PASSWORD, // Gmail App Password
  },
  tls:{rejectUnauthorized: false} // Allow self-signed certificates
});
