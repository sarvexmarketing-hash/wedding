"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { AllFeaturesSection } from "@/components/marketing/AllFeaturesSection";
import { Users, ArrowRight } from "lucide-react";

export default function FeaturesGuestManagementPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      <Navbar />
      <main className="flex-1 py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#74182E] bg-[#74182E]/10 px-3 py-1 rounded-full">
            Guest CRM
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[#2D1B28]">
            A Structured CRM for Indian Occasions.
          </h1>
          <p className="text-base sm:text-lg text-[#654566]">
            Keep hundreds of guests structured by side, family household, VIP status, and dietary requirements with instant CSV import and export.
          </p>
          <div className="pt-2">
            <Link
              href="/app/guests"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#74182E] text-white text-sm font-semibold shadow-soft hover:bg-[#581223]"
            >
              <span>Explore Guest CRM Live</span>
              <ArrowRight className="w-4 h-4 text-[#E1CD98]" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-3xl border border-[#E8DDCF] shadow-soft space-y-2">
            <h3 className="font-serif font-bold text-lg text-[#2D1B28]">Bride & Groom Side Separation</h3>
            <p className="text-xs text-[#7D597E] leading-relaxed">
              Tag relatives, college friends, colleagues, and VIP dignitaries with custom filtering and search.
            </p>
          </div>
          <div className="p-6 bg-white rounded-3xl border border-[#E8DDCF] shadow-soft space-y-2">
            <h3 className="font-serif font-bold text-lg text-[#2D1B28]">1-Click Excel CSV Import</h3>
            <p className="text-xs text-[#7D597E] leading-relaxed">
              Drop in existing family spreadsheets. WeddingOS maps columns, detects telephone numbers, and cleans duplicates.
            </p>
          </div>
          <div className="p-6 bg-white rounded-3xl border border-[#E8DDCF] shadow-soft space-y-2">
            <h3 className="font-serif font-bold text-lg text-[#2D1B28]">Audit Trail & Change History</h3>
            <p className="text-xs text-[#7D597E] leading-relaxed">
              Track whenever a guest changes attendance, dietary needs, or brings an additional family member.
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
