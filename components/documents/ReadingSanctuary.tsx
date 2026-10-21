"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Bookmark,
  Play,
  Quote,
  Plus,
  Check,
  Sparkles,
  Share2,
  Copy,
  Clock,
  ArrowRight,
} from "lucide-react";
import { useFocus } from "../focus/FocusContext";
import { NewQuoteModal, BookQuote } from "./NewQuoteModal";

export interface BookItem {
  id: string;
  title: string;
  author: string;
  currentPage: number;
  totalPages: number;
  coverBg: string;
  coverText: string;
  borderTint: string;
  status: "reading" | "finished" | "up_next";
  sphere: string;
  notesCount: number;
}

export function ReadingSanctuary() {
  const { startFocus, setSoundscape } = useFocus();
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [copiedQuoteId, setCopiedQuoteId] = useState<string | null>(null);

  // Books State
  const [books, setBooks] = useState<BookItem[]>([
    {
      id: "b-1",
      title: "The Design of Everyday Things",
      author: "Don Norman",
      currentPage: 182,
      totalPages: 268,
      coverBg: "bg-[#fffbeb]",
      coverText: "text-amber-950",
      borderTint: "border-amber-300/80",
      status: "reading",
      sphere: "🎨 Creative",
      notesCount: 14,
    },
    {
      id: "b-2",
      title: "Digital Minimalism: Choosing a Focused Life",
      author: "Cal Newport",
      currentPage: 230,
      totalPages: 250,
      coverBg: "bg-[#eafaf5]",
      coverText: "text-emerald-950",
      borderTint: "border-[#c0eedf]",
      status: "reading",
      sphere: "⚡ Deep Work",
      notesCount: 22,
    },
    {
      id: "b-3",
      title: "Thinking, Fast and Slow",
      author: "Daniel Kahneman",
      currentPage: 210,
      totalPages: 500,
      coverBg: "bg-[#eff6ff]",
      coverText: "text-blue-950",
      borderTint: "border-blue-200/80",
      status: "reading",
      sphere: "🎓 Academic",
      notesCount: 9,
    },
    {
      id: "b-4",
      title: "Wabi-Sabi for Artists, Designers & Poets",
      author: "Leonard Koren",
      currentPage: 124,
      totalPages: 124,
      coverBg: "bg-[#faf5ff]",
      coverText: "text-purple-950",
      borderTint: "border-purple-200/80",
      status: "finished",
      sphere: "🍵 Sanctuary",
      notesCount: 18,
    },
  ]);

  // Quotes State
  const [quotes, setQuotes] = useState<BookQuote[]>([
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
        "Clutter is not just physical stuff. It's old ideas, toxic relationships, and bad habits that drain focus.",
      author: "Cal Newport",
      source: "Digital Minimalism",
      page: "p. 84",
      sphere: "Focus",
      pinnedToJournal: false,
    },
    {
      id: "q-3",
      quote:
        "Pare down to the essence, but don't remove the poetry. Keep things clean without making them clinical.",
      author: "Leonard Koren",
      source: "Wabi-Sabi",
      page: "p. 28",
      sphere: "Mind",
      pinnedToJournal: true,
    },
  ]);

  const handleAdvancePages = (bookId: string, delta: number) => {
    setBooks((prev) =>
      prev.map((b) => {
        if (b.id !== bookId) return b;
        const next = Math.min(b.totalPages, Math.max(0, b.currentPage + delta));
        return {
          ...b,
          currentPage: next,
          status: next === b.totalPages ? "finished" : "reading",
        };
      })
    );
  };

  const handleStartReadingFocus = (book: BookItem) => {
    setSoundscape("coffee");
    startFocus(`Reading: ${book.title}`, 30);
  };

  const handleCopyQuote = (quote: BookQuote) => {
    navigator.clipboard.writeText(`"${quote.quote}" — ${quote.author}, ${quote.source}`);
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

  const handleAddQuote = (newQuoteData: Omit<BookQuote, "id">) => {
    const newQuote: BookQuote = {
      ...newQuoteData,
      id: `q-${Date.now()}`,
    };
    setQuotes((prev) => [newQuote, ...prev]);
  };

  const booksFinished = books.filter((b) => b.status === "finished").length;
  const totalPagesRead = books.reduce((sum, b) => sum + b.currentPage, 0);

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in duration-200">
      {/* =========================================================================
          ROW 1: Active Bookshelf (68%) & Reading Compass (32%)
          ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Active Bookshelf Grid (8 cols = ~67%) */}
        <div className="lg:col-span-8 bg-white rounded-[28px] p-6 shadow-xs border border-zinc-200/50 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 tracking-tight">
                    Current Reading Shelf
                  </h3>
                  <p className="text-[11px] text-zinc-400">
                    Active books, research essays, and monographs
                  </p>
                </div>
              </div>

              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-700 font-mono">
                {books.filter((b) => b.status === "reading").length} Active Reads
              </span>
            </div>

            {/* Books Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {books.map((book) => {
                const percent = Math.round((book.currentPage / book.totalPages) * 100);
                const isComplete = book.status === "finished";

                return (
                  <div
                    key={book.id}
                    className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${book.coverBg} ${book.borderTint} shadow-2xs hover:shadow-xs`}
                  >
                    <div>
                      {/* Top tags */}
                      <div className="flex items-center justify-between text-[10px] font-semibold mb-2">
                        <span className="px-2 py-0.5 rounded-md bg-white/70 border border-black/5 text-zinc-700">
                          {book.sphere}
                        </span>
                        <span className="font-mono text-zinc-500 font-bold">
                          {percent}%
                        </span>
                      </div>

                      {/* Title & Author */}
                      <h4 className="text-xs sm:text-[13px] font-bold text-zinc-950 leading-snug line-clamp-2">
                        {book.title}
                      </h4>
                      <p className="text-[11px] text-zinc-600 font-medium mt-0.5">
                        {book.author}
                      </p>
                    </div>

                    {/* Progress Bar & Actions */}
                    <div className="mt-4 pt-3 border-t border-black/5">
                      <div className="w-full bg-black/5 h-1.5 rounded-full overflow-hidden mb-2.5">
                        <div
                          className="bg-zinc-800 h-full rounded-full transition-all duration-300"
                          style={{ width: `${percent}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-mono text-zinc-600 font-medium">
                          {book.currentPage} / {book.totalPages} pgs
                        </span>

                        <div className="flex items-center gap-1.5">
                          {/* Quick progress increment */}
                          {!isComplete && (
                            <button
                              type="button"
                              onClick={() => handleAdvancePages(book.id, 10)}
                              className="px-2 py-0.5 rounded-md bg-white/80 hover:bg-white text-zinc-800 border border-black/5 text-[10px] font-semibold cursor-pointer shadow-2xs transition-colors"
                              title="Logged 10 pages read"
                            >
                              +10 pgs
                            </button>
                          )}

                          {/* Focus button */}
                          <button
                            type="button"
                            onClick={() => handleStartReadingFocus(book)}
                            className="flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#edebe6] hover:bg-[#e4e1d7] text-zinc-800 border border-zinc-300/60 text-[10px] font-bold shadow-2xs cursor-pointer transition-all active:scale-95"
                            title="Start 30m Reading Focus Session"
                          >
                            <Play className="w-2.5 h-2.5 fill-current ml-0.2" />
                            <span>Read 30m</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-3 mt-4 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-400">
            <span>Reading speeds tracked with procedural cafe soundscape</span>
            <span className="font-mono">{totalPagesRead} pages logged</span>
          </div>
        </div>

        {/* Right: Reading Compass & Goals (4 cols = ~33%) */}
        <div className="lg:col-span-4 bg-white rounded-[28px] p-6 shadow-xs border border-zinc-200/50 flex flex-col justify-between">
          <div>
            <div className="pb-4 border-b border-zinc-100">
              <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60 uppercase tracking-wider">
                Annual Rhythm
              </span>
              <h3 className="text-base font-bold text-zinc-900 tracking-tight mt-1.5">
                2026 Reading Compass
              </h3>
              <p className="text-[11px] text-zinc-400">Deliberate intellectual diet</p>
            </div>

            {/* Circular Gauge / Stats */}
            <div className="p-4 rounded-2xl bg-zinc-50/80 border border-zinc-200/60 my-4 flex items-center justify-between">
              <div>
                <p className="text-[11px] text-zinc-500 font-medium">Yearly Target</p>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-2xl font-black font-mono text-zinc-900">18</span>
                  <span className="text-xs text-zinc-400">/ 24 Books</span>
                </div>
                <span className="text-[10px] text-emerald-700 font-semibold mt-1 inline-block">
                  75% of target achieved
                </span>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-zinc-700 block">14 Days</span>
                <span className="text-[10px] text-zinc-400">Reading Streak</span>
              </div>
            </div>

            {/* Habit Windows List */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-zinc-200/60 text-xs">
                <span className="text-zinc-700 font-medium">Morning 20m Habit</span>
                <span className="text-[11px] font-mono text-zinc-500 font-semibold">07:30 AM</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-zinc-200/60 text-xs">
                <span className="text-zinc-700 font-medium">Nightstand Wind-Down</span>
                <span className="text-[11px] font-mono text-zinc-500 font-semibold">09:30 PM</span>
              </div>
            </div>
          </div>

          {/* Quick Focus Launcher */}
          <div className="pt-4 border-t border-zinc-100">
            <button
              onClick={() => {
                setSoundscape("coffee");
                startFocus("Deep Reading & Marginalia", 30);
              }}
              className="w-full py-2.5 px-4 rounded-full bg-[#edebe6] hover:bg-[#e4e1d7] text-zinc-800 border border-zinc-300/80 font-semibold text-xs shadow-2xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Launch 30m Reading Session</span>
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          ROW 2: Thoughtful Quote Clippings & Marginalia (3 equal columns)
          ========================================================================= */}
      <div className="bg-white rounded-[28px] p-6 shadow-xs border border-zinc-200/50">
        <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
              <Quote className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-900 tracking-tight">
                Quote Clippings & Marginalia
              </h3>
              <p className="text-[11px] text-zinc-400">
                Memorable passages saved to your personal vault
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsQuoteModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#edebe6] hover:bg-[#e4e1d7] text-zinc-800 border border-zinc-300/70 text-xs font-semibold shadow-2xs transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Clip Quote</span>
          </button>
        </div>

        {/* 3-Column Quote Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-4">
          {quotes.map((q) => (
            <div
              key={q.id}
              className="p-4 rounded-2xl bg-zinc-50/60 border border-zinc-200/60 hover:bg-zinc-50 flex flex-col justify-between transition-colors shadow-2xs"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-semibold text-zinc-400 mb-2">
                  <span className="px-2 py-0.5 rounded-md bg-white border border-zinc-200/60 text-zinc-700">
                    {q.sphere}
                  </span>
                  {q.page && <span className="font-mono">{q.page}</span>}
                </div>

                <p className="text-xs font-serif leading-relaxed text-zinc-900 italic">
                  &ldquo;{q.quote}&rdquo;
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-200/50 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-zinc-900 leading-tight">
                    {q.author}
                  </p>
                  <p className="text-[10px] text-zinc-500 truncate max-w-[150px]">
                    {q.source}
                  </p>
                </div>

                <div className="flex items-center gap-1.5">
                  {/* Pin to Journal Toggle */}
                  <button
                    type="button"
                    onClick={() => handleTogglePin(q.id)}
                    className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                      q.pinnedToJournal
                        ? "bg-amber-100 text-amber-900 border-amber-300"
                        : "bg-white text-zinc-400 hover:text-zinc-700 border-zinc-200"
                    }`}
                    title={q.pinnedToJournal ? "Pinned to Journal reflections" : "Pin to Journal reflections"}
                  >
                    <Bookmark className="w-3 h-3 fill-current" />
                  </button>

                  {/* Copy Quote Button */}
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Quote Clipping Modal */}
      <NewQuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        onSave={handleAddQuote}
      />
    </div>
  );
}
