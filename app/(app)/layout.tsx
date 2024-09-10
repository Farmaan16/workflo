"use client";

import Navbar from "@/components/ui/Navbar";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { store } from "../store/store";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import React from "react";

interface RootLayoutProps {
  children: React.ReactNode;
  session: any;
}


export default function RootLayout({ children, session }: RootLayoutProps) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <DndProvider backend={HTML5Backend}>
          <div className="flex flex-col min-h-screen">
            {/* <Navbar /> */}
            {children}
          </div>
        </DndProvider>
      </Provider>
    </SessionProvider>
  );
}
