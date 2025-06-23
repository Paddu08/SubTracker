import Link from "next/link";
import { Header } from "@/app/components/Header";

export default function Home() {
  return (
    
    <div
      className="
        grid grid-rows-[20px_1fr_20px] items-center justify-items-center 
        min-h-screen p-8 pb-20 gap-16 sm:p-20 
        font-[family-name:var(--font-geist-sans)]
      "
    >
      <Header/>
      <h1 className="text-3xl font-bold">SubTrackr</h1>

      <nav className="flex flex-col space-y-6">
        <Link
          href="/signup"
          className="text-blue-600 hover:underline text-lg font-medium"
        >
          Signup
        </Link>
        <Link
          href="/login"
          className="text-blue-600 hover:underline text-lg font-medium"
        >
          Login
        </Link>
        {/* <Link
          href="/subtracker/dashboard"
          className="text-blue-600 hover:underline text-lg font-medium"
        >
          Dashboard
        </Link>
        <Link
          href="/subscriptions"
          className="text-blue-600 hover:underline text-lg font-medium"
        >
          Subscriptions
        </Link> */}
      </nav>

      <footer className="text-sm text-gray-500">© {new Date().getFullYear()} SubTrackr</footer>
    </div>
  );
}
