"use client";
import { Header } from "@/app/components/Header";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Avatar,AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";
import { createScheduledEmail } from "@/actions/createScheduledEmail";

export default function Notification() {
  return (
    <div>
      <main className="min-h-screen flex flex-col items-center mt-12 px-4 text-center">
        <Header/>

        <h1 className="text-1xl font-bold mb-2">Manage your Subscription Reminders</h1>
        <div>
        <Avatar className="w-16 h-16 mb-4">
                  <AvatarImage  height={100} width={100} src="https://github.com/shadcn.png" alt="@shadcn" />

          </Avatar>
        <Input/>
        </div>
        <div className="flex justify-between items-start w-full max-w-md mt-8">
             <label htmlFor="notification-toggle" className="ml-2 text-sm text-gray-700 text-start">
              Email Reminders <br/>
              Receive reminders via email

            </label>
     <Switch
        id="notification-toggle"
        className="data-[state=checked]:bg-[#0D99FF] 
                   [&>span]:bg-black"
      />
           
        </div>
        <div className="flex justify-between items-start w-full max-w-md mt-8">
             <label htmlFor="notification-toggle" className="ml-2 text-sm text-gray-700 text-start">
              SMS Reminders <br/>
            Receive reminders via SMS
            </label>
<Switch
        id="notification-toggle"
        className="data-[state=checked]:bg-[#0D99FF] 
                   [&>span]:bg-black"
      />           
        </div>
        <div className="flex justify-between items-start w-full max-w-md mt-8">
             <label htmlFor="notification-toggle" className="ml-2 text-sm text-gray-700 text-start">
              Push Notifications <br/>
Receive push notifications
            </label>
            <Switch
        id="notification-toggle"
        className="data-[state=checked]:bg-[#0D99FF] 
                   [&>span]:bg-black"
      />
           
        </div>
        <div className="flex justify-between items-start w-full max-w-md mt-8">
             <label htmlFor="notification-toggle" className="ml-2 text-sm text-gray-700 text-start">
              Calendar Sync <br/>
Sync reminders with your calendar
            </label>
            <Switch
        id="notification-toggle"
        className="data-[state=checked]:bg-[#0D99FF] 
         bg-[#495F6E33]   
                   [&>span]:bg-black"
      />
        </div>
        <form  action={createScheduledEmail} >
      <div className="flex  flex-col items-start w-full max-w-md mt-8"> 
        
        <p className="text-black-500 mt-8">Reminder Details</p>

        <div className="flex flex-row gap-2 w-full max-w-md mt-2">
            <div className="flex flex-col w-full ">
                <label htmlFor="plan" className="mb-1  self-start text-sm font-medium text-gray-700">Reminder Title</label>

            <Input className="w-full" name="reminderTitle" id="reminderTitle" placeholder="Reminder Title" />
            </div>
                        <div className="flex flex-col w-full ">
                                            <label htmlFor="plan" className="mb-1  self-start text-sm font-medium text-gray-700">Reminder Date</label>

            <Input type="date" className="w-full ml-2 " name="reminderDate" placeholder="Reminder Date"/>
            </div>
            </div>
            <div className="w-full">
                <div className="flex flex-col mt-2 ">
                                            <label htmlFor="plan" className="mb-1  self-start text-sm font-medium text-gray-700">Email </label>
            <Input className="w-full " name="email" id="email" placeholder="Email Address" />
            </div></div>
  <div className=" flex flex-col w-full mt-2">
                                                <label htmlFor="plan" className="mb-1  self-start text-sm font-medium text-gray-700">Notification Method</label>


<Select>
      <SelectTrigger className="w-full ">
        <SelectValue placeholder="Select Type of Notification" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="email">Email</SelectItem>
    
        </SelectGroup>
      </SelectContent>
    </Select>

    <div className="flex flex-row gap-2  max-w-md mt-2">
        <Button className="bg-white text-black px-4 py-2 rounded-md border-t border-gray-400/20 ">Save</Button>
        <Button className="bg-white text-black px-4 py-2 rounded-md border-t border-gray-400/20 ">Cancel</Button>
</div>
   
    </div>

      </div>
      </form>
      

        
       
      </main>
    </div>
  );
}
