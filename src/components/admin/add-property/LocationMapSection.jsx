"use client";

import React from "react";
import { MapPin } from "lucide-react";

const LocationMapSection = ({ number, formData, handleChange }) => {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-7 border border-zinc-200/80 dark:border-zinc-800 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center gap-3 pb-4 mb-6 border-b border-zinc-100 dark:border-zinc-800">
        <div className="w-9 h-9 rounded-2xl bg-[#3b1a83]/10 text-[#3b1a83] flex items-center justify-center font-bold text-sm">
          {number}
        </div>
        <div>
          <h2 className="font-sans text-base font-bold text-zinc-900 dark:text-white">
            Location & Map
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Add a Google Maps location to display on the property details page
          </p>
        </div>
      </div>

      <div>
        <label className="flex items-center gap-1.5 text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">
          <MapPin className="w-3.5 h-3.5 text-[#3b1a83]" />
          Google Maps Embed Link
        </label>
        <input
          type="url"
          name="mapLocation"
          value={formData.mapLocation}
          onChange={handleChange}
          placeholder="https://www.google.com/maps/embed?pb=..."
          className="w-full px-4 py-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-xs sm:text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#3b1a83]/30 focus:border-[#3b1a83] transition-all"
        />
        <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-1.5">
          On Google Maps: Share → Embed a map → copy the{" "}
          <span className="font-mono">src=&quot;...&quot;</span> URL from the
          iframe code (not the regular share link).
        </p>

        {formData.mapLocation && (
          <div className="mt-4 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 aspect-video bg-zinc-50 dark:bg-zinc-950">
            <iframe
              src={formData.mapLocation}
              className="w-full h-full"
              loading="lazy"
              title="Property location map preview"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationMapSection;
