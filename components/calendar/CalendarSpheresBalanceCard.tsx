"use client";

import React from "react";
import { PieChart, Sparkles } from "lucide-react";

export function CalendarSpheresBalanceCard() {
  const spheres = [
    { label: "Creative Design", percent: 35, color: "bg-[#fcd34d]", text: "text-amber-800" },
    { label: "Academic Research", percent: 25, color: "bg-[#fef08a]", text: "text-yellow-800" },
    { label: "Tech & Maker IoT", percent: 20, color: "bg-[#52c8b0]", text: "text-emerald-800" },
    { label: "Social & Connection", percent: 10, color: "bg-[#93c5fd]", text: "text-blue-800" },
    { label: "Mind & Sanctuary", percent: 10, color: "bg-[#d8b4fe]", text: "text-purple-800" },
  ];

  return (
    <div className="bg-white rounded-[28px] p-6 shadow-xs border border-zinc-200/50 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between pb-3.5 border-b border-zinc-100">
          <div>
            <h4 className="text-sm font-bold text-zinc-900 tracking-tight">
              Life Spheres Balance
            </h4>
            <p className="text-[11px] text-zinc-400">Weekly energy distribution</p>
          </div>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-700 font-mono">
            Oct 19–25
          </span>
        </div>

        {/* Multi-segmented Proportional Horizon Bar */}
        <div className="w-full h-2.5 rounded-full overflow-hidden flex my-4 bg-zinc-100 p-0.5 gap-0.5">
          {spheres.map((s, idx) => (
            <div
              key={idx}
              className={`${s.color} h-full rounded-sm transition-all duration-300`}
              style={{ width: `${s.percent}%` }}
              title={`${s.label}: ${s.percent}%`}
            />
          ))}
        </div>

        {/* Breakdown List */}
        <div className="space-y-2 mt-2">
          {spheres.map((s, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between text-xs py-0.5"
            >
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${s.color} shrink-0`} />
                <span className="text-zinc-700 font-medium">{s.label}</span>
              </div>
              <span className="font-mono text-zinc-500 font-semibold text-[11px]">
                {s.percent}%
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-3 mt-3 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-500">
        <span className="text-emerald-700 font-medium flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>Balanced trajectory</span>
        </span>
        <span className="text-zinc-400">28.5 hrs total</span>
      </div>
    </div>
  );
}
