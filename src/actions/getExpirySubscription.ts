import { db } from '@/db';
import { subscriptions, customers } from '@/db/schema';
import { eq, and, gte, lt } from 'drizzle-orm';
import { addDays, startOfDay } from 'date-fns';

export async function getExpiringSubscriptionsWithin7Days() {
  const today = startOfDay(new Date()); // start of today, e.g. 2025-06-24 00:00
  const dayAfter7 = startOfDay(addDays(new Date(), 8)); // start of day after 7 days, e.g. 2025-07-02 00:00

  return await db
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
        gte(subscriptions.endDate, today),   // endDate >= today
        lt(subscriptions.endDate, dayAfter7) // endDate < day after 7 days
      )
    );
}
