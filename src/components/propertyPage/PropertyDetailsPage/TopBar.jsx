import Link from "next/link";

const TopBar = ({ title }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
      <Link
        href="/"
        className="hover:text-brand dark:hover:text-indigo-400 transition-colors"
      >
        Home
      </Link>
      <span>/</span>
      <Link
        href="/properties"
        className="hover:text-brand dark:hover:text-indigo-400 transition-colors"
      >
        Properties
      </Link>
      <span>/</span>
      <span className="text-zinc-800 dark:text-zinc-100 normal-case tracking-normal truncate max-w-[120px] sm:max-w-xs">
        {title}
      </span>
    </div>
  </div>
);

export default TopBar;
