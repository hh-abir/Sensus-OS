import { JournalScreen } from "@/components/journal/JournalScreen";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Journal & Daily Reflection - Sensus",
  description: "Mindful daily reflections, mood dial, and memory snapshots",
};

export default function JournalPage() {
  return <JournalScreen />;
}
