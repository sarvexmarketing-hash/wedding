"use client";

import React, { use } from "react";
import Link from "next/link";
import { useWedding } from "@/context/WeddingContext";
import { QrCode, CheckCircle2, MapPin, Calendar, Clock, Car, Utensils, ArrowLeft, Download, ShieldCheck } from "lucide-react";

export default function GuestPassPage({ params }: { params: Promise<{ guestId: string }> }) {
  const resolvedParams = use(params);
  const { guests, toggleCheckIn, wedding } = useWedding();

  const guest = guests.find(g => g.id === resolvedParams.guestId) || guests[0];

  return (
    <div className="min-h-screen bg-[#1A1017] text-white flex flex-col justify-center items-center p-4 selection:bg-[#C5A059] selection:text-black">
      <div className="w-full max-w-md space-y-4">
        {/* Navigation back */}
        <div className="flex items-center justify-between text-xs text-[#EAE2D5]/70">
          <Link href="/invite/rahul-priya" className="flex items-center gap-1.5 hover:text-white">
            <ArrowLeft className="w-4 h-4" /> Back to Invitation
          </Link>
          <span className="flex items-center gap-1 text-[#E1CD98]">
            <ShieldCheck className="w-3.5 h-3.5" /> Verified Wedding Pass
          </span>
        </div>

        {/* The Digital Wedding Pass Card */}
        <div className="bg-[#FAF7F2] text-[#2D1B28] rounded-[32px] p-6 sm:p-8 border-2 border-[#C5A059] shadow-2xl relative overflow-hidden">
          {/* Top notch detail */}
          <div className="flex items-center justify-between pb-4 border-b border-[#E8DDCF]">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#74182E]">Official Wedding Pass</span>
              <h2 className="text-xl font-serif font-bold text-[#2D1B28]">{wedding.coupleNames}</h2>
              <div className="text-xs text-[#7D597E]">21 Nov 2026 · Taj Falaknuma, Hyderabad</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#74182E]/10 border border-[#C5A059] flex items-center justify-center font-serif font-bold text-[#74182E]">
              W
            </div>
          </div>

          {/* Guest Identity */}
          <div className="py-6 text-center space-y-3">
            <div className="inline-flex px-3 py-1 rounded-full bg-[#74182E]/10 text-[#74182E] text-xs font-semibold">
              {guest.relation} · {guest.side.toUpperCase()}&apos;S SIDE
            </div>
            <h1 className="text-3xl font-serif font-bold text-[#2D1B28]">{guest.name}</h1>
            <p className="text-xs text-[#7D597E]">{guest.familyName || "Independent Guest"} · {guest.phone}</p>

            {/* QR Code Graphic with Live Scan Action */}
            <div className="my-4 inline-block p-4 bg-white rounded-2xl border-2 border-[#E8DDCF] shadow-soft">
              <QrCode className="w-36 h-36 mx-auto text-[#2D1B28]" />
              <div className="text-[10px] font-mono tracking-wider text-[#7D597E] mt-1">
                {guest.qrCode}
              </div>
            </div>

            {/* Live Check-in Status */}
            <div>
              {guest.checkedIn ? (
                <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Checked In at Venue {guest.checkedInAt ? `(${guest.checkedInAt})` : ""}
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-100 text-amber-800 text-xs font-medium border border-amber-300">
                  <Clock className="w-3.5 h-3.5" /> Ready for Day-of Gate Scan
                </div>
              )}
            </div>
          </div>

          {/* Operational Details Grid: Table, Meal, Parking */}
          <div className="grid grid-cols-3 gap-2.5 pt-4 border-t border-[#E8DDCF] text-center">
            <div className="p-3 bg-white rounded-xl border border-[#E8DDCF]">
              <div className="text-[10px] uppercase tracking-wider text-[#7D597E] font-medium">Table</div>
              <div className="text-lg font-serif font-bold text-[#74182E] mt-0.5">{guest.tableNumber || "A12"}</div>
            </div>
            <div className="p-3 bg-white rounded-xl border border-[#E8DDCF]">
              <div className="text-[10px] uppercase tracking-wider text-[#7D597E] font-medium">Meal</div>
              <div className="text-sm font-semibold text-[#2D1B28] mt-1">{guest.foodPreference}</div>
            </div>
            <div className="p-3 bg-white rounded-xl border border-[#E8DDCF]">
              <div className="text-[10px] uppercase tracking-wider text-[#7D597E] font-medium">Parking</div>
              <div className="text-lg font-serif font-bold text-[#74182E] mt-0.5">{guest.parkingSlot || "P3"}</div>
            </div>
          </div>

          {/* Venue Gate Check-in simulation button for venue staff or reviewer */}
          <div className="mt-5 pt-3 border-t border-dashed border-[#E8DDCF] flex items-center justify-between text-xs">
            <span className="text-[#7D597E] text-[11px]">Venue Gatekeeper Simulator:</span>
            <button
              onClick={() => toggleCheckIn(guest.id)}
              className="px-3.5 py-1.5 rounded-lg bg-[#74182E] text-white font-medium text-xs hover:bg-[#581223] transition-colors"
            >
              {guest.checkedIn ? "Undo Gate Scan" : "Simulate Gate QR Scan"}
            </button>
          </div>
        </div>

        {/* Pass Actions */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={() => window.print()}
            className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-2 border border-white/20"
          >
            <Download className="w-3.5 h-3.5" /> Save / Print Pass
          </button>
          <Link
            href="/app/check-in"
            className="px-5 py-2.5 rounded-full bg-[#C5A059] hover:bg-[#D4AF37] text-[#1A1017] text-xs font-bold"
          >
            Open Live Check-In Desk →
          </Link>
        </div>
      </div>
    </div>
  );
}
