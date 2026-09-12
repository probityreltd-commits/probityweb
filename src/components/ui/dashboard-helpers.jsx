export function formatRelativeTime(dateInput) {
  if (!dateInput) return "";
  const date = new Date(dateInput);
  if (Number.isNaN(date.getTime())) return "";

  const diffSec = Math.round((Date.now() - date.getTime()) / 1000);
  if (diffSec < 60) return "Just now";

  const diffMin = Math.round(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;

  const diffHour = Math.round(diffMin / 60);
  if (diffHour < 24) return `${diffHour}h ago`;

  const diffDay = Math.round(diffHour / 24);
  if (diffDay < 7) return `${diffDay}d ago`;

  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export const REQUEST_TYPE_META = {
  SCHEDULE_TOUR: {
    label: "Tour Request",
    colorClass:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
  },
  BROCHURE_DOWNLOAD: {
    label: "Brochure Download",
    colorClass:
      "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
  },
  GENERAL_INQUIRY: {
    label: "General Inquiry",
    colorClass:
      "bg-brand/10 text-brand dark:bg-indigo-950/40 dark:text-indigo-400",
  },
};

export const getRequestTypeMeta = (type) =>
  REQUEST_TYPE_META[type] || {
    label: type ? type.replaceAll("_", " ") : "Inquiry",
    colorClass: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300",
  };

export const STATUS_META = {
  NEW: {
    label: "New",
    colorClass:
      "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
  },
  CONTACTED: {
    label: "Contacted",
    colorClass:
      "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
  },
  CLOSED: {
    label: "Closed",
    colorClass: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300",
  },
};

export const getStatusMeta = (status) =>
  STATUS_META[status] || {
    label: status || "Unknown",
    colorClass: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300",
  };

export const getPropertyStatusMeta = (status) => {
  const key = status?.toUpperCase()?.replace(/\s+/g, "_");
  const map = {
    UPCOMING:
      "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
    ONGOING: "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
    READY:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
    SOLD_OUT: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300",
  };
  return (
    map[key] || "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
  );
};
