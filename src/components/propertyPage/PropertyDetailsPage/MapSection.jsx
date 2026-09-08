"use client";

import { useEffect, useState } from "react";
import { MapPin, Navigation, ExternalLink } from "lucide-react";

const MapSection = ({ embedString, locationName, address }) => {
  const [src, setSrc] = useState("");

  useEffect(() => {
    if (!embedString) return;

    // 1) Direct URL
    if (
      embedString.startsWith("http://") ||
      embedString.startsWith("https://")
    ) {
      setSrc(embedString);
      return;
    }

    // 2) DOMParser extraction
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(embedString, "text/html");
      const iframe = doc.querySelector("iframe");
      if (iframe && iframe.src) {
        setSrc(iframe.src);
        return;
      }
    } catch (e) {
      console.warn("DOMParser failed:", e);
    }

    // 3) Regex fallback
    const match = embedString.match(/src=["']([^"']+)["']/);
    if (match?.[1]) {
      setSrc(match[1]);
      return;
    }

    // 4) Any URL fallback
    const urlMatch = embedString.match(/(https?:\/\/[^\s"']+)/);
    if (urlMatch?.[1]) {
      setSrc(urlMatch[1]);
      return;
    }
  }, [embedString]);

  return (
    <section className="relative w-full my-12 overflow-hidden rounded-3xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-900 shadow-xl">
      {/* Header Info Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-white dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-800 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#431780]/10 dark:bg-purple-900/30 text-[#431780] dark:text-purple-300 flex items-center justify-center shrink-0">
            <MapPin className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight">
              Location & Neighborhood
            </h3>
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              {address ||
                locationName ||
                "Explore the surroundings & nearby points"}
            </p>
          </div>
        </div>
      </div>

      {/* Map Display Frame */}
      <div className="relative w-full h-[350px] sm:h-[450px] bg-zinc-100 dark:bg-zinc-950">
        {src ? (
          <iframe
            src={src}
            className="w-full h-full grayscale-[0.2] contrast-[1.05] hover:grayscale-0 transition-all duration-500"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title="Property Location Map"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-zinc-400">
            <MapPin className="w-8 h-8 stroke-[1.5] animate-bounce text-zinc-400" />
            <p className="text-sm font-semibold">
              Location map is currently unavailable
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default MapSection;
