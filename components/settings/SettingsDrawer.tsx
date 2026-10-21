"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  User,
  Sparkles,
  Layers,
  Bell,
  CreditCard,
  Settings as SettingsIcon,
  Check,
} from "lucide-react";
import { GeneralSettings } from "./GeneralSettings";
import { FocusPreferences } from "./FocusPreferences";
import { IntegrationsSettings } from "./IntegrationsSettings";
import { SettingsSection } from "./SettingsSidebar";

interface SettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsDrawer({ isOpen, onClose }: SettingsDrawerProps) {
  const [activeSection, setActiveSection] = useState<SettingsSection>("general");

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const sections: { id: SettingsSection; label: string; icon: React.ElementType }[] = [
    { id: "general", label: "General & Profile", icon: User },
    { id: "focus", label: "Focus & Sound", icon: Sparkles },
    { id: "integrations", label: "Apps & Sync", icon: Layers },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "billing", label: "Plan & Security", icon: CreditCard },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-xs z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out Drawer Container */}
      <aside
        className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-2xl sm:max-w-3xl bg-[#f4f2ec] shadow-2xl border-l border-zinc-200/80 flex flex-col transition-transform duration-300 ease-out transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Settings and Preferences"
      >
        {/* Drawer Header */}
        <div className="bg-white/95 backdrop-blur-md px-6 py-4 border-b border-zinc-200/70 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-zinc-900 text-white flex items-center justify-center shadow-xs">
              <SettingsIcon className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-950 tracking-tight leading-tight">
                Settings & Preferences
              </h2>
              <p className="text-[11px] text-zinc-400 font-normal">
                Personalize your workspace, soundscapes, and routines
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono text-zinc-400 border border-zinc-200 bg-zinc-50">
              ESC
            </span>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-zinc-100 flex items-center justify-center text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer"
              aria-label="Close settings"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Section Navigation Pills */}
        <div className="bg-white/70 px-6 py-2.5 border-b border-zinc-200/50 flex items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0">
          {sections.map((section) => {
            const Icon = section.icon;
            const isSelected = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? "bg-zinc-900 text-white shadow-xs"
                    : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/80"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-amber-300" : "text-zinc-400"}`} />
                <span>{section.label}</span>
              </button>
            );
          })}
        </div>

        {/* Scrollable Drawer Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeSection === "general" && <GeneralSettings />}
          {activeSection === "focus" && <FocusPreferences />}
          {activeSection === "integrations" && <IntegrationsSettings />}

          {/* Notifications Section */}
          {activeSection === "notifications" && (
            <div className="bg-white rounded-[28px] p-6 shadow-xs border border-zinc-200/50 flex flex-col gap-5">
              <div className="pb-4 border-b border-zinc-100">
                <h3 className="text-base font-bold text-zinc-900 tracking-tight">
                  Notification Center Preferences
                </h3>
                <p className="text-xs text-zinc-400 font-normal mt-0.5">
                  Choose how and when Sensus alerts you about tasks, team huddles, and updates.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  {
                    title: "Upcoming Schedule Alerts",
                    desc: "Notify 10 minutes prior to meetings and review calls.",
                    active: true,
                  },
                  {
                    title: "Daily Morning Briefing",
                    desc: "Deliver 'Good Morning, Sarah' daily agenda summary at 08:00 AM.",
                    active: true,
                  },
                  {
                    title: "Document Changes & Mentions",
                    desc: "Alert when team members modify shared UI kit specs or leave comments.",
                    active: true,
                  },
                  {
                    title: "Weekly Productivity Digest",
                    desc: "Send weekly completed task totals and focus time reports on Friday afternoon.",
                    active: false,
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50/70 border border-zinc-200/60"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-zinc-900">{item.title}</h4>
                      <p className="text-[11px] text-zinc-400">{item.desc}</p>
                    </div>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                        item.active
                          ? "bg-[#ebf8f2] text-[#22c55e]"
                          : "bg-zinc-100 text-zinc-500"
                      }`}
                    >
                      {item.active ? "Enabled" : "Muted"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Billing Section */}
          {activeSection === "billing" && (
            <div className="bg-white rounded-[28px] p-6 shadow-xs border border-zinc-200/50 flex flex-col gap-5">
              <div className="pb-4 border-b border-zinc-100">
                <h3 className="text-base font-bold text-zinc-900 tracking-tight">
                  Subscription & Storage Vault
                </h3>
                <p className="text-xs text-zinc-400 font-normal mt-0.5">
                  Manage your personal workspace plan, local vault storage, and offline syncing.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 text-white flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-md">
                    Active Plan
                  </span>
                  <h4 className="text-base font-black tracking-tight mt-1">Sensus Pro Studio</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Unlimited focus soundscapes, local offline vault, encrypted sync.
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black font-mono">$12</span>
                  <span className="text-xs text-zinc-400">/mo</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/70 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-zinc-900">Local Browser Storage</h4>
                  <p className="text-[11px] text-zinc-500">2.4 MB of 50 MB used (indexedDB vault)</p>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
                  Healthy & Synced
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        <div className="bg-white/90 backdrop-blur-md px-6 py-3 border-t border-zinc-200/60 flex items-center justify-between text-xs text-zinc-500 shrink-0">
          <div className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-[11px]">Preferences auto-saved to local device</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-xs transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </aside>
    </>
  );
}
