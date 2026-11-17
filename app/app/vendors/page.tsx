"use client";

import React from "react";
import { useWedding } from "@/context/WeddingContext";
import {
  Briefcase,
  Utensils,
  Camera,
  Flower2,
  Truck,
  Phone,
  Mail,
  CheckCircle2,
  Clock,
  Sparkles
} from "lucide-react";

export default function VendorsPage() {
  const { vendors, wedding } = useWedding();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E8DDCF]">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-[#74182E]">
            Vendor Operations & Catering
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D1B28]">
            Vendors & Operational Staff
          </h1>
          <p className="text-xs text-[#7D597E]">
            Direct live headcount data links for caterers, decor, cinema crews, and luxury transport.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
            {vendors.length} Confirmed Partners
          </span>
        </div>
      </div>

      {/* Caterer Summary Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#FAF7F2] via-white to-[#F3ECE1] border-2 border-[#C5A059] shadow-soft space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[#74182E] flex items-center gap-1.5">
            <Utensils className="w-4 h-4 text-[#74182E]" /> Caterer Live Handshake Sheet
          </span>
          <span className="text-xs font-mono font-bold text-stone-600">Royal Nizami Caterers</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center text-xs">
          <div className="p-3 bg-white rounded-xl border border-[#E8DDCF]">
            <div className="text-[10px] text-stone-400">Total Confirmed</div>
            <div className="text-xl font-bold text-[#2D1B28]">{wedding.confirmedCount}</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-[#E8DDCF]">
            <div className="text-[10px] text-emerald-800">Vegetarian</div>
            <div className="text-xl font-bold text-emerald-950">{wedding.cateringEstimate.vegetarian}</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-[#E8DDCF]">
            <div className="text-[10px] text-rose-800">Non-Veg</div>
            <div className="text-xl font-bold text-rose-950">{wedding.cateringEstimate.nonVegetarian}</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-[#E8DDCF]">
            <div className="text-[10px] text-amber-800">Strict Jain</div>
            <div className="text-xl font-bold text-amber-950">{wedding.cateringEstimate.jain}</div>
          </div>
          <div className="p-3 bg-[#74182E] text-white rounded-xl shadow-soft">
            <div className="text-[10px] text-stone-200">Cook Order (+7%)</div>
            <div className="text-xl font-bold text-[#E1CD98]">{wedding.cateringEstimate.recommendedMeals}</div>
          </div>
        </div>

        <p className="text-[11px] text-[#7D597E]">
          *Caterer receives automated delta alerts whenever RSVP dietary selections change.
        </p>
      </div>

      {/* Vendor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {vendors.map(v => (
          <div
            key={v.id}
            className="bg-white p-5 rounded-2xl border border-[#E8DDCF] shadow-soft space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#74182E] bg-[#74182E]/10 px-2 py-0.5 rounded">
                  {v.category}
                </span>
                <h3 className="font-serif font-bold text-base text-[#2D1B28] mt-1.5">{v.name}</h3>
                <div className="text-xs text-[#7D597E] mt-0.5">Contact: <strong>{v.contactPerson}</strong></div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 capitalize">
                {v.contractStatus}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8DDCF] text-xs space-y-1">
              <div className="font-bold text-stone-700">Deliverables:</div>
              <p className="text-[#654566] leading-relaxed">{v.deliverablesSummary}</p>
            </div>

            <div className="flex items-center justify-between text-xs pt-2 border-t border-[#FAF7F2]">
              <div className="flex items-center gap-3 text-[#7D597E]">
                <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {v.phone}</span>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-stone-500">Paid: </span>
                <strong className="text-emerald-700 font-mono">₹{(v.paidAmount / 100000).toFixed(1)}L</strong>
                <span className="text-stone-400"> / ₹{(v.totalAmount / 100000).toFixed(1)}L</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
