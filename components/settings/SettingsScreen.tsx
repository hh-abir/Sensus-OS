"use client";

import React, { useState } from "react";
import { SettingsSidebar, SettingsSection } from "./SettingsSidebar";
import { GeneralSettings } from "./GeneralSettings";
import { FocusPreferences } from "./FocusPreferences";
import { IntegrationsSettings } from "./IntegrationsSettings";
import { CreditCard, Shield, Download, Check } from "lucide-react";

export function SettingsScreen() {
  const [activeSection, setActiveSection] = useState<SettingsSection>("general");

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Profile Card, Section Menu, Plan Card */}
        <div className="lg:col-span-4">
          <SettingsSidebar
            activeSection={activeSection}
            onSelectSection={setActiveSection}
          />
        </div>

        {/* Right Column: Dynamic Section Details */}
        <div className="lg:col-span-8">
          {activeSection === "general" && <GeneralSettings />}
          {activeSection === "focus" && <FocusPreferences />}
          {activeSection === "integrations" && <IntegrationsSettings />}

          {/* Notifications Section */}
          {activeSection === "notifications" && (
            <div className="bg-white rounded-[28px] p-7 shadow-xs border border-zinc-200/50 flex flex-col gap-6">
              <div className="pb-5 border-b border-zinc-100">
                <h3 className="text-lg font-bold text-zinc-900 tracking-tight">
                  Notification Center Preferences
                </h3>
                <p className="text-xs text-zinc-400 font-normal mt-0.5">
                  Choose how and when Sensus alerts you about tasks, team huddles, and updates.
                </p>
              </div>

              <div className="space-y-4">
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
                    className="flex items-center justify-between p-4 rounded-2xl bg-zinc-50/70 border border-zinc-200/60"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-zinc-900">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-zinc-400">{item.desc}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
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
            <div className="bg-white rounded-[28px] p-7 shadow-xs border border-zinc-200/50 flex flex-col gap-6">
              <div className="pb-5 border-b border-zinc-100">
                <h3 className="text-lg font-bold text-zinc-900 tracking-tight">
                  Subscription & Billing
                </h3>
                <p className="text-xs text-zinc-400 font-normal mt-0.5">
                  Manage your team workspace plan, invoices, and payment methods.
                </p>
              </div>

              {/* Current Card */}
              <div className="p-5 rounded-2xl bg-zinc-50/70 border border-zinc-200/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 text-white flex items-center justify-center">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-900">
                      Mastercard ending in 4289
                    </p>
                    <p className="text-[11px] text-zinc-400">Expires 09/28 • Primary</p>
                  </div>
                </div>
                <button className="px-3 py-1 bg-white hover:bg-zinc-100 border border-zinc-200/80 rounded-full text-xs font-semibold text-zinc-700">
                  Update
                </button>
              </div>

              {/* Invoice History */}
              <div>
                <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider mb-3">
                  Recent Invoices
                </h4>
                <div className="space-y-2">
                  {[
                    { date: "Oct 01, 2026", amount: "$18.00", id: "INV-2026-10" },
                    { date: "Sep 01, 2026", amount: "$18.00", id: "INV-2026-09" },
                    { date: "Aug 01, 2026", amount: "$18.00", id: "INV-2026-08" },
                  ].map((inv) => (
                    <div
                      key={inv.id}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-zinc-50 border border-zinc-100"
                    >
                      <div>
                        <span className="text-xs font-semibold text-zinc-900">
                          {inv.id}
                        </span>
                        <span className="text-[11px] text-zinc-400 ml-2">
                          {inv.date}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-zinc-800">
                          {inv.amount}
                        </span>
                        <button className="p-1 text-zinc-400 hover:text-zinc-800">
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
