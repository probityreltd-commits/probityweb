"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Building2, HardHat, Compass } from "lucide-react";

const NotFound = () => {
  return (
    <main className="min-h-screen bg-[#f5f1ff] dark:bg-[#070913] text-zinc-800 dark:text-zinc-100 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 relative overflow-hidden transition-colors duration-300">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#3b1a83]/15 dark:bg-[#3b1a83]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b1a830f_1px,transparent_1px),linear-gradient(to_bottom,#3b1a830f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative max-w-4xl w-full mx-auto text-center z-10 flex flex-col items-center">
        {/* Animated Building Illustration Area */}
        <div className="relative w-full max-w-md h-64 sm:h-72 flex items-end justify-center mb-8">
          {/* Blueprint Grid Lines behind building */}
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <div className="w-64 h-64 border-2 border-dashed border-[#3b1a83] rounded-full animate-[spin_60s_linear_infinite]" />
          </div>

          {/* 404 Large Ambient Typography */}
          <span className="absolute top-0 font-serif text-[120px] sm:text-[160px] font-black text-[#3b1a83]/10 dark:text-white/5 select-none leading-none tracking-tighter">
            404
          </span>

          {/* Animated Building Graphic */}
          <div className="relative z-10 flex items-end gap-3 pb-2">
            {/* Small Side Building */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="origin-bottom w-16 h-32 bg-white dark:bg-zinc-800 rounded-t-xl border-2 border-[#3b1a83]/30 shadow-lg p-2 flex flex-col justify-around"
            >
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-full h-4 bg-[#f5f1ff] dark:bg-zinc-700 rounded-sm border border-[#3b1a83]/20"
                />
              ))}
            </motion.div>

            {/* Main Animated Center Building (Constructing Effect) */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="origin-bottom w-32 sm:w-36 h-48 sm:h-56 bg-gradient-to-b from-[#3b1a83] to-[#2a1260] rounded-t-2xl shadow-2xl p-3 flex flex-col justify-between border-2 border-[#3b1a83] relative group"
            >
              {/* Construction Crane Icon Floating Top */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut",
                }}
                className="absolute -top-10 left-1/2 -translate-x-1/2 bg-amber-400 text-zinc-950 p-2 rounded-full shadow-lg border border-amber-300"
              >
                <HardHat className="w-5 h-5" />
              </motion.div>

              {/* Building Windows Grid Animation */}
              <div className="grid grid-cols-2 gap-2 mt-4">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + i * 0.15 }}
                    className="h-6 bg-amber-300/80 rounded-md shadow-inner border border-amber-200/50 flex items-center justify-center"
                  >
                    <div className="w-1.5 h-1.5 bg-[#3b1a83] rounded-full opacity-60" />
                  </motion.div>
                ))}
              </div>

              {/* Main Door */}
              <div className="w-10 h-10 bg-amber-400 rounded-t-lg mx-auto border-t-2 border-x-2 border-amber-200 shadow-md" />
            </motion.div>

            {/* Right Side Building Under Construction */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              className="origin-bottom w-20 h-40 bg-white dark:bg-zinc-800 rounded-t-xl border-2 border-dashed border-[#3b1a83]/50 shadow-md p-2.5 flex flex-col justify-between"
            >
              <div className="flex items-center justify-center text-[#3b1a83] dark:text-indigo-400">
                <Building2 className="w-5 h-5 animate-bounce" />
              </div>
              <div className="space-y-2">
                <div className="w-full h-3 bg-[#f5f1ff] dark:bg-zinc-700 rounded-sm" />
                <div className="w-full h-3 bg-[#f5f1ff] dark:bg-zinc-700 rounded-sm" />
                <div className="w-full h-3 bg-[#3b1a83]/20 dark:bg-indigo-500/20 rounded-sm animate-pulse" />
              </div>
            </motion.div>
          </div>

          {/* Foundation Ground Line */}
          <div className="absolute bottom-0 w-full h-1.5 bg-[#3b1a83] rounded-full shadow-sm" />
        </div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="max-w-xl mx-auto"
        >
          {/* Section Sub-Tag */}
          <div className="inline-flex items-center gap-2 bg-[#3b1a83]/10 dark:bg-[#3b1a83]/30 text-[#3b1a83] dark:text-indigo-300 text-xs font-bold px-4 py-1.5 rounded-full mb-4 border border-[#3b1a83]/20">
            <Compass
              className="w-3.5 h-3.5 animate-spin"
              style={{ animationDuration: "10s" }}
            />
            <span>PAGE UNDER CONSTRUCTION OR MOVED</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-tight">
            Oops! Property Not Found
          </h1>

          <p className="mt-4 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
            The page or property listing you are looking for might have been
            renamed, moved, or is currently under architectural renovation.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#3b1a83] hover:bg-[#2c1363] text-white text-xs font-bold px-7 py-3.5 rounded-full transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95"
            >
              <Home className="w-4 h-4" />
              <span>Back to Homepage</span>
            </Link>

            <button
              onClick={() => window.history.back()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 text-xs font-bold px-7 py-3.5 rounded-full transition-all shadow-sm active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Go Back</span>
            </button>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default NotFound;
