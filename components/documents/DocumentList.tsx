"use client";

import React, { useState } from "react";
import {
  Search,
  Star,
  MoreVertical,
  Download,
  Share2,
  FileText,
  FileCode,
  FileSpreadsheet,
  FileImage,
  ArrowUpDown,
} from "lucide-react";

export interface DocumentItem {
  id: string;
  name: string;
  category: string;
  type: "pdf" | "docx" | "fig" | "sheet" | "md";
  size: string;
  updatedAt: string;
  editor: {
    name: string;
    avatar: string;
  };
  status: "approved" | "in_review" | "draft";
  starred: boolean;
}

interface DocumentListProps {
  onSelectDoc: (doc: DocumentItem) => void;
  selectedDocId?: string;
}

export function DocumentList({ onSelectDoc, selectedDocId }: DocumentListProps) {
  const [filterTab, setFilterTab] = useState<"all" | "shared" | "recent" | "starred">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const [documents, setDocuments] = useState<DocumentItem[]>([
    {
      id: "doc-1",
      name: "Sensus Design System 2.0 Spec",
      category: "Design System & UI",
      type: "fig",
      size: "24.5 MB",
      updatedAt: "12 mins ago",
      editor: {
        name: "Sarah M.",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      },
      status: "approved",
      starred: true,
    },
    {
      id: "doc-2",
      name: "Q2 Product Roadmap & Deliverables",
      category: "Product Specs & PRD",
      type: "pdf",
      size: "4.8 MB",
      updatedAt: "1 hour ago",
      editor: {
        name: "Alex K.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      },
      status: "in_review",
      starred: true,
    },
    {
      id: "doc-3",
      name: "Brand Tone & Voice Guidelines",
      category: "Brand Guidelines",
      type: "docx",
      size: "12.2 MB",
      updatedAt: "Yesterday",
      editor: {
        name: "Maya L.",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
      },
      status: "approved",
      starred: false,
    },
    {
      id: "doc-4",
      name: "User Research & Usability Findings",
      category: "Design System & UI",
      type: "pdf",
      size: "8.1 MB",
      updatedAt: "2 days ago",
      editor: {
        name: "Marcus W.",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
      },
      status: "draft",
      starred: false,
    },
    {
      id: "doc-5",
      name: "Annual Budget & Resource Allocation",
      category: "Client Proposals",
      type: "sheet",
      size: "3.2 MB",
      updatedAt: "3 days ago",
      editor: {
        name: "Elena R.",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80",
      },
      status: "approved",
      starred: false,
    },
    {
      id: "doc-6",
      name: "REST API Integration Guidelines",
      category: "Product Specs & PRD",
      type: "md",
      size: "1.4 MB",
      updatedAt: "Last week",
      editor: {
        name: "David H.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      },
      status: "in_review",
      starred: true,
    },
  ]);

  const toggleStar = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDocuments((docs) =>
      docs.map((doc) => (doc.id === id ? { ...doc, starred: !doc.starred } : doc))
    );
  };

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (filterTab === "starred") return doc.starred;
    if (filterTab === "shared") return doc.status === "in_review";
    if (filterTab === "recent") return doc.updatedAt.includes("ago");

    return true;
  });

  const getFileBadge = (type: DocumentItem["type"]) => {
    switch (type) {
      case "fig":
        return {
          icon: FileImage,
          label: "FIG",
          bg: "bg-purple-100 text-purple-700 border-purple-200",
        };
      case "pdf":
        return {
          icon: FileText,
          label: "PDF",
          bg: "bg-red-100 text-red-700 border-red-200",
        };
      case "sheet":
        return {
          icon: FileSpreadsheet,
          label: "XLS",
          bg: "bg-emerald-100 text-emerald-700 border-emerald-200",
        };
      case "docx":
        return {
          icon: FileText,
          label: "DOC",
          bg: "bg-blue-100 text-blue-700 border-blue-200",
        };
      case "md":
        return {
          icon: FileCode,
          label: "MD",
          bg: "bg-amber-100 text-amber-800 border-amber-200",
        };
    }
  };

  const getStatusBadge = (status: DocumentItem["status"]) => {
    switch (status) {
      case "approved":
        return {
          label: "Approved",
          style: "bg-[#ebf8f2] text-[#22c55e]",
        };
      case "in_review":
        return {
          label: "In Review",
          style: "bg-[#fdeeed] text-[#f87171]",
        };
      case "draft":
        return {
          label: "Draft",
          style: "bg-[#f4f4f5] text-[#71717a]",
        };
    }
  };

  return (
    <div className="bg-white rounded-[28px] p-6 shadow-xs border border-zinc-200/50 flex flex-col justify-between">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-zinc-100">
        {/* Filter Tabs */}
        <div className="flex items-center gap-1 bg-[#edebe6] p-1 rounded-full border border-zinc-200/40 w-fit">
          {(
            [
              { id: "all", label: "All Files" },
              { id: "shared", label: "Shared" },
              { id: "recent", label: "Recent" },
              { id: "starred", label: "Starred" },
            ] as const
          ).map((tab) => {
            const isActive = filterTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setFilterTab(tab.id)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-white text-zinc-900 shadow-xs"
                    : "text-zinc-500 hover:text-zinc-900"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Search bar inside list */}
        <div className="flex items-center gap-2 bg-zinc-50 border border-zinc-200/60 rounded-full px-3.5 py-1.5 w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
          <input
            type="text"
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none w-full"
          />
        </div>
      </div>

      {/* Table / List Header */}
      <div className="hidden md:grid grid-cols-12 gap-4 px-3 py-3 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
        <div className="col-span-6">Name</div>
        <div className="col-span-2">Updated</div>
        <div className="col-span-2">Status</div>
        <div className="col-span-2 text-right">Actions</div>
      </div>

      {/* Document Rows */}
      <div className="divide-y divide-zinc-100">
        {filteredDocs.length === 0 ? (
          <div className="text-center py-12 text-zinc-400 text-xs">
            No documents found matching your filter.
          </div>
        ) : (
          filteredDocs.map((doc) => {
            const badge = getFileBadge(doc.type);
            const status = getStatusBadge(doc.status);
            const isSelected = selectedDocId === doc.id;

            return (
              <div
                key={doc.id}
                onClick={() => onSelectDoc(doc)}
                className={`group grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 items-center p-3 rounded-2xl transition-all cursor-pointer ${
                  isSelected
                    ? "bg-zinc-50 ring-1 ring-zinc-200/80"
                    : "hover:bg-zinc-50/70"
                }`}
              >
                {/* Name & Type Badge */}
                <div className="col-span-12 md:col-span-6 flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-[10px] shrink-0 border ${badge.bg}`}
                  >
                    {badge.label}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-zinc-900 group-hover:text-zinc-950 truncate">
                      {doc.name}
                    </p>
                    <p className="text-[11px] text-zinc-400 font-normal">
                      {doc.category} • {doc.size}
                    </p>
                  </div>
                </div>

                {/* Updated & Editor Avatar */}
                <div className="col-span-6 md:col-span-2 flex items-center gap-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={doc.editor.avatar}
                    alt={doc.editor.name}
                    className="w-5 h-5 rounded-full object-cover border border-white shadow-xs shrink-0"
                  />
                  <span className="text-xs text-zinc-600 truncate">
                    {doc.updatedAt}
                  </span>
                </div>

                {/* Status Badge */}
                <div className="col-span-4 md:col-span-2">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-tight ${status.style}`}
                  >
                    {status.label}
                  </span>
                </div>

                {/* Actions & Star */}
                <div className="col-span-2 md:col-span-2 flex items-center justify-end gap-1.5">
                  <button
                    onClick={(e) => toggleStar(doc.id, e)}
                    className="p-1.5 rounded-full hover:bg-zinc-200/60 transition-colors text-zinc-400 hover:text-amber-400 cursor-pointer"
                    title={doc.starred ? "Unstar" : "Star"}
                  >
                    <Star
                      className={`w-3.5 h-3.5 ${
                        doc.starred
                          ? "fill-amber-400 text-amber-400"
                          : "text-zinc-400"
                      }`}
                    />
                  </button>

                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="p-1.5 rounded-full hover:bg-zinc-200/60 transition-colors text-zinc-400 hover:text-zinc-800 cursor-pointer"
                    title="Download"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="p-1.5 rounded-full hover:bg-zinc-200/60 transition-colors text-zinc-400 hover:text-zinc-800 cursor-pointer"
                    title="Share"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
