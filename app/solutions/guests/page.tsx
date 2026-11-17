"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Smartphone, CheckCircle2, ArrowRight } from "lucide-react";

export default function GuestsSolutionPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      <Navbar />

      <main className="flex-1 py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#74182E] bg-[#74182E]/10 px-3 py-1 rounded-full">
            For Wedding Guests
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[#2D1B28]">
            A Frictionless Experience. No App Download.
          </h1>
          <p className="text-base sm:text-lg text-[#654566]">
            Receive your invitation on WhatsApp, tap once, select which functions you and your family will attend, and receive your digital wedding pass with maps and table details.
          </p>
          <div className="pt-2">
            <Link
              href="/invite/rahul-priya"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#74182E] text-white text-sm font-semibold shadow-soft hover:bg-[#581223]"
            >
              <span>Experience Guest RSVP Demo (60s)</span>
              <ArrowRight className="w-4 h-4 text-[#E1CD98]" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-3xl border border-[#E8DDCF] shadow-soft space-y-3">
            <h3 className="font-serif font-bold text-lg text-[#2D1B28]">60-Second RSVP</h3>
            <p className="text-xs text-[#7D597E] leading-relaxed">
              No account creation or password required. Your invitation token is secure, unique, and personalized to your family party.
            </p>
          </div>
          <div className="p-6 bg-white rounded-3xl border border-[#E8DDCF] shadow-soft space-y-3">
            <h3 className="font-serif font-bold text-lg text-[#2D1B28]">One-Tap Calendar & Map</h3>
            <p className="text-xs text-[#7D597E] leading-relaxed">
              Add all 5 ceremonies to Apple Calendar or Google Calendar instantly. Open accurate Google Maps links for Taj Falaknuma Palace.
            </p>
          </div>
          <div className="p-6 bg-white rounded-3xl border border-[#E8DDCF] shadow-soft space-y-3">
            <h3 className="font-serif font-bold text-lg text-[#2D1B28]">Digital Wedding Pass</h3>
            <p className="text-xs text-[#7D597E] leading-relaxed">
              Upon confirming RSVP, guests receive a personalized digital pass with QR code, valet slot, and dinner table number.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
