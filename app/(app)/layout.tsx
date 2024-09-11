"use client";

import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { store } from "../store/store";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import React from "react";
import { Toaster } from "@/components/ui/toaster";

// Define the props interface
interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <DndProvider backend={HTML5Backend}>
          <div className="flex flex-col min-h-screen">
            {/* Add Navbar component here if needed */}
            {children}
            <Toaster />
          </div>
        </DndProvider>
      </Provider>
    </SessionProvider>
  );
}
