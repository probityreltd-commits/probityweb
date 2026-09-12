"use client";

import { useEffect, useState } from "react";
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
  FiMapPin,
  FiHome,
  FiTag,
  FiDollarSign,
  FiCalendar,
  FiClock,
  FiInfo,
  FiLayers,
  FiMaximize2,
  FiDroplet,
  FiVideo,
  FiFileText,
  FiCheckCircle,
} from "react-icons/fi";
import StatusDropdown from "./StatusDropdown";
import RequestTypeBadge from "./RequestTypeBadge";
import { formatDateTime } from "@/services/utils/formatters (1)";

/* ----------------------------------------------------------------------- *
 * Small presentational helpers
 * These are pure, stateless, and only concerned with turning raw inquiry
 * data into human-readable rows. Nothing here touches the network/API.
 * ----------------------------------------------------------------------- */

function hasValue(v) {
  if (v === null || v === undefined) return false;
  if (typeof v === "string" && v.trim() === "") return false;
  return true;
}

function formatCurrency(value) {
  if (!hasValue(value)) return null;
  const num = Number(value);
  if (Number.isNaN(num)) return String(value);
  return `৳${num.toLocaleString("en-US")}`;
}

function formatNumber(value) {
  if (!hasValue(value)) return null;
  const num = Number(value);
  if (Number.isNaN(num)) return String(value);
  return num.toLocaleString("en-US");
}

const REQUEST_TYPE_LABELS = {
  SCHEDULE_TOUR: "Schedule a Tour",
  BROCHURE_DOWNLOAD: "Brochure Download",
  CONTACT_AGENT: "Contact Agent",
  PRICE_INQUIRY: "Price Inquiry",
};

function formatRequestType(type) {
  if (!hasValue(type)) return null;
  return (
    REQUEST_TYPE_LABELS[type] ||
    type
      .toString()
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase())
  );
}

function formatLabel(value) {
  if (!hasValue(value)) return null;
  return value
    .toString()
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Section container: heading + icon + a vertical stack of rows/content. */
function SectionCard({ icon: Icon, title, children }) {
  return (
    <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 p-4">
      <div className="flex items-center gap-1.5 mb-3">
        {Icon && (
          <Icon className="w-3.5 h-3.5 text-brand dark:text-brand-light shrink-0" />
        )}
        <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
          {title}
        </span>
      </div>
      <div className="space-y-2.5">{children}</div>
    </div>
  );
}

/** A single label/value row. Renders nothing if the value is empty. */
function InfoRow({ icon: Icon, label, value, href }) {
  if (!hasValue(value)) return null;

  const row = (
    <div className="flex items-start justify-between gap-3 text-sm">
      <span className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 shrink-0">
        {Icon && <Icon className="w-3.5 h-3.5" />}
        {label}
      </span>
      <span className="text-right font-medium text-zinc-800 dark:text-zinc-100 break-words">
        {value}
      </span>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel="noopener noreferrer"
        className="block hover:text-brand dark:hover:text-brand-light transition-colors"
      >
        {row}
      </a>
    );
  }

  return row;
}

/* ----------------------------------------------------------------------- *
 * Data extraction helpers
 * These safely pull whatever fields happen to exist on a given inquiry —
 * different inquiry types carry different shapes, so nothing here assumes
 * a field is present.
 * ----------------------------------------------------------------------- */

function getCustomerRows(inquiry) {
  return [
    {
      icon: FiMail,
      label: "Email",
      value: inquiry.email,
      href: hasValue(inquiry.email) ? `mailto:${inquiry.email}` : undefined,
    },
    {
      icon: FiPhone,
      label: "Phone",
      value: inquiry.phone,
      href: hasValue(inquiry.phone) ? `tel:${inquiry.phone}` : undefined,
    },
    { icon: FiMapPin, label: "Location", value: inquiry.location },
    { icon: FiMapPin, label: "Address", value: inquiry.address },
    { icon: FiUser, label: "Company", value: inquiry.company },
  ].filter((row) => hasValue(row.value));
}

