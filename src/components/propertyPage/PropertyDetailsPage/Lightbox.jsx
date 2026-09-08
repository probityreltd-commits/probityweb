import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const Lightbox = ({
  isOpen,
  onClose,
  images,
  activeIndex,
  onPrev,
  onNext,
  title,
}) => {
  if (!isOpen || images.length === 0) return null;

  const safeIndex = Math.min(activeIndex, images.length - 1);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm px-4"
      role="dialog"
      aria-modal="true"
    >
      <button
        onClick={onClose}
        aria-label="Close gallery"
        className="absolute top-6 right-6 w-10 h-10 rounded-full border border-white/25 text-white flex items-center justify-center hover:border-[#a78bfa] hover:text-[#a78bfa] transition-all"
      >
        <X className="w-5 h-5" />
      </button>

      <button
        onClick={onPrev}
        aria-label="Previous image"
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/25 text-white flex items-center justify-center hover:border-[#a78bfa] hover:text-[#a78bfa] transition-all"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <div className="relative w-full max-w-4xl h-[70vh]">
        <Image
          src={images[safeIndex]}
          alt={`${title || "Property"} — full view ${safeIndex + 1}`}
          fill
          unoptimized
          sizes="90vw"
          className="object-contain"
        />
      </div>

      <button
        onClick={onNext}
        aria-label="Next image"
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/25 text-white flex items-center justify-center hover:border-[#a78bfa] hover:text-[#a78bfa] transition-all"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <span className="absolute bottom-6 ledger-font text-[11px] uppercase tracking-widest text-white/70">
        {safeIndex + 1} / {images.length}
      </span>
    </div>
  );
};

export default Lightbox;
