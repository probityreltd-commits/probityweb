import CloudinaryImageUploader from "@/hooks/CloudinaryImageUploader";
import SectionCard from "./SectionCard";
import { Upload } from "lucide-react";

const BrochureSection = ({ value, onChange }) => (
  <SectionCard
    number={9}
    title="Project Brochure (PDF)"
    description="Upload official PDF prospectus for download on listing pages"
  >
    <div className="border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 text-center bg-zinc-50/50 dark:bg-zinc-950/30">
      <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-violet-100 dark:bg-violet-950/50 text-[#3b1a83] dark:text-violet-300 mb-3">
        <Upload className="w-5 h-5" />
      </div>
      <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
        Click to upload or drag &amp; drop PDF brochure
      </p>
      <p className="text-[10px] text-zinc-400 mt-1">
        Accepted file type: PDF. Maximum file size: 20MB
      </p>
      <input
        type="text"
        value={value}
        onChange={onChange}
        name="projectBrochure"
        placeholder="Paste PDF URL or upload below..."
        className="mt-4 w-full max-w-md mx-auto block px-3.5 py-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3b1a83]/30"
      />
      {value && (
        <p className="mt-2 text-[10px] text-emerald-600 dark:text-emerald-400 break-all">
          ✓ Brochure linked
        </p>
      )}
    </div>
  </SectionCard>
);

export default BrochureSection;
