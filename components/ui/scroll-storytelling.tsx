"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Calendar,
  Mail,
  Users,
  Utensils,
  QrCode,
  ArrowRight,
  Clock,
  Heart,
  ChevronRight,
  ShieldCheck,
  Check
} from "lucide-react";
import Link from "next/link";

interface StoryStep {
  id: string;
  number: string;
  stepName: string;
  title: string;
  subtitle: string;
  description: string;
  bulletPoints: string[];
  visual: {
    badge: string;
    headline: string;
    subline: string;
    details: { label: string; value: string }[];
    themeColor: string;
  };
}

const steps: StoryStep[] = [
  {
    id: "step-1",
    number: "01",
    stepName: "PLAN",
    title: "Structure Your Multi-Day Celebrations",
    subtitle: "Every muhurat, puja, sangeet, and reception mapped with surgical precision.",
    description: "Indian occasions span 3 to 7 sacred ceremonies across multiple venues. WeddingOS lets you configure dress codes, schedules, maps, and specific invitation rules for every event.",
    bulletPoints: [
      "Custom dress-code guidelines per ceremony",
      "Venue directions with Google Maps integration",
      "Family elder and VIP schedule synchronization"
    ],
    visual: {
      badge: "Command Center · Muhurat Schedule",
      headline: "5 Sacred Ceremonies",
      subline: "Mehendi · Haldi · Sangeet · Vedic Wedding · Palace Reception",
      details: [
        { label: "Target Muhurat", value: "12 Dec 2026, 10:18 AM" },
        { label: "Primary Venue", value: "Taj Falaknuma Palace" },
        { label: "Dress Codes", value: "Curated per event" }
      ],
      themeColor: "#C5A059"
    }
  },
  {
    id: "step-2",
    number: "02",
    stepName: "INVITE",
    title: "Send Royal Digital Invitations",
    subtitle: "Luxury stationery aesthetics powered by live cloud RSVP technology.",
    description: "Replace PDF forwards and chaotic WhatsApp messages with bespoke digital invitation links that play classical Shehnai music, display your love story, and welcome guests by name.",
    bulletPoints: [
      "8 Luxury Indian palace & modern editorial templates",
      "Background Shehnai & Sitar music player",
      "Zero app installation required for guests"
    ],
    visual: {
      badge: "Live Invitation · /invite/rahul-priya",
      headline: "Rahul & Priya",
      subline: "Together with their families invite you to celebrate",
      details: [
        { label: "Template", value: "Royal Indian Palace" },
        { label: "Music", value: "Raga Yaman Shehnai" },
        { label: "WhatsApp Share", value: "1-Click Direct Link" }
      ],
      themeColor: "#74182E"
    }
  },
  {
    id: "step-3",
    number: "03",
    stepName: "RSVP",
    title: "Know Exactly Who Is Attending",
    subtitle: "Live confirmations, dietary matrix, and family cluster management.",
    description: "Guests RSVP in under 60 seconds with simple one-tap verification. Collect dietary restrictions (Vegetarian, Jain, Non-Veg), flight arrival schedules, and family member headcounts.",
    bulletPoints: [
      "Instant event-by-event attendance checkboxes",
      "Jain, Vegan & allergy tracking for the head chef",
      "Automated polite WhatsApp follow-ups for pending guests"
    ],
    visual: {
      badge: "Guest CRM · Live RSVP Matrix",
      headline: "248 of 312 Confirmed (86%)",
      subline: "105 Veg · 60 Non-Veg · 10 Jain · 15 Pending",
      details: [
        { label: "Outstation Guests", value: "112 Arriving by Air" },
        { label: "Family Clusters", value: "48 Joint Families" },
        { label: "Response Velocity", value: "4.2x Faster than Paper" }
      ],
      themeColor: "#059669"
    }
  },
  {
    id: "step-4",
    number: "04",
    stepName: "ORGANIZE",
    title: "Orchestrate Catering & Hospitality",
    subtitle: "AI portion calculations preventing plate wastage and outstation attrition.",
    description: "Our catering intelligence model factors outstation attrition and local guest patterns, giving your kitchen exact plate forecasts so you never overpay for guarantee covers.",
    bulletPoints: [
      "AI buffer adjustment preventing food wastage",
      "Airport pickup and hotel room allocation desks",
      "Real-time kitchen dashboard for banqueting staff"
    ],
    visual: {
      badge: "Catering AI · Kitchen Operations",
      headline: "188 Plates Recommended",
      subline: "Buffer: 7% · Estimated Savings: ₹2.4 Lakhs",
      details: [
        { label: "Veg Guarantee", value: "112 portions" },
        { label: "Non-Veg Guarantee", value: "65 portions" },
        { label: "Jain Kitchen", value: "11 specialized covers" }
      ],
      themeColor: "#2563EB"
    }
  },
  {
    id: "step-5",
    number: "05",
    stepName: "CELEBRATE",
    title: "Frictionless Day-Of Palace Check-In",
    subtitle: "VIP QR passes scanning at palace gates for seamless entry and hospitality.",
    description: "When guests arrive, banqueting staff scan their digital Wedding Pass in 1.2 seconds. Guests instantly receive their table allocation, parking spot, and welcome drink usher.",
    bulletPoints: [
      "Instant 1-second camera QR scan on any phone",
      "Table & valet allocation automatically displayed",
      "Real-time arrival feed for bride & groom's family elders"
    ],
    visual: {
      badge: "Palace Gate · Digital Check-In Pass",
      headline: "Rajesh & Sunita Sharma",
      subline: "Table Kohinoor-4 · Valet Slot P-12 · Checked In 7:42 PM",
      details: [
        { label: "Check-in Status", value: "Verified VIP Guest" },
        { label: "Scan Time", value: "0.8 seconds" },
        { label: "Welcome Ushed", value: "Falaknuma Durbar Hall" }
      ],
      themeColor: "#7C3AED"
    }
  }
];

