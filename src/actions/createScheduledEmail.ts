'use server';

import { db } from '@/db';
import { scheduledEmails } from '@/db/schema';
import { getCustDetails } from './getCustDetails';


export async function createScheduledEmail(formData: FormData) {
  const {id}=  await getCustDetails();
  const reminderTitle = formData.get('reminderTitle')?.toString().trim();
  const scheduledAt = formData.get('reminderDate')?.toString(); // will be stored in `scheduled_at`
  const email = formData.get('email')?.toString().trim();
  const customerId = id; // assuming you're passing this

  // Basic validation
  if (!reminderTitle || !scheduledAt || !email || !customerId) {
    console.error('❌ Missing required fields');
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    console.error('❌ Invalid email format');
    return;
  }

  try {
    await db.insert(scheduledEmails).values({
      reminderTitle,
      email,
    customerId,
      scheduledAt: new Date(scheduledAt),
    });

    console.log('✅ Scheduled email created');
  } catch (err) {
    console.error('❌ Failed to insert scheduled email:', err);
  }
}
