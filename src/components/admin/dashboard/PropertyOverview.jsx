"use client";

import Link from "next/link";
import Image from "next/image";
import { Bed, Bath, MapPin, ArrowRight, Building2 } from "lucide-react";
import { getPropertyStatusMeta } from "@/components/ui/dashboard-helpers";

const RowSkeleton = () => (
  <div className="flex items-center gap-3 p-3 sm:p-4 animate-pulse">
    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl bg-zinc-200 dark:bg-zinc-800 shrink-0" />
    <div className="flex-1 space-y-2">
      <div className="h-3 w-1/2 bg-zinc-200 dark:bg-zinc-800 rounded" />
      <div className="h-2.5 w-1/3 bg-zinc-200 dark:bg-zinc-800 rounded" />
    </div>
  </div>
);

const PropertyOverview = ({ properties = [], loading }) => {
  const recent = [...properties]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="rounded-2xl sm:rounded-3xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-zinc-100 dark:border-zinc-800">
        <h3 className="font-serif text-sm sm:text-lg font-bold text-zinc-900 dark:text-white">
          Recent Properties
        </h3>
        <Link
          href="/admin/properties"
          className="text-[11px] sm:text-xs font-semibold text-brand dark:text-indigo-400 hover:underline flex items-center gap-1"
        >
          View all
          <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
        </Link>
      </div>

      {loading ? (
        <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
          {Array.from({ length: 4 }).map((_, i) => (
            <RowSkeleton key={i} />
          ))}
        </div>
      ) : recent.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 sm:py-14 px-4 text-center">
          <Building2 className="w-8 h-8 text-zinc-300 dark:text-zinc-700 mb-2" />
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            No properties added yet.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
          {recent.map((property) => (
            <Link
              key={property._id}
              href={`/properties/${property.slug || property._id}`}
              target="_blank"
              className="flex items-center gap-3 p-3 sm:p-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
            >
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl overflow-hidden shrink-0 bg-zinc-100 dark:bg-zinc-800">
                {property.coverImage && (
                  <Image
                    src={property.coverImage}
                    alt={property.title}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white truncate">
                    {property.title}
                  </h4>
                  {property.status && (
                    <span
                      className={`hidden sm:inline-block text-[9px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full shrink-0 ${getPropertyStatusMeta(property.status)}`}
                    >
                      {property.status}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 text-[10px] sm:text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  <MapPin className="w-3 h-3 shrink-0" />
                  <span className="truncate">{property.locationName}</span>
                </div>
                <div className="hidden sm:flex items-center gap-3 text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">
                  {property.bedrooms !== undefined && (
                    <span className="flex items-center gap-1">
                      <Bed className="w-3 h-3" /> {property.bedrooms}
                    </span>
                  )}
                  {property.bathrooms !== undefined && (
                    <span className="flex items-center gap-1">
                      <Bath className="w-3 h-3" /> {property.bathrooms}
                    </span>
                  )}
                </div>
              </div>

              {property.status && (
                <span
                  className={`sm:hidden text-[8px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-full shrink-0 ${getPropertyStatusMeta(property.status)}`}
                >
                  {property.status}
                </span>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyOverview;
