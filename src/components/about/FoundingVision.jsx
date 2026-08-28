"use client";
import Image from "next/image";
import { Compass, UserCheck, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function FoundingVision() {
  const points = [
    {
      icon: <Compass className="w-5 h-5 text-amber-400" />,
      title: "ARCHITECTURAL PRECISION",
      description:
        "Our difference is in the details: most developers skip light in a room, strength of a well-built wall, or structural durability.",
    },
    {
      icon: <UserCheck className="w-5 h-5 text-amber-400" />,
      title: "HUMAN-CENTRIC DESIGN",
      description:
        "Our homes are built around daily life. School, market, and hospital stay close, and open space is designed for sharing.",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-amber-400" />,
      title: "FUTURE-PROOF LEGACY",
      description:
        "We pair sound engineering and premium materials to last. Your home stays comfortable and holds value for years.",
    },
  ];

  return (
    <section className="py-20 px-6 sm:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-8">
          <div className="space-y-3">
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-serif text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight"
            >
              Founded on Principles,
              <br />
              Driven by Vision
            </motion.h2>
          </div>

          <div className="space-y-6">
            {points.map((pt, index) => (
              <div key={index} className="flex gap-4 items-start">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 shrink-0 mt-1">
                  {pt.icon}
                </div>
                <div className="space-y-1">
                  <h3 className="text-xs font-bold tracking-wider text-zinc-900 dark:text-white uppercase">
                    {pt.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed max-w-md">
                    {pt.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
          <Image
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200"
            alt="Architectural Blueprint Planning"
            fill
            className="object-cover grayscale contrast-125 hover:scale-105 transition-transform duration-700"
          />
        </div>
      </div>
    </section>
  );
}
