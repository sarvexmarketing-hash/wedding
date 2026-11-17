"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useWedding } from "@/context/WeddingContext";
import { InvitationTemplate } from "@/lib/template-types";
import { getAllTemplates } from "@/lib/templates";
import {
  Layers,
  Sparkles,
  Eye,
  Sliders,
  CheckCircle2,
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  Search,
  ShieldAlert,
  Save,
  RotateCcw,
  Palette,
  FileCode2,
  Check
} from "lucide-react";

export default function AdminTemplatesPage() {
  const { templates, saveCustomTemplate, deleteCustomTemplate } = useWedding();
  const [templateList, setTemplateList] = useState<InvitationTemplate[]>(() =>
    templates.length > 0 ? templates : getAllTemplates()
  );
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [editingTemplate, setEditingTemplate] = useState<InvitationTemplate | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Filter templates
  const filtered = templateList.filter(t => {
    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase()) ||
      t.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
    const matchesCat = selectedCategory === "ALL" || t.category.toUpperCase() === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const categories = [
    "ALL",
    "ELEGANT",
    "ROYAL",
    "MINIMAL",
    "FLORAL",
    "LUXURY",
    "MODERN",
    "DESTINATION",
    "TRADITIONAL"
  ];

  const handleTogglePricing = (templateId: string) => {
    setTemplateList(prev =>
      prev.map(t => {
        if (t.id === templateId) {
          const updated: InvitationTemplate = {
            ...t,
            pricingType: t.pricingType === "FREE" ? "PREMIUM" : "FREE"
          };
          saveCustomTemplate(updated);
          return updated;
        }
        return t;
      })
    );
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTemplate) return;
    saveCustomTemplate(editingTemplate);
    setTemplateList(prev =>
      prev.map(t => (t.id === editingTemplate.id ? editingTemplate : t))
    );
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setEditingTemplate(null);
    }, 1200);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#2D1B28]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#C5A059] bg-[#2A1B28] px-2.5 py-0.5 rounded-full border border-[#3A2234]">
              Template Engine Schema Registry
            </span>
            <span className="text-xs text-stone-500">·</span>
            <span className="text-xs text-stone-400">8 Production Ready Schemas</span>
          </div>
          <h1 className="text-2xl font-serif font-bold text-white mt-1">
            Invitation Template Engine Studio
          </h1>
          <p className="text-xs text-stone-400">
            Control visual schemas, theme defaults, section manifests, and monetization tiers without deploying code.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/app/invitations"
            className="px-4 py-2 rounded-xl bg-[#211520] text-[#E1CD98] text-xs font-semibold border border-[#3A2234] hover:bg-[#2D1B28] transition-colors flex items-center gap-2"
          >
            <span>Open Couple Studio</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between bg-[#160E15] p-4 rounded-2xl border border-[#2D1B28]">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search templates by name, style, or tag..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-[#211520] border border-[#3A2234] rounded-xl pl-10 pr-4 py-2 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-[#C5A059]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-[#74182E] text-white border border-[#91253E]"
                  : "bg-[#211520] text-stone-400 hover:text-white border border-[#3A2234]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map(template => (
          <div
            key={template.id}
            className="bg-[#160E15] rounded-2xl border border-[#2D1B28] overflow-hidden flex flex-col justify-between hover:border-[#C5A059]/60 transition-all group"
          >
            <div>
              {/* Image Preview with Badge */}
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-900">
                <img
                  src={template.previewImage}
                  alt={template.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider font-mono border ${
                      template.pricingType === "PREMIUM"
                        ? "bg-[#C5A059] text-black border-[#DFC38E]"
                        : "bg-emerald-800/80 text-emerald-200 border-emerald-600"
                    }`}
                  >
                    {template.pricingType}
                  </span>
                  {template.isAnimated && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#74182E]/90 text-white border border-[#91253E] flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5 text-[#E1CD98]" /> Animated
                    </span>
                  )}
                </div>

                <div className="absolute bottom-2.5 left-2.5 right-2.5">
                  <div className="text-[10px] uppercase tracking-wider text-[#C5A059] font-bold">
                    {template.category}
                  </div>
                  <div className="text-base font-serif font-bold text-white truncate">
                    {template.name}
                  </div>
                </div>
              </div>

              {/* Template Attributes */}
              <div className="p-4 space-y-3">
                <p className="text-[11px] text-stone-400 line-clamp-2 leading-relaxed">
                  {template.description}
                </p>

                {/* Theme Palette Swatches */}
                <div className="pt-2 border-t border-[#2D1B28] flex items-center justify-between text-[11px]">
                  <span className="text-stone-500 font-mono">Palette:</span>
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-4 h-4 rounded-full border border-white/20 shadow-sm"
                      style={{ backgroundColor: template.theme.backgroundColor }}
                      title={`Background: ${template.theme.backgroundColor}`}
                    />
                    <span
                      className="w-4 h-4 rounded-full border border-white/20 shadow-sm"
                      style={{ backgroundColor: template.theme.primaryColor }}
                      title={`Primary: ${template.theme.primaryColor}`}
                    />
                    <span
                      className="w-4 h-4 rounded-full border border-white/20 shadow-sm"
                      style={{ backgroundColor: template.theme.accentColor }}
                      title={`Accent: ${template.theme.accentColor}`}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-stone-400 font-mono">
                  <span>Version: v{template.version}</span>
                  <span>Sections: {template.sections.filter(s => s.enabled).length}</span>
                </div>
              </div>
            </div>

            {/* Admin Actions */}
            <div className="p-3 bg-[#1B111A] border-t border-[#2D1B28] grid grid-cols-2 gap-2">
              <button
                onClick={() => setEditingTemplate(template)}
                className="py-1.5 px-2 rounded-lg bg-[#261824] hover:bg-[#322030] text-stone-200 text-xs font-semibold border border-[#3A2234] flex items-center justify-center gap-1.5 transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Edit Schema</span>
              </button>

              <button
                onClick={() => handleTogglePricing(template.id)}
                className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-colors flex items-center justify-center gap-1 ${
                  template.pricingType === "FREE"
                    ? "bg-[#C5A059]/20 hover:bg-[#C5A059]/30 text-[#E1CD98] border-[#C5A059]/50"
                    : "bg-emerald-950/40 hover:bg-emerald-900/40 text-emerald-300 border-emerald-800"
                }`}
              >
                <span>Make {template.pricingType === "FREE" ? "Premium" : "Free"}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* SCHEMA EDITOR MODAL */}
      {editingTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-[#160E15] rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-[#3A2234] shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#2D1B28]">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#C5A059]">
                  Edit Template Schema
                </span>
                <h3 className="text-xl font-serif font-bold text-white">
                  {editingTemplate.name} ({editingTemplate.id})
                </h3>
              </div>
              <button
                onClick={() => setEditingTemplate(null)}
                className="p-1 rounded-full text-stone-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 py-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-400 font-semibold mb-1">Template Name</label>
                  <input
                    type="text"
                    value={editingTemplate.name}
                    onChange={e => setEditingTemplate({ ...editingTemplate, name: e.target.value })}
                    className="w-full bg-[#211520] border border-[#3A2234] rounded-xl px-3 py-2 text-stone-200 focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
                <div>
                  <label className="block text-stone-400 font-semibold mb-1">Category</label>
                  <input
                    type="text"
                    value={editingTemplate.category}
                    onChange={e => setEditingTemplate({ ...editingTemplate, category: e.target.value as any })}
                    className="w-full bg-[#211520] border border-[#3A2234] rounded-xl px-3 py-2 text-stone-200 focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-400 font-semibold mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editingTemplate.description}
                  onChange={e => setEditingTemplate({ ...editingTemplate, description: e.target.value })}
                  className="w-full bg-[#211520] border border-[#3A2234] rounded-xl px-3 py-2 text-stone-200 focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="pt-2 border-t border-[#2D1B28]">
                <div className="font-serif font-bold text-sm text-[#C5A059] mb-3">Theme Color Tokens</div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-stone-400 text-[11px] mb-1">Background Color</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={editingTemplate.theme.backgroundColor}
                        onChange={e =>
                          setEditingTemplate({
                            ...editingTemplate,
                            theme: { ...editingTemplate.theme, backgroundColor: e.target.value }
                          })
                        }
                        className="w-8 h-8 rounded border border-[#3A2234] cursor-pointer"
                      />
                      <span className="font-mono text-stone-300">{editingTemplate.theme.backgroundColor}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-stone-400 text-[11px] mb-1">Primary Color</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={editingTemplate.theme.primaryColor}
                        onChange={e =>
                          setEditingTemplate({
                            ...editingTemplate,
                            theme: { ...editingTemplate.theme, primaryColor: e.target.value }
                          })
                        }
                        className="w-8 h-8 rounded border border-[#3A2234] cursor-pointer"
                      />
                      <span className="font-mono text-stone-300">{editingTemplate.theme.primaryColor}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-stone-400 text-[11px] mb-1">Accent Gold Color</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={editingTemplate.theme.accentColor}
                        onChange={e =>
                          setEditingTemplate({
                            ...editingTemplate,
                            theme: { ...editingTemplate.theme, accentColor: e.target.value }
                          })
                        }
                        className="w-8 h-8 rounded border border-[#3A2234] cursor-pointer"
                      />
                      <span className="font-mono text-stone-300">{editingTemplate.theme.accentColor}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-[#2D1B28] flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer text-stone-300">
                    <input
                      type="checkbox"
                      checked={editingTemplate.isAnimated}
                      onChange={e =>
                        setEditingTemplate({ ...editingTemplate, isAnimated: e.target.checked })
                      }
                      className="rounded border-[#3A2234] text-[#74182E]"
                    />
                    <span>Animated Micro-interactions</span>
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingTemplate(null)}
                    className="px-4 py-2 rounded-xl bg-[#211520] text-stone-400 text-xs hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#74182E] text-white font-semibold text-xs hover:bg-[#91253E] transition-colors flex items-center gap-2 shadow-lg"
                  >
                    {saveSuccess ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>Saved Schema!</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 text-[#E1CD98]" />
                        <span>Save Changes</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}