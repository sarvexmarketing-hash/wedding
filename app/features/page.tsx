"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { AllFeaturesSection } from "@/components/marketing/AllFeaturesSection";
import FeaturesStoryScrollSection from "@/components/marketing/FeaturesStoryScrollSection";
import { ParallaxScrollFeatureSection } from "@/components/ui/parallax-scroll-feature-section";
import { HandwritingText } from "@/components/ui/handwriting-text";
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, Heart } from "lucide-react";

export default function FeaturesOverviewPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#2D1B28]">
      <Navbar />

      <main className="flex-1">
        {/* Features Hero Header */}
        <div className="pt-16 pb-12 sm:pt-24 sm:pb-16 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#74182E]/10 border border-[#74182E]/20 text-[#74182E] text-xs font-semibold tracking-widest uppercase shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>The WeddingOS Platform Architecture</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-[#2D1B28] tracking-tight leading-[1.15]">
            All Features. <br />
            <span className="text-[#74182E] inline-flex items-center justify-center min-h-[1.25em]">
              <HandwritingText
                words={[
                  "One Unified Operating System.",
                  "Zero Spreadsheets.",
                  "Royal Guest Operations.",
                  "Your Occasion, Our Celebration."
                ]}
                className="text-[#74182E]"
                height="1.15em"
              />
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#654566] max-w-2xl mx-auto font-sans leading-relaxed">
            From the first personalized invitation WhatsApp dispatch to the last guest departing the palace, WeddingOS coordinates every moving part with royal hospitality.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/signup"
              className="px-7 py-3.5 rounded-full bg-[#74182E] text-white font-serif font-bold text-sm shadow-soft hover:bg-[#581223] transition-all transform hover:-translate-y-0.5"
            >
              Start Free Occasion Workspace
            </Link>
            <Link
              href="/app"
              className="px-7 py-3.5 rounded-full bg-white text-[#2D1B28] border border-[#E8DDCF] font-serif font-bold text-sm shadow-soft hover:bg-[#FAF7F2] transition-colors"
            >
              Try Interactive Sandbox
            </Link>
          </div>
        </div>

        {/* Pinned Rotating Flow Art Features Story Scroll */}
        <section className="border-t border-[#E8DDCF]/80">
          <FeaturesStoryScrollSection />
        </section>

        {/* The 8-Card All Features Suite Grid */}
        <AllFeaturesSection />

        {/* Feature Comparison Matrix: WeddingOS vs Spreadsheets vs Generic Forms */}
        <section className="py-20 bg-white border-b border-[#E8DDCF]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-[#C5A059] font-bold">
                Direct Comparison
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2D1B28]">
                Why Traditional Spreadsheets Fail Royal Occasions
              </h2>
            </div>

            <div className="overflow-x-auto rounded-3xl border border-[#E8DDCF] shadow-soft-sm">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#FAF7F2] border-b border-[#E8DDCF] text-[#2D1B28] font-serif font-bold">
                    <th className="p-4 sm:p-5">Capability</th>
                    <th className="p-4 sm:p-5 text-emerald-800 bg-emerald-50/60 font-black">WeddingOS System</th>
                    <th className="p-4 sm:p-5 text-[#7D597E]">Google Sheets / Excel</th>
                    <th className="p-4 sm:p-5 text-[#7D597E]">Generic Form Builders</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8DDCF]/60">
                  {[
                    { cap: "Personalized Digital Stationery (3D Wax Seal)", wos: "Included (5 Palace Themes)", sheets: "None (Manual PDF/JPG)", forms: "Basic Webform" },
                    { cap: "Real-Time Catering Splits (Jain/Veg/Non-Veg)", wos: "Automatic Chef Breakdown", sheets: "Manual manual summing", forms: "Unstructured fields" },
                    { cap: "Day-Of QR Passes & Gate Check-In", wos: "Instant WhatsApp Passes", sheets: "Printed paper lists", forms: "None" },
                    { cap: "Multi-Day Ceremony Timeline & Maps", wos: "Integrated 5+ Events Sync", sheets: "Cluttered table rows", forms: "Separate forms" },
                    { cap: "WhatsApp 1-Click Guest Personalized Dispatch", wos: "Native 1-Click Delivery", sheets: "Manual copy-pasting", forms: "No WhatsApp Sync" },
                    { cap: "Outstation Attrition Prediction Buffer", wos: "Built-In AI Modeling", sheets: "None (Overordering)", forms: "None" }
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#FAF7F2]/50 transition-colors">
                      <td className="p-4 sm:p-5 font-semibold text-[#2D1B28]">{row.cap}</td>
                      <td className="p-4 sm:p-5 text-emerald-900 bg-emerald-50/30 font-bold flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-none" />
                        <span>{row.wos}</span>
                      </td>
                      <td className="p-4 sm:p-5 text-[#7D597E]">{row.sheets}</td>
                      <td className="p-4 sm:p-5 text-[#7D597E]">{row.forms}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
