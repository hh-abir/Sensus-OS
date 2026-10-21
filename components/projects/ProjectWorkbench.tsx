"use client";

import React, { useState } from "react";
import { ProjectData } from "./ProjectShelf";
import {
  Sparkles,
  CheckCircle2,
  Clock,
  Plus,
  Check,
  Calendar,
  FileText,
  ExternalLink,
  Flame,
  ArrowUpRight,
  Bookmark,
} from "lucide-react";

interface ProjectWorkbenchProps {
  project: ProjectData;
  onToggleTask: (projectId: string, taskId: string) => void;
  onToggleMilestone: (projectId: string, milestoneId: string) => void;
  onAddTask: (projectId: string, title: string) => void;
  onStartFocus: (projectTitle: string) => void;
}

export function ProjectWorkbench({
  project,
  onToggleTask,
  onToggleMilestone,
  onAddTask,
  onStartFocus,
}: ProjectWorkbenchProps) {
  const [newTaskInput, setNewTaskInput] = useState("");

  const handleAddTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskInput.trim()) return;
    onAddTask(project.id, newTaskInput.trim());
    setNewTaskInput("");
  };

  const completedMilestones = project.milestones.filter((m) => m.completed).length;
  const completedTasks = project.tasks.filter((t) => t.completed).length;

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* 1. Project Studio Header Card */}
      <div className="bg-white rounded-[28px] p-6 shadow-xs border border-zinc-200/50 relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-gradient-to-br from-amber-100/50 via-blue-50/30 to-emerald-50/30 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="max-w-xl">
            <div className="flex items-center gap-2">
              <span
                className={`px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${project.color.bg} ${project.color.text} ${project.color.border}`}
              >
                {project.sphere}
              </span>
              <span className="text-xs text-zinc-400 font-medium flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>Target: {project.targetDate}</span>
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight mt-2">
              {project.title}
            </h2>
            <p className="text-xs sm:text-[13px] text-zinc-500 font-normal mt-1 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Action Button & Quick Stats */}
          <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-3 shrink-0">
            <button
              onClick={() => onStartFocus(project.title)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 active:scale-98 text-white font-semibold text-xs shadow-xs transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Launch 45m Focus</span>
            </button>

            <div className="flex items-center gap-2 text-[11px] font-medium text-zinc-500">
              <span className="px-2.5 py-1 rounded-xl bg-zinc-50 border border-zinc-200/60 text-zinc-800 font-semibold">
                {project.progress}% Complete
              </span>
              <span className="px-2.5 py-1 rounded-xl bg-zinc-50 border border-zinc-200/60 text-zinc-600">
                {project.timeSpent} focused
              </span>
            </div>
          </div>
        </div>

        {/* Global Project Progress Bar */}
        <div className="mt-5 pt-4 border-t border-zinc-100 flex items-center gap-3">
          <div className="flex-1 h-2 bg-zinc-100 rounded-full overflow-hidden">
            <div
              className={`h-full ${project.color.accent} rounded-full transition-all duration-500`}
              style={{ width: `${project.progress}%` }}
            />
          </div>
          <span className="text-xs font-bold text-zinc-800 shrink-0">
            {completedMilestones}/{project.milestones.length} Milestones
          </span>
        </div>
      </div>

      {/* 2. Three Basecamp Tool Cards (Horizontal side-by-side workbench) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
        {/* Tool Card 1: Milestone Roadmap */}
        <div className="bg-white rounded-[28px] p-5 shadow-xs border border-zinc-200/50 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
                  Roadmap & Stepper
                </h4>
              </div>
              <span className="text-[10px] font-semibold text-zinc-400">
                {completedMilestones}/{project.milestones.length}
              </span>
            </div>

            {/* Stepper Timeline */}
            <div className="mt-4 space-y-3.5 relative before:absolute before:left-3 before:top-2 before:bottom-3 before:w-0.5 before:bg-zinc-100">
              {project.milestones.map((m, idx) => (
                <div
                  key={m.id}
                  onClick={() => onToggleMilestone(project.id, m.id)}
                  className="group flex items-start gap-3 relative z-10 cursor-pointer"
                >
                  <button
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border transition-all shrink-0 ${
                      m.completed
                        ? "bg-[#52c8b0] text-white border-[#52c8b0] shadow-2xs"
                        : "bg-white border-zinc-300 group-hover:border-zinc-400 text-zinc-500"
                    }`}
                  >
                    {m.completed ? (
                      <Check className="w-3 h-3 stroke-[3]" />
                    ) : (
                      idx + 1
                    )}
                  </button>

                  <div className="min-w-0 flex-1 pt-0.5">
                    <p
                      className={`text-xs font-semibold leading-tight ${
                        m.completed
                          ? "line-through text-zinc-400"
                          : "text-zinc-900 group-hover:text-zinc-950"
                      }`}
                    >
                      {m.title}
                    </p>
                    <span className="text-[10px] text-zinc-400 font-medium block mt-0.5">
                      {m.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-100 text-[11px] text-zinc-400 text-center">
            Click step to toggle completion
          </div>
        </div>

        {/* Tool Card 2: Action Items & To-Dos */}
        <div className="bg-white rounded-[28px] p-5 shadow-xs border border-zinc-200/50 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
                  Action Checklist
                </h4>
              </div>
              <span className="text-[10px] font-semibold text-zinc-400">
                {completedTasks}/{project.tasks.length} Done
              </span>
            </div>

            {/* Quick Add Input */}
            <form onSubmit={handleAddTaskSubmit} className="mt-3.5 mb-2">
              <div className="flex items-center gap-1.5 bg-zinc-50 border border-zinc-200/70 rounded-xl px-2.5 py-1.5">
                <Plus className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Add task to project..."
                  value={newTaskInput}
                  onChange={(e) => setNewTaskInput(e.target.value)}
                  className="bg-transparent text-xs w-full text-zinc-800 placeholder-zinc-400 focus:outline-none"
                />
              </div>
            </form>

            {/* Checklist */}
            <div className="space-y-2 mt-2 max-h-[220px] overflow-y-auto scrollbar-none pr-1">
              {project.tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => onToggleTask(project.id, task.id)}
                  className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-zinc-50 transition-all cursor-pointer group"
                >
                  <button
                    className={`w-4 h-4 rounded-md flex items-center justify-center border transition-all shrink-0 ${
                      task.completed
                        ? "bg-[#52c8b0] border-[#52c8b0] text-white"
                        : "border-zinc-300 group-hover:border-zinc-400 bg-white"
                    }`}
                  >
                    {task.completed && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </button>

                  <span
                    className={`text-xs flex-1 truncate ${
                      task.completed
                        ? "line-through text-zinc-400"
                        : "text-zinc-800 font-medium group-hover:text-zinc-950"
                    }`}
                  >
                    {task.title}
                  </span>

                  <span
                    className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-md shrink-0 ${
                      task.priority === "high"
                        ? "bg-red-50 text-red-600"
                        : task.priority === "medium"
                        ? "bg-amber-50 text-amber-700"
                        : "bg-blue-50 text-blue-600"
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-500">
            <span>Priority Queue</span>
            <span className="font-semibold text-zinc-800">
              {project.tasks.filter((t) => !t.completed).length} Pending
            </span>
          </div>
        </div>

        {/* Tool Card 3: Pinned Notes & Vault Specs */}
        <div className="bg-white rounded-[28px] p-5 shadow-xs border border-zinc-200/50 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
                  Vault Specs & Links
                </h4>
              </div>
              <span className="text-[10px] font-semibold text-zinc-400">
                {project.vaultDocs.length} Pinned
              </span>
            </div>

            {/* Documents List */}
            <div className="space-y-2.5 mt-3.5">
              {project.vaultDocs.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => alert(`Opening ${doc.name} from Vault`)}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-50 hover:bg-zinc-100/80 border border-zinc-200/60 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <div className="w-7 h-7 rounded-lg bg-white border border-zinc-200/80 flex items-center justify-center font-bold text-[9px] text-zinc-700 shrink-0 shadow-2xs">
                      {doc.type}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-zinc-900 group-hover:text-zinc-950 truncate">
                        {doc.name}
                      </p>
                      <span className="text-[10px] text-zinc-400 font-medium">
                        {doc.size}
                      </span>
                    </div>
                  </div>

                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-800 transition-colors shrink-0 ml-2" />
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => alert("Add specification or link dialog")}
            className="mt-4 pt-3 border-t border-zinc-100 w-full flex items-center justify-center gap-1.5 text-xs font-semibold text-zinc-700 hover:text-zinc-950 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Pin Spec or Link</span>
          </button>
        </div>
      </div>

      {/* 3. Bottom Horizontal Ribbon: Weekly Focus Activity for this Project */}
      <div className="bg-white rounded-[28px] p-5 shadow-xs border border-zinc-200/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
            <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
              This Week&apos;s Focus Log
            </h4>
          </div>
          <p className="text-xs text-zinc-400 font-normal mt-0.5">
            Dedicated deep-work sessions logged for this project
          </p>
        </div>

        {/* Days Ribbon */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto scrollbar-none py-1">
          {project.weeklyActivity.map((act, i) => (
            <div
              key={i}
              className={`flex flex-col items-center justify-center px-3 py-2 rounded-2xl border min-w-[62px] transition-all ${
                act.hours > 0
                  ? "bg-[#eafaf5] border-[#d1f2e6] text-zinc-900 shadow-2xs"
                  : "bg-zinc-50 border-zinc-200/50 text-zinc-400"
              }`}
            >
              <span className="text-[10px] font-bold uppercase">{act.day}</span>
              <span className="text-xs font-extrabold mt-0.5">
                {act.hours > 0 ? `${act.hours}h` : "—"}
              </span>
              <span className="text-[9px] text-zinc-400 truncate max-w-[50px] mt-0.5">
                {act.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
