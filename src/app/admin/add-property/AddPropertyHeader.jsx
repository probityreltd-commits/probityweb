"use client";

import React from "react";
import { Loader2, Sparkles } from "lucide-react";

const AddPropertyHeader = ({ onReset, onSubmit, isSubmitting }) => {
  return (
    <div className="sticky top-15 z-20  backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 px-4 sm:px-6 lg:px-8 py-4 mb-8 shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-[#3b1a83]/10 text-[#3b1a83] dark:bg-[#3b1a83]/30 dark:text-purple-300">
              Property Management
            </span>
            <span className="text-zinc-400 dark:text-zinc-600">•</span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              Admin Dashboard
            </span>
          </div>
          <h1 className="font-serif text-2xl font-bold tracking-tight text-zinc-900 dark:text-white mt-1">
            Add New Property
          </h1>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={onReset}
            className="px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all focus:outline-none"
          >
            Cancel
          </button>

          <button
            onClick={onSubmit}
            disabled={isSubmitting}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#3b1a83] hover:bg-[#2e1467] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#3b1a83]/20 hover:shadow-lg hover:shadow-[#3b1a83]/30 transition-all disabled:opacity-50"
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
