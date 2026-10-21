"use client";

import React from "react";
import { Folder, MoreHorizontal, ArrowUpRight } from "lucide-react";

interface FolderItem {
  id: string;
  name: string;
  fileCount: number;
  size: string;
  updated: string;
  color: {
    bg: string;
    text: string;
    border: string;
  };
}

export function FolderGrid() {
  const folders: FolderItem[] = [
    {
      id: "design-system",
      name: "Design System & UI",
      fileCount: 18,
      size: "240 MB",
      updated: "2 hours ago",
      color: {
        bg: "bg-[#eafaf5]",
        text: "text-[#2e9e80]",
        border: "border-[#d1f2e6]",
      },
    },
    {
      id: "product-specs",
      name: "Product Specs & PRD",
      fileCount: 12,
      size: "84 MB",
      updated: "Yesterday",
      color: {
        bg: "bg-[#fef8e7]",
        text: "text-[#d97706]",
        border: "border-[#fde68a]",
      },
    },
    {
      id: "client-briefs",
      name: "Client Proposals",
      fileCount: 9,
      size: "112 MB",
      updated: "3 days ago",
      color: {
        bg: "bg-[#eff6ff]",
        text: "text-[#3b82f6]",
        border: "border-[#bfdbfe]",
      },
    },
    {
      id: "brand-assets",
      name: "Brand Guidelines",
      fileCount: 15,
      size: "520 MB",
      updated: "Last week",
      color: {
        bg: "bg-[#fdf2f8]",
        text: "text-[#ec4899]",
        border: "border-[#fbcfe8]",
      },
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {folders.map((folder) => (
        <div
          key={folder.id}
          className="group bg-white rounded-[26px] p-5 shadow-xs border border-zinc-200/50 hover:border-zinc-300/80 transition-all cursor-pointer flex flex-col justify-between"
        >
          {/* Top row: folder icon & action */}
          <div className="flex items-center justify-between">
            <div
              className={`w-11 h-11 rounded-2xl ${folder.color.bg} ${folder.color.text} flex items-center justify-center border ${folder.color.border}`}
            >
              <Folder className="w-5 h-5 fill-current/20" />
            </div>
            <div className="w-7 h-7 rounded-full bg-zinc-50 group-hover:bg-zinc-100 flex items-center justify-center text-zinc-400 group-hover:text-zinc-800 transition-colors">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Folder Name & Info */}
          <div className="mt-4">
            <h4 className="text-sm font-semibold text-zinc-900 group-hover:text-zinc-950 truncate">
              {folder.name}
            </h4>
            <p className="text-xs text-zinc-400 font-normal mt-0.5">
              {folder.fileCount} files • {folder.size}
            </p>
          </div>

          {/* Updated Badge */}
          <div className="mt-4 pt-3 border-t border-zinc-100/80 flex items-center justify-between text-[11px] text-zinc-400">
            <span>Updated</span>
            <span className="font-medium text-zinc-600">{folder.updated}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
