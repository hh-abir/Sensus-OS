"use client";

import React, { useState } from "react";
import { X, Calendar, Clock, Sparkles } from "lucide-react";
import { CalendarEvent } from "./CalendarScreen";
import { SoundscapeType } from "../focus/FocusContext";

interface CalendarEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Omit<CalendarEvent, "id">) => void;
  initialDate?: string;
}

export function CalendarEventModal({
  isOpen,
  onClose,
  onSave,
  initialDate = "2026-10-21",
}: CalendarEventModalProps) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(initialDate);
  const [timeSlot, setTimeSlot] = useState<"morning" | "focus" | "afternoon" | "evening">("focus");
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("11:30");
  const [sphere, setSphere] = useState<"creative" | "academic" | "maker" | "social" | "wellness">("creative");
  const [soundscape, setSoundscape] = useState<SoundscapeType>("rain");
  const [isFocusSession, setIsFocusSession] = useState(true);
  const [location, setLocation] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const dateObj = new Date(date + "T00:00:00");
    const dayIndex = dateObj.getDay();
    const daysMap: ("sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat")[] = [
      "sun",
      "mon",
      "tue",
      "wed",
      "thu",
      "fri",
      "sat",
    ];

    onSave({
      title: title.trim(),
      date,
      dayOfWeek: daysMap[dayIndex] || "wed",
      startTime,
      endTime,
      timeSlot,
      sphere,
      soundscape: isFocusSession ? soundscape : "none",
      isFocusSession,
      location: location.trim() || undefined,
      completed: false,
    });

    setTitle("");
    setLocation("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/25 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Floating Minimalist Dialog */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-[26px] shadow-xl border border-zinc-200/80 p-5 sm:p-6 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
          <h3 className="text-sm font-bold text-zinc-900 tracking-tight">
            Schedule Event
          </h3>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full hover:bg-zinc-100 flex items-center justify-center text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
          {/* Title */}
          <div>
            <input
              type="text"
              placeholder="What are you focusing on?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200/70 text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400 font-medium"
              autoFocus
              required
            />
          </div>

          {/* Date & Time Row */}
          <div className="grid grid-cols-2 gap-2.5 text-xs">
            <div>
              <label className="block text-[11px] font-semibold text-zinc-500 mb-1">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-200/70 text-xs text-zinc-800 focus:outline-none font-medium cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-zinc-500 mb-1">
                Time
              </label>
              <div className="flex items-center gap-1.5">
                <input
                  type="text"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  placeholder="10:00"
                  className="w-full px-2 py-2 rounded-xl bg-zinc-50 border border-zinc-200/70 text-xs text-zinc-800 font-mono text-center focus:outline-none font-medium"
                />
                <span className="text-zinc-400">–</span>
                <input
                  type="text"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  placeholder="11:30"
                  className="w-full px-2 py-2 rounded-xl bg-zinc-50 border border-zinc-200/70 text-xs text-zinc-800 font-mono text-center focus:outline-none font-medium"
                />
              </div>
            </div>
          </div>

          {/* Sphere & Horizon Row */}
          <div className="grid grid-cols-2 gap-2.5 text-xs">
            <div>
              <label className="block text-[11px] font-semibold text-zinc-500 mb-1">
                Life Sphere
              </label>
              <select
                value={sphere}
                onChange={(e) => setSphere(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-200/70 text-xs font-medium text-zinc-800 focus:outline-none cursor-pointer"
              >
                <option value="creative">🎨 Creative Design</option>
                <option value="academic">🎓 Academic Study</option>
                <option value="maker">🌿 Maker & Tech</option>
                <option value="social">☕ Social Connection</option>
                <option value="wellness">🍵 Mind & Wellness</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-zinc-500 mb-1">
                Rhythm Band
              </label>
              <select
                value={timeSlot}
                onChange={(e) => {
                  const val = e.target.value as any;
                  setTimeSlot(val);
                  if (val === "morning") { setStartTime("08:30"); setEndTime("09:30"); }
                  if (val === "focus") { setStartTime("10:00"); setEndTime("11:30"); }
                  if (val === "afternoon") { setStartTime("14:30"); setEndTime("16:00"); }
                  if (val === "evening") { setStartTime("18:00"); setEndTime("19:30"); }
                }}
                className="w-full px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-200/70 text-xs font-medium text-zinc-800 focus:outline-none cursor-pointer"
              >
                <option value="morning">🌅 Morning Dawn</option>
                <option value="focus">⚡ Deep Work</option>
                <option value="afternoon">☀️ Afternoon</option>
                <option value="evening">🌙 Evening</option>
              </select>
            </div>
          </div>

          {/* Soundscape & Focus Pairing (Single minimal line) */}
          <div className="p-2.5 rounded-xl bg-zinc-50/80 border border-zinc-200/60 flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 cursor-pointer font-medium text-zinc-700">
              <input
                type="checkbox"
                checked={isFocusSession}
                onChange={(e) => setIsFocusSession(e.target.checked)}
                className="w-3.5 h-3.5 rounded accent-zinc-700 cursor-pointer"
              />
              <span>Focus block with audio</span>
            </label>

            {isFocusSession && (
              <select
                value={soundscape}
                onChange={(e) => setSoundscape(e.target.value as SoundscapeType)}
                className="px-2 py-0.5 rounded-lg bg-white border border-zinc-200 text-xs font-medium text-zinc-700 focus:outline-none cursor-pointer"
              >
                <option value="rain">🌧 Rain</option>
                <option value="coffee">☕ Cafe</option>
                <option value="forest">🌲 Forest</option>
                <option value="vinyl">📻 Vinyl</option>
                <option value="none">Silence</option>
              </select>
            )}
          </div>

          {/* Location / Note (Single minimal line) */}
          <div>
            <input
              type="text"
              placeholder="Space or context (optional, e.g. Studio Desk)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-200/70 text-xs text-zinc-800 placeholder:text-zinc-400 focus:outline-none font-medium"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 text-xs font-medium text-zinc-600 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-full bg-[#edebe6] hover:bg-[#e2dfd5] text-zinc-800 border border-zinc-300/80 text-xs font-semibold shadow-2xs transition-all cursor-pointer"
            >
              Save Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
