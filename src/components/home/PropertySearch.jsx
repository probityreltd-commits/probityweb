"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  Building,
  DollarSign,
  Home,
  Landmark,
  Target,
} from "lucide-react";

const PropertySearch = ({ onSearch }) => {
  const [activeTab, setActiveTab] = useState("buy");
  const [formData, setFormData] = useState({
    location: "",
    propertyType: "",
    priceRange: "",
  });

  const searchTabs = [
    { id: "buy", name: "Buy", icon: Home },
    { id: "rent", name: "Rent", icon: Landmark },
    { id: "commercial", name: "Commercial", icon: Target },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      tab: activeTab,
      ...formData,
    };
    if (onSearch) {
      onSearch(payload);
    } else {
      console.log("Search Payload Submitted:", payload);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="relative lg:absolute lg:bottom-6 left-0 lg:left-1/2 lg:-translate-x-1/2 w-full max-w-7xl px-4 sm:px-6 z-30 mb-10 lg:mt-0"
    >
      <div className="bg-zinc-950/85 rounded-2xl sm:rounded-[2rem] shadow-2xl border border-white/10 backdrop-blur-xl transition-colors duration-300">
        {/* Search Tabs */}
        <div className="flex items-center gap-2 sm:gap-4 px-4 sm:px-6 pt-4 sm:pt-5 pb-2 border-b border-white/10 overflow-x-auto no-scrollbar">
          <span className="text-amber-300 font-bold text-[10px] sm:text-xl Catapitalize tracking-widest">
            Find Your Dream Property
          </span>
        </div>

        {/* Form Fields */}
        <form
          onSubmit={handleSubmit}
          className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 items-center"
        >
          {/* Location Field */}
          <div className="space-y-1 sm:space-y-1.5">
            <label className="text-[10px] sm:text-[11px] uppercase tracking-widest font-bold text-zinc-400 flex items-center gap-1.5">
              <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400" />
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Enter City or Zip"
              className="w-full bg-white/5 px-3.5 py-2 sm:py-2.5 rounded-xl border border-white/10 text-xs sm:text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#3b1a83] transition-all"
            />
          </div>

          {/* Property Type Field */}
          <div className="space-y-1 sm:space-y-1.5">
            <label className="text-[10px] sm:text-[11px] uppercase tracking-widest font-bold text-zinc-400 flex items-center gap-1.5">
              <Building className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400" />
              Property Type
            </label>
            <input
              type="text"
              name="propertyType"
              value={formData.propertyType}
              onChange={handleInputChange}
              placeholder="Apartment / Villa"
              className="w-full bg-white/5 px-3.5 py-2 sm:py-2.5 rounded-xl border border-white/10 text-xs sm:text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#3b1a83] transition-all"
            />
          </div>

          {/* Price Range Field */}
          <div className="space-y-1 sm:space-y-1.5">
            <label className="text-[10px] sm:text-[11px] uppercase tracking-widest font-bold text-zinc-400 flex items-center gap-1.5">
              <DollarSign className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400" />
              Price Range
            </label>
            <input
              type="text"
              name="priceRange"
              value={formData.priceRange}
              onChange={handleInputChange}
              placeholder="$350k - $550k"
              className="w-full bg-white/5 px-3.5 py-2 sm:py-2.5 rounded-xl border border-white/10 text-xs sm:text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#3b1a83] transition-all"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2 xl:pt-5">
            <button
              type="submit"
              className="w-full bg-[#3b1a83] hover:bg-[#2e1467] text-white px-6 py-2.5 sm:py-3 rounded-xl font-extrabold text-xs sm:text-sm transition-all duration-300 shadow-xl hover:shadow-2xl active:scale-95 flex items-center justify-center gap-2 group border border-white/10"
            >
              <Search className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span>Search Properties</span>
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default PropertySearch;
