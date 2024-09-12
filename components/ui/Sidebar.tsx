"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PackageIcon from "../icons/PackageIcon";
import { Button } from "./button";
import XIcon from "../icons/XIcon";
import HomeIcon from "../icons/HomeIcon";
import CalendarIcon from "../icons/CalendarIcon";
import CircuitBoardIcon from "../icons/CircuitBoardIcon";
import UsersIcon from "../icons/UsersIcon";
import LogOutIcon from "../icons/LogOutIcon";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const pathname = usePathname();

  const { data: session } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false }); // Sign out without redirect
    router.push("/"); // Redirect to home page
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-10 flex w-64 flex-col border-r bg-background p-6 transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } sm:translate-x-0 sm:static sm:w-64`}
    >
      <div className="mb-6 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <PackageIcon className="h-6 w-6" />
          <span className="text-lg font-bold">WorkFlo</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="sm:hidden"
          onClick={toggleSidebar}
        >
          <XIcon className="h-6 w-6" />
          <span className="sr-only">Close sidebar</span>
        </Button>
      </div>
      <div className="flex items-center gap-4 mb-6">
        <Avatar className="w-10 h-10 border ">
          <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-semibold">
            {session && session.user?.fullName}
          </div>
          <div className="text-xs text-zinc-400">
            {session && session.user?.email}
          </div>
        </div>
      </div>

      <nav className="flex flex-col gap-2">
        <Link
          href="/board"
          className={
            pathname === "/board"
              ? "flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground transition-colors bg-muted font-semibold "
              : " flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground font-semibold "
          }
          prefetch={false}
        >
          <HomeIcon className="h-5 w-5" />
          Dashboard
        </Link>
        <Link
          href="/Underconstruction"
          className={
            pathname === "/Underconstruction"
              ? "flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground transition-colors bg-muted "
              : " flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground font-semibold "
          }
          prefetch={false}
        >
          <CalendarIcon className="h-5 w-5" />
          Calendar
        </Link>
        {/* <Link
          href="/Underconstruction"
          className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground font-semibold "
          prefetch={false}
        >
          <CircuitBoardIcon className="h-5 w-5" />
          Task Board
        </Link> */}
        <Link
          href="/Underconstruction"
          className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground font-semibold "
          prefetch={false}
        >
          <UsersIcon className="h-5 w-5" />
          Team
        </Link>
      </nav>
      <div className="mt-auto">
        <Button variant="outline" className="w-full" onClick={handleSignOut}>
          <LogOutIcon className="h-5 w-5 mr-2" />
          Logout
        </Button>
      </div>
    </aside>
  );
}

export default Sidebar;
