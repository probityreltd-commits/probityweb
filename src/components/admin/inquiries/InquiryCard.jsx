"use client";

import { FiTrash2 } from "react-icons/fi";

const STATUS_BADGE_CLASS = {
  NEW: "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
  CONTACTED:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
  IN_PROGRESS:
    "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
  COMPLETED:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
  CLOSED: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300",
};

const statusBadgeClass = (status) =>
  STATUS_BADGE_CLASS[status] || STATUS_BADGE_CLASS.NEW;

export default function InquiryCard({
  inquiry,
  selected,
  onToggleSelect,
  onOpen,
  onStatusChange,
  onDelete,
}) {
  const unread = inquiry.isRead === false;

  return (
    <div
      className={`rounded-xl border p-3.5 transition-colors ${
        unread
          ? "border-brand/30 dark:border-brand-light/30 bg-brand/[0.03] dark:bg-brand-light/[0.04]"
          : "border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <label
          className="flex items-start gap-2.5 min-w-0 flex-1"
          onClick={(e) => e.stopPropagation()}
        >
          <input
            type="checkbox"
            checked={selected}
            onChange={() => onToggleSelect?.(inquiry._id)}
            className="w-4 h-4 mt-0.5 accent-brand cursor-pointer shrink-0"
          />
          <button
            type="button"
            onClick={() => onOpen?.(inquiry)}
            className="min-w-0 text-left cursor-pointer flex-1"
          >
            <div className="flex items-center gap-1.5">
              {unread && (
                <span className="w-2 h-2 rounded-full bg-brand shrink-0" />
              )}
              <p
                className={`text-sm truncate ${unread ? "font-bold text-zinc-900 dark:text-white" : "font-semibold text-zinc-800 dark:text-zinc-200"}`}
              >
                {inquiry.name || "—"}
              </p>
            </div>
            {inquiry.email && (
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                {inquiry.email}
              </p>
            )}
          </button>
        </label>

        <select
          value={inquiry.status || "NEW"}
          onChange={(e) => onStatusChange?.(inquiry._id, e.target.value)}
          onClick={(e) => e.stopPropagation()}
          className={`text-[9px] font-bold uppercase tracking-wide rounded-full border-0 px-2 py-1 shrink-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand ${statusBadgeClass(inquiry.status)}`}
        >
          <option value="NEW">New</option>
          <option value="CONTACTED">Contacted</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
          <option value="CLOSED">Closed</option>
        </select>
      </div>

      <button
        type="button"
        onClick={() => onOpen?.(inquiry)}
        className="w-full text-left mt-2.5 flex items-center justify-between gap-2"
      >
        <span className="text-[11px] text-zinc-600 dark:text-zinc-400 truncate">
          {inquiry.property?.title || "General inquiry"}
        </span>
        <span className="text-[9px] font-mono text-zinc-400 dark:text-zinc-500 shrink-0">
          {inquiry.createdAt
            ? new Date(inquiry.createdAt).toLocaleDateString()
            : "—"}
        </span>
      </button>

      <div className="flex items-center justify-between gap-2 mt-2.5 pt-2.5 border-t border-zinc-100 dark:border-zinc-800">
        <span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">
          {inquiry.requestType?.replaceAll("_", " ") || "—"}
          {inquiry.assignedTo?.name ? ` · ${inquiry.assignedTo.name}` : ""}
        </span>
        {onDelete && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(inquiry._id);
            }}
            title="Delete"
            className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors shrink-0 cursor-pointer"
          >
            <FiTrash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
