"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import { HighlightText } from "@/components/ui/highlight-text";
import { useWedding } from "@/context/WeddingContext";
import { Wedding } from "@/lib/types";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Heart,
  Calendar,
  MapPin,
  Building,
  ExternalLink,
  LogIn,
  PlusCircle,
  Copy,
  Check
} from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const { createNewWedding, allWeddings, switchWedding, setCurrentRole } = useWedding();

  const [brideName, setBrideName] = useState("");
  const [groomName, setGroomName] = useState("");
  const [weddingDate, setWeddingDate] = useState("");
  const [city, setCity] = useState("Hyderabad");
  const [primaryVenue, setPrimaryVenue] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [createdWedding, setCreatedWedding] = useState<Wedding | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCreateWedding = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const newWed = createNewWedding({
      brideName: brideName || "Priya",
      groomName: groomName || "Rahul",
      weddingDate: weddingDate || "12 December 2026",
      city: city || "Hyderabad",
      primaryVenue: primaryVenue || "Taj Falaknuma Palace, Hyderabad",
      email: email || "couple@domain.com"
    });

    setCreatedWedding(newWed);
    setLoading(false);
  };

  const handleSelectAndLogin = (wId: string) => {
    switchWedding(wId);
    setCurrentRole("couple");
    router.push("/app");
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-xl text-center space-y-3">
        <Logo size="lg" className="justify-center" />
        <h2 className="text-3xl font-serif font-bold text-[#2D1B28]">
          {createdWedding ? (
            "Wedding Workspace Initialized!"
          ) : (
            <HighlightText
              text="Create Your Wedding in 2 Minutes"
              delay={0.2}
              duration={0.85}
              highlightClassName="bg-gradient-to-r from-[#C5A059]/30 via-[#74182E]/15 to-[#C5A059]/35 rounded-lg px-2"
            />
          )}
        </h2>
        <p className="text-xs text-[#7D597E]">
          {createdWedding
            ? "Your wedding is registered. You can log into your dashboard or view it on the login page."
            : "Start managing invitations, family RSVPs, and catering operations with zero spreadsheets."}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl space-y-6">
        {/* SUCCESS STATE: Newly Created Wedding Shown */}
        {createdWedding ? (
          <div className="bg-white py-8 px-6 sm:px-10 rounded-3xl border-2 border-[#C5A059] shadow-soft-xl space-y-6 animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8DDCF]">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Wedding Successfully Created
              </span>
              <span className="text-xs font-mono text-stone-500">{createdWedding.id}</span>
            </div>

            {/* Created Wedding Summary Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-[#FAF7F2] via-white to-[#F3ECE1] border border-[#C5A059] space-y-3">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#74182E] fill-current" />
                <span className="text-xs uppercase font-bold text-[#74182E] tracking-wider">
                  New Wedding Workspace
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D1B28]">
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

              {/* Shareable Link preview */}
              <div className="pt-3 border-t border-[#E8DDCF] flex items-center justify-between text-xs">
                <span className="text-[#7D597E] text-[11px]">Guest RSVP Link:</span>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/invite/${createdWedding.slug}`}
                    target="_blank"
                    className="font-mono text-[#74182E] text-[11px] underline flex items-center gap-1"
                  >
                    /invite/{createdWedding.slug} <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>

            {/* CTAs: Log in or Go to Login screen */}
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

            <div className="pt-2 text-center">
              <button
                onClick={() => {
                  setCreatedWedding(null);
                  setBrideName("");
                  setGroomName("");
                  setWeddingDate("");
                  setPrimaryVenue("");
                }}
                className="text-xs font-medium text-stone-500 hover:text-stone-800 underline"
              >
                + Create another wedding workspace
              </button>
            </div>
          </div>
        ) : (
          /* FORM: Create Wedding Form */
          <div className="bg-white py-8 px-6 sm:px-10 rounded-3xl border border-[#E8DDCF] shadow-soft space-y-5">
            <form onSubmit={handleCreateWedding} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-600 font-semibold mb-1">Bride&apos;s Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priya"
                    value={brideName}
                    onChange={e => setBrideName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DDCF] text-xs focus:border-[#74182E] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 font-semibold mb-1">Groom&apos;s Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul"
                    value={groomName}
                    onChange={e => setGroomName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DDCF] text-xs focus:border-[#74182E] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-600 font-semibold mb-1">Wedding Date *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 12 Dec 2026"
                    value={weddingDate}
                    onChange={e => setWeddingDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DDCF] text-xs focus:border-[#74182E] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 font-semibold mb-1">City / Region *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Hyderabad / Udaipur"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DDCF] text-xs focus:border-[#74182E] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-600 font-semibold mb-1">Palace / Primary Venue *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Taj Falaknuma Palace"
                  value={primaryVenue}
                  onChange={e => setPrimaryVenue(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DDCF] text-xs focus:border-[#74182E] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-stone-600 font-semibold mb-1">Couple / Family Account Email *</label>
                <input
                  type="email"
                  required
                  placeholder="couple@domain.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DDCF] text-xs focus:border-[#74182E] focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-full bg-[#74182E] text-white font-semibold text-xs hover:bg-[#581223] transition-colors shadow-soft flex items-center justify-center gap-2"
                >
                  <span>{loading ? "Creating Wedding..." : "Create Wedding Free →"}</span>
                </button>
              </div>
            </form>

            <div className="pt-3 border-t border-[#E8DDCF] text-center text-xs text-[#7D597E]">
              Already have a wedding workspace?{" "}
              <Link href="/login" className="font-semibold text-[#74182E] hover:underline">
                Log in here
              </Link>
            </div>
          </div>
        )}

        {/* SECTION: Created Weddings List on Signup Page */}
        <div className="bg-white p-5 rounded-2xl border border-[#E8DDCF] shadow-soft space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#FAF7F2]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#74182E]">
              Created Weddings ({allWeddings.length})
            </span>
            <Link href="/login" className="text-[11px] text-[#74182E] font-semibold hover:underline">
              Log in to any →
            </Link>
          </div>

          <div className="space-y-2">
            {allWeddings.map(w => (
              <div
                key={w.id}
                className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E8DDCF] flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="font-serif font-bold text-sm text-[#2D1B28]">{w.coupleNames}</div>
                  <div className="text-[11px] text-[#7D597E]">
                    {w.weddingDate} · {w.city}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/invite/${w.slug}`}
                    target="_blank"
                    className="text-[11px] text-stone-500 hover:text-stone-800 underline"
                  >
                    Invite
                  </Link>
                  <button
                    onClick={() => handleSelectAndLogin(w.id)}
                    className="px-3 py-1.5 rounded-lg bg-[#74182E] text-white font-semibold text-xs hover:bg-[#581223] transition-colors"
                  >
                    Log In
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
