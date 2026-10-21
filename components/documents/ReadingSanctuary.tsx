"use client";

import React, { useState } from "react";
import {
  Quote,
  Bookmark,
  Sparkles,
  Copy,
  Check,
  Plus,
  Shuffle,
  Trash2,
  Headphones,
  Search,
  BookOpen,
} from "lucide-react";
import { useFocus } from "../focus/FocusContext";
import { NewQuoteModal, BookQuote, QuickBookSource } from "./NewQuoteModal";

// Initial curated literary quotes reflecting calm craft, focus, and intentional living
const INITIAL_QUOTES: BookQuote[] = [
  {
    id: "q-1",
    quote:
      "Two of the most important characteristics of good design are discoverability and understanding.",
    author: "Don Norman",
    source: "The Design of Everyday Things",
    page: "p. 4",
    sphere: "Design",
    pinnedToJournal: true,
  },
  {
    id: "q-2",
    quote:
      "Pare down to the essence, but don't remove the poetry. Keep things clean without making them clinical.",
    author: "Leonard Koren",
    source: "Wabi-Sabi for Artists, Designers & Poets",
    page: "p. 28",
    sphere: "Mind",
    pinnedToJournal: true,
  },
  {
    id: "q-3",
    quote:
      "Clutter is not just physical stuff. It's old ideas, toxic relationships, and bad habits that drain focus.",
    author: "Cal Newport",
    source: "Digital Minimalism",
    page: "p. 84",
    sphere: "Focus",
    pinnedToJournal: false,
  },
  {
    id: "q-4",
    quote:
      "Good design is as little design as possible. Less, but better — because it concentrates on the essential aspects.",
    author: "Dieter Rams",
    source: "Ten Principles for Good Design",
    page: "p. 12",
    sphere: "Design",
    pinnedToJournal: true,
  },
  {
    id: "q-5",
    quote:
      "Simplicity is about subtracting the obvious and adding the meaningful.",
    author: "John Maeda",
    source: "The Laws of Simplicity",
    page: "p. 1",
    sphere: "Design",
    pinnedToJournal: false,
  },
  {
    id: "q-6",
    quote:
      "Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away.",
    author: "Antoine de Saint-Exupéry",
    source: "Airman's Odyssey",
    page: "p. 42",
    sphere: "Craft",
    pinnedToJournal: true,
  },
  {
    id: "q-7",
    quote:
      "The happiness of your life depends upon the quality of your thoughts.",
    author: "Marcus Aurelius",
    source: "Meditations",
    page: "Book IV",
    sphere: "Life",
    pinnedToJournal: false,
  },
  {
    id: "q-8",
    quote:
      "To be everywhere is to be nowhere. Deliberate attention is the currency of a well-lived day.",
    author: "Seneca",
    source: "Letters from a Stoic",
    page: "Letter II",
    sphere: "Focus",
    pinnedToJournal: true,
  },
  {
    id: "q-9",
    quote:
      "There is a profound and enduring beauty in simplicity, in clarity, in quiet efficiency.",
    author: "Jony Ive",
    source: "Making Ideas Physical",
    page: "p. 17",
    sphere: "Craft",
    pinnedToJournal: false,
  },
];

const SPHERE_LABELS: Record<string, string> = {
  All: "All Spheres",
  Design: "🎨 Design & UX",
  Focus: "⚡ Focus & Flow",
  Mind: "🍵 Mind & Philosophy",
  Craft: "🌿 Maker & Craft",
  Life: "🏛 Life & Wisdom",
};

