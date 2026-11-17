"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useWedding } from "@/context/WeddingContext";
import { WeddingEvent } from "@/lib/types";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Utensils,
  Plus,
  Edit2,
  CheckCircle2,
  Sparkles,
  QrCode,
  ExternalLink
} from "lucide-react";

export default function MultiEventPlanningPage() {
  const { events, wedding, updateEvent } = useWedding();
  const [selectedEvent, setSelectedEvent] = useState<WeddingEvent>(events[3]); // Default to Wedding ceremony

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E8DDCF]">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-[#74182E]">
            Multi-Ceremony Operations
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D1B28]">
            Events & Ceremonies
          </h1>
          <p className="text-xs text-[#7D597E]">
            Indian weddings are multi-event journeys. Track individual capacities, dietary splits, and check-ins for each function.
          </p>
        </div>

        <button
          onClick={() => alert("New Ceremony Creation Modal: Add Afterparty, Welcome Dinner, or Pooja")}
          className="px-4 py-2 rounded-xl bg-[#74182E] text-white text-xs font-semibold hover:bg-[#581223] transition-colors flex items-center gap-1.5 shadow-soft"
        >
          <Plus className="w-4 h-4 text-[#E1CD98]" /> Add Ceremony
        </button>
      </div>

      {/* 5 Event Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3.5">
        {events.map(evt => {
          const isSelected = selectedEvent.id === evt.id;
          const pct = Math.round((evt.confirmedCount / evt.capacity) * 100);
          return (
            <div
              key={evt.id}
              onClick={() => setSelectedEvent(evt)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                isSelected
                  ? "bg-white border-[#74182E] ring-2 ring-[#74182E] shadow-soft"
                  : "bg-white/80 border-[#E8DDCF] hover:bg-white hover:border-[#C5A059]"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#74182E] bg-[#74182E]/10 px-2 py-0.5 rounded-md">
                  {evt.name}
                </span>
                <span className="text-[10px] text-[#7D597E]">{evt.date.split(" ")[0]} {evt.date.split(" ")[1]}</span>
              </div>

              <div className="font-serif font-bold text-base text-[#2D1B28] mt-2 truncate">
                {evt.title}
              </div>
              <div className="text-xs text-[#7D597E] mt-0.5">{evt.time}</div>

              <div className="mt-3 pt-3 border-t border-[#FAF7F2] space-y-1.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-[#7D597E]">Confirmed:</span>
                  <span className="font-bold text-[#2D1B28]">{evt.confirmedCount} / {evt.capacity}</span>
                </div>
                <div className="w-full bg-[#FAF7F2] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#74182E] h-full" style={{ width: `${Math.min(100, pct)}%` }} />
                </div>
                <div className="text-[10px] text-right text-stone-500 font-medium">
                  {pct}% capacity
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Active Event Workspace */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DDCF] shadow-soft space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E8DDCF] gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold text-[#74182E] tracking-wider">Ceremony Details</span>
              <span className="text-stone-300">·</span>
              <span className="text-xs text-stone-500">{selectedEvent.name}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D1B28]">
              {selectedEvent.title}
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-xs text-[#7D597E] mt-1">
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {selectedEvent.date}</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {selectedEvent.time} – {selectedEvent.endTime || "Late"}</span>
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {selectedEvent.venue}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/app/check-in"
              className="px-4 py-2 rounded-xl bg-[#74182E] text-white text-xs font-semibold hover:bg-[#581223] transition-colors flex items-center gap-1.5 shadow-soft"
            >
              <QrCode className="w-3.5 h-3.5 text-[#E1CD98]" /> Event Check-In Desk
            </Link>
          </div>
        </div>

        {/* 3 Metric Cards for this ceremony */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DDCF]">
            <div className="text-xs text-[#7D597E]">Attendance Ratio</div>
            <div className="text-2xl font-serif font-bold text-[#2D1B28] mt-1">
              {selectedEvent.confirmedCount} <span className="text-sm font-sans font-normal text-stone-500">/ {selectedEvent.capacity}</span>
            </div>
            <p className="text-[11px] text-[#7D597E] mt-1">
              {Math.round((selectedEvent.confirmedCount / selectedEvent.capacity) * 100)}% capacity reached
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DDCF]">
            <div className="text-xs text-[#7D597E]">Dress Code & Aesthetic</div>
            <div className="text-sm font-bold text-[#74182E] mt-1">
              {selectedEvent.dressCode}
            </div>
            <p className="text-[11px] text-[#7D597E] mt-1">
              Included in personalized guest digital invitations
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DDCF]">
            <div className="text-xs text-[#7D597E]">Venue Address</div>
            <div className="text-xs font-semibold text-[#2D1B28] mt-1 truncate">
              {selectedEvent.locationAddress}
            </div>
            <a
              href="https://maps.google.com/?q=Taj+Falaknuma+Palace+Hyderabad"
              target="_blank"
              rel="noreferrer"
              className="text-[11px] text-[#74182E] hover:underline flex items-center gap-1 mt-1 font-medium"
            >
              Open in Google Maps <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>

        {/* Food & Dietary Requirements Split for Caterer */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-bold text-[#7D597E] tracking-wider flex items-center gap-1.5">
              <Utensils className="w-3.5 h-3.5 text-[#74182E]" /> Catering Requirements for {selectedEvent.name}
            </span>
            <span className="text-xs text-[#74182E] font-semibold">
              Total {selectedEvent.confirmedCount} Portions
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 bg-emerald-50/70 border border-emerald-200/80 rounded-xl text-center">
              <div className="text-[10px] uppercase font-bold text-emerald-800">Vegetarian</div>
              <div className="text-2xl font-serif font-bold text-emerald-950 mt-0.5">
                {selectedEvent.foodRequirements.vegetarian}
              </div>
              <div className="text-[10px] text-emerald-700">Meals ordered</div>
            </div>

            <div className="p-3.5 bg-rose-50/70 border border-rose-200/80 rounded-xl text-center">
              <div className="text-[10px] uppercase font-bold text-rose-800">Non-Vegetarian</div>
              <div className="text-2xl font-serif font-bold text-rose-950 mt-0.5">
                {selectedEvent.foodRequirements.nonVegetarian}
              </div>
              <div className="text-[10px] text-rose-700">Awadhi & Nizami</div>
            </div>

            <div className="p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-xl text-center">
              <div className="text-[10px] uppercase font-bold text-amber-800">Strict Jain</div>
              <div className="text-2xl font-serif font-bold text-amber-950 mt-0.5">
                {selectedEvent.foodRequirements.jain}
              </div>
              <div className="text-[10px] text-amber-700">Root-vegetable free</div>
            </div>

            <div className="p-3.5 bg-[#FAF7F2] border border-[#E8DDCF] rounded-xl text-center">
              <div className="text-[10px] uppercase font-bold text-[#7D597E]">Safety Buffer (+7%)</div>
              <div className="text-2xl font-serif font-bold text-[#74182E] mt-0.5">
                +{Math.round(selectedEvent.confirmedCount * 0.07)}
              </div>
              <div className="text-[10px] text-[#7D597E]">Caterer recommended</div>
            </div>
          </div>
        </div>

        {/* Event Description & Instructions */}
        <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E8DDCF] space-y-1 text-xs">
          <div className="font-bold text-[#2D1B28]">Operational Brief:</div>
          <p className="text-[#654566] leading-relaxed">
            {selectedEvent.description}
          </p>
        </div>
      </div>
    </div>
  );
}
