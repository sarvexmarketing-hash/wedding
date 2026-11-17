"use client";

import React, { useMemo } from "react";
import {
  InvitationWeddingData,
  InvitationTemplate,
  SectionType
} from "@/lib/template-types";
import { HeroSection } from "./sections/HeroSection";
import { CountdownSection } from "./sections/CountdownSection";
import { EventsSection } from "./sections/EventsSection";
import { StorySection } from "./sections/StorySection";
import { VenueSection } from "./sections/VenueSection";
import { GallerySection } from "./sections/GallerySection";
import { FamilySection } from "./sections/FamilySection";
import { DressCodeSection, GiftSection } from "./sections/DressCodeSection";
import { RsvpSection } from "./sections/RsvpSection";
import { FooterSection } from "./sections/FooterSection";

interface TemplateRendererProps {
  data: InvitationWeddingData;
  template: InvitationTemplate;
  deviceMode?: "mobile" | "tablet" | "desktop";
  guestName?: string;
  guestPhone?: string;
  guestCount?: number;
  onOpenRsvp?: () => void;
  onAddToCalendar?: () => void;
  onSubmitRsvp?: (rsvp: any) => Promise<any>;
}

export function TemplateRenderer({
  data,
  template,
  deviceMode = "desktop",
  guestName,
  guestPhone,
  guestCount,
  onOpenRsvp,
  onAddToCalendar,
  onSubmitRsvp
}: TemplateRendererProps) {
  // Merge template theme with any user design overrides
  const effectiveTheme = useMemo(() => {
    const base = template.theme;
    const overrides = data.designOverrides;
    if (!overrides) return base;

    return {
      ...base,
      accentColor: overrides.themeColor || base.accentColor,
      primaryColor: overrides.themeColor || base.primaryColor,
      backgroundColor: overrides.backgroundColor || base.backgroundColor,
      cardBackground: overrides.cardBackground || base.cardBackground,
      primaryFont: overrides.primaryFont || base.primaryFont
    };
  }, [template.theme, data.designOverrides]);

  const effectiveTemplate: InvitationTemplate = useMemo(() => ({
    ...template,
    theme: effectiveTheme
  }), [template, effectiveTheme]);

  // Width container based on deviceMode in editor
  const containerWidthClass =
    deviceMode === "mobile"
      ? "max-w-sm"
      : deviceMode === "tablet"
      ? "max-w-xl"
      : "max-w-3xl";

  const renderSection = (type: SectionType, key: string) => {
    switch (type) {
      case "hero":
      case "names":
      case "date":
        return (
          <HeroSection
            key={key}
            data={data}
            template={effectiveTemplate}
            guestName={guestName}
            onOpenRsvp={onOpenRsvp}
            onAddToCalendar={onAddToCalendar}
          />
        );
      case "countdown":
        return <CountdownSection key={key} data={data} template={effectiveTemplate} />;
      case "events":
      case "timeline":
        return (
          <EventsSection
            key={key}
            data={data}
            template={effectiveTemplate}
            onSelectEventRsvp={() => onOpenRsvp?.()}
          />
        );
      case "story":
        return <StorySection key={key} data={data} template={effectiveTemplate} />;
      case "venue":
      case "map":
        return <VenueSection key={key} data={data} template={effectiveTemplate} />;
      case "gallery":
        return <GallerySection key={key} data={data} template={effectiveTemplate} />;
      case "family":
        return <FamilySection key={key} data={data} template={effectiveTemplate} />;
      case "dressCode":
        return <DressCodeSection key={key} data={data} template={effectiveTemplate} />;
      case "gift":
        return <GiftSection key={key} data={data} template={effectiveTemplate} />;
      case "rsvp":
        return (
          <RsvpSection
            key={key}
            data={data}
            template={effectiveTemplate}
            initialGuestName={guestName}
            initialPhone={guestPhone}
            initialGuestCount={guestCount}
            onSubmitRsvp={onSubmitRsvp}
          />
        );
      case "footer":
        return <FooterSection key={key} data={data} template={effectiveTemplate} />;
      default:
        return null;
    }
  };

  // Determine border decorative styles
  const getBorderClasses = () => {
    switch (effectiveTheme.borderStyle) {
      case "ornate-gold":
        return "border-2 shadow-2xl relative";
      case "royal-palace":
        return "border-[3px] shadow-2xl relative";
      case "velvet-frame":
        return "border-2 shadow-2xl ring-1 ring-[#DFBA73]/30";
      case "floral-arch":
        return "border-2 shadow-xl rounded-t-[50px]";
      case "editorial-box":
        return "border shadow-lg";
      case "minimal-border":
      default:
        return "border shadow-soft-lg";
    }
  };

  // Prevent duplicate rendering of compound sections (e.g. hero handles names and date together)
  const renderedTypes = new Set<string>();

  return (
    <div
      className={`min-h-full w-full mx-auto transition-all duration-300 py-6 px-3 sm:px-6 ${containerWidthClass}`}
      style={{
        backgroundColor: effectiveTheme.backgroundColor,
        color: effectiveTheme.textColor
      }}
    >
      {/* Invitation Card Envelope */}
      <div
        className={`rounded-3xl sm:rounded-[40px] p-5 sm:p-10 md:p-12 relative overflow-hidden transition-all ${getBorderClasses()}`}
        style={{
          backgroundColor: effectiveTheme.cardBackground,
          borderColor: effectiveTheme.borderColor
        }}
      >
        {/* Subtle Double Ornate Inset Borders */}
        {effectiveTheme.borderStyle === "ornate-gold" && (
          <>
            <div
              className="absolute inset-2 sm:inset-3 border rounded-[26px] sm:rounded-[34px] pointer-events-none opacity-40"
              style={{ borderColor: effectiveTheme.accentColor }}
            />
            <div
              className="absolute inset-3.5 sm:inset-5 border rounded-[20px] sm:rounded-[28px] pointer-events-none opacity-20"
              style={{ borderColor: effectiveTheme.primaryColor }}
            />
          </>
        )}

        {effectiveTheme.borderStyle === "royal-palace" && (
          <>
            <div
              className="absolute inset-2 sm:inset-3 border-2 rounded-[26px] sm:rounded-[34px] pointer-events-none opacity-60"
              style={{ borderColor: effectiveTheme.accentColor }}
            />
          </>
        )}

        {/* Dynamic Section Mapping */}
        <div className="relative space-y-8 sm:space-y-12">
          {effectiveTemplate.sections
            .filter(sec => sec.enabled)
            .map((section, idx) => {
              // Group hero, names, date together so they don't repeat
              if (["names", "date"].includes(section.type) && renderedTypes.has("hero")) {
                return null;
              }
              if (section.type === "hero") {
                renderedTypes.add("hero");
                renderedTypes.add("names");
                renderedTypes.add("date");
              }

              return renderSection(section.type, `${section.id}-${idx}`);
            })}
        </div>
      </div>
    </div>
  );
}
