"use client";

import React, { useState } from "react";
import { FocusProvider } from "./focus/FocusContext";
import { TopNav } from "./TopNav";
import { GlobalFocusDock } from "./focus/GlobalFocusDock";
import { SettingsDrawer } from "./settings/SettingsDrawer";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <FocusProvider>
      <div className="min-h-screen bg-[#f4f2ec] text-zinc-900 selection:bg-amber-200 flex flex-col justify-start">
        <main className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-8 lg:py-10 flex flex-col gap-6 relative pb-24">
          {/* Top Segmented Pill Dock */}
          <TopNav
            onOpenSettings={() => setIsSettingsOpen(true)}
            isSettingsOpen={isSettingsOpen}
          />

          {/* Dynamic Page Screen */}
          <div className="w-full">{children}</div>
        </main>

        {/* Global Floating Focus Dock & Procedural Soundscapes */}
        <GlobalFocusDock />

        {/* Slide-out Settings & Preferences Drawer */}
        <SettingsDrawer
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
        />
      </div>
    </FocusProvider>
  );
}
