import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BBr - BuscaBares",
  description: "Plataforma de Descubrimiento Social de Bares en CyL",
};

import Sidebar from "@/components/Layout/Sidebar";
import Header from "@/components/Layout/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        <Sidebar />
        <Header />
        
        {/* Main Content Area - Pushed right by sidebar and down by header */}
        <main className="sm:ml-64 pt-16 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
