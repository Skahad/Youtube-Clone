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

import { SidebarProvider } from "@/components/SidebarProvider";
import { WatchHistoryProvider } from "@/components/WatchHistoryProvider";
import { LikedVideosProvider } from "@/components/LikedVideosProvider";
import { WatchLaterProvider } from "@/components/WatchLaterProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches === true;
                  if (!theme && supportDarkMode) theme = 'dark';
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground transition-colors duration-300`}
      >
        <ThemeProvider>
          <WatchHistoryProvider>
            <LikedVideosProvider>
              <WatchLaterProvider>
                <SidebarProvider>
                  <Navbar />
                  <div className="flex pt-14">
                    <Sidebar />
                    <main className="flex-1 p-4 md:p-6 ml-0 md:ml-0 transition-all duration-200 min-h-[calc(100vh-3.5rem)]">
                      {children}
                    </main>
                  </div>
                </SidebarProvider>
              </WatchLaterProvider>
            </LikedVideosProvider>
          </WatchHistoryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
