// app/page.tsx
"use client"
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createSubscription } from "@/actions/createSubscription";
import { Header } from "@/app/components/Header";
import { toast } from "sonner";



export default function Subscriptions() {

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    
    try {
      await createSubscription(formData);
      toast.success("Subscription added successfully!");
    } catch (error) { 
      console.error("Error creating subscription:", error);
      toast.error("Missing required fields or an error occurred.");
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <Header/>
      <h1 className="text-3xl font-bold mb-2">Your subscriptions at a glance</h1>
      <p className="text-gray-600 mb-8">Manage your subscriptions easily.</p>

      <div className="flex flex-row gap-4 flex-wrap justify-center">
        <Card className="p-4 w-72 shadow">
          <h2 className="text-xl font-semibold mb-2">Subscription 1</h2>
          <p className="text-gray-500">Details about subscription 1...</p>
        </Card>
        <Card className="p-4 w-72 shadow">
          <h2 className="text-xl font-semibold mb-2">Subscription 2</h2>
          <p className="text-gray-500">Details about subscription 2...</p>
        </Card>
        <Card className="p-4 w-72 shadow">
          <h2 className="text-xl font-semibold mb-2">Subscription 3</h2>
          <p className="text-gray-500">Details about subscription 3...</p>
        </Card>
      </div>
        <p className="text-gray-500 mt-8">Add subscriptions as needed.</p> 
      <form onSubmit={handleSubmit} className="w-full max-w-md mt-8">    
     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
  <div className="flex flex-col">
    <label htmlFor="plan" className="mb-1  self-start text-sm font-medium text-gray-700">Plan Title</label>
    <Input className="w-full" name="plan" id="plan" placeholder="Title" />
  </div>

  <div className="flex flex-col">
    <label htmlFor="price" className="mb-1 self-start text-sm font-medium text-gray-700">Price</label>
    <Input className="w-full" name="price" id="price" placeholder="Price" type="number" />
  </div>

  <div className="flex flex-col">
    <label htmlFor="startDate" className="mb-1 self-start text-sm font-medium text-gray-700">Start Date</label>
    <Input className="w-full" name="startDate" id="startDate" placeholder="Start Date" type="date" />
  </div>

  <div className="flex flex-col">
    <label htmlFor="duration" className="mb-1 self-start text-sm font-medium text-gray-700">Duration (months)</label>
    <Input className="w-full " name="duration" id="duration" placeholder="Duration (months)" type="number" />
  </div>
</div>

                    <Button className="bg-[#3A86FF] text-white px-4 py-2 rounded-md  mt-4">Add Subscription</Button>
      </form>

    </main>
  );
}
