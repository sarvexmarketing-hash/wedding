"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, ArrowRight } from "lucide-react";

export interface OccasionOption {
  id: "wedding" | "birthday" | "anniversary" | "engagement" | "babyshower";
  title: string;
  emoji: string;
}

export const occasionOptions: OccasionOption[] = [
  {
    id: "wedding",
    title: "Wedding",
    emoji: "💍"
  },
  {
    id: "birthday",
    title: "Birthday",
    emoji: "🎂"
  },
  {
    id: "anniversary",
    title: "Anniversary",
    emoji: "🥂"
  },
  {
    id: "engagement",
    title: "Engagement & Roka",
    emoji: "✨"
  },
  {
    id: "babyshower",
    title: "Baby Shower",
    emoji: "🍼"
  }
];

interface OccasionPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OccasionPickerModal({ isOpen, onClose }: OccasionPickerModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] overflow-y-auto">
        {/* Full Viewport Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity"
        />

        {/* Modal Centering Wrapper */}
        <div className="flex min-h-screen items-center justify-center p-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-md bg-[#FAF7F2] rounded-3xl border-2 border-[#C5A059] shadow-2xl p-6 sm:p-7 text-left my-auto"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-white border border-[#E8DDCF] flex items-center justify-center text-stone-500 hover:text-stone-900 hover:border-stone-400 transition-all shadow-xs cursor-pointer z-20"
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
            </div>

            {/* Occasion Cards - Clean Headings & Icons Only */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4">
              {occasionOptions.map((opt, idx) => (
                <Link
                  key={opt.id}
                  href={`/signup?type=${opt.id}`}
                  onClick={onClose}
                  className={`p-3.5 rounded-2xl border border-[#E8DDCF] bg-white hover:border-[#74182E] hover:bg-[#FDF2F4]/50 hover:shadow-md transition-all flex items-center justify-between group cursor-pointer ${
                    idx === 4 ? "sm:col-span-2 sm:max-w-[200px] sm:mx-auto sm:w-full" : ""
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl group-hover:scale-110 transition-transform">
                      {opt.emoji}
                    </span>
                    <h3 className="text-sm font-serif font-bold text-[#2D1B28] group-hover:text-[#74182E] transition-colors">
                      {opt.title}
                    </h3>
                  </div>

                  <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#74182E] group-hover:translate-x-0.5 transition-all" />
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>,
    document.body
  );
}
