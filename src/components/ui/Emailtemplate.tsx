export function getSubscriptionReminderEmailHtml({
  firstName,
  subscriptionName,
  subscriptionEndDate,
}: {
  firstName: string;
  subscriptionName: string;
  subscriptionEndDate: string;
}) {
  return `
  <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 30px; border-radius: 8px; max-width: 600px; margin: 0 auto; color: #333;">
    <h2 style="margin-top: 0;">👋 Hi ${firstName},</h2>

    <p>Your <strong>${subscriptionName}</strong> subscription is set to expire on <strong>${subscriptionEndDate}</strong>.</p>

    <p>Here’s what you can do:</p>
    <ul style="padding-left: 20px;">
      <li>✅ Renew your subscription to avoid interruptions</li>
      <li>💳 Update your payment method if needed</li>
      <li>❌ Cancel or change plans before it auto-renews</li>
    </ul>

    <p style="margin-top: 30px;">
      👉 <a href="https://your-app.vercel.app/dashboard" style="background-color: #4F46E5; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 6px; display: inline-block;">Manage Subscription</a>
    </p>

    <p style="margin-top: 40px;">Thanks for being with us!<br />– The SubTrackr Team</p>

    <hr style="margin-top: 40px; border: none; border-top: 1px solid #ddd;" />

    <footer style="font-size: 12px; color: #888;">
      &copy; ${new Date().getFullYear()} SubTrackr. All rights reserved.<br />
      If you have any questions, contact us at <a href="mailto:support@subtrackr.com">support@subtrackr.com</a>.
    </footer>
  </div>
  `;
}
