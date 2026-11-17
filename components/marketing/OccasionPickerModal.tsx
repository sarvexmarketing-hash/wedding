"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, ArrowRight } from "lucide-react";

export interface OccasionOption {
  id: "wedding" | "birthday" | "anniversary" | "engagement" | "babyshower";
  title: string;
  emoji: string;
  tagline: string;
  badge: string;
  popular?: boolean;
}

export const occasionOptions: OccasionOption[] = [
  {
    id: "wedding",
    title: "Wedding",
    emoji: "💍",
    tagline: "Multi-day ceremonies, family RSVPs & palace operations",
    badge: "Most Popular",
    popular: true
  },
  {
    id: "birthday",
    title: "Birthday",
    emoji: "🎂",
    tagline: "Cake cutting, party themes, DJ night & guest list",
    badge: "Milestone Bash"
  },
  {
    id: "anniversary",
    title: "Anniversary",
    emoji: "🥂",
    tagline: "Silver & Golden Jubilees, vow renewals & royal gala",
    badge: "Silver / Golden"
  },
  {
    id: "engagement",
    title: "Engagement & Roka",
    emoji: "✨",
    tagline: "Intimate family blessings, ring exchange & cocktails",
    badge: "Ring Ceremony"
  },
  {
    id: "babyshower",
    title: "Baby Shower",
    emoji: "🍼",
    tagline: "Godh Bharai, Sreemantham rituals & celebration feast",
    badge: "Family Blessing"
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
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/65 backdrop-blur-sm transition-opacity"
        />

        {/* Modal Centering Wrapper */}
        <div className="flex min-h-full items-center justify-center p-3 sm:p-5 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="relative w-full max-w-xl bg-[#FAF7F2] rounded-3xl border-2 border-[#C5A059] shadow-2xl p-5 sm:p-7 z-10 text-left my-auto"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-white border border-[#E8DDCF] flex items-center justify-center text-stone-500 hover:text-stone-900 hover:border-stone-400 transition-all shadow-xs z-20 cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="text-center space-y-1.5 pb-4 border-b border-[#E8DDCF]/80">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#74182E]/10 border border-[#74182E]/20 text-[#74182E] text-[10px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-[#C5A059]" />
                <span>Choose Your Occasion</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D1B28]">
                What are we celebrating?
              </h2>
              <p className="text-xs text-[#7D597E] max-w-sm mx-auto font-light leading-relaxed">
                Select your occasion to customize invitations, RSVP system, and guest operations.
              </p>
            </div>

            {/* Occasion Cards List */}
            <div className="space-y-2.5 pt-4">
              {occasionOptions.map((opt) => (
                <Link
                  key={opt.id}
                  href={`/signup?type=${opt.id}`}
                  onClick={onClose}
                  className={`p-3 sm:p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 group hover:shadow-md hover:-translate-y-0.5 ${
                    opt.popular
                      ? "bg-white border-[#74182E] ring-1 ring-[#74182E]/20 shadow-xs"
                      : "bg-white/90 border-[#E8DDCF] hover:bg-white hover:border-[#C5A059]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#E8DDCF] flex items-center justify-center text-xl flex-none shadow-xs group-hover:scale-105 transition-transform">
                      {opt.emoji}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-serif font-bold text-[#2D1B28] group-hover:text-[#74182E] transition-colors">
                          {opt.title}
                        </h3>
                        <span className="text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#FAF7F2] text-[#74182E] border border-[#E8DDCF]">
                          {opt.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-500 font-light mt-0.5 line-clamp-1">
                        {opt.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-[#FAF7F2] group-hover:bg-[#74182E] group-hover:text-white text-stone-400 flex items-center justify-center flex-none transition-colors border border-[#E8DDCF]/80">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>

            {/* Modal Footer Note */}
            <div className="mt-4 pt-3 border-t border-[#E8DDCF]/80 flex items-center justify-between text-[11px] text-stone-400">
              <span>Setup takes ~2 minutes</span>
              <span className="text-[#74182E] font-medium">Free guest invitations included</span>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
