"use client";

import React from "react";
import { Building2, MapPin, Sparkles, Loader2, Images, Map } from "lucide-react";

const LivePreviewSidebar = ({
  formData,
  uploadedImages,
  galleryImages,
  brochureFile,
  selectedAmenities,
  isSubmitting,
  handleSubmit,
}) => {
  return (
    <div className="lg:col-span-4 space-y-6">
      <div className="sticky top-40 bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <h3 className="font-sans text-sm font-bold text-zinc-900 dark:text-white">
              Live Listing Card Preview
            </h3>
          </div>
          <span className="text-[11px] text-zinc-400">Real-time update</span>
        </div>

        {/* Property Card Visual */}
        <div className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm transition-all hover:shadow-lg">
          {/* Image Cover Preview */}
          <div className="relative h-48 w-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
            {uploadedImages.length > 0 ? (
              <img
                src={
                  typeof uploadedImages[0] === "string"
                    ? uploadedImages[0]
                    : uploadedImages[0]?.url || uploadedImages[0]?.secure_url
                }
                alt="Property Cover"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-zinc-400 gap-2">
                <Building2 className="w-8 h-8 stroke-1" />
                <span className="text-xs">No Cover Image Uploaded</span>
              </div>
            )}

            {/* Status Badge */}
            <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#3b1a83] text-white shadow-md">
              {formData.status || "STATUS"}
            </span>

            {/* Tag Badge */}
            {formData.propertyType && (
              <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-white/90 dark:bg-zinc-900/90 text-zinc-800 dark:text-zinc-200 backdrop-blur-xs">
                {formData.propertyType}
              </span>
            )}
          </div>

          {/* Card Body */}
          <div className="p-4 space-y-3">
            <div>
              <h4 className="font-serif text-base font-bold text-zinc-900 dark:text-white line-clamp-1">
                {formData.title || "Project Title Preview"}
              </h4>
              <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                <MapPin className="w-3.5 h-3.5 text-[#3b1a83] shrink-0" />
                <span className="truncate">
                  {formData.locationName ||
                    formData.address ||
                    "Location Name"}
                </span>
              </div>
            </div>

            {/* Specifications Grid */}
            <div className="grid grid-cols-3 gap-2 py-2 px-3 bg-zinc-50 dark:bg-zinc-900/60 rounded-xl text-center text-xs border border-zinc-100 dark:border-zinc-800/80">
              <div>
                <span className="block text-[10px] text-zinc-400 uppercase">
                  Beds
                </span>
                <strong className="font-bold text-zinc-800 dark:text-zinc-200">
                  {formData.bedrooms || "-"}
                </strong>
              </div>
              <div>
                <span className="block text-[10px] text-zinc-400 uppercase">
                  Baths
                </span>
                <strong className="font-bold text-zinc-800 dark:text-zinc-200">
                  {formData.bathrooms || "-"}
                </strong>
              </div>
              <div>
                <span className="block text-[10px] text-zinc-400 uppercase">
                  Size
                </span>
                <strong className="font-bold text-zinc-800 dark:text-zinc-200 truncate block">
                  {formData.flatSize || "-"}
                </strong>
              </div>
            </div>

            {/* Extended Summary Badges */}
            <div className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400 pt-1">
              {formData.landArea && (
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-zinc-400">Land Area:</span>
                  <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                    {formData.landArea}
                  </span>
                </div>
              )}
              {formData.buildingHeight && (
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-zinc-400">Height:</span>
                  <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                    {formData.buildingHeight}
                  </span>
                </div>
              )}
              {formData.apartments && (
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-zinc-400">Apartments:</span>
                  <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                    {formData.apartments} Units
                  </span>
                </div>
              )}
            </div>

            {/* Selected Amenities Pills Preview */}
            {selectedAmenities.length > 0 && (
              <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <span className="block text-[10px] font-bold text-zinc-400 uppercase mb-1.5">
                  Key Amenities ({selectedAmenities.length})
                </span>
                <div className="flex flex-wrap gap-1">
                  {selectedAmenities.slice(0, 4).map((amenity, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-0.5 bg-[#3b1a83]/10 text-[#3b1a83] dark:bg-[#3b1a83]/30 dark:text-purple-300 rounded-md font-medium"
                    >
                      {amenity}
                    </span>
                  ))}
                  {selectedAmenities.length > 4 && (
                    <span className="text-[10px] px-1.5 py-0.5 bg-zinc-100 text-zinc-500 rounded-md font-semibold">
                      +{selectedAmenities.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Form Submission Quick Summary Notice */}
        <div className="p-4 bg-zinc-50 dark:bg-zinc-950 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 text-xs text-zinc-500 dark:text-zinc-400 space-y-2">
          <div className="flex items-center justify-between text-zinc-700 dark:text-zinc-300 font-semibold">
            <span className="flex items-center gap-1.5">
              <Map className="w-3.5 h-3.5 text-[#3b1a83]" />
              Map Location:
            </span>
            <span>{formData.mapLocation ? "Configured" : "Not set"}</span>
          </div>
          <div className="flex items-center justify-between text-zinc-700 dark:text-zinc-300 font-semibold">
            <span>Brochure Attached:</span>
            <span>{brochureFile ? "Yes (PDF)" : "No"}</span>
          </div>
          <div className="flex items-center justify-between text-zinc-700 dark:text-zinc-300 font-semibold">
            <span>Cover/Main Photos:</span>
            <span>{uploadedImages.length} Images</span>
          </div>
          <div className="flex items-center justify-between text-zinc-700 dark:text-zinc-300 font-semibold">
            <span className="flex items-center gap-1.5">
              <Images className="w-3.5 h-3.5 text-[#3b1a83]" />
              Gallery Photos:
            </span>
            <span>{galleryImages.length} Images</span>
          </div>
        </div>

        {/* Action Button inside Sidebar for convenience */}
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-[#3b1a83] hover:bg-[#2e1467] text-white text-sm font-bold shadow-md shadow-[#3b1a83]/20 hover:shadow-lg transition-all disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Publishing...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Publish Property</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default LivePreviewSidebar;
