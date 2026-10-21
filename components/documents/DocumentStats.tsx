"use client";

import React from "react";
import { Plus, ArrowUpRight, Cloud, Users, FileCheck } from "lucide-react";

interface DocumentStatsProps {
  onNewDoc?: () => void;
}

export function DocumentStats({ onNewDoc }: DocumentStatsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
      {/* Amber Greeting & Quick Action Banner (approx 5/12 cols) */}
      <div className="sensus-ambient-card lg:col-span-5 relative overflow-hidden rounded-[28px] p-7 shadow-xs border flex flex-col justify-between">
        {/* Ambient glow blobs */}
        <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-amber-200/40 blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <span className="text-zinc-500 font-medium text-xs tracking-tight uppercase">
            Personal Vault & Notes
          </span>
          <h2 className="text-2xl font-bold text-zinc-900 tracking-tight mt-1 leading-snug">
            Knowledge Base & Notes
          </h2>
          <p className="text-zinc-500 text-xs sm:text-[13px] mt-1 font-normal">
            Manage creative sketches, study notes, recipes, and personal project specs.
          </p>
        </div>

        {/* Action button & badges */}
        <div className="relative z-10 mt-6 flex flex-wrap items-center gap-2.5">
          <button
            onClick={onNewDoc}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Document</span>
          </button>

          <div className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-[#fdeecb]/90 border border-amber-300/40 text-xs font-medium text-zinc-800">
            <span className="w-5 h-5 rounded-full bg-[#f5c661] text-zinc-950 font-bold text-[11px] flex items-center justify-center">
              48
            </span>
            <span>Files</span>
          </div>

          <div className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-[#dbeafe]/90 border border-blue-200/50 text-xs font-medium text-zinc-800">
            <span className="w-5 h-5 rounded-full bg-[#93c5fd] text-zinc-950 font-bold text-[11px] flex items-center justify-center">
              12
            </span>
            <span>Shared</span>
          </div>
        </div>
      </div>

      {/* 3 Metric Cards (approx 7/12 cols) */}
      <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Card 1: Storage */}
        <div className="bg-white rounded-[26px] p-5 shadow-xs border border-zinc-200/50 flex flex-col justify-between hover:border-zinc-300/80 transition-all">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
              <Cloud className="w-4 h-4" />
            </div>
            <div className="w-6 h-6 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400">
              <ArrowUpRight className="w-3 h-3" />
            </div>
          </div>

          <div className="my-3">
            <span className="text-2xl font-bold text-zinc-900 tracking-tight">
              4.8 GB
            </span>
            <span className="text-xs text-zinc-400 ml-1">/ 15 GB</span>

            {/* Storage Progress bar */}
            <div className="w-full h-2 bg-zinc-100 rounded-full mt-2.5 overflow-hidden">
              <div
                className="h-full bg-[#52c8b0] rounded-full"
                style={{ width: "32%" }}
              />
            </div>
          </div>

          <div>
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#ebf8f2] text-[#22c55e]">
              32% Used
            </span>
          </div>
        </div>

        {/* Card 2: Team Collaborators */}
        <div className="bg-white rounded-[26px] p-5 shadow-xs border border-zinc-200/50 flex flex-col justify-between hover:border-zinc-300/80 transition-all">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
              <Users className="w-4 h-4" />
            </div>
            <div className="w-6 h-6 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400">
              <ArrowUpRight className="w-3 h-3" />
            </div>
          </div>

          <div className="my-3">
            <span className="text-2xl font-bold text-zinc-900 tracking-tight">
              14
            </span>
            <p className="text-xs text-zinc-500 mt-1 font-medium">Collaborators</p>
          </div>

          <div>
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#ebf8f2] text-[#22c55e]">
              +3 Active today
            </span>
          </div>
        </div>

        {/* Card 3: Pending Signoff */}
        <div className="bg-white rounded-[26px] p-5 shadow-xs border border-zinc-200/50 flex flex-col justify-between hover:border-zinc-300/80 transition-all">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
              <FileCheck className="w-4 h-4" />
            </div>
            <div className="w-6 h-6 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400">
              <ArrowUpRight className="w-3 h-3" />
            </div>
          </div>

          <div className="my-3">
            <span className="text-2xl font-bold text-zinc-900 tracking-tight">
              6
            </span>
            <p className="text-xs text-zinc-500 mt-1 font-medium">Pending Review</p>
          </div>

          <div>
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#fdeeed] text-[#f87171]">
              Due this week
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
