import { NextResponse } from 'next/server';
import { sendEmailAction } from '@/actions/sendEmail';

export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization');

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await sendEmailAction(); // send emails to expiring users
    return NextResponse.json({ status: 'success', message: 'Emails processed' });
  } catch (error: unknown) {
    console.error('❌ Cron job failed:', error);

    const message = error instanceof Error ? error.message : 'Unknown error';

    return NextResponse.json(
      { status: 'error', error: message },
      { status: 500 }
    );
  }
}
