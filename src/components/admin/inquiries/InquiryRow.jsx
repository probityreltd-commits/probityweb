"use client";

import { FiEye, FiTrash2 } from "react-icons/fi";

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

export default function InquiryRow({
  inquiry,
  selected,
  onToggleSelect,
  onOpen,
  onStatusChange,
  onDelete,
}) {
  const unread = inquiry.isRead === false;

  return (
    <>
      {/* Desktop row */}
      <tr
        onClick={() => onOpen?.(inquiry)}
        className={`hidden md:table-row border-b border-zinc-100 dark:border-zinc-800 cursor-pointer transition-colors ${
          unread
            ? "bg-brand/[0.03] hover:bg-brand/[0.06] dark:bg-brand-light/[0.04] dark:hover:bg-brand-light/[0.07]"
            : "hover:bg-zinc-50 dark:hover:bg-zinc-800/40"
        }`}
      >
        <td className="px-2 py-3 pl-4" onClick={(e) => e.stopPropagation()}>
          <input
            type="checkbox"
            checked={selected}
            onChange={() => onToggleSelect?.(inquiry._id)}
            aria-label={`Select ${inquiry.name || "inquiry"}`}
            className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-600 accent-brand cursor-pointer"
          />
        </td>

        <td className="px-2 py-3">
          <div className="flex items-center gap-2">
            {unread && (
              <span
                className="w-2 h-2 rounded-full bg-brand shrink-0"
                aria-label="Unread"
              />
            )}
            <div className="min-w-0">
              <p
                className={`text-sm truncate ${unread ? "font-bold text-zinc-900 dark:text-white" : "font-medium text-zinc-700 dark:text-zinc-200"}`}
              >
                {inquiry.name || "—"}
              </p>
              {inquiry.email && (
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                  {inquiry.email}
                </p>
              )}
            </div>
          </div>
        </td>

        <td className="px-2 py-3">
          <span className="text-sm text-zinc-700 dark:text-zinc-300 truncate block max-w-[140px]">
            {inquiry.property?.title || "—"}
          </span>
        </td>

        <td className="px-2 py-3">
          <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
            {inquiry.requestType?.replaceAll("_", " ") || "—"}
          </span>
        </td>

        <td className="px-2 py-3" onClick={(e) => e.stopPropagation()}>
          <select
            value={inquiry.status || "NEW"}
            onChange={(e) => onStatusChange?.(inquiry._id, e.target.value)}
            className={`text-[11px] font-bold uppercase tracking-wide rounded-full border-0 px-2.5 py-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand ${statusBadgeClass(inquiry.status)}`}
          >
            <option value="NEW">New</option>
            <option value="CONTACTED">Contacted</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
            <option value="CLOSED">Closed</option>
          </select>
        </td>

        <td className="px-2 py-3">
          <span className="text-sm text-zinc-600 dark:text-zinc-400">
            {inquiry.assignedTo?.name || "Unassigned"}
          </span>
        </td>

        <td className="px-2 py-3">
          <span className="text-xs text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
            {inquiry.createdAt
              ? new Date(inquiry.createdAt).toLocaleDateString()
              : "—"}
          </span>
        </td>

        <td className="px-2 py-3 pr-4" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-end gap-1">
            <button
              type="button"
              onClick={() => onOpen?.(inquiry)}
              title="View details"
              className="p-1.5 rounded-lg text-zinc-400 hover:text-brand hover:bg-brand/10 dark:hover:text-brand-light dark:hover:bg-brand-light/10 transition-colors cursor-pointer"
            >
              <FiEye className="w-4 h-4" />
            </button>
            {onDelete && (
              <button
                type="button"
                onClick={() => onDelete(inquiry._id)}
                title="Delete"
                className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </td>
      </tr>

      {/* Mobile card — rendered by parent as a separate list, see InquiriesTable */}
    </>
  );
}
