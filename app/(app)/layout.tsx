'use client';

import Navbar from "@/app/components/Navbar";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { store } from "../store/store";

import React from "react";

interface RootLayoutProps {
  children: React.ReactNode;
  session: any;
}

export default function RootLayout({ children , session }: RootLayoutProps) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <div className="flex flex-col min-h-screen">
          {/* <Navbar /> */}
          {children}
        </div>
      </Provider>
    </SessionProvider>
  );
}
