"use client";

import { FiSearch, FiX } from "react-icons/fi";
import {
  STATUS_CONFIG,
  STATUS_ORDER,
} from "@/services/constants/inquiryConstants";

const inputClasses =
  "text-xs bg-[#431780]/5 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#431780] transition-all";

export default function FilterBar({ filters, onChange, onReset }) {
  const set = (patch) => onChange({ ...filters, ...patch });

  const hasActiveFilters =
    filters.status ||
    filters.requestType ||
    filters.dateFrom ||
    filters.dateTo ||
    filters.search;

  return (
    <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md p-3.5 sm:p-4">
      <div className="flex flex-col lg:flex-row gap-3 lg:items-center">
        {/* search */}
        <div className="relative flex-1 min-w-0">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
          <input
            type="text"
            value={filters.search || ""}
            onChange={(e) => set({ search: e.target.value })}
            placeholder="Search name, phone, email, property..."
            className={`${inputClasses} w-full pl-9 pr-3 py-2.5`}
          />
        </div>

        <div className="flex flex-wrap gap-2.5">
          {/* status */}
          <select
            value={filters.status || ""}
            onChange={(e) => set({ status: e.target.value })}
            className={`${inputClasses} px-3 py-2.5 cursor-pointer`}
          >
            <option value="">All statuses</option>
            {STATUS_ORDER.map((key) => (
              <option key={key} value={key}>
                {STATUS_CONFIG[key].label}
              </option>
            ))}
          </select>

          {/* request type */}
          <select
            value={filters.requestType || ""}
            onChange={(e) => set({ requestType: e.target.value })}
            className={`${inputClasses} px-3 py-2.5 cursor-pointer`}
          >
            <option value="">All types</option>
            <option value="SCHEDULE_TOUR">Tour requests</option>
            <option value="REQUEST_INFO">Info requests</option>
          </select>

          {/* date range */}
          <input
            type="date"
            value={filters.dateFrom || ""}
            onChange={(e) => set({ dateFrom: e.target.value })}
            className={`${inputClasses} px-3 py-2.5`}
            aria-label="From date"
          />
          <input
            type="date"
            value={filters.dateTo || ""}
            onChange={(e) => set({ dateTo: e.target.value })}
            className={`${inputClasses} px-3 py-2.5`}
            aria-label="To date"
          />

          {hasActiveFilters && (
            <button
              onClick={onReset}
              className="flex items-center gap-1 text-xs font-semibold text-zinc-500 hover:text-[#431780] dark:hover:text-violet-300 px-3 py-2.5 transition-colors"
            >
              <FiX className="w-3.5 h-3.5" />
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
