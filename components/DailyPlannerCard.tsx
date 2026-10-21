"use client";

import React, { useState } from "react";
import { ChevronDown, Clock } from "lucide-react";

export function DailyPlannerCard() {
  const [selectedDate, setSelectedDate] = useState("April 19, 2025");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const timeSlots = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];

  const dates = ["April 19, 2025", "April 20, 2025", "April 21, 2025"];

  return (
    <div className="bg-white rounded-[28px] p-6 shadow-xs border border-zinc-200/50 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[15px] font-semibold text-zinc-900 tracking-tight">
          Daily Activity Planner
        </h3>

        {/* Date Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowDatePicker(!showDatePicker)}
            className="flex items-center gap-1.5 px-3 py-1 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200/60 rounded-full text-xs font-medium text-zinc-700 transition-colors cursor-pointer"
          >
            <span>{selectedDate}</span>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
          </button>

          {showDatePicker && (
            <div className="absolute right-0 mt-1.5 w-40 bg-white rounded-xl shadow-lg border border-zinc-100 py-1 z-30">
              {dates.map((d) => (
                <button
                  key={d}
                  onClick={() => {
                    setSelectedDate(d);
                    setShowDatePicker(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs hover:bg-zinc-50 ${
                    d === selectedDate
                      ? "font-semibold text-zinc-950 bg-zinc-50"
                      : "text-zinc-600"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Timeline Container (horizontal scrollable on mobile, fluid on desktop) */}
      <div className="overflow-x-auto pb-2 pt-1 scrollbar-none">
        <div className="min-w-[650px] relative">
          {/* Time markers row */}
          <div className="grid grid-cols-10 text-[11px] font-semibold text-zinc-400 mb-2">
            {timeSlots.map((time, idx) => (
              <div key={idx} className="text-left pl-1">
                {time}
              </div>
            ))}
          </div>

          {/* Dotted vertical guidelines and event tracks */}
          <div className="relative h-28 border-t border-zinc-100 pt-1">
            {/* 10 Vertical dashed column lines */}
            <div className="absolute inset-0 grid grid-cols-10 pointer-events-none">
              {timeSlots.map((_, idx) => (
                <div
                  key={idx}
                  className="border-l border-dashed border-zinc-200/70 h-full"
                />
              ))}
            </div>

            {/* Event 1: Team Huddle (Amber / Yellow) */}
            {/* Position: approx 08:30 to 10:45 (starts ~5% from left, width ~23%) */}
            <div
              className="absolute top-2 left-[5.5%] w-[23%] bg-[#fde68a] hover:bg-[#fcd34d] rounded-2xl p-2.5 shadow-xs transition-all cursor-pointer flex items-center gap-2.5 z-10"
              title="Team Huddle • 08:30"
            >
              {/* Overlapping Avatars */}
              <div className="flex -space-x-2 shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                  alt="Attendee"
                  className="w-6 h-6 rounded-full border-2 border-white object-cover shadow-xs"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                  alt="Attendee"
                  className="w-6 h-6 rounded-full border-2 border-white object-cover shadow-xs"
                />
              </div>

              {/* Event Info */}
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-zinc-900 truncate">
                  Team Huddle
                </p>
                <p className="text-[10px] text-zinc-700 flex items-center gap-1 font-medium">
                  <Clock className="w-2.5 h-2.5" />
                  <span>08:30</span>
                </p>
              </div>
            </div>

            {/* Event 2: Review Design (Soft Blue) */}
            {/* Position: approx 10:00 to 12:45 (starts ~22% from left, lower row ~top-14, width ~22%) */}
            <div
              className="absolute top-15 left-[22%] w-[22%] bg-[#bfdbfe] hover:bg-[#93c5fd] rounded-2xl p-2.5 shadow-xs transition-all cursor-pointer flex items-center gap-2.5 z-10"
              title="Review Design • 10:00"
            >
              {/* Overlapping Avatars */}
              <div className="flex -space-x-2 shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
                  alt="Attendee"
                  className="w-6 h-6 rounded-full border-2 border-white object-cover shadow-xs"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80"
                  alt="Attendee"
                  className="w-6 h-6 rounded-full border-2 border-white object-cover shadow-xs"
                />
              </div>

              {/* Event Info */}
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-zinc-900 truncate">
                  Review Design
                </p>
                <p className="text-[10px] text-zinc-700 flex items-center gap-1 font-medium">
                  <Clock className="w-2.5 h-2.5" />
                  <span>10:00</span>
                </p>
              </div>
            </div>

            {/* Event 3: Project Retrospective (Mint / Teal) */}
            {/* Position: approx 13:00 to 15:45 (starts ~55% from left, top-3, width ~24%) */}
            <div
              className="absolute top-3 left-[54%] w-[24%] bg-[#a7f3d0] hover:bg-[#6ee7b7] rounded-2xl p-2.5 shadow-xs transition-all cursor-pointer flex items-center gap-2.5 z-10"
              title="Project Retrospective • 13:00"
            >
              {/* Overlapping Avatars */}
              <div className="flex -space-x-2 shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="Attendee"
                  className="w-6 h-6 rounded-full border-2 border-white object-cover shadow-xs"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                  alt="Attendee"
                  className="w-6 h-6 rounded-full border-2 border-white object-cover shadow-xs"
                />
              </div>

              {/* Event Info */}
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-zinc-900 truncate">
                  Project Retrospective
                </p>
                <p className="text-[10px] text-zinc-700 flex items-center gap-1 font-medium">
                  <Clock className="w-2.5 h-2.5" />
                  <span>13:00</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