export function ReadingSanctuary() {
  const { startFocus, setSoundscape } = useFocus();
  const [quotes, setQuotes] = useState<BookQuote[]>(INITIAL_QUOTES);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [copiedQuoteId, setCopiedQuoteId] = useState<string | null>(null);
  const [selectedSphere, setSelectedSphere] = useState<string>("All");
  const [filterPinnedOnly, setFilterPinnedOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [featuredIndex, setFeaturedIndex] = useState(1); // Default to Leonard Koren's quote

  // Featured Daily Quote
  const featuredQuote = quotes[featuredIndex % quotes.length] || quotes[0];

  const handleShuffleFeatured = () => {
    setFeaturedIndex((prev) => (prev + 1) % quotes.length);
  };

  const handleCopyQuote = (quote: BookQuote) => {
    const citation = quote.page
      ? `"${quote.quote}" — ${quote.author}, ${quote.source} (${quote.page})`
      : `"${quote.quote}" — ${quote.author}, ${quote.source}`;
    navigator.clipboard.writeText(citation);
    setCopiedQuoteId(quote.id);
    setTimeout(() => setCopiedQuoteId(null), 2000);
  };

  const handleTogglePin = (quoteId: string) => {
    setQuotes((prev) =>
      prev.map((q) =>
        q.id === quoteId ? { ...q, pinnedToJournal: !q.pinnedToJournal } : q
      )
    );
  };

  const handleDeleteQuote = (quoteId: string) => {
    setQuotes((prev) => prev.filter((q) => q.id !== quoteId));
  };

  const handleAddQuote = (newQuoteData: Omit<BookQuote, "id">) => {
    const newQuote: BookQuote = {
      ...newQuoteData,
      id: `q-${Date.now()}`,
    };
    setQuotes((prev) => [newQuote, ...prev]);
    // Set newly created quote as featured
    setFeaturedIndex(0);
  };

  const handleStartReflectFocus = (quote: BookQuote) => {
    setSoundscape("rain");
    startFocus(`Reflect: "${quote.author}"`, 15);
  };

  // Filtered list
  const filteredQuotes = quotes.filter((q) => {
    const matchesSphere =
      selectedSphere === "All" || q.sphere.toLowerCase() === selectedSphere.toLowerCase();
    const matchesPinned = !filterPinnedOnly || q.pinnedToJournal;
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !query ||
      q.quote.toLowerCase().includes(query) ||
      q.author.toLowerCase().includes(query) ||
      q.source.toLowerCase().includes(query);

    return matchesSphere && matchesPinned && matchesSearch;
  });

  const pinnedCount = quotes.filter((q) => q.pinnedToJournal).length;

  // Active suggestions for modal auto-completion
  const curatedSuggestions: QuickBookSource[] = [
    { id: "s-1", title: "Wabi-Sabi for Artists & Designers", author: "Leonard Koren", sphere: "Mind" },
    { id: "s-2", title: "Ten Principles for Good Design", author: "Dieter Rams", sphere: "Design" },
    { id: "s-3", title: "The Design of Everyday Things", author: "Don Norman", sphere: "Design" },
    { id: "s-4", title: "Digital Minimalism", author: "Cal Newport", sphere: "Focus" },
    { id: "s-5", title: "The Laws of Simplicity", author: "John Maeda", sphere: "Design" },
  ];

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in duration-200">
      {/* =========================================================================
          ROW 1: Asymmetric 68% (Featured Monograph) / 32% (Curator's Compass)
          ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: The Exhibition Monograph Card (68% / 8 cols) */}
        <div className="lg:col-span-8 bg-gradient-to-br from-white via-[#fcfbf9] to-[#faf7ef] rounded-[30px] p-7 sm:p-9 shadow-xs border border-zinc-200/60 flex flex-col justify-between relative overflow-hidden group">
          {/* Subtle Watermark Quotation Mark */}
          <div className="absolute -top-6 -right-3 font-serif text-[120px] text-amber-900/5 select-none pointer-events-none leading-none">
            &ldquo;
          </div>

          <div>
            {/* Top Badge Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-zinc-200/50">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-900 bg-amber-100/70 border border-amber-200/80 px-2.5 py-0.5 rounded-full font-semibold">
                  Featured Reflection
                </span>
                <span className="text-xs text-zinc-400">·</span>
                <span className="text-xs font-medium text-zinc-500">
                  {SPHERE_LABELS[featuredQuote.sphere] || featuredQuote.sphere}
                </span>
              </div>

              {/* Shuffle Daily Spark */}
              <button
                type="button"
                onClick={handleShuffleFeatured}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 hover:bg-white text-zinc-700 hover:text-zinc-950 border border-zinc-200/70 text-xs font-medium shadow-2xs transition-all cursor-pointer active:scale-95"
                title="Rotate to another memorable passage"
              >
                <Shuffle className="w-3 h-3 text-amber-700" />
                <span>Next Reflection</span>
              </button>
            </div>

            {/* Expansive Editorial Quote Body */}
            <div className="py-6 sm:py-8">
              <blockquote className="font-serif italic text-lg sm:text-2xl lg:text-[25px] text-zinc-900 leading-relaxed tracking-tight">
                &ldquo;{featuredQuote.quote}&rdquo;
              </blockquote>

              {/* Attribution */}
              <div className="mt-4 flex flex-wrap items-baseline gap-2 text-sm">
                <span className="font-bold text-zinc-900">
                  {featuredQuote.author}
                </span>
                <span className="text-zinc-400 font-serif italic text-xs">—</span>
                <span className="text-zinc-600 font-serif italic text-xs sm:text-sm">
                  {featuredQuote.source}
                </span>
                {featuredQuote.page && (
                  <span className="text-[11px] font-mono text-zinc-400 bg-black/5 px-2 py-0.5 rounded-md">
                    {featuredQuote.page}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Reflection Actions */}
          <div className="pt-4 border-t border-zinc-200/50 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => handleStartReflectFocus(featuredQuote)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#edebe6] hover:bg-[#e4e1d7] text-zinc-800 border border-zinc-300/80 text-xs font-semibold shadow-2xs transition-all cursor-pointer active:scale-98"
              title="Launch a 15-minute ambient contemplation session"
            >
              <Headphones className="w-3.5 h-3.5 text-amber-700" />
              <span>Contemplate with Ambient Rain (15m)</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleTogglePin(featuredQuote.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                  featuredQuote.pinnedToJournal
                    ? "bg-amber-100 text-amber-950 border-amber-300 shadow-2xs font-semibold"
                    : "bg-white/80 hover:bg-white text-zinc-600 border-zinc-200/80"
                }`}
                title="Pin this quote to morning reflections"
              >
                <Bookmark
                  className={`w-3.5 h-3.5 ${
                    featuredQuote.pinnedToJournal ? "fill-amber-800 text-amber-800" : "text-zinc-400"
                  }`}
                />
                <span>{featuredQuote.pinnedToJournal ? "Pinned to Journal" : "Pin to Journal"}</span>
              </button>

              <button
                type="button"
                onClick={() => handleCopyQuote(featuredQuote)}
                className="p-2 rounded-xl bg-white/80 hover:bg-white border border-zinc-200/80 text-zinc-600 hover:text-zinc-900 transition-colors cursor-pointer"
                title="Copy Quote citation"
              >
                {copiedQuoteId === featuredQuote.id ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right: Curator's Compass & Clipping Controls (32% / 4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-[30px] p-6 sm:p-7 shadow-xs border border-zinc-200/50 flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="pb-4 border-b border-zinc-100">
              <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/60 uppercase tracking-wider font-mono">
                Curator&apos;s Sanctuary
              </span>
              <h3 className="text-base font-bold text-zinc-900 tracking-tight mt-1.5">
                Marginalia Vault
              </h3>
              <p className="text-[11px] text-zinc-400">
                Aphorisms and passages preserved from fine reading
              </p>
            </div>

            {/* Metrics Snapshot */}
            <div className="grid grid-cols-2 gap-3 my-4">
              <div className="p-3.5 rounded-2xl bg-zinc-50/80 border border-zinc-200/60">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                  Preserved
                </span>
                <p className="text-xl font-bold font-mono text-zinc-900 mt-0.5">
                  {quotes.length}
                </p>
                <span className="text-[10px] text-zinc-500">Clippings</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/60">
                <span className="text-[10px] font-mono text-amber-700 uppercase tracking-wider">
                  Journal Pins
                </span>
                <p className="text-xl font-bold font-mono text-amber-950 mt-0.5">
                  {pinnedCount}
                </p>
                <span className="text-[10px] text-amber-800">Daily Prompts</span>
              </div>
            </div>

            {/* Filter by Life Sphere */}
            <div className="space-y-1.5 pt-1">
              <label className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider font-mono">
                Filter by Theme
              </label>
              <div className="flex flex-wrap gap-1.5">
                {Object.entries(SPHERE_LABELS).map(([key, label]) => {
                  const isActive = selectedSphere === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedSphere(key)}
                      className={`text-xs px-2.5 py-1 rounded-xl transition-all cursor-pointer font-medium ${
                        isActive
                          ? "bg-zinc-900 text-white font-semibold shadow-2xs"
                          : "bg-zinc-100/80 hover:bg-zinc-200/70 text-zinc-700"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Pinned Only Toggle */}
            <div className="pt-3">
              <button
                type="button"
                onClick={() => setFilterPinnedOnly(!filterPinnedOnly)}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs transition-all cursor-pointer ${
                  filterPinnedOnly
                    ? "bg-amber-100/80 border-amber-300 text-amber-950 font-semibold"
                    : "bg-zinc-50 border-zinc-200/60 text-zinc-600 hover:text-zinc-900"
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <Bookmark className={`w-3.5 h-3.5 ${filterPinnedOnly ? "fill-amber-800" : ""}`} />
                  <span>Show Pinned to Journal only</span>
                </span>
                <span className="font-mono text-[10px] text-zinc-400">{pinnedCount}</span>
              </button>
            </div>
          </div>

          {/* Primary Action Button */}
          <div className="pt-4 border-t border-zinc-100 mt-4">
            <button
              type="button"
              onClick={() => setIsQuoteModalOpen(true)}
              className="w-full py-2.5 px-4 rounded-full bg-[#edebe6] hover:bg-[#e4e1d7] text-zinc-800 border border-zinc-300/80 font-semibold text-xs shadow-2xs transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <Plus className="w-3.5 h-3.5 text-amber-700" />
              <span>Clip Memorable Quote</span>
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          ROW 2: Editorial Quotes Gallery (Dynamic 3-Column Masonry)
          ========================================================================= */}
      <div className="bg-white rounded-[30px] p-6 sm:p-8 shadow-xs border border-zinc-200/50">
        {/* Gallery Header with Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-zinc-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
              <Quote className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-900 tracking-tight">
                Literary Marginalia & Preserved Passages
              </h3>
              <p className="text-[11px] text-zinc-400">
                {filteredQuotes.length} {filteredQuotes.length === 1 ? "quote" : "quotes"} in collection
              </p>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search passage, author, book..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-zinc-50 border border-zinc-200/70 text-xs text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400"
            />
          </div>
        </div>

        {/* 3-Column Aesthetic Cards Grid */}
        {filteredQuotes.length === 0 ? (
          <div className="py-12 text-center text-zinc-400 text-xs">
            <p>No quotes found matching your current filter.</p>
            <button
              onClick={() => {
                setSelectedSphere("All");
                setFilterPinnedOnly(false);
                setSearchQuery("");
              }}
              className="mt-2 text-zinc-700 underline font-medium cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
            {filteredQuotes.map((q) => (
              <div
                key={q.id}
                className="p-5 rounded-[22px] bg-gradient-to-b from-[#fcfbf9] to-white border border-zinc-200/70 hover:border-zinc-300 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between group relative"
              >
                {/* Hanging ribbon marker when pinned */}
                {q.pinnedToJournal && (
                  <div className="absolute top-0 right-6 w-3 h-4 bg-amber-700/80 rounded-b-xs shadow-xs pointer-events-none" />
                )}

                <div>
                  {/* Sphere Tag & Page */}
                  <div className="flex items-center justify-between text-[10px] font-semibold text-zinc-400 mb-3">
                    <span className="px-2 py-0.5 rounded-md bg-white border border-zinc-200/80 text-zinc-700">
                      {SPHERE_LABELS[q.sphere] || q.sphere}
                    </span>
                    {q.page && <span className="font-mono text-zinc-400">{q.page}</span>}
                  </div>

                  {/* Quote Text */}
                  <p className="text-xs sm:text-[13px] font-serif leading-relaxed text-zinc-900 italic">
                    &ldquo;{q.quote}&rdquo;
                  </p>
                </div>

                {/* Card Footer: Attribution & Interactive Buttons */}
                <div className="mt-5 pt-3.5 border-t border-zinc-100 flex items-center justify-between">
                  <div className="pr-2">
                    <p className="text-xs font-bold text-zinc-900 leading-tight">
                      {q.author}
                    </p>
                    <p className="text-[11px] text-zinc-500 font-serif italic truncate max-w-[140px] sm:max-w-[160px]">
                      {q.source}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 opacity-90 group-hover:opacity-100 transition-opacity">
                    {/* Pin to Journal */}
                    <button
                      type="button"
                      onClick={() => handleTogglePin(q.id)}
                      className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                        q.pinnedToJournal
                          ? "bg-amber-100 text-amber-900 border-amber-300"
                          : "bg-white text-zinc-400 hover:text-zinc-700 border-zinc-200"
                      }`}
                      title={q.pinnedToJournal ? "Pinned to Journal" : "Pin to Journal"}
                    >
                      <Bookmark className="w-3 h-3 fill-current" />
                    </button>

                    {/* Copy to Clipboard */}
                    <button
                      type="button"
                      onClick={() => handleCopyQuote(q)}
                      className="p-1.5 rounded-lg bg-white text-zinc-500 hover:text-zinc-900 border border-zinc-200 transition-colors cursor-pointer"
                      title="Copy Quote"
                    >
                      {copiedQuoteId === q.id ? (
                        <Check className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>

                    {/* Delete clipping */}
                    <button
                      type="button"
                      onClick={() => handleDeleteQuote(q.id)}
                      className="p-1.5 rounded-lg bg-white text-zinc-400 hover:text-rose-600 border border-zinc-200 hover:border-rose-200 transition-colors cursor-pointer"
                      title="Delete quote"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* The Tactile Archival Ex Libris Slip Modal */}
      <NewQuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        onSave={handleAddQuote}
        activeBooks={curatedSuggestions}
      />
    </div>
  );
}
export { ReadingSanctuary as QuotesSanctuary };
