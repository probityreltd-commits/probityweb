"use client";

import React from "react";
import { Check } from "lucide-react";
import { PREDEFINED_AMENITIES } from "./addPropertyConstants";

const AmenitiesSection = ({ number, selectedAmenities, toggleAmenity }) => {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-7 border border-zinc-200/80 dark:border-zinc-800 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-zinc-100 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-[#3b1a83]/10 text-[#3b1a83] flex items-center justify-center font-bold text-sm">
            {number}
          </div>
          <div>
            <h2 className="font-sans text-base font-bold text-zinc-900 dark:text-white">
              Amenities & Features
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Select predefined property offerings and security features
            </p>
          </div>
        </div>
        <span className="text-xs font-semibold px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-full">
          {selectedAmenities.length} Selected
        </span>
      </div>

      {/* Amenity Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
        {PREDEFINED_AMENITIES.map((item) => {
          const IconComponent = item.icon;
          const isSelected = selectedAmenities.includes(item.label);

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => toggleAmenity(item.label)}
              className={`relative flex flex-col items-center justify-center p-4 rounded-2xl border text-center transition-all duration-200 group focus:outline-none ${
                isSelected
                  ? "bg-[#3b1a83]/5 border-[#3b1a83] text-[#3b1a83] dark:bg-[#3b1a83]/20 dark:border-purple-500 dark:text-purple-300 shadow-sm ring-1 ring-[#3b1a83]/20"
                  : "bg-white dark:bg-zinc-950 border-zinc-200/80 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900"
              }`}
            >
              {/* Check Badge */}
              {isSelected && (
                <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#3b1a83] dark:bg-purple-500 text-white flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
              )}

              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2.5 transition-transform group-hover:scale-110 ${
                  isSelected
                    ? "bg-[#3b1a83] text-white dark:bg-purple-600"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 group-hover:bg-[#3b1a83]/10 group-hover:text-[#3b1a83]"
                }`}
              >
                <IconComponent className="w-5 h-5" />
              </div>

              <span className="text-xs font-semibold line-clamp-2 leading-tight">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AmenitiesSection;
