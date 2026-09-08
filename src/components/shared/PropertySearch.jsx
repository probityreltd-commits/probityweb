"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  Building,
  Building2,
  Loader2,
  RotateCcw,
} from "lucide-react";
import { getPropertys } from "@/services/api/property";

const THEME = {
  floating: {
    wrapper:
      "relative lg:absolute lg:bottom-6 left-0 lg:left-1/2 lg:-translate-x-1/2 w-full max-w-7xl px-4 sm:px-6 z-30 md:mb-10 lg:mt-0",
    card: "bg-zinc-950/85 rounded-2xl sm:rounded-[2rem] shadow-2xl border border-white/10 backdrop-blur-xl",
    header:
      "flex items-center justify-between px-4 sm:px-6 pt-4 sm:pt-5 pb-2 border-b border-white/10",
    title:
      "text-amber-300 font-serif font-bold text-xs sm:text-lg uppercase tracking-wider",
    reset:
      "text-xs text-zinc-400 hover:text-white flex items-center gap-1 transition-colors",
    label:
      "text-[10px] sm:text-[11px] uppercase tracking-widest font-bold text-zinc-400 flex items-center gap-1.5",
    iconAccent: "text-amber-400",
    select:
      "w-full bg-zinc-900/90 px-3.5 py-2.5 rounded-xl border border-white/10 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#3b1a83] disabled:opacity-50 transition-all cursor-pointer appearance-none",
    option: "bg-zinc-900 text-white",
    button:
      "w-full bg-[#3b1a83] hover:bg-[#2e1467] text-white px-6 py-2.5 sm:py-3 rounded-xl font-extrabold text-xs sm:text-sm transition-all duration-300 shadow-xl hover:shadow-2xl active:scale-95 flex items-center justify-center gap-2 group border border-white/10 disabled:opacity-50",
    error:
      "mx-4 sm:mx-6 mt-3 text-xs text-rose-400 bg-rose-950/40 p-2 rounded-lg border border-rose-800",
  },
  inline: {
    wrapper: "w-full",
    card: "bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md rounded-3xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm",
    header:
      "flex items-center justify-between px-4 sm:px-6 pt-4 sm:pt-5 pb-2 border-b border-zinc-200/80 dark:border-zinc-800",
    title:
      "text-[#3b1a83] dark:text-indigo-400 font-serif font-bold text-xs sm:text-lg uppercase tracking-wider",
    reset:
      "text-xs text-zinc-500 hover:text-[#3b1a83] dark:hover:text-indigo-400 flex items-center gap-1 transition-colors",
    label:
      "text-[10px] sm:text-[11px] uppercase tracking-widest font-bold text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5",
    iconAccent: "text-[#3b1a83] dark:text-indigo-400",
    select:
      "w-full bg-[#f5f1ff] dark:bg-zinc-800 px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700/80 text-xs sm:text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3b1a83] disabled:opacity-50 transition-all cursor-pointer appearance-none",
    option: "bg-white text-zinc-900 dark:bg-zinc-900 dark:text-white",
    button:
      "w-full bg-[#3b1a83] hover:bg-[#2e1467] text-white px-6 py-2.5 sm:py-3 rounded-xl font-extrabold text-xs sm:text-sm transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center gap-2 group disabled:opacity-50",
    error:
      "mx-4 sm:mx-6 mt-3 text-xs text-rose-600 bg-rose-50 dark:bg-rose-950/40 p-2 rounded-lg border border-rose-200 dark:border-rose-800",
  },
};

