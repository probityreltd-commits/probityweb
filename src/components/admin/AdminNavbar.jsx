"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Bell, HelpCircle, Menu, X } from "lucide-react";

const AdminNavbar = ({ onMenuClick }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 w-full bg-[#f8f7fc]/95 dark:bg-zinc-950/95 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800/80 transition-colors duration-300">
      <div className="px-3 sm:px-5 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              type="button"
              onClick={onMenuClick}
              aria-label="Open Sidebar Menu"
              className="lg:hidden shrink-0 p-2 rounded-xl text-[#3b1a83] dark:text-zinc-200 hover:bg-[#3b1a83]/10 dark:hover:bg-zinc-800 transition-colors active:scale-95"
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
            </button>

            <Link href="/" className="group min-w-0">
              <h1 className="font-sans text-base sm:text-xl lg:text-2xl font-black tracking-tight text-[#3b1a83] dark:text-indigo-400 whitespace-nowrap">
                PROBITY{" "}
                <span className="font-semibold text-zinc-700 dark:text-zinc-200">
                  Admin
                </span>
              </h1>
            </Link>
          </div>

          <div className="hidden md:block flex-1 max-w-md lg:max-w-lg mx-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#3b1a83]/70 dark:text-zinc-400">
                <Search className="w-4 h-4" />
              </div>

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects, clients..."
                className="w-full pl-9 pr-4 py-2 bg-white dark:bg-zinc-900 border border-[#3b1a83]/20 dark:border-zinc-700/80 rounded-full text-xs sm:text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#3b1a83]/30 dark:focus:ring-indigo-500/30 focus:border-[#3b1a83] transition-all shadow-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2 lg:gap-4 shrink-0">
            <button
              type="button"
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              aria-label="Search"
              className="md:hidden p-2 rounded-full text-[#3b1a83] dark:text-zinc-300 hover:bg-[#3b1a83]/10 dark:hover:bg-zinc-800 transition-colors active:scale-95"
            >
              {mobileSearchOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Search className="w-5 h-5" />
              )}
            </button>

            <button
              type="button"
              aria-label="Notifications"
              className="relative p-2 rounded-full text-[#3b1a83] dark:text-zinc-300 hover:bg-[#3b1a83]/10 dark:hover:bg-zinc-800 transition-colors active:scale-95"
            >
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />

              <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full ring-2 ring-[#f8f7fc] dark:ring-zinc-950" />
            </button>

            <button
              type="button"
              aria-label="Help & Support"
              className="hidden lg:flex p-2 rounded-full text-[#3b1a83] dark:text-zinc-300 hover:bg-[#3b1a83]/10 dark:hover:bg-zinc-800 transition-colors active:scale-95"
            >
              <HelpCircle className="w-5 h-5" />
            </button>

            <div className="relative w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full overflow-hidden border-2 border-zinc-200 dark:border-zinc-700 hover:border-[#3b1a83] transition-all cursor-pointer shrink-0 shadow-sm">
              <Image
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
                alt="Admin Profile"
                fill
                sizes="40px"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {mobileSearchOpen && (
          <div className="md:hidden max-w-7xl mx-auto mt-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#3b1a83]/70 dark:text-zinc-400">
                <Search className="w-4 h-4" />
              </div>

              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects, clients..."
                className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-zinc-900 border border-[#3b1a83]/20 dark:border-zinc-700/80 rounded-xl text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#3b1a83]/30 dark:focus:ring-indigo-500/30 focus:border-[#3b1a83] transition-all shadow-sm"
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default AdminNavbar;
