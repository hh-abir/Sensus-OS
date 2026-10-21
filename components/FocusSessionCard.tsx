"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight, Play, Pause, RotateCcw } from "lucide-react";

export function FocusSessionCard() {
  const [totalSeconds, setTotalSeconds] = useState(45 * 60);
  const [initialSeconds] = useState(45 * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && totalSeconds > 0) {
      interval = setInterval(() => {
        setTotalSeconds((sec) => Math.max(0, sec - 1));
      }, 1000);
    } else if (totalSeconds === 0) {
      setIsActive(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, totalSeconds]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTotalSeconds(initialSeconds);
  };

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  // SVG Circular progress
  const radius = 64;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius;
  // Progress fraction (the screenshot shows about 75-80% filled ring with round cap)
  const progressRatio = totalSeconds / initialSeconds;
  // Let the ring sweep around with an arc matching the visual
  const maxArcLength = circumference * 0.78;
  const strokeDashoffset = circumference - maxArcLength * progressRatio;

  return (
    <div className="bg-white rounded-[28px] p-6 shadow-xs border border-zinc-200/50 flex flex-col justify-between">
      {/* Card Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-[15px] font-semibold text-zinc-900 tracking-tight">Focus Session</h3>
        <button
          onClick={resetTimer}
          className="w-7 h-7 rounded-full bg-zinc-100 hover:bg-zinc-200/70 text-zinc-500 hover:text-zinc-900 flex items-center justify-center transition-colors cursor-pointer"
          title="Reset timer"
          aria-label="Reset timer"
        >
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Circular Progress Gauge */}
      <div className="relative flex flex-col items-center justify-center my-4 py-1">
        <div className="relative w-40 h-40 flex items-center justify-center">
          <svg className="w-full h-full -rotate-130" viewBox="0 0 160 160">
            {/* Background Track */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="transparent"
              stroke="#eef2f6"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={circumference - maxArcLength}
              strokeLinecap="round"
            />
            {/* Active Mint/Teal Progress Bar */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="transparent"
              stroke="#52c8b0"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-500 ease-out"
            />
          </svg>

          {/* Time & Task Center Labels */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            <span className="text-3xl font-bold tracking-tight text-zinc-900">
              {formattedTime}
            </span>
            <span className="text-xs font-normal text-zinc-500 mt-0.5">
              Design UI Kit
            </span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={toggleTimer}
        className="w-full py-2.5 px-4 rounded-full border border-zinc-200/80 bg-white hover:bg-zinc-50/80 active:scale-[0.98] text-zinc-800 font-medium text-xs sm:text-[13px] tracking-tight transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
      >
        {isActive ? (
          <>
            <Pause className="w-3.5 h-3.5 text-zinc-600" />
            <span>Pause Focus</span>
          </>
        ) : (
          <>
            <span>Start Focus</span>
          </>
        )}
      </button>
    </div>
  );
}
