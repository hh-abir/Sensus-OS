"use client";

import React from "react";
import { GreetingCard } from "../GreetingCard";
import { FocusSessionCard } from "../FocusSessionCard";
import { ScheduleCalendarCard } from "../ScheduleCalendarCard";
import { StatsGrid } from "../StatsGrid";
import { DailyPlannerCard } from "../DailyPlannerCard";

export function OverviewScreen() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] xl:grid-cols-[350px_1fr] gap-6 items-start animate-in fade-in duration-200">
      {/* Left Column: Greeting & Focus Session */}
      <div className="flex flex-col gap-6">
        <GreetingCard />
        <FocusSessionCard />
      </div>

      {/* Center & Right Area: Calendar, Stats, and Daily Planner */}
      <div className="flex flex-col gap-6">
        {/* Top Row: Calendar (left) & 2x2 Stats (right) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          <div className="h-full">
            <ScheduleCalendarCard />
          </div>
          <div className="h-full">
            <StatsGrid />
          </div>
        </div>

        {/* Bottom Row: Daily Activity Planner */}
        <div className="w-full">
          <DailyPlannerCard />
        </div>
      </div>
    </div>
  );
}
