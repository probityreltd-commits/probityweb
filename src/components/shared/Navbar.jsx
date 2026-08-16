"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  ChevronDown,
  Heart,
  LogOut,
  Menu,
  Phone,
  Settings,
  User,
  X,
} from "lucide-react";

const navLinks = [
  { name: "Home", href: "/", active: true },
  { name: "About", href: "/about" },
  { name: "Properties", href: "/properties" },
  { name: "Contact", href: "/contact" },
];

const Navbar = () => {
  // Simulating User Login & Dropdown states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 md:px-8 py-4">
      {/* Outer Floating Card Container matching Image UI */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-7xl mx-auto bg-slate-200/90 dark:bg-zinc-900/90 backdrop-blur-md rounded-full px-6 py-2.5 shadow-lg border border-white/20 dark:border-zinc-800/80 flex items-center justify-between transition-colors duration-300"
      >
        {/* 1. Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#3b1a83] to-purple-600 flex items-center justify-center text-white shadow-md transition-transform duration-300 group-hover:scale-105">
            <Building2 className="w-5 h-5" />
          </div>
          <span className="text-lg md:text-xl font-bold tracking-tight text-[#3b1a83] dark:text-white">
            Probiti
          </span>
        </Link>

        {/* 2. Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`relative py-1 transition-colors duration-200 ${
                link.active
                  ? "text-amber-600 dark:text-amber-400 font-semibold"
                  : "text-slate-700 dark:text-slate-300 hover:text-[#3b1a83] dark:hover:text-white"
              }`}
            >
              {link.name}
              {link.active && (
                <motion.span
                  layoutId="activeIndicator"
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-amber-500 rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* 3. Phone Number & Auth Action Section */}
        <div className="flex items-center gap-4">
          {/* Phone Number with Vertical Separator */}
          <div className="hidden lg:flex items-center gap-4 text-slate-700 dark:text-slate-300 text-sm font-medium border-r border-slate-300 dark:border-zinc-700 pr-4">
            <Phone className="w-4 h-4 text-[#3b1a83] dark:text-amber-400" />
            <span>+880 1700-000000</span>
          </div>

          {/* Conditional Auth Button / Profile Dropdown */}
          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 p-1.5 pl-3 rounded-full bg-white dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 hover:shadow-md transition-all duration-200 text-slate-800 dark:text-white text-sm font-medium"
              >
                <span>John Doe</span>
                <div className="w-8 h-8 rounded-full bg-[#3b1a83] text-white flex items-center justify-center font-bold text-xs">
                  JD
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Custom Animated Dropdown Menu (No shadcn) */}
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute right-0 mt-3 w-56 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-slate-100 dark:border-zinc-800 py-2 z-50 text-slate-700 dark:text-slate-200 text-sm overflow-hidden"
                  >
                    <div className="px-4 py-2 border-b border-slate-100 dark:border-zinc-800">
                      <p className="font-semibold text-slate-900 dark:text-white">
                        John Doe
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        john@probiti.com
                      </p>
                    </div>

                    {/* <Link
                      href="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-zinc-800/60 transition-colors"
                    >
                      <User className="w-4 h-4 text-slate-500" /> My Profile
                    </Link>
                    <Link
                      href="/saved-properties"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-zinc-800/60 transition-colors"
                    >
                      <Heart className="w-4 h-4 text-slate-500" /> Saved Homes
                    </Link>
                    <Link
                      href="/settings"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-zinc-800/60 transition-colors"
                    >
                      <Settings className="w-4 h-4 text-slate-500" /> Settings
                    </Link> */}

                    {/* <div className="my-1 border-t border-slate-100 dark:border-zinc-800" /> */}

                    <button
                      onClick={() => {
                        setIsLoggedIn(false);
                        setDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <button
              onClick={() => setIsLoggedIn(true)}
              className="bg-[#3b1a83] hover:bg-[#2e1467] text-white px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
            >
              Sign In
            </button>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-full hover:bg-slate-300/50 dark:hover:bg-zinc-800 transition-colors text-slate-800 dark:text-white"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </motion.div>

      {/* 4. Mobile Navigation Drawer (No shadcn) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="xl:hidden max-w-7xl mx-auto mt-2 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-lg rounded-2xl border border-slate-200 dark:border-zinc-800 p-5 shadow-xl overflow-hidden"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    link.active
                      ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-zinc-800"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-2 border-t border-slate-100 dark:border-zinc-800 flex items-center gap-3 px-4 py-2 text-slate-700 dark:text-slate-300 text-sm">
                <Phone className="w-4 h-4 text-[#3b1a83] dark:text-amber-400" />
                <span>+880 1700-000000</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
