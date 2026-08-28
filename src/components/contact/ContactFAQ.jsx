"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function ContactFAQ() {
  const [openIdx, setOpenIdx] = useState(null);

  const faqs = [
    {
      q: "How do I schedule a property visit?",
      a: "You can schedule a visit by filling out our online form or calling our customer desk directly.",
    },
    {
      q: "What types of properties do you offer?",
      a: "We offer luxury residential apartments, commercial corporate spaces, and land development opportunities.",
    },
    {
      q: "How can I request detailed floor plans?",
      a: "Floor plans are available upon request through our inquiry form or by contacting our sales agents.",
    },
    {
      q: "Who do I contact for sales inquiries?",
      a: "Our sales team can be reached via phone at +880 1700-000000 or email at sales@probity.com.",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Quick answers to common questions about contacting us and viewing
          properties.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;

          return (
            <div
              key={idx}
              className="bg-white border border-slate-200/80 rounded-xl overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-4 text-left flex justify-between items-center text-xs font-semibold text-slate-800 hover:text-purple-700 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-purple-600" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-4 pb-4 pt-0 text-xs text-slate-500 leading-relaxed border-t border-slate-100 mt-1 pt-2">
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
