import {
  FiCircle,
  FiPhoneCall,
  FiCalendar,
  FiCheckCircle,
  FiXCircle,
  FiAlertTriangle,
} from "react-icons/fi";

export const BRAND = "#431780";

// Single source of truth for every status badge/dropdown/filter in the
// inquiries admin — label, icon, and Tailwind classes live together so a
// new status only needs to be added here.
export const STATUS_CONFIG = {
  NEW: {
    label: "New",
    icon: FiCircle,
    badge: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-300 dark:border-blue-500/30",
    dot: "bg-blue-500",
  },
  CONTACTED: {
    label: "Contacted",
    icon: FiPhoneCall,
    badge: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/30",
    dot: "bg-amber-500",
  },
  TOUR_SCHEDULED: {
    label: "Tour scheduled",
    icon: FiCalendar,
    badge: "bg-[#431780]/10 text-[#431780] border-[#431780]/30 dark:bg-violet-500/10 dark:text-violet-300 dark:border-violet-500/30",
    dot: "bg-[#431780]",
  },
  CONVERTED: {
    label: "Converted",
    icon: FiCheckCircle,
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/30",
    dot: "bg-emerald-500",
  },
  CLOSED_LOST: {
    label: "Closed — lost",
    icon: FiXCircle,
    badge: "bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700",
    dot: "bg-zinc-400",
  },
  SPAM: {
    label: "Spam",
    icon: FiAlertTriangle,
    badge: "bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-300 dark:border-red-500/30",
    dot: "bg-red-500",
  },
};

export const STATUS_ORDER = [
  "NEW",
  "CONTACTED",
  "TOUR_SCHEDULED",
  "CONVERTED",
  "CLOSED_LOST",
  "SPAM",
];

export const REQUEST_TYPE_CONFIG = {
  SCHEDULE_TOUR: { label: "Tour" },
  REQUEST_INFO: { label: "Info" },
};
