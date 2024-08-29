"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import AppIcon from "@/app/components/shared/AppIcon";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      callbackUrl: "/dashboard",
      email,
      password,
    });

    setLoading(false);

    if (result?.ok) {
      toast.success("Login successful. Redirecting...", {
        duration: 1500,
      });
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } else {
      toast.error(result?.error || "Invalid credentials", {
        duration: 1500,
        id: "login-error",
        style: {
          minWidth: "300px",
          maxWidth: "300px",
          fontSize: "13px",
        },
      });
    }
  };

  return (
    

    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <Toaster position="top-center" reverseOrder={false} />

      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold"  onClick={() => router.push("/")}>Login</CardTitle>
          <CardDescription className="font-semibold">
            Enter your email and password to access your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Joe@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className={`w-full  ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <FaSpinner className="animate-spin inline-block" />
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-neutral-400 text-sm">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/sign-up"
            className="font-medium ml-2 hover:text-zinc-300 hover:underline"
            prefetch={false}
          >
            Sign up
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignIn;
