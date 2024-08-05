'use client';

import Navbar from "@/app/components/Navbar";
import { Provider } from "react-redux";
import { store } from "../store/store";
import React from "react";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <Provider store={store}>
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {children}
      </div>
    </Provider>
  );
}
