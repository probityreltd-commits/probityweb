"use client";

import React from "react";
import Image from "next/image";

const GallerySection = ({ images = [] }) => {
  if (!images || images.length === 0) return null;

  const marqueeImages = [...images, ...images, ...images];

  return (
    <section className="w-full my-12 py-6 bg-transparent relative overflow-hidden">
      {/* Title Bar */}
      <div className="w-full mx-auto px-4 sm:px-6 mb-6 flex items-center justify-between">
        <div className="">
          <h3 className="text-base font-bold text-zinc-900 dark:text-white tracking-wide uppercase">
            Project Gallery
          </h3>
        </div>
        <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
          {images.length} High-Res Shots
        </span>
      </div>

      {/* Full-width Marquee Wrapper */}
      <div className="relative w-full overflow-hidden">
        {/* Continuous Marquee Track */}
        <div className="animate-marquee-track gap-4">
          {marqueeImages.map((img, idx) => (
            <div
              key={idx}
              className="relative w-[280px] sm:w-[360px] h-[200px] sm:h-[240px] shrink-0 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 group transition-transform duration-300 hover:scale-[1.02]"
            >
              <Image
                src={img}
                alt={`Gallery Image ${(idx % images.length) + 1}`}
                fill
                unoptimized
                sizes="(max-width: 768px) 280px, 360px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-xs text-white font-mono">
                  Photo {(idx % images.length) + 1} of {images.length}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
