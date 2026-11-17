"use client";

import React from "react";
import { Sparkles, MapPin } from "lucide-react";
import { ParallaxPills } from "@/components/ui/parallax-pills";

export function DestinationCloud() {
  const destinations = [
    { city: "Udaipur", state: "Rajasthan", depth: 1.3 },
    { city: "Hyderabad", state: "Telangana", depth: 0.8 },
    { city: "Jaipur", state: "Rajasthan", depth: 1.5 },
    { city: "Lake Como", state: "Italy", depth: 0.9 },
    { city: "Dubai", state: "UAE", depth: 1.4 },
    { city: "Goa", state: "India", depth: 0.7 },
    { city: "Bali", state: "Indonesia", depth: 1.2 },
    { city: "London", state: "United Kingdom", depth: 1.0 }
  ];

  const pillItems = destinations.map((dest, idx) => ({
    id: idx,
    label: dest.city,
    subtitle: dest.state,
    depth: dest.depth,
  }));

  return (
    <div className="py-12 bg-[#FAF7F2] border-b border-[#E8DDCF]/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
        <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C5A059] font-bold">
          Global Destination Architecture
        </div>

        {/* Bouncy Labeled Pills that drift with cursor */}
        <ParallaxPills
          items={pillItems}
          maxOffset={32}
          damping={0.09}
        />
      </div>
    </div>
  );
}
