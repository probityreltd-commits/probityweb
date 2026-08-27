"use client";

import { FiTrash2, FiX } from "react-icons/fi";
import {
  STATUS_CONFIG,
  STATUS_ORDER,
} from "@/services/constants/inquiryConstants";

export default function BulkActionBar({
  count,
  onClear,
  onBulkStatus,
  onBulkDelete,
}) {
  if (count === 0) return null;

  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-[#431780]/30 bg-[#431780]/5 dark:bg-violet-500/10 px-4 py-3">
      <div className="flex items-center gap-3">
        <button
          onClick={onClear}
          aria-label="Clear selection"
          className="w-7 h-7 rounded-full flex items-center justify-center text-[#431780] dark:text-violet-300 hover:bg-[#431780]/10 transition-colors"
        >
          <FiX className="w-4 h-4" />
        </button>
        <span className="text-xs font-semibold text-[#431780] dark:text-violet-300 ledger-font uppercase tracking-wide">
          {count} selected
        </span>
      </div>

      <div className="flex items-center gap-2">
        <select
          defaultValue=""
          onChange={(e) => {
            if (e.target.value) onBulkStatus(e.target.value);
            e.target.value = "";
          }}
          className="text-xs bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#431780]"
        >
          <option value="" disabled>
            Set status...
          </option>
          {STATUS_ORDER.map((key) => (
            <option key={key} value={key}>
              {STATUS_CONFIG[key].label}
            </option>
          ))}
        </select>

        <button
          onClick={onBulkDelete}
          className="flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 px-3 py-2 rounded-xl transition-colors"
        >
          <FiTrash2 className="w-3.5 h-3.5" />
          Delete
        </button>
      </div>
    </div>
  );
}
