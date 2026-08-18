"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Bed, Bath, Maximize, MapPin } from "lucide-react";

const PropertyCard = ({ property }) => {
  const {
    id,
    title,
    location,
    locationName,
    images,
    typeTag,
    status,
    specs,
    slug,
  } = property;

  // First image from images array
  const image = images?.[0];

  return (
    <Link
      href={`/properties/${slug || id}`}
      className="group relative block w-full h-[480px] rounded-3xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-md hover:shadow-2xl transition-all duration-500"
    >
      {/* Background Property Image */}
      <div className="relative w-full h-full overflow-hidden">
        {image && (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        )}

        {/* Brand Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#3b1a83]/95 via-[#3b1a83]/25 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between gap-2">
          {/* Property Type */}
          {typeTag && (
            <span className="bg-[#ffb703] text-zinc-950 text-[11px] font-bold px-3.5 py-1.5 rounded-full shadow-md tracking-wide">
              {typeTag}
            </span>
          )}

          {/* Status */}
          {status && (
            <span className="bg-[#3b1a83]/90 backdrop-blur-md text-white border border-white/20 text-[10px] font-semibold px-3 py-1.5 rounded-full tracking-wide">
              {status}
            </span>
          )}
        </div>

        {/* Hover Project Summary */}
        {specs && (
          <div className="absolute bottom-0 left-0 right-0 z-20 p-6 bg-[#3b1a83]/75 backdrop-blur-md rounded-t-3xl translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
            {/* Label */}
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
              Project Summary
            </span>

            {/* Title */}
            <h4 className="font-serif text-2xl font-bold text-white mt-2 mb-2">
              {title}
            </h4>

            {/* Location */}
            <div className="flex items-center gap-1.5 text-zinc-200 text-xs mb-4">
              <MapPin className="w-3.5 h-3.5 text-amber-300 shrink-0" />

              <span className="truncate">{location}</span>
            </div>

            {/* Specs */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/20 text-white">
              {/* Bedrooms */}
              {specs.bedrooms && (
                <div className="flex flex-col items-center p-2 rounded-2xl bg-white/10 backdrop-blur-sm text-center border border-white/10">
                  <Bed className="w-4 h-4 text-amber-300 mb-1" />

                  <span className="font-serif text-sm font-bold">
                    {specs.bedrooms}
                  </span>

                  <span className="text-[10px] text-zinc-200">
                    {specs.bedrooms === 1 ? "Bedroom" : "Bedrooms"}
                  </span>
                </div>
              )}

              {/* Bathrooms */}
              {specs.bathrooms && (
                <div className="flex flex-col items-center p-2 rounded-2xl bg-white/10 backdrop-blur-sm text-center border border-white/10">
                  <Bath className="w-4 h-4 text-amber-300 mb-1" />

                  <span className="font-serif text-sm font-bold">
                    {specs.bathrooms}
                  </span>

                  <span className="text-[10px] text-zinc-200">
                    {specs.bathrooms === 1 ? "Bathroom" : "Bathrooms"}
                  </span>
                </div>
              )}

              {/* Flat Size */}
              {specs.flatSize && (
                <div className="flex flex-col items-center p-2 rounded-2xl bg-white/10 backdrop-blur-sm text-center border border-white/10">
                  <Maximize className="w-4 h-4 text-amber-300 mb-1" />

                  <span className="font-serif text-xs font-bold truncate max-w-full">
                    {specs.flatSize}
                  </span>

                  <span className="text-[10px] text-zinc-200">Flat Size</span>
                </div>
              )}
            </div>

            {/* Explore Details */}
            <div className="mt-6 flex items-center justify-between text-xs font-semibold text-amber-300">
              <span>Explore Details</span>

              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        )}

        {/* Default Bottom Content */}
        <div className="absolute bottom-0 inset-x-0 p-6 z-10 flex items-end justify-between">
          <div className="min-w-0">
            {/* Location Name */}
            {locationName && (
              <span className="block text-[10px] uppercase tracking-widest text-amber-300 font-semibold mb-1">
                {locationName}
              </span>
            )}

            {/* Title */}
            <h3 className="font-serif text-2xl font-bold text-white tracking-tight group-hover:text-amber-300 transition-colors">
              {title}
            </h3>

            {/* Location */}
            <p className="text-xs text-zinc-300 mt-1 font-normal line-clamp-1">
              {location}
            </p>
          </div>

          {/* Arrow */}
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center group-hover:bg-[#3b1a83] group-hover:text-white transition-all shadow-lg shrink-0 ml-3 border border-white/20">
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
