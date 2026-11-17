"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { AllFeaturesSection } from "@/components/marketing/AllFeaturesSection";
import { HorizontalTemplateGallery } from "@/components/ui/horizontal-template-gallery";
import { ParallaxScrollFeatureSection, ParallaxSectionItem } from "@/components/ui/parallax-scroll-feature-section";
import {
  Sparkles,
  ArrowRight,
  Mail,
  Music,
  Share2,
  Eye,
  CheckCircle2
} from "lucide-react";

const invitationParallaxItems: ParallaxSectionItem[] = [
  {
    id: 1,
    badge: "Cinematic Unfolding",
    title: "3D Wax Seal & Opening Animation",
    description:
      "When the guest opens their unique link, an embossed gold wax seal cracks with haptic elegance. Silky stationery flaps unfold into a royal card revealing Rahul & Priya's monogram and sacred Muhurat date.",
    imageUrl:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    reverse: false
  },
  {
    id: 2,
    badge: "Personalized Guest Tokens",
    title: "“Dear Arjun, Join Our Celebration”",
    description:
      "No generic invitation links. Every guest gets a cryptographically unique URL (/invite/rahul-priya/arjun-v) that displays their family party count, reserved ceremony access, and live RSVP state.",
    imageUrl:
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80",
    reverse: true
  },
  {
    id: 3,
    badge: "Palace Soundscape",
    title: "Synthesized Classical Sitar & Shehnai",
    description:
      "Subtle romantic acoustic melodies greet your guests as they interact. Includes gentle autoplay with audio toggle, setting a majestic regal tone worthy of Rajasthan's grandest palaces.",
    imageUrl:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
    reverse: false
  },
  {
    id: 4,
    badge: "Instant WhatsApp Dispatch",
    title: "One-Click Broadcast Delivery",
    description:
      "Send personalized invitations directly from your WeddingOS dashboard via WhatsApp. Guests tap the card preview and immediately land in their personalized invitation website with zero app downloads.",
    imageUrl:
      "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=1200&q=80",
    reverse: true
  }
];

export default function FeaturesInvitationsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#2D1B28]">
      <Navbar />

      <main className="flex-1 space-y-20 py-12 sm:py-20">
        {/* 1. HERO SPOTLIGHT */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#74182E]/10 border border-[#74182E]/20 text-[#74182E] text-xs font-semibold tracking-widest uppercase shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Module 01 · Digital Stationery & Motion</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-[#2D1B28] tracking-tight leading-[1.1]">
              Digital Luxury <br />
              <span className="text-[#74182E]">Wedding Invitations.</span>
            </h1>

            <p className="text-base sm:text-xl text-[#654566] max-w-2xl mx-auto font-sans leading-relaxed">
              Bespoke digital stationery inspired by royal Indian palaces. Features 3D animated wax seal envelopes, background Shehnai music, and personalized guest links.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#74182E] text-white text-sm font-semibold shadow-soft hover:bg-[#581223] transition-all transform hover:-translate-y-0.5"
              >
                <span>Build Your Royal Invitation</span>
                <ArrowRight className="w-4 h-4 text-[#E1CD98]" />
              </Link>

              <Link
                href="/invite/rahul-priya"
                target="_blank"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white text-[#2D1B28] text-sm font-semibold border border-[#E8DDCF] hover:bg-[#FAF7F2] shadow-soft-sm transition-all"
              >
                <Eye className="w-4 h-4 text-[#74182E]" />
                <span>View Live Sample</span>
              </Link>
            </div>
          </div>

          {/* Key Invitation Capability Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-14 max-w-6xl mx-auto">
            <div className="p-7 bg-white rounded-3xl border border-[#E8DDCF] shadow-soft space-y-3 hover:border-[#C5A059] transition-all duration-300">
              <div className="w-10 h-10 rounded-2xl bg-[#74182E]/10 border border-[#74182E]/20 flex items-center justify-center text-[#74182E]">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-xl text-[#2D1B28]">3D Wax Seal Opening</h3>
              <p className="text-xs text-[#7D597E] leading-relaxed">
                A cinematic opening sequence where guests tap to crack the embossed gold wax seal, unfold the royal envelope, and reveal the couple&apos;s story.
              </p>
            </div>

            <div className="p-7 bg-white rounded-3xl border border-[#E8DDCF] shadow-soft space-y-3 hover:border-[#C5A059] transition-all duration-300">
              <div className="w-10 h-10 rounded-2xl bg-[#C5A059]/15 border border-[#C5A059]/30 flex items-center justify-center text-[#74182E]">
                <Music className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-xl text-[#2D1B28]">Shehnai & Classical Music</h3>
              <p className="text-xs text-[#7D597E] leading-relaxed">
                Synthesized melodic Indian classical sitar, tanpura, and festive shehnai chords that begin playing harmoniously as guests interact.
              </p>
            </div>

            <div className="p-7 bg-white rounded-3xl border border-[#E8DDCF] shadow-soft space-y-3 hover:border-[#C5A059] transition-all duration-300">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                <Share2 className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-xl text-[#2D1B28]">Dynamic WhatsApp Links</h3>
              <p className="text-xs text-[#7D597E] leading-relaxed">
                Every guest receives their own unique link (<code className="text-[#74182E]">/invite/slug/guest-token</code>) greeting them by name with pre-filled RSVP details.
              </p>
            </div>
          </div>
        </section>

        {/* 2. PARALLAX SCROLL FEATURE WALKTHROUGH */}
        <section className="border-t border-[#E8DDCF]/80">
          <ParallaxScrollFeatureSection
            heading="Digital Invitation Experience"
            subheading="Scroll to explore interactive reveals"
            sections={invitationParallaxItems}
          />
        </section>

        {/* 3. HORIZONTAL TEMPLATES GALLERY (INTERACTIVE CARDS SHOWCASE) */}
        <section className="border-t border-b border-[#E8DDCF]/80 bg-white/50 py-12">
          <HorizontalTemplateGallery />
        </section>

        {/* 4. ALL 8 CORE MODULES COMPREHENSIVE SUITE */}
        <AllFeaturesSection />

        {/* 5. FINAL CTA BANNER */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-[#74182E] to-[#4D101E] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-soft-xl border border-[#C5A059]/40 text-center sm:text-left">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#E1CD98]">
                <Sparkles className="w-4 h-4 text-[#C5A059]" />
                <span>Instant Setup</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-serif font-bold">
                Start designing your wedding invitation in 5 minutes.
              </h3>
              <p className="text-xs sm:text-sm text-stone-200 max-w-lg">
                Choose from 5 royal themes, configure your 5 sacred ceremony timings, and generate personalized WhatsApp links for all your guests.
              </p>
            </div>

            <Link
              href="/signup"
              className="px-8 py-4 rounded-full bg-[#FAF7F2] text-[#74182E] font-serif font-bold text-sm hover:bg-white transition-all shadow-soft flex-none"
            >
              Create Your Free Wedding →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
