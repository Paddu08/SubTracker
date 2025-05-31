import { NextResponse } from "next/server";
import { db } from "@/db";
import { customers } from "@/db/schema";

export async function POST(req: Request) {
  const body = await req.json();

  const {
    // id: clerkUserId,
    first_name,
    last_name,
    email_addresses,
    phone_numbers,
  } = body;

  const email = email_addresses?.[0]?.email_address || "";
  const phone = phone_numbers?.[0]?.phone_number || "";

  // Add to your customers table
  await db.insert(customers).values({
    firstName: first_name || "",
    lastName: last_name || "",
    email,
    phone,
  });

  return NextResponse.json({ message: "Customer created" }, { status: 200 });
}
