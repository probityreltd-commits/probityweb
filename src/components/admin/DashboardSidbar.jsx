"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Building2,
  PlusSquare,
  Users,
  MessageSquare,
  X,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutGrid },
  { name: "Property", href: "/admin/property", icon: Building2 },
  { name: "Add Property", href: "/admin/add-property", icon: PlusSquare },
  // { name: "Clients", href: "/admin/clients", icon: Users },
  { name: "Inquiries", href: "/admin/inquiries", icon: MessageSquare },
];

const DashboardSidbar = ({ isMobileOpen, setIsMobileOpen }) => {
  const pathname = usePathname();

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname, setIsMobileOpen]);

  return (
    <>
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity"
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 w-64 h-screen bg-white dark:bg-zinc-950 border-r border-zinc-200/80 dark:border-zinc-800/80 py-6 flex flex-col justify-between transition-transform duration-300 ease-in-out shrink-0 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="space-y-8">
          <div className="px-6 flex items-center justify-between">
            <Link href="/" className="block group">
              <h1 className="font-sans text-2xl font-black tracking-tight text-[#3b1a83] dark:text-indigo-400 leading-none">
                PROBITY
              </h1>
              <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mt-1.5 tracking-wide">
                Real Estate Ltd.
              </p>
            </Link>

            <button
              type="button"
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-zinc-500 hover:text-zinc-800 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative flex items-center gap-3.5 px-6 py-3 text-sm font-bold transition-all ${
                    isActive
                      ? "bg-[#f0edf9] dark:bg-zinc-900 text-[#3b1a83] dark:text-indigo-400"
                      : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 hover:text-[#3b1a83] dark:hover:text-indigo-400"
                  }`}
                >
                  {isActive && (
                    <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#3b1a83] dark:bg-indigo-500 rounded-r-sm" />
                  )}

                  <Icon
                    className={`w-5 h-5 stroke-[2] ${
                      isActive
                        ? "text-[#3b1a83] dark:text-indigo-400"
                        : "text-zinc-700 dark:text-zinc-400"
                    }`}
                  />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidbar;
