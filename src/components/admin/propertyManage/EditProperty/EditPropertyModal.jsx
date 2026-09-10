"use client";

import React, { useState, useEffect } from "react";
import { Button, Modal } from "@heroui/react";
import { Edit2 } from "lucide-react";
import { toast } from "sonner";
import { updateProperty } from "@/services/action/property";

// Section components
import BasicInfoSection from "./BasicInfoSection";
import LocationMapSection from "./LocationMapSection";
import StatusTimelineSection from "./StatusTimelineSection";
import ProjectDetailsSection from "./ProjectDetailsSection";
import AmenitiesSection from "./AmenitiesSection";
import CoverImagesSection from "./CoverImagesSection";
import GalleryImagesSection from "./GalleryImagesSection";
import BrochureSection from "./BrochureSection";
import LivePreviewSidebar from "./LivePreviewSidebar";

const INITIAL_FORM = {
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
  mapLocation: "",
};

const formatSlug = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const EditPropertyModal = ({ property, onUpdated }) => {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [amenities, setAmenities] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Prefill from property
  useEffect(() => {
    if (!property) return;

    setFormData({
      title: property.title || "",
      slug: property.slug || "",
      locationName: property.locationName || "",
      propertyType: property.propertyType || "",
      address: property.address || "",
      description: property.description || "",
      status: property.status || "UNDER CONSTRUCTION",
      handoverDate: property.handoverDate
        ? new Date(property.handoverDate).toISOString().split("T")[0]
        : "",
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
      mapLocation: property.mapLocation || "",
    });

    setAmenities(Array.isArray(property.amenities) ? property.amenities : []);

    // Main images
    if (Array.isArray(property.images) && property.images.length) {
      setUploadedImages(property.images.map((url) => ({ url })));
    } else if (property.coverImage) {
      setUploadedImages([{ url: property.coverImage }]);
    } else {
      setUploadedImages([]);
    }

    // Gallery images
    if (Array.isArray(property.galleryImages)) {
      setGalleryImages(property.galleryImages.map((url) => ({ url })));
    } else {
      setGalleryImages([]);
    }
  }, [property]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const handleTitleChange = (e) => {
    const val = e.target.value;
    setFormData((prev) => ({ ...prev, title: val, slug: formatSlug(val) }));
  };

  const handleSlugChange = (e) => {
    setFormData((prev) => ({ ...prev, slug: formatSlug(e.target.value) }));
  };

  const handleSubmit = async (e, close) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const payload = {
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
        galleryImages: galleryImages.map((img) => img.url),
        updatedAt: new Date().toISOString(),
      };

      await updateProperty(property._id, payload);

      toast.success("Property updated successfully!");
      onUpdated?.(payload);
      close?.();
    } catch (error) {
      console.error("Update Property Error:", error);
      toast.error("Failed to update property");
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
          <Modal.Dialog className="w-full sm:max-w-6xl max-h-[92vh] overflow-hidden bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-0 flex flex-col">
            {({ close }) => (
              <>
                <Modal.CloseTrigger />

                {/* Header */}
                <Modal.Header className="px-5 sm:px-7 py-4 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 flex-shrink-0">
                  <Modal.Heading className="text-lg font-bold text-zinc-900 dark:text-white">
                    Edit Property
                  </Modal.Heading>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                    Update property information and details.
                  </p>
                </Modal.Header>

                {/* Scrollable Body */}
                <Modal.Body className="p-0 overflow-y-auto flex-1">
                  <form
                    id="edit-property-form"
                    onSubmit={(e) => handleSubmit(e, close)}
                    className="px-5 sm:px-7 py-6"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                      {/* Main column */}
                      <div className="lg:col-span-8 space-y-5">
                        <BasicInfoSection
                          formData={formData}
                          handleChange={handleChange}
                          handleTitleChange={handleTitleChange}
                          handleSlugChange={handleSlugChange}
                        />

                        <LocationMapSection
                          value={formData.mapLocation}
                          onChange={handleChange}
                        />

                        <StatusTimelineSection
                          formData={formData}
                          handleChange={handleChange}
                        />

                        <ProjectDetailsSection
                          formData={formData}
                          handleChange={handleChange}
                        />

                        <AmenitiesSection
                          amenities={amenities}
                          setAmenities={setAmenities}
                        />

                        <CoverImagesSection
                          images={uploadedImages}
                          setImages={setUploadedImages}
                        />

                        <GalleryImagesSection
                          images={galleryImages}
                          setImages={setGalleryImages}
                        />

                        <BrochureSection
                          value={formData.projectBrochure}
                          onChange={handleChange}
                        />
                      </div>

                      {/* Sidebar */}
                      <div className="lg:col-span-4">
                        <LivePreviewSidebar
                          formData={formData}
                          uploadedImages={uploadedImages}
                          property={property}
                        />
                      </div>
                    </div>
                  </form>
                </Modal.Body>

                {/* Footer */}
                <Modal.Footer className="px-5 sm:px-7 py-4 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 flex-shrink-0 flex justify-end gap-2">
                  <Button
                    type="button"
                    onClick={close}
                    variant="secondary"
                    className="text-xs font-bold text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white px-5 py-2.5 rounded-xl"
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
                    {isSubmitting ? "Saving..." : "Save Changes"}
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
