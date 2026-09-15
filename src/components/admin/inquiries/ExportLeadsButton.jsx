"use client";

import { useState } from "react";
import { toast } from "sonner";
import { FileDown, Loader2 } from "lucide-react";
import { exportLeadsToPDF } from "@/lib/export/exportLeads";

/**
 * PDF-only export button.
 * Two usage modes:
 * 1. `leads` provided directly (e.g. "Export Selected") — exports immediately.
 * 2. `onExport` provided instead (e.g. "Export All") — parent fetches the
 *    full filtered set first, then calls exportLeadsToPDF itself.
 */
export default function ExportLeadsButton({
  leads,
  onExport,
  label = "Export PDF",
  loading: externalLoading,
  disabled,
  variant = "outline",
}) {
  const [internalLoading, setInternalLoading] = useState(false);
  const loading = externalLoading ?? internalLoading;

  const handleClick = async () => {
    if (loading || disabled) return;

    if (onExport) {
      await onExport("pdf");
      return;
    }

    if (!leads || leads.length === 0) {
      toast.error("No leads to export.");
      return;
    }

    setInternalLoading(true);
    try {
      exportLeadsToPDF(leads);
      toast.success(`Exported ${leads.length} lead(s).`);
    } catch (err) {
      toast.error(err.message || "Could not export leads.");
    } finally {
      setInternalLoading(false);
    }
  };

  const baseClasses =
    "flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shrink-0";

  const variantClasses =
    variant === "outline"
      ? "border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 bg-white dark:bg-zinc-900"
      : "bg-brand hover:bg-brand-dark text-white";

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading || disabled}
      className={`${baseClasses} ${variantClasses}`}
    >
      {loading ? (
        <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" />
      ) : (
        <FileDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      )}
      <span>{label}</span>
    </button>
  );
}
