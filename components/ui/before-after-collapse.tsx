"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FileSpreadsheet,
  MessageCircle,
  Mail,
  AlertTriangle,
  Clock,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Layers,
  Heart,
  QrCode,
  Utensils
} from "lucide-react";
import { GhostType } from "@/components/ui/ghost-type";

export function BeforeAfterCollapse() {
  const [mode, setMode] = useState<"before" | "after">("after");

  const chaosItems = [
    { name: "34 Google Sheets ('Final_V3_real.xlsx')", icon: FileSpreadsheet, color: "text-emerald-700 bg-emerald-50 border-emerald-200" },
    { name: "Scattered WhatsApp family groups", icon: MessageCircle, color: "text-green-700 bg-green-50 border-green-200" },
    { name: "Lost dietary preferences & allergies", icon: Utensils, color: "text-amber-700 bg-amber-50 border-amber-200" },
    { name: "Unconfirmed outstation guest arrivals", icon: Clock, color: "text-blue-700 bg-blue-50 border-blue-200" },
    { name: "Lost invitations in spam folders", icon: Mail, color: "text-rose-700 bg-rose-50 border-rose-200" },
    { name: "Wedding-day gate chaos & missing passes", icon: AlertTriangle, color: "text-red-700 bg-red-50 border-red-200" }
  ];

  const systemFeatures = [
    { title: "One Unified Guest CRM", desc: "Every family member, table assignment, and RSVP tracked in real-time.", icon: Layers },
    { title: "Digital Luxury Stationery", desc: "Animated 3D wax seal invitations with dynamic personalized guest links & Shehnai audio.", icon: Mail },
    { title: "Real-Time RSVP Intelligence", desc: "1-click event attendance checkmarks and dietary splits synced to the dashboard.", icon: CheckCircle2 },
    { title: "Catering Portion Intelligence", desc: "Real-time kitchen portions predicting outstation attrition to eliminate plate wastage.", icon: Utensils },
    { title: "Day-Of Palace QR Check-In", desc: "Instant digital entry passes with table and valet allocation for seamless hospitality.", icon: QrCode },
    { title: "AI Logistics & WhatsApp Concierge", desc: "Automated guest reminders, airport pickup fleet tracking, and AI highlights.", icon: Sparkles }
  ];

  return (
    <section className="py-20 md:py-32 bg-[#FAF7F2] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="text-xs uppercase font-bold tracking-widest text-[#C5A059] bg-[#74182E]/5 px-3 py-1 rounded-full border border-[#C5A059]/30">
            The Transformation
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#2D1B28] leading-[1.2] min-h-[2.5em] sm:min-h-[2.2em] flex items-center justify-center">
            <GhostType
              prefix="Stop Managing Your Wedding "
              text={[
                "Across 20 Disconnected Tools.",
                "In 34 Messy Spreadsheets.",
                "Through Endless WhatsApp Chaos."
              ]}
              typingSpeed={48}
              pauseDuration={2800}
              deletingSpeed={20}
              loop={true}
              ghostOpacity={0.32}
              cursorColor="#74182E"
            />
          </h2>
          <p className="text-sm sm:text-base text-[#654566] leading-relaxed">
            See what happens when Indian wedding hospitality meets high-order systems design.
          </p>

          {/* Mode Switcher Pills */}
          <div className="inline-flex p-1.5 rounded-full bg-white border border-[#E8DDCF] shadow-soft-sm mt-4">
            <button
              onClick={() => setMode("before")}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                mode === "before"
                  ? "bg-rose-900 text-white shadow-soft"
                  : "text-[#7D597E] hover:text-[#2D1B28]"
              }`}
            >
              The Spreadsheet Chaos
            </button>
            <button
              onClick={() => setMode("after")}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                mode === "after"
                  ? "bg-[#74182E] text-white shadow-soft"
                  : "text-[#7D597E] hover:text-[#2D1B28]"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E1CD98]" />
              <span>The WeddingOS System</span>
            </button>
          </div>
        </div>

        {/* Morphing Container */}
        <div className="relative min-h-[420px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {mode === "before" ? (
              <motion.div
                key="before"
                initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
                transition={{ duration: 0.55 }}
                className="w-full max-w-4xl bg-rose-50/50 rounded-3xl p-6 sm:p-10 border-2 border-rose-200/80 shadow-soft-lg space-y-6"
              >
                <div className="flex items-center justify-between pb-4 border-b border-rose-200">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-rose-600" />
                    <h3 className="font-serif font-bold text-xl text-rose-950">
                      The Traditional Spreadsheet Breakdown
                    </h3>
                  </div>
                  <span className="text-xs font-mono font-bold text-rose-700 bg-rose-100 px-3 py-1 rounded-full border border-rose-200">
                    High Stress · Fragmented
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {chaosItems.map((item, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-2xl border ${item.color} flex items-start gap-3 text-xs font-medium shadow-sm`}
                    >
                      <item.icon className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{item.name}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 text-center">
                  <button
                    onClick={() => setMode("after")}
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#74182E] hover:underline"
                  >
                    <span>Collapse everything into WeddingOS</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="after"
                initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
                transition={{ duration: 0.55 }}
                className="w-full max-w-4xl bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#C5A059] shadow-soft-xl space-y-8 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#C5A059]/10 to-transparent pointer-events-none rounded-full blur-2xl" />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E8DDCF]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#C5A059] flex items-center justify-center text-[#74182E] font-serif font-bold text-lg">
                      OS
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#2D1B28]">
                        WeddingOS — Unified Command Center
                      </h3>
                      <p className="text-xs text-[#7D597E]">
                        Every guest, family group, RSVP, and caterer operating in perfect harmony.
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300 flex items-center gap-1.5 self-start sm:self-center">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Zero Spreadsheets
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {systemFeatures.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E8DDCF] space-y-2 hover:border-[#C5A059] transition-all group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-white border border-[#E8DDCF] flex items-center justify-center text-[#74182E] group-hover:bg-[#74182E] group-hover:text-white transition-colors">
                          <feat.icon className="w-4 h-4" />
                        </div>
                        <h4 className="font-serif font-bold text-sm text-[#2D1B28]">
                          {feat.title}
                        </h4>
                      </div>
                      <p className="text-xs text-[#654566] leading-relaxed">
                        {feat.desc}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7D597E] border-t border-[#E8DDCF]">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
                    Used by luxury couples across Falaknuma, Udaipur, and Lake Como
                  </span>
                  <button
                    onClick={() => setMode("before")}
                    className="text-[#74182E] font-semibold hover:underline"
                  >
                    Compare with Spreadsheet Chaos
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
