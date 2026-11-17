"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Utensils,
  QrCode,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

interface CommandFrame {
  id: string;
  name: string;
  title: string;
  category: string;
  icon: React.ElementType;
  urlPath: string;
  content: {
    heading: string;
    metrics: { label: string; value: string; change?: string }[];
    rows: { title: string; subtitle: string; tag: string; status: string }[];
  };
}

const frames: CommandFrame[] = [
  {
    id: "f-1",
    name: "Command Center",
    category: "Executive Overview",
    title: "Real-Time Wedding Operations",
    icon: LayoutDashboard,
    urlPath: "app.weddingos.com/weddings/rahul-priya",
    content: {
      heading: "Rahul & Priya's Auspicious Union",
      metrics: [
        { label: "Total Invited", value: "312 Guests" },
        { label: "RSVP Confirmed", value: "248 (86%)", change: "+14 today" },
        { label: "AI Attrition Forecast", value: "175-185 Covers" },
        { label: "Ceremonies", value: "5 Events Active" }
      ],
      rows: [
        { title: "Sangeet Grand Ballroom", subtitle: "11 Dec 2026 · 7:30 PM", tag: "220 RSVPs", status: "Ready" },
        { title: "Vedic Muhurat Ceremony", subtitle: "12 Dec 2026 · 10:18 AM", tag: "248 RSVPs", status: "Auspicious" },
        { title: "Royal Palace Reception", subtitle: "12 Dec 2026 · 8:00 PM", tag: "260 RSVPs", status: "Seated" }
      ]
    }
  },
  {
    id: "f-2",
    name: "Guest CRM",
    category: "Relationship Management",
    title: "Families & Attendance Matrix",
    icon: Users,
    urlPath: "app.weddingos.com/weddings/rahul-priya/guests",
    content: {
      heading: "Guest CRM & Family Clusters",
      metrics: [
        { label: "Bride's Family", value: "142 Guests" },
        { label: "Groom's Family", value: "118 Guests" },
        { label: "VIP Dignitaries", value: "28 Guests" },
        { label: "Outstation Air Arrivals", value: "112 Guests" }
      ],
      rows: [
        { title: "Shri Rajesh & Smt. Sunita Sharma", subtitle: "Joint Family (6 members) · Table Kohinoor-1", tag: "VIP", status: "Confirmed" },
        { title: "Ananya Sharma & Family", subtitle: "Table Falak-3 · Vegetarian & Jain", tag: "Bride Side", status: "Confirmed" },
        { title: "Vikramaditya Varma & Party", subtitle: "Table Falak-8 · Non-Vegetarian", tag: "Groom Side", status: "Confirmed" }
      ]
    }
  },
  {
    id: "f-3",
    name: "Catering AI",
    category: "Hospitality Intelligence",
    title: "Kitchen Guarantee & Portions",
    icon: Utensils,
    urlPath: "app.weddingos.com/weddings/rahul-priya/catering",
    content: {
      heading: "Smart Plate & Dietary Matrix",
      metrics: [
        { label: "Guaranteed Covers", value: "188 Plates" },
        { label: "Vegetarian Ratio", value: "62% (116)" },
        { label: "Non-Veg Ratio", value: "33% (62)" },
        { label: "Jain Kitchen", value: "5% (10 Special)" }
      ],
      rows: [
        { title: "Authentic Hyderabadi Dum Biryani (Kachche Gosht)", subtitle: "Executive Chef Table · Heated Handis", tag: "Non-Veg", status: "Calibrated" },
        { title: "Nawabi Paneer Korma & Zafrani Pulao", subtitle: "Pure Desi Ghee Preparation", tag: "Vegetarian", status: "Calibrated" },
        { title: "Jain Dal Makhani & No-Root Appetizers", subtitle: "Separate Satvik Kitchen Line", tag: "Jain Certified", status: "Isolated" }
      ]
    }
  },
  {
    id: "f-4",
    name: "Palace Check-In",
    category: "Day-Of Operations",
    title: "Digital QR Passes & Valet Ushed",
    icon: QrCode,
    urlPath: "app.weddingos.com/weddings/rahul-priya/checkin",
    content: {
      heading: "Live Entrance Desk Scanner",
      metrics: [
        { label: "Scanned Arrivals", value: "142 / 248" },
        { label: "Average Scan Time", value: "0.8 seconds" },
        { label: "Valet Allocations", value: "68 Vehicles Parked" },
        { label: "Gate Flow", value: "Zero Queues" }
      ],
      rows: [
        { title: "Dr. Arvind Reddy", subtitle: "Scanned at Gate 1 · Table Falak-2", tag: "Valet P-14", status: "Checked In" },
        { title: "Meera & Siddharth Kapoor", subtitle: "Scanned at Gate 2 · Table Durbar-5", tag: "Valet P-15", status: "Checked In" },
        { title: "Aditi Rao Hydari", subtitle: "Scanned at VIP Gate · Table Royal-1", tag: "Valet VIP-1", status: "Checked In" }
      ]
    }
  }
];

