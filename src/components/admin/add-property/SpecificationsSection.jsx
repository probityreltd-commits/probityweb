"use client";

import React from "react";
import { Bed, Bath, Maximize2, Compass } from "lucide-react";

const SpecificationsSection = ({ number, formData, handleChange }) => {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-7 border border-zinc-200/80 dark:border-zinc-800 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center gap-3 pb-4 mb-6 border-b border-zinc-100 dark:border-zinc-800">
        <div className="w-9 h-9 rounded-2xl bg-[#3b1a83]/10 text-[#3b1a83] flex items-center justify-center font-bold text-sm">
          {number}
        </div>
        <div>
          <h2 className="font-sans text-base font-bold text-zinc-900 dark:text-white">
            Basic Specifications
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Core room count and directional specifications
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div>
          <label className="flex items-center gap-1.5 text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">
            <Bed className="w-4 h-4 text-[#3b1a83]" />
            <span>Bedrooms</span>
          </label>
          <input
            type="number"
            min="0"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
            placeholder="3"
            className="w-full px-4 py-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-xs sm:text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3b1a83]/30 focus:border-[#3b1a83] transition-all"
          />
        </div>

        <div>
          <label className="flex items-center gap-1.5 text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">
            <Bath className="w-4 h-4 text-[#3b1a83]" />
            <span>Bathrooms</span>
          </label>
          <input
            type="number"
            min="0"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleChange}
            placeholder="3"
            className="w-full px-4 py-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-xs sm:text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3b1a83]/30 focus:border-[#3b1a83] transition-all"
          />
        </div>

        <div>
          <label className="flex items-center gap-1.5 text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">
            <Maximize2 className="w-4 h-4 text-[#3b1a83]" />
            <span>Flat Size</span>
          </label>
          <input
            type="text"
            name="flatSize"
            value={formData.flatSize}
            onChange={handleChange}
            placeholder="e.g. 1750 sqft"
            className="w-full px-4 py-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-xs sm:text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3b1a83]/30 focus:border-[#3b1a83] transition-all"
          />
        </div>

        <div>
          <label className="flex items-center gap-1.5 text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">
            <Compass className="w-4 h-4 text-[#3b1a83]" />
            <span>Orientation</span>
          </label>
          <input
            type="text"
            name="orientation"
            value={formData.orientation}
            onChange={handleChange}
            placeholder="e.g. South Facing"
            className="w-full px-4 py-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-xs sm:text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3b1a83]/30 focus:border-[#3b1a83] transition-all"
          />
        </div>
      </div>
    </div>
  );
};

export default SpecificationsSection;
