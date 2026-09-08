"use client";

import React from "react";
import { Tag } from "lucide-react";

const BasicInfoSection = ({
  number,
  formData,
  handleTitleChange,
  handleSlugChange,
  handleChange,
}) => {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-7 border border-zinc-200/80 dark:border-zinc-800 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center gap-3 pb-4 mb-6 border-b border-zinc-100 dark:border-zinc-800">
        <div className="w-9 h-9 rounded-2xl bg-[#3b1a83]/10 text-[#3b1a83] flex items-center justify-center font-bold text-sm">
          {number}
        </div>
        <div>
          <h2 className="font-sans text-base font-bold text-zinc-900 dark:text-white">
            Basic Information
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Enter key identification and location parameters
          </p>
        </div>
      </div>

      <div className="space-y-5">
        {/* Project Title */}
        <div>
          <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">
            Project Title <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleTitleChange}
            placeholder="e.g. Bashundhara Green Tower"
            required
            className="w-full px-4 py-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-xs sm:text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#3b1a83]/30 focus:border-[#3b1a83] transition-all"
          />
        </div>

        {/* Slug & Location Name Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">
              URL Slug
            </label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleSlugChange}
              placeholder="bashundhara-green-tower"
              className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-xs sm:text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3b1a83]/30 transition-all font-mono text-[13px]"
            />
            <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-1.5 truncate">
              Permalink:{" "}
              <span className="text-[#3b1a83] dark:text-purple-400">
                /projects/{formData.slug || "your-slug"}
              </span>
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">
              Location Name
            </label>
            <input
              type="text"
              name="locationName"
              value={formData.locationName}
              onChange={handleChange}
              placeholder="e.g. Uttara, Dhaka"
              className="w-full px-4 py-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-xs sm:text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#3b1a83]/30 focus:border-[#3b1a83] transition-all"
            />
          </div>
        </div>

        {/* Property Type & Price per Sqft Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">
              Property Type / Category{" "}
              <span className="text-rose-500">*</span>
            </label>
            <select
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-xs sm:text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3b1a83]/30 focus:border-[#3b1a83] transition-all"
            >
              <option value="">Select Property Type</option>
              <option value="Residential Apartment">
                Residential Apartment
              </option>
              <option value="Luxury Villa">Luxury Villa</option>
              <option value="Commercial Space">Commercial Space</option>
              <option value="Penthouse">Penthouse</option>
              <option value="Duplex Studio">Duplex Studio</option>
            </select>
          </div>

          {/* Price Per Sqft Input Field */}
          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-[#3b1a83]" />
              Price Per Sqft
            </label>
            <input
              type="text"
              name="pricePerSqft"
              value={formData.pricePerSqft}
              onChange={handleChange}
              placeholder="e.g. 2,850 - 3,000 BDT"
              className="w-full px-4 py-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-xs sm:text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#3b1a83]/30 focus:border-[#3b1a83] transition-all"
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">
            Project Location / Full Address
          </label>
          <textarea
            name="address"
            rows={2}
            value={formData.address}
            onChange={handleChange}
            placeholder="e.g. Plot 45, Road 12, Sector 6, Uttara Model Town, Dhaka"
            className="w-full px-4 py-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-xs sm:text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#3b1a83]/30 focus:border-[#3b1a83] transition-all"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">
            Detailed Description
          </label>
          <textarea
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            placeholder="Provide a compelling description showcasing architectural highlights, surroundings, accessibility, and luxury features..."
            className="w-full px-4 py-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-xs sm:text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#3b1a83]/30 focus:border-[#3b1a83] transition-all"
          />
        </div>
      </div>
    </div>
  );
};

export default BasicInfoSection;
