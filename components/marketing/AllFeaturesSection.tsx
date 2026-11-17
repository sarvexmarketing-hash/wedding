"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Mail,
  Users,
  CheckCircle2,
  Calendar,
  Utensils,
  QrCode,
  Brain,
  Car,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  Check,
  Compass,
  Layers,
  Heart
} from "lucide-react";

export interface FeatureItem {
  id: string;
  category: "guests" | "invitations" | "operations" | "intelligence";
  badge: string;
  title: string;
  description: string;
  href: string;
  icon: React.ElementType;
  themeColor: string;
  metric: { value: string; label: string };
  highlights: string[];
}

export const allFeatures: FeatureItem[] = [
  {
    id: "invitations",
    category: "invitations",
    badge: "Stationery & Motion",
    title: "Digital Luxury Invitations",
    description: "Bespoke digital stationery inspired by royal Indian palaces. Features 3D animated wax seal envelopes, background Shehnai music, and personalized guest links.",
    href: "/features/invitations",
    icon: Mail,
    themeColor: "#74182E",
    metric: { value: "5 Themes", label: "Palace to Editorial" },
    highlights: [
      "Cinematic 3D wax seal opening animation",
      "Dynamic personalized URL per guest",
      "Zero app install required for guests"
    ]
  },
  {
    id: "guest-crm",
    category: "guests",
    badge: "Guest Relations",
    title: "Unified Guest CRM & Clusters",
    description: "Structure your guest list with surgical clarity. Organize families, distinguish Bride vs Groom sides, assign VIP tiers, and manage multi-guest parties.",
    href: "/features/guest-management",
    icon: Users,
    themeColor: "#C5A059",
    metric: { value: "100%", label: "Spreadsheet Free" },
    highlights: [
      "Linked family heads & party members",
      "Bride, Groom & Mutual side filters",
      "CSV bulk import & WhatsApp broadcasting"
    ]
  },
  {
    id: "rsvp",
    category: "guests",
    badge: "Attendance Telemetry",
    title: "Real-Time RSVP Intelligence",
    description: "Guests RSVP in under 60 seconds with simple one-tap verification. Collect event-by-event attendance, dietary preferences, and flight arrival schedules.",
    href: "/features/rsvp",
    icon: CheckCircle2,
    themeColor: "#74182E",
    metric: { value: "86%", label: "Average RSVP Rate" },
    highlights: [
      "Event-by-event ceremony checkmarks",
      "Automated polite WhatsApp follow-ups",
      "Live headcount analytics & notifications"
    ]
  },
  {
    id: "events",
    category: "operations",
    badge: "Muhurat & Itineraries",
    title: "Multi-Day Ceremony Timelines",
    description: "Map 3 to 7 sacred ceremonies with micro-level precision. Configure dress codes with color swatches, venue directions with Google Maps, and calendar sync.",
    href: "/features/events",
    icon: Calendar,
    themeColor: "#C5A059",
    metric: { value: "5+ Events", label: "Synchronized Live" },
    highlights: [
      "Custom dress-code guidelines per ceremony",
      "Google Maps directions & venue GPS",
      "1-Click .ics calendar download for phones"
    ]
  },
  {
    id: "catering",
    category: "operations",
    badge: "Banquet Precision",
    title: "Catering & Dietary Intelligence",
    description: "Food is the crown of an Indian celebration. Stop guessing plates. WeddingOS calculates exact Vegetarian, Jain, Non-Veg, and Vegan splits with safety buffers.",
    href: "/features/catering",
    icon: Utensils,
    themeColor: "#74182E",
    metric: { value: "0 Plates", label: "Wasted Hospitality" },
    highlights: [
      "Strict Jain & allergy tracking for the chef",
      "Live banquet headcount calculator",
      "Outstation attrition prediction buffer"
    ]
  },
  {
    id: "check-in",
    category: "operations",
    badge: "Day-Of Hospitality",
    title: "Palace QR Check-In & Gate Passes",
    description: "Elevate your gate hospitality. Digital QR passes sent via WhatsApp provide instant guest identity lookup, table assignments, and valet parking allocation.",
    href: "/features/check-in",
    icon: QrCode,
    themeColor: "#C5A059",
    metric: { value: "3.2s", label: "Average Scan Time" },
    highlights: [
      "Instant WhatsApp entry pass dispatch",
      "Table number & valet slot assignment",
      "Real-time palace arrival attendance log"
    ]
  },
  {
    id: "ai-insights",
    category: "intelligence",
    badge: "AI Command",
    title: "AI Wedding Concierge & Highlights",
    description: "Harness AI to answer guest inquiries automatically, predict flight arrival bottlenecks, generate auspicious scripts, and produce cinematic AI wedding highlight videos.",
    href: "/features/ai-insights",
    icon: Brain,
    themeColor: "#74182E",
    metric: { value: "24/7", label: "Automated Concierge" },
    highlights: [
      "Automated guest query response engine",
      "Logistics & catering risk prediction",
      "AI ceremony video highlight generator"
    ]
  },
  {
    id: "logistics",
    category: "operations",
    badge: "Fleet & Hospitality",
    title: "Travel, Fleet & Room Allocations",
    description: "Coordinate airport pickups, train terminal arrivals, driver vehicle assignments, and hotel room allotments across partner heritage palaces.",
    href: "/features/guest-management",
    icon: Car,
    themeColor: "#C5A059",
    metric: { value: "Zero Delay", label: "Fleet Coordination" },
    highlights: [
      "Flight & train arrival synchronization",
      "Hotel room allocations & family wings",
      "Driver contact cards & live transit status"
    ]
  }
];

