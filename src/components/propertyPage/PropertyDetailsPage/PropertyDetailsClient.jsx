"use client";

import React, { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { addInquiries } from "@/services/action/inquiries";
import { Bed, Bath, Maximize2, Calendar } from "lucide-react";

// Import all section components
import TopBar from "./TopBar";
import Hero from "./Hero";
import SpecLedger from "./SpecLedger";
import KeyDetailsSection from "./KeyDetailsSection";
import ActionCard from "./ActionCard";
import Lightbox from "./Lightbox";
import MapSection from "./MapSection";
import GallerySection from "./GallerySection";
import FeaturesAndAmenities from "./FeaturesAndAmenities";

// Font imports and brand colour (kept in parent for global scope)
const FONT_IMPORTS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
`;
const BRAND = "#431780";

// Utility
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

  // Handlers
  const handleFieldChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const triggerBrochureDownload = () => {
    if (property?.projectBrochure) {
      const link = document.createElement("a");
      link.href = property.projectBrochure;
      link.download = `${property?.slug || property?.title || "project"}-brochure`;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      toast.error("Project brochure is currently unavailable.");
    }
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

    // Tour flow
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

  // Image handling (main hero images)
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

  // Derived data
  const handoverLabel = formatDate(property?.handoverDate);
  const listedLabel = formatDate(property?.createdAt);

  const stats = [
    property?.landArea != null && {
      icon: Bed,
      label: "Land",
      value: `${property.landArea}`,
    },
    property?.buildingHeight != null && {
      icon: Bath,
      label: "Building Height",
      value: `${property.buildingHeight}`,
    },
    property?.apartments && {
      icon: Maximize2,
      label: "Apartments",
      value: property.apartments,
    },
    handoverLabel && {
      icon: Calendar,
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
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Global Styles */}
      <style>{FONT_IMPORTS}</style>
      <style>{`
  .ledger-font { font-family: 'IBM Plex Mono', monospace; }
  .display-font { font-family: 'Fraunces', serif; }
  .leader-line {
    width: 100%;
    border-top: 1px dotted ${BRAND}99;
    margin: 10px 0;
  }
  .film-thumb::-webkit-scrollbar { height: 6px; }
  .film-thumb::-webkit-scrollbar-thumb {
    background: rgba(148,163,184,0.4);
    border-radius: 999px;
  }
  
  /* Hide scrollbar for gallery */
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }

  @keyframes subtle-shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(200%); }
  }
  .animate-shimmer {
    animation: subtle-shimmer 2.5s infinite ease-in-out;
  }
  @keyframes brochure-glow {
    0%, 100% {
      box-shadow: 0 0 0 0 rgba(67, 23, 128, 0.4), 0 0 12px rgba(67, 23, 128, 0.3);
    }
    50% {
      box-shadow: 0 0 0 6px rgba(67, 23, 128, 0), 0 0 20px rgba(67, 23, 128, 0.6);
    }
  }
  .animate-brochure-glow {
    animation: brochure-glow 2s infinite ease-in-out;
  }
`}</style>

      {/* Top Bar */}
      <TopBar title={property?.title} />

      {/* Hero Section */}
      <Hero
        images={images}
        activeIndex={activeImageIndex}
        setActiveIndex={setActiveImageIndex}
        onPrev={handlePrev}
        onNext={handleNext}
        onOpenLightbox={() => setLightboxOpen(true)}
        property={property}
      />

      {/* Spec Ledger */}
      <SpecLedger stats={stats} propertyId={property?._id} />

      {/* Main Content Grid */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-8">
          <KeyDetailsSection
            property={property}
            keyDetailsList={keyDetailsList}
            listedLabel={listedLabel}
          />
          <FeaturesAndAmenities amenities={property?.amenities} />
        </div>

        <div className="lg:col-span-4 lg:sticky lg:top-6">
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

      {/* ============ NEW FULL‑WIDTH SECTIONS ============ */}
      {/* Google Map – exact location */}
      {property.mapLocation && (
        <MapSection embedString={property.mapLocation} />
      )}

      {/* Image Gallery – full width using galleryImages */}
      {property.galleryImages?.length > 0 && (
        <GallerySection images={property.galleryImages} />
      )}

      {/* Lightbox Overlay */}
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={images}
        activeIndex={activeImageIndex}
        onPrev={handlePrev}
        onNext={handleNext}
        title={property?.title}
      />
    </div>
  );
};

export default PropertyDetailsClient;
