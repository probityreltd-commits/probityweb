import Link from "next/link";

export default function ContactCTA() {
  return (
    <section className="py-20 px-6 lg:px-8 bg-white border-t border-slate-200 text-center space-y-4">
      <h2 className="text-2xl sm:text-4xl font-extrabold text-[#3b1a83] tracking-tight">
        Have a Property in Mind?
      </h2>
      <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
        Our team is ready to help you find the right space.
      </p>
      <div className="pt-2">
        <Link
          href="/properties"
          className="inline-block px-6 py-2.5 border border-purple-800 text-purple-900 hover:bg-purple-900 hover:text-white rounded-lg text-xs font-semibold transition-colors"
        >
          Explore Properties
        </Link>
      </div>
    </section>
  );
}
