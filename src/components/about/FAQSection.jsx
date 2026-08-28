"use client";

import { useState } from "react";
import { Plus, Minus, ArrowUpRight, Bed, Maximize2 } from "lucide-react";

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: "Property Size & Dimensions",
      a: "Homes range from 1,720 sft to 2,400 sft, in 3 and 4-bedroom layouts, with family living and multiple verandas.",
      specs: [
        {
          icon: <Bed className="w-3.5 h-3.5 text-amber-500" />,
          value: "3 to 4",
          label: "Bedrooms",
        },
        {
          icon: <Maximize2 className="w-3.5 h-3.5 text-amber-500" />,
          value: "1,720 sft",
          label: "Smallest",
        },
        {
          icon: <Maximize2 className="w-3.5 h-3.5 text-amber-500" />,
          value: "2,400 sft",
          label: "Largest",
        },
      ],
    },
    {
      q: "Mortgage Options & Financial Guidance",
      a: "We collaborate with leading financial institutions to offer hassle-free home loan options and flexible payment schedules.",
    },
    {
      q: "Number of Bedrooms Available",
      a: "Our typical floor plans offer 3 to 4 spacious bedrooms tailored for modern families.",
    },
    {
      q: "Bathroom Facilities & Amenities",
      a: "En-suite bathrooms with modern sanitary fixtures, hot/cold water provision, and high-quality ceramic tiles.",
    },
    {
      q: "Parking Space Availability",
      a: "Dedicated basement parking is allocated per unit with EV charging options and visitor parking space.",
    },
    {
      q: "Community & Surrounding Area Insights",
      a: "Located in prime locations with close proximity to top schools, markets, hospitals, and parks.",
    },
  ];

  return (
    <section className="relative bg-[#020817] text-white py-24 px-6 sm:px-12 md:px-16 overflow-hidden">
      <div className="absolute bottom-0 left-0 w-80 h-48 opacity-10 pointer-events-none select-none">
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-full h-full text-blue-400"
        >
          <path d="M19,15V3H13V5H11V3H5V15H3V21H21V15H19M7,19H5V17H7V19M7,15H5V13H7V15M7,11H5V9H7V11M7,7H5V5H7V7M11,19H9V17H11V19M11,15H9V13H11V15M11,11H9V9H11V11M11,7H9V7H11M17,19H13V17H17V19M17,15H13V13H17V15M17,11H13V9H17V11Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
        {/* Left Column: Heading & CTA Button */}
        <div className="lg:col-span-5 space-y-6">
          <span className="text-[11px] font-bold tracking-widest text-amber-500 uppercase">
            FAQ
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold tracking-tight leading-tight">
            Questions we hear <br className="hidden sm:block" />
            every day
          </h2>

          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
            Our friendly team is always here to help you with quick, clear and
            reliable answers whenever needed.
          </p>

          <div className="pt-2">
            <button className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-all shadow-lg shadow-blue-600/20">
              <span>Schedule a priority visit</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Accordion List */}
        <div className="lg:col-span-7 space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIdx === i;

            return (
              <div
                key={i}
                className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-[#0b1528] border-slate-700/80 shadow-xl"
                    : "bg-[#060e1e]/60 border-slate-800/80 hover:border-slate-700"
                }`}
              >
                {/* Accordion Trigger Header */}
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="w-full p-5 text-left flex justify-between items-center text-sm font-semibold text-slate-100 transition-colors"
                >
                  <span>{faq.q}</span>
                  <div className="p-1 rounded-full bg-slate-800/80 text-slate-300">
                    {isOpen ? (
                      <Minus className="w-3.5 h-3.5" />
                    ) : (
                      <Plus className="w-3.5 h-3.5" />
                    )}
                  </div>
                </button>

                {/* Accordion Content */}
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 space-y-4 text-xs text-slate-400 leading-relaxed border-t border-slate-800/40">
                    <p>{faq.a}</p>

                    {/* Spec Pill Card (Rendered if available) */}
                    {faq.specs && (
                      <div className="inline-flex flex-wrap items-center gap-4 p-3 bg-white text-slate-900 rounded-lg shadow-md mt-2">
                        {faq.specs.map((spec, sIdx) => (
                          <div
                            key={sIdx}
                            className={`flex items-center gap-2 ${
                              sIdx !== faq.specs.length - 1
                                ? "pr-4 border-r border-slate-200"
                                : ""
                            }`}
                          >
                            {spec.icon}
                            <div>
                              <p className="text-xs font-bold leading-none">
                                {spec.value}
                              </p>
                              <p className="text-[10px] text-slate-500 font-medium mt-0.5">
                                {spec.label}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
