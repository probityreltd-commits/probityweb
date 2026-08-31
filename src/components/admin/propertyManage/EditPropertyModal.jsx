"use client";

import React, { useState, useEffect } from "react";
import { Button, Modal } from "@heroui/react";
import { Edit2, MapPin, Bed, Bath, Maximize2, Plus, X } from "lucide-react";
import CloudinaryImageUploader from "@/hooks/CloudinaryImageUploader";
import { toast } from "sonner";
import { updateProperty } from "@/services/action/property";

const EditPropertyModal = ({ property, onUpdated }) => {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    locationName: "",
    propertyType: "",
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
    unitsPerFloor: "",
    apartmentSizes: "",
    carParking: "",
    motorbikeParking: "",
    pricePerSqft: "",
    projectBrochure: "",
  });

  const [amenities, setAmenities] = useState([]);
  const [newAmenityInput, setNewAmenityInput] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Prefill data when property prop changes
  useEffect(() => {
    if (property) {
      setFormData({
        title: property.title || "",
        slug: property.slug || "",
        locationName: property.locationName || "",
        propertyType: property.propertyType || "",
        address: property.address || "",
        description: property.description || "",
        status: property.status || "UNDER CONSTRUCTION",
        handoverDate: property.handoverDate || "",
        bedrooms: property.bedrooms ?? "",
        bathrooms: property.bathrooms ?? "",
        flatSize: property.flatSize || "",
        orientation: property.orientation || "South Facing",
        landArea: property.landArea || "",
        buildingHeight: property.buildingHeight || "",
        apartments: property.apartments ?? "",
        unitsPerFloor: property.unitsPerFloor ?? "",
        apartmentSizes: property.apartmentSizes || "",
        carParking: property.carParking || "",
        motorbikeParking: property.motorbikeParking || "",
        pricePerSqft: property.pricePerSqft || "",
        projectBrochure: property.projectBrochure || "",
      });

      setAmenities(Array.isArray(property.amenities) ? property.amenities : []);

      if (property.images && Array.isArray(property.images)) {
        setUploadedImages(property.images.map((url) => ({ url })));
      } else if (property.coverImage) {
        setUploadedImages([{ url: property.coverImage }]);
      } else {
        setUploadedImages([]);
      }
    }
  }, [property]);

  const formatSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const handleTitleChange = (e) => {
    const val = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: formatSlug(val),
    }));
  };

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

  // Amenities Handlers
  const handleAddAmenity = () => {
    if (!newAmenityInput.trim()) return;
    setAmenities((prev) => [...prev, newAmenityInput.trim()]);
    setNewAmenityInput("");
  };

  const handleRemoveAmenity = (indexToRemove) => {
    setAmenities((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleAmenityChange = (index, value) => {
    setAmenities((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const handleSubmit = async (e, close) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const updatedProjectData = {
        ...property,
        ...formData,
        bedrooms: formData.bedrooms === "" ? 0 : Number(formData.bedrooms),
        bathrooms: formData.bathrooms === "" ? 0 : Number(formData.bathrooms),
        apartments:
          formData.apartments === "" ? 0 : Number(formData.apartments),
        unitsPerFloor:
          formData.unitsPerFloor === "" ? 0 : Number(formData.unitsPerFloor),
        amenities: amenities.filter(Boolean),
        images: uploadedImages.map((img) => img.url),
        coverImage: uploadedImages[0]?.url || property.coverImage || "",
        updatedAt: new Date().toISOString(),
      };

      await updateProperty(property._id, updatedProjectData);

      toast.success("Property updated successfully!");

      onUpdated?.(updatedProjectData);

      if (close) close();
    } catch (error) {
      console.error("Update Project Error:", error);
      toast.error("Failed to update project");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal>
      <Button
        className="p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors border-none bg-transparent min-w-0 h-auto"
        title="Edit"
      >
        <Edit2 className="w-4 h-4" />
      </Button>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-0">
            {({ close }) => (
              <>
                <Modal.CloseTrigger />
                <Modal.Header className="px-6 pt-6 pb-4 border-b border-zinc-100 dark:border-zinc-800">
                  <Modal.Heading className="text-xl font-bold text-zinc-900 dark:text-white">
                    Edit Project
                  </Modal.Heading>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    Update property information and details.
                  </p>
                </Modal.Header>

                <Modal.Body className="p-6">
                  <form
                    id="edit-property-form"
                    onSubmit={(e) => handleSubmit(e, close)}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                  >
                    {/* Left Column: Form Controls */}
                    <div className="lg:col-span-2 space-y-6">
                      {/* Section 1: Basic Info */}
                      <div className="space-y-4">
                        <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400 pb-2 border-b border-zinc-100 dark:border-zinc-800">
                          Project Information
                        </h2>

                        <div>
                          <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                            Project Title{" "}
                            <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleTitleChange}
                            required
                            className="w-full px-4 py-2.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs sm:text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3b1a83]/30"
                          />
                        </div>

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
                              className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs sm:text-sm text-zinc-900 dark:text-white focus:outline-none"
                            />
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
                              className="w-full px-4 py-2.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs sm:text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3b1a83]/30"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                            Property Type / Tag{" "}
                            <span className="text-rose-500">*</span>
                          </label>
                          <select
                            name="propertyType"
                            value={formData.propertyType}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs sm:text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3b1a83]/30"
                          >
                            <option value="">Select Type</option>
                            <option value="Residential">
                              Residential Apartment
                            </option>
                            <option value="Commercial">Commercial Space</option>
                            <option value="Luxury Villa">Luxury Villa</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                            Project Location / Address
                          </label>
                          <textarea
                            name="address"
                            rows={2}
                            value={formData.address}
                            onChange={handleChange}
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
                            className="w-full px-4 py-2.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs sm:text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3b1a83]/30"
                          />
                        </div>
                      </div>

                      {/* Section 2: Specs */}
                      <div className="space-y-4 pt-2">
                        <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400 pb-2 border-b border-zinc-100 dark:border-zinc-800">
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
                              className="w-full px-3 py-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs sm:text-sm text-zinc-900 dark:text-white"
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
                              className="w-full px-3 py-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs sm:text-sm text-zinc-900 dark:text-white"
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
                              className="w-full px-3 py-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs sm:text-sm text-zinc-900 dark:text-white"
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
                              className="w-full px-3 py-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs sm:text-sm text-zinc-900 dark:text-white"
                            />
                          </div>
                        </div>

                        {/* Expanded Specification Fields */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                          <div>
                            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                              Land Area
                            </label>
                            <input
                              type="text"
                              name="landArea"
                              value={formData.landArea}
                              onChange={handleChange}
                              className="w-full px-3 py-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs sm:text-sm "
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                              Building Height
                            </label>
                            <input
                              type="text"
                              name="buildingHeight"
                              value={formData.buildingHeight}
                              onChange={handleChange}
                              className="w-full px-3 py-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs sm:text-sm"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                              Price Per Sqft
                            </label>
                            <input
                              type="text"
                              name="pricePerSqft"
                              value={formData.pricePerSqft}
                              onChange={handleChange}
                              className="w-full px-3 py-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs sm:text-sm"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                              Total Apartments
                            </label>
                            <input
                              type="number"
                              min="0"
                              name="apartments"
                              value={formData.apartments}
                              onChange={handleChange}
                              className="w-full px-3 py-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs sm:text-sm text-zinc-900 dark:text-white"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                              Units Per Floor
                            </label>
                            <input
                              type="number"
                              min="0"
                              name="unitsPerFloor"
                              value={formData.unitsPerFloor}
                              onChange={handleChange}
                              className="w-full px-3 py-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs sm:text-sm text-zinc-900 dark:text-white"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                              Apartment Sizes
                            </label>
                            <input
                              type="text"
                              name="apartmentSizes"
                              value={formData.apartmentSizes}
                              onChange={handleChange}
                              className="w-full px-3 py-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs sm:text-sm "
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                              Car Parking
                            </label>
                            <input
                              type="text"
                              name="carParking"
                              value={formData.carParking}
                              onChange={handleChange}
                              className="w-full px-3 py-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs sm:text-sm"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                              Motorbike Parking
                            </label>
                            <input
                              type="text"
                              name="motorbikeParking"
                              value={formData.motorbikeParking}
                              onChange={handleChange}
                              className="w-full px-3 py-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs sm:text-sm"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                            Project Brochure URL
                          </label>
                          <input
                            type="text"
                            name="projectBrochure"
                            value={formData.projectBrochure}
                            onChange={handleChange}
                            placeholder="Brochure PDF or file link"
                            className="w-full px-3 py-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs sm:text-sm text-zinc-900 dark:text-white"
                          />
                        </div>
                      </div>

                      {/* Section 3: Amenities */}
                      <div className="space-y-4 pt-2">
                        <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400 pb-2 border-b border-zinc-100 dark:border-zinc-800 ">
                          Amenities
                        </h2>

                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={newAmenityInput}
                            onChange={(e) => setNewAmenityInput(e.target.value)}
                            placeholder="Add amenity (e.g., Garden, 1 Lift)"
                            className="flex-1 px-3 py-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs sm:text-sm text-zinc-900 dark:text-white"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                handleAddAmenity();
                              }
                            }}
                          />
                          <Button
                            type="button"
                            onClick={handleAddAmenity}
                            className="bg-[#3b1a83] text-white px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1 h-auto min-w-0"
                          >
                            <Plus className="w-4 h-4" /> Add
                          </Button>
                        </div>

                        <div className="space-y-2">
                          {amenities.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <input
                                type="text"
                                value={item}
                                onChange={(e) =>
                                  handleAmenityChange(idx, e.target.value)
                                }
                                className="flex-1 px-3 py-1.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs"
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveAmenity(idx)}
                                className="p-1.5 text-rose-500 hover:text-rose-700 dark:hover:text-rose-400"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Section 4: Images */}
                      <div className="space-y-4 pt-2">
                        <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400 pb-2 border-b border-zinc-100 dark:border-zinc-800">
                          Project Images
                        </h2>

                        <CloudinaryImageUploader
                          images={uploadedImages}
                          setImages={setUploadedImages}
                        />
                      </div>
                    </div>

                    {/* Right Column: Status & Preview */}
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400 pb-2 border-b border-zinc-100 dark:border-zinc-800">
                          Status & Dates
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
                            <option value="UNDER CONSTRUCTION">
                              UNDER CONSTRUCTION
                            </option>
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

                      {/* Live Preview */}
                      <div className="space-y-3">
                        <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                          Live Card Preview
                        </h2>

                        <div className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
                          <div className="relative aspect-video bg-zinc-800">
                            <img
                              src={
                                uploadedImages[0]?.url ||
                                property?.coverImage ||
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
                            <h3 className="font-bold text-sm text-zinc-900 dark:text-white">
                              {formData.title || "Project Title"}
                            </h3>
                            <div className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
                              <MapPin className="w-3.5 h-3.5 text-[#3b1a83]" />
                              <span>{formData.locationName || "Location"}</span>
                            </div>

                            <div className="flex items-center justify-between text-[11px] font-bold text-zinc-600 dark:text-zinc-400 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                              <span className="flex items-center gap-1">
                                <Bed className="w-3.5 h-3.5" />{" "}
                                {formData.bedrooms || "0"}
                              </span>
                              <span className="flex items-center gap-1">
                                <Bath className="w-3.5 h-3.5" />{" "}
                                {formData.bathrooms || "0"}
                              </span>
                              <span className="flex items-center gap-1">
                                <Maximize2 className="w-3.5 h-3.5" />{" "}
                                {formData.flatSize || "0 sqft"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </Modal.Body>

                <Modal.Footer className="px-6 py-4 border-t border-zinc-100 dark:border-zinc-800">
                  <Button
                    onClick={close}
                    variant="secondary"
                    className="text-xs font-bold text-zinc-500 hover:text-zinc-800 dark:hover:text-white"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    form="edit-property-form"
                    disabled={isSubmitting}
                    className={`px-6 py-2.5 rounded-xl text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 ${
                      isSubmitting
                        ? "bg-zinc-400 dark:bg-zinc-700 cursor-not-allowed"
                        : "bg-[#3b1a83] hover:bg-[#2e1467] active:scale-95"
                    }`}
                  >
                    {isSubmitting ? "Updating..." : "Save Changes"}
                  </Button>
                </Modal.Footer>
              </>
            )}
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default EditPropertyModal;
