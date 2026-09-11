import Image from "next/image";

export default function ContactHero() {
  return (
    <section className="relative bg-slate-900 pt-28 sm:pt-32 lg:pt-32 pb-24 sm:pb-32 lg:pb-36 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Pattern / Architecture Image */}
      <div className="absolute inset-0 z-0 opacity-15">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600"
          alt="Modern Architecture Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/90 to-slate-900" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-2.5 sm:space-y-3">
        <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-brand-light">
          GET IN TOUCH
        </span>

        <h1 className="text-2xl sm:text-5xl font-extrabold text-white tracking-tight max-w-2xl leading-tight">
          Let&apos;s Talk About <br />
          Your Next Property
        </h1>

        <p className="text-[11px] sm:text-sm text-slate-300 max-w-lg leading-relaxed pt-1">
          Connect with our team of specialists to discuss your architectural
          needs, investment opportunities, or schedule a private viewing.
        </p>

        {/* Breadcrumb Trail */}
        <div className="pt-3 sm:pt-4 flex items-center gap-2 text-[10px] sm:text-[11px] font-medium text-slate-400">
          <span className="hover:text-white transition-colors cursor-pointer">
            HOME
          </span>
          <span>/</span>
          <span className="text-brand-light">CONTACT</span>
        </div>
      </div>
    </section>
  );
}
