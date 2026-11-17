"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/brand/Logo";
import { HighlightText } from "@/components/ui/highlight-text";
import { useWedding } from "@/context/WeddingContext";
import { Wedding } from "@/lib/types";
import {
  User,
  Calendar,
  MapPin,
  Building,
  Heart,
  Upload,
  Lock,
  Check,
  ChevronLeft,
  ChevronRight,
  Smartphone,
  Laptop,
  Sparkles,
  Music,
  Utensils,
  CheckCircle2,
  ExternalLink,
  LogIn,
  Loader2,
  Hash,
  Share2,
  Palette
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// 5-Step Process matching user's design
const steps = [
  { id: 1, title: "Couple Details" },
  { id: 2, title: "Wedding Details" },
  { id: 3, title: "Family Details" },
  { id: 4, title: "Functions" },
  { id: 5, title: "Preferences" },
];

const themes = [
  {
    id: "royal-elegance",
    name: "Royal Elegance",
    bg: "bg-[#FDFBF7]",
    cardBg: "from-[#FFFDF9] to-[#F7F2E7]",
    accent: "#C5A059",
    primary: "#74182E",
    textColor: "text-[#2D1B28]",
    previewBg: "bg-[#F5EFE6]",
    tag: "Palace Gold"
  },
  {
    id: "vedic-heritage",
    name: "Vedic Heritage",
    bg: "bg-[#FFF9F5]",
    cardBg: "from-[#FFF4ED] to-[#FBE4D8]",
    accent: "#D97706",
    primary: "#991B1B",
    textColor: "text-[#451A03]",
    previewBg: "bg-[#FEE2E2]",
    tag: "Crimson & Sindoor"
  },
  {
    id: "blush-floral",
    name: "Floral Blush",
    bg: "bg-[#FFF8FA]",
    cardBg: "from-[#FFF0F5] to-[#FCE7F3]",
    accent: "#DB2777",
    primary: "#831843",
    textColor: "text-[#500724]",
    previewBg: "bg-[#FCE7F3]",
    tag: "Pastel Rose"
  },
  {
    id: "midnight-palace",
    name: "Midnight Palace",
    bg: "bg-[#16121E]",
    cardBg: "from-[#1E172B] to-[#120D1D]",
    accent: "#E1CD98",
    primary: "#C5A059",
    textColor: "text-[#F8F5EE]",
    previewBg: "bg-[#1E172B]",
    tag: "Royal Obsidian"
  },
  {
    id: "minimal-editorial",
    name: "Editorial Serif",
    bg: "bg-[#FAFAF9]",
    cardBg: "from-white to-[#F5F5F4]",
    accent: "#78716C",
    primary: "#1C1917",
    textColor: "text-[#1C1917]",
    previewBg: "bg-[#E7E5E4]",
    tag: "Vogue Luxury"
  }
];

export default function SignupPage() {
  const router = useRouter();
  const { createNewWedding, allWeddings, switchWedding, setCurrentRole } = useWedding();

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdWedding, setCreatedWedding] = useState<Wedding | null>(null);
  const [deviceMode, setDeviceMode] = useState<"mobile" | "desktop">("mobile");
  const [selectedTheme, setSelectedTheme] = useState(themes[0]);

  // Form Fields
  const [formData, setFormData] = useState({
    brideName: "Priya",
    groomName: "Rahul",
    weddingTitle: "The Sharma & Verma Wedding",
    email: "couple@domain.com",
    weddingDate: "24 May 2026",
    ceremonyTime: "5:00 PM Onwards",
    city: "Hyderabad",
    primaryVenue: "The Grand Palace",
    brideParents: "D/o Smt. Sunita & Shri Rajesh Sharma",
    groomParents: "S/o Smt. Anita & Shri Suresh Verma",
    elderBlessing: "With the divine blessings of our beloved elders",
    functions: ["Mehendi & Sangeet", "Haldi Ceremony", "Wedding Pheras", "Grand Reception"],
    musicTheme: "Classical Shehnai & Sitar",
    dietaryType: "Multi-Cuisine Royal Feast (Jain & Veg Counters)"
  });

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleFunction = (fnName: string) => {
    setFormData((prev) => {
      const list = [...prev.functions];
      if (list.includes(fnName)) {
        return { ...prev, functions: list.filter((f) => f !== fnName) };
      } else {
        return { ...prev, functions: [...list, fnName] };
      }
    });
  };

  const nextStep = () => {
    if (currentStep < 5) setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleCreateSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const newWed = createNewWedding({
        brideName: formData.brideName || "Priya",
        groomName: formData.groomName || "Rahul",
        weddingDate: formData.weddingDate || "24 May 2026",
        city: formData.city || "Hyderabad",
        primaryVenue: formData.primaryVenue || "The Grand Palace, Hyderabad",
        email: formData.email || "couple@domain.com"
      });

      setCreatedWedding(newWed);
      setIsSubmitting(false);
      toast.success("Wedding workspace initialized!");
    }, 1200);
  };

  const handleSelectAndLogin = (wId: string) => {
    switchWedding(wId);
    setCurrentRole("couple");
    router.push("/app");
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2D1B28] flex flex-col justify-between selection:bg-[#74182E] selection:text-white">
      {/* Top Navbar */}
      <header className="w-full border-b border-[#E8DDCF]/80 bg-[#FAF7F2]/90 backdrop-blur-md px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <Link href="/" className="flex items-center gap-2">
          <Logo size="md" />
        </Link>
        <div className="flex items-center gap-4 text-xs font-serif">
          <span className="text-stone-500 hidden sm:inline">Your love story • Our design</span>
          <Link
            href="/login"
            className="px-4 py-2 rounded-full border border-[#C5A059]/40 hover:border-[#74182E] text-[#2D1B28] transition-colors"
          >
            Log in
          </Link>
        </div>
      </header>

      {/* Main Split Layout */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {createdWedding ? (
          /* SUCCESS SCREEN */
          <div className="max-w-2xl mx-auto bg-white py-10 px-8 rounded-3xl border-2 border-[#C5A059] shadow-soft-xl space-y-6 animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8DDCF]">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Wedding Successfully Created
              </span>
              <span className="text-xs font-mono text-stone-500">{createdWedding.id}</span>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-r from-[#FAF7F2] via-white to-[#F3ECE1] border border-[#C5A059] space-y-3">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#74182E] fill-current" />
                <span className="text-xs uppercase font-bold text-[#74182E] tracking-wider">
                  New Wedding Workspace
                </span>
              </div>
              <h3 className="text-3xl font-serif font-bold text-[#2D1B28]">
                {createdWedding.coupleNames}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#4D334E] pt-1">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#C5A059]" />
                  <span>{createdWedding.weddingDate}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#C5A059]" />
                  <span>{createdWedding.city}</span>
                </div>
                <div className="sm:col-span-2 flex items-center gap-1.5 text-stone-600">
                  <Building className="w-4 h-4 text-[#C5A059]" />
                  <span className="truncate">{createdWedding.primaryVenue}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E8DDCF] flex items-center justify-between text-xs">
                <span className="text-[#7D597E] text-[11px]">Guest RSVP Link:</span>
                <Link
                  href={`/invite/${createdWedding.slug}`}
                  target="_blank"
                  className="font-mono text-[#74182E] text-[11px] underline flex items-center gap-1"
                >
                  /invite/{createdWedding.slug} <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => handleSelectAndLogin(createdWedding.id)}
                className="w-full py-3.5 px-4 rounded-full bg-[#74182E] text-white text-xs font-bold hover:bg-[#581223] transition-colors shadow-soft flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4 text-[#E1CD98]" />
                <span>Log in to Workspace →</span>
              </button>

              <Link
                href="/login"
                className="w-full py-3.5 px-4 rounded-full bg-[#FAF7F2] text-[#2D1B28] text-xs font-semibold border border-[#E8DDCF] hover:bg-stone-100 transition-colors flex items-center justify-center gap-2"
              >
                <span>View on Login Screen</span>
              </Link>
            </div>
          </div>
        ) : (
          /* SPLIT-SCREEN ONBOARDING WORKSPACE */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* LEFT COLUMN: MULTI-STEP FORM */}
            <div className="lg:col-span-7 space-y-6">
              {/* Header */}
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C5A059] mb-1">
                  <span>CREATE YOUR WEDDING INVITATION</span>
                  <Heart className="w-3.5 h-3.5 fill-[#C5A059]" />
                </div>
                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#2D1B28] leading-tight">
                  <HighlightText
                    text="Let's make it special"
                    delay={0.15}
                    className="rounded-lg bg-gradient-to-r from-[#C5A059]/30 via-[#74182E]/15 to-[#C5A059]/35 px-2 py-0.5"
                    inView
                  />
                </h1>
                <p className="text-xs sm:text-sm text-[#7D597E] mt-2 font-light">
                  Share a few details about your big day. We&apos;ll create a beautiful, personalized invitation just for you.
                </p>
              </div>

              {/* Progress Stepper with Connected Lines */}
              <div className="pt-2">
                <div className="relative flex justify-between items-center">
                  {/* Background connecting line */}
                  <div className="absolute top-4 left-6 right-6 h-0.5 bg-[#E8DDCF] -z-0" />
                  {/* Filled connecting line */}
                  <div
                    className="absolute top-4 left-6 h-0.5 bg-[#C5A059] transition-all duration-500 -z-0"
                    style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 88}%` }}
                  />

                  {steps.map((s) => {
                    const isActive = s.id === currentStep;
                    const isDone = s.id < currentStep;
                    return (
                      <button
                        key={s.id}
                        onClick={() => {
                          if (s.id <= currentStep) setCurrentStep(s.id);
                        }}
                        className="flex flex-col items-center relative z-10 group"
                      >
                        <div
                          className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300",
                            isDone
                              ? "bg-[#C5A059] text-white"
                              : isActive
                              ? "bg-[#C5A059] text-white ring-4 ring-[#C5A059]/25 shadow-md scale-110"
                              : "bg-[#F3ECE1] text-stone-500 border border-[#E8DDCF]"
                          )}
                        >
                          {isDone ? <Check className="w-4 h-4 stroke-[2.5]" /> : s.id}
                        </div>
                        <span
                          className={cn(
                            "text-[10px] sm:text-[11px] mt-2 font-medium tracking-tight whitespace-nowrap transition-colors",
                            isActive ? "text-[#74182E] font-bold" : isDone ? "text-stone-700" : "text-stone-400"
                          )}
                        >
                          {s.title}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Form Card */}
              <div className="bg-white rounded-3xl border border-[#E8DDCF] p-6 sm:p-8 shadow-sm">
                <div className="mb-6">
                  <span className="text-xs font-mono font-medium text-[#C5A059] uppercase tracking-wider">
                    Step {currentStep} of 5
                  </span>
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2D1B28]">
                    {steps[currentStep - 1].title}
                  </h2>
                  <p className="text-xs text-[#7D597E] mt-0.5">
                    {currentStep === 1 && "Tell us about the beautiful couple"}
                    {currentStep === 2 && "Auspicious date and royal venue location"}
                    {currentStep === 3 && "Parents' names and auspicious family blessings"}
                    {currentStep === 4 && "Select the sacred ceremonies you're hosting"}
                    {currentStep === 5 && "Digital stationery aesthetics, music and catering"}
                  </p>
                </div>

                {/* STEP 1: Couple Details */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                          Bride&apos;s Full Name *
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                          <input
                            type="text"
                            placeholder="Enter bride's name"
                            value={formData.brideName}
                            onChange={(e) => updateField("brideName", e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E8DDCF] text-xs sm:text-sm focus:border-[#C5A059] focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                          Groom&apos;s Full Name *
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                          <input
                            type="text"
                            placeholder="Enter groom's name"
                            value={formData.groomName}
                            onChange={(e) => updateField("groomName", e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E8DDCF] text-xs sm:text-sm focus:border-[#C5A059] focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                        Title (Surname Wedding)
                      </label>
                      <div className="relative">
                        <Sparkles className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#C5A059]" />
                        <input
                          type="text"
                          placeholder="e.g. The Sharma & Verma Wedding"
                          value={formData.weddingTitle}
                          onChange={(e) => updateField("weddingTitle", e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E8DDCF] text-xs sm:text-sm focus:border-[#C5A059] focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Upload Photos (Optional) */}
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-2">
                        Upload Photos (Optional)
                      </label>
                      <div className="grid grid-cols-3 gap-3 text-center">
                        <div className="p-3 rounded-2xl border border-dashed border-[#E8DDCF] hover:border-[#C5A059] transition-colors cursor-pointer bg-stone-50/50">
                          <div className="w-10 h-10 mx-auto rounded-full bg-[#FAF7F2] border border-[#E8DDCF] flex items-center justify-center mb-1 text-stone-400">
                            <Upload className="w-4 h-4 text-[#C5A059]" />
                          </div>
                          <span className="text-[11px] font-semibold text-stone-700 block">Bride&apos;s Photo</span>
                          <span className="text-[9px] text-stone-400">JPG, PNG (Max 5MB)</span>
                        </div>

                        <div className="p-3 rounded-2xl border border-dashed border-[#E8DDCF] hover:border-[#C5A059] transition-colors cursor-pointer bg-stone-50/50">
                          <div className="w-10 h-10 mx-auto rounded-full bg-[#FAF7F2] border border-[#E8DDCF] flex items-center justify-center mb-1 text-stone-400">
                            <Upload className="w-4 h-4 text-[#C5A059]" />
                          </div>
                          <span className="text-[11px] font-semibold text-stone-700 block">Groom&apos;s Photo</span>
                          <span className="text-[9px] text-stone-400">JPG, PNG (Max 5MB)</span>
                        </div>

                        <div className="p-3 rounded-2xl border border-dashed border-[#E8DDCF] hover:border-[#C5A059] transition-colors cursor-pointer bg-stone-50/50">
                          <div className="w-10 h-10 mx-auto rounded-full bg-[#FAF7F2] border border-[#E8DDCF] flex items-center justify-center mb-1 text-stone-400">
                            <Upload className="w-4 h-4 text-[#C5A059]" />
                          </div>
                          <span className="text-[11px] font-semibold text-stone-700 block">Couple Photo</span>
                          <span className="text-[9px] text-stone-400">JPG, PNG (Max 5MB)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: Wedding Details */}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                          Wedding Date *
                        </label>
                        <div className="relative">
                          <Calendar className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                          <input
                            type="text"
                            placeholder="e.g. 24 May 2026"
                            value={formData.weddingDate}
                            onChange={(e) => updateField("weddingDate", e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E8DDCF] text-xs sm:text-sm focus:border-[#C5A059] focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                          Ceremony Time *
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 5:00 PM Onwards"
                          value={formData.ceremonyTime}
                          onChange={(e) => updateField("ceremonyTime", e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDCF] text-xs sm:text-sm focus:border-[#C5A059] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                          City / Destination *
                        </label>
                        <div className="relative">
                          <MapPin className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                          <input
                            type="text"
                            placeholder="e.g. Hyderabad / Udaipur"
                            value={formData.city}
                            onChange={(e) => updateField("city", e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E8DDCF] text-xs sm:text-sm focus:border-[#C5A059] focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                          Primary Venue / Palace *
                        </label>
                        <div className="relative">
                          <Building className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                          <input
                            type="text"
                            placeholder="e.g. Taj Falaknuma Palace"
                            value={formData.primaryVenue}
                            onChange={(e) => updateField("primaryVenue", e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E8DDCF] text-xs sm:text-sm focus:border-[#C5A059] focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                        Account Email Address *
                      </label>
                      <input
                        type="email"
                        placeholder="couple@domain.com"
                        value={formData.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDCF] text-xs sm:text-sm focus:border-[#C5A059] focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* STEP 3: Family Details */}
                {currentStep === 3 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                        Bride&apos;s Parents&apos; Names
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. D/o Smt. Sunita & Shri Rajesh Sharma"
                        value={formData.brideParents}
                        onChange={(e) => updateField("brideParents", e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDCF] text-xs sm:text-sm focus:border-[#C5A059] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                        Groom&apos;s Parents&apos; Names
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. S/o Smt. Anita & Shri Suresh Verma"
                        value={formData.groomParents}
                        onChange={(e) => updateField("groomParents", e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDCF] text-xs sm:text-sm focus:border-[#C5A059] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                        Auspicious Elder Blessing / Shloka Line
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. With the divine blessings of our beloved elders"
                        value={formData.elderBlessing}
                        onChange={(e) => updateField("elderBlessing", e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDCF] text-xs sm:text-sm focus:border-[#C5A059] focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* STEP 4: Functions & Events */}
                {currentStep === 4 && (
                  <div className="space-y-4">
                    <p className="text-xs font-semibold text-stone-700">
                      Select ceremonies to showcase on your digital invitation timeline:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {[
                        "Mehendi & High Tea",
                        "Haldi Ceremony",
                        "Sangeet & Cocktail Gala",
                        "Vedic Wedding Pheras",
                        "Grand Palace Reception",
                        "Welcome Dinner / Sundowner"
                      ].map((fn) => {
                        const isSelected = formData.functions.includes(fn);
                        return (
                          <div
                            key={fn}
                            onClick={() => toggleFunction(fn)}
                            className={cn(
                              "flex items-center space-x-2.5 p-3 rounded-xl border cursor-pointer transition-all",
                              isSelected
                                ? "border-[#C5A059] bg-[#C5A059]/10 text-[#2D1B28] font-semibold"
                                : "border-[#E8DDCF] hover:bg-stone-50 text-stone-600"
                            )}
                          >
                            <div
                              className={cn(
                                "w-4 h-4 rounded-md flex items-center justify-center text-white text-[10px]",
                                isSelected ? "bg-[#C5A059]" : "border border-stone-300"
                              )}
                            >
                              {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <span className="text-xs select-none">{fn}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 5: Preferences */}
                {currentStep === 5 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1.5 flex items-center gap-1.5">
                        <Music className="w-3.5 h-3.5 text-[#C5A059]" /> Background Music on Invitation Opening
                      </label>
                      <select
                        value={formData.musicTheme}
                        onChange={(e) => updateField("musicTheme", e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDCF] text-xs sm:text-sm focus:border-[#C5A059] focus:outline-none"
                      >
                        <option value="Classical Shehnai & Sitar">Classical Shehnai & Sitar Ragas</option>
                        <option value="Modern Royal Acoustic">Modern Royal Acoustic Romance</option>
                        <option value="Bespoke Bansuri Flute">Bespoke Bansuri Flute</option>
                        <option value="Silent">Silent / No Music</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1.5 flex items-center gap-1.5">
                        <Utensils className="w-3.5 h-3.5 text-[#C5A059]" /> Catering & Dining Preference
                      </label>
                      <select
                        value={formData.dietaryType}
                        onChange={(e) => updateField("dietaryType", e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDCF] text-xs sm:text-sm focus:border-[#C5A059] focus:outline-none"
                      >
                        <option value="Multi-Cuisine Royal Feast (Jain & Veg Counters)">
                          Multi-Cuisine Royal Feast (Jain & Veg Counters)
                        </option>
                        <option value="Strict Pure Vegetarian & Jain Banquet">
                          Strict Pure Vegetarian & Jain Banquet
                        </option>
                        <option value="Halal Certified Nawabi Cuisine">
                          Halal Certified Nawabi Cuisine
                        </option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Footer Buttons */}
                <div className="pt-6 mt-6 border-t border-[#E8DDCF] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="px-5 py-2.5 rounded-full border border-[#E8DDCF] text-stone-600 text-xs font-semibold hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    ← Back
                  </button>

                  <button
                    type="button"
                    onClick={currentStep === 5 ? () => handleCreateSubmit() : nextStep}
                    disabled={isSubmitting}
                    className="px-8 py-2.5 rounded-full bg-[#C5A059] hover:bg-[#b08d47] text-white text-xs font-bold shadow-md transition-all flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Creating Workspace...</span>
                      </>
                    ) : (
                      <>
                        <span>{currentStep === 5 ? "Complete & View Invitation" : "Continue →"}</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-400 text-center pt-4">
                  <Lock className="w-3 h-3 text-stone-400" />
                  <span>Your information is safe and confidential</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: LIVE REAL-TIME PREVIEW */}
            <div className="lg:col-span-5 sticky top-24 space-y-4">
              <div className="bg-[#F8F5EE] border border-[#E8DDCF] rounded-3xl p-5 shadow-sm space-y-4">
                {/* Live Preview Bar */}
                <div className="flex items-center justify-between pb-3 border-b border-[#E8DDCF]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-serif font-bold tracking-wide text-[#2D1B28]">Live Preview</span>
                  </div>

                  <div className="flex items-center p-0.5 rounded-lg bg-stone-200/60 text-[11px]">
                    <button
                      onClick={() => setDeviceMode("mobile")}
                      className={cn(
                        "px-2.5 py-1 rounded-md flex items-center gap-1 transition-all",
                        deviceMode === "mobile"
                          ? "bg-white text-[#2D1B28] shadow-sm font-semibold"
                          : "text-stone-500 hover:text-stone-900"
                      )}
                    >
                      <Smartphone className="w-3 h-3" />
                      <span>Mobile</span>
                    </button>
                    <button
                      onClick={() => setDeviceMode("desktop")}
                      className={cn(
                        "px-2.5 py-1 rounded-md flex items-center gap-1 transition-all",
                        deviceMode === "desktop"
                          ? "bg-white text-[#2D1B28] shadow-sm font-semibold"
                          : "text-stone-500 hover:text-stone-900"
                      )}
                    >
                      <Laptop className="w-3 h-3" />
                      <span>Desktop</span>
                    </button>
                  </div>
                </div>

                {/* Device Frame */}
                <div className="flex justify-center">
                  <div
                    className={cn(
                      "transition-all duration-300 rounded-[32px] border-4 border-stone-800 bg-stone-900 p-2 shadow-2xl overflow-hidden",
                      deviceMode === "mobile" ? "w-[270px] sm:w-[290px] h-[520px]" : "w-full h-[400px]"
                    )}
                  >
                    {/* Screen View */}
                    <div
                      className={cn(
                        "w-full h-full rounded-[24px] overflow-y-auto p-4 flex flex-col items-center justify-between text-center relative border border-[#C5A059]/30",
                        selectedTheme.previewBg
                      )}
                    >
                      {/* Decorative Floral Header Corner */}
                      <div className="w-full flex justify-between items-center text-[9px] text-[#C5A059] opacity-70 uppercase tracking-widest pt-1">
                        <span>✦ ✦ ✦</span>
                        <span>॥ श्री गणेशाय नमः ॥</span>
                        <span>✦ ✦ ✦</span>
                      </div>

                      {/* Main Invitation Card Content */}
                      <div className="my-auto space-y-2 py-4">
                        <p className="text-[10px] uppercase tracking-widest text-[#C5A059] font-medium">
                          Together with their families
                        </p>

                        <div className="space-y-0.5">
                          <h3 className="text-3xl font-serif font-bold text-[#74182E] tracking-tight">
                            {formData.brideName || "Bride"}
                          </h3>
                          <span className="text-sm font-serif italic text-[#C5A059] block">&</span>
                          <h3 className="text-3xl font-serif font-bold text-[#74182E] tracking-tight">
                            {formData.groomName || "Groom"}
                          </h3>
                        </div>

                        <p className="text-[10px] text-stone-600 max-w-[200px] mx-auto leading-relaxed pt-1">
                          request your auspicious presence at their Wedding Celebration
                        </p>

                        {/* Date badge */}
                        <div className="py-2">
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-[#C5A059]/40 shadow-sm text-[11px] font-serif font-bold text-[#74182E]">
                            <Calendar className="w-3 h-3 text-[#C5A059]" />
                            <span>{formData.weddingDate || "24 May 2026"}</span>
                          </div>
                        </div>

                        {/* Venue */}
                        <div className="space-y-0.5 text-[10px] text-stone-700">
                          <p className="font-semibold text-xs text-[#2D1B28]">
                            {formData.primaryVenue || "The Grand Palace"}
                          </p>
                          <p className="text-stone-500">{formData.city || "Hyderabad"}</p>
                          <p className="text-[#C5A059] font-mono text-[9px]">{formData.ceremonyTime}</p>
                        </div>

                        {/* Title (Surname Wedding) */}
                        {formData.weddingTitle && (
                          <div className="pt-2">
                            <span className="text-[10px] font-serif font-bold text-[#74182E] bg-[#74182E]/5 px-3 py-1 rounded-full border border-[#74182E]/15 tracking-wide">
                              ✦ {formData.weddingTitle} ✦
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Bottom Seal */}
                      <div className="w-full pt-2 border-t border-[#C5A059]/30 flex items-center justify-between text-[8px] text-stone-500">
                        <span>WeddingOS Royal Pass</span>
                        <Heart className="w-2.5 h-2.5 text-[#C5A059] fill-[#C5A059]" />
                        <span>Instant RSVP</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Theme Selector Strip */}
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-stone-700 flex items-center gap-1">
                      <Palette className="w-3 h-3 text-[#C5A059]" /> Selected Theme:
                      <span className="text-[#74182E] font-bold">{selectedTheme.name}</span>
                    </span>
                    <span className="text-[10px] text-stone-400">Click to switch</span>
                  </div>

                  <div className="grid grid-cols-5 gap-2">
                    {themes.map((th) => {
                      const isSelected = th.id === selectedTheme.id;
                      return (
                        <button
                          key={th.id}
                          onClick={() => setSelectedTheme(th)}
                          className={cn(
                            "group p-1.5 rounded-xl border flex flex-col items-center gap-1 transition-all",
                            isSelected
                              ? "border-[#C5A059] bg-white ring-2 ring-[#C5A059]/30 shadow-sm scale-105"
                              : "border-[#E8DDCF] hover:border-stone-400 bg-white/50"
                          )}
                        >
                          <div
                            className={cn(
                              "w-full h-8 rounded-lg border border-black/10 flex items-center justify-center text-[10px]",
                              th.previewBg
                            )}
                          >
                            <span className="text-[8px] font-bold" style={{ color: th.primary }}>
                              {th.name.split(" ")[0]}
                            </span>
                          </div>
                          <span className="text-[9px] text-stone-600 truncate w-full block text-center">
                            {th.name.split(" ")[0]}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Value Card */}
                <div className="p-3.5 rounded-2xl bg-white border border-[#E8DDCF] flex items-center gap-3 shadow-xs">
                  <div className="w-9 h-9 rounded-full bg-[#FAF7F2] border border-[#C5A059]/40 flex items-center justify-center flex-none">
                    <Sparkles className="w-4 h-4 text-[#C5A059]" />
                  </div>
                  <div className="text-[11px] leading-tight">
                    <p className="font-semibold text-stone-800">Get a beautiful, shareable invitation</p>
                    <p className="text-stone-500 font-light mt-0.5">
                      Once you complete the form, you can preview, edit guest lists, and send via WhatsApp.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-[#E8DDCF]/80 py-4 px-6 text-center text-xs text-stone-500">
        WeddingOS • Luxury Digital Stationery & Guest Operations Platform
      </footer>
    </div>
  );
}
