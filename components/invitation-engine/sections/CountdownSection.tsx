"use client";

import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { InvitationWeddingData, InvitationTemplate } from "@/lib/template-types";

interface SectionProps {
  data: InvitationWeddingData;
  template: InvitationTemplate;
}

export function CountdownSection({ data, template }: SectionProps) {
  const { wedding, additional } = data;
  const { theme } = template;

  const [timeLeft, setTimeLeft] = useState({
    days: 42,
    hours: 14,
    mins: 28,
    secs: 10
  });

  useEffect(() => {
    let targetTime = new Date("2026-12-12T10:00:00+05:30").getTime();
    if (wedding.weddingDate) {
      const parsed = Date.parse(wedding.weddingDate);
      if (!isNaN(parsed) && parsed > Date.now()) {
        targetTime = parsed;
      }
    }

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          mins: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          secs: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 38, hours: 10, mins: 45, secs: 20 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [wedding.weddingDate]);

  if (additional.countdownEnabled === false) return null;

  return (
    <div
      className="p-5 sm:p-6 rounded-2xl border text-center space-y-3"
      style={{
        backgroundColor: theme.cardBackground,
        borderColor: theme.borderColor
      }}
    >
      <div
        className="text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-1.5"
        style={{ color: theme.accentColor }}
      >
        <Clock className="w-3.5 h-3.5" style={{ color: theme.primaryColor }} />
        Countdown to Auspicious Muhurat
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto">
        <div
          className="rounded-xl p-2.5 sm:p-3 border shadow-soft-sm"
          style={{ borderColor: theme.borderColor, backgroundColor: theme.backgroundColor }}
        >
          <div className="text-2xl sm:text-3xl font-serif font-bold" style={{ color: theme.primaryColor }}>
            {timeLeft.days}
          </div>
          <div className="text-[10px] uppercase tracking-wider mt-0.5" style={{ color: theme.subtextColor }}>
            Days
          </div>
        </div>

        <div
          className="rounded-xl p-2.5 sm:p-3 border shadow-soft-sm"
          style={{ borderColor: theme.borderColor, backgroundColor: theme.backgroundColor }}
        >
          <div className="text-2xl sm:text-3xl font-serif font-bold" style={{ color: theme.primaryColor }}>
            {timeLeft.hours}
          </div>
          <div className="text-[10px] uppercase tracking-wider mt-0.5" style={{ color: theme.subtextColor }}>
            Hours
          </div>
        </div>

        <div
          className="rounded-xl p-2.5 sm:p-3 border shadow-soft-sm"
          style={{ borderColor: theme.borderColor, backgroundColor: theme.backgroundColor }}
        >
          <div className="text-2xl sm:text-3xl font-serif font-bold" style={{ color: theme.primaryColor }}>
            {timeLeft.mins}
          </div>
          <div className="text-[10px] uppercase tracking-wider mt-0.5" style={{ color: theme.subtextColor }}>
            Mins
          </div>
        </div>

        <div
          className="rounded-xl p-2.5 sm:p-3 border shadow-soft-sm"
          style={{ borderColor: theme.borderColor, backgroundColor: theme.backgroundColor }}
        >
          <div className="text-2xl sm:text-3xl font-serif font-bold" style={{ color: theme.primaryColor }}>
            {timeLeft.secs}
          </div>
          <div className="text-[10px] uppercase tracking-wider mt-0.5" style={{ color: theme.subtextColor }}>
            Secs
          </div>
        </div>
      </div>
    </div>
  );
}
