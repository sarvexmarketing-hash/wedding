"use client";

import React, { useState } from "react";
import { useWedding } from "@/context/WeddingContext";
import { GuestSide, FoodPreference, GuestTag } from "@/lib/types";
import { X, UserPlus, Upload, FileText, Check } from "lucide-react";

export function AddGuestModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { addGuest, events } = useWedding();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [side, setSide] = useState<GuestSide>("bride");
  const [relation, setRelation] = useState("College Friend");
  const [tag, setTag] = useState<GuestTag>("VIP");
  const [familyName, setFamilyName] = useState("");
  const [foodPreference, setFoodPreference] = useState<FoodPreference>("Vegetarian");
  const [tableNumber, setTableNumber] = useState("Table A12");
  const [parkingSlot, setParkingSlot] = useState("P3");
  const [arrivalTime, setArrivalTime] = useState("7:30 PM");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addGuest({
      name,
      phone: phone || "+91 98000 00000",
      email: email || `${name.toLowerCase().replace(/\s+/g, ".")}@example.com`,
      side,
      relation,
      tags: [tag],
      familyName: familyName.trim() || undefined,
      rsvpStatus: "pending",
      eventsAttending: ["evt-wedding", "evt-reception"],
      foodPreference,
      tableNumber,
      parkingSlot,
      arrivalTime,
      transportPickup: false
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-3xl p-6 max-w-lg w-full border border-[#E8DDCF] shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 pb-3 mb-4 border-b border-[#E8DDCF]">
          <UserPlus className="w-5 h-5 text-[#74182E]" />
          <h3 className="font-serif font-bold text-lg text-[#2D1B28]">Add New Guest to CRM</h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-stone-600 font-semibold mb-1">Full Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Vikramaditya Singhania"
              className="w-full px-3 py-2 rounded-xl border border-[#E8DDCF] text-sm focus:border-[#74182E] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-stone-600 font-semibold mb-1">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+91 98..."
                className="w-full px-3 py-2 rounded-xl border border-[#E8DDCF] text-sm focus:border-[#74182E] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-stone-600 font-semibold mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="guest@domain.com"
                className="w-full px-3 py-2 rounded-xl border border-[#E8DDCF] text-sm focus:border-[#74182E] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-stone-600 font-semibold mb-1">Side</label>
              <select
                value={side}
                onChange={e => setSide(e.target.value as GuestSide)}
                className="w-full px-3 py-2 rounded-xl border border-[#E8DDCF] text-xs focus:border-[#74182E] focus:outline-none bg-white"
              >
                <option value="bride">Bride&apos;s Side</option>
                <option value="groom">Groom&apos;s Side</option>
                <option value="mutual">Mutual</option>
              </select>
            </div>
            <div>
              <label className="block text-stone-600 font-semibold mb-1">Relation</label>
              <input
                type="text"
                value={relation}
                onChange={e => setRelation(e.target.value)}
                placeholder="College friend"
                className="w-full px-3 py-2 rounded-xl border border-[#E8DDCF] text-xs focus:border-[#74182E] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-stone-600 font-semibold mb-1">Tag</label>
              <select
                value={tag}
                onChange={e => setTag(e.target.value as GuestTag)}
                className="w-full px-3 py-2 rounded-xl border border-[#E8DDCF] text-xs focus:border-[#74182E] focus:outline-none bg-white"
              >
                <option value="VIP">VIP</option>
                <option value="Family">Family</option>
                <option value="College Friend">College Friend</option>
                <option value="Relative">Relative</option>
                <option value="Colleague">Colleague</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-stone-600 font-semibold mb-1">Family Group (Optional)</label>
              <input
                type="text"
                value={familyName}
                onChange={e => setFamilyName(e.target.value)}
                placeholder="e.g. Singhania Family"
                className="w-full px-3 py-2 rounded-xl border border-[#E8DDCF] text-xs focus:border-[#74182E] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-stone-600 font-semibold mb-1">Food Preference</label>
              <select
                value={foodPreference}
                onChange={e => setFoodPreference(e.target.value as FoodPreference)}
                className="w-full px-3 py-2 rounded-xl border border-[#E8DDCF] text-xs focus:border-[#74182E] focus:outline-none bg-white"
              >
                <option value="Vegetarian">Vegetarian</option>
                <option value="Non-Vegetarian">Non-Vegetarian</option>
                <option value="Jain">Jain</option>
                <option value="Vegan">Vegan</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-stone-600 font-semibold mb-1">Table Allotment</label>
              <input
                type="text"
                value={tableNumber}
                onChange={e => setTableNumber(e.target.value)}
                placeholder="Table A12"
                className="w-full px-3 py-2 rounded-xl border border-[#E8DDCF] text-xs focus:border-[#74182E] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-stone-600 font-semibold mb-1">Parking Slot</label>
              <input
                type="text"
                value={parkingSlot}
                onChange={e => setParkingSlot(e.target.value)}
                placeholder="P3"
                className="w-full px-3 py-2 rounded-xl border border-[#E8DDCF] text-xs focus:border-[#74182E] focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E8DDCF]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-[#E8DDCF] text-stone-600 hover:bg-stone-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-[#74182E] text-white font-semibold hover:bg-[#581223] shadow-soft"
            >
              Add Guest & Generate Pass
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function ImportCsvModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { importCsvGuests } = useWedding();
  const [csvContent, setCsvContent] = useState(`Name,Side,Phone,Dietary,Relation
Ramesh Patel,Groom,+91 98200 11999,Vegetarian,Uncle
Sunita Patel,Groom,+91 98200 11998,Vegetarian,Aunt
Anand Joshi,Bride,+91 97100 22334,Jain,Family Friend
Dr. Shalini Rao,Bride,+91 98450 44556,Vegetarian,Pediatrician & Family`);

  const [resultMsg, setResultMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleImport = () => {
    const res = importCsvGuests(csvContent);
    if (res.added > 0) {
      setResultMsg(`Successfully imported ${res.added} guests into the live CRM!`);
      setTimeout(() => {
        setResultMsg(null);
        onClose();
      }, 1400);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-3xl p-6 max-w-lg w-full border border-[#E8DDCF] shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 pb-3 mb-4 border-b border-[#E8DDCF]">
          <Upload className="w-5 h-5 text-[#74182E]" />
          <h3 className="font-serif font-bold text-lg text-[#2D1B28]">Import Guests via CSV / Excel</h3>
        </div>

        <div className="space-y-4 text-xs text-[#4D334E]">
          <p>
            Paste your guest list below or edit the sample. The system parses names, bride/groom sides, phone numbers, and dietary requirements automatically.
          </p>

          <textarea
            rows={6}
            value={csvContent}
            onChange={e => setCsvContent(e.target.value)}
            className="w-full p-3 font-mono text-xs rounded-xl border border-[#E8DDCF] bg-[#FAF7F2] focus:border-[#74182E] focus:outline-none"
          />

          {resultMsg && (
            <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>{resultMsg}</span>
            </div>
          )}

          <div className="flex items-center justify-between pt-2 border-t border-[#E8DDCF]">
            <span className="text-[11px] text-stone-500">Supports standard CSV exports from Excel & Sheets</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-[#E8DDCF] text-stone-600 hover:bg-stone-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleImport}
                className="px-5 py-2 rounded-xl bg-[#74182E] text-white font-semibold hover:bg-[#581223] shadow-soft"
              >
                Run CSV Import
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
