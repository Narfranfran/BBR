"use client";

import Aside from "@/components/Layout/Aside";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import { useState } from "react";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Aside isOpen={isSidebarOpen} setOpen={setSidebarOpen} />
      <Navbar onMenuClick={() => setSidebarOpen(!isSidebarOpen)} />
      {/* Main Content Area - Pushed right by sidebar and down by header */}
      <main className="sm:ml-64 pt-16 min-h-screen flex flex-col">
        <div className="flex-1">
          {children}
        </div>
        <Footer />
      </main>
    </>
  );
}
