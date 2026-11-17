"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useWedding } from "@/context/WeddingContext";
import { LanguageCode, Wedding, Guest } from "@/lib/types";
import { InvitationWeddingData } from "@/lib/template-types";
import { getTemplateById, createDefaultWeddingData, getAllTemplates } from "@/lib/templates";
import { TemplateRenderer } from "@/components/invitation-engine/TemplateRenderer";
import { EnvelopeOpeningExperience } from "@/components/invitation-engine/EnvelopeOpeningExperience";
import {
  Sparkles,
  Share2,
  Globe,
  X,
  MessageCircle,
  Copy,
  QrCode,
  ArrowRight,
  ChevronRight,
  Calendar,
  CheckCircle2,
  Mail,
  Palette,
  Eye,
  RotateCcw
} from "lucide-react";

interface InvitationExperienceProps {
  slug: string;
  guestToken?: string;
}

export function InvitationExperienceClient({ slug, guestToken }: InvitationExperienceProps) {
  const {
    wedding,
    allWeddings,
    events,
    guests,
    currentLanguage,
    setCurrentLanguage,
    translations,
    submitGuestRsvp,
    markInvitationOpened,
    getGuestByToken
  } = useWedding();

  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [selectedThemeId, setSelectedThemeId] = useState<string>("royal-indian-002");
  const [themePickerOpen, setThemePickerOpen] = useState(false);

  // Normalize string helper
  const normalize = (str?: string) => (str || "").toLowerCase().replace(/[^a-z0-9]/g, "");

  // 1. Dynamically resolve the wedding from slug
  const currentWedding: Wedding = useMemo(() => {
    const slugParam = (slug || "").toLowerCase().trim();
    const target = normalize(slugParam);

    let matched = allWeddings.find(w => {
      const wSlug = normalize(w.slug);
      const wNames = normalize(w.coupleNames);
      const wB = normalize(w.brideName);
      const wG = normalize(w.groomName);
      return (
        wSlug === target ||
        wNames === target ||
        target === `${wB}${wG}` ||
        target === `${wG}${wB}`
      );
    });

    if (!matched && typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("weddingos_all_weddings");
        if (stored) {
          const list: Wedding[] = JSON.parse(stored);
          if (Array.isArray(list)) {
            matched = list.find(w => {
              const wSlug = normalize(w.slug);
              const wNames = normalize(w.coupleNames);
              return wSlug === target || wNames === target;
            });
          }
        }
      } catch (e) {
        console.error("Error reading weddings from localStorage", e);
      }
    }

    if (!matched && wedding) {
      const activeSlug = normalize(wedding.slug);
      const activeNames = normalize(wedding.coupleNames);
      if (activeSlug === target || activeNames === target) {
        matched = wedding;
      }
    }

    // Dynamic fallback for any future couple
    if (!matched && slugParam && slugParam !== "rahul-priya") {
      const parts = slugParam
        .split(/[-_]+/)
        .filter(Boolean)
        .map(p => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase());
      const p1 = parts[0] || "Bride";
      const p2 = parts[1] || "Groom";
      matched = {
        ...wedding,
        id: `wed-${slugParam}`,
        slug: slugParam,
        coupleNames: `${p1} & ${p2}`,
        brideName: p1,
        groomName: p2,
        weddingDate: "12 Dec 2026",
        city: "Hyderabad",
        primaryVenue: "Taj Falaknuma Palace, Hyderabad"
      };
    }

    return matched || wedding;
  }, [slug, allWeddings, wedding]);

  // 2. Resolve personalized Guest from token or URL parameter
  const resolvedGuest: Guest | undefined = useMemo(() => {
    if (!guestToken) return undefined;
    return getGuestByToken(guestToken);
  }, [guestToken, getGuestByToken, guests]);

  // 3. Auto-track invitation opened in WeddingOS backend
  useEffect(() => {
    if (guestToken) {
      markInvitationOpened(guestToken);
    }
  }, [guestToken, markInvitationOpened]);

  // Check if envelope was already opened in this session to prevent frustrating repeated blocks
  useEffect(() => {
    if (typeof window !== "undefined") {
      const sessionKey = `wos_envelope_${currentWedding.slug}_${guestToken || "general"}`;
      const viewed = sessionStorage.getItem(sessionKey);
      if (viewed === "true") {
        setEnvelopeOpened(true);
      }
    }
  }, [currentWedding.slug, guestToken]);

  const handleEnvelopeComplete = () => {
    setEnvelopeOpened(true);
    if (typeof window !== "undefined") {
      const sessionKey = `wos_envelope_${currentWedding.slug}_${guestToken || "general"}`;
      sessionStorage.setItem(sessionKey, "true");
    }
  };

  const handleReplayEnvelope = () => {
    setEnvelopeOpened(false);
  };

  // 4. Load or create invitation data
  const [invData, setInvData] = useState<InvitationWeddingData>(() =>
    createDefaultWeddingData(currentWedding, events)
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(`weddingos_invitation_data_${currentWedding.id}`);
        if (stored) {
          const parsed = JSON.parse(stored);
          setInvData(parsed);
          if (parsed.selectedTemplateId) {
            setSelectedThemeId(parsed.selectedTemplateId);
          }
          return;
        }
      } catch (e) {
        console.error(e);
      }
    }
    setInvData(createDefaultWeddingData(currentWedding, events));
  }, [currentWedding.id, events]);

  // Active Template
  const activeTemplate = useMemo(() => {
    return getTemplateById(selectedThemeId);
  }, [selectedThemeId]);

  const allThemes = useMemo(() => {
    return getAllTemplates().filter(t => [
      "royal-indian-002",
      "minimal-cream-003",
      "modern-photo-006",
      "floral-pastel-004",
      "destination-resort-007",
      "luxury-gold-001"
    ].includes(t.id));
  }, []);

  // Monogram calculation
  const monogram = useMemo(() => {
    const b = currentWedding.brideName?.charAt(0) || "B";
    const g = currentWedding.groomName?.charAt(0) || "G";
    return `${b} & ${g}`.toUpperCase();
  }, [currentWedding.brideName, currentWedding.groomName]);

  const t = translations[currentLanguage] || translations.en;

  const currentUrl = typeof window !== "undefined"
    ? window.location.href
    : `https://weddingos.com/invite/${currentWedding.slug}${guestToken ? `/${guestToken}` : ""}`;

  const copyToClipboard = (text: string) => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(text);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2500);
    }
  };

  // Jump to RSVP smoothly
  const scrollToRsvp = () => {
    const rsvpEl = document.getElementById("rsvp-section") || document.querySelector("form");
    if (rsvpEl) {
      rsvpEl.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2D1B28] flex flex-col justify-between selection:bg-[#74182E] selection:text-white relative">
      {/* 1. CINEMATIC LUXURY ENVELOPE OPENING EXPERIENCE */}
      {!envelopeOpened && (
        <EnvelopeOpeningExperience
          coupleNames={currentWedding.coupleNames}
          weddingDate={currentWedding.weddingDate}
          city={currentWedding.city}
          venue={currentWedding.primaryVenue}
          guestName={resolvedGuest?.name}
          monogram={monogram}
          themeStyle={activeTemplate.style}
          onOpened={handleEnvelopeComplete}
        />
      )}

      {/* Top Banner with language, themes, and navigation */}
      <header className="sticky top-0 z-40 bg-[#74182E] text-white px-3 sm:px-4 py-2.5 text-xs shadow-md backdrop-blur-md">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-2 sm:gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#E1CD98] animate-pulse" />
            <span className="font-serif font-medium hidden sm:inline">
              {currentWedding.coupleNames}&apos;s Royal Wedding
            </span>
            <span className="font-serif font-medium sm:hidden">
              {monogram}
            </span>
            {resolvedGuest && (
              <span className="bg-[#FAF7F2]/20 px-2 py-0.5 rounded-full text-[11px] font-serif text-[#E1CD98] truncate max-w-[120px] sm:max-w-none">
                For {resolvedGuest.name}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Picker Dropdown */}
            <div className="relative">
              <button
                onClick={() => setThemePickerOpen(!themePickerOpen)}
                className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-full border border-white/20 transition-all text-xs"
                title="Switch Invitation Theme"
              >
                <Palette className="w-3 h-3 text-[#E1CD98]" />
                <span className="hidden sm:inline">{activeTemplate.name}</span>
              </button>

              {themePickerOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white shadow-2xl border border-[#E8DDCF] p-2 text-[#2D1B28] z-50 animate-fade-in space-y-1">
                  <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-[#7D597E] border-b border-[#E8DDCF]">
                    Select Invitation Theme
                  </div>
                  {allThemes.map(tm => (
                    <button
                      key={tm.id}
                      onClick={() => {
                        setSelectedThemeId(tm.id);
                        setThemePickerOpen(false);
                      }}
                      className={`w-full px-3 py-2 rounded-xl text-left text-xs font-serif flex items-center justify-between transition-colors ${
                        selectedThemeId === tm.id
                          ? "bg-[#74182E] text-white font-bold"
                          : "hover:bg-[#FAF7F2]"
                      }`}
                    >
                      <span>{tm.name}</span>
                      {selectedThemeId === tm.id && <CheckCircle2 className="w-3.5 h-3.5 text-[#E1CD98]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Language Picker Dropdown */}
            <div className="flex items-center gap-1 bg-white/10 hover:bg-white/15 px-2 py-1 rounded-full border border-white/20 transition-all">
              <Globe className="w-3 h-3 text-[#E1CD98]" />
              <select
                value={currentLanguage}
                onChange={e => setCurrentLanguage(e.target.value as LanguageCode)}
                className="bg-transparent text-white text-xs font-medium cursor-pointer focus:outline-none pr-1"
              >
                {Object.entries(translations).map(([code, item]) => (
                  <option key={code} value={code} className="text-[#2D1B28] bg-white">
                    {item.nativeName}
                  </option>
                ))}
              </select>
            </div>

            {/* Replay Envelope Animation Button */}
            <button
              onClick={handleReplayEnvelope}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-[#E1CD98] transition-colors"
              title="Replay Envelope Opening Animation"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setShareModalOpen(true)}
              className="px-2.5 sm:px-3 py-1 rounded-full bg-[#E1CD98] text-[#74182E] font-semibold text-xs hover:bg-white transition-colors flex items-center gap-1 shadow-sm"
            >
              <Share2 className="w-3 h-3" />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Luxury Wedding Invitation Experience powered by Template Engine */}
      <main className="max-w-4xl mx-auto px-2 sm:px-4 py-4 sm:py-8 w-full flex-1">
        <TemplateRenderer
          data={invData}
          template={activeTemplate}
          deviceMode="desktop"
          guestName={resolvedGuest?.name}
          guestPhone={resolvedGuest?.phone}
          guestCount={resolvedGuest?.additionalGuests ? resolvedGuest.additionalGuests + 1 : 1}
          onOpenRsvp={scrollToRsvp}
          onAddToCalendar={() => {
            const icsData = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:${currentWedding.coupleNames}'s Wedding\nDESCRIPTION:Royal Wedding Celebrations at ${currentWedding.primaryVenue}\nLOCATION:${currentWedding.primaryVenue}, ${currentWedding.city}\nEND:VEVENT\nEND:VCALENDAR`;
            const blob = new Blob([icsData], { type: "text/calendar" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${currentWedding.slug}-wedding.ics`;
            a.click();
          }}
          onSubmitRsvp={async (rsvpPayload) => {
            return await submitGuestRsvp({
              guestName: rsvpPayload.guestName || resolvedGuest?.name || "Valued Guest",
              phone: rsvpPayload.phone || resolvedGuest?.phone || "+91 98000 00000",
              email: resolvedGuest?.email,
              rsvpStatus: rsvpPayload.rsvpStatus || (rsvpPayload.attendance === "attending" ? "confirmed" : "declined"),
              eventsAttending: rsvpPayload.eventsAttending || [],
              foodPreference: rsvpPayload.foodPreference || "Vegetarian",
              arrivalTime: rsvpPayload.arrivalTime || "Evening",
              familyMembersAttending: rsvpPayload.guestCount > 1
                ? [rsvpPayload.guestName, `+${rsvpPayload.guestCount - 1} family members`]
                : [rsvpPayload.guestName]
            });
          }}
        />
      </main>

      {/* FLOATING MOBILE ACTION BAR (Optimized for Mobile Guests) */}
      <div className="sticky bottom-4 z-40 max-w-sm mx-auto px-4 w-full">
        <div className="bg-white/95 backdrop-blur-xl border border-[#C5A059]/40 shadow-2xl rounded-full p-2 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 pl-3">
            <Sparkles className="w-4 h-4 text-[#C5A059] animate-pulse" />
            <div className="text-left">
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#7D597E] leading-none">
                {currentWedding.weddingDate}
              </div>
              <div className="text-xs font-serif font-bold text-[#74182E] truncate max-w-[130px]">
                {resolvedGuest ? `For ${resolvedGuest.name}` : currentWedding.coupleNames}
              </div>
            </div>
          </div>

          <button
            onClick={scrollToRsvp}
            className="px-5 py-2.5 rounded-full bg-[#74182E] text-white font-serif text-xs font-bold tracking-wide shadow-soft hover:bg-[#581223] transition-all transform hover:scale-105 active:scale-95 flex items-center gap-1.5"
          >
            <span>RSVP Now</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#E1CD98]" />
          </button>
        </div>
      </div>

      {/* SMART INVITATION SHARING MODAL */}
      {shareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-[#E8DDCF] shadow-2xl relative">
            <button
              onClick={() => setShareModalOpen(false)}
              className="absolute top-5 right-5 p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2 pb-4 border-b border-[#E8DDCF]">
              <div className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#C5A059] flex items-center justify-center mx-auto text-[#74182E]">
                <Share2 className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#2D1B28]">{t.shareTitle}</h3>
              <p className="text-xs text-[#7D597E]">
                Share {currentWedding.coupleNames}&apos;s wedding invitation with family and guests.
              </p>
            </div>

            <div className="space-y-3 py-4">
              {/* WhatsApp Share */}
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                  `💍 ${currentWedding.coupleNames} are getting married!\n\n${
                    resolvedGuest
                      ? `Dear ${resolvedGuest.name}, we'd love for you to join us and celebrate this beautiful occasion.\n\nOpen your personalized invitation →\n${currentUrl}`
                      : `We'd love for you to join us and celebrate this beautiful occasion.\n\nOpen your invitation →\n${currentUrl}`
                  }`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="w-full p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-between hover:bg-emerald-100 transition-colors shadow-sm"
              >
                <div className="flex items-center gap-2.5">
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Share via WhatsApp</span>
                </div>
                <ArrowRight className="w-4 h-4 text-emerald-600" />
              </a>

              {/* Copy Direct Link */}
              <button
                onClick={() => copyToClipboard(currentUrl)}
                className="w-full p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8DDCF] text-[#2D1B28] text-xs font-semibold flex items-center justify-between hover:bg-[#F3ECE1] transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Copy className="w-4 h-4 text-[#74182E]" />
                  <span>{linkCopied ? "Link Copied to Clipboard! 🎉" : "Copy Invitation URL"}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </button>

              {/* QR Code view */}
              <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E8DDCF] text-center space-y-2">
                <div className="w-24 h-24 bg-white p-2 rounded-lg border border-[#E8DDCF] mx-auto flex items-center justify-center">
                  <QrCode className="w-20 h-20 text-[#2D1B28]" />
                </div>
                <p className="text-[11px] text-[#7D597E]">
                  Scan to open on any mobile phone
                </p>
              </div>
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => setShareModalOpen(false)}
                className="text-xs text-stone-500 hover:text-stone-800 underline"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InvitationExperienceClient;
