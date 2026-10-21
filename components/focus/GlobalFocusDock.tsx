"use client";

import React, { useState } from "react";
import { useFocus, SoundscapeType } from "./FocusContext";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Sparkles,
  CloudRain,
  Coffee,
  Trees,
  Radio,
  X,
  ChevronUp,
  ChevronDown,
  Minimize2,
  Maximize2,
  Headphones,
} from "lucide-react";

export function GlobalFocusDock() {
  const {
    isActive,
    isPaused,
    formattedTime,
    taskTitle,
    soundscape,
    volume,
    pauseFocus,
    resumeFocus,
    resetFocus,
    startFocus,
    setSoundscape,
    setVolume,
  } = useFocus();

  const [isMinimized, setIsMinimized] = useState(false);
  const [showSoundMenu, setShowSoundMenu] = useState(false);

  const soundscapes: { id: SoundscapeType; label: string; icon: React.ElementType; desc: string }[] = [
    { id: "none", label: "Pure Silence", icon: VolumeX, desc: "No audio background" },
    { id: "rain", label: "Gentle Rain", icon: CloudRain, desc: "Rain on window pane" },
    { id: "coffee", label: "Coffeehouse", icon: Coffee, desc: "Cozy cafe low rumble" },
    { id: "forest", label: "Pine Forest", icon: Trees, desc: "Breeze through trees" },
    { id: "vinyl", label: "Lo-Fi Vinyl", icon: Radio, desc: "Warm turntable crackle" },
  ];

  // If not active, show a subtle floating pill prompt on bottom-right
  if (!isActive) {
    return (
      <div className="fixed bottom-6 right-6 z-40 animate-in fade-in slide-in-from-bottom-3 duration-300">
        <button
          onClick={() => startFocus("Design UI Kit & Tokens", 45)}
          className="group flex items-center gap-2.5 pl-3.5 pr-4 py-2 rounded-full bg-white/95 hover:bg-white text-zinc-800 shadow-xl border border-zinc-200/80 backdrop-blur-md transition-all active:scale-95 cursor-pointer"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#52c8b0] animate-pulse" />
          <span className="text-xs font-semibold">Start 45m Focus</span>
          <span className="w-5 h-5 rounded-full bg-zinc-900 group-hover:bg-zinc-800 text-white flex items-center justify-center text-[10px]">
            <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
          </span>
        </button>
      </div>
    );
  }

  // Minimized floating bubble
  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-40 animate-in zoom-in-95 duration-200">
        <button
          onClick={() => setIsMinimized(false)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-zinc-900 text-white shadow-2xl border border-zinc-800 cursor-pointer hover:scale-105 transition-all"
        >
          <span className="w-2 h-2 rounded-full bg-[#52c8b0] animate-pulse" />
          <span className="text-xs font-bold font-mono tracking-tight">{formattedTime}</span>
          <Maximize2 className="w-3 h-3 text-zinc-400" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-xl px-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Soundscape Drawer Popover */}
      {showSoundMenu && (
        <div className="mb-3 bg-white/95 backdrop-blur-md rounded-[24px] p-4 shadow-2xl border border-zinc-200/80 animate-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between pb-2.5 border-b border-zinc-100">
            <div className="flex items-center gap-2">
              <Headphones className="w-3.5 h-3.5 text-zinc-700" />
              <span className="text-xs font-bold text-zinc-900">
                Ambient Soundscapes
              </span>
            </div>
            <button
              onClick={() => setShowSoundMenu(false)}
              className="w-6 h-6 rounded-full hover:bg-zinc-100 flex items-center justify-center text-zinc-400 hover:text-zinc-700 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Soundscapes Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3">
            {soundscapes.map((s) => {
              const Icon = s.icon;
              const isSelected = soundscape === s.id;

              return (
                <button
                  key={s.id}
                  onClick={() => setSoundscape(s.id)}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                    isSelected
                      ? "bg-[#eafaf5] border-[#d1f2e6] text-[#2e9e80] shadow-2xs font-bold"
                      : "bg-white/80 hover:bg-zinc-50 border-zinc-200/60 text-zinc-700"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold truncate leading-tight">
                      {s.label}
                    </p>
                    <p className="text-[10px] text-zinc-400 font-normal truncate">
                      {s.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Volume Slider */}
          <div className="mt-3.5 pt-3 border-t border-zinc-100 flex items-center gap-3 text-xs">
            <Volume2 className="w-4 h-4 text-zinc-400 shrink-0" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-full accent-zinc-900 cursor-pointer h-1.5 bg-zinc-200 rounded-lg"
            />
            <span className="text-[11px] font-semibold text-zinc-500 w-8 text-right">
              {Math.round(volume * 100)}%
            </span>
          </div>
        </div>
      )}

      {/* Main Floating Focus Bar */}
      <div className="bg-white/95 backdrop-blur-md rounded-full shadow-2xl border border-zinc-200/90 p-2 sm:px-4 sm:py-2.5 flex items-center justify-between gap-3 text-zinc-900">
        {/* Left: Indicator & Digital Timer */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative shrink-0">
            <span className="w-3 h-3 rounded-full bg-[#52c8b0] block" />
            {!isPaused && (
              <span className="absolute inset-0 rounded-full bg-[#52c8b0] animate-ping opacity-75" />
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm sm:text-base font-black font-mono tracking-tight text-zinc-950">
                {formattedTime}
              </span>
              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-700 hidden sm:inline">
                {isPaused ? "Paused" : "Deep Work"}
              </span>
            </div>
            <p className="text-[11px] text-zinc-500 font-medium truncate max-w-[160px] sm:max-w-xs leading-tight">
              {taskTitle}
            </p>
          </div>
        </div>

        {/* Right: Controls & Soundscape Button */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Soundscape Trigger Button */}
          <button
            onClick={() => setShowSoundMenu(!showSoundMenu)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
              soundscape !== "none"
                ? "bg-[#eafaf5] border-[#d1f2e6] text-[#2e9e80]"
                : "bg-zinc-50 hover:bg-zinc-100 border-zinc-200/70 text-zinc-600"
            }`}
            title="Soundscapes"
          >
            {soundscape === "rain" ? (
              <CloudRain className="w-3.5 h-3.5" />
            ) : soundscape === "coffee" ? (
              <Coffee className="w-3.5 h-3.5" />
            ) : soundscape === "forest" ? (
              <Trees className="w-3.5 h-3.5" />
            ) : soundscape === "vinyl" ? (
              <Radio className="w-3.5 h-3.5" />
            ) : (
              <Headphones className="w-3.5 h-3.5" />
            )}
            <span className="hidden sm:inline text-[11px]">
              {soundscape === "none" ? "Audio" : soundscape.charAt(0).toUpperCase() + soundscape.slice(1)}
            </span>
          </button>

          {/* Play/Pause Button */}
          <button
            onClick={isPaused ? resumeFocus : pauseFocus}
            className="w-8 h-8 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white flex items-center justify-center transition-transform active:scale-95 cursor-pointer shadow-xs"
            title={isPaused ? "Resume" : "Pause"}
          >
            {isPaused ? (
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
            ) : (
              <Pause className="w-3.5 h-3.5" />
            )}
          </button>

          {/* Reset Button */}
          <button
            onClick={resetFocus}
            className="p-1.5 rounded-full hover:bg-zinc-100 text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer"
            title="End Session"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Minimize Button */}
          <button
            onClick={() => setIsMinimized(true)}
            className="p-1.5 rounded-full hover:bg-zinc-100 text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer"
            title="Minimize"
          >
            <Minimize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
