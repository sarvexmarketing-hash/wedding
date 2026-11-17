"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Sparkles, Heart, ShieldCheck, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      <Navbar />
      <main className="flex-1 py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#74182E] bg-[#74182E]/10 px-3 py-1 rounded-full">
            Our Purpose
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[#2D1B28]">
            Built for the Grandeur and Complexity of Indian Weddings.
          </h1>
          <p className="text-base sm:text-lg text-[#654566]">
            We started WeddingOS because we experienced firsthand how traditional weddings unravel across WhatsApp groups, conflicting spreadsheets, and stressed parents.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-[#E8DDCF] shadow-soft space-y-6 text-sm sm:text-base leading-relaxed text-[#4D334E]">
          <h2 className="text-2xl font-serif font-bold text-[#2D1B28]">
            “Run Your Wedding Like a System, Not a Spreadsheet.”
          </h2>
          <p>
            An Indian wedding is not a single two-hour event. It is a multi-day festival uniting two families, hundreds of guests, complex dietary preferences, multiple venues, and hundreds of moving parts.
          </p>
          <p>
            While Western wedding products focus primarily on a simple invitation registry or static website, Indian weddings require genuine operational infrastructure: family grouping, multi-function RSVP, Jain meal isolation, airport shuttles, and day-of gate admission.
          </p>
          <p>
            WeddingOS combines luxury aesthetics inspired by royal Indian palaces with enterprise-grade operational software. We believe couples and their families deserve to be fully present and joyful on their wedding day, confident that the system underneath is keeping every guest and detail organized.
          </p>
          <div className="pt-4 border-t border-[#E8DDCF] flex items-center justify-between">
            <span className="font-serif italic text-stone-500">— The WeddingOS Founding Team</span>
            <Link
              href="/signup"
              className="px-6 py-2.5 rounded-full bg-[#74182E] text-white text-xs font-semibold hover:bg-[#581223]"
            >
              Start Free Wedding
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
