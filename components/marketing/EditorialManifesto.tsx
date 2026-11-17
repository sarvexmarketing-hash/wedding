"use client";

import React from "react";
import { ScrollBlurTypography } from "@/components/ui/scroll-blur-typography";
import { Sparkles, Heart } from "lucide-react";

export function EditorialManifesto() {
  return (
    <section className="py-28 md:py-44 bg-[#FAF7F2] border-t border-[#E8DDCF] relative overflow-hidden">
      {/* Subtle radial luxury glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-br from-[#C5A059]/10 via-[#74182E]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Subtle Pill Header */}
        <div className="flex items-center justify-center gap-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#74182E]/5 border border-[#C5A059]/30 text-[#74182E] text-xs font-semibold tracking-widest uppercase shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>The WeddingOS Philosophy</span>
          </div>
        </div>

        {/* Codrops Scroll Blur Typography Block 1: Headline Statement */}
        <div className="text-center">
          <ScrollBlurTypography
            text="A sacred wedding is not a spreadsheet."
            className="justify-center text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-[#2D1B28] tracking-tight leading-tight"
            wordClassName="text-[#2D1B28]"
            blurAmount={16}
          />
        </div>

        {/* Codrops Scroll Blur Typography Block 2: Poetic Narrative */}
        <div className="max-w-3xl mx-auto text-center pt-2">
          <ScrollBlurTypography
            text="It is an extraordinary union of two families, generations of elders conferring sacred blessings, and centuries of heritage celebrated under fragrant marigolds and palace lights."
            className="justify-center text-lg sm:text-2xl md:text-3xl font-serif italic text-[#654566] leading-relaxed"
            wordClassName="text-[#654566]"
            blurAmount={14}
          />
        </div>

        {/* Codrops Scroll Blur Typography Block 3: Conclusion Statement */}
        <div className="max-w-2xl mx-auto text-center pt-4">
          <ScrollBlurTypography
            text="When logistical chaos dissolves into effortless clarity, you and your family are finally free to be present for every sacred moment."
            className="justify-center text-sm sm:text-base md:text-lg font-sans font-medium text-[#7D597E] leading-relaxed"
            wordClassName="text-[#74182E]"
            blurAmount={12}
          />
        </div>

        {/* Bottom Monogram Accent */}
        <div className="pt-6 flex flex-col items-center justify-center space-y-2">
          <div className="w-10 h-10 rounded-full bg-white border border-[#C5A059] flex items-center justify-center text-[#74182E] shadow-sm">
            <Heart className="w-4 h-4 fill-current" />
          </div>
          <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#C5A059] font-bold">
            WeddingOS · Luxury Hospitality
          </div>
        </div>
      </div>
    </section>
  );
}
