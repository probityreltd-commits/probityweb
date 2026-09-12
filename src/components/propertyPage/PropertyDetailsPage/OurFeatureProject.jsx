"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import { PropertyCard } from "@/components/ui/PropertyCard";
import { getPropertys } from "@/services/api/property";

const OurFeatureProject = () => {
  const swiperRef = useRef(null);

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getPropertys();

        if (data?.success) {
          setProperties(data.data || []);
        } else {
          setError("Failed to load properties.");
        }
      } catch (error) {
        console.error("Properties fetch error:", error);
        setError("Failed to load properties.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <section className="overflow-x-hidden md:overflow-x-visible">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-4 sm:mb-6">
          Our Feature Project
        </h2>

        {/* Properties */}
        <div className="relative">
          {/* Prev/Next — desktop only, mobile relies on swipe */}
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            disabled={loading || properties.length === 0}
            className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white dark:bg-zinc-800 text-brand dark:text-white items-center justify-center border border-zinc-200 dark:border-zinc-700 shadow-xl hover:bg-brand hover:text-white transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={() => swiperRef.current?.slideNext()}
            disabled={loading || properties.length === 0}
            className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-brand text-white items-center justify-center border border-brand shadow-xl hover:bg-brand-dark transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Loading */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-[320px] sm:h-[380px] rounded-2xl bg-zinc-200 dark:bg-zinc-800 animate-pulse"
                />
              ))}
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="flex items-center justify-center min-h-[240px] sm:min-h-[300px]">
              <p className="text-xs sm:text-sm font-medium text-red-500">
                {error}
              </p>
            </div>
          )}

          {/* Empty */}
          {!loading && !error && properties.length === 0 && (
            <div className="flex items-center justify-center min-h-[240px] sm:min-h-[300px]">
              <p className="text-xs sm:text-sm text-zinc-500">
                No properties available at the moment.
              </p>
            </div>
          )}

          {/* Swiper */}
          {!loading && !error && properties.length > 0 && (
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
              loop={properties.length > 3}
              spaceBetween={16}
              breakpoints={{
                0: { slidesPerView: 1, spaceBetween: 16 },
                640: { slidesPerView: 2, spaceBetween: 24 },
                1024: { slidesPerView: 3, spaceBetween: 24 },
              }}
              className="w-full !py-2"
            >
              {properties.map((property) => (
                <SwiperSlide key={property._id}>
                  <PropertyCard property={property} alwaysExpanded />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>

        {/* Mobile View All CTA */}
        <div className="mt-6 sm:mt-8 text-center sm:hidden">
          <Link
            href="/properties"
            className="inline-flex items-center justify-center gap-2 bg-brand text-white text-xs font-bold px-6 py-3 rounded-full shadow-md w-full"
          >
            <span>View All Properties</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OurFeatureProject;