const PropertySearch = ({
  variant = "floating",
  properties: propertiesProp,
  initialLocation = "",
  initialProject = "",
  initialType = "",
  title = "Find Your Property",
  onSearch,
}) => {
  const router = useRouter();
  const t = THEME[variant] || THEME.floating;
  const shouldFetch = !propertiesProp;

  const [fetchedProperties, setFetchedProperties] = useState([]);
  const [loading, setLoading] = useState(shouldFetch);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!shouldFetch) return;
    let active = true;

    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await getPropertys();

        if (!active) return;
        if (response?.success && Array.isArray(response.data)) {
          setFetchedProperties(response.data);
        } else if (Array.isArray(response)) {
          setFetchedProperties(response);
        } else {
          setError("Failed to load properties.");
        }
      } catch (err) {
        console.error("Properties fetch error:", err);
        if (active) setError("Failed to fetch property data.");
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchProperties();
    return () => {
      active = false;
    };
  }, [shouldFetch]);

  const properties = propertiesProp || fetchedProperties;

  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  const [selectedProject, setSelectedProject] = useState(initialProject);
  const [selectedType, setSelectedType] = useState(initialType);

  useEffect(() => setSelectedLocation(initialLocation), [initialLocation]);
  useEffect(() => setSelectedProject(initialProject), [initialProject]);
  useEffect(() => setSelectedType(initialType), [initialType]);

  const locations = useMemo(() => {
    const locs = properties
      .map((p) => p.locationName)
      .filter((loc) => Boolean(loc) && loc.trim() !== "");

    return Array.from(new Set(locs));
  }, [properties]);

  const projectNames = useMemo(() => {
    if (!selectedLocation) {
      return Array.from(new Set(properties.map((p) => p.title)));
    }

    const filteredProps = properties.filter(
      (p) => p.locationName?.toLowerCase() === selectedLocation.toLowerCase(),
    );

    return Array.from(new Set(filteredProps.map((p) => p.title)));
  }, [properties, selectedLocation]);

  const propertyTypeAvailability = useMemo(() => {
    let scope = properties;

    if (selectedLocation) {
      scope = scope.filter(
        (p) => p.locationName?.toLowerCase() === selectedLocation.toLowerCase(),
      );
    }

    if (selectedProject) {
      scope = scope.filter(
        (p) => p.title?.toLowerCase() === selectedProject.toLowerCase(),
      );
    }

    return {
      residential: scope.some((p) =>
        p.propertyType?.toLowerCase().includes("residential"),
      ),
      commercial: scope.some((p) =>
        p.propertyType?.toLowerCase().includes("commercial"),
      ),
    };
  }, [properties, selectedLocation, selectedProject]);

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
    setSelectedProject("");
    setSelectedType("");
  };

  const handleProjectChange = (e) => {
    setSelectedProject(e.target.value);
    setSelectedType("");
  };

  const handleTypeChange = (e) => setSelectedType(e.target.value);

  const runSearch = useCallback(
    (payload) => {
      if (onSearch) {
        onSearch(payload);
        return;
      }

      if (variant === "floating") {
        const params = new URLSearchParams();

        if (payload.location) params.set("location", payload.location);
        if (payload.projectName) params.set("project", payload.projectName);
        if (payload.propertyType) params.set("type", payload.propertyType);

        const query = params.toString();

        router.push(query ? `/properties?${query}` : "/properties");
      }
    },
    [onSearch, variant, router],
  );

  const handleReset = () => {
    setSelectedLocation("");
    setSelectedProject("");
    setSelectedType("");

    runSearch({
      location: "",
      projectName: "",
      propertyType: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    runSearch({
      location: selectedLocation,
      projectName: selectedProject,
      propertyType: selectedType,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: variant === "floating" ? 0.2 : 0,
        duration: 0.5,
      }}
      className={t.wrapper}
    >
      <div className={t.card}>
        <div className={t.header}>
          <span className={t.title}>{title}</span>

          {(selectedLocation || selectedProject || selectedType) && (
            <button type="button" onClick={handleReset} className={t.reset}>
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {error && <div className={t.error}>{error}</div>}

        <form
          onSubmit={handleSubmit}
          className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 items-end"
        >
          {/* Location */}
          <div className="space-y-1 sm:space-y-1.5">
            <label className={t.label}>
              <MapPin className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${t.iconAccent}`} />
              Location
            </label>

            <div className="relative">
              <select
                value={selectedLocation}
                onChange={handleLocationChange}
                disabled={loading || locations.length === 0}
                className={t.select}
              >
                <option value="">All Locations</option>

                {locations.map((loc) => (
                  <option key={loc} value={loc} className={t.option}>
                    {loc}
                  </option>
                ))}
              </select>

              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-zinc-400">
                ▼
              </div>
            </div>
          </div>

          {/* Project Name */}
          <div className="space-y-1 sm:space-y-1.5">
            <label className={t.label}>
              <Building
                className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${t.iconAccent}`}
              />
              Project Name
            </label>

            <div className="relative">
              <select
                value={selectedProject}
                onChange={handleProjectChange}
                disabled={loading || projectNames.length === 0}
                className={t.select}
              >
                <option value="">
                  {selectedLocation
                    ? "All Projects in " + selectedLocation
                    : "All Projects"}
                </option>

                {projectNames.map((name) => (
                  <option key={name} value={name} className={t.option}>
                    {name}
                  </option>
                ))}
              </select>

              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-zinc-400">
                ▼
              </div>
            </div>
          </div>

          {/* Property Type */}
          <div className="space-y-1 sm:space-y-1.5">
            <label className={t.label}>
              <Building2
                className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${t.iconAccent}`}
              />
              Property Type
            </label>

            <div className="relative">
              <select
                value={selectedType}
                onChange={handleTypeChange}
                disabled={loading}
                className={t.select}
              >
                <option value="">All Types</option>

                <option
                  value="Residential"
                  disabled={!propertyTypeAvailability.residential}
                  className={t.option}
                >
                  Residential{" "}
                  {!propertyTypeAvailability.residential && "(Unavailable)"}
                </option>

                <option
                  value="Commercial"
                  disabled={!propertyTypeAvailability.commercial}
                  className={t.option}
                >
                  Commercial{" "}
                  {!propertyTypeAvailability.commercial && "(Unavailable)"}
                </option>
              </select>

              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-zinc-400">
                ▼
              </div>
            </div>
          </div>

          {/* Submit */}
          <div>
            <button type="submit" disabled={loading} className={t.button}>
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Search className="w-4 h-4 transition-transform group-hover:scale-110" />
                  <span>Search Properties</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default PropertySearch;
