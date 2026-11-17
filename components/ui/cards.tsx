"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";

export interface BlogCardItem {
  image: string;
  title: string;
  category: string;
  linkUrl?: string;
}

const defaultBlogCards: BlogCardItem[] = [
  {
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    title: "Vedic Muhurat Planning & Royal Heritage Palace Etiquette",
    category: "Ceremony Guide"
  },
  {
    image: "https://images.unsplash.com/photo-1781077127258-2f3f22cf5d5e?auto=format&fit=crop&w=800&q=80",
    title: "Bridal Wardrobe Palettes: Coordinating Fabrics Across 5 Days",
    category: "Style & Decor"
  },
  {
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
    title: "Catering for 500+ Outstation Guests Without Food Wastage",
    category: "Palace Logistics"
  }
];

export function BlogCards({ cards = defaultBlogCards }: { cards?: BlogCardItem[] }) {
  return (
    <div className="flex flex-col items-center w-full py-12 px-4">
      {/* Header */}
      <h2 className="text-3xl font-serif font-bold text-[#2D1B28]">Latest Wedding Editorial</h2>
      <p className="text-sm text-[#654566] mt-2 max-w-lg text-center font-sans">
        Stay ahead of the curve with insights on multi-day ceremonies, palace venues, and digital guest hospitality.
      </p>

      {/* Cards Grid */}
      <div className="mt-10 flex flex-wrap justify-center gap-8 max-w-6xl w-full">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="max-w-72 w-full hover:-translate-y-1.5 transition duration-300 group cursor-pointer"
          >
            <div className="overflow-hidden rounded-2xl aspect-[4/3] bg-stone-100 border border-[#E8DDCF] shadow-soft">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src={card.image}
                alt={card.title}
                loading="lazy"
              />
            </div>
            <h3 className="text-base text-[#2D1B28] font-serif font-bold mt-3 leading-snug group-hover:text-[#74182E] transition-colors">
              {card.title}
            </h3>
            <p className="text-xs text-[#C5A059] font-medium mt-1 font-mono uppercase tracking-wider">
              {card.category}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogCards;
export const Example = BlogCards;
