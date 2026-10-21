import { TasksScreen } from "@/components/tasks/TasksScreen";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tasks & Horizons - Sensus",
  description: "3-Horizon task management, Eisenhower matrix, and quick focus launcher",
};

export default function TasksPage() {
  return <TasksScreen />;
}
