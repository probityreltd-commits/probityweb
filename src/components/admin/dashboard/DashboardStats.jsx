"use client";

import React from "react";
import {
  Building2,
  Users,
  DollarSign,
  MessageSquare,
  TrendingUp,
} from "lucide-react";

const stats = [
  {
    title: "Total Revenue",
    value: "৳ 42.8M",
    change: "+12.5%",
    isPositive: true,
    icon: DollarSign,
  },
  {
    title: "Active Projects",
    value: "24",
    change: "+4 this month",
    isPositive: true,
    icon: Building2,
  },
  {
    title: "Total Clients",
    value: "1,280",
    change: "+18.2%",
    isPositive: true,
    icon: Users,
  },
  {
    title: "Pending Inquiries",
    value: "18",
    change: "-2 today",
    isPositive: false,
    icon: MessageSquare,
  },
];

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {stats.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div
            key={idx}
            className="bg-white dark:bg-zinc-900 rounded-3xl p-5 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                {item.title}
              </span>
              <div className="w-10 h-10 rounded-2xl bg-[#f0edf9] dark:bg-zinc-800 text-[#3b1a83] dark:text-indigo-400 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 stroke-[2.2]" />
              </div>
            </div>

            <div className="mt-4">
              <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
                {item.value}
              </h3>
              <div className="flex items-center gap-1.5 mt-2">
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    item.isPositive
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                  }`}
                >
                  {item.change}
                </span>
                <span className="text-[11px] text-zinc-400 font-medium">
                  vs last month
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardStats;
