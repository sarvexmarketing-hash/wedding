import {
  InvitationTemplate,
  InvitationWeddingData,
  TemplateSectionConfig
} from "./template-types";
import { Wedding, WeddingEvent } from "./types";

const defaultSectionsList: TemplateSectionConfig[] = [
  { id: "sec-hero", type: "hero", title: "Celebration Welcome", enabled: true, layout: "center" },
  { id: "sec-names", type: "names", title: "The Couple", enabled: true, layout: "center" },
  { id: "sec-date", type: "date", title: "Muhurat Date", enabled: true, layout: "center" },
  { id: "sec-countdown", type: "countdown", title: "Auspicious Countdown", enabled: true, layout: "center" },
  { id: "sec-story", type: "story", title: "Our Love Story", enabled: true, layout: "split" },
  { id: "sec-events", type: "events", title: "Ceremony Timeline", enabled: true, layout: "cards" },
  { id: "sec-venue", type: "venue", title: "The Palace & Directions", enabled: true, layout: "split" },
  { id: "sec-gallery", type: "gallery", title: "Photo Memories", enabled: true, layout: "grid" },
  { id: "sec-dressCode", type: "dressCode", title: "What Should I Wear?", enabled: true, layout: "cards" },
  { id: "sec-family", type: "family", title: "With Our Families", enabled: true, layout: "center" },
  { id: "sec-travel", type: "travel", title: "Travel & Hospitality", enabled: true, layout: "cards" },
  { id: "sec-gift", type: "gift", title: "Blessings & Shagun", enabled: true, layout: "center" },
  { id: "sec-rsvp", type: "rsvp", title: "Confirm Attendance", enabled: true, layout: "center" },
  { id: "sec-footer", type: "footer", title: "Sign-off", enabled: true, layout: "center" }
];