export function AllFeaturesSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredFeatures = selectedCategory === "all"
    ? allFeatures
    : allFeatures.filter(f => f.category === selectedCategory);

  return (
    <section id="features" className="py-24 md:py-32 bg-[#FAF7F2] border-b border-[#E8DDCF]/80 relative overflow-hidden">
      {/* Subtle background ambient luxury glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-[#74182E]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#74182E]/10 border border-[#74182E]/20 text-[#74182E] text-xs font-semibold tracking-widest uppercase shadow-soft-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>The Complete Wedding Operating System</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#2D1B28] tracking-tight leading-[1.1]">
            Every System You Need to Orchestrate Royalty.
          </h2>

          <p className="text-sm sm:text-base text-[#654566] leading-relaxed max-w-2xl mx-auto font-sans">
            Replace 34 messy spreadsheets, scattered WhatsApp family chats, and caterer guesswork with 8 cohesive, luxury-grade modules.
          </p>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {[
              { id: "all", label: "All 8 Modules" },
              { id: "invitations", label: "Stationery & Motion" },
              { id: "guests", label: "Guest CRM & RSVPs" },
              { id: "operations", label: "Operations & Banquets" },
              { id: "intelligence", label: "AI & Automation" }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 border ${
                  selectedCategory === cat.id
                    ? "bg-[#74182E] text-white border-[#74182E] shadow-soft scale-105"
                    : "bg-white text-[#7D597E] border-[#E8DDCF] hover:border-[#C5A059] hover:text-[#2D1B28]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 8-Card Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredFeatures.map(item => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="group relative rounded-3xl bg-white/95 backdrop-blur-md p-6 sm:p-7 border border-[#E8DDCF] shadow-soft-sm hover:shadow-soft-xl hover:border-[#C5A059] transition-all duration-500 flex flex-col justify-between hover:-translate-y-1.5"
              >
                {/* Top Header */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300 border"
                      style={{
                        backgroundColor: `${item.themeColor}12`,
                        borderColor: `${item.themeColor}30`,
                        color: item.themeColor
                      }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    {/* Metric Tag */}
                    <div className="text-right">
                      <div className="font-serif font-bold text-xs text-[#2D1B28]">
                        {item.metric.value}
                      </div>
                      <div className="text-[10px] text-[#7D597E] uppercase font-mono tracking-wider">
                        {item.metric.label}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-[#C5A059] font-bold">
                      {item.badge}
                    </div>
                    <h3 className="font-serif font-bold text-xl text-[#2D1B28] group-hover:text-[#74182E] transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#654566] leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  {/* Highlights Bullet List */}
                  <div className="pt-2 border-t border-[#E8DDCF]/60 space-y-1.5">
                    {item.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-[11px] text-[#4D334E]">
                        <Check className="w-3.5 h-3.5 text-[#C5A059] flex-none mt-0.5" />
                        <span className="leading-tight">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Link */}
                <div className="pt-5 mt-4 border-t border-[#E8DDCF]/50">
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#74182E] hover:text-[#581223] transition-colors group-hover:translate-x-1 duration-300"
                  >
                    <span>Explore Module Details</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C5A059]" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner with Live Demo CTA */}
        <div className="rounded-3xl p-6 sm:p-10 bg-gradient-to-r from-[#74182E] to-[#4D101E] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-soft-xl border border-[#C5A059]/40">
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E1CD98] uppercase tracking-wider font-mono">
              <Sparkles className="w-4 h-4 text-[#C5A059]" />
              <span>Full Command Experience</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold">
              Ready to test drive all 8 modules?
            </h3>
            <p className="text-xs sm:text-sm text-stone-200 max-w-xl">
              Experience the live guest pass check-in, real-time banquet catering counts, and personalized digital invitations in our interactive demo.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 flex-none w-full sm:w-auto">
            <Link
              href="/app"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#FAF7F2] text-[#74182E] font-serif font-bold text-xs tracking-wide hover:bg-white transition-all shadow-soft text-center"
            >
              Launch Live App Demo
            </Link>
            <Link
              href="/signup"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/25 font-serif font-bold text-xs tracking-wide transition-all text-center"
            >
              Create Free Wedding →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AllFeaturesSection;
