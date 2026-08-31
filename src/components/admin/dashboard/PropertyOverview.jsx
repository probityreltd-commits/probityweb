"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin, Building, Calendar } from "lucide-react";

const PropertyOverview = ({ properties = [], loading }) => {
  // Sort properties by createdAt descending
  const recentProperties = useMemo(() => {
    return [...properties]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 4);
  }, [properties]);

  // Dynamic Status Breakdown
  const statusStats = useMemo(() => {
    const total = properties.length || 1;
    const counts = properties.reduce((acc, p) => {
      const st = p.status?.toUpperCase() || "UNKNOWN";
      acc[st] = (acc[st] || 0) + 1;
      return acc;
    }, {});

    return [
      {
        name: "UPCOMING",
        count: counts["UPCOMING"] || 0,
        color: "bg-blue-500",
        text: "text-blue-500",
      },
      {
        name: "UNDER CONSTRUCTION",
        count:
          counts["UNDER_CONSTRUCTION"] || counts["UNDER CONSTRUCTION"] || 0,
        color: "bg-amber-500",
        text: "text-amber-500",
      },
      {
        name: "COMPLETED",
        count: counts["COMPLETED"] || 0,
        color: "bg-emerald-500",
        text: "text-emerald-500",
      },
    ].map((item) => ({
      ...item,
      percentage: Math.round((item.count / total) * 100),
    }));
  }, [properties]);

  if (loading) {
    return (
      <div className="h-64 bg-zinc-200 dark:bg-zinc-800 rounded-2xl animate-pulse" />
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Property Status Distribution */}
      <div className="lg:col-span-4 bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-100 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
        <div>
          <h3 className="text-base font-bold text-zinc-900 dark:text-white">
            Portfolio Distribution
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Real-time status analysis of all listings
          </p>

          <div className="mt-6 space-y-4">
            {statusStats.map((item) => (
              <div key={item.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-zinc-700 dark:text-zinc-300">
                    {item.name}
                  </span>
                  <span className="text-zinc-500">
                    {item.count} ({item.percentage}%)
                  </span>
                </div>
                <div className="w-full h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} transition-all duration-500`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center text-xs">
          <span className="text-zinc-500">Total Listed</span>
          <span className="font-bold text-zinc-900 dark:text-white">
            {properties.length} Properties
          </span>
        </div>
      </div>

      {/* Recent Properties List */}
      <div className="lg:col-span-8 bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-100 dark:border-zinc-800 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-white">
              Recently Added Properties
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Latest additions to your real estate portfolio
            </p>
          </div>
          <Link
            href="/admin/properties"
            className="text-xs font-bold text-[#3b1a83] dark:text-purple-400 hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentProperties.length === 0 ? (
          <div className="py-12 text-center text-xs text-zinc-500">
            No properties available.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {recentProperties.map((prop) => (
              <div
                key={prop._id || prop.slug}
                className="flex items-center gap-3 p-2.5 rounded-xl border border-zinc-100 dark:border-zinc-800/80 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-all"
              >
                <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-zinc-100 dark:bg-zinc-800">
                  <Image
                    src={
                      prop.coverImage ||
                      prop.images?.[0] ||
                      "/placeholder-property.jpg"
                    }
                    alt={prop.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-white truncate">
                    {prop.title}
                  </h4>
                  <div className="flex items-center gap-1 text-[11px] text-zinc-500 mt-0.5 truncate">
                    <MapPin className="w-3 h-3 shrink-0" />
                    <span className="truncate">
                      {prop.locationName || "Location N/A"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                      {prop.propertyType}
                    </span>
                    <span className="text-[10px] font-bold text-[#3b1a83] dark:text-purple-400">
                      {prop.pricePerSqft}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyOverview;
