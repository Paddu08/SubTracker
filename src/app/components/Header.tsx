"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  UserButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Header() {
  const router = useRouter();

  return (
    <header className="animate-slide bg-background h-12 p-2 fixed top-0 w-full z-50">
      <div className="flex justify-between items-center gap-2">
        <Link href="/" className="text-lg font-bold text-primary">
        <div className="flex items-center gap-2">
          <Image src="/SubTrackr.svg" width={100} height={100} alt="SubTrackr logo" />
        </div>
        </Link>

        <div className="flex items-center gap-4">
          {/* Show nav links and profile if signed in */}
          <SignedIn>
            <nav className="flex items-center gap-4">
              <Link href="/subtracker/dashboard" className="text-sm hover:underline">Dashboard</Link>
              <Link href="/subtracker/subscriptions" className="text-sm hover:underline">Subscriptions</Link>
            </nav>
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
