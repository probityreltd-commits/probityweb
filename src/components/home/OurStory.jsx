"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Calendar, Phone, Quote } from "lucide-react";

const OurStory = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // YouTube video id — swap with the real Probity story video id
  const YOUTUBE_ID = "dQw4w9WgXcQ";
  const YOUTUBE_THUMBNAIL = `https://img.youtube.com/vi/${YOUTUBE_ID}/maxresdefault.jpg`;

  // Close modal on Escape key press
  const handleKeyDown = useCallback((e) => {
    if (e.key === "Escape") setIsVideoOpen(false);
  }, []);

  useEffect(() => {
    if (isVideoOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isVideoOpen, handleKeyDown]);

  return (
    <section className="relative bg-[#020b18] text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute top-1/3 -left-40 w-[420px] h-[420px] rounded-full bg-[#3b1a83]/20 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[320px] h-[320px] rounded-full bg-[#3b1a83]/10 blur-[100px]" />

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-10 items-center">
        {/* ---------------- LEFT: CEO photo + bio + narrative ---------------- */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 flex flex-col"
        >
          <span className="inline-block w-fit bg-white/10 text-xs text-zinc-200 font-medium px-4 py-1.5 rounded-full border border-white/15 backdrop-blur-sm">
            Our Story
          </span>

          <h2 className="font-serif text-2xl sm:text-4xl lg:text-[42px] font-semibold text-white mt-5 mb-5 sm:mb-6 leading-[1.25] tracking-tight">
            A home is a promise. We keep our promises.
          </h2>

          <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-8 max-w-xl font-normal">
            Every family in Bogura dreams of a safe home. Many buyers face the
            same problems: late handover, promised facilities that never come,
            and prices nobody explains. Probity Real Estate Ltd. was started to
            change this. We tell you the price, the plan and the handover date
            from the very first day. When you choose Probity, you are choosing a
            safe address for your family's future.
          </p>

          {/* CEO card */}
          <div className="flex items-center gap-4 sm:gap-5 p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-white/15 shrink-0">
              <Image
                src="/images/CEO.png"
                alt="MD Rezaul Karim, Managing Director of Probity Real Estate Ltd."
                fill
                sizes="80px"
                priority
                className="object-cover"
              />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 text-zinc-500 mb-1">
                <Quote className="w-3.5 h-3.5 shrink-0" />
                <span className="text-[11px] uppercase tracking-wide">
                  A word from our MD
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white truncate">
                MD Rezaul Karim
              </h3>
              <p className="text-[11px] sm:text-xs text-zinc-400 font-medium">
                Managing Director, Probity Real Estate Ltd.
              </p>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex items-center gap-3 mt-6">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#3b1a83] hover:bg-[#4c22a3] text-white text-xs sm:text-sm font-medium transition-colors"
            >
              <Calendar className="w-4 h-4" />
              Book Site Visit
            </Link>
            <a
              href="tel:+8801711675001"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-medium border border-white/10 transition-colors"
            >
              <Phone className="w-4 h-4" />
              Call Us
            </a>
          </div>
        </motion.div>

        {/* ---------------- RIGHT: YouTube video showcase ---------------- */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6"
        >
          <button
            onClick={() => setIsVideoOpen(true)}
            aria-label="Play the Probity Real Estate story video"
            className="group relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl focus:outline-none focus:ring-2 focus:ring-[#3b1a83] focus:ring-offset-2 focus:ring-offset-[#020b18]"
          >
            {/* YouTube thumbnail */}
            <Image
              src={YOUTUBE_THUMBNAIL}
              alt="Watch the Probity Real Estate story"
              fill
              sizes="(max-width: 1024px) 100vw, 560px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              unoptimized
            />

            {/* Darkening overlay for legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#020b18] via-[#020b18]/20 to-[#020b18]/40 transition-opacity duration-300 group-hover:from-[#020b18]/90" />

            {/* Center play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="relative flex items-center justify-center">
                {/* Tailwind Built-in Ping Animation */}
                <span className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/20 animate-ping" />
                <span className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white text-zinc-950 flex items-center justify-center shadow-xl group-hover:bg-[#3b1a83] group-hover:text-white transition-colors duration-300">
                  <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-current ml-1" />
                </span>
              </span>
            </div>

            {/* Caption footer */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 flex items-center justify-between">
              <div className="text-left">
                <p className="text-white text-sm sm:text-base font-semibold">
                  Our Story, in 2 minutes
                </p>
                <p className="text-zinc-300 text-[11px] sm:text-xs">
                  Watch on YouTube
                </p>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] text-zinc-300 bg-black/40 px-3 py-1.5 rounded-full border border-white/10">
                <Play className="w-3 h-3 fill-current" />
                Play video
              </span>
            </div>
          </button>
        </motion.div>
      </div>

      {/* ---------------- Video Modal ---------------- */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsVideoOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label="Probity Real Estate story video"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            >
              <button
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-white/20 transition-colors border border-white/10 focus:outline-none"
                aria-label="Close video"
              >
                <X className="w-5 h-5" />
              </button>

              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1`}
                title="Probity Real Estate Story Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default OurStory;