export function ScrollStorytelling() {
  const [activeStepId, setActiveStepId] = useState<string>("step-1");
  const activeStep = steps.find(s => s.id === activeStepId) || steps[0];

  return (
    <section className="py-24 md:py-36 bg-[#FAF7F2] border-t border-[#E8DDCF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase font-bold tracking-widest text-[#C5A059] bg-[#74182E]/5 px-3 py-1 rounded-full border border-[#C5A059]/30">
            The WeddingOS Lifecycle
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#2D1B28]">
            From First Invitation to Palace Check-In.
          </h2>
          <p className="text-sm sm:text-base text-[#654566] leading-relaxed">
            Experience how WeddingOS seamlessly carries you through every phase of the celebration.
          </p>
        </div>

        {/* Step Navigation Bar */}
        <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-12">
          {steps.map((step, idx) => (
            <button
              key={step.id}
              onClick={() => setActiveStepId(step.id)}
              className={`px-4 sm:px-6 py-3 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 border ${
                activeStepId === step.id
                  ? "bg-[#74182E] text-white border-[#74182E] shadow-soft-lg scale-105"
                  : "bg-white text-[#7D597E] border-[#E8DDCF] hover:bg-[#F3ECE1] hover:text-[#2D1B28]"
              }`}
            >
              <span className="font-mono text-[10px] opacity-70">{step.number}</span>
              <span className="font-serif tracking-wider uppercase font-bold">{step.stepName}</span>
            </button>
          ))}
        </div>

        {/* Interactive 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-6 sm:p-12 border border-[#E8DDCF] shadow-soft-xl relative overflow-hidden">
          {/* Subtle ornate gold border inside */}
          <div className="absolute inset-2 sm:inset-3 border border-[#C5A059]/20 rounded-[22px] pointer-events-none" />

          {/* Left Column: Narrative & Explanation */}
          <div className="lg:col-span-6 space-y-6 relative z-10">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#C5A059] uppercase tracking-wider">
                <span>Phase {activeStep.number}</span>
                <span>·</span>
                <span className="text-[#74182E]">{activeStep.stepName}</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-serif font-bold text-[#2D1B28] leading-tight">
                {activeStep.title}
              </h3>
              <p className="text-sm text-[#74182E] font-medium italic font-serif">
                &ldquo;{activeStep.subtitle}&rdquo;
              </p>
            </div>

            <p className="text-xs sm:text-sm text-[#654566] leading-relaxed">
              {activeStep.description}
            </p>

            <ul className="space-y-2.5 pt-2">
              {activeStep.bulletPoints.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-[#2D1B28] font-medium">
                  <div className="w-4 h-4 rounded-full bg-[#FAF7F2] border border-[#C5A059] flex items-center justify-center shrink-0 mt-0.5 text-[#74182E]">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4 flex items-center gap-4">
              <Link
                href="/signup"
                className="px-6 py-3 rounded-full bg-[#74182E] text-white text-xs font-semibold hover:bg-[#581223] transition-all shadow-soft flex items-center gap-2"
              >
                <span>Experience Phase {activeStep.number}</span>
                <ArrowRight className="w-4 h-4 text-[#E1CD98]" />
              </Link>
            </div>
          </div>

          {/* Right Column: Dynamic Stage Visualizer */}
          <div className="lg:col-span-6 relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep.id}
                initial={{ opacity: 0, x: 20, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.96 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#FAF7F2] rounded-2xl p-6 sm:p-8 border border-[#E8DDCF] shadow-soft-lg space-y-6 relative overflow-hidden"
              >
                <div
                  className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none"
                  style={{ backgroundColor: activeStep.visual.themeColor }}
                />

                <div className="flex items-center justify-between pb-3 border-b border-[#E8DDCF]">
                  <span className="text-[10px] font-mono uppercase font-bold text-stone-500 bg-white px-2.5 py-1 rounded-full border border-[#E8DDCF]">
                    {activeStep.visual.badge}
                  </span>
                  <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: activeStep.visual.themeColor }} />
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-xl sm:text-2xl font-serif font-bold text-[#2D1B28]">
                    {activeStep.visual.headline}
                  </h4>
                  <p className="text-xs text-[#7D597E]">
                    {activeStep.visual.subline}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  {activeStep.visual.details.map((detail, idx) => (
                    <div key={idx} className="bg-white p-3 rounded-xl border border-[#E8DDCF] shadow-sm space-y-1">
                      <div className="text-[10px] uppercase tracking-wider text-[#7D597E] font-medium">
                        {detail.label}
                      </div>
                      <div className="text-xs font-serif font-bold text-[#2D1B28]">
                        {detail.value}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-[#7D597E] border-t border-[#E8DDCF]">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" /> End-to-end encrypted
                  </span>
                  <span className="font-mono text-[10px]">Real-time cloud sync</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
