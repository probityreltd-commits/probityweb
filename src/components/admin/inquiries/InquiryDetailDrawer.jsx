"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiX,
  FiPhone,
  FiMail,
  FiMessageCircle,
  FiTrash2,
  FiSend,
  FiUser,
} from "react-icons/fi";
import StatusDropdown from "./StatusDropdown";
import RequestTypeBadge from "./RequestTypeBadge";
import { formatDateTime } from "@/services/utils/formatters (1)";

export default function InquiryDetailDrawer({
  inquiry,
  agents = [],
  onClose,
  onStatusChange,
  onAssignChange,
  onAddNote,
  onDelete,
}) {
  const [noteText, setNoteText] = useState("");
  const [savingNote, setSavingNote] = useState(false);

  if (!inquiry) return null;

  const waNumber = (inquiry.phone || "").replace(/[^\d]/g, "");

  const handleAddNote = async () => {
    if (!noteText.trim()) return;
    setSavingNote(true);
    await onAddNote(inquiry._id, noteText.trim());
    setNoteText("");
    setSavingNote(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* panel */}
      <div className="relative w-full max-w-md h-full bg-white dark:bg-zinc-900 shadow-2xl overflow-y-auto">
        {/* header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 border-b border-zinc-100 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md">
          <span className="ledger-font text-[10px] uppercase tracking-[0.25em] text-[#431780] dark:text-violet-300">
            Inquiry detail
          </span>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <FiX className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-6">
          {/* client */}
          <div>
            <h2 className="display-font text-xl font-semibold text-zinc-900 dark:text-white">
              {inquiry.name}
            </h2>
            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-zinc-600 dark:text-zinc-400">
              <a
                href={`tel:${inquiry.phone}`}
                className="flex items-center gap-1.5 hover:text-[#431780] dark:hover:text-violet-300"
              >
                <FiPhone className="w-3.5 h-3.5" /> {inquiry.phone}
              </a>
              <a
                href={`mailto:${inquiry.email}`}
                className="flex items-center gap-1.5 hover:text-[#431780] dark:hover:text-violet-300"
              >
                <FiMail className="w-3.5 h-3.5" /> {inquiry.email}
              </a>
              <a
                href={`https://wa.me/${waNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-emerald-600"
              >
                <FiMessageCircle className="w-3.5 h-3.5" /> WhatsApp
              </a>
            </div>
          </div>

          {/* request info */}
          <div className="flex flex-wrap items-center gap-2">
            <RequestTypeBadge
              requestType={inquiry.requestType}
              tourType={inquiry.tourType}
            />
            <span className="text-[11px] text-zinc-400 ledger-font">
              Submitted {formatDateTime(inquiry.createdAt)}
            </span>
          </div>

          {/* message */}
          {inquiry.message && (
            <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 p-4">
              <span className="ledger-font text-[10px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400 block mb-2">
                Message
              </span>
              <p className="text-sm text-zinc-700 dark:text-zinc-200 leading-relaxed">
                {inquiry.message}
              </p>
            </div>
          )}

          {/* property */}
          {inquiry.property?.title && (
            <Link
              href={`/properties/${inquiry.property.slug || ""}`}
              className="flex items-center gap-3 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 p-3 hover:border-[#431780] transition-colors"
            >
              <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-zinc-200 dark:bg-zinc-800">
                {inquiry.property.coverImage && (
                  <Image
                    src={inquiry.property.coverImage}
                    alt={inquiry.property.title}
                    fill
                    unoptimized
                    sizes="56px"
                    className="object-cover"
                  />
                )}
              </div>
              <div className="min-w-0">
                <span className="ledger-font text-[10px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400 block">
                  Property
                </span>
                <p className="text-sm font-semibold text-zinc-900 dark:text-white truncate">
                  {inquiry.property.title}
                </p>
              </div>
            </Link>
          )}

          {/* status + assign */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <span className="ledger-font text-[10px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400 block mb-2">
                Status
              </span>
              <StatusDropdown
                value={inquiry.status}
                onChange={(status) => onStatusChange(inquiry._id, status)}
              />
            </div>
            <div>
              <span className="ledger-font text-[10px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400 block mb-2">
                Assigned to
              </span>
              <select
                value={inquiry.assignedTo?._id || ""}
                onChange={(e) => onAssignChange(inquiry._id, e.target.value)}
                className="w-full text-xs bg-[#431780]/5 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#431780]"
              >
                <option value="">Unassigned</option>
                {agents.map((agent) => (
                  <option key={agent._id} value={agent._id}>
                    {agent.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* internal notes */}
          <div>
            <span className="ledger-font text-[10px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400 block mb-2">
              Internal notes
            </span>

            <div className="space-y-2.5 max-h-52 overflow-y-auto mb-3">
              {(inquiry.internalNotes || []).length === 0 && (
                <p className="text-xs text-zinc-400 dark:text-zinc-600 italic">
                  No notes yet — only your team sees these.
                </p>
              )}
              {(inquiry.internalNotes || [])
                .slice()
                .reverse()
                .map((note, idx) => (
                  <div
                    key={note._id || idx}
                    className="rounded-xl bg-zinc-50 dark:bg-zinc-800/60 p-3"
                  >
                    <p className="text-xs text-zinc-700 dark:text-zinc-200">
                      {note.text}
                    </p>
                    <div className="flex items-center gap-1 mt-1.5 text-[10px] text-zinc-400 ledger-font">
                      <FiUser className="w-3 h-3" />
                      {note.addedBy} · {formatDateTime(note.addedAt)}
                    </div>
                  </div>
                ))}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddNote()}
                placeholder="Add a note for your team..."
                className="flex-1 text-xs bg-[#431780]/5 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#431780]"
              />
              <button
                onClick={handleAddNote}
                disabled={savingNote || !noteText.trim()}
                aria-label="Add note"
                className="w-9 h-9 rounded-xl bg-[#431780] text-white flex items-center justify-center hover:bg-[#341160] disabled:opacity-50 transition-colors shrink-0"
              >
                <FiSend className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* delete */}
          <button
            onClick={() => onDelete(inquiry._id)}
            className="flex items-center gap-2 text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 px-3 py-2.5 rounded-xl transition-colors"
          >
            <FiTrash2 className="w-4 h-4" />
            Delete this inquiry
          </button>
        </div>
      </div>
    </div>
  );
}
