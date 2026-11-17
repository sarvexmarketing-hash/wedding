"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useWedding } from "@/context/WeddingContext";
import {
  QrCode,
  CheckCircle2,
  Clock,
  Search,
  Users,
  Utensils,
  Car,
  Camera,
  ExternalLink,
  Sparkles,
  ArrowRight
} from "lucide-react";

export default function LiveCheckInPage() {
  const { wedding, guests, toggleCheckIn } = useWedding();

  const [scanInput, setScanInput] = useState("");
  const [lastScannedGuest, setLastScannedGuest] = useState<any>(null);
  const [searchFilter, setSearchFilter] = useState("");

  const confirmedTotal = wedding.confirmedCount;
  const checkedInTotal = wedding.checkedInCount;
  const yetToArrive = Math.max(0, confirmedTotal - checkedInTotal);
  const progressPct = Math.min(100, Math.round((checkedInTotal / confirmedTotal) * 100));

  const handleSimulateScan = (qrOrId?: string) => {
    const query = qrOrId || scanInput;
    if (!query) return;

    const matched = guests.find(
      g => g.qrCode.toLowerCase() === query.toLowerCase() ||
           g.name.toLowerCase().includes(query.toLowerCase()) ||
           g.id === query
    );

    if (matched) {
      if (!matched.checkedIn) {
        toggleCheckIn(matched.id);
      }
      setLastScannedGuest(matched);
      setScanInput("");
    } else {
      alert(`No guest found with QR / ID: ${query}`);
    }
  };

  const filteredList = guests.filter(g =>
    g.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    g.phone.includes(searchFilter) ||
    g.qrCode.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E8DDCF]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs uppercase font-bold tracking-wider text-[#74182E]">
              Live Wedding-Day Operations
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D1B28] mt-1">
            Live Gate Check-In Desk
          </h1>
          <p className="text-xs text-[#7D597E]">
            {wedding.weddingDate} · Taj Falaknuma Palace Main Entrance & Valet Porch
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
            {progressPct}% Guests Arrived
          </span>
        </div>
      </div>

      {/* SECTION 21: LIVE CHECK-IN DASHBOARD (526 Confirmed, 421 Checked In, 105 Yet to Arrive) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl bg-white border border-[#E8DDCF] shadow-soft">
          <div className="text-xs font-semibold text-[#7D597E]">Total Confirmed</div>
          <div className="text-3xl sm:text-4xl font-serif font-bold text-[#2D1B28] mt-1">
            {confirmedTotal}
          </div>
          <div className="text-xs text-stone-500 mt-1">Expected at venue today</div>
        </div>

        <div className="p-5 rounded-3xl bg-emerald-50/80 border-2 border-emerald-400 shadow-soft">
          <div className="text-xs font-semibold text-emerald-900 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Checked In at Gate
          </div>
          <div className="text-3xl sm:text-4xl font-serif font-bold text-emerald-950 mt-1">
            {checkedInTotal}
          </div>
          <div className="text-xs text-emerald-700 mt-1">Admitted & seated</div>
        </div>

        <div className="p-5 rounded-3xl bg-amber-50/80 border border-amber-300 shadow-soft">
          <div className="text-xs font-semibold text-amber-900 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-amber-600" /> Yet to Arrive
          </div>
          <div className="text-3xl sm:text-4xl font-serif font-bold text-amber-950 mt-1">
            {yetToArrive}
          </div>
          <div className="text-xs text-amber-700 mt-1">In transit / en route</div>
        </div>
      </div>

      {/* Live Arrival Progress Bar */}
      <div className="p-5 bg-white rounded-3xl border border-[#E8DDCF] shadow-soft space-y-2">
        <div className="flex justify-between items-center text-xs font-semibold">
          <span className="text-[#2D1B28]">Gate Inflow Progress</span>
          <span className="text-[#74182E]">{checkedInTotal} / {confirmedTotal} arrivals ({progressPct}%)</span>
        </div>
        <div className="w-full bg-[#FAF7F2] h-3 rounded-full overflow-hidden border border-[#E8DDCF]">
          <div
            className="bg-gradient-to-r from-[#74182E] to-emerald-600 h-full transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* QR Scanner Simulator & Verification Window */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 6 cols: Live Gate Scanner Tool */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-[#E8DDCF] shadow-soft space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E8DDCF]">
            <span className="text-xs font-bold uppercase text-[#74182E] tracking-wider flex items-center gap-1.5">
              <Camera className="w-4 h-4 text-[#74182E]" /> Optical / QR Scan Simulator
            </span>
            <span className="text-[10px] text-stone-500">Live Camera or Pass Token</span>
          </div>

          <div className="space-y-3">
            <p className="text-xs text-[#7D597E]">
              Point handheld tablet or scanner at guest&apos;s digital phone pass, or enter their token / name:
            </p>

            <form
              onSubmit={e => {
                e.preventDefault();
                handleSimulateScan();
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                placeholder="Scan or type QR (e.g. WOS-RP-001-RS or Rahul)"
                value={scanInput}
                onChange={e => setScanInput(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl border border-[#E8DDCF] text-xs font-mono focus:border-[#74182E] focus:outline-none"
              />
              <button
                type="submit"
                className="px-5 py-3 rounded-xl bg-[#74182E] text-white text-xs font-bold hover:bg-[#581223] transition-colors shadow-soft"
              >
                Scan Pass
              </button>
            </form>

            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <span className="text-stone-400 text-[11px]">Quick test scans:</span>
              <button
                onClick={() => handleSimulateScan("WOS-RP-001-RS")}
                className="px-2.5 py-1 bg-[#FAF7F2] border border-[#E8DDCF] rounded-lg text-xs font-mono text-[#74182E] hover:bg-stone-100"
              >
                Rahul Sharma (WOS-RP-001-RS)
              </button>
              <button
                onClick={() => handleSimulateScan("WOS-RP-003-DM")}
                className="px-2.5 py-1 bg-[#FAF7F2] border border-[#E8DDCF] rounded-lg text-xs font-mono text-[#74182E] hover:bg-stone-100"
              >
                Dharmesh Mehta (WOS-RP-003-DM)
              </button>
            </div>
          </div>

          {/* Last Scanned Instant Welcome Card */}
          {lastScannedGuest && (
            <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-400 space-y-3 animate-fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Admitted at Main Gate
                </span>
                <span className="text-[10px] text-emerald-700 font-mono">
                  {lastScannedGuest.qrCode}
                </span>
              </div>

              <div>
                <h3 className="font-serif font-bold text-xl text-[#2D1B28]">{lastScannedGuest.name}</h3>
                <div className="text-xs text-[#7D597E]">{lastScannedGuest.relation} · {lastScannedGuest.side}&apos;s side</div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-white p-2.5 rounded-xl border border-emerald-200">
                  <div className="text-[10px] text-stone-400 uppercase font-semibold">Table</div>
                  <div className="font-serif font-bold text-base text-[#74182E]">{lastScannedGuest.tableNumber || "A12"}</div>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-emerald-200">
                  <div className="text-[10px] text-stone-400 uppercase font-semibold">Diet</div>
                  <div className="font-bold text-xs text-[#2D1B28] mt-1">{lastScannedGuest.foodPreference}</div>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-emerald-200">
                  <div className="text-[10px] text-stone-400 uppercase font-semibold">Valet Parking</div>
                  <div className="font-serif font-bold text-base text-[#74182E]">{lastScannedGuest.parkingSlot || "P3"}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right 6 cols: Live Guest Roster with 1-Click Check-in Toggle */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-[#E8DDCF] shadow-soft space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E8DDCF]">
            <div>
              <span className="text-xs uppercase font-bold text-[#74182E]">Gate Roster</span>
              <h3 className="font-serif font-bold text-lg text-[#2D1B28]">Guest Manifest</h3>
            </div>
            <input
              type="text"
              placeholder="Filter roster..."
              value={searchFilter}
              onChange={e => setSearchFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-[#E8DDCF] text-xs focus:outline-none"
            />
          </div>

          <div className="divide-y divide-[#E8DDCF] max-h-96 overflow-y-auto pr-1">
            {filteredList.map(g => (
              <div key={g.id} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <div className="font-serif font-bold text-sm text-[#2D1B28]">{g.name}</div>
                  <div className="text-[11px] text-[#7D597E]">
                    Table: <strong>{g.tableNumber || "A12"}</strong> · Meal: {g.foodPreference}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/pass/${g.id}`}
                    target="_blank"
                    className="p-1.5 text-stone-400 hover:text-stone-700"
                    title="View Pass"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    onClick={() => toggleCheckIn(g.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      g.checkedIn
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                        : "bg-[#74182E] text-white hover:bg-[#581223]"
                    }`}
                  >
                    {g.checkedIn ? "Checked In" : "Check In"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
