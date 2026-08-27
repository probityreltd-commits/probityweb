"use client";

import { STATUS_CONFIG } from "@/lib/constants/inquiryConstants";

export default function StatusBadge({ status, size = "sm" }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.NEW;
  const Icon = config.icon;

  const sizeClasses =
    size === "lg"
      ? "text-xs px-3 py-1.5 gap-1.5"
      : "text-[10px] px-2 py-1 gap-1";

  return (
    <span
      className={`inline-flex items-center ${sizeClasses} rounded-full border font-semibold uppercase tracking-wide ledger-font ${config.badge}`}
    >
      <Icon className={size === "lg" ? "w-3.5 h-3.5" : "w-3 h-3"} />
      {config.label}
    </span>
  );
}
