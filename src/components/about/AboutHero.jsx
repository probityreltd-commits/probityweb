"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export default function AboutHero() {
  return (
    <section className="relative pt-24 sm:pt-28 lg:pt-10 h-[300px] sm:h-[360px] md:h-[420px] w-full flex items-center justify-center overflow-hidden">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600"
          alt="Modern Architectural Home"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-90 scale-105"
        />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-overlay-dark via-transparent to-overlay-dark" />
        <div className="absolute inset-0 bg-gradient-to-b from-overlay-dark/85 via-transparent to-overlay-dark/90" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-3xl mx-auto space-y-2.5 sm:space-y-3">
        {/* Breadcrumb Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          aria-label="Breadcrumb"
          className="flex items-center justify-center gap-1.5 text-[11px] sm:text-sm text-slate-300"
        >
          <Link
            href="/"
            className="text-white hover:text-slate-200 transition-colors"
          >
            Home
          </Link>
          <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-500" />
          <span className="text-slate-400">About us</span>
        </motion.nav>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight"
        >
          A Legacy of Delivering Excellence
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[11px] sm:text-sm text-slate-300 max-w-xl mx-auto font-light leading-relaxed"
        >
          Twenty years in business, ten in real estate, and one commitment:
          homes built for the life you actually live.
        </motion.p>
      </div>
    </section>
  );
}
