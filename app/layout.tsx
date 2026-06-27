import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Roboto } from 'next/font/google';
export const roboto = Roboto({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "next2026 — Music",
  description: "Discover songs, watch videos, and continue listening where you left off.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full`}
    >
      <body className={`${roboto.className} antialiased min-h-full flex flex-col bg-[#0F0F0F] text-white`}>
        <Navbar />
        <main className="mx-auto flex-1 w-full max-w-[1600px] px-4 py-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
