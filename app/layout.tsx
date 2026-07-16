import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CA Foundation AIR 1 - Practice Portal",
  description: "90-Day Intensive Preparation Program for CA Foundation Exam",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <nav className="bg-white/10 backdrop-blur-sm border-b border-white/20">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="text-xl font-bold text-white">
                CA Foundation AIR 1
              </Link>
              <div className="hidden md:flex items-center gap-6">
                <Link href="/daily-plan" className="text-purple-200 hover:text-white transition-colors">
                  Daily Plan
                </Link>
                <Link href="/mock-tests" className="text-purple-200 hover:text-white transition-colors">
                  Mock Tests
                </Link>
                <Link href="/roadmap" className="text-purple-200 hover:text-white transition-colors">
                  Roadmap
                </Link>
                <Link href="/resources" className="text-purple-200 hover:text-white transition-colors">
                  Resources
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
