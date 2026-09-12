"use client";

import React from "react";
import {
  Users,
  Flower2,
  ArrowUpSquare,
  Video,
  LogOut,
  Flame,
  Zap,
  ShieldCheck,
  Footprints,
  Cpu,
  CheckCircle2,
} from "lucide-react";

/**
 * Dynamic Icon + color mapping for amenities string values.
 * Each amenity gets a distinct color family for quick visual scanning.
 */
const AMENITY_CONFIG = {
  "community hall room": {
    icon: Users,
    className:
      "bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400",
  },
  garden: {
    icon: Flower2,
    className:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400",
  },
  lift: {
    icon: ArrowUpSquare,
    className:
      "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400",
  },
  "1 lift": {
    icon: ArrowUpSquare,
    className:
      "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400",
  },
  "two lift": {
    icon: ArrowUpSquare,
    className:
      "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400",
  },
  "cc camera": {
    icon: Video,
    className:
      "bg-slate-100 text-slate-600 dark:bg-slate-800/60 dark:text-slate-300",
  },
  "emergency exit": {
    icon: LogOut,
    className:
      "bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400",
  },
  "fire protection": {
    icon: Flame,
    className:
      "bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400",
  },
  generator: {
    icon: Cpu,
    className:
      "bg-cyan-50 text-cyan-600 dark:bg-cyan-950/40 dark:text-cyan-400",
  },
  "lightning protection": {
    icon: Zap,
    className:
      "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400",
  },
  "security guard": {
    icon: ShieldCheck,
    className:
      "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400",
  },
  "1 stair": {
    icon: Footprints,
    className:
      "bg-teal-50 text-teal-600 dark:bg-teal-950/40 dark:text-teal-400",
  },
};

const DEFAULT_CONFIG = {
  icon: CheckCircle2,
  className:
    "bg-brand/10 text-brand dark:bg-indigo-950/40 dark:text-indigo-400",
};

const getAmenityConfig = (amenityName) => {
  if (!amenityName) return DEFAULT_CONFIG;
  const normalizedKey = amenityName.toLowerCase().trim();
  return AMENITY_CONFIG[normalizedKey] || DEFAULT_CONFIG;
};

const FeaturesAndAmenities = ({ amenities = [] }) => {
  if (!amenities || amenities.length === 0) return null;

  return (
    <section className="mt-6 sm:mt-8 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-zinc-200/80 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md shadow-sm">
      <h3 className="font-serif text-center text-xl sm:text-2xl lg:text-3xl font-semibold text-zinc-900 dark:text-white mb-5 sm:mb-8">
        Features &amp; Amenities
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-4">
        {amenities.map((item, index) => {
          const { icon: Icon, className } = getAmenityConfig(item);

          return (
            <div
              key={index}
              className="flex flex-col items-center justify-center text-center gap-2 sm:gap-3 p-3 sm:p-5 rounded-xl sm:rounded-2xl border border-zinc-200/70 dark:border-zinc-800 hover:border-brand/30 dark:hover:border-indigo-500/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              <div
                className={`w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center ${className}`}
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8]" />
              </div>

              <span className="text-[11px] sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 leading-snug">
                {item}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturesAndAmenities;
