"use client";

import React from "react";
import { Clock, Plus, Check, MapPin, Play } from "lucide-react";
import { CalendarEvent } from "./CalendarScreen";
import { useFocus } from "../focus/FocusContext";

interface CalendarDayAgendaProps {
  selectedDate: string; // "2026-10-21"
  events: CalendarEvent[];
  onOpenScheduler: (date?: string) => void;
  onToggleEventComplete: (id: string) => void;
}

export function CalendarDayAgenda({
  selectedDate,
  events,
  onOpenScheduler,
  onToggleEventComplete,
}: CalendarDayAgendaProps) {
  const { startFocus, setSoundscape } = useFocus();

  const dayEvents = events
    .filter((e) => e.date === selectedDate)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  // Format date display
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
    <div className="bg-white rounded-[28px] p-6 shadow-xs border border-zinc-200/50 flex flex-col justify-between h-full">
      {/* Day Header */}
      <div>
        <div className="flex items-start justify-between pb-4 border-b border-zinc-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                {dayName}
              </span>
              {isToday && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-300/70">
                  Today
                </span>
              )}
            </div>
            <h3 className="text-xl font-bold text-zinc-900 tracking-tight mt-1">
              {monthDay}, 2026
            </h3>
          </div>

          <button
            onClick={() => onOpenScheduler(selectedDate)}
            className="w-8 h-8 rounded-full bg-[#edebe6] hover:bg-[#e4e1d7] text-zinc-800 border border-zinc-300/70 flex items-center justify-center transition-all cursor-pointer shadow-2xs"
            title="Schedule Event"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Day Events Stream */}
        <div className="mt-4 space-y-2.5">
          <div className="flex items-center justify-between text-xs font-semibold text-zinc-500">
            <span>Day Agenda</span>
            <span>{dayEvents.length} {dayEvents.length === 1 ? "Item" : "Items"}</span>
          </div>

          {dayEvents.length === 0 ? (
            <div className="py-10 text-center bg-zinc-50/70 rounded-2xl border border-dashed border-zinc-200/80">
              <p className="text-xs font-medium text-zinc-500">No events scheduled for this day</p>
              <button
                onClick={() => onOpenScheduler(selectedDate)}
                className="mt-2 text-[11px] font-bold text-zinc-800 hover:underline cursor-pointer"
              >
                + Add to day schedule
              </button>
            </div>
          ) : (
            dayEvents.map((evt) => (
              <div
                key={evt.id}
                className={`p-3 rounded-2xl border transition-all ${
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

                  {/* Soft Focus Button */}
                  {evt.isFocusSession && !evt.completed && (
                    <button
                      onClick={() => handleLaunchFocus(evt)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#edebe6] hover:bg-[#e4e1d7] text-zinc-800 border border-zinc-300/70 text-[10px] font-bold shadow-2xs transition-transform active:scale-95 cursor-pointer shrink-0"
                      title="Start 45m Focus Session"
                    >
                      <Play className="w-2.5 h-2.5 fill-current ml-0.2" />
                      <span>Focus</span>
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Footer subtle tip */}
      <div className="pt-3 mt-4 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-400">
        <span>Click any event to toggle completion</span>
        <span className="font-mono">{dayEvents.filter(e => e.completed).length}/{dayEvents.length} done</span>
      </div>
    </div>
  );
}
