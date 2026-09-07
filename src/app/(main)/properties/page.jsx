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
    <main className="min-h-screen bg-[#f5f1ff] dark:bg-[#070913] text-zinc-800 dark:text-zinc-100 py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#3b1a83] dark:text-indigo-400 block mb-2">
            OUR PORTFOLIO
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Discover Exceptional Spaces
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
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
