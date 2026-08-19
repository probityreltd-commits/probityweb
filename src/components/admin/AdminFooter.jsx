"use client";

import React from "react";
import Link from "next/link";

const AdminFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#f8f7fc] dark:bg-zinc-950 border-t border-zinc-200/80 dark:border-zinc-800/80 px-4 sm:px-8 py-4 transition-colors duration-300 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs sm:text-sm text-[#3b1a83]/80 dark:text-zinc-400 font-medium text-center sm:text-left">
        <div>
          <span>
            © {currentYear} PROBITY Real Estate Ltd. All rights reserved.
          </span>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            href="/admin/status"
            className="hover:text-[#3b1a83] dark:hover:text-indigo-400 transition-colors"
          >
            System Status
          </Link>
          <Link
            href="/privacy-policy"
            className="hover:text-[#3b1a83] dark:hover:text-indigo-400 transition-colors"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default AdminFooter;