export const initialTemplates: InvitationTemplate[] = [
  // 1. Elegant Gold
  {
    id: "luxury-gold-001",
    name: "Elegant Gold",
    category: "Luxury",
    style: "luxury",
    version: 1,
    previewImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    pricingType: "FREE",
    isAnimated: true,
    tags: ["Gold", "Ornate", "Classic", "Royalty", "Luxury"],
    description: "Opulent ivory backdrop framed with delicate 24-carat gold filigree and royal serif typography.",
    theme: {
      primaryFont: "font-serif",
      secondaryFont: "font-sans",
      backgroundColor: "#FAF7F0",
      cardBackground: "#FFFFFF",
      accentColor: "#C5A059",
      primaryColor: "#74182E",
      textColor: "#2D1B28",
      subtextColor: "#6B5364",
      borderColor: "#E6D3B3",
      borderStyle: "ornate-gold",
      animation: "gold-shimmer",
      decorations: {
        cornerMotif: true,
        mandalaOverlay: true,
        dividerStyle: "gold-leaf"
      }
    },
    sections: defaultSectionsList
  },

  // 2. Royal Indian
  {
    id: "royal-indian-002",
    name: "Royal Indian Palace",
    category: "Royal",
    style: "royal",
    version: 1,
    previewImage: "https://images.unsplash.com/photo-1781077127258-2f3f22cf5d5e?auto=format&fit=crop&w=800&q=80",
    pricingType: "PREMIUM",
    isAnimated: true,
    tags: ["Indian", "Royal", "Palace", "Crimson", "Heritage"],
    description: "Inspired by the palaces of Hyderabad and Rajasthan, with deep royal burgundy and gold arches.",
    theme: {
      primaryFont: "font-serif",
      secondaryFont: "font-sans",
      backgroundColor: "#FAF5EE",
      cardBackground: "#FFFFFF",
      accentColor: "#D4AF37",
      primaryColor: "#6B1426",
      textColor: "#231118",
      subtextColor: "#5E3847",
      borderColor: "#D4AF37",
      borderStyle: "royal-palace",
      animation: "royal-reveal",
      decorations: {
        cornerMotif: true,
        mandalaOverlay: true,
        dividerStyle: "gold-leaf"
      }
    },
    sections: defaultSectionsList
  },

  // 3. Minimal Cream
  {
    id: "minimal-cream-003",
    name: "Minimal Cream",
    category: "Minimal",
    style: "minimal",
    version: 1,
    previewImage: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=800&q=80",
    pricingType: "FREE",
    isAnimated: false,
    tags: ["Minimal", "Clean", "Editorial", "Contemporary", "Modern"],
    description: "Understated editorial elegance with generous whitespace, crisp hairline borders, and subtle tones.",
    theme: {
      primaryFont: "font-serif",
      secondaryFont: "font-sans",
      backgroundColor: "#FDFBF7",
      cardBackground: "#FFFFFF",
      accentColor: "#9E8B7D",
      primaryColor: "#2B2625",
      textColor: "#1F1A19",
      subtextColor: "#665C58",
      borderColor: "#E8E2D7",
      borderStyle: "minimal-border",
      animation: "subtle-fade",
      decorations: {
        cornerMotif: false,
        mandalaOverlay: false,
        dividerStyle: "minimal-line"
      }
    },
    sections: defaultSectionsList
  },

  // 4. Floral Pastel
  {
    id: "floral-pastel-004",
    name: "Floral Pastel",
    category: "Floral",
    style: "floral",
    version: 1,
    previewImage: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
    pricingType: "PREMIUM",
    isAnimated: true,
    tags: ["Floral", "Pastel", "Romantic", "Botanical", "Blush"],
    description: "Soft garden florals, blush peach accents, and delicate botanical watercolor borders.",
    theme: {
      primaryFont: "font-serif",
      secondaryFont: "font-sans",
      backgroundColor: "#F8F5F2",
      cardBackground: "#FFFFFF",
      accentColor: "#C98E7B",
      primaryColor: "#7A4338",
      textColor: "#33221E",
      subtextColor: "#6E524C",
      borderColor: "#EADAD5",
      borderStyle: "floral-arch",
      animation: "floral-drift",
      decorations: {
        cornerMotif: true,
        mandalaOverlay: false,
        dividerStyle: "floral-swag"
      }
    },
    sections: defaultSectionsList
  },

  // 5. Dark Luxury Velvet
  {
    id: "dark-luxury-005",
    name: "Dark Luxury Velvet",
    category: "Dark",
    style: "luxury",
    version: 1,
    previewImage: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
    pricingType: "PREMIUM",
    isAnimated: true,
    tags: ["Dark", "Velvet", "Night", "Glamorous", "Champagne"],
    description: "Sultry midnight plum and glowing champagne gold for glamorous evening receptions and Sangeet celebrations.",
    theme: {
      primaryFont: "font-serif",
      secondaryFont: "font-sans",
      backgroundColor: "#170F18",
      cardBackground: "#221624",
      accentColor: "#DFBA73",
      primaryColor: "#E3BE79",
      textColor: "#F7F0E6",
      subtextColor: "#B39EAE",
      borderColor: "#4A3247",
      borderStyle: "velvet-frame",
      animation: "gold-shimmer",
      decorations: {
        cornerMotif: true,
        mandalaOverlay: true,
        dividerStyle: "gold-leaf"
      }
    },
    sections: defaultSectionsList
  },

  // 6. Modern Photo Editorial
  {
    id: "modern-photo-006",
    name: "Modern Photo Editorial",
    category: "Photo-focused",
    style: "modern",
    version: 1,
    previewImage: "https://images.unsplash.com/photo-1628335179471-987edb152881?auto=format&fit=crop&w=800&q=80",
    pricingType: "FREE",
    isAnimated: false,
    tags: ["Photo-heavy", "Editorial", "Magazine", "Clean", "Visual"],
    description: "High-fashion magazine layout placing the couple's portraiture front and center with bold typography.",
    theme: {
      primaryFont: "font-serif",
      secondaryFont: "font-sans",
      backgroundColor: "#F9F8F6",
      cardBackground: "#FFFFFF",
      accentColor: "#8C7355",
      primaryColor: "#1C1917",
      textColor: "#1C1917",
      subtextColor: "#57534E",
      borderColor: "#E7E5E4",
      borderStyle: "editorial-box",
      animation: "subtle-fade",
      decorations: {
        cornerMotif: false,
        mandalaOverlay: false,
        dividerStyle: "minimal-line"
      }
    },
    sections: defaultSectionsList
  },

  // 7. Destination Wedding
  {
    id: "destination-resort-007",
    name: "Destination Beach & Palace",
    category: "Destination",
    style: "modern",
    version: 1,
    previewImage: "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=800&q=80",
    pricingType: "PREMIUM",
    isAnimated: true,
    tags: ["Destination", "Beach", "Udaipur", "Goa", "Resort", "Travel"],
    description: "Sun-drenched terracotta and resort ivory, tailored for outstation and destination celebration itineraries.",
    theme: {
      primaryFont: "font-serif",
      secondaryFont: "font-sans",
      backgroundColor: "#FBF7F2",
      cardBackground: "#FFFFFF",
      accentColor: "#C96D4B",
      primaryColor: "#2F4858",
      textColor: "#1A2E3B",
      subtextColor: "#5E7280",
      borderColor: "#E8D8C8",
      borderStyle: "ornate-gold",
      animation: "subtle-fade",
      decorations: {
        cornerMotif: false,
        mandalaOverlay: false,
        dividerStyle: "geometric"
      }
    },
    sections: defaultSectionsList
  },

  // 8. Traditional Indian (Vedic Crimson)
  {
    id: "traditional-vedic-008",
    name: "Traditional Indian (Vedic Crimson)",
    category: "Traditional",
    style: "traditional",
    version: 1,
    previewImage: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80",
    pricingType: "FREE",
    isAnimated: true,
    tags: ["Traditional", "Vedic", "Sindoor", "Shubh Vivah", "Indian"],
    description: "Deep sacred sindoor red, Vedic motifs, auspicious Sanskrit blessings, and heritage temple geometry.",
    theme: {
      primaryFont: "font-serif",
      secondaryFont: "font-sans",
      backgroundColor: "#FAF2EC",
      cardBackground: "#FFFFFF",
      accentColor: "#D48B28",
      primaryColor: "#8F1D2C",
      textColor: "#2B1115",
      subtextColor: "#633B42",
      borderColor: "#D48B28",
      borderStyle: "royal-palace",
      animation: "royal-reveal",
      decorations: {
        cornerMotif: true,
        mandalaOverlay: true,
        dividerStyle: "gold-leaf"
      }
    },
    sections: defaultSectionsList
  }
];

