'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import FlowArt, { FlowSection } from '@/components/ui/story-scroll';
import {
  Mail,
  Users,
  Utensils,
  QrCode,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Compass,
  ShieldCheck,
  Smartphone,
  Heart
} from 'lucide-react';

export default function FeaturesStoryScrollSection() {
  return (
    <FlowArt aria-label="WeddingOS Core Features Story Scroll">
      {/* 01: Digital Stationery & Wax Seal Invitations */}
      <FlowSection
        aria-label="Digital Luxury Stationery"
        style={{ backgroundColor: '#74182E', color: '#FFF8F0' }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-[#C5A059]" />
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#C5A059]">
              Feature 01 — Digital Stationery
            </p>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/10 text-white/90">
            3D Wax Seal Engine
          </span>
        </div>

        <hr className="my-[1.5vw] border-none border-t border-[#C5A059]/40 opacity-100" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <h2 className="text-[clamp(2.75rem,8vw,9rem)] font-serif font-bold leading-[0.88] uppercase tracking-tight text-white">
              Invitations,
              <br />
              <span className="italic font-serif text-[#C5A059]">Reimagined</span>
              <br />
              In Motion.
            </h2>
          </div>

          <div className="lg:col-span-4 relative rounded-2xl overflow-hidden aspect-[4/3] border border-[#C5A059]/30 shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80"
              alt="Luxury Royal Wedding Invitation Ceremony"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 35vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
              <span className="text-xs font-mono text-[#C5A059]">Palace Wax Seal • 5 Themes</span>
            </div>
          </div>
        </div>

        <hr className="my-[1.5vw] border-none border-t border-white/20 opacity-100" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#C5A059]">
              <Sparkles className="w-4 h-4" />
              <span>3D Opening Animation</span>
            </div>
            <p className="text-sm text-white/80 leading-relaxed font-light">
              Guests break an authentic 3D wax seal and watch their personal calligraphy unfold with classical Shehnai music.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#C5A059]">
              <Smartphone className="w-4 h-4" />
              <span>Dynamic WhatsApp Link</span>
            </div>
            <p className="text-sm text-white/80 leading-relaxed font-light">
              Every guest receives a cryptographically signed personal token with their party name and dietary profile pre-loaded.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#C5A059]">
              <CheckCircle2 className="w-4 h-4" />
              <span>Zero App Download</span>
            </div>
            <p className="text-sm text-white/80 leading-relaxed font-light">
              100% web-native responsive experience on iOS, Android, and Desktop with instant RSVP confirmation.
            </p>
          </div>
        </div>

        <div className="mt-auto pt-4 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-white/60 font-mono tracking-widest uppercase">
            Module: /features/invitations
          </p>
          <Link
            href="/features/invitations"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#C5A059] text-[#1A1017] font-semibold text-xs tracking-wider uppercase hover:bg-white transition-colors"
          >
            <span>Explore Invitation Engine</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </FlowSection>

      {/* 02: Unified Guest CRM & Family Clusters */}
      <FlowSection
        aria-label="Unified Guest CRM"
        style={{ backgroundColor: '#1A1017', color: '#FFF8F0' }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#C5A059]" />
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#C5A059]">
              Feature 02 — Guest Relationship CRM
            </p>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/10 text-white/90">
            Family Clustering
          </span>
        </div>

        <hr className="my-[1.5vw] border-none border-t border-white/20" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <h2 className="text-[clamp(2.75rem,8vw,9rem)] font-serif font-bold leading-[0.88] uppercase tracking-tight text-white">
              Every Family.
              <br />
              <span className="italic font-serif text-[#C5A059]">Mapped With</span>
              <br />
              Precision.
            </h2>
          </div>

          <div className="lg:col-span-4 relative rounded-2xl overflow-hidden aspect-[4/3] border border-white/20 shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80"
              alt="Indian Wedding Guests Gathering"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 35vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
              <span className="text-xs font-mono text-[#C5A059]">Bride & Groom Clusters • VIP Protocols</span>
            </div>
          </div>
        </div>

        <hr className="my-[1.5vw] border-none border-t border-white/20" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-xs font-mono text-[#C5A059] uppercase tracking-wider mb-1">01 • Side Assignment</p>
            <p className="text-xs text-white/80 leading-relaxed">
              Distinguish Ladkiwale vs Ladkewale, elders, college circles, and VIP delegates in real-time.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-xs font-mono text-[#C5A059] uppercase tracking-wider mb-1">02 • Plus-One Controls</p>
            <p className="text-xs text-white/80 leading-relaxed">
              Strict party size controls prevent surprise headcounts while accommodating verified spouses and children.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-xs font-mono text-[#C5A059] uppercase tracking-wider mb-1">03 • WhatsApp Broadcasts</p>
            <p className="text-xs text-white/80 leading-relaxed">
              Dispatch schedule updates and dress-code reminders to targeted family clusters with 1 tap.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-xs font-mono text-[#C5A059] uppercase tracking-wider mb-1">04 • Decorators, Caters & Planners</p>
            <p className="text-xs text-white/80 leading-relaxed">
              Coordinate bespoke theme decorators, banquet caters, and luxury wedding planners.
            </p>
          </div>
        </div>

        <div className="mt-auto pt-4 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-white/60 font-mono tracking-widest uppercase">
            Module: /features/guest-management
          </p>
          <Link
            href="/features/guest-management"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#74182E] text-white font-semibold text-xs tracking-wider uppercase hover:bg-[#92203B] transition-colors"
          >
            <span>Explore Guest CRM</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </FlowSection>

      {/* 03: Catering AI & Dietary Intelligence */}
      <FlowSection
        aria-label="Catering Intelligence"
        style={{ backgroundColor: '#F5EFE6', color: '#2D1B28' }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Utensils className="w-4 h-4 text-[#74182E]" />
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#74182E]">
              Feature 03 — Catering Intelligence
            </p>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#74182E]/10 text-[#74182E] font-semibold">
            Zero Food Waste
          </span>
        </div>

        <hr className="my-[1.5vw] border-none border-t border-[#74182E]/20" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <h2 className="text-[clamp(2.75rem,8vw,9rem)] font-serif font-bold leading-[0.88] uppercase tracking-tight text-[#2D1B28]">
              Flawless
              <br />
              <span className="italic font-serif text-[#74182E]">Royal Feasts,</span>
              <br />
              Down to Grams.
            </h2>
          </div>

          <div className="lg:col-span-4 relative rounded-2xl overflow-hidden aspect-[4/3] border border-[#74182E]/20 shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80"
              alt="Luxury Wedding Royal Banquet Feast"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 35vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2D1B28]/90 via-transparent to-transparent flex items-end p-4">
              <span className="text-xs font-mono text-[#C5A059]">Jain • Halal • Vegan • Kids Covers</span>
            </div>
          </div>
        </div>

        <hr className="my-[1.5vw] border-none border-t border-[#74182E]/20" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-white border border-[#E8DDCF] shadow-sm">
            <p className="text-xs font-mono text-[#74182E] uppercase font-bold tracking-wider mb-2">Live Headcount Sync</p>
            <p className="text-xs text-[#2D1B28]/80 leading-relaxed">
              Auto-generate kitchen production sheets breakdown per event: Sangeet Dinner, Haldi Brunch, and Reception Gala.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-[#E8DDCF] shadow-sm">
            <p className="text-xs font-mono text-[#74182E] uppercase font-bold tracking-wider mb-2">Strict Dietary Flags</p>
            <p className="text-xs text-[#2D1B28]/80 leading-relaxed">
              Track pure Jain (no root vegetables), celiac/gluten-free, severe nut allergies, and vegan requests with zero guesswork.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-[#E8DDCF] shadow-sm">
            <p className="text-xs font-mono text-[#74182E] uppercase font-bold tracking-wider mb-2">AI Attrition Modeling</p>
            <p className="text-xs text-[#2D1B28]/80 leading-relaxed">
              Algorithms adjust plate counts for outstation dropouts, saving an average of 18% on high-cost per-plate banquet contracts.
            </p>
          </div>
        </div>

        <div className="mt-auto pt-4 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-[#2D1B28]/60 font-mono tracking-widest uppercase">
            Module: /features/catering
          </p>
          <Link
            href="/features/catering"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#74182E] text-white font-semibold text-xs tracking-wider uppercase hover:bg-[#5A1223] transition-colors"
          >
            <span>Explore Catering Engine</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </FlowSection>

      {/* 04: Day-Of Palace Check-In & QR Passes */}
      <FlowSection
        aria-label="Palace Gate Check-In"
        style={{ backgroundColor: '#132A24', color: '#FFF8F0' }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <QrCode className="w-4 h-4 text-[#C5A059]" />
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#C5A059]">
              Feature 04 — Day-Of Palace Check-In
            </p>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/10 text-white/90">
            QR Pass Verification
          </span>
        </div>

        <hr className="my-[1.5vw] border-none border-t border-[#C5A059]/30" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <h2 className="text-[clamp(2.75rem,8vw,9rem)] font-serif font-bold leading-[0.88] uppercase tracking-tight text-white">
              Hospitality
              <br />
              <span className="italic font-serif text-[#C5A059]">Without</span>
              <br />
              The Queue.
            </h2>
          </div>

          <div className="lg:col-span-4 relative rounded-2xl overflow-hidden aspect-[4/3] border border-[#C5A059]/30 shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80"
              alt="Palace Resort Entrance Gate"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 35vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
              <span className="text-xs font-mono text-[#C5A059]">3-Second Scan • Welcome Kits Delivered</span>
            </div>
          </div>
        </div>

        <hr className="my-[1.5vw] border-none border-t border-white/20" />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-xs font-mono text-[#C5A059] uppercase tracking-wider mb-1">WhatsApp Digital Passes</p>
            <p className="text-xs text-white/80 leading-relaxed">
              Guests show their Apple/Google Wallet pass or WhatsApp QR for instantaneous scanning at the palace gates.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-xs font-mono text-[#C5A059] uppercase tracking-wider mb-1">VIP Arrival Alerts</p>
            <p className="text-xs text-white/80 leading-relaxed">
              Family hosts receive instant notifications when key elders or special guests arrive at the venue.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-xs font-mono text-[#C5A059] uppercase tracking-wider mb-1">Offline Scanner Mode</p>
            <p className="text-xs text-white/80 leading-relaxed">
              Works seamlessly even in remote heritage fortresses or courtyard zones with limited cellular reception.
            </p>
          </div>
        </div>

        <div className="mt-auto pt-4 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-white/60 font-mono tracking-widest uppercase">
            Module: /features/check-in
          </p>
          <Link
            href="/features/check-in"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#C5A059] text-[#132A24] font-semibold text-xs tracking-wider uppercase hover:bg-white transition-colors"
          >
            <span>Explore Check-In Engine</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </FlowSection>

      {/* 05: The WeddingOS Operating System Call to Action */}
      <FlowSection
        aria-label="Begin Your Celebration"
        style={{ backgroundColor: '#2D1B28', color: '#FFF8F0' }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-[#C5A059]" />
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#C5A059]">
              The Wedding Operating System
            </p>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/10 text-white/90">
            Start Free
          </span>
        </div>

        <hr className="my-[1.5vw] border-none border-t border-[#C5A059]/30" />

        <div className="max-w-4xl">
          <h2 className="text-[clamp(2.75rem,8vw,9rem)] font-serif font-bold leading-[0.88] uppercase tracking-tight text-white">
            Ready To
            <br />
            <span className="italic font-serif text-[#C5A059]">Orchestrate?</span>
          </h2>
        </div>

        <hr className="my-[1.5vw] border-none border-t border-white/20" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <p className="text-base md:text-xl text-white/80 font-light leading-relaxed">
            Eliminate 20 disconnected spreadsheets and WhatsApp chaos. Give your family and guests an unforgettable, royal hospitality experience from day one.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/signup"
              className="px-8 py-4 rounded-full bg-[#74182E] text-white font-bold text-sm tracking-wide uppercase text-center shadow-2xl hover:bg-[#92203B] transition-all transform hover:-translate-y-0.5 border border-[#C5A059]/40"
            >
              Create Your Wedding Free
            </Link>
            <Link
              href="/invite/rahul-priya"
              className="px-8 py-4 rounded-full bg-white/10 text-white border border-white/20 font-bold text-sm tracking-wide uppercase text-center hover:bg-white/20 transition-colors"
            >
              View Sample Invitation
            </Link>
          </div>
        </div>

        <div className="mt-auto pt-6 flex items-center justify-between text-xs text-white/40 font-mono">
          <span>WeddingOS • High-Order Celebration Architecture</span>
          <span>Scroll to rewind • Pin & Unroll GSAP Interaction</span>
        </div>
      </FlowSection>
    </FlowArt>
  );
}
