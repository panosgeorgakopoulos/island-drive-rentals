import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Island Drive Rentals",
  description: "Premium car, scooter, and ATV rentals for your perfect vacation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased text-gray-900 bg-white`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
