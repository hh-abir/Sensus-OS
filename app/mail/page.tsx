import { MailScreen } from "@/components/mail/MailScreen";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mail & Inbox - Sensus",
  description: "Focused personal correspondence and quick task convert bridge",
};

export default function MailPage() {
  return <MailScreen />;
}
