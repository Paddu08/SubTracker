'use server';
import { db } from '@/db';
import { scheduledEmails } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { transporter } from '@/lib/mailer';
import { getSubscriptionReminderEmailHtml } from '@/components/ui/Emailtemplate';
import { getExpiringSubsAndReminderEmails } from './getExpirySubscription';

export async function sendEmailAction() {
  try {
    const { expiringSubscriptions, scheduledReminderEmails } = await getExpiringSubsAndReminderEmails();

    if (expiringSubscriptions.length === 0 && scheduledReminderEmails.length === 0) {
      console.log('ℹ️ No expiring subscriptions or scheduled reminders today.');
      return;
    }

    // Send emails for expiring subscriptions
    for (const sub of expiringSubscriptions) {
      const html = getSubscriptionReminderEmailHtml({
        firstName: 'there',
        subscriptionName: sub.name || 'your plan',
        subscriptionEndDate: sub.endDate.toDateString(),
      });

      await transporter.sendMail({
        from: `"SubTrackr" <${process.env.GMAIL_USER}>`,
        to: sub.email,
        subject: '📢 Your subscription is expiring soon',
        html,
      });

      console.log(`✅ Expiring subscription email sent to ${sub.email}`);
    }

    // Send emails for scheduled reminder emails
    for (const mail of scheduledReminderEmails) {
      const html = getSubscriptionReminderEmailHtml({
        firstName: 'there',
        subscriptionName: mail.reminderTitle || 'your plan',
        subscriptionEndDate: mail.scheduledAt.toDateString(),
      });

      await transporter.sendMail({
        from: `"SubTrackr" <${process.env.GMAIL_USER}>`,
        to: mail.email,
        subject: `🔔 Reminder: ${mail.reminderTitle}`,
        html,
      });

      await db
    .update(scheduledEmails)
    .set({ sent: true })
    .where(eq(scheduledEmails.id, mail.id));
      console.log(`✅ Scheduled reminder email sent to ${mail.email}`);
    }
  } catch (err) {
    console.error('❌ Failed to send emails:', err);
  }
}
