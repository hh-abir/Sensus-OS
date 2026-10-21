"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, AlignJustify } from "lucide-react";

export function ScheduleCalendarCard() {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar");
  const [month, setMonth] = useState("Jan 2026");

  // Day columns
  const dayNames = ["S", "M", "T", "W", "T", "F", "S"];

  // Calendar dates matching the screenshot
  // Row 1: empty, 1, 2, 3, 4, 5, 6
  // Row 2: 7, 8, 9(amber), 10, 11, 12(teal), 13
  // Row 3: 14, 15, 16, 17, 18, 19, 20
  // Row 4: 21(teal), 22, 23, 24, 25(amber), 26, 27
  // Row 5: 28, 29, 30(teal), 31, dot, dot, dot

  const amberDays = [9, 25];
  const tealDays = [12, 21, 30];

  const calendarGrid = [
    { type: "empty" },
    { type: "day", num: 1 },
    { type: "day", num: 2 },
    { type: "day", num: 3 },
    { type: "day", num: 4 },
    { type: "day", num: 5 },
    { type: "day", num: 6 },

    { type: "day", num: 7 },
    { type: "day", num: 8 },
    { type: "day", num: 9 },
    { type: "day", num: 10 },
    { type: "day", num: 11 },
    { type: "day", num: 12 },
    { type: "day", num: 13 },

    { type: "day", num: 14 },
    { type: "day", num: 15 },
    { type: "day", num: 16 },
    { type: "day", num: 17 },
    { type: "day", num: 18 },
    { type: "day", num: 19 },
    { type: "day", num: 20 },

    { type: "day", num: 21 },
    { type: "day", num: 22 },
    { type: "day", num: 23 },
    { type: "day", num: 24 },
    { type: "day", num: 25 },
    { type: "day", num: 26 },
    { type: "day", num: 27 },

    { type: "day", num: 28 },
    { type: "day", num: 29 },
    { type: "day", num: 30 },
    { type: "day", num: 31 },
    { type: "placeholder" },
    { type: "placeholder" },
    { type: "placeholder" },
  ];

  return (
    <div className="bg-white rounded-[28px] p-6 shadow-xs border border-zinc-200/50 flex flex-col justify-between h-full">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-[15px] font-semibold text-zinc-900 tracking-tight">
          Upcoming Schedule
        </h3>
        <Link
          href="/calendar"
          className="text-xs text-zinc-400 hover:text-zinc-900 font-medium transition-colors cursor-pointer"
        >
          See all →
        </Link>
      </div>

      {/* Sub-header Controls */}
      <div className="flex items-center justify-between mt-3 mb-2.5">
        {/* Month selector pill */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-zinc-50 border border-zinc-200/60 rounded-xl text-xs font-medium text-zinc-800">
          <button
            onClick={() => setMonth("Dec 2025")}
            className="text-zinc-400 hover:text-zinc-700 cursor-pointer p-0.5"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] font-semibold tracking-tight">{month}</span>
          <button
            onClick={() => setMonth("Feb 2026")}
            className="text-zinc-400 hover:text-zinc-700 cursor-pointer p-0.5"
            aria-label="Next month"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* View Switchers */}
        <div className="flex items-center gap-2 text-zinc-400">
          <button
            onClick={() => setViewMode("calendar")}
            className={`p-1 rounded-md transition-colors cursor-pointer ${
              viewMode === "calendar" ? "text-zinc-800" : "hover:text-zinc-700"
            }`}
            aria-label="Calendar view"
          >
            <CalendarIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-1 rounded-md transition-colors cursor-pointer ${
              viewMode === "list" ? "text-zinc-800" : "hover:text-zinc-700"
            }`}
            aria-label="List view"
          >
            <AlignJustify className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Days of Week Header */}
      <div className="grid grid-cols-7 gap-1 text-center my-1.5">
        {dayNames.map((d, i) => (
          <span key={i} className="text-[11px] font-semibold text-zinc-400">
            {d}
          </span>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1.5 place-items-center">
        {calendarGrid.map((item, idx) => {
          if (item.type === "empty") {
            return <div key={idx} className="w-7 h-7" />;
          }

          if (item.type === "placeholder") {
            return (
              <div
                key={idx}
                className="w-6 h-6 rounded-full bg-zinc-100/90"
              />
            );
          }

          const dayNum = item.num!;
          const isAmber = amberDays.includes(dayNum);
          const isTeal = tealDays.includes(dayNum);
          const isSelected = selectedDay === dayNum;

          let badgeStyle =
            "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950 font-normal";

          if (isAmber) {
            badgeStyle = "bg-[#fcd34d] text-zinc-950 font-bold shadow-xs";
          } else if (isTeal) {
            badgeStyle = "bg-[#52c8b0] text-white font-bold shadow-xs";
          }

          return (
            <button
              key={idx}
              onClick={() => setSelectedDay(dayNum)}
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs transition-all cursor-pointer ${badgeStyle} ${
                isSelected && !isAmber && !isTeal
                  ? "ring-2 ring-zinc-900 font-bold"
                  : ""
              }`}
            >
              {dayNum}
            </button>
          );
        })}
      </div>
    </div>
  );
}
