"use client";

import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";
import InquiryOverview from "@/components/admin/dashboard/InquiryOverview";
import PropertyOverview from "@/components/admin/dashboard/PropertyOverview";
import QuickActions from "@/components/admin/dashboard/QuickActions";
import StatsOverview from "@/components/admin/dashboard/StatsOverview";
import { fetchInquiries } from "@/services/api/inquiries";
import { getPropertys } from "@/services/api/property";
import React, { useEffect, useState, useCallback } from "react";

const DashboardPage = () => {
  const [properties, setProperties] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [propRes, inqRes] = await Promise.all([
        getPropertys(),
        fetchInquiries(),
      ]);

      if (propRes?.data) setProperties(propRes.data);
      if (inqRes?.data) setInquiries(inqRes.data);
    } catch (err) {
      console.error("Error loading dashboard metrics:", err);
      setError(
        "Failed to fetch dashboard records. Please check your connection.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  return (
    <div className="space-y-8 pb-10">
      <DashboardHeader onRefresh={loadDashboardData} loading={loading} />

      {/* Error Alert Box */}
      {error && (
        <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-400 text-xs flex justify-between items-center">
          <span>{error}</span>
          <button
            onClick={loadDashboardData}
            className="font-bold underline ml-4 hover:text-rose-900"
          >
            Retry
          </button>
        </div>
      )}

      <StatsOverview
        properties={properties}
        inquiries={inquiries}
        loading={loading}
      />

      <PropertyOverview properties={properties} loading={loading} />

      <InquiryOverview inquiries={inquiries} loading={loading} />

      <QuickActions properties={properties} inquiries={inquiries} />
    </div>
  );
};

export default DashboardPage;
