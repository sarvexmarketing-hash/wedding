"use client";

import React from "react";
import { Heart, Sparkles } from "lucide-react";
import { InvitationWeddingData, InvitationTemplate } from "@/lib/template-types";

interface SectionProps {
  data: InvitationWeddingData;
  template: InvitationTemplate;
}

export function StorySection({ data, template }: SectionProps) {
  const { story } = data;
  const { theme } = template;

  if (!story || (!story.howWeMet && (!story.timeline || story.timeline.length === 0))) return null;

  return (
    <div className="pt-8 border-t space-y-6 text-left" style={{ borderColor: theme.borderColor }}>
      <div className="text-center space-y-1">
        <span
          className="text-xs uppercase tracking-widest font-bold"
          style={{ color: theme.accentColor }}
        >
          Our Journey
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold" style={{ color: theme.textColor }}>
          How Two Paths Became One
        </h2>
      </div>

      {story.howWeMet && (
        <div
          className="p-6 rounded-2xl border text-center space-y-2.5 max-w-2xl mx-auto shadow-soft-sm"
          style={{
            backgroundColor: theme.cardBackground,
            borderColor: theme.borderColor
          }}
        >
          <Heart className="w-5 h-5 mx-auto fill-current" style={{ color: theme.primaryColor }} />
          <p className="text-xs sm:text-sm italic font-serif leading-relaxed" style={{ color: theme.textColor }}>
            &ldquo;{story.howWeMet}&rdquo;
          </p>
          {story.relationshipStory && (
            <p className="text-xs leading-relaxed pt-1" style={{ color: theme.subtextColor }}>
              {story.relationshipStory}
            </p>
          )}
        </div>
      )}

      {/* Timeline Steps */}
      {story.timeline && story.timeline.length > 0 && (
        <div className="pt-4 space-y-4">
          <div className="text-center text-xs uppercase font-bold tracking-wider" style={{ color: theme.accentColor }}>
            Milestones of Forever
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {story.timeline.map((step, idx) => (
              <div
                key={step.id || idx}
                className="p-5 rounded-2xl border space-y-2 relative shadow-soft-sm"
                style={{
                  backgroundColor: theme.cardBackground,
                  borderColor: theme.borderColor
                }}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-md font-mono"
                    style={{
                      backgroundColor: `${theme.primaryColor}15`,
                      color: theme.primaryColor
                    }}
                  >
                    {step.year}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider opacity-60" style={{ color: theme.subtextColor }}>
                    Chapter {idx + 1}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-base" style={{ color: theme.textColor }}>
                  {step.title}
                </h3>

                <p className="text-xs leading-relaxed" style={{ color: theme.subtextColor }}>
                  {step.story}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
