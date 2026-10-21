"use client";

import React, { useState } from "react";
import {
  Calendar as CalendarIcon,
  Clock,
  Sparkles,
  CheckCircle2,
  Check,
  ChevronLeft,
  ChevronRight,
  Plus,
  Play,
  Volume2,
  MapPin,
} from "lucide-react";
import { CalendarEvent } from "./CalendarScreen";
import { useFocus } from "../focus/FocusContext";

interface CalendarDaySidebarProps {
  selectedDate: string; // "2026-10-21"
  events: CalendarEvent[];
  onOpenScheduler: (date?: string) => void;
  onToggleEventComplete: (id: string) => void;
  onSelectDate: (date: string) => void;
}

interface DailyRitual {
  id: string;
  title: string;
  time: string;
  completed: boolean;
  sphere: string;
}

export function CalendarDaySidebar({
  selectedDate,
  events,
  onOpenScheduler,
  onToggleEventComplete,
  onSelectDate,
}: CalendarDaySidebarProps) {
  const { startFocus, setSoundscape } = useFocus();

  // Daily Mindful Rituals State
  const [rituals, setRituals] = useState<DailyRitual[]>([
    { id: "r-1", title: "Morning Matcha & Intention", time: "07:30 AM", completed: true, sphere: "🍵 Mind" },
    { id: "r-2", title: "Figma UI Token Focus Sprint", time: "10:00 AM", completed: true, sphere: "🎨 Design" },
    { id: "r-3", title: "Smart Plant IoT Telemetry", time: "05:00 PM", completed: false, sphere: "🌿 Tech" },
    { id: "r-4", title: "Evening Journal Reflection", time: "09:30 PM", completed: false, sphere: "📖 Sanctuary" },
  ]);

  const toggleRitual = (id: string) => {
    setRituals((prev) =>
      prev.map((r) => (r.id === id ? { ...r, completed: !r.completed } : r))
    );
  };

  const dayEvents = events
    .filter((e) => e.date === selectedDate)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  const completedRituals = rituals.filter((r) => r.completed).length;
  const ritualsProgress = Math.round((completedRituals / rituals.length) * 100);

  // Format date display (e.g. Wednesday, October 21)
  const dateObj = new Date(selectedDate + "T00:00:00");
  const dayName = dateObj.toLocaleDateString("en-US", { weekday: "long" });
  const monthDay = dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const isToday = selectedDate === "2026-10-21";

  const handleLaunchFocus = (event: CalendarEvent) => {
    if (event.soundscape && event.soundscape !== "none") {
      setSoundscape(event.soundscape);
    }
    startFocus(event.title, 45);
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* 1. Selected Day Overview Card */}
      <div className="bg-white rounded-[28px] p-6 shadow-xs border border-zinc-200/50">
        <div className="flex items-start justify-between pb-4 border-b border-zinc-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                {dayName}
              </span>
              {isToday && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                  Today
                </span>
              )}
            </div>
            <h3 className="text-xl font-bold text-zinc-950 tracking-tight mt-1">
              {monthDay}, 2026
            </h3>
          </div>

          <button
            onClick={() => onOpenScheduler(selectedDate)}
            className="w-8 h-8 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white flex items-center justify-center transition-all cursor-pointer shadow-2xs"
            title="Schedule Event"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Selected Day Event Stream */}
        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-zinc-500">
            <span>Scheduled Rhythm</span>
            <span>{dayEvents.length} {dayEvents.length === 1 ? "Event" : "Events"}</span>
          </div>

          {dayEvents.length === 0 ? (
            <div className="py-8 text-center bg-zinc-50/70 rounded-2xl border border-dashed border-zinc-200/80">
              <p className="text-xs font-medium text-zinc-500">No events scheduled yet</p>
              <button
                onClick={() => onOpenScheduler(selectedDate)}
                className="mt-2 text-[11px] font-bold text-zinc-900 hover:underline cursor-pointer"
              >
                + Schedule focus or ritual
              </button>
            </div>
          ) : (
            dayEvents.map((evt) => {
              const isCreative = evt.sphere === "creative";
              const isAcademic = evt.sphere === "academic";
              const isMaker = evt.sphere === "maker";
              const isSocial = evt.sphere === "social";

              return (
                <div
                  key={evt.id}
                  className={`p-3.5 rounded-2xl border transition-all ${
                    evt.completed
                      ? "bg-zinc-50/70 border-zinc-200/60 opacity-60"
                      : "bg-white hover:bg-zinc-50/50 border-zinc-200/70 shadow-2xs"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2.5">
                    <div className="flex items-start gap-2.5 min-w-0 flex-1">
                      <button
                        onClick={() => onToggleEventComplete(evt.id)}
                        className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors cursor-pointer shrink-0 mt-0.5 ${
                          evt.completed
                            ? "bg-[#52c8b0] border-[#52c8b0] text-white"
                            : "border-zinc-300 hover:border-zinc-400 bg-white"
                        }`}
                      >
                        {evt.completed && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </button>

                      <div className="min-w-0 flex-1">
                        <h4
                          className={`text-xs font-bold leading-tight truncate ${
                            evt.completed ? "line-through text-zinc-400 font-normal" : "text-zinc-900"
                          }`}
                        >
                          {evt.title}
                        </h4>

                        <div className="flex items-center gap-2 mt-1 text-[11px] text-zinc-400 font-medium">
                          <span className="flex items-center gap-1 font-mono">
                            <Clock className="w-3 h-3 text-zinc-400" />
                            <span>{evt.startTime} – {evt.endTime}</span>
                          </span>
                          {evt.location && (
                            <span className="flex items-center gap-0.5 truncate text-[10px]">
                              <MapPin className="w-2.5 h-2.5" />
                              <span>{evt.location}</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Launch Focus Button */}
                    {evt.isFocusSession && !evt.completed && (
                      <button
                        onClick={() => handleLaunchFocus(evt)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white text-[10px] font-bold shadow-2xs transition-transform active:scale-95 cursor-pointer shrink-0"
                        title="Start 45m Focus Session"
                      >
                        <Play className="w-2.5 h-2.5 fill-current ml-0.2" />
                        <span>Focus</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* 2. Daily Mindful Rituals Loop */}
      <div className="bg-white rounded-[28px] p-6 shadow-xs border border-zinc-200/50">
        <div className="flex items-center justify-between pb-3.5 border-b border-zinc-100">
          <div>
            <h4 className="text-sm font-bold text-zinc-900 tracking-tight">
              Mindful Rituals Loop
            </h4>
            <p className="text-[11px] text-zinc-400">Daily flow checklist</p>
          </div>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200/60 font-mono">
            {ritualsProgress}%
          </span>
        </div>

        {/* Progress meter */}
        <div className="w-full bg-zinc-100 h-1.5 rounded-full overflow-hidden my-3.5">
          <div
            className="bg-[#52c8b0] h-full rounded-full transition-all duration-300"
            style={{ width: `${ritualsProgress}%` }}
          />
        </div>

        {/* Rituals List */}
        <div className="space-y-2 mt-2">
          {rituals.map((ritual) => (
            <button
              key={ritual.id}
              onClick={() => toggleRitual(ritual.id)}
              className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-50 border border-transparent hover:border-zinc-200/60 text-left transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span
                  className={`w-4 h-4 rounded-md flex items-center justify-center border transition-all shrink-0 ${
                    ritual.completed
                      ? "bg-[#52c8b0] border-[#52c8b0] text-white"
                      : "border-zinc-300 group-hover:border-zinc-400 bg-white"
                  }`}
                >
                  {ritual.completed && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                </span>
                <span
                  className={`text-xs font-medium truncate ${
                    ritual.completed ? "line-through text-zinc-400" : "text-zinc-800"
                  }`}
                >
                  {ritual.title}
                </span>
              </div>
              <span className="text-[10px] text-zinc-400 font-mono shrink-0 pl-2">
                {ritual.time}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
