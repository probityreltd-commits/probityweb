"use client";

import Image from "next/image";
import { FiPhone, FiMail, FiMessageCircle, FiTrash2 } from "react-icons/fi";
import StatusDropdown from "./StatusDropdown";
import RequestTypeBadge from "./RequestTypeBadge";
import { timeAgo } from "@/services/utils/formatters (1)";

export default function InquiryRow({
  inquiry,
  selected,
  onToggleSelect,
  onOpen,
  onStatusChange,
  onDelete,
}) {
  const waNumber = (inquiry.phone || "").replace(/[^\d]/g, "");

  return (
    <tr
      onClick={() => onOpen(inquiry)}
      className={`cursor-pointer border-b border-zinc-100 dark:border-zinc-800 hover:bg-[#431780]/5 dark:hover:bg-zinc-800/60 transition-colors ${
        !inquiry.isRead ? "bg-[#431780]/[0.03] dark:bg-violet-500/[0.04]" : ""
      }`}
    >
      {/* select */}
      <td className="pl-4 pr-2 py-3.5" onClick={(e) => e.stopPropagation()}>
        <input
          type="checkbox"
          checked={selected}
          onChange={() => onToggleSelect(inquiry._id)}
          className="w-4 h-4 rounded border-zinc-300 text-[#431780] focus:ring-[#431780] cursor-pointer"
        />
      </td>

      {/* unread + name/contact */}
      <td className="px-2 py-3.5 min-w-[180px]">
        <div className="flex items-center gap-2">
          {!inquiry.isRead && (
            <span
              className="w-2 h-2 rounded-full bg-[#431780] shrink-0"
              aria-label="Unread"
            />
          )}
          <div>
            <p className="display-font text-sm font-semibold text-zinc-900 dark:text-white">
              {inquiry.name}
            </p>
            <div className="flex items-center gap-2 mt-0.5 text-[11px] text-zinc-500 dark:text-zinc-400">
              <a
                href={`tel:${inquiry.phone}`}
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1 hover:text-[#431780] dark:hover:text-violet-300"
              >
                <FiPhone className="w-3 h-3" /> {inquiry.phone}
              </a>
            </div>
          </div>
        </div>
      </td>

      {/* property */}
      <td className="px-2 py-3.5 min-w-[180px]">
        <div className="flex items-center gap-2.5">
          {inquiry.property?.coverImage ? (
            <div className="relative w-9 h-9 rounded-lg overflow-hidden shrink-0 bg-zinc-200 dark:bg-zinc-800">
              <Image
                src={inquiry.property.coverImage}
                alt={inquiry.property.title || "Property"}
                fill
                unoptimized
                sizes="36px"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-9 h-9 rounded-lg bg-[#431780]/10 shrink-0" />
          )}
          <span className="text-xs text-zinc-700 dark:text-zinc-300 line-clamp-2">
            {inquiry.property?.title || "—"}
          </span>
        </div>
      </td>

      {/* request type */}
      <td className="px-2 py-3.5">
        <RequestTypeBadge
          requestType={inquiry.requestType}
          tourType={inquiry.tourType}
        />
      </td>

      {/* status */}
      <td className="px-2 py-3.5" onClick={(e) => e.stopPropagation()}>
        <StatusDropdown
          value={inquiry.status}
          onChange={(status) => onStatusChange(inquiry._id, status)}
        />
      </td>

      {/* assigned */}
      <td className="px-2 py-3.5 text-xs text-zinc-600 dark:text-zinc-400 whitespace-nowrap">
        {inquiry.assignedTo?.name || (
          <span className="text-zinc-400 dark:text-zinc-600">Unassigned</span>
        )}
      </td>

      {/* received */}
      <td className="px-2 py-3.5 text-xs text-zinc-500 dark:text-zinc-400 whitespace-nowrap ledger-font">
        {timeAgo(inquiry.createdAt)}
      </td>

      {/* quick actions */}
      <td className="px-2 pr-4 py-3.5" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-end gap-1">
          <a
            href={`https://wa.me/${waNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-colors"
          >
            <FiMessageCircle className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${inquiry.email}`}
            aria-label="Email"
            className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-500 hover:text-[#431780] hover:bg-[#431780]/5 dark:hover:text-violet-300 transition-colors"
          >
            <FiMail className="w-4 h-4" />
          </a>
          <button
            onClick={() => onDelete(inquiry._id)}
            aria-label="Delete inquiry"
            className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}
