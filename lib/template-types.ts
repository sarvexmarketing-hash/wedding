export type TemplateCategory =
  | "All"
  | "Elegant"
  | "Luxury"
  | "Minimal"
  | "Traditional"
  | "Indian"
  | "Royal"
  | "Floral"
  | "Modern"
  | "Destination"
  | "Pastel"
  | "Dark"
  | "Photo-focused"
  | "Animated";

export type TemplateStyle =
  | "traditional"
  | "modern"
  | "luxury"
  | "minimal"
  | "floral"
  | "editorial"
  | "royal";

export type SectionType =
  | "hero"
  | "names"
  | "date"
  | "countdown"
  | "story"
  | "timeline"
  | "events"
  | "venue"
  | "map"
  | "gallery"
  | "family"
  | "rsvp"
  | "dressCode"
  | "travel"
  | "accommodation"
  | "contact"
  | "gift"
  | "footer";

export interface TemplateSectionConfig {
  id: string;
  type: SectionType;
  title?: string;
  enabled: boolean;
  layout: "center" | "split" | "overlay" | "grid" | "cards";
  fields?: string[];
  settings?: Record<string, any>;
}

export interface TemplateTheme {
  primaryFont: string;
  secondaryFont: string;
  backgroundColor: string;
  cardBackground: string;
  accentColor: string;
  primaryColor: string;
  textColor: string;
  subtextColor: string;
  borderColor: string;
  borderStyle:
    | "ornate-gold"
    | "royal-palace"
    | "minimal-border"
    | "floral-arch"
    | "velvet-frame"
    | "editorial-box"
    | "none";
  animation?: "subtle-fade" | "gold-shimmer" | "floral-drift" | "royal-reveal" | "none";
  decorations?: {
    cornerMotif?: boolean;
    headerOrnament?: string;
    dividerStyle?: "gold-leaf" | "floral-swag" | "geometric" | "minimal-line";
    mandalaOverlay?: boolean;
  };
}

export interface InvitationTemplate {
  id: string;
  name: string;
  category: TemplateCategory;
  style: TemplateStyle;
  version: number;
  previewImage: string;
  pricingType: "FREE" | "PREMIUM";
  isAnimated: boolean;
  tags: string[];
  theme: TemplateTheme;
  sections: TemplateSectionConfig[];
  description: string;
}

// -------------------------------------------------------------
// WEDDING DATA MODEL (Content decoupled from Template)
// -------------------------------------------------------------

export interface CoupleData {
  brideName: string;
  groomName: string;
  displayNames: string;
  couplePhoto: string;
  bridePhoto?: string;
  groomPhoto?: string;
  brideBio?: string;
  groomBio?: string;
  monogram?: string;
}

export interface WeddingGeneralData {
  weddingTitle: string;
  weddingDate: string;
  weddingTime: string;
  timezone: string;
  customMessage: string;
  hashtag: string;
}

export interface InvitationEventItem {
  id: string;
  name: string;
  date: string;
  startTime: string;
  endTime?: string;
  venue: string;
  address: string;
  description: string;
  image?: string;
  dressCode: string;
  mapUrl?: string;
  icon?: string;
}

export interface VenueData {
  venueName: string;
  address: string;
  city: string;
  latitude?: number;
  longitude?: number;
  googleMapsLink: string;
  parkingInfo?: string;
  nearbyAirports?: string;
}

export interface StoryTimelineItem {
  id: string;
  year: string;
  title: string;
  story: string;
  image?: string;
}

export interface StoryData {
  howWeMet: string;
  relationshipStory: string;
  timeline: StoryTimelineItem[];
}

export interface GalleryImageItem {
  id: string;
  url: string;
  caption: string;
  order: number;
}

export interface FamilyMemberItem {
  id: string;
  name: string;
  relation: string;
  note: string;
}

export interface FamilyData {
  brideParents: string;
  groomParents: string;
  customMembers: FamilyMemberItem[];
}

export interface RsvpSettingsData {
  enabled: boolean;
  deadline: string;
  phoneRequired: boolean;
  emailRequired: boolean;
  allowGuestCount: boolean;
  maxGuestsPerInvite: number;
  dietaryOptions: string[];
  notesPrompt: string;
}

export interface AdditionalData {
  countdownEnabled: boolean;
  dressCodeOverview: string;
  travelInfo: string;
  accommodation: string;
  contactInfo: string;
  giftRegistry: string;
}

export interface InvitationAnalytics {
  views: number;
  uniqueVisitors: number;
  rsvpClicks: number;
  rsvpSubmissions: number;
  mapClicks: number;
  shareClicks: number;
}

export interface InvitationWeddingData {
  weddingId: string;
  slug: string;
  status: "draft" | "published";
  publishedAt?: string;
  selectedTemplateId: string;
  templateVersion: number;
  designOverrides?: {
    themeColor?: string;
    primaryFont?: string;
    backgroundColor?: string;
    cardBackground?: string;
  };
  couple: CoupleData;
  wedding: WeddingGeneralData;
  events: InvitationEventItem[];
  venue: VenueData;
  story: StoryData;
  gallery: GalleryImageItem[];
  family: FamilyData;
  rsvp: RsvpSettingsData;
  additional: AdditionalData;
  analytics?: InvitationAnalytics;
}
