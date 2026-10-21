"use client";

import React from "react";
import { Play, Sparkles, Clock, CloudRain, Coffee, Trees, Radio } from "lucide-react";
import { CalendarEvent } from "./CalendarScreen";
import { useFocus, SoundscapeType } from "../focus/FocusContext";

interface CalendarFocusQueueCardProps {
  events: CalendarEvent[];
}

export function CalendarFocusQueueCard({ events }: CalendarFocusQueueCardProps) {
  const { startFocus, setSoundscape } = useFocus();

  const focusEvents = events
    .filter((e) => e.isFocusSession && !e.completed)
    .slice(0, 3);

  const getSoundscapeIcon = (soundscape?: SoundscapeType) => {
    switch (soundscape) {
      case "rain":
        return <CloudRain className="w-3 h-3 text-[#52c8b0]" />;
      case "coffee":
        return <Coffee className="w-3 h-3 text-amber-600" />;
      case "forest":
        return <Trees className="w-3 h-3 text-emerald-600" />;
      case "vinyl":
        return <Radio className="w-3 h-3 text-purple-600" />;
      default:
        return <Sparkles className="w-3 h-3 text-zinc-400" />;
    }
  };

  const handleLaunch = (event: CalendarEvent) => {
    if (event.soundscape && event.soundscape !== "none") {
      setSoundscape(event.soundscape);
    }
    startFocus(event.title, 45);
  };

  return (
    <div className="bg-white rounded-[28px] p-6 shadow-xs border border-zinc-200/50 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between pb-3.5 border-b border-zinc-100">
          <div>
            <h4 className="text-sm font-bold text-zinc-900 tracking-tight">
              Focus Blocks Queue
            </h4>
            <p className="text-[11px] text-zinc-400">Scheduled 45m deep work windows</p>
          </div>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#eafaf5] text-[#2e9e80] border border-[#d1f2e6] font-mono">
            {focusEvents.length} Ready
          </span>
        </div>

        {/* Focus Blocks Stream */}
        <div className="space-y-2.5 mt-3.5">
          {focusEvents.length === 0 ? (
            <div className="py-8 text-center text-xs text-zinc-400">
              No upcoming focus sessions queued
            </div>
          ) : (
            focusEvents.map((evt) => (
              <div
                key={evt.id}
                className="p-3 rounded-2xl bg-zinc-50/70 border border-zinc-200/60 hover:bg-zinc-50 flex items-center justify-between gap-3 transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    {getSoundscapeIcon(evt.soundscape)}
                    <h5 className="text-xs font-bold text-zinc-900 truncate">
                      {evt.title}
                    </h5>
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-[10px] text-zinc-400 font-medium">
                    <span className="font-mono">{evt.startTime} – {evt.endTime}</span>
                    <span>•</span>
                    <span className="capitalize">{evt.sphere}</span>
                  </div>
                </div>

                {/* Soft Launch Button (No harsh black) */}
                <button
                  type="button"
                  onClick={() => handleLaunch(evt)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#edebe6] hover:bg-[#e4e1d7] text-zinc-800 border border-zinc-300/70 text-xs font-semibold shadow-2xs transition-all active:scale-95 cursor-pointer shrink-0"
                >
                  <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                  <span>Start</span>
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="pt-3 mt-3 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-400">
        <span>Procedural audio paired</span>
        <span className="text-zinc-600 font-medium">Web Audio engine active</span>
      </div>
    </div>
  );
}
