"use client";

import { FiCalendar, FiMessageSquare, FiUser, FiVideo } from "react-icons/fi";
import { REQUEST_TYPE_CONFIG } from "@/services/constants/inquiryConstants";

export default function RequestTypeBadge({ requestType, tourType }) {
  const isTour = requestType === "SCHEDULE_TOUR";
  const config =
    REQUEST_TYPE_CONFIG[requestType] || REQUEST_TYPE_CONFIG.REQUEST_INFO;
  const Icon = isTour ? FiCalendar : FiMessageSquare;

  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide ledger-font px-2 py-1 rounded-full border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300">
        <Icon className="w-3 h-3" />
        {config.label}
      </span>

      {isTour && tourType && (
        <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide ledger-font px-2 py-1 rounded-full bg-[#431780]/5 text-[#431780] dark:text-violet-300">
          {tourType === "Video Chat" ? (
            <FiVideo className="w-3 h-3" />
          ) : (
            <FiUser className="w-3 h-3" />
          )}
          {tourType}
        </span>
      )}
    </div>
  );
}
