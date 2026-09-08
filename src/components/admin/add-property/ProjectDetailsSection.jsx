"use client";

import React from "react";

const ProjectDetailsSection = ({ number, formData, handleChange }) => {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-7 border border-zinc-200/80 dark:border-zinc-800 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center gap-3 pb-4 mb-6 border-b border-zinc-100 dark:border-zinc-800">
        <div className="w-9 h-9 rounded-2xl bg-[#3b1a83]/10 text-[#3b1a83] flex items-center justify-center font-bold text-sm">
          {number}
        </div>
        <div>
          <h2 className="font-sans text-base font-bold text-zinc-900 dark:text-white">
            Project Details
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Structural, land area, parking, and unit breakdown specifications
          </p>
        </div>
      </div>

      {/* Grid: Desktop 3/4 cols, Tablet 2 cols, Mobile 1 col */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        <div>
          <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">
            Land Area
          </label>
          <input
            type="text"
            name="landArea"
            value={formData.landArea}
            onChange={handleChange}
            placeholder="e.g. 4.96 Decimal"
            className="w-full px-4 py-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-xs sm:text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3b1a83]/30 focus:border-[#3b1a83] transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">
            Building Height
          </label>
          <input
            type="text"
            name="buildingHeight"
            value={formData.buildingHeight}
            onChange={handleChange}
            placeholder="e.g. G+8"
            className="w-full px-4 py-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-xs sm:text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3b1a83]/30 focus:border-[#3b1a83] transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">
            Total Apartments
          </label>
          <input
            type="number"
            min="0"
            name="apartments"
            value={formData.apartments}
            onChange={handleChange}
            placeholder="e.g. 16"
            className="w-full px-4 py-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-xs sm:text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3b1a83]/30 focus:border-[#3b1a83] transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">
            Car Parking
          </label>
          <input
            type="text"
            name="carParking"
            value={formData.carParking}
            onChange={handleChange}
            placeholder="e.g. Ground Floor"
            className="w-full px-4 py-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-xs sm:text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3b1a83]/30 focus:border-[#3b1a83] transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">
            Motorbike Parking
          </label>
          <input
            type="text"
            name="motorbikeParking"
            value={formData.motorbikeParking}
            onChange={handleChange}
            placeholder="e.g. Ground Floor / N/A"
            className="w-full px-4 py-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-xs sm:text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3b1a83]/30 focus:border-[#3b1a83] transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">
            Units Per Floor
          </label>
          <input
            type="number"
            min="0"
            name="unitsPerFloor"
            value={formData.unitsPerFloor}
            onChange={handleChange}
            placeholder="e.g. 2"
            className="w-full px-4 py-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-xs sm:text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3b1a83]/30 focus:border-[#3b1a83] transition-all"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">
            Apartment Sizes Breakdown
          </label>
          <input
            type="text"
            name="apartmentSizes"
            value={formData.apartmentSizes}
            onChange={handleChange}
            placeholder="e.g. 1050 sqft (Unit A & B)"
            className="w-full px-4 py-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-xs sm:text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3b1a83]/30 focus:border-[#3b1a83] transition-all"
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsSection;
