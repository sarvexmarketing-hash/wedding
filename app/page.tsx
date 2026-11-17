"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { KineticTextRotator } from "@/components/ui/kinetic-text";
import { BeforeAfterCollapse } from "@/components/ui/before-after-collapse";
import { ScrollStorytelling } from "@/components/ui/scroll-storytelling";
import TextCircle3D from "@/components/ui/text-circle-3d";
import { ImageMaskReveal } from "@/components/marketing/ImageMaskReveal";
import { SlowImageZoom } from "@/components/marketing/SlowImageZoom";
import { PalaceMomentsShowcase } from "@/components/marketing/PalaceMomentsShowcase";
import { HorizontalTemplateGallery } from "@/components/ui/horizontal-template-gallery";
import { AnimatedCounters } from "@/components/ui/animated-counter";
import { DestinationCloud } from "@/components/ui/destination-cloud";
import { EditorialManifesto } from "@/components/marketing/EditorialManifesto";
import { OccasionPickerModal } from "@/components/marketing/OccasionPickerModal";
import SpecularButton from "@/components/ui/SpecularButton";
import {
  ArrowRight,
  Play,
  CheckCircle2,
  Sparkles,
  Users,
  Calendar,
  Utensils,
  QrCode,
  BellRing,
  Activity,
  ShieldCheck,
  Smartphone,
  ExternalLink,
  ChevronRight,
  X,
  Heart,
  Layers
} from "lucide-react";

