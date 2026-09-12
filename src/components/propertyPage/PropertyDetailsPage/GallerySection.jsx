"use client";

import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const GallerySection = ({ images = [] }) => {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const isOpen = lightboxIndex !== null;

  const handlePrev = useCallback(() => {
    setLightboxIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setLightboxIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, handlePrev, handleNext]);

  if (!images || images.length === 0) return null;

  const marqueeImages = [...images, ...images, ...images];

  return (
    <>
      <section className="w-full my-6 sm:my-8 lg:my-12 py-4 sm:py-6 bg-transparent relative overflow-hidden">
        {/* Title Bar */}
        <div className="w-full mx-auto px-4 sm:px-6 mb-4 sm:mb-6 flex items-center justify-between">
          <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white tracking-wide uppercase">
            Project Gallery
          </h3>
          <span className="text-[10px] sm:text-xs font-mono text-zinc-500 uppercase tracking-widest">
            {images.length} High-Res Shots
          </span>
        </div>

        {/* Full-width Marquee Wrapper */}
        <div className="relative w-full overflow-hidden">
          <div className="animate-marquee-track gap-2.5 sm:gap-4">
            {marqueeImages.map((img, idx) => {
              const realIndex = idx % images.length;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setLightboxIndex(realIndex)}
                  aria-label={`Open image ${realIndex + 1} of ${images.length}`}
                  className="relative w-[120px] sm:w-[280px] lg:w-[360px] h-[90px] sm:h-[200px] lg:h-[240px] shrink-0 rounded-lg sm:rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 group transition-transform duration-300 hover:scale-[1.02] cursor-pointer"
                >
                  <Image
                    src={img}
                    alt={`Gallery Image ${realIndex + 1}`}
                    fill
                    unoptimized
                    sizes="(max-width: 640px) 120px, (max-width: 1024px) 280px, 360px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex items-end p-4">
                    <span className="text-xs text-white font-mono">
                      Photo {realIndex + 1} of {images.length}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lightbox Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center px-2 sm:px-4"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close */}
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            aria-label="Close gallery"
            className="absolute top-3 right-3 sm:top-6 sm:right-6 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-10"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Counter */}
          <span className="absolute top-4 sm:top-7 left-1/2 -translate-x-1/2 text-white/80 text-[11px] sm:text-xs font-mono uppercase tracking-widest z-10">
            {lightboxIndex + 1} / {images.length}
          </span>

          {/* Prev */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              aria-label="Previous image"
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-10"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          )}

          {/* Next */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              aria-label="Next image"
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-10"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          )}

          {/* Full Image */}
          <div
            className="relative w-full max-w-5xl h-[70vh] sm:h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[lightboxIndex]}
              alt={`Gallery Image ${lightboxIndex + 1}`}
              fill
              unoptimized
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default GallerySection;
