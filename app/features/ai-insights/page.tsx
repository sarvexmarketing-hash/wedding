"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { AllFeaturesSection } from "@/components/marketing/AllFeaturesSection";
import { Sparkles, BrainCircuit, ArrowRight } from "lucide-react";

export default function FeaturesAiInsightsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      <Navbar />
      <main className="flex-1 py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#74182E] bg-[#74182E]/10 px-3 py-1 rounded-full">
            Machine Learning Core
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[#2D1B28]">
            AI Attendance Forecasting & Assistant.
          </h1>
          <p className="text-base sm:text-lg text-[#654566]">
            Never rely purely on raw RSVP numbers. WeddingOS AI predicts actual physical turnout with 94%+ accuracy and answers wedding operations questions in real time.
          </p>
          <div className="pt-2">
            <Link
              href="/app/insights"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#74182E] text-white text-sm font-semibold shadow-soft hover:bg-[#581223]"
            >
              <span>Try WeddingOS AI Demo</span>
              <ArrowRight className="w-4 h-4 text-[#E1CD98]" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-3xl border border-[#E8DDCF] shadow-soft space-y-2">
            <h3 className="font-serif font-bold text-lg text-[#2D1B28]">Predictive Turnout Range</h3>
            <p className="text-xs text-[#7D597E] leading-relaxed">
              Calculates statistical ranges (e.g. 468–491 guests) taking into account interstate travel dropouts, family attendance consistency, and day-of-week factors.
            </p>
          </div>
          <div className="p-6 bg-white rounded-3xl border border-[#E8DDCF] shadow-soft space-y-2">
            <h3 className="font-serif font-bold text-lg text-[#2D1B28]">Conversational AI Assistant</h3>
            <p className="text-xs text-[#7D597E] leading-relaxed">
              Ask natural questions like &quot;How many Jain meals are needed?&quot; or &quot;Who changed RSVP?&quot; and receive instant data-backed answers.
            </p>
          </div>
          <div className="p-6 bg-white rounded-3xl border border-[#E8DDCF] shadow-soft space-y-2">
            <h3 className="font-serif font-bold text-lg text-[#2D1B28]">Cost Optimization</h3>
            <p className="text-xs text-[#7D597E] leading-relaxed">
              Saves families ₹1.5L–₹5L on unconsumed banquet plates, unnecessary shuttle coaches, and surplus room blocks.
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
