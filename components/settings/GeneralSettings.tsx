"use client";

import React, { useState } from "react";
import { Check, Sparkles, Clock, Globe } from "lucide-react";

export function GeneralSettings() {
  const [firstName, setFirstName] = useState("Sarah");
  const [lastName, setLastName] = useState("Mitchell");
  const [email, setEmail] = useState("sarah.m@sensus.app");
  const [role, setRole] = useState("Lead Product Designer");
  const [bio, setBio] = useState(
    "Leading product design, design systems, and core UX at Sensus."
  );
  const [timezone, setTimezone] = useState("America/Los_Angeles");
  const [startHour, setStartHour] = useState("08:00");
  const [endHour, setEndHour] = useState("17:00");
  const [activeAccent, setActiveAccent] = useState("amber");
  const [saved, setSaved] = useState(false);

  const accents = [
    { id: "amber", name: "Warm Amber", color: "bg-[#fcd34d]" },
    { id: "teal", name: "Mint Teal", color: "bg-[#52c8b0]" },
    { id: "blue", name: "Soft Blue", color: "bg-[#93c5fd]" },
    { id: "coral", name: "Coral Rose", color: "bg-[#fb7185]" },
  ];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="bg-white rounded-[28px] p-7 shadow-xs border border-zinc-200/50 flex flex-col gap-8">
      {/* Header */}
      <div className="pb-5 border-b border-zinc-100 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-zinc-900 tracking-tight">
            General & Workspace Profile
          </h3>
          <p className="text-xs text-zinc-400 font-normal mt-0.5">
            Configure your account identity and daily working schedule.
          </p>
        </div>

        {saved && (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ebf8f2] text-[#22c55e] text-xs font-semibold animate-in fade-in">
            <Check className="w-3.5 h-3.5" />
            <span>Saved successfully</span>
          </span>
        )}
      </div>

      {/* Form Section 1: Profile Information */}
      <div>
        <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider mb-4">
          Personal Information
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
              First Name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200/70 text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 transition-all font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
              Last Name
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200/70 text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 transition-all font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200/70 text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 transition-all font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
              Role Title
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200/70 text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 transition-all font-medium"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
              Bio & Focus
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200/70 text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 transition-all font-medium resize-none"
            />
          </div>
        </div>
      </div>

      {/* Form Section 2: Working Hours & Schedule */}
      <div className="pt-5 border-t border-zinc-100">
        <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider mb-4 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-zinc-500" />
          <span>Working Hours & Daily Planner Schedule</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
              Timezone
            </label>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200/70 text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 font-medium"
            >
              <option value="America/Los_Angeles">Pacific Time (PST, UTC-8)</option>
              <option value="America/New_York">Eastern Time (EST, UTC-5)</option>
              <option value="Europe/London">London (GMT, UTC+0)</option>
              <option value="Asia/Tokyo">Tokyo (JST, UTC+9)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
              Day Start Hour
            </label>
            <select
              value={startHour}
              onChange={(e) => setStartHour(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200/70 text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 font-medium"
            >
              <option value="07:00">07:00 AM</option>
              <option value="08:00">08:00 AM (Default)</option>
              <option value="09:00">09:00 AM</option>
              <option value="10:00">10:00 AM</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
              Day End Hour
            </label>
            <select
              value={endHour}
              onChange={(e) => setEndHour(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200/70 text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 font-medium"
            >
              <option value="16:00">04:00 PM</option>
              <option value="17:00">05:00 PM (Default)</option>
              <option value="18:00">06:00 PM</option>
              <option value="19:00">07:00 PM</option>
            </select>
          </div>
        </div>
      </div>

      {/* Form Section 3: Accent Color Theme */}
      <div className="pt-5 border-t border-zinc-100">
        <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2">
          Theme Accent Tint
        </h4>
        <p className="text-xs text-zinc-400 mb-4">
          Choose the primary ambient warmth for badges and progress highlights.
        </p>

        <div className="flex flex-wrap gap-3">
          {accents.map((accent) => {
            const isSelected = activeAccent === accent.id;
            return (
              <button
                key={accent.id}
                onClick={() => setActiveAccent(accent.id)}
                className={`flex items-center gap-2.5 px-3.5 py-2 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? "border-zinc-900 bg-zinc-50 shadow-2xs font-bold text-zinc-900"
                    : "border-zinc-200/70 bg-white hover:bg-zinc-50 text-zinc-600"
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full ${accent.color} border border-black/10 shrink-0 flex items-center justify-center`}
                >
                  {isSelected && <Check className="w-2.5 h-2.5 text-zinc-900" />}
                </span>
                <span className="text-xs">{accent.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Save Button */}
      <div className="pt-5 border-t border-zinc-100 flex items-center justify-end gap-3">
        <button
          onClick={() => {
            setFirstName("Sarah");
            setLastName("Mitchell");
          }}
          className="px-4 py-2 rounded-full border border-zinc-200/80 bg-white hover:bg-zinc-50 text-zinc-600 font-medium text-xs cursor-pointer transition-colors"
        >
          Reset
        </button>

        <button
          onClick={handleSave}
          className="px-5 py-2 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-xs shadow-xs transition-all cursor-pointer"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
}
