"use client";

import React, { useState, useEffect } from "react";
import { JournalEntry } from "./JournalTimelineRail";
import {
  Sparkles,
  Sun,
  Moon,
  Heart,
  Check,
  Zap,
  Coffee,
  CloudRain,
  Flame,
  Calendar,
} from "lucide-react";

interface DailyReflectionCanvasProps {
  entry: JournalEntry;
  onUpdateEntry: (updated: JournalEntry) => void;
}

export function DailyReflectionCanvas({
  entry,
  onUpdateEntry,
}: DailyReflectionCanvasProps) {
  const [title, setTitle] = useState(entry.title);
  const [morning, setMorning] = useState(entry.morningIntention);
  const [gratitudes, setGratitudes] = useState<string[]>(entry.gratitudes);
  const [evening, setEvening] = useState(entry.eveningReflection);
  const [mood, setMood] = useState(entry.mood);
  const [energy, setEnergy] = useState(entry.energyLevel);
  const [savedTime, setSavedTime] = useState<string>("Saved just now");

  useEffect(() => {
    setTitle(entry.title);
    setMorning(entry.morningIntention);
    setGratitudes(entry.gratitudes);
    setEvening(entry.eveningReflection);
    setMood(entry.mood);
    setEnergy(entry.energyLevel);
  }, [entry]);

  const handleGratitudeChange = (index: number, val: string) => {
    const next = [...gratitudes];
    next[index] = val;
    setGratitudes(next);
    triggerAutoSave({ ...entry, gratitudes: next });
  };

  const triggerAutoSave = (partial: Partial<JournalEntry>) => {
    const updated: JournalEntry = {
      ...entry,
      title,
      morningIntention: morning,
      gratitudes,
      eveningReflection: evening,
      mood,
      energyLevel: energy,
      ...partial,
    };
    onUpdateEntry(updated);
    setSavedTime("Saved just now");
  };

  const moods: { id: JournalEntry["mood"]; label: string; icon: string; bg: string }[] = [
    { id: "energized", label: "Energized", icon: "⚡", bg: "hover:bg-amber-50" },
    { id: "calm", label: "Calm & Centered", icon: "🧘", bg: "hover:bg-emerald-50" },
    { id: "focused", label: "Deep Focus", icon: "🎯", bg: "hover:bg-blue-50" },
    { id: "restful", label: "Restful", icon: "☕", bg: "hover:bg-purple-50" },
    { id: "thoughtful", label: "Reflective", icon: "🌧", bg: "hover:bg-zinc-100" },
  ];

  return (
    <div className="bg-white rounded-[28px] p-6 shadow-xs border border-zinc-200/50 flex flex-col justify-between min-h-[660px]">
      <div>
        {/* Canvas Header: Date + Auto-save indicator */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-zinc-100 gap-2">
          <div>
            <span className="text-xs font-semibold text-zinc-400 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>{entry.fullDate}</span>
            </span>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                triggerAutoSave({ title: e.target.value });
              }}
              placeholder="Give today's entry a title..."
              className="text-lg sm:text-xl font-bold text-zinc-900 tracking-tight bg-transparent focus:outline-none w-full mt-1 placeholder-zinc-300"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-zinc-400 font-medium flex items-center gap-1">
              <Check className="w-3 h-3 text-[#52c8b0] stroke-[3]" />
              <span>{savedTime}</span>
            </span>
          </div>
        </div>

        {/* Mood & Energy Selector Bar */}
        <div className="my-5 p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/60 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-zinc-700 uppercase tracking-wider text-[10px]">
              Today&apos;s Mindset:
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              {moods.map((m) => {
                const isSelected = mood === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => {
                      setMood(m.id);
                      triggerAutoSave({ mood: m.id });
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? "bg-white text-zinc-950 shadow-2xs border border-zinc-300 font-bold"
                        : "text-zinc-500 hover:text-zinc-900 bg-white/50"
                    }`}
                  >
                    <span>{m.icon}</span>
                    <span>{m.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Energy Rating Meter */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
              Energy:
            </span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((level) => (
                <button
                  key={level}
                  onClick={() => {
                    setEnergy(level);
                    triggerAutoSave({ energyLevel: level });
                  }}
                  className={`w-5 h-2 rounded-full transition-all cursor-pointer ${
                    level <= energy ? "bg-[#52c8b0]" : "bg-zinc-200"
                  }`}
                  title={`Energy level ${level}/5`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 3 Mindful Reflection Blocks */}
        <div className="space-y-5">
          {/* Block 1: Morning Intention */}
          <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/50">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900 mb-1.5">
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              <span>Morning Clarity & Intentions</span>
            </div>
            <p className="text-[11px] text-zinc-500 mb-2 font-normal">
              What is the one commitment or focus that will make today feel fulfilling?
            </p>
            <textarea
              rows={3}
              value={morning}
              onChange={(e) => {
                setMorning(e.target.value);
                triggerAutoSave({ morningIntention: e.target.value });
              }}
              placeholder="Write your morning intention..."
              className="w-full p-3 rounded-xl bg-white border border-amber-200/60 text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-200/50 resize-none font-medium leading-relaxed"
            />
          </div>

          {/* Block 2: 3 Moments of Gratitude */}
          <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/50">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 mb-1.5">
              <Heart className="w-3.5 h-3.5 text-emerald-500" />
              <span>Three Moments of Gratitude</span>
            </div>
            <p className="text-[11px] text-zinc-500 mb-2.5 font-normal">
              Small sensory pleasures, warm conversations, or creative moments:
            </p>

            <div className="space-y-2">
              {gratitudes.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleGratitudeChange(idx, e.target.value)}
                    placeholder={`Gratitude #${idx + 1}...`}
                    className="w-full px-3 py-1.5 rounded-xl bg-white border border-emerald-200/60 text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none font-medium"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Block 3: Evening Reflection & Letting Go */}
          <div className="p-4 rounded-2xl bg-indigo-50/40 border border-indigo-200/50">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-900 mb-1.5">
              <Moon className="w-3.5 h-3.5 text-indigo-500" />
              <span>Evening Wind-Down & What to Let Go</span>
            </div>
            <p className="text-[11px] text-zinc-500 mb-2 font-normal">
              What brought you joy today? What challenges can you gently release before sleeping?
            </p>
            <textarea
              rows={3}
              value={evening}
              onChange={(e) => {
                setEvening(e.target.value);
                triggerAutoSave({ eveningReflection: e.target.value });
              }}
              placeholder="Reflect on your evening thoughts..."
              className="w-full p-3 rounded-xl bg-white border border-indigo-200/60 text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-200/50 resize-none font-medium leading-relaxed"
            />
          </div>
        </div>
      </div>

      {/* Footer Quote */}
      <div className="mt-5 pt-3.5 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-400">
        <span>Mindful Journal Canvas</span>
        <span className="font-medium text-zinc-600">Sensus Reflection Vault</span>
      </div>
    </div>
  );
}
