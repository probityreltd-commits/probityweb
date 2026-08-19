"use client";

import React from "react";
import { TrendingUp, ArrowUpRight } from "lucide-react";

const RevenueOverview = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Revenue Graph Card */}
      <div className="lg:col-span-2 bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800">
          <div>
            <h2 className="font-serif text-lg font-bold text-zinc-900 dark:text-white">
              Revenue Growth
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Monthly sales analytics overview
            </p>
          </div>
          <button className="text-xs font-bold text-[#3b1a83] dark:text-indigo-400 hover:underline flex items-center gap-1">
            <span>View Full Report</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* CSS Chart Bar Visual */}
        <div className="h-56 flex items-end justify-between gap-2 sm:gap-4 pt-6 pb-2 px-2">
          {[
            { month: "Jan", val: "40%" },
            { month: "Feb", val: "65%" },
            { month: "Mar", val: "50%" },
            { month: "Apr", val: "85%" },
            { month: "May", val: "70%" },
            { month: "Jun", val: "95%" },
            { month: "Jul", val: "60%" },
          ].map((bar, i) => (
            <div
              key={i}
              className="flex-1 flex flex-col items-center gap-2 h-full justify-end group"
            >
              <div
                style={{ height: bar.val }}
                className="w-full max-w-[36px] bg-[#3b1a83]/20 dark:bg-indigo-500/20 group-hover:bg-[#3b1a83] dark:group-hover:bg-indigo-500 rounded-2xl transition-all duration-300 relative"
              >
                <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-[10px] py-1 px-2 rounded-lg pointer-events-none transition-opacity">
                  {bar.val}
                </div>
              </div>
              <span className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400">
                {bar.month}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Property Category Distribution */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-6 flex flex-col justify-between">
        <div>
          <h2 className="font-serif text-lg font-bold text-zinc-900 dark:text-white">
            Category Breakdown
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Property type demand distribution
          </p>

          <div className="space-y-4 mt-6">
            {[
              { type: "Luxury Apartments", share: 55, color: "bg-[#3b1a83]" },
              { type: "Commercial Spaces", share: 25, color: "bg-indigo-500" },
              { type: "Residential Plots", share: 20, color: "bg-amber-400" },
            ].map((cat, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  <span>{cat.type}</span>
                  <span>{cat.share}%</span>
                </div>
                <div className="w-full h-2.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${cat.color} rounded-full`}
                    style={{ width: `${cat.share}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#f0edf9] dark:bg-zinc-800/60 border border-[#3b1a83]/10 dark:border-zinc-700 flex items-center gap-3 mt-4">
          <TrendingUp className="w-5 h-5 text-[#3b1a83] dark:text-indigo-400 shrink-0" />
          <p className="text-xs text-zinc-600 dark:text-zinc-300 font-medium">
            Luxury Apartments standard inquiry rate increased by{" "}
            <span className="font-bold text-[#3b1a83] dark:text-indigo-400">
              14%
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default RevenueOverview;
