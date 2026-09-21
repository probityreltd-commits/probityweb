"use client";

import React from "react";
import Image from "next/image";
import { Compass, UserCheck, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function FoundingVision() {
  const points = [
    {
      icon: Compass,
      iconBg:
        "bg-purple-50 text-brand dark:bg-purple-950/40 dark:text-indigo-400 border border-purple-100 dark:border-purple-800/30",
      title: "CAREFUL DESIGN",
      description:
        "We give attention to small details: light in every room, fresh air, strong walls and a safe structure. Good design makes daily life easier.",
    },
    {
      icon: UserCheck,
      iconBg:
        "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/30",
      title: "MADE FOR FAMILIES",
      description:
        "Our homes are planned around real family life. We choose locations near schools, markets, mosques and hospitals.",
    },
    {
      icon: ShieldCheck,
      iconBg:
        "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-100 dark:border-amber-800/30",
      title: "BUILT TO LAST",
      description:
        "We use good materials and sound engineering. Your home stays strong, comfortable and keeps its value for many years.",
    },
  ];

  return (
    <section className="py-10 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
        {/* Left Content */}
        <div className="lg:col-span-6 space-y-6 lg:space-y-8">
          <div className="space-y-1.5 sm:space-y-2">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-brand dark:text-indigo-400 block"
            >
              OUR VISION
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="font-serif text-2xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-[1.15]"
            >
              Built on Honesty, <br className="hidden sm:inline" />
              Driven by Vision
            </motion.h2>
          </div>

          {/* Points List */}
          <div className="space-y-4 sm:space-y-6">
            {points.map((pt, index) => {
              const IconComponent = pt.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.15 + index * 0.1,
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex gap-3 sm:gap-4 items-start group"
                >
                  <div
                    className={`w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105 shadow-sm ${pt.iconBg}`}
                  >
                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-[11px] sm:text-xs font-bold tracking-wider text-zinc-900 dark:text-white uppercase group-hover:text-brand dark:group-hover:text-indigo-400 transition-colors">
                      {pt.title}
                    </h3>
                    <p className="text-[11px] sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-md">
                      {pt.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Image Feature */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden border border-zinc-200/80 dark:border-zinc-800 shadow-xl group"
        >
          <Image
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200"
            alt="Architectural blueprint planning for a Probity apartment project"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-tint-dark/60 via-transparent to-transparent pointer-events-none" />

          {/* Floating Badge overlay */}
          <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-zinc-200/60 dark:border-zinc-800 shadow-lg">
            <p className="text-[11px] sm:text-xs font-serif font-semibold text-zinc-900 dark:text-white">
              {`"Quality is not a one-time act. It is a habit in every plan we make."`}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
