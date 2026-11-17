"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/brand/Logo";
import { useWedding } from "@/context/WeddingContext";
import { Wedding } from "@/lib/types";
import {
  User,
  Calendar,
  MapPin,
  Building,
  Mail,
  Check,
  ChevronLeft,
  Sparkles,
  Send,
  Users,
  Utensils,
  BarChart3,
  Bell,
  Loader2,
  ExternalLink,
  CheckCircle2,
  Eye
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// 3-Step Process exactly as shown in screenshot
const steps = [
  { id: 1, title: "Couple" },
  { id: 2, title: "Wedding" },
  { id: 3, title: "Personalize" },
];

export default function SignupPage() {
  const router = useRouter();
  const { createNewWedding, allWeddings, switchWedding, setCurrentRole } = useWedding();

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdWedding, setCreatedWedding] = useState<Wedding | null>(null);

  // Form Fields matching screenshot
  const [brideName, setBrideName] = useState("Priya");
  const [groomName, setGroomName] = useState("Rahul");
  const [email, setEmail] = useState("couple@example.com");
  const [weddingDate, setWeddingDate] = useState("12 December 2026");
  const [city, setCity] = useState("Hyderabad");
  const [primaryVenue, setPrimaryVenue] = useState("The Grand Palace");
  const [weddingTitle, setWeddingTitle] = useState("The Sharma & Verma Wedding");
  const [selectedFunctions, setSelectedFunctions] = useState<string[]>([
    "Mehendi",
    "Sangeet",
    "Wedding Ceremony",
    "Reception"
  ]);

  const toggleFunction = (fn: string) => {
    if (selectedFunctions.includes(fn)) {
      setSelectedFunctions(selectedFunctions.filter((f) => f !== fn));
    } else {
      setSelectedFunctions([...selectedFunctions, fn]);
    }
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleCreateSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const newWed = createNewWedding({
        brideName: brideName || "Priya",
        groomName: groomName || "Rahul",
        weddingDate: weddingDate || "12 December 2026",
        city: city || "Hyderabad",
        primaryVenue: primaryVenue || "The Grand Palace, Hyderabad",
        email: email || "couple@example.com"
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
    <div className="min-h-screen bg-[#FAF7F2] text-[#2D1B28] flex flex-col justify-between relative overflow-x-hidden selection:bg-[#74182E] selection:text-white">
      {/* ================= CORNER BOTANICAL FLORAL DECORATIONS ================= */}
      {/* Top-Left Botanical Floral Branch */}
      <div className="absolute top-0 left-0 w-64 sm:w-80 md:w-96 h-auto pointer-events-none z-0 opacity-90 select-none">
        <svg viewBox="0 0 360 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <defs>
            <radialGradient id="roseGrad1" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#F9D7DC" />
              <stop offset="45%" stopColor="#EAA4AD" />
              <stop offset="85%" stopColor="#C45A69" />
              <stop offset="100%" stopColor="#8C2534" />
            </radialGradient>
            <radialGradient id="roseGrad2" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#FCEDEE" />
              <stop offset="50%" stopColor="#F3BCC3" />
              <stop offset="85%" stopColor="#D97A88" />
              <stop offset="100%" stopColor="#9C3041" />
            </radialGradient>
            <radialGradient id="peachGrad" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#FFF2E8" />
              <stop offset="40%" stopColor="#F7CEB6" />
              <stop offset="80%" stopColor="#E6A382" />
              <stop offset="100%" stopColor="#BF6E4E" />
            </radialGradient>
            <linearGradient id="leafGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A3B496" />
              <stop offset="100%" stopColor="#6E8160" />
            </linearGradient>
            <linearGradient id="leafGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C8D4BE" />
              <stop offset="100%" stopColor="#8D9E80" />
            </linearGradient>
            <linearGradient id="goldStem" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E5C778" />
              <stop offset="100%" stopColor="#B38B3A" />
            </linearGradient>
          </defs>

          {/* Stems */}
          <path d="M-20 -20 C50 60 90 140 120 230" stroke="#8A6E53" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
          <path d="M40 30 C100 80 160 130 220 180" stroke="#8A6E53" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
          <path d="M110 130 C160 180 200 240 230 290" stroke="#8A6E53" strokeWidth="1.8" strokeLinecap="round" opacity="0.5" />

          {/* Eucalyptus / Olive Leaves */}
          <path d="M15 35 C40 20 60 40 45 65 C30 75 10 55 15 35 Z" fill="url(#leafGrad1)" opacity="0.8" />
          <path d="M60 75 C95 55 115 80 95 105 C75 120 50 95 60 75 Z" fill="url(#leafGrad2)" opacity="0.85" />
          <path d="M130 115 C165 95 185 120 165 145 C145 160 120 135 130 115 Z" fill="url(#leafGrad1)" opacity="0.8" />
          <path d="M175 165 C210 145 230 170 210 195 C190 210 165 185 175 165 Z" fill="url(#leafGrad2)" opacity="0.85" />
          <path d="M210 230 C240 215 255 235 240 255 C225 270 200 250 210 230 Z" fill="url(#leafGrad1)" opacity="0.8" />

          {/* Golden accent sprigs */}
          <path d="M25 80 C50 90 55 115 35 125 C20 130 10 105 25 80 Z" fill="url(#goldStem)" opacity="0.75" />
          <path d="M90 160 C115 170 120 195 100 205 C85 210 75 185 90 160 Z" fill="url(#goldStem)" opacity="0.75" />
          <circle cx="115" cy="180" r="3.5" fill="#C5A059" opacity="0.8" />
          <circle cx="170" cy="225" r="3" fill="#C5A059" opacity="0.8" />
          <circle cx="60" cy="130" r="3" fill="#C5A059" opacity="0.8" />

          {/* Lush Watercolor Roses */}
          {/* Main Large Rose */}
          <g transform="translate(85, 90)">
            <ellipse cx="0" cy="0" rx="38" ry="34" fill="url(#roseGrad1)" />
            <path d="M-15 -18 C-5 -30 20 -25 25 -10 C30 5 15 25 -5 22 C-20 20 -28 0 -15 -18 Z" fill="url(#roseGrad2)" opacity="0.9" />
            <path d="M-8 -10 C0 -18 15 -15 18 -5 C20 5 10 15 0 14 C-10 12 -14 0 -8 -10 Z" fill="#9C3041" opacity="0.85" />
            <path d="M-3 -4 C2 -8 8 -7 10 -2 C11 3 6 8 1 7 C-4 6 -6 0 -3 -4 Z" fill="#6E1624" />
          </g>

          {/* Medium Peach Rose */}
          <g transform="translate(160, 155)">
            <ellipse cx="0" cy="0" rx="28" ry="25" fill="url(#peachGrad)" />
            <path d="M-10 -12 C-3 -22 15 -18 18 -7 C22 4 11 18 -3 16 C-14 14 -19 0 -10 -12 Z" fill="#E6A382" opacity="0.9" />
            <path d="M-5 -6 C0 -12 10 -10 12 -3 C14 4 7 10 0 9 C-7 8 -9 0 -5 -6 Z" fill="#BF6E4E" opacity="0.85" />
          </g>

          {/* Small Blush Rosebud */}
          <g transform="translate(200, 235)">
            <ellipse cx="0" cy="0" rx="20" ry="18" fill="url(#roseGrad2)" />
            <path d="M-6 -8 C0 -14 10 -12 12 -4 C14 4 8 10 0 9 C-7 8 -9 0 -6 -8 Z" fill="#C45A69" opacity="0.9" />
            <circle cx="2" cy="1" r="5" fill="#8C2534" />
          </g>
        </svg>
      </div>

      {/* Bottom-Right Botanical Floral Branch */}
      <div className="absolute bottom-0 right-0 w-60 sm:w-76 md:w-92 h-auto pointer-events-none z-0 opacity-90 select-none rotate-180">
        <svg viewBox="0 0 360 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          {/* Stems */}
          <path d="M-20 -20 C50 60 90 140 120 230" stroke="#8A6E53" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
          <path d="M40 30 C100 80 160 130 220 180" stroke="#8A6E53" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
          <path d="M110 130 C160 180 200 240 230 290" stroke="#8A6E53" strokeWidth="1.8" strokeLinecap="round" opacity="0.5" />

          {/* Leaves */}
          <path d="M15 35 C40 20 60 40 45 65 C30 75 10 55 15 35 Z" fill="#8D9E80" opacity="0.8" />
          <path d="M60 75 C95 55 115 80 95 105 C75 120 50 95 60 75 Z" fill="#A3B496" opacity="0.85" />
          <path d="M130 115 C165 95 185 120 165 145 C145 160 120 135 130 115 Z" fill="#8D9E80" opacity="0.8" />
          <path d="M175 165 C210 145 230 170 210 195 C190 210 165 185 175 165 Z" fill="#A3B496" opacity="0.85" />

          {/* Gold sprigs */}
          <path d="M25 80 C50 90 55 115 35 125 C20 130 10 105 25 80 Z" fill="#C5A059" opacity="0.75" />
          <path d="M90 160 C115 170 120 195 100 205 C85 210 75 185 90 160 Z" fill="#C5A059" opacity="0.75" />
          <circle cx="115" cy="180" r="3.5" fill="#C5A059" opacity="0.8" />

          {/* Roses */}
          <g transform="translate(85, 90)">
            <ellipse cx="0" cy="0" rx="36" ry="32" fill="#EAA4AD" />
            <path d="M-15 -18 C-5 -30 20 -25 25 -10 C30 5 15 25 -5 22 C-20 20 -28 0 -15 -18 Z" fill="#D97A88" opacity="0.9" />
            <circle cx="2" cy="1" r="10" fill="#8C2534" />
          </g>
          <g transform="translate(160, 155)">
            <ellipse cx="0" cy="0" rx="26" ry="24" fill="#F7CEB6" />
            <circle cx="2" cy="1" r="8" fill="#BF6E4E" />
          </g>
          <g transform="translate(200, 235)">
            <ellipse cx="0" cy="0" rx="18" ry="16" fill="#F3BCC3" />
            <circle cx="1" cy="0" r="5" fill="#9C3041" />
          </g>
        </svg>
      </div>

      {/* ================= TOP NAVBAR ================= */}
      <header className="w-full border-b border-[#E8DDCF]/80 bg-[#FAF7F2]/90 backdrop-blur-md px-6 lg:px-12 py-3.5 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <Logo size="md" />
          </Link>
          <nav className="hidden md:flex items-center gap-7 text-xs font-serif font-medium text-stone-600">
            <Link href="/features" className="hover:text-[#74182E] transition-colors">Features</Link>
            <Link href="/features/invitations" className="hover:text-[#74182E] transition-colors">Templates</Link>
            <Link href="/pricing" className="hover:text-[#74182E] transition-colors">Pricing</Link>
            <Link href="/contact" className="hover:text-[#74182E] transition-colors">Support</Link>
          </nav>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="text-stone-500 font-serif hidden sm:inline">Already have a workspace?</span>
          <Link
            href="/login"
            className="px-4 py-1.5 rounded-full bg-[#74182E] text-white font-serif font-semibold text-xs hover:bg-[#581223] transition-colors shadow-xs"
          >
            Log in
          </Link>
        </div>
      </header>

      {/* ================= MAIN CONTAINER ================= */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10 relative z-10">
        {createdWedding ? (
          /* SUCCESS SCREEN */
          <div className="max-w-xl mx-auto bg-white py-10 px-8 rounded-3xl border-2 border-[#C5A059] shadow-soft-xl space-y-6 animate-fade-in text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center mx-auto text-emerald-600">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-serif font-bold text-[#2D1B28]">
              Wedding Workspace Initialized!
            </h2>
            <p className="text-xs text-[#7D597E] max-w-sm mx-auto">
              Your royal celebration for <strong className="text-[#74182E]">{createdWedding.coupleNames}</strong> is now live.
            </p>

            <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E8DDCF] space-y-2 text-left text-xs">
              <div className="flex justify-between text-stone-500">
                <span>Date:</span> <span className="font-semibold text-stone-800">{createdWedding.weddingDate}</span>
              </div>
              <div className="flex justify-between text-stone-500">
                <span>Location:</span> <span className="font-semibold text-stone-800">{createdWedding.city}</span>
              </div>
              <div className="flex justify-between text-stone-500">
                <span>Venue:</span> <span className="font-semibold text-stone-800">{createdWedding.primaryVenue}</span>
              </div>
              <div className="flex justify-between text-stone-500 pt-2 border-t border-[#E8DDCF]">
                <span>Guest Invite URL:</span>
                <Link
                  href={`/invite/${createdWedding.slug}`}
                  target="_blank"
                  className="font-mono text-[#74182E] underline flex items-center gap-1 font-semibold"
                >
                  /invite/{createdWedding.slug} <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => handleSelectAndLogin(createdWedding.id)}
                className="py-3 px-4 rounded-full bg-[#74182E] text-white text-xs font-bold hover:bg-[#581223] transition-colors shadow-soft"
              >
                Launch Workspace →
              </button>
              <Link
                href="/login"
                className="py-3 px-4 rounded-full bg-white border border-[#E8DDCF] text-stone-700 text-xs font-semibold hover:bg-stone-50 transition-colors flex items-center justify-center"
              >
                Login Screen
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-10">
            {/* PAGE TITLE & SUBTITLE */}
            <div className="text-center space-y-2 max-w-3xl mx-auto">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#C5A059]">
                WEDDINGOS • WEDDING SETUP
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#2D1B28] tracking-tight">
                Let&apos;s Begin Your Wedding Story
              </h1>
              <p className="text-xs sm:text-sm text-[#7D597E] font-light max-w-xl mx-auto leading-relaxed">
                Create your wedding workspace, invitations, RSVP system and guest experience — all in one place.
              </p>

              {/* Decorative Floral Ornament */}
              <div className="flex items-center justify-center gap-3 pt-1 text-[#C5A059] opacity-75">
                <span className="w-16 h-px bg-gradient-to-r from-transparent to-[#C5A059]" />
                <span className="text-sm">✦ ❀ ✦</span>
                <span className="w-16 h-px bg-gradient-to-l from-transparent to-[#C5A059]" />
              </div>
            </div>

            {/* ================= 3-COLUMN SHOWCASE ================= */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              {/* LEFT FEATURE CARDS (3 cols) */}
              <div className="lg:col-span-3 space-y-2.5">
                {[
                  {
                    icon: Send,
                    title: "Send Invitations",
                    desc: "Beautiful digital invites with a shareable link",
                    active: true
                  },
                  {
                    icon: Users,
                    title: "Track RSVPs",
                    desc: "Know who's coming in real time",
                    active: false
                  },
                  {
                    icon: Utensils,
                    title: "Manage Catering",
                    desc: "Collect food preferences and plan better",
                    active: false
                  },
                  {
                    icon: BarChart3,
                    title: "Estimate Attendance",
                    desc: "Get accurate counts for a zero-waste event",
                    active: false
                  },
                  {
                    icon: Bell,
                    title: "Automated Reminders",
                    desc: "Gentle nudges for better responses",
                    active: false
                  }
                ].map((feat, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "p-3.5 rounded-2xl border transition-all flex items-start gap-3",
                      feat.active
                        ? "bg-[#FDF2F4] border-[#E8CCD5] shadow-xs"
                        : "bg-white/80 border-[#E8DDCF]/80 hover:bg-white"
                    )}
                  >
                    <div
                      className={cn(
                        "w-8 h-8 rounded-xl flex items-center justify-center flex-none",
                        feat.active ? "text-[#74182E] bg-white shadow-xs border border-[#E8CCD5]" : "text-stone-500 bg-stone-100"
                      )}
                    >
                      <feat.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className={cn("text-xs font-serif font-bold", feat.active ? "text-[#74182E]" : "text-stone-800")}>
                        {feat.title}
                      </h4>
                      <p className="text-[10px] text-stone-500 leading-snug mt-0.5 font-light">
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CENTER 3-STEP FORM (5 cols) */}
              <div className="lg:col-span-5 bg-white rounded-3xl border border-[#E8DDCF] p-6 sm:p-7 shadow-soft-sm space-y-6">
                {/* 3-Step Stepper Bar */}
                <div className="relative flex justify-between items-center px-4 pt-1">
                  {/* Connecting Line */}
                  <div className="absolute top-4 left-10 right-10 h-0.5 bg-[#E8DDCF] -z-0" />
                  <div
                    className="absolute top-4 left-10 h-0.5 bg-[#74182E] transition-all duration-300 -z-0"
                    style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 80}%` }}
                  />

                  {steps.map((s) => {
                    const isDone = s.id < currentStep;
                    const isActive = s.id === currentStep;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => {
                          if (s.id <= currentStep) setCurrentStep(s.id);
                        }}
                        className="flex flex-col items-center relative z-10"
                      >
                        <div
                          className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all",
                            isActive || isDone
                              ? "bg-[#74182E] text-white shadow-sm ring-4 ring-[#74182E]/15"
                              : "bg-white text-stone-400 border border-[#E8DDCF]"
                          )}
                        >
                          {isDone ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : s.id}
                        </div>
                        <span
                          className={cn(
                            "text-[11px] mt-1.5 font-medium tracking-tight",
                            isActive ? "text-[#74182E] font-bold" : "text-stone-400"
                          )}
                        >
                          {s.title}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Form Heading */}
                <div className="text-center pt-1">
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#2D1B28]">
                    {currentStep === 1 && "Tell us about the couple"}
                    {currentStep === 2 && "Wedding Date & Venue"}
                    {currentStep === 3 && "Personalize your wedding"}
                  </h3>
                  <p className="text-xs text-[#7D597E] mt-0.5 font-light">
                    {currentStep === 1 && "Let's start with the most important details."}
                    {currentStep === 2 && "Where and when the celebrations will unfold."}
                    {currentStep === 3 && "Configure ceremonies and custom details."}
                  </p>
                </div>

                {/* STEP 1: Couple Names & Email */}
                {currentStep === 1 && (
                  <div className="space-y-4 pt-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                          Bride&apos;s Name *
                        </label>
                        <div className="relative">
                          <User className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                          <input
                            type="text"
                            placeholder="Priya"
                            value={brideName}
                            onChange={(e) => setBrideName(e.target.value)}
                            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E8DDCF] text-xs focus:border-[#74182E] focus:outline-none transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                          Groom&apos;s Name *
                        </label>
                        <div className="relative">
                          <User className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                          <input
                            type="text"
                            placeholder="Rahul"
                            value={groomName}
                            onChange={(e) => setGroomName(e.target.value)}
                            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E8DDCF] text-xs focus:border-[#74182E] focus:outline-none transition-colors"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Couple / Family Account Email *
                      </label>
                      <div className="relative">
                        <Mail className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                        <input
                          type="email"
                          placeholder="couple@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E8DDCF] text-xs focus:border-[#74182E] focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: Wedding Date, Venue & City */}
                {currentStep === 2 && (
                  <div className="space-y-4 pt-1">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Wedding Date *
                      </label>
                      <div className="relative">
                        <Calendar className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                        <input
                          type="text"
                          placeholder="12 December 2026"
                          value={weddingDate}
                          onChange={(e) => setWeddingDate(e.target.value)}
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E8DDCF] text-xs focus:border-[#74182E] focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                          City / Region *
                        </label>
                        <div className="relative">
                          <MapPin className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                          <input
                            type="text"
                            placeholder="Hyderabad"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E8DDCF] text-xs focus:border-[#74182E] focus:outline-none transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                          Palace / Primary Venue *
                        </label>
                        <div className="relative">
                          <Building className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                          <input
                            type="text"
                            placeholder="The Grand Palace"
                            value={primaryVenue}
                            onChange={(e) => setPrimaryVenue(e.target.value)}
                            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E8DDCF] text-xs focus:border-[#74182E] focus:outline-none transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: Personalize */}
                {currentStep === 3 && (
                  <div className="space-y-4 pt-1">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Title (Surname Wedding)
                      </label>
                      <div className="relative">
                        <Sparkles className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#C5A059]" />
                        <input
                          type="text"
                          placeholder="e.g. The Sharma & Verma Wedding"
                          value={weddingTitle}
                          onChange={(e) => setWeddingTitle(e.target.value)}
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E8DDCF] text-xs focus:border-[#74182E] focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1.5">
                        Select Sacred Ceremonies:
                      </label>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {["Mehendi", "Haldi", "Sangeet", "Wedding Ceremony", "Reception"].map((fn) => {
                          const isSel = selectedFunctions.includes(fn);
                          return (
                            <div
                              key={fn}
                              onClick={() => toggleFunction(fn)}
                              className={cn(
                                "p-2 rounded-xl border cursor-pointer flex items-center gap-2 transition-all select-none",
                                isSel
                                  ? "border-[#74182E] bg-[#74182E]/5 text-[#74182E] font-medium"
                                  : "border-[#E8DDCF] text-stone-600 hover:bg-stone-50"
                              )}
                            >
                              <div
                                className={cn(
                                  "w-3.5 h-3.5 rounded flex items-center justify-center text-white text-[9px]",
                                  isSel ? "bg-[#74182E]" : "border border-stone-300"
                                )}
                              >
                                {isSel && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                              </div>
                              <span className="text-[11px]">{fn}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="pt-2 flex items-center gap-3">
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-4 py-3.5 rounded-full border border-[#E8DDCF] text-stone-600 hover:bg-stone-50 text-xs font-serif font-semibold transition-all flex items-center justify-center gap-1"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={currentStep === 3 ? () => handleCreateSubmit() : nextStep}
                    disabled={isSubmitting}
                    className="flex-1 py-3.5 rounded-full bg-[#74182E] hover:bg-[#581223] text-white font-serif font-bold text-xs shadow-soft transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Initializing Workspace...</span>
                      </>
                    ) : (
                      <>
                        <span>{currentStep === 3 ? "Complete Setup & Launch →" : "Continue →"}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Bottom Step Indicator with Progress Bar */}
                <div className="pt-2 flex items-center justify-between text-[11px] text-stone-400 font-mono">
                  <span>Step {currentStep} of 3</span>
                  <div className="w-36 h-1.5 bg-[#E8DDCF]/60 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#74182E] transition-all duration-300"
                      style={{ width: `${(currentStep / 3) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* RIGHT LIVE INVITATION CARD (4 cols) */}
              <div className="lg:col-span-4 relative flex flex-col items-center">
                {/* Live Preview Badge */}
                <div className="mb-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#74182E] text-white text-[10px] font-semibold tracking-wider shadow-sm uppercase">
                    <Eye className="w-3 h-3" />
                    <span>Live Preview</span>
                  </span>
                </div>

                {/* LUXURY ARCH INVITATION CARD */}
                <div className="w-full max-w-[340px] rounded-[36px] bg-gradient-to-b from-[#FFFDF9] via-[#FAF6EE] to-[#F5EFE3] border border-[#C5A059]/40 p-6 shadow-2xl relative overflow-hidden text-center">
                  {/* Subtle Inner Gold Arch Border */}
                  <div className="absolute inset-2.5 rounded-[30px] border border-[#C5A059]/35 pointer-events-none" />
                  <div className="absolute inset-3 rounded-[28px] border border-[#C5A059]/15 pointer-events-none" />

                  {/* Top Watercolor Garland Artwork */}
                  <div className="w-full flex justify-center -mt-2 mb-2 select-none pointer-events-none">
                    <svg viewBox="0 0 260 70" className="w-56 h-auto" fill="none">
                      <path d="M15 50 C70 15 190 15 245 50" stroke="#C5A059" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                      {/* Leaves */}
                      <path d="M45 30 C35 18 55 12 65 25 Z" fill="#8D9E80" opacity="0.8" />
                      <path d="M75 22 C85 10 95 24 85 30 Z" fill="#A3B496" opacity="0.85" />
                      <path d="M175 22 C165 10 155 24 165 30 Z" fill="#A3B496" opacity="0.85" />
                      <path d="M205 30 C215 18 195 12 185 25 Z" fill="#8D9E80" opacity="0.8" />
                      {/* Flowers */}
                      <circle cx="130" cy="22" r="10" fill="#EAA4AD" />
                      <circle cx="130" cy="22" r="5" fill="#8C2534" />
                      <circle cx="95" cy="28" r="7" fill="#F7CEB6" />
                      <circle cx="165" cy="28" r="7" fill="#F7CEB6" />
                      <circle cx="65" cy="38" r="5" fill="#F3BCC3" />
                      <circle cx="195" cy="38" r="5" fill="#F3BCC3" />
                    </svg>
                  </div>

                  {/* Card Content */}
                  <div className="space-y-2.5 py-1">
                    <p className="text-[10px] font-serif tracking-[0.22em] text-[#C5A059] uppercase font-bold">
                      THE WEDDING OF
                    </p>

                    {/* Couple Names in Elegant Great Vibes Calligraphy Script */}
                    <div className="py-1">
                      <h3 className="text-3xl sm:text-4xl font-script text-[#74182E] font-normal tracking-wide drop-shadow-xs">
                        {groomName || "Rahul"} &amp; {brideName || "Priya"}
                      </h3>
                    </div>

                    {/* Floral Separator Motif */}
                    <div className="text-[11px] text-[#C5A059] opacity-80 select-none">
                      ✦ ❀ ✦
                    </div>

                    {/* Date */}
                    <div className="pt-1 flex items-center justify-center gap-1.5 text-xs text-stone-700 font-serif font-semibold">
                      <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>{weddingDate || "12 December 2026"}</span>
                    </div>

                    {/* Location */}
                    <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500 font-light">
                      <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>{city || "Hyderabad"}</span>
                    </div>

                    {/* Wedding Title Badge */}
                    {weddingTitle && (
                      <div className="pt-1">
                        <span className="text-[10px] font-serif text-[#74182E] bg-[#74182E]/5 px-3 py-1 rounded-full border border-[#74182E]/10 tracking-wide">
                          {weddingTitle}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Bottom Golden Heritage Palace Illustration */}
                  <div className="w-full pt-4 mt-3 border-t border-[#C5A059]/20 flex flex-col items-center select-none pointer-events-none">
                    <svg viewBox="0 0 280 110" className="w-64 h-auto" fill="none">
                      {/* Floral clusters flanking the palace */}
                      <g opacity="0.85">
                        <circle cx="28" cy="85" r="9" fill="#EAA4AD" />
                        <circle cx="28" cy="85" r="4" fill="#8C2534" />
                        <path d="M15 95 C25 80 40 85 30 100 Z" fill="#8D9E80" />
                        <circle cx="252" cy="85" r="9" fill="#EAA4AD" />
                        <circle cx="252" cy="85" r="4" fill="#8C2534" />
                        <path d="M265 95 C255 80 240 85 250 100 Z" fill="#8D9E80" />
                      </g>

                      {/* Palace Silhouette & Domes in Antique Gold */}
                      <g fill="#C5A059" opacity="0.55">
                        {/* Central Grand Dome */}
                        <path d="M140 15 C125 15 120 35 120 50 L160 50 C160 35 155 15 140 15 Z" />
                        <rect x="138" y="5" width="4" height="10" />
                        <circle cx="140" cy="5" r="3" />
                        {/* Side Domes */}
                        <path d="M95 30 C85 30 80 45 80 55 L110 55 C110 45 105 30 95 30 Z" />
                        <rect x="93.5" y="22" width="3" height="8" />
                        <path d="M185 30 C175 30 170 45 170 55 L200 55 C200 45 195 30 185 30 Z" />
                        <rect x="183.5" y="22" width="3" height="8" />
                        {/* Minarets */}
                        <rect x="60" y="35" width="8" height="40" />
                        <path d="M64 22 L58 35 L70 35 Z" />
                        <rect x="212" y="35" width="8" height="40" />
                        <path d="M216 22 L210 35 L222 35 Z" />
                        {/* Palace Base & Arches */}
                        <rect x="50" y="55" width="180" height="25" rx="2" />
                        <rect x="30" y="75" width="220" height="15" rx="2" />
                        {/* Arches Cutouts */}
                        <path d="M130 75 C130 62 150 62 150 75 Z" fill="#FAF6EE" />
                        <path d="M105 75 C105 65 120 65 120 75 Z" fill="#FAF6EE" />
                        <path d="M160 75 C160 65 175 65 175 75 Z" fill="#FAF6EE" />
                        <path d="M85 75 C85 67 97 67 97 75 Z" fill="#FAF6EE" />
                        <path d="M183 75 C183 67 195 67 195 75 Z" fill="#FAF6EE" />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* ================= BOTTOM WORKSPACES SECTION ================= */}
            <div className="pt-10 border-t border-[#E8DDCF]/80 space-y-4">
              <div className="text-center space-y-1">
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#2D1B28]">
                  Your Wedding Workspaces
                </h3>
                <p className="text-xs text-[#7D597E] font-light">
                  Manage your weddings, invitations and guests from one place.
                </p>
              </div>

              {/* Workspace Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto pt-2">
                {/* Card 1: Ratna & Vag */}
                <div className="p-4 rounded-2xl bg-white border border-[#E8DDCF] shadow-xs flex items-center justify-between gap-4 hover:border-[#74182E]/30 transition-all">
                  <div className="flex items-center gap-3.5">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-stone-100 flex-none relative border border-[#E8DDCF]">
                      <img
                        src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=300&q=80"
                        alt="Ratna & Vag"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="text-sm font-serif font-bold text-[#2D1B28]">
                        Ratna &amp; Vag
                      </h4>
                      <div className="flex items-center gap-2 text-[11px] text-stone-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-[#C5A059]" />
                          12 December 2026
                        </span>
                        <span>•</span>
                        <span>Hyderabad</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-none">
                    <button
                      onClick={() => handleSelectAndLogin("wed-demo-01")}
                      className="px-4 py-1.5 rounded-full bg-[#74182E] text-white text-[11px] font-serif font-semibold hover:bg-[#581223] transition-colors shadow-xs"
                    >
                      Manage →
                    </button>
                  </div>
                </div>

                {/* Card 2: Rahul & Priya */}
                <div className="p-4 rounded-2xl bg-white border border-[#E8DDCF] shadow-xs flex items-center justify-between gap-4 hover:border-[#74182E]/30 transition-all">
                  <div className="flex items-center gap-3.5">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-stone-100 flex-none relative border border-[#E8DDCF]">
                      <img
                        src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=300&q=80"
                        alt="Rahul & Priya"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="text-sm font-serif font-bold text-[#2D1B28]">
                        Rahul &amp; Priya
                      </h4>
                      <div className="flex items-center gap-2 text-[11px] text-stone-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-[#C5A059]" />
                          12 December 2026
                        </span>
                        <span>•</span>
                        <span>Hyderabad</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-none">
                    <Link
                      href="/invite/rahul-priya"
                      target="_blank"
                      className="px-3 py-1.5 rounded-full border border-[#E8DDCF] text-[11px] text-stone-700 font-serif font-semibold hover:bg-stone-50 transition-colors flex items-center gap-1"
                    >
                      <Send className="w-3 h-3 text-[#74182E]" />
                      <span>Invite</span>
                    </Link>
                    <button
                      onClick={() => handleSelectAndLogin("wed-demo-02")}
                      className="px-4 py-1.5 rounded-full bg-[#74182E] text-white text-[11px] font-serif font-semibold hover:bg-[#581223] transition-colors shadow-xs"
                    >
                      Manage →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="w-full border-t border-[#E8DDCF]/80 py-4 px-6 text-center text-xs text-stone-500 bg-[#FAF7F2]">
        WeddingOS • Luxury Digital Stationery &amp; Guest Operations Platform
      </footer>
    </div>
  );
}
