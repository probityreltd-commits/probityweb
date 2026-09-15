"use client";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// can't read CSS variables at runtime.
const BRAND_RGB = [59, 26, 131]; // #3b1a83
const BACKGROUND_RGB = [245, 241, 255]; // #f5f1ff

const EXPORT_COLUMNS = [
  { key: "name", label: "Name" },
  { key: "phone", label: "Phone" },
  { key: "email", label: "Email" },
  { key: "property", label: "Property" },
  { key: "date", label: "Downloaded On" },
];

function formatDate(value) {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatLeadRow(lead) {
  return {
    name: lead?.name || "—",
    phone: lead?.phone || "—",
    email: lead?.email || "—",
    property: lead?.property?.title || "—",
    date: formatDate(lead?.createdAt),
  };
}

function timestamp() {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Downloads the given leads as a simple table-format PDF.
 */
export function exportLeadsToPDF(leads, filename = "brochure-leads") {
  if (!leads?.length) return;

  const rows = leads.map(formatLeadRow);
  const doc = new jsPDF({ orientation: "landscape" });

  doc.setFontSize(14);
  doc.setTextColor(BRAND_RGB[0], BRAND_RGB[1], BRAND_RGB[2]);
  doc.text("Brochure Download Leads", 14, 16);

  doc.setFontSize(9);
  doc.setTextColor(120, 120, 120);
  doc.text(
    `Exported on ${formatDate(new Date())} · ${leads.length} lead${
      leads.length > 1 ? "s" : ""
    }`,
    14,
    22,
  );

  autoTable(doc, {
    startY: 28,
    head: [EXPORT_COLUMNS.map((c) => c.label)],
    body: rows.map((r) => EXPORT_COLUMNS.map((c) => r[c.key])),
    headStyles: { fillColor: BRAND_RGB, textColor: 255 },
    styles: { fontSize: 9, cellPadding: 3 },
    alternateRowStyles: { fillColor: BACKGROUND_RGB },
  });

  doc.save(`${filename}-${timestamp()}.pdf`);
}
