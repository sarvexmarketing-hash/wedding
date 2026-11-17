"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useWedding } from "@/context/WeddingContext";
import { GuestSide, RSVPStatus, GuestTag } from "@/lib/types";
import {
  Users,
  Search,
  Filter,
  Plus,
  Upload,
  Download,
  QrCode,
  CheckCircle2,
  Clock,
  XCircle,
  MoreVertical,
  Utensils,
  ExternalLink
} from "lucide-react";
import { AddGuestModal, ImportCsvModal } from "@/components/app/AddGuestModal";

export default function GuestCrmPage() {
  const { guests, exportGuestsToCsv, toggleCheckIn } = useWedding();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sideFilter, setSideFilter] = useState<string>("all");
  const [tagFilter, setTagFilter] = useState<string>("all");

  const [addGuestModalOpen, setAddGuestModalOpen] = useState(false);
  const [importModalOpen, setImportModalOpen] = useState(false);

  // Filter guests
  const filteredGuests = guests.filter(g => {
    const matchesSearch =
      g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.phone.includes(searchQuery) ||
      (g.familyName && g.familyName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      g.relation.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "attending" && g.rsvpStatus === "confirmed") ||
      (statusFilter === "pending" && g.rsvpStatus === "pending") ||
      (statusFilter === "declined" && g.rsvpStatus === "declined");

    const matchesSide =
      sideFilter === "all" || g.side === sideFilter;

    const matchesTag =
      tagFilter === "all" || g.tags.includes(tagFilter as GuestTag);

    return matchesSearch && matchesStatus && matchesSide && matchesTag;
  });

  const handleExportCsv = () => {
    const csvData = exportGuestsToCsv();
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `WeddingOS-Guests-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E8DDCF]">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-[#74182E]">
            Guest Relationship Management
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D1B28]">
            Guest CRM
          </h1>
          <p className="text-xs text-[#7D597E]">
            {guests.length} total profiles recorded · 526 confirmed · 183 pending · 91 declined
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setImportModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-white border border-[#E8DDCF] text-xs font-semibold text-[#2D1B28] hover:bg-[#FAF7F2] transition-colors flex items-center gap-1.5 shadow-soft-sm"
          >
            <Upload className="w-3.5 h-3.5 text-[#74182E]" /> Import CSV
          </button>
          <button
            onClick={handleExportCsv}
            className="px-3.5 py-2 rounded-xl bg-white border border-[#E8DDCF] text-xs font-semibold text-[#2D1B28] hover:bg-[#FAF7F2] transition-colors flex items-center gap-1.5 shadow-soft-sm"
          >
            <Download className="w-3.5 h-3.5 text-[#74182E]" /> Export CSV
          </button>
          <button
            onClick={() => setAddGuestModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-[#74182E] text-white text-xs font-semibold hover:bg-[#581223] transition-colors flex items-center gap-1.5 shadow-soft"
          >
            <Plus className="w-4 h-4 text-[#E1CD98]" /> Add Guest
          </button>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E8DDCF] shadow-soft space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search Box */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search guests, families, phone, or tags..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#E8DDCF] text-xs focus:border-[#74182E] focus:outline-none"
            />
          </div>

          {/* Quick Filter Badges */}
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            <button
              onClick={() => setStatusFilter("all")}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                statusFilter === "all" ? "bg-[#74182E] text-white" : "bg-[#FAF7F2] text-[#4D334E] hover:bg-[#F3ECE1]"
              }`}
            >
              All ({guests.length})
            </button>
            <button
              onClick={() => setStatusFilter("attending")}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                statusFilter === "attending" ? "bg-emerald-700 text-white" : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
              }`}
            >
              Attending
            </button>
            <button
              onClick={() => setStatusFilter("pending")}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                statusFilter === "pending" ? "bg-amber-700 text-white" : "bg-amber-50 text-amber-800 hover:bg-amber-100"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setStatusFilter("declined")}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                statusFilter === "declined" ? "bg-rose-700 text-white" : "bg-rose-50 text-rose-800 hover:bg-rose-100"
              }`}
            >
              Declined
            </button>
          </div>
        </div>

        {/* Secondary Filter Row: Side & Tags */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#FAF7F2] text-xs">
          <span className="text-stone-400 text-[11px] font-medium">Filter by:</span>

          <select
            value={sideFilter}
            onChange={e => setSideFilter(e.target.value)}
            className="px-2.5 py-1 rounded-lg border border-[#E8DDCF] text-xs text-[#2D1B28] bg-white focus:outline-none"
          >
            <option value="all">All Sides</option>
            <option value="bride">Bride&apos;s Side</option>
            <option value="groom">Groom&apos;s Side</option>
            <option value="mutual">Mutual</option>
          </select>

          <select
            value={tagFilter}
            onChange={e => setTagFilter(e.target.value)}
            className="px-2.5 py-1 rounded-lg border border-[#E8DDCF] text-xs text-[#2D1B28] bg-white focus:outline-none"
          >
            <option value="all">All Tags</option>
            <option value="VIP">VIP</option>
            <option value="Family">Family</option>
            <option value="College Friend">College Friend</option>
            <option value="Relative">Relative</option>
          </select>
        </div>
      </div>

      {/* Guest Cards / Table View */}
      <div className="bg-white rounded-3xl border border-[#E8DDCF] shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#FAF7F2] border-b border-[#E8DDCF] text-[#7D597E] uppercase text-[10px] tracking-wider font-semibold">
                <th className="p-4">Guest & Side</th>
                <th className="p-4">Family / Group</th>
                <th className="p-4">Status</th>
                <th className="p-4">Food Preference</th>
                <th className="p-4">Arrival / Seating</th>
                <th className="p-4">Check-In</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8DDCF]">
              {filteredGuests.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-stone-500">
                    No guests found matching your search.
                  </td>
                </tr>
              ) : (
                filteredGuests.map(g => (
                  <tr key={g.id} className="hover:bg-[#FAF7F2]/60 transition-colors">
                    {/* Guest name & side */}
                    <td className="p-4">
                      <div className="font-serif font-bold text-sm text-[#2D1B28]">{g.name}</div>
                      <div className="text-[11px] text-[#7D597E] flex items-center gap-1.5 mt-0.5">
                        <span className={`capitalize font-medium ${g.side === "bride" ? "text-[#74182E]" : "text-[#C5A059]"}`}>
                          {g.side}&apos;s side
                        </span>
                        <span>·</span>
                        <span>{g.relation}</span>
                      </div>
                      <div className="flex gap-1 mt-1">
                        {g.tags.map(t => (
                          <span key={t} className="text-[9px] bg-stone-100 text-stone-700 px-1.5 py-0.2 rounded font-medium">
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Family */}
                    <td className="p-4">
                      {g.familyName ? (
                        <div>
                          <div className="font-semibold text-[#2D1B28]">{g.familyName}</div>
                          <div className="text-[10px] text-[#7D597E]">{g.isFamilyHead ? "Head of Family" : "Member"}</div>
                        </div>
                      ) : (
                        <span className="text-stone-400 italic">Individual</span>
                      )}
                    </td>

                    {/* RSVP Status */}
                    <td className="p-4">
                      {g.rsvpStatus === "confirmed" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-semibold border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Attending
                        </span>
                      )}
                      {g.rsvpStatus === "pending" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 text-[11px] font-semibold border border-amber-200">
                          <Clock className="w-3.5 h-3.5 text-amber-600" /> Pending
                        </span>
                      )}
                      {g.rsvpStatus === "declined" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-50 text-rose-800 text-[11px] font-semibold border border-rose-200">
                          <XCircle className="w-3.5 h-3.5 text-rose-600" /> Declined
                        </span>
                      )}
                    </td>

                    {/* Food Preference */}
                    <td className="p-4">
                      <div className="font-semibold text-[#2D1B28]">{g.foodPreference}</div>
                      {g.dietaryNotes && (
                        <div className="text-[10px] text-amber-700 max-w-xs">{g.dietaryNotes}</div>
                      )}
                    </td>

                    {/* Arrival / Seating */}
                    <td className="p-4">
                      <div className="text-[#2D1B28] font-medium">{g.arrivalTime || "TBD"}</div>
                      <div className="text-[11px] text-[#7D597E] mt-0.5">
                        Table: <strong className="text-[#74182E]">{g.tableNumber || "Unassigned"}</strong> · Parking: {g.parkingSlot || "None"}
                      </div>
                    </td>

                    {/* Check In */}
                    <td className="p-4">
                      <button
                        onClick={() => toggleCheckIn(g.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                          g.checkedIn
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                            : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                        }`}
                      >
                        <QrCode className="w-3 h-3" />
                        <span>{g.checkedIn ? "Checked In" : "Scan Gate"}</span>
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right">
                      <Link
                        href={`/pass/${g.id}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#74182E] hover:underline"
                      >
                        <span>Pass</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <AddGuestModal isOpen={addGuestModalOpen} onClose={() => setAddGuestModalOpen(false)} />
      <ImportCsvModal isOpen={importModalOpen} onClose={() => setImportModalOpen(false)} />
    </div>
  );
}
