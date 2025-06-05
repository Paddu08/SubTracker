"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"; // Ensure this component exists
import { useSignUp } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  if (!isLoaded ||!signUp) return null;

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    try {
      await signUp!.create({
        emailAddress,
        password,
      });

      await signUp!.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err: unknown) {
  const error = err as { errors?: { message: string }[] };
  setError(error.errors?.[0]?.message || "Login failed");
    }
  }

  async function handleVerifyCode(e: React.FormEvent) {
    e.preventDefault();
    try {
      const completeSignUp = await signUp!.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive!({ session: completeSignUp.createdSessionId });
        router.push("/subtracker/subscriptions");
      } else {
        console.log("Verification incomplete:", completeSignUp);
      }
    } catch (err: unknown) {
  const error = err as { errors?: { message: string }[] };
  setError(error.errors?.[0]?.message || "Login failed");
    }
  }

  return (
    <div className="flex flex-col h-screen items-center justify-center space-y-4">
      <h2 className="text-2xl font-bold">Create an Account</h2>
      <p className="text-center">Join SubTrackr to manage your subscriptions efficiently.</p>

      {error && <div className="text-red-500">{error}</div>}
      <div>The current sign-up attempt status is {signUp?.status}.</div>

      {!pendingVerification ? (
        <form onSubmit={handleSignUp} className="flex flex-col space-y-2">
          <Input
            type="email"
            placeholder="Email"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            className="w-[400px] bg-[#25477E17]"
          />
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-[400px] bg-[#25477E17] "
          />
          <label className="text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="mr-2"
            />
            Show Password
          </label>
          <Button type="submit" className="bg-[#3A86FF]">Sign Up</Button>
        </form>
      ) : (
        <form onSubmit={handleVerifyCode} className="flex flex-col space-y-2">
          <Input
            placeholder="Enter verification code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-[400px] "
          />
          <Button type="submit" >Verify Email</Button>
        </form>
      )}
    </div>
  );
}
