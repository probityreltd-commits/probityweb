import {
  ArrowUpRight,
  Bath,
  Bed,
  Calendar,
  Compass,
  MapPin,
  Maximize2,
} from "lucide-react";

export const PropertyCard = ({ property, viewMode = "grid" }) => {
  const {
    _id,
    title,
    slug,
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

  // Fallback image selection
  const displayImage =
    coverImage ||
    images?.[0] ||
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80";

  // Format handover date if present
  const formattedHandover = handoverDate
    ? new Date(handoverDate).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : null;

  // Combined location string
  const fullLocation = [address, locationName].filter(Boolean).join(", ");

  if (viewMode === "list") {
    return (
      <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md rounded-3xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col md:flex-row">
        {/* Cover Image Container */}
        <div className="relative md:w-80 h-64 md:h-auto shrink-0 overflow-hidden">
          <img
            src={displayImage}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />

          {/* Status Tag */}
          {status && (
            <span className="absolute top-4 left-4 bg-[#3b1a83] text-white text-[10px] font-extrabold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg">
              {status}
            </span>
          )}

          {/* Property Type */}
          {propertyType && (
            <span className="absolute top-4 right-4 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md text-zinc-800 dark:text-zinc-100 text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm">
              {propertyType}
            </span>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div>
            {fullLocation && (
              <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 mb-2">
                <MapPin className="w-3.5 h-3.5 text-[#3b1a83] dark:text-indigo-400 shrink-0" />
                <span className="truncate">{fullLocation}</span>
              </div>
            )}

            <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-[#3b1a83] dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
              {title}
            </h3>

            {description && (
              <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-4 leading-relaxed">
                {description}
              </p>
            )}
          </div>

          <div>
            {/* Key Features */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-y border-zinc-100 dark:border-zinc-800/80 my-3 text-xs">
              {bedrooms !== undefined && (
                <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300">
                  <Bed className="w-4 h-4 text-[#3b1a83] dark:text-indigo-400" />
                  <span>{bedrooms} Beds</span>
                </div>
              )}
              {bathrooms !== undefined && (
                <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300">
                  <Bath className="w-4 h-4 text-[#3b1a83] dark:text-indigo-400" />
                  <span>{bathrooms} Baths</span>
                </div>
              )}
              {flatSize && (
                <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300">
                  <Maximize2 className="w-4 h-4 text-[#3b1a83] dark:text-indigo-400" />
                  <span>{flatSize}</span>
                </div>
              )}
              {orientation && (
                <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300">
                  <Compass className="w-4 h-4 text-[#3b1a83] dark:text-indigo-400" />
                  <span className="truncate">{orientation}</span>
                </div>
              )}
            </div>

            {/* Footer Row */}
            <div className="flex items-center justify-between pt-1">
              {formattedHandover ? (
                <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                  <Calendar className="w-3.5 h-3.5 text-[#3b1a83] dark:text-indigo-400" />
                  <span>Handover: {formattedHandover}</span>
                </div>
              ) : (
                <div />
              )}
              <a
                href={`/properties/${slug || _id}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3b1a83] dark:text-indigo-400 hover:text-[#28115c] dark:hover:text-indigo-300 transition-colors ml-auto"
              >
                View Details
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid View Layout
  return (
    <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md rounded-3xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col h-full">
      {/* Cover Image Banner */}
      <div className="relative h-56 w-full overflow-hidden shrink-0">
        <img
          src={displayImage}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Status Tag */}
        {status && (
          <span className="absolute top-4 left-4 bg-[#3b1a83] text-white text-[10px] font-extrabold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg">
            {status}
          </span>
        )}

        {/* Property Type Tag */}
        {propertyType && (
          <span className="absolute top-4 right-4 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md text-zinc-800 dark:text-zinc-100 text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm">
            {propertyType}
          </span>
        )}

        {/* Location Banner Overlay */}
        {fullLocation && (
          <div className="absolute bottom-3 left-4 right-4 flex items-center gap-1.5 text-xs text-white/90 font-medium drop-shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-indigo-300 shrink-0" />
            <span className="truncate">{fullLocation}</span>
          </div>
        )}
      </div>

      {/* Card Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-[#3b1a83] dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
            {title}
          </h3>

          {description && (
            <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-4 leading-relaxed">
              {description}
            </p>
          )}
        </div>

        <div>
          {/* Specifications Grid */}
          <div className="grid grid-cols-2 gap-2.5 py-3 border-y border-zinc-100 dark:border-zinc-800/80 mb-4 text-xs">
            {bedrooms !== undefined && (
              <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300">
                <Bed className="w-3.5 h-3.5 text-[#3b1a83] dark:text-indigo-400" />
                <span>{bedrooms} Bedrooms</span>
              </div>
            )}
            {bathrooms !== undefined && (
              <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300">
                <Bath className="w-3.5 h-3.5 text-[#3b1a83] dark:text-indigo-400" />
                <span>{bathrooms} Bathrooms</span>
              </div>
            )}
            {flatSize && (
              <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300">
                <Maximize2 className="w-3.5 h-3.5 text-[#3b1a83] dark:text-indigo-400" />
                <span>{flatSize}</span>
              </div>
            )}
            {orientation && (
              <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300 truncate">
                <Compass className="w-3.5 h-3.5 text-[#3b1a83] dark:text-indigo-400 shrink-0" />
                <span className="truncate">{orientation}</span>
              </div>
            )}
          </div>

          {/* Footer Card Row */}
          <div className="flex items-center justify-between text-xs pt-1">
            {formattedHandover ? (
              <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
                <Calendar className="w-3.5 h-3.5 text-[#3b1a83] dark:text-indigo-400" />
                <span>{formattedHandover}</span>
              </div>
            ) : (
              <div />
            )}

            <a
              href={`/properties/${slug || _id}`}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#3b1a83] dark:text-indigo-400 hover:text-[#28115c] dark:hover:text-indigo-300 transition-colors"
            >
              Details
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
