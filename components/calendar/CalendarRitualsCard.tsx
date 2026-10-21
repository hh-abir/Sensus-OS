"use client";

import React, { useState } from "react";
import { Check, Sparkles } from "lucide-react";

interface RitualItem {
  id: string;
  title: string;
  time: string;
  sphere: string;
  completed: boolean;
}

export function CalendarRitualsCard() {
  const [rituals, setRituals] = useState<RitualItem[]>([
    { id: "r-1", title: "Morning Matcha & Stillness", time: "07:30 AM", sphere: "🍵 Mind", completed: true },
    { id: "r-2", title: "Figma UI Token Focus Sprint", time: "10:00 AM", sphere: "🎨 Design", completed: true },
    { id: "r-3", title: "Smart Plant IoT Telemetry", time: "05:00 PM", sphere: "🌿 Tech", completed: false },
    { id: "r-4", title: "Evening Journal Reflection", time: "09:30 PM", sphere: "📖 Sanctuary", completed: false },
  ]);

  const toggleRitual = (id: string) => {
    setRituals((prev) =>
      prev.map((r) => (r.id === id ? { ...r, completed: !r.completed } : r))
    );
  };

  const completedCount = rituals.filter((r) => r.completed).length;
  const progressPercent = Math.round((completedCount / rituals.length) * 100);

  return (
    <div className="bg-white rounded-[28px] p-6 shadow-xs border border-zinc-200/50 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between pb-3.5 border-b border-zinc-100">
          <div>
            <h4 className="text-sm font-bold text-zinc-900 tracking-tight">
              Mindful Rituals Loop
            </h4>
            <p className="text-[11px] text-zinc-400">Daily non-negotiable flow</p>
          </div>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-300/60 font-mono">
            {progressPercent}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-zinc-100 h-1.5 rounded-full overflow-hidden my-3.5">
          <div
            className="bg-[#52c8b0] h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
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

      <div className="pt-3 mt-3 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-400">
        <span>Rhythm completion</span>
        <span className="font-semibold text-zinc-700">{completedCount} of {rituals.length} done</span>
      </div>
    </div>
  );
}
