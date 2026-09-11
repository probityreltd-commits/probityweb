"use client";

import React, { useEffect, useState, useMemo } from "react";
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

import { getPropertys } from "@/services/api/property";

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState("ALL");
  const [activePropertyId, setActivePropertyId] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getPropertys();

        if (data?.success) {
          const loadedProperties = data.data || [];
          setProperties(loadedProperties);
          if (loadedProperties.length > 0) {
            setActivePropertyId(
              loadedProperties[0]._id || loadedProperties[0].slug,
            );
          }
        } else {
          setError("Failed to load properties.");
        }
      } catch (err) {
        console.error("Properties fetch error:", err);
        setError("Failed to load properties.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const formatStatus = (status) => {
    if (!status) return "";
    return status
      .toString()
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const statusTabs = useMemo(() => {
    const uniqueStatuses = Array.from(
      new Set(properties.map((p) => p.status).filter(Boolean)),
    );
    return [
      { id: "ALL", label: "All" },
      ...uniqueStatuses.map((st) => ({
        id: st,
        label: formatStatus(st),
      })),
    ];
  }, [properties]);

  const filteredProperties = useMemo(() => {
    if (activeTab === "ALL") return properties;
    return properties.filter(
      (p) => p.status?.toUpperCase() === activeTab.toUpperCase(),
    );
  }, [properties, activeTab]);

  useEffect(() => {
    if (filteredProperties.length > 0) {
      const isStillAvailable = filteredProperties.some(
        (p) => (p._id || p.slug) === activePropertyId,
      );
      if (!isStillAvailable) {
        setActivePropertyId(
          filteredProperties[0]._id || filteredProperties[0].slug,
        );
        setCurrentImageIndex(0);
      }
    }
  }, [filteredProperties, activePropertyId]);

  const activeProperty = useMemo(() => {
    return (
      filteredProperties.find((p) => (p._id || p.slug) === activePropertyId) ||
      filteredProperties[0]
    );
  }, [filteredProperties, activePropertyId]);

  const propertyImages = useMemo(() => {
    if (!activeProperty) return [];
    if (
      Array.isArray(activeProperty.images) &&
      activeProperty.images.length > 0
    ) {
      return activeProperty.images;
    }
    if (activeProperty.coverImage) {
      return [activeProperty.coverImage];
    }
    return ["/placeholder-property.jpg"];
  }, [activeProperty]);

  const handlePrevImage = () => {
    if (!propertyImages.length) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? propertyImages.length - 1 : prev - 1,
    );
  };

  const handleNextImage = () => {
    if (!propertyImages.length) return;
    setCurrentImageIndex((prev) =>
      prev === propertyImages.length - 1 ? 0 : prev + 1,
    );
  };

  if (loading) {
    return (
      <section className="bg-[#f5f1ff] dark:bg-[#070913] py-10 sm:py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
        <div className="max-w-6xl mx-auto text-center text-sm text-zinc-600 dark:text-zinc-400 font-medium">
          Loading portfolio...
        </div>
      </section>
    );
  }

  if (error || !activeProperty) {
    return (
      <section className="bg-[#f5f1ff] dark:bg-[#070913] py-10 sm:py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
        <div className="max-w-6xl mx-auto text-center text-sm text-zinc-600 dark:text-zinc-400 font-medium">
          {error || "No properties available."}
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#f5f1ff] dark:bg-[#070913] py-8 sm:py-10 md:py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Our Premium Portfolio
          </h2>

          <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal px-2 sm:px-0">
            Discover our collection of premium residential projects in prime
            locations across Dhaka. Every project is designed with quality,
            comfort, and modern living in mind.
          </p>
        </div>

        {/* Primary Status Filter (Horizontal Scroll Bar for Mobile) */}
        <div className="w-full overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-1 mb-4 sm:mb-6">
          <div className="flex justify-start sm:justify-center min-w-max mx-auto px-1">
            <div className="inline-flex items-center p-1 sm:p-1.5 bg-[#eee9f8] dark:bg-zinc-800/80 rounded-full gap-1 shadow-inner">
              {statusTabs.map((tab) => {
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setCurrentImageIndex(0);
                    }}
                    className={`relative px-4 py-1.5 sm:px-5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
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
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Secondary Project Selector (Horizontal Scroll Bar for Mobile) */}
        {filteredProperties.length > 1 && (
          <div className="w-full overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-1 mb-6 sm:mb-8">
            <div className="flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 min-w-max px-1">
              <span className="text-[11px] sm:text-xs font-semibold text-zinc-500 dark:text-zinc-400 mr-1 sticky left-0 bg-[#f5f1ff] dark:bg-[#070913] py-2 pr-1 z-10 sm:relative">
                Select Project:
              </span>
              {filteredProperties.map((prop) => {
                const propKey = prop._id || prop.slug;
                const activeKey = activeProperty._id || activeProperty.slug;
                const isSelected = propKey === activeKey;

                return (
                  <button
                    key={propKey}
                    onClick={() => {
                      setActivePropertyId(propKey);
                      setCurrentImageIndex(0);
                    }}
                    className={`px-3.5 py-1.5 sm:px-4 sm:py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                      isSelected
                        ? "bg-[#3b1a83] text-white shadow-md scale-105"
                        : "bg-white dark:bg-zinc-800/90 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700/60"
                    }`}
                  >
                    {prop.title}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Main Property Showcase Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProperty._id || activeProperty.slug || activePropertyId}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative bg-white dark:bg-zinc-900 rounded-2xl sm:rounded-3xl shadow-xl border border-zinc-100 dark:border-zinc-800 overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
              <div className="lg:col-span-6 relative min-h-[240px] sm:min-h-[320px] md:min-h-[420px] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10">
                  <span className="bg-[#3b1a83] text-white text-[9px] sm:text-xs uppercase font-extrabold px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full shadow-sm tracking-wider">
                    {formatStatus(activeProperty.status) || "N/A"}
                  </span>
                </div>

                {propertyImages.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 dark:bg-zinc-800/90 text-zinc-800 dark:text-white flex items-center justify-center shadow-lg hover:bg-white transition-all active:scale-95 border border-zinc-200 dark:border-zinc-700"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>

                    <button
                      onClick={handleNextImage}
                      className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 dark:bg-zinc-800/90 text-zinc-800 dark:text-white flex items-center justify-center shadow-lg hover:bg-white transition-all active:scale-95 border border-zinc-200 dark:border-zinc-700"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </>
                )}

                <AnimatePresence mode="wait">
                  <motion.img
                    key={`${activeProperty._id || activeProperty.slug}-${currentImageIndex}`}
                    src={
                      propertyImages[currentImageIndex] ||
                      activeProperty.coverImage
                    }
                    alt={activeProperty.title || "Property image"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full object-cover absolute inset-0"
                  />
                </AnimatePresence>

                {propertyImages.length > 1 && (
                  <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 bg-black/30 backdrop-blur-md px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full">
                    {propertyImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        aria-label={`Show image ${index + 1}`}
                        className={`transition-all duration-300 rounded-full ${
                          index === currentImageIndex
                            ? "w-4 h-1.5 sm:w-5 sm:h-2 bg-[#ffb703]"
                            : "w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/60 hover:bg-white"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Content column */}
              <div className="lg:col-span-6 p-5 sm:p-6 md:p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                    {activeProperty.title || "Untitled Property"}
                  </h3>

                  <div className="flex items-start gap-1.5 sm:gap-2 mt-1.5 sm:mt-2 text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm">
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-700 dark:text-zinc-300 shrink-0 mt-0.5" />
                    <span>{activeProperty.locationName || "Location N/A"}</span>
                  </div>

                  <div className="mt-3 sm:mt-4">
                    <span className="inline-block bg-[#ffb703] text-zinc-950 font-bold text-[11px] sm:text-xs px-2.5 py-1 sm:px-3 sm:py-1 rounded-md shadow-sm">
                      {activeProperty.propertyType || "Property"}
                    </span>
                  </div>

                  <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
                    {activeProperty.description &&
                    activeProperty.description !== "N/A"
                      ? activeProperty.description
                      : "No description available for this property."}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4 sm:my-6 p-3.5 sm:p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl sm:rounded-2xl border border-zinc-100 dark:border-zinc-800">
                    <div className="flex items-center gap-2 sm:gap-2.5">
                      <Bed className="w-4 h-4 text-zinc-500 dark:text-zinc-400 shrink-0" />
                      <div>
                        <span className="block text-sm sm:text-base font-extrabold text-zinc-900 dark:text-white leading-tight">
                          {activeProperty.bedrooms ?? "N/A"}
                        </span>
                        <span className="block text-[10px] text-zinc-500 dark:text-zinc-400">
                          Bedroom
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-2.5 sm:border-l sm:border-zinc-200 sm:dark:border-zinc-700 sm:pl-3">
                      <Bath className="w-4 h-4 text-zinc-500 dark:text-zinc-400 shrink-0" />
                      <div>
                        <span className="block text-sm sm:text-base font-extrabold text-zinc-900 dark:text-white leading-tight">
                          {activeProperty.bathrooms ?? "N/A"}
                        </span>
                        <span className="block text-[10px] text-zinc-500 dark:text-zinc-400">
                          Bathroom
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-2.5 sm:border-l sm:border-zinc-200 sm:dark:border-zinc-700 sm:pl-3">
                      <Maximize className="w-4 h-4 text-zinc-500 dark:text-zinc-400 shrink-0" />
                      <div>
                        <span className="block text-xs font-extrabold text-zinc-900 dark:text-white leading-tight">
                          {activeProperty.flatSize || "N/A"}
                        </span>
                        <span className="block text-[10px] text-zinc-500 dark:text-zinc-400">
                          Flat Size
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-2.5 sm:border-l sm:border-zinc-200 sm:dark:border-zinc-700 sm:pl-3">
                      <Compass className="w-4 h-4 text-zinc-500 dark:text-zinc-400 shrink-0" />
                      <div>
                        <span className="block text-xs font-bold text-zinc-900 dark:text-white truncate max-w-[80px]">
                          {activeProperty.orientation || "N/A"}
                        </span>
                        <span className="block text-[10px] text-zinc-500 dark:text-zinc-400">
                          Orientation
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href={
                        activeProperty.slug
                          ? `/properties/${activeProperty.slug}`
                          : "#"
                      }
                      className="flex-1 sm:flex-none bg-[#3b1a83] hover:bg-[#2c1363] text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5"
                    >
                      <span>View Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>

                    <a
                      href={activeProperty.projectBrochure || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-none bg-[#eee9f8] dark:bg-zinc-800 hover:bg-[#e3dafa] text-[#3b1a83] dark:text-[#ffb703] font-semibold text-xs px-4 py-2.5 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-1.5"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Request Floor Plan</span>
                    </a>
                  </div>

                  <div className="text-left sm:text-right mt-1 sm:mt-0">
                    <span className="block text-[10px] font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">
                      Project Handover
                    </span>
                    <span className="block text-xs font-bold text-zinc-800 dark:text-zinc-200">
                      {activeProperty.handoverDate || "N/A"}
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
