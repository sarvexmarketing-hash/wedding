"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Activity, Users, Utensils, QrCode } from "lucide-react";

export default function ProductDeepDivePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      <Navbar />

      <main className="flex-1 py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#74182E] bg-[#74182E]/10 px-3 py-1 rounded-full">
            Platform Architecture
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[#2D1B28]">
            The Operating System Behind the Wedding.
          </h1>
          <p className="text-base sm:text-lg text-[#654566]">
            WeddingOS is engineered from the ground up for multi-day, multi-generational Indian occasions where operations and hospitality matter as much as aesthetics.
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

        {/* 6 Modular Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-3xl border border-[#E8DDCF] shadow-soft space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#74182E]/10 flex items-center justify-center text-[#74182E]">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#2D1B28]">1. Digital Stationery & Pass</h3>
            <p className="text-xs text-[#7D597E] leading-relaxed">
              Personalized luxury invitations with interactive RSVP links delivered over WhatsApp. Generates digital passes with QR codes.
            </p>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-[#E8DDCF] shadow-soft space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#74182E]/10 flex items-center justify-center text-[#74182E]">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#2D1B28]">2. Indian Family CRM</h3>
            <p className="text-xs text-[#7D597E] leading-relaxed">
              Maintains true hierarchical family structures. One WhatsApp message lets a family head RSVP for 4–6 members with exact dietary choices.
            </p>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-[#E8DDCF] shadow-soft space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#74182E]/10 flex items-center justify-center text-[#74182E]">
              <Utensils className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#2D1B28]">3. Catering Intelligence</h3>
            <p className="text-xs text-[#7D597E] leading-relaxed">
              Automates Veg, Non-Veg, and strict Jain meal counts. Adds a calculated safety buffer (+7%) for banquet chefs to eliminate food waste.
            </p>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-[#E8DDCF] shadow-soft space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#74182E]/10 flex items-center justify-center text-[#74182E]">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#2D1B28]">4. AI Attendance Forecast</h3>
            <p className="text-xs text-[#7D597E] leading-relaxed">
              Converts raw RSVP declarations into predicted physical attendance (e.g. 468–491 guests) using historical dropout probability curves.
            </p>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-[#E8DDCF] shadow-soft space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#74182E]/10 flex items-center justify-center text-[#74182E]">
              <QrCode className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#2D1B28]">5. Day-of QR Check-In</h3>
            <p className="text-xs text-[#7D597E] leading-relaxed">
              Optical gate scanners verify passes in 2 seconds. Automatically displays assigned banquet table numbers (e.g. Table A12) and valet tags.
            </p>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-[#E8DDCF] shadow-soft space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#74182E]/10 flex items-center justify-center text-[#74182E]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#2D1B28]">6. Role-Based Security (RBAC)</h3>
            <p className="text-xs text-[#7D597E] leading-relaxed">
              Different portals for couple, planners, caterers, transport drivers, and venue staff so sensitive guest data is never exposed.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
