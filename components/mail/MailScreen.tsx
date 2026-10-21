"use client";

import React, { useState } from "react";
import {
  Search,
  Plus,
  Send,
  Star,
  Archive,
  Trash2,
  Reply,
  Forward,
  CheckSquare,
  Paperclip,
  Clock,
  Sparkles,
  Inbox,
  BookOpen,
  Bell,
  X,
  Check,
  ArrowUpRight,
  Filter,
} from "lucide-react";

export interface EmailMessage {
  id: string;
  sender: {
    name: string;
    email: string;
    avatar: string;
  };
  subject: string;
  snippet: string;
  body: string;
  category: "primary" | "newsletters" | "updates";
  date: string;
  unread: boolean;
  starred: boolean;
  attachments?: { name: string; size: string }[];
}

export function MailScreen() {
  const [activeCategory, setActiveCategory] = useState<"all" | "primary" | "newsletters" | "updates" | "starred">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmailId, setSelectedEmailId] = useState<string>("e-1");
  const [isComposing, setIsComposing] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Compose Form State
  const [composeTo, setComposeTo] = useState("");
  const [composeSubject, setComposeSubject] = useState("");
  const [composeBody, setComposeBody] = useState("");

  const [emails, setEmails] = useState<EmailMessage[]>([
    {
      id: "e-1",
      sender: {
        name: "Maya Lin",
        email: "maya.l@sensus.app",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
      },
      subject: "Coffee tomorrow at Blue Bottle + design critique notes",
      snippet: "Hey Sarah! Looking forward to catching up tomorrow at 9:30 AM. I took a close look at the v2 tokens...",
      body: `Hey Sarah,

Looking forward to our coffee catchup tomorrow morning at Blue Bottle (09:30 AM)!

I took some time this afternoon to review your latest Sensus Design System v2 tokens. The semantic token mapping between the warm cream surfaces and the mint/amber accents feels exceptionally cohesive.

A couple of quick thoughts we can chat through tomorrow:
1. Have you checked contrast ratios on the secondary amber badges against the white card backgrounds?
2. The 45-minute focus session gauge integration into daily planner blocks is brilliant — curious if you plan to expose custom interval presets.

See you tomorrow morning!

Warmly,
Maya`,
      category: "primary",
      date: "10:45 AM",
      unread: true,
      starred: true,
      attachments: [{ name: "Design_Tokens_Review_Notes.pdf", size: "1.2 MB" }],
    },
    {
      id: "e-2",
      sender: {
        name: "Prof. Arthur Harrison",
        email: "a.harrison@stanford.edu",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
      },
      subject: "Feedback on Cognitive Psychology Thesis Draft (Ch. 4)",
      snippet: "Hi Sarah, your cohort analysis on 45m deep-work focus intervals is compelling. I left annotations on...",
      body: `Hi Sarah,

I have finished reviewing your draft of Chapter 4 ("Ergonomics of Focused Attention: Cognitive Load in Ambient Workspaces").

Your user cohort data demonstrating higher retention and lower mental fatigue during 45-minute structured focus blocks vs 90-minute blocks is very well supported.

I suggest expanding the discussion section to reference Norman's Emotional Design principles regarding warm ambient color palettes. 

Please take a look at the attached revisions before our faculty sync next week.

Best regards,
Prof. Arthur Harrison
HCI Research Lab`,
      category: "primary",
      date: "Yesterday",
      unread: false,
      starred: true,
      attachments: [{ name: "Thesis_Draft_Ch4_Annotations.docx", size: "3.4 MB" }],
    },
    {
      id: "e-3",
      sender: {
        name: "Clay & Craft Studio",
        email: "hello@claycraftstudio.com",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80",
      },
      subject: "Your ceramic mugs are out of the bisque kiln! ☕",
      snippet: "Hi Sarah, good news! Your 6 thrown stoneware mug cylinders have cooled and are ready for glazing this Friday...",
      body: `Hi Sarah,

Great news from the kiln!

The 6 stoneware mug cylinders and pour-over drippers you threw on the wheel last week have completed their Cone 04 bisque firing cycle without any cracks.

They are waiting on the member glaze shelf. As discussed, we have freshly mixed buckets of Matte Sage and Toasted Oatmeal glazes ready for your Friday studio session (16:30 - 17:30).

Let us know if you need high-fire wax resist set aside for the footrings.

Happy crafting,
Elena @ Clay & Craft Studio`,
      category: "primary",
      date: "Oct 18",
      unread: false,
      starred: false,
    },
    {
      id: "e-4",
      sender: {
        name: "Dense Discovery",
        email: "newsletter@densediscovery.com",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80",
      },
      subject: "Issue #312: Designing for calm computing & intentional routines",
      snippet: "A weekly digest on sustainable tech, digital minimalism, calm software interfaces, and physical craft...",
      body: `Dense Discovery — Issue #312
Curated by Kai Brach

"Calm computing is not about doing less; it's about doing what matters without the incessant noise."

In this issue:
• The resurgence of personal life operating systems: Why thoughtful makers are building bespoke digital workspaces.
• Design spotlight: Soft contrast palettes and ambient warmth over sterile dark modes.
• Hardware: ESP32 DIY environmental sensors for the home garden.
• Book of the week: "Four Thousand Weeks: Time Management for Mortals" by Oliver Burkeman.

Enjoy the read and have a restorative week!`,
      category: "newsletters",
      date: "Oct 17",
      unread: false,
      starred: false,
    },
    {
      id: "e-5",
      sender: {
        name: "JLCPCB Electronics",
        email: "support@jlcpcb.com",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
      },
      subject: "Shipment Notice: Order #JLC-892014 (Plant IoT Sensor PCBs)",
      snippet: "Your 5 custom moisture sensor boards have passed automated optical inspection and are in transit...",
      body: `Dear Sarah Mitchell,

Your order #JLC-892014 has successfully completed production and automated optical inspection (AOI).

Order Summary:
• Item: Custom ESP32 Moisture Sensor Carrier Board
• Quantity: 5 pcs
• Finish: LeadFree HASL, Matte Green Soldermask
• Courier: DHL Express (Tracking: #DHL-928104812)

Estimated delivery date: Tomorrow, Oct 22 by 14:00.

Thank you for choosing JLCPCB!`,
      category: "updates",
      date: "Oct 16",
      unread: false,
      starred: false,
    },
  ]);

  const selectedEmail =
    emails.find((e) => e.id === selectedEmailId) || emails[0];

  const handleToggleStar = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEmails((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, starred: !item.starred } : item
      )
    );
  };

  const handleToggleRead = (id: string) => {
    setEmails((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, unread: !item.unread } : item
      )
    );
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    setToastMessage(`Reply sent to ${selectedEmail.sender.name}!`);
    setReplyText("");
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSendCompose = (e: React.FormEvent) => {
    e.preventDefault();
    if (!composeTo.trim() || !composeSubject.trim()) return;

    const newMail: EmailMessage = {
      id: `e-${Date.now()}`,
      sender: {
        name: "Sarah Mitchell",
        email: "sarah.m@sensus.app",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
      },
      subject: composeSubject,
      snippet: composeBody.slice(0, 80) + "...",
      body: composeBody,
      category: "primary",
      date: "Just now",
      unread: false,
      starred: false,
    };

    setEmails((prev) => [newMail, ...prev]);
    setSelectedEmailId(newMail.id);
    setIsComposing(false);
    setComposeTo("");
    setComposeSubject("");
    setComposeBody("");
    setToastMessage("Message sent successfully!");
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleConvertToTask = (email: EmailMessage) => {
    setToastMessage(`Task created from email: "${email.subject.slice(0, 35)}..."`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredEmails = emails.filter((e) => {
    const matchesSearch =
      e.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.sender.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.snippet.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeCategory === "starred") return e.starred;
    if (activeCategory === "primary") return e.category === "primary";
    if (activeCategory === "newsletters") return e.category === "newsletters";
    if (activeCategory === "updates") return e.category === "updates";
    return true;
  });

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-zinc-900 text-white text-xs font-semibold px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Floating Compose Dialog Modal */}
      {isComposing && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[28px] w-full max-w-lg p-6 shadow-2xl border border-zinc-200 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <h3 className="text-sm font-bold text-zinc-900">New Message</h3>
              <button
                onClick={() => setIsComposing(false)}
                className="w-7 h-7 rounded-full hover:bg-zinc-100 flex items-center justify-center text-zinc-400 hover:text-zinc-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSendCompose} className="mt-4 space-y-3">
              <div>
                <input
                  type="text"
                  placeholder="To: (e.g. maya.l@sensus.app)"
                  value={composeTo}
                  onChange={(e) => setComposeTo(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-zinc-50 border border-zinc-200/70 text-xs text-zinc-900 focus:outline-none font-medium"
                  required
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Subject:"
                  value={composeSubject}
                  onChange={(e) => setComposeSubject(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-zinc-50 border border-zinc-200/70 text-xs text-zinc-900 focus:outline-none font-medium"
                  required
                />
              </div>

              <div>
                <textarea
                  rows={6}
                  placeholder="Write your personal message..."
                  value={composeBody}
                  onChange={(e) => setComposeBody(e.target.value)}
                  className="w-full p-3 rounded-xl bg-zinc-50 border border-zinc-200/70 text-xs text-zinc-900 focus:outline-none font-medium resize-none"
                  required
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => alert("Attachment dialog")}
                  className="p-2 rounded-xl text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer"
                  title="Attach file"
                >
                  <Paperclip className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsComposing(false)}
                    className="px-4 py-2 rounded-full border border-zinc-200 text-xs font-semibold text-zinc-600 hover:bg-zinc-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2-COLUMN MASTER-DETAIL LAYOUT (No top stats!) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Inbox Feed & Categories (~5/12 cols) */}
        <div className="lg:col-span-5 bg-white rounded-[28px] p-5 shadow-xs border border-zinc-200/50 flex flex-col justify-between min-h-[640px]">
          <div>
            {/* Header: Title + Compose Button */}
            <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                  Communications
                </span>
                <h2 className="text-lg font-bold text-zinc-900 tracking-tight">
                  Personal Inbox
                </h2>
              </div>

              <button
                onClick={() => setIsComposing(true)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Compose</span>
              </button>
            </div>

            {/* Search Input */}
            <div className="my-3.5">
              <div className="flex items-center gap-2 bg-zinc-50 border border-zinc-200/60 rounded-xl px-3 py-2 text-xs">
                <Search className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Search sender, subject..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent w-full text-zinc-800 placeholder-zinc-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-none pb-3 border-b border-zinc-100/80">
              {(
                [
                  { id: "all", label: "All Messages" },
                  { id: "primary", label: "Primary" },
                  { id: "newsletters", label: "Newsletters" },
                  { id: "updates", label: "Updates" },
                  { id: "starred", label: "Starred" },
                ] as const
              ).map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer whitespace-nowrap ${
                      isActive
                        ? "bg-[#edebe6] text-zinc-900 font-bold"
                        : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Email Message List */}
            <div className="space-y-2 mt-3.5 max-h-[460px] overflow-y-auto scrollbar-none pr-1">
              {filteredEmails.length === 0 ? (
                <div className="text-center py-16 text-zinc-400 text-xs">
                  No messages in this folder.
                </div>
              ) : (
                filteredEmails.map((email) => {
                  const isSelected = selectedEmailId === email.id;

                  return (
                    <div
                      key={email.id}
                      onClick={() => {
                        setSelectedEmailId(email.id);
                        if (email.unread) handleToggleRead(email.id);
                      }}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? "bg-zinc-50 border-zinc-300 shadow-2xs ring-1 ring-zinc-300/80"
                          : "bg-white hover:bg-zinc-50/60 border-zinc-200/50"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5 min-w-0 flex-1">
                          {/* Avatar */}
                          <div className="relative shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={email.sender.avatar}
                              alt={email.sender.name}
                              className="w-7 h-7 rounded-full object-cover border border-white shadow-2xs"
                            />
                            {email.unread && (
                              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-blue-500 ring-2 ring-white" />
                            )}
                          </div>

                          <div className="min-w-0 flex-1">
                            <span
                              className={`text-xs truncate block ${
                                email.unread ? "font-bold text-zinc-950" : "font-semibold text-zinc-800"
                              }`}
                            >
                              {email.sender.name}
                            </span>
                          </div>
                        </div>

                        {/* Date & Star */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="text-[10px] text-zinc-400 font-medium">
                            {email.date}
                          </span>
                          <button
                            onClick={(e) => handleToggleStar(email.id, e)}
                            className="p-1 text-zinc-300 hover:text-amber-400 transition-colors"
                          >
                            <Star
                              className={`w-3.5 h-3.5 ${
                                email.starred ? "fill-amber-400 text-amber-400" : ""
                              }`}
                            />
                          </button>
                        </div>
                      </div>

                      {/* Subject & Snippet */}
                      <div className="mt-1.5 pl-9">
                        <h4
                          className={`text-xs truncate ${
                            email.unread ? "font-bold text-zinc-950" : "font-medium text-zinc-700"
                          }`}
                        >
                          {email.subject}
                        </h4>
                        <p className="text-[11px] text-zinc-400 line-clamp-1 mt-0.5">
                          {email.snippet}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-400">
            <span>{emails.filter((e) => e.unread).length} Unread</span>
            <span className="font-semibold text-zinc-700">sarah.m@sensus.app</span>
          </div>
        </div>

        {/* RIGHT COLUMN: Reading Canvas & Actions (~7/12 cols) */}
        <div className="lg:col-span-7 bg-white rounded-[28px] p-6 shadow-xs border border-zinc-200/50 flex flex-col justify-between min-h-[640px]">
          <div>
            {/* Action Bar (Reply, Convert to Task, Archive, Delete) */}
            <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleConvertToTask(selectedEmail)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fdeecb] hover:bg-[#fcd34d] text-zinc-900 text-xs font-semibold shadow-2xs transition-all cursor-pointer"
                  title="Turn this email into an action item on your Tasks board"
                >
                  <CheckSquare className="w-3.5 h-3.5 text-amber-800" />
                  <span>Convert to Task</span>
                </button>
              </div>

              <div className="flex items-center gap-1 text-zinc-500">
                <button
                  onClick={() => alert("Archived")}
                  className="p-1.5 rounded-full hover:bg-zinc-100 transition-colors cursor-pointer"
                  title="Archive"
                >
                  <Archive className="w-4 h-4" />
                </button>
                <button
                  onClick={() => alert("Moved to trash")}
                  className="p-1.5 rounded-full hover:bg-zinc-100 text-red-500 transition-colors cursor-pointer"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Email Heading & Sender Profile */}
            <div className="my-5">
              <h2 className="text-lg sm:text-xl font-bold text-zinc-900 tracking-tight leading-snug">
                {selectedEmail.subject}
              </h2>

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-zinc-100">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selectedEmail.sender.avatar}
                    alt={selectedEmail.sender.name}
                    className="w-10 h-10 rounded-full object-cover border border-white shadow-2xs"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-zinc-900">
                        {selectedEmail.sender.name}
                      </span>
                      <span className="text-[11px] text-zinc-400">
                        &lt;{selectedEmail.sender.email}&gt;
                      </span>
                    </div>
                    <span className="text-[11px] text-zinc-500">
                      To: Sarah Mitchell &lt;sarah.m@sensus.app&gt;
                    </span>
                  </div>
                </div>

                <span className="text-xs text-zinc-400 font-medium">
                  {selectedEmail.date}
                </span>
              </div>
            </div>

            {/* Email Message Body */}
            <div className="prose prose-zinc max-w-none text-xs sm:text-[13px] text-zinc-800 leading-relaxed whitespace-pre-line py-2 border-t border-zinc-100/80">
              {selectedEmail.body}
            </div>

            {/* Attachments Section (if any) */}
            {selectedEmail.attachments && selectedEmail.attachments.length > 0 && (
              <div className="mt-5 pt-3.5 border-t border-zinc-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-2">
                  Attachments ({selectedEmail.attachments.length})
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedEmail.attachments.map((att, idx) => (
                    <div
                      key={idx}
                      onClick={() => alert(`Downloading ${att.name}`)}
                      className="flex items-center gap-2 p-2 rounded-xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-200/70 text-xs font-medium cursor-pointer transition-colors"
                    >
                      <Paperclip className="w-3.5 h-3.5 text-zinc-400" />
                      <span className="text-zinc-800 font-semibold">{att.name}</span>
                      <span className="text-[10px] text-zinc-400">{att.size}</span>
                      <ArrowUpRight className="w-3 h-3 text-zinc-400 ml-1" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Inline Quick Reply Box */}
          <div className="mt-6 pt-4 border-t border-zinc-100">
            <form onSubmit={handleSendReply} className="space-y-3">
              <div className="relative">
                <textarea
                  rows={3}
                  placeholder={`Write a quick reply to ${selectedEmail.sender.name}...`}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="w-full p-3 rounded-2xl bg-zinc-50 border border-zinc-200/70 text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 font-medium placeholder-zinc-400 resize-none"
                />
              </div>

              <div className="flex items-center justify-between">
                {/* Fast response templates */}
                <div className="hidden sm:flex items-center gap-1.5 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setReplyText("Sounds great, see you at 9:30 AM!")}
                    className="px-2.5 py-1 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 transition-colors cursor-pointer"
                  >
                    See you then!
                  </button>
                  <button
                    type="button"
                    onClick={() => setReplyText("Thanks for the feedback, will review tonight.")}
                    className="px-2.5 py-1 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 transition-colors cursor-pointer"
                  >
                    Will review
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={!replyText.trim()}
                  className="px-4 py-2 rounded-full bg-zinc-900 hover:bg-zinc-800 disabled:opacity-40 text-white font-semibold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer ml-auto"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Reply</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
