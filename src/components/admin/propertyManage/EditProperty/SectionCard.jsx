const SectionCard = ({
  number,
  title,
  description,
  rightElement,
  children,
}) => (
  <section className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-2xl p-5 sm:p-6">
    <div className="flex items-start gap-3 mb-5">
      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-violet-100 dark:bg-violet-950/50 text-[#3b1a83] dark:text-violet-300 flex items-center justify-center text-xs font-bold">
        {number}
      </span>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
          {title}
        </h3>
        {description && (
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {rightElement}
    </div>
    <div>{children}</div>
  </section>
);

export default SectionCard;
