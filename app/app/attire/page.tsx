"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useWedding } from "@/context/WeddingContext";
import { AttireRecommendation } from "@/lib/types";
import {
  Shirt,
  Sparkles,
  Save,
  Check,
  Edit2,
  Calendar,
  AlertCircle,
  Eye,
  ExternalLink
} from "lucide-react";

export default function SmartAttireGuidePage() {
  const { attireList, updateAttire, wedding, events } = useWedding();
  const [selectedEventId, setSelectedEventId] = useState<string>(attireList[0]?.eventId || "evt-haldi");
  const [editingAttire, setEditingAttire] = useState<AttireRecommendation>(attireList[0]);
  const [saved, setSaved] = useState(false);

  const activeAttire = attireList.find(a => a.eventId === selectedEventId) || attireList[0];

  const handleSelectEvent = (id: string) => {
    setSelectedEventId(id);
    const found = attireList.find(a => a.eventId === id) || attireList[0];
    setEditingAttire(found);
    setSaved(false);
  };

  const handleSaveAttire = (e: React.FormEvent) => {
    e.preventDefault();
    updateAttire(selectedEventId, editingAttire);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E8DDCF]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold tracking-wider text-[#74182E] bg-[#74182E]/10 px-2.5 py-0.5 rounded-full">
              Guest Experience
            </span>
            <span className="text-xs font-bold text-[#C5A059]">Attire Intelligence</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D1B28] mt-1">
            Smart Attire Recommendations (&quot;What Should I Wear?&quot;)
          </h1>
          <p className="text-xs text-[#7D597E]">
            Provide guests with curated fashion guidelines, palette swatches, and cultural advice for each wedding celebration.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/invite/${wedding.slug}#attire`}
            target="_blank"
            className="px-3.5 py-2 rounded-xl bg-white border border-[#E8DDCF] text-xs font-semibold text-[#2D1B28] hover:bg-[#FAF7F2] transition-colors flex items-center gap-1.5 shadow-soft-sm"
          >
            <span>Preview in Guest Invitation</span>
            <ExternalLink className="w-3.5 h-3.5 text-stone-500" />
          </Link>
        </div>
      </div>

      {/* Event Selector Navigation Pills */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {attireList.map(a => (
          <button
            key={a.eventId}
            onClick={() => handleSelectEvent(a.eventId)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 ${
              selectedEventId === a.eventId
                ? "bg-[#74182E] text-white shadow-soft"
                : "bg-white text-[#4D334E] border border-[#E8DDCF] hover:bg-[#FAF7F2]"
            }`}
          >
            <Shirt className="w-3.5 h-3.5" />
            <span>{a.eventName}</span>
          </button>
        ))}
      </div>

      {/* Main Grid: Live Guest Preview Card + Couple Customization Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 6 cols: Live Guest Guide Card */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DDCF] shadow-soft space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8DDCF]">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#74182E]">
                Guest Facing View
              </span>
              <h3 className="font-serif font-bold text-xl text-[#2D1B28] mt-0.5">
                {activeAttire.eventName}
              </h3>
            </div>
            <span className="text-xs bg-[#FAF7F2] text-[#74182E] font-semibold px-2.5 py-1 rounded-full border border-[#E8DDCF]">
              {activeAttire.vibeTitle}
            </span>
          </div>

          <p className="text-xs text-[#654566] leading-relaxed italic bg-[#FAF7F2] p-3.5 rounded-2xl border border-[#E8DDCF]">
            &ldquo;{activeAttire.general}&rdquo;
          </p>

          {/* Gender / Silhouette Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
            <div className="p-4 rounded-2xl bg-white border border-[#E8DDCF] space-y-2">
              <div className="font-serif font-bold text-sm text-[#74182E] flex items-center gap-1.5">
                <span>Women&apos;s Attire</span>
              </div>
              <p className="text-[#4D334E] leading-relaxed text-[11px]">
                {activeAttire.women}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#E8DDCF] space-y-2">
              <div className="font-serif font-bold text-sm text-[#C5A059] flex items-center gap-1.5">
                <span>Men&apos;s Attire</span>
              </div>
              <p className="text-[#4D334E] leading-relaxed text-[11px]">
                {activeAttire.men}
              </p>
            </div>
          </div>

          {/* Recommended Colors & Avoid Colors */}
          <div className="space-y-3 pt-2 border-t border-[#E8DDCF]">
            <div>
              <div className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider mb-1.5">
                Recommended Color Palette:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {activeAttire.recommendedColors.map((color, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-medium"
                  >
                    ✓ {color}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[10px] uppercase font-bold text-rose-800 tracking-wider mb-1.5">
                Colors to Avoid:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {activeAttire.avoidColors.map((color, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-full bg-rose-50 text-rose-900 border border-rose-200 text-xs font-medium"
                  >
                    ✕ {color}
                  </span>
                ))}
              </div>
            </div>

            {activeAttire.styleTips && (
              <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200 text-xs text-amber-900 mt-2">
                <strong>Host Tip:</strong> {activeAttire.styleTips}
              </div>
            )}
          </div>
        </div>

        {/* Right 6 cols: Couple Customization Form */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DDCF] shadow-soft space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8DDCF]">
            <h3 className="font-serif font-bold text-base text-[#2D1B28] flex items-center gap-2">
              <Edit2 className="w-4 h-4 text-[#74182E]" /> Customize Dress Code for {activeAttire.eventName}
            </h3>
            {saved && (
              <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Saved to guest passes!
              </span>
            )}
          </div>

          <form onSubmit={handleSaveAttire} className="space-y-4 text-xs">
            <div>
              <label className="block text-stone-600 font-semibold mb-1">Event Vibe Tagline</label>
              <input
                type="text"
                value={editingAttire.vibeTitle}
                onChange={e => setEditingAttire({ ...editingAttire, vibeTitle: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-[#E8DDCF] text-xs focus:border-[#74182E] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-stone-600 font-semibold mb-1">General Attire Advice</label>
              <textarea
                rows={2}
                value={editingAttire.general}
                onChange={e => setEditingAttire({ ...editingAttire, general: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-[#E8DDCF] text-xs focus:border-[#74182E] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-stone-600 font-semibold mb-1">Women&apos;s Recommendation</label>
              <textarea
                rows={2}
                value={editingAttire.women}
                onChange={e => setEditingAttire({ ...editingAttire, women: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-[#E8DDCF] text-xs focus:border-[#74182E] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-stone-600 font-semibold mb-1">Men&apos;s Recommendation</label>
              <textarea
                rows={2}
                value={editingAttire.men}
                onChange={e => setEditingAttire({ ...editingAttire, men: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-[#E8DDCF] text-xs focus:border-[#74182E] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-stone-600 font-semibold mb-1">
                Recommended Colors (comma separated)
              </label>
              <input
                type="text"
                value={editingAttire.recommendedColors.join(", ")}
                onChange={e =>
                  setEditingAttire({
                    ...editingAttire,
                    recommendedColors: e.target.value.split(",").map(c => c.trim()).filter(Boolean)
                  })
                }
                className="w-full px-3 py-2 rounded-xl border border-[#E8DDCF] text-xs focus:border-[#74182E] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-stone-600 font-semibold mb-1">
                Colors to Avoid (comma separated)
              </label>
              <input
                type="text"
                value={editingAttire.avoidColors.join(", ")}
                onChange={e =>
                  setEditingAttire({
                    ...editingAttire,
                    avoidColors: e.target.value.split(",").map(c => c.trim()).filter(Boolean)
                  })
                }
                className="w-full px-3 py-2 rounded-xl border border-[#E8DDCF] text-xs focus:border-[#74182E] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-stone-600 font-semibold mb-1">Footwear / Practical Style Tip</label>
              <input
                type="text"
                value={editingAttire.styleTips}
                onChange={e => setEditingAttire({ ...editingAttire, styleTips: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-[#E8DDCF] text-xs focus:border-[#74182E] focus:outline-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-full bg-[#74182E] text-white font-bold text-xs hover:bg-[#581223] transition-colors shadow-soft flex items-center justify-center gap-1.5"
              >
                <Save className="w-4 h-4 text-[#E1CD98]" /> Save Attire Guidelines
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
