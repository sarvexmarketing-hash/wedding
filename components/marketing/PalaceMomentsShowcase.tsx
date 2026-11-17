"use client";

import React from "react";
import { Sparkles, Heart } from "lucide-react";
import Link from "next/link";
import SocialCards, { CardItem } from "@/components/ui/card-fan-carousel";

const momentsCards: CardItem[] = [
  {
    imgUrl: "https://images.unsplash.com/photo-1781077127258-2f3f22cf5d5e?auto=format&fit=crop&w=1200&q=80",
    alt: "The Royal Muhurat & Pheras",
    title: "Rahul & Priya Reddy",
    subtitle: "The Royal Muhurat & Pheras · Taj Falaknuma Palace, Hyderabad",
    badge: "Sacred Union",
    linkUrl: "/signup"
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
    alt: "Grand Sangeet & Musical Gala",
    title: "Kabir & Ananya Varma",
    subtitle: "Grand Sangeet & Musical Gala · The Oberoi Udaivilas, Udaipur",
    badge: "Evening Gala",
    linkUrl: "/signup"
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    alt: "Mughal Floral Mandap & Vows",
    title: "Dev & Meera Singhania",
    subtitle: "Mughal Floral Mandap & Vows · Rambagh Palace, Jaipur",
    badge: "Royal Mandap",
    linkUrl: "/signup"
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1761488948640-61b9e273d671?auto=format&fit=crop&w=1200&q=80",
    alt: "Intimate Mehendi & Henna Garden",
    title: "Arjun & Tara Mehta",
    subtitle: "Intimate Mehendi & Henna Garden · Alila Diwa, Goa",
    badge: "Day Celebration",
    linkUrl: "/signup"
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1628335179471-987edb152881?auto=format&fit=crop&w=1200&q=80",
    alt: "Royal Groom & Baraat Procession",
    title: "Vikram & Pooja Rao",
    subtitle: "Royal Baraat Procession · ITC Grand Bharat, Gurugram",
    badge: "Jaimala Ceremony",
    linkUrl: "/signup"
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=1200&q=80",
    alt: "Golden Hour Courtyard Vows",
    title: "Rohan & Sanjana Kapur",
    subtitle: "Golden Hour Courtyard Vows · Villa Balbiano, Lake Como",
    badge: "Destination Vows",
    linkUrl: "/signup"
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80",
    alt: "Palace Floral Aisle & Vows",
    title: "Sameer & Neha Chawla",
    subtitle: "Floral Aisle & Reception · Umaid Bhawan Palace, Jodhpur",
    badge: "Palace Aisle",
    linkUrl: "/signup"
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80",
    alt: "Bridal Regalia & Jewels",
    title: "Aditya & Riya Kapoor",
    subtitle: "Vedic Muhurat & Regalia · The Leela Palace, Udaipur",
    badge: "Vedic Rituals",
    linkUrl: "/signup"
  }
];

export function PalaceMomentsShowcase() {
  return (
    <section className="py-24 md:py-36 bg-[#FAF7F2] border-t border-[#E8DDCF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#C5A059]/40 text-[#74182E] text-xs font-semibold tracking-widest uppercase shadow-soft-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Royal Gallery · Real Celebrations</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#2D1B28] tracking-tight">
            Moments Hosted on WeddingOS.
          </h2>
          <p className="text-sm sm:text-base text-[#654566] leading-relaxed">
            From imperial palace courtyards to intimate heritage estates, explore real celebrations orchestrated with surgical precision and royal hospitality.
          </p>
        </div>

        {/* 3D Fanned-Out Cards Carousel with GSAP Elastic Physics */}
        <div className="w-full relative py-4">
          <SocialCards cards={momentsCards} />
        </div>

        {/* Bottom Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#C5A059]/40 shadow-soft-xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold text-[#74182E] uppercase tracking-wider">
              <Heart className="w-4 h-4 fill-current text-[#74182E]" />
              <span>Over 12,480 Weddings Elevated</span>
            </div>
            <h4 className="text-lg sm:text-xl font-serif font-bold text-[#2D1B28]">
              Ready to host your wedding like a system?
            </h4>
            <p className="text-xs text-[#7D597E]">
              Create your workspace in 2 minutes and start inviting your family and guests.
            </p>
          </div>

          <Link
            href="/signup"
            className="px-8 py-3.5 rounded-full bg-[#74182E] text-white text-xs font-semibold hover:bg-[#581223] transition-colors shadow-soft flex items-center gap-2 shrink-0"
          >
            <span>Create Your Wedding Free</span>
            <span className="text-[#E1CD98]">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
