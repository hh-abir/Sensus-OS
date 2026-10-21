"use client";

import React, { useState } from "react";
import {
  Camera,
  Sparkles,
  Shuffle,
  Quote,
  Heart,
  Calendar,
  ArrowUpRight,
} from "lucide-react";

export function JournalSidebarCard() {
  const prompts = [
    "What is a small victory from this week that went unnoticed?",
    "What gave you authentic energy today, and what drained you?",
    "If tomorrow morning were completely open, what creative pursuit would you dive into?",
    "What is something you learned this week about how you focus best?",
    "Who is someone you are grateful to have in your corner right now?",
  ];

  const [promptIndex, setPromptIndex] = useState(0);

  const handleShufflePrompt = () => {
    setPromptIndex((prev) => (prev + 1) % prompts.length);
  };

  return (
    <div className="flex flex-col gap-5 h-full">
      {/* 1. Today's Visual Snapshot Card */}
      <div className="bg-white rounded-[28px] p-5 shadow-xs border border-zinc-200/50 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
              Visual Snapshot
            </span>
            <span className="text-[11px] font-semibold text-zinc-500">
              Memory Log
            </span>
          </div>

          {/* Photo Frame */}
          <div className="mt-3.5 relative rounded-2xl overflow-hidden aspect-4/3 border border-zinc-200/60 shadow-2xs group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80"
              alt="Morning Coffee & Sketchbook"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
              <p className="text-white text-xs font-medium drop-shadow-sm leading-tight">
                Fresh ceramic mug test & morning pourover
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => alert("Photo upload dialog")}
          className="mt-3.5 pt-3 border-t border-zinc-100 w-full flex items-center justify-center gap-1.5 text-xs font-semibold text-zinc-700 hover:text-zinc-950 transition-colors cursor-pointer"
        >
          <Camera className="w-3.5 h-3.5 text-zinc-400" />
          <span>Change Today&apos;s Photo</span>
        </button>
      </div>

      {/* 2. Mindfulness Quote Card */}
      <div
        className="relative overflow-hidden rounded-[28px] p-6 shadow-xs border border-amber-200/40 flex flex-col justify-between"
        style={{
          background: `radial-gradient(ellipse at 85% 15%, rgba(254, 215, 170, 0.75) 0%, rgba(254, 240, 138, 0.45) 45%, rgba(255, 251, 235, 0.8) 75%, #ffffff 100%)`,
        }}
      >
        <div className="relative z-10">
          <div className="w-8 h-8 rounded-xl bg-amber-300 text-zinc-900 flex items-center justify-center font-bold mb-3 shadow-2xs">
            <Quote className="w-4 h-4 fill-current" />
          </div>

          <p className="text-xs sm:text-[13px] font-semibold text-zinc-800 leading-relaxed italic">
            &ldquo;Simplicity is about subtracting the obvious and adding the meaningful.&rdquo;
          </p>

          <p className="text-[11px] font-bold text-zinc-500 mt-2 uppercase tracking-wider">
            — John Maeda, The Laws of Simplicity
          </p>
        </div>
      </div>

      {/* 3. Thoughtful Reflection Prompt Shuffler */}
      <div className="bg-white rounded-[28px] p-5 shadow-xs border border-zinc-200/50 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
            <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-900">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Prompt of the Day</span>
            </div>

            <button
              onClick={handleShufflePrompt}
              className="p-1 rounded-full hover:bg-zinc-100 text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer"
              title="Shuffle prompt"
            >
              <Shuffle className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-xs text-zinc-700 font-medium leading-relaxed mt-3.5 p-3 rounded-xl bg-zinc-50 border border-zinc-200/60">
            &ldquo;{prompts[promptIndex]}&rdquo;
          </p>
        </div>

        <button
          onClick={handleShufflePrompt}
          className="mt-3.5 pt-3 border-t border-zinc-100 w-full flex items-center justify-center gap-1.5 text-xs font-semibold text-zinc-600 hover:text-zinc-950 transition-colors cursor-pointer"
        >
          <span>Roll Another Prompt 🎲</span>
        </button>
      </div>
    </div>
  );
}
