"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import { useWedding } from "@/context/WeddingContext";
import { Role } from "@/lib/types";
import {
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Heart,
  Calendar,
  MapPin,
  LogIn,
  Plus
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { allWeddings, wedding, switchWedding, setCurrentRole } = useWedding();

  const [email, setEmail] = useState("rahul.priya@weddingos.com");
  const [password, setPassword] = useState("••••••••••••");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push("/app");
    }, 500);
  };

  const handleSelectWeddingAndLogin = (wId: string, role: Role = "couple") => {
    switchWedding(wId);
    setCurrentRole(role);
    if (role === "planner") {
      router.push("/app/planner");
    } else {
      router.push("/app");
    }
  };

  const handleQuickDemoLogin = (role: Role) => {
    setCurrentRole(role);
    if (role === "planner") {
      router.push("/app/planner");
    } else if (role === "caterer") {
      router.push("/app/vendors");
    } else if (role === "transport") {
      router.push("/app/logistics");
    } else if (role === "venue_staff") {
      router.push("/app/check-in");
    } else if (role === "guest") {
      router.push("/invite/rahul-priya");
    } else {
      router.push("/app");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-xl text-center space-y-3">
        <Logo size="lg" className="justify-center" />
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D1B28]">
          Log in to WeddingOS
        </h2>
        <p className="text-xs text-[#7D597E]">
          Select one of your created occasions below to log in directly, or enter your credentials.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl space-y-6">
        {/* SECTION: CREATED OCCASIONS CARDS LIST */}
        <div className="bg-white p-6 rounded-3xl border border-[#E8DDCF] shadow-soft space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#FAF7F2]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#74182E]">
                Created Occasions ({allWeddings.length})
              </span>
            </div>
            <Link
              href="/signup"
              className="text-xs font-semibold text-[#74182E] hover:underline flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Create New Occasion
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {allWeddings.map(w => {
              const isCurrent = wedding.id === w.id;
              return (
                <div
                  key={w.id}
                  className={`p-4 rounded-2xl border transition-all text-left flex flex-col justify-between space-y-2 ${
                    isCurrent
                      ? "bg-[#FAF7F2] border-[#74182E] shadow-soft-sm ring-1 ring-[#74182E]"
                      : "bg-white border-[#E8DDCF] hover:border-[#C5A059]"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#74182E]">
                        {w.city}
                      </span>
                      {isCurrent && (
                        <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded-full">
                          Active
                        </span>
                      )}
                    </div>
                    <div className="font-serif font-bold text-base text-[#2D1B28] mt-1">
                      {w.coupleNames}
                    </div>
                    <div className="text-[11px] text-[#7D597E] flex items-center gap-1 mt-0.5">
                      <Calendar className="w-3 h-3 text-[#C5A059]" />
                      <span>{w.weddingDate}</span>
                    </div>
                    <div className="text-[11px] text-stone-500 truncate mt-0.5">
                      {w.primaryVenue}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#E8DDCF] flex items-center justify-between">
                    <Link
                      href={`/invite/${w.slug}`}
                      target="_blank"
                      className="text-[11px] text-stone-500 hover:text-stone-800 underline"
                    >
                      Guest Link
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleSelectWeddingAndLogin(w.id, "couple")}
                      className="px-3.5 py-1.5 rounded-xl bg-[#74182E] text-white font-semibold text-xs hover:bg-[#581223] transition-colors flex items-center gap-1"
                    >
                      <span>Log In</span>
                      <ArrowRight className="w-3 h-3 text-[#E1CD98]" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Credentials Login Card */}
        <div className="bg-white py-8 px-6 sm:px-10 rounded-3xl border border-[#E8DDCF] shadow-soft space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8DDCF]">
            <h3 className="font-serif font-bold text-base text-[#2D1B28]">Sign in with Email & Password</h3>
            <span className="text-xs text-stone-400">Secure JWT</span>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block text-stone-600 font-semibold mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#E8DDCF] text-xs focus:border-[#74182E] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-stone-600 font-semibold">Password</label>
                <Link href="/forgot-password" className="text-[11px] text-[#74182E] hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#E8DDCF] text-xs focus:border-[#74182E] focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-full bg-[#74182E] text-white font-semibold text-xs hover:bg-[#581223] transition-colors shadow-soft"
            >
              {loading ? "Authenticating..." : "Log in to Workspace"}
            </button>
          </form>

          {/* 1-Click Persona Simulator */}
          <div className="pt-4 border-t border-[#E8DDCF] space-y-2 text-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#7D597E] block text-center">
              Quick Role-Based Access Simulators
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin("couple")}
                className="p-2 bg-[#FAF7F2] hover:bg-[#F3ECE1] border border-[#E8DDCF] rounded-xl text-left text-[11px] transition-colors"
              >
                <strong className="text-[#74182E] block">Couple / Family</strong>
                <span className="text-stone-500 text-[10px]">Full Access</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin("planner")}
                className="p-2 bg-[#FAF7F2] hover:bg-[#F3ECE1] border border-[#E8DDCF] rounded-xl text-left text-[11px] transition-colors"
              >
                <strong className="text-[#74182E] block">Occasion Planner</strong>
                <span className="text-stone-500 text-[10px]">12 Occasions Portal</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin("caterer")}
                className="p-2 bg-[#FAF7F2] hover:bg-[#F3ECE1] border border-[#E8DDCF] rounded-xl text-left text-[11px] transition-colors"
              >
                <strong className="text-[#74182E] block">Caterer Head</strong>
                <span className="text-stone-500 text-[10px]">Food counts only</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin("venue_staff")}
                className="p-2 bg-[#FAF7F2] hover:bg-[#F3ECE1] border border-[#E8DDCF] rounded-xl text-left text-[11px] transition-colors"
              >
                <strong className="text-[#74182E] block">Venue Gate Staff</strong>
                <span className="text-stone-500 text-[10px]">QR Check-in desk</span>
              </button>
            </div>

            <div className="pt-2 border-t border-[#E8DDCF]">
              <Link
                href="/admin"
                className="w-full py-2 px-3 rounded-xl bg-[#21111E] text-[#E1CD98] text-xs font-semibold flex items-center justify-between hover:bg-[#380714] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                  <span>Platform Super Administrator Portal</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-[#7D597E]">
          Want to start a new celebration?{" "}
          <Link href="/signup" className="font-semibold text-[#74182E] hover:underline">
            Create Your Wedding Free →
          </Link>
        </p>
      </div>
    </div>
  );
}
