"use client";

import React, { useState } from "react";
import { MapPin, Bed, Bath, Maximize2 } from "lucide-react";
import CloudinaryImageUploader from "@/hooks/CloudinaryImageUploader";

const AddProjectPage = () => {
  // Form State
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    locationName: "",
    propertyType: "",
    address: "",
    description: "",
    status: "UNDER CONSTRUCTION",
    handoverDate: "",
    bedrooms: "", // Stored as Number
    bathrooms: "", // Stored as Number
    flatSize: "",
    orientation: "South Facing",
  });

  const [uploadedImages, setUploadedImages] = useState([]);

  // Helper: Format string to URL-safe slug (e.g., "Bashundhara Green Tower" -> "bashundhara-green-tower")
  const formatSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  // Auto-generate slug when title changes
  const handleTitleChange = (e) => {
    const val = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: formatSlug(val),
    }));
  };

  // Manual slug input handler
  const handleSlugChange = (e) => {
    const val = e.target.value;
    setFormData((prev) => ({
      ...prev,
      slug: formatSlug(val),
    }));
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const finalProjectData = {
      ...formData,
      bedrooms: Number(formData.bedrooms) || 0,
      bathrooms: Number(formData.bathrooms) || 0,
      images: uploadedImages.map((img) => img.url),
      coverImage: uploadedImages[0]?.url || "",
      createdAt: new Date().toISOString(),
    };

    console.log("=== PUBLISH PROJECT DATA ===");
    console.log(JSON.stringify(finalProjectData, null, 2));
    alert(
      "Project details and Cloudinary URLs logged to console successfully!",
    );
  };

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="font-serif text-2xl font-bold text-zinc-900 dark:text-white">
          Add New Project
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
          Enter the details to create a new property listing.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-5">
            <h2 className="font-sans text-sm font-bold text-zinc-900 dark:text-white pb-3 border-b border-zinc-100 dark:border-zinc-800">
              Project Information
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Project Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleTitleChange}
                  placeholder="e.g. Bashundhara Green Tower"
                  required
                  className="w-full px-4 py-2.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs sm:text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3b1a83]/30"
                />
              </div>

              {/* Slug & Location Name Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Slug
                  </label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleSlugChange}
                    placeholder="bashundhara-green-tower"
                    className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs sm:text-sm text-zinc-900 dark:text-white focus:outline-none"
                  />
                  <p className="text-[10px] text-zinc-400 mt-1">
                    Used in URL: probity.com/projects/
                    {formData.slug || "bashundhara-green-tower"}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Location Name
                  </label>
                  <input
                    type="text"
                    name="locationName"
                    value={formData.locationName}
                    onChange={handleChange}
                    placeholder="e.g. Bashundhara R/A"
                    className="w-full px-4 py-2.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs sm:text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3b1a83]/30"
                  />
                </div>
              </div>

              {/* Property Type / Tag */}
              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Property Type / Tag <span className="text-rose-500">*</span>
                </label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs sm:text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3b1a83]/30"
                >
                  <option value="">Select Type</option>
                  <option value="Residential">Residential Apartment</option>
                  <option value="Commercial">Commercial Space</option>
                  <option value="Luxury Villa">Luxury Villa</option>
                </select>
              </div>

              {/* Full Address */}
              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Project Location
                </label>
                <textarea
                  name="address"
                  rows={2}
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Full address or location details..."
                  className="w-full px-4 py-2.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs sm:text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3b1a83]/30"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Description
                </label>
                <textarea
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Detailed description of the property..."
                  className="w-full px-4 py-2.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs sm:text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3b1a83]/30"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Property Specifications */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-5">
            <h2 className="font-sans text-sm font-bold text-zinc-900 dark:text-white pb-3 border-b border-zinc-100 dark:border-zinc-800">
              Property Specifications
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Bedrooms
                </label>
                <input
                  type="number"
                  min="0"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  placeholder="3"
                  className="w-full px-3 py-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Bathrooms
                </label>
                <input
                  type="number"
                  min="0"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  placeholder="2"
                  className="w-full px-3 py-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Flat Size
                </label>
                <input
                  type="text"
                  name="flatSize"
                  value={formData.flatSize}
                  onChange={handleChange}
                  placeholder="e.g. 1720 sqft"
                  className="w-full px-3 py-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Orientation
                </label>
                <input
                  type="text"
                  name="orientation"
                  value={formData.orientation}
                  onChange={handleChange}
                  placeholder="South Facing"
                  className="w-full px-3 py-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs sm:text-sm"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Cloudinary Upload Section */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-4">
            <h2 className="font-sans text-sm font-bold text-zinc-900 dark:text-white pb-2 border-b border-zinc-100 dark:border-zinc-800">
              Project Images
            </h2>

            <CloudinaryImageUploader
              images={uploadedImages}
              setImages={setUploadedImages}
            />
          </div>
        </div>

        {/* Right Column: Status & Live Preview */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-4">
            <h2 className="font-sans text-sm font-bold text-zinc-900 dark:text-white pb-3 border-b border-zinc-100 dark:border-zinc-800">
              Project Status
            </h2>

            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs font-bold text-zinc-800 dark:text-white"
              >
                <option value="UNDER CONSTRUCTION">UNDER CONSTRUCTION</option>
                <option value="READY TO MOVE">READY TO MOVE</option>
                <option value="UPCOMING">UPCOMING</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                Handover Date
              </label>
              <input
                type="date"
                name="handoverDate"
                value={formData.handoverDate}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs text-zinc-800 dark:text-white"
              />
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-4">
            <h2 className="font-sans text-sm font-bold text-zinc-900 dark:text-white pb-2">
              Project Preview
            </h2>

            <div className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
              <div className="relative aspect-video bg-zinc-800">
                <img
                  src={
                    uploadedImages[0]?.url ||
                    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop"
                  }
                  alt="Preview Cover"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 text-[9px] font-extrabold bg-[#3b1a83] text-white px-2 py-0.5 rounded uppercase tracking-wider">
                  {formData.status}
                </span>
              </div>

              <div className="p-4 space-y-2">
                <h3 className="font-serif font-bold text-sm text-zinc-900 dark:text-white">
                  {formData.title || "Bashundhara Green Tower"}
                </h3>
                <div className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
                  <MapPin className="w-3.5 h-3.5 text-[#3b1a83]" />
                  <span>{formData.locationName || "Bashundhara R/A"}</span>
                </div>

                <div className="flex items-center justify-between text-[11px] font-bold text-zinc-600 dark:text-zinc-400 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                  <span className="flex items-center gap-1">
                    <Bed className="w-3.5 h-3.5" /> {formData.bedrooms || "3"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath className="w-3.5 h-3.5" /> {formData.bathrooms || "2"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Maximize2 className="w-3.5 h-3.5" />{" "}
                    {formData.flatSize || "1720 sqft"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="lg:col-span-3 flex items-center justify-between pt-6 border-t border-zinc-200 dark:border-zinc-800">
          <button
            type="button"
            className="text-xs font-bold text-zinc-500 hover:text-zinc-800 dark:hover:text-white"
          >
            Cancel
          </button>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#3b1a83] hover:bg-[#2e1467] text-white text-xs font-bold shadow-md transition-transform active:scale-95"
            >
              Publish Project
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProjectPage;
