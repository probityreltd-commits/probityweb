"use client";

import React from "react";
import Link from "next/link";
import { Mail, Phone, Calendar, ArrowRight } from "lucide-react";

const inquiries = [
  {
    id: "INQ-1024",
    client: "Mostafijur Rahman",
    property: "Probity Grand Suite",
    phone: "+880 1712 345678",
    date: "Aug 18, 2026",
    status: "Pending",
  },
  {
    id: "INQ-1023",
    client: "Anisur Rahman",
    property: "Probity Green Valley",
    phone: "+880 1819 987654",
    date: "Aug 17, 2026",
    status: "Contacted",
  },
  {
    id: "INQ-1022",
    client: "Tanvir Ahmed",
    property: "Probity Heights",
    phone: "+880 1911 223344",
    date: "Aug 16, 2026",
    status: "Closed",
  },
];

const RecentActivity = () => {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800">
        <div>
          <h2 className="font-serif text-lg font-bold text-zinc-900 dark:text-white">
            Recent Client Inquiries
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Latest tour requests & property questions
          </p>
        </div>
        <Link
          href="/admin/inquiries"
          className="text-xs font-bold text-[#3b1a83] dark:text-indigo-400 hover:underline flex items-center gap-1"
        >
          <span>See All Inquiries</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <th className="pb-3 pl-2">Client</th>
              <th className="pb-3">Property Name</th>
              <th className="pb-3">Contact</th>
              <th className="pb-3">Date</th>
              <th className="pb-3 text-right pr-2">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-xs sm:text-sm">
            {inquiries.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40 transition-colors"
              >
                <td className="py-4 pl-2 font-bold text-zinc-900 dark:text-white">
                  {row.client}
                </td>
                <td className="py-4 text-zinc-600 dark:text-zinc-300 font-medium">
                  {row.property}
                </td>
                <td className="py-4 text-zinc-500 dark:text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#3b1a83] dark:text-indigo-400" />
                    <span>{row.phone}</span>
                  </div>
                </td>
                <td className="py-4 text-zinc-500 dark:text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{row.date}</span>
                  </div>
                </td>
                <td className="py-4 text-right pr-2">
                  <span
                    className={`inline-block text-[11px] font-bold px-3 py-1 rounded-full ${
                      row.status === "Pending"
                        ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                        : row.status === "Contacted"
                          ? "bg-indigo-500/10 text-[#3b1a83] dark:text-indigo-400"
                          : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentActivity;
