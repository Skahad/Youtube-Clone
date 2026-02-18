import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "YouTube Clone",
  description: "A YouTube clone built with Next.js and Tailwind CSS",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

import { SidebarProvider } from "@/components/SidebarProvider";
import { WatchHistoryProvider } from "@/components/WatchHistoryProvider";
import { LikedVideosProvider } from "@/components/LikedVideosProvider";
import { WatchLaterProvider } from "@/components/WatchLaterProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/components/AuthContext";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* ... head script ... */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground transition-colors duration-300`}
      >
        <ThemeProvider>
          <AuthProvider>
            <WatchHistoryProvider>
              <LikedVideosProvider>
                <WatchLaterProvider>
                  <SidebarProvider>
                    <Navbar />
                    <div className="flex pt-10">
                      <Sidebar />
                      <main className="flex-1 p-4 md:p-6 ml-0 md:ml-0 transition-all duration-200 min-h-[calc(100vh-3.5rem)] pb-20 md:pb-6 max-w-full overflow-x-hidden">
                        {children}
                      </main>
                    </div>
                    <BottomNav />
                  </SidebarProvider>
                </WatchLaterProvider>
              </LikedVideosProvider>
            </WatchHistoryProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
