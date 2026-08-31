"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { ArrowUpRight, Mail, Phone, Calendar } from "lucide-react";

const formatRequestType = (type) => {
  if (!type) return "General";
  switch (type.toUpperCase()) {
    case "SCHEDULE_TOUR":
      return "Schedule Tour";
    case "REQUEST_INFO":
      return "Request Info";
    case "CONTACT":
      return "Contact Us";
    default:
      return type.replace(/_/g, " ");
  }
};

const InquiryOverview = ({ inquiries = [], loading }) => {
  const recentInquiries = useMemo(() => {
    return [...inquiries]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);
  }, [inquiries]);

  // Dynamic Status Breakdown
  const inquiryStatuses = useMemo(() => {
    const counts = inquiries.reduce((acc, inq) => {
      const st = inq.status?.toUpperCase() || "NEW";
      acc[st] = (acc[st] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts).map(([status, count]) => ({
      status,
      count,
    }));
  }, [inquiries]);

  if (loading) {
    return (
      <div className="h-64 bg-zinc-200 dark:bg-zinc-800 rounded-2xl animate-pulse" />
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-100 dark:border-zinc-800 shadow-sm space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-bold text-zinc-900 dark:text-white">
            Recent Inquiries & Leads
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Real-time inquiries received from property listing pages
          </p>
        </div>

        {/* Dynamic Status Badges Bar */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {inquiryStatuses.map((item) => (
            <span
              key={item.status}
              className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
            >
              {item.status}:{" "}
              <span className="text-[#3b1a83] dark:text-purple-400">
                {item.count}
              </span>
            </span>
          ))}
          <Link
            href="/admin/inquiries"
            className="text-xs font-bold text-[#3b1a83] dark:text-purple-400 hover:underline flex items-center gap-1 ml-2"
          >
            <span>View All</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {recentInquiries.length === 0 ? (
        <div className="py-12 text-center text-xs text-zinc-500">
          No inquiries found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-100 dark:border-zinc-800 text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                <th className="py-3 px-3">Customer</th>
                <th className="py-3 px-3">Request Type</th>
                <th className="py-3 px-3">Target Property</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-xs">
              {recentInquiries.map((inq) => {
                const isUnread = inq.isRead === false;
                return (
                  <tr
                    key={inq._id}
                    className={`hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40 transition-all ${
                      isUnread
                        ? "bg-purple-50/40 dark:bg-purple-950/10 font-semibold"
                        : ""
                    }`}
                  >
                    <td className="py-3 px-3">
                      <div className="font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                        {isUnread && (
                          <span className="w-2 h-2 rounded-full bg-[#3b1a83] shrink-0" />
                        )}
                        <span>{inq.name}</span>
                      </div>
                      <div className="text-[10px] text-zinc-400 font-normal flex items-center gap-2 mt-0.5">
                        <span className="flex items-center gap-1">
                          <Mail className="w-2.5 h-2.5" /> {inq.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="w-2.5 h-2.5" /> {inq.phone}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                        {formatRequestType(inq.requestType)}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-medium text-zinc-800 dark:text-zinc-200 truncate max-w-[140px]">
                      {inq.property?.title || "N/A"}
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                          inq.status?.toUpperCase() === "NEW"
                            ? "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300"
                            : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                        }`}
                      >
                        {inq.status || "NEW"}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-zinc-400 text-[11px] whitespace-nowrap">
                      {new Date(inq.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default InquiryOverview;
