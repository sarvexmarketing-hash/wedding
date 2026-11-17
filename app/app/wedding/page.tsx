"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useWedding } from "@/context/WeddingContext";
import { Heart, MapPin, Calendar, Save, Check } from "lucide-react";

export default function WeddingProfilePage() {
  const { wedding, updateWeddingSettings } = useWedding();

  const [coupleNames, setCoupleNames] = useState(wedding.coupleNames);
  const [brideName, setBrideName] = useState(wedding.brideName);
  const [groomName, setGroomName] = useState(wedding.groomName);
  const [weddingDate, setWeddingDate] = useState(wedding.weddingDate);
  const [city, setCity] = useState(wedding.city);
  const [primaryVenue, setPrimaryVenue] = useState(wedding.primaryVenue);
  const [heroHeadline, setHeroHeadline] = useState(wedding.heroHeadline);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateWeddingSettings({
      coupleNames,
      brideName,
      groomName,
      weddingDate,
      city,
      primaryVenue,
      heroHeadline
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <div className="pb-2 border-b border-[#E8DDCF]">
        <span className="text-xs uppercase font-bold tracking-wider text-[#74182E]">
          Celebration Profile
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D1B28]">
          Wedding Details
        </h1>
        <p className="text-xs text-[#7D597E]">
          Core settings and metadata for {wedding.coupleNames}&apos;s wedding celebrations.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DDCF] shadow-soft space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-stone-600 font-semibold mb-1">Display Couple Title</label>
            <input
              type="text"
              value={coupleNames}
              onChange={e => setCoupleNames(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DDCF] text-sm focus:border-[#74182E] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-stone-600 font-semibold mb-1">Ceremony Date</label>
            <input
              type="text"
              value={weddingDate}
              onChange={e => setWeddingDate(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DDCF] text-sm focus:border-[#74182E] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-stone-600 font-semibold mb-1">Bride&apos;s Full Name</label>
            <input
              type="text"
              value={brideName}
              onChange={e => setBrideName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DDCF] text-sm focus:border-[#74182E] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-stone-600 font-semibold mb-1">Groom&apos;s Full Name</label>
            <input
              type="text"
              value={groomName}
              onChange={e => setGroomName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DDCF] text-sm focus:border-[#74182E] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-stone-600 font-semibold mb-1">Host City</label>
            <input
              type="text"
              value={city}
              onChange={e => setCity(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DDCF] text-sm focus:border-[#74182E] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-stone-600 font-semibold mb-1">Primary Palace / Venue</label>
            <input
              type="text"
              value={primaryVenue}
              onChange={e => setPrimaryVenue(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DDCF] text-sm focus:border-[#74182E] focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-stone-600 font-semibold mb-1">Hero Headline / Tagline</label>
            <input
              type="text"
              value={heroHeadline}
              onChange={e => setHeroHeadline(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DDCF] text-sm focus:border-[#74182E] focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-[#E8DDCF]">
          <span className="text-xs text-stone-500">
            {saved ? "✓ Wedding profile updated" : "All changes update invitations immediately"}
          </span>
          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-[#74182E] text-white text-xs font-bold hover:bg-[#581223] transition-colors flex items-center gap-1.5 shadow-soft"
          >
            <Save className="w-4 h-4 text-[#E1CD98]" /> Save Details
          </button>
        </div>
      </div>
    </div>
  );
}
