export function getUpcomingRenewalReminderEmailHtml({
  firstName,
  subscriptionName,
  renewalDate,
  price,
  currency,
}: {
  firstName: string;
  subscriptionName: string;
  renewalDate: string;
  price: number;
  currency: string;
}) {
  return `
  <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 30px; border-radius: 8px; max-width: 600px; margin: 0 auto; color: #333;">
    <h2 style="margin-top: 0;">🔔 Hey ${firstName},</h2>

    <p>Your <strong>${subscriptionName}</strong> subscription is set to renew on <strong>${renewalDate}</strong> for <strong>${currency} ${price}</strong>.</p>

    <p>If you'd like to make any changes, you can do so before the renewal date.</p>

    <ul style="padding-left: 20px;">
      <li>💳 Review or update your payment method</li>
      <li>📅 View your billing history</li>
      <li>🛠️ Change or cancel your subscription</li>
    </ul>

    <p style="margin-top: 30px;">
      👉 <a href="https://your-app.vercel.app/dashboard" style="background-color: #4F46E5; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 6px; display: inline-block;">Manage Subscription</a>
    </p>

    <p style="margin-top: 40px;">Thanks for choosing us!<br />– The SubTrackr Team</p>

    <hr style="margin-top: 40px; border: none; border-top: 1px solid #ddd;" />

    <footer style="font-size: 12px; color: #888;">
      &copy; ${new Date().getFullYear()} SubTrackr. All rights reserved.<br />
      Have questions? <a href="mailto:support@subtrackr.com">support@subtrackr.com</a>.
    </footer>
  </div>
  `;
}
