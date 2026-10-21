"use client";

import React, { useState } from "react";
import { JournalTimelineRail, JournalEntry } from "./JournalTimelineRail";
import { DailyReflectionCanvas } from "./DailyReflectionCanvas";
import { JournalSidebarCard } from "./JournalSidebarCard";

export function JournalScreen() {
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: "j-1",
      dateString: "Oct 21",
      dayOfWeek: "Wed",
      fullDate: "Wednesday, October 21, 2026",
      mood: "focused",
      energyLevel: 4,
      title: "Flow state on design tokens & pottery glaze anticipation",
      summary: "Woke up early with clear focus. Designing tokens feels natural...",
      morningIntention: "Dedicate two uninterrupted 45m focus blocks to the token hierarchy before touching emails.",
      gratitudes: [
        "Warm morning light filtering through the studio blinds.",
        "Smooth feedback from Maya on the Sensus design tokens.",
        "Delicious pour-over coffee in the newly thrown ceramic mug.",
      ],
      eveningReflection: "Felt calm and productive throughout the day. Need to remember to step away from screens around 8 PM for evening reading.",
    },
    {
      id: "j-2",
      dateString: "Oct 20",
      dayOfWeek: "Tue",
      fullDate: "Tuesday, October 20, 2026",
      mood: "calm",
      energyLevel: 4,
      title: "Clay trimming footrings & thesis chapter flow",
      summary: "Spent 2 hours in the ceramics studio trimming stoneware mugs...",
      morningIntention: "Practice patience with the clay handles and review thesis chapter 4 feedback.",
      gratitudes: [
        "The tactile rhythm of the pottery wheel.",
        "A peaceful walk along the river trail at dusk.",
        "Prof. Harrison's constructive thesis annotations.",
      ],
      eveningReflection: "Physical craft is such an essential counterweight to digital screen work. Slept deeply.",
    },
    {
      id: "j-3",
      dateString: "Oct 19",
      dayOfWeek: "Mon",
      fullDate: "Monday, October 19, 2026",
      mood: "energized",
      energyLevel: 5,
      title: "Monday kickoff: Clean desk, fresh tea, big roadmap",
      summary: "Organized the week's goals. Excited about the Smart Plant IoT boards...",
      morningIntention: "Set an intentional weekly rhythm and avoid context-switching.",
      gratitudes: [
        "A quiet, distraction-free morning home desk.",
        "Peppermint tea with wildflower honey.",
        "Receiving the PCB fabrication tracking number from JLCPCB.",
      ],
      eveningReflection: "Great velocity today. Completed 6 tasks without feeling rushed.",
    },
    {
      id: "j-4",
      dateString: "Oct 18",
      dayOfWeek: "Sun",
      fullDate: "Sunday, October 18, 2026",
      mood: "restful",
      energyLevel: 3,
      title: "Slow Sunday: Farmers market and watercolor sketching",
      summary: "No screens until late afternoon. Restorative cooking session...",
      morningIntention: "Allow the day to unfold without rigid schedules.",
      gratitudes: [
        "Fresh local sourdough and heirloom tomatoes.",
        "Loose watercolor sketches in the sketchbook.",
        "An afternoon nap with sunlight on the rug.",
      ],
      eveningReflection: "Completely recharged for the week ahead.",
    },
  ]);

  const [selectedEntryId, setSelectedEntryId] = useState<string>("j-1");

  const selectedEntry =
    entries.find((e) => e.id === selectedEntryId) || entries[0];

  const handleUpdateEntry = (updated: JournalEntry) => {
    setEntries((prev) =>
      prev.map((e) => (e.id === updated.id ? updated : e))
    );
  };

  const handleNewEntry = () => {
    const todayStr = "Today, Oct 22";
    const newE: JournalEntry = {
      id: `j-${Date.now()}`,
      dateString: "Oct 22",
      dayOfWeek: "Thu",
      fullDate: "Thursday, October 22, 2026",
      mood: "calm",
      energyLevel: 4,
      title: "Morning reflections and new day intentions",
      summary: "Fresh entry started...",
      morningIntention: "Begin the morning with mindfulness.",
      gratitudes: [
        "Fresh air and a clear mind.",
        "A good night's rest.",
        "Another day to learn and build.",
      ],
      eveningReflection: "Reflecting on today's progress.",
    };

    setEntries((prev) => [newE, ...prev]);
    setSelectedEntryId(newE.id);
  };

  return (
    <div className="w-full">
      {/* 3-Column Mindful Diary Layout:
          1. Timeline Rail (Left)
          2. Reflection Canvas (Center)
          3. Photo & Quote Sanctuary (Right)
      */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start animate-in fade-in duration-200">
        {/* Left: Chronological Diary Rail (~3 cols) */}
        <div className="lg:col-span-3 w-full">
          <JournalTimelineRail
            entries={entries}
            selectedEntryId={selectedEntryId}
            onSelectEntry={setSelectedEntryId}
            onNewEntry={handleNewEntry}
            streakDays={12}
          />
        </div>

        {/* Center: Open Reflection Notebook Canvas (~6 cols) */}
        <div className="lg:col-span-6 w-full">
          {selectedEntry && (
            <DailyReflectionCanvas
              entry={selectedEntry}
              onUpdateEntry={handleUpdateEntry}
            />
          )}
        </div>

        {/* Right: Snapshot Memory & Mindfulness Sidebar (~3 cols) */}
        <div className="lg:col-span-3 w-full">
          <JournalSidebarCard />
        </div>
      </div>
    </div>
  );
}
