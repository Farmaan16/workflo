import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import { store } from "./store/index";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Workflo",
  description: " A workflow management tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <Provider store={store}> */}

      <body className={inter.className}>
        {/* <Navbar /> */}
        {children}
      </body>
      {/* </Provider> */}
    </html>
  );
}
