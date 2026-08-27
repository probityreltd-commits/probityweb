"use client";

import {
  STATUS_CONFIG,
  STATUS_ORDER,
} from "@/services/constants/inquiryConstants";

export default function StatusDropdown({ value, onChange, disabled = false }) {
  const config = STATUS_CONFIG[value] || STATUS_CONFIG.NEW;

  return (
    <select
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      onClick={(e) => e.stopPropagation()} // don't trigger the row's onClick (open drawer)
      className={`text-[11px] font-semibold uppercase tracking-wide ledger-font rounded-full border pl-2.5 pr-6 py-1.5 outline-none focus:ring-2 focus:ring-[#431780] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${config.badge}`}
    >
      {STATUS_ORDER.map((key) => (
        <option key={key} value={key} className="text-zinc-900 bg-white">
          {STATUS_CONFIG[key].label}
        </option>
      ))}
    </select>
  );
}
