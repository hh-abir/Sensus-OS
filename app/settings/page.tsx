import { SettingsScreen } from "@/components/settings/SettingsScreen";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings & Preferences - Sensus",
  description: "Personalize your workspace, soundscapes, and routines",
};

export default function SettingsPage() {
  return <SettingsScreen />;
}
