"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

import { getPropertys } from "@/services/api/property";
import { PropertyCard } from "../ui/PropertyCard";

const PropertiesSection = () => {
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
    <section className="bg-slate-50 dark:bg-[#070913] py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
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

          <Link
            href="/properties"
            className="hidden sm:inline-flex items-center justify-center gap-2 bg-[#3b1a83] hover:bg-[#2c1363] text-white text-xs font-bold px-6 py-3 rounded-full transition-all active:scale-95 shadow-md"
          >
            <span>View All Properties</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Properties */}
        <div className="relative">
          {/* Previous Button */}
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            disabled={loading || properties.length === 0}
            className="flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white dark:bg-zinc-800 text-[#3b1a83] dark:text-white items-center justify-center border border-zinc-200 dark:border-zinc-700 shadow-xl hover:bg-[#3b1a83] hover:text-white transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={() => swiperRef.current?.slideNext()}
            disabled={loading || properties.length === 0}
            className="flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#3b1a83] text-white items-center justify-center border border-[#3b1a83] shadow-xl hover:bg-[#2c1363] transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Loading */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-[380px] rounded-2xl bg-zinc-200 dark:bg-zinc-800 animate-pulse"
                />
              ))}
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="flex items-center justify-center min-h-[300px]">
              <p className="text-sm font-medium text-red-500">{error}</p>
            </div>
          )}

          {/* Empty */}
          {!loading && !error && properties.length === 0 && (
            <div className="flex items-center justify-center min-h-[300px]">
              <p className="text-sm text-zinc-500">
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
              {properties.map((property) => (
                <SwiperSlide key={property._id}>
                  <PropertyCard property={property} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
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
