"use client";

import React from "react";
import { Images } from "lucide-react";
import CloudinaryImageUploader from "@/hooks/CloudinaryImageUploader";

const GalleryImagesSection = ({ number, galleryImages, setGalleryImages }) => {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-7 border border-zinc-200/80 dark:border-zinc-800 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center gap-3 pb-4 mb-6 border-b border-zinc-100 dark:border-zinc-800">
        <div className="w-9 h-9 rounded-2xl bg-[#3b1a83]/10 text-[#3b1a83] flex items-center justify-center font-bold text-sm">
          {number}
        </div>
        <div>
          <h2 className="font-sans text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <Images className="w-4 h-4 text-[#3b1a83]" />
            Gallery Images (Property Details Page)
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            A separate photo collection — shown only in the image gallery on
            the property details page, independent from the cover image above
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <CloudinaryImageUploader
          images={galleryImages}
          setImages={setGalleryImages}
        />

        {galleryImages.length > 0 && (
          <div className="flex items-center gap-2 p-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs text-zinc-600 dark:text-zinc-400">
            <Images className="w-4 h-4 shrink-0 text-[#3b1a83]" />
            <span>
              <strong className="font-bold text-zinc-800 dark:text-zinc-200">
                {galleryImages.length} image
                {galleryImages.length === 1 ? "" : "s"}
              </strong>{" "}
              added to the details-page gallery.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryImagesSection;
