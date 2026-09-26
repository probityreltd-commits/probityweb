"use client";

import React from "react";
import Image from "next/image";
import {
  Building2,
  MapPin,
  Sparkles,
  Loader2,
  Images,
  Map,
} from "lucide-react";

/**
 * Helper function to safely extract image URL
 */
const getImageUrl = (image) => {
  if (!image) return null;
  if (typeof image === "string") return image;
  return image.url || image.secure_url || null;
};

const LivePreviewSidebar = ({
  formData = {},
  uploadedImages = [],
  galleryImages = [],
  brochureFile = null,
  selectedAmenities = [],
  isSubmitting = false,
  handleSubmit,
}) => {
  const coverImage = getImageUrl(uploadedImages[0]);

  return (
    <div className="lg:col-span-4 space-y-6">
      <div className="sticky top-40 space-y-5 rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-100 pb-3 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-500" />
            <h3 className="font-sans text-sm font-bold text-zinc-900 dark:text-white">
              Live Listing Card Preview
            </h3>
          </div>
          <span className="text-[11px] text-zinc-400">Real-time update</span>
        </div>

        {/* Property Card Visual */}
        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-950">
          {/* Image Cover Preview */}
          <div className="relative h-48 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
            {coverImage ? (
              <Image
                src={coverImage}
                alt={formData.title || "Property Cover"}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
                unoptimized={
                  coverImage.startsWith("blob:") ||
                  coverImage.startsWith("data:")
                }
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-zinc-400">
                <Building2 className="h-8 w-8 stroke-1" />
                <span className="text-xs">No Cover Image Uploaded</span>
              </div>
            )}

            {/* Status Badge */}
            <span className="absolute left-3 top-3 rounded-full bg-[#3b1a83] px-3 py-1 text-[10px] font-bold tracking-wider text-white uppercase shadow-md">
              {formData.status || "STATUS"}
            </span>

            {/* Property Type Badge */}
            {formData.propertyType && (
              <span className="absolute bottom-3 left-3 rounded-lg bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-zinc-800 backdrop-blur-xs dark:bg-zinc-900/90 dark:text-zinc-200">
                {formData.propertyType}
              </span>
            )}
          </div>

          {/* Card Body */}
          <div className="space-y-3 p-4">
            <div>
              <h4 className="line-clamp-1 font-serif text-base font-bold text-zinc-900 dark:text-white">
                {formData.title || "Project Title Preview"}
              </h4>
              <div className="mt-1 flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-[#3b1a83]" />
                <span className="truncate">
                  {formData.locationName || formData.address || "Location Name"}
                </span>
              </div>
            </div>

            {/* Specifications Grid */}
            <div className="grid grid-cols-3 gap-2 rounded-xl border border-zinc-100 bg-zinc-50 px-3 py-2 text-center text-xs dark:border-zinc-800/80 dark:bg-zinc-900/60">
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
                <strong className="block truncate font-bold text-zinc-800 dark:text-zinc-200">
                  {formData.flatSize || "-"}
                </strong>
              </div>
            </div>

            {/* Extended Summary Badges */}
            {(formData.landArea ||
              formData.buildingHeight ||
              formData.apartments) && (
              <div className="space-y-1.5 pt-1 text-xs text-zinc-600 dark:text-zinc-400">
                {formData.landArea && (
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-zinc-400">Land Area:</span>
                    <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                      {formData.landArea}
                    </span>
                  </div>
                )}
                {formData.buildingHeight && (
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-zinc-400">Height:</span>
                    <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                      {formData.buildingHeight}
                    </span>
                  </div>
                )}
                {formData.apartments && (
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-zinc-400">Apartments:</span>
                    <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                      {formData.apartments} Units
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Selected Amenities Pills Preview */}
            {selectedAmenities.length > 0 && (
              <div className="border-t border-zinc-100 pt-2 dark:border-zinc-800">
                <span className="mb-1.5 block text-[10px] font-bold text-zinc-400 uppercase">
                  Key Amenities ({selectedAmenities.length})
                </span>
                <div className="flex flex-wrap gap-1">
                  {selectedAmenities.slice(0, 4).map((amenity, idx) => (
                    <span
                      key={`${amenity}-${idx}`}
                      className="rounded-md bg-[#3b1a83]/10 px-2 py-0.5 text-[10px] font-medium text-[#3b1a83] dark:bg-[#3b1a83]/30 dark:text-purple-300"
                    >
                      {amenity}
                    </span>
                  ))}
                  {selectedAmenities.length > 4 && (
                    <span className="rounded-md bg-zinc-100 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                      +{selectedAmenities.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Form Submission Quick Summary Notice */}
        <div className="space-y-2 rounded-2xl border border-zinc-200/80 bg-zinc-50 p-4 text-xs text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
          <div className="flex items-center justify-between font-semibold text-zinc-700 dark:text-zinc-300">
            <span className="flex items-center gap-1.5">
              <Map className="h-3.5 w-3.5 text-[#3b1a83]" />
              Map Location:
            </span>
            <span>{formData.mapLocation ? "Configured" : "Not set"}</span>
          </div>
          <div className="flex items-center justify-between font-semibold text-zinc-700 dark:text-zinc-300">
            <span>Brochure Attached:</span>
            <span>{brochureFile ? "Yes (PDF)" : "No"}</span>
          </div>
          <div className="flex items-center justify-between font-semibold text-zinc-700 dark:text-zinc-300">
            <span>Cover/Main Photos:</span>
            <span>{uploadedImages.length} Images</span>
          </div>
          <div className="flex items-center justify-between font-semibold text-zinc-700 dark:text-zinc-300">
            <span className="flex items-center gap-1.5">
              <Images className="h-3.5 w-3.5 text-[#3b1a83]" />
              Gallery Photos:
            </span>
            <span>{galleryImages.length} Images</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#3b1a83] py-3 text-sm font-bold text-white shadow-md shadow-[#3b1a83]/20 transition-all hover:bg-[#2e1467] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Publishing...</span>
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              <span>Publish Property</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default LivePreviewSidebar;
