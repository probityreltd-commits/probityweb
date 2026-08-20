"use client";

import React, { useState, useMemo } from "react";
import { Search, SlidersHorizontal, Grid, List } from "lucide-react";
import { PropertyCard } from "@/components/ui/PropertyCard";

const PropertiesClient = ({ properties = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [viewMode, setViewMode] = useState("grid");

  // Extract unique property types dynamically using 'propertyType' field
  const propertyTypes = useMemo(() => {
    const types = properties.map((item) => item.propertyType).filter(Boolean);
    return ["All", ...Array.from(new Set(types))];
  }, [properties]);

  // Filter properties based on search term & selected type tag
  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        property.title?.toLowerCase().includes(searchLower) ||
        property.locationName?.toLowerCase().includes(searchLower) ||
        property.address?.toLowerCase().includes(searchLower) ||
        property.description?.toLowerCase().includes(searchLower);

      const matchesType =
        selectedType === "All" || property.propertyType === selectedType;

      return matchesSearch && matchesType;
    });
  }, [properties, searchTerm, selectedType]);

  return (
    <div className="space-y-8">
      {/* Search & Filter Bar */}
      <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md p-4 sm:p-6 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Search by title, location, or address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-[#f5f1ff] dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/80 rounded-2xl text-xs sm:text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#3b1a83] transition-all"
          />
        </div>

        {/* Category Pills & View Switcher */}
        <div className="flex flex-wrap items-center justify-between md:justify-end gap-3 w-full md:w-auto">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none max-w-full">
            {propertyTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`text-xs font-bold px-4 py-2.5 rounded-2xl transition-all shrink-0 ${
                  selectedType === type
                    ? "bg-[#3b1a83] text-white shadow-md"
                    : "bg-[#f5f1ff] dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="hidden sm:flex items-center bg-[#f5f1ff] dark:bg-zinc-800 p-1 rounded-2xl border border-zinc-200 dark:border-zinc-700">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-xl transition-all ${
                viewMode === "grid"
                  ? "bg-white dark:bg-zinc-700 text-[#3b1a83] dark:text-white shadow-sm"
                  : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              }`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-xl transition-all ${
                viewMode === "list"
                  ? "bg-white dark:bg-zinc-700 text-[#3b1a83] dark:text-white shadow-sm"
                  : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Property Cards Grid/List */}
      {filteredProperties.length > 0 ? (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
              : "flex flex-col gap-6"
          }
        >
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property._id}
              property={property}
              viewMode={viewMode}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white/60 dark:bg-zinc-900/60 rounded-3xl p-12 text-center border border-zinc-200 dark:border-zinc-800 my-12">
          <div className="w-12 h-12 rounded-2xl bg-[#3b1a83]/10 text-[#3b1a83] dark:text-indigo-400 flex items-center justify-center mx-auto mb-4">
            <SlidersHorizontal className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-white mb-1">
            No Properties Found
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-xs mx-auto">
            We couldn&apos;t find any properties matching your search criteria.
            Try clearing filters.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedType("All");
            }}
            className="mt-5 text-xs font-bold text-[#3b1a83] dark:text-indigo-400 hover:underline"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default PropertiesClient;
