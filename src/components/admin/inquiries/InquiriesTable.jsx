"use client";

import { FiChevronLeft, FiChevronRight, FiInbox } from "react-icons/fi";
import InquiryRow from "./InquiryRow";
import InquiryCard from "./InquiryCard";

const COLUMNS = [
  { key: "select", label: "" },
  { key: "name", label: "Client" },
  { key: "property", label: "Property" },
  { key: "type", label: "Request" },
  { key: "status", label: "Status" },
  { key: "assigned", label: "Assigned" },
  { key: "received", label: "Received" },
  { key: "actions", label: "" },
];

export default function InquiriesTable({
  inquiries,
  loading,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
  onOpen,
  onStatusChange,
  onDelete,
  pagination,
  onPageChange,
}) {
  const allSelected =
    inquiries.length > 0 && selectedIds.length === inquiries.length;

  return (
    <div className="rounded-xl sm:rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md overflow-hidden">
      {/* Loading */}
      {loading && (
        <div className="p-3 sm:p-4 space-y-2.5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-14 rounded-xl bg-zinc-100 dark:bg-zinc-800 animate-pulse"
            />
          ))}
        </div>
      )}

      {/* Empty */}
      {!loading && inquiries.length === 0 && (
        <div className="flex flex-col items-center justify-center py-14 sm:py-16 text-zinc-400 dark:text-zinc-600 px-4 text-center">
          <FiInbox className="w-8 h-8 mb-3" />
          <p className="text-xs sm:text-sm font-mono uppercase tracking-widest">
            No inquiries found
          </p>
        </div>
      )}

      {/* Desktop table */}
      {!loading && inquiries.length > 0 && (
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-zinc-100 dark:border-zinc-800">
                {COLUMNS.map((col) => (
                  <th
                    key={col.key}
                    className="px-2 first:pl-4 last:pr-4 py-3 font-mono text-[10px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400 whitespace-nowrap"
                  >
                    {col.key === "select" ? (
                      <input
                        type="checkbox"
                        checked={allSelected}
                        onChange={onToggleSelectAll}
                        className="w-4 h-4 rounded border-zinc-300 accent-brand cursor-pointer"
                      />
                    ) : (
                      col.label
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {inquiries.map((inquiry) => (
                <InquiryRow
                  key={inquiry._id}
                  inquiry={inquiry}
                  selected={selectedIds.includes(inquiry._id)}
                  onToggleSelect={onToggleSelect}
                  onOpen={onOpen}
                  onStatusChange={onStatusChange}
                  onDelete={onDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Mobile cards */}
      {!loading && inquiries.length > 0 && (
        <div className="md:hidden p-3 space-y-2.5">
          <label className="flex items-center gap-2 px-1 pb-1 text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={onToggleSelectAll}
              className="w-4 h-4 accent-brand cursor-pointer"
            />
            Select all
          </label>
          {inquiries.map((inquiry) => (
            <InquiryCard
              key={inquiry._id}
              inquiry={inquiry}
              selected={selectedIds.includes(inquiry._id)}
              onToggleSelect={onToggleSelect}
              onOpen={onOpen}
              onStatusChange={onStatusChange}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between px-3.5 sm:px-4 py-3 border-t border-zinc-100 dark:border-zinc-800">
          <span className="text-[10px] sm:text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">
            Page {pagination.page}/{pagination.totalPages} · {pagination.total}{" "}
            total
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onPageChange(pagination.page - 1)}
              disabled={pagination.page <= 1}
              className="w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:border-brand hover:text-brand disabled:opacity-40 transition-all cursor-pointer"
            >
              <FiChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => onPageChange(pagination.page + 1)}
              disabled={pagination.page >= pagination.totalPages}
              className="w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:border-brand hover:text-brand disabled:opacity-40 transition-all cursor-pointer"
            >
              <FiChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
