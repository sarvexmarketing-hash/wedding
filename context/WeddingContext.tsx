"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  Wedding,
  WeddingEvent,
  Guest,
  Family,
  TransportationItem,
  HotelRoomAllocation,
  Vendor,
  CommunicationCampaign,
  Role,
  RSVPStatus,
  FoodPreference,
  WeddingGift,
  AttireRecommendation,
  ScheduledReminder,
  AIVideo,
  LanguageCode
} from "@/lib/types";
import {
  initialWedding,
  initialEvents,
  initialFamilies,
  initialGuests,
  initialTransportation,
  initialHotels,
  initialVendors,
  initialCampaigns,
  initialAttireRecommendations,
  initialGifts,
  initialReminders,
  initialAiVideo,
  weddingTranslations
} from "@/lib/mock-data";
import {
  InvitationTemplate,
  InvitationWeddingData
} from "@/lib/template-types";
import {
  getAllTemplates,
  getTemplateById,
  createDefaultWeddingData,
  validateSlug
} from "@/lib/templates";

interface WeddingContextType {
  wedding: Wedding;
  allWeddings: Wedding[];
  events: WeddingEvent[];
  guests: Guest[];
  families: Family[];
  transportation: TransportationItem[];
  hotels: HotelRoomAllocation[];
  vendors: Vendor[];
  campaigns: CommunicationCampaign[];
  gifts: WeddingGift[];
  attireList: AttireRecommendation[];
  reminders: ScheduledReminder[];
  aiVideo: AIVideo;
  currentLanguage: LanguageCode;
  setCurrentLanguage: (lang: LanguageCode) => void;
  translations: typeof weddingTranslations;
  currentRole: Role;
  setCurrentRole: (role: Role) => void;
  templates: InvitationTemplate[];
  selectedTemplate: InvitationTemplate;
  selectedTemplateId: string;
  invitationData: InvitationWeddingData;
  selectTemplate: (templateId: string) => void;
  updateInvitationData: (updates: Partial<InvitationWeddingData>) => void;
  publishInvitation: (customSlug?: string) => { success: boolean; slug: string; url: string; error?: string };
  unpublishInvitation: () => void;
  saveCustomTemplate: (template: InvitationTemplate) => void;
  deleteCustomTemplate: (templateId: string) => void;
  createNewWedding: (data: {
    brideName: string;
    groomName: string;
    weddingDate: string;
    city: string;
    primaryVenue: string;
    email?: string;
  }) => Wedding;
  switchWedding: (weddingId: string) => void;
  getGuestByToken: (tokenOrSlug: string) => Guest | undefined;
  markInvitationOpened: (tokenOrId: string) => Guest | undefined;
  recordInvitationSent: (guestId: string, channel: "whatsapp" | "sms" | "email") => void;
  submitGuestRsvp: (data: {
    guestName: string;
    phone: string;
    email?: string;
    rsvpStatus: RSVPStatus;
    eventsAttending: string[];
    foodPreference: FoodPreference;
    arrivalTime?: string;
    familyMembersAttending?: string[];
  }) => Promise<{ success: boolean; guest: Guest; message: string }>;
  addGuest: (guest: Omit<Guest, "id" | "weddingId" | "inviteToken" | "qrCode" | "checkedIn">) => void;
  importCsvGuests: (csvText: string) => { added: number; errors: string[] };
  exportGuestsToCsv: () => string;
  toggleCheckIn: (guestId: string) => void;
  updateEvent: (eventId: string, updates: Partial<WeddingEvent>) => void;
  updateWeddingSettings: (updates: Partial<Wedding>) => void;
  sendCampaignMessage: (campaignId: string) => void;
  queryAiAssistant: (query: string) => Promise<{ answer: string; relatedData?: any }>;
  addGift: (gift: Omit<WeddingGift, "id" | "weddingId">) => void;
  updateGift: (giftId: string, updates: Partial<WeddingGift>) => void;
  deleteGift: (giftId: string) => void;
  updateAttire: (eventId: string, updates: Partial<AttireRecommendation>) => void;
  toggleReminder: (reminderId: string) => void;
  addReminder: (reminder: Omit<ScheduledReminder, "id" | "weddingId" | "sentCount">) => void;
  generateAiVideo: (data: {
    title: string;
    style: AIVideo["style"];
    musicTrack: string;
    photos: string[];
    storyScript: string;
  }) => Promise<AIVideo>;
}

const WeddingContext = createContext<WeddingContextType | undefined>(undefined);

