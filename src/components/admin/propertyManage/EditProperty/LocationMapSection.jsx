import SectionCard from "./SectionCard";

const LocationMapSection = ({ value, onChange }) => (
  <SectionCard
    number={2}
    title="Location & Map"
    description="Add a Google Maps location to display on the property details page"
  >
    <label className="flex items-center gap-1.5 text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
      <svg
        className="w-3.5 h-3.5 text-[#3b1a83]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
      Google Maps Embed Link
    </label>
    <input
      type="text"
      name="mapLocation"
      value={value}
      onChange={onChange}
      placeholder="https://www.google.com/maps/embed?pb=..."
      className="w-full px-3.5 py-2.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#3b1a83]/30"
    />
    <p className="text-[10px] text-zinc-400 mt-1.5">
      On Google Maps: Share → Embed a map → copy the{" "}
      <span className="font-medium">src</span> URL from the iframe code (not the
      regular share link).
    </p>
  </SectionCard>
);

export default LocationMapSection;
