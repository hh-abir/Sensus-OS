"use client";

import React from "react";
import {
  Clock,
  Sparkles,
  Play,
  Plus,
  Sun,
  Flame,
  Moon,
  Check,
  MapPin,
} from "lucide-react";
import { CalendarEvent } from "./CalendarScreen";
import { useFocus } from "../focus/FocusContext";

interface CalendarWeekViewProps {
  events: CalendarEvent[];
  selectedDate: string;
  onSelectDate: (date: string) => void;
  onOpenScheduler: (date?: string) => void;
  onToggleEventComplete: (id: string) => void;
}

export function CalendarWeekView({
  events,
  selectedDate,
  onSelectDate,
  onOpenScheduler,
  onToggleEventComplete,
}: CalendarWeekViewProps) {
  const { startFocus, setSoundscape } = useFocus();

  // Current Week Days (Oct 19 - Oct 25, 2026)
  const weekDays = [
    { name: "Mon", dateStr: "2026-10-19", dayNum: 19 },
    { name: "Tue", dateStr: "2026-10-20", dayNum: 20 },
    { name: "Wed", dateStr: "2026-10-21", dayNum: 21, isToday: true },
    { name: "Thu", dateStr: "2026-10-22", dayNum: 22 },
    { name: "Fri", dateStr: "2026-10-23", dayNum: 23 },
    { name: "Sat", dateStr: "2026-10-24", dayNum: 24, isWeekend: true },
    { name: "Sun", dateStr: "2026-10-25", dayNum: 25, isWeekend: true },
  ];

  const horizons = [
    {
      id: "morning",
      label: "Morning Dawn",
      hours: "07:00 – 10:00",
      icon: Sun,
      iconColor: "text-amber-500",
      bgTint: "bg-amber-50/20",
    },
    {
      id: "focus",
      label: "Deep Work Sprint",
      hours: "10:00 – 14:00",
      icon: Flame,
      iconColor: "text-emerald-600",
      bgTint: "bg-emerald-50/20",
    },
    {
      id: "afternoon",
      label: "Afternoon Collab",
      hours: "14:00 – 17:00",
      icon: Clock,
      iconColor: "text-blue-500",
      bgTint: "bg-blue-50/20",
    },
    {
      id: "evening",
      label: "Evening Sanctuary",
      hours: "17:00 – 21:00",
      icon: Moon,
      iconColor: "text-purple-500",
      bgTint: "bg-purple-50/20",
    },
  ] as const;

  const handleLaunchFocus = (e: React.MouseEvent, event: CalendarEvent) => {
    e.stopPropagation();
    if (event.soundscape && event.soundscape !== "none") {
      setSoundscape(event.soundscape);
    }
    startFocus(event.title, 45);
  };

  return (
    <div className="bg-white rounded-[28px] p-5 sm:p-6 shadow-xs border border-zinc-200/50 flex flex-col w-full overflow-hidden">
      {/* Week Horizon Grid Container */}
      <div className="overflow-x-auto scrollbar-none pb-2">
        <div className="min-w-[840px] grid grid-cols-7 gap-3">
          {weekDays.map((day) => {
            const isSelected = selectedDate === day.dateStr;
            const dayEvents = events.filter((e) => e.date === day.dateStr);

            return (
              <div
                key={day.dateStr}
                className={`flex flex-col rounded-2xl transition-all ${
                  isSelected
                    ? "bg-[#edebe6]/50 ring-1.5 ring-zinc-900/15"
                    : "bg-transparent"
                }`}
              >
                {/* Day Header Button */}
                <button
                  type="button"
                  onClick={() => onSelectDate(day.dateStr)}
                  className={`w-full py-2.5 px-2 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer border ${
                    day.isToday
                      ? "bg-[#fffbeb] text-amber-950 border-2 border-amber-400/90 shadow-2xs font-bold"
                      : isSelected
                      ? "bg-white text-zinc-950 border-zinc-300 shadow-2xs font-bold"
                      : "bg-zinc-50/70 hover:bg-zinc-100 text-zinc-700 border-zinc-200/60"
                  }`}
                >
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider ${
                      day.isToday ? "text-amber-800" : "text-zinc-400"
                    }`}
                  >
                    {day.name}
                  </span>
                  <span className="text-sm font-black font-mono tracking-tight mt-0.5">
                    {day.dayNum}
                  </span>
                </button>

                {/* Horizons Stack for this Day */}
                <div className="mt-3 flex flex-col gap-2.5 flex-1">
                  {horizons.map((horizon) => {
                    const horizonEvents = dayEvents.filter(
                      (e) => e.timeSlot === horizon.id
                    );

                    return (
                      <div
                        key={horizon.id}
                        className={`p-2 rounded-xl border border-dashed border-zinc-200/70 min-h-[92px] flex flex-col justify-between transition-colors relative group/slot ${horizon.bgTint}`}
                      >
                        {/* Horizon Slot Tag (visible on empty or hover) */}
                        <div className="flex items-center justify-between text-[9px] text-zinc-400 font-semibold mb-1">
                          <span className="truncate">{horizon.label.split(" ")[0]}</span>
                          <button
                            type="button"
                            onClick={() => onOpenScheduler(day.dateStr)}
                            className="opacity-0 group-hover/slot:opacity-100 w-4 h-4 rounded-full bg-[#edebe6] hover:bg-[#e4e1d7] text-zinc-700 border border-zinc-300/60 flex items-center justify-center transition-opacity cursor-pointer shadow-2xs"
                            title={`Add event in ${horizon.label}`}
                          >
                            <Plus className="w-2.5 h-2.5" />
                          </button>
                        </div>

                        {/* Events inside this horizon slot */}
                        <div className="space-y-1.5 flex-1 flex flex-col justify-start">
                          {horizonEvents.map((evt) => {
                            const isCreative = evt.sphere === "creative";
                            const isAcademic = evt.sphere === "academic";
                            const isMaker = evt.sphere === "maker";
                            const isSocial = evt.sphere === "social";

                            return (
                              <div
                                key={evt.id}
                                onClick={() => onSelectDate(day.dateStr)}
                                className={`p-2 rounded-xl border transition-all cursor-pointer relative group/card ${
                                  evt.completed
                                    ? "bg-zinc-100/70 border-zinc-200 text-zinc-400 opacity-60"
                                    : isCreative
                                    ? "bg-amber-50/90 hover:bg-amber-100/80 border-amber-200/70 text-amber-950 shadow-2xs"
                                    : isAcademic
                                    ? "bg-yellow-50/90 hover:bg-yellow-100/80 border-yellow-200/70 text-yellow-950 shadow-2xs"
                                    : isMaker
                                    ? "bg-[#eafaf5] hover:bg-[#d8f5ec] border-[#c0eedf] text-emerald-950 shadow-2xs"
                                    : isSocial
                                    ? "bg-blue-50/90 hover:bg-blue-100/80 border-blue-200/70 text-blue-950 shadow-2xs"
                                    : "bg-purple-50/90 hover:bg-purple-100/80 border-purple-200/70 text-purple-950 shadow-2xs"
                                }`}
                              >
                                <div className="flex items-start justify-between gap-1">
                                  <p className="text-[11px] font-bold leading-snug line-clamp-2 flex-1">
                                    {evt.title}
                                  </p>

                                  {/* Quick Check toggle */}
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onToggleEventComplete(evt.id);
                                    }}
                                    className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 cursor-pointer ${
                                      evt.completed
                                        ? "bg-emerald-600 border-emerald-600 text-white"
                                        : "border-zinc-400 bg-white/70"
                                    }`}
                                  >
                                    {evt.completed && (
                                      <Check className="w-2 h-2 stroke-[3]" />
                                    )}
                                  </button>
                                </div>

                                <div className="mt-1 flex items-center justify-between text-[9px] font-medium text-zinc-500">
                                  <span className="font-mono">{evt.startTime}</span>

                                  {/* Launch Focus Button */}
                                  {evt.isFocusSession && !evt.completed && (
                                    <button
                                      type="button"
                                      onClick={(e) => handleLaunchFocus(e, evt)}
                                      className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-white hover:bg-zinc-100 text-zinc-800 border border-zinc-200/90 text-[9px] font-bold shadow-2xs cursor-pointer"
                                      title="Launch Focus Session"
                                    >
                                      <Play className="w-2 h-2 fill-current" />
                                      <span>Focus</span>
                                    </button>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
