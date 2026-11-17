"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { AllFeaturesSection } from "@/components/marketing/AllFeaturesSection";
import { Utensils, ArrowRight } from "lucide-react";

export default function FeaturesCateringPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      <Navbar />
      <main className="flex-1 py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#74182E] bg-[#74182E]/10 px-3 py-1 rounded-full">
            Banquet Intelligence
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[#2D1B28]">
            Catering Intelligence & Food Planning.
          </h1>
          <p className="text-base sm:text-lg text-[#654566]">
            Food is the heart of an Indian wedding. Stop guessing plates. WeddingOS calculates exact Vegetarian, Non-Vegetarian, and Jain splits with safety buffers.
          </p>
          <div className="pt-2">
            <Link
              href="/app/vendors"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#74182E] text-white text-sm font-semibold shadow-soft hover:bg-[#581223]"
            >
              <span>View Catering Sheet Demo</span>
              <ArrowRight className="w-4 h-4 text-[#E1CD98]" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-3xl border border-[#E8DDCF] shadow-soft space-y-2">
            <h3 className="font-serif font-bold text-lg text-[#2D1B28]">Dedicated Jain Meal Isolation</h3>
            <p className="text-xs text-[#7D597E] leading-relaxed">
              Provides dedicated counts and table mappings (e.g. Table J-04) for guests requiring strictly root-vegetable-free food.
            </p>
          </div>
          <div className="p-6 bg-white rounded-3xl border border-[#E8DDCF] shadow-soft space-y-2">
            <h3 className="font-serif font-bold text-lg text-[#2D1B28]">+7% Chef Buffer Math</h3>
            <p className="text-xs text-[#7D597E] leading-relaxed">
              Automatically applies hospitality-standard safety buffers to prevent embarrassing food shortages during peak dinners.
            </p>
          </div>
          <div className="p-6 bg-white rounded-3xl border border-[#E8DDCF] shadow-soft space-y-2">
            <h3 className="font-serif font-bold text-lg text-[#2D1B28]">Live Caterer Handshake Link</h3>
            <p className="text-xs text-[#7D597E] leading-relaxed">
              Share a live view with your head chef so prep quantities adjust in real-time as RSVPs finalize.
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
