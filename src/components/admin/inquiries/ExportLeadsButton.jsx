"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  ChevronDown,
  Download,
  FileSpreadsheet,
  FileText,
  Loader2,
} from "lucide-react";
import { exportLeadsToExcel, exportLeadsToPDF } from "@/lib/export/exportLeads";

/**
 * Dropdown "Export" button for the Brochure Leads panel.
 *
 * Two modes:
 *   1. In-memory list — pass `leads` directly (e.g. the current selection):
 *        <ExportLeadsButton leads={selectedLeadObjects} label="Export Selected" />
 *
 *   2. Fetch-then-export — pass `onExport(type)` when the leads to export
 *      aren't fully loaded yet (e.g. exporting all filtered results beyond
 *      the current page). The callback owns its own fetch + toast/error
 *      handling and should call exportLeadsToExcel/exportLeadsToPDF itself:
 *        <ExportLeadsButton onExport={handleExportAllFiltered} label="Export All" />
 */
export default function ExportLeadsButton({
  leads = [],
  onExport,
  label = "Export",
  loading = false,
  disabled = false,
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const usingCallbackMode = typeof onExport === "function";
  const isDisabled =
    disabled || loading || (!usingCallbackMode && leads.length === 0);

  const handleExport = async (type) => {
    if (usingCallbackMode) {
      setOpen(false);
      await onExport(type);
      return;
    }
    if (leads.length === 0) {
      toast.error("No leads to export.");
      return;
    }
    if (type === "xlsx") {
      exportLeadsToExcel(leads);
      toast.success(`Exported ${leads.length} lead(s) as Excel.`);
    } else {
      exportLeadsToPDF(leads);
      toast.success(`Exported ${leads.length} lead(s) as PDF.`);
    }
    setOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        disabled={isDisabled}
        className="flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold bg-brand text-white hover:bg-brand-dark disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        {loading ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
        ) : (
          <Download className="w-3.5 h-3.5" />
        )}
        {label}
        {!usingCallbackMode && leads.length > 0 && (
          <span className="text-[10px] font-bold bg-white/20 px-1.5 py-0.5 rounded-full">
            {leads.length}
          </span>
        )}
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-1.5 w-48 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-lg z-20 overflow-hidden">
          <button
            type="button"
            onClick={() => handleExport("xlsx")}
            className="w-full flex items-center gap-2 px-3.5 py-2.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            Excel (.xlsx)
          </button>
          <button
            type="button"
            onClick={() => handleExport("pdf")}
            className="w-full flex items-center gap-2 px-3.5 py-2.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer border-t border-zinc-100 dark:border-zinc-800"
          >
            <FileText className="w-4 h-4 text-rose-600" />
            PDF
          </button>
        </div>
      )}
    </div>
  );
}
