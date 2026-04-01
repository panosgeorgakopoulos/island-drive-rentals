import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { auth } from "@/lib/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: {
    default: "Island Drive Rentals",
    template: "%s | Island Drive Rentals",
  },
  description: "Premium car, scooter, and ATV rentals for your perfect vacation.",
  openGraph: {
    title: "Island Drive Rentals",
    description: "Premium car, scooter, and ATV rentals for your perfect vacation.",
    url: "/",
    siteName: "Island Drive Rentals",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Island Drive Rentals",
    description: "Premium car, scooter, and ATV rentals for your perfect vacation.",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased text-gray-900 bg-white`}>
        <Navbar user={session?.user} />
        {children}
        <footer className="bg-gray-950 py-16 text-sm text-gray-500">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="font-extrabold text-white text-lg tracking-tight mb-1">Island Drive Rentals</p>
              <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
            </div>
            <div className="flex gap-8 font-medium">
              <a href="/fleet" className="hover:text-white transition">Fleet</a>
              <a href="/policies/cancellation" className="hover:text-white transition">Cancellation Policy</a>
              <a href="/about" className="hover:text-white transition">About Us</a>
              <a href="/locations" className="hover:text-white transition">Locations</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
