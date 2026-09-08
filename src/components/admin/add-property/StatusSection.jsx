"use client";

import React from "react";

const StatusSection = ({ number, formData, handleChange }) => {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-7 border border-zinc-200/80 dark:border-zinc-800 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center gap-3 pb-4 mb-6 border-b border-zinc-100 dark:border-zinc-800">
        <div className="w-9 h-9 rounded-2xl bg-[#3b1a83]/10 text-[#3b1a83] flex items-center justify-center font-bold text-sm">
          {number}
        </div>
        <div>
          <h2 className="font-sans text-base font-bold text-zinc-900 dark:text-white">
            Project Status & Timeline
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Set construction progress stage and handover commitments
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">
            Construction Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-xs sm:text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3b1a83]/30 focus:border-[#3b1a83] transition-all font-semibold"
          >
            <option value="UPCOMING">UPCOMING</option>
            <option value="UNDER CONSTRUCTION">UNDER CONSTRUCTION</option>
            <option value="READY TO MOVE">READY TO MOVE</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">
            Handover Date
          </label>
          <div className="relative">
            <input
              type="date"
              name="handoverDate"
              value={formData.handoverDate}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-xs sm:text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3b1a83]/30 focus:border-[#3b1a83] transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusSection;
