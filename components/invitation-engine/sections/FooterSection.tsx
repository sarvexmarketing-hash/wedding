"use client";

import React from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { InvitationWeddingData, InvitationTemplate } from "@/lib/template-types";

interface SectionProps {
  data: InvitationWeddingData;
  template: InvitationTemplate;
}

export function FooterSection({ data, template }: SectionProps) {
  const { couple, wedding, venue } = data;
  const { theme } = template;

  const monogram = couple.monogram || `${couple.groomName.charAt(0)} & ${couple.brideName.charAt(0)}`;

  return (
    <footer
      className="py-10 text-center space-y-3 border-t mt-8"
      style={{ borderColor: theme.borderColor }}
    >
      <div
        className="w-12 h-12 rounded-full mx-auto flex items-center justify-center font-serif font-bold text-base border"
        style={{
          borderColor: theme.accentColor,
          color: theme.primaryColor,
          backgroundColor: theme.cardBackground
        }}
      >
        {monogram}
      </div>

      <div className="font-serif font-bold text-lg" style={{ color: theme.textColor }}>
        {couple.displayNames}
      </div>

      <div className="text-xs" style={{ color: theme.subtextColor }}>
        {wedding.weddingDate} · {venue.venueName}, {venue.city}
      </div>

      <div className="flex items-center justify-center gap-1.5 text-[11px] pt-3 opacity-60" style={{ color: theme.subtextColor }}>
        <span>Personalized Wedding Stationery by</span>
        <Link href="/" target="_blank" className="font-serif font-bold hover:underline" style={{ color: theme.primaryColor }}>
          WeddingOS
        </Link>
      </div>
    </footer>
  );
}
