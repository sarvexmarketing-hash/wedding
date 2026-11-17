"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { AllFeaturesSection } from "@/components/marketing/AllFeaturesSection";
import { Calendar, ArrowRight } from "lucide-react";

export default function FeaturesEventsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      <Navbar />
      <main className="flex-1 py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#74182E] bg-[#74182E]/10 px-3 py-1 rounded-full">
            Ceremony Management
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[#2D1B28]">
            Multi-Event Orchestration.
          </h1>
          <p className="text-base sm:text-lg text-[#654566]">
            Every Indian wedding has distinct functions. Track Mehendi, Haldi, Sangeet, Sacred Wedding, and Reception with separate capacities.
          </p>
          <div className="pt-2">
            <Link
              href="/app/events"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#74182E] text-white text-sm font-semibold shadow-soft hover:bg-[#581223]"
            >
              <span>Manage Events in App</span>
              <ArrowRight className="w-4 h-4 text-[#E1CD98]" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-3xl border border-[#E8DDCF] shadow-soft space-y-2">
            <h3 className="font-serif font-bold text-lg text-[#2D1B28]">Different Capacities per Function</h3>
            <p className="text-xs text-[#7D597E] leading-relaxed">
              Invite 150 guests to the Haldi and 800 to the Reception. Guests only see ceremonies they are invited to.
            </p>
          </div>
          <div className="p-6 bg-white rounded-3xl border border-[#E8DDCF] shadow-soft space-y-2">
            <h3 className="font-serif font-bold text-lg text-[#2D1B28]">Dress Codes & Schedules</h3>
            <p className="text-xs text-[#7D597E] leading-relaxed">
              Communicate attire themes (e.g. Bohemian Florals, Banarasi Silk, Black Tie) clearly on digital passes.
            </p>
          </div>
          <div className="p-6 bg-white rounded-3xl border border-[#E8DDCF] shadow-soft space-y-2">
            <h3 className="font-serif font-bold text-lg text-[#2D1B28]">Live Event Progress Bars</h3>
            <p className="text-xs text-[#7D597E] leading-relaxed">
              Real-time response gauges alert you whenever a function nears or exceeds venue hall fire capacity.
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
