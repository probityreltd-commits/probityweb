import Link from "next/link";

const TopBar = ({ title }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2 text-[11px] ledger-font uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
      <Link
        href="/"
        className="hover:text-[#431780] dark:hover:text-violet-300 transition-colors"
      >
        Home
      </Link>
      <span>/</span>
      <Link
        href="/properties"
        className="hover:text-[#431780] dark:hover:text-violet-300 transition-colors"
      >
        Properties
      </Link>
      <span>/</span>
      <span className="text-zinc-800 dark:text-zinc-100 normal-case tracking-normal truncate max-w-[160px] sm:max-w-xs">
        {title}
      </span>
    </div>
  </div>
);

export default TopBar;
