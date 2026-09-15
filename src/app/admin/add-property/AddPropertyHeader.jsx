"use client";

import React from "react";
import { Loader2, Sparkles } from "lucide-react";

const AddPropertyHeader = ({ onReset, onSubmit, isSubmitting }) => {
  return (
    <div className="sticky top-14 sm:top-15 z-20  backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 px-3 sm:px-6 lg:px-8 py-3 sm:py-4 mb-5 sm:mb-8 shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <span className="px-2 sm:px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold tracking-wide uppercase bg-brand/10 text-brand dark:bg-brand/30 dark:text-brand-light">
              Property Management
            </span>
            <span className="text-zinc-400 dark:text-zinc-600">•</span>
            <span className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400">
              Admin Dashboard
            </span>
          </div>
          <h1 className="font-serif text-lg sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-white mt-1">
            Add New Property
          </h1>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={onReset}
            className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all focus:outline-none cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={onSubmit}
            disabled={isSubmitting}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-brand hover:bg-brand-dark text-white text-xs sm:text-sm font-bold shadow-md shadow-brand/20 hover:shadow-lg hover:shadow-brand/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Publishing...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Publish Project</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPropertyHeader;
