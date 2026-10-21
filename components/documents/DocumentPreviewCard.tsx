"use client";

import React from "react";
import { DocumentItem } from "./DocumentList";
import {
  ExternalLink,
  Share2,
  Download,
  Clock,
  CheckCircle2,
  Users,
  FileText,
} from "lucide-react";

interface DocumentPreviewCardProps {
  document: DocumentItem;
}

export function DocumentPreviewCard({ document }: DocumentPreviewCardProps) {
  return (
    <div className="bg-white rounded-[28px] p-6 shadow-xs border border-zinc-200/50 flex flex-col justify-between h-full">
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
          <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
            Document Inspector
          </span>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-700">
            v2.4
          </span>
        </div>

        {/* Visual Document Thumbnail Card */}
        <div className="mt-4 rounded-2xl p-4 bg-gradient-to-br from-amber-50/80 via-white to-blue-50/60 border border-zinc-200/50 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-zinc-700 bg-white/90 px-2.5 py-1 rounded-lg border border-zinc-200/40 shadow-xs">
              {document.type.toUpperCase()}
            </span>
            <span className="text-[11px] text-zinc-400 font-medium">
              {document.size}
            </span>
          </div>

          <div className="my-6 text-center">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-zinc-200/60 flex items-center justify-center mx-auto text-zinc-700">
              <FileText className="w-6 h-6 text-zinc-600" />
            </div>
            <h4 className="text-sm font-bold text-zinc-900 mt-3 truncate px-2">
              {document.name}
            </h4>
            <p className="text-xs text-zinc-500 font-normal mt-0.5">
              {document.category}
            </p>
          </div>
        </div>

        {/* Collaborators */}
        <div className="mt-5">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-semibold text-zinc-800">Collaborators</span>
            <span className="text-zinc-400 text-[11px]">3 Members</span>
          </div>
          <div className="flex items-center justify-between p-2.5 bg-zinc-50 rounded-2xl border border-zinc-200/40">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="Sarah"
                  className="w-7 h-7 rounded-full border-2 border-white object-cover shadow-xs"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                  alt="Alex"
                  className="w-7 h-7 rounded-full border-2 border-white object-cover shadow-xs"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                  alt="Maya"
                  className="w-7 h-7 rounded-full border-2 border-white object-cover shadow-xs"
                />
              </div>
              <span className="text-xs text-zinc-600 font-medium">
                Sarah, Alex +1
              </span>
            </div>
            <button className="text-xs font-semibold text-zinc-700 hover:text-zinc-950 cursor-pointer">
              Manage
            </button>
          </div>
        </div>

        {/* Activity & Version Timeline */}
        <div className="mt-5">
          <span className="text-xs font-semibold text-zinc-800 block mb-3">
            Recent Activity
          </span>
          <div className="space-y-3 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-zinc-100">
            <div className="flex items-start gap-3 relative z-10 text-xs">
              <span className="w-4 h-4 rounded-full bg-[#52c8b0] text-white flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-3 h-3" />
              </span>
              <div>
                <p className="font-semibold text-zinc-900">Changes approved</p>
                <p className="text-[11px] text-zinc-400">By Alex K. • 12m ago</p>
              </div>
            </div>

            <div className="flex items-start gap-3 relative z-10 text-xs">
              <span className="w-4 h-4 rounded-full bg-amber-300 text-zinc-900 flex items-center justify-center shrink-0 mt-0.5">
                <Clock className="w-2.5 h-2.5" />
              </span>
              <div>
                <p className="font-semibold text-zinc-900">Updated design tokens</p>
                <p className="text-[11px] text-zinc-400">By Sarah M. • 1h ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 pt-4 border-t border-zinc-100 flex flex-col gap-2">
        <button className="w-full py-2.5 px-4 rounded-full bg-[#edebe6] hover:bg-[#e4e1d7] text-zinc-800 border border-zinc-300/70 font-semibold text-xs shadow-2xs transition-all flex items-center justify-center gap-2 cursor-pointer">
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Open in Editor</span>
        </button>

        <div className="flex items-center gap-2">
          <button className="flex-1 py-2 px-3 rounded-full border border-zinc-200/80 bg-white hover:bg-zinc-50 text-zinc-700 font-medium text-xs flex items-center justify-center gap-1.5 cursor-pointer">
            <Share2 className="w-3 h-3 text-zinc-500" />
            <span>Share</span>
          </button>
          <button className="flex-1 py-2 px-3 rounded-full border border-zinc-200/80 bg-white hover:bg-zinc-50 text-zinc-700 font-medium text-xs flex items-center justify-center gap-1.5 cursor-pointer">
            <Download className="w-3 h-3 text-zinc-500" />
            <span>Export</span>
          </button>
        </div>
      </div>
    </div>
  );
}
