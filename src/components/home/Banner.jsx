"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  Building,
  DollarSign,
  ArrowRight,
  Play,
  Home,
  Landmark,
  Target,
} from "lucide-react";

// 1. Array of random properties for falling stars
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
  const [activeTab, setActiveTab] = useState("buy");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const buildingVariants = {
    hidden: { opacity: 0, scale: 0.95, x: -50 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const searchTabs = [
    { id: "buy", name: "Buy", icon: Home },
    { id: "rent", name: "Rent", icon: Landmark },
    { id: "commercial", name: "Commercial", icon: Target },
  ];

  const searchFields = [
    { name: "Location", icon: MapPin, placeholder: "Enter City or Zip" },
    { name: "Property Type", icon: Building, placeholder: "Apartment / Villa" },
    { name: "Price Range", icon: DollarSign, placeholder: "$350k - $550k" },
  ];

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#0a0518] transition-colors duration-300">
      {/* 1. Luxurious Nighttime Vibe Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2a1260] via-[#0f041a] to-[#05010a] z-0">
        {/* Subtle Falling Stars built with Pure Framer Motion (Guaranteed Visibility) */}
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
                x: [0, -250], // Moves diagonally to create shooting star effect
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

        {/* Minimalist Glowing Moon */}
        <div className="absolute top-16 right-16 md:top-20 md:right-28 w-16 h-16 rounded-full bg-[#fdf2e9] shadow-[0_0_40px_#fdf2e9,0_0_80px_rgba(253,242,233,0.5)] opacity-80 z-10" />
      </div>

      {/* 2. Main Content Container */}
      <div className="container mx-auto px-6 h-full flex items-center relative z-20 pt-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full"
        >
          {/* --- Left Side: Building Animation & Image --- */}
          <motion.div
            variants={buildingVariants}
            className="relative hidden lg:block order-last lg:order-first"
          >
            <div className="relative group overflow-hidden rounded-[2rem] shadow-2xl border-2 border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-[#d4af37]/40">
              <img
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop"
                alt="Probiti Luxury Real Estate"
                className="w-full h-auto aspect-[4/5] object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-85" />

              <div className="absolute bottom-55 left-8 p-6 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 shadow-lg text-white">
                <p className="text-xs font-semibold tracking-widest uppercase text-amber-400">
                  New Project
                </p>
                <h3 className="text-2xl font-extrabold tracking-tight mt-1">
                  Nouveau Elite Villa
                </h3>
              </div>
            </div>
          </motion.div>

          {/* --- Right Side: Text & CTA Option --- */}
          <div className="space-y-8 lg:pl-8 flex flex-col justify-center text-center lg:text-left h-full">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-sm mx-auto lg:mx-0 max-w-fit"
            >
              <span className="text-amber-300 font-bold text-xs uppercase tracking-widest">
                Find Your Dream Property
              </span>
              <Building className="w-3.5 h-3.5 text-amber-300" />
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight"
            >
              Discover Luxury <br />
              <span className="bg-gradient-to-r from-[#d4af37] to-[#f59e0b] bg-clip-text text-transparent">
                Beyond Expectations
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-base md:text-lg text-zinc-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal"
            >
              Experience the perfect blend of modern architecture, elegant
              design, and premium comfort. Probiti Real Estate offers exclusive
              properties tailored to your sophisticated lifestyle.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex items-center gap-6 justify-center lg:justify-start"
            >
              <button className="bg-[#3b1a83] hover:bg-[#2e1467] text-white px-8 py-3.5 rounded-full font-bold text-sm transition-all duration-300 shadow-xl hover:shadow-2xl active:scale-95 flex items-center gap-3 group border border-white/10">
                <span>Explore Properties</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              {/* <button className="flex items-center gap-3 group px-4 py-3 rounded-full hover:bg-white/5 transition-colors">
                <div className="w-10 h-10 rounded-full bg-white/10 text-amber-300 flex items-center justify-center border border-white/20 group-hover:border-amber-400 shadow-md">
                  <Play className="w-4 h-4 fill-amber-300" />
                </div>
                <span className="text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors">
                  Watch Video
                </span>
              </button> */}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* 3. Advanced Property Search Option */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-7xl px-6 z-30"
      >
        <div className="bg-zinc-950/80 rounded-[2rem] shadow-2xl border border-white/10 backdrop-blur-xl transition-colors duration-300">
          <div className="flex items-center gap-4 px-6 pt-5 pb-2 border-b border-white/10">
            {searchTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-6 py-2 rounded-full flex items-center gap-2.5 text-xs sm:text-sm font-bold transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-[#3b1a83] text-white shadow-lg"
                    : "text-zinc-400 hover:bg-white/5"
                }`}
              >
                <tab.icon
                  className={`w-4 h-4 ${
                    activeTab === tab.id ? "text-white" : "text-amber-400"
                  }`}
                />
                <span>{tab.name}</span>
              </button>
            ))}
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 items-center">
            {searchFields.map((field) => (
              <div key={field.name} className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-widest font-bold text-zinc-400 flex items-center gap-1.5">
                  <field.icon className="w-3.5 h-3.5 text-amber-400" />
                  {field.name}
                </label>
                <input
                  type="text"
                  placeholder={field.placeholder}
                  className="w-full bg-white/5 px-4 py-2.5 rounded-xl border border-white/10 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#3b1a83] transition-all"
                />
              </div>
            ))}

            <div className="xl:pt-5">
              <button className="w-full bg-[#3b1a83] hover:bg-[#2e1467] text-white px-6 py-3 rounded-xl font-extrabold text-sm transition-all duration-300 shadow-xl hover:shadow-2xl active:scale-95 flex items-center justify-center gap-2 group border border-white/10">
                <Search className="w-4 h-4 transition-transform group-hover:scale-110" />
                <span>Search Properties</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Banner;
