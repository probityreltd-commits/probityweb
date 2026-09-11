"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";

const OurStory = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // SVG circular text path string
  const circularText = "TAKE A TOUR • VIEW DEMO • ";

  // Close modal on Escape key press
  const handleKeyDown = useCallback((e) => {
    if (e.key === "Escape") {
      setIsVideoOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isVideoOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isVideoOpen, handleKeyDown]);

  return (
    <section className="bg-[#020b18] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Image with Floating Circular Play Badge */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 relative flex justify-center lg:justify-start"
        >
          <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
            {/* Person Image */}
            <Image
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop"
              alt="Mamunur Rashid - Founder & Managing Director"
              fill
              sizes="(max-width: 1024px) 100vw, 420px"
              priority
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Gradient Overlay for Mood */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#020b18]/60 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Rotating Circular Play Button Badge */}
          <div className="absolute -bottom-6 -right-2 sm:bottom-[-20px] sm:right-[-20px] z-10">
            <button
              onClick={() => setIsVideoOpen(true)}
              className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#020b18]/80 backdrop-blur-md flex items-center justify-center border border-white/15 shadow-2xl hover:scale-105 transition-transform duration-300 group focus:outline-none focus:ring-2 focus:ring-[#3b1a83]"
              aria-label="Play video"
            >
              {/* Rotating Circular Text */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 14, ease: "linear" }}
                className="absolute inset-0 w-full h-full p-2 pointer-events-none"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path
                    id="circlePath"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="none"
                  />
                  <text className="text-[10px] font-bold fill-white/80 uppercase tracking-widest">
                    <textPath href="#circlePath" startOffset="0%">
                      {circularText}
                    </textPath>
                  </text>
                </svg>
              </motion.div>

              {/* Play Icon Center Button */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-zinc-950 flex items-center justify-center shadow-lg group-hover:bg-[#3b1a83] group-hover:text-white transition-colors duration-300 z-10">
                <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current ml-0.5" />
              </div>
            </button>
          </div>
        </motion.div>

        {/* Right Column: Narrative Content */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col justify-center"
        >
          {/* Pill Badge */}
          <div>
            <span className="inline-block bg-white/10 text-xs text-zinc-200 font-medium px-4 py-1.5 rounded-full border border-white/15 backdrop-blur-sm">
              Our Story
            </span>
          </div>

          {/* Main Statement Title */}
          <h2 className="font-serif text-2xl sm:text-4xl lg:text-[42px] font-semibold text-white mt-5 mb-5 sm:mb-6 leading-[1.25] tracking-tight">
            I wanted to build homes where a good life is easy to live.
          </h2>

          {/* Story Body Paragraph */}
          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-8 sm:mb-10 max-w-2xl font-normal">
            Mamunur Rashid started Nestora after twenty years in business and a
            decade in real estate. He knows the pain of too many buyers let down
            by late handovers, amenities that never delivered, and pricing no
            one would explain. He built Nestora to do the opposite: homes where
            the school, the mosque, the market, and the hospital are close,
            where there is open ground to garden, and where what you are
            promised is what you get.
          </p>

          {/* Founder Bio */}
          <div className="pt-4 border-t border-white/10">
            <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
              Jon Doe
            </h3>
            <p className="text-xs text-zinc-400 font-medium mt-0.5">
              Founder &amp; Managing Director, Probity Real Estate Ltd.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Video Modal / Popup Overlay */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsVideoOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            >
              <button
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-white/20 transition-colors border border-white/10 focus:outline-none"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Nestora Story Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default OurStory;
