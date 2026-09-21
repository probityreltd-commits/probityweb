"use client";

import React from "react";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { FaFacebook } from "react-icons/fa";
import { BsInstagram, BsYoutube } from "react-icons/bs";
import { LiaLinkedin } from "react-icons/lia";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Client-provided social media links (If any platform doesn't exist, remove that object)
  const socialLinks = [
    { icon: FaFacebook, href: "https://facebook.com", label: "Facebook" },
    { icon: BsInstagram, href: "https://instagram.com", label: "Instagram" },
    { icon: LiaLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: BsYoutube, href: "https://youtube.com", label: "YouTube" },
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Properties", href: "/properties" },
  ];

  const supportLinks = [
    { name: "Contact Us", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy-policy" },
  ];

  return (
    <footer className="relative bg-white dark:bg-[#070913] text-zinc-800 dark:text-zinc-200 pt-16 pb-8 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-300">
      {/* Background PROBITY Watermark Overlay */}
      <div className="absolute inset-0 flex items-end justify-center pointer-events-none select-none opacity-[0.03] dark:opacity-[0.04] pb-4 mt-20">
        <h1 className="font-serif text-[16vw] font-black tracking-widest text-[#3b1a83] dark:text-white leading-none uppercase">
          PROBITY
        </h1>
      </div>

      <div className="relative max-w-7xl mx-auto z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-zinc-200/80 dark:border-zinc-800/80">
          {/* G-02: Brand & About Column */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-black tracking-tight text-[#3b1a83] dark:text-indigo-400">
                Probity Real Estate Ltd.
              </h2>
              {/* G-02: Updated Brand Text & Bangla Tagline */}
              <p className="mt-4 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-sm font-normal">
                Building safe, quality homes in Bogura. আপনার নিরাপদ ঠিকানা
                গড়তে আমরা প্রতিশ্রুতিবদ্ধ।
              </p>
            </div>

            {/* G-05: Social Media Buttons */}
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map((social, idx) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-9 h-9 rounded-full bg-[#3b1a83] text-white flex items-center justify-center hover:bg-[#2c1363] hover:scale-110 active:scale-95 transition-all shadow-md"
                  >
                    <IconComponent className="w-4 h-4 fill-current" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2">
            <h3 className="font-serif text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {quickLinks.map((link, idx) => (
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

          {/* G-06: Support Column (Privacy Policy link pointing to /privacy-policy) */}
          <div className="lg:col-span-2">
            <h3 className="font-serif text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider mb-4">
              Support
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {supportLinks.map((link, idx) => (
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

          {/* G-03: Footer Contact Info Column */}
          <div className="lg:col-span-4">
            <h3 className="font-serif text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider mb-4">
              Contact Info
            </h3>
            <ul className="space-y-3.5 text-xs sm:text-sm">
              <li className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
                <Phone className="w-4 h-4 text-[#3b1a83] dark:text-indigo-400 shrink-0" />
                <div className="flex items-center gap-2">
                  <a
                    href="tel:+8801711675001"
                    className="hover:text-[#3b1a83] dark:hover:text-indigo-400 transition-colors"
                  >
                    +880 1711-675001
                  </a>
                  <span>|</span>
                  <a
                    href="tel:+8801711675002"
                    className="hover:text-[#3b1a83] dark:hover:text-indigo-400 transition-colors"
                  >
                    +880 1711-675002
                  </a>
                </div>
              </li>

              <li className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
                <Mail className="w-4 h-4 text-[#3b1a83] dark:text-indigo-400 shrink-0" />
                <a
                  href="mailto:probityreltd@gmail.com"
                  className="hover:text-[#3b1a83] dark:hover:text-indigo-400 transition-colors"
                >
                  probityreltd@gmail.com
                </a>
              </li>

              <li className="flex items-start gap-3 text-zinc-600 dark:text-zinc-400">
                <MapPin className="w-4 h-4 text-[#3b1a83] dark:text-indigo-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Rakhi Mansion, Level-5, Jaleswaritola, Bogura
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* G-04: Footer Copyright & Developer Credit Area */}
        <div className="pt-8 text-center">
          <p className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 font-medium">
            &copy; {currentYear} Probity Real Estate Ltd. All rights reserved.
            Design &amp; Developed by{" "}
            <a
              href="https://www.deltadigivast.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#3b1a83] dark:text-indigo-400 hover:underline font-semibold"
            >
              Delta Digivast
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
