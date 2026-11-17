"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight, Sparkles, ExternalLink } from "lucide-react";

export interface MarqueeCardItem {
  title: string;
  subtitle?: string;
  badge?: string;
  image: string;
  linkUrl?: string;
}

interface MarqueeCardsProps {
  cards?: MarqueeCardItem[];
  className?: string;
  cardWidth?: string;
  cardHeight?: string;
}

const defaultMarqueeCards: MarqueeCardItem[] = [
  {
    title: "Elegant Gold",
    subtitle: "24-Carat Filigree & Royal Serif Typography",
    badge: "Luxury",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    linkUrl: "/invite/rahul-priya"
  },
  {
    title: "Royal Indian Palace",
    subtitle: "Deep Burgundy Arches & Auspicious Motifs",
    badge: "Royal",
    image: "https://images.unsplash.com/photo-1781077127258-2f3f22cf5d5e?auto=format&fit=crop&w=800&q=80",
    linkUrl: "/invite/rahul-priya"
  },
  {
    title: "Minimal Cream",
    subtitle: "Understated Editorial Whitespace & Hairline Borders",
    badge: "Minimal",
    image: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=800&q=80",
    linkUrl: "/invite/rahul-priya"
  },
  {
    title: "Floral Pastel",
    subtitle: "Botanical Watercolors & Soft Peach Accents",
    badge: "Floral",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80",
    linkUrl: "/invite/rahul-priya"
  },
  {
    title: "Dark Luxury Velvet",
    subtitle: "Midnight Plum & Glowing Champagne Gold",
    badge: "Dark",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
    linkUrl: "/invite/rahul-priya"
  },
  {
    title: "Modern Photo Editorial",
    subtitle: "High-Fashion Magazine Grid & Bold Typography",
    badge: "Photo",
    image: "https://images.unsplash.com/photo-1628335179471-987edb152881?auto=format&fit=crop&w=800&q=80",
    linkUrl: "/invite/rahul-priya"
  },
  {
    title: "Traditional Vedic Crimson",
    subtitle: "Sacred Sindoor Red & Temple Geometry",
    badge: "Vedic",
    image: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80",
    linkUrl: "/invite/rahul-priya"
  }
];

export function MarqueeCards({
  cards = defaultMarqueeCards,
  className,
  cardWidth = "w-64 sm:w-72",
  cardHeight = "h-[22rem] sm:h-[26rem]"
}: MarqueeCardsProps) {
  const [stopScroll, setStopScroll] = useState(false);

  return (
    <>
      <style>{`
        .marquee-inner-track {
          animation: marqueeContinuousScroll linear infinite;
        }

        @keyframes marqueeContinuousScroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>

      <div
        className={cn("overflow-hidden w-full relative max-w-7xl mx-auto py-6", className)}
        onMouseEnter={() => setStopScroll(true)}
        onMouseLeave={() => setStopScroll(false)}
      >
        {/* Soft Left and Right Edge Vignette Fades */}
        <div className="absolute left-0 top-0 h-full w-16 sm:w-28 z-20 pointer-events-none bg-gradient-to-r from-[#FAF7F2] to-transparent" />
        <div className="absolute right-0 top-0 h-full w-16 sm:w-28 z-20 pointer-events-none bg-gradient-to-l from-[#FAF7F2] to-transparent" />

        <div
          className="marquee-inner-track flex w-fit"
          style={{
            animationPlayState: stopScroll ? "paused" : "running",
            animationDuration: `${cards.length * 4.5}s`,
          }}
        >
          <div className="flex items-center">
            {[...cards, ...cards].map((card, index) => {
              const cardContent = (
                <div
                  className={cn(
                    "relative group mx-3 sm:mx-4 overflow-hidden rounded-3xl border border-[#E8DDCF] shadow-soft-lg bg-white transition-all duration-500 hover:border-[#C5A059] hover:shadow-soft-2xl hover:scale-[0.98] cursor-pointer",
                    cardWidth,
                    cardHeight
                  )}
                >
                  {/* Card Image */}
                  <img
                    src={card.image}
                    alt={card.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Gradient Base */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent z-10 pointer-events-none" />

                  {/* Top Badge */}
                  {card.badge && (
                    <div className="absolute top-4 left-4 z-20">
                      <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#C5A059] text-[#1A1017] shadow-sm">
                        {card.badge}
                      </span>
                    </div>
                  )}

                  {/* Bottom Text Reveal on Default and Hover Expand */}
                  <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 z-20 text-white space-y-1.5 transition-all duration-300">
                    <h3 className="font-serif font-bold text-lg sm:text-xl text-white drop-shadow-md leading-tight">
                      {card.title}
                    </h3>
                    {card.subtitle && (
                      <p className="text-xs text-white/80 line-clamp-2 leading-relaxed">
                        {card.subtitle}
                      </p>
                    )}
                    <div className="pt-2 flex items-center gap-1.5 text-xs text-[#E1CD98] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span>Preview Invitation</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              );

              return card.linkUrl ? (
                <Link key={index} href={card.linkUrl}>
                  {cardContent}
                </Link>
              ) : (
                <div key={index}>{cardContent}</div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default MarqueeCards;
