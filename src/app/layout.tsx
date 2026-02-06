import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MainLayoutProvider from "@/provider/MainLayoutProvider";
import { Suspense } from "react";
import ProgressBar from "@/components/progress/Progressbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Medistore | Home",
  description: "Medistore",
  icons: {
    icon: "/fav.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense fallback={null}>
          <ProgressBar />
        </Suspense>
        <MainLayoutProvider>{children}</MainLayoutProvider>
      </body>
    </html>
  );
}
