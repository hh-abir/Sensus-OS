"use client";

import React, { useState } from "react";
import {
  CalendarDays,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Filter,
  Columns3,
  LayoutGrid,
  Sparkles,
} from "lucide-react";
import { CalendarWeekView } from "./CalendarWeekView";
import { CalendarMonthView } from "./CalendarMonthView";
import { CalendarDayAgenda } from "./CalendarDayAgenda";
import { CalendarRitualsCard } from "./CalendarRitualsCard";
import { CalendarFocusQueueCard } from "./CalendarFocusQueueCard";
import { CalendarSpheresBalanceCard } from "./CalendarSpheresBalanceCard";
import { CalendarEventModal } from "./CalendarEventModal";
import { SoundscapeType } from "../focus/FocusContext";

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // "2026-10-21" format
  dayOfWeek: "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
  startTime: string; // e.g. "10:00"
  endTime: string; // e.g. "11:30"
  timeSlot: "morning" | "focus" | "afternoon" | "evening";
  sphere: "creative" | "academic" | "maker" | "social" | "wellness";
  soundscape?: SoundscapeType;
  isFocusSession?: boolean;
  location?: string;
  attendees?: string[];
  notes?: string;
  completed?: boolean;
}

export function CalendarScreen() {
  const [viewMode, setViewMode] = useState<"week" | "month">("week");
  const [selectedDate, setSelectedDate] = useState("2026-10-21");
  const [selectedSphere, setSelectedSphere] = useState<string>("all");
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);
  const [schedulerDate, setSchedulerDate] = useState("2026-10-21");

  // Initial Lifestyle OS Mock Events
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: "evt-1",
      title: "Design Tokens & Figma UI Kit Spec",
      date: "2026-10-21",
      dayOfWeek: "wed",
      startTime: "10:00",
      endTime: "11:30",
      timeSlot: "focus",
      sphere: "creative",
      soundscape: "rain",
      isFocusSession: true,
      location: "Design Studio Desk",
      notes: "Audit WCAG contrast and export SVG tokens",
      completed: false,
    },
    {
      id: "evt-2",
      title: "Morning Matcha & Stillness",
      date: "2026-10-21",
      dayOfWeek: "wed",
      startTime: "07:30",
      endTime: "08:15",
      timeSlot: "morning",
      sphere: "wellness",
      soundscape: "none",
      isFocusSession: false,
      location: "Balcony Sunroom",
      completed: true,
    },
    {
      id: "evt-3",
      title: "Blue Bottle Coffee Catchup with Maya",
      date: "2026-10-21",
      dayOfWeek: "wed",
      startTime: "14:30",
      endTime: "15:30",
      timeSlot: "afternoon",
      sphere: "social",
      soundscape: "coffee",
      isFocusSession: false,
      location: "Blue Bottle Cafe • 4th St",
      completed: false,
    },
    {
      id: "evt-4",
      title: "Smart Plant IoT Telemetry & Wiring",
      date: "2026-10-21",
      dayOfWeek: "wed",
      startTime: "17:00",
      endTime: "18:15",
      timeSlot: "evening",
      sphere: "maker",
      soundscape: "forest",
      isFocusSession: true,
      location: "Maker Workbench",
      completed: false,
    },
    {
      id: "evt-5",
      title: "Cognitive Psychology Chapter 4 Drafting",
      date: "2026-10-20",
      dayOfWeek: "tue",
      startTime: "10:00",
      endTime: "12:00",
      timeSlot: "focus",
      sphere: "academic",
      soundscape: "rain",
      isFocusSession: true,
      location: "Campus Library Reading Room",
      completed: true,
    },
    {
      id: "evt-6",
      title: "Pottery Studio Wheel Throwing",
      date: "2026-10-22",
      dayOfWeek: "thu",
      startTime: "18:00",
      endTime: "20:00",
      timeSlot: "evening",
      sphere: "creative",
      isFocusSession: false,
      location: "Clay & Co Studio",
      completed: false,
    },
    {
      id: "evt-7",
      title: "Weekly Studio Retrospective & Intentions",
      date: "2026-10-23",
      dayOfWeek: "fri",
      startTime: "16:00",
      endTime: "17:00",
      timeSlot: "afternoon",
      sphere: "creative",
      isFocusSession: false,
      location: "Home Office",
      completed: false,
    },
    {
      id: "evt-8",
      title: "Farmers Market & Cedar Trail Hike",
      date: "2026-10-24",
      dayOfWeek: "sat",
      startTime: "09:00",
      endTime: "12:30",
      timeSlot: "morning",
      sphere: "wellness",
      isFocusSession: false,
      location: "Redwood Trailhead",
      completed: false,
    },
  ]);

  const handleOpenScheduler = (dateStr?: string) => {
    setSchedulerDate(dateStr || selectedDate);
    setIsSchedulerOpen(true);
  };

  const handleSaveEvent = (newEventData: Omit<CalendarEvent, "id">) => {
    const newEvent: CalendarEvent = {
      ...newEventData,
      id: `evt-${Date.now()}`,
    };
    setEvents((prev) => [...prev, newEvent]);
  };

  const handleToggleEventComplete = (id: string) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, completed: !e.completed } : e))
    );
  };

  // Filtered events
  const filteredEvents =
    selectedSphere === "all"
      ? events
      : events.filter((e) => e.sphere === selectedSphere);

  const spheres = [
    { id: "all", label: "All Spheres" },
    { id: "creative", label: "🎨 Creative" },
    { id: "academic", label: "🎓 Academic" },
    { id: "maker", label: "🌿 Maker" },
    { id: "social", label: "☕ Social" },
    { id: "wellness", label: "🍵 Wellness" },
  ];

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in duration-200">
      {/* 1. Calendar Header & Controls Strip */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white rounded-[28px] p-5 sm:px-6 sm:py-4 shadow-xs border border-zinc-200/50">
        {/* Left: Date Title & Pager */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-[#edebe6] text-zinc-900 flex items-center justify-center font-bold">
            <CalendarDays className="w-4 h-4" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-zinc-950 tracking-tight">
                October 2026
              </h2>
              <span className="text-[10px] font-semibold text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded-md">
                Week 43
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 font-normal">
              Rhythms, deep work blocks, and deliberate routines
            </p>
          </div>

          {/* Jump Buttons */}
          <div className="flex items-center gap-1 pl-2">
            <button
              onClick={() => setSelectedDate("2026-10-21")}
              className="px-2.5 py-1 rounded-xl bg-zinc-100 hover:bg-zinc-200/80 text-xs font-semibold text-zinc-800 transition-colors cursor-pointer"
            >
              Today
            </button>
            <button
              onClick={() => {
                const prev = new Date(selectedDate + "T00:00:00");
                prev.setDate(prev.getDate() - 7);
                setSelectedDate(prev.toISOString().split("T")[0]);
              }}
              className="w-7 h-7 rounded-xl hover:bg-zinc-100 flex items-center justify-center text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer"
              aria-label="Previous week"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                const next = new Date(selectedDate + "T00:00:00");
                next.setDate(next.getDate() + 7);
                setSelectedDate(next.toISOString().split("T")[0]);
              }}
              className="w-7 h-7 rounded-xl hover:bg-zinc-100 flex items-center justify-center text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer"
              aria-label="Next week"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Center: View Switcher (Week Horizon vs Month Grid) */}
        <div className="flex items-center gap-1 bg-[#edebe6] p-1 rounded-2xl border border-zinc-200/50 self-start md:self-center">
          <button
            onClick={() => setViewMode("week")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              viewMode === "week"
                ? "bg-white text-zinc-900 shadow-2xs font-bold"
                : "text-zinc-600 hover:text-zinc-950"
            }`}
          >
            <Columns3 className="w-3.5 h-3.5" />
            <span>Week Horizon</span>
          </button>
          <button
            onClick={() => setViewMode("month")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              viewMode === "month"
                ? "bg-white text-zinc-900 shadow-2xs font-bold"
                : "text-zinc-600 hover:text-zinc-950"
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Month Grid</span>
          </button>
        </div>

        {/* Right: Actions (Sphere Filter & New Event) */}
        <div className="flex items-center gap-2.5">
          {/* Sphere Filter */}
          <select
            value={selectedSphere}
            onChange={(e) => setSelectedSphere(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-zinc-50 border border-zinc-200/70 text-xs font-semibold text-zinc-700 cursor-pointer focus:outline-none"
          >
            {spheres.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>

          {/* Schedule Event Button (Soft warm pill, no harsh black) */}
          <button
            onClick={() => handleOpenScheduler(selectedDate)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#edebe6] hover:bg-[#e4e1d7] text-zinc-800 border border-zinc-300/70 font-semibold text-xs shadow-2xs transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Schedule</span>
          </button>
        </div>
      </div>

      {/* 2. Row 1: Asymmetric Main Rhythm Stage (70% Canvas / 30% Day Agenda) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 xl:grid-cols-10 gap-6 items-stretch">
        {/* 70% Width: Week Horizon Canvas or Month Grid */}
        <div className="lg:col-span-8 xl:col-span-7 h-full flex flex-col">
          {viewMode === "week" ? (
            <CalendarWeekView
              events={filteredEvents}
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
              onOpenScheduler={handleOpenScheduler}
              onToggleEventComplete={handleToggleEventComplete}
            />
          ) : (
            <CalendarMonthView
              events={filteredEvents}
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
              onOpenScheduler={handleOpenScheduler}
            />
          )}
        </div>

        {/* 30% Width: Selected Day Agenda Inspector */}
        <div className="lg:col-span-4 xl:col-span-3 h-full flex flex-col">
          <CalendarDayAgenda
            selectedDate={selectedDate}
            events={events}
            onOpenScheduler={handleOpenScheduler}
            onToggleEventComplete={handleToggleEventComplete}
          />
        </div>
      </div>

      {/* 3. Row 2: Symmetric 3-Card Row (33% Rituals / 33% Focus Queue / 33% Spheres Balance) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        <div className="h-full">
          <CalendarRitualsCard />
        </div>
        <div className="h-full">
          <CalendarFocusQueueCard events={events} />
        </div>
        <div className="h-full">
          <CalendarSpheresBalanceCard />
        </div>
      </div>

      {/* 4. Quick Event Scheduler Modal */}
      <CalendarEventModal
        isOpen={isSchedulerOpen}
        onClose={() => setIsSchedulerOpen(false)}
        onSave={handleSaveEvent}
        initialDate={schedulerDate}
      />
    </div>
  );
}
