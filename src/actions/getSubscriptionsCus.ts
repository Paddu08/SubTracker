import { db } from "@/db";
import { eq } from "drizzle-orm";
import { subscriptions } from "@/db/schema";
import { getCustDetails } from "./getCustDetails";

export async function getSubscriptionsCus() {
  const user = await getCustDetails();

  console.log("🔍 Fetching subscriptions for customer:", user.id);

  const subs = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.customerId, user.id));

  if (!subs || subs.length === 0) {
    throw new Error("No subscriptions found for this customer");
  }

  return subs;
}
