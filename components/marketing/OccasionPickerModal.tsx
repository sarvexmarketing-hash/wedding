"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, ArrowRight, Heart, Cake, Wine, Diamond, Baby } from "lucide-react";

export interface OccasionOption {
  id: "wedding" | "birthday" | "anniversary" | "engagement" | "babyshower";
  title: string;
  emoji: string;
  tagline: string;
  description: string;
  badge: string;
  popular?: boolean;
}

export const occasionOptions: OccasionOption[] = [
  {
    id: "wedding",
    title: "Wedding",
    emoji: "💍",
    tagline: "The Royal Union",
    description: "Multi-day itineraries, family RSVP grouping, catering counts & palace check-in.",
    badge: "Most Popular",
    popular: true
  },
  {
    id: "birthday",
    title: "Birthday",
    emoji: "🎂",
    tagline: "Milestone & Grand Bashes",
    description: "Cake cutting, party themes, games, DJ night, guest confirmations & dietary preferences.",
    badge: "Trending"
  },
  {
    id: "anniversary",
    title: "Anniversary",
    emoji: "🥂",
    tagline: "Silver & Golden Milestones",
    description: "Vow renewals, family photo retrospectives, champagne toasts & royal gala dinner.",
    badge: "Milestone"
  },
  {
    id: "engagement",
    title: "Engagement & Roka",
    emoji: "✨",
    tagline: "Ring Ceremony Celebrations",
    description: "Intimate family blessings, ring exchange, cocktail party & digital invitations.",
    badge: "Celebration"
  },
  {
    id: "babyshower",
    title: "Baby Shower",
    emoji: "🍼",
    tagline: "Godh Bharai & Sreemantham",
    description: "Traditional blessings, maternal rituals, baby trivia games & family feasts.",
    badge: "Family Ritual"
  }
];

interface OccasionPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OccasionPickerModal({ isOpen, onClose }: OccasionPickerModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-3xl border-2 border-[#C5A059] shadow-2xl overflow-hidden p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white border border-[#E8DDCF] flex items-center justify-center text-stone-500 hover:text-stone-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Modal Header */}
          <div className="text-center space-y-2 pb-5 border-b border-[#E8DDCF]">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#74182E]/10 border border-[#74182E]/20 text-[#74182E] text-[11px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-[#C5A059]" />
              <span>Choose Your Occasion</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D1B28]">
              What are we celebrating?
            </h2>
            <p className="text-xs text-[#7D597E] max-w-md mx-auto">
              Select your occasion type below. We&apos;ll automatically customize your invitations, RSVP system, itineraries, and guest operations.
            </p>
          </div>

          {/* Occasion Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-5">
            {occasionOptions.map((opt) => (
              <Link
                key={opt.id}
                href={`/signup?type=${opt.id}`}
                onClick={onClose}
                className={`p-4 rounded-2xl border transition-all text-left flex flex-col justify-between group hover:-translate-y-0.5 hover:shadow-md ${
                  opt.popular
                    ? "bg-white border-[#74182E] ring-1 ring-[#74182E]/20"
                    : "bg-white/80 border-[#E8DDCF] hover:bg-white hover:border-[#C5A059]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{opt.emoji}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#FAF7F2] text-[#74182E] border border-[#E8DDCF]">
                      {opt.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-serif font-bold text-[#2D1B28] group-hover:text-[#74182E] transition-colors">
                    {opt.title}
                  </h3>
                  <p className="text-[11px] font-medium text-[#C5A059] mt-0.5">
                    {opt.tagline}
                  </p>
                  <p className="text-[11px] text-stone-500 font-light mt-1.5 leading-snug">
                    {opt.description}
                  </p>
                </div>

                <div className="pt-3 mt-2 border-t border-[#FAF7F2] flex items-center justify-between text-xs font-semibold text-[#74182E] group-hover:underline">
                  <span>Start {opt.title} Setup</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>

          {/* Quick Note */}
          <div className="mt-5 pt-3 border-t border-[#E8DDCF] text-center text-[11px] text-stone-400">
            You can also switch or customize your occasion type at any time inside the setup workspace.
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
