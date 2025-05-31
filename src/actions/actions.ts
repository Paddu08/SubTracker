'use server'

import { db } from "@/db/index";
import { subscriptions } from "@/db/schema";
import { revalidatePath } from "next/cache";

export async function createSubscription(formData: FormData) {
  const plan = formData.get("plan") as string;
  const price = parseInt(formData.get("price") as string);
  const startDate = formData.get("startDate") as string;
const endDate = parseInt(formData.get("duration") as string); // Get duration in months


  if (!plan || !price || !startDate) {
    throw new Error("Missing required fields");
  }

  const start = new Date(startDate);
  const end = new Date(startDate);
end.setMonth(end.getMonth() + endDate); // Add duration (in months)

  await db.insert(subscriptions).values({
    customerId: 1, 
    plan,
    price,
    startDate: start,
    endDate: end,
    status: "active",
    currency: "usd",
  });

  revalidatePath("/"); // Refresh the homepage if needed
}
