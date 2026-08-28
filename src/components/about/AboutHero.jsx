import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function AboutHero() {
  return (
    <section className="relative pt-10 h-[260px] sm:h-[320px] md:h-[380px] w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600"
          alt="Modern Architectural Home"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-90"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#050810] via-transparent to-[#050810]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050810]/85 via-transparent to-[#050810]/90" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto space-y-3">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center justify-center gap-1.5 text-xs sm:text-sm text-slate-300"
        >
          <Link
            href="/"
            className="text-white hover:text-slate-200 transition-colors"
          >
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-slate-400">About us</span>
        </nav>

        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
          A Legacy of Delivering Excellence
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-light leading-relaxed">
          Twenty years in business, ten in real estate, and one commitment:
          homes built for the life you actually live.
        </p>
      </div>
    </section>
  );
}
