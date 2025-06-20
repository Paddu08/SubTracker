import { deleteSubscription } from "@/actions/deleteSubscription";
import { toggleSubscriptionStatus } from "@/actions/ToggleSubscription";
import { Button } from "@/components/ui/button";
import { Subscription } from "@/types/types";

type Props = {
  sub: Subscription;
};

export default function SubscriptionItem({ sub }: Props) {
  

  return (
    <li className="border p-2 rounded">
      <div><strong>Plan:</strong> {sub.plan}</div>
      <div><strong>Price:</strong> ${sub.price}</div>
     <div>
  <strong>Start:</strong>{" "}
  {sub.startDate ? new Date(sub.startDate).toISOString().slice(0, 10) : "N/A"}
</div>
<div>
  <strong>End:</strong>{" "}
  {sub.endDate ? new Date(sub.endDate).toISOString().slice(0, 10) : "N/A"}
</div>

      <div><strong>Status:</strong> {sub.status}</div>
   <form action={deleteSubscription}>
  <input type="hidden" name="id" value={String(sub.id)} />
  <Button className="bg-[#3A86FF] text-white px-4 py-2 rounded-md mt-2" type="submit">Delete</Button>
</form>
   <form action={toggleSubscriptionStatus}>
  <input type="hidden" name="id" value={String(sub.id)} />
  <Button className="bg-[#3A86FF] text-white px-4 py-2 rounded-md mt-2" type="submit">{sub.status=='active'?"Pause Subscription":"Activate Subscription"}</Button>
</form>
    </li>
  );
}
