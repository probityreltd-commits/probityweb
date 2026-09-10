import { MapPin, Bed, Bath, Maximize2, FileText } from "lucide-react";

const LivePreviewSidebar = ({ formData, uploadedImages, property }) => {
  const coverImg =
    uploadedImages[0]?.url ||
    property?.coverImage ||
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop";

  const checklist = [
    { label: "Map Location", value: formData.mapLocation ? "Set" : "Not set" },
    {
      label: "Brochure Attached",
      value: formData.projectBrochure ? "Yes" : "No",
    },
    { label: "Cover/Main Photos", value: `${uploadedImages.length} Images` },
    { label: "Gallery Photos", value: "—" },
  ];

  return (
    <div className="lg:sticky lg:top-4 space-y-4">
      {/* Live Card Preview */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <h3 className="text-xs font-bold text-zinc-900 dark:text-white">
            Live Listing Card Preview
          </h3>
        </div>

        <div className="rounded-xl overflow-hidden border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-950">
          <div className="relative aspect-video bg-zinc-200 dark:bg-zinc-800">
            <img
              src={coverImg}
              alt="Preview Cover"
              className="w-full h-full object-cover"
            />
            <span className="absolute top-2 left-2 text-[9px] font-extrabold bg-[#3b1a83] text-white px-2 py-0.5 rounded uppercase tracking-wider">
              {formData.status || "STATUS"}
            </span>
          </div>

          <div className="p-3.5 space-y-2">
            <h4 className="font-bold text-xs text-zinc-900 dark:text-white truncate">
              {formData.title || "Project Title Preview"}
            </h4>
            <div className="flex items-center gap-1 text-[11px] text-zinc-500 dark:text-zinc-400">
              <MapPin className="w-3 h-3 text-[#3b1a83]" />
              <span className="truncate">
                {formData.locationName || "Location Name"}
              </span>
            </div>

            <div className="flex items-center justify-between text-[10px] font-bold text-zinc-600 dark:text-zinc-400 pt-2.5 border-t border-zinc-100 dark:border-zinc-800">
              <span className="flex items-center gap-1">
                <Bed className="w-3 h-3" /> {formData.bedrooms || "0"}
              </span>
              <span className="flex items-center gap-1">
                <Bath className="w-3 h-3" /> {formData.bathrooms || "0"}
              </span>
              <span className="flex items-center gap-1">
                <Maximize2 className="w-3 h-3" />{" "}
                {formData.flatSize || "0 sqft"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Checklist */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-2xl p-4 space-y-2.5">
        {checklist.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between text-[11px]"
          >
            <span className="text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
              <FileText className="w-3 h-3" />
              {item.label}
            </span>
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LivePreviewSidebar;
