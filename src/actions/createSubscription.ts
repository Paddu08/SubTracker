'use server'

import { db } from "@/db/index";
import { subscriptions } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { getCustDetails } from "./getCustDetails";
  
export async function createSubscription(formData: FormData) {
  const user = await getCustDetails();
  
  const plan = formData.get("plan") as string;
  const price = parseInt(formData.get("price") as string);
  const startDate = formData.get("startDate") as string;
const endDate = parseInt(formData.get("duration") as string); 

  if (!plan || !price || !startDate) {
    throw new Error("Missing required fields");
  }

  const start = new Date(startDate);
  const end = new Date(startDate);
end.setMonth(end.getMonth() + endDate); 

  await db.insert(subscriptions).values({
    customerId: user.id, 
    plan,
    price,
    startDate: start,
    endDate: end,
    status: "active",
    currency: "usd",
  });

  revalidatePath("/"); // Refresh the homepage if needed
}



export async function getAllSubscriptions() {
  const all = await db.select().from(subscriptions);
  return all;
}