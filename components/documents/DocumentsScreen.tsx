"use client";

import React, { useState } from "react";
import { Folder, Quote } from "lucide-react";
import { DocumentStats } from "./DocumentStats";
import { FolderGrid } from "./FolderGrid";
import { DocumentList, DocumentItem } from "./DocumentList";
import { DocumentPreviewCard } from "./DocumentPreviewCard";
import { ReadingSanctuary } from "./ReadingSanctuary";

export function DocumentsScreen() {
  const [activeTab, setActiveTab] = useState<"vault" | "quotes">("vault");
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem>({
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
  });

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Top Segmented Workspace Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white rounded-[24px] px-6 py-3.5 shadow-xs border border-zinc-200/50">
        <div>
          <h2 className="text-base font-bold text-zinc-950 tracking-tight">
            {activeTab === "vault" ? "Documents & Specs Vault" : "Quotes Sanctuary & Marginalia"}
          </h2>
          <p className="text-[11px] text-zinc-400">
            {activeTab === "vault"
              ? "Design specifications, research drafts, and project archives"
              : "Curated thoughts, aphorisms, and clipped literary marginalia"}
          </p>
        </div>

        {/* View Switcher Pill */}
        <div className="flex items-center gap-1 bg-[#edebe6] p-1 rounded-2xl border border-zinc-200/50 self-start sm:self-center">
          <button
            onClick={() => setActiveTab("vault")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "vault"
                ? "bg-white text-zinc-900 shadow-2xs font-bold"
                : "text-zinc-600 hover:text-zinc-950"
            }`}
          >
            <Folder className="w-3.5 h-3.5" />
            <span>Vault & Files</span>
          </button>
          <button
            onClick={() => setActiveTab("quotes")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "quotes"
                ? "bg-white text-zinc-900 shadow-2xs font-bold"
                : "text-zinc-600 hover:text-zinc-950"
            }`}
          >
            <Quote className="w-3.5 h-3.5" />
            <span>Quotes Sanctuary</span>
          </button>
        </div>
      </div>

      {/* Dynamic Content */}
      {activeTab === "vault" ? (
        <div className="flex flex-col gap-6 animate-in fade-in duration-150">
          {/* 1. Storage & Overview Metrics */}
          <DocumentStats onNewDoc={() => alert("Create New Document dialog opened!")} />

          {/* 2. Quick Folders / Categories */}
          <FolderGrid />

          {/* 3. Main Area: Document Table (Left) + Document Inspector (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Document List Table */}
            <div className="lg:col-span-8">
              <DocumentList
                onSelectDoc={(doc) => setSelectedDoc(doc)}
                selectedDocId={selectedDoc.id}
              />
            </div>

            {/* Selected Document Inspector Preview */}
            <div className="lg:col-span-4">
              <DocumentPreviewCard document={selectedDoc} />
            </div>
          </div>
        </div>
      ) : (
        <ReadingSanctuary />
      )}
    </div>
  );
}
