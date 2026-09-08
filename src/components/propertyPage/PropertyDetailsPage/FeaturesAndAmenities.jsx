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
 * Dynamic Icon mapping for amenities string values.
 */
const AMENITY_ICONS = {
  "community hall room": Users,
  garden: Flower2,
  lift: ArrowUpSquare,
  "1 lift": ArrowUpSquare,
  "two lift": ArrowUpSquare,
  "cc camera": Video,
  "emergency exit": LogOut,
  "fire protection": Flame,
  generator: Cpu,
  "lightning protection": Zap,
  "security guard": ShieldCheck,
  "1 stair": Footprints,
};

const getAmenityIcon = (amenityName) => {
  if (!amenityName) return CheckCircle2;
  const normalizedKey = amenityName.toLowerCase().trim();
  return AMENITY_ICONS[normalizedKey] || CheckCircle2;
};

const FeaturesAndAmenities = ({ amenities = [] }) => {
  if (!amenities || amenities.length === 0) return null;

  return (
    <section className="mt-8 rounded-3xl p-6 sm:p-8 border border-zinc-200/80 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md shadow-sm">
      {/* Section Title */}
      <h3 className="display-font text-center text-2xl sm:text-3xl font-semibold text-zinc-900 dark:text-white mb-8">
        Feature &amp; Amenities
      </h3>

      {/* Grid Container with brand-colored outer border */}
      <div className="border border-[#3b1a83]/30 dark:border-[#3b1a83]/50 rounded-lg overflow-hidden bg-[#3b1a83]/30 dark:bg-[#3b1a83]/50">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-[1px]">
          {amenities.map((item, index) => {
            const Icon = getAmenityIcon(item);

            return (
              <div
                key={index}
                className="bg-white dark:bg-zinc-900 p-5 sm:p-6 flex flex-col items-center justify-center text-center min-h-[120px] sm:min-h-[135px]"
              >
                {/* Brand Color Icon - Pure transparent background */}
                <div className="mb-3 flex items-center justify-center text-[#3b1a83] dark:text-[#6b3ba7]">
                  <Icon className="w-7 h-7 sm:w-8 sm:h-8 stroke-[1.8]" />
                </div>

                {/* Amenity Title */}
                <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-zinc-300 leading-snug">
                  {item}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesAndAmenities;
