'use client';

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ParallaxSectionItem {
  id: string | number;
  title: string;
  description: string;
  imageUrl: string;
  badge?: string;
  reverse?: boolean;
}

export interface ParallaxScrollFeatureSectionProps {
  heading?: string;
  subheading?: string;
  sections?: ParallaxSectionItem[];
  className?: string;
}

const defaultSections: ParallaxSectionItem[] = [
  {
    id: 1,
    badge: "Module 01 · Motion & Stationery",
    title: "Digital Luxury Invitations",
    description: "Replace static paper cards and messy PDF forwards. Every guest receives an animated 3D wax seal envelope with personalized RSVP links, classical Shehnai audio, and multi-day itinerary schedules.",
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    reverse: false
  },
  {
    id: 2,
    badge: "Module 02 · Guest Relations",
    title: "Unified Guest CRM & Clusters",
    description: "Structure your guest list with surgical clarity. Organize families, distinguish Bride vs Groom sides, assign VIP tiers, and track multi-guest households in one cloud dashboard.",
    imageUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
    reverse: true
  },
  {
    id: 3,
    badge: "Module 03 · Banquet Operations",
    title: "Catering Portion Intelligence",
    description: "Food is the heart of an Indian celebration. Stop guessing plates. WeddingOS calculates exact Vegetarian, Jain, Non-Veg, and Vegan splits with automatic outstation travel attrition buffers.",
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
    reverse: false
  },
  {
    id: 4,
    badge: "Module 04 · Day-Of Hospitality",
    title: "Palace QR Pass & Check-In",
    description: "Welcome guests like royalty. Digital entry passes sent via WhatsApp provide instant identity lookup, table allocations (Table A12), and valet parking tickets in under 3.2 seconds.",
    imageUrl: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=1200&q=80',
    reverse: true
  }
];

function ParallaxScrollItem({
  section,
  index
}: {
  section: ParallaxSectionItem;
  index: number;
}) {
  const itemRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "center start"]
  });

  const opacityContent = useTransform(scrollYProgress, [0, 0.7], [0, 1]);
  const clipProgress = useTransform(
    scrollYProgress,
    [0, 0.7],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]
  );
  const translateContent = useTransform(scrollYProgress, [0, 1], [-50, 0]);
  const imageParallaxY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const imageScale = useTransform(scrollYProgress, [0, 0.7, 1], [1.12, 1.05, 1.0]);

  return (
    <div
      ref={itemRef}
      className={cn(
        "min-h-screen flex flex-col md:flex-row items-center justify-center md:gap-24 lg:gap-36 gap-10 py-16",
        section.reverse ? "md:flex-row-reverse" : ""
      )}
    >
      <motion.div
        style={{ y: translateContent, opacity: opacityContent }}
        className="max-w-md space-y-4 text-center md:text-left"
      >
        {section.badge && (
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#74182E]/10 border border-[#74182E]/20 text-[#74182E] text-xs font-semibold uppercase tracking-wider font-mono">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>{section.badge}</span>
          </div>
        )}

        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#2D1B28] tracking-tight leading-tight">
          {section.title}
        </h2>

        <p className="text-[#654566] text-sm sm:text-base leading-relaxed">
          {section.description}
        </p>
      </motion.div>

      <motion.div
        style={{
          opacity: opacityContent,
          clipPath: clipProgress
        }}
        className="relative group rounded-3xl overflow-hidden border-2 border-[#C5A059]/40 shadow-2xl"
      >
        <motion.img
          style={{ y: imageParallaxY, scale: imageScale }}
          src={section.imageUrl}
          className="w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 object-cover"
          alt={section.title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
      </motion.div>
    </div>
  );
}

export const Component = ({
  heading = "PARALLAX SCROLL FEATURE SECTION",
  subheading = "SCROLL",
  sections = defaultSections,
  className
}: ParallaxScrollFeatureSectionProps) => {
  return (
    <div className={cn("w-full bg-[#FAF7F2] text-[#2D1B28] overflow-hidden", className)}>
      {/* Intro Header */}
      <div className="min-h-[60vh] w-full flex flex-col items-center justify-center px-4 text-center space-y-6">
        <span className="text-xs uppercase font-mono tracking-[0.25em] text-[#C5A059] font-bold bg-[#74182E]/5 px-4 py-1.5 rounded-full border border-[#C5A059]/30">
          Cinematic Scroll Experience
        </span>
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold max-w-4xl tracking-tight text-[#2D1B28]">
          {heading}
        </h1>
        <p className="pt-8 flex items-center gap-2 text-xs uppercase tracking-widest font-mono text-[#74182E] font-bold animate-bounce">
          {subheading} <ArrowDown size={15} />
        </p>
      </div>

      {/* Parallax Feature Slices */}
      <div className="flex flex-col px-4 sm:px-10 max-w-7xl mx-auto">
        {sections.map((section, index) => (
          <ParallaxScrollItem
            key={section.id}
            section={section}
            index={index}
          />
        ))}
      </div>

      {/* Outro */}
      <div className="min-h-[40vh] w-full flex flex-col items-center justify-center text-center px-4 space-y-4">
        <div className="w-12 h-0.5 bg-[#C5A059] rounded-full mx-auto" />
        <h3 className="text-3xl sm:text-5xl font-serif font-bold text-[#74182E]">
          Run Like a System, Not a Spreadsheet.
        </h3>
        <p className="text-xs sm:text-sm text-[#7D597E] font-sans">
          Engineered for India&apos;s Grandest Royal Celebrations.
        </p>
      </div>
    </div>
  );
};

export const ParallaxScrollFeatureSection = Component;
export default Component;
