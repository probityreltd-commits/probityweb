"use client";

import { FiChevronLeft, FiChevronRight, FiInbox } from "react-icons/fi";
import InquiryRow from "./InquiryRow";

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
  const allSelected = inquiries.length > 0 && selectedIds.length === inquiries.length;

  return (
    <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-zinc-100 dark:border-zinc-800">
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  className="px-2 first:pl-4 last:pr-4 py-3 ledger-font text-[10px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400 whitespace-nowrap"
                >
                  {col.key === "select" ? (
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={onToggleSelectAll}
                      className="w-4 h-4 rounded border-zinc-300 text-[#431780] focus:ring-[#431780] cursor-pointer"
                    />
                  ) : (
                    col.label
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading &&
              Array.from({ length: 6 }).map((_, i) => (
                <tr key={i} className="border-b border-zinc-100 dark:border-zinc-800">
                  <td colSpan={COLUMNS.length} className="px-4 py-3.5">
                    <div className="h-5 rounded bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
                  </td>
                </tr>
              ))}

            {!loading &&
              inquiries.map((inquiry) => (
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

        {!loading && inquiries.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-zinc-400 dark:text-zinc-600">
            <FiInbox className="w-8 h-8 mb-3" />
            <p className="text-sm ledger-font uppercase tracking-widest">No inquiries found</p>
          </div>
        )}
      </div>

      {/* pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-zinc-100 dark:border-zinc-800">
          <span className="text-[11px] text-zinc-500 dark:text-zinc-400 ledger-font">
            Page {pagination.page} of {pagination.totalPages} · {pagination.total} total
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onPageChange(pagination.page - 1)}
              disabled={pagination.page <= 1}
              className="w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:border-[#431780] hover:text-[#431780] disabled:opacity-40 disabled:hover:border-zinc-200 disabled:hover:text-zinc-600 transition-all"
            >
              <FiChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => onPageChange(pagination.page + 1)}
              disabled={pagination.page >= pagination.totalPages}
              className="w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:border-[#431780] hover:text-[#431780] disabled:opacity-40 disabled:hover:border-zinc-200 disabled:hover:text-zinc-600 transition-all"
            >
              <FiChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
