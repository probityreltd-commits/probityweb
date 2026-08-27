"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Plus, Edit2, Trash2, Image as ImageIcon } from "lucide-react";
import { deleteProperty } from "@/services/action/property";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const PropertyManagerClient = ({ initialProperties = [] }) => {
  const [properties, setProperties] = useState(initialProperties);
  const [statusFilter, setStatusFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const router = useRouter();

  // Dynamic filter dropdown options
  const statuses = useMemo(() => {
    const list = properties.map((p) => p.status).filter(Boolean);
    return ["All", ...Array.from(new Set(list))];
  }, [properties]);

  const locations = useMemo(() => {
    const list = properties.map((p) => p.locationName).filter(Boolean);
    return ["All", ...Array.from(new Set(list))];
  }, [properties]);

  const types = useMemo(() => {
    const list = properties.map((p) => p.propertyType).filter(Boolean);
    return ["All", ...Array.from(new Set(list))];
  }, [properties]);

  // Filtered Properties Logic
  const filteredProperties = useMemo(() => {
    return properties.filter((item) => {
      const matchStatus =
        statusFilter === "All" || item.status === statusFilter;
      const matchLocation =
        locationFilter === "All" || item.locationName === locationFilter;
      const matchType =
        typeFilter === "All" || item.propertyType === typeFilter;
      return matchStatus && matchLocation && matchType;
    });
  }, [properties, statusFilter, locationFilter, typeFilter]);

  const handleDelete = async (id) => {
    try {
      const result = await deleteProperty(id);

      if (result?.success) {
        setProperties((prev) => prev.filter((property) => property._id !== id));
        toast.success("Property deleted successfully!");
        router.refresh();
      } else {
        toast.error(result?.message || "Failed to delete property");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Something went wrong while deleting the property.");
    }
  };

  // Status Badge Colors
  const getStatusBadge = (status) => {
    switch (status?.toUpperCase()) {
      case "ACTIVE":
      case "READY TO MOVE":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400";
      case "UPCOMING":
      case "PLANNING":
        return "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400";
      case "UNDER CONSTRUCTION":
        return "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400";
      default:
        return "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400";
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
            Manage Projects
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            View, edit, and manage all active real estate developments.
          </p>
        </div>

        <Link
          href="/admin/add-property"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#3b1a83] hover:bg-[#2c1363] text-white text-xs font-semibold rounded-xl transition-all shadow-md shrink-0"
        >
          <Plus className="w-4 h-4" />
          Add New Project
        </Link>
      </div>

      {/* Filter Toolbar Container */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl p-4 border border-zinc-200/80 dark:border-zinc-800 shadow-sm flex flex-wrap items-center gap-4">
        {/* Status Filter */}
        <div className="w-full sm:w-48">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/70 rounded-xl text-xs text-zinc-700 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#3b1a83]"
          >
            <option value="All">All Statuses</option>
            {statuses
              .filter((s) => s !== "All")
              .map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
          </select>
        </div>

        {/* Location Filter */}
        <div className="w-full sm:w-48">
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/70 rounded-xl text-xs text-zinc-700 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#3b1a83]"
          >
            <option value="All">All Locations</option>
            {locations
              .filter((l) => l !== "All")
              .map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
          </select>
        </div>

        {/* Type Filter */}
        <div className="w-full sm:w-48">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/70 rounded-xl text-xs text-zinc-700 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#3b1a83]"
          >
            <option value="All">All Types</option>
            {types
              .filter((t) => t !== "All")
              .map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30 text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                <th className="py-3.5 px-6">Project</th>
                <th className="py-3.5 px-6">Location</th>
                <th className="py-3.5 px-6">Type</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-xs text-zinc-700 dark:text-zinc-300">
              {filteredProperties.length > 0 ? (
                filteredProperties.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40 transition-colors"
                  >
                    {/* Cover Image & Project Details */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700/60 overflow-hidden shrink-0 flex items-center justify-center">
                          {item.coverImage ? (
                            <img
                              src={item.coverImage}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <ImageIcon className="w-5 h-5 text-zinc-400" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-bold text-zinc-900 dark:text-white hover:text-[#3b1a83] transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-[11px] text-zinc-400 mt-0.5">
                            ID: {item._id.slice(-6).toUpperCase()} •{" "}
                            {item.bedrooms || 0} Beds, {item.bathrooms || 0}{" "}
                            Baths
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Location Name */}
                    <td className="py-4 px-6 font-medium text-zinc-600 dark:text-zinc-400">
                      {item.locationName || "N/A"}
                    </td>

                    {/* Property Type */}
                    <td className="py-4 px-6 font-medium text-zinc-600 dark:text-zinc-400">
                      {item.propertyType || "N/A"}
                    </td>

                    {/* Status Pill */}
                    <td className="py-4 px-6">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold capitalize ${getStatusBadge(
                          item.status,
                        )}`}
                      >
                        {item.status || "Draft"}
                      </span>
                    </td>

                    {/* Action Controls */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/dashboard/edit-project/${item._id}`}
                          className="p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="p-2 text-zinc-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-zinc-400">
                    No properties match the selected criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Counter Info */}
        <div className="py-3.5 px-6 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30 text-xs font-medium text-zinc-500 dark:text-zinc-400">
          Showing {filteredProperties.length} of {properties.length} results
        </div>
      </div>
    </div>
  );
};

export default PropertyManagerClient;