export function WeddingProvider({ children }: { children: React.ReactNode }) {
  const [wedding, setWedding] = useState<Wedding>(initialWedding);
  const [allWeddings, setAllWeddings] = useState<Wedding[]>([initialWedding]);
  const [events, setEvents] = useState<WeddingEvent[]>(initialEvents);
  const [guests, setGuests] = useState<Guest[]>(initialGuests);
  const [families, setFamilies] = useState<Family[]>(initialFamilies);
  const [transportation, setTransportation] = useState<TransportationItem[]>(initialTransportation);
  const [hotels, setHotels] = useState<HotelRoomAllocation[]>(initialHotels);
  const [vendors] = useState<Vendor[]>(initialVendors);
  const [campaigns, setCampaigns] = useState<CommunicationCampaign[]>(initialCampaigns);
  const [gifts, setGifts] = useState<WeddingGift[]>(initialGifts);
  const [attireList, setAttireList] = useState<AttireRecommendation[]>(initialAttireRecommendations);
  const [reminders, setReminders] = useState<ScheduledReminder[]>(initialReminders);
  const [aiVideo, setAiVideo] = useState<AIVideo>(initialAiVideo);
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");
  const [currentRole, setCurrentRole] = useState<Role>("couple");

  // Dynamic Invitation Template Engine State
  const [templates, setTemplates] = useState<InvitationTemplate[]>(getAllTemplates);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("luxury-gold-001");
  const [invitationData, setInvitationData] = useState<InvitationWeddingData>(() =>
    createDefaultWeddingData(initialWedding, initialEvents)
  );

  // Sync invitationData when active wedding changes or on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storedInv = localStorage.getItem(`weddingos_invitation_data_${wedding.id}`);
        if (storedInv) {
          const parsed: InvitationWeddingData = JSON.parse(storedInv);
          setInvitationData(parsed);
          setSelectedTemplateId(parsed.selectedTemplateId || "luxury-gold-001");
        } else {
          const def = createDefaultWeddingData(wedding, events);
          setInvitationData(def);
          setSelectedTemplateId(def.selectedTemplateId || "luxury-gold-001");
        }
      } catch (e) {
        console.error("Error loading invitation data", e);
      }
    }
  }, [wedding.id]);

  // Load created weddings from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("weddingos_all_weddings");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setAllWeddings(parsed);
          }
        }
        const activeId = localStorage.getItem("weddingos_active_wedding_id");
        if (activeId && stored) {
          const parsed = JSON.parse(stored);
          const matched = parsed.find((w: Wedding) => w.id === activeId);
          if (matched) setWedding(matched);
        }
      } catch (e) {
        console.error("Could not load weddings from localStorage", e);
      }
    }
  }, []);

  const createNewWedding = (data: {
    brideName: string;
    groomName: string;
    weddingDate: string;
    city: string;
    primaryVenue: string;
    email?: string;
  }): Wedding => {
    const bride = data.brideName.trim() || "Priya";
    const groom = data.groomName.trim() || "Rahul";
    const coupleNames = `${bride} & ${groom}`;
    const slug = `${bride}-${groom}`.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const newId = `wed-${Date.now()}`;

    const newWed: Wedding = {
      ...initialWedding,
      id: newId,
      slug,
      coupleNames,
      brideName: bride,
      groomName: groom,
      weddingDate: data.weddingDate.trim() || "12 December 2026",
      city: data.city.trim() || "Hyderabad",
      primaryVenue: data.primaryVenue.trim() || "Taj Falaknuma Palace, Hyderabad",
      totalInvited: 250,
      confirmedCount: 140,
      pendingCount: 95,
      declinedCount: 15,
      checkedInCount: 0,
      rsvpCompletionPercentage: 62,
      aiAttendanceEstimate: {
        min: 165,
        max: 185,
        expected: 175,
        factors: [
          "Freshly initiated wedding list",
          "Family cluster confirmations anticipated"
        ]
      },
      cateringEstimate: {
        expectedGuests: 175,
        vegetarian: 105,
        nonVegetarian: 60,
        jain: 10,
        vegan: 0,
        bufferPercent: 7,
        recommendedMeals: 188
      }
    };

    setWedding(newWed);
    setAllWeddings(prev => {
      const exists = prev.some(w => w.id === newWed.id);
      const nextList = exists ? prev.map(w => w.id === newWed.id ? newWed : w) : [newWed, ...prev];
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("weddingos_all_weddings", JSON.stringify(nextList));
          localStorage.setItem("weddingos_active_wedding_id", newWed.id);
          const initialData = createDefaultWeddingData(newWed, initialEvents);
          localStorage.setItem(`weddingos_invitation_data_${newWed.id}`, JSON.stringify(initialData));
          setInvitationData(initialData);
        } catch (e) {
          console.error(e);
        }
      }
      return nextList;
    });

    return newWed;
  };

  const switchWedding = (weddingId: string) => {
    const normalize = (s?: string) => (s || "").toLowerCase().replace(/[^a-z0-9]/g, "");
    const target = normalize(weddingId);
    let found = allWeddings.find(w => w.id === weddingId || normalize(w.slug) === target || normalize(w.coupleNames) === target);

    if (!found && typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("weddingos_all_weddings");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            found = parsed.find((w: Wedding) => w.id === weddingId || normalize(w.slug) === target || normalize(w.coupleNames) === target);
          }
        }
      } catch (e) {
        console.error(e);
      }
    }

    if (found) {
      setWedding(found);
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("weddingos_active_wedding_id", found.id);
        } catch (e) {
          console.error(e);
        }
      }
    }
  };

  const selectedTemplate = templates.find(t => t.id === selectedTemplateId) || templates[0];

  const selectTemplate = (templateId: string) => {
    setSelectedTemplateId(templateId);
    setInvitationData(prev => {
      const updated: InvitationWeddingData = {
        ...prev,
        selectedTemplateId: templateId
      };
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(`weddingos_invitation_data_${wedding.id}`, JSON.stringify(updated));
        } catch (e) {
          console.error(e);
        }
      }
      return updated;
    });

    setWedding(prev => {
      const updated = { ...prev, selectedTemplateId: templateId };
      setAllWeddings(list => list.map(w => w.id === prev.id ? updated : w));
      if (typeof window !== "undefined") {
        try {
          const list = allWeddings.map(w => w.id === prev.id ? updated : w);
          localStorage.setItem("weddingos_all_weddings", JSON.stringify(list));
        } catch (e) {
          console.error(e);
        }
      }
      return updated;
    });
  };

  const updateInvitationData = (updates: Partial<InvitationWeddingData>) => {
    setInvitationData(prev => {
      const updated: InvitationWeddingData = {
        ...prev,
        ...updates,
        couple: updates.couple ? { ...prev.couple, ...updates.couple } : prev.couple,
        wedding: updates.wedding ? { ...prev.wedding, ...updates.wedding } : prev.wedding,
        venue: updates.venue ? { ...prev.venue, ...updates.venue } : prev.venue,
        story: updates.story ? { ...prev.story, ...updates.story } : prev.story,
        family: updates.family ? { ...prev.family, ...updates.family } : prev.family,
        rsvp: updates.rsvp ? { ...prev.rsvp, ...updates.rsvp } : prev.rsvp,
        additional: updates.additional ? { ...prev.additional, ...updates.additional } : prev.additional,
        designOverrides: updates.designOverrides ? { ...prev.designOverrides, ...updates.designOverrides } : prev.designOverrides
      };

      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(`weddingos_invitation_data_${wedding.id}`, JSON.stringify(updated));
        } catch (e) {
          console.error(e);
        }
      }

      // Sync couple names & dates back to wedding object
      if (updates.couple?.displayNames || updates.wedding?.weddingDate || updates.venue?.city || updates.venue?.venueName) {
        setWedding(currWed => ({
          ...currWed,
          coupleNames: updates.couple?.displayNames || currWed.coupleNames,
          weddingDate: updates.wedding?.weddingDate || currWed.weddingDate,
          city: updates.venue?.city || currWed.city,
          primaryVenue: updates.venue?.venueName || currWed.primaryVenue
        }));
      }

      return updated;
    });
  };

  const publishInvitation = (customSlug?: string): { success: boolean; slug: string; url: string; error?: string } => {
    const targetSlug = customSlug || invitationData.slug || wedding.slug;
    const validation = validateSlug(targetSlug);
    if (!validation.valid) {
      return { success: false, slug: targetSlug, url: "", error: validation.error };
    }

    const cleanSlug = validation.cleanSlug;

    // Check duplicate slug among other weddings
    const isDuplicate = allWeddings.some(w => w.id !== wedding.id && w.slug.toLowerCase() === cleanSlug.toLowerCase());
    if (isDuplicate) {
      return {
        success: false,
        slug: cleanSlug,
        url: "",
        error: `The custom link '/invite/${cleanSlug}' is already claimed by another wedding. Please choose a different slug.`
      };
    }

    const updatedInv: InvitationWeddingData = {
      ...invitationData,
      slug: cleanSlug,
      status: "published",
      publishedAt: new Date().toISOString()
    };
    setInvitationData(updatedInv);

    const updatedWed: Wedding = {
      ...wedding,
      slug: cleanSlug,
      selectedTemplateId,
      invitationData: updatedInv
    };
    setWedding(updatedWed);

    setAllWeddings(list => {
      const next = list.map(w => w.id === updatedWed.id ? updatedWed : w);
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("weddingos_all_weddings", JSON.stringify(next));
          localStorage.setItem(`weddingos_invitation_data_${updatedWed.id}`, JSON.stringify(updatedInv));
        } catch (e) {
          console.error(e);
        }
      }
      return next;
    });

    return {
      success: true,
      slug: cleanSlug,
      url: `/invite/${cleanSlug}`
    };
  };

  const unpublishInvitation = () => {
    setInvitationData(prev => {
      const updated: InvitationWeddingData = { ...prev, status: "draft" };
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(`weddingos_invitation_data_${wedding.id}`, JSON.stringify(updated));
        } catch (e) {
          console.error(e);
        }
      }
      return updated;
    });
  };

  const saveCustomTemplate = (newTemplate: InvitationTemplate) => {
    setTemplates(prev => {
      const idx = prev.findIndex(t => t.id === newTemplate.id);
      const next = idx >= 0 ? prev.map(t => t.id === newTemplate.id ? newTemplate : t) : [newTemplate, ...prev];
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("weddingos_custom_templates", JSON.stringify(next));
        } catch (e) {
          console.error(e);
        }
      }
      return next;
    });
  };

  const deleteCustomTemplate = (templateId: string) => {
    setTemplates(prev => {
      const next = prev.filter(t => t.id !== templateId);
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("weddingos_custom_templates", JSON.stringify(next));
        } catch (e) {
          console.error(e);
        }
      }
      return next;
    });
  };

  // Recompute summary metrics whenever guests change
  useEffect(() => {
    const totalInvited = 800; // Base baseline from prompt
    const confirmedCount = 526 + guests.filter(g => g.id.startsWith("new-") && g.rsvpStatus === "confirmed").length;
    const declinedCount = 91 + guests.filter(g => g.id.startsWith("new-") && g.rsvpStatus === "declined").length;
    const pendingCount = Math.max(0, totalInvited - confirmedCount - declinedCount);
    const checkedInCount = guests.filter(g => g.checkedIn).length + 418;
    const rsvpCompletionPercentage = Math.round(((confirmedCount + declinedCount) / totalInvited) * 100);

    // AI Attendance dynamic formula
    const expected = Math.round(confirmedCount * 0.91 + pendingCount * 0.12);
    const min = expected - 11;
    const max = expected + 12;

    // Catering dynamic formula
    const vegCount = Math.round(expected * 0.60);
    const nonVegCount = Math.round(expected * 0.36);
    const jainCount = expected - vegCount - nonVegCount;
    const recommendedMeals = Math.round(expected * 1.07);

    setWedding(prev => ({
      ...prev,
      confirmedCount,
      pendingCount,
      declinedCount,
      checkedInCount,
      rsvpCompletionPercentage,
      aiAttendanceEstimate: {
        ...prev.aiAttendanceEstimate,
        expected,
        min,
        max
      },
      cateringEstimate: {
        ...prev.cateringEstimate,
        expectedGuests: expected,
        vegetarian: vegCount,
        nonVegetarian: nonVegCount,
        jain: jainCount,
        recommendedMeals
      }
    }));
  }, [guests]);

  const submitGuestRsvp = async (data: {
    guestName: string;
    phone: string;
    email?: string;
    rsvpStatus: RSVPStatus;
    eventsAttending: string[];
    foodPreference: FoodPreference;
    arrivalTime?: string;
    familyMembersAttending?: string[];
  }) => {
    // Check if guest already exists
    const existingIndex = guests.findIndex(
      g => g.phone.replace(/\D/g, "") === data.phone.replace(/\D/g, "") ||
           g.name.toLowerCase() === data.guestName.toLowerCase()
    );

    let updatedGuest: Guest;

    if (existingIndex >= 0) {
      const existing = guests[existingIndex];
      updatedGuest = {
        ...existing,
        rsvpStatus: data.rsvpStatus,
        eventsAttending: data.rsvpStatus === "confirmed" ? data.eventsAttending : [],
        foodPreference: data.foodPreference,
        arrivalTime: data.arrivalTime || existing.arrivalTime,
        history: [
          ...(existing.history || []),
          {
            timestamp: new Date().toLocaleTimeString(),
            action: "RSVP Updated",
            details: `Status: ${data.rsvpStatus}, Food: ${data.foodPreference}, Events: ${data.eventsAttending.length}`
          }
        ]
      };

      setGuests(prev => {
        const next = [...prev];
        next[existingIndex] = updatedGuest;
        return next;
      });
    } else {
      const newId = `new-gst-${Date.now()}`;
      updatedGuest = {
        id: newId,
        weddingId: wedding.id,
        name: data.guestName,
        phone: data.phone,
        email: data.email || `${data.guestName.toLowerCase().replace(/\s+/g, ".")}@guest.weddingos.com`,
        side: "bride",
        relation: "Guest",
        tags: ["VIP"],
        rsvpStatus: data.rsvpStatus,
        eventsAttending: data.rsvpStatus === "confirmed" ? data.eventsAttending : [],
        foodPreference: data.foodPreference,
        arrivalTime: data.arrivalTime || "7:00 PM",
        tableNumber: `Table-${Math.floor(Math.random() * 20) + 1}`,
        parkingSlot: `P${Math.floor(Math.random() * 8) + 1}`,
        checkedIn: false,
        inviteToken: `tkn-${Math.random().toString(36).substring(2, 9)}`,
        qrCode: `WOS-RP-${Math.floor(Math.random() * 900) + 100}`,
        history: [
          {
            timestamp: new Date().toLocaleTimeString(),
            action: "RSVP Created",
            details: `Guest self-RSVP: ${data.rsvpStatus}`
          }
        ]
      };
      setGuests(prev => [updatedGuest, ...prev]);
    }

    // Update event attendance count
    if (data.rsvpStatus === "confirmed") {
      setEvents(prev => prev.map(ev => {
        if (data.eventsAttending.includes(ev.id)) {
          return {
            ...ev,
            confirmedCount: ev.confirmedCount + 1,
            foodRequirements: {
              ...ev.foodRequirements,
              vegetarian: data.foodPreference === "Vegetarian" ? ev.foodRequirements.vegetarian + 1 : ev.foodRequirements.vegetarian,
              nonVegetarian: data.foodPreference === "Non-Vegetarian" ? ev.foodRequirements.nonVegetarian + 1 : ev.foodRequirements.nonVegetarian,
              jain: data.foodPreference === "Jain" ? ev.foodRequirements.jain + 1 : ev.foodRequirements.jain,
            }
          };
        }
        return ev;
      }));
    }

    return {
      success: true,
      guest: updatedGuest,
      message: `RSVP recorded successfully for ${updatedGuest.name}`
    };
  };

  const getGuestByToken = (tokenOrSlug: string): Guest | undefined => {
    if (!tokenOrSlug) return undefined;
    const clean = tokenOrSlug.toLowerCase().trim();
    const normalize = (s: string) => (s || "").toLowerCase().replace(/[^a-z0-9]/g, "");
    const cleanNorm = normalize(clean);

    return guests.find(g => {
      const tkn = (g.inviteToken || "").toLowerCase();
      const id = (g.id || "").toLowerCase();
      const nameNorm = normalize(g.name || "");
      return tkn === clean || id === clean || nameNorm === cleanNorm || (cleanNorm.length > 3 && nameNorm.includes(cleanNorm));
    });
  };

  const markInvitationOpened = (tokenOrId: string): Guest | undefined => {
    const target = getGuestByToken(tokenOrId);
    if (!target) return undefined;

    if (!target.invitationOpened) {
      const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ", " + new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short" });
      const updated: Guest = {
        ...target,
        invitationOpened: true,
        invitationOpenedAt: nowStr,
        history: [
          ...(target.history || []),
          {
            timestamp: nowStr,
            action: "Invitation Opened",
            details: "Guest opened personalized digital invitation link"
          }
        ]
      };

      setGuests(prev => prev.map(g => g.id === target.id ? updated : g));
      return updated;
    }
    return target;
  };

  const recordInvitationSent = (guestId: string, channel: "whatsapp" | "sms" | "email") => {
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ", " + new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short" });
    setGuests(prev => prev.map(g => {
      if (g.id === guestId || g.inviteToken === guestId) {
        return {
          ...g,
          inviteSent: true,
          inviteSentAt: nowStr,
          history: [
            ...(g.history || []),
            {
              timestamp: nowStr,
              action: `Invitation Sent via ${channel.toUpperCase()}`,
              details: `Personalized invitation link generated and dispatched`
            }
          ]
        };
      }
      return g;
    }));
  };

  const addGuest = (guestData: Omit<Guest, "id" | "weddingId" | "inviteToken" | "qrCode" | "checkedIn">) => {
    const newGuest: Guest = {
      ...guestData,
      id: `new-gst-${Date.now()}`,
      weddingId: wedding.id,
      inviteToken: `tkn-${Math.random().toString(36).substring(2, 9)}`,
      qrCode: `WOS-RP-${Math.floor(Math.random() * 900) + 100}`,
      checkedIn: false,
      history: [
        {
          timestamp: new Date().toLocaleTimeString(),
          action: "Added to Guest CRM",
          details: `Manual addition by ${currentRole}`
        }
      ]
    };
    setGuests(prev => [newGuest, ...prev]);
  };

  const toggleCheckIn = (guestId: string) => {
    setGuests(prev => prev.map(g => {
      if (g.id === guestId) {
        const nextState = !g.checkedIn;
        return {
          ...g,
          checkedIn: nextState,
          checkedInAt: nextState ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : undefined,
          history: [
            ...(g.history || []),
            {
              timestamp: new Date().toLocaleTimeString(),
              action: nextState ? "Checked In at Venue Gate" : "Check-in Undone",
              details: nextState ? `Table assigned: ${g.tableNumber || 'A12'}` : 'Manual status change'
            }
          ]
        };
      }
      return g;
    }));
  };

  const updateEvent = (eventId: string, updates: Partial<WeddingEvent>) => {
    setEvents(prev => prev.map(ev => ev.id === eventId ? { ...ev, ...updates } : ev));
  };

  const updateWeddingSettings = (updates: Partial<Wedding>) => {
    setWedding(prev => ({ ...prev, ...updates }));
  };

  const sendCampaignMessage = (campaignId: string) => {
    setCampaigns(prev => prev.map(c => {
      if (c.id === campaignId) {
        return {
          ...c,
          sentCount: c.sentCount + 12,
          deliveredCount: c.deliveredCount + 12,
          openedCount: c.openedCount + 9,
          status: "sent"
        };
      }
      return c;
    }));
  };

  const exportGuestsToCsv = () => {
    const headers = ["Name", "Side", "Relation", "Family", "RSVP Status", "Food Preference", "Arrival Time", "Table", "Parking", "Checked In", "Phone", "Email"];
    const rows = guests.map(g => [
      `"${g.name}"`,
      g.side,
      `"${g.relation}"`,
      `"${g.familyName || 'Individual'}"`,
      g.rsvpStatus,
      g.foodPreference,
      g.arrivalTime || "TBD",
      g.tableNumber || "Unassigned",
      g.parkingSlot || "None",
      g.checkedIn ? "Yes" : "No",
      g.phone,
      g.email
    ]);
    return [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
  };

  const importCsvGuests = (csvText: string) => {
    const lines = csvText.trim().split("\n");
    if (lines.length <= 1) return { added: 0, errors: ["Empty or invalid CSV file"] };

    let addedCount = 0;
    const newGuestsList: Guest[] = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      const parts = line.split(",").map(p => p.replace(/^"|"$/g, "").trim());
      if (parts.length >= 2) {
        const name = parts[0] || "Guest";
        const side = (parts[1]?.toLowerCase().includes("groom") ? "groom" : "bride") as "groom" | "bride";
        const phone = parts[2] || `+91 98000 ${Math.floor(10000 + Math.random() * 90000)}`;
        const food = (parts[3] || "Vegetarian") as FoodPreference;

        newGuestsList.push({
          id: `new-gst-${Date.now()}-${i}`,
          weddingId: wedding.id,
          name,
          side,
          phone,
          email: `${name.toLowerCase().replace(/\s+/g, ".")}@example.com`,
          relation: parts[4] || "Family Friend",
          tags: ["Family"],
          rsvpStatus: "pending",
          eventsAttending: ["evt-wedding", "evt-reception"],
          foodPreference: ["Vegetarian", "Non-Vegetarian", "Jain", "Vegan"].includes(food) ? food : "Vegetarian",
          tableNumber: `Table-${(i % 15) + 1}`,
          parkingSlot: `P${(i % 5) + 1}`,
          checkedIn: false,
          inviteToken: `tkn-${Math.random().toString(36).substring(2, 9)}`,
          qrCode: `WOS-RP-${Math.floor(Math.random() * 900) + 100}`,
          history: [{ timestamp: new Date().toLocaleTimeString(), action: "Imported via CSV", details: "Batch sync" }]
        });
        addedCount++;
      }
    }

    if (addedCount > 0) {
      setGuests(prev => [...newGuestsList, ...prev]);
    }

    return { added: addedCount, errors: [] };
  };

  const queryAiAssistant = async (query: string): Promise<{ answer: string; relatedData?: any }> => {
    const q = query.toLowerCase();

    // 1. Food / Catering queries
    if (q.includes("food") || q.includes("catering") || q.includes("prepare") || q.includes("meals")) {
      const expected = wedding.cateringEstimate.expectedGuests;
      const recommended = wedding.cateringEstimate.recommendedMeals;
      const veg = wedding.cateringEstimate.vegetarian;
      const nonVeg = wedding.cateringEstimate.nonVegetarian;
      const jain = wedding.cateringEstimate.jain;
      return {
        answer: `Based on 526 confirmed RSVPs and historical attendance modeling, you should prepare food for **${recommended} meals** (${expected} expected guests + 7% safety buffer).\n\n• **Vegetarian:** ${veg} meals\n• **Non-Vegetarian:** ${nonVeg} meals\n• **Jain:** ${jain} meals (strictly isolated counter recommended)`,
        relatedData: wedding.cateringEstimate
      };
    }

    // 2. Who hasn't responded / pending guests
    if (q.includes("hasn't responded") || q.includes("pending") || q.includes("who")) {
      const pendingCount = wedding.pendingCount;
      const samplePending = guests.filter(g => g.rsvpStatus === "pending").map(g => g.name).slice(0, 5);
      return {
        answer: `There are currently **${pendingCount} guests** who haven't completed their RSVP. Key families awaiting confirmation include:\n\n• **Kapoor Family** (Sanjay Kapoor, 3 members pending overseas flight)\n• **Dr. Alok Verma** (College alumni cluster)\n• **Smt. Shakuntala Rao** (Senior family relatives)\n\nRecommended action: Trigger WhatsApp reminder sequence #2 to all ${pendingCount} pending contacts.`,
        relatedData: { pendingCount, samplePending }
      };
    }

    // 3. Sangeet / specific event attendance
    if (q.includes("sangeet") || q.includes("mehendi") || q.includes("haldi") || q.includes("reception")) {
      const matchedEvt = events.find(e => q.includes(e.name.toLowerCase()));
      if (matchedEvt) {
        return {
          answer: `For **${matchedEvt.name}** (${matchedEvt.date} at ${matchedEvt.time}):\n• Confirmed Attendees: **${matchedEvt.confirmedCount} / ${matchedEvt.capacity}** (${Math.round((matchedEvt.confirmedCount / matchedEvt.capacity) * 100)}% capacity)\n• Catering Split: ${matchedEvt.foodRequirements.vegetarian} Veg, ${matchedEvt.foodRequirements.nonVegetarian} Non-Veg, ${matchedEvt.foodRequirements.jain} Jain meals.\n• Venue: ${matchedEvt.venue}`,
          relatedData: matchedEvt
        };
      }
    }

    // 4. Jain meals
    if (q.includes("jain")) {
      return {
        answer: `Currently, **${wedding.cateringEstimate.jain} pure Jain meals** are required for the wedding ceremonies. The largest Jain contingent is with the **Mehta Family** (Dharmesh Mehta, 4 guests) seated at Table J-04. The catering team has been notified to set up an isolated Jain station.`,
        relatedData: { jainMeals: wedding.cateringEstimate.jain }
      };
    }

    // 5. Arrival times
    if (q.includes("arrival") || q.includes("arriving") || q.includes("7 pm")) {
      return {
        answer: `**348 guests** are scheduled to arrive before 7:00 PM. Peak airport arrivals cluster between 3:00 PM and 6:30 PM on 18th & 20th November. Falcon Luxury Mobility has 18 Innova Crystas active on shuttle loops from RGIA Airport Terminal 1.`,
        relatedData: { peakArrivals: "3:00 PM - 6:30 PM", vehiclesDispatched: 18 }
      };
    }

    // 6. Changed RSVP
    if (q.includes("changed") || q.includes("updated") || q.includes("rsvp")) {
      return {
        answer: `**17 guests** changed their RSVP in the last 72 hours. Notable changes:\n• **Meera Reddy**: Updated plus-one from Pending to Attending\n• **Karan Singhania**: Regretfully shifted to Declined due to board meeting in London\n• **Dev Varma**: Added to Sangeet guest list`,
        relatedData: { changedCount: 17 }
      };
    }

    // 7. Tomorrow's events summary
    if (q.includes("tomorrow") || q.includes("summary") || q.includes("schedule")) {
      return {
        answer: `**Wedding Day Operational Summary:**\n\n1. **Sacred Muhurtham & Varmala** (8:00 AM – 1:00 PM at Rajasthani Mandap)\n   • 526 Confirmed Guests\n   • Sadhya Lunch: 334 Veg, 173 Non-Veg, 19 Jain\n   • Valet Parking: 120 cars allocated at P1-P4\n\n2. **The Grand Regal Reception** (7:00 PM – 11:30 PM at Palace Amphitheatre)\n   • 612 Confirmed Guests\n   • Symphony Orchestra & Awadhi Banquet`,
        relatedData: { eventsScheduled: 2, totalDayAttendance: 612 }
      };
    }

    // Generic intelligent fallback
    return {
      answer: `WeddingOS AI Analysis for **${wedding.coupleNames}**:\n• Total Invited: **${wedding.totalInvited}**\n• Confirmed: **${wedding.confirmedCount}** (66% completion)\n• Expected Live Headcount: **${wedding.aiAttendanceEstimate.min}–${wedding.aiAttendanceEstimate.max} guests**\n• Recommended Catering: **${wedding.cateringEstimate.recommendedMeals} meals** with +7% safety buffer.\n\nYou can ask about catering numbers, pending guests, family RSVPs, transportation schedule, or specific event headcounts!`,
      relatedData: { confirmed: wedding.confirmedCount, pending: wedding.pendingCount }
    };
  };

  const addGift = (giftData: Omit<WeddingGift, "id" | "weddingId">) => {
    const newGift: WeddingGift = {
      ...giftData,
      id: `gft-${Date.now()}`,
      weddingId: wedding.id
    };
    setGifts(prev => [newGift, ...prev]);
  };

  const updateGift = (giftId: string, updates: Partial<WeddingGift>) => {
    setGifts(prev => prev.map(g => g.id === giftId ? { ...g, ...updates } : g));
  };

  const deleteGift = (giftId: string) => {
    setGifts(prev => prev.filter(g => g.id !== giftId));
  };

  const updateAttire = (eventId: string, updates: Partial<AttireRecommendation>) => {
    setAttireList(prev => prev.map(a => a.eventId === eventId ? { ...a, ...updates } : a));
  };

  const toggleReminder = (reminderId: string) => {
    setReminders(prev => prev.map(r => r.id === reminderId ? { ...r, enabled: !r.enabled } : r));
  };

  const addReminder = (remData: Omit<ScheduledReminder, "id" | "weddingId" | "sentCount">) => {
    const newRem: ScheduledReminder = {
      ...remData,
      id: `rem-${Date.now()}`,
      weddingId: wedding.id,
      sentCount: 0
    };
    setReminders(prev => [...prev, newRem]);
  };

  const generateAiVideo = async (data: {
    title: string;
    style: AIVideo["style"];
    musicTrack: string;
    photos: string[];
    storyScript: string;
  }): Promise<AIVideo> => {
    const newVid: AIVideo = {
      id: `vid-${Date.now()}`,
      weddingId: wedding.id,
      coupleNames: wedding.coupleNames,
      title: data.title,
      style: data.style,
      musicTrack: data.musicTrack,
      photos: data.photos.length > 0 ? data.photos : initialAiVideo.photos,
      storyScript: data.storyScript,
      status: "ready",
      durationSeconds: 45,
      aspectRatio: "16:9",
      createdAt: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
      videoUrl: initialAiVideo.videoUrl
    };
    setAiVideo(newVid);
    return newVid;
  };

  return (
    <WeddingContext.Provider
      value={{
        wedding,
        allWeddings,
        events,
        guests,
        families,
        transportation,
        hotels,
        vendors,
        campaigns,
        gifts,
        attireList,
        reminders,
        aiVideo,
        currentLanguage,
        setCurrentLanguage,
        translations: weddingTranslations,
        currentRole,
        setCurrentRole,
        templates,
        selectedTemplate,
        selectedTemplateId,
        invitationData,
        selectTemplate,
        updateInvitationData,
        publishInvitation,
        unpublishInvitation,
        saveCustomTemplate,
        deleteCustomTemplate,
        createNewWedding,
        switchWedding,
        getGuestByToken,
        markInvitationOpened,
        recordInvitationSent,
        submitGuestRsvp,
        addGuest,
        importCsvGuests,
        exportGuestsToCsv,
        toggleCheckIn,
        updateEvent,
        updateWeddingSettings,
        sendCampaignMessage,
        queryAiAssistant,
        addGift,
        updateGift,
        deleteGift,
        updateAttire,
        toggleReminder,
        addReminder,
        generateAiVideo,
      }}
    >
      {children}
    </WeddingContext.Provider>
  );
}

export function useWedding() {
  const context = useContext(WeddingContext);
  if (!context) {
    throw new Error("useWedding must be used within a WeddingProvider");
  }
  return context;
}
