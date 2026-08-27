"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Heart,
  Share2,
  Printer,
  ChevronLeft,
  ChevronRight,
  Bed,
  Bath,
  Maximize2,
  Calendar,
  Compass,
  Building2,
  User,
  Send,
  Video,
  UserCheck,
  X,
  Expand,
} from "lucide-react";

/**
 * Design system for this page ("Estate Ledger")
 * ------------------------------------------------
 * Brand accent : #431780  (your brand purple — the one accent color)
 * Surfaces     : zinc-50/zinc-900 scale, matching the page wrapper
 *                (bg-[#f5f1ff] light / bg-[#070913] dark)
 *
 * Display face: Fraunces (characterful serif, does the talking)
 * Body face:    Inter (quiet, does the reading)
 * Utility face: IBM Plex Mono (blueprint annotations, specs, refs)
 *
 * Signature element: the property is presented like a surveyor's
 * document — a status stamp on the hero, and a floating "spec
 * ledger" strip with dotted leader lines, like annotations on an
 * architectural drawing.
 */

const FONT_IMPORTS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
`;

const BRAND = "#431780";

const formatDate = (value) => {
  if (!value) return null;
  try {
    return new Date(value).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return value;
  }
};

const PropertyDetailsClient = ({ property }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [tourType, setTourType] = useState("In Person");
  const [activeTab, setActiveTab] = useState("schedule");
  const [imgErrors, setImgErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleFieldChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  // Builds the exact object to send to your API/DB later.
  // Swap the console.log below for your POST call, e.g.:
  //   await fetch("/api/leads", { method: "POST", body: JSON.stringify(payload) })
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const payload = {
      // Which widget this came from + what the user chose
      requestType: activeTab === "schedule" ? "SCHEDULE_TOUR" : "REQUEST_INFO",
      tourType: activeTab === "schedule" ? tourType : null, // "In Person" | "Video Chat"

      // Contact details
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),

      // Which property this lead is about (for a foreign key / reference)
      property: {
        id: property?._id || null,
        slug: property?.slug || null,
        title: property?.title || null,
      },

      // When the lead was created
      createdAt: new Date().toISOString(),
    };

    console.log("Lead submission payload:", payload);
    console.log(JSON.stringify(payload, null, 2));

    setSubmitted(true);
    setFormData({ name: "", phone: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 3000);
  };

  const rawImages =
    property?.images?.length > 0
      ? property.images
      : property?.coverImage
        ? [property.coverImage]
        : [];

  // Filter out any image URL that failed to load so the gallery
  // never gets stuck on a broken slide.
  const images = rawImages.filter((_, idx) => !imgErrors[idx]);
  const safeIndex = Math.min(activeImageIndex, Math.max(images.length - 1, 0));

  const handlePrev = useCallback(() => {
    setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, handlePrev, handleNext]);

  const handoverLabel = formatDate(property?.handoverDate);
  const listedLabel = formatDate(property?.createdAt);

  const stats = [
    property?.bedrooms != null && {
      icon: Bed,
      label: "Bedrooms",
      value: `${property.bedrooms}`,
    },
    property?.bathrooms != null && {
      icon: Bath,
      label: "Bathrooms",
      value: `${property.bathrooms}`,
    },
    property?.flatSize && {
      icon: Maximize2,
      label: "Area",
      value: property.flatSize,
    },
    property?.orientation && {
      icon: Compass,
      label: "Facing",
      value: property.orientation,
    },
    handoverLabel && {
      icon: Calendar,
      label: "Handover",
      value: handoverLabel,
    },
  ].filter(Boolean);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{FONT_IMPORTS}</style>
      <style>{`
        .ledger-font { font-family: 'IBM Plex Mono', monospace; }
        .display-font { font-family: 'Fraunces', serif; }
        .leader-line {
          width: 100%;
          border-top: 1px dotted ${BRAND}99;
          margin: 10px 0;
        }
        .film-thumb::-webkit-scrollbar { height: 6px; }
        .film-thumb::-webkit-scrollbar-thumb {
          background: rgba(148,163,184,0.4);
          border-radius: 999px;
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
      `}</style>

      {/* ============ TOP BAR ============ */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[11px] ledger-font uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
          <Link
            href="/"
            className="hover:text-[#431780] dark:hover:text-violet-300 transition-colors"
          >
            Home
          </Link>
          <span>/</span>
          <Link
            href="/properties"
            className="hover:text-[#431780] dark:hover:text-violet-300 transition-colors"
          >
            Properties
          </Link>
          <span>/</span>
          <span className="text-zinc-800 dark:text-zinc-100 normal-case tracking-normal truncate max-w-[160px] sm:max-w-xs">
            {property.title}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            aria-label="Save property"
            className="w-9 h-9 rounded-full border border-zinc-300/70 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 flex items-center justify-center hover:border-[#431780] hover:text-[#431780] transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#431780] bg-white/70 dark:bg-zinc-900/70"
          >
            <Heart className="w-4 h-4" />
          </button>
          <button
            aria-label="Share property"
            className="w-9 h-9 rounded-full border border-zinc-300/70 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 flex items-center justify-center hover:border-[#431780] hover:text-[#431780] transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#431780] bg-white/70 dark:bg-zinc-900/70"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            aria-label="Print page"
            onClick={() => window.print()}
            className="w-9 h-9 rounded-full border border-zinc-300/70 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 flex items-center justify-center hover:border-[#431780] hover:text-[#431780] transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#431780] bg-white/70 dark:bg-zinc-900/70"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ============ HERO ============ */}
      <div className="mt-5">
        <div className="relative w-full h-[52vh] sm:h-[68vh] rounded-[28px] overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-200 dark:bg-zinc-800 group">
          {images.length > 0 ? (
            <Image
              src={images[safeIndex]}
              alt={`${property.title} — view ${safeIndex + 1}`}
              fill
              priority
              unoptimized
              sizes="(max-width: 768px) 100vw, 1152px"
              onError={() =>
                setImgErrors((prev) => ({ ...prev, [safeIndex]: true }))
              }
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-zinc-400 text-sm ledger-font">
              No images available
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          {/* Status stamp */}
          {property.status && (
            <div
              className="absolute top-5 right-5 sm:top-7 sm:right-7 w-[86px] h-[86px] sm:w-[100px] sm:h-[100px] rounded-full flex items-center justify-center text-center border-2 border-dashed border-white/70 backdrop-blur-sm"
              style={{
                transform: "rotate(-9deg)",
                background: "rgba(67,23,128,0.55)",
              }}
            >
              <span className="ledger-font text-[10px] sm:text-[11px] tracking-widest uppercase text-white leading-tight px-1">
                {property.status}
              </span>
            </div>
          )}

          {/* Fullscreen hint */}
          {images.length > 0 && (
            <button
              onClick={() => setLightboxOpen(true)}
              aria-label="View gallery fullscreen"
              className="absolute bottom-5 right-5 sm:bottom-7 sm:right-7 flex items-center gap-2 bg-black/50 backdrop-blur-md border border-white/20 text-white text-[11px] ledger-font uppercase tracking-wider px-3.5 py-2 rounded-full hover:border-[#a78bfa] hover:text-[#a78bfa] transition-all"
            >
              <Expand className="w-3.5 h-3.5" />
              {safeIndex + 1} / {images.length}
            </button>
          )}

          {/* Prev/Next */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                aria-label="Previous image"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center border border-white/15 opacity-0 group-hover:opacity-100 hover:border-[#a78bfa] hover:text-[#a78bfa] transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next image"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center border border-white/15 opacity-0 group-hover:opacity-100 hover:border-[#a78bfa] hover:text-[#a78bfa] transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Title block */}
          <div className="absolute bottom-6 left-6 sm:bottom-9 sm:left-9 right-24 sm:right-32">
            {property.propertyType && (
              <span className="ledger-font text-[11px] tracking-[0.2em] uppercase text-[#c4a6f7]">
                {property.propertyType}
              </span>
            )}
            <h1 className="display-font text-2xl sm:text-5xl font-semibold text-white leading-[1.05] mt-1.5">
              {property.title}
            </h1>
            <div className="flex items-center gap-1.5 mt-3 text-xs sm:text-sm text-white/85">
              <MapPin className="w-4 h-4 text-[#c4a6f7] shrink-0" />
              <span>{property.locationName}</span>
            </div>
          </div>
        </div>

        {/* Filmstrip thumbnails */}
        {images.length > 1 && (
          <div className="film-thumb flex gap-2.5 mt-3 overflow-x-auto pb-1">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative shrink-0 w-24 h-16 sm:w-32 sm:h-20 rounded-xl overflow-hidden border-2 transition-all bg-zinc-200 dark:bg-zinc-800 ${
                  safeIndex === idx
                    ? "border-[#431780]"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={img}
                  alt={`${property.title} thumbnail ${idx + 1}`}
                  fill
                  unoptimized
                  sizes="128px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* ============ SPEC LEDGER (signature element) ============ */}
        <div className="relative sm:-mt-10 mt-4 mx-auto sm:mx-6 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 shadow-2xl px-5 sm:px-8 py-6 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md">
          <div className="flex items-center justify-between mb-4">
            <span className="ledger-font text-[10px] uppercase tracking-[0.25em] text-[#431780] dark:text-violet-300">
              Survey &amp; Specification
            </span>
            {property._id && (
              <span className="ledger-font text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                Ref. {String(property._id).slice(-8)}
              </span>
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-x-4 gap-y-6">
            {stats.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex flex-col">
                <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
                  <Icon className="w-3.5 h-3.5" />
                  <span className="ledger-font text-[10px] uppercase tracking-widest">
                    {label}
                  </span>
                </div>
                <div className="leader-line" />
                <span className="display-font text-lg sm:text-xl font-semibold text-zinc-900 dark:text-white">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ============ MAIN CONTENT ============ */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left column */}
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-3xl p-6 sm:p-8 border border-zinc-200/80 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md shadow-sm">
            <h2 className="display-font text-xl sm:text-2xl font-semibold text-zinc-900 dark:text-white pb-4 mb-5 border-b border-zinc-200/80 dark:border-zinc-800">
              About this estate
            </h2>
            <p className="text-sm sm:text-[15px] text-zinc-600 dark:text-zinc-300 leading-relaxed">
              {property.description}
            </p>

            {property.address && (
              <div className="flex items-start gap-2.5 mt-6 pt-5 border-t border-zinc-200/80 dark:border-zinc-800">
                <Building2 className="w-4 h-4 text-[#431780] dark:text-violet-300 mt-0.5 shrink-0" />
                <div>
                  <span className="ledger-font text-[10px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400 block mb-1">
                    Registered address
                  </span>
                  <span className="text-sm text-zinc-800 dark:text-zinc-100">
                    {property.address}
                  </span>
                </div>
              </div>
            )}

            {listedLabel && (
              <p className="ledger-font text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mt-6">
                Listed {listedLabel}
              </p>
            )}
          </div>
        </div>

        {/* Right column — tour / inquiry card */}
        <div className="lg:col-span-4 lg:sticky lg:top-6">
          <div className="rounded-3xl p-6 sm:p-7 border border-zinc-200/80 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl shadow-xl space-y-6">
            <div className="flex items-center p-1 bg-[#431780]/5 dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700">
              <button
                onClick={() => setActiveTab("schedule")}
                className={`flex-1 py-2.5 text-xs font-semibold rounded-xl transition-all ${
                  activeTab === "schedule"
                    ? "bg-[#431780] text-white shadow-md"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                Schedule a tour
              </button>
              <button
                onClick={() => setActiveTab("request")}
                className={`flex-1 py-2.5 text-xs font-semibold rounded-xl transition-all ${
                  activeTab === "request"
                    ? "bg-[#431780] text-white shadow-md"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                Request info
              </button>
            </div>

            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#431780]/5 border border-zinc-200/60 dark:border-zinc-700/60">
              <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-[#431780] shrink-0 bg-zinc-200">
                <Image
                  src="https://ui-avatars.com/api/?name=Probity+Estates&background=431780&color=ffffff&size=128"
                  alt="Property advisor"
                  fill
                  unoptimized
                  sizes="44px"
                  className="object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <h4 className="display-font text-sm font-semibold text-zinc-900 dark:text-white">
                    Probity Sales Team
                  </h4>
                  <UserCheck className="w-3.5 h-3.5 text-emerald-500" />
                </div>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  Senior Real Estate Advisor
                </p>
              </div>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-3.5">
              {activeTab === "schedule" && (
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-2">
                    Tour type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setTourType("In Person")}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all ${
                        tourType === "In Person"
                          ? "border-[#431780] bg-[#431780]/10 text-[#431780] dark:text-violet-300"
                          : "border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400"
                      }`}
                    >
                      <User className="w-3.5 h-3.5" />
                      In person
                    </button>
                    <button
                      type="button"
                      onClick={() => setTourType("Video Chat")}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all ${
                        tourType === "Video Chat"
                          ? "border-[#431780] bg-[#431780]/10 text-[#431780] dark:text-violet-300"
                          : "border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400"
                      }`}
                    >
                      <Video className="w-3.5 h-3.5" />
                      Video chat
                    </button>
                  </div>
                </div>
              )}

              <input
                type="text"
                placeholder="Your name"
                required
                value={formData.name}
                onChange={handleFieldChange("name")}
                className="w-full px-4 py-3 bg-[#431780]/5 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#431780] transition-all"
              />
              <input
                type="tel"
                placeholder="Phone number"
                required
                value={formData.phone}
                onChange={handleFieldChange("phone")}
                className="w-full px-4 py-3 bg-[#431780]/5 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#431780] transition-all"
              />
              <input
                type="email"
                placeholder="Email address"
                required
                value={formData.email}
                onChange={handleFieldChange("email")}
                className="w-full px-4 py-3 bg-[#431780]/5 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#431780] transition-all"
              />
              <textarea
                rows={3}
                placeholder="Preferred date or message..."
                value={formData.message}
                onChange={handleFieldChange("message")}
                className="w-full px-4 py-3 bg-[#431780]/5 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#431780] transition-all resize-none"
              />

              <button
                type="submit"
                className="w-full bg-[#431780] hover:bg-[#341160] text-white text-xs font-semibold py-3.5 px-6 rounded-2xl transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-2 group"
              >
                <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                {activeTab === "schedule"
                  ? "Submit tour request"
                  : "Send inquiry"}
              </button>

              {submitted && (
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 text-center font-medium">
                  Logged to console — check DevTools.
                </p>
              )}

              <p className="text-[10px] text-zinc-400 dark:text-zinc-500 text-center">
                By submitting this form you agree to the Terms of Service.
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* ============ LIGHTBOX ============ */}
      {lightboxOpen && images.length > 0 && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm px-4"
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={() => setLightboxOpen(false)}
            aria-label="Close gallery"
            className="absolute top-6 right-6 w-10 h-10 rounded-full border border-white/25 text-white flex items-center justify-center hover:border-[#a78bfa] hover:text-[#a78bfa] transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          <button
            onClick={handlePrev}
            aria-label="Previous image"
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/25 text-white flex items-center justify-center hover:border-[#a78bfa] hover:text-[#a78bfa] transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="relative w-full max-w-4xl h-[70vh]">
            <Image
              src={images[safeIndex]}
              alt={`${property.title} — full view ${safeIndex + 1}`}
              fill
              unoptimized
              sizes="90vw"
              className="object-contain"
            />
          </div>

          <button
            onClick={handleNext}
            aria-label="Next image"
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/25 text-white flex items-center justify-center hover:border-[#a78bfa] hover:text-[#a78bfa] transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <span className="absolute bottom-6 ledger-font text-[11px] uppercase tracking-widest text-white/70">
            {safeIndex + 1} / {images.length}
          </span>
        </div>
      )}
    </div>
  );
};

export default PropertyDetailsClient;
