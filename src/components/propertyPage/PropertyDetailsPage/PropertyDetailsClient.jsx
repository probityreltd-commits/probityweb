"use client";

import React, { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { addInquiries } from "@/services/action/inquiries";
import { LandPlot, Building2, Home, Car } from "lucide-react";

import TopBar from "./TopBar";
import Hero from "./Hero";
import SpecLedger from "./SpecLedger";
import KeyDetailsSection from "./KeyDetailsSection";
import ActionCard from "./ActionCard";
import Lightbox from "./Lightbox";
import MapSection from "./MapSection";
import GallerySection from "./GallerySection";
import FeaturesAndAmenities from "./FeaturesAndAmenities";
import ScheduleTourSection from "./ScheduleTourSection";
import OurFeatureProject from "./OurFeatureProject";

const formatDate = (value) => {
  if (!value) return null;
  try {
    return new Date(value).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return value;
  }
};

const PropertyDetailsClient = ({ property }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("TOUR");
  const [tourType, setTourType] = useState("In Person");
  const [imgErrors, setImgErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleFieldChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const triggerBrochureDownload = () => {
    if (!property?.projectBrochure) {
      toast.error("Project brochure is currently unavailable.");
      return;
    }
    const link = document.createElement("a");
    link.href = property.projectBrochure;
    link.download = `${property?.slug || property?.title || "project"}-brochure`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (activeTab === "BROCHURE") {
      const email = formData.email.trim();
      const phone = formData.phone.trim();
      if (!email || !phone) {
        toast.error("Please provide your email and phone number.");
        return;
      }

      setIsSubmitting(true);
      const payload = {
        requestType: "BROCHURE_DOWNLOAD",
        name: "Valued Visitor",
        email,
        phone,
        property: {
          id: property?._id || null,
          slug: property?.slug || null,
          title: property?.title || null,
        },
        createdAt: new Date().toISOString(),
      };

      try {
        const body = await addInquiries(payload);
        if (body?.success === false) throw new Error(body.message);
        triggerBrochureDownload();
        toast.success("Download successful");
        setFormData((prev) => ({ ...prev, email: "", phone: "" }));
      } catch (err) {
        console.error("Brochure Download Error:", err);
        toast.error(
          err.message || "Failed to download brochure. Please try again.",
        );
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    setIsSubmitting(true);
    const payload = {
      requestType: "SCHEDULE_TOUR",
      tourType,
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
      property: {
        id: property?._id || null,
        slug: property?.slug || null,
        title: property?.title || null,
        coverImage: property?.coverImage || null,
      },
      createdAt: new Date().toISOString(),
    };

    try {
      const body = await addInquiries(payload);
      if (body?.success === false) throw new Error(body.message);
      toast.success("Sent your text, Thank You!");
      setSubmitted(true);
      setFormData({ name: "", phone: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      console.error("Tour Request Error:", err);
      toast.error(err.message || "Could not submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const rawImages =
    property?.images?.length > 0
      ? property.images
      : property?.coverImage
        ? [property.coverImage]
        : [];

  const images = rawImages.filter((_, idx) => !imgErrors[idx]);
  const safeIndex = Math.min(activeImageIndex, Math.max(images.length - 1, 0));

  const handlePrev = useCallback(() => {
    setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, handlePrev, handleNext]);

  const handoverLabel = formatDate(property?.handoverDate);
  const listedLabel = formatDate(property?.createdAt);

  const stats = [
    property?.landArea != null && {
      icon: LandPlot,
      label: "Land",
      value: `${property.landArea}`,
    },
    property?.buildingHeight != null && {
      icon: Building2,
      label: "Building Height",
      value: `${property.buildingHeight}`,
    },
    property?.apartments && {
      icon: Home,
      label: "Apartments",
      value: property.apartments,
    },
    property?.carParking && {
      icon: Car,
      label: "Car Parking",
      value: property.carParking,
    },
  ].filter(Boolean);

  const keyDetailsList = [
    { label: "Property Title", value: property?.title },
    { label: "Location", value: property?.locationName },
    { label: "Property Type", value: property?.propertyType },
    { label: "Address", value: property?.address },
    { label: "Status", value: property?.status },
    { label: "Handover Date", value: handoverLabel },
    { label: "Bedrooms", value: property?.bedrooms },
    { label: "Bathrooms", value: property?.bathrooms },
    { label: "Flat Size", value: property?.flatSize },
    { label: "Orientation", value: property?.orientation },
    { label: "Price Per Sqft", value: property?.pricePerSqft },
    { label: "Building Height", value: property?.buildingHeight },
    { label: "Land Area", value: property?.landArea },
    { label: "Apartments", value: property?.apartments },
    { label: "Apartment Sizes", value: property?.apartmentSizes },
    { label: "Units Per Floor", value: property?.unitsPerFloor },
    { label: "Car Parking", value: property?.carParking },
    { label: "Motorbike Parking", value: property?.motorbikeParking },
  ].filter(
    (item) =>
      item.value !== undefined &&
      item.value !== null &&
      String(item.value).trim() !== "",
  );

  return (
    <div>
      <TopBar title={property?.title} />

      <Hero
        images={images}
        activeIndex={safeIndex}
        setActiveIndex={setActiveImageIndex}
        onPrev={handlePrev}
        onNext={handleNext}
        onOpenLightbox={() => setLightboxOpen(true)}
        property={property}
      />

      <SpecLedger stats={stats} propertyId={property?._id} />

      {/* Main Content Grid */}
      <div className="mt-6 sm:mt-8 lg:mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        <div className="lg:col-span-8 space-y-6 sm:space-y-8">
          <KeyDetailsSection
            property={property}
            keyDetailsList={keyDetailsList}
            listedLabel={listedLabel}
          />
          <FeaturesAndAmenities amenities={property?.amenities} />
        </div>

        <div className="lg:col-span-4 lg:sticky lg:top-24">
          <ActionCard
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tourType={tourType}
            setTourType={setTourType}
            formData={formData}
            handleFieldChange={handleFieldChange}
            handleFormSubmit={handleFormSubmit}
            isSubmitting={isSubmitting}
            submitted={submitted}
          />
        </div>
      </div>

      {property?.mapLocation && (
        <MapSection embedString={property.mapLocation} />
      )}

      {property?.galleryImages?.length > 0 && (
        <GallerySection images={property.galleryImages} />
      )}

      <ScheduleTourSection property={property} />

      <OurFeatureProject />

      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={images}
        activeIndex={safeIndex}
        onPrev={handlePrev}
        onNext={handleNext}
        title={property?.title}
      />
    </div>
  );
};

export default PropertyDetailsClient;
