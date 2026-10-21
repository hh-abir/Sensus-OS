# Sensus — Personal Lifestyle Operating System (Design Prototype)

> [!NOTE]
> **Design Concept & Interactive Prototype Disclaimer**  
> Sensus is an experimental, front-end design placeholder exploring a calm, analog-digital personal lifestyle operating system. All documents, emails, tasks, project milestones, metrics, and journal reflections are simulated in-memory mock data designed to showcase UI/UX paradigms, layout archetypes, and micro-interactions. It is **not** connected to a production database, authentication provider, or cloud backend.

---

## 🌿 Philosophy & Concept

Sensus is modeled on the quiet, deliberate craft of **Basecamp** and **Dieter Rams' minimalism**, translated into an operating system for individual daily living. It rejects the hyperactive, notification-heavy corporate dashboard aesthetic in favor of warm tactile parchment (`#f4f2ec`), generous breathing room, and human energy horizons.

Instead of generic "stats-at-the-top" rows, every workspace has its own **unique spatial layout archetype** tailored to the nature of the task.

---

## 🧭 Screen Layouts & Workspaces

| Workspace | Route | Layout Archetype & Purpose |
| :--- | :--- | :--- |
| **Overview** | `/` | Asymmetric 2-column hub pairing greeting & focus gauges with a 08:00–17:00 horizontal day planner. |
| **Calendar & Rhythms** | `/calendar` | Dynamic 2-row bento layout: Row 1 has a 70% 7-day energy horizon stage alongside a 30% day agenda; Row 2 features 3 equal 33% cards for daily rituals, focus queue, and life spheres balance. |
| **Documents & Specs** | `/documents` | Folder cards grid + document list table + side preview inspector for specs and knowledge notes. |
| **Projects Studio** | `/projects` | Asymmetric studio layout featuring a Project Shelf rail on the left and an active Studio Workbench on the right with milestones and logs. |
| **Tasks & Horizons** | `/tasks` | UX-first dedicated task creator studio + full-width 3-Horizon Board (*Today's Focus*, *In Progress & Week*, *Life Backlog*) and switchable 2x2 Eisenhower matrix. |
| **Journal & Reflections** | `/journal` | Mindful diary sanctuary with a chronological streak rail, 3-block reflection canvas, and memory snapshot polaroid. |
| **Mail & Inbox** | `/mail` | Master-detail email client with inline quick reply and a bridge to convert messages directly into tasks. |
| **Settings Drawer** | *Drawer* | Slide-out preferences drawer triggered from the profile avatar, allowing workspace adjustments without leaving your active screen. |

---

## 🎧 Procedural Web Audio Focus Dock

Sensus includes a persistent global ambient focus bar and soundscapes player floating at the bottom of the viewport:

- **100% Native Web Audio API**: Procedurally generates sound in real time with pink noise, brown noise, biquad filter sweeps, and crackle impulse clicks.
- **Zero MP3 Assets**: No external audio files, CDN dependencies, or CORS errors.
- **Soundscapes Included**:
  - 🌧 **Gentle Rain**: Pink noise filtered to mimic rain hitting glass.
  - ☕ **Coffeehouse**: Warm low-frequency rumble modulating cafe ambiance.
  - 🌲 **Pine Forest**: Filtered wind gusts with subtle gain oscillation.
  - 📻 **Lo-Fi Vinyl**: Analog turntable needle crackle bed.
  - 🔇 **Pure Silence**: Undisturbed countdown timer.
- **Persistent Across Navigation**: Audio and timers run in a persistent root layout shell (`AppShell.tsx`), continuing uninterrupted as you navigate between pages.

---

## 🛠 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack, Typed Routes)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Audio Synthesis**: Native Browser Web Audio API (`AudioContext`, `BiquadFilterNode`, `GainNode`)

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Open in browser
open http://localhost:3000
```

To run a production build:

```bash
npm run build
npm run start
```

---

## 📄 License & Purpose

This project is created strictly for portfolio, UX research, and design prototype demonstration purposes.
