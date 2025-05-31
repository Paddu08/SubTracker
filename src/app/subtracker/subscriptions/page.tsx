// app/page.tsx
"use client"
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createSubscription } from "@/actions/actions";


export default function Subscriptions() {

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    await createSubscription(formData);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
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
        <div className="flex  items-center gap-4">  
            <Input  name="plan"placeholder="Title" className="" />
            <Input  name="price"placeholder="Price"/>
            <Input  name='startDate'placeholder="DD/MM/YY" type="date"/>
        </div>
                    <Button className="mt-4">Add Subscription</Button>
      </form>

    </main>
  );
}
