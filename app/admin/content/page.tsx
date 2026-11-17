"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  Sliders,
  Sparkles,
  CheckCircle2,
  Globe,
  Video,
  Shirt,
  Gift,
  QrCode,
  Zap,
  Star,
  Plus,
  Trash2,
  Eye,
  ExternalLink
} from "lucide-react";

export default function AdminContentPage() {
  const [featureFlags, setFeatureFlags] = useState([
    {
      id: "feat-ai-video",
      name: "AI Wedding Invitation Video Generator",
      description: "Allows couples to generate 4K cinematic AI invitation videos with custom styles & music.",
      enabled: true,
      icon: Video
    },
    {
      id: "feat-attire",
      name: "Smart Attire Guide ('What Should I Wear?')",
      description: "Displays dress codes, color swatches, and styling advice for Haldi, Mehendi, Sangeet, etc.",
      enabled: true,
      icon: Shirt
    },
    {
      id: "feat-multilang",
      name: "Multi-Language 8 Indian Languages Support",
      description: "English, Hindi, Telugu, Gujarati, Marathi, Punjabi, Bengali, and Tamil translations.",
      enabled: true,
      icon: Globe
    },
    {
      id: "feat-gifts",
      name: "Private Wedding Gift & Shagun Tracking",
      description: "Confidential vault for couples to record envelopes, jewelry, gifts, and values.",
      enabled: true,
      icon: Gift
    },
    {
      id: "feat-qr-checkin",
      name: "Day-of QR Check-In & Wedding Passes",
      description: "Generates digital passes with table numbers and valet parking for instant palace entry.",
      enabled: true,
      icon: QrCode
    },
    {
      id: "feat-ai-attendance",
      name: "AI Attendance & Catering Plate Prediction",
      description: "Portion estimation model that calculates outstation attrition and prevents catering waste.",
      enabled: true,
      icon: Zap
    }
  ]);

  const [heroHeadline, setHeroHeadline] = useState("Run Your Wedding Like a System, Not a Spreadsheet.");
  const [heroSubheadline, setHeroSubheadline] = useState("Invitations, RSVPs, guest management, food planning, logistics, and live wedding operations — all in one place.");
  const [heroSaved, setHeroSaved] = useState(false);

  const toggleFeature = (id: string) => {
    setFeatureFlags(prev =>
      prev.map(f => (f.id === id ? { ...f, enabled: !f.enabled } : f))
    );
  };

  const handleSaveHero = (e: React.FormEvent) => {
    e.preventDefault();
    setHeroSaved(true);
    setTimeout(() => setHeroSaved(false), 2500);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#2D1B28]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#C5A059] bg-[#2A1B28] px-2.5 py-0.5 rounded-full border border-[#3A2234]">
              Website CMS & Feature Toggles
            </span>
            <span className="text-xs text-stone-500">·</span>
            <span className="text-xs text-stone-400">Headless Content Architecture</span>
          </div>
          <h1 className="text-2xl font-serif font-bold text-white mt-1">
            Website Content & Feature Flags
          </h1>
          <p className="text-xs text-stone-400">
            Toggle smart wedding capabilities platform-wide and customize public marketing copy.
          </p>
        </div>
      </div>

      {/* PLATFORM FEATURE FLAGS CONTROLLER */}
      <div className="p-6 rounded-2xl bg-[#160E15] border border-[#2D1B28] space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#2D1B28]">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#C5A059]" />
            <h3 className="text-sm font-serif font-bold text-white">Smart Wedding Feature Flags</h3>
          </div>
          <span className="text-[10px] text-emerald-400 font-medium">All 6 Modules Active</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          {featureFlags.map(feat => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.id}
                className="p-4 rounded-xl bg-[#211520] border border-[#2D1B28] flex items-start justify-between gap-3 text-xs"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#2A1B28] text-[#E1CD98] flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <div className="font-semibold text-white text-sm">{feat.name}</div>
                    <p className="text-[11px] text-stone-400 leading-relaxed">{feat.description}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleFeature(feat.id)}
                  className={`w-11 h-6 rounded-full transition-colors relative shrink-0 p-0.5 ${
                    feat.enabled ? "bg-[#74182E]" : "bg-stone-700"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      feat.enabled ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* HOMEPAGE HERO MESSAGING CONTROLS */}
      <div className="p-6 rounded-2xl bg-[#160E15] border border-[#2D1B28] space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#2D1B28]">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#C5A059]" />
            <h3 className="text-sm font-serif font-bold text-white">Homepage Hero Brand Copy</h3>
          </div>
          <Link
            href="/"
            target="_blank"
            className="text-xs text-[#E1CD98] hover:underline flex items-center gap-1"
          >
            Preview Live Homepage <ExternalLink className="w-3 h-3" />
          </Link>
        </div>

        <form onSubmit={handleSaveHero} className="space-y-4 text-xs">
          <div>
            <label className="block text-stone-400 mb-1 font-medium">Primary Hero Headline</label>
            <input
              type="text"
              value={heroHeadline}
              onChange={e => setHeroHeadline(e.target.value)}
              className="w-full p-3 rounded-xl bg-[#211520] border border-[#3A2234] text-white font-serif font-bold text-base focus:outline-none focus:border-[#74182E]"
            />
          </div>

          <div>
            <label className="block text-stone-400 mb-1 font-medium">Supporting Subheading</label>
            <textarea
              rows={2}
              value={heroSubheadline}
              onChange={e => setHeroSubheadline(e.target.value)}
              className="w-full p-3 rounded-xl bg-[#211520] border border-[#3A2234] text-white focus:outline-none focus:border-[#74182E]"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            {heroSaved ? (
              <span className="text-xs text-emerald-400 flex items-center gap-1 font-medium">
                <CheckCircle2 className="w-4 h-4" /> Homepage hero copy saved & cached on Edge CDN!
              </span>
            ) : <span />}

            <button
              type="submit"
              className="px-6 py-2 rounded-full bg-[#74182E] hover:bg-[#581223] text-white font-semibold transition-colors shadow-soft"
            >
              Publish Hero Copy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
