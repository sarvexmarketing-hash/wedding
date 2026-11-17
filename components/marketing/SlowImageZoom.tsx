"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Sparkles, Heart, MapPin, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

interface SlowImageZoomProps {
  imageSrc?: string;
  imageAlt?: string;
  tagline?: string;
  headline?: string;
  subheadline?: string;
  quote?: string;
  location?: string;
  className?: string;
}

export function SlowImageZoom({
  imageSrc = "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=85",
  imageAlt = "Grand Royal Indian Wedding Celebration",
  tagline = "Cinematic Palace Experience",
  headline = "Where Centuries of Heritage Meet Effortless Modern Systems.",
  subheadline = "Designed for the Grandest Multi-Day Indian Weddings",
  quote = "From royal palatial processions in Udaipur to sacred midnight muhurats in Hyderabad, WeddingOS ensures every single guest is received with unforgettable poise.",
  location = "Taj Falaknuma Palace · Lake Pichola Udaipur · Umaid Bhawan",
  className = ""
}: SlowImageZoomProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress across this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Slow, cinematic zoom from 1.0 to 1.25 as user scrolls through
  const scale = useTransform(scrollYProgress, [0, 1], [1.0, 1.22]);

  // Subtle vertical counter-parallax for depth
  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  // Text content floating upwards and fading in gracefully
  const textY = useTransform(scrollYProgress, [0.15, 0.55], [40, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.15, 0.45], [0, 1]);

  return (
    <section
      ref={containerRef}
      className={`relative min-h-[95vh] w-full overflow-hidden flex items-center justify-center bg-stone-950 text-white ${className}`}
    >
      {/* BACKGROUND IMAGE CONTAINER WITH SLOW ZOOM */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <motion.div
          style={{
            scale,
            y: imageY,
            willChange: "transform"
          }}
          className="w-full h-full transform-gpu"
        >
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-full object-cover object-center filter brightness-[0.72] contrast-[1.08]"
            loading="lazy"
          />
        </motion.div>
      </div>

      {/* LUXURY GRADIENT OVERLAYS */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-stone-950/70 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-stone-950/30 to-stone-950/80 pointer-events-none" />

      {/* GOLD FILIGREE INSET BORDER */}
      <div className="absolute inset-4 sm:inset-8 border border-[#C5A059]/30 rounded-3xl sm:rounded-[36px] pointer-events-none" />
      <div className="absolute inset-6 sm:inset-10 border border-white/10 rounded-2xl sm:rounded-[28px] pointer-events-none" />

      {/* EDITORIAL FLOATING CONTENT */}
      <motion.div
        style={{
          y: textY,
          opacity: textOpacity
        }}
        className="relative z-10 max-w-4xl mx-auto px-6 sm:px-12 text-center space-y-6 sm:space-y-8 py-20"
      >
        {/* Monogram Seal */}
        <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border-2 border-[#C5A059] flex items-center justify-center mx-auto text-[#E1CD98] shadow-2xl">
          <Sparkles className="w-6 h-6 text-[#E1CD98] animate-pulse" />
        </div>

        {/* Tagline */}
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-black/40 backdrop-blur-md border border-[#C5A059]/40 text-[#E1CD98] text-xs font-mono font-bold tracking-[0.25em] uppercase shadow-lg">
          <span>{tagline}</span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-white tracking-tight leading-[1.15] drop-shadow-md">
          {headline}
        </h2>

        {/* Poetic Subheadline */}
        <p className="text-base sm:text-xl font-serif italic text-stone-200 max-w-2xl mx-auto leading-relaxed">
          &ldquo;{quote}&rdquo;
        </p>

        {/* Location Indicator */}
        <div className="pt-2 flex items-center justify-center gap-2 text-xs text-[#E1CD98] font-mono">
          <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>{location}</span>
        </div>

        {/* Call to action */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/signup"
            className="px-8 py-4 rounded-full bg-[#74182E] text-white font-semibold text-xs tracking-wider uppercase hover:bg-[#8B1B36] transition-all shadow-soft-xl flex items-center gap-2 border border-[#C5A059]/60 transform hover:-translate-y-0.5"
          >
            <span>Create Your Royal Workspace</span>
            <ArrowRight className="w-4 h-4 text-[#E1CD98]" />
          </Link>
          <Link
            href="/invite/rahul-priya"
            target="_blank"
            className="px-6 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs tracking-wider uppercase backdrop-blur-md border border-white/30 transition-all flex items-center gap-2"
          >
            <span>View Live Guest Experience</span>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
