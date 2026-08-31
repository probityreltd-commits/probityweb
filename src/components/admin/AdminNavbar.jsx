"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { Search, Bell, HelpCircle, LogOut, Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

import { motion, AnimatePresence } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const AdminNavbar = ({ onMenuClick }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const { user, isLoading } = useAuth();
  const dropdownRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  const signOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
  };

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

            {isLoading ? (
              <button
                disabled
                className="flex items-center justify-center gap-2 bg-zinc-400 dark:bg-zinc-700 text-white px-6 py-2 rounded-full font-semibold text-sm cursor-not-allowed shadow-md"
              >
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Loading...
              </button>
            ) : user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-10 h-10 rounded-full overflow-hidden border-2 border-white dark:border-zinc-700 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name || "Profile"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#3b1a83] text-white flex items-center justify-center font-bold text-sm">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </button>

                {/* Dropdown */}
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-3 w-56 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-slate-100 dark:border-zinc-800 py-2 z-50 overflow-hidden"
                    >
                      <div className="px-4 py-2.5 border-b border-slate-100 dark:border-zinc-800">
                        <p className="font-semibold text-slate-900 dark:text-white truncate">
                          {user.name}
                        </p>

                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                          {user.email}
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          signOut();
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link href="/auth/signin">
                <button className="bg-[#3b1a83] hover:bg-[#2e1467] text-white px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg active:scale-95">
                  Sign In
                </button>
              </Link>
            )}
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
