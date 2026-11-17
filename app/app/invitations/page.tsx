"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useWedding } from "@/context/WeddingContext";
import {
  Sparkles,
  Layout,
  Palette,
  Eye,
  Share2,
  Copy,
  Check,
  ExternalLink,
  Smartphone,
  Tablet,
  Monitor,
  Save,
  Globe,
  Upload,
  Plus,
  Trash2,
  Calendar,
  MapPin,
  Clock,
  Heart,
  QrCode,
  CheckCircle2,
  AlertCircle,
  Layers,
  ArrowRight,
  Settings,
  MessageCircle,
  Sliders,
  X
} from "lucide-react";
import { TemplateGallery } from "@/components/invitation-engine/TemplateGallery";
import { TemplateRenderer } from "@/components/invitation-engine/TemplateRenderer";

export default function InvitationStudioPage() {
  const {
    wedding,
    guests,
    recordInvitationSent,
    selectedTemplate,
    selectedTemplateId,
    invitationData,
    selectTemplate,
    updateInvitationData,
    publishInvitation,
    unpublishInvitation,
    submitGuestRsvp
  } = useWedding();

  const [selectedGuestForShare, setSelectedGuestForShare] = useState<string>("");
  const [guestSearchQuery, setGuestSearchQuery] = useState("");

  // Navigation tab: 'gallery' | 'editor' | 'share'
  const [activeTab, setActiveTab] = useState<"gallery" | "editor" | "share">("editor");

  // Editor Sub-tabs for content navigation
  const [contentTab, setContentTab] = useState<
    "couple" | "wedding" | "events" | "story" | "gallery" | "venue" | "family" | "rsvp" | "additional"
  >("couple");

  // Device mode for center live preview
  const [deviceMode, setDeviceMode] = useState<"mobile" | "tablet" | "desktop">("mobile");

  // Publishing & Slug states
  const [slugInput, setSlugInput] = useState(invitationData.slug || wedding.slug);
  const [publishModalOpen, setPublishModalOpen] = useState(false);
  const [publishStatusMessage, setPublishStatusMessage] = useState<{ success?: boolean; text: string } | null>(null);
  const [savedFeedback, setSavedFeedback] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  // Switch Template Modal
  const [switchTemplateModalOpen, setSwitchTemplateModalOpen] = useState(false);

  const shareableUrl = typeof window !== "undefined"
    ? `${window.location.origin}/invite/${invitationData.slug || wedding.slug}`
    : `https://weddingos.com/invite/${invitationData.slug || wedding.slug}`;

  const handleSaveDraft = () => {
    updateInvitationData({
      status: "draft"
    });
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 2000);
  };

  const handlePublishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = publishInvitation(slugInput);
    if (!res.success) {
      setPublishStatusMessage({ success: false, text: res.error || "Slug is invalid." });
    } else {
      setPublishStatusMessage({
        success: true,
        text: `Your invitation is live at /invite/${res.slug}! All guest RSVPs will now sync to your dashboard.`
      });
      setTimeout(() => {
        setPublishModalOpen(false);
        setActiveTab("share");
      }, 1500);
    }
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(shareableUrl);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    }
  };

  const handleAddNewEvent = () => {
    const newEvent = {
      id: `evt-custom-${Date.now()}`,
      name: "New Ceremony",
      date: invitationData.wedding.weddingDate || "12 Dec 2026",
      startTime: "5:00 PM",
      endTime: "8:00 PM",
      venue: invitationData.venue.venueName || "Palace Grounds",
      address: invitationData.venue.address || "Hyderabad",
      description: "Celebrating together with traditional music, blessings, and dinner feast.",
      dressCode: "Ethnic Formal / Traditional",
      mapUrl: invitationData.venue.googleMapsLink
    };

    updateInvitationData({
      events: [...invitationData.events, newEvent]
    });
  };

  const handleDeleteEvent = (eventId: string) => {
    updateInvitationData({
      events: invitationData.events.filter(e => e.id !== eventId)
    });
  };

  const handleAddGalleryPhoto = () => {
    const newPhoto = {
      id: `img-${Date.now()}`,
      url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
      caption: "New Pre-Wedding Portrait",
      order: invitationData.gallery.length + 1
    };
    updateInvitationData({
      gallery: [...invitationData.gallery, newPhoto]
    });
  };

  const handleDeletePhoto = (photoId: string) => {
    updateInvitationData({
      gallery: invitationData.gallery.filter(p => p.id !== photoId)
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Studio Top Navigation & Global Action Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-[#E8DDCF]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold tracking-wider text-[#74182E]">
              Dynamic Template Engine
            </span>
            <span className="text-stone-300">·</span>
            <span
              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                invitationData.status === "published"
                  ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                  : "bg-amber-100 text-amber-800 border border-amber-300"
              }`}
            >
              {invitationData.status === "published" ? "Live Published" : "Draft Mode"}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D1B28] mt-0.5">
            Wedding Invitation Studio
          </h1>
          <p className="text-xs text-[#7D597E]">
            Selected Template: <strong className="text-[#2D1B28]">{selectedTemplate.name}</strong> ({selectedTemplate.category}) · Switch templates anytime with zero content loss.
          </p>
        </div>

        {/* Global Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Main View Tabs */}
          <div className="flex items-center bg-white p-1 rounded-xl border border-[#E8DDCF] shadow-soft-sm">
            <button
              type="button"
              onClick={() => setActiveTab("gallery")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "gallery"
                  ? "bg-[#74182E] text-white shadow-soft"
                  : "text-[#7D597E] hover:text-[#2D1B28]"
              }`}
            >
              Template Gallery
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("editor")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "editor"
                  ? "bg-[#74182E] text-white shadow-soft"
                  : "text-[#7D597E] hover:text-[#2D1B28]"
              }`}
            >
              Live Editor
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("share")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "share"
                  ? "bg-[#74182E] text-white shadow-soft"
                  : "text-[#7D597E] hover:text-[#2D1B28]"
              }`}
            >
              Share & QR Pass
            </button>
          </div>

          {/* Quick Actions */}
          <button
            type="button"
            onClick={handleSaveDraft}
            className="px-3.5 py-2 rounded-xl bg-white border border-[#E8DDCF] text-xs font-semibold text-[#2D1B28] hover:bg-[#FAF7F2] transition-colors flex items-center gap-1.5 shadow-soft-sm"
          >
            {savedFeedback ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Save className="w-3.5 h-3.5 text-[#74182E]" />}
            <span>{savedFeedback ? "Draft Saved!" : "Save Draft"}</span>
          </button>

          <Link
            href={`/invite/${invitationData.slug || wedding.slug}`}
            target="_blank"
            className="px-3.5 py-2 rounded-xl bg-white border border-[#E8DDCF] text-xs font-semibold text-[#2D1B28] hover:bg-[#FAF7F2] transition-colors flex items-center gap-1.5 shadow-soft-sm"
          >
            <Eye className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Public Preview</span>
          </Link>

          <button
            type="button"
            onClick={() => {
              setPublishStatusMessage(null);
              setPublishModalOpen(true);
            }}
            className="px-4 py-2 rounded-xl bg-[#74182E] hover:bg-[#581223] text-white text-xs font-semibold shadow-soft flex items-center gap-1.5 transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-[#E1CD98]" />
            <span>Publish & Share →</span>
          </button>
        </div>
      </div>

      {/* TAB 1: TEMPLATE GALLERY VIEW */}
      {activeTab === "gallery" && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-4 border border-[#E8DDCF] flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-[#74182E]">Active Template:</span>{" "}
              <strong>{selectedTemplate.name}</strong> ({selectedTemplate.category})
            </div>
            <button
              type="button"
              onClick={() => setActiveTab("editor")}
              className="px-4 py-1.5 rounded-full bg-[#74182E] text-white font-semibold text-xs hover:bg-[#581223]"
            >
              Continue to Live Editor →
            </button>
          </div>

          <TemplateGallery
            activeTemplateId={selectedTemplateId}
            onSelectTemplate={(templateId) => {
              selectTemplate(templateId);
              setActiveTab("editor");
            }}
          />
        </div>
      )}

      {/* TAB 2: 3-PANE LIVE INVITATION STUDIO EDITOR */}
      {activeTab === "editor" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* PANE 1 (LEFT): Content Controls & Form Editors */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-5 border border-[#E8DDCF] shadow-soft space-y-4 max-h-[85vh] overflow-y-auto">
            {/* Content Nav Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 border-b border-[#E8DDCF] scrollbar-none">
              {[
                { id: "couple", label: "Couple" },
                { id: "wedding", label: "Date & Title" },
                { id: "events", label: "Events" },
                { id: "story", label: "Love Story" },
                { id: "gallery", label: "Gallery" },
                { id: "venue", label: "Palace Venue" },
                { id: "family", label: "Family" },
                { id: "rsvp", label: "RSVP Policies" },
                { id: "additional", label: "Attire & Gifts" }
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setContentTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    contentTab === tab.id
                      ? "bg-[#74182E] text-white shadow-soft"
                      : "text-[#7D597E] hover:bg-[#FAF7F2] hover:text-[#2D1B28]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* FORM 1: COUPLE DETAILS */}
            {contentTab === "couple" && (
              <div className="space-y-3.5 text-xs">
                <div className="font-serif font-bold text-sm text-[#2D1B28] flex items-center justify-between">
                  <span>Couple Information</span>
                  <span className="text-[10px] text-[#7D597E] font-sans font-normal">Real-time sync</span>
                </div>

                <div>
                  <label className="block text-[#7D597E] mb-1 font-medium">Display Headline Names</label>
                  <input
                    type="text"
                    value={invitationData.couple.displayNames}
                    onChange={e =>
                      updateInvitationData({
                        couple: { ...invitationData.couple, displayNames: e.target.value }
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-[#E8DDCF] text-[#2D1B28] focus:outline-none focus:border-[#74182E]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[#7D597E] mb-1 font-medium">Groom&apos;s Name</label>
                    <input
                      type="text"
                      value={invitationData.couple.groomName}
                      onChange={e =>
                        updateInvitationData({
                          couple: { ...invitationData.couple, groomName: e.target.value }
                        })
                      }
                      className="w-full p-2.5 rounded-xl border border-[#E8DDCF] text-[#2D1B28] focus:outline-none focus:border-[#74182E]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#7D597E] mb-1 font-medium">Bride&apos;s Name</label>
                    <input
                      type="text"
                      value={invitationData.couple.brideName}
                      onChange={e =>
                        updateInvitationData({
                          couple: { ...invitationData.couple, brideName: e.target.value }
                        })
                      }
                      className="w-full p-2.5 rounded-xl border border-[#E8DDCF] text-[#2D1B28] focus:outline-none focus:border-[#74182E]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#7D597E] mb-1 font-medium">Couple Hero Photo URL</label>
                  <input
                    type="text"
                    value={invitationData.couple.couplePhoto}
                    onChange={e =>
                      updateInvitationData({
                        couple: { ...invitationData.couple, couplePhoto: e.target.value }
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-[#E8DDCF] text-[#2D1B28] text-[11px] focus:outline-none focus:border-[#74182E]"
                  />
                </div>

                <div>
                  <label className="block text-[#7D597E] mb-1 font-medium">Monogram Seal (Initials)</label>
                  <input
                    type="text"
                    value={invitationData.couple.monogram || ""}
                    onChange={e =>
                      updateInvitationData({
                        couple: { ...invitationData.couple, monogram: e.target.value }
                      })
                    }
                    placeholder="e.g. R & P"
                    className="w-full p-2.5 rounded-xl border border-[#E8DDCF] text-[#2D1B28] font-bold focus:outline-none focus:border-[#74182E]"
                  />
                </div>
              </div>
            )}

            {/* FORM 2: WEDDING DATE & MESSAGE */}
            {contentTab === "wedding" && (
              <div className="space-y-3.5 text-xs">
                <div className="font-serif font-bold text-sm text-[#2D1B28]">Wedding Details</div>

                <div>
                  <label className="block text-[#7D597E] mb-1 font-medium">Ceremony Title / Banner</label>
                  <input
                    type="text"
                    value={invitationData.wedding.weddingTitle}
                    onChange={e =>
                      updateInvitationData({
                        wedding: { ...invitationData.wedding, weddingTitle: e.target.value }
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-[#E8DDCF] text-[#2D1B28] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[#7D597E] mb-1 font-medium">Wedding Date</label>
                    <input
                      type="text"
                      value={invitationData.wedding.weddingDate}
                      onChange={e =>
                        updateInvitationData({
                          wedding: { ...invitationData.wedding, weddingDate: e.target.value }
                        })
                      }
                      className="w-full p-2.5 rounded-xl border border-[#E8DDCF] text-[#2D1B28] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[#7D597E] mb-1 font-medium">Muhurat Time</label>
                    <input
                      type="text"
                      value={invitationData.wedding.weddingTime}
                      onChange={e =>
                        updateInvitationData({
                          wedding: { ...invitationData.wedding, weddingTime: e.target.value }
                        })
                      }
                      className="w-full p-2.5 rounded-xl border border-[#E8DDCF] text-[#2D1B28] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#7D597E] mb-1 font-medium">Personal Invitation Blessing / Message</label>
                  <textarea
                    rows={3}
                    value={invitationData.wedding.customMessage}
                    onChange={e =>
                      updateInvitationData({
                        wedding: { ...invitationData.wedding, customMessage: e.target.value }
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-[#E8DDCF] text-[#2D1B28] focus:outline-none focus:border-[#74182E]"
                  />
                </div>

                <div>
                  <label className="block text-[#7D597E] mb-1 font-medium">Wedding Hashtag</label>
                  <input
                    type="text"
                    value={invitationData.wedding.hashtag}
                    onChange={e =>
                      updateInvitationData({
                        wedding: { ...invitationData.wedding, hashtag: e.target.value }
                      })
                    }
                    placeholder="#RahulWedsPriya"
                    className="w-full p-2.5 rounded-xl border border-[#E8DDCF] text-[#2D1B28] font-mono focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* FORM 3: EVENTS TIMELINE */}
            {contentTab === "events" && (
              <div className="space-y-3.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-sm text-[#2D1B28]">
                    Celebration Events ({invitationData.events.length})
                  </span>
                  <button
                    type="button"
                    onClick={handleAddNewEvent}
                    className="px-2.5 py-1 rounded-lg bg-[#FAF7F2] text-[#74182E] font-semibold border border-[#E8DDCF] hover:bg-[#F3ECE1] flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Event
                  </button>
                </div>

                <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                  {invitationData.events.map((evt, idx) => (
                    <div key={evt.id} className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E8DDCF] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#74182E]">Event {idx + 1}</span>
                        <button
                          type="button"
                          onClick={() => handleDeleteEvent(evt.id)}
                          className="text-stone-400 hover:text-red-600"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <input
                        type="text"
                        value={evt.name}
                        onChange={e => {
                          const updated = invitationData.events.map(item =>
                            item.id === evt.id ? { ...item, name: e.target.value } : item
                          );
                          updateInvitationData({ events: updated });
                        }}
                        placeholder="Event Name (e.g. Sangeet)"
                        className="w-full p-2 bg-white rounded-lg border border-[#E8DDCF] font-bold text-[#2D1B28]"
                      />

                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={evt.date}
                          onChange={e => {
                            const updated = invitationData.events.map(item =>
                              item.id === evt.id ? { ...item, date: e.target.value } : item
                            );
                            updateInvitationData({ events: updated });
                          }}
                          placeholder="Date"
                          className="w-full p-1.5 bg-white rounded-lg border border-[#E8DDCF] text-[11px]"
                        />
                        <input
                          type="text"
                          value={evt.startTime}
                          onChange={e => {
                            const updated = invitationData.events.map(item =>
                              item.id === evt.id ? { ...item, startTime: e.target.value } : item
                            );
                            updateInvitationData({ events: updated });
                          }}
                          placeholder="Time"
                          className="w-full p-1.5 bg-white rounded-lg border border-[#E8DDCF] text-[11px]"
                        />
                      </div>

                      <input
                        type="text"
                        value={evt.dressCode}
                        onChange={e => {
                          const updated = invitationData.events.map(item =>
                            item.id === evt.id ? { ...item, dressCode: e.target.value } : item
                          );
                          updateInvitationData({ events: updated });
                        }}
                        placeholder="Dress Code"
                        className="w-full p-1.5 bg-white rounded-lg border border-[#E8DDCF] text-[11px]"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FORM 4: LOVE STORY */}
            {contentTab === "story" && (
              <div className="space-y-3.5 text-xs">
                <div className="font-serif font-bold text-sm text-[#2D1B28]">Love Story & Journey</div>

                <div>
                  <label className="block text-[#7D597E] mb-1 font-medium">How We Met</label>
                  <textarea
                    rows={2}
                    value={invitationData.story.howWeMet}
                    onChange={e =>
                      updateInvitationData({
                        story: { ...invitationData.story, howWeMet: e.target.value }
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-[#E8DDCF] text-[#2D1B28]"
                  />
                </div>

                <div>
                  <label className="block text-[#7D597E] mb-1 font-medium">Relationship Journey</label>
                  <textarea
                    rows={3}
                    value={invitationData.story.relationshipStory}
                    onChange={e =>
                      updateInvitationData({
                        story: { ...invitationData.story, relationshipStory: e.target.value }
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-[#E8DDCF] text-[#2D1B28]"
                  />
                </div>
              </div>
            )}

            {/* FORM 5: PHOTO GALLERY */}
            {contentTab === "gallery" && (
              <div className="space-y-3.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-sm text-[#2D1B28]">
                    Pre-Wedding Gallery ({invitationData.gallery.length})
                  </span>
                  <button
                    type="button"
                    onClick={handleAddGalleryPhoto}
                    className="px-2.5 py-1 rounded-lg bg-[#FAF7F2] text-[#74182E] font-semibold border border-[#E8DDCF] flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Photo
                  </button>
                </div>

                <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                  {invitationData.gallery.map((photo, idx) => (
                    <div key={photo.id} className="p-2.5 bg-[#FAF7F2] rounded-xl border border-[#E8DDCF] flex items-center gap-2">
                      <img src={photo.url} alt="Thumbnail" className="w-10 h-10 object-cover rounded-lg shrink-0" />
                      <input
                        type="text"
                        value={photo.caption}
                        onChange={e => {
                          const updated = invitationData.gallery.map(p =>
                            p.id === photo.id ? { ...p, caption: e.target.value } : p
                          );
                          updateInvitationData({ gallery: updated });
                        }}
                        placeholder="Caption"
                        className="w-full p-1.5 bg-white rounded-lg border border-[#E8DDCF] text-[11px]"
                      />
                      <button
                        type="button"
                        onClick={() => handleDeletePhoto(photo.id)}
                        className="text-stone-400 hover:text-red-600"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FORM 6: VENUE */}
            {contentTab === "venue" && (
              <div className="space-y-3.5 text-xs">
                <div className="font-serif font-bold text-sm text-[#2D1B28]">Palace Venue & Directions</div>

                <div>
                  <label className="block text-[#7D597E] mb-1 font-medium">Venue Name</label>
                  <input
                    type="text"
                    value={invitationData.venue.venueName}
                    onChange={e =>
                      updateInvitationData({
                        venue: { ...invitationData.venue, venueName: e.target.value }
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-[#E8DDCF] text-[#2D1B28]"
                  />
                </div>

                <div>
                  <label className="block text-[#7D597E] mb-1 font-medium">Address & Landmark</label>
                  <input
                    type="text"
                    value={invitationData.venue.address}
                    onChange={e =>
                      updateInvitationData({
                        venue: { ...invitationData.venue, address: e.target.value }
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-[#E8DDCF] text-[#2D1B28]"
                  />
                </div>

                <div>
                  <label className="block text-[#7D597E] mb-1 font-medium">City</label>
                  <input
                    type="text"
                    value={invitationData.venue.city}
                    onChange={e =>
                      updateInvitationData({
                        venue: { ...invitationData.venue, city: e.target.value }
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-[#E8DDCF] text-[#2D1B28]"
                  />
                </div>

                <div>
                  <label className="block text-[#7D597E] mb-1 font-medium">Google Maps Navigation Link</label>
                  <input
                    type="text"
                    value={invitationData.venue.googleMapsLink}
                    onChange={e =>
                      updateInvitationData({
                        venue: { ...invitationData.venue, googleMapsLink: e.target.value }
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-[#E8DDCF] text-[11px]"
                  />
                </div>
              </div>
            )}

            {/* FORM 7: FAMILY */}
            {contentTab === "family" && (
              <div className="space-y-3.5 text-xs">
                <div className="font-serif font-bold text-sm text-[#2D1B28]">Family Blessings</div>

                <div>
                  <label className="block text-[#7D597E] mb-1 font-medium">Bride&apos;s Parents</label>
                  <input
                    type="text"
                    value={invitationData.family.brideParents}
                    onChange={e =>
                      updateInvitationData({
                        family: { ...invitationData.family, brideParents: e.target.value }
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-[#E8DDCF] text-[#2D1B28]"
                  />
                </div>

                <div>
                  <label className="block text-[#7D597E] mb-1 font-medium">Groom&apos;s Parents</label>
                  <input
                    type="text"
                    value={invitationData.family.groomParents}
                    onChange={e =>
                      updateInvitationData({
                        family: { ...invitationData.family, groomParents: e.target.value }
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-[#E8DDCF] text-[#2D1B28]"
                  />
                </div>
              </div>
            )}

            {/* FORM 8: RSVP SETTINGS */}
            {contentTab === "rsvp" && (
              <div className="space-y-3.5 text-xs">
                <div className="font-serif font-bold text-sm text-[#2D1B28]">RSVP Policies</div>

                <label className="flex items-center justify-between p-3 rounded-xl border border-[#E8DDCF] bg-[#FAF7F2] cursor-pointer">
                  <span className="font-semibold text-[#2D1B28]">Enable Online RSVP</span>
                  <input
                    type="checkbox"
                    checked={invitationData.rsvp.enabled}
                    onChange={e =>
                      updateInvitationData({
                        rsvp: { ...invitationData.rsvp, enabled: e.target.checked }
                      })
                    }
                    className="w-4 h-4 rounded accent-[#74182E]"
                  />
                </label>

                <div>
                  <label className="block text-[#7D597E] mb-1 font-medium">RSVP Deadline Date</label>
                  <input
                    type="text"
                    value={invitationData.rsvp.deadline}
                    onChange={e =>
                      updateInvitationData({
                        rsvp: { ...invitationData.rsvp, deadline: e.target.value }
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-[#E8DDCF] text-[#2D1B28]"
                  />
                </div>
              </div>
            )}

            {/* FORM 9: ATTIRE & GIFTS */}
            {contentTab === "additional" && (
              <div className="space-y-3.5 text-xs">
                <div className="font-serif font-bold text-sm text-[#2D1B28]">Attire, Travel & Shagun Notes</div>

                <div>
                  <label className="block text-[#7D597E] mb-1 font-medium">Overall Dress Code Note</label>
                  <textarea
                    rows={2}
                    value={invitationData.additional.dressCodeOverview}
                    onChange={e =>
                      updateInvitationData({
                        additional: { ...invitationData.additional, dressCodeOverview: e.target.value }
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-[#E8DDCF] text-[#2D1B28]"
                  />
                </div>

                <div>
                  <label className="block text-[#7D597E] mb-1 font-medium">Shagun / Gift Blessing Note</label>
                  <textarea
                    rows={2}
                    value={invitationData.additional.giftRegistry}
                    onChange={e =>
                      updateInvitationData({
                        additional: { ...invitationData.additional, giftRegistry: e.target.value }
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-[#E8DDCF] text-[#2D1B28]"
                  />
                </div>
              </div>
            )}
          </div>

          {/* PANE 2 (CENTER): Live Invitation Preview */}
          <div className="lg:col-span-5 flex flex-col items-center space-y-3">
            {/* Viewport controls */}
            <div className="bg-white p-1 rounded-xl border border-[#E8DDCF] shadow-soft-sm flex items-center gap-1 text-xs">
              <button
                type="button"
                onClick={() => setDeviceMode("mobile")}
                className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors ${
                  deviceMode === "mobile"
                    ? "bg-[#74182E] text-white shadow-soft"
                    : "text-[#7D597E] hover:text-[#2D1B28]"
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" /> Mobile
              </button>

              <button
                type="button"
                onClick={() => setDeviceMode("tablet")}
                className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors ${
                  deviceMode === "tablet"
                    ? "bg-[#74182E] text-white shadow-soft"
                    : "text-[#7D597E] hover:text-[#2D1B28]"
                }`}
              >
                <Tablet className="w-3.5 h-3.5" /> Tablet
              </button>

              <button
                type="button"
                onClick={() => setDeviceMode("desktop")}
                className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors ${
                  deviceMode === "desktop"
                    ? "bg-[#74182E] text-white shadow-soft"
                    : "text-[#7D597E] hover:text-[#2D1B28]"
                }`}
              >
                <Monitor className="w-3.5 h-3.5" /> Desktop
              </button>
            </div>

            {/* Viewport Frame */}
            <div className="w-full max-h-[85vh] overflow-y-auto rounded-3xl border border-[#E8DDCF] shadow-2xl bg-stone-100 flex justify-center p-2 sm:p-4">
              <TemplateRenderer
                data={invitationData}
                template={selectedTemplate}
                deviceMode={deviceMode}
                onOpenRsvp={() => setContentTab("rsvp")}
                onSubmitRsvp={async (rsvp) => {
                  return submitGuestRsvp({
                    guestName: rsvp.guestName,
                    phone: rsvp.phone,
                    rsvpStatus: rsvp.rsvpStatus,
                    eventsAttending: rsvp.eventsAttending,
                    foodPreference: rsvp.foodPreference
                  });
                }}
              />
            </div>
          </div>

          {/* PANE 3 (RIGHT): Design Controls & Publishing */}
          <div className="lg:col-span-3 bg-white rounded-3xl p-5 border border-[#E8DDCF] shadow-soft space-y-5 max-h-[85vh] overflow-y-auto text-xs">
            {/* Active Template Card */}
            <div className="p-3.5 rounded-2xl bg-[#FAF7F0] border border-[#C5A059] space-y-2">
              <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#74182E]">
                <span>Active Template</span>
                <span className="font-mono text-stone-500">v{selectedTemplate.version}.0</span>
              </div>

              <div className="font-serif font-bold text-base text-[#2D1B28]">
                {selectedTemplate.name}
              </div>

              <p className="text-[11px] text-[#7D597E] line-clamp-2">
                {selectedTemplate.description}
              </p>

              <button
                type="button"
                onClick={() => setSwitchTemplateModalOpen(true)}
                className="w-full py-2 rounded-xl bg-white text-[#74182E] font-semibold border border-[#E8DDCF] hover:bg-[#F3ECE1] shadow-soft-sm transition-colors flex items-center justify-center gap-1.5"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Switch Template (Zero Data Loss)</span>
              </button>
            </div>

            {/* Theme Colors Override */}
            <div className="space-y-2">
              <span className="font-bold text-[#2D1B28] flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-[#C5A059]" /> Accent Palette
              </span>

              <div className="grid grid-cols-5 gap-2">
                {[
                  { name: "Burgundy", hex: "#74182E" },
                  { name: "Gold", hex: "#C5A059" },
                  { name: "Emerald", hex: "#1B4931" },
                  { name: "Terracotta", hex: "#C96D4B" },
                  { name: "Midnight", hex: "#170F18" }
                ].map(color => (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() =>
                      updateInvitationData({
                        designOverrides: {
                          ...invitationData.designOverrides,
                          themeColor: color.hex
                        }
                      })
                    }
                    className="w-full aspect-square rounded-xl border border-black/10 transition-transform hover:scale-110 shadow-sm"
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Section Visibility Toggles */}
            <div className="space-y-2 pt-2 border-t border-[#E8DDCF]">
              <span className="font-bold text-[#2D1B28] flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-[#C5A059]" /> Section Toggles
              </span>

              <div className="space-y-1.5">
                {[
                  { id: "sec-countdown", label: "Live Countdown Ticker" },
                  { id: "sec-story", label: "Love Story Journey" },
                  { id: "sec-events", label: "Ceremonies Timeline" },
                  { id: "sec-gallery", label: "Pre-Wedding Gallery" },
                  { id: "sec-venue", label: "Palace Venue Guide" },
                  { id: "sec-family", label: "Family Blessings" },
                  { id: "sec-dressCode", label: "Smart Attire Guide" },
                  { id: "sec-gift", label: "Shagun Note" }
                ].map(sec => {
                  const currentSec = selectedTemplate.sections.find(s => s.id === sec.id);
                  const isEnabled = currentSec ? currentSec.enabled : true;

                  return (
                    <label key={sec.id} className="flex items-center justify-between p-2 rounded-lg bg-[#FAF7F2] cursor-pointer">
                      <span className="text-[11px] text-[#4D334E]">{sec.label}</span>
                      <input
                        type="checkbox"
                        checked={isEnabled}
                        onChange={() => {
                          const updatedSections = selectedTemplate.sections.map(s =>
                            s.id === sec.id ? { ...s, enabled: !s.enabled } : s
                          );
                          selectedTemplate.sections = updatedSections;
                          updateInvitationData({}); // triggers re-render
                        }}
                        className="rounded accent-[#74182E] w-3.5 h-3.5"
                      />
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Public Slug Control */}
            <div className="space-y-2 pt-2 border-t border-[#E8DDCF]">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#2D1B28]">Public Link URL</span>
                <span className="text-[10px] text-stone-500 font-mono">/invite/[slug]</span>
              </div>

              <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8DDCF] font-mono text-[11px] text-[#74182E] break-all">
                /invite/{invitationData.slug || wedding.slug}
              </div>

              <button
                type="button"
                onClick={() => setPublishModalOpen(true)}
                className="w-full py-2 rounded-xl bg-[#74182E] text-white font-semibold hover:bg-[#581223] transition-colors shadow-soft"
              >
                Change Slug & Publish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PUBLISHED SHARING & QR CODE HUB */}
      {activeTab === "share" && (
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DDCF] shadow-soft space-y-6">
            <div className="text-center space-y-2 pb-4 border-b border-[#E8DDCF]">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-[#2D1B28]">
                Your Wedding Invitation is Live!
              </h2>
              <p className="text-xs text-[#7D597E]">
                Share this personalized luxury link with your wedding guests across WhatsApp, SMS, or scan the QR pass.
              </p>
            </div>

            {/* Direct Link Box */}
            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DDCF] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-0.5 truncate">
                <div className="text-[10px] uppercase font-bold text-[#74182E]">Public Shareable URL</div>
                <div className="font-mono text-xs text-[#2D1B28] truncate">{shareableUrl}</div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="px-4 py-2 rounded-xl bg-white border border-[#E8DDCF] text-xs font-semibold text-[#2D1B28] hover:bg-[#F3ECE1] transition-colors flex items-center gap-1.5"
                >
                  {linkCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#74182E]" />}
                  <span>{linkCopied ? "Copied!" : "Copy Link"}</span>
                </button>

                <Link
                  href={`/invite/${invitationData.slug || wedding.slug}`}
                  target="_blank"
                  className="px-4 py-2 rounded-xl bg-[#74182E] text-white text-xs font-semibold hover:bg-[#581223] transition-colors flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Open</span>
                </Link>
              </div>
            </div>

            {/* Channels Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* WhatsApp Share Card */}
              <div className="p-5 rounded-2xl border border-emerald-200 bg-emerald-50/50 space-y-3 text-xs">
                <div className="flex items-center gap-2 font-bold text-emerald-900">
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp 1-Click Invite</span>
                </div>
                <p className="text-emerald-800 text-[11px] leading-relaxed">
                  Generates an auspicious invitation message containing couple names, dates, venue, and live link.
                </p>
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                    `🌸 ${invitationData.couple.displayNames} cordially invite you to celebrate their wedding ceremonies on ${invitationData.wedding.weddingDate} at ${invitationData.venue.venueName}, ${invitationData.venue.city}.\n\nView our wedding invitation, itinerary, dress code & RSVP here: ${shareableUrl}`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full py-2.5 rounded-xl bg-emerald-600 text-white text-center font-bold hover:bg-emerald-700 transition-colors shadow-soft"
                >
                  Send via WhatsApp →
                </a>
              </div>

              {/* QR Code Pass Card */}
              <div className="p-5 rounded-2xl border border-[#E8DDCF] bg-[#FAF7F2] space-y-3 text-xs text-center">
                <div className="font-bold text-[#2D1B28]">Digital Invitation QR Code</div>
                <div className="w-28 h-28 bg-white p-2 rounded-xl border border-[#E8DDCF] mx-auto flex items-center justify-center shadow-sm">
                  <QrCode className="w-24 h-24 text-[#2D1B28]" />
                </div>
                <div className="text-[11px] text-[#7D597E]">Scan with phone camera to open on mobile</div>
              </div>
            </div>

            {/* Live Analytics Snapshot - Exactly per WeddingOS Specs */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF7F2] border border-[#E8DDCF] space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-xs uppercase font-bold tracking-wider text-[#74182E] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#C5A059]" />
                  <span>Real-Time Invitation Telemetry</span>
                </div>
                <span className="text-[10px] font-mono bg-white px-2.5 py-0.5 rounded-full border border-[#E8DDCF] text-emerald-700 font-bold">
                  ● Live Sync
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 text-center text-xs">
                <div className="p-3 bg-white rounded-xl border border-[#E8DDCF] shadow-soft-sm">
                  <div className="text-xl sm:text-2xl font-serif font-bold text-[#2D1B28]">248</div>
                  <div className="text-[10px] text-[#7D597E] uppercase tracking-wider font-semibold">Total Guests</div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-[#E8DDCF] shadow-soft-sm">
                  <div className="text-xl sm:text-2xl font-serif font-bold text-emerald-600">86%</div>
                  <div className="text-[10px] text-[#7D597E] uppercase tracking-wider font-semibold">RSVP Rate</div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-[#E8DDCF] shadow-soft-sm">
                  <div className="text-xl sm:text-2xl font-serif font-bold text-[#74182E]">211</div>
                  <div className="text-[10px] text-[#7D597E] uppercase tracking-wider font-semibold">Opened</div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-[#E8DDCF] shadow-soft-sm">
                  <div className="text-xl sm:text-2xl font-serif font-bold text-emerald-700">174</div>
                  <div className="text-[10px] text-[#7D597E] uppercase tracking-wider font-semibold">Confirmed</div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-[#E8DDCF] shadow-soft-sm">
                  <div className="text-xl sm:text-2xl font-serif font-bold text-amber-600">37</div>
                  <div className="text-[10px] text-[#7D597E] uppercase tracking-wider font-semibold">Pending</div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-[#E8DDCF] shadow-soft-sm">
                  <div className="text-xl sm:text-2xl font-serif font-bold text-[#2D1B28]">24</div>
                  <div className="text-[10px] text-[#7D597E] uppercase tracking-wider font-semibold">Checked In</div>
                </div>
              </div>
            </div>

            {/* PERSONALIZED GUEST INVITATION & WHATSAPP HUB */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E8DDCF] space-y-4 shadow-soft">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E8DDCF] pb-3">
                <div>
                  <h3 className="font-serif font-bold text-base text-[#2D1B28] flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    <span>Personalized Guest Links & WhatsApp Dispatch</span>
                  </h3>
                  <p className="text-xs text-[#7D597E]">
                    Every guest receives their own personalized link: <code className="bg-[#FAF7F2] px-1 py-0.5 rounded text-[#74182E]">/invite/{invitationData.slug || wedding.slug}/guest-token</code>
                  </p>
                </div>

                <input
                  type="text"
                  placeholder="Filter guests..."
                  value={guestSearchQuery}
                  onChange={e => setGuestSearchQuery(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-[#E8DDCF] text-xs focus:outline-none focus:border-[#C5A059] bg-[#FAF7F2] w-full sm:w-48"
                />
              </div>

              {/* Guests Dispatch Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#E8DDCF] text-[#7D597E] font-medium">
                      <th className="pb-2">Guest & Side</th>
                      <th className="pb-2">Personalized Invitation URL</th>
                      <th className="pb-2">Invite Status</th>
                      <th className="pb-2">RSVP</th>
                      <th className="pb-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8DDCF]/60">
                    {guests
                      .filter(g =>
                        !guestSearchQuery ||
                        g.name.toLowerCase().includes(guestSearchQuery.toLowerCase()) ||
                        g.phone.includes(guestSearchQuery)
                      )
                      .slice(0, 8)
                      .map(g => {
                        const token = g.inviteToken || g.id;
                        const guestInviteUrl = typeof window !== "undefined"
                          ? `${window.location.origin}/invite/${invitationData.slug || wedding.slug}/${token}`
                          : `https://weddingos.com/invite/${invitationData.slug || wedding.slug}/${token}`;

                        const whatsappMsg = `💍 ${wedding.coupleNames} are getting married!\n\nDear ${g.name}, we'd love for you to join us and celebrate this beautiful occasion.\n\nOpen your invitation →\n${guestInviteUrl}`;

                        return (
                          <tr key={g.id} className="hover:bg-[#FAF7F2]/80 transition-colors">
                            <td className="py-2.5">
                              <div className="font-semibold text-[#2D1B28]">{g.name}</div>
                              <div className="text-[10px] text-[#7D597E]">{g.phone} · {g.side} side</div>
                            </td>

                            <td className="py-2.5 font-mono text-[11px] text-[#74182E]">
                              <span className="truncate block max-w-[200px]" title={guestInviteUrl}>
                                .../{token}
                              </span>
                            </td>

                            <td className="py-2.5">
                              {g.invitationOpened ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-200">
                                  <span>👁️ Opened</span>
                                </span>
                              ) : g.inviteSent ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                                  <span>✉️ Sent</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 text-[10px] font-medium">
                                  <span>Not Sent</span>
                                </span>
                              )}
                            </td>

                            <td className="py-2.5">
                              {g.rsvpStatus === "confirmed" ? (
                                <span className="inline-flex items-center gap-1 text-emerald-700 font-bold text-[11px]">
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span>Confirmed</span>
                                </span>
                              ) : g.rsvpStatus === "declined" ? (
                                <span className="text-rose-600 font-medium text-[11px]">Declined</span>
                              ) : (
                                <span className="text-amber-600 font-medium text-[11px]">Pending</span>
                              )}
                            </td>

                            <td className="py-2.5 text-right space-x-1.5 whitespace-nowrap">
                              {/* 1-Click WhatsApp Share */}
                              <a
                                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappMsg)}`}
                                target="_blank"
                                rel="noreferrer"
                                onClick={() => recordInvitationSent(g.id, "whatsapp")}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-medium text-[11px] hover:bg-emerald-700 shadow-sm transition-colors"
                              >
                                <MessageCircle className="w-3 h-3" />
                                <span>WhatsApp</span>
                              </a>

                              {/* Copy Link */}
                              <button
                                type="button"
                                onClick={() => {
                                  navigator.clipboard.writeText(guestInviteUrl);
                                  alert(`Personalized invitation URL for ${g.name} copied to clipboard!`);
                                }}
                                className="p-1 rounded-lg border border-[#E8DDCF] hover:bg-white text-stone-600 hover:text-[#74182E] transition-colors"
                                title="Copy personalized link"
                              >
                                <Copy className="w-3.5 h-3.5" />
                              </button>

                              {/* Open Preview */}
                              <Link
                                href={`/invite/${invitationData.slug || wedding.slug}/${token}`}
                                target="_blank"
                                className="p-1 rounded-lg border border-[#E8DDCF] hover:bg-white text-stone-600 hover:text-[#74182E] transition-colors inline-block"
                                title="Preview guest invitation"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 1: SWITCH TEMPLATE MODAL */}
      {switchTemplateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-[#C5A059] shadow-2xl relative">
            <div className="p-5 border-b border-[#E8DDCF] flex items-center justify-between">
              <div>
                <h3 className="text-lg font-serif font-bold text-[#2D1B28]">
                  Switch Template (Zero Data Loss)
                </h3>
                <p className="text-xs text-[#7D597E]">
                  Your couple details, 5 ceremonies, photos, and stories will immediately adopt the new design.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSwitchTemplateModalOpen(false)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto flex-1">
              <TemplateGallery
                activeTemplateId={selectedTemplateId}
                onSelectTemplate={(templateId) => {
                  selectTemplate(templateId);
                  setSwitchTemplateModalOpen(false);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: PUBLISH & CUSTOM SLUG MODAL */}
      {publishModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-[#E8DDCF] shadow-2xl relative space-y-4">
            <button
              type="button"
              onClick={() => setPublishModalOpen(false)}
              className="absolute top-5 right-5 p-1 rounded-full text-stone-400 hover:text-stone-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <h3 className="text-xl font-serif font-bold text-[#2D1B28]">
                Publish Wedding Invitation
              </h3>
              <p className="text-xs text-[#7D597E]">
                Choose your custom personalized link for WhatsApp and invitation cards.
              </p>
            </div>

            {publishStatusMessage && (
              <div
                className={`p-3 rounded-xl text-xs font-medium flex items-start gap-2 ${
                  publishStatusMessage.success
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                    : "bg-red-50 text-red-800 border border-red-200"
                }`}
              >
                {publishStatusMessage.success ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                )}
                <span>{publishStatusMessage.text}</span>
              </div>
            )}

            <form onSubmit={handlePublishSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#7D597E] mb-1 font-medium">Custom URL Slug</label>
                <div className="flex items-center rounded-xl border border-[#E8DDCF] bg-[#FAF7F2] px-3 py-2">
                  <span className="text-stone-400 font-mono">weddingos.com/invite/</span>
                  <input
                    type="text"
                    value={slugInput}
                    onChange={e => setSlugInput(e.target.value)}
                    required
                    placeholder="e.g. rahul-priya"
                    className="w-full bg-transparent font-mono font-bold text-[#74182E] focus:outline-none"
                  />
                </div>
                <div className="text-[10px] text-stone-500 mt-1">
                  Letters, numbers, and dashes allowed (e.g. <code>ananya-rahul</code>).
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setPublishModalOpen(false)}
                  className="px-4 py-2 rounded-full border border-[#E8DDCF] text-stone-600 hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-[#74182E] hover:bg-[#581223] text-white font-bold shadow-soft"
                >
                  Confirm & Publish Live →
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
