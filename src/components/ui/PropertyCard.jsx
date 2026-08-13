"use client";
import React from "react";
import Link from "next/link";
import { ArrowUpRight, Bed, Bath, Maximize } from "lucide-react";

const PropertyCard = ({ property }) => {
  const { id, title, location, image, typeTag, specs, slug } = property;

  return (
    <Link
      href={`/properties/${slug || id}`}
      className="group relative block w-full h-[480px] rounded-3xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-md hover:shadow-2xl transition-all duration-500"
    >
      {/* Background Property Image */}
      <div className="relative w-full h-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Brand Ambient Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#3b1a83]/90 via-[#3b1a83]/20 to-transparent transition-opacity duration-300" />

        {/* Top Property Badge */}
        {typeTag && (
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-[#ffb703] text-zinc-950 text-[11px] font-bold px-3.5 py-1.5 rounded-full shadow-md tracking-wide">
              {typeTag}
            </span>
          </div>
        )}

        {/* Smooth BG Card Overlay (Reveals on Hover) */}
        {specs && (
          <div className="absolute bottom-0 left-0 right-0 z-20 p-6 bg-[#3b1a83]/65 backdrop-blur-md rounded-t-3xl translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 mb-2">
              Project Summary
            </span>
            <h4 className="font-serif text-2xl font-bold text-white mb-4">
              {title}
            </h4>

            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/20 text-white">
              {specs.bedrooms && (
                <div className="flex flex-col items-center p-2 rounded-2xl bg-white/10 backdrop-blur-sm text-center border border-white/10">
                  <Bed className="w-4 h-4 text-amber-300 mb-1" />
                  <span className="font-serif text-sm font-bold">
                    {specs.bedrooms}
                  </span>
                  <span className="text-[10px] text-zinc-200">Beds</span>
                </div>
              )}
              {specs.bathrooms && (
                <div className="flex flex-col items-center p-2 rounded-2xl bg-white/10 backdrop-blur-sm text-center border border-white/10">
                  <Bath className="w-4 h-4 text-amber-300 mb-1" />
                  <span className="font-serif text-sm font-bold">
                    {specs.bathrooms}
                  </span>
                  <span className="text-[10px] text-zinc-200">Baths</span>
                </div>
              )}
              {specs.flatSize && (
                <div className="flex flex-col items-center p-2 rounded-2xl bg-white/10 backdrop-blur-sm text-center border border-white/10">
                  <Maximize className="w-4 h-4 text-amber-300 mb-1" />
                  <span className="font-serif text-xs font-bold truncate max-w-full">
                    {specs.flatSize}
                  </span>
                  <span className="text-[10px] text-zinc-200">Size</span>
                </div>
              )}
            </div>

            <div className="mt-6 flex items-center justify-between text-xs font-semibold text-amber-300">
              <span>Explore Details</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        )}

        {/* Card Default Bottom Bar */}
        <div className="absolute bottom-0 inset-x-0 p-6 z-10 flex items-end justify-between">
          <div>
            <h3 className="font-serif text-2xl font-bold text-white tracking-tight group-hover:text-amber-300 transition-colors">
              {title}
            </h3>
            <p className="text-xs text-zinc-300 mt-1 font-normal">{location}</p>
          </div>

          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center group-hover:bg-[#3b1a83] group-hover:text-white transition-all shadow-lg shrink-0 ml-3 border border-white/20">
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
