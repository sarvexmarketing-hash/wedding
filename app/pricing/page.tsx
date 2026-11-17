"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Check, Sparkles, ArrowRight, ShieldCheck, HelpCircle, Star } from "lucide-react";

export default function PricingPage() {
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");

  const plans = [
    {
      id: "basic",
      name: "Basic",
      tagline: "Essential digital invitation & RSVP foundation",
      price: currency === "INR" ? "₹1,499" : "$19",
      period: "per wedding",
      badge: "Starter",
      description: "Ideal for couples seeking an elegant digital wedding card and clean headcount collection.",
      features: [
        "Digital invitation web card (No app required)",
        "Frictionless 60-second Guest RSVP",
        "Chronological Event management (Up to 3 events)",
        "Mobile responsive guest view & Add to Calendar",
        "Export guest lists to CSV & Excel",
        "Standard email & link sharing"
      ],
      cta: "Create Basic Wedding",
      href: "/signup?plan=basic",
      highlight: false
    },
    {
      id: "premium",
      name: "Premium",
      tagline: "The full Smart Wedding Management Suite",
      price: currency === "INR" ? "₹4,999" : "$59",
      period: "per wedding",
      badge: "Most Popular",
      description: "Complete intelligence, AI media, attire guides, and private gift tracking for modern celebrations.",
      features: [
        "Everything in Basic, plus:",
        "AI Wedding Invitation Video generator (4K UHD)",
        "Smart Attire Recommendations ('What Should I Wear?')",
        "Multi-language guest experience (8 Indian languages)",
        "Automated WhatsApp & SMS event reminders",
        "Private Wedding Gifts & Shagun value tracking",
        "AI Attendance & Catering plate prediction",
        "Unlimited ceremonies & multi-event schedule",
        "Day-of QR Check-in passes for guests"
      ],
      cta: "Start Premium Wedding",
      href: "/signup?plan=premium",
      highlight: true
    },
    {
      id: "luxury",
      name: "Luxury Concierge",
      tagline: "Bespoke technology for grand Indian weddings",
      price: currency === "INR" ? "₹14,999" : "$179",
      period: "per wedding",
      badge: "Royal Experience",
      description: "White-glove coordination, custom domain, ground hospitality, and dedicated ops desk.",
      features: [
        "Everything in Premium, plus:",
        "Custom wedding domain (e.g. rahulweds priya.com)",
        "Advanced personalization & bespoke design styling",
        "Dedicated wedding operations portal for planners & family heads",
        "Ground hospitality, room allocations & airport transfers",
        "Table seating charts & live caterer portal",
        "Dedicated VIP guest management desk",
        "Priority 24/7 concierge WhatsApp coordinator"
      ],
      cta: "Book Luxury Concierge",
      href: "/signup?plan=luxury",
      highlight: false
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      <Navbar />

      <main className="flex-1 py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#74182E] bg-[#74182E]/10 px-3.5 py-1 rounded-full">
            Transparent Wedding Plans
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[#2D1B28]">
            Run Your Wedding Like a System.
          </h1>
          <p className="text-base sm:text-lg text-[#654566]">
            One-time simple payment per wedding. No subscriptions or surprise charges. Select the tier that matches your wedding scale.
          </p>

          {/* Currency toggle */}
          <div className="inline-flex items-center gap-1 bg-[#FAF7F2] border border-[#E8DDCF] p-1 rounded-full shadow-soft-sm mt-2">
            <button
              onClick={() => setCurrency("INR")}
              className={`px-4 py-1 rounded-full text-xs font-semibold transition-all ${
                currency === "INR" ? "bg-[#74182E] text-white shadow-soft" : "text-[#7D597E] hover:text-[#2D1B28]"
              }`}
            >
              INR (₹)
            </button>
            <button
              onClick={() => setCurrency("USD")}
              className={`px-4 py-1 rounded-full text-xs font-semibold transition-all ${
                currency === "USD" ? "bg-[#74182E] text-white shadow-soft" : "text-[#7D597E] hover:text-[#2D1B28]"
              }`}
            >
              USD ($)
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map(plan => (
            <div
              key={plan.id}
              className={`rounded-3xl p-7 sm:p-9 flex flex-col justify-between transition-all ${
                plan.highlight
                  ? "bg-white border-2 border-[#74182E] shadow-soft-xl relative ring-2 ring-[#74182E]/20"
                  : "bg-white/80 border border-[#E8DDCF] shadow-soft hover:bg-white hover:border-[#C5A059]"
              }`}
            >
              <div>
                {plan.badge && (
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`inline-block text-[11px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full ${
                        plan.highlight
                          ? "bg-[#74182E] text-white"
                          : "bg-[#C5A059]/20 text-[#8D6B33]"
                      }`}
                    >
                      {plan.badge}
                    </span>
                    {plan.highlight && (
                      <span className="flex items-center gap-1 text-xs text-[#C5A059] font-medium">
                        <Star className="w-3.5 h-3.5 fill-current" /> Recommended
                      </span>
                    )}
                  </div>
                )}

                <h3 className="text-2xl font-serif font-bold text-[#2D1B28]">{plan.name}</h3>
                <p className="text-xs text-[#74182E] font-medium mt-0.5">{plan.tagline}</p>

                <div className="mt-4 flex items-baseline gap-1.5">
                  <span className="text-4xl sm:text-5xl font-serif font-bold text-[#2D1B28]">{plan.price}</span>
                  <span className="text-xs text-[#7D597E]">/ {plan.period}</span>
                </div>
                <p className="text-xs text-[#7D597E] mt-3 leading-relaxed">{plan.description}</p>

                <div className="my-6 border-t border-[#E8DDCF]" />

                <div className="space-y-3">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#7D597E]">
                    What&apos;s Included:
                  </div>
                  <ul className="space-y-3 text-xs text-[#4D334E]">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8">
                <Link
                  href={plan.href}
                  className={`block w-full py-3.5 rounded-full text-center text-xs font-bold transition-all ${
                    plan.highlight
                      ? "bg-[#74182E] text-white hover:bg-[#581223] shadow-soft hover:-translate-y-0.5"
                      : "bg-[#FAF7F2] text-[#2D1B28] border border-[#E8DDCF] hover:bg-[#F3ECE1]"
                  }`}
                >
                  {plan.cta} →
                </Link>
                <div className="text-center text-[11px] text-stone-400 mt-2">
                  No monthly commitment · Instant activation
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Comparison Highlights */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E8DDCF] shadow-soft space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold">
              Feature Deep-Dive
            </span>
            <h3 className="text-2xl font-serif font-bold text-[#2D1B28]">
              Built Specifically for Indian Weddings
            </h3>
            <p className="text-xs text-[#7D597E]">
              Why traditional generic invite tools fall short for multi-day, 800+ guest celebrations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-xs">
            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DDCF] space-y-2">
              <div className="font-serif font-bold text-sm text-[#74182E]">1. AI Attendance Prediction</div>
              <p className="text-[#654566] leading-relaxed">
                Save ₹2,00,000–₹5,00,000 on catering waste. Our model factors outstation travel fatigue and family turnout patterns to recommend exact portion counts.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DDCF] space-y-2">
              <div className="font-serif font-bold text-sm text-[#74182E]">2. Family Group RSVP</div>
              <p className="text-[#654566] leading-relaxed">
                One family head confirms for their spouse, in-laws, and children in 60 seconds with individual dietary tags (Jain, Veg, Non-Veg) and arrival time.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DDCF] space-y-2">
              <div className="font-serif font-bold text-sm text-[#74182E]">3. Private Gift & Shagun Tracking</div>
              <p className="text-[#654566] leading-relaxed">
                A private vault for the couple & parents to record shagun envelopes, bank transfers, gold jewelry, and automatically send thank-you notes.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto pt-6 space-y-6">
          <h2 className="text-2xl font-serif font-bold text-center text-[#2D1B28]">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4 text-xs sm:text-sm">
            <div className="p-5 bg-white rounded-2xl border border-[#E8DDCF] space-y-1">
              <h4 className="font-serif font-bold text-[#2D1B28]">Do guests need to install an app or create an account?</h4>
              <p className="text-[#654566]">
                Never. Guests receive an instant personalized web link via WhatsApp or SMS that opens directly on their smartphone with zero login friction.
              </p>
            </div>
            <div className="p-5 bg-white rounded-2xl border border-[#E8DDCF] space-y-1">
              <h4 className="font-serif font-bold text-[#2D1B28]">Can family heads RSVP on behalf of elderly grandparents or children?</h4>
              <p className="text-[#654566]">
                Yes. Our unique Indian wedding Family Model groups households together so a family head can select who is coming, choose individual dietary requirements, and confirm in under 60 seconds.
              </p>
            </div>
            <div className="p-5 bg-white rounded-2xl border border-[#E8DDCF] space-y-1">
              <h4 className="font-serif font-bold text-[#2D1B28]">How does the AI Attendance Prediction save catering money?</h4>
              <p className="text-[#654566]">
                Instead of blindly ordering 600 plates because 600 people pressed &quot;Attending&quot;, our machine learning algorithm analyzes outstation travel probability, single vs family groups, and historical attrition to recommend the exact portion count (e.g. 513 meals with +7% buffer), saving couples ₹2,00,000–₹5,00,000 in food wastage.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
