"use client";

import React, { useState } from "react";
import {
  LayoutGrid,
  FileText,
  FolderKanban,
  CheckSquare,
  BookOpen,
  Mail,
  Settings,
  Search,
  Bell,
} from "lucide-react";
import { SensusBrand } from "./SensusLogo";

interface TopNavProps {
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

export function TopNav({ activeTab = "overview", onTabChange }: TopNavProps) {
  const [internalTab, setInternalTab] = useState(activeTab);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const currentTab = onTabChange ? activeTab : internalTab;
  const handleTabClick = (tabId: string) => {
    if (onTabChange) {
      onTabChange(tabId);
    } else {
      setInternalTab(tabId);
    }
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: LayoutGrid },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "projects", label: "Projects", icon: FolderKanban },
    { id: "tasks", label: "Tasks", icon: CheckSquare },
    { id: "journal", label: "Journal", icon: BookOpen },
    { id: "mail", label: "Mail", icon: Mail },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <header className="w-full flex items-center justify-between py-2 relative z-20">
      {/* Left: Brand */}
      <div className="flex items-center">
        <SensusBrand />
      </div>

      {/* Center: Segmented Navigation Pill */}
      <nav
        aria-label="Main Navigation"
        className="flex items-center gap-1 bg-[#edebe6] p-1.5 rounded-full border border-zinc-200/40 shadow-inner overflow-x-auto scrollbar-none"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex items-center justify-center transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-white text-zinc-900 shadow-sm px-3.5 py-1.5 rounded-full font-semibold text-xs gap-1.5 whitespace-nowrap"
                  : "w-8.5 h-8 rounded-full text-zinc-500 hover:text-zinc-900 hover:bg-white/50"
              }`}
              title={tab.label}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? "text-zinc-900" : "text-zinc-500"}`} />
              {isActive && <span className="hidden sm:inline text-xs">{tab.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Search button */}
        <div className="relative">
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="w-9 h-9 rounded-full bg-white/90 border border-zinc-200/50 shadow-xs flex items-center justify-center text-zinc-600 hover:text-zinc-950 hover:bg-white transition-all cursor-pointer"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {showSearch && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-zinc-100 p-3 z-50">
              <div className="flex items-center gap-2 bg-zinc-50 rounded-xl px-3 py-2 border border-zinc-200/60">
                <Search className="w-4 h-4 text-zinc-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Search projects, tasks, entries..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-xs w-full focus:outline-none text-zinc-800"
                  autoFocus
                />
              </div>
            </div>
          )}
        </div>

        {/* Notifications button */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-9 h-9 rounded-full bg-white/90 border border-zinc-200/50 shadow-xs flex items-center justify-center text-zinc-600 hover:text-zinc-950 hover:bg-white transition-all cursor-pointer relative"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-emerald-500" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-zinc-100 p-4 z-50">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">Life Notifications</h4>
                <span className="text-[10px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-semibold">2 New</span>
              </div>
              <div className="space-y-3 mt-3">
                <div className="flex items-start gap-2.5 text-xs">
                  <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 font-bold text-[10px]">📖</div>
                  <div>
                    <p className="font-semibold text-zinc-800">12-Day Reflection Streak!</p>
                    <p className="text-[11px] text-zinc-400">Keep up your daily evening rhythm</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 text-xs">
                  <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 font-bold text-[10px]">☕</div>
                  <div>
                    <p className="font-semibold text-zinc-800">Coffee catchup with Maya</p>
                    <p className="text-[11px] text-zinc-400">Blue Bottle Cafe • 09:30 AM</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User profile avatar */}
        <div className="relative group cursor-pointer">
          <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white shadow-xs ring-1 ring-zinc-200/50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
              alt="Sarah"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
        </div>
      </div>
    </header>
  );
}
