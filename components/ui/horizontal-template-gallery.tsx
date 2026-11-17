"use client";

import React, { useState } from "react";
import Link from "next/link";
import { getAllTemplates } from "@/lib/templates";
import {
  Sparkles,
  ArrowRight,
  Eye,
  ExternalLink,
  Heart
} from "lucide-react";

export function HorizontalTemplateGallery() {
  const templates = getAllTemplates();
  const [stopScroll, setStopScroll] = useState(false);

  return (
    <section className="py-24 md:py-36 bg-[#FAF7F2] border-t border-[#E8DDCF] relative overflow-hidden">
      <style>{`
        .template-marquee-track {
          animation: templateMarqueeScroll linear infinite;
        }

        @keyframes templateMarqueeScroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#74182E]/5 border border-[#C5A059]/30 text-xs uppercase font-bold tracking-widest text-[#C5A059]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Luxury Digital Stationery</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#2D1B28]">
              Choose Your Royal Story.
            </h2>
            <p className="text-xs sm:text-sm text-[#654566] leading-relaxed">
              Every template is an interactive digital stationery suite with custom palace motifs, live Shehnai music, real-time RSVP forms, and guest pass check-in.
            </p>
          </div>

          <Link
            href="/app/invitations"
            className="px-6 py-3.5 rounded-full bg-[#74182E] text-white text-xs font-semibold hover:bg-[#581223] transition-colors shadow-soft flex items-center gap-2 self-start md:self-auto shrink-0"
          >
            <span>Explore All 8 Suites in Studio</span>
            <ArrowRight className="w-4 h-4 text-[#E1CD98]" />
          </Link>
        </div>
      </div>

      {/* Infinite Continuous Marquee Track */}
      <div
        className="overflow-hidden w-full relative py-4"
        onMouseEnter={() => setStopScroll(true)}
        onMouseLeave={() => setStopScroll(false)}
      >
        {/* Edge Vignette Fades */}
        <div className="absolute left-0 top-0 h-full w-16 sm:w-32 z-20 pointer-events-none bg-gradient-to-r from-[#FAF7F2] to-transparent" />
        <div className="absolute right-0 top-0 h-full w-16 sm:w-32 z-20 pointer-events-none bg-gradient-to-l from-[#FAF7F2] to-transparent" />

        <div
          className="template-marquee-track flex w-fit"
          style={{
            animationPlayState: stopScroll ? "paused" : "running",
            animationDuration: `${templates.length * 5.5}s`,
          }}
        >
          <div className="flex items-center">
            {[...templates, ...templates].map((template, index) => (
              <div
                key={`${template.id}-${index}`}
                className="w-[280px] sm:w-[320px] md:w-[340px] mx-3 sm:mx-4 bg-white rounded-3xl p-5 border border-[#E8DDCF] shadow-soft-lg flex flex-col justify-between group relative overflow-hidden transition-all duration-500 hover:border-[#C5A059] hover:shadow-soft-2xl hover:scale-[0.98] cursor-pointer shrink-0"
              >
                <div>
                  {/* Visual Image Preview */}
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-stone-100 border border-[#E8DDCF]/80">
                    <img
                      src={template.previewImage}
                      alt={template.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                      <span className="text-[10px] font-bold uppercase tracking-wider font-mono px-2.5 py-0.5 rounded-full bg-[#C5A059] text-[#1A1017] shadow-sm">
                        {template.category}
                      </span>
                      {template.isAnimated && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#74182E]/90 text-white border border-[#91253E] flex items-center gap-1 backdrop-blur-md">
                          <Sparkles className="w-2.5 h-2.5 text-[#E1CD98]" /> Animated
                        </span>
                      )}
                    </div>

                    {/* Bottom Preview Overlay */}
                    <div className="absolute bottom-3 left-3 right-3 text-white z-10">
                      <div className="text-[10px] uppercase font-mono tracking-widest text-[#E1CD98]">
                        {template.theme.primaryFont === "font-serif" ? "Royal Serif" : "Modern Sans"}
                      </div>
                      <div className="text-lg sm:text-xl font-serif font-bold text-white truncate">
                        {template.name}
                      </div>
                    </div>

                    {/* Hover Backdrop-Blur Action Reveal */}
                    <div className="flex flex-col items-center justify-center gap-3 px-4 opacity-0 group-hover:opacity-100 transition-all duration-300 absolute inset-0 backdrop-blur-md bg-black/40 z-20">
                      <p className="text-white text-base font-serif font-bold text-center drop-shadow-md">
                        {template.name}
                      </p>
                      <Link
                        href={`/invite/rahul-priya?template=${template.id}`}
                        target="_blank"
                        className="px-4 py-2 rounded-full bg-white text-[#74182E] text-xs font-semibold hover:bg-[#FAF7F2] transition-colors flex items-center gap-1.5 shadow-soft"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Live Preview</span>
                      </Link>
                    </div>
                  </div>

                  {/* Description & Palette */}
                  <div className="pt-4 space-y-3">
                    <p className="text-xs text-[#654566] line-clamp-2 leading-relaxed">
                      {template.description}
                    </p>

                    <div className="flex items-center justify-between text-[11px] pt-1">
                      <span className="text-[#7D597E] font-medium">Palette:</span>
                      <div className="flex items-center gap-1.5">
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-[#E8DDCF] shadow-sm"
                          style={{ backgroundColor: template.theme.backgroundColor }}
                          title="Background"
                        />
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-[#E8DDCF] shadow-sm"
                          style={{ backgroundColor: template.theme.primaryColor }}
                          title="Primary"
                        />
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-[#E8DDCF] shadow-sm"
                          style={{ backgroundColor: template.theme.accentColor }}
                          title="Accent"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 mt-3 border-t border-[#E8DDCF] flex items-center justify-between text-xs">
                  <span className="font-mono text-[11px] text-[#74182E] font-semibold">
                    {template.pricingType === "FREE" ? "Free Tier" : "Royal Suite"}
                  </span>
                  <Link
                    href={`/app/invitations/editor?templateId=${template.id}`}
                    className="text-[#74182E] font-semibold hover:underline flex items-center gap-1"
                  >
                    <span>Use Template</span>
                    <span className="text-[#C5A059]">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
