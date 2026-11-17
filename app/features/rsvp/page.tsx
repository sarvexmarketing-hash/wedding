"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { AllFeaturesSection } from "@/components/marketing/AllFeaturesSection";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function FeaturesRsvpPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      <Navbar />
      <main className="flex-1 py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#74182E] bg-[#74182E]/10 px-3 py-1 rounded-full">
            RSVP Operations
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[#2D1B28]">
            Frictionless Multi-Event RSVP Engine.
          </h1>
          <p className="text-base sm:text-lg text-[#654566]">
            Know exactly who is attending each individual ceremony, from the intimate Haldi to the 800-guest Grand Reception.
          </p>
          <div className="pt-2">
            <Link
              href="/invite/rahul-priya"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#74182E] text-white text-sm font-semibold shadow-soft hover:bg-[#581223]"
            >
              <span>Test 60-Second RSVP Flow</span>
              <ArrowRight className="w-4 h-4 text-[#E1CD98]" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-3xl border border-[#E8DDCF] shadow-soft space-y-2">
            <h3 className="font-serif font-bold text-lg text-[#2D1B28]">Household Head RSVP</h3>
            <p className="text-xs text-[#7D597E] leading-relaxed">
              Family heads confirm for spouses, children, and parents in a single tap without requiring multiple form fills.
            </p>
          </div>
          <div className="p-6 bg-white rounded-3xl border border-[#E8DDCF] shadow-soft space-y-2">
            <h3 className="font-serif font-bold text-lg text-[#2D1B28]">Dietary Capturing</h3>
            <p className="text-xs text-[#7D597E] leading-relaxed">
              Records Vegetarian, Non-Vegetarian, strict Jain, Vegan, and allergy notes directly into the caterer dashboard.
            </p>
          </div>
          <div className="p-6 bg-white rounded-3xl border border-[#E8DDCF] shadow-soft space-y-2">
            <h3 className="font-serif font-bold text-lg text-[#2D1B28]">Arrival Coordination</h3>
            <p className="text-xs text-[#7D597E] leading-relaxed">
              Guests specify morning, afternoon, or evening arrival times so valets and hospitality desks are prepared.
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
