
'use server';

import { db } from "@/db";
import { subscriptions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function toggleSubscriptionStatus(formData: FormData) {
  const idValue = formData.get("id");

  if (!idValue || isNaN(Number(idValue))) {
    throw new Error("Invalid or missing subscription ID.");
  }

  const id = Number(idValue);

  const [sub] = await db
    .select({ status: subscriptions.status })
    .from(subscriptions)
    .where(eq(subscriptions.id, id));

  if (!sub) {
    throw new Error("Subscription not found.");
  }

  const newStatus = sub.status === "active" ? "paused" : "active";

  await db
    .update(subscriptions)
    .set({ status: newStatus })
    .where(eq(subscriptions.id, id));

  revalidatePath("/subscriptions");
}
