"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Milestones() {
  const milestones = [
    {
      year: "2027",
      title: "Next - Nestora Nibash",
      desc: "Our next address is on the way.",
      image:
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=800",
    },
    {
      year: "2026",
      title: "Today - Building in Bashundhara R/A",
      desc: "Four residences underway across Blocks A, M, and N: Dokkhina Lake, Prottasha, and the twin Nestora Valley, each designed for space, light, and everything close.",
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800",
    },
    {
      year: "2005",
      title: "The Beginning",
      desc: "Mamunur Rashid founded Nestora Holdings in Dhaka, bringing twenty years in business and a decade in real estate to a single idea: homes built around how families actually live.",
      image:
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=800",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 max-w-5xl mx-auto space-y-12">
      <div className="text-center space-y-1">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight"
        >
          Milestones of Excellence
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal"
        >
          Where Nestora began, and where it is headed.
        </motion.p>
      </div>

      <div className="relative">
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-slate-200 dark:bg-slate-800 hidden md:block" />

        <div className="space-y-16 md:space-y-20">
          {milestones.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                className="relative flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12"
              >
                <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-amber-400 z-10 hidden md:block shadow-[0_0_0_4px_rgba(251,191,36,0.15)]" />

                <div
                  className={`w-full md:w-1/2 ${
                    isEven
                      ? "md:pr-12 md:text-right flex flex-col items-start md:items-end"
                      : "md:pl-12 order-2 md:order-1"
                  }`}
                >
                  {isEven ? (
                    <div className="space-y-2 max-w-sm">
                      <span className="inline-block px-2.5 py-0.5 bg-amber-100 text-amber-800 dark:bg-amber-400/20 dark:text-amber-300 text-[11px] font-semibold rounded-sm">
                        {item.year}
                      </span>
                      <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ) : (
                    <div className="relative aspect-[16/10] w-full max-w-md rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>

                <div
                  className={`w-full md:w-1/2 ${
                    isEven
                      ? "md:pl-12 order-2 md:order-2"
                      : "md:pr-12 md:text-right order-1 md:order-2 flex flex-col items-start md:items-end"
                  }`}
                >
                  {isEven ? (
                    <div className="relative aspect-[16/10] w-full max-w-md rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="space-y-2 max-w-sm">
                      <span className="inline-block px-2.5 py-0.5 bg-amber-100 text-amber-800 dark:bg-amber-400/20 dark:text-amber-300 text-[11px] font-semibold rounded-sm">
                        {item.year}
                      </span>
                      <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
