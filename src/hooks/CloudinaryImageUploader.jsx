"use client";

import React, { useState } from "react";
import {
  UploadCloud,
  CheckCircle2,
  X,
  FileText,
  Image as ImageIcon,
} from "lucide-react";

const CloudinaryImageUploader = ({ images = [], setImages = () => {} }) => {
  const [uploading, setUploading] = useState(false);

  const CLOUD_NAME =
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "your_cloud_name";
  const UPLOAD_PRESET =
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "your_upload_preset";

  const handleFileUpload = async (files) => {
    if (!files || files.length === 0) return;
    setUploading(true);

    const uploadedList = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);

      try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
          {
            method: "POST",
            body: formData,
          },
        );
        const data = await res.json();

        if (data.secure_url) {
          uploadedList.push({
            name: file.name,
            url: data.secure_url,
            type: file.type.includes("pdf") ? "pdf" : "image",
            size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
          });
        }
      } catch (error) {
        console.error("Cloudinary Upload Error:", error);
      }
    }

    setImages((prev) => [...prev, ...uploadedList]);
    setUploading(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const removeFile = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {/* Drag & Drop Upload Zone */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="relative border-2 border-dashed border-zinc-200 dark:border-zinc-800 hover:border-[#3b1a83] dark:hover:border-indigo-500 rounded-2xl p-8 text-center bg-zinc-50/50 dark:bg-zinc-900/40 transition-colors group cursor-pointer"
      >
        <input
          type="file"
          multiple
          accept="image/*,application/pdf"
          onChange={(e) => handleFileUpload(e.target.files)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#f0edf9] dark:bg-zinc-800 text-[#3b1a83] dark:text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
            <UploadCloud className="w-6 h-6 stroke-[2]" />
          </div>
          <div>
            <p className="text-sm font-bold text-zinc-900 dark:text-white">
              {uploading
                ? "Uploading to Cloudinary..."
                : "Drag and drop project photos"}
            </p>
            <p className="text-xs text-zinc-400 font-medium mt-1 max-w-sm mx-auto">
              Support for high-resolution PNG, JPG, or PDF specification sheets.
              Max size 20MB per file.
            </p>
          </div>
        </div>
      </div>

      {/* Uploaded Items List */}
      {images.length > 0 && (
        <div className="space-y-2.5">
          {images.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-xl"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0">
                  {file.type === "pdf" ? (
                    <FileText className="w-5 h-5 text-amber-500" />
                  ) : (
                    <ImageIcon className="w-5 h-5 text-[#3b1a83] dark:text-indigo-400" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200 truncate">
                    {file.name}
                  </p>
                  {index === 0 && (
                    <span className="text-[10px] font-bold tracking-wider text-[#3b1a83] uppercase">
                      COVER IMAGE
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Uploaded
                </span>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="p-1 rounded-lg text-zinc-400 hover:text-rose-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Image Thumbnails Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 pt-2">
        {images.map((file, idx) => (
          <div
            key={idx}
            className="relative aspect-video rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 group"
          >
            {file.type === "pdf" ? (
              <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center">
                <FileText className="w-6 h-6 text-amber-500" />
                <span className="text-[10px] font-bold text-zinc-500 truncate w-full">
                  {file.name}
                </span>
              </div>
            ) : (
              <img
                src={file.url}
                alt={`Upload ${idx}`}
                className="w-full h-full object-cover"
              />
            )}
            {idx === 0 && (
              <span className="absolute bottom-1.5 left-1.5 text-[9px] font-extrabold bg-[#3b1a83] text-white px-2 py-0.5 rounded-md uppercase tracking-wider">
                COVER IMAGE
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CloudinaryImageUploader;
