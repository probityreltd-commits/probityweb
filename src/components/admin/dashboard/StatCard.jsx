"use client";

import React from "react";

const StatCard = ({
  title,
  value,
  icon: Icon,
  description,
  badgeText,
  badgeColor = "bg-[#3b1a83]/10 text-[#3b1a83] dark:bg-[#3b1a83]/30 dark:text-purple-300",
}) => {
  return (
    <div className="bg-white dark:bg-zinc-900/90 rounded-2xl p-5 border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
          {title}
        </span>
        {Icon && (
          <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 text-[#3b1a83] dark:text-purple-400">
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          {value}
        </span>
        {badgeText && (
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${badgeColor}`}
          >
            {badgeText}
          </span>
        )}
      </div>

      {description && (
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 font-normal truncate">
          {description}
        </p>
      )}
    </div>
  );
};

export default StatCard;
