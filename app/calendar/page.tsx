import { CalendarScreen } from "@/components/calendar/CalendarScreen";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calendar & Rhythms - Sensus",
  description: "Natural rhythm horizons, deep work focus sprints, and daily mindful rituals",
};

export default function CalendarPage() {
  return <CalendarScreen />;
}
