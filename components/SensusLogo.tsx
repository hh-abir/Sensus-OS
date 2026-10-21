"use client";

import React from "react";

export function SensusLogoIcon({ className = "w-9 h-9" }: { className?: string }) {
  return (
    <div
      className={`relative rounded-xl overflow-hidden shadow-xs shrink-0 flex items-center justify-center ${className}`}
      style={{
        background: `radial-gradient(circle at 20% 20%, #fde047 0%, transparent 45%),
                     radial-gradient(circle at 80% 20%, #fb7185 0%, transparent 50%),
                     radial-gradient(circle at 80% 80%, #38bdf8 0%, transparent 55%),
                     radial-gradient(circle at 20% 80%, #c084fc 0%, transparent 50%),
                     linear-gradient(135deg, #fcd34d 0%, #f472b6 40%, #818cf8 70%, #38bdf8 100%)`,
      }}
    >
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[0.5px]" />
    </div>
  );
}

export function SensusBrand() {
  return (
    <div className="flex items-center gap-3">
      <SensusLogoIcon className="w-9 h-9 rounded-xl shadow-sm" />
      <span className="text-xl font-bold tracking-tight text-zinc-900">Sensus</span>
    </div>
  );
}
