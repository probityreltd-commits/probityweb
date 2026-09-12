"use client";

import React, { useCallback, useEffect, useState } from "react";
import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";
import InquiryOverview from "@/components/admin/dashboard/InquiryOverview";
import PropertyOverview from "@/components/admin/dashboard/PropertyOverview";
import QuickActions from "@/components/admin/dashboard/QuickActions";
import StatsOverview from "@/components/admin/dashboard/StatsOverview";
import { fetchInquiries } from "@/services/api/inquiries";
import { getPropertys } from "@/services/api/property";
import { formatRelativeTime } from "@/components/ui/dashboard-helpers";

const AUTO_REFRESH_INTERVAL = 30000;

const DashboardPage = () => {
  const [properties, setProperties] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [, forceTick] = useState(0);

  const loadDashboardData = useCallback(async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      setError(null);

      const [propRes, inqRes] = await Promise.all([
        getPropertys(),
        fetchInquiries(),
      ]);

      if (propRes?.data) setProperties(propRes.data);
      if (inqRes?.data) setInquiries(inqRes.data);
      setLastUpdated(new Date());
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

  // Real-time-ish polling: silently refresh every 30s while the tab is visible
  useEffect(() => {
    const interval = setInterval(() => {
      if (document.visibilityState === "visible") {
        loadDashboardData(true);
      }
    }, AUTO_REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [loadDashboardData]);

  // Keep "Updated Xm ago" label fresh
  useEffect(() => {
    const tick = setInterval(() => forceTick((n) => n + 1), 30000);
    return () => clearInterval(tick);
  }, []);

  return (
    <div className="space-y-5 sm:space-y-8 pb-8 sm:pb-10">
      <DashboardHeader
        onRefresh={() => loadDashboardData(false)}
        loading={loading}
        lastUpdated={lastUpdated ? formatRelativeTime(lastUpdated) : "—"}
      />

      {error && (
        <div className="p-3.5 sm:p-4 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-400 text-xs flex justify-between items-center gap-3">
          <span>{error}</span>
          <button
            onClick={() => loadDashboardData(false)}
            className="font-bold underline shrink-0 hover:text-rose-900 dark:hover:text-rose-300"
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8">
        <PropertyOverview properties={properties} loading={loading} />
        <InquiryOverview inquiries={inquiries} loading={loading} />
      </div>

      <QuickActions />
    </div>
  );
};

export default DashboardPage;
