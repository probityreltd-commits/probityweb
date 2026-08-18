"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  ChevronLeft,
  ChevronRight,
  Bed,
  Bath,
  Maximize,
  Compass,
  ArrowUpRight,
  FileText,
} from "lucide-react";

import { demoProperties } from "../../../public/data";

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState(demoProperties[0]?.id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const activeProperty =
    demoProperties.find((property) => property.id === activeTab) ||
    demoProperties[0];

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? activeProperty.images.length - 1 : prev - 1,
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === activeProperty.images.length - 1 ? 0 : prev + 1,
    );
  };

  return (
    <section className="bg-[#f5f1ff] dark:bg-[#070913] py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Our Premium Portfolio
          </h2>

          <p className="mt-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
            Discover our collection of premium residential projects in prime
            locations across Dhaka. Every project is designed with quality,
            comfort, and modern living in mind.
          </p>
        </div>

        <div className="flex justify-center mb-10">
          <div className="inline-flex flex-wrap items-center justify-center p-1.5 bg-[#eee9f8] dark:bg-zinc-800/80 rounded-full gap-1 shadow-inner">
            {demoProperties.map((property) => {
              const isActive = activeTab === property.id;

              return (
                <button
                  key={property.id}
                  onClick={() => {
                    setActiveTab(property.id);
                    setCurrentImageIndex(0);
                  }}
                  className={`relative px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? "text-white shadow-md"
                      : "text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabPill"
                      className="absolute inset-0 bg-[#3b1a83] dark:bg-[#2c1363] rounded-full z-0"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}

                  <span className="relative z-10">{property.locationName}</span>
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeProperty.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-zinc-100 dark:border-zinc-800 overflow-hidden"
          >
            <button
              onClick={handlePrevImage}
              className="absolute left-3 top-1/4 lg:top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 dark:bg-zinc-800/90 text-zinc-800 dark:text-white flex items-center justify-center shadow-lg hover:bg-white transition-all active:scale-95 border border-zinc-200 dark:border-zinc-700"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNextImage}
              className="absolute right-3 top-1/4 lg:top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 dark:bg-zinc-800/90 text-zinc-800 dark:text-white flex items-center justify-center shadow-lg hover:bg-white transition-all active:scale-95 border border-zinc-200 dark:border-zinc-700"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
              <div className="lg:col-span-6 relative min-h-[320px] sm:min-h-[420px] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-[#3b1a83] text-white text-[10px] sm:text-xs uppercase font-extrabold px-3 py-1.5 rounded-full shadow-sm tracking-wider">
                    {activeProperty.status}
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.img
                    key={`${activeProperty.id}-${currentImageIndex}`}
                    src={activeProperty.images[currentImageIndex]}
                    alt={activeProperty.title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full object-cover absolute inset-0"
                  />
                </AnimatePresence>

                {activeProperty.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full">
                    {activeProperty.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        aria-label={`Show image ${index + 1}`}
                        className={`transition-all duration-300 rounded-full ${
                          index === currentImageIndex
                            ? "w-5 h-2 bg-[#ffb703]"
                            : "w-2 h-2 bg-white/60 hover:bg-white"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                    {activeProperty.title}
                  </h3>

                  <div className="flex items-start gap-2 mt-2 text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm">
                    <MapPin className="w-4 h-4 text-zinc-700 dark:text-zinc-300 shrink-0 mt-0.5" />

                    <span>{activeProperty.location}</span>
                  </div>

                  <div className="mt-4">
                    <span className="inline-block bg-[#ffb703] text-zinc-950 font-bold text-xs px-3 py-1 rounded-md shadow-sm">
                      {activeProperty.typeTag}
                    </span>
                  </div>

                  <p className="mt-4 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
                    {activeProperty.description}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6 bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                    <div className="flex items-center gap-2.5">
                      <Bed className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />

                      <div>
                        <span className="block text-base font-extrabold text-zinc-900 dark:text-white leading-tight">
                          {activeProperty.specs.bedrooms}
                        </span>

                        <span className="block text-[10px] text-zinc-500 dark:text-zinc-400">
                          Bedroom
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 border-l border-zinc-200 dark:border-zinc-700 pl-3">
                      <Bath className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />

                      <div>
                        <span className="block text-base font-extrabold text-zinc-900 dark:text-white leading-tight">
                          {activeProperty.specs.bathrooms}
                        </span>

                        <span className="block text-[10px] text-zinc-500 dark:text-zinc-400">
                          Bathroom
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 border-l border-zinc-200 dark:border-zinc-700 pl-3">
                      <Maximize className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />

                      <div>
                        <span className="block text-xs font-extrabold text-zinc-900 dark:text-white leading-tight">
                          {activeProperty.specs.flatSize}
                        </span>

                        <span className="block text-[10px] text-zinc-500 dark:text-zinc-400">
                          Flat Size
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 border-l border-zinc-200 dark:border-zinc-700 pl-3">
                      <Compass className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />

                      <div>
                        <span className="block text-xs font-bold text-zinc-900 dark:text-white truncate max-w-[80px]">
                          {activeProperty.specs.orientation}
                        </span>

                        <span className="block text-[10px] text-zinc-500 dark:text-zinc-400">
                          Orientation
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                  <div className="flex items-center gap-2">
                    <button className="bg-[#3b1a83] hover:bg-[#2c1363] text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5">
                      <span>View Details</span>

                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    <button className="bg-[#eee9f8] dark:bg-zinc-800 hover:bg-[#e3dafa] text-[#3b1a83] dark:text-[#ffb703] font-semibold text-xs px-4 py-2.5 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-1.5">
                      <FileText className="w-3.5 h-3.5" />

                      <span>Request Floor Plan</span>
                    </button>
                  </div>

                  <div className="text-right sm:text-right">
                    <span className="block text-[10px] font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">
                      Project Handover
                    </span>

                    <span className="block text-xs font-bold text-zinc-800 dark:text-zinc-200">
                      {activeProperty.handoverDate}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Portfolio;
