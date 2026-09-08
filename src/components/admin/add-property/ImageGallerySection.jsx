"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";
import CloudinaryImageUploader from "@/hooks/CloudinaryImageUploader";

const ImageGallerySection = ({ number, uploadedImages, setUploadedImages }) => {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-7 border border-zinc-200/80 dark:border-zinc-800 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center gap-3 pb-4 mb-6 border-b border-zinc-100 dark:border-zinc-800">
        <div className="w-9 h-9 rounded-2xl bg-[#3b1a83]/10 text-[#3b1a83] flex items-center justify-center font-bold text-sm">
          {number}
        </div>
        <div>
          <h2 className="font-sans text-base font-bold text-zinc-900 dark:text-white">
            Project Cover & Main Images
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Upload showcase photos. The first uploaded image serves as the
            cover image on listing cards and the details page hero.
          </p>
        </div>
      </div>

      {/* Cloudinary Image Uploader Component Integration */}
      <div className="space-y-4">
        <CloudinaryImageUploader
          images={uploadedImages}
          setImages={setUploadedImages}
        />

        {/* Display Cover Image Notice */}
        {uploadedImages.length > 0 && (
          <div className="flex items-center gap-2 p-3 bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/50 rounded-xl text-xs text-[#3b1a83] dark:text-purple-300">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-[#3b1a83] dark:text-purple-400" />
            <span>
              <strong className="font-bold">Cover Image:</strong> The first
              image in the grid will be displayed as the primary hero image on
              property listings.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGallerySection;
