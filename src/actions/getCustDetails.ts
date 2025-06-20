'use server'

import { db } from "@/db"
import { customers } from "@/db/schema"
import { currentUser } from "@clerk/nextjs/server"
import { eq } from "drizzle-orm" 

export async function getCustDetails() {
  const user = await currentUser()
  console.log("🔍 Fetching customer details for user:", user?.id)

  if (!user || !user.id) {
    throw new Error("User not authenticated")
  }

  const [customer] = await db
    .select()
    .from(customers)
    .where(eq(customers.clerkId, user.id))
  

  if (!customer) {
    throw new Error("Customer not found")
  }

  return {
    id: customer.id,
   
  }
}
