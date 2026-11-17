"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useWedding } from "@/context/WeddingContext";
import {
  Crown,
  Check,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  HelpCircle
} from "lucide-react";

export default function WeddingSubscriptionPage() {
  const { wedding } = useWedding();
  const [activePlan, setActivePlan] = useState("premium");

  const plans = [
    {
      id: "basic",
      name: "Basic Plan",
      badge: "Starter",
      description: "Essential tools to create a digital invitation and collect basic RSVPs.",
      price: "₹1,499",
      period: "per wedding",
      features: [
        "Digital Wedding Invitation",
        "Basic Guest RSVP Tracking",
        "Chronological Event Management",
        "Mobile-Responsive Guest Card",
        "Downloadable Guest List"
      ],
      current: false
    },
    {
      id: "premium",
      name: "Premium Plan",
      badge: "Current Plan",
      description: "The full smart suite for couples wanting complete operational elegance.",
      price: "₹4,999",
      period: "per wedding",
      features: [
        "Everything in Basic",
        "AI Wedding Invitation Video Generator",
        "Smart Attire Recommendations ('What Should I Wear?')",
        "Multi-Language Wedding Experience (8 Languages)",
        "Automated WhatsApp & SMS Event Reminders",
        "Confidential Wedding Gift & Shagun Tracking",
        "AI Attendance & Catering Portion Forecasting"
      ],
      current: true,
      popular: true
    },
    {
      id: "luxury",
      name: "Luxury Concierge",
      badge: "Enterprise",
      description: "White-glove experience for high-profile palace destination weddings.",
      price: "Custom Quote",
      period: "tailored package",
      features: [
        "Everything in Premium",
        "Custom Animated Invitation & 3D Palace Motifs",
        "Dedicated Wedding Concierge Manager",
        "On-Site QR Gate Check-In Tablets & Staff Training",
        "Priority 24/7 WhatsApp Chauffeur Logistics Dispatch",
        "Custom Domain (e.g. rahulwedspraya.com)",
        "Post-Wedding Archival Photo & Blessing Book"
      ],
      current: false
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E8DDCF]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold tracking-wider text-[#74182E] bg-[#74182E]/10 px-2.5 py-0.5 rounded-full">
              Platform Tiering
            </span>
            <span className="text-xs font-bold text-[#C5A059]">Active License</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D1B28] mt-1">
            Wedding Plans & Subscriptions
          </h1>
          <p className="text-xs text-[#7D597E]">
            Scale features as your wedding planning evolves from digital stationery to live day-of operations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 flex items-center gap-1.5">
            <Crown className="w-3.5 h-3.5 text-[#C5A059]" /> Premium Suite Active
          </span>
        </div>
      </div>

      {/* Plan Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {plans.map(p => (
          <div
            key={p.id}
            className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all ${
              p.popular
                ? "bg-white border-2 border-[#74182E] shadow-soft-xl relative ring-1 ring-[#74182E]/20"
                : "bg-white/85 border border-[#E8DDCF] shadow-soft hover:bg-white hover:border-[#C5A059]"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                  p.popular ? "bg-[#74182E] text-white" : "bg-[#FAF7F2] text-[#7D597E] border border-[#E8DDCF]"
                }`}>
                  {p.badge}
                </span>
                {p.current && (
                  <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Activated
                  </span>
                )}
              </div>

              <h3 className="font-serif font-bold text-xl text-[#2D1B28]">{p.name}</h3>
              <p className="text-xs text-[#7D597E] mt-1.5 leading-relaxed">{p.description}</p>

              <div className="my-5 flex items-baseline gap-1.5">
                <span className="text-3xl font-serif font-bold text-[#2D1B28]">{p.price}</span>
                <span className="text-xs text-[#7D597E]">/ {p.period}</span>
              </div>

              <div className="pt-4 border-t border-[#E8DDCF] space-y-2.5 text-xs text-[#4D334E]">
                {p.features.map(f => (
                  <div key={f} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8">
              <button
                disabled={p.current}
                onClick={() => alert(`Upgrading to ${p.name}`)}
                className={`w-full py-3 rounded-full text-center text-xs font-bold transition-all ${
                  p.current
                    ? "bg-[#FAF7F2] text-[#74182E] border border-[#E8DDCF] cursor-default"
                    : p.popular
                    ? "bg-[#74182E] text-white hover:bg-[#581223] shadow-soft"
                    : "bg-[#2D1B28] text-white hover:bg-black"
                }`}
              >
                {p.current ? "Currently Active for this Wedding" : `Upgrade to ${p.name}`}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
