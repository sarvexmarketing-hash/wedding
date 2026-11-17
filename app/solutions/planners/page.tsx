"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Layers, Briefcase, ArrowRight, ShieldCheck } from "lucide-react";

export default function PlannersSolutionPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      <Navbar />

      <main className="flex-1 py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#74182E] bg-[#74182E]/10 px-3 py-1 rounded-full">
            For Wedding Planners & Agencies
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[#2D1B28]">
            Manage 12+ Luxury Weddings Flawlessly.
          </h1>
          <p className="text-base sm:text-lg text-[#654566]">
            Deliver an enterprise-grade hospitality experience to high-net-worth couples and families. Manage teams, vendor handshakes, airport shuttles, and day-of operations.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#74182E] text-white text-sm font-semibold shadow-soft hover:bg-[#581223]"
            >
              <span>Book Agency Consultation</span>
              <ArrowRight className="w-4 h-4 text-[#E1CD98]" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-3xl border border-[#E8DDCF] shadow-soft space-y-3">
            <h3 className="font-serif font-bold text-lg text-[#2D1B28]">Multi-Tenant Wedding Portal</h3>
            <p className="text-xs text-[#7D597E] leading-relaxed">
              Switch seamlessly between all your upcoming weddings. Monitor RSVP velocity, guest counts, and remaining tasks in one view.
            </p>
          </div>
          <div className="p-6 bg-white rounded-3xl border border-[#E8DDCF] shadow-soft space-y-3">
            <h3 className="font-serif font-bold text-lg text-[#2D1B28]">Vendor & Caterer Isolation</h3>
            <p className="text-xs text-[#7D597E] leading-relaxed">
              Send your caterer a live read-only food sheet and your transport desk a live airport manifest without compromising guest privacy.
            </p>
          </div>
          <div className="p-6 bg-white rounded-3xl border border-[#E8DDCF] shadow-soft space-y-3">
            <h3 className="font-serif font-bold text-lg text-[#2D1B28]">Day-of QR Check-In Desk</h3>
            <p className="text-xs text-[#7D597E] leading-relaxed">
              Deploy greeters with iPads at luxury hotel lobbies. Scan guest passes in seconds, issue keys, and assign banquet tables.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
