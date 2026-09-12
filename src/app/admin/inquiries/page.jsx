"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Download } from "lucide-react";

import FilterBar from "@/components/admin/inquiries/FilterBar";
import SummaryCards from "@/components/admin/inquiries/SummaryCards";
import BulkActionBar from "@/components/admin/inquiries/BulkActionBar";
import InquiriesTable from "@/components/admin/inquiries/InquiriesTable";
import InquiryDetailDrawer from "@/components/admin/inquiries/InquiryDetailDrawer";
import BrochureLeadsPanel from "@/components/admin/inquiries/BrochureLeadsPanel";
import {
  fetchInquiries,
  fetchInquiryById,
  fetchInquiryStats,
} from "@/services/api/inquiries";
import {
  addInquiryNote,
  bulkDeleteInquiries,
  bulkUpdateStatus,
  deleteInquiry,
  updateInquiry,
} from "@/services/action/inquiries";

const DEFAULT_FILTERS = {
  status: "",
  requestType: "",
  dateFrom: "",
  dateTo: "",
  search: "",
};

const TABS = [
  { key: "ALL", label: "All Inquiries" },
  { key: "BROCHURE_LEADS", label: "Brochure Leads" },
];

export default function InquiriesPage() {
  const [activeTab, setActiveTab] = useState("ALL");

  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);

  const [inquiries, setInquiries] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);

  const [selectedIds, setSelectedIds] = useState([]);
  const [activeInquiry, setActiveInquiry] = useState(null);

  // Debounce the free-text search input
  useEffect(() => {
    const id = setTimeout(() => setDebouncedSearch(filters.search), 400);
    return () => clearTimeout(id);
  }, [filters.search]);

  // A fresh search should always start back at page 1, otherwise a
  // narrower result set can leave the user stranded on an empty page.
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  // Selection is scoped per tab — don't let a leftover selection from
  // "All Inquiries" leak into the Brochure Leads context or vice versa.
  useEffect(() => {
    setSelectedIds([]);
  }, [activeTab]);

  const loadInquiries = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchInquiries({
        status: filters.status,
        requestType: filters.requestType,
        dateFrom: filters.dateFrom,
        dateTo: filters.dateTo,
        search: debouncedSearch,
        page,
        limit: 20,
      });
      setInquiries(res.data);
      setPagination(res.pagination);
      setSelectedIds([]);
    } catch (err) {
      toast.error(err.message || "Could not load inquiries.");
    } finally {
      setLoading(false);
    }
  }, [
    filters.status,
    filters.requestType,
    filters.dateFrom,
    filters.dateTo,
    debouncedSearch,
    page,
  ]);

  const loadStats = useCallback(async () => {
    setStatsLoading(true);
    try {
      const res = await fetchInquiryStats();
      setStats(res.data);
    } catch (err) {
      toast.error(err.message || "Could not load stats.");
    } finally {
      setStatsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (activeTab === "ALL") loadInquiries();
  }, [loadInquiries, activeTab]);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  const handleFilterChange = (next) => {
    setFilters(next);
    setPage(1);
  };

  const handleResetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setPage(1);
  };

  const patchLocalInquiry = (id, patch) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq._id === id ? { ...inq, ...patch } : inq)),
    );
    setActiveInquiry((prev) =>
      prev && prev._id === id ? { ...prev, ...patch } : prev,
    );
  };

  const handleStatusChange = async (id, status) => {
    patchLocalInquiry(id, { status });
    try {
      await updateInquiry(id, { status });
      toast.success("Status updated.");
      loadStats();
      return true;
    } catch (err) {
      toast.error(err.message || "Could not update status.");
      if (activeTab === "ALL") loadInquiries();
      return false;
    }
  };

  const handleAssignChange = async (id, assignedToId) => {
    try {
      const res = await updateInquiry(id, { assignedTo: assignedToId || null });
      patchLocalInquiry(id, { assignedTo: res.data.assignedTo });
      toast.success("Assignment updated.");
    } catch (err) {
      toast.error(err.message || "Could not update assignment.");
    }
  };

  const handleAddNote = async (id, text) => {
    try {
      const res = await addInquiryNote(id, text);
      patchLocalInquiry(id, { internalNotes: res.data.internalNotes });
      toast.success("Note added.");
    } catch (err) {
      toast.error(err.message || "Could not add note.");
    }
  };

  const handleOpenInquiry = async (inquiry) => {
    setActiveInquiry(inquiry);
    if (!inquiry.isRead) {
      setInquiries((prev) =>
        prev.map((inq) =>
          inq._id === inquiry._id ? { ...inq, isRead: true } : inq,
        ),
      );
    }
    try {
      const res = await fetchInquiryById(inquiry._id);
      setActiveInquiry(res.data);
      loadStats();
    } catch {
      // keep the optimistic local copy open even if the refetch fails
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this inquiry? This cannot be undone.")) return false;
    try {
      await deleteInquiry(id);
      setInquiries((prev) => prev.filter((inq) => inq._id !== id));
      setActiveInquiry((prev) => (prev && prev._id === id ? null : prev));
      toast.success("Inquiry deleted.");
      loadStats();
      return true;
    } catch (err) {
      toast.error(err.message || "Could not delete inquiry.");
      return false;
    }
  };

  const handleToggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id],
    );
  };

  const handleToggleSelectAll = () => {
    setSelectedIds((prev) =>
      prev.length === inquiries.length ? [] : inquiries.map((inq) => inq._id),
    );
  };

  const handleBulkStatus = async (ids, status) => {
    if (!ids?.length) return false;
    try {
      await bulkUpdateStatus(ids, status);
      toast.success(`Updated ${ids.length} inquiries.`);
      if (activeTab === "ALL") {
        setSelectedIds([]);
        loadInquiries();
      }
      loadStats();
      return true;
    } catch (err) {
      toast.error(err.message || "Bulk update failed.");
      return false;
    }
  };

  const handleBulkDelete = async (ids) => {
    if (!ids?.length) return false;
    if (!confirm(`Delete ${ids.length} inquiries? This cannot be undone.`))
      return false;
    try {
      await bulkDeleteInquiries(ids);
      toast.success(`Deleted ${ids.length} inquiries.`);
      if (activeTab === "ALL") {
        setSelectedIds([]);
        loadInquiries();
      }
      loadStats();
      return true;
    } catch (err) {
      toast.error(err.message || "Bulk delete failed.");
      return false;
    }
  };

  const brochureCount = stats?.byRequestType?.BROCHURE_DOWNLOAD ?? null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-5 sm:space-y-6">
      {/* Header */}
      <div>
        <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-brand dark:text-brand-light">
          Admin · Leads
        </span>
        <h1 className="font-serif text-xl sm:text-3xl font-semibold text-zinc-900 dark:text-white mt-1">
          Inquiries
        </h1>
      </div>

      <SummaryCards stats={stats} loading={statsLoading} />

      {/* Tab Switcher */}
      <div className="flex gap-1.5 sm:gap-2 border-b border-zinc-200 dark:border-zinc-800 overflow-x-auto hide-scrollbar">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`relative shrink-0 flex items-center gap-1.5 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
              activeTab === tab.key
                ? "text-brand dark:text-brand-light"
                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200"
            }`}
          >
            {tab.key === "BROCHURE_LEADS" && (
              <Download className="w-3.5 h-3.5" />
            )}
            {tab.label}
            {tab.key === "BROCHURE_LEADS" && brochureCount !== null && (
              <span className="text-[9px] sm:text-[10px] font-bold bg-brand/10 text-brand dark:bg-brand-light/10 dark:text-brand-light px-1.5 py-0.5 rounded-full">
                {brochureCount}
              </span>
            )}
            {activeTab === tab.key && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "ALL" ? (
        <>
          <FilterBar
            filters={filters}
            onChange={handleFilterChange}
            onReset={handleResetFilters}
          />

          <BulkActionBar
            count={selectedIds.length}
            onClear={() => setSelectedIds([])}
            onBulkStatus={(status) => handleBulkStatus(selectedIds, status)}
            onBulkDelete={() => handleBulkDelete(selectedIds)}
          />

          <InquiriesTable
            inquiries={inquiries}
            loading={loading}
            selectedIds={selectedIds}
            onToggleSelect={handleToggleSelect}
            onToggleSelectAll={handleToggleSelectAll}
            onOpen={handleOpenInquiry}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
            pagination={pagination}
            onPageChange={setPage}
          />
        </>
      ) : (
        <BrochureLeadsPanel
          onOpen={handleOpenInquiry}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
          onBulkStatus={handleBulkStatus}
          onBulkDelete={handleBulkDelete}
          onRefreshStats={loadStats}
        />
      )}

      {activeInquiry && (
        <InquiryDetailDrawer
          inquiry={activeInquiry}
          onClose={() => setActiveInquiry(null)}
          onStatusChange={handleStatusChange}
          onAssignChange={handleAssignChange}
          onAddNote={handleAddNote}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
