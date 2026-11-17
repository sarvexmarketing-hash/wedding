"use client";

import React, { useState } from "react";
import Link from "next/link";
import { plannerWeddingsList } from "@/lib/mock-data";
import {
  Layers,
  Calendar,
  Users,
  CheckCircle2,
  Clock,
  Plus,
  ExternalLink,
  ChevronRight,
  Sparkles,
  TrendingUp,
  MapPin
} from "lucide-react";

export default function PlannerDashboardPage() {
  const [filterCity, setFilterCity] = useState("all");

  const filteredWeddings = plannerWeddingsList.filter(w =>
    filterCity === "all" || w.city.toLowerCase().includes(filterCity.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E8DDCF]">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-[#74182E]">
            Enterprise Agency Edition
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D1B28]">
            Planner Portfolio Portal
          </h1>
          <p className="text-xs text-[#7D597E]">
            Manage 12 high-end destination weddings, client teams, headcounts, and live operations from one master account.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={filterCity}
            onChange={e => setFilterCity(e.target.value)}
            className="px-3 py-2 rounded-xl border border-[#E8DDCF] text-xs font-semibold text-[#2D1B28] bg-white"
          >
            <option value="all">All Destinations (12 Weddings)</option>
            <option value="hyderabad">Hyderabad</option>
            <option value="udaipur">Udaipur</option>
            <option value="jaipur">Jaipur</option>
            <option value="goa">Goa</option>
          </select>
          <button
            onClick={() => alert("Add New Client Wedding Flow: Enter Bride & Groom names, date, and venue.")}
            className="px-4 py-2 rounded-xl bg-[#74182E] text-white text-xs font-semibold hover:bg-[#581223] transition-colors flex items-center gap-1.5 shadow-soft"
          >
            <Plus className="w-4 h-4 text-[#E1CD98]" /> Onboard New Wedding
          </button>
        </div>
      </div>

      {/* Portfolio High-Level Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-[#E8DDCF] shadow-soft">
          <div className="text-xs text-[#7D597E] font-medium">Active Weddings</div>
          <div className="text-3xl font-serif font-bold text-[#2D1B28] mt-1">12</div>
          <div className="text-[11px] text-stone-500 mt-1">Across 8 luxury destinations</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E8DDCF] shadow-soft">
          <div className="text-xs text-[#7D597E] font-medium">Total Managed Guests</div>
          <div className="text-3xl font-serif font-bold text-[#74182E] mt-1">7,650</div>
          <div className="text-[11px] text-stone-500 mt-1">4,342 confirmed RSVPs</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E8DDCF] shadow-soft">
          <div className="text-xs text-[#7D597E] font-medium">Production Tasks</div>
          <div className="text-3xl font-serif font-bold text-[#2D1B28] mt-1">324 / 410</div>
          <div className="text-[11px] text-emerald-750 font-medium mt-1">79% milestone health</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E8DDCF] shadow-soft">
          <div className="text-xs text-[#7D597E] font-medium">Catering Portions Managed</div>
          <div className="text-3xl font-serif font-bold text-[#C5A059] mt-1">14,200+</div>
          <div className="text-[11px] text-stone-500 mt-1">With strict dietary tagging</div>
        </div>
      </div>

      {/* 12 Weddings Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredWeddings.map(w => {
          const rsvpPct = Math.round((w.confirmed / w.totalGuests) * 100);
          return (
            <div
              key={w.id}
              className="bg-white p-5 rounded-3xl border border-[#E8DDCF] shadow-soft hover:border-[#C5A059] transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-[#FAF7F2]">
                  <span className="text-[10px] uppercase font-bold text-[#74182E] tracking-wider">
                    {w.plannerRole}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    w.statusColor === "emerald"
                      ? "bg-emerald-100 text-emerald-800"
                      : w.statusColor === "blue"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-amber-100 text-amber-800"
                  }`}>
                    {w.status}
                  </span>
                </div>

                <div className="mt-3">
                  <h3 className="font-serif font-bold text-xl text-[#2D1B28]">{w.couple}</h3>
                  <div className="text-xs text-[#7D597E] flex items-center gap-2 mt-0.5">
                    <span>{w.date}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-[#C5A059]" /> {w.city}</span>
                  </div>
                  <div className="text-[11px] text-stone-500 mt-0.5 truncate">{w.venue}</div>
                </div>

                {/* Metrics */}
                <div className="mt-4 pt-3 border-t border-[#FAF7F2] space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#7D597E]">RSVP Progress:</span>
                    <strong className="text-[#2D1B28]">{w.confirmed} / {w.totalGuests} confirmed ({rsvpPct}%)</strong>
                  </div>
                  <div className="w-full bg-[#FAF7F2] h-2 rounded-full overflow-hidden border border-[#E8DDCF]">
                    <div
                      className="bg-[#74182E] h-full"
                      style={{ width: `${Math.min(100, rsvpPct)}%` }}
                    />
                  </div>

                  <div className="flex justify-between items-center text-[11px] text-stone-500 pt-1">
                    <span>Tasks: {w.tasksCompleted} / {w.tasksTotal}</span>
                    <span>Spend: <strong className="text-[#2D1B28]">{w.budgetSpent}</strong></span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#FAF7F2] flex items-center justify-between">
                <Link
                  href="/app"
                  className="text-xs font-semibold text-[#74182E] hover:underline flex items-center gap-1"
                >
                  <span>Launch Operations Workspace</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
