"use client";

import React from "react";
import { motion } from "motion/react";
import { Sparkles, Users, CheckCircle2, QrCode, ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface FloatingProductNotchProps {
  coupleNames?: string;
  venue?: string;
  guestCount?: number;
  rsvpPercent?: number;
  eventsCount?: number;
  className?: string;
}

export function FloatingProductNotch({
  coupleNames = "Rahul & Priya",
  venue = "Taj Falaknuma Palace",
  guestCount = 248,
  rsvpPercent = 86,
  eventsCount = 7,
  className = ""
}: FloatingProductNotchProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, scale: 1.02 }}
      className={`bg-white/90 backdrop-blur-2xl rounded-2xl border border-[#C5A059]/40 shadow-soft-xl p-4 sm:p-5 text-[#2D1B28] max-w-sm w-full transition-all ring-1 ring-black/5 ${className}`}
    >
      <div className="flex items-center justify-between pb-3 border-b border-[#E8DDCF]/80">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#74182E]">
            WeddingOS · Live Operations
          </span>
        </div>
        <span className="text-[11px] font-mono font-medium text-stone-500 bg-[#FAF7F2] px-2 py-0.5 rounded-full border border-[#E8DDCF]">
          Pass v2.4
        </span>
      </div>

      <div className="py-3 space-y-1">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-serif font-bold text-[#2D1B28]">{coupleNames}</h4>
          <span className="text-xs font-semibold text-[#74182E] bg-[#74182E]/10 px-2 py-0.5 rounded-md">
            {eventsCount} Events
          </span>
        </div>
        <p className="text-[11px] text-[#7D597E]">{venue}</p>
      </div>

      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#E8DDCF]/80 text-center">
        <div className="bg-[#FAF7F2] p-2 rounded-xl border border-[#E8DDCF]/50">
          <div className="text-[10px] text-[#7D597E] font-medium">Guests</div>
          <div className="text-sm font-serif font-bold text-[#2D1B28]">{guestCount}</div>
        </div>
        <div className="bg-[#FAF7F2] p-2 rounded-xl border border-[#E8DDCF]/50">
          <div className="text-[10px] text-[#7D597E] font-medium">RSVP Rate</div>
          <div className="text-sm font-serif font-bold text-emerald-700">{rsvpPercent}%</div>
        </div>
        <div className="bg-[#FAF7F2] p-2 rounded-xl border border-[#E8DDCF]/50">
          <div className="text-[10px] text-[#7D597E] font-medium">Check-In</div>
          <div className="text-sm font-serif font-bold text-[#C5A059]">Active</div>
        </div>
      </div>

      <div className="mt-3 pt-2 flex items-center justify-between text-[11px]">
        <span className="text-[#7D597E] flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059]" /> Zero spreadsheets
        </span>
        <Link
          href="/app"
          className="text-[#74182E] font-semibold hover:underline flex items-center gap-1"
        >
          View Live Desk <ArrowUpRight className="w-3 h-3" />
        </Link>
      </div>
    </motion.div>
  );
}
