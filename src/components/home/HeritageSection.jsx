"use client";
import React, { useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { motion, useInView, animate } from "framer-motion";
import { Building2, Users, Trophy, CheckCircle } from "lucide-react";

const AnimatedNumber = ({ value, suffix = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "0px",
  });

  const numericValue = useMemo(() => {
    const raw = String(value ?? "0").replace(/,/g, "");
    const parsed = parseInt(raw, 10);

    return Number.isNaN(parsed) ? 0 : parsed;
  }, [value]);

  useEffect(() => {
    if (!isInView || !ref.current) return;

    const controls = animate(0, numericValue, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],

      onUpdate: (latest) => {
        if (ref.current) {
          ref.current.textContent =
            Math.floor(latest).toLocaleString("en-US") + suffix;
        }
      },

      onComplete: () => {
        if (ref.current) {
          ref.current.textContent =
            numericValue.toLocaleString("en-US") + suffix;
        }
      },
    });

    return () => controls.stop();
  }, [isInView, numericValue, suffix]);

  return (
    <span ref={ref}>
      {numericValue.toLocaleString("en-US")}
      {suffix}
    </span>
  );
};

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
    <section className="bg-slate-50 dark:bg-zinc-950 py-8 sm:py-10 md:py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300 overflow-hidden">
      <motion.div
        className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 lg:gap-6 items-stretch"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Left Column: Text Content & REHAB Badge */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-5 bg-white dark:bg-zinc-900 p-5 sm:p-6 md:p-8 lg:p-10 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 flex flex-col justify-between"
        >
          <div>
            {/* Tag */}
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
              CORPORATE HERITAGE
            </span>

            {/* Main Title */}
            <h2 className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-zinc-900 dark:text-white mt-2 mb-3 sm:mb-4 lg:mb-6 leading-tight">
              A Legacy of Delivering Excellence
            </h2>

            {/* Description Paragraph */}
            <p className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed mb-5 sm:mb-6 lg:mb-8 font-normal">
              For over two decades, Probity has sculpted Dhaka&apos;s premier
              skyline, creating high-end residential landmarks in Dhaka&apos;s
              premier locations. We do not just build apartments; we craft
              high-security, low-density masterpieces for those who demand the
              finest.
            </p>
          </div>

          {/* REHAB Badge */}
          <div className="bg-emerald-50 dark:bg-emerald-950/40 p-3 sm:p-4 rounded-xl flex items-start gap-2.5 sm:gap-3 border border-emerald-100 dark:border-emerald-900/50">
            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />

            <div>
              <h4 className="font-serif text-[11px] sm:text-xs font-bold text-emerald-900 dark:text-emerald-300">
                100% REHAB CERTIFIED
              </h4>

              <p className="text-[10px] sm:text-[11px] text-emerald-700 dark:text-emerald-400/90 mt-0.5">
                Registered and strictly compliant with RAJUK development
                mandates.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Middle Column: Stats Grid */}
        <div className="lg:col-span-3 flex flex-col gap-3 sm:gap-4 lg:gap-6">
          {/* Top Stat Card (25+ Years) */}
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-zinc-900 p-4 sm:p-5 lg:p-6 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 flex-1 flex flex-col items-center justify-center text-center"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-2 sm:mb-3 lg:mb-4">
              <Trophy className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
            </div>

            {/* Stat Number with Counter */}
            <span className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-zinc-900 dark:text-white tracking-tight">
              <AnimatedNumber value="25" suffix="+" />
            </span>

            <span className="text-[10px] sm:text-xs text-zinc-500 dark:text-zinc-400 mt-1 sm:mt-2 font-medium">
              Years of Trust Established in 1999
            </span>
          </motion.div>

          {/* Bottom Grid Stats */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:gap-4">
            {/* Purple Stat Card */}
            <motion.div
              variants={itemVariants}
              className="bg-[#321e82] text-white p-3.5 sm:p-4 lg:p-5 rounded-xl sm:rounded-2xl flex flex-col justify-between min-h-[92px] sm:min-h-[110px] lg:min-h-[140px] shadow-sm"
            >
              <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-200" />

              <div>
                <span className="font-serif text-lg sm:text-xl md:text-2xl lg:text-3xl font-black block leading-none">
                  <AnimatedNumber value="40" suffix="+" />
                </span>

                <span className="text-[9px] sm:text-[10px] text-indigo-100 mt-1.5 sm:mt-2 block leading-tight">
                  Premium Landmarks
                  <br />
                  <strong className="text-white">100% On-Time Delivery</strong>
                </span>
              </div>
            </motion.div>

            {/* White Stat Card */}
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-zinc-900 p-3.5 sm:p-4 lg:p-5 rounded-xl sm:rounded-2xl border border-zinc-100 dark:border-zinc-800 flex flex-col justify-between min-h-[92px] sm:min-h-[110px] lg:min-h-[140px] shadow-sm"
            >
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-800 dark:text-indigo-400" />

              <div>
                <span className="font-serif text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-zinc-900 dark:text-white block leading-none">
                  <AnimatedNumber value="5,000" suffix="+" />
                </span>

                <span className="text-[9px] sm:text-[10px] text-zinc-500 dark:text-zinc-400 mt-1.5 sm:mt-2 block leading-tight">
                  Happy Families
                  <br />
                  Dhaka&apos;s Elite Residents
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Column: Image with Dark Overlay Badge */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-4 relative rounded-2xl overflow-hidden min-h-[200px] sm:min-h-[260px] md:min-h-[320px] lg:min-h-full shadow-sm group"
        >
          <Image
            src="https://i.ibb.co.com/TD3Djqzy/Screenshot-2026-08-14-000804.png"
            alt="Acoustic Damping Architectural Landmark"
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />

          {/* Overlay Card */}
          <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-4 sm:left-4 sm:right-4 bg-black/80 backdrop-blur-md p-3 sm:p-4 rounded-xl border border-white/10 text-white">
            <div className="flex items-start gap-2.5 sm:gap-3">
              <div className="p-1 bg-emerald-500/20 text-emerald-400 rounded-full shrink-0 mt-0.5">
                <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>

              <div>
                <h4 className="font-serif text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white">
                  ACOUSTIC DAMPING ENGINEERING
                </h4>

                <p className="text-[9px] sm:text-[11px] text-zinc-300 mt-0.5 leading-snug">
                  Double-glazed soundproof glass walls that block urban noise
                  completely.
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
