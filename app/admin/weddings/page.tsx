"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useWedding } from "@/context/WeddingContext";
import { Wedding } from "@/lib/types";
import {
  Heart,
  Search,
  Filter,
  Plus,
  ArrowRight,
  ExternalLink,
  Edit2,
  Trash2,
  CheckCircle2,
  Clock,
  MapPin,
  Calendar,
  Users,
  CreditCard,
  Eye,
  LogIn,
  MoreVertical,
  X,
  AlertCircle
} from "lucide-react";

export default function AdminWeddingsPage() {
  const router = useRouter();
  const { allWeddings, wedding, switchWedding, createNewWedding } = useWedding();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [planFilter, setPlanFilter] = useState<string>("all");

  // Provision Modal
  const [provisionModalOpen, setProvisionModalOpen] = useState(false);
  const [newBride, setNewBride] = useState("");
  const [newGroom, setNewGroom] = useState("");
  const [newDate, setNewDate] = useState("18 Feb 2027");
  const [newCity, setNewCity] = useState("Udaipur");
  const [newVenue, setNewVenue] = useState("The Oberoi Udaivilas, Udaipur");
  const [newPlan, setNewPlan] = useState("Luxury Concierge");

  // Editing state
  const [editWeddingModal, setEditWeddingModal] = useState<Wedding | null>(null);

  // Filter weddings
  const filteredWeddings = allWeddings.filter(w => {
    const matchesSearch =
      w.coupleNames.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.primaryVenue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.slug.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  const handleProvisionWedding = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBride.trim() || !newGroom.trim()) return;

    const created = createNewWedding({
      brideName: newBride,
      groomName: newGroom,
      weddingDate: newDate,
      city: newCity,
      primaryVenue: newVenue
    });

    setProvisionModalOpen(false);
    setNewBride("");
    setNewGroom("");
    alert(`Wedding for ${created.coupleNames} provisioned successfully!`);
  };

  const handleImpersonate = (wedId: string) => {
    switchWedding(wedId);
    router.push("/app");
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#2D1B28]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#C5A059] bg-[#2A1B28] px-2.5 py-0.5 rounded-full border border-[#3A2234]">
              Directory & Workspace Management
            </span>
            <span className="text-xs text-stone-500">·</span>
            <span className="text-xs text-stone-400">{allWeddings.length} Active Workspaces</span>
          </div>
          <h1 className="text-2xl font-serif font-bold text-white mt-1">
            Occasions Directory & Client Workspaces
          </h1>
          <p className="text-xs text-stone-400">
            Provision, inspect, modify subscription tiers, and log directly into any client occasion operating system.
          </p>
        </div>

        <button
          onClick={() => setProvisionModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-[#74182E] hover:bg-[#581223] text-white text-xs font-semibold shadow-soft flex items-center gap-1.5 transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-[#E1CD98]" />
          <span>Provision VIP Occasion</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-[#160E15] border border-[#2D1B28] flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by couple names, city, venue, or slug..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#211520] border border-[#3A2234] text-white placeholder:text-stone-500 focus:outline-none focus:border-[#74182E]"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <select
            value={planFilter}
            onChange={e => setPlanFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#211520] border border-[#3A2234] text-stone-300 focus:outline-none"
          >
            <option value="all">All Plans</option>
            <option value="Basic">Basic Plan</option>
            <option value="Premium">Premium Plan</option>
            <option value="Luxury">Luxury Concierge</option>
          </select>

          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#211520] border border-[#3A2234] text-stone-300 focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active Planning</option>
            <option value="completed">Completed Ceremonies</option>
          </select>
        </div>
      </div>

      {/* Occasions Table */}
      <div className="bg-[#160E15] rounded-2xl border border-[#2D1B28] overflow-hidden shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#211520]/80 border-b border-[#2D1B28] text-stone-400">
                <th className="py-3 px-4 font-semibold">Occasion Details</th>
                <th className="py-3 px-4 font-semibold">Date & City</th>
                <th className="py-3 px-4 font-semibold">Venue</th>
                <th className="py-3 px-4 font-semibold">Plan Tier</th>
                <th className="py-3 px-4 font-semibold">Guests & RSVPs</th>
                <th className="py-3 px-4 font-semibold text-right">Admin Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#211520]">
              {filteredWeddings.map(w => {
                const isSelected = wedding.id === w.id;
                return (
                  <tr key={w.id} className="hover:bg-[#211520]/50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#74182E] text-[#E1CD98] flex items-center justify-center font-serif font-bold text-sm shrink-0 border border-[#91253E]">
                          {w.coupleNames.charAt(0)}
                        </div>
                        <div>
                          <div className="font-serif font-bold text-white text-sm flex items-center gap-2">
                            <span>{w.coupleNames}</span>
                            {isSelected && (
                              <span className="text-[10px] font-sans px-2 py-0.2 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                                Active
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-stone-400 font-mono mt-0.5">
                            ID: {w.id} · <span className="text-[#C5A059]">/invite/{w.slug}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4 text-stone-300">
                      <div className="flex items-center gap-1 font-medium text-white">
                        <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span>{w.weddingDate}</span>
                      </div>
                      <div className="text-[11px] text-stone-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-[#74182E]" />
                        <span>{w.city}</span>
                      </div>
                    </td>

                    <td className="py-4 px-4 text-stone-300 max-w-xs">
                      <div className="truncate font-medium">{w.primaryVenue}</div>
                      <div className="text-[10px] text-stone-500">Taj Heritage / Palace</div>
                    </td>

                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#74182E]/30 text-[#E1CD98] border border-[#74182E] inline-flex items-center gap-1">
                        <CreditCard className="w-3 h-3 text-[#E1CD98]" />
                        <span>Premium</span>
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <div className="space-y-1 w-36">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-stone-300 font-semibold">{w.confirmedCount} Confirmed</span>
                          <span className="text-stone-500">/ {w.totalInvited}</span>
                        </div>
                        <div className="w-full bg-[#2A1B28] h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-[#C5A059] h-full"
                            style={{ width: `${w.rsvpCompletionPercentage}%` }}
                          />
                        </div>
                        <div className="text-[10px] text-stone-400">
                          {w.rsvpCompletionPercentage}% response rate
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4 text-right space-x-2">
                      {/* Direct Guest Invite Link */}
                      <Link
                        href={`/invite/${w.slug}`}
                        target="_blank"
                        className="px-2.5 py-1.5 rounded-lg bg-[#211520] hover:bg-[#2A1B28] text-stone-300 text-xs font-medium border border-[#3A2234] inline-flex items-center gap-1"
                        title="View Guest RSVP Invitation"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span className="hidden sm:inline">Guest View</span>
                      </Link>

                      {/* Impersonate / Open App */}
                      <button
                        onClick={() => handleImpersonate(w.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors inline-flex items-center gap-1.5 ${
                          isSelected
                            ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                            : "bg-[#74182E] text-white hover:bg-[#581223] shadow-soft"
                        }`}
                        title="Log into this wedding's workspace"
                      >
                        <LogIn className="w-3.5 h-3.5" />
                        <span>{isSelected ? "Opened" : "Log In"}</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* PROVISION VIP WEDDING MODAL */}
      {provisionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-[#160E15] rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-[#3A2234] shadow-2xl relative text-white">
            <button
              onClick={() => setProvisionModalOpen(false)}
              className="absolute top-5 right-5 p-1 rounded-full text-stone-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1 pb-4 border-b border-[#2D1B28]">
              <div className="flex items-center gap-2 text-[#C5A059]">
                <Heart className="w-5 h-5" />
                <h3 className="text-lg font-serif font-bold text-white">Provision VIP Wedding Workspace</h3>
              </div>
              <p className="text-xs text-stone-400">
                Instantly generates a live digital invitation slug and operations database.
              </p>
            </div>

            <form onSubmit={handleProvisionWedding} className="space-y-4 py-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-400 mb-1 font-medium">Bride&apos;s Name</label>
                  <input
                    type="text"
                    value={newBride}
                    onChange={e => setNewBride(e.target.value)}
                    placeholder="e.g. Ananya"
                    required
                    className="w-full p-2.5 rounded-xl bg-[#211520] border border-[#3A2234] text-white focus:outline-none focus:border-[#74182E]"
                  />
                </div>
                <div>
                  <label className="block text-stone-400 mb-1 font-medium">Groom&apos;s Name</label>
                  <input
                    type="text"
                    value={newGroom}
                    onChange={e => setNewGroom(e.target.value)}
                    placeholder="e.g. Kabir"
                    required
                    className="w-full p-2.5 rounded-xl bg-[#211520] border border-[#3A2234] text-white focus:outline-none focus:border-[#74182E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-400 mb-1 font-medium">Wedding Date</label>
                  <input
                    type="text"
                    value={newDate}
                    onChange={e => setNewDate(e.target.value)}
                    placeholder="e.g. 18 Feb 2027"
                    className="w-full p-2.5 rounded-xl bg-[#211520] border border-[#3A2234] text-white focus:outline-none focus:border-[#74182E]"
                  />
                </div>
                <div>
                  <label className="block text-stone-400 mb-1 font-medium">City / Destination</label>
                  <input
                    type="text"
                    value={newCity}
                    onChange={e => setNewCity(e.target.value)}
                    placeholder="e.g. Udaipur"
                    className="w-full p-2.5 rounded-xl bg-[#211520] border border-[#3A2234] text-white focus:outline-none focus:border-[#74182E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-400 mb-1 font-medium">Palace / Primary Venue</label>
                <input
                  type="text"
                  value={newVenue}
                  onChange={e => setNewVenue(e.target.value)}
                  placeholder="e.g. The Oberoi Udaivilas, Udaipur"
                  className="w-full p-2.5 rounded-xl bg-[#211520] border border-[#3A2234] text-white focus:outline-none focus:border-[#74182E]"
                />
              </div>

              <div>
                <label className="block text-stone-400 mb-1 font-medium">Subscription Tier</label>
                <select
                  value={newPlan}
                  onChange={e => setNewPlan(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#211520] border border-[#3A2234] text-white focus:outline-none"
                >
                  <option value="Luxury Concierge">Luxury Concierge (₹14,999 / VIP)</option>
                  <option value="Premium">Premium Operating System (₹4,999)</option>
                  <option value="Basic">Basic Wedding (₹1,499)</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#2D1B28]">
                <button
                  type="button"
                  onClick={() => setProvisionModalOpen(false)}
                  className="px-4 py-2 rounded-full bg-[#211520] text-stone-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#74182E] hover:bg-[#581223] text-white font-semibold shadow-soft"
                >
                  Create & Launch Workspace →
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
