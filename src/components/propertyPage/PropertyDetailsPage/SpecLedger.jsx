const SpecLedger = ({ stats, propertyId }) => (
  <div className="relative sm:-mt-10 mt-4 mx-auto sm:mx-6 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 shadow-2xl px-5 sm:px-8 py-6 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md">
    <div className="flex items-center justify-between mb-4">
      <span className="ledger-font text-[10px] uppercase tracking-[0.25em] text-[#431780] dark:text-violet-300">
        Survey &amp; Specification
      </span>
      {propertyId && (
        <span className="ledger-font text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
          Ref. {String(propertyId).slice(-8)}
        </span>
      )}
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-6">
      {stats.map(({ icon: Icon, label, value }) => (
        <div key={label} className="flex flex-col">
          <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
            <Icon className="w-3.5 h-3.5" />
            <span className="ledger-font text-[10px] uppercase tracking-widest">
              {label}
            </span>
          </div>
          <div className="leader-line" />
          <span className="display-font text-lg sm:text-xl font-semibold text-zinc-900 dark:text-white">
            {value}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default SpecLedger;
