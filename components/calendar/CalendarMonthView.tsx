"use client";

import React from "react";
import { Plus } from "lucide-react";
import { CalendarEvent } from "./CalendarScreen";

interface CalendarMonthViewProps {
  events: CalendarEvent[];
  selectedDate: string;
  onSelectDate: (date: string) => void;
  onOpenScheduler: (date?: string) => void;
}

export function CalendarMonthView({
  events,
  selectedDate,
  onSelectDate,
  onOpenScheduler,
}: CalendarMonthViewProps) {
  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Oct 2026 starts on Thursday (index 3 if Monday=0)
  // Let's create a 35-cell grid for October 2026
  const paddingDays = [null, null, null]; // Mon, Tue, Wed before Oct 1
  const daysInOctober = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="bg-white rounded-[28px] p-6 shadow-xs border border-zinc-200/50 flex flex-col w-full">
      {/* Day Names Row */}
      <div className="grid grid-cols-7 gap-2 pb-3 border-b border-zinc-100 text-center">
        {dayNames.map((d, i) => (
          <span
            key={i}
            className={`text-xs font-bold uppercase tracking-wider ${
              d === "Sat" || d === "Sun" ? "text-zinc-400" : "text-zinc-700"
            }`}
          >
            {d}
          </span>
        ))}
      </div>

      {/* Month Days Grid */}
      <div className="grid grid-cols-7 gap-2 mt-3">
        {/* Padding empty cells */}
        {paddingDays.map((_, i) => (
          <div
            key={`pad-${i}`}
            className="min-h-[96px] rounded-2xl bg-zinc-50/40 border border-zinc-100/60 p-2 opacity-30"
          />
        ))}

        {/* October Days 1 - 31 */}
        {daysInOctober.map((dayNum) => {
          const dateStr = `2026-10-${String(dayNum).padStart(2, "0")}`;
          const isToday = dateStr === "2026-10-21";
          const isSelected = selectedDate === dateStr;
          const dayEvents = events.filter((e) => e.date === dateStr);

          return (
            <div
              key={dateStr}
              onClick={() => onSelectDate(dateStr)}
              className={`min-h-[104px] p-2.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group/cell ${
                isToday
                  ? "bg-amber-50/40 border-amber-300 ring-1 ring-amber-300"
                  : isSelected
                  ? "bg-[#edebe6]/60 border-zinc-300 shadow-2xs"
                  : "bg-white hover:bg-zinc-50/70 border-zinc-200/70"
              }`}
            >
              {/* Day header */}
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-mono font-bold w-6 h-6 rounded-full flex items-center justify-center ${
                    isToday
                      ? "bg-amber-100 text-amber-950 border border-amber-300 font-bold"
                      : isSelected
                      ? "bg-[#edebe6] text-zinc-950 font-bold"
                      : "text-zinc-800"
                  }`}
                >
                  {dayNum}
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenScheduler(dateStr);
                  }}
                  className="opacity-0 group-hover/cell:opacity-100 w-5 h-5 rounded-full hover:bg-zinc-100 flex items-center justify-center text-zinc-400 hover:text-zinc-700 transition-opacity"
                  title="Add event"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>

              {/* Event Indicators */}
              <div className="space-y-1 mt-1.5 flex-1">
                {dayEvents.slice(0, 2).map((evt) => (
                  <div
                    key={evt.id}
                    className={`px-1.5 py-0.5 rounded text-[10px] font-semibold truncate leading-tight border ${
                      evt.sphere === "creative"
                        ? "bg-amber-50 text-amber-900 border-amber-200/60"
                        : evt.sphere === "academic"
                        ? "bg-yellow-50 text-yellow-900 border-yellow-200/60"
                        : evt.sphere === "maker"
                        ? "bg-emerald-50 text-emerald-900 border-emerald-200/60"
                        : evt.sphere === "social"
                        ? "bg-blue-50 text-blue-900 border-blue-200/60"
                        : "bg-purple-50 text-purple-900 border-purple-200/60"
                    }`}
                  >
                    {evt.title}
                  </div>
                ))}

                {dayEvents.length > 2 && (
                  <span className="text-[9px] font-bold text-zinc-400 pl-1">
                    +{dayEvents.length - 2} more
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