export function InteractiveDeviceShowcase() {
  const [activeFrameId, setActiveFrameId] = useState<string>("f-1");
  const activeFrame = frames.find(f => f.id === activeFrameId) || frames[0];

  return (
    <section className="py-24 md:py-36 bg-[#FAF7F2] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <span className="text-xs uppercase font-bold tracking-widest text-[#C5A059] bg-[#74182E]/5 px-3 py-1 rounded-full border border-[#C5A059]/30">
            Interactive Product Demo
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#2D1B28]">
            The WeddingOS Command Center.
          </h2>
          <p className="text-xs sm:text-sm text-[#654566] leading-relaxed">
            Click through each module to explore how couples and planners manage their entire celebration from a single command deck.
          </p>

          {/* Module Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {frames.map(frame => (
              <button
                key={frame.id}
                onClick={() => setActiveFrameId(frame.id)}
                className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-semibold transition-all flex items-center gap-2 border ${
                  activeFrameId === frame.id
                    ? "bg-[#74182E] text-white border-[#74182E] shadow-soft-lg scale-105"
                    : "bg-white text-[#7D597E] border-[#E8DDCF] hover:bg-[#F3ECE1] hover:text-[#2D1B28]"
                }`}
              >
                <frame.icon className={`w-3.5 h-3.5 ${activeFrameId === frame.id ? "text-[#E1CD98]" : "text-[#74182E]"}`} />
                <span>{frame.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* MacBook Hardware Showcase Frame */}
        <div className="max-w-5xl mx-auto">
          {/* Laptop Top Bezel */}
          <div className="bg-[#1A1017] rounded-t-3xl p-3 sm:p-4 border-t-2 border-x-2 border-stone-800 shadow-2xl relative">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="px-4 py-1 rounded-full bg-black/60 border border-white/10 text-[11px] font-mono text-stone-300 truncate max-w-xs sm:max-w-md">
                https://{activeFrame.urlPath}
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] text-stone-400 font-mono hidden sm:inline">Active</span>
              </div>
            </div>
          </div>

          {/* Laptop Screen Area */}
          <div className="bg-white border-x-2 border-[#1A1017] p-5 sm:p-8 min-h-[440px] flex flex-col justify-between relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFrame.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                {/* Screen Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E8DDCF]">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#C5A059]">
                      {activeFrame.category}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#2D1B28]">
                      {activeFrame.content.heading}
                    </h3>
                  </div>
                  <Link
                    href="/app"
                    className="self-start sm:self-center px-4 py-1.5 rounded-full bg-[#74182E] text-white text-xs font-semibold hover:bg-[#581223] transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <span>Launch Live App</span>
                    <ExternalLink className="w-3 h-3 text-[#E1CD98]" />
                  </Link>
                </div>

                {/* Metrics 4-Col Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {activeFrame.content.metrics.map((m, idx) => (
                    <div key={idx} className="bg-[#FAF7F2] p-3.5 rounded-xl border border-[#E8DDCF]">
                      <div className="text-[10px] uppercase tracking-wider text-[#7D597E] font-medium">
                        {m.label}
                      </div>
                      <div className="text-base sm:text-lg font-serif font-bold text-[#2D1B28] mt-0.5">
                        {m.value}
                      </div>
                      {m.change && (
                        <div className="text-[10px] text-emerald-700 font-medium mt-0.5">
                          {m.change}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Data Rows List */}
                <div className="space-y-2 pt-2">
                  <div className="text-[11px] font-bold text-[#74182E] uppercase tracking-wider">
                    Live Operational Stream
                  </div>
                  {activeFrame.content.rows.map((row, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E8DDCF] flex items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <div className="font-serif font-bold text-sm text-[#2D1B28]">{row.title}</div>
                        <div className="text-[11px] text-[#7D597E]">{row.subtitle}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-medium bg-white px-2 py-0.5 rounded border border-[#E8DDCF] text-stone-700">
                          {row.tag}
                        </span>
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                          {row.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Laptop Bottom Chin & Base */}
          <div className="bg-[#1A1017] rounded-b-2xl p-2.5 border-b-2 border-x-2 border-stone-800 flex items-center justify-center">
            <div className="w-16 h-1 rounded-full bg-stone-700" />
          </div>
          <div className="h-3 max-w-[85%] mx-auto bg-stone-800 rounded-b-xl shadow-2xl opacity-60" />
        </div>
      </div>
    </section>
  );
}