export function getAllTemplates(): InvitationTemplate[] {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem("weddingos_custom_templates");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge custom with initial
          const customIds = new Set(parsed.map((t: InvitationTemplate) => t.id));
          const standard = initialTemplates.filter(t => !customIds.has(t.id));
          return [...parsed, ...standard];
        }
      }
    } catch (e) {
      console.error("Error reading custom templates", e);
    }
  }
  return initialTemplates;
}

export function getTemplateById(templateId: string): InvitationTemplate {
  const all = getAllTemplates();
  const found = all.find(t => t.id === templateId);
  return found || initialTemplates[0];
}

export function createDefaultWeddingData(
  wedding: Wedding,
  events: WeddingEvent[] = []
): InvitationWeddingData {
  const parts = wedding.coupleNames.split("&").map(p => p.trim());
  const bride = wedding.brideName || parts[1] || "Priya";
  const groom = wedding.groomName || parts[0] || "Rahul";
  const displayNames = `${groom} & ${bride}`;

  const c1 = groom.charAt(0).toUpperCase() || "R";
  const c2 = bride.charAt(0).toUpperCase() || "P";
  const monogram = `${c1} & ${c2}`;

  const eventItems = events.length > 0
    ? events.map(e => ({
        id: e.id,
        name: e.name,
        date: e.date,
        startTime: e.time,
        endTime: e.endTime || "Late night",
        venue: e.venue,
        address: e.locationAddress,
        description: e.description,
        dressCode: e.dressCode,
        mapUrl: `https://maps.google.com/?q=${encodeURIComponent(e.venue + " " + e.locationAddress)}`,
        icon: "sparkles"
      }))
    : [
        {
          id: "evt-haldi",
          name: "Haldi & Phoolon Ki Holi",
          date: "11 Dec 2026",
          startTime: "10:00 AM",
          endTime: "1:00 PM",
          venue: "Courtyard of Whispers",
          address: `${wedding.primaryVenue}, ${wedding.city}`,
          description: "A joyful morning of turmeric rituals, marigold flower petal showers, and acoustic dhol beats.",
          dressCode: "Sun Yellow / Floral Pastels",
          mapUrl: `https://maps.google.com/?q=${encodeURIComponent(wedding.primaryVenue)}`
        },
        {
          id: "evt-mehendi",
          name: "Mehendi & High Tea",
          date: "11 Dec 2026",
          startTime: "4:00 PM",
          endTime: "8:00 PM",
          venue: "The Durbar Lawns",
          address: `${wedding.primaryVenue}, ${wedding.city}`,
          description: "Henna designs, chai carts, lively music, and artisanal delicacies.",
          dressCode: "Bohemian Green & Pastels",
          mapUrl: `https://maps.google.com/?q=${encodeURIComponent(wedding.primaryVenue)}`
        },
        {
          id: "evt-sangeet",
          name: "The Royal Sangeet",
          date: "11 Dec 2026",
          startTime: "8:00 PM",
          endTime: "2:00 AM",
          venue: "Grand Ballroom",
          address: `${wedding.primaryVenue}, ${wedding.city}`,
          description: "High-octane family performances, signature cocktails, and celebrations into the night.",
          dressCode: "Glamorous Indo-Western / Black Tie",
          mapUrl: `https://maps.google.com/?q=${encodeURIComponent(wedding.primaryVenue)}`
        },
        {
          id: "evt-wedding",
          name: "Sacred Muhurtham & Varmala",
          date: wedding.weddingDate || "12 Dec 2026",
          startTime: "10:30 AM",
          endTime: "2:30 PM",
          venue: "Royal Mandap Lawn",
          address: `${wedding.primaryVenue}, ${wedding.city}`,
          description: "Seven sacred circumambulations around the holy agni, united for eternity.",
          dressCode: "Regal Banarasi Silk / Traditional Sherwani",
          mapUrl: `https://maps.google.com/?q=${encodeURIComponent(wedding.primaryVenue)}`
        },
        {
          id: "evt-reception",
          name: "The Grand Regal Reception",
          date: "12 Dec 2026",
          startTime: "7:30 PM",
          endTime: "Midnight",
          venue: "Palace Terrace",
          address: `${wedding.primaryVenue}, ${wedding.city}`,
          description: "A lavish banquet gala honoring the newly wedded couple under starlit skies.",
          dressCode: "Formal Eveningwear / Black Tie / Couture Saree",
          mapUrl: `https://maps.google.com/?q=${encodeURIComponent(wedding.primaryVenue)}`
        }
      ];

  return {
    weddingId: wedding.id,
    slug: wedding.slug,
    status: "published",
    publishedAt: new Date().toISOString(),
    selectedTemplateId: "luxury-gold-001",
    templateVersion: 1,
    couple: {
      brideName: bride,
      groomName: groom,
      displayNames,
      couplePhoto: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80",
      bridePhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
      groomPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
      brideBio: "Architect, classical dancer, and tea connoisseur.",
      groomBio: "Tech entrepreneur, avid runner, and heritage enthusiast.",
      monogram
    },
    wedding: {
      weddingTitle: "The Royal Union",
      weddingDate: wedding.weddingDate || "12 December 2026",
      weddingTime: "10:30 AM IST",
      timezone: "Asia/Kolkata",
      customMessage: "Together with their families, Rahul & Priya invite you to celebrate the beginning of their new journey together.",
      hashtag: `#${groom}${bride}Wedding`
    },
    events: eventItems,
    venue: {
      venueName: wedding.primaryVenue || "Taj Falaknuma Palace",
      address: `${wedding.primaryVenue}, Engine Bowli, Falaknuma`,
      city: wedding.city || "Hyderabad",
      latitude: 17.3314,
      longitude: 78.4682,
      googleMapsLink: `https://maps.google.com/?q=${encodeURIComponent(wedding.primaryVenue + " " + wedding.city)}`,
      parkingInfo: "Complimentary valet parking and royal carriage transfers provided from palace main gate.",
      nearbyAirports: "Rajiv Gandhi International Airport (HYD) is approx 25 minutes via PVNR Expressway."
    },
    story: {
      howWeMet: "A chance meeting at an art exhibition in Hyderabad blossomed into late-night coffee walks and an unforgettable bond of friendship and shared dreams.",
      relationshipStory: "Over four years of shared travel, laughter, and mutual aspirations, two hearts discovered that home was never a place — it was each other.",
      timeline: [
        {
          id: "tl-1",
          year: "2022",
          title: "The First Chapter",
          story: "Met at the State Gallery of Art in Hyderabad and talked until the gallery doors closed.",
          image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80"
        },
        {
          id: "tl-2",
          year: "2024",
          title: "The Proposal in Udaipur",
          story: "Under fireworks over Lake Pichola, Rahul asked the question that changed forever.",
          image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80"
        },
        {
          id: "tl-3",
          year: "2026",
          title: "The Forever Promise",
          story: "Beginning our next chapter surrounded by the blessings of our dearest loved ones.",
          image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=600&q=80"
        }
      ]
    },
    gallery: [
      {
        id: "img-1",
        url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
        caption: "A quiet moment amidst royal arches",
        order: 1
      },
      {
        id: "img-2",
        url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
        caption: "Golden hour celebrations",
        order: 2
      },
      {
        id: "img-3",
        url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
        caption: "Hand in hand towards forever",
        order: 3
      },
      {
        id: "img-4",
        url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80",
        caption: "The engagement ring ceremony",
        order: 4
      },
      {
        id: "img-5",
        url: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
        caption: "Evening cocktail portraits",
        order: 5
      },
      {
        id: "img-6",
        url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80",
        caption: "Pure joy & unscripted laughter",
        order: 6
      }
    ],
    family: {
      brideParents: "Smt. Sunita & Shri Rajesh Sharma",
      groomParents: "Smt. Meenakshi & Shri Vikramaditya Varma",
      customMembers: [
        { id: "fam-1", name: "Dadi & Dadaji", relation: "Paternal Grandparents", note: "Guiding pillars of our family" },
        { id: "fam-2", name: "Nani & Nanaji", relation: "Maternal Grandparents", note: "With boundless love & blessings" }
      ]
    },
    rsvp: {
      enabled: true,
      deadline: "25 November 2026",
      phoneRequired: true,
      emailRequired: false,
      allowGuestCount: true,
      maxGuestsPerInvite: 6,
      dietaryOptions: ["Vegetarian", "Non-Vegetarian", "Jain", "Vegan", "Other"],
      notesPrompt: "Special food allergy notes or song requests for the DJ"
    },
    additional: {
      countdownEnabled: true,
      dressCodeOverview: "Traditional Indian & Glamorous Indo-Western formalwear",
      travelInfo: "Accommodations reserved at Taj Falaknuma Palace & Taj Krishna Banjara Hills.",
      accommodation: "Airport shuttle and luxury cars scheduled for outstation guests from 10 December.",
      contactInfo: "Wedding Hospitality Concierge: +91 98201 00000 | hospitality@weddingos.com",
      giftRegistry: "Your warm presence and blessings are the greatest gift we could ask for. If you wish to bless the couple, a private shagun envelope is warmly received."
    },
    analytics: {
      views: 342,
      uniqueVisitors: 218,
      rsvpClicks: 145,
      rsvpSubmissions: 92,
      mapClicks: 48,
      shareClicks: 65
    }
  };
}

export function validateSlug(slug: string): { valid: boolean; error?: string; cleanSlug: string } {
  const clean = slug
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "");

  if (!clean || clean.length < 3) {
    return { valid: false, error: "Slug must be at least 3 characters long.", cleanSlug: clean };
  }

  if (clean.length > 60) {
    return { valid: false, error: "Slug must be at most 60 characters.", cleanSlug: clean };
  }

  const reserved = ["app", "admin", "api", "login", "signup", "pass", "pricing", "contact", "about", "features", "solutions", "robots", "sitemap"];
  if (reserved.includes(clean)) {
    return { valid: false, error: `Slug '${clean}' is reserved by the system.`, cleanSlug: clean };
  }

  return { valid: true, cleanSlug: clean };
}
