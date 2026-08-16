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

// Mock Data
const portfolioData = [
  {
    id: "bashundhara",
    locationName: "Bashundhara",
    projects: [
      {
        id: "proj-1",
        title: "Probity Dokkhina Lake",
        status: "ONGOING PROJECT",
        location: "Block A (Plot 287, Road 12), Bashundhara R/A, Dhaka",
        typeTag: "4 BHK",
        description:
          "A lake-view landmark on Block A. Every 2,400 sq ft home faces south for light and air, wraps wide verandas around four bedrooms, and opens onto a rooftop pool. Room to live well, and a view worth coming home to.",
        images: [
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
        ],
        specs: {
          bedrooms: 4,
          bathrooms: 4,
          flatSize: "2,400 sft",
          orientation: "South Facing",
        },
        handoverDate: "August 2027",
      },
    ],
  },
  {
    id: "aftab-nagar",
    locationName: "Aftab Nagar",
    projects: [
      {
        id: "proj-2",
        title: "Aftab Horizon Height",
        status: "UPCOMING PROJECT",
        location: "Block C (Plot 14, Road 3), Aftab Nagar, Dhaka",
        typeTag: "3 BHK",
        description:
          "Designed with contemporary aesthetics offering panoramic views of Hatirjheel. Premium fittings, private balconies, and dedicated parking for modern family living.",
        images: [
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1200&auto=format&fit=crop",
        ],
        specs: {
          bedrooms: 3,
          bathrooms: 3,
          flatSize: "1,850 sft",
          orientation: "North-South",
        },
        handoverDate: "December 2026",
      },
    ],
  },
  {
    id: "jolshiri",
    locationName: "Jolshiri",
    projects: [
      {
        id: "proj-3",
        title: "Jolshiri Abode Park",
        status: "ONGOING PROJECT",
        location: "Sector 3, Road 105, Jolshiri Abashon, Dhaka",
        typeTag: "4 BHK",
        description:
          "Eco-friendly smart living integrated into Jolshiri's master plan. Surrounded by lush greenery, open fields, and state-of-the-art security installations.",
        images: [
          "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop",
        ],
        specs: {
          bedrooms: 4,
          bathrooms: 4,
          flatSize: "2,800 sft",
          orientation: "Corner / South",
        },
        handoverDate: "March 2028",
      },
    ],
  },
  {
    id: "uttara",
    locationName: "Uttara",
    projects: [
      {
        id: "proj-4",
        title: "Uttara Grand Pavilion",
        status: "COMPLETED",
        location: "Sector 11, Road 2, Uttara, Dhaka",
        typeTag: "5 BHK Duplex",
        description:
          "Exclusive luxury duplex residences featuring double-height ceiling living areas, private rooftop terrace garden, and smart home automation systems.",
        images: [
          "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200&auto=format&fit=crop",
        ],
        specs: {
          bedrooms: 5,
          bathrooms: 5,
          flatSize: "4,200 sft",
          orientation: "South-West",
        },
        handoverDate: "Ready to Move",
      },
    ],
  },
  {
    id: "purbachal",
    locationName: "Purbachal",
    projects: [
      {
        id: "proj-5",
        title: "Purbachal Vista Residency",
        status: "UPCOMING PROJECT",
        location: "Sector 4, Main Boulevard, Purbachal, Dhaka",
        typeTag: "3 BHK",
        description:
          "Future-ready architectural marvel right on the Expressway corridor. Designed for ultra-spacious living with resort-style amenities and clubhouse access.",
        images: [
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
        ],
        specs: {
          bedrooms: 3,
          bathrooms: 3,
          flatSize: "2,100 sft",
          orientation: "South Facing",
        },
        handoverDate: "June 2028",
      },
    ],
  },
];

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState(portfolioData[0].id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const activeLocation =
    portfolioData.find((item) => item.id === activeTab) || portfolioData[0];
  const activeProject = activeLocation.projects[0];

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? activeProject.images.length - 1 : prev - 1,
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === activeProject.images.length - 1 ? 0 : prev + 1,
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
            Discover our collection of ongoing residential landmarks in Dhaka.
            Every site is engineered to deliver pristine acoustic peace, elite
            craftsmanship, and absolute luxury.
          </p>
        </div>

        {/* Location Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex flex-wrap items-center justify-center p-1.5 bg-[#eee9f8] dark:bg-zinc-800/80 rounded-full gap-1 shadow-inner">
            {portfolioData.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
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
                  <span className="relative z-10">{tab.locationName}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Card Showcase */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
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
              {/* Left Column: Image Showcase */}
              <div className="lg:col-span-6 relative min-h-[320px] sm:min-h-[420px] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                {/* Status Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-[#3b1a83] text-white text-[10px] sm:text-xs uppercase font-extrabold px-3 py-1.5 rounded-full shadow-sm tracking-wider">
                    {activeProject.status}
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={activeProject.images[currentImageIndex]}
                    alt={activeProject.title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full object-cover absolute inset-0"
                  />
                </AnimatePresence>

                {activeProject.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full">
                    {activeProject.images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`transition-all duration-300 rounded-full ${
                          idx === currentImageIndex
                            ? "w-5 h-2 bg-[#ffb703]"
                            : "w-2 h-2 bg-white/60 hover:bg-white"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: Project Details */}
              <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between">
                <div>
                  {/* Title -> font-serif (Playfair Display) */}
                  <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                    {activeProject.title}
                  </h3>

                  {/* Location Info */}
                  <div className="flex items-start gap-2 mt-2 text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm">
                    <MapPin className="w-4 h-4 text-zinc-700 dark:text-zinc-300 shrink-0 mt-0.5" />
                    <span>{activeProject.location}</span>
                  </div>

                  {/* Property Tag */}
                  <div className="mt-4">
                    <span className="inline-block bg-[#ffb703] text-zinc-950 font-bold text-xs px-3 py-1 rounded-md shadow-sm">
                      {activeProject.typeTag}
                    </span>
                  </div>

                  {/* Description Paragraph */}
                  <p className="mt-4 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
                    {activeProject.description}
                  </p>

                  {/* Features Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6 bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                    <div className="flex items-center gap-2.5">
                      <Bed className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                      <div>
                        <span className=" block text-base font-extrabold text-zinc-900 dark:text-white leading-tight">
                          {activeProject.specs.bedrooms}
                        </span>
                        <span className="block text-[10px] text-zinc-500 dark:text-zinc-400">
                          Bedroom
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 border-l border-zinc-200 dark:border-zinc-700 pl-3">
                      <Bath className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                      <div>
                        <span className=" block text-base font-extrabold text-zinc-900 dark:text-white leading-tight">
                          {activeProject.specs.bathrooms}
                        </span>
                        <span className="block text-[10px] text-zinc-500 dark:text-zinc-400">
                          Bathroom
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 border-l border-zinc-200 dark:border-zinc-700 pl-3">
                      <Maximize className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                      <div>
                        <span className=" block text-xs font-extrabold text-zinc-900 dark:text-white leading-tight">
                          {activeProject.specs.flatSize}
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
                          {activeProject.specs.orientation}
                        </span>
                        <span className="block text-[10px] text-zinc-500 dark:text-zinc-400">
                          Orientation
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer CTAs & Handover */}
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
                      {activeProject.handoverDate}
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
