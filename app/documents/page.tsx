import { DocumentsScreen } from "@/components/documents/DocumentsScreen";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documents & Specs - Sensus",
  description: "Browse folders, project specs, and design system documents",
};

export default function DocumentsPage() {
  return <DocumentsScreen />;
}
