"use client";

import { RefreshCw } from "lucide-react";

const DashboardHeader = ({ onRefresh, loading, lastUpdated }) => (
  <div className="flex items-center justify-between gap-3">
    <div>
      <h1 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
        Dashboard
      </h1>
      <div className="flex items-center gap-1.5 mt-1">
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
        </span>
        <p className="text-[10px] sm:text-xs text-zinc-500 dark:text-zinc-400">
          Live · Updated {lastUpdated}
        </p>
      </div>
    </div>

    <button
      onClick={onRefresh}
      disabled={loading}
      aria-label="Refresh dashboard"
      className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 text-xs sm:text-sm font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed shrink-0"
    >
      <RefreshCw
        className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${loading ? "animate-spin" : ""}`}
      />
      <span className="hidden sm:inline">Refresh</span>
    </button>
  </div>
);

export default DashboardHeader;
