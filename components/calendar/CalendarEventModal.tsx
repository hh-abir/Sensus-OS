"use client";

import React, { useState } from "react";
import {
  X,
  Calendar,
  Clock,
  Sparkles,
  MapPin,
  Tag,
  Headphones,
  Check,
} from "lucide-react";
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
  const [location, setLocation] = useState("Figma / Desk");
  const [notes, setNotes] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    // Determine day of week
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
      soundscape,
      isFocusSession,
      location: location.trim() || undefined,
      notes: notes.trim() || undefined,
      completed: false,
    });

    setTitle("");
    setNotes("");
    onClose();
  };

  const sphereOptions = [
    { id: "creative", label: "🎨 Creative & Design", color: "text-amber-800 bg-amber-50" },
    { id: "academic", label: "🎓 Academic & Study", color: "text-yellow-800 bg-yellow-50" },
    { id: "maker", label: "🌿 Tech & Maker", color: "text-emerald-800 bg-emerald-50" },
    { id: "social", label: "☕ Social & Coffee", color: "text-blue-800 bg-blue-50" },
    { id: "wellness", label: "🍵 Mind & Wellness", color: "text-purple-800 bg-purple-50" },
  ] as const;

  const timeSlotOptions = [
    { id: "morning", label: "🌅 Morning Dawn (07:00 – 10:00)", defaultStart: "08:30", defaultEnd: "09:30" },
    { id: "focus", label: "⚡ Deep Work Sprint (10:00 – 14:00)", defaultStart: "10:00", defaultEnd: "11:30" },
    { id: "afternoon", label: "☀️ Afternoon Collab (14:00 – 17:00)", defaultStart: "14:30", defaultEnd: "16:00" },
    { id: "evening", label: "🌙 Evening Sanctuary (17:00 – 21:00)", defaultStart: "18:00", defaultEnd: "19:30" },
  ] as const;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/35 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-lg bg-white rounded-[28px] shadow-2xl border border-zinc-200/80 p-6 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3.5 border-b border-zinc-100">
          <div>
            <h3 className="text-sm font-bold text-zinc-900 tracking-tight">
              Schedule Event
            </h3>
            <p className="text-[11px] text-zinc-400 font-normal">
              Add to your day rhythm
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full hover:bg-zinc-100 flex items-center justify-center text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-zinc-800 mb-1">
              Event / Focus Title
            </label>
            <input
              type="text"
              placeholder="e.g. Design Tokens Spec Review or Pottery Studio"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200/80 text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 font-medium"
              autoFocus
              required
            />
          </div>

          {/* Date & Time Slot Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-zinc-800 mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                <span>Date</span>
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-200/80 text-xs text-zinc-900 focus:outline-none font-medium cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-800 mb-1 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-zinc-400" />
                <span>Start – End Time</span>
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  placeholder="10:00"
                  className="w-full px-2.5 py-2 rounded-xl bg-zinc-50 border border-zinc-200/80 text-xs text-zinc-900 font-mono text-center focus:outline-none font-medium"
                />
                <span className="text-zinc-400 text-xs">–</span>
                <input
                  type="text"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  placeholder="11:30"
                  className="w-full px-2.5 py-2 rounded-xl bg-zinc-50 border border-zinc-200/80 text-xs text-zinc-900 font-mono text-center focus:outline-none font-medium"
                />
              </div>
            </div>
          </div>

          {/* Rhythm Time Slot */}
          <div>
            <label className="block text-xs font-bold text-zinc-800 mb-1">
              Rhythm Horizon
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {timeSlotOptions.map((opt) => (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() => {
                    setTimeSlot(opt.id);
                    setStartTime(opt.defaultStart);
                    setEndTime(opt.defaultEnd);
                  }}
                  className={`px-2.5 py-1.5 rounded-xl text-left border text-[11px] font-semibold transition-all cursor-pointer ${
                    timeSlot === opt.id
                      ? "border-amber-300 bg-[#fffbeb] text-amber-950 font-bold shadow-2xs"
                      : "border-zinc-200/70 bg-zinc-50 hover:bg-zinc-100 text-zinc-700"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sphere Category */}
          <div>
            <label className="block text-xs font-bold text-zinc-800 mb-1 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-zinc-400" />
              <span>Life Sphere</span>
            </label>
            <div className="flex flex-wrap gap-1.5">
              {sphereOptions.map((s) => (
                <button
                  type="button"
                  key={s.id}
                  onClick={() => setSphere(s.id)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    sphere === s.id
                      ? "border-zinc-400 bg-white shadow-2xs font-bold text-zinc-900 ring-1 ring-zinc-300"
                      : "border-zinc-200/60 bg-zinc-50 text-zinc-600 hover:bg-zinc-100"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Focus Block & Soundscape Pairing */}
          <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/70 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <input
                type="checkbox"
                id="isFocus"
                checked={isFocusSession}
                onChange={(e) => setIsFocusSession(e.target.checked)}
                className="w-4 h-4 rounded text-zinc-900 accent-zinc-900 cursor-pointer"
              />
              <label htmlFor="isFocus" className="text-xs font-semibold text-zinc-800 cursor-pointer">
                <span>Enable Web Audio Focus Pairing</span>
                <span className="block text-[10px] text-zinc-400 font-normal">
                  Adds 1-click Focus launch button with ambient noise
                </span>
              </label>
            </div>

            {isFocusSession && (
              <select
                value={soundscape}
                onChange={(e) => setSoundscape(e.target.value as SoundscapeType)}
                className="px-2.5 py-1 rounded-xl bg-white border border-zinc-200 text-xs font-semibold text-zinc-700 cursor-pointer focus:outline-none"
              >
                <option value="rain">🌧 Rain</option>
                <option value="coffee">☕ Cafe</option>
                <option value="forest">🌲 Forest</option>
                <option value="vinyl">📻 Vinyl</option>
                <option value="none">🔇 Pure Silence</option>
              </select>
            )}
          </div>

          {/* Location & Notes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                <span>Space / Context</span>
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Desk, Cafe, Lab, Studio..."
                className="w-full px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-200/80 text-xs text-zinc-800 focus:outline-none font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1">
                Quick Note
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Key outcome or agenda..."
                className="w-full px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-200/80 text-xs text-zinc-800 focus:outline-none font-medium"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-3 border-t border-zinc-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 text-xs font-medium text-zinc-600 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-full bg-[#edebe6] hover:bg-[#e4e1d7] text-zinc-800 border border-zinc-300/80 text-xs font-semibold shadow-2xs transition-all cursor-pointer"
            >
              Add to Schedule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
