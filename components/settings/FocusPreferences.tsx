"use client";

import React, { useState } from "react";
import { Sparkles, BellOff, Volume2, CalendarCheck, Check } from "lucide-react";

export function FocusPreferences() {
  const [focusDuration, setFocusDuration] = useState("45");
  const [breakDuration, setBreakDuration] = useState("10");
  const [dailyGoal, setDailyGoal] = useState("4");
  const [dndEnabled, setDndEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [autoLogCalendar, setAutoLogCalendar] = useState(true);
  const [saved, setSaved] = useState(false);

  const durations = [
    { value: "25", label: "25 mins", desc: "Short Sprint" },
    { value: "45", label: "45 mins", desc: "Deep Work (Default)" },
    { value: "60", label: "60 mins", desc: "Full Hour" },
    { value: "90", label: "90 mins", desc: "Flow State" },
  ];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="bg-white rounded-[28px] p-7 shadow-xs border border-zinc-200/50 flex flex-col gap-8">
      {/* Header */}
      <div className="pb-5 border-b border-zinc-100 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-zinc-900 tracking-tight">
            Focus Session & Productivity Defaults
          </h3>
          <p className="text-xs text-zinc-400 font-normal mt-0.5">
            Configure how your circular timer and focus periods behave.
          </p>
        </div>

        {saved && (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ebf8f2] text-[#22c55e] text-xs font-semibold animate-in fade-in">
            <Check className="w-3.5 h-3.5" />
            <span>Saved</span>
          </span>
        )}
      </div>

      {/* Focus Duration Selection */}
      <div>
        <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2">
          Default Focus Session Length
        </h4>
        <p className="text-xs text-zinc-400 mb-4">
          This sets the starting time on your Focus Session dashboard gauge.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {durations.map((d) => {
            const isSelected = focusDuration === d.value;
            return (
              <button
                key={d.value}
                onClick={() => setFocusDuration(d.value)}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? "border-zinc-900 bg-zinc-50 shadow-2xs"
                    : "border-zinc-200/70 hover:border-zinc-300 bg-white"
                }`}
              >
                <span className="block text-sm font-bold text-zinc-900">
                  {d.label}
                </span>
                <span className="block text-[11px] text-zinc-400 mt-0.5">
                  {d.desc}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Toggles List */}
      <div className="pt-5 border-t border-zinc-100 space-y-4">
        <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2">
          Automation & Distraction Control
        </h4>

        {/* Toggle 1: Do Not Disturb */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-zinc-50/70 border border-zinc-200/60">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
              <BellOff className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-900">
                Silence Notifications During Focus
              </p>
              <p className="text-[11px] text-zinc-400">
                Automatically mute Slack and workspace pings while timer is active.
              </p>
            </div>
          </div>

          <button
            onClick={() => setDndEnabled(!dndEnabled)}
            className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer p-0.5 shrink-0 ${
              dndEnabled ? "bg-[#52c8b0]" : "bg-zinc-200"
            }`}
          >
            <span
              className={`block w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                dndEnabled ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Toggle 2: Sound Chime */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-zinc-50/70 border border-zinc-200/60">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
              <Volume2 className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-900">
                Play Ambient Chime on Completion
              </p>
              <p className="text-[11px] text-zinc-400">
                A gentle bell tone rings when 45:00 completes.
              </p>
            </div>
          </div>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer p-0.5 shrink-0 ${
              soundEnabled ? "bg-[#52c8b0]" : "bg-zinc-200"
            }`}
          >
            <span
              className={`block w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                soundEnabled ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Toggle 3: Auto-log to Daily Planner */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-zinc-50/70 border border-zinc-200/60">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
              <CalendarCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-900">
                Log Completed Sessions in Activity Planner
              </p>
              <p className="text-[11px] text-zinc-400">
                Places a colored time block on your daily schedule timeline automatically.
              </p>
            </div>
          </div>

          <button
            onClick={() => setAutoLogCalendar(!autoLogCalendar)}
            className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer p-0.5 shrink-0 ${
              autoLogCalendar ? "bg-[#52c8b0]" : "bg-zinc-200"
            }`}
          >
            <span
              className={`block w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                autoLogCalendar ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Save Button */}
      <div className="pt-5 border-t border-zinc-100 flex items-center justify-end gap-3">
        <button
          onClick={handleSave}
          className="px-5 py-2 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-xs shadow-xs transition-all cursor-pointer"
        >
          Save Focus Settings
        </button>
      </div>
    </div>
  );
}
