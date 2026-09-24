"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function ContactFAQ() {
  const [openIdx, setOpenIdx] = useState(null);

  const faqs = [
    {
      q: "How do I schedule a property visit?",
      a: "Call us at +880 1711-675001 or fill in the inquiry form. Tell us the project name and your preferred time. We will arrange a free site visit.",
    },
    {
      q: "What types of properties do you offer?",
      a: "We offer residential apartments and commercial spaces in different areas of Bogura. Some projects are ready to move, some are under construction and some are upcoming.",
    },
    {
      q: "How can I request detailed floor plans?",
      a: "Send us a message with the project name, or call our office. Our team will share the floor plan and other details with you.",
    },
    {
      q: "Who do I contact for sales inquiries?",
      a: "Call +880 1711-675001 or +880 1711-675002, or email probityreltd@gmail.com. Our sales team will help you.",
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="text-[11px] sm:text-sm text-slate-500 mt-1">
          Quick answers to common questions about contacting us and viewing
          properties.
        </p>
      </div>

      <div className="space-y-2.5 sm:space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;

          return (
            <div
              key={idx}
              className="bg-white border border-slate-200/80 rounded-lg sm:rounded-xl overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-3.5 sm:p-4 text-left flex justify-between items-center gap-3 text-[11px] sm:text-sm font-semibold text-slate-800 hover:text-brand transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-brand" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-3.5 sm:px-4 pb-3.5 sm:pb-4 pt-2 text-[11px] sm:text-sm text-slate-500 leading-relaxed border-t border-slate-100">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
