"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { FaSpinner } from "react-icons/fa";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      callbackUrl: "/board",
      email,
      password,
    });

    setLoading(false);

    if (result?.ok) {
       toast({
         title: "Login successful. Redirecting...",
         variant: "success",
         duration: 1000, // Adjust the duration here
       });
       
      setTimeout(() => {
        router.push("/board");
      }, 1000);
    } else {
      let errorMessage = result?.error;

      // Check if errorMessage is null or undefined
      if (errorMessage !== null && typeof errorMessage !== "undefined") {
        // Remove "Error:" prefix if it exists
        if (errorMessage.startsWith("Error:")) {
          errorMessage = errorMessage.slice(6); // Remove "Error:" and trailing space
        }

        toast({
          title: "Login failed",
          description: errorMessage,
          variant: "destructive",
          duration: 1500, // Increased duration for better visibility
        });
      }
    }
  };

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md p-6 sm:p-8">
        <CardHeader className="space-y-1">
          <CardTitle
            className="text-2xl font-bold"
            onClick={() => router.push("/")}
          >
            Login
          </CardTitle>
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
                placeholder="name@gmail.com"
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
                placeholder="•••••••••"
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
                "Login"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className=" text-center text-neutral-400 text-sm">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/sign-up"
            className="font-medium ml-2 hover:text-zinc-300 hover:underline"
            prefetch={false}
          >
            Create one here
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignIn;
