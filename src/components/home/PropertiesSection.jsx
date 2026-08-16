"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Swiper CSS imports
import "swiper/css";
import PropertyCard from "../ui/PropertyCard";

// Demo Static Data
const demoProperties = [
  {
    id: "1",
    slug: "nestora-dokkhina-lake",
    title: "Nestora Dokkhina Lake",
    location: "Bashundhara R/A, Dhaka",
    typeTag: "4 BHK",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop",
    specs: {
      bedrooms: 4,
      bathrooms: 4,
      flatSize: "2,400 sft",
    },
  },
  {
    id: "2",
    slug: "aftab-horizon-height",
    title: "Aftab Horizon Height",
    location: "Aftab Nagar, Dhaka",
    typeTag: "3 BHK",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
    specs: {
      bedrooms: 3,
      bathrooms: 3,
      flatSize: "1,850 sft",
    },
  },
  {
    id: "3",
    slug: "jolshiri-abode-park",
    title: "Jolshiri Abode Park",
    location: "Jolshiri Abashon, Dhaka",
    typeTag: "4 BHK",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
    specs: {
      bedrooms: 4,
      bathrooms: 4,
      flatSize: "2,800 sft",
    },
  },
  {
    id: "4",
    slug: "uttara-grand-pavilion",
    title: "Uttara Grand Pavilion",
    location: "Uttara, Dhaka",
    typeTag: "5 BHK Duplex",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    specs: {
      bedrooms: 5,
      bathrooms: 5,
      flatSize: "4,200 sft",
    },
  },
];

const PropertiesSection = () => {
  const swiperRef = useRef(null);

  return (
    <section className="bg-slate-50 dark:bg-[#070913] py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#3b1a83] dark:text-indigo-400">
              FEATURED PROJECTS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight mt-1">
              Explore Our Signature Properties
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-normal">
              Find your ideal home engineered for ultimate soundproof luxury and
              architectural perfection.
            </p>
          </div>

          {/* Header Link */}
          <Link
            href="/properties"
            className="hidden sm:inline-flex items-center justify-center gap-2 bg-[#3b1a83] hover:bg-[#2c1363] text-white text-xs font-bold px-6 py-3 rounded-full transition-all active:scale-95 shadow-md"
          >
            <span>View All Properties</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Carousel Wrapper with Side Arrows (Left and Right) */}
        {/* Carousel Wrapper */}
        <div className="relative">
          {/* Left Navigation Arrow */}
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white dark:bg-zinc-800 text-[#3b1a83] dark:text-white items-center justify-center border border-zinc-200 dark:border-zinc-700 shadow-xl hover:bg-[#3b1a83] hover:text-white transition-all duration-300 active:scale-95"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Navigation Arrow */}
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#3b1a83] text-white items-center justify-center border border-[#3b1a83] shadow-xl hover:bg-[#2c1363] transition-all duration-300 active:scale-95"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Swiper Slider */}
          <Swiper
            modules={[Autoplay]}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            spaceBetween={24}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="w-full !py-2"
          >
            {demoProperties.map((property) => (
              <SwiperSlide key={property.id}>
                <PropertyCard property={property} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Mobile View All CTA */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/properties"
            className="inline-flex items-center justify-center gap-2 bg-[#3b1a83] text-white text-xs font-bold px-6 py-3.5 rounded-full shadow-md w-full"
          >
            <span>View All Properties</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PropertiesSection;
