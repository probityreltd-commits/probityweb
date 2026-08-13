"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Play, X } from "lucide-react";

const OurStory = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // SVG circular text path string
  const circularText = "TAKE A TOUR • VIEW DEMO • ";

  return (
    <section className="bg-[#020b18] text-white py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Image with Floating Circular Play Badge */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 relative flex justify-center lg:justify-start"
        >
          <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            {/* Person Image */}
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop"
              alt="Mamunur Rashid - Founder & Managing Director"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Rotating Circular Play Button Badge */}
          <div className="absolute -bottom-6 -right-2 sm:bottom-[-20px] sm:right-[-20px] z-10">
            <button
              onClick={() => setIsVideoOpen(true)}
              className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-black/80 backdrop-blur-md flex items-center justify-center border border-white/10 shadow-2xl hover:scale-105 transition-transform duration-300 group"
              aria-label="Play video"
            >
              {/* Rotating Circular Text */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                className="absolute inset-0 w-full h-full p-2"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path
                    id="circlePath"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="none"
                  />
                  <text className="text-[10.5px] font-bold fill-white/80 uppercase tracking-widest">
                    <textPath href="#circlePath" startOffset="0%">
                      {circularText}
                    </textPath>
                  </text>
                </svg>
              </motion.div>

              {/* Play Icon Center Button */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-black flex items-center justify-center shadow-lg group-hover:bg-amber-400 transition-colors z-10">
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

          {/* Main Statement Title -> font-serif */}
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-semibold text-white mt-6 mb-6 leading-[1.25] tracking-tight">
            I wanted to build homes where a good life is easy to live.
          </h2>

          {/* Story Body Paragraph -> font-sans */}
          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-10 max-w-2xl font-normal">
            Mamunur Rashid started Nestora after twenty years in business and a
            decade in real estate. He knows the pain of too many buyers let down
            by late handovers, amenities that never delivered, and pricing no
            one would explain. He built Nestora to do the opposite: homes where
            the school, the mosque, the market, and the hospital are close,
            where there is open ground to garden, and where what you are
            promised is what you get.
          </p>

          {/* Founder Bio */}
          <div className="pt-2 border-t border-white/10">
            <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
              Mamunur Rashid
            </h3>
            <p className="text-xs text-zinc-400 font-medium mt-0.5">
              Founder &amp; Managing Director, Nestora Holdings Ltd.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Video Modal / Popup Overlay */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/40 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="Nestora Story Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default OurStory;
