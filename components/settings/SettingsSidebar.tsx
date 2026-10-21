"use client";

import React from "react";
import {
  User,
  Bell,
  Palette,
  Layers,
  ShieldCheck,
  CreditCard,
  Camera,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

export type SettingsSection =
  | "general"
  | "focus"
  | "integrations"
  | "notifications"
  | "billing";

interface SettingsSidebarProps {
  activeSection: SettingsSection;
  onSelectSection: (section: SettingsSection) => void;
}

export function SettingsSidebar({
  activeSection,
  onSelectSection,
}: SettingsSidebarProps) {
  const navItems: { id: SettingsSection; label: string; icon: React.ElementType }[] = [
    { id: "general", label: "General & Profile", icon: User },
    { id: "focus", label: "Focus & Productivity", icon: Sparkles },
    { id: "integrations", label: "Connected Apps", icon: Layers },
    { id: "notifications", label: "Notifications & Sound", icon: Bell },
    { id: "billing", label: "Security & Billing", icon: CreditCard },
  ];

  return (
    <div className="flex flex-col gap-5">
      {/* Profile Summary Card */}
      <div className="bg-white rounded-[28px] p-6 shadow-xs border border-zinc-200/50 flex flex-col items-center text-center">
        {/* Avatar with Camera badge */}
        <div className="relative group cursor-pointer">
          <div className="w-20 h-20 rounded-full overflow-hidden border-3 border-white shadow-sm ring-2 ring-zinc-200/60">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
              alt="Sarah Mitchell"
              className="w-full h-full object-cover"
            />
          </div>
          <button
            className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white flex items-center justify-center shadow-xs border-2 border-white cursor-pointer transition-colors"
            title="Change photo"
          >
            <Camera className="w-3.5 h-3.5" />
          </button>
        </div>

        <h3 className="text-base font-bold text-zinc-900 mt-3 tracking-tight">
          Sarah Mitchell
        </h3>
        <p className="text-xs text-zinc-400 font-normal mt-0.5">
          sarah.m@sensus.app
        </p>

        <div className="mt-3 flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#ebf8f2] text-[#22c55e]">
            Lead Designer
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#fdeecb] text-[#d97706]">
            Pro Plan
          </span>
        </div>
      </div>

      {/* Navigation Pills */}
      <div className="bg-white rounded-[28px] p-3 shadow-xs border border-zinc-200/50">
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onSelectSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#edebe6] text-zinc-900 shadow-2xs font-bold"
                    : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50"
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    isActive ? "text-zinc-900" : "text-zinc-400"
                  }`}
                />
                <span className="flex-1 text-left">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Plan & Usage Ambient Card */}
      <div
        className="relative overflow-hidden rounded-[28px] p-6 shadow-xs border border-amber-200/40 flex flex-col justify-between"
        style={{
          background: `radial-gradient(ellipse at 85% 15%, rgba(254, 215, 170, 0.75) 0%, rgba(254, 240, 138, 0.45) 45%, rgba(255, 251, 235, 0.8) 75%, #ffffff 100%)`,
        }}
      >
        <div className="relative z-10">
          <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
            Sensus Personal Life OS
          </span>
          <h4 className="text-base font-bold text-zinc-900 mt-1">
            Unlimited Spaces & Focus
          </h4>
          <p className="text-xs text-zinc-500 mt-1">
            Personal plan active • Auto-renews Nov 2026.
          </p>

          <div className="mt-4 pt-3 border-t border-amber-300/30 flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-800">
              $12 / month
            </span>
            <button className="flex items-center gap-1 text-xs font-bold text-zinc-900 hover:text-zinc-950 cursor-pointer">
              <span>Manage</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
