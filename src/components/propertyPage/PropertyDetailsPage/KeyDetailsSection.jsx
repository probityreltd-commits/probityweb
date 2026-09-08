import { Building2 } from "lucide-react";

const KeyDetailsSection = ({ property, keyDetailsList, listedLabel }) => (
  <div className="rounded-3xl p-6 sm:p-8 border border-zinc-200/80 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md shadow-sm">
    <h2 className="display-font text-xl sm:text-2xl font-semibold text-zinc-900 dark:text-white pb-4 mb-6 border-b border-zinc-200/80 dark:border-zinc-800">
      Key Details
    </h2>

    {property?.description && (
      <div className="mb-6 pb-6 border-b border-zinc-200/80 dark:border-zinc-800">
        <span className="ledger-font text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 block mb-2">
          Overview
        </span>
        <p className="text-sm sm:text-[15px] text-zinc-600 dark:text-zinc-300 leading-relaxed">
          {property.description}
        </p>
      </div>
    )}

    <div className="divide-y divide-zinc-200/60 dark:divide-zinc-800/60 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 overflow-hidden bg-zinc-50/40 dark:bg-zinc-900/40">
      {keyDetailsList.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-1 sm:grid-cols-12 px-5 py-3.5 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 transition-colors gap-1 sm:gap-4 items-center"
        >
          <span className="sm:col-span-5 ledger-font text-[11px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            {item.label}
          </span>
          <span className="sm:col-span-7 text-sm font-medium text-zinc-900 dark:text-zinc-100">
            {item.value}
          </span>
        </div>
      ))}
    </div>

    {property?.address && (
      <div className="flex items-start gap-2.5 mt-6 pt-5 border-t border-zinc-200/80 dark:border-zinc-800">
        <Building2 className="w-4 h-4 text-[#431780] dark:text-violet-300 mt-0.5 shrink-0" />
        <div>
          <span className="ledger-font text-[10px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400 block mb-1">
            Registered address
          </span>
          <span className="text-sm text-zinc-800 dark:text-zinc-100">
            {property.address}
          </span>
        </div>
      </div>
    )}

    {listedLabel && (
      <p className="ledger-font text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mt-6">
        Listed {listedLabel}
      </p>
    )}
  </div>
);

export default KeyDetailsSection;
