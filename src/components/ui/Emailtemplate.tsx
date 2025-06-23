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
  <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
    <p>Hi <strong>${firstName}</strong>,</p>
    <p>Just a quick heads-up — your subscription to <strong>${subscriptionName}</strong> is set to end on <strong>${subscriptionEndDate}</strong>.</p>
    <p>We wanted to make sure you don’t miss the chance to:</p>
    <ul>
      <li>✅ Renew your subscription and continue enjoying uninterrupted access</li>
      <li>💳 Update your payment method if needed</li>
      <li>❌ Cancel or change plans before renewal (if set to auto-renew)</li>
    </ul>
    <p>Thanks for being with us!</p>
    <hr style="margin-top: 30px; border-color: #ddd;" />
    <footer style="font-size: 12px; color: #777;">
      &copy; ${new Date().getFullYear()} SubTrackr. All rights reserved.<br />
    </footer>
  </div>
  `;
}
