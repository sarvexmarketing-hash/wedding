"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Heart, Sparkles, Check, ArrowRight } from "lucide-react";

export default function CouplesSolutionPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      <Navbar />

      <main className="flex-1 py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#74182E] bg-[#74182E]/10 px-3 py-1 rounded-full">
            For Bride, Groom & Families
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[#2D1B28]">
            Be a Guest at Your Own Wedding.
          </h1>
          <p className="text-base sm:text-lg text-[#654566]">
            Eliminate the stress of endless phone calls, conflicting Excel sheets, and last-minute catering panic. WeddingOS gives you and your parents complete peace of mind.
          </p>
          <div className="pt-2">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#74182E] text-white text-sm font-semibold shadow-soft hover:bg-[#581223]"
            >
              <span>Create Your Wedding Free</span>
              <ArrowRight className="w-4 h-4 text-[#E1CD98]" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-3xl border border-[#E8DDCF] shadow-soft space-y-3">
            <h3 className="font-serif font-bold text-lg text-[#2D1B28]">Zero Spreadsheet Headaches</h3>
            <p className="text-xs text-[#7D597E] leading-relaxed">
              Bride&apos;s side and groom&apos;s side have separate tagged lists. As guests respond, numbers sync in real-time on everyone&apos;s phone.
            </p>
          </div>
          <div className="p-6 bg-white rounded-3xl border border-[#E8DDCF] shadow-soft space-y-3">
            <h3 className="font-serif font-bold text-lg text-[#2D1B28]">Polite Automated WhatsApp Nudges</h3>
            <p className="text-xs text-[#7D597E] leading-relaxed">
              Don&apos;t spend your evenings chasing relatives. WeddingOS sends gentle, respectful RSVP reminders automatically.
            </p>
          </div>
          <div className="p-6 bg-white rounded-3xl border border-[#E8DDCF] shadow-soft space-y-3">
            <h3 className="font-serif font-bold text-lg text-[#2D1B28]">Precise Food Numbers</h3>
            <p className="text-xs text-[#7D597E] leading-relaxed">
              Give your banquet caterer exact counts for Veg, Non-Veg, and Jain meals so no food is wasted and nobody goes hungry.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
