"use client";

import React, { useState } from "react";
import {
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Building2,
  Zap,
  Users,
  Trees,
  Camera,
  LogOut,
  Flame,
  ShieldCheck,
  Shield,
  ArrowUp,
  FileText,
  UploadCloud,
  Check,
  Trash2,
  CheckCircle2,
  Eye,
  Sparkles,
  Loader2,
  Compass,
  Tag,
} from "lucide-react";
import CloudinaryImageUploader from "@/hooks/CloudinaryImageUploader";
import { toast } from "sonner";
import { createProperty } from "@/services/action/property";
import { authClient } from "@/lib/auth-client";

// Predefined Amenities with Lucide Icons
const PREDEFINED_AMENITIES = [
  { id: "1 Lift", label: "1 Lift", icon: Building2 },
  { id: "1 Stair", label: "1 Stair", icon: ArrowUp },
  { id: "Generator", label: "Generator", icon: Zap },
  { id: "Community Hall room", label: "Community Hall room", icon: Users },
  { id: "Garden", label: "Garden", icon: Trees },
  { id: "CC Camera", label: "CC Camera", icon: Camera },
  { id: "Emergency Exit", label: "Emergency Exit", icon: LogOut },
  { id: "Fire Protection", label: "Fire Protection", icon: Flame },
  { id: "Lightning Protection", label: "Lightning Protection", icon: Shield },
  { id: "Security Guard", label: "Security Guard", icon: ShieldCheck },
];

const initialFormData = {
  title: "",
  slug: "",
  locationName: "",
  propertyType: "",
  pricePerSqft: "",
  address: "",
  description: "",
  status: "UNDER CONSTRUCTION",
  handoverDate: "",
  bedrooms: "",
  bathrooms: "",
  flatSize: "",
  orientation: "South Facing",
  landArea: "",
  buildingHeight: "",
  apartments: "",
  carParking: "",
  motorbikeParking: "",
  unitsPerFloor: "",
  apartmentSizes: "",
  projectBrochure: "",
};

