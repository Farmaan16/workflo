"use client";

import { useState } from "react";
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
} from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Checkbox } from "@/app/components/ui/checkbox";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { cn } from "@/lib/utils";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      // toast.error(
      //   "Passwords do not match. Please make sure your passwords match.",
      //   {
      //     duration: 1500, // Adjust the duration here
      //     id: "password-mismatch",
      //     style: {
      //       minWidth: "300px",
      //       maxWidth: "300px",
      //       fontSize: "13px",

      //     },
      //   }
      // );

      toast({
        title: "Uh oh! Something went wrong.",
        variant: "destructive",
        description:
          " Passwords do not match. Please make sure your passwords match.",
        duration: 2000, // Adjust the duration here
        // className: cn(
        //   "top-8 right-10 max-w-[340px] h-[70px] flex fixed md:max-w-[300px] md:top-8 md:right-80 bg-green-500 text-white border border-green-500 text-[1px] rounded-md",
        // ),
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, fullName, password }),
      });
      if (response.status === 201) {
        toast({
          title: "Registration successful. Redirecting in 2 seconds...",
          variant: "success",
          duration: 1000, // Adjust the duration here
        });

        setTimeout(() => {
          router.push("/auth/sign-in");
        }, 2000);
      } else {
        const data = await response.json();
        toast({
          title: data.message || "An error occurred during registration.",
          variant: "destructive",

          duration: 1500, // Adjust the duration here
        });
      }
    } catch (error: any) {
      console.error(
        "Error during registration:",
        error.response?.data || error
      );
      toast({
        title:
          error.response?.data?.message ||
          "Error signing up. Please try again later.",
        variant: "destructive",
        duration: 1500, // Adjust the duration here
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md p-6 sm:p-8">
        <CardHeader>
          <CardTitle
            className="text-2xl font-bold"
            onClick={() => router.push("/")}
          >
            Create an Account
          </CardTitle>
          <CardDescription>
            Sign up to get started with our platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  name="fullName"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                type="password"
                name="confirm-password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" required />
              <Label htmlFor="terms" className="text-sm text-muted-foreground">
                I agree to the{" "}
                <Link href="#" className="underline" prefetch={false}>
                  terms of service
                </Link>
              </Label>
            </div>

            <Button
              type="submit"
              className={`w-full  ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? (
                <FaSpinner className="animate-spin inline-block" />
              ) : (
                " Sign Up"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-start">
          <p className="text-sm text-neutral-400">
            Already have an account?{" "}
            <a
              className="font-medium hover:text-zinc-300 hover:underline"
              href="/auth/sign-in"
            >
              Login here
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;
