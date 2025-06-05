"use client";
import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";

export default function Login() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!isLoaded) return;

    try {
      const result = await signIn.create({
        identifier: email,
        password: password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        console.log("Login successful");
        // Redirect or show success message
      } else {
        console.log("Additional steps required");
      }
    } catch (err: unknown) {
  const error = err as { errors?: { message: string }[] };
  setError(error.errors?.[0]?.message || "Login failed");
    }
  };

  return (
    
    <div className="flex flex-col h-screen items-center justify-center gap-4">
      <h1 className="text-2xl font-inter font-bold">Welcome to SubTrackr</h1>
      <p className="text-sm text-gray-600">Please log in to continue</p>

      <Input
        type="email"
        placeholder="Email"
        className="w-[400px]  bg-[#25477E17]"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        className="w-[400px] bg-[#25477E17]"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />


      {error && <p className="text-red-500 text-sm">{error}</p>}
    
      <button
        onClick={handleLogin}
        className="bg-[#3A86FF] text-white px-4 py-2 rounded-md w-[400px]"
      >
        Log In
      </button>
    </div>
  );
}
