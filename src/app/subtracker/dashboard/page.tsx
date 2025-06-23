import { getSubscriptionsCus } from "@/actions/getSubscriptionsCus";
import { Header } from "@/app/components/Header";
import SubscriptionItem from "@/app/components/Subscriptionitem";
import { sendEmailAction } from '@/actions/sendEmail';



export default  async function SubscriptionsPage() {
  const subs = await getSubscriptionsCus();
  return (
    <div className="min-h-screen flex   justify-center px-4 text-center">
      <Header />
      <div className=" items-center justify-center space-y-4 mt-16">

      <h1 className="text-2xl font-bold ">All Subscriptions</h1>
      <div>
  <ul className=" flex flex-row md:flex-wrap justify-start gap-4 w-full max-w-6xl" >
        {subs.map((sub) => (
          <SubscriptionItem  key={sub.id} sub={sub} />
        ))}
      </ul>
      </div>
      </div>
      <form action={sendEmailAction} className="mt-8">
        <button
          type="submit"
          className="bg-[#3A86FF] text-white px-4 py-2 mt-8 rounded

            ">Email</button>
            </form>
    </div>
  );
}
