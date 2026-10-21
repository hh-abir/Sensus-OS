"use client";

import React, { useState } from "react";
import { DocumentStats } from "./DocumentStats";
import { FolderGrid } from "./FolderGrid";
import { DocumentList, DocumentItem } from "./DocumentList";
import { DocumentPreviewCard } from "./DocumentPreviewCard";

export function DocumentsScreen() {
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
  );
}
