import Link from "next/link";

export default function ContactCTA() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-200 text-center space-y-3 sm:space-y-4">
      <h2 className="text-xl sm:text-4xl font-extrabold text-brand tracking-tight">
        Have a Property in Mind?
      </h2>
      <p className="text-[11px] sm:text-sm text-slate-500 max-w-md mx-auto">
        Our team is ready to help you find the right space.
      </p>
      <div className="pt-1 sm:pt-2">
        <Link
          href="/properties"
          className="inline-block w-full sm:w-auto px-6 py-2.5 border border-brand text-brand hover:bg-brand hover:text-white rounded-lg text-xs font-semibold transition-colors"
        >
          Explore Properties
        </Link>
      </div>
    </section>
  );
}
