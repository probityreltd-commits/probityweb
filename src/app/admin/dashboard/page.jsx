"use client";

import React from "react";
import { Plus } from "lucide-react";
import Link from "next/link";
import DashboardStats from "@/components/admin/dashboard/DashboardStats";
import RevenueOverview from "@/components/admin/dashboard/RevenueOverview";
import RecentActivity from "@/components/admin/dashboard/RecentActivity";

const DashboardPage = () => {
  return (
    <div className="space-y-8">
      {/* Top Banner & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Admin Overview
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Welcome back! Here is what's happening with Probity Real Estate
            today.
          </p>
        </div>

        {/* Add Project Quick CTA */}
        <Link
          href="/admin/add-project"
          className="inline-flex items-center justify-center gap-2 bg-[#3b1a83] hover:bg-[#2e1467] text-white text-xs sm:text-sm font-bold py-3 px-5 rounded-2xl transition-all shadow-md active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add New Project</span>
        </Link>
      </div>

      {/* 1. Statistics Cards Section */}
      <DashboardStats />

      {/* 2. Charts & Analytics Overview */}
      <RevenueOverview />

      {/* 3. Recent Activity & Inquiry Table */}
      <RecentActivity />
    </div>
  );
};

export default DashboardPage;
