"use client";

import React, { useState } from "react";
import {
  Plus,
  Search,
  Sparkles,
  Layers,
  GraduationCap,
  Palette,
  HeartPulse,
  Home,
  CheckCircle2,
  Clock,
} from "lucide-react";

export interface ProjectData {
  id: string;
  title: string;
  sphere: "Creative & Design" | "Academic & Research" | "Tech & Maker" | "Hobbies & Craft";
  status: "active" | "on_hold" | "completed";
  targetDate: string;
  progress: number;
  timeSpent: string;
  description: string;
  color: {
    accent: string;
    bg: string;
    text: string;
    border: string;
    ring: string;
  };
  milestones: { id: string; title: string; completed: boolean; date: string }[];
  tasks: { id: string; title: string; completed: boolean; priority: "high" | "medium" | "low" }[];
  vaultDocs: { id: string; name: string; type: string; size: string }[];
  weeklyActivity: { day: string; hours: number; label: string }[];
}

interface ProjectShelfProps {
  projects: ProjectData[];
  selectedProjectId: string;
  onSelectProject: (id: string) => void;
  onNewProject: () => void;
}

export function ProjectShelf({
  projects,
  selectedProjectId,
  onSelectProject,
  onNewProject,
}: ProjectShelfProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "active" | "on_hold">("all");

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sphere.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      activeFilter === "all" || p.status === activeFilter;
    return matchesSearch && matchesStatus;
  });

  const getSphereIcon = (sphere: ProjectData["sphere"]) => {
    switch (sphere) {
      case "Creative & Design":
        return Palette;
      case "Academic & Research":
        return GraduationCap;
      case "Tech & Maker":
        return Layers;
      case "Hobbies & Craft":
        return Sparkles;
    }
  };

  return (
    <div className="bg-white rounded-[28px] p-5 shadow-xs border border-zinc-200/50 flex flex-col justify-between h-full min-h-[640px]">
      <div>
        {/* Shelf Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
              Project Vault
            </span>
            <h3 className="text-base font-bold text-zinc-900 tracking-tight">
              Personal Spaces
            </h3>
          </div>

          <button
            onClick={onNewProject}
            className="w-8 h-8 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white flex items-center justify-center transition-transform active:scale-95 cursor-pointer shadow-xs"
            title="Create new project"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Search */}
        <div className="my-3.5">
          <div className="flex items-center gap-2 bg-zinc-50 border border-zinc-200/60 rounded-xl px-3 py-2 text-xs focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-400 transition-all">
            <Search className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
            <input
              type="text"
              placeholder="Find project space..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-xs w-full text-zinc-800 placeholder-zinc-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Filter Badges */}
        <div className="flex items-center gap-1 mb-3.5 pb-2 border-b border-zinc-100/80">
          {(
            [
              { id: "all", label: "All (6)" },
              { id: "active", label: "Active (4)" },
              { id: "on_hold", label: "On Hold (2)" },
            ] as const
          ).map((filter) => {
            const isActive = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#edebe6] text-zinc-900 font-bold"
                    : "text-zinc-400 hover:text-zinc-700 hover:bg-zinc-50"
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* Projects List Items */}
        <div className="space-y-2 overflow-y-auto max-h-[460px] pr-1 scrollbar-none">
          {filteredProjects.map((project) => {
            const isSelected = selectedProjectId === project.id;
            const Icon = getSphereIcon(project.sphere);

            return (
              <div
                key={project.id}
                onClick={() => onSelectProject(project.id)}
                className={`group p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? "bg-zinc-50 border-zinc-300 shadow-2xs ring-1 ring-zinc-300/80"
                    : "bg-white hover:bg-zinc-50/70 border-zinc-200/50"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  {/* Sphere Icon Avatar */}
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${project.color.bg} ${project.color.text} ${project.color.border}`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  {/* Project Info */}
                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-xs font-bold truncate ${
                        isSelected ? "text-zinc-950" : "text-zinc-800 group-hover:text-zinc-950"
                      }`}
                    >
                      {project.title}
                    </p>
                    <p className="text-[10px] text-zinc-400 font-medium truncate mt-0.5">
                      {project.sphere}
                    </p>
                  </div>
                </div>

                {/* Progress Pill */}
                <div className="flex flex-col items-end shrink-0 ml-2">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      project.progress >= 80
                        ? "bg-[#ebf8f2] text-[#22c55e]"
                        : project.progress >= 50
                        ? "bg-[#eff6ff] text-[#3b82f6]"
                        : "bg-[#fdeecb] text-[#d97706]"
                    }`}
                  >
                    {project.progress}%
                  </span>
                  <span className="text-[9px] text-zinc-400 mt-0.5">
                    {project.timeSpent}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Shelf Footer: Ambient Status */}
      <div className="mt-4 pt-3.5 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-400">
        <span className="flex items-center gap-1.5 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Sensus Life OS</span>
        </span>
        <span className="font-semibold text-zinc-700">18 Total Ventures</span>
      </div>
    </div>
  );
}