export default function HomePage() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [occasionModalOpen, setOccasionModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#2D1B28] selection:bg-[#74182E] selection:text-white">
      <Navbar />

      {/* 1. HERO SECTION WITH KINETIC TYPOGRAPHY */}
      <section className="relative pt-16 pb-24 md:pt-28 md:pb-36 overflow-hidden min-h-[85vh] flex flex-col justify-center">
        {/* Subtle radial luxury vignette & warm ambiance */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#FAF7F2]/60 to-[#FAF7F2] pointer-events-none -z-5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#74182E]/5 via-[#C5A059]/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-7">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#74182E]/10 border border-[#74182E]/20 text-[#74182E] text-xs font-semibold tracking-widest uppercase shadow-sm animate-fade-in backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>The Occasion Operating System</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-1">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-serif font-bold text-[#2D1B28] tracking-tight leading-none drop-shadow-xs">
              Occasions,
            </h1>

            <div className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-[#74182E] tracking-tight leading-[1.1] pt-1">
              <KineticTextRotator
                phrases={[
                  "orchestrated.",
                  "your occasion, our celebration.",
                  "run like a system.",
                  "celebrated without chaos."
                ]}
                className="text-[#74182E]"
              />
            </div>

            <p className="text-sm sm:text-lg text-[#654566] max-w-2xl mx-auto font-sans leading-relaxed pt-3">
              Invitations · Guest CRM · Real-Time RSVPs · Multi-Day Itineraries · Catering Intelligence · Palace Check-In
            </p>
          </div>

          {/* Magnetic CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 pt-6">
            <MagneticButton strength={0.3}>
              <SpecularButton
                size="lg"
                radius={999}
                tint="#74182E"
                tintOpacity={1}
                textColor="#ffffff"
                lineColor="#E1CD98"
                baseColor="#8C2534"
                intensity={1.2}
                idleIntensity={0.35}
                shineSize={14}
                shineFade={36}
                thickness={1.5}
                glow={1.2}
                followMouse
                proximity={260}
                onClick={() => setOccasionModalOpen(true)}
                className="!px-10 !py-4.5 sm:!px-12 sm:!py-5 font-serif font-bold text-lg sm:text-xl shadow-soft-xl hover:shadow-2xl transition-all border border-[#8C2534] cursor-pointer"
              >
                <span>Create Your Occasion Free</span>
                <ArrowRight className="w-6 h-6 text-[#E1CD98]" />
              </SpecularButton>
            </MagneticButton>

            <MagneticButton strength={0.2}>
              <button
                onClick={() => setDemoModalOpen(true)}
                className="inline-flex items-center justify-center gap-3 px-9 py-4.5 sm:px-11 sm:py-5 rounded-full bg-white text-[#2D1B28] text-lg sm:text-xl font-serif font-semibold border-2 border-[#E8DDCF] shadow-soft hover:bg-[#FAF7F2] hover:border-[#C5A059] transition-all transform hover:-translate-y-1 cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-[#74182E]/10 flex items-center justify-center text-[#74182E] flex-none">
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </div>
                <span>Watch 2-min Demo</span>
              </button>
            </MagneticButton>
          </div>

          {/* Trust points */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-medium text-[#7D597E]">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#C5A059]" /> Setup in 5 minutes
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#C5A059]" /> Zero app install for guests
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#C5A059]" /> 1-Click WhatsApp delivery
            </span>
          </div>
        </div>
      </section>

      {/* 2. GLOBAL DESTINATIONS MARQUEE CLOUD */}
      <DestinationCloud />

      {/* 3. CODROPS SCROLL BLUR TYPOGRAPHY EDITORIAL MANIFESTO */}
      <EditorialManifesto />

      {/* 4. BEFORE / AFTER COLLAPSE INTERACTION */}
      <BeforeAfterCollapse />

      {/* 4. CODROPS 3D TEXT CIRCLE KINETIC TYPOGRAPHY (DAVID FAURE) */}
      <TextCircle3D />


      {/* 6. IMAGE MASK REVEAL (PINNED LUXURY ARCHITECTURAL SERIES) */}
      <ImageMaskReveal />

      {/* 6. SLOW IMAGE ZOOM (CINEMATIC PALACE GRANDEUR ON SCROLL) */}
      <SlowImageZoom />

      {/* 7. SCROLL STORYTELLING: PLAN -> INVITE -> RSVP -> ORGANIZE -> CELEBRATE */}
      <ScrollStorytelling />

      {/* 8. HORIZONTAL SCROLLING INVITATION TEMPLATES (3D TILT DIGITAL STATIONERY) */}
      <HorizontalTemplateGallery />

      {/* 9. REAL ROYAL PALACE MOMENTS SHOWCASE (PHOTO MOSAIC) */}
      <PalaceMomentsShowcase />

      {/* 10. ANIMATED STATISTICAL METRICS */}
      <AnimatedCounters />

      {/* 8. EDITORIAL QUOTE & TESTIMONIAL BANNER */}
      <section className="py-24 bg-[#FAF7F2] border-b border-[#E8DDCF] relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="w-12 h-12 rounded-full bg-[#74182E]/10 border border-[#C5A059] flex items-center justify-center mx-auto text-[#74182E]">
            <Heart className="w-6 h-6 fill-current" />
          </div>

          <blockquote className="text-xl sm:text-3xl font-serif italic text-[#2D1B28] leading-relaxed">
            &ldquo;WeddingOS transformed our 3-day Falaknuma occasion into a seamless royal experience. Our 300+ outstation guests had digital passes, our caterers had exact plate numbers, and not a single spreadsheet was opened.&rdquo;
          </blockquote>

          <div className="space-y-1">
            <div className="font-serif font-bold text-base text-[#74182E]">
              Priya & Rahul Reddy
            </div>
            <div className="text-xs text-[#7D597E]">
              Taj Falaknuma Palace · 480 Guests Hosted
            </div>
          </div>
        </div>
      </section>

      {/* 9. FINAL CALL TO ACTION */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-[#FAF7F2] to-[#F3ECE1] relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
          <div className="space-y-3">
            <span className="text-xs uppercase font-bold tracking-widest text-[#C5A059] bg-[#74182E]/10 px-3.5 py-1 rounded-full border border-[#C5A059]/40">
              Ready to Upgrade?
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#2D1B28]">
              Run Your Occasion Like a System.
            </h2>
            <p className="text-sm sm:text-base text-[#654566] max-w-xl mx-auto leading-relaxed">
              Join hundreds of couples managing invitations, RSVPs, families, and catering operations with zero spreadsheets.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 pt-4">
            <MagneticButton strength={0.3}>
              <SpecularButton
                size="lg"
                radius={999}
                tint="#74182E"
                tintOpacity={1}
                textColor="#ffffff"
                lineColor="#E1CD98"
                baseColor="#8C2534"
                intensity={1.2}
                idleIntensity={0.35}
                shineSize={14}
                shineFade={36}
                thickness={1.5}
                glow={1.2}
                followMouse
                proximity={260}
                onClick={() => setOccasionModalOpen(true)}
                className="!px-10 !py-4.5 sm:!px-12 sm:!py-5 font-serif font-bold text-lg sm:text-xl shadow-soft-xl hover:shadow-2xl transition-all border border-[#8C2534] cursor-pointer"
              >
                <span>Create Your Occasion Free</span>
                <ArrowRight className="w-6 h-6 text-[#E1CD98]" />
              </SpecularButton>
            </MagneticButton>

            <Link
              href="/pricing"
              className="px-8 py-4.5 sm:px-10 sm:py-5 rounded-full bg-white text-[#2D1B28] text-lg sm:text-xl font-serif font-semibold border-2 border-[#E8DDCF] hover:bg-[#FAF7F2] hover:border-[#C5A059] transition-all transform hover:-translate-y-1 shadow-soft"
            >
              View Transparent Pricing
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* 2-MIN DEMO VIDEO MODAL */}
      {demoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-[#E8DDCF] shadow-2xl relative space-y-4">
            <button
              onClick={() => setDemoModalOpen(false)}
              className="absolute top-5 right-5 p-1 rounded-full text-stone-400 hover:text-stone-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#C5A059]">
                Product Walkthrough
              </span>
              <h3 className="text-2xl font-serif font-bold text-[#2D1B28]">
                WeddingOS in 2 Minutes
              </h3>
            </div>

            <div className="relative aspect-video rounded-2xl overflow-hidden bg-stone-900 border border-[#E8DDCF] flex items-center justify-center text-white">
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80"
                alt="Demo preview"
                className="absolute inset-0 w-full h-full object-cover opacity-60"
              />
              <div className="relative z-10 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white mx-auto hover:scale-110 transition-transform">
                  <Play className="w-7 h-7 fill-current ml-1" />
                </div>
                <p className="text-xs text-stone-200">
                  Interactive Video Player · 4K UHD Operations Tour
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-[#7D597E]">
              <span>Covers invitations, WhatsApp RSVP, catering AI & palace passes</span>
              <Link
                href="/signup"
                className="text-[#74182E] font-semibold hover:underline"
              >
                Get Started Free →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* CHOOSE OCCASION MODAL (Birthday, Wedding, Anniversary, etc.) */}
      <OccasionPickerModal
        isOpen={occasionModalOpen}
        onClose={() => setOccasionModalOpen(false)}
      />
    </div>
  );
}
