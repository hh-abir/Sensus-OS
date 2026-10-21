"use client";

import React, { useState, useEffect } from "react";
import { X, Quote, Bookmark, Sparkles, Feather, Check, CornerDownLeft } from "lucide-react";

export interface BookQuote {
  id: string;
  quote: string;
  author: string;
  source: string;
  page?: string;
  sphere: string;
  pinnedToJournal?: boolean;
}

export interface QuickBookSource {
  id: string;
  title: string;
  author: string;
  sphere: string;
}

interface NewQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (quote: Omit<BookQuote, "id">) => void;
  activeBooks?: QuickBookSource[];
}

const SPHERES = [
  { id: "Design", label: "🎨 Design & UX" },
  { id: "Focus", label: "⚡ Focus & Flow" },
  { id: "Mind", label: "🍵 Mind & Philosophy" },
  { id: "Craft", label: "🌿 Maker & Craft" },
  { id: "Life", label: "🏛 Life & Wisdom" },
];

export function NewQuoteModal({
  isOpen,
  onClose,
  onSave,
  activeBooks = [],
}: NewQuoteModalProps) {
  const [quoteText, setQuoteText] = useState("");
  const [author, setAuthor] = useState("");
  const [source, setSource] = useState("");
  const [page, setPage] = useState("");
  const [sphere, setSphere] = useState("Design");
  const [pinnedToJournal, setPinnedToJournal] = useState(true);
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);

  // Keyboard shortcut listener: Escape to close, Cmd/Ctrl+Enter to save
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        handleSave();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, quoteText, author, source, page, sphere, pinnedToJournal]);

  if (!isOpen) return null;

  const handleSelectBook = (book: QuickBookSource) => {
    if (selectedBookId === book.id) {
      // Toggle off
      setSelectedBookId(null);
      setAuthor("");
      setSource("");
    } else {
      setSelectedBookId(book.id);
      setAuthor(book.author);
      setSource(book.title);
      // Clean sphere label
      const cleanSphere = book.sphere.replace(/^[^\w\s]+/, "").trim();
      const matched = SPHERES.find((s) =>
        s.label.toLowerCase().includes(cleanSphere.toLowerCase())
      );
      if (matched) setSphere(matched.id);
    }
  };

  const handleSave = () => {
    if (!quoteText.trim()) return;

    onSave({
      quote: quoteText.trim(),
      author: author.trim() || "Anonymous",
      source: source.trim() || "Unrecorded Monograph",
      page: page.trim() ? (page.trim().startsWith("p.") ? page.trim() : `p. ${page.trim()}`) : undefined,
      sphere,
      pinnedToJournal,
    });

    // Reset fields
    setQuoteText("");
    setAuthor("");
    setSource("");
    setPage("");
    setSelectedBookId(null);
    onClose();
  };

  // Word & Reading time estimate
  const words = quoteText.trim() ? quoteText.trim().split(/\s+/).length : 0;
  const readSeconds = Math.max(3, Math.round((words / 200) * 60));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Warm Ambient Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/35 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* The Physical Archival Card / Marginalia Slip */}
      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 w-full max-w-xl bg-[#faf8f3] text-zinc-900 rounded-[28px] border border-[#e8e4d8] shadow-[0_25px_60px_-15px_rgba(50,40,30,0.22),0_4px_12px_rgba(0,0,0,0.04)] overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-auto"
      >
        {/* Hanging Bookmark Ribbon Accent */}
        <div className="absolute top-0 left-8 sm:left-10 w-4 h-6 bg-amber-700/85 rounded-b-xs shadow-xs border-x border-b border-amber-900/25 z-20 pointer-events-none" />

        {/* Top Archival Header Bar */}
        <div className="pt-5 px-6 sm:px-8 pb-3.5 border-b border-[#ece7db] flex items-center justify-between">
          <div className="flex items-center gap-2 pl-6">
            <Feather className="w-3.5 h-3.5 text-amber-700/80" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-stone-500 font-semibold">
              Archival Slip · Ex Libris
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] text-stone-400 font-mono hidden sm:inline">
              esc to close
            </span>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-stone-200/50 hover:bg-stone-200 flex items-center justify-center text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
              title="Close (Esc)"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Quick-Pick From Active Bookshelf */}
          {activeBooks.length > 0 && (
            <div>
              <p className="text-[10px] font-mono uppercase tracking-wider text-stone-400 mb-2">
                Fast Attribution · From your current shelf:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {activeBooks.map((b) => {
                  const isSelected = selectedBookId === b.id;
                  return (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => handleSelectBook(b)}
                      className={`text-xs px-2.5 py-1 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
                        isSelected
                          ? "bg-amber-100/80 border-amber-300 text-amber-950 font-semibold shadow-2xs"
                          : "bg-white/80 hover:bg-white border-[#e6e1d4] text-stone-700 hover:text-stone-950"
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 text-amber-700 stroke-[3]" />}
                      <span className="truncate max-w-[170px]">{b.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Frameless Typographic Canvas */}
          <div className="relative bg-white/60 rounded-2xl p-4 sm:p-5 border border-[#ece6d8] shadow-inner/5">
            {/* Opening Quotation Mark Watermark */}
            <div className="absolute top-2 left-3 font-serif text-4xl sm:text-5xl text-amber-900/15 select-none pointer-events-none leading-none">
              &ldquo;
            </div>

            <textarea
              rows={4}
              value={quoteText}
              onChange={(e) => setQuoteText(e.target.value)}
              placeholder="Record a thought, passage, or sentence that arrested your attention..."
              className="w-full bg-transparent border-0 focus:outline-none focus:ring-0 p-0 text-base sm:text-lg font-serif italic text-stone-900 placeholder:text-stone-300 leading-relaxed resize-none z-10 relative pl-4"
              autoFocus
            />

            {/* Live Reading Word Count */}
            <div className="flex items-center justify-between pt-2 mt-2 border-t border-stone-200/50 text-[10px] text-stone-400 font-mono">
              <span>{words} {words === 1 ? "word" : "words"}</span>
              {words > 0 && <span>~{readSeconds}s read</span>}
            </div>
          </div>

          {/* Editorial Citation Line (Inline sentence attribution) */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs text-stone-600 bg-white/40 p-3 rounded-xl border border-[#ede7d8]">
              <span className="font-serif italic text-stone-400 text-sm select-none">—</span>

              {/* Author */}
              <input
                type="text"
                placeholder="Author (e.g. Leonard Koren)"
                value={author}
                onChange={(e) => {
                  setAuthor(e.target.value);
                  setSelectedBookId(null);
                }}
                className="bg-transparent border-b border-dashed border-stone-300 hover:border-stone-400 focus:border-stone-800 pb-0.5 text-xs sm:text-[13px] text-zinc-900 font-semibold placeholder:text-stone-400 focus:outline-none min-w-[140px] flex-1"
              />

              <span className="text-stone-400 select-none">,</span>

              {/* Source / Book Title */}
              <input
                type="text"
                placeholder="Book or Monograph title"
                value={source}
                onChange={(e) => {
                  setSource(e.target.value);
                  setSelectedBookId(null);
                }}
                className="bg-transparent border-b border-dashed border-stone-300 hover:border-stone-400 focus:border-stone-800 pb-0.5 text-xs sm:text-[13px] text-zinc-800 font-serif italic placeholder:text-stone-400 focus:outline-none min-w-[160px] flex-1"
              />

              {/* Page Number */}
              <div className="flex items-center gap-1 bg-stone-200/70 px-2 py-0.5 rounded-md text-[11px] font-mono text-stone-700">
                <span className="text-stone-400 select-none">p.</span>
                <input
                  type="text"
                  placeholder="28"
                  value={page}
                  onChange={(e) => setPage(e.target.value)}
                  className="w-10 bg-transparent focus:outline-none text-zinc-900 font-mono font-medium text-center"
                />
              </div>
            </div>
          </div>

          {/* Life Sphere Selector & Pin to Journal Option */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
            {/* Sphere Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {SPHERES.map((s) => {
                const isActive = sphere === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSphere(s.id)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#edebe6] text-zinc-950 font-bold border border-zinc-400/60 shadow-2xs"
                        : "bg-white/60 hover:bg-white text-stone-600 border border-stone-200/70"
                    }`}
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>

            {/* Pin to Journal Toggle */}
            <button
              type="button"
              onClick={() => setPinnedToJournal(!pinnedToJournal)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-[11px] font-semibold border transition-all cursor-pointer self-start sm:self-auto ${
                pinnedToJournal
                  ? "bg-amber-100/90 text-amber-950 border-amber-300 shadow-2xs"
                  : "bg-white/60 text-stone-500 hover:text-stone-800 border-stone-200/80"
              }`}
              title="When enabled, this quote surfaces in your daily Journal reflection"
            >
              <Bookmark className={`w-3 h-3 ${pinnedToJournal ? "fill-amber-800 text-amber-800" : "text-stone-400"}`} />
              <span>{pinnedToJournal ? "Pinned to Journal" : "Pin to Journal"}</span>
            </button>
          </div>
        </div>

        {/* Tactile Bottom Action Bar */}
        <div className="px-6 sm:px-8 py-4 bg-[#f3efe4] border-t border-[#ece5d6] flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-full text-xs font-medium text-stone-500 hover:text-stone-800 transition-colors cursor-pointer"
          >
            Discard slip
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={!quoteText.trim()}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold shadow-2xs transition-all cursor-pointer ${
              quoteText.trim()
                ? "bg-[#edebe6] hover:bg-[#e4e1d7] text-zinc-800 border border-zinc-300/80 active:scale-98"
                : "bg-stone-200/60 text-stone-400 border border-stone-300/40 cursor-not-allowed"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Slip into Vault</span>
            <span className="text-[10px] text-stone-400 font-mono hidden sm:inline ml-0.5">
              (⌘↵)
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
