import { getAllSubscriptions } from "@/actions/actions";

// app/subscriptions/page.tsx

export default async function SubscriptionsPage() {
  const subs = await getAllSubscriptions();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Subscriptions</h1>
      <ul className="space-y-2">
        {subs.map((sub) => (
          <li key={sub.id} className="border p-2 rounded">
            <div><strong>Plan:</strong> {sub.plan}</div>
            <div><strong>Price:</strong> ${sub.price}</div>
            <div><strong>Start:</strong> {new Date(sub.startDate).toLocaleDateString()}</div>
            <div><strong>End:</strong> {new Date(sub.endDate).toLocaleDateString()}</div>
            <div><strong>Status:</strong> {sub.status}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
