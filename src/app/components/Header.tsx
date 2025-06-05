"use client";
import { useRouter } from "next/navigation";

import Image from "next/image";
import {
  UserButton,
  SignedIn,
  SignedOut,
 
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export function Header() {
    const router = useRouter();

  return (
    <header className="animate-slide bg-background h-12 p-2 fixed top-0 w-full z-50">
      <div className="flex justify-between items-center gap-2">
        <div className="flex items-center gap-2">
          <Image src="/SubTrackr.svg" width={100} height={100} alt="SubTrackr logo" />
        </div>

        <div className="flex items-center gap-2">
          {/* Show profile if signed in */}
          <SignedIn>
            <UserButton afterSignOutUrl="/login" />
          </SignedIn>

          {/* Show login button if signed out */}
          <SignedOut>
               <Button
        onClick={() => router.push("/login")}
        className="bg-primary text-white px-3 py-1 rounded"
      >
        Login
      </Button>
          </SignedOut>
        </div>
      </div>
    </header>
  );
}
