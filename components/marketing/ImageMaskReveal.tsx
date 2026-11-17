"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import Lenis from "lenis";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Smartphone,
  ShieldCheck,
  QrCode,
  Heart
} from "lucide-react";

interface MaskStage {
  step: string;
  tagline: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  metricLabel: string;
  metricValue: string;
  ctaText: string;
  ctaLink: string;
  imageSrc: string;
  imageAlt: string;
  bgColor: string;
}

const stages: MaskStage[] = [
  {
    step: "01 · THE INVITATION SUITE",
    tagline: "Royal Digital Stationery",
    title: "Elegance Delivered in a Single Link.",
    subtitle: "No clunky app downloads. No lost paper envelopes.",
    description:
      "Welcome each guest by name with classical Shehnai in Raga Yaman, custom gold monogram seals, your personal love story, and 1-tap WhatsApp RSVP confirmations that sync instantly to your guest CRM.",
    highlights: [
      "Custom royal monogram wax seals & bespoke typography",
      "Embedded classical Shehnai & Sitar background music player",
      "Personalized WhatsApp guest links with zero app install required"
    ],
    metricLabel: "Response Velocity",
    metricValue: "4.2x Faster than Traditional Cards",
    ctaText: "Explore Digital Invitations",
    ctaLink: "/features/invitations",
    imageSrc:
      "https://images.unsplash.com/photo-1781077127258-2f3f22cf5d5e?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Royal Palace Wedding Bride Portrait in Red Lehenga",
    bgColor: "#FAF7F2"
  },
  {
    step: "02 · THE GUEST ITINERARY",
    tagline: "Ceremonial Precision",
    title: "Every Muhurat, Dress Code & Venue Route Mapped.",
    subtitle: "Mehendi · Haldi · Sangeet · Vedic Muhurat · Palace Reception",
    description:
      "Indian weddings are multi-day celebrations spanning distinct venues. Provide your guests with personalized itineraries, curated attire color palettes for men and women, airport pickup tracking, and direct Google Maps navigation.",
    highlights: [
      "Chronological multi-event schedule with live Muhurat countdown",
      "Wardrobe guide: recommended colors & fabrics per ceremony",
      "Direct Google Maps venue navigation with valet notes"
    ],
    metricLabel: "Guest Punctuality",
    metricValue: "100% Ceremony Routing Accuracy",
    ctaText: "View Itinerary System",
    ctaLink: "/features/events",
    imageSrc:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Opulent Palace Mandap with Gold Chandeliers",
    bgColor: "#FDF2F4"
  },
  {
    step: "03 · DAY-OF OPERATIONS",
    tagline: "Palace Hospitality",
    title: "Hospitality Fit for Royalty at the Palace Gates.",
    subtitle: "Instant 0.8-second VIP check-in & real-time catering sync.",
    description:
      "When guests arrive, banqueting staff scan their digital Wedding Pass in under a second. Guests are warmly ushered to their allocated tables, valet parking is auto-assigned, and head chefs receive real-time portion updates.",
    highlights: [
      "Digital Palace Pass with custom QR code on any smartphone",
      "Table & valet allocation automatically displayed upon gate entry",
      "Real-time kitchen portion counters eliminating plate wastage"
    ],
    metricLabel: "Gate Verification",
    metricValue: "0.8s Check-in & Zero Gate Queues",
    ctaText: "See Day-of Operations",
    ctaLink: "/features/check-in",
    imageSrc:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Grand Royal Banquet and Reception Celebration",
    bgColor: "#FAF4E8"
  }
];

