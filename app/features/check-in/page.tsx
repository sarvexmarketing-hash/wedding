"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { AllFeaturesSection } from "@/components/marketing/AllFeaturesSection";
import { QrCode, ArrowRight } from "lucide-react";

export default function FeaturesCheckInPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      <Navbar />
      <main className="flex-1 py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#74182E] bg-[#74182E]/10 px-3 py-1 rounded-full">
            Day-Of Operations
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[#2D1B28]">
            Live QR Wedding Check-In.
          </h1>
          <p className="text-base sm:text-lg text-[#654566]">
            Welcome guests at the palace gates like VIPs. Scan digital passes, assign banquet tables on the fly, and view live arrival velocity.
          </p>
          <div className="pt-2">
            <Link
              href="/app/check-in"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#74182E] text-white text-sm font-semibold shadow-soft hover:bg-[#581223]"
            >
              <span>Open Gate Check-In Desk</span>
              <ArrowRight className="w-4 h-4 text-[#E1CD98]" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-3xl border border-[#E8DDCF] shadow-soft space-y-2">
            <h3 className="font-serif font-bold text-lg text-[#2D1B28]">Instant Table Allocation</h3>
            <p className="text-xs text-[#7D597E] leading-relaxed">
              Scanning a pass flashes the guest&apos;s allocated dinner table (e.g. Table A12) and valet tag (P3) in less than 2 seconds.
            </p>
          </div>
          <div className="p-6 bg-white rounded-3xl border border-[#E8DDCF] shadow-soft space-y-2">
            <h3 className="font-serif font-bold text-lg text-[#2D1B28]">Real-Time Inflow Ticker</h3>
            <p className="text-xs text-[#7D597E] leading-relaxed">
              The couple and banquet manager see: 526 Confirmed, 421 Checked In, 105 Yet to Arrive live without refreshing.
            </p>
          </div>
          <div className="p-6 bg-white rounded-3xl border border-[#E8DDCF] shadow-soft space-y-2">
            <h3 className="font-serif font-bold text-lg text-[#2D1B28]">No Paper Gate Sheets</h3>
            <p className="text-xs text-[#7D597E] leading-relaxed">
              Say goodbye to messy printouts with scribbled checkmarks. Give your venue coordinators a sleek digital tool.
            </p>
          </div>
        </div>

        {/* Complete Features Suite */}
        <AllFeaturesSection />
      </main>
      <Footer />
    </div>
  );
}
