'use server';

import { transporter } from '@/lib/mailer';
import { getSubscriptionReminderEmailHtml } from '@/components/ui/Emailtemplate';
import { getExpiringSubscriptions } from './getExpirySubscription';

export async function sendEmailAction() {
  try {
    const subs = await getExpiringSubscriptions();

    if (subs.length === 0) {
      console.log('ℹ️ No expiring subscriptions today.');
      return;
    }

    for (const sub of subs) {
      const html = getSubscriptionReminderEmailHtml({
        firstName:  'there', // adjust based on schema
        subscriptionName: sub.name || 'your plan',
        subscriptionEndDate: sub.endDate.toDateString(), // format nicely
      });

      await transporter.sendMail({
        from: `"SubTrackr" <${process.env.GMAIL_USER}>`,
        to: sub.email,
        subject: '📢 Your subscription is expiring soon',
        html,
      });

      console.log(`✅ Email sent to ${sub.email}`);
    }
  } catch (err) {
    console.error('❌ Failed to send emails:', err);
  }
}
