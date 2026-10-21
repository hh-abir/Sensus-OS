"use client";

import React, { useState } from "react";
import { TopNav } from "./TopNav";
import { GreetingCard } from "./GreetingCard";
import { FocusSessionCard } from "./FocusSessionCard";
import { ScheduleCalendarCard } from "./ScheduleCalendarCard";
import { StatsGrid } from "./StatsGrid";
import { DailyPlannerCard } from "./DailyPlannerCard";
import { DocumentsScreen } from "./documents/DocumentsScreen";
import { ProjectsScreen } from "./projects/ProjectsScreen";
import { TasksScreen } from "./tasks/TasksScreen";
import { JournalScreen } from "./journal/JournalScreen";
import { MailScreen } from "./mail/MailScreen";
import { SettingsScreen } from "./settings/SettingsScreen";
import { FocusProvider } from "./focus/FocusContext";
import { GlobalFocusDock } from "./focus/GlobalFocusDock";

export function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <FocusProvider>
      <div className="w-full flex flex-col gap-6 font-sans relative pb-20">
        {/* Top Navigation */}
        <TopNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Screen Views */}
      {/* 1. Overview Screen */}
      {activeTab === "overview" && (
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
      )}

      {/* 2. Documents Screen */}
      {activeTab === "documents" && (
        <div className="animate-in fade-in duration-200">
          <DocumentsScreen />
        </div>
      )}

      {/* 3. Projects Screen */}
      {activeTab === "projects" && (
        <div className="animate-in fade-in duration-200">
          <ProjectsScreen />
        </div>
      )}

      {/* 4. Tasks & Backlog Screen */}
      {activeTab === "tasks" && (
        <div className="animate-in fade-in duration-200">
          <TasksScreen />
        </div>
      )}

      {/* 5. Journal & Daily Reflection Screen */}
      {activeTab === "journal" && (
        <div className="animate-in fade-in duration-200">
          <JournalScreen />
        </div>
      )}

      {/* 6. Mail Screen */}
      {activeTab === "mail" && (
        <div className="animate-in fade-in duration-200">
          <MailScreen />
        </div>
      )}

      {/* 7. Settings Screen */}
      {activeTab === "settings" && (
        <div className="animate-in fade-in duration-200">
          <SettingsScreen />
        </div>
      )}

      {/* Floating Global Focus Dock & Ambient Soundscapes */}
      <GlobalFocusDock />
    </div>
  </FocusProvider>
  );
}
