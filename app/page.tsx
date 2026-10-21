import { Dashboard } from "@/components/Dashboard";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f4f2ec] text-zinc-900 selection:bg-amber-200 flex flex-col justify-start">
      <main className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-8 lg:py-10">
        <Dashboard />
      </main>
    </div>
  );
}
