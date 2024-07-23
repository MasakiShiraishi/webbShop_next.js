import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./ui/header";
import React from 'react';
import { CartProvider } from "./lib/CartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Webb Shop App",
  description: "Webb Shop App revolutionizes your shopping experience with a wide selection of 20 products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <body className={inter.className}> */}
      <body>       
            <CartProvider>
            <Header/>
        {children}
        </CartProvider>
        </body>
    </html>
  );
}
