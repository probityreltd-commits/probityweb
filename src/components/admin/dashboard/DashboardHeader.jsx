"use client";

import React from "react";
import { Plus, RefreshCw } from "lucide-react";
import Link from "next/link";

const DashboardHeader = ({ onRefresh, loading }) => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-zinc-200/60 dark:border-zinc-800">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Admin Dashboard
          </h1>
          <span className="hidden sm:inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
            {currentDate}
          </span>
        </div>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Real-time operations & business analytics for Probity Real Estate.
        </p>
      </div>

      <div className="flex items-center gap-2.5 shrink-0">
        <button
          onClick={onRefresh}
          disabled={loading}
          aria-label="Refresh data"
          className="p-2.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
        </button>

        <Link
          href="/admin/add-property"
          className="inline-flex items-center justify-center gap-2 bg-[#3b1a83] hover:bg-[#2e1467] text-white text-xs sm:text-sm font-bold py-2.5 px-4 sm:px-5 rounded-2xl transition-all shadow-md active:scale-95"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add New Project</span>
        </Link>
      </div>
    </div>
  );
};

export default DashboardHeader;
