"use client";

import React, { useState, useMemo } from "react";
import {
  InvitationTemplate,
  TemplateCategory,
  TemplateStyle
} from "@/lib/template-types";
import { getAllTemplates } from "@/lib/templates";
import {
  Sparkles,
  Search,
  Filter,
  Check,
  Eye,
  Crown,
  Play,
  Layers,
  ArrowRight,
  X
} from "lucide-react";
import { TemplateRenderer } from "./TemplateRenderer";
import { createDefaultWeddingData } from "@/lib/templates";
import { initialWedding, initialEvents } from "@/lib/mock-data";

interface TemplateGalleryProps {
  activeTemplateId?: string;
  onSelectTemplate: (templateId: string) => void;
}

export function TemplateGallery({
  activeTemplateId = "luxury-gold-001",
  onSelectTemplate
}: TemplateGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory>("All");
  const [selectedStyle, setSelectedStyle] = useState<string>("all");
  const [selectedPricing, setSelectedPricing] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [previewTemplate, setPreviewTemplate] = useState<InvitationTemplate | null>(null);

  const allTemplates = useMemo(() => getAllTemplates(), []);

  const categories: TemplateCategory[] = [
    "All",
    "Luxury",
    "Royal",
    "Minimal",
    "Floral",
    "Dark",
    "Photo-focused",
    "Destination",
    "Traditional",
    "Animated"
  ];

  const filteredTemplates = useMemo(() => {
    return allTemplates.filter(tmpl => {
      // Category filter
      if (selectedCategory !== "All") {
        if (selectedCategory === "Animated") {
          if (!tmpl.isAnimated) return false;
        } else if (tmpl.category !== selectedCategory) {
          return false;
        }
      }

      // Style filter
      if (selectedStyle !== "all" && tmpl.style !== selectedStyle) {
        return false;
      }

      // Pricing filter
      if (selectedPricing !== "all" && tmpl.pricingType !== selectedPricing) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = tmpl.name.toLowerCase().includes(q);
        const matchesCategory = tmpl.category.toLowerCase().includes(q);
        const matchesTags = tmpl.tags.some(tag => tag.toLowerCase().includes(q));
        if (!matchesName && !matchesCategory && !matchesTags) return false;
      }

      return true;
    });
  }, [allTemplates, selectedCategory, selectedStyle, selectedPricing, searchQuery]);

  const sampleWeddingData = useMemo(() => {
    return createDefaultWeddingData(initialWedding, initialEvents);
  }, []);

  return (
    <div className="space-y-6">
      {/* Search and Primary Category Pills */}
      <div className="space-y-3">
        {/* Search & Count */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by aesthetic, color, or vibe..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-[#E8DDCF] text-xs text-[#2D1B28] placeholder:text-stone-400 focus:outline-none focus:border-[#74182E] shadow-soft-sm"
            />
          </div>

          <div className="flex items-center gap-2">
            {/* Style Dropdown */}
            <select
              value={selectedStyle}
              onChange={e => setSelectedStyle(e.target.value)}
              className="px-3 py-2 rounded-xl bg-white border border-[#E8DDCF] text-xs text-[#2D1B28] focus:outline-none shadow-soft-sm"
            >
              <option value="all">All Styles</option>
              <option value="luxury">Luxury & Gold</option>
              <option value="royal">Royal Indian</option>
              <option value="minimal">Minimalist</option>
              <option value="floral">Romantic Floral</option>
              <option value="modern">Modern Editorial</option>
              <option value="traditional">Vedic Traditional</option>
            </select>

            {/* Pricing Dropdown */}
            <select
              value={selectedPricing}
              onChange={e => setSelectedPricing(e.target.value)}
              className="px-3 py-2 rounded-xl bg-white border border-[#E8DDCF] text-xs text-[#2D1B28] focus:outline-none shadow-soft-sm"
            >
              <option value="all">Free & Premium</option>
              <option value="FREE">Free Tier</option>
              <option value="PREMIUM">Premium Exclusive</option>
            </select>
          </div>
        </div>

        {/* Category Pills Strip */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-[#74182E] text-white shadow-soft"
                  : "bg-white text-[#7D597E] border border-[#E8DDCF] hover:bg-[#FAF7F2] hover:text-[#2D1B28]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredTemplates.map(tmpl => {
          const isActive = tmpl.id === activeTemplateId;

          return (
            <div
              key={tmpl.id}
              className={`rounded-3xl bg-white border overflow-hidden flex flex-col justify-between transition-all duration-300 group hover:shadow-soft-xl hover:-translate-y-1 ${
                isActive
                  ? "border-[#74182E] ring-2 ring-[#74182E]/30 shadow-soft-lg"
                  : "border-[#E8DDCF] shadow-soft"
              }`}
            >
              {/* Image Preview & Badges */}
              <div className="relative aspect-[4/5] bg-stone-100 overflow-hidden cursor-pointer"
                onClick={() => setPreviewTemplate(tmpl)}>
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${tmpl.previewImage}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                {/* Top badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-[#2D1B28] shadow-sm">
                    {tmpl.category}
                  </span>

                  <div className="flex items-center gap-1">
                    {tmpl.isAnimated && (
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-black/60 text-[#E1CD98] backdrop-blur-md flex items-center gap-1">
                        <Play className="w-2.5 h-2.5 fill-current" /> Animated
                      </span>
                    )}

                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full backdrop-blur-md ${
                        tmpl.pricingType === "PREMIUM"
                          ? "bg-[#C5A059] text-white shadow-sm flex items-center gap-0.5"
                          : "bg-emerald-700 text-white shadow-sm"
                      }`}
                    >
                      {tmpl.pricingType === "PREMIUM" ? (
                        <>
                          <Crown className="w-2.5 h-2.5" /> Premium
                        </>
                      ) : (
                        "Free"
                      )}
                    </span>
                  </div>
                </div>

                {/* Bottom preview overlay title */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="text-lg font-serif font-bold drop-shadow-sm">{tmpl.name}</div>
                  <div className="text-[11px] text-stone-200 line-clamp-1">{tmpl.description}</div>
                </div>

                {/* Hover Quick Preview Button */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreviewTemplate(tmpl);
                    }}
                    className="px-4 py-2 rounded-full bg-white text-[#2D1B28] text-xs font-bold shadow-soft flex items-center gap-1.5 hover:scale-105 transition-transform"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#74182E]" />
                    <span>Live Preview</span>
                  </button>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-4 space-y-3 bg-white">
                <div className="flex items-center justify-between text-xs text-[#7D597E]">
                  <div className="flex items-center gap-1">
                    <span
                      className="w-3 h-3 rounded-full border"
                      style={{ backgroundColor: tmpl.theme.primaryColor }}
                    />
                    <span
                      className="w-3 h-3 rounded-full border"
                      style={{ backgroundColor: tmpl.theme.accentColor }}
                    />
                    <span
                      className="w-3 h-3 rounded-full border"
                      style={{ backgroundColor: tmpl.theme.backgroundColor }}
                    />
                  </div>

                  <span className="text-[11px] font-mono">v{tmpl.version}.0</span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setPreviewTemplate(tmpl)}
                    className="py-2 px-3 rounded-xl border border-[#E8DDCF] bg-[#FAF7F2] text-[#2D1B28] text-xs font-semibold hover:bg-[#F3ECE1] transition-colors flex items-center justify-center gap-1"
                  >
                    <Eye className="w-3 h-3 text-[#7D597E]" /> Preview
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelectTemplate(tmpl.id)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold shadow-soft transition-all flex items-center justify-center gap-1 ${
                      isActive
                        ? "bg-emerald-700 text-white font-bold"
                        : "bg-[#74182E] text-white hover:bg-[#581223]"
                    }`}
                  >
                    {isActive ? (
                      <>
                        <Check className="w-3 h-3" /> Selected
                      </>
                    ) : (
                      <>
                        <span>Use This</span>
                        <ArrowRight className="w-3 h-3" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* LIVE FULLSCREEN TEMPLATE PREVIEW MODAL */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-2 sm:p-6 animate-fade-in">
          <div className="bg-[#FAF7F2] rounded-3xl w-full max-w-4xl h-[92vh] flex flex-col overflow-hidden border border-[#C5A059] shadow-2xl relative">
            {/* Modal Top Bar */}
            <div className="p-4 px-6 bg-white border-b border-[#E8DDCF] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#74182E] text-white flex items-center justify-center font-serif font-bold text-xs">
                  {previewTemplate.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-[#2D1B28]">
                    {previewTemplate.name}
                  </h3>
                  <div className="text-[11px] text-[#7D597E]">
                    Category: {previewTemplate.category} · {previewTemplate.pricingType}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onSelectTemplate(previewTemplate.id);
                    setPreviewTemplate(null);
                  }}
                  className="px-5 py-2 rounded-full bg-[#74182E] hover:bg-[#581223] text-white text-xs font-semibold shadow-soft flex items-center gap-1.5 transition-colors"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Use This Template</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPreviewTemplate(null)}
                  className="p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Preview Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex justify-center bg-stone-100">
              <div className="w-full max-w-2xl shadow-xl rounded-3xl overflow-hidden bg-white">
                <TemplateRenderer
                  data={sampleWeddingData}
                  template={previewTemplate}
                  deviceMode="tablet"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
