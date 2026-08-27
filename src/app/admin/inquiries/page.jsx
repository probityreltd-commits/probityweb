"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import FilterBar from "@/components/admin/inquiries/FilterBar";
import SummaryCards from "@/components/admin/inquiries/SummaryCards";
import BulkActionBar from "@/components/admin/inquiries/BulkActionBar";
import InquiriesTable from "@/components/admin/inquiries/InquiriesTable";
import InquiryDetailDrawer from "@/components/admin/inquiries/InquiryDetailDrawer";
import {
  addInquiryNote,
  bulkDeleteInquiries,
  bulkUpdateStatus,
  deleteInquiry,
  fetchInquiries,
  fetchInquiryById,
  fetchInquiryStats,
  updateInquiry,
} from "@/services/api/inquiries";

const FONT_IMPORTS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
`;

const DEFAULT_FILTERS = {
  status: "",
  requestType: "",
  dateFrom: "",
  dateTo: "",
  search: "",
};

export default function InquiriesPage() {
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

  // TODO: replace with a real fetch of your agents/team list for the
  // "Assigned to" dropdown in the detail drawer, e.g. fetchAgents().
  const [agents] = useState([]);

  // debounce the free-text search box so it doesn't re-fetch on every keystroke
  useEffect(() => {
    const id = setTimeout(() => setDebouncedSearch(filters.search), 400);
    return () => clearTimeout(id);
  }, [filters.search]);

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
    loadInquiries();
  }, [loadInquiries]);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  // reset to page 1 whenever a filter changes
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
    } catch (err) {
      toast.error(err.message || "Could not update status.");
      loadInquiries(); // roll back by refetching
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
      const res = await fetchInquiryById(inquiry._id); // marks isRead server-side too
      setActiveInquiry(res.data);
      loadStats();
    } catch {
      // keep the optimistic local copy open even if the refetch fails
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this inquiry? This cannot be undone.")) return;
    try {
      await deleteInquiry(id);
      setInquiries((prev) => prev.filter((inq) => inq._id !== id));
      setActiveInquiry((prev) => (prev && prev._id === id ? null : prev));
      toast.success("Inquiry deleted.");
      loadStats();
    } catch (err) {
      toast.error(err.message || "Could not delete inquiry.");
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

  const handleBulkStatus = async (status) => {
    try {
      await bulkUpdateStatus(selectedIds, status);
      toast.success(`Updated ${selectedIds.length} inquiries.`);
      setSelectedIds([]);
      loadInquiries();
      loadStats();
    } catch (err) {
      toast.error(err.message || "Bulk update failed.");
    }
  };

  const handleBulkDelete = async () => {
    if (
      !confirm(`Delete ${selectedIds.length} inquiries? This cannot be undone.`)
    )
      return;
    try {
      await bulkDeleteInquiries(selectedIds);
      toast.success(`Deleted ${selectedIds.length} inquiries.`);
      setSelectedIds([]);
      loadInquiries();
      loadStats();
    } catch (err) {
      toast.error(err.message || "Bulk delete failed.");
    }
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{FONT_IMPORTS}</style>
      <style>{`
        .ledger-font { font-family: 'IBM Plex Mono', monospace; }
        .display-font { font-family: 'Fraunces', serif; }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* header */}
        <div>
          <span className="ledger-font text-[10px] uppercase tracking-[0.25em] text-[#431780] dark:text-violet-300">
            Admin · Leads
          </span>
          <h1 className="display-font text-2xl sm:text-3xl font-semibold text-zinc-900 dark:text-white mt-1">
            Inquiries
          </h1>
        </div>

        <SummaryCards stats={stats} loading={statsLoading} />

        <FilterBar
          filters={filters}
          onChange={handleFilterChange}
          onReset={handleResetFilters}
        />

        <BulkActionBar
          count={selectedIds.length}
          onClear={() => setSelectedIds([])}
          onBulkStatus={handleBulkStatus}
          onBulkDelete={handleBulkDelete}
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
      </div>

      {activeInquiry && (
        <InquiryDetailDrawer
          inquiry={activeInquiry}
          agents={agents}
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
