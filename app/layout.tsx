import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Lora } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import NavMenu from "@/app/components/NavMenu";
import Notifications from "@/app/components/Notifications";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CA Foundation Focus — 30-Day Practice",
  description: "A calm, focused 30-day CA Foundation exam practice workspace",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f7f7f3",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${lora.variable} h-full antialiased`}
    >
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="min-h-full flex flex-col">
        <script
          id={process.env.NODE_ENV === "production" ? "register-service-worker" : "disable-development-service-worker"}
          dangerouslySetInnerHTML={{
            __html: process.env.NODE_ENV === "production"
              ? `if ('serviceWorker' in navigator) { navigator.serviceWorker.register('/sw.js', { updateViaCache: 'none' }).catch(() => {}); }`
              : `if ('serviceWorker' in navigator) { navigator.serviceWorker.getRegistrations().then((registrations) => Promise.all(registrations.map((registration) => { const worker = registration.active || registration.waiting || registration.installing; return worker && new URL(worker.scriptURL).pathname === '/sw.js' ? registration.unregister() : false; }))).catch(() => {}); } if ('caches' in window) { caches.keys().then((names) => Promise.all(names.filter((name) => name.startsWith('foundation-focus-') || name.startsWith('ca-air1-')).map((name) => caches.delete(name)))).catch(() => {}); }`,
          }}
        />
        <nav className="site-header" aria-label="Primary navigation">
          <div className="site-header-inner">
            <div className="site-header-row">
              <Link href="/" className="site-brand" aria-label="Foundation Focus home">
                <span className="site-brand-full">Foundation Focus</span>
                <span className="site-brand-short">Focus</span>
              </Link>
              <div className="site-header-actions">
                <Notifications />
                <NavMenu />
              </div>
            </div>
          </div>
        </nav>
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
