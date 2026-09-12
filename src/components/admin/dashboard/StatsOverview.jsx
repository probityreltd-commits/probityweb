"use client";

import Link from "next/link";
import {
  Building2,
  MessageSquare,
  CalendarCheck,
  Download,
  BellRing,
} from "lucide-react";

const SkeletonCard = () => (
  <div className="rounded-xl sm:rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 h-[92px] sm:h-[112px] animate-pulse" />
);

const StatCard = ({ href, icon: Icon, label, value, colorClass }) => (
  <Link
    href={href}
    className="group rounded-xl sm:rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3.5 sm:p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
  >
    <div
      className={`w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl flex items-center justify-center ${colorClass}`}
    >
      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
    </div>
    <p className="mt-2.5 sm:mt-4 text-xl sm:text-3xl font-bold text-zinc-900 dark:text-white font-serif tabular-nums">
      {value}
    </p>
    <p className="text-[10px] sm:text-xs font-medium text-zinc-500 dark:text-zinc-400 mt-0.5 flex items-center gap-1">
      {label}
      <span className="opacity-0 group-hover:opacity-100 transition-opacity">
        →
      </span>
    </p>
  </Link>
);

const StatsOverview = ({ properties = [], inquiries = [], loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  const tourRequests = inquiries.filter(
    (i) => i.requestType === "SCHEDULE_TOUR",
  ).length;
  const brochureDownloads = inquiries.filter(
    (i) => i.requestType === "BROCHURE_DOWNLOAD",
  ).length;
  const unread = inquiries.filter((i) => !i.isRead).length;

  const stats = [
    {
      href: "/admin/properties",
      icon: Building2,
      label: "Total Properties",
      value: properties.length,
      colorClass:
        "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400",
    },
    {
      href: "/admin/inquiries",
      icon: MessageSquare,
      label: "Total Inquiries",
      value: inquiries.length,
      colorClass:
        "bg-brand/10 text-brand dark:bg-indigo-950/40 dark:text-indigo-400",
    },
    {
      href: "/admin/inquiries?type=SCHEDULE_TOUR",
      icon: CalendarCheck,
      label: "Tour Requests",
      value: tourRequests,
      colorClass:
        "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400",
    },
    {
      href: "/admin/inquiries?type=BROCHURE_DOWNLOAD",
      icon: Download,
      label: "Brochure Downloads",
      value: brochureDownloads,
      colorClass:
        "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400",
    },
    {
      href: "/admin/inquiries?status=unread",
      icon: BellRing,
      label: "Unread Inquiries",
      value: unread,
      colorClass:
        "bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
};

export default StatsOverview;
