"use client";

import React, { useState } from "react";
import { useWedding } from "@/context/WeddingContext";
import { WeddingGift } from "@/lib/types";
import {
  Gift,
  Lock,
  Plus,
  Search,
  DollarSign,
  Heart,
  CheckCircle2,
  Clock,
  Sparkles,
  ShieldCheck,
  Send,
  Trash2,
  Edit2
} from "lucide-react";

export default function GiftTrackingPage() {
  const { gifts, addGift, updateGift, deleteGift, wedding, events } = useWedding();

  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [addModalOpen, setAddModalOpen] = useState(false);

  // Form states for new gift
  const [guestName, setGuestName] = useState("");
  const [giftReceived, setGiftReceived] = useState("");
  const [giftCategory, setGiftCategory] = useState<WeddingGift["giftCategory"]>("Cash / Shagun");
  const [amount, setAmount] = useState<string>("51000");
  const [eventName, setEventName] = useState("Sacred Muhurtham & Varmala");
  const [notes, setNotes] = useState("");

  const filteredGifts = gifts.filter(g => {
    const matchesSearch =
      g.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.giftReceived.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.eventName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || g.giftCategory === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const totalGiftValue = gifts.reduce((acc, g) => acc + (g.amount || 0), 0);
  const cashShagunTotal = gifts
    .filter(g => g.giftCategory === "Cash / Shagun")
    .reduce((acc, g) => acc + (g.amount || 0), 0);
  const thankYouPendingCount = gifts.filter(g => !g.thankYouSent).length;

  const handleCreateGift = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !giftReceived.trim()) return;

    addGift({
      guestName,
      giftReceived,
      giftCategory,
      amount: amount ? Number(amount) : undefined,
      eventId: "evt-wedding",
      eventName,
      notes,
      dateReceived: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
      thankYouSent: false
    });

    setGuestName("");
    setGiftReceived("");
    setAmount("51000");
    setNotes("");
    setAddModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header with Private Security Assurance */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E8DDCF]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold tracking-wider text-[#74182E] bg-[#74182E]/10 px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Lock className="w-3 h-3 text-[#74182E]" /> Private & Confidential
            </span>
            <span className="text-xs font-bold text-[#C5A059]">Couple & Family Admin Only</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D1B28] mt-1">
            Wedding Gifts & Shagun Tracking
          </h1>
          <p className="text-xs text-[#7D597E]">
            Privately catalog cash envelopes (Shagun), heirloom jewelry, and registry gifts with thank-you note management.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setAddModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-[#74182E] text-white text-xs font-semibold hover:bg-[#581223] transition-colors flex items-center gap-1.5 shadow-soft"
          >
            <Plus className="w-4 h-4 text-[#E1CD98]" /> Record Gift Received
          </button>
        </div>
      </div>

      {/* Aggregate Private Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-[#E8DDCF] shadow-soft">
          <div className="text-xs text-[#7D597E] font-medium">Total Gift Value</div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-[#2D1B28] mt-1">
            ₹{(totalGiftValue / 100000).toFixed(2)} Lakhs
          </div>
          <div className="text-[11px] text-stone-500 mt-1">Across all categories</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E8DDCF] shadow-soft">
          <div className="text-xs text-[#7D597E] font-medium">Cash / Shagun Total</div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-emerald-800 mt-1">
            ₹{(cashShagunTotal / 100000).toFixed(2)} Lakhs
          </div>
          <div className="text-[11px] text-emerald-700 mt-1">Verified envelope tally</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E8DDCF] shadow-soft">
          <div className="text-xs text-[#7D597E] font-medium">Total Gifts Recorded</div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-[#74182E] mt-1">
            {gifts.length} Gifts
          </div>
          <div className="text-[11px] text-stone-500 mt-1">From close family & guests</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E8DDCF] shadow-soft">
          <div className="text-xs text-[#7D597E] font-medium">Thank-You Pending</div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-amber-800 mt-1">
            {thankYouPendingCount} Guests
          </div>
          <div className="text-[11px] text-amber-700 mt-1">Requires WhatsApp acknowledgement</div>
        </div>
      </div>

      {/* Search & Category Filter */}
      <div className="bg-white p-4 rounded-2xl border border-[#E8DDCF] shadow-soft flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by guest name, gift description, or ceremony..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#E8DDCF] text-xs focus:border-[#74182E] focus:outline-none"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
          className="px-3 py-2 rounded-xl border border-[#E8DDCF] text-xs font-semibold text-[#2D1B28] bg-white focus:outline-none w-full sm:w-auto"
        >
          <option value="all">All Gift Categories</option>
          <option value="Cash / Shagun">Cash / Shagun</option>
          <option value="Jewelry">Jewelry (Gold/Diamond)</option>
          <option value="Silver & Gold">Silver & Puja Heirlooms</option>
          <option value="Luxury Hamper">Luxury Hampers</option>
          <option value="Experience Voucher">Experience Vouchers</option>
          <option value="Home & Kitchen">Home & Kitchen Tableware</option>
        </select>
      </div>

      {/* Gifts Table List */}
      <div className="bg-white rounded-3xl border border-[#E8DDCF] shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF7F2] border-b border-[#E8DDCF] text-[#7D597E] uppercase text-[10px] tracking-wider font-semibold">
              <tr>
                <th className="p-4">Guest Name</th>
                <th className="p-4">Gift Received</th>
                <th className="p-4">Category</th>
                <th className="p-4">Value / Amount</th>
                <th className="p-4">Event Received</th>
                <th className="p-4">Thank You Sent?</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8DDCF]">
              {filteredGifts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-stone-500">
                    No gifts matching criteria. Click &quot;Record Gift Received&quot; to add one.
                  </td>
                </tr>
              ) : (
                filteredGifts.map(g => (
                  <tr key={g.id} className="hover:bg-[#FAF7F2]/60 transition-colors">
                    <td className="p-4">
                      <div className="font-serif font-bold text-sm text-[#2D1B28]">{g.guestName}</div>
                      <div className="text-[11px] text-[#7D597E]">{g.guestPhone || "Family Relation"}</div>
                    </td>

                    <td className="p-4">
                      <div className="font-semibold text-[#2D1B28]">{g.giftReceived}</div>
                      {g.notes && (
                        <div className="text-[10px] text-stone-500 italic mt-0.5">{g.notes}</div>
                      )}
                    </td>

                    <td className="p-4">
                      <span className="text-[10px] bg-[#FAF7F2] border border-[#E8DDCF] px-2 py-0.5 rounded-full font-medium text-[#74182E]">
                        {g.giftCategory}
                      </span>
                    </td>

                    <td className="p-4 font-mono font-bold text-sm text-[#2D1B28]">
                      {g.amount ? `₹${g.amount.toLocaleString("en-IN")}` : "—"}
                    </td>

                    <td className="p-4">
                      <div className="font-medium text-[#2D1B28]">{g.eventName}</div>
                      <div className="text-[10px] text-stone-400">{g.dateReceived}</div>
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => updateGift(g.id, { thankYouSent: !g.thankYouSent })}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold transition-colors ${
                          g.thankYouSent
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                            : "bg-amber-100 text-amber-800 border border-amber-300 hover:bg-amber-200"
                        }`}
                      >
                        {g.thankYouSent ? <CheckCircle2 className="w-3 h-3 text-emerald-600" /> : <Clock className="w-3 h-3 text-amber-600" />}
                        <span>{g.thankYouSent ? "Sent" : "Pending Nudge"}</span>
                      </button>
                    </td>

                    <td className="p-4 text-right">
                      <button
                        onClick={() => deleteGift(g.id)}
                        className="p-1.5 text-stone-400 hover:text-rose-600 transition-colors"
                        title="Delete Record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: Record Gift */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-[#E8DDCF] shadow-2xl relative">
            <h3 className="font-serif font-bold text-xl text-[#2D1B28] pb-3 mb-4 border-b border-[#E8DDCF]">
              Record New Wedding Gift
            </h3>

            <form onSubmit={handleCreateGift} className="space-y-4 text-xs">
              <div>
                <label className="block text-stone-600 font-semibold mb-1">Guest / Family Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikramaditya Singhania"
                  value={guestName}
                  onChange={e => setGuestName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DDCF] text-xs focus:border-[#74182E] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-stone-600 font-semibold mb-1">Gift Item / Description *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Gold Temple Coin 20g / Cash Shagun"
                  value={giftReceived}
                  onChange={e => setGiftReceived(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DDCF] text-xs focus:border-[#74182E] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-600 font-semibold mb-1">Category</label>
                  <select
                    value={giftCategory}
                    onChange={e => setGiftCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DDCF] text-xs focus:border-[#74182E] focus:outline-none bg-white"
                  >
                    <option value="Cash / Shagun">Cash / Shagun</option>
                    <option value="Jewelry">Jewelry</option>
                    <option value="Silver & Gold">Silver & Gold Heirlooms</option>
                    <option value="Luxury Hamper">Luxury Hamper</option>
                    <option value="Experience Voucher">Experience Voucher</option>
                    <option value="Home & Kitchen">Home & Kitchen</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-600 font-semibold mb-1">Estimated Value (₹)</label>
                  <input
                    type="number"
                    placeholder="51000"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DDCF] text-xs focus:border-[#74182E] focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-600 font-semibold mb-1">Ceremony / Occasion</label>
                <select
                  value={eventName}
                  onChange={e => setEventName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DDCF] text-xs focus:border-[#74182E] focus:outline-none bg-white"
                >
                  <option value="Sacred Muhurtham & Varmala">Sacred Muhurtham & Varmala</option>
                  <option value="The Grand Regal Reception">The Grand Regal Reception</option>
                  <option value="The Royal Sangeet">The Royal Sangeet</option>
                  <option value="Mehendi & High Tea">Mehendi & High Tea</option>
                  <option value="Haldi & Phoolon Ki Holi">Haldi & Phoolon Ki Holi</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-600 font-semibold mb-1">Personal Note / Details</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Handed to bride's mother in red velvet envelope"
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#E8DDCF] text-xs focus:border-[#74182E] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E8DDCF]">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#E8DDCF] text-stone-600 hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#74182E] text-white font-bold hover:bg-[#581223] shadow-soft"
                >
                  Save Gift Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
