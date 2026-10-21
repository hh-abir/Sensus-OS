"use client";

import React, { useState } from "react";

export function GreetingCard() {
  const [tasksCount, setTasksCount] = useState(12);
  const [updatesCount, setUpdatesCount] = useState(6);

  return (
    <div className="sensus-ambient-card relative overflow-hidden rounded-[28px] p-7 shadow-xs border flex flex-col justify-between">
      {/* Background soft glow blobs */}
      <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-amber-200/35 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-10 w-40 h-40 rounded-full bg-orange-100/40 blur-2xl pointer-events-none" />

      {/* Greeting text */}
      <div className="relative z-10">
        <p className="text-zinc-500 font-medium text-sm tracking-tight">Hello!</p>
        <h2 className="text-2xl lg:text-[26px] font-bold text-zinc-900 tracking-tight mt-1 leading-tight">
          Good Morning, Sarah
        </h2>
        <p className="text-zinc-500 text-xs sm:text-[13px] mt-1.5 font-normal">
          Let&apos;s accomplish today&apos;s goals.
        </p>
      </div>

      {/* Badges / Pill counters */}
      <div className="relative z-10 flex flex-wrap items-center gap-2.5 mt-8">
        {/* Tasks pill */}
        <button
          onClick={() => setTasksCount((c) => c + 1)}
          className="group flex items-center gap-2 pl-1.5 pr-3.5 py-1 rounded-full bg-[#fdeecb]/80 hover:bg-[#fdeecb] transition-all cursor-pointer border border-amber-300/30 shadow-xs"
          title="Click to add task"
        >
          <span className="w-5 h-5 rounded-full bg-[#f5c661] text-zinc-950 font-bold text-[11px] flex items-center justify-center shadow-xs">
            {tasksCount}
          </span>
          <span className="text-zinc-800 font-medium text-xs">Tasks</span>
        </button>

        {/* Updates pill */}
        <button
          onClick={() => setUpdatesCount((c) => (c > 0 ? c - 1 : 6))}
          className="group flex items-center gap-2 pl-1.5 pr-3.5 py-1 rounded-full bg-[#dbeafe]/80 hover:bg-[#dbeafe] transition-all cursor-pointer border border-blue-200/50 shadow-xs"
          title="Click to acknowledge update"
        >
          <span className="w-5 h-5 rounded-full bg-[#93c5fd] text-zinc-950 font-bold text-[11px] flex items-center justify-center shadow-xs">
            {updatesCount}
          </span>
          <span className="text-zinc-800 font-medium text-xs">Updates</span>
        </button>
      </div>
    </div>
  );
}
