"use client";

import React from "react";
import { Calendar, Clock, MapPin, ExternalLink, Sparkles } from "lucide-react";
import { InvitationWeddingData, InvitationTemplate } from "@/lib/template-types";

interface SectionProps {
  data: InvitationWeddingData;
  template: InvitationTemplate;
  onSelectEventRsvp?: (eventId: string) => void;
}

export function EventsSection({ data, template, onSelectEventRsvp }: SectionProps) {
  const { events } = data;
  const { theme } = template;

  if (!events || events.length === 0) return null;

  return (
    <div className="pt-8 border-t space-y-6 text-left" style={{ borderColor: theme.borderColor }}>
      <div className="text-center space-y-1">
        <span
          className="text-xs uppercase tracking-widest font-bold"
          style={{ color: theme.accentColor }}
        >
          Ceremony Itinerary
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold" style={{ color: theme.textColor }}>
          Sacred Celebrations & Feasts
        </h2>
        <p className="text-xs max-w-md mx-auto" style={{ color: theme.subtextColor }}>
          Join us as we celebrate each blessed tradition across these auspicious ceremonies.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 pt-2">
        {events.map((evt, idx) => (
          <div
            key={evt.id || idx}
            className="p-5 sm:p-6 rounded-2xl border transition-all hover:scale-[1.01] shadow-soft-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
            style={{
              backgroundColor: theme.cardBackground,
              borderColor: theme.borderColor
            }}
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="text-xs font-bold px-2.5 py-0.5 rounded-md"
                  style={{
                    backgroundColor: `${theme.primaryColor}15`,
                    color: theme.primaryColor
                  }}
                >
                  Ceremony {idx + 1}: {evt.name}
                </span>
                <span
                  className="text-xs flex items-center gap-1 font-medium"
                  style={{ color: theme.subtextColor }}
                >
                  <Calendar className="w-3.5 h-3.5" style={{ color: theme.accentColor }} />
                  {evt.date} · {evt.startTime} {evt.endTime ? `- ${evt.endTime}` : ""}
                </span>
              </div>

              <h3 className="text-lg font-serif font-bold" style={{ color: theme.textColor }}>
                {evt.name}
              </h3>

              {evt.description && (
                <p className="text-xs leading-relaxed max-w-xl" style={{ color: theme.subtextColor }}>
                  {evt.description}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-3 text-xs pt-1">
                {evt.dressCode && (
                  <span style={{ color: theme.subtextColor }}>
                    Attire: <strong style={{ color: theme.textColor }}>{evt.dressCode}</strong>
                  </span>
                )}
                <span style={{ color: theme.subtextColor }}>·</span>
                <span className="flex items-center gap-1" style={{ color: theme.subtextColor }}>
                  <MapPin className="w-3.5 h-3.5" style={{ color: theme.primaryColor }} />
                  <span className="truncate max-w-xs">{evt.venue}</span>
                </span>
              </div>
            </div>

            <div className="shrink-0 flex sm:flex-col items-center sm:items-end gap-2 pt-2 md:pt-0 border-t md:border-t-0"
              style={{ borderColor: theme.borderColor }}>
              {data.rsvp.enabled && (
                <button
                  type="button"
                  onClick={() => onSelectEventRsvp?.(evt.id)}
                  className="px-4 py-2 rounded-full text-xs font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
                  style={{ backgroundColor: theme.primaryColor }}
                >
                  RSVP for this Event
                </button>
              )}

              <a
                href={evt.mapUrl || `https://maps.google.com/?q=${encodeURIComponent(evt.venue + " " + evt.address)}`}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-1.5 rounded-full text-[11px] font-medium border hover:bg-black/5 flex items-center gap-1 transition-colors"
                style={{ borderColor: theme.borderColor, color: theme.textColor }}
              >
                <ExternalLink className="w-3 h-3" style={{ color: theme.accentColor }} />
                <span>Directions</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
