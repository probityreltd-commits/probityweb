const SpecLedger = ({ stats, propertyId }) => (
  <div className="relative sm:-mt-10 mt-3 sm:mt-4 mx-auto sm:mx-6 rounded-2xl sm:rounded-3xl border border-zinc-200/80 dark:border-zinc-800 shadow-2xl px-4 sm:px-8 py-4 sm:py-6 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md">
    <div className="flex items-center justify-between mb-3 sm:mb-4">
      <span className="font-mono text-[9px] sm:text-[10px] lg:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-brand dark:text-indigo-400">
        Survey &amp; Specification
      </span>
      {propertyId && (
        <span className="font-mono text-[9px] sm:text-[10px] lg:text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
          Ref. {String(propertyId).slice(-8)}
        </span>
      )}
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-3 sm:gap-x-4 gap-y-4 sm:gap-y-6">
      {stats.map(({ icon: Icon, label, value }) => (
        <div key={label} className="flex flex-col">
          <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
            <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4" />
            <span className="font-mono text-[9px] sm:text-[11px] lg:text-xs uppercase tracking-widest">
              {label}
            </span>
          </div>
          <div className="leader-line" />
          <span className="font-serif text-base sm:text-xl lg:text-2xl font-semibold text-zinc-900 dark:text-white">
            {value}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default SpecLedger;
