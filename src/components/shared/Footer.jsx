"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { FaFacebook } from "react-icons/fa";
import { BsInstagram, BsYoutube } from "react-icons/bs";
import { LiaLinkedin } from "react-icons/lia";

const Footer = () => {
  return (
    <footer className="relative bg-white dark:bg-[#070913] text-zinc-800 dark:text-zinc-200 pt-16 pb-8 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-300">
      {/* Background PROBITY Watermark Overlay */}
      <div className="absolute inset-0 flex items-end justify-center pointer-events-none select-none opacity-[0.03] dark:opacity-[0.05] pb-4 mt-20">
        <h1 className="font-serif text-[16vw] font-black tracking-widest text-[#3b1a83] dark:text-white leading-none uppercase">
          PROBITY
        </h1>
      </div>

      <div className="relative max-w-7xl mx-auto z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-zinc-200/80 dark:border-zinc-800">
          {/* Brand & About Column (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              {/* Brand Logo Title -> font-serif & Brand Color */}
              <h2 className="font-serif text-2xl sm:text-3xl font-black tracking-tight text-[#3b1a83] dark:text-indigo-400">
                PROBITY
              </h2>
              <p className="mt-4 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-sm font-normal">
                Crafting legacy residential developments for those who
                appreciate uncompromising quality and architectural excellence.
              </p>
            </div>

            {/* Social Media Buttons with Brand Color #3b1a83 */}
            <div className="flex items-center gap-3 mt-6">
              {[
                { icon: FaFacebook, href: "#", label: "Facebook" },
                { icon: BsInstagram, href: "#", label: "Instagram" },
                { icon: LiaLinkedin, href: "#", label: "LinkedIn" },
                { icon: BsYoutube, href: "#", label: "YouTube" },
              ].map((social, idx) => {
                const IconComponent = social.icon;
                return (
                  <Link
                    key={idx}
                    href={social.href}
                    aria-label={social.label}
                    className="w-9 h-9 rounded-full bg-[#3b1a83] text-white flex items-center justify-center hover:bg-[#2c1363] hover:scale-110 transition-all shadow-md active:scale-95"
                  >
                    <IconComponent className="w-4 h-4 fill-current" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick Links Column (2 Cols) */}
          <div className="lg:col-span-2">
            <h3 className="font-serif text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {[
                { name: "Home", href: "/" },
                { name: "About", href: "/about" },
                { name: "Project", href: "/properties" },
                { name: "Blog & News", href: "/blog" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-zinc-600 dark:text-zinc-400 hover:text-[#3b1a83] dark:hover:text-indigo-400 transition-colors font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column (2 Cols) */}
          <div className="lg:col-span-2">
            <h3 className="font-serif text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider mb-4">
              Support
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {[
                { name: "Contact Us", href: "/contact" },
                { name: "FAQ", href: "/faq" },
                { name: "Privacy Policy", href: "/privacy-policy" },
                { name: "Terms of Service", href: "/terms" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-zinc-600 dark:text-zinc-400 hover:text-[#3b1a83] dark:hover:text-indigo-400 transition-colors font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info Column (4 Cols) */}
          <div className="lg:col-span-4">
            <h3 className="font-serif text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider mb-4">
              Contact Info
            </h3>
            <ul className="space-y-3.5 text-xs sm:text-sm">
              <li className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
                <Phone className="w-4 h-4 text-[#3b1a83] dark:text-indigo-400 shrink-0" />
                <a
                  href="tel:+8801795199599"
                  className="hover:text-[#3b1a83] dark:hover:text-indigo-400 transition-colors"
                >
                  +8801795-199599
                </a>
              </li>

              <li className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
                <Mail className="w-4 h-4 text-[#3b1a83] dark:text-indigo-400 shrink-0" />
                <a
                  href="mailto:contact@probityholdings.com"
                  className="hover:text-[#3b1a83] dark:hover:text-indigo-400 transition-colors"
                >
                  contact@probityholdings.com
                </a>
              </li>

              <li className="flex items-start gap-3 text-zinc-600 dark:text-zinc-400">
                <MapPin className="w-4 h-4 text-[#3b1a83] dark:text-indigo-400 shrink-0 mt-0.5" />
                <span>
                  10th Floor, JCX Business Tower, 1136/A, Japan Street, Block I,
                  Bashundhara R/A, Dhaka
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Area */}
        <div className="pt-8 text-center">
          <p className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 font-medium">
            &copy; {new Date().getFullYear()} Probity Holdings Ltd. All rights
            reserved - Design &amp; Developed by JoulseLabs
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
