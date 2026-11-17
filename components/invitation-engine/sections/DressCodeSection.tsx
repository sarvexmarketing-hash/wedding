"use client";

import React from "react";
import { Shirt, Sparkles, Heart, Gift } from "lucide-react";
import { InvitationWeddingData, InvitationTemplate } from "@/lib/template-types";

interface SectionProps {
  data: InvitationWeddingData;
  template: InvitationTemplate;
}

export function DressCodeSection({ data, template }: SectionProps) {
  const { additional, events } = data;
  const { theme } = template;

  if (!additional.dressCodeOverview && (!events || events.length === 0)) return null;

  return (
    <div className="pt-8 border-t space-y-6 text-left" style={{ borderColor: theme.borderColor }}>
      <div className="text-center space-y-1">
        <span
          className="text-xs uppercase tracking-widest font-bold"
          style={{ color: theme.accentColor }}
        >
          Smart Attire Guide
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold" style={{ color: theme.textColor }}>
          What Should I Wear?
        </h2>
        <p className="text-xs max-w-md mx-auto" style={{ color: theme.subtextColor }}>
          Curated styling codes and color palettes to help our guests feel festive, elegant, and comfortable.
        </p>
      </div>

      <div
        className="p-5 sm:p-6 rounded-2xl border space-y-4 shadow-soft-sm"
        style={{
          backgroundColor: theme.cardBackground,
          borderColor: theme.borderColor
        }}
      >
        {additional.dressCodeOverview && (
          <div className="p-3.5 rounded-xl border text-xs"
            style={{ backgroundColor: theme.backgroundColor, borderColor: theme.borderColor }}>
            <div className="font-bold mb-0.5" style={{ color: theme.primaryColor }}>
              Host Styling Note
            </div>
            <p style={{ color: theme.textColor }}>{additional.dressCodeOverview}</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {events.map((evt, idx) => (
            <div
              key={evt.id || idx}
              className="p-3.5 rounded-xl border space-y-1 text-xs"
              style={{ backgroundColor: theme.backgroundColor, borderColor: theme.borderColor }}
            >
              <div className="font-serif font-bold text-sm" style={{ color: theme.textColor }}>
                {evt.name}
              </div>
              <div className="text-[11px] font-semibold" style={{ color: theme.primaryColor }}>
                Dress Code: {evt.dressCode || "Festive Traditional"}
              </div>
              <div className="text-[10px]" style={{ color: theme.subtextColor }}>
                {evt.date} · {evt.startTime}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function GiftSection({ data, template }: SectionProps) {
  const { additional } = data;
  const { theme } = template;

  if (!additional.giftRegistry) return null;

  return (
    <div className="pt-8 border-t space-y-4 text-center" style={{ borderColor: theme.borderColor }}>
      <div
        className="p-6 rounded-2xl border max-w-xl mx-auto space-y-2 shadow-soft-sm"
        style={{
          backgroundColor: theme.cardBackground,
          borderColor: theme.borderColor
        }}
      >
        <Gift className="w-5 h-5 mx-auto" style={{ color: theme.primaryColor }} />
        <h3 className="font-serif font-bold text-lg" style={{ color: theme.textColor }}>
          Blessings & Shagun
        </h3>
        <p className="text-xs leading-relaxed italic" style={{ color: theme.subtextColor }}>
          &ldquo;{additional.giftRegistry}&rdquo;
        </p>
      </div>
    </div>
  );
}
