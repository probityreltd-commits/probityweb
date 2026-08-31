"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Building, ArrowRight } from "lucide-react";
import Link from "next/link";

import PropertySearch from "./PropertySearch"; // Path dynamically adjust করে নেবেন

const fallingStarsData = [
  { id: 1, left: "10%", duration: 4, delay: 0, size: 2 },
  { id: 2, left: "25%", duration: 6, delay: 1.5, size: 3 },
  { id: 3, left: "45%", duration: 5, delay: 3, size: 2 },
  { id: 4, left: "65%", duration: 7, delay: 0.5, size: 3 },
  { id: 5, left: "80%", duration: 4.5, delay: 2, size: 4 },
  { id: 6, left: "90%", duration: 6.5, delay: 3.5, size: 2 },
  { id: 7, left: "35%", duration: 8, delay: 4, size: 2.5 },
];

const Banner = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const buildingVariants = {
    hidden: { opacity: 0, scale: 0.95, x: -30 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const handleSearchSubmit = (searchParams) => {
    // পরবর্তীতে Real Backend API বা Filter Functionality বসানোর জন্য
    console.log("Search parameters received in Banner:", searchParams);
  };

  return (
    <section className="relative w-full min-h-screen lg:h-screen overflow-hidden bg-[#0a0518] transition-colors duration-300 flex flex-col justify-between py-12 lg:py-0">
      {/* 1. Background Atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2a1260] via-[#0f041a] to-[#05010a] z-0">
        {/* Falling Stars Animation */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {fallingStarsData.map((star) => (
            <motion.span
              key={star.id}
              initial={{
                top: "-5%",
                left: star.left,
                opacity: 0,
                scale: 1,
              }}
              animate={{
                top: ["0%", "100%"],
                x: [0, -150],
                opacity: [0, 1, 1, 0],
                scale: [1, 0.8, 0.3],
              }}
              transition={{
                duration: star.duration,
                repeat: Infinity,
                delay: star.delay,
                ease: "linear",
              }}
              style={{
                width: `${star.size}px`,
                height: `${star.size}px`,
              }}
              className="absolute bg-white rounded-full shadow-[0_0_12px_#fff,0_0_20px_#fff]"
            />
          ))}
        </div>

        {/* Moon */}
        <div className="absolute top-22 md:top-10 right-8 sm:top-16 sm:right-16 md:top-20 md:right-28 w-10 h-10 sm:w-16 sm:h-16 rounded-full bg-[#fdf2e9] shadow-[0_0_30px_#fdf2e9,0_0_60px_rgba(253,242,233,0.4)] opacity-80 z-10" />
      </div>

      {/* 2. Main Content Container */}
      <div className="container mx-auto px-4 sm:px-6 h-full flex items-start relative z-20 mt-20 lg:my-auto lg:pt-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full"
        >
          {/* Left Side: Image Showcase */}
          <motion.div
            variants={buildingVariants}
            className="relative hidden lg:block order-last lg:order-first"
          >
            <div className="relative group overflow-hidden rounded-[2rem] h-[calc(100vh-220px)] min-h-[500px] max-h-[720px] shadow-2xl border-2 border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-[#d4af37]/40">
              <Image
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop"
                alt="Probiti Luxury Real Estate"
                width={800}
                height={600}
                priority
                quality={80}
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-85" />

              <div className="absolute bottom-20 left-6 p-5 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 shadow-lg text-white">
                <p className="text-[10px] font-semibold tracking-widest uppercase text-amber-400">
                  New Project
                </p>
                <h3 className="text-xl font-extrabold tracking-tight mt-0.5">
                  Nouveau Elite Villa
                </h3>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Headline & CTA */}
          <div className="space-y-5 sm:space-y-6 lg:pl-6 flex flex-col justify-center text-center lg:text-left h-full">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-sm mx-auto lg:mx-0 max-w-fit"
            >
              <span className="text-amber-300 font-bold text-[10px] sm:text-xs uppercase tracking-widest">
                Find Your Dream Property
              </span>
              <Building className="w-3.5 h-3.5 text-amber-300" />
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.15] sm:leading-[1.1] tracking-tight"
            >
              Discover Luxury <br />
              <span className="bg-gradient-to-r from-[#d4af37] via-[#f59e0b] to-[#d4af37] bg-clip-text text-transparent">
                Beyond Expectations
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base md:text-lg text-zinc-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal px-2 sm:px-0"
            >
              Experience the perfect blend of modern architecture, elegant
              design, and premium comfort. Probiti Real Estate offers exclusive
              properties tailored to your lifestyle.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-center lg:justify-start pt-2"
            >
              <Link href={"/properties"}>
                <button className="w-full sm:w-auto bg-[#3b1a83] hover:bg-[#2e1467] text-white px-7 py-3 rounded-full font-bold text-xs sm:text-sm transition-all duration-300 shadow-xl hover:shadow-2xl active:scale-95 flex items-center justify-center gap-2.5 border border-white/10">
                  <span>Explore Properties</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* 3. Reusable Property Search Component */}
      <PropertySearch onSearch={handleSearchSubmit} />
    </section>
  );
};

export default Banner;
