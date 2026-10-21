import { ProjectsScreen } from "@/components/projects/ProjectsScreen";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects Studio - Sensus",
  description: "Active creative ventures, maker projects, and research roadmaps",
};

export default function ProjectsPage() {
  return <ProjectsScreen />;
}
