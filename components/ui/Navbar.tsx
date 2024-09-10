"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false }); // Sign out without redirect
    router.push("/"); // Redirect to home page
  };

  return (
    <nav className="flex justify-between p-4  text-white">
      <Link href="/">
        <span className="text-lg font-bold">WorkFLo</span>
      </Link>
      <div>
        {session ? (
          <>
            <span className="mr-4 just">Welcome, {session.user?.fullName}</span>
            <button
              onClick={handleSignOut}
              className="bg-zinc-700 hover:bg-zinc-500 px-2 py-1 rounded-2xl"
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link href="/auth/sign-in">
              <span className="mr-4">Sign In</span>
            </Link>
            <Link href="/auth/sign-up">
              <span>Sign Up</span>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
