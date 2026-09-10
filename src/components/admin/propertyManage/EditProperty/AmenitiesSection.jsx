"use client";

import { Check } from "lucide-react";
import {
  Users,
  Flower2,
  ArrowUpSquare,
  Video,
  LogOut,
  Flame,
  Zap,
  ShieldCheck,
  Footprints,
  Cpu,
  CheckCircle2,
} from "lucide-react";
import SectionCard from "./SectionCard";

/* ---------------------------------- */
/* Predefined amenities with icons    */
/* ---------------------------------- */
export const PREDEFINED_AMENITIES = [
  { name: "1 Lift", icon: ArrowUpSquare },
  { name: "1 Stair", icon: Footprints },
  { name: "Generator", icon: Cpu },
  { name: "Community Hall room", icon: Users },
  { name: "Garden", icon: Flower2 },
  { name: "CC Camera", icon: Video },
  { name: "Emergency Exit", icon: LogOut },
  { name: "Fire Protection", icon: Flame },
  { name: "Lightning Protection", icon: Zap },
  { name: "Security Guard", icon: ShieldCheck },
];

/* ---------------------------------- */
/* Single amenity tile                */
/* ---------------------------------- */
const AmenityTile = ({ name, icon: Icon, isSelected, onToggle }) => (
  <button
    type="button"
    onClick={onToggle}
    aria-pressed={isSelected}
    className={`
      group relative flex flex-col items-center justify-center gap-2.5
      p-3 sm:p-4 rounded-2xl border-2 transition-all duration-200
      min-h-[100px] sm:min-h-[115px] select-none
      ${
        isSelected
          ? "border-[#3b1a83] dark:border-violet-500 bg-violet-50/80 dark:bg-violet-950/40 shadow-sm shadow-violet-200/50 dark:shadow-violet-950/40"
          : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50/60 dark:hover:bg-zinc-900/60"
      }
    `}
  >
    {/* Checkmark badge */}
    {isSelected && (
      <span className="absolute top-2 right-2 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#3b1a83] dark:bg-violet-500 flex items-center justify-center shadow-sm">
        <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white stroke-[3]" />
      </span>
    )}

    {/* Icon tile */}
    <span
      className={`
        flex items-center justify-center
        w-9 h-9 sm:w-10 sm:h-10 rounded-xl transition-all duration-200
        ${
          isSelected
            ? "bg-gradient-to-br from-[#4a1f9e] to-[#3b1a83] text-white shadow-md shadow-violet-300/40"
            : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400"
        }
      `}
    >
      <Icon className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.8]" />
    </span>

    {/* Label */}
    <span
      className={`
        text-[10px] sm:text-[11px] leading-tight text-center px-1
        ${
          isSelected
            ? "font-bold text-[#3b1a83] dark:text-violet-200"
            : "font-medium text-zinc-700 dark:text-zinc-300"
        }
      `}
    >
      {name}
    </span>
  </button>
);

/* ---------------------------------- */
/* Amenities Section                  */
/* ---------------------------------- */
const AmenitiesSection = ({ amenities = [], setAmenities }) => {
  const toggleAmenity = (name) => {
    setAmenities((prev) =>
      prev.includes(name) ? prev.filter((a) => a !== name) : [...prev, name],
    );
  };

  const predefinedNames = PREDEFINED_AMENITIES.map((p) => p.name);
  const customAmenities = amenities.filter((a) => !predefinedNames.includes(a));

  return (
    <SectionCard
      number={6}
      title="Amenities & Features"
      description="Select predefined property offerings and security features"
      rightElement={
        <span className="text-[10px] sm:text-[11px] font-semibold text-[#3b1a83] dark:text-violet-300 bg-violet-50 dark:bg-violet-950/50 px-3 py-1 rounded-full whitespace-nowrap">
          {amenities.length} Selected
        </span>
      }
    >
      {/* Predefined amenity grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2.5 sm:gap-3">
        {PREDEFINED_AMENITIES.map(({ name, icon }) => (
          <AmenityTile
            key={name}
            name={name}
            icon={icon}
            isSelected={amenities.includes(name)}
            onToggle={() => toggleAmenity(name)}
          />
        ))}
      </div>

      {/* Custom amenities (removable chips) */}
      {customAmenities.length > 0 && (
        <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800">
          <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2.5">
            Custom Amenities
          </p>
          <div className="flex flex-wrap gap-1.5">
            {customAmenities.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => toggleAmenity(name)}
                className="group inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1.5 rounded-full bg-violet-100 dark:bg-violet-950/50 text-[#3b1a83] dark:text-violet-300 font-semibold hover:bg-violet-200 dark:hover:bg-violet-900/60 transition-colors"
              >
                <CheckCircle2 className="w-3 h-3" />
                {name}
                <span className="text-[13px] leading-none opacity-60 group-hover:opacity-100">
                  ×
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </SectionCard>
  );
};

export default AmenitiesSection;
