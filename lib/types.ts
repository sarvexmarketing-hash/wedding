export type Role = "couple" | "planner" | "caterer" | "transport" | "venue_staff" | "guest";

export type RSVPStatus = "confirmed" | "pending" | "declined";

export type FoodPreference = "Vegetarian" | "Non-Vegetarian" | "Jain" | "Vegan" | "Other";

export type GuestSide = "bride" | "groom" | "mutual";

export type GuestTag = "VIP" | "Family" | "College Friend" | "Relative" | "Colleague" | "Child";

export type LanguageCode = "en" | "hi" | "te" | "gu" | "mr" | "pa" | "bn" | "ta";

export interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  ageGroup: "adult" | "child" | "infant";
  rsvpStatus: RSVPStatus;
  foodPreference: FoodPreference;
  eventsAttending: string[];
}

export interface Family {
  id: string;
  weddingId: string;
  name: string;
  headName: string;
  headPhone: string;
  headEmail: string;
  side: GuestSide;
  memberCount: number;
  members: FamilyMember[];
  rsvpCompleted: boolean;
  notes?: string;
}

export interface Guest {
  id: string;
  weddingId: string;
  name: string;
  email: string;
  phone: string;
  side: GuestSide;
  relation: string;
  tags: GuestTag[];
  familyId?: string;
  familyName?: string;
  isFamilyHead?: boolean;
  rsvpStatus: RSVPStatus;
  eventsAttending: string[];
  foodPreference: FoodPreference;
  dietaryNotes?: string;
  arrivalTime?: string;
  arrivalDate?: string;
  tableNumber?: string;
  parkingSlot?: string;
  hotelName?: string;
  roomNumber?: string;
  transportPickup?: boolean;
  pickupLocation?: string;
  checkedIn: boolean;
  checkedInAt?: string;
  inviteToken: string;
  qrCode: string;
  invitationOpened?: boolean;
  invitationOpenedAt?: string;
  inviteSent?: boolean;
  inviteSentAt?: string;
  additionalGuests?: number;
  history?: {
    timestamp: string;
    action: string;
    details: string;
  }[];
}

export interface WeddingEvent {
  id: string;
  weddingId: string;
  name: string;
  title: string;
  date: string;
  time: string;
  endTime?: string;
  venue: string;
  locationAddress: string;
  mapUrl?: string;
  dressCode: string;
  description: string;
  capacity: number;
  confirmedCount: number;
  foodRequirements: {
    vegetarian: number;
    nonVegetarian: number;
    jain: number;
    vegan: number;
  };
}

export interface TransportationItem {
  id: string;
  weddingId: string;
  guestName: string;
  guestPhone: string;
  pickupLocation: string;
  dropLocation: string;
  arrivalTime: string;
  arrivalDate: string;
  flightOrTrainNumber?: string;
  vehicleType: string;
  vehicleNumber: string;
  passengersCount: number;
  driverName: string;
  driverPhone: string;
  status: "scheduled" | "en_route" | "completed" | "delayed";
}

export interface HotelRoomAllocation {
  id: string;
  weddingId: string;
  guestName: string;
  familyName?: string;
  hotelName: string;
  roomType: string;
  roomNumber: string;
  checkInDate: string;
  checkOutDate: string;
  guestsCount: number;
  status: "reserved" | "checked_in" | "checked_out";
}

export interface TableSeating {
  id: string;
  weddingId: string;
  tableName: string;
  capacity: number;
  category: "VIP" | "Bride Family" | "Groom Family" | "Friends" | "General";
  assignedGuestIds: string[];
}

export interface Vendor {
  id: string;
  weddingId: string;
  category: "Catering" | "Decoration & Floral" | "Photography & Film" | "Sound & DJ" | "Logistics & Transport" | "Makeup & Styling" | "Priest & Rituals";
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  contractStatus: "confirmed" | "contracted" | "evaluating";
  paidAmount: number;
  totalAmount: number;
  deliverablesSummary: string;
}

export interface CommunicationCampaign {
  id: string;
  weddingId: string;
  title: string;
  channel: "WhatsApp" | "Email" | "SMS";
  templateName: string;
  content: string;
  sentCount: number;
  deliveredCount: number;
  openedCount: number;
  rsvpCompletedCount: number;
  createdAt: string;
  status: "sent" | "draft" | "scheduled";
}

export interface WeddingGift {
  id: string;
  weddingId: string;
  guestName: string;
  guestPhone?: string;
  giftReceived: string;
  giftCategory: "Cash / Shagun" | "Jewelry" | "Silver & Gold" | "Home & Kitchen" | "Experience Voucher" | "Luxury Hamper" | "Other";
  amount?: number;
  eventId: string;
  eventName: string;
  notes?: string;
  dateReceived: string;
  thankYouSent: boolean;
}

export interface AttireRecommendation {
  eventId: string;
  eventName: string;
  vibeTitle: string;
  general: string;
  women: string;
  men: string;
  recommendedColors: string[];
  avoidColors: string[];
  styleTips: string;
}

export interface ScheduledReminder {
  id: string;
  weddingId: string;
  eventId: string;
  eventName: string;
  title: string;
  message: string;
  triggerTiming: string;
  channel: "WhatsApp" | "SMS" | "Email";
  enabled: boolean;
  sentCount: number;
}

export interface AIVideo {
  id: string;
  weddingId: string;
  coupleNames: string;
  title: string;
  style: "royal_palace" | "modern_cinematic" | "traditional_vedic" | "floral_dream" | "golden_sunset";
  musicTrack: string;
  photos: string[];
  storyScript: string;
  status: "ready" | "generating";
  durationSeconds: number;
  aspectRatio: "16:9" | "9:16";
  createdAt: string;
  videoUrl?: string;
  scenes?: {
    title: string;
    narrationText: string;
    mediaUrl: string;
  }[];
}

export interface Wedding {
  id: string;
  slug: string;
  coupleNames: string;
  brideName: string;
  groomName: string;
  weddingDate: string;
  city: string;
  primaryVenue: string;
  heroHeadline: string;
  totalInvited: number;
  confirmedCount: number;
  pendingCount: number;
  declinedCount: number;
  checkedInCount: number;
  rsvpCompletionPercentage: number;
  availableLanguages: LanguageCode[];
  aiAttendanceEstimate: {
    min: number;
    max: number;
    expected: number;
    factors: string[];
  };
  cateringEstimate: {
    expectedGuests: number;
    vegetarian: number;
    nonVegetarian: number;
    jain: number;
    vegan: number;
    bufferPercent: number;
    recommendedMeals: number;
  };
  invitationSettings: {
    template: "royal" | "minimal" | "traditional" | "modern" | "floral" | "luxury";
    themeColor: string;
    musicUrl?: string;
    enableRsvp: boolean;
    rsvpDeadline: string;
    customNote: string;
  };
  selectedTemplateId?: string;
  invitationData?: import("./template-types").InvitationWeddingData;
}
