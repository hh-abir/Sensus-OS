"use client";

import React, { useState } from "react";
import { Check, Plus, ExternalLink, RefreshCw } from "lucide-react";

interface AppIntegration {
  id: string;
  name: string;
  category: string;
  desc: string;
  connected: boolean;
  account?: string;
  badge: {
    bg: string;
    text: string;
    label: string;
  };
}

export function IntegrationsSettings() {
  const [integrations, setIntegrations] = useState<AppIntegration[]>([
    {
      id: "figma",
      name: "Figma",
      category: "Design Sync",
      desc: "Live sync components and tokens with Sensus Design System.",
      connected: true,
      account: "sarahm@sensus.app",
      badge: {
        bg: "bg-purple-100",
        text: "text-purple-700",
        label: "FIG",
      },
    },
    {
      id: "gcal",
      name: "Google Calendar",
      category: "Schedule & Sync",
      desc: "Import daily schedule events into the Activity Planner.",
      connected: true,
      account: "sarah.m@sensus.app",
      badge: {
        bg: "bg-blue-100",
        text: "text-blue-700",
        label: "CAL",
      },
    },
    {
      id: "github",
      name: "GitHub",
      category: "Engineering",
      desc: "Track PR reviews and design token repository commits.",
      connected: true,
      account: "@sarahm-design",
      badge: {
        bg: "bg-zinc-100",
        text: "text-zinc-800",
        label: "GIT",
      },
    },
    {
      id: "slack",
      name: "Slack",
      category: "Messaging",
      desc: "Sync focus mode presence and receive team huddle reminders.",
      connected: true,
      account: "#sensus-product",
      badge: {
        bg: "bg-amber-100",
        text: "text-amber-800",
        label: "SLK",
      },
    },
    {
      id: "linear",
      name: "Linear",
      category: "Issue Tracking",
      desc: "Sync active tasks and sprint backlogs into Tasks badge count.",
      connected: false,
      badge: {
        bg: "bg-indigo-100",
        text: "text-indigo-700",
        label: "LIN",
      },
    },
    {
      id: "notion",
      name: "Notion",
      category: "Knowledge Base",
      desc: "Import specs, notes, and team guidelines to Documents.",
      connected: false,
      badge: {
        bg: "bg-emerald-100",
        text: "text-emerald-700",
        label: "NOT",
      },
    },
  ]);

  const toggleConnection = (id: string) => {
    setIntegrations((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              connected: !item.connected,
              account: !item.connected ? "sarah.m@sensus.app" : undefined,
            }
          : item
      )
    );
  };

  return (
    <div className="bg-white rounded-[28px] p-7 shadow-xs border border-zinc-200/50 flex flex-col gap-6">
      {/* Header */}
      <div className="pb-5 border-b border-zinc-100 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-zinc-900 tracking-tight">
            Connected Apps & Workspaces
          </h3>
          <p className="text-xs text-zinc-400 font-normal mt-0.5">
            Supercharge your dashboard with real-time tool syncs.
          </p>
        </div>

        <button className="flex items-center gap-1.5 px-3 py-1 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200/60 rounded-full text-xs font-semibold text-zinc-700 transition-colors cursor-pointer">
          <RefreshCw className="w-3.5 h-3.5 text-zinc-500" />
          <span>Sync All</span>
        </button>
      </div>

      {/* Grid of integrations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {integrations.map((app) => (
          <div
            key={app.id}
            className="p-4 rounded-2xl border border-zinc-200/60 bg-zinc-50/50 hover:bg-zinc-50 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-[10px] shrink-0 border border-black/5 ${app.badge.bg} ${app.badge.text}`}
                  >
                    {app.badge.label}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900 truncate">
                      {app.name}
                    </h4>
                    <span className="text-[10px] font-semibold text-zinc-400">
                      {app.category}
                    </span>
                  </div>
                </div>

                {app.connected ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#ebf8f2] text-[#22c55e]">
                    <Check className="w-2.5 h-2.5" />
                    <span>Connected</span>
                  </span>
                ) : (
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-zinc-100 text-zinc-500">
                    Not connected
                  </span>
                )}
              </div>

              <p className="text-xs text-zinc-500 font-normal mt-3 leading-relaxed">
                {app.desc}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-zinc-200/50 flex items-center justify-between">
              <span className="text-[11px] text-zinc-400 font-medium truncate max-w-[150px]">
                {app.account || "No account linked"}
              </span>

              <button
                onClick={() => toggleConnection(app.id)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  app.connected
                    ? "bg-white hover:bg-zinc-100 text-zinc-700 border border-zinc-200/80"
                    : "bg-zinc-900 hover:bg-zinc-800 text-white shadow-xs"
                }`}
              >
                {app.connected ? "Disconnect" : "Connect"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
