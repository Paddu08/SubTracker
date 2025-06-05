// app/api/webhooks/user-created/route.ts
console.log("📡 Route file loaded: /api/webhooks/user-created");

import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { customers } from "@/db/schema";
import { eq } from "drizzle-orm";

interface ClerkUserEvent {
  type: string;
  data: {
    id: string;
    email_addresses?: Array<{ email_address: string }>;
    first_name?: string;
    last_name?: string;
  };
}

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

if (!webhookSecret) {
  throw new Error("❌ Missing Clerk Webhook secret in environment variables");
}

export async function POST(req: Request) {
  console.log("🔄 Webhook received - starting processing...");
  
  try {
    const payload = await req.text();
    console.log("📦 Payload received, length:", payload.length);
    
    const headerList = await headers();
    console.log("📋 Headers extracted");

    const svix = new Webhook(webhookSecret!);

    let evt: ClerkUserEvent;

    try {
      evt = svix.verify(payload, {
        "svix-id": headerList.get("svix-id") ?? "",
        "svix-timestamp": headerList.get("svix-timestamp") ?? "",
        "svix-signature": headerList.get("svix-signature") ?? "",
      }) as ClerkUserEvent;
      console.log("✅ Webhook verification successful");
    } catch (err) {
      console.error("❌ Webhook verification failed:", err);
      return new NextResponse("Webhook verification failed", { status: 400 });
    }

    const { type: eventType, data } = evt;
    console.log("📄 Event type:", eventType);
    console.log("👤 User data:", JSON.stringify(data, null, 2));

    if (eventType !== "user.created") {
      console.log("⏭️ Skipping non-user-created event");
      return new NextResponse("Event not handled", { status: 200 });
    }

    const clerkId = data.id;
    const email = data.email_addresses?.[0]?.email_address;
    const firstName = data.first_name;
    const lastName = data.last_name;
    const name = [firstName, lastName].filter(Boolean).join(" ") || "Unknown User";

    console.log("🔍 Extracted data:", { clerkId, email, firstName, lastName, name });

    if (!email) {
      console.error("❌ No email address found for user:", clerkId);
      return new NextResponse("Email address required", { status: 400 });
    }

    console.log("🔍 Checking if user exists in database...");
    
    const existing = await db
      .select()
      .from(customers)
      .where(eq(customers.clerkId, clerkId));

    console.log("📊 Existing user check result:", existing.length);

    if (existing.length > 0) {
      console.log("ℹ️ User already exists:", clerkId);
      return NextResponse.json({ message: "User already exists" }, { status: 200 });
    }

    console.log("💾 Attempting to insert user into database...");
    
    const insertResult = await db.insert(customers).values({
      clerkId,
      firstName: data.first_name || "Unknown",
      lastName: data.last_name || "User", 
      email,
     phone: `temp-${clerkId}` // Assuming phone is optional
    });

    console.log("✅ Database insert successful:", insertResult);
    console.log("✅ User created successfully:", { clerkId, email, name });
    
    return NextResponse.json({ message: "User created successfully" }, { status: 200 });
    
  } catch (error) {
    console.error("❌ FULL ERROR DETAILS:", error);
    console.error("❌ Error stack:", error instanceof Error ? error.stack : 'No stack trace');
    return new NextResponse("Failed to create user", { status: 500 });
  }
}