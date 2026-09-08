"use client";

import React from "react";
import { FileText, UploadCloud, Loader2, Eye, Trash2 } from "lucide-react";

const BrochureSection = ({
  number,
  brochureFile,
  isUploadingPdf,
  handleBrochureUpload,
  removeBrochure,
}) => {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-7 border border-zinc-200/80 dark:border-zinc-800 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center gap-3 pb-4 mb-6 border-b border-zinc-100 dark:border-zinc-800">
        <div className="w-9 h-9 rounded-2xl bg-[#3b1a83]/10 text-[#3b1a83] flex items-center justify-center font-bold text-sm">
          {number}
        </div>
        <div>
          <h2 className="font-sans text-base font-bold text-zinc-900 dark:text-white">
            Project Brochure (PDF)
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Upload official PDF prospectus for download on listing pages
          </p>
        </div>
      </div>

      {!brochureFile ? (
        <label className="relative flex flex-col items-center justify-center p-8 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-2xl cursor-pointer hover:border-[#3b1a83] dark:hover:border-purple-500 hover:bg-zinc-50/80 dark:hover:bg-zinc-950/50 transition-all group">
          <input
            type="file"
            accept="application/pdf"
            onChange={handleBrochureUpload}
            className="hidden"
            disabled={isUploadingPdf}
          />

          {isUploadingPdf ? (
            <div className="flex flex-col items-center gap-2 text-zinc-500">
              <Loader2 className="w-8 h-8 animate-spin text-[#3b1a83]" />
              <span className="text-xs font-semibold">
                Uploading PDF Document...
              </span>
            </div>
          ) : (
            <>
              <div className="w-14 h-14 rounded-2xl bg-[#3b1a83]/10 text-[#3b1a83] dark:bg-purple-900/30 dark:text-purple-300 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <UploadCloud className="w-7 h-7" />
              </div>
              <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                Click to upload or drag & drop PDF brochure
              </p>
              <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
                Supported file format: PDF only (Max size: 25MB)
              </p>
            </>
          )}
        </label>
      ) : (
        <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-11 h-11 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white truncate">
                {brochureFile.name}
              </p>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                {brochureFile.size} • PDF Prospectus Ready
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={brochureFile.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl text-zinc-500 hover:text-[#3b1a83] hover:bg-zinc-200/60 dark:hover:bg-zinc-800 transition-colors"
              title="Preview PDF"
            >
              <Eye className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={removeBrochure}
              className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
              title="Remove PDF"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrochureSection;
