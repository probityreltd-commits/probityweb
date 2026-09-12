import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Bath,
  Bed,
  Calendar,
  Compass,
  MapPin,
  Maximize2,
} from "lucide-react";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80";

const SPECS_ICON_CLASS = "text-brand dark:text-indigo-400 shrink-0";

export const PropertyCard = ({
  property,
  viewMode = "grid",
  alwaysExpanded = false,
}) => {
  const {
    title,
    slug,
    _id,
    description,
    address,
    locationName,
    bedrooms,
    bathrooms,
    flatSize,
    handoverDate,
    orientation,
    propertyType,
    status,
    coverImage,
    images,
  } = property;

  const displayImage = coverImage || images?.[0] || FALLBACK_IMAGE;
  const propertySlug = slug || _id;
  const fullLocation = [address, locationName].filter(Boolean).join(", ");

  const formattedHandover = handoverDate
    ? new Date(handoverDate).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : null;

  const specs = [
    {
      icon: Bed,
      label: bedrooms !== undefined ? `${bedrooms} Bed` : "N/A",
      listLabel: bedrooms !== undefined ? `${bedrooms} Beds` : "N/A",
    },
    {
      icon: Bath,
      label: bathrooms !== undefined ? `${bathrooms} Bath` : "N/A",
      listLabel: bathrooms !== undefined ? `${bathrooms} Baths` : "N/A",
    },
    { icon: Maximize2, label: flatSize || "N/A", listLabel: flatSize || "N/A" },
    {
      icon: Compass,
      label: orientation || "N/A",
      listLabel: orientation || "N/A",
    },
  ];

  if (viewMode === "list") {
    return (
      <Link href={`/properties/${propertySlug}`} className="block h-full">
        <article className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col md:flex-row h-full md:h-64">
          {/* Cover Image */}
          <div className="relative md:w-80 h-44 sm:h-56 md:h-full shrink-0 overflow-hidden">
            <Image
              src={displayImage}
              alt={title || "Property"}
              fill
              sizes="(max-width: 768px) 100vw, 320px"
              className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />

            {status && (
              <span className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-brand text-white text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full shadow-lg z-10">
                {status}
              </span>
            )}

            {propertyType && (
              <span className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md text-zinc-800 dark:text-zinc-100 text-[9px] sm:text-[10px] font-bold px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full shadow-sm z-10">
                {propertyType}
              </span>
            )}
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between overflow-hidden">
            <div>
              {fullLocation && (
                <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 mb-1.5">
                  <MapPin className={`w-3.5 h-3.5 ${SPECS_ICON_CLASS}`} />
                  <span className="truncate">{fullLocation}</span>
                </div>
              )}

              <h3 className="font-serif text-base sm:text-xl font-bold text-zinc-900 dark:text-white mb-1.5 sm:mb-2 group-hover:text-brand dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
                {title}
              </h3>

              <p className="text-[11px] sm:text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-2.5 sm:mb-3 leading-relaxed min-h-[2.2rem] sm:min-h-[2.5rem]">
                {description || ""}
              </p>
            </div>

            <div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 py-2 sm:py-2.5 border-y border-zinc-100 dark:border-zinc-800/80 my-1.5 sm:my-2 text-[11px] sm:text-xs">
                {specs.map(({ icon: Icon, listLabel }, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-1.5 sm:gap-2 text-zinc-600 dark:text-zinc-300"
                  >
                    <Icon
                      className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${SPECS_ICON_CLASS}`}
                    />
                    <span className="truncate">{listLabel}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400">
                  {formattedHandover && (
                    <>
                      <Calendar className={`w-3.5 h-3.5 ${SPECS_ICON_CLASS}`} />
                      <span>Handover: {formattedHandover}</span>
                    </>
                  )}
                </div>
                <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-brand dark:text-indigo-400">
                  View Details
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  // GRID VIEW — mobile compact, sm+ full detail

  return (
    <Link href={`/properties/${propertySlug}`} className="block h-full">
      <article
        className={`bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col h-full ${
          alwaysExpanded ? "rounded-3xl" : "rounded-xl sm:rounded-3xl"
        }`}
      >
        {/* Cover Image */}
        <div
          className={`relative w-full overflow-hidden shrink-0 ${
            alwaysExpanded ? "h-52" : "h-28 sm:h-52"
          }`}
        >
          <Image
            src={displayImage}
            alt={title || "Property"}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {status && (
            <span
              className={`absolute bg-brand text-white font-extrabold uppercase tracking-wider rounded-full shadow-lg z-10 ${
                alwaysExpanded
                  ? "top-4 left-4 text-[10px] px-3 py-1.5"
                  : "top-1.5 left-1.5 sm:top-4 sm:left-4 text-[8px] sm:text-[10px] px-1.5 py-0.5 sm:px-3 sm:py-1.5"
              }`}
            >
              {status}
            </span>
          )}

          {propertyType && (
            <span
              className={`absolute bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md text-zinc-800 dark:text-zinc-100 font-bold rounded-full shadow-sm z-10 ${
                alwaysExpanded
                  ? "top-4 right-4 text-[10px] px-3 py-1.5"
                  : "top-1.5 right-1.5 sm:top-4 sm:right-4 text-[8px] sm:text-[10px] px-1.5 py-0.5 sm:px-3 sm:py-1.5"
              }`}
            >
              {propertyType}
            </span>
          )}

          {fullLocation && (
            <div
              className={`absolute flex items-center text-white/90 font-medium drop-shadow-sm ${
                alwaysExpanded
                  ? "bottom-3 left-4 right-4 gap-1.5 text-xs"
                  : "bottom-1.5 left-2 right-2 sm:bottom-3 sm:left-4 sm:right-4 gap-1 sm:gap-1.5 text-[9px] sm:text-xs"
              }`}
            >
              <MapPin
                className={
                  alwaysExpanded
                    ? "w-3.5 h-3.5 text-indigo-300 shrink-0"
                    : "w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-indigo-300 shrink-0"
                }
              />
              <span className="truncate">{fullLocation}</span>
            </div>
          )}
        </div>

        {/* Details */}
        <div
          className={
            alwaysExpanded
              ? "p-5 flex-1 flex flex-col justify-between"
              : "p-2.5 sm:p-5 flex-1 flex flex-col justify-between"
          }
        >
          <div>
            <h3
              className={`font-serif font-bold text-zinc-900 dark:text-white group-hover:text-brand dark:group-hover:text-indigo-400 transition-colors line-clamp-1 ${
                alwaysExpanded
                  ? "text-lg mb-2"
                  : "text-xs sm:text-lg mb-1 sm:mb-2"
              }`}
            >
              {title}
            </h3>

            <p
              className={`text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed min-h-[2.5rem] ${
                alwaysExpanded
                  ? "block text-xs mb-4"
                  : "hidden sm:block text-xs mb-4"
              }`}
            >
              {description || ""}
            </p>
          </div>

          <div>
            {/* Specs */}
            <div
              className={`grid grid-cols-2 border-y border-zinc-100 dark:border-zinc-800/80 ${
                alwaysExpanded
                  ? "gap-2.5 py-3 mb-4 text-xs"
                  : "gap-1.5 sm:gap-2.5 py-1.5 sm:py-3 mb-1.5 sm:mb-4 text-[10px] sm:text-xs"
              }`}
            >
              {specs.map(({ icon: Icon, label }, idx) => (
                <div
                  key={idx}
                  className={`flex items-center text-zinc-600 dark:text-zinc-300 ${
                    alwaysExpanded
                      ? "gap-2"
                      : `gap-1 sm:gap-2 ${idx >= 2 ? "hidden sm:flex" : ""}`
                  }`}
                >
                  <Icon
                    className={
                      alwaysExpanded
                        ? "w-3.5 h-3.5 text-brand dark:text-indigo-400 shrink-0"
                        : "w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand dark:text-indigo-400 shrink-0"
                    }
                  />
                  <span className="truncate">
                    {alwaysExpanded
                      ? label.replace("Bed", "Beds").replace("Bath", "Baths")
                      : label}
                  </span>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between text-xs pt-0.5 sm:pt-1">
              <div
                className={`items-center gap-1.5 text-zinc-500 dark:text-zinc-400 ${alwaysExpanded ? "flex" : "hidden sm:flex"}`}
              >
                {formattedHandover && (
                  <>
                    <Calendar className="w-3.5 h-3.5 text-brand dark:text-indigo-400" />
                    <span>{formattedHandover}</span>
                  </>
                )}
              </div>

              <span
                className={`inline-flex items-center font-bold text-brand dark:text-indigo-400 ml-auto ${
                  alwaysExpanded
                    ? "gap-1.5 text-xs"
                    : "gap-1 sm:gap-1.5 text-[10px] sm:text-xs"
                }`}
              >
                <span
                  className={alwaysExpanded ? "inline" : "hidden sm:inline"}
                >
                  View Details
                </span>
                <ArrowUpRight
                  className={
                    alwaysExpanded ? "w-4 h-4" : "w-3.5 h-3.5 sm:w-4 sm:h-4"
                  }
                />
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};
