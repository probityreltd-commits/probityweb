"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MessageSquare } from "lucide-react";
import {
  formatRelativeTime,
  getRequestTypeMeta,
} from "@/components/ui/dashboard-helpers";

const RowSkeleton = () => (
  <div className="flex items-center gap-3 p-3 sm:p-4 animate-pulse">
    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 shrink-0" />
    <div className="flex-1 space-y-2">
      <div className="h-3 w-2/5 bg-zinc-200 dark:bg-zinc-800 rounded" />
      <div className="h-2.5 w-1/3 bg-zinc-200 dark:bg-zinc-800 rounded" />
    </div>
  </div>
);

const InquiryOverview = ({ inquiries = [], loading }) => {
  const recent = [...inquiries]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6);

  return (
    <div className="rounded-2xl sm:rounded-3xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-zinc-100 dark:border-zinc-800">
        <h3 className="font-serif text-sm sm:text-lg font-bold text-zinc-900 dark:text-white">
          Recent Inquiries
        </h3>
        <Link
          href="/admin/inquiries"
          className="text-[11px] sm:text-xs font-semibold text-brand dark:text-indigo-400 hover:underline flex items-center gap-1"
        >
          View all
          <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
        </Link>
      </div>

      {loading ? (
        <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
          {Array.from({ length: 4 }).map((_, i) => (
            <RowSkeleton key={i} />
          ))}
        </div>
      ) : recent.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 sm:py-14 px-4 text-center">
          <MessageSquare className="w-8 h-8 text-zinc-300 dark:text-zinc-700 mb-2" />
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            No inquiries received yet.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
          {recent.map((inquiry) => {
            const meta = getRequestTypeMeta(inquiry.requestType);
            return (
              <div
                key={inquiry._id}
                className="flex items-start gap-3 p-3 sm:p-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
              >
                <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden shrink-0 bg-brand/10 flex items-center justify-center text-brand dark:text-indigo-400 font-bold text-xs">
                  {inquiry.property?.coverImage ? (
                    <Image
                      src={inquiry.property.coverImage}
                      alt={inquiry.property.title || ""}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  ) : (
                    inquiry.name?.charAt(0)?.toUpperCase() || "?"
                  )}
                  {!inquiry.isRead && (
                    <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-rose-500 border-2 border-white dark:border-zinc-900" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white truncate">
                      {inquiry.name}
                    </h4>
                    <span className="text-[9px] sm:text-[10px] text-zinc-400 dark:text-zinc-500 shrink-0 font-mono">
                      {formatRelativeTime(inquiry.createdAt)}
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                    {inquiry.property?.title || "General inquiry"}
                  </p>
                  <span
                    className={`inline-block mt-1.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${meta.colorClass}`}
                  >
                    {meta.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default InquiryOverview;
