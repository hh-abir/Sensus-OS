"use client";

import React, { useState } from "react";
import { X, Quote, BookOpen } from "lucide-react";

export interface BookQuote {
  id: string;
  quote: string;
  author: string;
  source: string;
  page?: string;
  sphere: string;
  pinnedToJournal?: boolean;
}

interface NewQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (quote: Omit<BookQuote, "id">) => void;
}

export function NewQuoteModal({ isOpen, onClose, onSave }: NewQuoteModalProps) {
  const [quoteText, setQuoteText] = useState("");
  const [author, setAuthor] = useState("");
  const [source, setSource] = useState("");
  const [page, setPage] = useState("");
  const [sphere, setSphere] = useState("Design");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteText.trim() || !author.trim() || !source.trim()) return;

    onSave({
      quote: quoteText.trim(),
      author: author.trim(),
      source: source.trim(),
      page: page.trim() || undefined,
      sphere,
      pinnedToJournal: false,
    });

    setQuoteText("");
    setAuthor("");
    setSource("");
    setPage("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/25 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Floating Dialog */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-[26px] shadow-xl border border-zinc-200/80 p-5 sm:p-6 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
          <div className="flex items-center gap-2">
            <Quote className="w-4 h-4 text-amber-600" />
            <h3 className="text-sm font-bold text-zinc-900 tracking-tight">
              Clip Memorable Quote
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full hover:bg-zinc-100 flex items-center justify-center text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
          {/* Quote Text */}
          <div>
            <textarea
              rows={3}
              placeholder="&ldquo;Simplicity is about subtracting the obvious and adding the meaningful...&rdquo;"
              value={quoteText}
              onChange={(e) => setQuoteText(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200/70 text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400 font-medium italic"
              autoFocus
              required
            />
          </div>

          {/* Author & Source */}
          <div className="grid grid-cols-2 gap-2.5 text-xs">
            <div>
              <label className="block text-[11px] font-semibold text-zinc-500 mb-1">
                Author
              </label>
              <input
                type="text"
                placeholder="e.g. Don Norman"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-200/70 text-xs text-zinc-800 focus:outline-none font-medium"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-zinc-500 mb-1">
                Book / Essay Source
              </label>
              <input
                type="text"
                placeholder="e.g. Design of Everyday Things"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-200/70 text-xs text-zinc-800 focus:outline-none font-medium"
                required
              />
            </div>
          </div>

          {/* Page & Sphere */}
          <div className="grid grid-cols-2 gap-2.5 text-xs">
            <div>
              <label className="block text-[11px] font-semibold text-zinc-500 mb-1">
                Page (optional)
              </label>
              <input
                type="text"
                placeholder="e.g. p. 42"
                value={page}
                onChange={(e) => setPage(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-200/70 text-xs text-zinc-800 focus:outline-none font-medium"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-zinc-500 mb-1">
                Sphere / Theme
              </label>
              <select
                value={sphere}
                onChange={(e) => setSphere(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-200/70 text-xs text-zinc-800 focus:outline-none font-medium cursor-pointer"
              >
                <option value="Design">🎨 Design & UX</option>
                <option value="Focus">⚡ Focus & Flow</option>
                <option value="Mind">🍵 Mind & Philosophy</option>
                <option value="Craft">🌿 Maker & Craft</option>
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 text-xs font-medium text-zinc-600 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-full bg-[#edebe6] hover:bg-[#e2dfd5] text-zinc-800 border border-zinc-300/80 text-xs font-semibold shadow-2xs transition-all cursor-pointer"
            >
              Save Quote
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
