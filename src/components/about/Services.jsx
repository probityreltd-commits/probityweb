"use client";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Services() {
  const services = [
    {
      title: "Property Buying",
      image:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=600",
    },
    {
      title: "Property Selling",
      image:
        "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=600",
    },
    {
      title: "Property Rental",
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600",
    },
    {
      title: "Property Management",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600",
    },
  ];

  return (
    <section className="py-10 sm:py-16 lg:py-24 max-w-7xl mx-auto space-y-6 sm:space-y-10">
      <div className="text-center max-w-3xl mx-auto px-4 sm:px-6 mb-6 sm:mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-2xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight"
        >
          Services We Provide
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-2 sm:mt-4 text-[11px] sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed"
        >
          Find the right solution with our comprehensive real estate options.
        </motion.p>
      </div>

      {/* Mobile: horizontal snap gallery | sm+: grid */}
      <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 overflow-x-auto sm:overflow-visible snap-x snap-mandatory px-4 sm:px-6 pb-2 sm:pb-0 no-scrollbar">
        {services.map((s, idx) => (
          <div
            key={idx}
            className="relative shrink-0 w-[68%] sm:w-auto aspect-[3/4] rounded-xl sm:rounded-2xl overflow-hidden border border-slate-800 group snap-center"
          >
            <Image
              src={s.image}
              alt={s.title}
              fill
              sizes="(max-width: 640px) 68vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
            <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 flex justify-between items-center text-white">
              <span className="text-xs sm:text-sm font-semibold">
                {s.title}
              </span>
              <div className="p-1.5 sm:p-2 rounded-full bg-slate-900/80 border border-slate-700">
                <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile scroll hint dots */}
      <div className="flex sm:hidden justify-center gap-1.5">
        {services.map((_, idx) => (
          <span
            key={idx}
            className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700"
          />
        ))}
      </div>
    </section>
  );
}
