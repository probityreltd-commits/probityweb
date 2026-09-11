"use client";

import React from "react";
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
    <section className="py-10 sm:py-16 lg:py-24 px-4 sm:px-6 max-w-5xl mx-auto space-y-8 sm:space-y-12 lg:space-y-16">
      {/* Section Header */}
      <div className="text-center space-y-1.5 sm:space-y-2">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-brand dark:text-indigo-400 block"
        >
          OUR JOURNEY
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="font-serif text-2xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight"
        >
          Milestones of Excellence
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-1.5 sm:mt-2 text-[11px] sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-md mx-auto"
        >
          Where Nestora began, and where it is headed.
        </motion.p>
      </div>

      {/* Timeline Container */}
      <div className="relative">
        {/* Center Vertical Line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-zinc-200 dark:bg-zinc-800 hidden md:block" />

        <div className="space-y-8 md:space-y-16">
          {milestones.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative flex flex-col md:flex-row items-center justify-between gap-4 md:gap-12 group"
              >
                {/* Timeline Node Center Dot */}
                <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-brand dark:bg-indigo-400 z-10 hidden md:block shadow-[0_0_0_6px_rgba(59,26,131,0.15)] dark:shadow-[0_0_0_6px_rgba(129,140,248,0.2)]" />

                {/* Column 1 */}
                <div
                  className={`w-full md:w-1/2 ${
                    isEven
                      ? "md:pr-12 md:text-right flex flex-col items-start md:items-end"
                      : "md:pl-12 order-2 md:order-1"
                  }`}
                >
                  {isEven ? (
                    <div className="space-y-2 sm:space-y-2.5 max-w-sm">
                      <span className="inline-block px-2.5 py-0.5 sm:px-3 sm:py-1 bg-brand/10 text-brand dark:bg-indigo-400/20 dark:text-indigo-300 text-[10px] sm:text-[11px] font-bold rounded-md tracking-wider">
                        {item.year}
                      </span>
                      <h3 className="text-sm sm:text-lg font-serif font-bold text-zinc-900 dark:text-white group-hover:text-brand dark:group-hover:text-indigo-400 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-[11px] sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ) : (
                    <div className="relative aspect-[16/10] w-full max-w-md rounded-xl sm:rounded-2xl overflow-hidden border border-zinc-200/80 dark:border-zinc-800 shadow-sm group-hover:shadow-md transition-all duration-300">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    </div>
                  )}
                </div>

                {/* Column 2 */}
                <div
                  className={`w-full md:w-1/2 ${
                    isEven
                      ? "md:pl-12 order-2 md:order-2"
                      : "md:pr-12 md:text-right order-1 md:order-2 flex flex-col items-start md:items-end"
                  }`}
                >
                  {isEven ? (
                    <div className="relative aspect-[16/10] w-full max-w-md rounded-xl sm:rounded-2xl overflow-hidden border border-zinc-200/80 dark:border-zinc-800 shadow-sm group-hover:shadow-md transition-all duration-300">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    </div>
                  ) : (
                    <div className="space-y-2 sm:space-y-2.5 max-w-sm">
                      <span className="inline-block px-2.5 py-0.5 sm:px-3 sm:py-1 bg-brand/10 text-brand dark:bg-indigo-400/20 dark:text-indigo-300 text-[10px] sm:text-[11px] font-bold rounded-md tracking-wider">
                        {item.year}
                      </span>
                      <h3 className="text-sm sm:text-lg font-serif font-bold text-zinc-900 dark:text-white group-hover:text-brand dark:group-hover:text-indigo-400 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-[11px] sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
