"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

const cardData = [
  {
    title: "Elegant Gold Suite",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Royal Indian Palace",
    image: "https://images.unsplash.com/photo-1781077127258-2f3f22cf5d5e?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Minimal Editorial Cream",
    image: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Floral Garden Pastel",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80",
  },
];

export function MarqueeCardsDemo() {
  const [stopScroll, setStopScroll] = useState(false);

  return (
    <>
      <style>{`
        .marquee-inner {
          animation: marqueeScroll linear infinite;
        }

        @keyframes marqueeScroll {
          0% {
            transform: translateX(0%);
          }

          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>

      <div
        className="overflow-hidden w-full relative max-w-6xl mx-auto py-12"
        onMouseEnter={() => setStopScroll(true)}
        onMouseLeave={() => setStopScroll(false)}
      >
        <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-[#FAF7F2] to-transparent" />

        <div
          className="marquee-inner flex w-fit"
          style={{
            animationPlayState: stopScroll ? "paused" : "running",
            animationDuration: cardData.length * 3500 + "ms",
          }}
        >
          <div className="flex">
            {[...cardData, ...cardData].map((card, index) => (
              <div
                key={index}
                className="w-64 mx-4 h-[22rem] rounded-2xl overflow-hidden relative group hover:scale-95 transition-all duration-300 shadow-soft-lg cursor-pointer"
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover"
                />
                <div className="flex items-center justify-center px-4 opacity-0 group-hover:opacity-100 transition-all duration-300 absolute bottom-0 backdrop-blur-md left-0 w-full h-full bg-black/40">
                  <p className="text-white text-xl font-serif font-bold text-center">
                    {card.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-[#FAF7F2] to-transparent" />
      </div>
    </>
  );
}

export default MarqueeCardsDemo;
