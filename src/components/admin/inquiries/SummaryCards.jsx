"use client";

import { FiInbox, FiMail, FiTrendingUp, FiCalendar } from "react-icons/fi";

const CARD_CONFIG = [
  {
    key: "total",
    label: "Total inquiries",
    icon: FiInbox,
    format: (v) => v ?? "—",
  },
  {
    key: "unread",
    label: "Unread",
    icon: FiMail,
    format: (v) => v ?? "—",
    accent: true,
  },
  {
    key: "thisWeek",
    label: "This week",
    icon: FiCalendar,
    format: (v) => v ?? "—",
  },
  {
    key: "conversionRate",
    label: "Conversion rate",
    icon: FiTrendingUp,
    format: (v) => (v != null ? `${v}%` : "—"),
  },
];

export default function SummaryCards({ stats, loading }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
      {CARD_CONFIG.map(({ key, label, icon: Icon, format, accent }) => {
        const hasUnread =
          key === "unread" && !loading && Number(stats?.[key]) > 0;

        return (
          <div
            key={key}
            className={`rounded-xl sm:rounded-2xl border backdrop-blur-md p-3 sm:p-5 transition-colors ${
              hasUnread
                ? "border-brand/30 dark:border-brand-light/30 bg-brand/5 dark:bg-brand-light/10"
                : "border-zinc-200/80 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90"
            }`}
          >
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                {label}
              </span>
              <Icon
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${
                  accent ? "text-brand dark:text-brand-light" : "text-zinc-400"
                }`}
              />
            </div>
            <span
              className={`font-serif text-lg sm:text-3xl font-semibold ${
                hasUnread
                  ? "text-brand dark:text-brand-light"
                  : "text-zinc-900 dark:text-white"
              }`}
            >
              {loading ? (
                <span className="inline-block h-5 sm:h-7 w-10 sm:w-12 rounded bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
              ) : (
                format(stats?.[key])
              )}
            </span>
          </div>
        );
      })}
    </div>
  );
}
