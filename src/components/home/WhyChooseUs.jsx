"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck, UserCheck, Tag, MapPin, Handshake } from "lucide-react";

const features = [
  {
    id: 1,
    title: "Verified Property Listings",
    description:
      "Browse carefully verified properties with accurate information, high-quality photos, and transparent pricing.",
    icon: ShieldCheck,
    iconBg:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/30",
  },
  {
    id: 2,
    title: "Expert Real Estate Advisors",
    description:
      "Our experienced agents provide personalized guidance to help you make confident property decisions.",
    icon: UserCheck,
    iconBg:
      "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-100 dark:border-amber-800/30",
  },
  {
    id: 3,
    title: "Transparent Pricing",
    description:
      "No hidden fees or unexpected costs. We believe in honest pricing and complete transparency.",
    icon: Tag,
    iconBg:
      "bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400 border border-orange-100 dark:border-orange-800/30",
  },
  {
    id: 4,
    title: "Prime Locations",
    description:
      "Explore homes and commercial spaces in carefully selected neighborhoods with excellent connectivity and amenities.",
    icon: MapPin,
    iconBg:
      "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 border border-blue-100 dark:border-blue-800/30",
  },
  {
    id: 5,
    isImage: true,
    imageSrc:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=800&auto=format&fit=crop",
    alt: "Beautiful Neighborhood Street",
  },
  {
    id: 6,
    title: "End-to-End Support",
    description:
      "From property search to final handover, our dedicated team is with you every step of the way.",
    icon: Handshake,
    iconBg:
      "bg-purple-50 text-brand dark:bg-purple-950/40 dark:text-purple-400 border border-purple-100 dark:border-purple-800/30",
  },
];

const WhyChooseUs = () => {
  return (
    <section className=" py-10 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 transition-colors duration-300 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 lg:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-brand dark:text-indigo-400 block mb-1.5 sm:mb-2"
          >
            WHY CHOOSE US
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight"
          >
            Why Choose Our Properties
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-3 sm:mt-4 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed"
          >
            We&apos;re committed to making your real estate journey simple,
            transparent, and stress-free. Whether you&apos;re buying, selling,
            or renting, our experienced team provides trusted guidance, verified
            listings, and personalized support every step of the way.
          </motion.p>
        </div>

        {/* 3x2 Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-stretch">
          {features.map((item, index) => {
            if (item.isImage) {
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    delay: index * 0.08,
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative min-h-[160px] sm:min-h-[220px] lg:min-h-[280px] h-full rounded-xl sm:rounded-2xl overflow-hidden shadow-sm group border border-zinc-200/80 dark:border-zinc-800"
                >
                  <Image
                    src={item.imageSrc}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand/40 via-transparent to-transparent z-10 pointer-events-none" />
                </motion.div>
              );
            }

            const IconComponent = item.icon;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="bg-white/90 dark:bg-zinc-900/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-7 lg:p-8 text-center flex flex-col items-center justify-center border border-zinc-200/70 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:border-brand/30 dark:hover:border-indigo-500/30 hover:-translate-y-1 transition-all duration-300 group"
              >
                {/* Icon Badge */}
                <div
                  className={`w-11 h-11 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 lg:mb-6 transition-transform duration-300 group-hover:scale-110 shadow-sm ${item.iconBg}`}
                >
                  <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
                </div>

                {/* Feature Title */}
                <h3 className="font-serif text-sm sm:text-base lg:text-lg font-bold text-zinc-900 dark:text-white mb-2 sm:mb-3 group-hover:text-brand dark:group-hover:text-indigo-400 transition-colors">
                  {item.title}
                </h3>

                {/* Feature Description */}
                <p className="text-[11px] sm:text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xs">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
