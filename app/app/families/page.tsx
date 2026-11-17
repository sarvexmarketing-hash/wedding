"use client";

import React, { useState } from "react";
import { useWedding } from "@/context/WeddingContext";
import { Family } from "@/lib/types";
import {
  Home,
  Users,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  Plus,
  MessageSquare,
  Sparkles,
  ShieldCheck
} from "lucide-react";

export default function FamiliesPage() {
  const { families, wedding, sendCampaignMessage } = useWedding();
  const [selectedFamily, setSelectedFamily] = useState<Family | null>(families[0]);
  const [filterSide, setFilterSide] = useState<string>("all");

  const filteredFamilies = families.filter(f =>
    filterSide === "all" || f.side === filterSide
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E8DDCF]">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-[#74182E]">
            Family-Centric Management
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D1B28]">
            Family Groups
          </h1>
          <p className="text-xs text-[#7D597E]">
            Indian occasions are family-first. Heads of family can RSVP for all members in 1 click.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={filterSide}
            onChange={e => setFilterSide(e.target.value)}
            className="px-3 py-2 rounded-xl border border-[#E8DDCF] text-xs font-semibold text-[#2D1B28] bg-white"
          >
            <option value="all">All Families</option>
            <option value="bride">Bride&apos;s Side</option>
            <option value="groom">Groom&apos;s Side</option>
          </select>
        </div>
      </div>

      {/* Grid of Families */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 5 cols: Family Cards list */}
        <div className="lg:col-span-5 space-y-3">
          {filteredFamilies.map(fam => {
            const isSelected = selectedFamily?.id === fam.id;
            const confirmedCount = fam.members.filter(m => m.rsvpStatus === "confirmed").length;
            return (
              <div
                key={fam.id}
                onClick={() => setSelectedFamily(fam)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? "bg-white border-[#74182E] shadow-soft ring-1 ring-[#74182E]"
                    : "bg-white/80 border-[#E8DDCF] hover:bg-white hover:border-[#C5A059]"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif font-bold text-base text-[#2D1B28]">{fam.name}</h3>
                      <span className={`text-[9px] uppercase px-1.5 py-0.5 rounded font-bold ${
                        fam.side === "bride" ? "bg-[#74182E]/10 text-[#74182E]" : "bg-[#C5A059]/20 text-[#8D6B33]"
                      }`}>
                        {fam.side}
                      </span>
                    </div>
                    <p className="text-xs text-[#7D597E] mt-0.5">
                      Head: <strong>{fam.headName}</strong> · {fam.memberCount} members
                    </p>
                  </div>

                  <div>
                    {fam.rsvpCompleted ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Done
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                        <Clock className="w-3 h-3 text-amber-600" /> Pending
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-[#FAF7F2] flex items-center justify-between text-xs text-[#7D597E]">
                  <span>{confirmedCount} / {fam.memberCount} confirmed</span>
                  <span className="text-[11px] text-[#74182E] font-medium">Click to inspect →</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right 7 cols: Selected Family Details View */}
        <div className="lg:col-span-7">
          {selectedFamily ? (
            <div className="bg-white rounded-3xl p-6 border border-[#E8DDCF] shadow-soft space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E8DDCF] gap-3">
                <div>
                  <span className="text-xs uppercase font-bold text-[#74182E] tracking-wider">Family Detail</span>
                  <h2 className="text-2xl font-serif font-bold text-[#2D1B28]">{selectedFamily.name}</h2>
                  <p className="text-xs text-[#7D597E] mt-0.5">
                    {selectedFamily.memberCount} family members registered on invite pass
                  </p>
                </div>
                <button
                  onClick={() => {
                    sendCampaignMessage("cmp-2");
                    alert(`Dispatched WhatsApp family pass link to ${selectedFamily.headName} (${selectedFamily.headPhone})`);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#74182E] text-white text-xs font-semibold hover:bg-[#581223] transition-colors flex items-center gap-1.5 shadow-soft"
                >
                  <MessageSquare className="w-3.5 h-3.5" /> WhatsApp Family Pass
                </button>
              </div>

              {/* Head of Family Contact Card */}
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DDCF] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="text-[10px] uppercase font-bold text-[#7D597E]">Authorized Family Head</div>
                  <div className="font-bold text-sm text-[#2D1B28] mt-0.5">{selectedFamily.headName}</div>
                  <div className="text-[#7D597E] flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {selectedFamily.headPhone}</span>
                    <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {selectedFamily.headEmail}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-2.5 py-1 rounded-full bg-white text-[#74182E] border border-[#E8DDCF] font-semibold text-[11px]">
                    Single RSVP Token
                  </span>
                </div>
              </div>

              {/* Family Members Breakdown List */}
              <div className="space-y-3">
                <div className="text-xs uppercase font-bold text-[#7D597E] tracking-wider">
                  Individual Member RSVPs & Food Preferences
                </div>
                <div className="divide-y divide-[#E8DDCF] border border-[#E8DDCF] rounded-2xl overflow-hidden bg-[#FAF7F2]/40">
                  {selectedFamily.members.map(m => (
                    <div key={m.id} className="p-3.5 flex items-center justify-between text-xs bg-white">
                      <div>
                        <div className="font-serif font-bold text-sm text-[#2D1B28]">{m.name}</div>
                        <div className="text-[11px] text-[#7D597E]">
                          {m.relation} · Age: <span className="capitalize">{m.ageGroup}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="font-semibold text-[#2D1B28]">{m.foodPreference}</div>
                          <div className="text-[10px] text-[#7D597E]">
                            {m.eventsAttending.length > 0 ? `${m.eventsAttending.length} functions` : "No functions"}
                          </div>
                        </div>

                        {m.rsvpStatus === "confirmed" ? (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-semibold text-[10px] border border-emerald-200">
                            Attending
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 font-semibold text-[10px] border border-amber-200">
                            Pending
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Family Notes */}
              {selectedFamily.notes && (
                <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200/80 text-xs text-amber-900">
                  <strong>Family Logistics Note:</strong> {selectedFamily.notes}
                </div>
              )}
            </div>
          ) : (
            <div className="p-8 text-center bg-white rounded-3xl border border-[#E8DDCF] text-stone-500">
              Select a family to inspect their members and dietary needs.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
