'use server';


import { transporter } from '@/lib/mailer';
import { getSubscriptionReminderEmailHtml } from '@/components/ui/Emailtemplate';
import { getCustDetails } from './getCustDetails';

export async function sendEmailAction() {
  const {email}= await getCustDetails()
  try {
   const html = getSubscriptionReminderEmailHtml({
  firstName: "John",
  subscriptionName: "Pro Plan",
  subscriptionEndDate: "June 30, 2025",
});


    await transporter.sendMail({
      from: `"SubTrackr" <${process.env.GMAIL_USER}>`,
      to: email, // send to yourself
      subject: '📢 Your subscription is expiring soon',
      html,
    });

    console.log('✅ Email sent!');
  } catch (err) {
    console.error('❌ Failed to send email:', err);
  }}