"use client";

import React, { useState } from "react";
import {
  Calendar,
  Flame,
  Search,
  Sparkles,
  BookOpen,
  Plus,
  Sun,
  Moon,
  Coffee,
  Check,
} from "lucide-react";

export interface JournalEntry {
  id: string;
  dateString: string;
  dayOfWeek: string;
  fullDate: string;
  mood: "energized" | "calm" | "focused" | "restful" | "thoughtful";
  title: string;
  summary: string;
  morningIntention: string;
  gratitudes: string[];
  eveningReflection: string;
  photoUrl?: string;
  energyLevel: number;
}

interface JournalTimelineRailProps {
  entries: JournalEntry[];
  selectedEntryId: string;
  onSelectEntry: (id: string) => void;
  onNewEntry: () => void;
  streakDays: number;
}

export function JournalTimelineRail({
  entries,
  selectedEntryId,
  onSelectEntry,
  onNewEntry,
  streakDays,
}: JournalTimelineRailProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [moodFilter, setMoodFilter] = useState<string>("all");

  const getMoodEmoji = (mood: JournalEntry["mood"]) => {
    switch (mood) {
      case "energized":
        return "⚡";
      case "calm":
        return "🧘";
      case "focused":
        return "🎯";
      case "restful":
        return "☕";
      case "thoughtful":
        return "🌧";
    }
  };

  const getMoodBadge = (mood: JournalEntry["mood"]) => {
    switch (mood) {
      case "energized":
        return "bg-amber-50 text-amber-800 border-amber-200/60";
      case "calm":
        return "bg-emerald-50 text-emerald-800 border-emerald-200/60";
      case "focused":
        return "bg-blue-50 text-blue-800 border-blue-200/60";
      case "restful":
        return "bg-purple-50 text-purple-800 border-purple-200/60";
      case "thoughtful":
        return "bg-zinc-100 text-zinc-700 border-zinc-200/60";
    }
  };

  const filteredEntries = entries.filter((e) => {
    const matchesSearch =
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.dateString.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMood = moodFilter === "all" || e.mood === moodFilter;
    return matchesSearch && matchesMood;
  });

  return (
    <div className="bg-white rounded-[28px] p-5 shadow-xs border border-zinc-200/50 flex flex-col justify-between h-full min-h-[660px]">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
              Personal Diary
            </span>
            <h3 className="text-base font-bold text-zinc-900 tracking-tight">
              Life Journal
            </h3>
          </div>

          <button
            onClick={onNewEntry}
            className="w-8 h-8 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white flex items-center justify-center transition-transform active:scale-95 cursor-pointer shadow-xs"
            title="Write today's reflection"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Streak Ribbon Card */}
        <div className="my-3.5 p-3 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50/60 border border-amber-200/50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-300 text-zinc-900 flex items-center justify-center font-bold text-sm shadow-2xs">
              <Flame className="w-4 h-4 fill-amber-500 text-amber-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-900">
                {streakDays} Days Consistency
              </p>
              <p className="text-[10px] text-zinc-500 font-medium">
                Reflecting daily since Oct 10
              </p>
            </div>
          </div>
          <span className="text-[11px] font-bold text-amber-700 bg-white/80 px-2 py-0.5 rounded-lg border border-amber-200/40">
            Streak 🔥
          </span>
        </div>

        {/* Search */}
        <div className="mb-3">
          <div className="flex items-center gap-2 bg-zinc-50 border border-zinc-200/60 rounded-xl px-3 py-2 text-xs">
            <Search className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
            <input
              type="text"
              placeholder="Search reflections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent w-full text-zinc-800 placeholder-zinc-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Entries Feed */}
        <div className="space-y-2 overflow-y-auto max-h-[380px] scrollbar-none pr-1">
          {filteredEntries.map((entry) => {
            const isSelected = selectedEntryId === entry.id;

            return (
              <div
                key={entry.id}
                onClick={() => onSelectEntry(entry.id)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-zinc-50 border-zinc-300 shadow-2xs ring-1 ring-zinc-300/80"
                    : "bg-white hover:bg-zinc-50/70 border-zinc-200/50"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{getMoodEmoji(entry.mood)}</span>
                    <div>
                      <span className="text-xs font-bold text-zinc-900 block leading-tight">
                        {entry.dayOfWeek}, {entry.dateString}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full border ${getMoodBadge(
                      entry.mood
                    )}`}
                  >
                    {entry.mood}
                  </span>
                </div>

                <p className="text-xs font-semibold text-zinc-800 mt-2 truncate">
                  {entry.title}
                </p>
                <p className="text-[11px] text-zinc-400 line-clamp-1 mt-0.5">
                  {entry.summary}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Rail Footer */}
      <div className="mt-4 pt-3.5 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-400">
        <span>Mindful Journaling</span>
        <span className="font-semibold text-zinc-700">October 2026</span>
      </div>
    </div>
  );
}
