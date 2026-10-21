"use client";

import React, { useState } from "react";
import { useFocus } from "../focus/FocusContext";
import {
  Check,
  Plus,
  Clock,
  Sparkles,
  LayoutGrid,
  Columns3,
  Search,
  Filter,
  ArrowRight,
  Sun,
  Flame,
  Inbox,
  AlertCircle,
  Calendar,
  Tag,
  ChevronDown,
  ChevronUp,
  X,
  ListPlus,
} from "lucide-react";

export interface TaskItem {
  id: string;
  title: string;
  project: string;
  column: "today" | "progress" | "backlog";
  quadrant: "do_first" | "schedule" | "quick_wins" | "someday";
  dueDate: string;
  priority: "high" | "medium" | "low";
  completed: boolean;
  timeEstimate: string;
  subtasks: { id: string; title: string; completed: boolean }[];
  notes?: string;
}

export function TasksScreen() {
  const [viewMode, setViewMode] = useState<"columns" | "matrix">("columns");
  const [selectedProject, setSelectedProject] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Task Creation Section State
  const [isCreatorExpanded, setIsCreatorExpanded] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newProject, setNewProject] = useState("🎨 UI Kit v2");
  const [newHorizon, setNewHorizon] = useState<"today" | "progress" | "backlog">("today");
  const [newPriority, setNewPriority] = useState<"high" | "medium" | "low">("high");
  const [newDueDate, setNewDueDate] = useState("Today • 14:00");
  const [newEstimate, setNewEstimate] = useState("45m");
  const [newNotes, setNewNotes] = useState("");
  const [subtaskInput, setSubtaskInput] = useState("");
  const [newSubtasks, setNewSubtasks] = useState<string[]>([]);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const projectsList = [
    "🎨 UI Kit v2",
    "🎓 HCI Thesis",
    "🌿 Smart Plant IoT",
    "☕ Pottery & Hobbies",
    "🌿 Personal & Wellness",
  ];

  const [tasks, setTasks] = useState<TaskItem[]>([
    {
      id: "t-1",
      title: "Design UI Kit & Tokens in Figma",
      project: "🎨 UI Kit v2",
      column: "today",
      quadrant: "do_first",
      dueDate: "Today • 14:00",
      priority: "high",
      completed: false,
      timeEstimate: "45m",
      subtasks: [
        { id: "st-1", title: "Audit hex values against WCAG AAA", completed: true },
        { id: "st-2", title: "Map light and dark semantic roles", completed: true },
        { id: "st-3", title: "Publish v2 tokens library", completed: false },
      ],
      notes: "Focus on color tokens and high contrast button states.",
    },
    {
      id: "t-2",
      title: "Draft Cognitive Psychology Chapter 4",
      project: "🎓 HCI Thesis",
      column: "today",
      quadrant: "schedule",
      dueDate: "Today • 16:30",
      priority: "high",
      completed: false,
      timeEstimate: "1.5h",
      subtasks: [
        { id: "st-4", title: "Synthesize user cohort quotes", completed: true },
        { id: "st-5", title: "Write conclusion on 45m deep work", completed: false },
      ],
    },
    {
      id: "t-3",
      title: "Morning Sun Salutations & Breathwork",
      project: "🌿 Personal & Wellness",
      column: "today",
      quadrant: "quick_wins",
      dueDate: "Today • 08:00",
      priority: "medium",
      completed: true,
      timeEstimate: "20m",
      subtasks: [
        { id: "st-6", title: "15m Vinyasa Flow", completed: true },
        { id: "st-7", title: "5m Box Breathing", completed: true },
      ],
    },
    {
      id: "t-4",
      title: "Solder ESP32 Soil Moisture Sensor",
      project: "🌿 Smart Plant IoT",
      column: "progress",
      quadrant: "schedule",
      dueDate: "Tomorrow • 10:00",
      priority: "medium",
      completed: false,
      timeEstimate: "1h",
      subtasks: [
        { id: "st-8", title: "Test 3.3V power regulator circuit", completed: true },
        { id: "st-9", title: "Flash MQTT telemetry firmware", completed: false },
      ],
    },
    {
      id: "t-5",
      title: "Mix Oatmeal & Matte Sage Pottery Glazes",
      project: "☕ Pottery & Hobbies",
      column: "progress",
      quadrant: "schedule",
      dueDate: "Friday • 16:30",
      priority: "medium",
      completed: false,
      timeEstimate: "45m",
      subtasks: [
        { id: "st-10", title: "Measure dry chemicals and colorants", completed: true },
        { id: "st-11", title: "Sieve glaze through 80-mesh screen", completed: false },
      ],
    },
    {
      id: "t-6",
      title: "Accessibility WCAG AAA Contrast Check",
      project: "🎨 UI Kit v2",
      column: "progress",
      quadrant: "do_first",
      dueDate: "Oct 24",
      priority: "high",
      completed: false,
      timeEstimate: "30m",
      subtasks: [
        { id: "st-12", title: "Run Stark plugin across dashboard frames", completed: false },
      ],
    },
    {
      id: "t-7",
      title: "Explore Ambient Soundscapes for Focus Timer",
      project: "🎨 UI Kit v2",
      column: "backlog",
      quadrant: "someday",
      dueDate: "Unscheduled",
      priority: "low",
      completed: false,
      timeEstimate: "30m",
      subtasks: [
        { id: "st-13", title: "Curate 3 royalty-free ambient audio loops", completed: false },
      ],
    },
    {
      id: "t-8",
      title: "Read Human-Computer Interaction Ch. 5",
      project: "🎓 HCI Thesis",
      column: "backlog",
      quadrant: "someday",
      dueDate: "Unscheduled",
      priority: "low",
      completed: false,
      timeEstimate: "1h",
      subtasks: [
        { id: "st-14", title: "Summarize cognitive load models", completed: false },
      ],
    },
  ]);

  // Handle adding subtask in creator
  const handleAddSubtaskItem = () => {
    if (!subtaskInput.trim()) return;
    setNewSubtasks((prev) => [...prev, subtaskInput.trim()]);
    setSubtaskInput("");
  };

  const handleRemoveSubtaskItem = (index: number) => {
    setNewSubtasks((prev) => prev.filter((_, i) => i !== index));
  };

  // Submit complete new task
  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    let quadrantVal: TaskItem["quadrant"] = "do_first";
    if (newHorizon === "today" && newPriority === "high") quadrantVal = "do_first";
    else if (newHorizon === "progress" || newPriority === "medium") quadrantVal = "schedule";
    else if (newPriority === "low" && newHorizon === "today") quadrantVal = "quick_wins";
    else quadrantVal = "someday";

    const createdTask: TaskItem = {
      id: `t-${Date.now()}`,
      title: newTitle.trim(),
      project: newProject,
      column: newHorizon,
      quadrant: quadrantVal,
      dueDate: newDueDate,
      priority: newPriority,
      completed: false,
      timeEstimate: newEstimate,
      notes: newNotes,
      subtasks: newSubtasks.map((st, idx) => ({
        id: `st-${Date.now()}-${idx}`,
        title: st,
        completed: false,
      })),
    };

    setTasks((prev) => [createdTask, ...prev]);

    // Reset Form
    setNewTitle("");
    setNewNotes("");
    setNewSubtasks([]);
    setIsCreatorExpanded(false);

    // Show feedback
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              completed: !t.completed,
              subtasks: t.subtasks.map((s) => ({
                ...s,
                completed: !t.completed,
              })),
            }
          : t
      )
    );
  };

  const handleToggleSubtask = (taskId: string, subtaskId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== taskId) return t;
        const updated = t.subtasks.map((s) =>
          s.id === subtaskId ? { ...s, completed: !s.completed } : s
        );
        const allDone = updated.length > 0 && updated.every((s) => s.completed);
        return {
          ...t,
          subtasks: updated,
          completed: allDone,
        };
      })
    );
  };

  const handleMoveTaskColumn = (taskId: string, targetCol: "today" | "progress" | "backlog") => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, column: targetCol } : t))
    );
  };

  const filteredTasks = tasks.filter((t) => {
    const matchesProject =
      selectedProject === "All" || t.project === selectedProject;
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.project.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesProject && matchesSearch;
  });

  return (
    <div className="w-full flex flex-col gap-6">
      {/* 1. Header & Controls Bar */}
      <div className="bg-white rounded-[28px] p-5 shadow-xs border border-zinc-200/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 tracking-tight">
            Tasks & Action Board
          </h2>
          <p className="text-xs text-zinc-400 font-normal mt-0.5">
            Plan, organize, and execute daily deliverables and life goals.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Project Filter */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-50 border border-zinc-200/60 rounded-xl text-xs font-semibold text-zinc-700">
            <Filter className="w-3.5 h-3.5 text-zinc-400" />
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="All">All Projects ({tasks.length})</option>
              {projectsList.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div className="flex items-center gap-2 bg-zinc-50 border border-zinc-200/60 rounded-full px-3.5 py-1.5 w-44 text-xs">
            <Search className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent w-full text-zinc-800 placeholder-zinc-400 focus:outline-none"
            />
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 bg-[#edebe6] p-1 rounded-full border border-zinc-200/40">
            <button
              onClick={() => setViewMode("columns")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                viewMode === "columns"
                  ? "bg-white text-zinc-900 shadow-xs"
                  : "text-zinc-500 hover:text-zinc-900"
              }`}
            >
              <Columns3 className="w-3.5 h-3.5" />
              <span>Horizons</span>
            </button>
            <button
              onClick={() => setViewMode("matrix")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                viewMode === "matrix"
                  ? "bg-white text-zinc-900 shadow-xs"
                  : "text-zinc-500 hover:text-zinc-900"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Matrix 2x2</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. DEDICATED FIRST-CLASS TASK CREATION SECTION (UX-FIRST) */}
      <div className="bg-white rounded-[28px] p-6 shadow-xs border border-zinc-200/60 relative overflow-hidden transition-all">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-gradient-to-br from-amber-100/40 to-emerald-50/30 blur-3xl pointer-events-none" />

        <form onSubmit={handleCreateTask} className="relative z-10 flex flex-col gap-4">
          {/* Top Line: Title Input + Fast Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="flex-1 flex items-center gap-2.5 bg-zinc-50/90 hover:bg-zinc-50 border border-zinc-200/70 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-zinc-900/10 focus-within:border-zinc-400 transition-all">
              <Plus className="w-4 h-4 text-zinc-400 shrink-0" />
              <input
                type="text"
                placeholder="What needs to be done? e.g. Record acoustic guitar demo take #2"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                onFocus={() => setIsCreatorExpanded(true)}
                className="bg-transparent text-xs sm:text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none w-full font-medium"
              />
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setIsCreatorExpanded(!isCreatorExpanded)}
                className="flex items-center gap-1.5 px-3.5 py-3 rounded-2xl border border-zinc-200/70 bg-white hover:bg-zinc-50 text-xs font-semibold text-zinc-700 transition-all cursor-pointer"
              >
                <span>{isCreatorExpanded ? "Less Details" : "Add Details"}</span>
                {isCreatorExpanded ? (
                  <ChevronUp className="w-3.5 h-3.5 text-zinc-400" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
                )}
              </button>

              <button
                type="submit"
                disabled={!newTitle.trim()}
                className="px-5 py-3 rounded-2xl bg-zinc-900 hover:bg-zinc-800 disabled:opacity-40 text-white font-semibold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Create Task</span>
              </button>
            </div>
          </div>

          {/* Quick Config Chips (Always visible) */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Horizon Selector */}
            <div className="flex items-center gap-1 bg-zinc-100 p-1 rounded-xl">
              {(
                [
                  { id: "today", label: "☀️ Today" },
                  { id: "progress", label: "🔥 In Progress" },
                  { id: "backlog", label: "📥 Backlog" },
                ] as const
              ).map((h) => (
                <button
                  type="button"
                  key={h.id}
                  onClick={() => setNewHorizon(h.id)}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer text-[11px] ${
                    newHorizon === h.id
                      ? "bg-white text-zinc-900 shadow-2xs"
                      : "text-zinc-500 hover:text-zinc-800"
                  }`}
                >
                  {h.label}
                </button>
              ))}
            </div>

            {/* Project Picker */}
            <select
              value={newProject}
              onChange={(e) => setNewProject(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-zinc-50 border border-zinc-200/70 text-zinc-700 font-semibold text-xs cursor-pointer focus:outline-none"
            >
              {projectsList.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>

            {/* Priority Picker */}
            <div className="flex items-center gap-1 bg-zinc-100 p-1 rounded-xl">
              {(
                [
                  { id: "high", label: "High", color: "text-red-600" },
                  { id: "medium", label: "Medium", color: "text-amber-700" },
                  { id: "low", label: "Low", color: "text-blue-600" },
                ] as const
              ).map((p) => (
                <button
                  type="button"
                  key={p.id}
                  onClick={() => setNewPriority(p.id)}
                  className={`px-2 py-1 rounded-lg font-bold transition-all cursor-pointer text-[10px] uppercase ${
                    newPriority === p.id
                      ? `bg-white shadow-2xs ${p.color}`
                      : "text-zinc-400 hover:text-zinc-700"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Duration Block */}
            <select
              value={newEstimate}
              onChange={(e) => setNewEstimate(e.target.value)}
              className="px-2.5 py-1.5 rounded-xl bg-zinc-50 border border-zinc-200/70 text-zinc-700 font-medium text-xs cursor-pointer focus:outline-none"
            >
              <option value="15m">⏱ 15m Sprint</option>
              <option value="30m">⏱ 30m</option>
              <option value="45m">⏱ 45m Focus Block</option>
              <option value="1h">⏱ 1 hour</option>
              <option value="1.5h">⏱ 1.5 hours</option>
            </select>
          </div>

          {/* Expanded Rich Details (Subtasks, Due Time, Notes) */}
          {isCreatorExpanded && (
            <div className="pt-4 mt-1 border-t border-zinc-100 grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-150">
              {/* Left Sub-column: Subtasks Checklist Builder */}
              <div>
                <label className="block text-xs font-bold text-zinc-800 mb-1.5 flex items-center gap-1.5">
                  <ListPlus className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Subtask Checklist Steps</span>
                </label>

                {/* Subtask input bar */}
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Add step... (e.g. Audit WCAG contrast)"
                    value={subtaskInput}
                    onChange={(e) => setSubtaskInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddSubtaskItem();
                      }
                    }}
                    className="flex-1 px-3 py-1.5 rounded-xl bg-zinc-50 border border-zinc-200/70 text-xs text-zinc-800 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddSubtaskItem}
                    className="px-3 py-1.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-xs font-semibold text-zinc-700 cursor-pointer"
                  >
                    Add Step
                  </button>
                </div>

                {/* Added subtasks tags */}
                {newSubtasks.length > 0 && (
                  <div className="space-y-1.5 max-h-28 overflow-y-auto pr-1">
                    {newSubtasks.map((st, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-2 rounded-xl bg-zinc-50 text-xs border border-zinc-200/50"
                      >
                        <span className="truncate text-zinc-700">
                          {i + 1}. {st}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveSubtaskItem(i)}
                          className="text-zinc-400 hover:text-zinc-700 p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Sub-column: Due Schedule & Context Notes */}
              <div className="flex flex-col gap-3">
                <div>
                  <label className="block text-xs font-bold text-zinc-800 mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-zinc-500" />
                    <span>Target Due Date / Time</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Today • 15:30 or Tomorrow morning"
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl bg-zinc-50 border border-zinc-200/70 text-xs text-zinc-800 focus:outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-800 mb-1.5">
                    Context / Scratch Notes (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Quick reference link or reminder notes..."
                    value={newNotes}
                    onChange={(e) => setNewNotes(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl bg-zinc-50 border border-zinc-200/70 text-xs text-zinc-800 focus:outline-none font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Success Toast */}
          {showSuccessToast && (
            <div className="p-2.5 rounded-xl bg-[#ebf8f2] text-[#22c55e] text-xs font-semibold flex items-center gap-2 animate-in fade-in">
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Task created and organized into your horizon board!</span>
            </div>
          )}
        </form>
      </div>

      {/* 3. MAIN WORKFLOW BOARD: Mode A: Full-Width 3-Column Horizon Board */}
      {viewMode === "columns" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {/* Column 1: Today's Focus (Amber Theme) */}
          <div className="bg-white rounded-[28px] p-5 shadow-xs border border-zinc-200/50 flex flex-col justify-between min-h-[520px]">
            <div>
              <div className="flex items-center justify-between pb-3.5 border-b border-zinc-100">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                    <Sun className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
                      Today&apos;s Focus
                    </h3>
                    <span className="text-[10px] text-zinc-400">Must-win deliverables today</span>
                  </div>
                </div>

                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200/60">
                  {filteredTasks.filter((t) => t.column === "today" && !t.completed).length} Pending
                </span>
              </div>

              <div className="space-y-3 mt-4">
                {filteredTasks
                  .filter((t) => t.column === "today")
                  .map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onToggle={() => handleToggleTask(task.id)}
                      onToggleSubtask={(subId) => handleToggleSubtask(task.id, subId)}
                      onMoveRight={() => handleMoveTaskColumn(task.id, "progress")}
                      currentColumn="today"
                    />
                  ))}
              </div>
            </div>
          </div>

          {/* Column 2: In Progress / This Week (Mint Theme) */}
          <div className="bg-white rounded-[28px] p-5 shadow-xs border border-zinc-200/50 flex flex-col justify-between min-h-[520px]">
            <div>
              <div className="flex items-center justify-between pb-3.5 border-b border-zinc-100">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                    <Flame className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
                      In Progress & Week
                    </h3>
                    <span className="text-[10px] text-zinc-400">Scheduled active items</span>
                  </div>
                </div>

                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60">
                  {filteredTasks.filter((t) => t.column === "progress" && !t.completed).length} Active
                </span>
              </div>

              <div className="space-y-3 mt-4">
                {filteredTasks
                  .filter((t) => t.column === "progress")
                  .map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onToggle={() => handleToggleTask(task.id)}
                      onToggleSubtask={(subId) => handleToggleSubtask(task.id, subId)}
                      onMoveLeft={() => handleMoveTaskColumn(task.id, "today")}
                      onMoveRight={() => handleMoveTaskColumn(task.id, "backlog")}
                      currentColumn="progress"
                    />
                  ))}
              </div>
            </div>
          </div>

          {/* Column 3: Someday & Backlog (Blue Theme) */}
          <div className="bg-white rounded-[28px] p-5 shadow-xs border border-zinc-200/50 flex flex-col justify-between min-h-[520px]">
            <div>
              <div className="flex items-center justify-between pb-3.5 border-b border-zinc-100">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                    <Inbox className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
                      Life Backlog & Ideas
                    </h3>
                    <span className="text-[10px] text-zinc-400">Future ventures & queue</span>
                  </div>
                </div>

                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200/60">
                  {filteredTasks.filter((t) => t.column === "backlog" && !t.completed).length} Queued
                </span>
              </div>

              <div className="space-y-3 mt-4">
                {filteredTasks
                  .filter((t) => t.column === "backlog")
                  .map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onToggle={() => handleToggleTask(task.id)}
                      onToggleSubtask={(subId) => handleToggleSubtask(task.id, subId)}
                      onMoveLeft={() => handleMoveTaskColumn(task.id, "progress")}
                      currentColumn="backlog"
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. MAIN WORKFLOW BOARD: Mode B: 2x2 Eisenhower Priority Matrix */}
      {viewMode === "matrix" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Quadrant 1: Urgent & Important */}
          <div className="bg-white rounded-[28px] p-5 shadow-xs border border-zinc-200/50 min-h-[360px]">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
                  1. Do First (Urgent & Important)
                </h3>
              </div>
              <span className="text-[11px] font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                High Impact
              </span>
            </div>

            <div className="space-y-3 mt-4">
              {filteredTasks
                .filter((t) => t.quadrant === "do_first")
                .map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onToggle={() => handleToggleTask(task.id)}
                    onToggleSubtask={(subId) => handleToggleSubtask(task.id, subId)}
                    currentColumn={task.column}
                  />
                ))}
            </div>
          </div>

          {/* Quadrant 2: Important, Not Urgent */}
          <div className="bg-white rounded-[28px] p-5 shadow-xs border border-zinc-200/50 min-h-[360px]">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#52c8b0]" />
                <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
                  2. Schedule (Strategic & Deep Work)
                </h3>
              </div>
              <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                Long-Term Growth
              </span>
            </div>

            <div className="space-y-3 mt-4">
              {filteredTasks
                .filter((t) => t.quadrant === "schedule")
                .map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onToggle={() => handleToggleTask(task.id)}
                    onToggleSubtask={(subId) => handleToggleSubtask(task.id, subId)}
                    currentColumn={task.column}
                  />
                ))}
            </div>
          </div>

          {/* Quadrant 3: Quick Wins */}
          <div className="bg-white rounded-[28px] p-5 shadow-xs border border-zinc-200/50 min-h-[360px]">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
                  3. Quick Wins (&lt; 15 mins Chores)
                </h3>
              </div>
              <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                Low Effort
              </span>
            </div>

            <div className="space-y-3 mt-4">
              {filteredTasks
                .filter((t) => t.quadrant === "quick_wins")
                .map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onToggle={() => handleToggleTask(task.id)}
                    onToggleSubtask={(subId) => handleToggleSubtask(task.id, subId)}
                    currentColumn={task.column}
                  />
                ))}
            </div>
          </div>

          {/* Quadrant 4: Someday */}
          <div className="bg-white rounded-[28px] p-5 shadow-xs border border-zinc-200/50 min-h-[360px]">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
                  4. Someday & Life Ideas
                </h3>
              </div>
              <span className="text-[11px] font-semibold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
                Backlog
              </span>
            </div>

            <div className="space-y-3 mt-4">
              {filteredTasks
                .filter((t) => t.quadrant === "someday")
                .map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onToggle={() => handleToggleTask(task.id)}
                    onToggleSubtask={(subId) => handleToggleSubtask(task.id, subId)}
                    currentColumn={task.column}
                  />
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Reusable Task Card Component
function TaskCard({
  task,
  onToggle,
  onToggleSubtask,
  onMoveLeft,
  onMoveRight,
  currentColumn,
}: {
  task: TaskItem;
  onToggle: () => void;
  onToggleSubtask: (subId: string) => void;
  onMoveLeft?: () => void;
  onMoveRight?: () => void;
  currentColumn: string;
}) {
  const { startFocus } = useFocus();
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`p-4 rounded-2xl border transition-all ${
        task.completed
          ? "bg-zinc-50/70 border-zinc-200/50 opacity-70"
          : "bg-white hover:bg-zinc-50/50 border-zinc-200/70 shadow-2xs hover:shadow-xs"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        {/* Checkbox and Title */}
        <div className="flex items-start gap-3 min-w-0 flex-1">
          <button
            onClick={onToggle}
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer shrink-0 mt-0.5 ${
              task.completed
                ? "bg-[#52c8b0] border-[#52c8b0] text-white"
                : "border-zinc-300 hover:border-zinc-400 bg-white"
            }`}
          >
            {task.completed && <Check className="w-3 h-3 stroke-[3]" />}
          </button>

          <div className="min-w-0 flex-1">
            <h4
              className={`text-xs font-bold leading-tight ${
                task.completed
                  ? "line-through text-zinc-400 font-normal"
                  : "text-zinc-900"
              }`}
            >
              {task.title}
            </h4>

            {/* Tags row */}
            <div className="flex flex-wrap items-center gap-1.5 mt-2">
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-700">
                {task.project}
              </span>
              <span className="text-[10px] text-zinc-400 font-medium flex items-center gap-1">
                <Clock className="w-2.5 h-2.5" />
                <span>{task.dueDate}</span>
              </span>
              <span className="text-[10px] text-zinc-400 font-medium">
                ~{task.timeEstimate}
              </span>
              {!task.completed && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    const duration = task.timeEstimate.includes("1.5")
                      ? 90
                      : task.timeEstimate.includes("1h")
                      ? 60
                      : task.timeEstimate.includes("30")
                      ? 30
                      : task.timeEstimate.includes("15")
                      ? 15
                      : 45;
                    startFocus(task.title, duration);
                  }}
                  className="flex items-center gap-1 text-[10px] font-semibold text-emerald-800 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100/80 px-2 py-0.5 rounded-md border border-emerald-200/50 transition-colors cursor-pointer"
                  title="Launch Focus Session for this task"
                >
                  <Sparkles className="w-2.5 h-2.5 text-emerald-600" />
                  <span>Focus</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Priority tag */}
        <span
          className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full shrink-0 ${
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

      {/* Subtasks expander */}
      {task.subtasks.length > 0 && (
        <div className="mt-3 pt-2.5 border-t border-zinc-100 text-xs">
          <div className="flex items-center justify-between text-[11px] font-semibold text-zinc-500 mb-1.5">
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-zinc-500 hover:text-zinc-800 font-semibold cursor-pointer"
            >
              {task.subtasks.filter((s) => s.completed).length}/
              {task.subtasks.length} Subtasks {expanded ? "▲" : "▼"}
            </button>

            {/* Quick Shift buttons */}
            <div className="flex items-center gap-1 text-[10px] text-zinc-400">
              {onMoveLeft && (
                <button
                  onClick={onMoveLeft}
                  className="px-2 py-0.5 rounded-md bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold"
                  title="Move to previous horizon"
                >
                  ←
                </button>
              )}
              {onMoveRight && (
                <button
                  onClick={onMoveRight}
                  className="px-2 py-0.5 rounded-md bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold"
                  title="Move to next horizon"
                >
                  →
                </button>
              )}
            </div>
          </div>

          {expanded && (
            <div className="space-y-1.5 mt-2 pl-1">
              {task.subtasks.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => onToggleSubtask(sub.id)}
                  className="w-full flex items-center gap-2 p-1 rounded-md hover:bg-zinc-50 text-left transition-colors cursor-pointer group"
                >
                  <span
                    className={`w-3.5 h-3.5 rounded-md flex items-center justify-center border transition-all shrink-0 ${
                      sub.completed
                        ? "bg-[#52c8b0] border-[#52c8b0] text-white"
                        : "border-zinc-300 group-hover:border-zinc-400 bg-white"
                    }`}
                  >
                    {sub.completed && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </span>
                  <span
                    className={`text-[11px] truncate ${
                      sub.completed ? "line-through text-zinc-400" : "text-zinc-700"
                    }`}
                  >
                    {sub.title}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
