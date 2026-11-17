"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppSidebar } from "@/components/app/AppSidebar";
import { AppHeader } from "@/components/app/AppHeader";
import { AddGuestModal, ImportCsvModal } from "@/components/app/AddGuestModal";
import {
  Home,
  Users,
  Plus,
  Calendar,
  BrainCircuit,
  QrCode
} from "lucide-react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [addGuestOpen, setAddGuestOpen] = useState(false);
  const [importCsvOpen, setImportCsvOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <AppSidebar />
      </div>

      {/* Main App Canvas */}
      <div className="flex-1 flex flex-col min-w-0">
        <AppHeader onOpenAddGuest={() => setAddGuestOpen(true)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8 max-w-7xl w-full mx-auto">
          {children}
        </main>

        {/* SECTION 25: Mobile Native Bottom Navigation Bar */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-t border-[#E8DDCF] px-4 flex items-center justify-around z-40 shadow-soft-lg">
          <Link
            href="/app"
            className={`flex flex-col items-center gap-1 text-[10px] font-medium ${
              pathname === "/app" ? "text-[#74182E] font-bold" : "text-[#7D597E]"
            }`}
          >
            <Home className="w-5 h-5" />
            <span>Home</span>
          </Link>

          <Link
            href="/app/guests"
            className={`flex flex-col items-center gap-1 text-[10px] font-medium ${
              pathname.startsWith("/app/guests") ? "text-[#74182E] font-bold" : "text-[#7D597E]"
            }`}
          >
            <Users className="w-5 h-5" />
            <span>Guests</span>
          </Link>

          {/* Center "+" Quick Add Floating Action */}
          <button
            onClick={() => setAddGuestOpen(true)}
            className="w-11 h-11 -mt-5 rounded-full bg-[#74182E] text-white flex items-center justify-center shadow-soft-lg border-2 border-white hover:bg-[#581223] active:scale-95 transition-transform"
            aria-label="Add Guest"
          >
            <Plus className="w-6 h-6" />
          </button>

          <Link
            href="/app/events"
            className={`flex flex-col items-center gap-1 text-[10px] font-medium ${
              pathname.startsWith("/app/events") ? "text-[#74182E] font-bold" : "text-[#7D597E]"
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span>Events</span>
          </Link>

          <Link
            href="/app/insights"
            className={`flex flex-col items-center gap-1 text-[10px] font-medium ${
              pathname.startsWith("/app/insights") ? "text-[#74182E] font-bold" : "text-[#7D597E]"
            }`}
          >
            <BrainCircuit className="w-5 h-5" />
            <span>Insights</span>
          </Link>
        </div>
      </div>

      {/* Global Modals */}
      <AddGuestModal isOpen={addGuestOpen} onClose={() => setAddGuestOpen(false)} />
      <ImportCsvModal isOpen={importCsvOpen} onClose={() => setImportCsvOpen(false)} />
    </div>
  );
}
