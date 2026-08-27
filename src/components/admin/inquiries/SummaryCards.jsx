"use client";

import { FiInbox, FiMail, FiTrendingUp, FiCalendar } from "react-icons/fi";

const CARD_CONFIG = [
  { key: "total", label: "Total inquiries", icon: FiInbox, format: (v) => v ?? "—" },
  { key: "unread", label: "Unread", icon: FiMail, format: (v) => v ?? "—", accent: true },
  { key: "thisWeek", label: "This week", icon: FiCalendar, format: (v) => v ?? "—" },
  {
    key: "conversionRate",
    label: "Conversion rate",
    icon: FiTrendingUp,
    format: (v) => (v != null ? `${v}%` : "—"),
  },
];

export default function SummaryCards({ stats, loading }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {CARD_CONFIG.map(({ key, label, icon: Icon, format, accent }) => (
        <div
          key={key}
          className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md p-4 sm:p-5"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="ledger-font text-[10px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              {label}
            </span>
            <Icon
              className={`w-4 h-4 ${
                accent ? "text-[#431780] dark:text-violet-300" : "text-zinc-400"
              }`}
            />
          </div>
          <span className="display-font text-2xl sm:text-3xl font-semibold text-zinc-900 dark:text-white">
            {loading ? (
              <span className="inline-block h-7 w-12 rounded bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
            ) : (
              format(stats?.[key])
            )}
          </span>
        </div>
      ))}
    </div>
  );
}
