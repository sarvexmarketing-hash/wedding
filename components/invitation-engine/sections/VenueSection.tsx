"use client";

import React from "react";
import { MapPin, Plane, Car, Clock, ExternalLink } from "lucide-react";
import { InvitationWeddingData, InvitationTemplate } from "@/lib/template-types";

interface SectionProps {
  data: InvitationWeddingData;
  template: InvitationTemplate;
}

export function VenueSection({ data, template }: SectionProps) {
  const { venue } = data;
  const { theme } = template;

  if (!venue) return null;

  return (
    <div className="pt-8 border-t space-y-6 text-left" style={{ borderColor: theme.borderColor }}>
      <div className="text-center space-y-1">
        <span
          className="text-xs uppercase tracking-widest font-bold"
          style={{ color: theme.accentColor }}
        >
          Destination & Hospitality
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold" style={{ color: theme.textColor }}>
          The Venue & Travel Guide
        </h2>
        <p className="text-xs max-w-md mx-auto" style={{ color: theme.subtextColor }}>
          Everything you need for seamless arrival, palace valet, and royal hospitality.
        </p>
      </div>

      <div
        className="p-6 rounded-2xl border space-y-4 shadow-soft-sm"
        style={{
          backgroundColor: theme.cardBackground,
          borderColor: theme.borderColor
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b"
          style={{ borderColor: theme.borderColor }}>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider" style={{ color: theme.primaryColor }}>
              Official Wedding Destination
            </div>
            <div className="text-xl font-serif font-bold" style={{ color: theme.textColor }}>
              {venue.venueName}
            </div>
            <div className="text-xs" style={{ color: theme.subtextColor }}>
              {venue.address}, {venue.city}
            </div>
          </div>

          <a
            href={venue.googleMapsLink || `https://maps.google.com/?q=${encodeURIComponent(venue.venueName + " " + venue.city)}`}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 rounded-full text-xs font-semibold text-white shadow-soft transition-all inline-flex items-center gap-1.5 self-start sm:self-auto"
            style={{ backgroundColor: theme.primaryColor }}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Open in Google Maps</span>
            <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
          </a>
        </div>

        {/* Travel Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <div
            className="p-3.5 rounded-xl border space-y-1"
            style={{ backgroundColor: theme.backgroundColor, borderColor: theme.borderColor }}
          >
            <div className="flex items-center gap-1.5 font-bold text-xs" style={{ color: theme.primaryColor }}>
              <Plane className="w-4 h-4" />
              <span>Airport Connectivity</span>
            </div>
            <p className="text-[11px] leading-relaxed" style={{ color: theme.subtextColor }}>
              {venue.nearbyAirports || "Conveniently located with rapid expressway access to international airport terminals."}
            </p>
          </div>

          <div
            className="p-3.5 rounded-xl border space-y-1"
            style={{ backgroundColor: theme.backgroundColor, borderColor: theme.borderColor }}
          >
            <div className="flex items-center gap-1.5 font-bold text-xs" style={{ color: theme.primaryColor }}>
              <Car className="w-4 h-4" />
              <span>Valet & Parking</span>
            </div>
            <p className="text-[11px] leading-relaxed" style={{ color: theme.subtextColor }}>
              {venue.parkingInfo || "Complimentary valet parking and golf cart hospitality provided at palace arrival gates."}
            </p>
          </div>

          <div
            className="p-3.5 rounded-xl border space-y-1"
            style={{ backgroundColor: theme.backgroundColor, borderColor: theme.borderColor }}
          >
            <div className="flex items-center gap-1.5 font-bold text-xs" style={{ color: theme.primaryColor }}>
              <Clock className="w-4 h-4" />
              <span>Hospitality Desk</span>
            </div>
            <p className="text-[11px] leading-relaxed" style={{ color: theme.subtextColor }}>
              Check-in desk active at palace foyer with digital pass scanner for immediate room key allocation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
