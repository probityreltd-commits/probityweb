"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogOut,
  Menu,
  Phone,
  X,
  LayoutDashboard,
  User as UserIcon,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { authClient } from "@/lib/auth-client";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  const { user, isLoading } = useAuth();
  const isAdmin = user?.role === "admin";

  const baseLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Properties", href: "/properties" },
    { name: "Contact", href: "/contact" },
  ];

  const navLinks = isAdmin
    ? [...baseLinks, { name: "Dashboard", href: "/admin/dashboard" }]
    : baseLinks;

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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

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
    <header className="fixed top-0 left-0 w-full z-50 px-2 sm:px-4 md:px-6 lg:px-8 py-2.5 sm:py-3 md:py-4">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-7xl mx-auto bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md rounded-full pl-3 pr-2.5 sm:pl-4 sm:pr-3 md:px-6 py-1.5 sm:py-2 shadow-lg border border-zinc-200/60 dark:border-zinc-800 flex items-center justify-between gap-2 transition-colors duration-300"
      >
        {/* 1. Brand Logo & Name — container reshaped to the logo's own
            (portrait/square) proportions instead of a short, wide box that
            was forcing object-contain to shrink it down and leave dead
            space to the right */}
        <Link href="/" className="flex items-center shrink-0 group">
          <div className="relative w-[110px] sm:w-[130px] md:w-[150px] h-12 sm:h-14 md:h-16">
            <Image
              src="/images/mainLogo.png"
              alt="Probity Real Estate Ltd."
              fill
              sizes="150px"
              priority
              className="object-contain object-left transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </div>
        </Link>

        {/* 2. Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative py-1 whitespace-nowrap transition-colors duration-200 ${
                  isActive
                    ? "text-amber-600 dark:text-amber-400 font-semibold"
                    : "text-zinc-700 dark:text-zinc-300 hover:text-brand dark:hover:text-white"
                }`}
              >
                {link.name}

                {isActive && (
                  <motion.span
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-amber-500 rounded-full"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* 3. Right Action Items */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 shrink-0">
          <div className="hidden xl:flex items-center gap-2 text-zinc-700 dark:text-zinc-300 text-sm font-medium border-r border-zinc-200 dark:border-zinc-800 pr-4">
            <Phone className="w-4 h-4 text-brand dark:text-amber-400 shrink-0" />
            <span className="font-mono text-xs font-semibold whitespace-nowrap">
              +880 1711-675001
            </span>
          </div>

          {isLoading ? (
            <button
              disabled
              aria-label="Loading profile"
              className="flex items-center justify-center gap-2 bg-zinc-200 dark:bg-zinc-800 text-zinc-500 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full font-semibold text-xs sm:text-sm cursor-not-allowed"
            >
              <span className="w-4 h-4 border-2 border-brand/40 border-t-brand rounded-full animate-spin" />
              <span className="hidden sm:inline">Loading...</span>
            </button>
          ) : user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-label="User menu"
                aria-expanded={dropdownOpen}
                className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-brand/20 dark:border-zinc-700 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center bg-brand text-white font-bold text-sm shrink-0"
              >
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || "Profile"}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>
                    {user.name?.charAt(0).toUpperCase() || (
                      <UserIcon className="w-4 h-4" />
                    )}
                  </span>
                )}
              </button>

              {/* Profile Dropdown */}
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-3 w-52 sm:w-56 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-100 dark:border-zinc-800 py-2 z-50 overflow-hidden"
                  >
                    <div className="px-4 py-2.5 border-b border-zinc-100 dark:border-zinc-800">
                      <p className="font-semibold text-zinc-900 dark:text-white truncate text-sm">
                        {user.name}
                      </p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                        {user.email}
                      </p>
                    </div>

                    {/* Dashboard Option for Admin */}
                    {isAdmin && (
                      <Link
                        href="/admin/dashboard"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-sm font-medium border-b border-zinc-100 dark:border-zinc-800"
                      >
                        <LayoutDashboard className="w-4 h-4 text-brand dark:text-amber-400" />
                        Dashboard
                      </Link>
                    )}

                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        signOut();
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors text-left text-sm font-medium"
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
              <button className="bg-brand hover:bg-brand-dark text-white px-3.5 sm:px-5 md:px-6 py-1.5 sm:py-2 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 whitespace-nowrap">
                Sign In
              </button>
            </Link>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            className="lg:hidden p-1.5 sm:p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-800 dark:text-white shrink-0"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </motion.div>

      {/* Mobile / Tablet Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden max-w-7xl mx-auto mt-2 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-lg rounded-2xl border border-zinc-200 dark:border-zinc-800 p-3 sm:p-4 shadow-xl overflow-hidden"
          >
            <div className="flex flex-col gap-1.5 sm:gap-2">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold"
                        : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="pt-2 mt-1 border-t border-zinc-100 dark:border-zinc-800 flex items-center gap-3 px-4 py-2 text-zinc-700 dark:text-zinc-300 text-sm">
                <Phone className="w-4 h-4 text-brand dark:text-amber-400 shrink-0" />
                <span className="font-mono text-xs">+880 1711-675001</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
