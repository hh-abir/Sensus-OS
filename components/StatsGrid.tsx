"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";

interface StatItem {
  id: string;
  title: string;
  value: number | string;
  badge: {
    label: string;
    type: "positive" | "negative" | "neutral";
  };
}

export function StatsGrid() {
  const stats: StatItem[] = [
    {
      id: "active_projects",
      title: "Active Projects",
      value: "18",
      badge: {
        label: "+5% increase",
        type: "positive",
      },
    },
    {
      id: "tasks_completed",
      title: "Tasks Completed",
      value: "34",
      badge: {
        label: "+12% increase",
        type: "positive",
      },
    },
    {
      id: "in_review",
      title: "In Review",
      value: "8",
      badge: {
        label: "-2% change",
        type: "negative",
      },
    },
    {
      id: "on_hold",
      title: "On Hold",
      value: "3",
      badge: {
        label: "No change",
        type: "neutral",
      },
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3.5 h-full">
      {stats.map((stat) => {
        let badgeColors = "bg-[#ebf8f2] text-[#22c55e]";
        if (stat.badge.type === "negative") {
          badgeColors = "bg-[#fdeeed] text-[#f87171]";
        } else if (stat.badge.type === "neutral") {
          badgeColors = "bg-[#f4f4f5] text-[#71717a]";
        }

        return (
          <div
            key={stat.id}
            className="group bg-white rounded-[26px] p-5 shadow-xs border border-zinc-200/50 flex flex-col justify-between hover:border-zinc-300/80 transition-all cursor-pointer"
          >
            {/* Card Header */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-700 tracking-tight">
                {stat.title}
              </span>
              <div className="w-6 h-6 rounded-full bg-zinc-100 group-hover:bg-zinc-200/70 text-zinc-400 group-hover:text-zinc-800 flex items-center justify-center transition-colors">
                <ArrowUpRight className="w-3 h-3" />
              </div>
            </div>

            {/* Big Stat Number */}
            <div className="my-2.5">
              <span className="text-3xl font-bold tracking-tight text-zinc-900">
                {stat.value}
              </span>
            </div>

            {/* Change Tag */}
            <div>
              <span
                className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-tight ${badgeColors}`}
              >
                {stat.badge.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
