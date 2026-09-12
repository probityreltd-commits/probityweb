"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import {
  Search,
  Phone,
  Mail,
  Download,
  CheckCircle2,
  Loader2,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { fetchInquiries } from "@/services/api/inquiries";
import { formatRelativeTime } from "@/components/ui/dashboard-helpers";
import { exportLeadsToExcel, exportLeadsToPDF } from "@/lib/export/exportLeads";
import ExportLeadsButton from "@/components/admin/inquiries/ExportLeadsButton";

const PAGE_LIMIT = 20;
// Effectively "unlimited" for a single export fetch. Raise this if a single
// project ever realistically gets more brochure leads than this in one go.
const EXPORT_ALL_LIMIT = 5000;

const STATUS_BADGE_CLASS = {
  CONTACTED:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
  CLOSED: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300",
  NEW: "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
};

const statusBadgeClass = (status) =>
  STATUS_BADGE_CLASS[status] || STATUS_BADGE_CLASS.NEW;

const BrochureLeadsPanel = ({
  onOpen,
  onStatusChange,
  onDelete,
  onBulkStatus,
  onBulkDelete,
  onRefreshStats,
}) => {
  const [leads, setLeads] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);
  const [exportingAllType, setExportingAllType] = useState(null);

  useEffect(() => {
    const id = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(id);
  }, [search]);

  // A fresh search should reset back to page 1, otherwise a narrower
  // result set can leave the user stranded on an empty page.
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const loadLeads = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchInquiries({
        requestType: "BROCHURE_DOWNLOAD",
        search: debouncedSearch,
        page,
        limit: PAGE_LIMIT,
      });
      setLeads(res.data || []);
      setPagination(res.pagination || null);
      setSelectedIds([]);
    } catch (err) {
      toast.error(err.message || "Could not load brochure leads.");
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, page]);

  useEffect(() => {
    loadLeads();
  }, [loadLeads]);

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id],
    );
  };

  const toggleSelectAll = () => {
    setSelectedIds((prev) =>
      prev.length === leads.length ? [] : leads.map((lead) => lead._id),
    );
  };

  const handleMarkContacted = async () => {
    if (selectedIds.length === 0) return;
    // (ids, status) — matches the shared handler's signature on the parent page.
    const ok = await onBulkStatus?.(selectedIds, "CONTACTED");
    if (ok) {
      toast.success(`Marked ${selectedIds.length} lead(s) as contacted.`);
      setSelectedIds([]);
      loadLeads();
      onRefreshStats?.();
    }
  };

  const handleBulkDeleteLeads = async () => {
    if (selectedIds.length === 0) return;
    const ok = await onBulkDelete?.(selectedIds);
    if (ok) {
      setSelectedIds([]);
      loadLeads();
      onRefreshStats?.();
    }
  };

  const handleDeleteOne = async (id) => {
    const ok = await onDelete?.(id);
    if (ok) {
      setLeads((prev) => prev.filter((lead) => lead._id !== id));
      setSelectedIds((prev) => prev.filter((sid) => sid !== id));
      onRefreshStats?.();
    }
  };

  // Exports every brochure lead matching the current search — not just the
  // current page — by fetching a fresh, high-limit page straight from the API.
  const handleExportAllFiltered = async (type) => {
    setExportingAllType(type);
    try {
      const res = await fetchInquiries({
        requestType: "BROCHURE_DOWNLOAD",
        search: debouncedSearch,
        page: 1,
        limit: EXPORT_ALL_LIMIT,
      });
      const all = res.data || [];
      if (all.length === 0) {
        toast.error("No leads to export.");
        return;
      }
      if (type === "xlsx") {
        exportLeadsToExcel(all);
      } else {
        exportLeadsToPDF(all);
      }
      toast.success(`Exported ${all.length} lead(s).`);
    } catch (err) {
      toast.error(err.message || "Could not export leads.");
    } finally {
      setExportingAllType(null);
    }
  };

  const selectedLeadObjects = leads.filter((lead) =>
    selectedIds.includes(lead._id),
  );

  const totalPages = pagination?.totalPages || 1;

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, phone, or property..."
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs sm:text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-brand transition-all"
          />
        </div>

        <ExportLeadsButton
          label="Export All"
          onExport={handleExportAllFiltered}
          loading={exportingAllType !== null}
          disabled={leads.length === 0}
        />
      </div>

      {/* Bulk action bar — shown only when leads are selected */}
      {selectedIds.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 p-3 rounded-xl bg-brand/5 dark:bg-brand-light/10 border border-brand/20 dark:border-brand-light/30">
          <span className="text-xs sm:text-sm font-semibold text-brand dark:text-brand-light">
            {selectedIds.length} selected
          </span>
          <button
            onClick={handleMarkContacted}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] sm:text-xs font-semibold transition-colors cursor-pointer"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Mark Contacted
          </button>

          <ExportLeadsButton
            leads={selectedLeadObjects}
            label="Export Selected"
          />

          <button
            onClick={handleBulkDeleteLeads}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 text-[11px] sm:text-xs font-semibold hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors ml-auto cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete
          </button>
        </div>
      )}

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-6 h-6 text-brand animate-spin" />
        </div>
      ) : leads.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
          <Download className="w-9 h-9 text-zinc-300 dark:text-zinc-700 mb-3" />
          <p className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
            No brochure leads yet
          </p>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1 max-w-xs">
            When visitors download a project brochure, they will show up here
            for follow-up.
          </p>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden md:block rounded-2xl border border-zinc-200/80 dark:border-zinc-800 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
                <tr>
                  <th className="w-10 px-4 py-3">
                    <input
                      type="checkbox"
                      checked={
                        selectedIds.length === leads.length && leads.length > 0
                      }
                      onChange={toggleSelectAll}
                      className="accent-brand w-4 h-4 cursor-pointer"
                    />
                  </th>
                  <th className="text-left px-3 py-3 text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    Lead
                  </th>
                  <th className="text-left px-3 py-3 text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    Property
                  </th>
                  <th className="text-left px-3 py-3 text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    Downloaded
                  </th>
                  <th className="text-left px-3 py-3 text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    Status
                  </th>
                  <th className="w-20 px-3 py-3 text-right text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {leads.map((lead) => (
                  <tr
                    key={lead._id}
                    className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(lead._id)}
                        onChange={() => toggleSelect(lead._id)}
                        className="accent-brand w-4 h-4 cursor-pointer"
                      />
                    </td>
                    <td className="px-3 py-3">
                      <button
                        type="button"
                        onClick={() => onOpen?.(lead)}
                        className="font-semibold text-zinc-900 dark:text-white hover:text-brand dark:hover:text-brand-light text-left cursor-pointer"
                      >
                        {lead.name}
                        {!lead.isRead && (
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand ml-1.5 align-middle" />
                        )}
                      </button>
                      <div className="flex items-center gap-3 mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                        <a
                          href={`tel:${lead.phone}`}
                          className="flex items-center gap-1 hover:text-brand dark:hover:text-brand-light"
                        >
                          <Phone className="w-3 h-3" /> {lead.phone}
                        </a>
                        {lead.email && (
                          <a
                            href={`mailto:${lead.email}`}
                            className="flex items-center gap-1 hover:text-brand dark:hover:text-brand-light truncate max-w-[160px]"
                          >
                            <Mail className="w-3 h-3 shrink-0" />{" "}
                            <span className="truncate">{lead.email}</span>
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        <div className="relative w-8 h-8 rounded-lg overflow-hidden shrink-0 bg-zinc-100 dark:bg-zinc-800">
                          {lead.property?.coverImage && (
                            <Image
                              src={lead.property.coverImage}
                              alt={lead.property.title}
                              fill
                              sizes="32px"
                              className="object-cover"
                            />
                          )}
                        </div>
                        <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300 truncate max-w-[140px]">
                          {lead.property?.title || "—"}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-xs font-mono text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
                      {formatRelativeTime(lead.createdAt)}
                    </td>
                    <td className="px-3 py-3">
                      <select
                        value={lead.status}
                        onChange={(e) =>
                          onStatusChange?.(lead._id, e.target.value)
                        }
                        className={`text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand ${statusBadgeClass(
                          lead.status,
                        )}`}
                      >
                        <option value="NEW">New</option>
                        <option value="CONTACTED">Contacted</option>
                        <option value="CLOSED">Closed</option>
                      </select>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => onOpen?.(lead)}
                          title="View details"
                          className="p-1.5 rounded-lg text-zinc-400 hover:text-brand hover:bg-brand/10 dark:hover:text-brand-light dark:hover:bg-brand-light/10 transition-colors cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteOne(lead._id)}
                          title="Delete"
                          className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-2.5">
            {leads.map((lead) => (
              <div
                key={lead._id}
                className="rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <label className="flex items-start gap-2.5 min-w-0">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(lead._id)}
                      onChange={() => toggleSelect(lead._id)}
                      className="accent-brand w-4 h-4 mt-0.5 cursor-pointer shrink-0"
                    />
                    <button
                      type="button"
                      onClick={() => onOpen?.(lead)}
                      className="min-w-0 text-left cursor-pointer"
                    >
                      <p className="text-sm font-bold text-zinc-900 dark:text-white truncate">
                        {lead.name}
                        {!lead.isRead && (
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand ml-1.5 align-middle" />
                        )}
                      </p>
                      <p className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500">
                        {formatRelativeTime(lead.createdAt)}
                      </p>
                    </button>
                  </label>

                  <select
                    value={lead.status}
                    onChange={(e) => onStatusChange?.(lead._id, e.target.value)}
                    className={`text-[9px] font-bold uppercase tracking-wide px-2 py-1 rounded-full border-0 shrink-0 focus:outline-none focus:ring-2 focus:ring-brand ${statusBadgeClass(
                      lead.status,
                    )}`}
                  >
                    <option value="NEW">New</option>
                    <option value="CONTACTED">Contacted</option>
                    <option value="CLOSED">Closed</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 mt-2.5 p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/50">
                  <div className="relative w-7 h-7 rounded-md overflow-hidden shrink-0 bg-zinc-200 dark:bg-zinc-700">
                    {lead.property?.coverImage && (
                      <Image
                        src={lead.property.coverImage}
                        alt={lead.property.title}
                        fill
                        sizes="28px"
                        className="object-cover"
                      />
                    )}
                  </div>
                  <span className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300 truncate">
                    {lead.property?.title || "—"}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2 mt-2.5">
                  <div className="flex items-center gap-4 text-[11px] text-zinc-600 dark:text-zinc-400 min-w-0">
                    <a
                      href={`tel:${lead.phone}`}
                      className="flex items-center gap-1.5 hover:text-brand dark:hover:text-brand-light shrink-0"
                    >
                      <Phone className="w-3.5 h-3.5" /> {lead.phone}
                    </a>
                    {lead.email && (
                      <a
                        href={`mailto:${lead.email}`}
                        className="flex items-center gap-1.5 hover:text-brand dark:hover:text-brand-light truncate"
                      >
                        <Mail className="w-3.5 h-3.5 shrink-0" />{" "}
                        <span className="truncate">{lead.email}</span>
                      </a>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteOne(lead._id)}
                    title="Delete"
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors shrink-0 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex items-center gap-1 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 text-xs font-semibold text-zinc-600 dark:text-zinc-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Prev
              </button>
              <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="flex items-center gap-1 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 text-xs font-semibold text-zinc-600 dark:text-zinc-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer"
              >
                Next <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BrochureLeadsPanel;