export function ImageMaskReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    let lenis: Lenis | null = null;
    try {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 2
      });

      let rafId: number;
      function raf(time: number) {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);

      return () => {
        cancelAnimationFrame(rafId);
        lenis?.destroy();
      };
    } catch (e) {
      console.warn("Lenis initialization skipped", e);
    }
  }, []);

  // Screen size check for mobile responsive layout
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Track overall scroll progress inside the mask reveal container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Dynamic Background Color transition matching the stages
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.45, 0.85, 1],
    ["#FAF7F2", "#FDF2F4", "#FAF4E8", "#FAF7F2"]
  );

  return (
    <motion.section
      ref={containerRef}
      style={{ backgroundColor }}
      className="relative transition-colors duration-700 ease-out border-t border-[#E8DDCF]"
    >
      {/* SECTION HEADER */}
      <div className="pt-24 pb-12 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#C5A059]/40 text-[#74182E] text-xs font-semibold tracking-widest uppercase shadow-soft-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>Interactive Architectural Showcase</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#2D1B28] tracking-tight">
          The WeddingOS Experience in Action.
        </h2>
        <p className="text-sm sm:text-base text-[#654566] leading-relaxed max-w-2xl mx-auto">
          Scroll through to experience how WeddingOS seamlessly transitions from digital stationery to multi-day itineraries and day-of palace operations.
        </p>
      </div>

      {/* DESKTOP PINNED SPLIT-SCREEN LAYOUT */}
      {!isMobile ? (
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex">
          {/* Left Column: Narrative steps that scroll naturally */}
          <div className="w-1/2 pr-8 xl:pr-14 space-y-[45vh] pb-[35vh] pt-12">
            {stages.map((stage, idx) => (
              <div
                key={idx}
                className="min-h-[60vh] flex flex-col justify-center space-y-6 bg-white/80 backdrop-blur-xl p-8 sm:p-10 rounded-3xl border border-[#E8DDCF] shadow-soft-xl"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#C5A059] uppercase tracking-wider">
                      {stage.step}
                    </span>
                    <span className="text-[11px] font-mono text-[#74182E] bg-[#74182E]/10 px-2.5 py-0.5 rounded-full font-bold">
                      {stage.tagline}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D1B28] leading-tight">
                    {stage.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-serif italic text-[#74182E] font-medium">
                    &ldquo;{stage.subtitle}&rdquo;
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-[#654566] leading-relaxed">
                  {stage.description}
                </p>

                <ul className="space-y-2.5 pt-2">
                  {stage.highlights.map((item, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2.5 text-xs text-[#2D1B28] font-medium">
                      <div className="w-4 h-4 rounded-full bg-[#FAF7F2] border border-[#C5A059] flex items-center justify-center shrink-0 mt-0.5 text-[#74182E]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059]" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-[#E8DDCF] flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-[10px] uppercase font-mono tracking-wider text-[#7D597E]">
                      {stage.metricLabel}
                    </div>
                    <div className="text-sm font-serif font-bold text-[#74182E]">
                      {stage.metricValue}
                    </div>
                  </div>

                  <Link
                    href={stage.ctaLink}
                    className="px-5 py-2.5 rounded-full bg-[#74182E] text-white text-xs font-semibold hover:bg-[#581223] transition-colors flex items-center gap-1.5 shadow-soft"
                  >
                    <span>{stage.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#E1CD98]" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Pinned sticky window with layered image masking */}
          <div className="w-1/2 sticky top-0 h-screen flex items-center justify-center pl-8 xl:pl-14">
            <div className="relative w-full aspect-[4/5] max-h-[78vh] rounded-[36px] overflow-hidden border-2 border-[#C5A059] shadow-soft-2xl bg-stone-900 group">
              {/* Image 1: Bottom layer */}
              <MaskImage
                src={stages[0].imageSrc}
                alt={stages[0].imageAlt}
                index={0}
                total={3}
                progress={scrollYProgress}
              />

              {/* Image 2: Middle layer */}
              <MaskImage
                src={stages[1].imageSrc}
                alt={stages[1].imageAlt}
                index={1}
                total={3}
                progress={scrollYProgress}
              />

              {/* Image 3: Top layer */}
              <MaskImage
                src={stages[2].imageSrc}
                alt={stages[2].imageAlt}
                index={2}
                total={3}
                progress={scrollYProgress}
              />

              {/* Top Luxury Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30 pointer-events-none" />

              {/* Bottom Card Monogram Watermark */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white pointer-events-none">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#E1CD98]">
                    Royal Architectural Series
                  </div>
                  <div className="font-serif font-bold text-lg text-white">
                    WeddingOS Experience
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center font-serif text-sm font-bold text-[#E1CD98]">
                  W·OS
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* MOBILE STACKED LAYOUT */
        <div className="max-w-xl mx-auto px-4 pb-20 space-y-12">
          {stages.map((stage, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-[#E8DDCF] shadow-soft-xl space-y-5 overflow-hidden"
            >
              {/* Image with Mobile Parallax Scrub */}
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-stone-900 border border-[#C5A059]/40">
                <img
                  src={stage.imageSrc}
                  alt={stage.imageAlt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute top-3 left-3 text-[10px] font-mono font-bold uppercase tracking-wider bg-[#C5A059] text-black px-2.5 py-0.5 rounded-full">
                  Phase {idx + 1}
                </span>
              </div>

              <div className="space-y-2">
                <div className="text-[10px] uppercase font-mono font-bold text-[#C5A059]">
                  {stage.step}
                </div>
                <h3 className="text-xl font-serif font-bold text-[#2D1B28]">
                  {stage.title}
                </h3>
                <p className="text-xs font-serif italic text-[#74182E]">
                  &ldquo;{stage.subtitle}&rdquo;
                </p>
                <p className="text-xs text-[#654566] leading-relaxed pt-1">
                  {stage.description}
                </p>
              </div>

              <div className="pt-2 border-t border-[#E8DDCF] flex items-center justify-between text-xs">
                <div className="text-[11px] font-serif font-bold text-[#74182E]">
                  {stage.metricValue}
                </div>
                <Link
                  href={stage.ctaLink}
                  className="px-4 py-2 rounded-full bg-[#74182E] text-white text-xs font-semibold flex items-center gap-1"
                >
                  <span>{stage.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#E1CD98]" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.section>
  );
}

interface MaskImageProps {
  src: string;
  alt: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

function MaskImage({ src, alt, index, total, progress }: MaskImageProps) {
  // Compute scroll range for this specific layer
  // Layer 0 is visible from 0 to ~0.35, then Layer 1 reveals and masks Layer 0, then Layer 2 masks Layer 1
  const startThreshold = index === 0 ? 0 : (index - 0.1) / total;
  const endThreshold = (index + 0.8) / total;

  // Clip path inset wiping from bottom (inset(0px 0px 100% 0px) to inset(0px 0px 0% 0px))
  const clipInset = useTransform(
    progress,
    [startThreshold, Math.min(startThreshold + 0.25, 1)],
    index === 0 ? [0, 0] : [100, 0]
  );

  const clipPath = useTransform(clipInset, (val: number) => `inset(${val}% 0px 0px 0px)`);

  // Parallax object position shifting
  const objectPositionY = useTransform(
    progress,
    [startThreshold, endThreshold],
    ["35%", "65%"]
  );

  return (
    <motion.div
      style={{
        clipPath: index === 0 ? "none" : clipPath,
        zIndex: index + 1
      }}
      className="absolute inset-0 w-full h-full overflow-hidden"
    >
      <motion.img
        src={src}
        alt={alt}
        style={{
          objectPosition: useTransform(objectPositionY, y => `center ${y}`)
        }}
        className="w-full h-full object-cover scale-105 transition-transform duration-700"
      />
    </motion.div>
  );
}
