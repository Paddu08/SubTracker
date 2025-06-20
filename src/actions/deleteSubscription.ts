'use server';

import { db } from "@/db";
import { subscriptions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function deleteSubscription(formData: FormData) {
  const idValue = formData.get("id");

  if (!idValue || isNaN(Number(idValue))) {
    throw new Error("Invalid or missing subscription ID.");
  }

  const id = Number(idValue);

  await db.delete(subscriptions).where(eq(subscriptions.id, id));

  revalidatePath("/subscriptions");
}
