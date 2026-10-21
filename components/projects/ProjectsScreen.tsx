"use client";

import React, { useState } from "react";
import { ProjectShelf, ProjectData } from "./ProjectShelf";
import { ProjectWorkbench } from "./ProjectWorkbench";
import { useFocus } from "../focus/FocusContext";

export function ProjectsScreen() {
  const { startFocus } = useFocus();
  const [projects, setProjects] = useState<ProjectData[]>([
    {
      id: "p-1",
      title: "Sensus Design System & UI Kit v2",
      sphere: "Creative & Design",
      status: "active",
      targetDate: "Nov 15, 2026",
      progress: 78,
      timeSpent: "18.5h",
      description: "Crafting accessible design tokens, semantic components, and responsive dashboard templates for personal workflows.",
      color: {
        accent: "bg-[#52c8b0]",
        bg: "bg-[#eafaf5]",
        text: "text-[#2e9e80]",
        border: "border-[#d1f2e6]",
        ring: "ring-[#52c8b0]",
      },
      milestones: [
        { id: "m-1", title: "Semantic color tokens & dark roles", completed: true, date: "Completed Oct 12" },
        { id: "m-2", title: "Responsive dashboard layouts", completed: true, date: "Completed Oct 18" },
        { id: "m-3", title: "Accessible typography & contrast audit", completed: true, date: "Completed Yesterday" },
        { id: "m-4", title: "Publish v2 tokens library to community vault", completed: false, date: "Target Nov 15" },
      ],
      tasks: [
        { id: "t-1", title: "Audit hex values against WCAG AAA", completed: true, priority: "high" },
        { id: "t-2", title: "Map light and dark semantic roles", completed: true, priority: "medium" },
        { id: "t-3", title: "Build responsive layout documentation", completed: false, priority: "high" },
        { id: "t-4", title: "Export SVG icons and token variables", completed: false, priority: "low" },
      ],
      vaultDocs: [
        { id: "d-1", name: "Design System 2.0 Spec.fig", type: "FIG", size: "24.5 MB" },
        { id: "d-2", name: "Token Architecture & Semantics.md", type: "MD", size: "1.4 MB" },
        { id: "d-3", name: "Accessibility Audit Findings.pdf", type: "PDF", size: "8.1 MB" },
      ],
      weeklyActivity: [
        { day: "Mon", hours: 2.5, label: "Tokens" },
        { day: "Tue", hours: 3.0, label: "Specs" },
        { day: "Wed", hours: 1.5, label: "Contrast" },
        { day: "Thu", hours: 4.0, label: "Layouts" },
        { day: "Fri", hours: 2.0, label: "Vault" },
      ],
    },
    {
      id: "p-2",
      title: "Smart Plant IoT Sensor & Web Dashboard",
      sphere: "Tech & Maker",
      status: "active",
      targetDate: "Nov 20, 2026",
      progress: 65,
      timeSpent: "12.0h",
      description: "ESP32 soil moisture sensor sending real-time telemetry to self-hosted Sensus dashboard.",
      color: {
        accent: "bg-[#93c5fd]",
        bg: "bg-[#eff6ff]",
        text: "text-[#3b82f6]",
        border: "border-[#bfdbfe]",
        ring: "ring-[#93c5fd]",
      },
      milestones: [
        { id: "m-5", title: "Breadboard sensor circuit & calibrate ADC", completed: true, date: "Completed Oct 05" },
        { id: "m-6", title: "ESP32 MQTT telemetry client", completed: true, date: "Completed Oct 14" },
        { id: "m-7", title: "Custom PCB design in KiCad", completed: true, date: "Completed Oct 19" },
        { id: "m-8", title: "Solder PCB & 3D print waterproof enclosure", completed: false, date: "Target Nov 20" },
      ],
      tasks: [
        { id: "t-5", title: "Receive JLCPCB manufactured boards", completed: true, priority: "high" },
        { id: "t-6", title: "Solder surface mount components", completed: false, priority: "high" },
        { id: "t-7", title: "Calibrate capacitive soil sensor in dry soil", completed: false, priority: "medium" },
      ],
      vaultDocs: [
        { id: "d-4", name: "PlantSensor_Schematic_v1.pdf", type: "PDF", size: "3.2 MB" },
        { id: "d-5", name: "Firmware_MQTT_Broker.ino", type: "SRC", size: "14 KB" },
      ],
      weeklyActivity: [
        { day: "Mon", hours: 1.0, label: "KiCad" },
        { day: "Tue", hours: 2.0, label: "Routing" },
        { day: "Wed", hours: 0.0, label: "" },
        { day: "Thu", hours: 3.5, label: "Firmware" },
        { day: "Fri", hours: 1.5, label: "Testing" },
      ],
    },
    {
      id: "p-3",
      title: "HCI Thesis & Cognitive Psychology Paper",
      sphere: "Academic & Research",
      status: "active",
      targetDate: "Dec 01, 2026",
      progress: 82,
      timeSpent: "24.5h",
      description: "Research on human attention spans, digital minimalism, and focus timer psychology.",
      color: {
        accent: "bg-[#fcd34d]",
        bg: "bg-[#fef8e7]",
        text: "text-[#d97706]",
        border: "border-[#fde68a]",
        ring: "ring-[#fcd34d]",
      },
      milestones: [
        { id: "m-9", title: "Literature review of 40 cognitive studies", completed: true, date: "Completed Sep 28" },
        { id: "m-10", title: "Conduct 12 qualitative user cohort interviews", completed: true, date: "Completed Oct 10" },
        { id: "m-11", title: "Statistical correlation analysis of focus intervals", completed: true, date: "Completed Oct 18" },
        { id: "m-12", title: "Submit thesis final draft to faculty review", completed: false, date: "Target Dec 01" },
      ],
      tasks: [
        { id: "t-8", title: "Synthesize cohort interview transcripts", completed: true, priority: "high" },
        { id: "t-9", title: "Write Chapter 4: Focus session ergonomics", completed: false, priority: "high" },
        { id: "t-10", title: "Proofread bibliography and citations", completed: false, priority: "low" },
      ],
      vaultDocs: [
        { id: "d-6", name: "Thesis_Draft_v2.4.docx", type: "DOC", size: "12.2 MB" },
        { id: "d-7", name: "Cohort_Statistical_Data.xlsx", type: "XLS", size: "4.8 MB" },
      ],
      weeklyActivity: [
        { day: "Mon", hours: 3.0, label: "Writing" },
        { day: "Tue", hours: 2.5, label: "Cohort" },
        { day: "Wed", hours: 4.0, label: "Analysis" },
        { day: "Thu", hours: 1.5, label: "Revising" },
        { day: "Fri", hours: 3.0, label: "Editing" },
      ],
    },
    {
      id: "p-4",
      title: "Ceramic & Pottery Tableware Set",
      sphere: "Hobbies & Craft",
      status: "active",
      targetDate: "Nov 30, 2026",
      progress: 45,
      timeSpent: "9.0h",
      description: "Hand-crafted stoneware mugs, pour-over drippers, and bowls for morning coffee rituals.",
      color: {
        accent: "bg-[#52c8b0]",
        bg: "bg-[#eafaf5]",
        text: "text-[#2e9e80]",
        border: "border-[#d1f2e6]",
        ring: "ring-[#52c8b0]",
      },
      milestones: [
        { id: "m-13", title: "Throw 6 stoneware mug cylinders on the wheel", completed: true, date: "Completed Oct 08" },
        { id: "m-14", title: "Trim footrings and pull ergonomic handles", completed: true, date: "Completed Oct 15" },
        { id: "m-15", title: "Bisque firing kiln cycle at Cone 04", completed: false, date: "Target Nov 02" },
        { id: "m-16", title: "High fire glaze in matte oatmeal and sage", completed: false, date: "Target Nov 30" },
      ],
      tasks: [
        { id: "t-11", title: "Smooth handle attachments with damp sponge", completed: true, priority: "medium" },
        { id: "t-12", title: "Mix 2L of custom matte sage glaze", completed: false, priority: "high" },
      ],
      vaultDocs: [
        { id: "d-8", name: "Glaze_Chemistry_Recipes.pdf", type: "PDF", size: "1.8 MB" },
      ],
      weeklyActivity: [
        { day: "Mon", hours: 0.0, label: "" },
        { day: "Tue", hours: 2.0, label: "Wheel" },
        { day: "Wed", hours: 2.5, label: "Trim" },
        { day: "Thu", hours: 0.0, label: "" },
        { day: "Fri", hours: 2.5, label: "Studio" },
      ],
    },
    {
      id: "p-5",
      title: "Personal Portfolio & Blog 2026",
      sphere: "Creative & Design",
      status: "active",
      targetDate: "Oct 31, 2026",
      progress: 90,
      timeSpent: "14.5h",
      description: "Modern portfolio with interactive case studies, photo essays, and typography explorations.",
      color: {
        accent: "bg-[#c084fc]",
        bg: "bg-[#f5f3ff]",
        text: "text-[#7c3aed]",
        border: "border-[#ddd6fe]",
        ring: "ring-[#c084fc]",
      },
      milestones: [
        { id: "m-17", title: "Case study writeups & design system mockups", completed: true, date: "Completed Oct 01" },
        { id: "m-18", title: "Next.js 16 & Tailwind v4 client frontend", completed: true, date: "Completed Oct 12" },
        { id: "m-19", title: "Fluid responsive typography & dark mode", completed: true, date: "Completed Oct 18" },
        { id: "m-20", title: "Vercel production deploy & custom DNS", completed: false, date: "Target Oct 31" },
      ],
      tasks: [
        { id: "t-13", title: "Add OpenGraph social preview images", completed: true, priority: "medium" },
        { id: "t-14", title: "Run Lighthouse speed & SEO check", completed: false, priority: "high" },
      ],
      vaultDocs: [
        { id: "d-9", name: "Portfolio_Sitemap_Architecture.pdf", type: "PDF", size: "2.1 MB" },
      ],
      weeklyActivity: [
        { day: "Mon", hours: 1.5, label: "Coding" },
        { day: "Tue", hours: 2.0, label: "Styling" },
        { day: "Wed", hours: 3.0, label: "Deploy" },
        { day: "Thu", hours: 1.0, label: "Images" },
        { day: "Fri", hours: 1.5, label: "SEO" },
      ],
    },
    {
      id: "p-6",
      title: "Acoustic Guitar Repertoire & Fingerstyle",
      sphere: "Hobbies & Craft",
      status: "on_hold",
      targetDate: "Ongoing",
      progress: 35,
      timeSpent: "8.0h",
      description: "Learn and record 5 acoustic fingerstyle pieces with weekly tempo practice.",
      color: {
        accent: "bg-[#fb7185]",
        bg: "bg-[#fff1f2]",
        text: "text-[#e11d48]",
        border: "border-[#fecdd3]",
        ring: "ring-[#fb7185]",
      },
      milestones: [
        { id: "m-21", title: "Learn fingerpicking pattern for Piece #1", completed: true, date: "Completed Sep 15" },
        { id: "m-22", title: "Record acoustic audio take for Piece #1", completed: true, date: "Completed Sep 22" },
        { id: "m-23", title: "Master tempo transition on Piece #2", completed: false, date: "Ongoing" },
      ],
      tasks: [
        { id: "t-15", title: "Change guitar strings to Elixir Phosphor Bronze", completed: true, priority: "low" },
        { id: "t-16", title: "Practice metronome exercises at 80 BPM", completed: false, priority: "medium" },
      ],
      vaultDocs: [
        { id: "d-10", name: "Fingerstyle_Tablature_Collection.pdf", type: "PDF", size: "5.4 MB" },
      ],
      weeklyActivity: [
        { day: "Mon", hours: 0.5, label: "Practice" },
        { day: "Tue", hours: 0.0, label: "" },
        { day: "Wed", hours: 1.0, label: "Chords" },
        { day: "Thu", hours: 0.0, label: "" },
        { day: "Fri", hours: 0.5, label: "Rhythm" },
      ],
    },
  ]);

  const [selectedProjectId, setSelectedProjectId] = useState<string>("p-1");

  const selectedProject =
    projects.find((p) => p.id === selectedProjectId) || projects[0];

  const handleToggleTask = (projectId: string, taskId: string) => {
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id !== projectId) return proj;
        return {
          ...proj,
          tasks: proj.tasks.map((t) =>
            t.id === taskId ? { ...t, completed: !t.completed } : t
          ),
        };
      })
    );
  };

  const handleToggleMilestone = (projectId: string, milestoneId: string) => {
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id !== projectId) return proj;
        const updatedMilestones = proj.milestones.map((m) =>
          m.id === milestoneId ? { ...m, completed: !m.completed } : m
        );
        const completedCount = updatedMilestones.filter((m) => m.completed).length;
        const progress = Math.round((completedCount / updatedMilestones.length) * 100);

        return {
          ...proj,
          milestones: updatedMilestones,
          progress,
        };
      })
    );
  };

  const handleAddTask = (projectId: string, title: string) => {
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id !== projectId) return proj;
        const newTask = {
          id: `t-${Date.now()}`,
          title,
          completed: false,
          priority: "medium" as const,
        };
        return {
          ...proj,
          tasks: [newTask, ...proj.tasks],
        };
      })
    );
  };

  const handleNewProject = () => {
    const title = prompt("Enter new personal project name:");
    if (!title?.trim()) return;

    const newProj: ProjectData = {
      id: `p-${Date.now()}`,
      title: title.trim(),
      sphere: "Creative & Design",
      status: "active",
      targetDate: "Dec 15, 2026",
      progress: 0,
      timeSpent: "0.0h",
      description: "Newly created personal project space.",
      color: {
        accent: "bg-[#52c8b0]",
        bg: "bg-[#eafaf5]",
        text: "text-[#2e9e80]",
        border: "border-[#d1f2e6]",
        ring: "ring-[#52c8b0]",
      },
      milestones: [
        { id: `m-${Date.now()}-1`, title: "Project discovery & setup", completed: false, date: "Pending" },
      ],
      tasks: [
        { id: `t-${Date.now()}-1`, title: "Define first milestone", completed: false, priority: "high" },
      ],
      vaultDocs: [],
      weeklyActivity: [
        { day: "Mon", hours: 0, label: "" },
        { day: "Tue", hours: 0, label: "" },
        { day: "Wed", hours: 0, label: "" },
        { day: "Thu", hours: 0, label: "" },
        { day: "Fri", hours: 0, label: "" },
      ],
    };

    setProjects((prev) => [newProj, ...prev]);
    setSelectedProjectId(newProj.id);
  };

  return (
    <div className="w-full">
      {/* Studio Split Layout: Project Navigator Shelf (Left) + Project Workbench Studio (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] xl:grid-cols-[330px_1fr] gap-6 items-start animate-in fade-in duration-200">
        {/* Left Side: Projects Navigator Shelf */}
        <div className="w-full">
          <ProjectShelf
            projects={projects}
            selectedProjectId={selectedProjectId}
            onSelectProject={setSelectedProjectId}
            onNewProject={handleNewProject}
          />
        </div>

        {/* Right Side: Active Project Studio Workbench */}
        <div className="w-full">
          {selectedProject && (
            <ProjectWorkbench
              project={selectedProject}
              onToggleTask={handleToggleTask}
              onToggleMilestone={handleToggleMilestone}
              onAddTask={handleAddTask}
              onStartFocus={(title) => {
                startFocus(title, 45);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
