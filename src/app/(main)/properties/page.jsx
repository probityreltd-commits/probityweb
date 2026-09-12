import React from "react";
import PropertiesClient from "./PropertiesClient";
import { getPropertys } from "@/services/api/property";

export const metadata = {
  title: "All Properties | Probity Holdings",
  description:
    "Browse our complete collection of premium residential and commercial properties.",
};

const PropertiesPage = async ({ searchParams }) => {
  const params = await searchParams;

  const data = await getPropertys();
  const properties = data.data;

  return (
    <main className="min-h-screen bg-background text-zinc-800 dark:text-zinc-100 pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8 lg:space-y-10">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-brand dark:text-indigo-400 block mb-1.5 sm:mb-2">
            OUR PORTFOLIO
          </span>
          <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Discover Exceptional Spaces
          </h1>
          <p className="mt-2 sm:mt-3 text-xs sm:text-sm lg:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Explore our curated catalog of luxury apartments, duplexes, and
            commercial developments engineered for perfection.
          </p>
        </div>

        <PropertiesClient
          properties={properties}
          initialLocation={params?.location || ""}
          initialProject={params?.project || ""}
          initialType={params?.type || ""}
        />
      </div>
    </main>
  );
};

export default PropertiesPage;
