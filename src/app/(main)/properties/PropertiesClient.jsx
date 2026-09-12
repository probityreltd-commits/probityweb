"use client";

import React, { useState, useMemo, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { SlidersHorizontal, Grid, List } from "lucide-react";
import { PropertyCard } from "@/components/ui/PropertyCard";
import PropertySearch from "@/components/shared/PropertySearch";

const PropertiesClient = ({
  properties = [],
  initialLocation = "",
  initialProject = "",
  initialType = "",
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const [filters, setFilters] = useState({
    location: initialLocation,
    projectName: initialProject,
    propertyType: initialType,
  });
  const [viewMode, setViewMode] = useState("grid");

  const handleSearch = useCallback(
    (payload) => {
      setFilters(payload);

      const params = new URLSearchParams();
      if (payload.location) params.set("location", payload.location);
      if (payload.projectName) params.set("project", payload.projectName);
      if (payload.propertyType) params.set("type", payload.propertyType);

      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    },
    [pathname, router],
  );

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const matchesLocation =
        !filters.location ||
        property.locationName?.toLowerCase() === filters.location.toLowerCase();

      const matchesProject =
        !filters.projectName ||
        property.title?.toLowerCase() === filters.projectName.toLowerCase();

      const matchesType =
        !filters.propertyType ||
        property.propertyType
          ?.toLowerCase()
          .includes(filters.propertyType.toLowerCase());

      return matchesLocation && matchesProject && matchesType;
    });
  }, [properties, filters]);

  return (
    <div className="space-y-5 sm:space-y-7 lg:space-y-8">
      <PropertySearch
        variant="inline"
        properties={properties}
        initialLocation={filters.location}
        initialProject={filters.projectName}
        initialType={filters.propertyType}
        onSearch={handleSearch}
      />

      {/* Result count + grid/list toggle */}
      <div className="flex items-center justify-between px-1">
        <p className="text-xs sm:text-sm lg:text-base text-zinc-500 dark:text-zinc-400">
          {filteredProperties.length} propert
          {filteredProperties.length === 1 ? "y" : "ies"} found
        </p>

        <div className="hidden sm:flex items-center bg-background dark:bg-zinc-800 p-1 rounded-2xl border border-zinc-200 dark:border-zinc-700">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-xl transition-all ${
              viewMode === "grid"
                ? "bg-white dark:bg-zinc-700 text-brand dark:text-white shadow-sm"
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
                ? "bg-white dark:bg-zinc-700 text-brand dark:text-white shadow-sm"
                : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
            }`}
            title="List View"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Property Cards Grid/List */}
      {filteredProperties.length > 0 ? (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8"
              : "flex flex-col gap-4 sm:gap-6"
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
        <div className="bg-white/60 dark:bg-zinc-900/60 rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center border border-zinc-200 dark:border-zinc-800 my-8 sm:my-12">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-brand/10 text-brand dark:text-indigo-400 flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <SlidersHorizontal className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <h3 className="font-serif text-lg sm:text-xl font-bold text-zinc-900 dark:text-white mb-1">
            No Properties Found
          </h3>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-xs mx-auto">
            We couldn&apos;t find any properties matching your search criteria.
            Try clearing filters.
          </p>
          <button
            onClick={() =>
              handleSearch({ location: "", projectName: "", propertyType: "" })
            }
            className="mt-4 sm:mt-5 text-xs sm:text-sm font-bold text-brand dark:text-indigo-400 hover:underline"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default PropertiesClient;
