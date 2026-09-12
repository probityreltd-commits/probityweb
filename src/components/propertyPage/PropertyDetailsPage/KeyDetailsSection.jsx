import { Building2 } from "lucide-react";

const KeyDetailsSection = ({ property, keyDetailsList, listedLabel }) => (
  <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-7 border border-zinc-200/80 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md shadow-sm">
    <h2 className="font-serif text-lg sm:text-2xl font-semibold text-zinc-900 dark:text-white pb-3 sm:pb-4 mb-4 sm:mb-6 border-b border-zinc-200/80 dark:border-zinc-800">
      Key Details
    </h2>

    {/* Details Table */}
    <div className="rounded-xl sm:rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 overflow-hidden">
      {keyDetailsList.map((item, index) => (
        <div
          key={index}
          className={`flex items-center justify-between gap-4 px-3.5 sm:px-5 py-2.5 sm:py-3 ${
            index % 2 === 0
              ? "bg-zinc-50/60 dark:bg-zinc-800/30"
              : "bg-transparent"
          }`}
        >
          <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400 shrink-0">
            {item.label}
          </span>
          <span className="text-xs sm:text-sm font-bold text-brand dark:text-indigo-400 text-right">
            {item.value}
          </span>
        </div>
      ))}
    </div>

    {/* Overview */}
    {property?.description && (
      <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-zinc-200/80 dark:border-zinc-800">
        <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 block mb-1.5 sm:mb-2">
          Overview
        </span>
        <p className="text-[13px] sm:text-[15px] text-zinc-600 dark:text-zinc-300 leading-relaxed">
          {property.description}
        </p>
      </div>
    )}

    {/* Registered Address */}
    {property?.address && (
      <div className="flex items-start gap-2.5 mt-4 sm:mt-6 pt-4 sm:pt-5 border-t border-zinc-200/80 dark:border-zinc-800">
        <Building2 className="w-4 h-4 text-brand dark:text-indigo-400 mt-0.5 shrink-0" />
        <div>
          <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400 block mb-1">
            Registered address
          </span>
          <span className="text-xs sm:text-sm text-zinc-800 dark:text-zinc-100">
            {property.address}
          </span>
        </div>
      </div>
    )}

    {listedLabel && (
      <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mt-4 sm:mt-6">
        Listed {listedLabel}
      </p>
    )}
  </div>
);

export default KeyDetailsSection;
