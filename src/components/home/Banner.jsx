"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Building, ArrowRight } from "lucide-react";
import Link from "next/link";
import PropertySearch from "@/components/shared/PropertySearch";

const fallingStarsData = [
  { id: 1, left: "10%", duration: 4, delay: 0, size: 2 },
  { id: 2, left: "25%", duration: 6, delay: 1.5, size: 3 },
  { id: 3, left: "45%", duration: 5, delay: 3, size: 2 },
  { id: 4, left: "65%", duration: 7, delay: 0.5, size: 3 },
  { id: 5, left: "80%", duration: 4.5, delay: 2, size: 4 },
  { id: 6, left: "90%", duration: 6.5, delay: 3.5, size: 2 },
  { id: 7, left: "35%", duration: 8, delay: 4, size: 2.5 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const buildingVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    x: -30,
  },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const Banner = () => {
  return (
    <section
      className="
        relative
        w-full
        min-h-[100svh]
        lg:h-screen
        overflow-hidden
        bg-night
        flex
        flex-col
      "
    >
      {/* Background Atmosphere */}
      <div className="absolute inset-0 bg-hero-gradient z-0">
        {/* Falling Stars */}
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
              className="
                absolute
                bg-white
                rounded-full
                shadow-[0_0_12px_#fff,0_0_20px_#fff]
              "
            />
          ))}
        </div>

        {/* Moon Glow */}
        <div
          className="
            absolute
            top-20
            right-5
            sm:top-28
            sm:right-10
            md:top-32
            md:right-20
            lg:top-20
            lg:right-20
            w-8
            h-8
            sm:w-12
            sm:h-12
            md:w-16
            md:h-16
            rounded-full
            moon-glow
            opacity-80
            z-10
          "
        />
      </div>

      {/* Main Content */}
      <div
        className="
          relative
    z-20
    flex
    flex-none
    lg:flex-1
    lg:items-center
    container
    mx-auto
    w-full
    px-4
    sm:px-6
    lg:px-8
    pt-[135px]
    pb-6
    sm:pt-36
    sm:pb-8
    lg:pt-0
    lg:pb-20
        "
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-8
            lg:gap-12
            items-center
            w-full
          "
        >
          {/* Left: Image Showcase - Desktop */}
          <motion.div
            variants={buildingVariants}
            className="
              relative
              hidden
              lg:block
              order-last
              lg:order-first
            "
          >
            <div
              className="
                relative
                group
                overflow-hidden
                rounded-[2rem]
                h-[calc(100vh-220px)]
                min-h-[500px]
                max-h-[720px]
                shadow-2xl
                border-2
                border-white/10
                bg-white/5
                backdrop-blur-sm
                transition-all
                duration-300
                hover:border-luxe-gold/40
              "
            >
              <Image
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop"
                alt="Probiti Luxury Real Estate"
                width={800}
                height={600}
                priority
                quality={80}
                className="
                  w-full
                  h-full
                  object-cover
                  transition-transform
                  duration-1000
                  ease-out
                  group-hover:scale-105
                "
              />

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-zinc-950
                  via-transparent
                  to-transparent
                  opacity-70
                  transition-opacity
                  duration-500
                  group-hover:opacity-85
                "
              />

              <div
                className="
                  absolute
                  bottom-20
                  left-6
                  p-5
                  rounded-2xl
                  bg-black/40
                  backdrop-blur-md
                  border
                  border-white/10
                  shadow-lg
                  text-white
                "
              >
                <p className="text-[10px] font-semibold tracking-widest uppercase text-amber-400">
                  New Project
                </p>

                <h3 className="font-serif text-xl font-extrabold tracking-tight mt-0.5">
                  Nouveau Elite Villa
                </h3>
              </div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <div
            className="
              flex
              flex-col
              justify-center
              text-center
              lg:text-left
              space-y-3
              sm:space-y-5
              lg:space-y-6
              lg:pl-6
              max-w-2xl
              mx-auto
              lg:mx-0
            "
          >
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="
                inline-flex
                items-center
                gap-2
                px-3
                py-1.5
                sm:px-4
                sm:py-2
                rounded-full
                bg-white/10
                border
                border-white/20
                backdrop-blur-md
                shadow-sm
                mx-auto
                lg:mx-0
                max-w-fit
              "
            >
              <span
                className="
                  text-amber-300
                  font-bold
                  text-[8px]
                  sm:text-xs
                  uppercase
                  tracking-[0.18em]
                "
              >
                Find Your Dream Property
              </span>

              <Building className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-300" />
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={itemVariants}
              className="
                font-serif
                text-[2.1rem]
                leading-[1.08]
                sm:text-4xl
                md:text-6xl
                lg:text-7xl
                font-extrabold
                text-white
                tracking-tight
              "
            >
              Discover Luxury
              <br />
              <span className="text-gradient-gold">Beyond Expectations</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="
                text-[12px]
                leading-6
                sm:text-base
                sm:leading-relaxed
                md:text-lg
                text-zinc-300
                max-w-md
                sm:max-w-xl
                mx-auto
                lg:mx-0
              "
            >
              Experience the perfect blend of modern architecture, elegant
              design, and premium comfort. Probiti Real Estate offers exclusive
              properties tailored to your lifestyle.
            </motion.p>

            {/* CTA */}
            <motion.div
              variants={itemVariants}
              className="
                flex
                items-center
                justify-center
                lg:justify-start
                pt-1
                sm:pt-2
              "
            >
              <Link
                href="/properties"
                className="
                  w-full
                  max-w-[240px]
                  sm:w-auto
                  sm:max-w-none
                "
              >
                <button
                  className="
                    group
                    w-full
                    sm:w-auto
                    bg-brand
                    hover:bg-brand-dark
                    text-white
                    px-6
                    py-3
                    sm:px-7
                    sm:py-3.5
                    rounded-full
                    font-bold
                    text-xs
                    sm:text-sm
                    transition-all
                    duration-300
                    shadow-xl
                    hover:shadow-2xl
                    active:scale-95
                    flex
                    items-center
                    justify-center
                    gap-2.5
                    border
                    border-white/10
                  "
                >
                  <span>Explore Properties</span>

                  <ArrowRight
                    className="
                      w-4
                      h-4
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  />
                </button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Property Search */}
      <div
        className="
          relative
          z-30
          w-full
          px-4
          sm:px-6
          lg:px-8
          pb-5
          sm:pb-8
          lg:pb-10
        "
      >
        <PropertySearch />
      </div>
    </section>
  );
};

export default Banner;