const AddProperty = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [brochureFile, setBrochureFile] = useState(null);
  const [isUploadingPdf, setIsUploadingPdf] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Format string to URL-safe slug
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

  // Toggle Amenity Selection
  const toggleAmenity = (amenityLabel) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenityLabel)
        ? prev.filter((item) => item !== amenityLabel)
        : [...prev, amenityLabel],
    );
  };

  // Handle PDF Brochure Upload Simulation / Handler
  const handleBrochureUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Invalid file format", {
        description: "Please select a valid PDF brochure document.",
      });
      return;
    }

    setIsUploadingPdf(true);
    // Simulate cloud upload delay or use standard reader/uploader
    setTimeout(() => {
      const dummyBrochureUrl = URL.createObjectURL(file);
      setBrochureFile({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
        url: dummyBrochureUrl,
      });
      setFormData((prev) => ({
        ...prev,
        projectBrochure: dummyBrochureUrl,
      }));
      setIsUploadingPdf(false);
      toast.success("Brochure uploaded successfully!");
    }, 1000);
  };

  const removeBrochure = () => {
    setBrochureFile(null);
    setFormData((prev) => ({ ...prev, projectBrochure: "" }));
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const { data } = await authClient.token();
      const token = data?.token || null;
      // const token = null;

      const imageUrls = uploadedImages.map((img) =>
        typeof img === "string" ? img : img.url || img.secure_url,
      );

      const finalProjectData = {
        title: formData.title,
        slug: formData.slug,
        locationName: formData.locationName,
        propertyType: formData.propertyType,
        pricePerSqft: formData.pricePerSqft,
        address: formData.address,
        description: formData.description,
        status: formData.status,
        handoverDate: formData.handoverDate,
        bedrooms: Number(formData.bedrooms) || 0,
        bathrooms: Number(formData.bathrooms) || 0,
        flatSize: formData.flatSize,
        orientation: formData.orientation,
        landArea: formData.landArea,
        buildingHeight: formData.buildingHeight,
        apartments: Number(formData.apartments) || 0,
        carParking: formData.carParking,
        motorbikeParking: formData.motorbikeParking,
        unitsPerFloor: Number(formData.unitsPerFloor) || 0,
        apartmentSizes: formData.apartmentSizes,
        amenities: selectedAmenities,
        images: imageUrls,
        coverImage: imageUrls[0] || "",
        projectBrochure: formData.projectBrochure,
        createdAt: new Date().toISOString(),
      };
      const result = await createProperty(finalProjectData, token);

      if (result?.success || result?.status === 200 || result?.data) {
        toast.success("Project published successfully!", {
          description: `${formData.title || "Property"} has been added to your portfolio.`,
        });
        setFormData(initialFormData);
        setSelectedAmenities([]);
        setUploadedImages([]);
        setBrochureFile(null);
        return;
      }

      toast.error("Failed to publish project", {
        description:
          result?.message || "Something went wrong. Please try again.",
      });
    } catch (error) {
      console.error("Publish Project Error:", error);
      toast.error("Failed to publish project", {
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen  text-zinc-900 dark:text-zinc-100 pb-16">
      {/* Top Admin Header Bar */}
      <div className="sticky top-15 z-20  backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 px-4 sm:px-6 lg:px-8 py-4 mb-8 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-[#3b1a83]/10 text-[#3b1a83] dark:bg-[#3b1a83]/30 dark:text-purple-300">
                Property Management
              </span>
              <span className="text-zinc-400 dark:text-zinc-600">•</span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                Admin Dashboard
              </span>
            </div>
            <h1 className="font-serif text-2xl font-bold tracking-tight text-zinc-900 dark:text-white mt-1">
              Add New Property
            </h1>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => {
                setFormData(initialFormData);
                setSelectedAmenities([]);
                setUploadedImages([]);
                setBrochureFile(null);
                toast.info("Form reset to default.");
              }}
              className="px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all focus:outline-none"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#3b1a83] hover:bg-[#2e1467] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#3b1a83]/20 hover:shadow-lg hover:shadow-[#3b1a83]/30 transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Publishing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Publish Project</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {/* Main Form Content (8 Columns on Large Screens) */}
          <div className="lg:col-span-8 space-y-8">
            {/* SECTION 1: BASIC INFORMATION */}
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-7 border border-zinc-200/80 dark:border-zinc-800 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-center gap-3 pb-4 mb-6 border-b border-zinc-100 dark:border-zinc-800">
                <div className="w-9 h-9 rounded-2xl bg-[#3b1a83]/10 text-[#3b1a83] flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <div>
                  <h2 className="font-sans text-base font-bold text-zinc-900 dark:text-white">
                    Basic Information
                  </h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Enter key identification and location parameters
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                {/* Project Title */}
                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">
                    Project Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleTitleChange}
                    placeholder="e.g. Bashundhara Green Tower"
                    required
                    className="w-full px-4 py-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-xs sm:text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#3b1a83]/30 focus:border-[#3b1a83] transition-all"
                  />
                </div>

                {/* Slug & Location Name Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">
                      URL Slug
                    </label>
                    <input
                      type="text"
                      name="slug"
                      value={formData.slug}
                      onChange={handleSlugChange}
                      placeholder="bashundhara-green-tower"
                      className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-xs sm:text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3b1a83]/30 transition-all font-mono text-[13px]"
                    />
                    <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-1.5 truncate">
                      Permalink:{" "}
                      <span className="text-[#3b1a83] dark:text-purple-400">
                        /projects/{formData.slug || "your-slug"}
                      </span>
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">
                      Location Name
                    </label>
                    <input
                      type="text"
                      name="locationName"
                      value={formData.locationName}
                      onChange={handleChange}
                      placeholder="e.g. Uttara, Dhaka"
                      className="w-full px-4 py-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-xs sm:text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#3b1a83]/30 focus:border-[#3b1a83] transition-all"
                    />
                  </div>
                </div>

                {/* Property Type & Price per Sqft Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">
                      Property Type / Category{" "}
                      <span className="text-rose-500">*</span>
                    </label>
                    <select
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-xs sm:text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3b1a83]/30 focus:border-[#3b1a83] transition-all"
                    >
                      <option value="">Select Property Type</option>
                      <option value="Residential Apartment">
                        Residential Apartment
                      </option>
                      <option value="Luxury Villa">Luxury Villa</option>
                      <option value="Commercial Space">Commercial Space</option>
                      <option value="Penthouse">Penthouse</option>
                      <option value="Duplex Studio">Duplex Studio</option>
                    </select>
                  </div>

                  {/* Price Per Sqft Input Field */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2 flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-[#3b1a83]" />
                      Price Per Sqft
                    </label>
                    <input
                      type="text"
                      name="pricePerSqft"
                      value={formData.pricePerSqft}
                      onChange={handleChange}
                      placeholder="e.g. 2,850 - 3,000 BDT"
                      className="w-full px-4 py-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-xs sm:text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#3b1a83]/30 focus:border-[#3b1a83] transition-all"
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">
                    Project Location / Full Address
                  </label>
                  <textarea
                    name="address"
                    rows={2}
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="e.g. Plot 45, Road 12, Sector 6, Uttara Model Town, Dhaka"
                    className="w-full px-4 py-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-xs sm:text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#3b1a83]/30 focus:border-[#3b1a83] transition-all"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">
                    Detailed Description
                  </label>
                  <textarea
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Provide a compelling description showcasing architectural highlights, surroundings, accessibility, and luxury features..."
                    className="w-full px-4 py-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-xs sm:text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#3b1a83]/30 focus:border-[#3b1a83] transition-all"
                  />
                </div>
              </div>
            </div>

            {/* SECTION 2: PROJECT STATUS */}
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-7 border border-zinc-200/80 dark:border-zinc-800 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-center gap-3 pb-4 mb-6 border-b border-zinc-100 dark:border-zinc-800">
                <div className="w-9 h-9 rounded-2xl bg-[#3b1a83]/10 text-[#3b1a83] flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <div>
                  <h2 className="font-sans text-base font-bold text-zinc-900 dark:text-white">
                    Project Status & Timeline
                  </h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Set construction progress stage and handover commitments
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">
                    Construction Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-xs sm:text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3b1a83]/30 focus:border-[#3b1a83] transition-all font-semibold"
                  >
                    <option value="UPCOMING">UPCOMING</option>
                    <option value="UNDER CONSTRUCTION">
                      UNDER CONSTRUCTION
                    </option>
                    <option value="READY TO MOVE">READY TO MOVE</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">
                    Handover Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      name="handoverDate"
                      value={formData.handoverDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-xs sm:text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3b1a83]/30 focus:border-[#3b1a83] transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 3: BASIC SPECIFICATIONS */}
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-7 border border-zinc-200/80 dark:border-zinc-800 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-center gap-3 pb-4 mb-6 border-b border-zinc-100 dark:border-zinc-800">
                <div className="w-9 h-9 rounded-2xl bg-[#3b1a83]/10 text-[#3b1a83] flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <div>
                  <h2 className="font-sans text-base font-bold text-zinc-900 dark:text-white">
                    Basic Specifications
                  </h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Core room count and directional specifications
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">
                    <Bed className="w-4 h-4 text-[#3b1a83]" />
                    <span>Bedrooms</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    placeholder="3"
                    className="w-full px-4 py-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-xs sm:text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3b1a83]/30 focus:border-[#3b1a83] transition-all"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-1.5 text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">
                    <Bath className="w-4 h-4 text-[#3b1a83]" />
                    <span>Bathrooms</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleChange}
                    placeholder="3"
                    className="w-full px-4 py-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-xs sm:text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3b1a83]/30 focus:border-[#3b1a83] transition-all"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-1.5 text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">
                    <Maximize2 className="w-4 h-4 text-[#3b1a83]" />
                    <span>Flat Size</span>
                  </label>
                  <input
                    type="text"
                    name="flatSize"
                    value={formData.flatSize}
                    onChange={handleChange}
                    placeholder="e.g. 1750 sqft"
                    className="w-full px-4 py-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-xs sm:text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3b1a83]/30 focus:border-[#3b1a83] transition-all"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-1.5 text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">
                    <Compass className="w-4 h-4 text-[#3b1a83]" />
                    <span>Orientation</span>
                  </label>
                  <input
                    type="text"
                    name="orientation"
                    value={formData.orientation}
                    onChange={handleChange}
                    placeholder="e.g. South Facing"
                    className="w-full px-4 py-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-xs sm:text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3b1a83]/30 focus:border-[#3b1a83] transition-all"
                  />
                </div>
              </div>
            </div>

            {/* SECTION 4: NEW PROJECT DETAILS */}
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-7 border border-zinc-200/80 dark:border-zinc-800 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-center gap-3 pb-4 mb-6 border-b border-zinc-100 dark:border-zinc-800">
                <div className="w-9 h-9 rounded-2xl bg-[#3b1a83]/10 text-[#3b1a83] flex items-center justify-center font-bold text-sm">
                  4
                </div>
                <div>
                  <h2 className="font-sans text-base font-bold text-zinc-900 dark:text-white">
                    Project Details
                  </h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Structural, land area, parking, and unit breakdown
                    specifications
                  </p>
                </div>
              </div>

              {/* Grid: Desktop 3/4 cols, Tablet 2 cols, Mobile 1 col */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">
                    Land Area
                  </label>
                  <input
                    type="text"
                    name="landArea"
                    value={formData.landArea}
                    onChange={handleChange}
                    placeholder="e.g. 4.96 Decimal"
                    className="w-full px-4 py-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-xs sm:text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3b1a83]/30 focus:border-[#3b1a83] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">
                    Building Height
                  </label>
                  <input
                    type="text"
                    name="buildingHeight"
                    value={formData.buildingHeight}
                    onChange={handleChange}
                    placeholder="e.g. G+8"
                    className="w-full px-4 py-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-xs sm:text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3b1a83]/30 focus:border-[#3b1a83] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">
                    Total Apartments
                  </label>
                  <input
                    type="number"
                    min="0"
                    name="apartments"
                    value={formData.apartments}
                    onChange={handleChange}
                    placeholder="e.g. 16"
                    className="w-full px-4 py-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-xs sm:text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3b1a83]/30 focus:border-[#3b1a83] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">
                    Car Parking
                  </label>
                  <input
                    type="text"
                    name="carParking"
                    value={formData.carParking}
                    onChange={handleChange}
                    placeholder="e.g. Ground Floor"
                    className="w-full px-4 py-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-xs sm:text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3b1a83]/30 focus:border-[#3b1a83] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">
                    Motorbike Parking
                  </label>
                  <input
                    type="text"
                    name="motorbikeParking"
                    value={formData.motorbikeParking}
                    onChange={handleChange}
                    placeholder="e.g. Ground Floor / N/A"
                    className="w-full px-4 py-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-xs sm:text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3b1a83]/30 focus:border-[#3b1a83] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">
                    Units Per Floor
                  </label>
                  <input
                    type="number"
                    min="0"
                    name="unitsPerFloor"
                    value={formData.unitsPerFloor}
                    onChange={handleChange}
                    placeholder="e.g. 2"
                    className="w-full px-4 py-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-xs sm:text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3b1a83]/30 focus:border-[#3b1a83] transition-all"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">
                    Apartment Sizes Breakdown
                  </label>
                  <input
                    type="text"
                    name="apartmentSizes"
                    value={formData.apartmentSizes}
                    onChange={handleChange}
                    placeholder="e.g. 1050 sqft (Unit A & B)"
                    className="w-full px-4 py-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-xs sm:text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3b1a83]/30 focus:border-[#3b1a83] transition-all"
                  />
                </div>
              </div>
            </div>

            {/* SECTION 5: AMENITIES / FEATURES */}
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-7 border border-zinc-200/80 dark:border-zinc-800 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-[#3b1a83]/10 text-[#3b1a83] flex items-center justify-center font-bold text-sm">
                    5
                  </div>
                  <div>
                    <h2 className="font-sans text-base font-bold text-zinc-900 dark:text-white">
                      Amenities & Features
                    </h2>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Select predefined property offerings and security features
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-full">
                  {selectedAmenities.length} Selected
                </span>
              </div>

              {/* Amenity Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
                {PREDEFINED_AMENITIES.map((item) => {
                  const IconComponent = item.icon;
                  const isSelected = selectedAmenities.includes(item.label);

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleAmenity(item.label)}
                      className={`relative flex flex-col items-center justify-center p-4 rounded-2xl border text-center transition-all duration-200 group focus:outline-none ${
                        isSelected
                          ? "bg-[#3b1a83]/5 border-[#3b1a83] text-[#3b1a83] dark:bg-[#3b1a83]/20 dark:border-purple-500 dark:text-purple-300 shadow-sm ring-1 ring-[#3b1a83]/20"
                          : "bg-white dark:bg-zinc-950 border-zinc-200/80 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                      }`}
                    >
                      {/* Check Badge */}
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#3b1a83] dark:bg-purple-500 text-white flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                      )}

                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2.5 transition-transform group-hover:scale-110 ${
                          isSelected
                            ? "bg-[#3b1a83] text-white dark:bg-purple-600"
                            : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 group-hover:bg-[#3b1a83]/10 group-hover:text-[#3b1a83]"
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>

                      <span className="text-xs font-semibold line-clamp-2 leading-tight">
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SECTION 6: PROJECT IMAGES */}
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-7 border border-zinc-200/80 dark:border-zinc-800 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-center gap-3 pb-4 mb-6 border-b border-zinc-100 dark:border-zinc-800">
                <div className="w-9 h-9 rounded-2xl bg-[#3b1a83]/10 text-[#3b1a83] flex items-center justify-center font-bold text-sm">
                  6
                </div>
                <div>
                  <h2 className="font-sans text-base font-bold text-zinc-900 dark:text-white">
                    Project Gallery & Images
                  </h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Upload showcase photos. The first uploaded image serves as
                    the cover image.
                  </p>
                </div>
              </div>

              {/* Cloudinary Image Uploader Component Integration */}
              <div className="space-y-4">
                <CloudinaryImageUploader
                  images={uploadedImages}
                  setImages={setUploadedImages}
                />

                {/* Display Cover Image Notice */}
                {uploadedImages.length > 0 && (
                  <div className="flex items-center gap-2 p-3 bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/50 rounded-xl text-xs text-[#3b1a83] dark:text-purple-300">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-[#3b1a83] dark:text-purple-400" />
                    <span>
                      <strong className="font-bold">Cover Image:</strong> The
                      first image in the grid will be displayed as the primary
                      hero image on property listings.
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* SECTION 7: PROJECT BROCHURE (PDF UPLOAD) */}
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-7 border border-zinc-200/80 dark:border-zinc-800 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-center gap-3 pb-4 mb-6 border-b border-zinc-100 dark:border-zinc-800">
                <div className="w-9 h-9 rounded-2xl bg-[#3b1a83]/10 text-[#3b1a83] flex items-center justify-center font-bold text-sm">
                  7
                </div>
                <div>
                  <h2 className="font-sans text-base font-bold text-zinc-900 dark:text-white">
                    Project Brochure (PDF)
                  </h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Upload official PDF prospectus for download on listing pages
                  </p>
                </div>
              </div>

              {!brochureFile ? (
                <label className="relative flex flex-col items-center justify-center p-8 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-2xl cursor-pointer hover:border-[#3b1a83] dark:hover:border-purple-500 hover:bg-zinc-50/80 dark:hover:bg-zinc-950/50 transition-all group">
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleBrochureUpload}
                    className="hidden"
                    disabled={isUploadingPdf}
                  />

                  {isUploadingPdf ? (
                    <div className="flex flex-col items-center gap-2 text-zinc-500">
                      <Loader2 className="w-8 h-8 animate-spin text-[#3b1a83]" />
                      <span className="text-xs font-semibold">
                        Uploading PDF Document...
                      </span>
                    </div>
                  ) : (
                    <>
                      <div className="w-14 h-14 rounded-2xl bg-[#3b1a83]/10 text-[#3b1a83] dark:bg-purple-900/30 dark:text-purple-300 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <UploadCloud className="w-7 h-7" />
                      </div>
                      <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                        Click to upload or drag & drop PDF brochure
                      </p>
                      <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
                        Supported file format: PDF only (Max size: 25MB)
                      </p>
                    </>
                  )}
                </label>
              ) : (
                <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-11 h-11 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center shrink-0">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white truncate">
                        {brochureFile.name}
                      </p>
                      <p className="text-[11px] text-zinc-400 mt-0.5">
                        {brochureFile.size} • PDF Prospectus Ready
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={brochureFile.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl text-zinc-500 hover:text-[#3b1a83] hover:bg-zinc-200/60 dark:hover:bg-zinc-800 transition-colors"
                      title="Preview PDF"
                    >
                      <Eye className="w-4 h-4" />
                    </a>
                    <button
                      type="button"
                      onClick={removeBrochure}
                      className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                      title="Remove PDF"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar: LIVE PROPERTY PREVIEW (4 Columns on Large Screens) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-40 bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <h3 className="font-sans text-sm font-bold text-zinc-900 dark:text-white">
                    Live Listing Card Preview
                  </h3>
                </div>
                <span className="text-[11px] text-zinc-400">
                  Real-time update
                </span>
              </div>

              {/* Property Card Visual */}
              <div className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm transition-all hover:shadow-lg">
                {/* Image Cover Preview */}
                <div className="relative h-48 w-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                  {uploadedImages.length > 0 ? (
                    <img
                      src={
                        typeof uploadedImages[0] === "string"
                          ? uploadedImages[0]
                          : uploadedImages[0]?.url ||
                            uploadedImages[0]?.secure_url
                      }
                      alt="Property Cover"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-zinc-400 gap-2">
                      <Building2 className="w-8 h-8 stroke-1" />
                      <span className="text-xs">No Cover Image Uploaded</span>
                    </div>
                  )}

                  {/* Status Badge */}
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#3b1a83] text-white shadow-md">
                    {formData.status || "STATUS"}
                  </span>

                  {/* Tag Badge */}
                  {formData.propertyType && (
                    <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-white/90 dark:bg-zinc-900/90 text-zinc-800 dark:text-zinc-200 backdrop-blur-xs">
                      {formData.propertyType}
                    </span>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-4 space-y-3">
                  <div>
                    <h4 className="font-serif text-base font-bold text-zinc-900 dark:text-white line-clamp-1">
                      {formData.title || "Project Title Preview"}
                    </h4>
                    <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-[#3b1a83] shrink-0" />
                      <span className="truncate">
                        {formData.locationName ||
                          formData.address ||
                          "Location Name"}
                      </span>
                    </div>
                  </div>

                  {/* Specifications Grid */}
                  <div className="grid grid-cols-3 gap-2 py-2 px-3 bg-zinc-50 dark:bg-zinc-900/60 rounded-xl text-center text-xs border border-zinc-100 dark:border-zinc-800/80">
                    <div>
                      <span className="block text-[10px] text-zinc-400 uppercase">
                        Beds
                      </span>
                      <strong className="font-bold text-zinc-800 dark:text-zinc-200">
                        {formData.bedrooms || "-"}
                      </strong>
                    </div>
                    <div>
                      <span className="block text-[10px] text-zinc-400 uppercase">
                        Baths
                      </span>
                      <strong className="font-bold text-zinc-800 dark:text-zinc-200">
                        {formData.bathrooms || "-"}
                      </strong>
                    </div>
                    <div>
                      <span className="block text-[10px] text-zinc-400 uppercase">
                        Size
                      </span>
                      <strong className="font-bold text-zinc-800 dark:text-zinc-200 truncate block">
                        {formData.flatSize || "-"}
                      </strong>
                    </div>
                  </div>

                  {/* Extended Summary Badges */}
                  <div className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400 pt-1">
                    {formData.landArea && (
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="text-zinc-400">Land Area:</span>
                        <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                          {formData.landArea}
                        </span>
                      </div>
                    )}
                    {formData.buildingHeight && (
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="text-zinc-400">Height:</span>
                        <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                          {formData.buildingHeight}
                        </span>
                      </div>
                    )}
                    {formData.apartments && (
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="text-zinc-400">Apartments:</span>
                        <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                          {formData.apartments} Units
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Selected Amenities Pills Preview */}
                  {selectedAmenities.length > 0 && (
                    <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
                      <span className="block text-[10px] font-bold text-zinc-400 uppercase mb-1.5">
                        Key Amenities ({selectedAmenities.length})
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {selectedAmenities.slice(0, 4).map((amenity, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] px-2 py-0.5 bg-[#3b1a83]/10 text-[#3b1a83] dark:bg-[#3b1a83]/30 dark:text-purple-300 rounded-md font-medium"
                          >
                            {amenity}
                          </span>
                        ))}
                        {selectedAmenities.length > 4 && (
                          <span className="text-[10px] px-1.5 py-0.5 bg-zinc-100 text-zinc-500 rounded-md font-semibold">
                            +{selectedAmenities.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Form Submission Quick Summary Notice */}
              <div className="p-4 bg-zinc-50 dark:bg-zinc-950 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 text-xs text-zinc-500 dark:text-zinc-400 space-y-2">
                <div className="flex items-center justify-between text-zinc-700 dark:text-zinc-300 font-semibold">
                  <span>Brochure Attached:</span>
                  <span>{brochureFile ? "Yes (PDF)" : "No"}</span>
                </div>
                <div className="flex items-center justify-between text-zinc-700 dark:text-zinc-300 font-semibold">
                  <span>Total Photos:</span>
                  <span>{uploadedImages.length} Images</span>
                </div>
              </div>

              {/* Action Button inside Sidebar for convenience */}
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-[#3b1a83] hover:bg-[#2e1467] text-white text-sm font-bold shadow-md shadow-[#3b1a83]/20 hover:shadow-lg transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Publishing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Publish Property</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProperty;
