import { db } from '@/db';
import { subscriptions, customers, scheduledEmails } from '@/db/schema';
import { eq, and, gte, lt } from 'drizzle-orm';
import { addDays, startOfDay } from 'date-fns';

export async function getExpiringSubsAndReminderEmails() {
  const today = startOfDay(new Date());
  const dayAfter7 = startOfDay(addDays(new Date(), 8));

  // Subscriptions expiring within 7 days
  const expiringSubs = await db
    .select({
      id: subscriptions.id,
      email: customers.email,
      endDate: subscriptions.endDate,
      name: subscriptions.plan,
    })
    .from(subscriptions)
    .innerJoin(customers, eq(customers.id, subscriptions.customerId))
    .where(
      and(
        gte(subscriptions.endDate, today),
        lt(subscriptions.endDate, dayAfter7)
      )
    );

  // Scheduled reminder emails scheduled for tomorrow and not sent
  const tomorrow = startOfDay(addDays(new Date(), 1));
  const dayAfterTomorrow = startOfDay(addDays(new Date(), 2));

  const reminderEmails = await db
    .select()
    .from(scheduledEmails)
    .where(
      and(
        gte(scheduledEmails.scheduledAt, tomorrow),
        lt(scheduledEmails.scheduledAt, dayAfterTomorrow),
eq(scheduledEmails.sent, false)
      )
    );

  return {
    expiringSubscriptions: expiringSubs,
    scheduledReminderEmails: reminderEmails,
  };
}
