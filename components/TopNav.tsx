"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  Sparkles,
  ShieldCheck,
  User,
  Sliders,
  ChevronRight,
} from "lucide-react";
import { SensusBrand } from "./SensusLogo";

interface TopNavProps {
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  onOpenSettings?: () => void;
  isSettingsOpen?: boolean;
}

export function TopNav({
  activeTab,
  onTabChange,
  onOpenSettings,
  isSettingsOpen = false,
}: TopNavProps) {
  const pathname = usePathname();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const tabs = [
    { id: "overview", label: "Overview", icon: LayoutGrid, href: "/" },
    { id: "documents", label: "Documents", icon: FileText, href: "/documents" },
    { id: "projects", label: "Projects", icon: FolderKanban, href: "/projects" },
    { id: "tasks", label: "Tasks", icon: CheckSquare, href: "/tasks" },
    { id: "journal", label: "Journal", icon: BookOpen, href: "/journal" },
    { id: "mail", label: "Mail", icon: Mail, href: "/mail" },
  ];

  const getIsActive = (tab: (typeof tabs)[number]) => {
    if (activeTab) {
      return activeTab === tab.id;
    }
    if (tab.href === "/") {
      return pathname === "/" && !isSettingsOpen;
    }
    return pathname.startsWith(tab.href) && !isSettingsOpen;
  };

  return (
    <header className="w-full flex items-center justify-between py-2 relative z-20">
      {/* Left: Brand */}
      <div className="flex items-center">
        <Link href="/" className="hover:opacity-90 transition-opacity">
          <SensusBrand />
        </Link>
      </div>

      {/* Center: Segmented Navigation Pill (Workspaces only, no Settings) */}
      <nav
        aria-label="Main Navigation"
        className="flex items-center gap-1 bg-[#edebe6] p-1.5 rounded-full border border-zinc-200/40 shadow-inner overflow-x-auto scrollbar-none"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = getIsActive(tab);

          // If onTabChange is passed without real routing, support fallback
          if (onTabChange) {
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
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
          }

          return (
            <Link
              key={tab.id}
              href={tab.href}
              className={`flex items-center justify-center transition-all duration-200 ${
                isActive
                  ? "bg-white text-zinc-900 shadow-sm px-3.5 py-1.5 rounded-full font-semibold text-xs gap-1.5 whitespace-nowrap"
                  : "w-8.5 h-8 rounded-full text-zinc-500 hover:text-zinc-900 hover:bg-white/50"
              }`}
              title={tab.label}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? "text-zinc-900" : "text-zinc-500"}`} />
              {isActive && <span className="hidden sm:inline text-xs">{tab.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Right: Actions (Search, Notifications, Profile Menu) */}
      <div className="flex items-center gap-2">
        {/* Search button */}
        <div className="relative">
          <button
            onClick={() => {
              setShowSearch(!showSearch);
              setShowNotifications(false);
              setShowProfileMenu(false);
            }}
            className="w-9 h-9 rounded-full bg-white/90 border border-zinc-200/50 shadow-xs flex items-center justify-center text-zinc-600 hover:text-zinc-950 hover:bg-white transition-all cursor-pointer"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {showSearch && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowSearch(false)}
              />
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-zinc-100 p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
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
            </>
          )}
        </div>

        {/* Notifications button */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowSearch(false);
              setShowProfileMenu(false);
            }}
            className="w-9 h-9 rounded-full bg-white/90 border border-zinc-200/50 shadow-xs flex items-center justify-center text-zinc-600 hover:text-zinc-950 hover:bg-white transition-all cursor-pointer relative"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-emerald-500" />
          </button>

          {showNotifications && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowNotifications(false)}
              />
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-zinc-100 p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
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
            </>
          )}
        </div>

        {/* User profile avatar with expanded menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowSearch(false);
              setShowNotifications(false);
            }}
            className="relative group cursor-pointer focus:outline-none flex items-center"
            title="Open Profile & Settings Menu"
            aria-label="User profile menu"
            aria-expanded={showProfileMenu}
          >
            <div
              className={`w-9 h-9 rounded-full overflow-hidden border-2 shadow-xs transition-all ${
                isSettingsOpen || showProfileMenu
                  ? "border-zinc-900 ring-2 ring-zinc-900/30 scale-105"
                  : "border-white ring-1 ring-zinc-200/50 hover:ring-zinc-400"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                alt="Sarah Mitchell"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
          </button>

          {/* Profile Expanded Dropdown Menu */}
          {showProfileMenu && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowProfileMenu(false)}
              />
              <div className="absolute right-0 mt-2.5 w-72 bg-white rounded-2xl shadow-xl border border-zinc-200/70 p-2 z-50 animate-in fade-in zoom-in-95 duration-150 text-zinc-900">
                {/* User Identity Header */}
                <div className="px-3 py-3 border-b border-zinc-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-zinc-200/80 shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                      alt="Sarah Mitchell"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-bold text-zinc-900 truncate">Sarah Mitchell</h4>
                    <p className="text-[11px] text-zinc-400 truncate">sarah.mitchell@sensus.life</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                        Personal OS • Active
                      </span>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-1.5 space-y-0.5">
                  {/* Settings & Preferences - opens slide-out drawer */}
                  <button
                    type="button"
                    onClick={() => {
                      setShowProfileMenu(false);
                      onOpenSettings?.();
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100/80 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-lg bg-zinc-100 group-hover:bg-zinc-200/70 flex items-center justify-center text-zinc-600 transition-colors">
                        <Settings className="w-3.5 h-3.5" />
                      </div>
                      <span>Settings & Preferences</span>
                    </div>
                    <span className="text-[10px] text-zinc-400 font-mono">Drawer ⇥</span>
                  </button>

                  {/* Focus & Audio Defaults */}
                  <button
                    type="button"
                    onClick={() => {
                      setShowProfileMenu(false);
                      onOpenSettings?.();
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100/80 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-lg bg-amber-50 group-hover:bg-amber-100/70 flex items-center justify-center text-amber-700 transition-colors">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                      <span>Focus & Soundscapes</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                  </button>

                  {/* Local Storage Vault */}
                  <button
                    type="button"
                    onClick={() => {
                      setShowProfileMenu(false);
                      onOpenSettings?.();
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100/80 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-lg bg-blue-50 group-hover:bg-blue-100/70 flex items-center justify-center text-blue-700 transition-colors">
                        <ShieldCheck className="w-3.5 h-3.5" />
                      </div>
                      <span>Local Vault & Privacy</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                  </button>
                </div>

                {/* Footer status */}
                <div className="pt-2 mt-1 border-t border-zinc-100 px-3 py-1.5 flex items-center justify-between text-[10px] text-zinc-400">
                  <span>Sensus Lifestyle OS</span>
                  <span className="font-mono text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">v2.4 Ready</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
