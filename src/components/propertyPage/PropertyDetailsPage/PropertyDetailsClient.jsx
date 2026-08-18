"use client";

import React, { useState } from "react";
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
  Building,
  User,
  Send,
  Video,
  UserCheck,
} from "lucide-react";

const PropertyDetailsClient = ({ property }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [tourType, setTourType] = useState("In Person");
  const [activeTab, setActiveTab] = useState("schedule"); // 'schedule' or 'request'

  const images = property?.images || [];

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-8">
      {/* Top Header: Title, Breadcrumb & Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 mb-2">
            <Link href="/" className="hover:text-[#3b1a83] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/properties"
              className="hover:text-[#3b1a83] transition-colors"
            >
              Properties
            </Link>
            <span>/</span>
            <span className="text-zinc-800 dark:text-zinc-200 font-medium truncate max-w-[200px]">
              {property.title}
            </span>
          </div>

          <h1 className="font-serif text-2xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            {property.title}
          </h1>

          <div className="flex items-center gap-2 mt-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
            <MapPin className="w-4 h-4 text-[#3b1a83] shrink-0" />
            <span>{property.location}</span>
          </div>

          {/* Badges */}
          <div className="flex items-center gap-2 mt-3">
            {property.typeTag && (
              <span className="bg-[#3b1a83] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {property.typeTag}
              </span>
            )}
            {property.status && (
              <span className="bg-amber-400 text-zinc-950 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                {property.status}
              </span>
            )}
          </div>
        </div>

        {/* Right Action Icons & Price/Tag */}
        <div className="flex lg:flex-col items-start lg:items-end justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              aria-label="Save Property"
              className="w-9 h-9 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 flex items-center justify-center hover:text-[#3b1a83] hover:border-[#3b1a83] transition-all shadow-sm active:scale-95"
            >
              <Heart className="w-4 h-4" />
            </button>
            <button
              aria-label="Share Property"
              className="w-9 h-9 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 flex items-center justify-center hover:text-[#3b1a83] hover:border-[#3b1a83] transition-all shadow-sm active:scale-95"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              aria-label="Print Page"
              onClick={() => window.print()}
              className="w-9 h-9 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 flex items-center justify-center hover:text-[#3b1a83] hover:border-[#3b1a83] transition-all shadow-sm active:scale-95"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>

          <div className="text-right">
            <span className="text-xs text-zinc-500 dark:text-zinc-400 block uppercase font-semibold">
              Location Area
            </span>
            <span className="font-serif text-xl sm:text-2xl font-bold text-[#3b1a83] dark:text-indigo-400">
              {property.locationName}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Grid: Left Gallery/Details & Right Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Main Image Slider with Thumbnails */}
          <div className="space-y-3">
            <div className="relative w-full h-[320px] sm:h-[460px] rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xl group">
              {images.length > 0 && (
                <Image
                  src={images[activeImageIndex]}
                  alt={`${property.title} image ${activeImageIndex + 1}`}
                  fill
                  priority
                  className="object-cover transition-all duration-500"
                />
              )}

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md text-zinc-800 dark:text-white flex items-center justify-center shadow-lg hover:bg-[#3b1a83] hover:text-white transition-all active:scale-95 opacity-0 group-hover:opacity-100"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md text-zinc-800 dark:text-white flex items-center justify-center shadow-lg hover:bg-[#3b1a83] hover:text-white transition-all active:scale-95 opacity-0 group-hover:opacity-100"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Image Counter Badge */}
              <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3.5 py-1.5 rounded-full border border-white/20">
                {activeImageIndex + 1} / {images.length}
              </div>
            </div>

            {/* Gallery Thumbnails List */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative h-20 rounded-2xl overflow-hidden border-2 transition-all ${
                      activeImageIndex === idx
                        ? "border-[#3b1a83] scale-95 shadow-md"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Property Overview Cards Section */}
          <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-200/80 dark:border-zinc-800">
              <h2 className="font-serif text-xl font-bold text-zinc-900 dark:text-white">
                Property Overview
              </h2>
              <span className="text-xs text-zinc-500 font-medium">
                ID:{" "}
                <span className="font-bold text-zinc-800 dark:text-zinc-200">
                  {property.id}
                </span>
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {/* Type */}
              <div className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-[#f5f1ff] dark:bg-zinc-800/60 text-center border border-zinc-200/50 dark:border-zinc-700/50">
                <Building className="w-5 h-5 text-[#3b1a83] dark:text-indigo-400 mb-1.5" />
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium uppercase">
                  Type
                </span>
                <span className="font-serif text-xs font-bold text-zinc-900 dark:text-white mt-0.5">
                  {property.typeTag || "Apartment"}
                </span>
              </div>

              {/* Bedrooms */}
              {property.specs?.bedrooms && (
                <div className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-[#f5f1ff] dark:bg-zinc-800/60 text-center border border-zinc-200/50 dark:border-zinc-700/50">
                  <Bed className="w-5 h-5 text-[#3b1a83] dark:text-indigo-400 mb-1.5" />
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium uppercase">
                    Bedrooms
                  </span>
                  <span className="font-serif text-xs font-bold text-zinc-900 dark:text-white mt-0.5">
                    {property.specs.bedrooms} Beds
                  </span>
                </div>
              )}

              {/* Bathrooms */}
              {property.specs?.bathrooms && (
                <div className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-[#f5f1ff] dark:bg-zinc-800/60 text-center border border-zinc-200/50 dark:border-zinc-700/50">
                  <Bath className="w-5 h-5 text-[#3b1a83] dark:text-indigo-400 mb-1.5" />
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium uppercase">
                    Bathrooms
                  </span>
                  <span className="font-serif text-xs font-bold text-zinc-900 dark:text-white mt-0.5">
                    {property.specs.bathrooms} Baths
                  </span>
                </div>
              )}

              {/* Flat Size */}
              {property.specs?.flatSize && (
                <div className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-[#f5f1ff] dark:bg-zinc-800/60 text-center border border-zinc-200/50 dark:border-zinc-700/50">
                  <Maximize2 className="w-5 h-5 text-[#3b1a83] dark:text-indigo-400 mb-1.5" />
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium uppercase">
                    Area Size
                  </span>
                  <span className="font-serif text-xs font-bold text-zinc-900 dark:text-white mt-0.5">
                    {property.specs.flatSize}
                  </span>
                </div>
              )}

              {/* Handover Date */}
              {property.handoverDate && (
                <div className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-[#f5f1ff] dark:bg-zinc-800/60 text-center border border-zinc-200/50 dark:border-zinc-700/50 col-span-2 sm:col-span-1">
                  <Calendar className="w-5 h-5 text-[#3b1a83] dark:text-indigo-400 mb-1.5" />
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium uppercase">
                    Handover
                  </span>
                  <span className="font-serif text-xs font-bold text-zinc-900 dark:text-white mt-0.5">
                    {property.handoverDate}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Description Card */}
          <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-4">
            <h2 className="font-serif text-xl font-bold text-zinc-900 dark:text-white pb-3 border-b border-zinc-200/80 dark:border-zinc-800">
              Description
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
              {property.description}
            </p>

            {property.specs?.orientation && (
              <div className="pt-3 flex items-center gap-2 text-xs font-semibold text-[#3b1a83] dark:text-indigo-400">
                <Compass className="w-4 h-4" />
                <span>Orientation: {property.specs.orientation}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Schedule Tour & Contact Form Widget (4 cols) */}
        <div className="lg:col-span-4 sticky top-6">
          <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl rounded-3xl p-6 sm:p-7 border border-zinc-200/80 dark:border-zinc-800 shadow-xl space-y-6">
            {/* Widget Tabs */}
            <div className="flex items-center p-1 bg-[#f5f1ff] dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700">
              <button
                onClick={() => setActiveTab("schedule")}
                className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
                  activeTab === "schedule"
                    ? "bg-[#3b1a83] text-white shadow-md"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
                }`}
              >
                Schedule a Tour
              </button>
              <button
                onClick={() => setActiveTab("request")}
                className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
                  activeTab === "request"
                    ? "bg-[#3b1a83] text-white shadow-md"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
                }`}
              >
                Request Info
              </button>
            </div>

            {/* Agent Profile Banner */}
            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#f5f1ff] dark:bg-zinc-800/60 border border-zinc-200/60 dark:border-zinc-700/60">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-zinc-200 border-2 border-[#3b1a83] shrink-0">
                <Image
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop"
                  alt="Property Advisor"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <h4 className="font-serif text-sm font-bold text-zinc-900 dark:text-white">
                    Probity Sales Team
                  </h4>
                  <UserCheck className="w-3.5 h-3.5 text-emerald-500" />
                </div>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  Senior Real Estate Advisor
                </p>
              </div>
            </div>

            {/* Form Area */}
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              {/* Tour Type Pills */}
              {activeTab === "schedule" && (
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-2">
                    Select Tour Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setTourType("In Person")}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 transition-all ${
                        tourType === "In Person"
                          ? "border-[#3b1a83] bg-[#3b1a83]/10 text-[#3b1a83] dark:text-indigo-400"
                          : "border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400"
                      }`}
                    >
                      <User className="w-3.5 h-3.5" />
                      In Person
                    </button>
                    <button
                      type="button"
                      onClick={() => setTourType("Video Chat")}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 transition-all ${
                        tourType === "Video Chat"
                          ? "border-[#3b1a83] bg-[#3b1a83]/10 text-[#3b1a83] dark:text-indigo-400"
                          : "border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400"
                      }`}
                    >
                      <Video className="w-3.5 h-3.5" />
                      Video Chat
                    </button>
                  </div>
                </div>
              )}

              {/* Name */}
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-3 bg-[#f5f1ff] dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#3b1a83] transition-all"
                />
              </div>

              {/* Phone */}
              <div>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  required
                  className="w-full px-4 py-3 bg-[#f5f1ff] dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#3b1a83] transition-all"
                />
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  className="w-full px-4 py-3 bg-[#f5f1ff] dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#3b1a83] transition-all"
                />
              </div>

              {/* Message */}
              <div>
                <textarea
                  rows={3}
                  placeholder="Enter your message or preferred time..."
                  className="w-full px-4 py-3 bg-[#f5f1ff] dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#3b1a83] transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#3b1a83] hover:bg-[#2c1363] text-white text-xs font-bold py-3.5 px-6 rounded-2xl transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 group"
              >
                <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                <span>
                  {activeTab === "schedule"
                    ? "Submit Tour Request"
                    : "Send Inquiry"}
                </span>
              </button>

              <p className="text-[10px] text-zinc-400 text-center font-normal">
                By submitting this form I agree to the Terms of Service.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsClient;
