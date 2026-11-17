"use client";

import React from "react";
import { Heart, Sparkles } from "lucide-react";
import { InvitationWeddingData, InvitationTemplate } from "@/lib/template-types";

interface SectionProps {
  data: InvitationWeddingData;
  template: InvitationTemplate;
}

export function FamilySection({ data, template }: SectionProps) {
  const { family, couple } = data;
  const { theme } = template;

  if (!family || (!family.brideParents && !family.groomParents)) return null;

  return (
    <div className="pt-8 border-t space-y-6 text-center" style={{ borderColor: theme.borderColor }}>
      <div className="space-y-1">
        <span
          className="text-xs uppercase tracking-widest font-bold"
          style={{ color: theme.accentColor }}
        >
          Family Blessings
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold" style={{ color: theme.textColor }}>
          Together with Our Families
        </h2>
        <p className="text-xs max-w-md mx-auto" style={{ color: theme.subtextColor }}>
          With the love, blessings, and lifelong guidance of our revered parents and elders.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto pt-2">
        {/* Bride Family */}
        <div
          className="p-5 rounded-2xl border space-y-1.5 shadow-soft-sm"
          style={{
            backgroundColor: theme.cardBackground,
            borderColor: theme.borderColor
          }}
        >
          <div className="text-xs font-bold uppercase tracking-wider" style={{ color: theme.primaryColor }}>
            Bride&apos;s Family
          </div>
          <div className="font-serif font-bold text-base" style={{ color: theme.textColor }}>
            {family.brideParents || "Parents of the Bride"}
          </div>
          <p className="text-xs italic" style={{ color: theme.subtextColor }}>
            Warmly request your auspicious presence to celebrate their daughter {couple.brideName}.
          </p>
        </div>

        {/* Groom Family */}
        <div
          className="p-5 rounded-2xl border space-y-1.5 shadow-soft-sm"
          style={{
            backgroundColor: theme.cardBackground,
            borderColor: theme.borderColor
          }}
        >
          <div className="text-xs font-bold uppercase tracking-wider" style={{ color: theme.primaryColor }}>
            Groom&apos;s Family
          </div>
          <div className="font-serif font-bold text-base" style={{ color: theme.textColor }}>
            {family.groomParents || "Parents of the Groom"}
          </div>
          <p className="text-xs italic" style={{ color: theme.subtextColor }}>
            Warmly request your auspicious presence to celebrate their son {couple.groomName}.
          </p>
        </div>
      </div>

      {/* Custom Family Members (Elders/Grandparents) */}
      {family.customMembers && family.customMembers.length > 0 && (
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          {family.customMembers.map(m => (
            <div
              key={m.id}
              className="px-4 py-2 rounded-xl border text-xs flex items-center gap-2"
              style={{
                backgroundColor: theme.backgroundColor,
                borderColor: theme.borderColor,
                color: theme.textColor
              }}
            >
              <Heart className="w-3.5 h-3.5 fill-current" style={{ color: theme.accentColor }} />
              <span><strong>{m.name}</strong> ({m.relation}) — <em>{m.note}</em></span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
