import React from "react";
import { notFound } from "next/navigation";
import PropertyDetailsClient from "@/components/propertyPage/PropertyDetailsPage/PropertyDetailsClient";
import { getPropertyBySlug } from "@/services/api/property";

// Generate Dynamic Metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;

  try {
    const result = await getPropertyBySlug(slug);
    const property = result?.data;

    if (!property) {
      return {
        title: "Property Not Found | Probity Holdings",
        description: "The requested property could not be found.",
      };
    }

    return {
      title: `${property.title} | Probity Holdings`,
      description: property.description || "",
      openGraph: {
        title: `${property.title} | Probity Holdings`,
        description: property.description || "",
        images: property.coverImage
          ? [
              {
                url: property.coverImage,
              },
            ]
          : [],
      },
    };
  } catch (error) {
    console.error("Metadata error:", error);

    return {
      title: "Property Not Found | Probity Holdings",
      description: "The requested property could not be found.",
    };
  }
}

const PropertyDetailsPage = async ({ params }) => {
  const { slug } = await params;

  let property;

  try {
    const result = await getPropertyBySlug(slug);

    property = result?.data;
  } catch (error) {
    console.error("Failed to fetch property:", error);
    notFound();
  }

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
