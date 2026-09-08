"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import AddPropertyHeader from "./AddPropertyHeader";
import BasicInfoSection from "@/components/admin/add-property/BasicInfoSection";
import LocationMapSection from "@/components/admin/add-property/LocationMapSection";
import StatusSection from "@/components/admin/add-property/StatusSection";
import SpecificationsSection from "@/components/admin/add-property/SpecificationsSection";
import ProjectDetailsSection from "@/components/admin/add-property/ProjectDetailsSection";
import AmenitiesSection from "@/components/admin/add-property/AmenitiesSection";
import ImageGallerySection from "@/components/admin/add-property/ImageGallerySection";
import GalleryImagesSection from "@/components/admin/add-property/GalleryImagesSection";
import BrochureSection from "@/components/admin/add-property/BrochureSection";
import LivePreviewSidebar from "@/components/admin/add-property/LivePreviewSidebar";
import { initialFormData } from "@/components/admin/add-property/addPropertyConstants";
import { authClient } from "@/lib/auth-client";
import { createProperty } from "@/services/action/property";

const AddProperty = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]); // cover / main images
  const [galleryImages, setGalleryImages] = useState([]); // NEW — separate details-page gallery
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

  // Brochure Upload Handler with Cloudinary Integration
  const handleBrochureUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Invalid file format", {
        description: "Please select a valid PDF brochure document.",
      });
      return;
    }

    setIsUploadingPdf(true);

    try {
      const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

      const formDataToUpload = new FormData();
      formDataToUpload.append("file", file);
      formDataToUpload.append("upload_preset", UPLOAD_PRESET);
      formDataToUpload.append("resource_type", "raw");

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/raw/upload`,
        {
          method: "POST",
          body: formDataToUpload,
        },
      );

      const data = await res.json();

      if (data.secure_url) {
        setBrochureFile({
          name: file.name,
          size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
          url: data.secure_url,
        });

        setFormData((prev) => ({
          ...prev,
          projectBrochure: data.secure_url,
        }));

        toast.success("Brochure uploaded successfully!");
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("PDF Upload Error:", error);
      toast.error("Failed to upload PDF brochure", {
        description: "Please check your network or Cloudinary configuration.",
      });
    } finally {
      setIsUploadingPdf(false);
    }
  };

  const removeBrochure = () => {
    setBrochureFile(null);
    setFormData((prev) => ({ ...prev, projectBrochure: "" }));
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setSelectedAmenities([]);
    setUploadedImages([]);
    setGalleryImages([]);
    setBrochureFile(null);
    toast.info("Form reset to default.");
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const { data } = await authClient.token();
      const token = data?.token || null;

      const imageUrls = uploadedImages.map((img) =>
        typeof img === "string" ? img : img.url || img.secure_url,
      );

      // NEW — separate gallery collection, same extraction pattern as the
      // main images so it works with whatever shape CloudinaryImageUploader
      // returns (plain URL strings or {url}/{secure_url} objects)
      const galleryImageUrls = galleryImages.map((img) =>
        typeof img === "string" ? img : img.url || img.secure_url,
      );

      const finalProjectData = {
        title: formData.title,
        slug: formData.slug,
        locationName: formData.locationName,
        mapLocation: formData.mapLocation, // NEW
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
        galleryImages: galleryImageUrls, // NEW
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
        setGalleryImages([]);
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
      <AddPropertyHeader
        onReset={handleReset}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {/* Main Form Content (8 Columns on Large Screens) */}
          <div className="lg:col-span-8 space-y-8">
            <BasicInfoSection
              number={1}
              formData={formData}
              handleTitleChange={handleTitleChange}
              handleSlugChange={handleSlugChange}
              handleChange={handleChange}
            />

            <LocationMapSection
              number={2}
              formData={formData}
              handleChange={handleChange}
            />

            <StatusSection
              number={3}
              formData={formData}
              handleChange={handleChange}
            />

            <SpecificationsSection
              number={4}
              formData={formData}
              handleChange={handleChange}
            />

            <ProjectDetailsSection
              number={5}
              formData={formData}
              handleChange={handleChange}
            />

            <AmenitiesSection
              number={6}
              selectedAmenities={selectedAmenities}
              toggleAmenity={toggleAmenity}
            />

            <ImageGallerySection
              number={7}
              uploadedImages={uploadedImages}
              setUploadedImages={setUploadedImages}
            />

            <GalleryImagesSection
              number={8}
              galleryImages={galleryImages}
              setGalleryImages={setGalleryImages}
            />

            <BrochureSection
              number={9}
              brochureFile={brochureFile}
              isUploadingPdf={isUploadingPdf}
              handleBrochureUpload={handleBrochureUpload}
              removeBrochure={removeBrochure}
            />
          </div>

          {/* Right Sidebar: LIVE PROPERTY PREVIEW */}
          <LivePreviewSidebar
            formData={formData}
            uploadedImages={uploadedImages}
            galleryImages={galleryImages}
            brochureFile={brochureFile}
            selectedAmenities={selectedAmenities}
            isSubmitting={isSubmitting}
            handleSubmit={handleSubmit}
          />
        </form>
      </div>
    </div>
  );
};

export default AddProperty;
