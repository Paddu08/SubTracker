import { db } from '@/db';
import { subscriptions,customers } from '@/db/schema';
import { eq, and, gte, lt } from 'drizzle-orm';
import { addDays, startOfDay } from 'date-fns';

export async function getExpiringSubscriptions() {
  const target = startOfDay(addDays(new Date(), 7));
  const nextDay = startOfDay(addDays(new Date(), 8));

  return await db
    .select({
      id: subscriptions.id,
      email: customers.email,
      endDate: subscriptions.endDate,
      name:subscriptions.plan,
    })
    .from(subscriptions)
    .innerJoin(customers, eq(customers.id, subscriptions.customerId))
    .where(
      and(
        gte(subscriptions.endDate, target),
        lt(subscriptions.endDate, nextDay)
      )
    );
}
