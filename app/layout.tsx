import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import { Manrope } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const fontHeading = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const fontBody = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});


export const metadata: Metadata = {
  title: "Workflo",
  description: " A workflow management tool",
  icons: {
    icon: "/WorkFlo.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <Provider store={store}> */}
      <head>
        <link rel="icon" href="/WorkFlo.png" />
      </head>

      <body
        className={cn("antialiased", fontHeading.variable, fontBody.variable)}
      >
        {/* <Navbar /> */}
        {children}
        <Toaster />
      </body>
      {/* </Provider> */}
    </html>
  );
}
