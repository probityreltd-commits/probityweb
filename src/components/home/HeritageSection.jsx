"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Layers, FileCheck, ShieldCheck } from "lucide-react";

const HeritageSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  };

  return (
    <section className="bg-[#f5f1ff] dark:bg-[#070913] py-8 sm:py-10 md:py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300 overflow-hidden">
      <motion.div
        className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 lg:gap-6 items-stretch"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Left Column: Text Content & Clear Legal Badge */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-5 bg-white dark:bg-zinc-900/90 backdrop-blur-sm p-5 sm:p-6 md:p-8 lg:p-10 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 flex flex-col justify-between"
        >
          <div>
            {/* Tag */}
            <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-[#3b1a83] dark:text-[#a07cf0]">
              ABOUT PROBITY
            </span>

            {/* Main Title */}
            <h2 className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-zinc-900 dark:text-white mt-2 mb-3 sm:mb-4 lg:mb-6 leading-tight">
              A Name Bogura Can Trust
            </h2>

            {/* Description Paragraph */}
            <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed mb-5 sm:mb-6 lg:mb-8 font-normal">
              Probity means honesty. We take this word seriously. Probity Real
              Estate Ltd. builds strong, safe apartments and commercial spaces
              in Bogura. We tell you the price clearly, we build with care, and
              we hand over what we promise.
            </p>
          </div>

          {/* Legal Badge */}
          <div className="bg-emerald-50/80 dark:bg-emerald-950/30 p-3.5 sm:p-4 rounded-xl flex items-start gap-2.5 sm:gap-3 border border-emerald-100 dark:border-emerald-900/40">
            <FileCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />

            <div>
              <h4 className="font-serif text-[11px] sm:text-xs font-bold text-emerald-900 dark:text-emerald-300">
                CLEAR AND LEGAL
              </h4>

              <p className="text-[10px] sm:text-[11px] text-emerald-700 dark:text-emerald-400/90 mt-0.5 leading-snug">
                Clean land documents and a clear agreement for every buyer.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Middle Column: Non-numeric Info Grid */}
        <div className="lg:col-span-3 flex flex-col gap-3 sm:gap-4 lg:gap-6">
          {/* Top Feature Card */}
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-zinc-900/90 p-4 sm:p-5 lg:p-6 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 flex-1 flex flex-col items-center justify-center text-center"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-2 sm:mb-3 lg:mb-4">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
            </div>

            <span className="font-serif text-lg sm:text-xl lg:text-2xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              Bogura
            </span>

            <span className="text-[10px] sm:text-xs text-zinc-500 dark:text-zinc-400 mt-1 sm:mt-2 font-medium">
              Our Home City, Our Focus
            </span>
          </motion.div>

          {/* Bottom Grid Cards */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:gap-4">
            {/* Brand Purple Card */}
            <motion.div
              variants={itemVariants}
              className="bg-[#3b1a83] text-white p-3.5 sm:p-4 lg:p-5 rounded-xl sm:rounded-2xl flex flex-col justify-between min-h-[92px] sm:min-h-[110px] lg:min-h-[140px] shadow-md"
            >
              <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-200" />

              <div>
                <span className="font-serif text-xs sm:text-sm md:text-base font-bold block leading-snug">
                  Ready • Ongoing • Upcoming
                </span>

                <span className="text-[9px] sm:text-[10px] text-indigo-100 mt-1.5 sm:mt-2 block leading-tight">
                  Projects for Every Need
                </span>
              </div>
            </motion.div>

            {/* White Card */}
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-zinc-900/90 p-3.5 sm:p-4 lg:p-5 rounded-xl sm:rounded-2xl border border-zinc-100 dark:border-zinc-800 flex flex-col justify-between min-h-[92px] sm:min-h-[110px] lg:min-h-[140px] shadow-sm"
            >
              <FileCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#3b1a83] dark:text-[#a07cf0]" />

              <div>
                <span className="font-serif text-xs sm:text-sm md:text-base font-bold text-zinc-900 dark:text-white block leading-snug">
                  Clear
                </span>

                <span className="text-[9px] sm:text-[10px] text-zinc-500 dark:text-zinc-400 mt-1.5 sm:mt-2 block leading-tight">
                  Price and Papers Explained
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Column: Image with Glassmorphism Overlay */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-4 relative rounded-2xl overflow-hidden min-h-[220px] sm:min-h-[260px] md:min-h-[320px] lg:min-h-full shadow-sm group"
        >
          <Image
            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop"
            alt="Apartment building by Probity Real Estate in Bogura"
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />

          {/* Glassmorphism Dark Overlay Card */}
          <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-4 sm:left-4 sm:right-4 bg-black/75 backdrop-blur-md p-3 sm:p-4 rounded-xl border border-white/10 text-white shadow-lg">
            <div className="flex items-start gap-2.5 sm:gap-3">
              <div className="p-1 bg-emerald-500/20 text-emerald-400 rounded-full shrink-0 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>

              <div>
                <h4 className="font-serif text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white">
                  STRONG AND SAFE CONSTRUCTION
                </h4>

                <p className="text-[9px] sm:text-[11px] text-zinc-300 mt-0.5 leading-snug">
                  Good materials and careful engineering in every building, so
                  your family feels safe every day.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeritageSection;
