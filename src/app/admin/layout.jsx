"use client";

import React, { useState } from "react";
import AdminFooter from "@/components/dashboard/AdminFooter";
import AdminNavbar from "@/components/dashboard/AdminNavbar";
import DashboardSidbar from "@/components/dashboard/DashboardSidbar";

export default function DashboardLayout({ children }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f7fc] dark:bg-[#090a0f] flex flex-col lg:flex-row transition-colors duration-300">
      <DashboardSidbar
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <AdminNavbar onMenuClick={() => setIsMobileOpen((prev) => !prev)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>

        <AdminFooter />
      </div>
    </div>
  );
}
