"use client";

import React, { useState } from "react";
import { Music, Calendar, MapPin, Sparkles, Heart } from "lucide-react";
import { InvitationWeddingData, InvitationTemplate } from "@/lib/template-types";

interface SectionProps {
  data: InvitationWeddingData;
  template: InvitationTemplate;
  guestName?: string;
  onOpenRsvp?: () => void;
  onAddToCalendar?: () => void;
}

export function HeroSection({ data, template, guestName, onOpenRsvp, onAddToCalendar }: SectionProps) {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const { couple, wedding, venue } = data;
  const { theme } = template;

  const monogram = couple.monogram || `${couple.groomName.charAt(0)} & ${couple.brideName.charAt(0)}`;

  return (
    <section className="relative text-center space-y-6 sm:space-y-8 animate-fade-in">
      {/* Personalized Guest Welcome Banner */}
      {guestName && (
        <div
          className="mx-auto max-w-lg p-3.5 sm:p-4 rounded-2xl border shadow-soft-sm flex items-center justify-center gap-2.5 text-center transition-all animate-fade-in"
          style={{
            borderColor: theme.accentColor,
            backgroundColor: "rgba(255,255,255,0.85)"
          }}
        >
          <Sparkles className="w-4 h-4 flex-none" style={{ color: theme.accentColor }} />
          <p className="text-xs sm:text-sm font-serif font-medium leading-relaxed" style={{ color: theme.textColor }}>
            <span className="font-bold">Dear {guestName}</span>, {couple.displayNames || `${couple.groomName} & ${couple.brideName}`} would love to have you celebrate with them.
          </p>
        </div>
      )}

      {/* Top Controls: Audio toggle & Monogram */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setIsPlayingMusic(!isPlayingMusic)}
          className="px-3 py-1.5 rounded-full border text-xs flex items-center gap-1.5 transition-all shadow-sm"
          style={{
            borderColor: theme.borderColor,
            backgroundColor: isPlayingMusic ? theme.primaryColor : "transparent",
            color: isPlayingMusic ? "#FFFFFF" : theme.textColor
          }}
        >
          <Music className={`w-3.5 h-3.5 ${isPlayingMusic ? "animate-spin text-[#E1CD98]" : ""}`} />
          <span className="hidden sm:inline">
            {isPlayingMusic ? "Shehnai & Sitar Symphonies" : "Play Wedding Music"}
          </span>
        </button>

        {/* Monogram Badge */}
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center font-serif font-bold text-lg shadow-sm border-2 transition-transform hover:scale-105"
          style={{
            borderColor: theme.accentColor,
            backgroundColor: theme.cardBackground,
            color: theme.primaryColor
          }}
        >
          {monogram}
        </div>

        <div className="text-[11px] font-mono px-3 py-1 rounded-full border opacity-70"
          style={{ borderColor: theme.borderColor, color: theme.subtextColor }}>
          {wedding.hashtag || "#RoyalWedding"}
        </div>
      </div>

      {/* Main Wedding Invitation Headline */}
      <div className="space-y-2.5">
        <div
          className="inline-block px-4 py-1 rounded-full text-xs uppercase tracking-[0.25em] font-medium border"
          style={{
            borderColor: theme.borderColor,
            color: theme.subtextColor,
            backgroundColor: "rgba(255,255,255,0.4)"
          }}
        >
          {wedding.weddingTitle || "Together with their families"}
        </div>

        <h1
          className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold tracking-tight leading-none"
          style={{ color: theme.textColor }}
        >
          {couple.displayNames || `${couple.groomName} & ${couple.brideName}`}
        </h1>

        <p
          className="text-sm sm:text-base italic font-serif max-w-xl mx-auto leading-relaxed"
          style={{ color: theme.subtextColor }}
        >
          &ldquo;{wedding.customMessage || "invite you to celebrate their sacred union and lifelong bond of love."}&rdquo;
        </p>
      </div>

      {/* Couple Hero Photo Card */}
      <div
        className="relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[16/10] max-h-96 border shadow-soft group mx-auto w-full"
        style={{ borderColor: theme.borderColor }}
      >
        <div
          className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{
            backgroundImage: `url('${couple.couplePhoto || "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80"}')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent flex items-end p-5 sm:p-7 text-white text-left">
          <div className="space-y-1 w-full">
            <div className="flex items-center justify-between">
              <span
                className="text-[11px] uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full"
                style={{ backgroundColor: "rgba(255,255,255,0.25)", color: "#FFFFFF" }}
              >
                Auspicious Vivah Muhurat
              </span>
              <span className="text-xs text-white/90 font-mono bg-black/40 px-2.5 py-0.5 rounded-full">
                {venue.city}
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-white">
              {wedding.weddingDate} · {venue.city}
            </div>
            <div className="text-xs text-stone-200 truncate">{venue.venueName}</div>
          </div>
        </div>
      </div>

      {/* Primary Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        {data.rsvp.enabled && (
          <button
            type="button"
            onClick={onOpenRsvp}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full font-serif text-base font-bold shadow-soft transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 text-white"
            style={{ backgroundColor: theme.primaryColor }}
          >
            <Sparkles className="w-4 h-4 text-[#E1CD98]" />
            RSVP Attendance (60s)
          </button>
        )}

        <button
          type="button"
          onClick={onAddToCalendar}
          className="w-full sm:w-auto px-6 py-3.5 rounded-full font-sans text-xs font-semibold border hover:bg-black/5 transition-colors flex items-center justify-center gap-2"
          style={{ borderColor: theme.borderColor, color: theme.textColor }}
        >
          <Calendar className="w-4 h-4" style={{ color: theme.accentColor }} />
          Add to Calendar (.ics)
        </button>

        <a
          href={venue.googleMapsLink || `https://maps.google.com/?q=${encodeURIComponent(venue.venueName + " " + venue.city)}`}
          target="_blank"
          rel="noreferrer"
          className="w-full sm:w-auto px-6 py-3.5 rounded-full font-sans text-xs font-semibold border hover:bg-black/5 transition-colors flex items-center justify-center gap-2"
          style={{ borderColor: theme.borderColor, color: theme.textColor }}
        >
          <MapPin className="w-4 h-4" style={{ color: theme.primaryColor }} />
          View Palace Map
        </a>
      </div>
    </section>
  );
}
