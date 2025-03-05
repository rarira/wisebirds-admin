import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/custom/providers";
import Header from "@/components/custom/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wisebirds admin console",
  description: "캠페인/사용자 열람 및 관리가 가능합니다",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col justify-items-center`}
      >
        <Providers>
          <Header />
          <main className="mt-12  min-w-4xl max-w-7xl mx-auto w-full">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
