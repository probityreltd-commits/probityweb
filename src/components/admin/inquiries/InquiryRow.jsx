"use client";

export default function InquiryRow({
  inquiry,
  selected,
  onToggleSelect,
  onOpen,
  onStatusChange,
  onDelete,
}) {
  return (
    <tr className="border-b border-zinc-100 dark:border-zinc-800">
      {/* Select */}
      <td className="px-2 py-3 pl-4">
        <input
          type="checkbox"
          checked={selected}
          onChange={() => onToggleSelect?.(inquiry._id)}
          aria-label={`Select ${inquiry.name || "inquiry"}`}
          className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-600 text-[#431780] focus:ring-[#431780] cursor-pointer"
        />
      </td>

      {/* Client */}
      <td className="px-2 py-3">
        <button
          type="button"
          onClick={() => onOpen?.(inquiry)}
          className="text-sm font-medium text-zinc-900 dark:text-white hover:text-[#431780]"
        >
          {inquiry.name || "—"}
        </button>

        {inquiry.email && (
          <p className="text-[11px] text-zinc-500 mt-0.5">{inquiry.email}</p>
        )}
      </td>

      {/* Property */}
      <td className="px-2 py-3">
        <span className="text-sm text-zinc-700 dark:text-zinc-300">
          {inquiry.property?.title || "—"}
        </span>
      </td>

      {/* Request Type */}
      <td className="px-2 py-3">
        <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
          {inquiry.requestType || "—"}
        </span>
      </td>

      {/* Status */}
      <td className="px-2 py-3">
        <select
          value={inquiry.status || "NEW"}
          onChange={(e) => onStatusChange?.(inquiry._id, e.target.value)}
          className="text-xs rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-2 py-1.5 text-zinc-700 dark:text-zinc-300 outline-none focus:ring-1 focus:ring-[#431780]"
        >
          <option value="NEW">New</option>
          <option value="CONTACTED">Contacted</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
          <option value="CLOSED">Closed</option>
        </select>
      </td>

      {/* Assigned */}
      <td className="px-2 py-3">
        <span className="text-sm text-zinc-600 dark:text-zinc-400">
          {inquiry.assignedTo?.name || "Unassigned"}
        </span>
      </td>

      {/* Received */}
      <td className="px-2 py-3">
        <span className="text-xs text-zinc-500 dark:text-zinc-400">
          {inquiry.createdAt
            ? new Date(inquiry.createdAt).toLocaleDateString()
            : "—"}
        </span>
      </td>

      {/* Actions */}
      <td className="px-2 py-3 pr-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onOpen?.(inquiry)}
            className="text-xs font-medium text-[#431780] hover:underline"
          >
            View
          </button>

          {onDelete && (
            <button
              type="button"
              onClick={() => onDelete(inquiry._id)}
              className="text-xs text-red-500 hover:text-red-600"
            >
              Delete
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}