function getPropertyRows(property) {
  if (!property) return [];
  return [
    {
      icon: FiTag,
      label: "Type",
      value: property.type || property.propertyType,
    },
    { icon: FiMapPin, label: "Location", value: property.location },
    { icon: FiMapPin, label: "Address", value: property.address },
    {
      icon: FiDollarSign,
      label: "Price",
      value: formatCurrency(property.price),
    },
    {
      icon: FiDollarSign,
      label: "Price / sqft",
      value: formatCurrency(property.pricePerSqft),
    },
    { icon: FiLayers, label: "Bedrooms", value: property.bedrooms },
    { icon: FiDroplet, label: "Bathrooms", value: property.bathrooms },
    {
      icon: FiMaximize2,
      label: "Size",
      value: hasValue(property.size)
        ? `${formatNumber(property.size)} sqft`
        : null,
    },
  ].filter((row) => hasValue(row.value));
}

/** Fields unique to a specific requestType. Extend this switch as new
 *  inquiry types are introduced — never invent values that aren't present. */
function getInquirySpecificRows(inquiry) {
  switch (inquiry.requestType) {
    case "SCHEDULE_TOUR":
      return [
        {
          icon: inquiry.tourType === "Video Chat" ? FiVideo : FiMapPin,
          label: "Tour type",
          value: inquiry.tourType,
        },
        {
          icon: FiCalendar,
          label: "Preferred date",
          value: hasValue(inquiry.preferredDate)
            ? formatDateTime(inquiry.preferredDate)
            : null,
        },
        {
          icon: FiClock,
          label: "Preferred time",
          value: inquiry.preferredTime,
        },
      ].filter((row) => hasValue(row.value));

    case "BROCHURE_DOWNLOAD":
      return [
        {
          icon: FiFileText,
          label: "Brochure",
          value: inquiry.brochureName || "Property brochure",
        },
      ].filter((row) => hasValue(row.value));

    case "PRICE_INQUIRY":
      return [
        {
          icon: FiDollarSign,
          label: "Budget",
          value: hasValue(inquiry.budget)
            ? formatCurrency(inquiry.budget)
            : null,
        },
        { icon: FiInfo, label: "Financing", value: inquiry.financing },
      ].filter((row) => hasValue(row.value));

    case "CONTACT_AGENT":
      return [
        {
          icon: FiUser,
          label: "Preferred agent",
          value: inquiry.preferredAgent,
        },
        { icon: FiInfo, label: "Reason", value: inquiry.reason },
      ].filter((row) => hasValue(row.value));

    default:
      return [];
  }
}

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

  // Lock background scroll while the drawer is open, and allow Escape to
  // close it — standard expectations for any modal/drawer.
  useEffect(() => {
    if (!inquiry) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [inquiry, onClose]);

  if (!inquiry) return null;

  const waNumber = (inquiry.phone || "").replace(/[^\d]/g, "");
  const customerRows = getCustomerRows(inquiry);
  const propertyRows = getPropertyRows(inquiry.property);
  const specificRows = getInquirySpecificRows(inquiry);
  const requestTypeLabel = formatRequestType(inquiry.requestType);

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
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand dark:text-brand-light">
            Inquiry detail
          </span>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <FiX className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-6">
          {/* 1. Inquiry header */}
          <div className="space-y-2.5">
            <div className="flex flex-wrap items-center gap-2">
              <RequestTypeBadge
                requestType={inquiry.requestType}
                tourType={inquiry.tourType}
              />
              {hasValue(inquiry.status) && (
                <span className="text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full bg-brand/10 text-brand dark:bg-brand/20 dark:text-brand-light">
                  {formatLabel(inquiry.status)}
                </span>
              )}
              {inquiry.isRead === false && (
                <span className="text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
                  Unread
                </span>
              )}
            </div>

            <h2 className="font-serif text-xl font-semibold text-zinc-900 dark:text-white">
              {inquiry.name || "Unnamed inquiry"}
            </h2>

            {hasValue(inquiry.createdAt) && (
              <p className="flex items-center gap-1.5 text-[11px] text-zinc-400 font-mono">
                <FiClock className="w-3 h-3" />
                Submitted {formatDateTime(inquiry.createdAt)}
              </p>
            )}
          </div>

          {/* 2. Customer information */}
          {customerRows.length > 0 && (
            <SectionCard icon={FiUser} title="Customer information">
              {customerRows.map((row) => (
                <InfoRow key={row.label} {...row} />
              ))}
              {waNumber && (
                <a
                  href={`https://wa.me/${waNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm font-medium text-emerald-600 hover:underline pt-1"
                >
                  <FiMessageCircle className="w-3.5 h-3.5" />
                  Message on WhatsApp
                </a>
              )}
            </SectionCard>
          )}

          {/* 3. Property information */}
          {inquiry.property?.title && (
            <SectionCard icon={FiHome} title="Property information">
              <Link
                href={`/properties/${inquiry.property.slug || ""}`}
                className="flex items-center gap-3 -mx-1 p-2 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors"
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
                <p className="text-sm font-semibold text-zinc-900 dark:text-white truncate">
                  {inquiry.property.title}
                </p>
              </Link>
              {propertyRows.map((row) => (
                <InfoRow key={row.label} {...row} />
              ))}
            </SectionCard>
          )}

          {/* 4. Message / request */}
          {hasValue(inquiry.message) && (
            <SectionCard icon={FiMessageCircle} title="Message">
              <p className="text-sm text-zinc-700 dark:text-zinc-200 leading-relaxed whitespace-pre-line">
                {inquiry.message}
              </p>
            </SectionCard>
          )}

          {/* 5. Inquiry-specific information */}
          {specificRows.length > 0 && (
            <SectionCard
              icon={FiInfo}
              title={`${requestTypeLabel || "Inquiry"} details`}
            >
              {specificRows.map((row) => (
                <InfoRow key={row.label} {...row} />
              ))}
            </SectionCard>
          )}

          {/* status + assign */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400 block mb-2">
                Status
              </span>
              <StatusDropdown
                value={inquiry.status}
                onChange={(status) => onStatusChange(inquiry._id, status)}
              />
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400 block mb-2">
                Assigned to
              </span>
              <select
                value={inquiry.assignedTo?._id || ""}
                onChange={(e) => onAssignChange(inquiry._id, e.target.value)}
                className="w-full text-xs bg-brand/5 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand"
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
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400 block mb-2">
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
                    <div className="flex items-center gap-1 mt-1.5 text-[10px] text-zinc-400 font-mono">
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
                className="flex-1 text-xs bg-brand/5 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand"
              />
              <button
                onClick={handleAddNote}
                disabled={savingNote || !noteText.trim()}
                aria-label="Add note"
                className="w-9 h-9 rounded-xl bg-brand text-white flex items-center justify-center hover:bg-brand-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0 cursor-pointer"
              >
                <FiSend className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 6. Submission information */}
          <SectionCard icon={FiCheckCircle} title="Submission information">
            <InfoRow icon={FiTag} label="Type" value={requestTypeLabel} />
            <InfoRow
              icon={FiCalendar}
              label="Submitted"
              value={
                hasValue(inquiry.createdAt)
                  ? formatDateTime(inquiry.createdAt)
                  : null
              }
            />
            {hasValue(inquiry.updatedAt) &&
              inquiry.updatedAt !== inquiry.createdAt && (
                <InfoRow
                  icon={FiClock}
                  label="Last updated"
                  value={formatDateTime(inquiry.updatedAt)}
                />
              )}
            <InfoRow
              icon={FiInfo}
              label="Source"
              value={formatLabel(inquiry.source)}
            />
          </SectionCard>

          {/* delete */}
          <button
            onClick={() => onDelete(inquiry._id)}
            className="flex items-center gap-2 text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 px-3 py-2.5 rounded-xl transition-colors cursor-pointer"
          >
            <FiTrash2 className="w-4 h-4" />
            Delete this inquiry
          </button>
        </div>
      </div>
    </div>
  );
}
