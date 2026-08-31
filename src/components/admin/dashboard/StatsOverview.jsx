"use client";

import React, { useMemo } from "react";
import {
  Building2,
  Clock,
  Hammer,
  CheckCircle2,
  MessageSquare,
  Bell,
  CalendarCheck,
} from "lucide-react";
import StatCard from "./StatCard";

const StatsOverview = ({ properties = [], inquiries = [], loading }) => {
  const stats = useMemo(() => {
    // Property Statistics
    const totalProps = properties.length;
    const upcoming = properties.filter(
      (p) => p.status?.toUpperCase() === "UPCOMING",
    ).length;
    const underConstruction = properties.filter(
      (p) =>
        p.status?.toUpperCase() === "UNDER_CONSTRUCTION" ||
        p.status?.toUpperCase() === "UNDER CONSTRUCTION",
    ).length;
    const completed = properties.filter(
      (p) => p.status?.toUpperCase() === "READY TO MOVE",
    ).length;

    // Inquiry Statistics
    const totalInq = inquiries.length;
    const newInq = inquiries.filter(
      (i) => i.status?.toUpperCase() === "NEW" || i.isRead === false,
    ).length;
    const scheduledTours = inquiries.filter(
      (i) => i.requestType?.toUpperCase() === "SCHEDULE_TOUR",
    ).length;

    return {
      totalProps,
      upcoming,
      underConstruction,
      completed,
      totalInq,
      newInq,
      scheduledTours,
    };
  }, [properties, inquiries]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-28 bg-zinc-200 dark:bg-zinc-800 rounded-2xl animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Properties"
          value={stats.totalProps}
          icon={Building2}
          description="Active portfolio items"
          badgeText="Portfolio"
        />
        <StatCard
          title="Upcoming"
          value={stats.upcoming}
          icon={Clock}
          description="Pre-launch projects"
          badgeText="Planning"
          badgeColor="bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
        />
        <StatCard
          title="Under Construction"
          value={stats.underConstruction}
          icon={Hammer}
          description="In active development"
          badgeText="Ongoing"
          badgeColor="bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
        />
        <StatCard
          title="Completed"
          value={stats.completed}
          icon={CheckCircle2}
          description="Ready for handover"
          badgeText="Handover"
          badgeColor="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Total Inquiries"
          value={stats.totalInq}
          icon={MessageSquare}
          description="Leads across all channels"
          badgeText="All Time"
        />
        <StatCard
          title="New / Unread"
          value={stats.newInq}
          icon={Bell}
          description="Requires admin attention"
          badgeText="Action Needed"
          badgeColor="bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300"
        />
        <StatCard
          title="Scheduled Tours"
          value={stats.scheduledTours}
          icon={CalendarCheck}
          description="Site visits & video chats"
          badgeText="High Intent"
          badgeColor="bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300"
        />
      </div>
    </div>
  );
};

export default StatsOverview;
