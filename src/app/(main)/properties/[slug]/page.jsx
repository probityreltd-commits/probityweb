import React from "react";
import { notFound } from "next/navigation";
import PropertyDetailsClient from "@/components/propertyPage/PropertyDetailsPage/PropertyDetailsClient";
import { getPropertyBySlug } from "@/services/api/property";

const SITE_NAME = "Probity Holdings";
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://probityholdings.com";

// Generate Dynamic Metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;

  try {
    const result = await getPropertyBySlug(slug);
    const property = result?.data;

    if (!property) {
      return {
        title: `Property Not Found | ${SITE_NAME}`,
        description: "The requested property could not be found.",
        robots: { index: false, follow: false },
      };
    }

    const {
      title,
      description,
      coverImage,
      images,
      locationName,
      address,
      propertyType,
      status,
      flatSize,
      bedrooms,
    } = property;

    const pageTitle = `${title} | ${SITE_NAME}`;
    const fullLocation = [address, locationName].filter(Boolean).join(", ");
    const pageDescription =
      description ||
      `${title}${fullLocation ? ` located in ${fullLocation}` : ""}. ${
        bedrooms ? `${bedrooms} bedroom ` : ""
      }${propertyType || "property"} available for ${status || "sale"} with Probity Holdings.`;

    const ogImage = coverImage || images?.[0];
    const canonicalUrl = `${SITE_URL}/properties/${slug}`;

    return {
      title: pageTitle,
      description: pageDescription,
      keywords: [
        title,
        propertyType,
        locationName,
        "real estate",
        "Probity Holdings",
        status,
      ]
        .filter(Boolean)
        .join(", "),
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title: pageTitle,
        description: pageDescription,
        url: canonicalUrl,
        siteName: SITE_NAME,
        type: "website",
        images: ogImage
          ? [
              {
                url: ogImage,
                width: 1200,
                height: 630,
                alt: title,
              },
            ]
          : [],
      },
      twitter: {
        card: "summary_large_image",
        title: pageTitle,
        description: pageDescription,
        images: ogImage ? [ogImage] : [],
      },
      robots: {
        index: true,
        follow: true,
      },
    };
  } catch (error) {
    console.error("Metadata error:", error);

    return {
      title: `Property Not Found | ${SITE_NAME}`,
      description: "The requested property could not be found.",
      robots: { index: false, follow: false },
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
    <main className="min-h-screen bg-background text-zinc-800 dark:text-zinc-100 pt-24 sm:pt-28 lg:pt-32 pb-10 sm:pb-14 lg:pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <PropertyDetailsClient property={property} />
      </div>
    </main>
  );
};

export default PropertyDetailsPage;
