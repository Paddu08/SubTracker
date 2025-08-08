"use client";

import Link from "next/link";
import { Header } from "@/app/components/Header";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function Home() {
  return (
    <div
      className="
        grid grid-rows-[20px_1fr_20px] items-center justify-items-center 
        min-h-screen p-8 pb-20 gap-16 sm:p-20 
        font-[family-name:var(--font-geist-sans)]
      "
    >
      <Header />

      <h1 className="text-3xl font-bold">SubTrackr</h1>

      <nav className="flex flex-col space-y-6 text-lg font-medium">
        {/* Show when signed out */}
        <SignedOut>
          <Link href="/signup" className="text-blue-600 hover:underline">
            Signup
          </Link>
          <Link href="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </SignedOut>

        {/* Show when signed in */}
        <SignedIn>
          <Link href="/subtracker/dashboard" className="text-blue-600 hover:underline">
            Dashboard
          </Link>
          <Link href="/subtracker/subscriptions" className="text-blue-600 hover:underline">
            Subscriptions
          </Link>
        </SignedIn>
      </nav>

      <footer className="text-sm text-gray-500">© {new Date().getFullYear()} SubTrackr</footer>
    </div>
  );
}
