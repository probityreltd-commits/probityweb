import Link from "next/link";
import { PlusCircle, Building2, MessageSquare, Home } from "lucide-react";

const actions = [
  {
    href: "/admin/add-property",
    icon: PlusCircle,
    label: "Add Property",
    colorClass: "bg-brand text-white",
  },
  {
    href: "/admin/property",
    icon: Building2,
    label: "Manage Properties",
    colorClass:
      "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400",
  },
  {
    href: "/admin/inquiries",
    icon: MessageSquare,
    label: "View Inquiries",
    colorClass:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400",
  },
  {
    href: "/",
    icon: Home,
    label: "Visit Website",
    colorClass:
      "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400",
  },
];

const QuickActions = () => (
  <div className="rounded-2xl sm:rounded-3xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm p-4 sm:p-6">
    <h3 className="font-serif text-sm sm:text-lg font-bold text-zinc-900 dark:text-white mb-3 sm:mb-4">
      Quick Actions
    </h3>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
      {actions.map(({ href, icon: Icon, label, colorClass }) => (
        <Link
          key={label}
          href={href}
          className="flex flex-col items-center justify-center gap-2 rounded-xl sm:rounded-2xl border border-zinc-200/70 dark:border-zinc-800 p-3 sm:p-4 text-center hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
        >
          <div
            className={`w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl flex items-center justify-center ${colorClass}`}
          >
            <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <span className="text-[10px] sm:text-xs font-semibold text-zinc-700 dark:text-zinc-300 leading-tight">
            {label}
          </span>
        </Link>
      ))}
    </div>
  </div>
);

export default QuickActions;
