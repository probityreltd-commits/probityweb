import React from "react";
import { notFound } from "next/navigation";
import PropertyDetailsClient from "@/components/propertyPage/PropertyDetailsPage/PropertyDetailsClient";
import { demoProperties } from "@/data/data";

// Generate Dynamic Metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const property = demoProperties.find(
    (item) => item.slug === slug || item.id === slug,
  );

  if (!property) {
    return {
      title: "Property Not Found | Probity Holdings",
    };
  }

  return {
    title: `${property.title} | Probity Holdings`,
    description: property.description,
  };
}

const PropertyDetailsPage = async ({ params }) => {
  const { slug } = await params;

  // Find matching property using slug or id
  const property = demoProperties.find(
    (item) => item.slug === slug || item.id === slug,
  );

  // Trigger 404 if property not found
  if (!property) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f5f1ff] dark:bg-[#070913] text-zinc-800 dark:text-zinc-100 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto pt-20">
        <PropertyDetailsClient property={property} />
      </div>
    </main>
  );
};

export default PropertyDetailsPage;
