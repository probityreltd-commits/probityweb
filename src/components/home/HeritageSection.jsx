"use client";
import React, { useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Building2, Users, Trophy, CheckCircle } from "lucide-react";

// Number Counter Component
const AnimatedNumber = ({ value, suffix = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView || !ref.current) return;

    // Extract numeric part from string (e.g. "5000" from "5,000")
    const numericValue = parseInt(value.replace(/,/g, ""), 10);

    const controls = animate(0, numericValue, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1], // Smooth out cubic-bezier
      onUpdate(latest) {
        if (ref.current) {
          // Format with commas if original had comma
          const formatted = Math.floor(latest).toLocaleString("en-US");
          ref.current.textContent = formatted + suffix;
        }
      },
    });

    return () => controls.stop();
  }, [isInView, value, suffix]);

  return <span ref={ref}>0{suffix}</span>;
};

const HeritageSection = () => {
  // Container stagger animation variants
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

  // Card slide-up animation variants
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
    <section className="bg-slate-50 dark:bg-zinc-950 py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300 overflow-hidden">
      <motion.div
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Left Column: Text Content & REHAB Badge (5 Cols) */}
        <motion.div
          variants={itemVariants}
          className="md:col-span-5 bg-white dark:bg-zinc-900 p-8 sm:p-10 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 flex flex-col justify-between"
        >
          <div>
            {/* Tag */}
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
              CORPORATE HERITAGE
            </span>

            {/* Main Title -> font-serif */}
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white mt-3 mb-6 leading-tight">
              A Legacy of Delivering Excellence
            </h2>

            {/* Description Paragraph */}
            <p className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed mb-8 font-normal">
              For over two decades, Probity has sculpted Dhaka&apos;s premier
              skyline, creating high-end residential landmarks in Dhaka&apos;s
              premier locations. We do not just build apartments; we craft
              high-security, low-density masterpieces for those who demand the
              finest.
            </p>
          </div>

          {/* REHAB Badge */}
          <div className="bg-emerald-50 dark:bg-emerald-950/40 p-4 rounded-xl flex items-start gap-3 border border-emerald-100 dark:border-emerald-900/50">
            <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-emerald-900 dark:text-emerald-300">
                100% REHAB CERTIFIED
              </h4>
              <p className="text-[11px] text-emerald-700 dark:text-emerald-400/90 mt-0.5">
                Registered and strictly compliant with RAJUK development
                mandates.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Middle Column: Stats Grid (3 Cols) */}
        <div className="md:col-span-3 flex flex-col gap-6">
          {/* Top Stat Card (25+ Years) */}
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 flex-1 flex flex-col items-center justify-center text-center"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4">
              <Trophy className="w-6 h-6" />
            </div>
            {/* Stat Number with Counter -> font-serif */}
            <span className="font-serif text-4xl sm:text-5xl font-black text-zinc-900 dark:text-white tracking-tight">
              <AnimatedNumber value="25" suffix="+" />
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 font-medium">
              Years of Trust Established in 1999
            </span>
          </motion.div>

          {/* Bottom Grid Stats */}
          <div className="grid grid-cols-2 gap-4">
            {/* Purple Stat Card (18 Landmarks) */}
            <motion.div
              variants={itemVariants}
              className="bg-[#321e82] text-white p-5 rounded-2xl flex flex-col justify-between min-h-[140px] shadow-sm"
            >
              <Building2 className="w-5 h-5 text-indigo-200" />
              <div>
                <span className="font-serif text-2xl sm:text-3xl font-black block leading-none">
                  <AnimatedNumber value="18" />
                </span>
                <span className="text-[10px] text-indigo-100 mt-2 block leading-tight">
                  Premium Landmarks
                  <br />
                  <strong className="text-white">100% On-Time Delivery</strong>
                </span>
              </div>
            </motion.div>

            {/* White Stat Card (5,000+ Families) */}
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-100 dark:border-zinc-800 flex flex-col justify-between min-h-[140px] shadow-sm"
            >
              <Users className="w-5 h-5 text-indigo-800 dark:text-indigo-400" />
              <div>
                <span className="font-serif text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white block leading-none">
                  <AnimatedNumber value="5,000" suffix="+" />
                </span>
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-2 block leading-tight">
                  Happy Families
                  <br />
                  Dhaka&apos;s Elite Residents
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Column: Image with Dark Overlay Badge (4 Cols) */}
        <motion.div
          variants={itemVariants}
          className="md:col-span-4 relative rounded-2xl overflow-hidden min-h-[380px] md:min-h-full shadow-sm group"
        >
          {/* Architectural Landmark Image */}
          <img
            src="https://i.ibb.co.com/TD3Djqzy/Screenshot-2026-08-14-000804.png"
            alt="Acoustic Damping Architectural Landmark"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />

          {/* Overlay Card at Bottom */}
          <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md p-4 rounded-xl border border-white/10 text-white">
            <div className="flex items-start gap-3">
              <div className="p-1 bg-emerald-500/20 text-emerald-400 rounded-full shrink-0 mt-0.5">
                <CheckCircle className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                  ACOUSTIC DAMPING ENGINEERING
                </h4>
                <p className="text-[11px] text-zinc-300 mt-0.5 leading-snug">
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
