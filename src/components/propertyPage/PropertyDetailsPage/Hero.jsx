import Image from "next/image";
import { MapPin, Expand, ChevronLeft, ChevronRight } from "lucide-react";

const Hero = ({
  images,
  activeIndex,
  setActiveIndex,
  onPrev,
  onNext,
  onOpenLightbox,
  property,
}) => {
  const safeIndex = Math.min(activeIndex, images.length - 1);

  return (
    <div className="mt-5">
      <div className="relative w-full h-[52vh] sm:h-[68vh] rounded-[28px] overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-200 dark:bg-zinc-800 group">
        {images.length > 0 ? (
          <Image
            src={images[safeIndex]}
            alt={`${property?.title} — view ${safeIndex + 1}`}
            fill
            priority
            unoptimized
            sizes="(max-width: 768px) 100vw, 1152px"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-zinc-400 text-sm ledger-font">
            No images available
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* Status stamp */}
        {property?.status && (
          <div
            className="absolute top-5 right-5 sm:top-7 sm:right-7 w-[86px] h-[86px] sm:w-[100px] sm:h-[100px] rounded-full flex items-center justify-center text-center border-2 border-dashed border-white/70 backdrop-blur-sm"
            style={{
              transform: "rotate(-9deg)",
              background: "rgba(67,23,128,0.55)",
            }}
          >
            <span className="ledger-font text-[10px] sm:text-[11px] tracking-widest uppercase text-white leading-tight px-1">
              {property.status}
            </span>
          </div>
        )}

        {/* Fullscreen hint */}
        {images.length > 0 && (
          <button
            onClick={onOpenLightbox}
            aria-label="View gallery fullscreen"
            className="absolute bottom-5 right-5 sm:bottom-7 sm:right-7 flex items-center gap-2 bg-black/50 backdrop-blur-md border border-white/20 text-white text-[11px] ledger-font uppercase tracking-wider px-3.5 py-2 rounded-full hover:border-[#a78bfa] hover:text-[#a78bfa] transition-all"
          >
            <Expand className="w-3.5 h-3.5" />
            {safeIndex + 1} / {images.length}
          </button>
        )}

        {/* Prev/Next */}
        {images.length > 1 && (
          <>
            <button
              onClick={onPrev}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center border border-white/15 opacity-0 group-hover:opacity-100 hover:border-[#a78bfa] hover:text-[#a78bfa] transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={onNext}
              aria-label="Next image"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center border border-white/15 opacity-0 group-hover:opacity-100 hover:border-[#a78bfa] hover:text-[#a78bfa] transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Title block */}
        <div className="absolute bottom-6 left-6 sm:bottom-9 sm:left-9 right-24 sm:right-32">
          {property?.propertyType && (
            <span className="ledger-font text-[11px] tracking-[0.2em] uppercase text-[#c4a6f7]">
              {property.propertyType}
            </span>
          )}
          <h1 className="display-font text-2xl sm:text-5xl font-semibold text-white leading-[1.05] mt-1.5">
            {property?.title}
          </h1>
          <div className="flex items-center gap-1.5 mt-3 text-xs sm:text-sm text-white/85">
            <MapPin className="w-4 h-4 text-[#c4a6f7] shrink-0" />
            <span>{property?.locationName}</span>
          </div>
        </div>
      </div>

      {/* Filmstrip thumbnails */}
      {images.length > 1 && (
        <div className="film-thumb flex gap-2.5 mt-3 overflow-x-auto pb-1">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`relative shrink-0 w-24 h-16 sm:w-32 sm:h-20 rounded-xl overflow-hidden border-2 transition-all bg-zinc-200 dark:bg-zinc-800 ${
                safeIndex === idx
                  ? "border-[#431780]"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={img}
                alt={`${property?.title} thumbnail ${idx + 1}`}
                fill
                unoptimized
                sizes="128px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Hero;
