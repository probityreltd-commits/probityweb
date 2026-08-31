"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import {
  Plus,
  Building2,
  MessageSquare,
  ExternalLink,
  Activity,
} from "lucide-react";

const QuickActions = ({ properties = [], inquiries = [] }) => {
  const activities = useMemo(() => {
    const propActs = properties.map((p) => ({
      id: p._id,
      type: "PROPERTY",
      title: `New property listed: ${p.title}`,
      time: new Date(p.createdAt),
    }));

    const inqActs = inquiries.map((i) => ({
      id: i._id,
      type: "INQUIRY",
      title: `Inquiry received from ${i.name}`,
      time: new Date(i.createdAt),
    }));

    return [...propActs, ...inqActs]
      .sort((a, b) => b.time - a.time)
      .slice(0, 5);
  }, [properties, inquiries]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-5 bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-100 dark:border-zinc-800 shadow-sm">
        <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-1">
          Quick Management
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">
          Direct shortcuts to administrative tasks
        </p>

        <div className="grid grid-cols-2 gap-3">
          <Link
            href="/admin/add-property"
            className="flex flex-col items-center justify-center p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40 hover:bg-[#3b1a83]/5 hover:border-[#3b1a83]/30 transition-all text-center group"
          >
            <Plus className="w-5 h-5 text-[#3b1a83] dark:text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
              Add Property
            </span>
          </Link>

          <Link
            href="/admin/property"
            className="flex flex-col items-center justify-center p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40 hover:bg-[#3b1a83]/5 hover:border-[#3b1a83]/30 transition-all text-center group"
          >
            <Building2 className="w-5 h-5 text-[#3b1a83] dark:text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
              Properties
            </span>
          </Link>

          <Link
            href="/admin/inquiries"
            className="flex flex-col items-center justify-center p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40 hover:bg-[#3b1a83]/5 hover:border-[#3b1a83]/30 transition-all text-center group"
          >
            <MessageSquare className="w-5 h-5 text-[#3b1a83] dark:text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
              Inquiries
            </span>
          </Link>

          <Link
            href="/properties"
            target="_blank"
            className="flex flex-col items-center justify-center p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40 hover:bg-[#3b1a83]/5 hover:border-[#3b1a83]/30 transition-all text-center group"
          >
            <ExternalLink className="w-5 h-5 text-[#3b1a83] dark:text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
              Live Site
            </span>
          </Link>
        </div>
      </div>

      {/* Real Timeline Derived Activity */}
      <div className="lg:col-span-7 bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-100 dark:border-zinc-800 shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <Activity className="w-4 h-4 text-[#3b1a83] dark:text-purple-400" />
          <h3 className="text-base font-bold text-zinc-900 dark:text-white">
            System Log Activity
          </h3>
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">
          Latest operational changes derived from real DB timestamps
        </p>

        <div className="space-y-3">
          {activities.map((act) => (
            <div
              key={act.id}
              className="flex items-center justify-between text-xs py-1.5 border-b border-zinc-100 dark:border-zinc-800/60 last:border-none"
            >
              <span className="font-medium text-zinc-700 dark:text-zinc-300 truncate max-w-[80%]">
                {act.title}
              </span>
              <span className="text-[10px] text-zinc-400 shrink-0">
                {act.time.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
