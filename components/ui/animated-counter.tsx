"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import { Sparkles, Heart, Users, CheckCircle2, ShieldCheck } from "lucide-react";

interface CounterItem {
  label: string;
  sublabel: string;
  value: number;
  suffix?: string;
  prefix?: string;
  icon: React.ElementType;
}

const stats: CounterItem[] = [
  {
    label: "Occasions Organized",
    sublabel: "Across Falaknuma, Udaipur, Jaipur & Lake Como",
    value: 12480,
    suffix: "+",
    icon: Heart
  },
  {
    label: "Guests Checked In",
    sublabel: "Frictionless palace gate QR verifications",
    value: 186900,
    suffix: "+",
    icon: Users
  },
  {
    label: "RSVP Delivery Rate",
    sublabel: "Direct 1-click WhatsApp guest response",
    value: 99.4,
    suffix: "%",
    icon: CheckCircle2
  },
  {
    label: "Spreadsheets Replaced",
    sublabel: "Unified command center architecture",
    value: 0,
    suffix: " Chaos",
    icon: ShieldCheck
  }
];

export function AnimatedCounters() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 bg-white border-y border-[#E8DDCF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="text-center p-6 rounded-3xl bg-[#FAF7F2] border border-[#E8DDCF] shadow-soft-sm space-y-2 hover:border-[#C5A059] transition-all group"
            >
              <div className="w-10 h-10 rounded-full bg-white border border-[#E8DDCF] flex items-center justify-center mx-auto text-[#74182E] group-hover:scale-110 transition-transform shadow-sm">
                <stat.icon className="w-5 h-5" />
              </div>
              <div className="text-3xl sm:text-4xl font-serif font-bold text-[#74182E] tracking-tight">
                {isInView ? (
                  <span>
                    {stat.value === 0 ? "Zero" : stat.value.toLocaleString()}
                    {stat.suffix}
                  </span>
                ) : (
                  <span>0{stat.suffix}</span>
                )}
              </div>
              <div className="font-serif font-bold text-sm text-[#2D1B28]">
                {stat.label}
              </div>
              <p className="text-[11px] text-[#7D597E] leading-relaxed">
                {stat.sublabel}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
